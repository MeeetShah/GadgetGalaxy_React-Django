import "./App.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Displayspecific from "./Components/Displayspecific";
import Contactus from "./Components/Contactus";
import Cartpage from "./Components/Cartpage";
import LogoutButton from "./Components/Logout";
import Customerdetails from "./Components/Customerdetails";
import Checkout from "./Components/Checkout";
import { useSelector } from "react-redux";

function App() {
  const login = useSelector((state) => state.login);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Customerdetails />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/logout" element={<LogoutButton />}></Route>
          <Route path="/cart" element={<Cartpage />}></Route>
          <Route path="/specificproduct" element={<Displayspecific />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/card" element={<Checkout />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
