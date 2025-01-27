import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function CartList({ cartList, setCartList, showCart, setShowCart, setList }) {


    const handleCheckout = () => {
    confetti({
        particleCount: 20,
        spread: 20,
        shapes: ['circle']
    })
    setCartList([])
    setShowCart(false)
    setList(0)
    localStorage.removeItem('cartList')
    }


    /* Función para renderizar el carrito */

    const renderCartlist = () => {
    if (showCart) {
        // Si el carrito está vacío, mostrar un mensaje de vacío
        if (cartList.length === 0) {
        return (
            <div className="flex flex-col bg-gray-800 text-white p-4 my-3 rounded-lg shadow-lg w-96 max-md:w-screen">
            <h1 className="text-white text-2xl font-semibold mb-2">Cesta</h1>
            <div className="flex justify-between">
                <h2 className="text-white text-base font-semibold mb-2">Título</h2>
                <h2 className="text-white text-base font-semibold mb-2">Precio</h2>
                <h2 className="text-white text-base font-semibold mb-2">Cantidad</h2>
            </div>
            <h2 className="text-red-800 text-2xl font-semibold mb-2 text-center">El carrito está vacío</h2>
            </div>
        )
        } else {
        
            // Si el carrito tiene películas, mostramos la lista, cantidad y precio total
            const totalPrice = cartList.reduce((total, movie) => total + (movie.price * movie.quantity), 0)
            const totalPriceIVA = totalPrice * 0.21
            console.log(totalPriceIVA)

            return (
                <div className="flex flex-col bg-gray-800 text-white p-4 my-3 rounded-lg shadow-lg w-96 max-md:w-screen">
                <h1 className="text-white text-2xl font-semibold mb-2">Cesta</h1>
                <div className="flex justify-between">
                    <h2 className="text-white text-base font-semibold mb-2">Título</h2>
                    <h2 className="text-white text-base font-semibold mb-2">Precio</h2>
                    <h2 className="text-white text-base font-semibold mb-2 ">Cantidad</h2>
                </div>

                {/* Lista a renderizar */}
                <ul className='max-h-72 overflow-y-scroll'>
                    {cartList.map((movie, index) => (
                    <li key={movie.imdbID}>
                        <div className="flex flex-row gap-4 items-center justify-between border-b border-gray-950">
                        <h3 className="text-base text-red-800 font-semibold max-w-36 truncate px-0">{movie.Title}</h3>
                        <p>
                            <span className="text-green-600">{movie.price}€</span>
                        </p>
                        <div className='flex justify-center items-center'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4" onClick={() => decreaseQuantity(movie)}>-</button>
                            <p>{movie.quantity}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4" onClick={() => increaseQuantity(movie)}>+</button>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className="flex flex-col mt-4 text-lg font-bold">
                    <di className="flex justify-between">
                    <p className="text-white">
                    Total: <span className="text-green-600">{totalPrice}€</span>
                    </p>
                    <p className="text-white">
                    Total+IVA: <span className="text-green-600">{totalPrice + totalPriceIVA}€</span>
                    </p>
                    </di>
                    
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4" onClick={handleCheckout}>
                    Comprar
                    </button>
                </div>
                </div>
            )
        }
    }
    }


    // Función para aumentar la cantidad
    const increaseQuantity = (movie) => {
        setCartList((prevCartList) => {
            const updatedCartList = prevCartList
            .map((item) => {
                if (item.imdbID === movie.imdbID) {
                    return { ...item, quantity: item.quantity + 1 } 
                }
                return item
            })
            setList(prevList => prevList + 1)
            localStorage.setItem('cartList', JSON.stringify(updatedCartList))
            return updatedCartList
        })
    }

    // Función para disminuir la cantidad
    const decreaseQuantity = (movie) => {
        setCartList((prevCartList) => {
            const updatedCartList = prevCartList
            .map((item) => {
                if (item.imdbID === movie.imdbID) {
                    if (item.quantity === 1) {
                        return null
                    } else {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                }
                return item
            })
            .filter((item) => item !== null) 
            setList(prevList => prevList - 1)
            localStorage.setItem('cartList', JSON.stringify(updatedCartList))
            return updatedCartList
        })
    }

    return (
        <div>
            {renderCartlist()}
        </div>
    )
}
