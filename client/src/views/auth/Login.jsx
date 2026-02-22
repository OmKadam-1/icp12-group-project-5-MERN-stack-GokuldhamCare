import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle, isUserLoggedIn } from "../../utils.jsx";
import Input from "../../components/Input";
import Button from "../../components/Button";

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
        "http://localhost:8080/api/auth/login",
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
    <div className="min-h-screen flex items-center justify-center  bg-gray-100 ">
      <Toaster />

      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-[400px] text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-2"> Login</h2>

        <Input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={form.email}
          onChange={handleChange}

        />

        <Input
          type="password"
          placeholder="Enter Your Password"
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
        <p className="text-sm mt-4">
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
  );
}

export default Login;
