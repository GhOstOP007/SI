import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="bgresiter">
        <div className="register">
          <h1 className="">SignIN</h1>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <br></br>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
              <label for="exampleInputPassword1">Password</label>
              <br></br>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <button type="submit" class="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
