import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

const productURL = "http://127.0.0.1:5000/products";
const categoryURL = "http://127.0.0.1:5000/category";

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            modalTitle: "",
            _id: 0,
            _name: "",
            _price: "",
            _categoryId: "",
            _photo: "",

            CategoryNameFilter: "",
            categoriesWithoutFilter: []
        }
    }
    
    refreshList() {
        fetch(productURL)
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
                console.log(data);
            });

        fetch(categoryURL)
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillReceiveProps()
    {
        this.refreshList();
        window.location.reload(false);
    }
    addToCart() {
        //something here
    }

    render() {
        const {
            categories: categories,
            products: products,
            modalTitle,
            _id,
            _name,
            _price,
            _categoryId,
            _photo
        } = this.state;

        return (
            <section className="body">
            <p id="header-products">All products</p>
            <div className="table-prod">
                <table className="table-products">
                    <thead>
                    <th>
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Options
                    </th>
                    </thead>
                    <tbody>
                        {products.map(prod =>
                            <tr key={prod._id}>
                                <td><img width="250px" height="250px" src={prod._photo} /></td>
                                <td>{prod._name}</td>
                                <td>{prod._price}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.addToCart()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
                                        </svg>  
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </section>
        )
    }
}
export default Products;