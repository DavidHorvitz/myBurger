import React from "react";
import Layout from "./containers/BurgerBuilder/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div >
      <Layout>
        <Routes>
          <Route exact path="/" element={<BurgerBuilder />} />
          <Route  path="/checkout" element={<Checkout />} />
          {/* <BurgerBuilder />
        <Checkout/> */}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

// 8 31 problem
//12 4
