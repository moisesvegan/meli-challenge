import React from 'react';
import { Link } from 'react-router-dom';
import shipping from '../../../assets/ic_shipping.png';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const { item } = this.props;

    const formattedPrice = Number(Math.round(item.price)).toLocaleString('es-AR', {
      style: 'currency',
      currency: item.currency_id,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return (
      <Link to={`/items/${item.id}`}>
        <section className="results-item">
          <section className="results-item__thumbnail">
            <img className="img" src={item.thumbnail} alt="" />
          </section>
          <section className="results-item__info">
            <h1 className="results-item__price">
              {formattedPrice}
              {item.shipping.free_shipping && (
                <img 
                  src={shipping} 
                  alt="icon-shipping" 
                  className="free-shipping-indicator" 
                />
              )}
            </h1>
            <h2 className="results-item__title">{item.title}</h2>
          </section>
        </section>
      </Link>
    );
  }
}
