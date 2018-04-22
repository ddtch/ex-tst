import * as React from 'react';
import './index.css';

export class ProductsList extends React.Component<OwnProps> {
    render() {
        const {products, onAdd} = this.props;
        return (
            <div className="products-list">
                {
                    products.map(item => {
                        return (
                            <div className="product" key={item.id}>
                                <p>{item.title}</p>
                                <p>{item.price}</p>
                                <button onClick={() => onAdd(item.id)}>
                                    Add to cart
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

interface OwnProps {
    products: any[],
    onAdd: Function
}

export default ProductsList;