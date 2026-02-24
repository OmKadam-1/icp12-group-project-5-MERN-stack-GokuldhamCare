import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { Link } from "react-router";
import backicon from "./../../assets/back.png"

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("Sign Up");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, form);

      toast.success("Registration Successful ");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration Failed ");
    }
  };

  return (

    <div className="bg-gradient-to-r from-slate-100 to-teal-50  min-h-screen    ">
       <div className="min-h-[640px] flex items-center justify-center    ">

      <Link to="/">
        <img
          src={backicon}
          alt="Back"
          className="fixed top-6 left-6 h-8 cursor-pointer hover:scale-110 transition duration-200"
        />
      </Link>
     
        <div className="w-[400px] mx-auto p-6  min-h-[400px] shadow-xl   rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center   ">


          <h1 className="text-3xl font-semibold text-green-700 mb-8">
            Create Account
          </h1>

            <Input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={form.name}
              onChange={handleChange}

            />


            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}

            />


            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
            />


            <Button
              title="Sign Up"
              size="medium"
              variant="primary"
              onClick={handleSubmit}
            />
         

          <p className="text-m mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;