import React, { useState } from "react"
import axios from "axios"
import Input from "./Input"

function Contact() {

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    service: "",
    message: ""
  })
    const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5173/", data)
    alert("Message Sent Successfully")
  }
  return (
    <div className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Contact To Our Clinic
      </h1>
</div>

  )
}