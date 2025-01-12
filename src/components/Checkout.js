import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_path_url, authToken } from "../secret";
import toast from "react-hot-toast";
import Header from "./Header";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { useCartContext } from "../contexts/CartContext";
import { useSocket } from "../contexts/SocketIo";
import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import Loading from "./Loading";
import AddressCarousel from "./address/AddressCarousel";
import AsapCalculator from "./calc-function/AsapCalculator";

const CheckoutPage = () => {
  const location = useLocation();

  // place holder loading
  const [placeHolderLoading, setPlaceHolderLoading] = useState(null);

  // drop coords
  const [dropCoords, setDropCoords] = useState({
    lat: 0,
    long: 0,
  });

  // useEffect(() => {
  //   console.log(`drop coords are : `, dropCoords);
  // }, [dropCoords]);

  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // socket io
  const socket = useSocket();

  //payment status
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [deliveryChargeLoading, setDeliveryChargeLoading] = useState(null);

  // const queryParams = new URLSearchParams(location.search);
  // const passedSubtotal = parseFloat(queryParams.get("subtotal")) || 0; // Retrieve subtotal from URL query parameters
  // console.log(passedSubtotal);

  const { cartTotal, discount, addonTotal } = useCartContext();

  const [loadingAddress, setLoadingAddress] = useState(null);
  const [addressList, setAddressList] = useState(null);

  const [addressLabel, setAddressLabel] = useState(null);

  // current charge list
  const [chargeList, setChargeList] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    // get chargeList
    async function getChargeList() {
      try {
        const { data } = await axios.get(
          `${api_path_url}/charges/active-schedule`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        console.log(data);
        setChargeList(data.charges[0]);
      } catch (error) { }

      // if (data.success) {
      //   console.log(`charges is : ${data.charges[0]}`);
      //   setChargeList(data.charges[0]);
      // } else {
      //   toast.error("something went wrong. Please try again.");
      // }
    }

    getChargeList();
  }, []);

  useEffect(() => {
    console.log("charge list : ", chargeList);
  }, [chargeList]);

  // check delivery charge
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // distance
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    async function fetchAndCalculate() {
      setDeliveryChargeLoading(true);
      async function getRestaurantCoordinator() {
        const localRestaurantId = localStorage.getItem("cartRest");

        try {
          const { data } = await axios.get(
            `${api_path_url}/restaurant/address/coordinator?id=${localRestaurantId}`,
            {
              headers: {
                "x-auth-token": authToken,
              },
            }
          );

          console.log(data);

          if (data.success) {
            return {
              latitude: data.coordinator.lat,
              longitude: data.coordinator.long,
            };
          } else {
            toast.error("Failed to get restaurant location.");
            return null;
          }
        } catch (error) {
          toast.error("Error fetching restaurant location.");
          console.error(error);
          return null;
        }
      }
      const coordinator = await getRestaurantCoordinator();
      console.log(coordinator); // Logs resolved value of the promise

      if (coordinator && addressLabel) {
        const result = calculateDistance(
          addressList[addressLabel]?.latitude,
          addressList[addressLabel]?.longitude,
          parseFloat(coordinator.latitude),
          parseFloat(coordinator.longitude)
        );

        setDistance(result);

        const firstKm = chargeList?.userFirstKMCharge;

        // console.log(chargeList);

        if (result <= 1) {
          setDeliveryCharge(chargeList?.userFirstKMCharge);
          setRiderFee(chargeList?.riderFirstKMCharge);
        } else {
          const resultAfterOneKM = result - 1;
          const othersKMFee = resultAfterOneKM * chargeList?.userOthersKMCharge;
          const totalFee = firstKm + othersKMFee;

          console.log(totalFee);

          setDeliveryCharge(totalFee);

          // calculate rider fee
          const ridersFeeForOthersKM =
            resultAfterOneKM * chargeList?.riderOthersKMCharge;
          const riderTotalFee = 20 + ridersFeeForOthersKM;
          setRiderFee(riderTotalFee);

          console.log(`rider fee for delivery : ${riderTotalFee}`);
        }
        setDeliveryChargeLoading(false);
      }
    }

    if (addressLabel) {
      fetchAndCalculate();
    }
  }, [addressLabel]);

  // useEffect(() => {
  //   console.log(addressLabel);
  // }, [addressLabel]);

  useEffect(() => {
    async function getDeliveryLocationList() {
      const id = Cookies.get("id");
      try {
        const { data } = await axios.get(
          `${api_path_url}/user/delivery/location?id=${id}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        console.log('restaurant coordinatior: ', data);

        if (data.success) {
          setAddressList(data.address);
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    getDeliveryLocationList();
  }, []);

  const [tip, setTip] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [instructions, setInstructions] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  // rider fee for rider
  const [riderFee, setRiderFee] = useState(0);

  const [showBkashModal, setShowBkashModal] = useState(false); // Modal for Bkash
  const [isProcessing, setIsProcessing] = useState(false); // Processing state
  const [selectedNumber, setSelectedNumber] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0); // মোট এমাউন্ট

  const [placeOrderConfirmation, setPlaceOrderConfirmation] = useState(false);

  // cart
  const { cart, setCart } = useCartContext();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (selectedAddress === undefined || selectedAddress === "") {
      toast.error("please select delivery location");
      return;
    }

    // Check if payment method is Bkash
    if (paymentMethod === "Bkash") {
      try {
        setIsProcessing(true); // Show processing state

        // Prepare data for bKash payment
        const bkashData = {
          amount: totalAmount + tip + deliveryCharge, // Total amount including tip and delivery
        };

        // Call backend API to get bKash payment link
        const bkashResponse = await axios.post(
          `${api_path_url}/bkash-payment`,
          bkashData,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": authToken, // Auth token for security
            },
          }
        );

        if (bkashResponse.data.success) {
          // Redirect to the bKash payment URL
          const bkashLink = bkashResponse.data.bkashURL; // Backend should return this
          window.location.href = bkashLink; // Redirect user to bKash website
        } else {
          toast.error("Failed to initiate Bkash payment."); // Show error message
        }
      } catch (error) {
        console.error("Bkash payment error:", error); // Log error for debugging
        toast.error("Something went wrong with Bkash payment."); // Show error to user
      } finally {
        setIsProcessing(false);
        setPlaceHolderLoading(false); // Stop processing state
      }
    } else {
      placeOrder(); // Place order directly for other methods
    }
  };

  // ফাংশন: অর্ডার প্রসেসিং
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsProcessing(true);
    setPlaceHolderLoading(true);
    try {
      const orderData = {
        tip: tip,
        paymentMethod,
        totalAmount: cartTotal + tip + deliveryCharge,
        restaurantId: cart[0].restaurantId,
        userId: user.id,
        items: [...cart],
        deliveryAmount: deliveryCharge,
        dropLocation: selectedAddress,
        restaurantLocation: null,
        customerMessage: instructions,
        discount,
        addonTotal,
        customerPhone: selectedNumber,
        riderFee: riderFee,
        coords: {
          lat: dropCoords.lat,
          long: dropCoords.long,
        },
      };

      const response = await axios.post(
        `${api_path_url}/order/create`,
        { data: orderData },
        {
          headers: {
            "x-auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        if (socket && socket.connected) {
          socket.emit("sendOrderToRestaurant", response.data.result);
        } else {
          console.warn("Socket is not connected. Order notification not sent.");
        }

        navigate("/");
        toast.success("Order placed successfully!");
        localStorage.setItem("cartRest", "");
        setCart([]);
        setPlaceHolderLoading(false);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);

      setShowBkashModal(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const result = queryParams.get("payment");
    setPaymentStatus(result);

    console.log(result);
  }, [location]);

  // send order when status is changing
  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("place order successful.");
      setCart([]);
      navigate("/");
    } else if (paymentStatus === "cancel") {
      toast.error(paymentStatus);
    } else if (paymentStatus === "failure") {
      toast.error(paymentStatus);
    }
  }, [paymentStatus]);

  const handleBkashPayment = async () => {
    // Simulating Bkash API call with provided credentials
    setIsProcessing(true);

    try {
      const id = Cookies.get("id");

      if (!id) {
        toast.error("failed to get user id. Please re-login.");
        return;
      }
      const orderData = {
        tip: tip,
        paymentMethod: "Bkash",
        totalAmount: cartTotal + tip + deliveryCharge,
        restaurantId: cart[0].restaurantId,
        userId: id,
        items: [...cart],
        deliveryAmount: deliveryCharge,
        dropLocation: selectedAddress,
        restaurantLocation: null,
        customerMessage: instructions,
        discount,
        addonTotal,
        customerPhone: selectedNumber,
        riderFee: riderFee,
      };

      //   console.log("alert method: ");

      const { data } = await axios.post(
        `${api_path_url}/bkash/payment/create`,
        {
          ...orderData,
        },
        {
          headers: {
            "x-auth-token": process.env.REACT_APP_API_TOKEN,
          },
          withCredentials: true,
        }
      );

      // console.log(data);

      if (data.success) {
        window.location.href = data.bkashURL;
      }
    } catch (error) {
      console.error("Bkash payment error:", error);
      toast.error("Bkash payment failed. Try again.");
    } finally {
      setIsProcessing(false);
      setShowBkashModal(false);
    }
  };

  // ফাংশন: টিপ পরিবর্তন করা
  const handleTipChange = (amount) => {
    setTip(amount);
  };
  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);

  return (
    <div className="relative">
      <Header title={"Checkout"} />
      <div className="max-w-lg mx-auto p-4 space-y-6 mb-24 pt-24">
        {/* Delivery Section */}
        <section className="space-y-2 border rounded-sectionmd py-2">
          <h2 className="text-xl font-bold text-center">Estimated Delivery</h2>
          {/* <div className="flex item-center justify-center">
            <MdDeliveryDining className="size-6 mx-1 text-purple-600" />
            <p className="text-center text-blue-600 font-bold">Asap (33 min)</p>
          </div> */}
          <AsapCalculator distance={distance} />
        </section>
        {/* Delivery fee */}

        {/* Delivery Address Section */}

        {deliveryChargeLoading ? (
          <section className="text-center">
            <h1>Loading...</h1>
          </section>
        ) : (
          <section className="text-center">
            {deliveryCharge !== 0 ? (
              <p>Delivery Charge: {deliveryCharge.toFixed()} TK</p>
            ) : (
              <h1>Please select delivery address to see delivery charge.</h1>
            )}
          </section>
        )}

        {/* carosuel address */}
        {addressList === null ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <AddressCarousel
            addressList={addressList}
            setSelectedAddress={setSelectedAddress}
            setSelectedNumber={setSelectedNumber}
            setAddressLabel={setAddressLabel}
            setDropCoords={setDropCoords}
          />
        )}

        {/* Tip Section */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Tip your rider</h3>
          <div className="flex justify-between">
            {[0, 10, 20, 30, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => handleTipChange(amount)}
                className={`px-2 py-1 text-sm border rounded-md ${tip === amount
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                TK {amount}
              </button>
            ))}
            <input
              type="number"
              placeholder="0"
              min={0}
              className={`max-w-[60px]  appearance-none border rounded-md text-sm px-2 py-1 bg-gray-100`}
              onChange={(e) => {
                handleTipChange(Number(e.target.value));
              }}
            />
          </div>
        </section>

        {/* Payment Method Section */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              {paymentMethod === "Cash on Delivery" ? (
                <GiTakeMyMoney className="size-6 text-purple-600" />
              ) : (
                <img src="/img/bkash.webp" className="max-w-12" alt="bkash" />
              )}
              <p className="ml-2 font-bold">{paymentMethod}</p>
            </div>
            <button
              onClick={() =>
                setPaymentMethod(
                  paymentMethod === "Cash on Delivery"
                    ? "Bkash"
                    : "Cash on Delivery"
                )
              }
              className="text-blue-600 font-semibold"
            >
              Change
            </button>
          </div>
        </section>

        {/* Additional Instructions Section */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Add additional instructions</h3>
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Add some instructions for the restaurant"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </section>
        {/* Order Details */}
        <div className="bg-white rounded-lg">
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Subtotal</p>
            <p>TK {cartTotal}</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Rider Tip</p>
            <p>TK {tip}</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Delivery Charge</p>
            <p>TK {deliveryCharge.toFixed()}</p>
          </div>

          <div className="flex justify-between py-2">
            <p className="text-gray-700">Discount</p>
            <p>TK {discount}</p>
          </div>
        </div>
      </div>
      {/* Order Summary and Place Order */}
      <section className=" fixed w-full bottom-0 left-0 bg-white z-50 px-4 pb-4">
        <div className="flex justify-between py-2 font-bold text-xl border-t-2 text-blue-600">
          <p>Total</p>
          <div className="flex items-center">
            <GiTakeMyMoney className="size-6 text-purple-600 mx-1" />
            <p>TK {(cartTotal + tip + deliveryCharge - discount).toFixed()}</p>
          </div>
        </div>
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold"
          disabled={deliveryChargeLoading}
          onClick={
            paymentMethod === "Bkash"
              ? () => setShowBkashModal(true)
              : () => setPlaceOrderConfirmation(true)
          }
        >
          {deliveryChargeLoading
            ? "Loading... Delivery Charge..."
            : "Confirm Order"}
        </button>
      </section>

      {/* place order confirmation */}
      {placeOrderConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h1 className="text-lg font-semibold mb-4">Place your order</h1>
            {/* <input
              type="text"
              placeholder="Enter your Bkash number"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            /> */}
            <button
              onClick={handlePlaceOrder}
              disabled={placeHolderLoading}
              className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed py-2 bg-blue-600 text-white rounded-lg font-bold"
            >
              {placeHolderLoading ? (
                <h1>Loading....</h1>
              ) : (
                <span>Place order</span>
              )}
            </button>
            <button
              onClick={() => setPlaceOrderConfirmation(false)}
              className="w-full py-2 mt-2 bg-gray-300 text-black rounded-lg font-bold"
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bkash Modal */}
      {showBkashModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Bkash Payment</h3>
            {/* <input
              type="text"
              placeholder="Enter your Bkash number"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            /> */}
            <button
              onClick={handleBkashPayment}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold"
            >
              Go to payment method
            </button>
            <button
              onClick={() => setShowBkashModal(false)}
              className="w-full py-2 mt-2 bg-gray-300 text-black rounded-lg font-bold"
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
