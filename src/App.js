import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { AddProduct } from "./components/AddProduct";
import { UpdateProduct } from "./components/UpdateProduct";
import { PrivateComponent } from "./components/PrivateComponent";

function App() {
      const [query, setQuery] = useState('');
  return (
    <div className="d-flex flex-column justify-content-between height">
      <div>
      <NavBar setQuery={setQuery} />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home query={query}/>} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/profile" element={<h1>Profile Component</h1>} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
