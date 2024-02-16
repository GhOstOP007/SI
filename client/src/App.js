import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
