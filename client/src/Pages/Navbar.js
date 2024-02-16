import React from "react";
import { useAuth } from "../context/auth.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };

  return (
    <div className="navbar">
      <div>
        <a href="/">Home</a>
        {!auth.user ? (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        ) : (
          <>
            <a onClick={handleLogout} href="/login">
              Logout
            </a>
            <div className="username">UserName : {auth?.user?.name}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
