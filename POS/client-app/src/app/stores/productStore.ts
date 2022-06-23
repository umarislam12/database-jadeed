import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product } from "../models/product";
import { v4 as uuid } from 'uuid';
export default class ProductStore {
    // products: Product[] = [];
    productRegistry = new Map<string, Product>();
    loadingInitial = true;
    editMode = false;
    loading = false;
    selectedProduct: Product | undefined = undefined;
    constructor() {
        makeAutoObservable(this)
    }
    get ProductsByDate() {
        return Array.from(this.productRegistry.values()).sort((a, b) =>
            Date.parse(a.modified) - Date.parse(b.modified))
    }
    loadProducts = async () => {
        // this.setloadingInitial(true);
        try {
            const products = await agent.products.lists()
            console.log(products);
            products.forEach(product => {
                product.modified = product.modified.split('T')[0];
                this.productRegistry.set(product.id, product);
                // this.products.push(product)
            });
            this.setloadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);

        }
    }
    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }
    selectProduct = (id: string) => {
        this.selectedProduct = this.productRegistry.get(id);
        //this.selectedProduct=this.products.find(p=>p.id===id)
    }
    cancelSelectedProduct = () => {
        this.selectedProduct = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectProduct(id) : this.cancelSelectedProduct;
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }
    createProduct = async (product: Product) => {
        this.loading = true;
        product.id = uuid();
        try {
            await agent.products.create(product);
            runInAction(() => {
                this.productRegistry.set(product.id, product);
                //this.products.push(product);
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateProduct = async (product: Product) => {
        this.loading = true;
        try {
            await agent.products.update(product);
            runInAction(() => {
                // this.products=[...this.products.filter(p=>p.id !==product.id),product];
                this.productRegistry.set(product.id, product);
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;

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
                if (this.selectedProduct !== undefined) {
                    if (this.selectedProduct.id === id) this.cancelSelectedProduct();
                }
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