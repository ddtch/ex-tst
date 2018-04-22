import axios from 'axios';

class ProductsServiceClass {
    getProducts(): any {
        return axios.get('products.json')
        .then(data => new Promise(resolve => 
            setTimeout(() => resolve(data), 800))
        )
    }
}

export const ProductsService = new ProductsServiceClass();