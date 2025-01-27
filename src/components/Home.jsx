import React, { useState, useEffect } from 'react'
import "../app/globals.css"
import Swal from 'sweetalert2'
import Loader from './Loader'

export default function Home({setSearch, renderMovies, filter, setFilter}) {
    const urlAvengers = "https://www.omdbapi.com/?apikey=b73bd8ad&s=avengers&type=movie"
    const urlScary = "https://www.omdbapi.com/?apikey=b73bd8ad&s=scary&type=movie"

    /* Estados para almacenar películas y el estado de carga o error */
    const [avengers, setAvengers] = useState([])
    const [scary, setScary] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    // Función reutilizable para obtener películas
    const getFilms = async (url, setState) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (data.Search && data.Search.length > 0) {
                setState(data.Search.slice(0, 4))
            } else {
                throw new Error('No se encontraron películas')
            }
        } catch (error) {
            setError(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFilms(urlAvengers, setAvengers) 
        getFilms(urlScary, setScary) 
    }, [])

    if (loading) {
        <Loader/>
    }
    if (error) {
        return <div className="text-white text-center">Error: {error}</div>
    }

    const filterMovies = (film) => {
        setFilter(!filter)
        setSearch(film)
    }

    // Función para renderizar las películas de Avengers
    const renderAvengers = () => {
        return avengers.map((movie) => {
            return (
                <li onClick={() => filterMovies("avengers")} key={movie.imdbID} className='m-4 bg-gradient-to-b from-slate-900 to-slate-700 border-2 border-white border-solid rounded-lg flex flex-col gap-4 items-center justify-around my-4 w-2xl h-full cursor-pointer' title={movie.Title}>
                    <img src={movie.Poster} alt={movie.Title} className='w-60 h-fit object-cover rounded max-w-38' />
                    <h2 className='text-white text-xl font-bold text-center m-2 truncate w-full '>{movie.Title}</h2>
                    <p className='text-white text-base'>{movie.Year}</p>
                </li>
            )
        })
    }

    // Función para renderizar las películas de Scary
    const renderScary = () => {
        return scary.map((movie) => {
            return (
                <li  onClick={() => filterMovies("scary")} key={movie.imdbID} className='m-4 bg-gradient-to-b from-slate-900 to-slate-700 border-2 border-white border-solid rounded-lg flex flex-col gap-4 items-center justify-around my-4 w-2xl h-full cursor-pointer' title={movie.Title}>
                    <img src={movie.Poster} alt={movie.Title} className='w-60 h-fit object-cover rounded max-w-38' />
                    <h2 className='text-white text-xl font-bold text-center text-ellipsis w-48'>{movie.Title}</h2>
                    <p className='text-white text-base'>{movie.Year}</p>
                </li>
            )
        })
    }

    return (
        <>
            <h1 className='text-6xl text-white text-center font-bold my-6'>Home</h1>
            <h2 className='text-white text-center text-2xl my-8'>¡Lo mejor del UCM!</h2>
            <ul className='grid grid-cols-2 gap-2 w-full md:grid-cols-4'>
                {renderMovies()}
            </ul>
            
            <ul className='grid grid-cols-2 gap-2 w-full md:grid-cols-4'>
                {renderAvengers()}
            </ul>
            <h2 className='text-white text-center text-2xl my-8'>¡Para morirse de risa!</h2>
            <ul className='grid grid-cols-2 gap-2 w-full md:grid-cols-4'>
                {renderScary()}
            </ul>
            <h1 className='text-6xl text-white text-center font-bold py-10'>¡Y si quieres más... Sólo dale a buscar y accede a la tienda!</h1>
            
        </>
    )
}
