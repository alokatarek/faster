export interface AddOrder {
  notes?: string;
  payedUp?: string;
  customerId: string;
  areasId: number;
  mapXY?: string;
  items: any;
  fullAddress: string;
}
