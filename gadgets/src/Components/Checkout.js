import React, { useEffect, useState } from "react";
import AlertBox from "./AlertBox";
import "../Checkout.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apis } from "../api";
import { customerdetails } from "../features/products";
import { login } from "../features/products";

const Checkout = () => {
  const [paymentAlert, setPaymentAlert] = useState({
    isOpen: false,
    message: "",
  });
  const [addressVisible, setAddressVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");
  const customerdetails1 = useSelector((state) => state.customerdetails);
  const email = useSelector((state) => state.login);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  console.log("store of customer = ", customerdetails1);
  const currentUserCustomerDetails =
    customerdetails1?.filter((obj) => {
      return obj?.email == email;
    })?.[0] || {};
  console.log("current user data = ", currentUserCustomerDetails);
  let isAddressAvailable = currentUserCustomerDetails?.address || false;

  const [customerDetails, setCustomerDetails] = useState({
    name: currentUserCustomerDetails?.name || "",
    email: currentUserCustomerDetails?.email || email || "",
    mobile: currentUserCustomerDetails?.mobile || "",
  });
  const [newAddress, setNewAddress] = useState({
    address: currentUserCustomerDetails?.address || "",
    city: currentUserCustomerDetails?.city || "",
    state: currentUserCustomerDetails?.state || "",
    pincode: currentUserCustomerDetails?.pincode || "",
  });

  const [accordionOpen, setAccordionOpen] = useState({
    customer: true,
    payment: true,
  });

  useEffect(() => {
    isAddressAvailable = currentUserCustomerDetails?.address || false;
    setNewAddress({
      address: currentUserCustomerDetails?.address || "",
      city: currentUserCustomerDetails?.city || "",
      state: currentUserCustomerDetails?.state || "",
      pincode: currentUserCustomerDetails?.pincode || "",
    });
    setCustomerDetails({
      name: currentUserCustomerDetails?.name || "",
      email: currentUserCustomerDetails?.email || email || "",
      mobile: currentUserCustomerDetails?.mobile || "",
    });
  }, [currentUserCustomerDetails]);

  useEffect(() => {
    // Fetch products from the Django backend
    axios
      .get(apis.getuserdetails)
      .then((response) => {
        console.log("presenting...");
        console.log(response.data);
        dispatch(customerdetails(response.data)); //storing all data to the store
      })
      .catch((error) => {
        console.log("error");
        // Handle error if the request fails
      });
  }, []);

  const handleAccordionToggle = (section) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddAddress = () => {
    setAddressVisible(true);
    setEditingAddress(true);
  };

  const handleSaveAddress = async () => {
    // Logic to save the new address
    setAddressVisible(false);
    setEditingAddress(false);

    try {
      const response = await axios.post(
        isAddressAvailable ? apis.updateUserDetails : apis.Customerdetails,
        isAddressAvailable
          ? JSON.stringify({
              ...newAddress,
              ...customerDetails,
            })
          : {
              ...newAddress,
              ...customerDetails,
            }
      );
      alert("info added successfully!");
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error.response.data);
      alert("Error creating user. Please check your inputs.");
    }
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    // setPaymentAlert({
    //   isOpen: true,
    //   message: "Payment done!!!!!!!!!!!!!!!!!!!!!!!!",
    // });
    const response = await fetch("http://127.0.0.1:8000/api/create-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1 }), // Amount in INR
    });

    const data = await response.json();
    console.log(data);

    const options = {
      key: "rzp_test_nMswt4KC07UKyG",
      amount: data.amount,
      currency: "INR",
      name: "Gadget Galaxy",
      description: "Test Transaction",
      order_id: data.id,
      handler: async function (paymentResponse) {
        console.log("payment response", paymentResponse);
        try {
          console.log("payment response", JSON.stringify(paymentResponse));
        } catch (error) {}

        const response = await fetch(
          "http://127.0.0.1:8000/api/payment-callback/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentResponse),
          }
        );

        const data = await response.json();
        setPaymentAlert({
          isOpen: true,
          message:
            data?.status == "success"
              ? "Your Payment was done! Your order is confirmed."
              : "Your payment was failed!",
        });
      },
      prefill: {
        name: "Meet Shah",
        email: "meet1110shah@gmail.com",
        contact: "7990415710",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div>
        {paymentAlert?.isOpen && (
          <AlertBox
            message={paymentAlert?.message}
            onClose={() => {
              setPaymentAlert({
                isOpen: false,
                message: "",
              });
              navigate("/");
            }}
            okHandler={() => {
              setPaymentAlert({
                isOpen: false,
                message: "",
              });
              navigate("/");
            }}
            closeRequired={true}
          />
        )}
      </div>
      <div className="checkout-page">
        <div className="checkout-left">
          <div className="accordion-item">
            <button
              className={`accordion-header ${
                accordionOpen.customer ? "open" : ""
              }`}
              onClick={() => handleAccordionToggle("customer")}
            >
              Customer Details
              <span className="accordion-icon">
                {accordionOpen.customer ? "▲" : "▼"}
              </span>
            </button>
            <div
              className={`accordion-content ${
                accordionOpen.customer ? "visible" : ""
              }`}
            >
              <div className="user-contact">
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={customerDetails.name}
                  disabled={!!customerDetails.name}
                  style={{
                    backgroundColor: customerDetails.name ? "#f0f0f0" : "white",
                  }}
                  placeholder="Enter your name"
                />
                <label>Email ID:</label>
                <input
                  type="email"
                  value={email}
                  disabled={!!email}
                  placeholder="Enter your email"
                  style={{
                    backgroundColor: email ? "#f0f0f0" : "white",
                  }}
                />
                <label>Mobile No:</label>
                <input
                  type="tel"
                  value={customerDetails.mobile}
                  disabled={!!customerDetails.mobile}
                  placeholder="Enter your mobile number"
                  style={{
                    backgroundColor: customerDetails.mobile
                      ? "#f0f0f0"
                      : "white",
                  }}
                />
              </div>
            </div>
            <div
              className={`accordion-content ${
                accordionOpen.customer ? "visible" : ""
              }`}
            >
              {!editingAddress ? (
                <>
                  <div className="address-list">
                    <p>Address Details</p>
                    <div className="address-item">
                      <p>
                        <b>
                          {(newAddress?.address || "") +
                            ", " +
                            (newAddress?.city || "") +
                            ", " +
                            (newAddress?.state || "") +
                            "- " +
                            (newAddress?.pincode || "")}
                        </b>
                      </p>
                      <button onClick={() => setEditingAddress(true)}>
                        Edit
                      </button>
                    </div>
                    {/* <button onClick={handleAddAddress}>Add Address</button> */}
                  </div>
                </>
              ) : (
                <div className="address-form">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                  />
                  <label>City:</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                  <label>State:</label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                  <label>Pincode:</label>
                  <input
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                  />
                  <button onClick={handleSaveAddress}>Save Address</button>
                </div>
              )}
            </div>
          </div>

          <div className="accordion-item">
            <button
              className={`accordion-header ${
                accordionOpen.payment ? "open" : ""
              }`}
              onClick={() => handleAccordionToggle("payment")}
            >
              Payment Details
              <span className="accordion-icon">
                {accordionOpen.payment ? "▲" : "▼"}
              </span>
            </button>
            <div
              className={`accordion-content ${
                accordionOpen.payment ? "visible" : ""
              }`}
            >
              <div className="payment-details">
                <label>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => handlePaymentChange("COD")}
                  />
                  COD
                </label>
                <label>
                  <input
                    type="radio"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => handlePaymentChange("Online")}
                  />
                  Online Payment
                </label>
                {paymentMethod === "Online" && (
                  <button className="pay-now-button" onClick={handlePayment}>
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="order-item">
              <p>Product 1</p>
              <p>$100</p>
            </div>
            <div className="order-item">
              <p>Product 2</p>
              <p>$200</p>
            </div>
            <div className="order-total">
              <p>Total:</p>
              <p>$300</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
