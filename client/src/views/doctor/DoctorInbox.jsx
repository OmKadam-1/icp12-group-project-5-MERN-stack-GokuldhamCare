import React, { useEffect, useState } from "react"
import axios from "axios"
import NavbarAdmin from "../../components/NavbarAdmin"
import Footer from "../../components/Footer"

function DoctorInbox() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/contact/messages")
      .then(res => setMessages(res.data))
  }, [])
  return (
    <>
    <NavbarAdmin/>
    <div className="min-h-screen bg-green-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Hello, Doctor !
      </h1>
      <hr />
      <div className="grid gap-6">

        {
          messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-5 shadow rounded-lg"
            >
              <h2 className="font-bold text-blue-600">
                {msg.name}
              </h2>
              <p>{msg.email}</p>
              <p>{msg.phone}</p>
              <p>{msg.department}</p>
              <p>{msg.service}</p>
              <p>{msg.message}</p>

            </div>
          ))
        }

      </div>
    </div>
    <Footer/>
  </>
  )
}
export default DoctorInbox
