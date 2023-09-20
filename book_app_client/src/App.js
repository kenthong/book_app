import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Reserved from "./components/Reserved"
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Navbar />
          <Routes>
            <Route path="/" element={<BookList />} /> 
            <Route path="/Book/:id" element={<BookDetails />} /> 
            <Route path="/reserved" element={<Reserved />} /> 
          </Routes>
      <Footer />
    </div>
  );
};

export default App;