import React from "react";
import { useCartContext } from "../cart/useCart";

export default function CartContainer({ item, setLoad, load }) {
  const { increaseQuantity, decreaseQuantity } = useCartContext();
  const [quantity, setQuantity] = React.useState(item.quantity);

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
      <img
        src="./img/burger.png"
        alt="Product"
        className="w-16 h-16 rounded-md object-cover"
      />
      <div className="ml-3 flex-grow">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-800">TK {item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="text-blue-500 border-2 border-blue-500 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => {
            if (quantity === 1) return false;
            setLoad(!load);
            setQuantity((prev) => prev - 1);
            decreaseQuantity(item._id);
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => {
            setLoad(!load);
            setQuantity((prev) => prev + 1);
            increaseQuantity(item._id);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
