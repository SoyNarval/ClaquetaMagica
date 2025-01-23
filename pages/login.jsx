"use client";
import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import "../src/app/globals.css"
import { useNavigation } from 'next/navigation';

export default function Login() {

  const [auth, setAuth] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if(auth){
    return(
      window.location.href = '/tienda'
    )
  }

  const handleSignup = () => {
    if(email === "correo@correo.com" && password === "123456"){
      setAuth(true)
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Prueba a rellenar todo CORRECTAMENTE!",
        footer: '<p> correo@correo.com & 123456 </p>'
      });
    }
  }

  return (
    <div className='bg-gradient-to-b from-slate-900 to-slate-700 h-screen overflow-hidden'>
      <h1 className='text-white text-center text-7xl my-9'>CLAQUETA MÁGICA</h1>
      <h2 className='text-white text-center text-2xl my-6'>¡Bienvenido al paraíso de las películas!</h2>
      <h1 className='text-white text-center text-4xl my-4'>Login</h1>
      <h2 className='text-white text-center text-2xl my-4'>Accede a tu cuenta</h2>
      <div className='flex flex-col gap-4 w-full items-center my-8'>
        <label htmlFor="email">
          <input className='block h-16 rounded-xl text-center text-xl' id='email' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <input className='block h-16 rounded-xl text-center text-xl' id='password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-2xl' onClick={handleSignup}>Acceder</button>
      </div>
      <div className='flex flex-row items-center justify-center animate-infinite-scroll hover:animate-none'>
        <p className="text-white text-2xl font-bold my-4 whitespace-nowrap overflow-hiddens border-b-2 border-t-2 max-md:text-xs"> ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas!¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas!¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas! ¡Accede ya para poder ver todas tus películas y series favoritas!</p>

      </div>
      
    </div>
  )
}
