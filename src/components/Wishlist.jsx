import React, { useState, useEffect } from 'react'

export default function Wishlist({ showWishList, wishList, setWishList, setShowWishList }) {

    const emptyWishList = () => {
        localStorage.removeItem('wishList')
        setWishList([])
        setShowWishList(false)
    }


    /* Función para renderizar la wishlist */
    const renderWishList = () => {
    if (showWishList) {
        if (wishList.length === 0) {
        return (
            <div className="flex flex-col bg-gray-800 text-white p-4 my-3 rounded-lg shadow-lg w-96 max-md:w-screen">
                <h1 className="text-white text-2xl font-semibold mb-2">Lista de deseos</h1>
                <button onClick={emptyWishList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4">Vaciar lista</button>
                <div className="flex justify-between">
                    <h2 className="text-white text-base font-semibold mb-2">Título</h2>
                    <h2 className="text-white text-base font-semibold mb-2">Precio</h2>
                    <h2 className="text-white text-base font-semibold mb-2 mr-4">Eliminar</h2>
                </div>
            </div>
        )
        } else {
        return (
            <div className="flex flex-col bg-gray-800 text-white p-4 my-3 rounded-lg shadow-lg w-96 max-md:w-screen">
                <h1 className="text-white text-2xl font-semibold mb-2">Lista de deseos</h1>
                <button onClick={emptyWishList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4">Vaciar lista</button>
                <div className="flex justify-between">
                    <h2 className="text-white text-base font-semibold mb-2">Título</h2>
                    <h2 className="text-white text-base font-semibold mb-2">Precio</h2>
                    <h2 className="text-white text-base font-semibold mb-2 mr-4">Eliminar</h2>
                </div>

            {/* Lista a renderizar */}
                <ul className='max-h-72 overflow-y-scroll'>
                    {wishList.map((movie, index) => (
                    <li key={movie.imdbID}>
                        <div className="flex flex-row gap-4 items-center justify-between border-b border-gray-950">
                        <h3 className="text-base text-red-800 font-semibold max-w-36 px-0">{movie.Title}</h3>
                        <p>
                            <span className="text-green-600 mr-2">{movie.price}€</span>
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4" onClick={() => removeWishList(movie)}>&times;</button>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        )
        }
    }
    }

    const removeWishList = (movie) => {
        setWishList((prevWishList) => {
            const updatedWishList = prevWishList
            .map((item) => {
                if (item.imdbID === movie.imdbID) {
                return null
                } else {
                return { ...item, quantity: item.quantity - 1 }
                }
            })
            .filter((item) => item !== null) // Filtra los items null (que se eliminaron)
        return updatedWishList
    })
    }
    return (
        <div>
            {renderWishList()}
        </div>
    )
}