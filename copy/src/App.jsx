import { useState } from "react";

import "./App.css";
import { AppProvider } from "./Context/AppContext";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Layout/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Newsletter from "./components/Layout/Footer/Newsletter/Newsletter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./components/Pages/Product/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/shopzone">
        <AppProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
