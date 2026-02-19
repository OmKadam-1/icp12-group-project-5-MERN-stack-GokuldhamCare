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

    // If already logged in, redirect automatically
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

      // Save authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      toast.success("Login Successful ✅");

      // Role-based redirect
      if (res.data.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (res.data.role === "PATIENT") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">🔐 Login</h2>

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
      </div>
    </div>
  );
}

export default Login;
