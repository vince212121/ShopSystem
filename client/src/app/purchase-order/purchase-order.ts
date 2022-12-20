import { PurchaseOrderLineItem } from './purchase-order-line-item';
/**
 * PurchaseOrder - interface for expense report
 */
export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  podate: string;
  items: PurchaseOrderLineItem[];
}
