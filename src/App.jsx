//App.jsx
import "./App.scss";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Layout/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Newsletter from "./components/Layout/Footer/Newsletter/Newsletter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./components/Pages/Product/ProductPage";
import CategoryPage from "./components/Pages/CategoryPage/CategoryPage";
import { useEffect } from "react";
import { fetchProducts } from "./store/product-slice";
import { Provider } from "react-redux";
import store from "./store/store";
import ProductAPI from "./testing/API/ProductAPI";

function App() {
  useEffect(() => {
    store.dispatch(fetchProducts());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter basename="/shopzone">
        <ProductAPI />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* <Route path="/category" element={<CategoryPage />} /> */}
        </Routes>
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
export default App;
