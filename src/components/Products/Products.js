import React, {Component} from 'react';
import { ProductDetails } from './ProductDetails';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

const productURL = "http://127.0.0.1:5000/product";
const categoryURL = "http://127.0.0.1:5000/category";

export class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            modalTitle: "",
            Id: 0,
            Name: "",
            Price: "",
            CategoryId: "",
            Photo: "piesel2.png",

            CategoryNameFilter: "",
            categoriesWithoutFilter: []
        }
    }
    
    refreshList() {
        fetch(productURL + this.props.match.params.name)
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
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

    render() {
        const {
            categories: categories,
            products: products,
            modalTitle,
            Id,
            Name,
            Price,
            CategoryId,
            Photo
        } = this.state;

        return (
            <section className="body">
            <div>
                <table className="table table-striped">
                    <tbody>
                        {products.map(prod =>
                            <tr key={prod.Id}>
                                <td>
                                    <NavLink to={'/productdetails/' + prod.Id}>
                                        <img width="250px" height="250px" src={Photo} />
                                    </NavLink></td>
                                <td><NavLink to={'/productdetails/' + prod.Id}>
                                    {prod.Name}
                                </NavLink></td>
                                <td>{prod.Price}</td>
                                <td>{prod.Category.Name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </section>
        )
    }
}