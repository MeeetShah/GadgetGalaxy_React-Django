
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Displayspecific from './Components/Displayspecific';

function App() {
  return (
    // <Signup/>
    // <Login />

    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/specificproduct" element={<Displayspecific />}></Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;
