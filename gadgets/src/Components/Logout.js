import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/products";
import AlertBox from "./AlertBox"; // Assuming you have an AlertBox component

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });

  const handleLogoutClick = () => {
    // Show confirmation alert
    setAlert({
      isOpen: true,
      message: "Are you sure you want to logout?",
    });
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const hoverStyle = {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  };

  const activeStyle = {
    backgroundColor: "#004085",
    transform: "scale(0.98)",
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = hoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyle.backgroundColor)
        }
        onMouseDown={(e) => {
          e.target.style.backgroundColor = activeStyle.backgroundColor;
          e.target.style.transform = activeStyle.transform;
        }}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = hoverStyle.backgroundColor;
          e.target.style.transform = hoverStyle.transform;
        }}
      >
        Logout
      </button>

      {/* Render the AlertBox if the alert is open */}
      {alert.isOpen && (
        <AlertBox
          message={alert.message}
          okHandler={() => {
            // Perform the logout action
            dispatch(logout()); // Dispatch the logout action
            navigate("/login"); // Redirect to the login page
            setAlert({ isOpen: false, message: "" });
          }}
          onClose={() => setAlert({ isOpen: false, message: "" })}
          closeRequired={true}
        />
      )}
    </>
  );
};

export default LogoutButton;
