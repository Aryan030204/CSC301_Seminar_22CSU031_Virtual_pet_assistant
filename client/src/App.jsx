import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CatWiki from "./components/CatWiki";
import DogWiki from "./components/DogWiki";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FoodShop from "./components/FoodShop";
import PetProfiles from "./pages/PetProfiles";
import ProfileList from "./pages/ProfileList";
import Faqs from "./pages/Faqs";
import About from "./pages/About";
import Vet from "./components/Vet";

function App() {
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogwiki" element={<DogWiki />} />
          <Route path="/catwiki" element={<CatWiki />} />
          <Route path="/foodshop" element={<FoodShop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pet/profile/create" element={<PetProfiles />} />
          <Route path="/profiles/list" element={<ProfileList />} />
          <Route path="/frequently-asked-questions" element={<Faqs />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/hire-a-vit" element={<Vet />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
