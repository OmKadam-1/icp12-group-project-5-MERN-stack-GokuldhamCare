import React from 'react'
import Logo from "../assets/logo.png";


function NavbarPatient() {
  return (
    <div className="h-1 bg-green-500 w-full">
      <nav className="w-full bg-gray-100 px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">
        <div className='flex items-center gap-3 cursot-pointer'>
          <img src={Logo} alt="logo" className='w-14'/>
          <div>
            <h1 className="text-2xl font-bold text-green-600">
              <span className="text-black">Health</span>Matrix+
            </h1>
            <p className="text-sm text-gray-600">
              Healthcare Solutions
            </p>
          </div>

        </div>

      </nav>

    </div>
  )
}

export default NavbarPatient