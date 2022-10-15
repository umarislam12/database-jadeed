export interface Product {
  id: string;
  productName: string;
  productNumber: string;
  description: string;
  qtyStock: number;
  brand: string;
  category: string;
  cost: number;
  vandor: string;
  wholesalePrice: number;
  retailPrice: number;
  packed: boolean;
  created: Date | null;
  modified: Date | null;
}
export class Product implements Product {
  /**
   *
   */
  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
export class ProductFormValues {
  id?: string = undefined;
  productName: string = "";
  productNumber: string = "";
  description: string = "";
  qtyStock: number = 0;
  brand: string = "";
  category: string = "";
  cost: number = 0;
  vandor: string = "";
  wholesalePrice: number = 0;
  retailPrice: number = 0;
  packed: boolean = false;
  created: Date | null = null;
  modified: Date | null  = null;
  constructor(product?: ProductFormValues) {
    if (product) {
      this.id = product.id;
      this.productName = product.productName;
      this.productNumber = product.productNumber;
      this.description = product.description;
      this.qtyStock = product.qtyStock;
      this.brand = product.brand;
      this.category = product.category;
      this.cost = product.cost;
      this.vandor = product.vandor;
      this.wholesalePrice = product.wholesalePrice;
      this.retailPrice = product.retailPrice;
      this.packed = product.packed;
       this.created = product.created;
      this.modified = product.modified;
    }
  }
}
