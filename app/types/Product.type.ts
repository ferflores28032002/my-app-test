export interface Product {
  id: string;
  url_image: string;
  id_category: number;
  brand: string;
  upc: string;
  size: string;
  variety: string[];
  price: string;
  desc: string;
  status_active: boolean;
  createdAt: string;
  updatedAt: string;
  id_product: number;
}

export interface ApiResponse {
  result: Product[];
}
