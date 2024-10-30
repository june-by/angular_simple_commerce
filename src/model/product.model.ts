export interface ProductType {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
  priorityScore: number;
  recommendCode: number;
}

export interface OrderProductType extends ProductType {
  isChecked: boolean;
  quantity: number;
}
