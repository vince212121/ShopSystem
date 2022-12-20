import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { PurchaseOrderLineItem } from '../purchase-order-line-item';
import { PurchaseOrder } from '../purchase-order';
import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrderService } from '../purchase-order.service';
import { PDFURL } from '@app/constants';

@Component({
  templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  qty: FormControl;

  // data
  formSubscription?: Subscription;
  products$?: Observable<Product[]>; // everybody's products
  vendors$?: Observable<Vendor[]>; // all vendors
  vendorproducts$?: Observable<Product[]>; // all products for a particular vendor
  items: Array<PurchaseOrderLineItem>; // purchase order line items that will be in purchase order
  selectedProducts: Product[]; // products that being displayed currently in app
  selectedProduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected vendor
  selectedQty: number; // the current selected qty

  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean;
  generated: boolean;
  hasProducts: boolean;
  hasQty: boolean;
  msg: string;
  total: number;
  purchaseorderno: number = 0;

  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.generated = false;
    this.msg = '';
    this.productid = new FormControl('');
    this.vendorid = new FormControl('');
    this.qty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      qty: this.qty,
    });
    this.selectedProduct = {
      id: '',
      vendorid: 0,
      name: '',
      costprice: 0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
    };
    this.selectedVendor = {
      id: 0,
      name: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      email: '',
    };
    this.items = new Array<PurchaseOrderLineItem>();
    this.selectedProducts = new Array<Product>();
    this.hasProducts = false;
    this.total = 0.0;
    this.selectedQty = 0.0;
    this.pickedQty = false;
    this.hasQty = false;
  } // constructor

  ngOnInit(): void {
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQty();
    this.msg = 'loading vendors and products from server...';
    (this.vendors$ = this.vendorService.get()),
      catchError((err) => (this.msg = err.message));
    (this.products$ = this.productService.get()),
      catchError((err) => (this.msg = err.message));
    this.msg = 'server data loaded';
  } // ngOnInit

  // Used to prevent memory leaks
  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy

  /**
   * onPickVendor - Another way to use Observables, subscribe to the select change event
   * then load specific employee expenses for subsequent selection
   */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
          id: '',
          vendorid: 0,
          name: '',
          costprice: 0,
          msrp: 0,
          rop: 0,
          eoq: 0,
          qoh: 0,
          qoo: 0,
          qrcode: '',
          qrcodetxt: '',
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.hasProducts = false;
        this.pickedQty = false;
        this.hasQty = false;
        this.msg = 'Choose a product for a vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the report
        this.selectedProducts = []; // array for the details in app html
      });
  } // onPickVendor

  /**
   * onPickProduct - subscribe to the select change event then
   * update array containing items.
   */
  onPickProduct(): void {
    const expenseSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = val;
        const item: PurchaseOrderLineItem = {
          id: 0,
          poid: 0,
          productid: this.selectedProduct?.id,
          qty: 0,
          price: this.selectedProduct?.costprice,
        };
        if (
          this.items.find((item) => item.productid === this.selectedProduct?.id)
        ) {
          // ignore entry
          this.qty.setValue(this.selectedProduct.qoo);
        } else {
          // add entry
          this.items.push(item);
          this.selectedProducts.push(this.selectedProduct);
          this.pickedProduct = true;
          this.qty.setValue(this.selectedProduct.eoq);
        }
        if (this.items.length > 0) {
          this.hasProducts = true;
        }
        this.msg = '';
      });
    this.formSubscription?.add(expenseSubscription); // add it as a child, so all can be destroyed together
  } // onPickProduct

  /**
   * onPickProduct - subscribe to the select change event then
   * update array containing items.
   */
  onPickQty(): void {
    const expenseSubscription = this.generatorForm
      .get('qty')
      ?.valueChanges.subscribe((val) => {
        this.selectedQty = val;
        this.pickedQty = true;
        if (this.selectedQty !== 0) {
          this.hasQty = true;

          if (
            this.items.findIndex(
              (item) => item.productid === this.selectedProduct.id
            ) < 0
          ) {
            const item: PurchaseOrderLineItem = {
              id: 0,
              poid: 0,
              productid: this.selectedProduct?.id,
              qty: 0,
              price: this.selectedProduct?.costprice,
            };
            this.items.push(item);
            this.selectedProducts.push(this.selectedProduct);
          }

          this.items.find((item) => {
            if (item.productid === this.selectedProduct.id) {
              if (this.selectedQty === -1) {
                // EOQ option
                item.qty = this.selectedProduct.eoq;
                this.selectedProduct.qoo = this.selectedProduct.eoq;
              } else {
                item.qty = this.selectedQty;
                this.selectedProduct.qoo = this.selectedQty;
              }
            }
          });

          this.hasProducts = true;
        } else {
          let index = this.items.findIndex(
            (item) => item.productid === this.selectedProduct.id
          );
          if (index > -1) this.items.splice(index);

          index = this.selectedProducts.findIndex(
            (prod) => prod.id === this.selectedProduct.id
          );
          if (index > -1) this.selectedProducts.splice(index);

          this.hasQty = false;
          if (this.items.length > 0) {
            this.msg = `all ${this.selectedProduct.name} removed`;
            this.total = 0.0;
            this.selectedProducts.forEach((prod) => {
              this.total += prod.costprice * prod.qoo;
            });
          } else {
            // Reset if there are no items
            this.pickedProduct = false;
            this.pickedQty = false;
            this.hasProducts = false;
            this.msg = 'No Items';
          }
          this.selectedQty = 0;
        }

        if (this.hasQty) {
          this.total = 0.0;
          this.selectedProducts.forEach((prod) => {
            this.total += prod.costprice * prod.qoo;
          });
          this.msg = `${this.selectedProduct.qoo} ${this.selectedProduct.name}(s) added`;
        }
      });
    this.formSubscription?.add(expenseSubscription); // add it as a child, so all can be destroyed together
  }

  /**
   * loadVendorProducts - filter for a particular employee's expenses
   */
  loadVendorProducts(): void {
    this.vendorproducts$ = this.products$?.pipe(
      map((products) =>
        // map each expense in the array and check whether or not it belongs to selected employee
        products.filter((prod) => prod.vendorid === this.selectedVendor?.id)
      )
    );
  } // loadVendorProducts

  /**
   * viewPdf - opens a new link to the product order pdf
   */
  viewPdf(): void {
    window.open(`${PDFURL}${this.purchaseorderno}`, '');
  } // viewPdf

  /**
   * createPurchase - create the client side report
   */
  createPurchase(): void {
    this.generated = false;
    const purchaseOrder: PurchaseOrder = {
      id: 0,
      items: this.items,
      vendorid: this.selectedProduct.vendorid,
      amount: this.total,
      podate: '',
    };
    this.purchaseOrderService.add(purchaseOrder).subscribe({
      // observer object
      next: (purchaseOrder: PurchaseOrder) => {
        // server should be returning report with new id
        purchaseOrder.id > 0
          ? (this.msg = `Purchase ${purchaseOrder.id} added!`)
          : (this.msg = 'Purchase not added! - server error');
        this.purchaseorderno = purchaseOrder.id;
      },
      error: (err: Error) =>
        (this.msg = `Purchase not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.hasQty = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.generated = true;
      },
    });
  } // createPurchase
} // GeneratorComponent
