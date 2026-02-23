import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";

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
      await axios.post("http://localhost:8080/api/auth/register", form);

      toast.success("Registration Successful ");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration Failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <Toaster />


      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md min-h-[400px] text-center flex flex-col">


        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Create Account
        </h1>

        <div className="mt-8 space-y-4">
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
        </div>

        <p className="text-sm mt-4">
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
  );
}

export default Signup;