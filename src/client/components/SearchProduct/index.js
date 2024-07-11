import React from 'react';
import axios from 'axios';
import SearchBox from '../SearchBox';
import Loading from '../Loading';
import Breadcrumbs from '../Breadcrums';

export default class SearchProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadProductsFromServer();
  }

  loadProductsFromServer() {
    axios.get(`http://localhost:8080/api/items/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ product: res.data });
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { product } = this.state;

    if (!product || !product.item) {
      return <Loading />;
    }

    const { item, categories } = product;

    const formattedPrice = `$ ${Number(Math.round(item.price.amount)).toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

    return (
      <section>
        <div className="body-content">
          <section>
            {categories ? (
              <Breadcrumbs
                categories={categories}
              />
            ) : ''}
          </section>
          <section className="product-body">
            <div className="product-card">
              <div className="product-image">
                <img
                  src={item.picture.secure_url}
                  alt="Imagen del Producto"
                />
              </div>
              <div className="product-resume">
                <div>
                  <small className="product-usage">
                    {item.condition === 'new' ? 'Nuevo' : 'Usado'}
                    <span>&nbsp;-&nbsp;</span>
                    {item.sold_quantity} vendidos
                  </small>
                </div>
                <p className="product-title">
                  {item.title}
                </p>
                <h2 className="item-price">
                  <span>{formattedPrice}</span>
                </h2>
                <button type="button" className="item-buy-button">
                  Comprar
                </button>
                <button className="item-add-cart">Agregar al carrito</button>
              </div>
            </div>
            <div className="product-description">
              <h3 className="description__h3">Descripción del producto</h3>
              <p className="description__p">
                {item.description}
              </p>
            </div>
          </section>
        </div>
      </section>
    );
  }
}
