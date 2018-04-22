import { handleActions } from "redux-actions";

const initialState = {
  products: []
};

const productExist = (stateProducts, productId) => !!stateProducts.find(prod => prod.id === productId);

export const cartReducer = handleActions({
  'ADD_TO_CART': (state, action) => {
    const {payload} = action;
    const stateProducts = [...state.products];

    // if there is no such product in products add it
    if(!productExist(stateProducts, payload.id)){
      return Object.assign({}, state, {products: [...stateProducts, ...payload]});
    }

    // else increment its qty
    stateProducts.map(prod => {
      if(prod.id === payload.id){
        prod.qty++;
        return prod;
      }
    });

    return Object.assign({}, state, {products: [...stateProducts]});
  },
  'REMOVE_FROM_CART': (state, action) => {
    const {payload} = action;
    const filteredProducts = state.products.filter(prod => prod.id !== payload);
    return Object.assign({}, {products: filteredProducts})
  },
  'CHANGE_PRODUCT_QTY': (state, action) => {
    const {payload} = action;
    const stateProducts = [...state.products];

    stateProducts.map(prod => {
      if(prod.id === payload.productId){
        prod.qty = payload.qty;
        return prod;
      }
    });

    return Object.assign({}, {products: [...stateProducts]})
  },
  'SORT_CART_PRODUCTS': (state, action) => {
    const {payload} = action;
    const sorted = [...state.products].sort((a, b) => payload.desc ?
      (a[payload.sortBy] < b[payload.sortBy] ? 1 : -1) :
      (a[payload.sortBy] > b[payload.sortBy] ? 1 : -1)
    );

    return Object.assign({}, {products: sorted})
  }
}, initialState);