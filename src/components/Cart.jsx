import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

// Cart component displays the list of cart items and a summary with subtotal, tax, shipping, and total.
const Cart = () => {
  // Accessing cart details and prices from the Redux store
  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  // Handler to increment the quantity of a specific item in the cart
  const increment = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculatePrice" }); // Recalculate prices after increment
  };

  // Handler to decrement the quantity of a specific item in the cart
  const decrement = (id) => {
    dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculatePrice" }); // Recalculate prices after decrement
  };

  // Handler to remove an item from the cart
  const deleteHandler = (id) => {
    dispatch({ type: "deleteFromCart", payload: id });
    dispatch({ type: "calculatePrice" }); // Recalculate prices after deletion
  };

  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Main content displaying the cart items */}
      <main className="col-span-3 p-4 overflow-auto">
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              key={i.id}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1 className="text-center text-gray-500 text-xl">No Items Yet</h1>
        )}
      </main>

      {/* Sidebar displaying the price breakdown */}
      <aside className="bg-gray-300 text-gray-800 p-4 flex flex-col justify-between shadow-md">
        <div>
          <h2 className="text-lg font-medium">Subtotal: ${subTotal}</h2>
          <h2 className="text-lg font-medium">Shipping: ${shipping}</h2>
          <h2 className="text-lg font-medium">Tax: ${tax}</h2>
          <h2 className="text-xl font-bold text-green-600">Total: ${total}</h2>
        </div>
        <button className="bg-green-500 py-2 px-4 rounded text-white hover:bg-green-600">
          Checkout
        </button>
      </aside>
    </div>
  );
};

// CartItem component represents a single item in the cart
const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="flex items-center justify-between mb-4 p-4 border rounded bg-gray-50 shadow-sm">
    <img src={imgSrc} alt="Item" className="w-16 h-16 object-cover rounded" />
    <div className="flex-grow px-4 text-gray-700">
      <h3 className="font-semibold text-blue-600">{name}</h3>
      <p className="text-sm text-gray-600">${price}</p>
    </div>
    <div className="flex items-center">
      {/* Buttons to increment and decrement quantity */}
      <button
        onClick={() => decrement(id)}
        className="px-2 text-white bg-red-400 rounded hover:bg-red-500"
      >
        -
      </button>
      <p className="px-4 text-gray-700">{qty}</p>
      <button
        onClick={() => increment(id)}
        className="px-2 text-white bg-green-400 rounded hover:bg-green-500"
      >
        +
      </button>
    </div>
    {/* Delete button to remove item */}
    <AiFillDelete
      onClick={() => deleteHandler(id)}
      className="text-red-600 cursor-pointer hover:text-red-800 ml-10 text-2xl"
    />
  </div>
);

export default Cart;
