import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //form function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("failed");
      }
    } catch (error) {
      toast.success("SOmething went wrong");
    }
  };
  return (
    <>
      <div className="bgresiter">
        <div className="register">
          <h1 className="">Register</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="exampleInputName" className="">
                Name
              </label>
              <br></br>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=""
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="">
              <label htmlFor="exampleInputEmail1" className="">
                Email address
              </label>
              <br></br>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=""
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <br></br>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=""
                id="exampleInputPassword1"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary bg-red-500 w-full">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
