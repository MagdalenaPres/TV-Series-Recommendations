import React, { Component } from "react";
import axios from "axios";

const productURL = "http://127.0.0.1:5000/products";
const categoryURL = "http://127.0.0.1:5000/category";
const logoutURL = "http://127.0.0.1:5000/logout";
const addProductURL = "http://127.0.0.1:5000/add";
const deleteProductURL = "http://127.0.0.1:5000/delete/";
const editProductURL = "http://127.0.0.1:5000/edit";

class Manage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      modalTitle: "",
      product_id: 0,
      category_id: "Posters",
      name: "",
      price: "",
      category: "",
      photo:
        "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg"
    };
  }

  refreshList() {
    fetch(productURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
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

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };
  changeCategory = (e) => {
    this.setState({ category_id: e.target.value });
  };
  changePrice = (e) => {
    this.setState({ price: e.target.value });
  };
  changePhoto = (e) => {
    this.setState({ photo: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Product",
      product_id: 0,
      category_id: "Posters",
      name: "",
      price: "",
      photo: "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg",
    });
  }
  editClick(prod) {
    this.setState({
      modalTitle: "Edit Product",
      product_id: prod.product_id,
      name: prod.name,
      price: prod.price,
      category_id: prod.category.name,
      photo: prod.photo
    });
    console.log(prod.category_id)
  }

  createClick() {
    fetch(addProductURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        category_id: this.state.category_id,
        photo: this.state.photo,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("New product successfully added");
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(editProductURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: this.state.product_id,
        name: this.state.name,
        price: this.state.price,
        category_id: this.state.category_id,
        photo: this.state.photo
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Product edited");
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(deleteProductURL + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert("Product successfully deleted ");
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  logoutClick() {
    axios
      .post(logoutURL)
      .then((response) => {
        this.props.token()
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  render() {
    const {
      products: products,
      categories: categories,
      modalTitle,
      product_id,
      name,
      price,
      category_id,
      category,
      photo,
    } = this.state;
    return (
      <section className="body">
        <div className="manage-page">
          <button
            id="add-prod-button"
            type="button"
            className="button-category"
            onClick={() => this.logoutClick()}
          >
            Logout
          </button>
          <button
            id="add-prod-button"
            type="button"
            className="button-category"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.addClick()}
          >
            Add Product
          </button>
          <div className="table-prod">
            <table className="table-products">
              <thead>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Options</th>
              </thead>
              <tbody>
                {products.map((prod) => (
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
                    <td>{prod.category.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.editClick(prod)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        className="btn btn-light mr-1"
                        onClick={() => this.deleteClick(prod.product_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={this.changeName}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Price</span>
                    <input
                      type="text"
                      className="form-control"
                      value={price}
                      onChange={this.changePrice}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Category</span>
                    <select
                      className="form-select"
                      onChange={this.changeCategory}
                      value={category.name}
                    >
                      {categories.map((cat) => (
                        <option key={cat.category_id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Photo Link</span>
                    <input
                      type="text"
                      className="form-control"
                      value={photo}
                      onChange={this.changePhoto}
                    />
                  </div>
                  {product_id === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.createClick()}
                    >
                      Create
                    </button>
                  ) : null}
                  {product_id !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.updateClick()}
                    >
                      Update
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Manage;
