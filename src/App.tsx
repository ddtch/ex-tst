import * as React from 'react';
import './App.css';
import { ProductsList } from './components/productsList';
import { ProductsService } from "./services";
import { connect } from "react-redux";
import { ProductModel } from './models/productModel';
import { bindActionCreators } from "redux";
import { Cart } from "./components/cart";
import {
  addToCart,
  changeProductQty,
  removeFromCart,
  sortProducts
} from "./actions";

class App extends React.Component<OwnProps & any> {

  state = {
    products: [],
  };

  componentDidMount() {
    ProductsService.getProducts()
      .then(resp => {
        this.setState({products: resp.data})
      });
  }

  addToCart = (productId: number) => {
    const {addToCart} = this.props;
    const {products} = this.state;
    const neededProduct = products.filter(item => item['id'] === productId)[0];
    addToCart(neededProduct)
  };

  removeFromCart = (productId: number) => {
    this.props.removeFromCart(productId);
  };

  changeProductQty = (productId: number, qty: number) => {
    this.props.changeProductQty(productId, qty);
  };

  sortProducts = (sortBy: string, desc: boolean) => {
    this.props.sortProducts(sortBy, desc);
  };

  render() {
    const {products} = this.state;
    const {cart} = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ex cart</h1>
        </header>

        <ProductsList products={products} onAdd={this.addToCart}/>

        <Cart products={cart.products} onRemove={this.removeFromCart}
              onChange={this.changeProductQty} onSort={this.sortProducts}/>

      </div>
    );
  }
}

interface StateProps {
}

interface DispatchProps {
  addToCart(productItem: ProductModel)
}

type OwnProps = StateProps & DispatchProps;

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart,
  removeFromCart,
  changeProductQty,
  sortProducts
}, dispatch);

const mapStateToProps = (state) => ({cart: state.cart});

export default connect(mapStateToProps, mapDispatchToProps)(App);
