import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from './purchase-order';
import { GenericHttpService } from '../generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService extends GenericHttpService<PurchaseOrder> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `purchaseorders`);
  } // constructor
} // PurchaseOrderService

