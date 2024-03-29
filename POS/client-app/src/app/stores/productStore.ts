
import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product, ProductFormValues } from "../models/product";
export default class ProductStore {
    // products: Product[] = [];
    productRegistry = new Map<string, Product>();
    loadingInitial = false;
    editMode = false;
    loading = false;
    selectedProduct: Product | undefined = undefined;
    constructor() {
        makeAutoObservable(this)
    }
    get ProductsByDate() {
        return Array.from(this.productRegistry.values()).sort((a, b) =>
           a.modified!.getTime() - b.modified!.getTime())
    }
    get groupedProducts() {
        return Object.entries(
            this.ProductsByDate.reduce((products, product) => {
                const modified = format(product.modified!, 'dd MMM yyyy')
                // const modified = product.modified!. toISOString().split('T')[0];
                products[modified] = products[modified] ?
                    [...products[modified], product] : [product];
                return products
            }, {} as { [key: string]: Product[] })
        )
    }
    loadProducts = async () => {
        this.setloadingInitial(true);
        try {
            const products = await agent.products.lists()
            console.log(products);
            products.forEach(product => {
                this.setProduct(product);
                // this.products.push(product)
            });
            console.log(products);
            this.setloadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);

        }
    }
    loadProduct = async (id: string) => {
        let product = this.getProduct(id)
        if (product) {
            this.selectedProduct = product;
            return product;
        } else {
            this.loadingInitial = true;
            try {
                product = await agent.products.deatails(id);
                this.setProduct(product);
                runInAction(() => this.selectedProduct = product)

                this.setloadingInitial(false);
                return product;

            } catch (error) {
                console.log(error);
                this.setloadingInitial(false);
            }
        }
    }
    private getProduct = (id: string) => {
        return this.productRegistry.get(id);
    }
    private setProduct = (product: Product) => {
        product.modified = new Date(product.modified!);
        //product.modified.split('T')[0];
        this.productRegistry.set(product.id, product);
    }
    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }
    // selectProduct = (id: string) => {
    //     this.selectedProduct = this.productRegistry.get(id);
    //     //this.selectedProduct=this.products.find(p=>p.id===id)
    // }
    // cancelSelectedProduct = () => {
    //     this.selectedProduct = undefined;
    // }
    // openForm = (id?: string) => {
    //     id ? this.selectProduct(id) : this.cancelSelectedProduct();
    //     this.editMode = true;
    // }
    // closeForm = () => {
    //     this.editMode = false;
    // }
    createProduct = async (product: ProductFormValues) => {
        
       // this.loading = true;
        try {
            await agent.products.create(product);
           var newProduct=new Product(product);
           this.setProduct(newProduct);
           runInAction(()=>{
            this.selectedProduct=newProduct;
           })
        } catch (error) {
            console.log(error);
           
        }
    }
    updateProduct = async (product: ProductFormValues) => {
        //this.loading = true;
        try {
            await agent.products.update(product);

            runInAction(() => {
                if(product.id){
                    var updatedProduct={...this.getProduct(product.id), ...product}
                    this.productRegistry.set(product.id, updatedProduct as Product)
                    this.selectedProduct=updatedProduct as Product;
                }
                // this.products=[...this.products.filter(p=>p.id !==product.id),product];
                // this.productRegistry.set(product.id, product);
                // this.selectedProduct = product;
                // this.editMode = false;
                // this.loading = false;

            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
    deleteProduct = async (id: string) => {
        this.loading = true;
        try {
            await agent.products.delete(id);
            runInAction(() => {
                this.productRegistry.delete(id);
                //this.products=[...this.products.filter(p=>p.id !=id)];
                //if product is being desplayed
                // if (this.selectedProduct !== undefined) {
                //     if (this.selectedProduct.id === id) this.cancelSelectedProduct();
                // }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
   
}