import { ProductModel } from '../models/productModel';
import { createAction } from 'redux-actions';

export const addToCart = createAction('ADD_TO_CART',
  (productItem: ProductModel) => productItem
);