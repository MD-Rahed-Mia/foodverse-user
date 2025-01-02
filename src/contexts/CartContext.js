import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const useCartContext = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    return localCart;
  });

  // total for cart
  const [cartTotal, setCartTotal] = useState(0);

  // addons
  const [addonTotal, setAddonTotal] = useState(0);

  // discount
  const [discount, setDiscount] = useState(20);

  useEffect(() => {
    const total = cart.reduce((total, item, index) => {
      return (total = total + item.offerPrice * item.quantity);
    }, 0);

    const addon = cart.reduce((total, item, index) => {
      return (total += item.addonValue || 0);
    }, 0);

    setAddonTotal(addon);

    setCartTotal(total);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add new item to cart
  function handleAddToCart(item) {
    const existingRestaurant = localStorage.getItem("cartRest");
    // console.log("item is: ", item);

    const itemId = item._id;
    // console.log(itemId)

    const isExist = cart.findIndex((item, index) => {
      return item._id === itemId;
    });
    if (isExist !== -1) {
      toast.error("item already in cart.");
      return;
    }

     console.log(existingRestaurant);

     console.log("items restaurantId ", item.restaurantId._id);

    // Check if the cart already has items from a different restaurant
    if (existingRestaurant && existingRestaurant.toString() !== item.restaurantId._id) {
      toast((t) => (
        <span className="shadow-lg border py-3 px-1">
          You have already another restaurant items in your cart.
          <button
            className="bg-red-400 px-2 py-1 rounded-md text-white"
            onClick={() => {
              localStorage.setItem("cart", JSON.stringify([]));
              localStorage.setItem("cartRest", "");
              setCart([]);
              localStorage.setItem("cartRest", item.restaurantId._id);
              setCart((prev) => [...prev, item]);
              toast.success("Item add to cart.");
              toast.dismiss(t.id);
            }}
          >
            Reset Cart & Add Item?
          </button>
          <button
            className="bg-red-600 text-white block px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Close
          </button>
        </span>
      ));
      return false;
    }

    // If it's the first item or from the same restaurant
    localStorage.setItem("cartRest", item.restaurantId._id);
    setCart((prev) => [...prev, item]);

    toast.success("Item add to cart.");
  }

  // increase quantity in cart
  function handleIncreaseQuantity(id) {
    const updateQuantity = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updateQuantity);
  }

  // handle decrease quantity
  function handleDecreaseQuantity(id) {
    const updateQuantity = cart.map((item) => {
      if (item._id === id) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }

      return item;
    });

    setCart(updateQuantity);
  }

  // remove item from cart
  function handleRemoveItem(id) {
    const updatedCart = cart.filter((item) => item._id !== id);

    if (updatedCart.length === 0) {
      localStorage.removeItem("cartRest");
    }
    setCart(updatedCart);
    toast.success("Item remove from cart.");
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        cartTotal,
        handleRemoveItem,
        addonTotal,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
