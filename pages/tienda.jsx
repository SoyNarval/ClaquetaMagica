"use client"
import React, { useState, useEffect, useRef} from 'react'
import "../src/app/globals.css"
import Swal from 'sweetalert2'
import confetti from 'canvas-confetti'
import Header from '../src/components/Header'
import Home from '../src/components/Home'
import Film from '../src/components/Film'
import Wishlist from '../src/components/Wishlist'
import CartList from '../src/components/CartList'

/* Generador de confetti */
export const confettiGenerator = (e) => {
  const button = e.target
  const rect = button.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  confetti({
    particleCount: 20,
    spread: 20,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    shapes: ['circle']
  })
}


  /* Función Principal*/

export default function Tienda() {
  
  
  const [cartList, setCartList] = useState([])
  const [showCart, setShowCart] = useState(false)

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [list, setList] = useState(0)

  const [wishList, setWishList] = useState([])
  const [showWishList, setShowWishList] = useState(false)

  const [filter, setFilter] = useState(true)

  const [film, setFilm] = useState(false)
  const [chosenFilm, setChosenFilm] = useState(false)

  const url = `https://www.omdbapi.com/?apikey=b73bd8ad&s=${search}`


  const clearMovies = () => {
    setMovies([]);
  };

  /* Función para llenar el carro */

  useEffect(() => {
    // Al cargar la página, intentamos recuperar el carrito desde el localStorage
    const savedCartList = JSON.parse(localStorage.getItem('cartList'))
    if (savedCartList) {
      setCartList(savedCartList)
      const totalItems = savedCartList.reduce((total, item) => total + item.quantity, 0);
      setList(totalItems);
    }
  }, [])

  const fillCartList = (movie) => {
    setCartList((prevCartList) => {
      const existingMovieIndex = prevCartList.findIndex(item => item.imdbID === movie.imdbID)
  
      let updatedCartList
      if (existingMovieIndex !== -1) {
        // Si la película ya está en el carrito, aumentar su cantidad
        updatedCartList = [...prevCartList]
        updatedCartList[existingMovieIndex].quantity += 1
      } else {
        // Si no está, agregarla al carrito con cantidad 1
        updatedCartList = [...prevCartList, { ...movie, quantity: 1 }]
      }
  
      // Guardamos el carrito actualizado en el localStorage
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
  
      // También actualizamos el estado del carrito
      return updatedCartList
    })
  
    // Actualizar el contador de películas en el carrito
    const totalItems = cartList.reduce((total, item) => total + item.quantity, 1);
    setList(totalItems);
  }

  const getMovies = () => {
    if(search){
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Search && data.Search.length > 0) {
            // Añadimos un precio aleatorio entre 1 y 100 porque no lo traen
            const moviesWithPrice = data.Search.map((movie) => ({
                ...movie,
                price: Math.floor(Math.random() * 12) + 1,
                quantity: 0,
            }))
            setMovies(moviesWithPrice)
            } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Sin resultados, prueba de nuevo con una palabra en inglés!'
            })
            }
        })
    }else(
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Tienes que escribir algo!"
        })
    )
  }

  
  /* Función para renderizar las películas una vez buscadas y el tamaño de las mismas */

  const renderMovies = () => {
    return movies.map((movie) => {
        return (
            <ul key={movie.imdbID} className='m-4 '>
            <li className=' bg-gradient-to-b from-slate-900 to-slate-700 border-2 border-white border-solid rounded-lg flex flex-row gap-4 items-center justify-around max-w-xl h-full'>
                <div>
                <img src={movie.Poster} alt={movie.Title} className='w-60 h-fit  object-cover m-2 cursor-pointer hover:rotate-2 hover:scale-110 hover:brightness-125 transition-all duration-300' onClick={() => chooseFilm(movie)} />
                <h3 className='text-xl font-bold text-gray-200 text-center max-w-60'>{movie.Title}</h3>
                <p className='text-gray-400 text-center'>{movie.Year}</p>
                </div>
                <div className='flex flex-col gap-8 items-center m-4'>
                <p className='text-white text-center text-2xl my-4'>{movie.price}€</p>

                {/* Votón para añadir a la Lista */}
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full text-2xl' onClick={() => fillWishList(movie)} title="Añadir a tu lista" >+</button>
                
                {/* Botón para comprar */}
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={()=>fillCartList(movie)} title='Comprar'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      >
                      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                </button>
                </div>
                
            </li>
            </ul>
        
        )
    })
  }
  
  const chooseFilm = (movie) => {
    setFilm(true)
    setMovies([])
    setSearch(movie.Title)
    setChosenFilm(movie)
  }

  /* Recuperar carrito y wishlist desde localStorage */
  useEffect(() => {
    const savedCartList = JSON.parse(localStorage.getItem('cartList'));
    if (savedCartList) {
      setCartList(savedCartList);
      const totalItems = savedCartList.reduce((total, item) => total + item.quantity, 0);
      setList(totalItems);
    }
    const savedWishList = JSON.parse(localStorage.getItem('wishList'));
    if (savedWishList) {
      setWishList(savedWishList);
    }
  }, []);

  /* Función para llenar la wishlist */
  
  const fillWishList = (movie) => {
    setWishList((prevWishList) => {
      const existingMovieIndex = prevWishList.findIndex(item => item.imdbID === movie.imdbID);

      let updatedWishList;
      if (existingMovieIndex !== -1) {
        // Si la película ya está en la lista de deseos, aumentar su cantidad
        updatedWishList = [...prevWishList];
        updatedWishList[existingMovieIndex].quantity += 1;
      } else {
        // Si no está, agregarla a la lista de deseos con cantidad 1
        updatedWishList = [...prevWishList, { ...movie, quantity: 1 }];
      }

      // Guardamos la wishlist actualizada en localStorage
      localStorage.setItem('wishList', JSON.stringify(updatedWishList));

      return updatedWishList;
    });
  };

  const showWishListBtn = () =>{
    setShowWishList(!showWishList)
    setShowCart(false)
  }

  const showCartBtn = () => {
    setShowCart(!showCart)
    setShowWishList(false)
  }

  // Re render de las películas
  useEffect(() => {
    if (search) {
      getMovies();
    }
  }, [filter])

  return (
    <>
      <Header clearMovies={clearMovies}/>
      <div className='bg-black min-h-screen'>
        
          {/* barra de busqueda y compra*/}
          <div className='w-full h-20 bg-slate-900 flex flex-row justify-between items-center sticky top-0 z-50  max-md:hidden'>
            
            {/* boton lista de favoritos */}
            <div>
              <button className='flex text-white text-center text-2xl p-5 border border-transparent hover:border hover:border-white'  onClick={() => showWishListBtn()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="36" height="36" stroke-width="2"> <path d="M9 6l11 0"></path> <path d="M9 12l11 0"></path> <path d="M9 18l11 0"></path> <path d="M5 6l0 .01"></path> <path d="M5 12l0 .01"></path> <path d="M5 18l0 .01"></path> </svg> 
              </button>
              <ul className='absolute top-14 md:top-16 md:left-4 flex flex-col '>
                <Wishlist 
                  showWishList={showWishList}
                  wishList={wishList}
                  setWishList={setWishList}
                  setShowWishList={setShowWishList}
                />
              </ul>
              
            </div>
            

            {/* Barra de busqueda */}
            <div className='flex rounded-lg'>
              <label className=' flex rounded-xl w-full' htmlFor="search">
                <input className='block h-16 rounded-xl text-center text-xl ' id='search' type="text" placeholder="Buscar película" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={getMovies} className='bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-lg'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color='black'
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </button>
              </label>
            </div>

            {/* boton de carrito de compra */}
            <div>
              <button className=' flex text-white text-center text-2xl p-6 border border-transparent hover:border hover:border-white' onClick={() => showCartBtn()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17h-11v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                </svg>
                <p className={`absolute md:top-2 md:right-2 text-white text-center text-2xl ${list !== 0 ? 'animate-pulse, text-yellow-400' : ''}`}>{list}</p>
              </button>
              
              <ul className='absolute  right-0 top-16 md:right-6 flex flex-col'>
                <CartList 
                  cartList={cartList} 
                  setCartList={setCartList} 
                  showCart={showCart} 
                  setShowCart={setShowCart} 
                  setList={setList}
                  />
              </ul>
              
            </div>
            
          </div>

          {/* Barra de busqueda para móviles */}

          <div className='w-full py-4 bg-slate-900 flex flex-col justify-between items-center sticky top-0 z-50 md:hidden'>

            
            {/* Barra de busqueda */}
            <div className='flex rounded-lg py-2'>
              <label className=' flex rounded-xl w-full' htmlFor="search">
                <input className='block h-16 rounded-xl text-center text-xl ' id='search' type="text" placeholder="Buscar película" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={getMovies} className='bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded-lg'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color='black'
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </button>
              </label>
            </div>

            {/* botones */}
            <div className='bg-slate-900 w-screen flex flex-row items-center justify-around'>
              {/* boton lista de favoritos */}
              <div>
                <button className='flex text-white text-center text-2xl p-6 border border-transparent hover:border hover:border-white'  onClick={() => showWishListBtn()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="36" height="36" stroke-width="2"> <path d="M9 6l11 0"></path> <path d="M9 12l11 0"></path> <path d="M9 18l11 0"></path> <path d="M5 6l0 .01"></path> <path d="M5 12l0 .01"></path> <path d="M5 18l0 .01"></path> </svg> 
                </button>
                <ul className='absolute top-44 md:top-44 left-0 flex flex-col '>
                  <Wishlist 
                    showWishList={showWishList}
                    wishList={wishList}
                    setWishList={setWishList}
                    setShowWishList={setShowWishList}
                  />
                </ul>
                
              </div>

              {/* boton de carrito de compra */}
              <div>
                <button className=' flex text-white text-center text-2xl p-8 border border-transparent hover:border hover:border-white' onClick={() => showCartBtn()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                  <p className={`absolute top-24 right-16 text-white text-center text-2xl ${list !== 0 ? 'animate-pulse, text-yellow-400' : ''}`}>{list}</p>
                </button>
                
                <ul className='absolute right-0 top-44 md:right-6 flex flex-col'>
                  <CartList 
                    cartList={cartList} 
                    setCartList={setCartList} 
                    showCart={showCart} 
                    setShowCart={setShowCart} 
                    setList={setList}
                    />
                </ul>
                
              </div>
            </div>
          </div>


          {/* Fin de barra de busqueda para móviles */}
    
          <div  className={` ${movies.length !== 0 || film ? 'hidden' : ''}`}>
            <Home
              setSearch={setSearch}
              renderMovies={renderMovies}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className={` ${movies.length === 0 || film ? 'hidden' : ''}`}>
            <h1 className='text-6xl text-white text-center font-bold my-6'>Tienda</h1>
            <h2 className={` text-2xl font-bold ty-4 text-center text-white`}>Resultados</h2> 
            <ul className='md:grid md:grid-cols-4 md:gap-4 w-full'>
              {renderMovies()}
            </ul>
          </div>


          <div className={` ${!film ? 'hidden' : ''}`}>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4' onClick={() => setFilm(false)}>&larr; Volver</button>
            <div className='flex justify-center items-center max-md:flex-col-reverse h-2/3'>
              <div className="justify-center items-center flex gap-4 m-4 h-full md:flex-col">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4" title="Comprar" onClick={() => fillCartList(chosenFilm)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4"  title="Añadir a tu lista" onClick={() => fillWishList(chosenFilm)}>
                    +
                </button>
              </div>
              <Film
                movie={chosenFilm}
                setFilm={setFilm}
              />
            </div>
          </div>
      </div>
    </>
  )
}