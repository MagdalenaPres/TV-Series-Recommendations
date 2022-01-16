import React, { Component } from 'react';
import { useHistory, BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'

const productURL = "http://127.0.0.1:5000/products";
const categoryURL = "http://127.0.0.1:5000/category";

class Cart extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            cart: [],
            modalTitle: "",
            _id: 0,
            _name: "",
            _price: "",
            _categoryId: "",
            _photo: ""
        }
    }
    getCookies(){
        this.cart = Cookies.get('cart')
    }

    componentDidMount() {
        this.getCookies()
    }

    render() {
        const {
            categories: categories,
            products: products,
            cart: cart,
            modalTitle,
            _id,
            _name,
            _price,
            _categoryId,
            _photo
        } = this.state;

        return (
            <section className="body">
            <p id="page-name">Cart</p>
            <div>                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            </section>
        )
    }
}
export default Cart;