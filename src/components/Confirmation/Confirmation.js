const Confirmation = (props) => {
    return ( 
        <div>
            <p id="page-name">Thank you for your order </p>
            <p id="page-name">Pay {props.price} for the order </p>
        </div>
     );
}
 
export default Confirmation;