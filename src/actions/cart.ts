import { createAction } from 'redux-actions';

export const removeFromCart = createAction("REMOVE_FROM_CART",
  (productId: number) => productId
);

export const changeProductQty = createAction("CHANGE_PRODUCT_QTY",
  (productId: number, qty: number) => ({productId, qty})
);

export const sortProducts = createAction("SORT_CART_PRODUCTS",
  (sortBy: string, desc: boolean) => ({sortBy, desc})
);
