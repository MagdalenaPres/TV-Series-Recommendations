import React, { Component } from "react";
import Cookies from "js-cookie";

const productURL = "http://127.0.0.1:5000/products";
const categoryURL = "http://127.0.0.1:5000/category";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      current_products: [],
      items_in_cart: 0,
    };
  }

  refreshList() {
    fetch(productURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data, current_products: data });
      });

    fetch(categoryURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  componentDidMount() {
    this.refreshList();
    this.count_items_in_cart();
  }

  filterResult(category) {
    this.state.current_products = [];

    if (category === "All") {
      this.setState({ current_products: this.state.products });
    } else {
      for (let i in this.state.products) {
        this.setState({ current_products: this.state.current_products });
        if (category === this.state.products[i].category.name) {
          this.state.current_products.push(this.state.products[i]);
        }
      }
    }
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

  count_items_in_cart() {
    if (Cookies.get("cart")) {
      const cookies = Cookies.get("cart");
      const items_in_cart = JSON.parse(cookies)
        .map((item) => item._quantity)
        .reduce((prev, next) => prev + next, 0);

      this.setState({ items_in_cart: items_in_cart });
    }
  }

  render() {
    const { current_products: current_products, items_in_cart: items_in_cart } =
      this.state;

    return (
      <section className="body">
        <div className="cartCounter">
          <h3>W koszyku: {items_in_cart} </h3>
        </div>
        <div className="table-prod">
          <div className="category-buttons">
            <button
              type="button"
              className="button-category"
              onClick={() => this.filterResult("All")}
            >
              All
            </button>
            <button
              type="button"
              className="button-category"
              onClick={() => this.filterResult("Posters")}
            >
              Posters
            </button>
            <button
              type="button"
              className="button-category"
              onClick={() => this.filterResult("TV Series DVD")}
            >
              TV Series on DVD
            </button>
            <button
              type="button"
              className="button-category"
              onClick={() => this.filterResult("Gadgets")}
            >
              Gadgets
            </button>
          </div>
          <table className="table-products">
            <thead>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Options</th>
            </thead>
            <tbody>
              {current_products.map((prod) => (
                <tr key={prod.product_id}>
                  <td>
                    <img
                      alt="product"
                      width="250px"
                      height="250px"
                      src={prod.photo}
                    />
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light mr-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => this.addToCart(prod)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bag-plus-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
      </section>
    );
  }
}
export default Products;
