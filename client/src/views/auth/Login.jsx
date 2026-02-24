import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle, isUserLoggedIn } from "../../utils.jsx";
import Input from "../../components/Input";
import Button from "../../components/Button";
import backicon from "./../../assets/back.png"
import { Link } from "react-router";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Login");


    if (isUserLoggedIn()) {
      const role = localStorage.getItem("role");

      if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        form,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      toast.success("Login Successful ");
      if (res.data.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (res.data.role === "PATIENT") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login Failed ");
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-teal-50  min-h-screen   ">
      <div className="min-h-[640px] flex items-center justify-center ">

      <Link to="/">
        <img
          src={backicon}
          alt="Back"
          className="fixed top-6 left-6 h-8 cursor-pointer hover:scale-110 transition duration-200"
        />
      </Link>
      

      <div className="w-[400px] mx-auto p-6  min-h-[400px] shadow-xl   rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center  ">
        <h2 className="text-3xl font-semibold text-green-700 mb-7"> Login</h2>
        
          <Input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}

          />

          <Input
            type="password"
            placeholder="Enter  Password"
            name="password"
            value={form.password}
            onChange={handleChange}

          />

          <Button
            title=" Login"
            size="medium"
            variant="primary"
            onClick={handleSubmit}

          />
        
        <p className="text-m mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-700 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
