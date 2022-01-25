import React, { Component } from 'react';
import Cookies from "js-cookie";

const productURL = "http://127.0.0.1:5000/products/";
const categoryURL = "http://127.0.0.1:5000/category";

class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            product: []
        }
    }

    refreshList() {
        fetch(productURL + this.props.match.params.id)
          .then((response) => response.json())
          
          .then((data) => {
            this.setState({ product: data });
        });
    
        fetch(categoryURL)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ categories: data });
        });
    }

    componentDidMount() {
        this.refreshList();
    }
    addToCart(prod) {
        const cookies = Cookies.get("cart");
        let newCart = [];
        if (cookies === undefined) {
          prod._quantity = 1;
          newCart = [prod];
        } else {
          const isInCart = JSON.parse(cookies).find(
            (product) => product.product_id === prod.product_id
          );
    
          if (isInCart !== undefined) {
            newCart = JSON.parse(cookies).map((product) => {
              if (product.product_id === prod.product_id) {
                product._quantity += 1;
              }
              return product;
            });
          } else {
            prod._quantity = 1;
            newCart = [...JSON.parse(cookies), prod];
          }
        }
        const objectString = JSON.stringify(newCart);

        Cookies.set("cart", objectString, { expires: 7, sameSite: "strict" });
        this.count_items_in_cart();
    }

    render() {
        const { product: product } = this.state;
   
    return (
        <section className="body">
            <div className="top-rows">
            <div className="prod-details-img"> 
                <img width="320px" height="330px" src={product.photo}/>    
            </div>
            <div className="prod-details-det">
                <div id="border">
                    <p id="prod-name"><strong>{product.name}</strong></p>
                    <p id="prod-price" fontWeight="bold">{product.price}$</p>
                    <p><button className="button-form" onClick={() => this.addToCart(product)}>Add to cart</button></p>
                </div>
            </div> 
        </div>
        </section>
    )
    }
    
}
export default ProductDetails;