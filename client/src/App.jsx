import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CatWiki from "./components/CatWiki";
import DogWiki from "./components/DogWiki";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FoodShop from "./components/FoodShop";

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogwiki" element={<DogWiki />} />
          <Route path="/catwiki" element={<CatWiki />} />
          <Route path="/foodshop" element={<FoodShop />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
