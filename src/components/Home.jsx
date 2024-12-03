import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import productList from "../products.json"; // Importing the product list

// Home component displays the list of products
const Home = () => {
  const dispatch = useDispatch();

  // Handler to add an item to the cart
  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" }); // Recalculate prices after adding an item
    toast.success("Added To Cart"); // Show success notification
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Display each product as a card */}
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

// ProductCard component displays a single product
const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
    <img src={imgSrc} alt={name} className="w-32 h-32 object-cover mb-2" />
    <p className="font-semibold">{name}</p>
    <h4 className="text-lg font-bold">${price}</h4>
    {/* Add to cart button */}
    <button
      onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  </div>
);

export default Home;
