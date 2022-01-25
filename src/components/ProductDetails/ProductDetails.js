import React, { Component } from 'react';

class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: [],
            opinions: [], 
            modalTitle: "",
            PhotoName: "",
            Contents: "",
            IsAnnonymous: false
        }
    }

    refreshList() {

        fetch('product/one/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ product: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    
    render() {
        const {
            product,
            modalTitle,
            PhotoName,
            PhotoPath
        } = this.state;

        return (
            <section className="body">
                <div className="top-rows">
                <h5 className="modal-title">{modalTitle}</h5>
                <div className="prod-details-img">
                    {product.map(emp => 
                        <p key={emp.Id}>
                            <img width="350px" height="300px" src={PhotoPath + emp.PhotoName}/>
                        </p>
                    )}
                </div>
                <div className="prod-details-det">
                    <div id="border">
                        {product.map(emp => 
                        <p key={emp.Id}>
                            <p id="prod-name"><strong>{emp.Name}</strong></p>
                            <p id="prod-price" fontWeight="bold">{emp.Price}$</p>
                        </p>
                        )}
                        <p><button className="button-style" onClick={() => this.addToCart()}>Add to cart</button></p>
                    </div>
                </div> 
            </div>
            </section>
        )
    }
}
export default ProductDetails;