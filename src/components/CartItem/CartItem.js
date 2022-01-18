const CartItem = (props) => {
  return (
    <tr key={props.id}>
      <td>
        <img width="100px" height="100px" src={props.photo} />
      </td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <td><button onClick={props.onClickDelete}>Delete</button></td>
    </tr>
  );
};

export default CartItem;
