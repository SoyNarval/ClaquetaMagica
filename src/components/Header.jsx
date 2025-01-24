import React from 'react'
import Link from "next/link";
import "../app/globals.css"

export default function header({ clearMovies }) {
  return (
    <>
        <nav className=" bg-slate-950 flex justify-between w-full h-18 text-white text-xl items-center py-4">
            <Link href="/blog" className=' p-6 border border-transparent hover:border hover:border-white'>Blog</Link>
            <a onClick={clearMovies} href="/tienda" className='text-black text-center text-2xl p-4 bg-blue-500 border border-blue-700 rounded-lg font-extrabold'>CLAQUETA MÁGICA</a>
            <Link href="/tienda" className='p-6 border border-transparent hover:border hover:border-white'>Shop</Link>
        </nav>
    </>
  )
}
