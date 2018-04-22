import * as React from 'react';
import './index.css';

export class Cart extends React.Component<OwnProps> {

  state = {
    headers: ['title', 'price', 'qty', 'action'],
    desc: false,
    sortBy: null
  };

  sort = (sortBy: string) => {
    const {desc} = this.state;

    this.setState({
      desc: !desc,
      sortBy
    }, () => this.props.onSort(sortBy, desc));
  };

  removeItem = (productId: number) => {
    return this.props.onRemove(productId);
  };

  changeQty = (e, productId: number) => {
    const val = e.target.value;
    return this.props.onChange(productId, val);
  };

  render() {
    const {headers, desc, sortBy} = this.state;
    const {products} = this.props;

    if (!products.length) {
      return null;
    }

    return (
      <table>
        <thead>
        <tr>
          {headers.map((head, idx) => {
            return (
              <td key={idx} onClick={() => this.sort(head)}>
                {head}
                {
                  sortBy && sortBy === head ?
                    `${desc ? '\u2191' : '\u2193'}` :
                    null
                }
              </td>
            )
          })}
        </tr>
        </thead>

        <tbody>
        {
          products.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <input type="number" value={item.qty} onChange={(e) => this.changeQty(e, item.id)}/>
                </td>
                <td>
                  <button onClick={() => this.removeItem(item.id)}>
                    Remove Item
                  </button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    );
  }
}

export interface OwnProps {
  state?: any,
  actions?: any,
  products?: any[],
  onRemove: any,
  onChange: any,
  onSort: any
}

export default Cart;
