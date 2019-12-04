import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatPrice } from '../../util/format'
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md'
import * as CartActions from '../../store/modules/cart/actions'

import { Container, ProductTable, Total } from './styles';

const Cart = ({ cart, removeFromCart, updateAmount, total }) => {
  
  const handleAmountSoma = (product) => {
    updateAmount(product.id, product.amount + 1)
  }

  const handleAmountSubtrair = (product) => {
    updateAmount(product.id, product.amount - 1)
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>produto</th>
            <th>quantidade</th>
            <th>subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr>
            <td>
             <img src={product.image} alt={product.title} />
            </td>

            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>

            <td>
              <div>
                <button type='button' onClick={() => handleAmountSubtrair(product)}>
                  <MdRemoveCircleOutline size={20} color='#7159c1' />
                </button>
                <input type='number' readonly value={product.amount} />
                <button type='button' onClick={() => handleAmountSoma(product)}>
                  <MdAddCircleOutline size={20} color='#7159c1' />
                </button>
              </div>  
            </td>

            <td>
              <strong>{product.subtotal}</strong>
            </td>

            <td>
              <button type='button'>
                <MdDelete size={20} color='#7159c1' 
                onClick={() => removeFromCart(product.id)}
                />
              </button> 
            </td>
          </tr>

          ))}
        </tbody>
      
      </ProductTable>

      <footer>
        <button type='button'>Finalizar pedido</button>
        <Total>
          <span>total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
    return total + product.price * product.amount
  }, 0))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
