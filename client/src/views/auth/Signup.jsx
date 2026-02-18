import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Signup() {
  const [form, setForm] = useState({
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

      toast.success("Registration Successful ✅");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster position="top-right" />

      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">📝 Sign Up</h2>

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
          title="   Sign Up"
          size="medium"
          variant="primary"
          onClick={handleSubmit}
        />

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
