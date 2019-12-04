import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdAddShoppingCart } from 'react-icons/md'
import { formatPrice } from '../../util/format'
import api from '../../service/api'

import * as CartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles';



const  Home = (props) => {
  const [dados, setDados] = useState([])

  useEffect(() => {
    getAPi()
  }, [])

 const getAPi = async () => {
    const response = await api.get('products')
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))
    setDados(data)
  }

  const handleAddProduct = (product) => {
    const { addToCart } = props
    

    addToCart(product)
  }

  return (
    <ProductList>
    { dados.map(product => (
      <li key={product.id}>
        <img src={product.image} alt={product.title} />
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>
        <button type='button' onClick={() => handleAddProduct(product)}>
          <div>
            <MdAddShoppingCart size={16} color='#fff' />{' '}
            {props.amount[product.id] || 0}
           
          </div>

          <span>Adicionar ao Carriho</span>
        </button>
      </li>

    ))}     
      
    
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount
    return amount
  }, {})
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Home)