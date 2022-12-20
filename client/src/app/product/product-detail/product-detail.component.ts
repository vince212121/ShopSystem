import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ValidateDecimal } from '@app/validators/decimal.validator';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { AbstractControl } from '@angular/forms';
import { ValidateNumber } from '@app/validators/number.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product = {
    id: '',
    vendorid: 0,
    name: '',
    costprice: 0.0,
    msrp: 0.0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode: '',
    qrcodetxt: '',
  };
  @Input() vendors: Vendor[] | null = null;
  @Input() products: Product[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  id: FormControl;
  vendorid: FormControl;
  costprice: FormControl;
  name: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  qrcodetxt: FormControl;
  qrcode: FormControl;

  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.id = new FormControl(
      '',
      Validators.compose([
        this.uniqueCodeValidator.bind(this),
        Validators.required,
      ])
    );
    this.vendorid = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.costprice = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateDecimal])
    );
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.msrp = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateDecimal])
    );
    this.rop = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateNumber])
    );
    this.eoq = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateNumber])
    );
    this.qoh = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateNumber])
    );
    this.qoo = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateNumber])
    );
    this.qrcodetxt = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.qrcode = new FormControl('');

    this.productForm = this.builder.group({
      id: this.id,
      vendorid: this.vendorid,
      costprice: this.costprice,
      name: this.name,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      qrcodetxt: this.qrcodetxt,
      qrcode: this.qrcode,
    });
  } // constructor
  ngOnInit(): void {
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      costprice: this.selectedProduct.costprice,
      name: this.selectedProduct.name,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      qrcodetxt: this.selectedProduct.qrcodetxt,
      qrcode: this.selectedProduct.qrcode,
    });
  } // ngOnInit

  updateSelectedProduct(): void {
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
    this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
    this.selectedProduct.qrcode = this.productForm.value.qrcode;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedProduct

  /**
   * uniqueCodeValidator - needed access to products property so not
   * with the rest of the validators
   */
  uniqueCodeValidator(control: AbstractControl): { idExists: boolean } | null {
    if (this.products !== undefined) {
      if (
        this.products?.find(
          (p) =>
            p.id.toUpperCase() === control.value.toUpperCase() &&
            !this.selectedProduct.id
        ) !== undefined
      ) {
        return { idExists: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator

  openDeleteDialog(selectedProduct: Product): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Product ${this.selectedProduct.id}`,
      entityname: 'product',
    };
    dialogConfig.panelClass = 'customdialog';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleted.emit(this.selectedProduct);
      }
    });
  } // openDeleteDialog
} // ProductDetailComponent
