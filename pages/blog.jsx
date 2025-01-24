"use client";
import React, { useEffect } from 'react'
import { useState } from 'react'
import "../src/app/globals.css"
import Swal from 'sweetalert2'
import Header from '../src/components/Header';
import confetti from 'canvas-confetti';
import { confettiGenerator } from '../pages/tienda';


export default function Blog() {
  
  const POSTS = [
    {
      id: 1,
      titulo: "Endgame fue una decepción",
      fecha: "20/1/2025",
      contenido: "No vayáis al cine a verla, mis hijos salieron llorando y todo",
      likes: 10, 
      liked: false
    },
    {
      id: 2,
      titulo: "Me encantó Endgame",
      fecha: "20/1/2025",
      contenido: "La mejor película de la historia, mejor que `El Padrino`, mis hijos no pararon de reir",
      likes: 3, 
      liked: false
    },
    {
      id: 3,
      titulo: "Ni fú ni fá",
      fecha: "20/1/2025",
      contenido: "Nada del otro mundo, mis hijos dicen que es mejor el libro",
      likes: 7, 
      liked: false
    },
    {
      id: 4,
      titulo: "El Padrino",
      fecha: "20/1/2025",
      contenido: "Un clásico de la mafia que sigue la historia de la familia Corleone, desde la ascensión de Vito Corleone hasta la lucha de su hijo Michael por mantener el poder. Una saga épica sobre lealtad, traición y el precio del poder.",
      likes: 5, 
      liked: false
    },
    {
      id: 5,
      titulo: "El secreto de la muerte",
      fecha: "20/1/2025",
      contenido: "Una historia de terror y misterio que sigue la historia de la familia Corleone, desde la ascensión de Vito Corleone hasta la lucha de su hijo Michael por mantener el poder. Una saga épica sobre lealtad, traición y el precio del poder.",
      likes: 5, 
      liked: false
    }, 
    {
      id: 6,
      titulo: "Interstellar",
      fecha: "20/1/2025",
      contenido: " Una odisea espacial que explora los límites del tiempo y el espacio, mientras un grupo de astronautas emprende una misión para encontrar un nuevo hogar para la humanidad. Una película visualmente impresionante que te hará cuestionar todo lo que sabes sobre el universo.",
      likes: 5, 
      liked: false
    },
    {
      id: 7,
      titulo: "Parasite",
      fecha: "20/1/2025",
      contenido: " Una sátira social que explora las desigualdades sociales a través de dos familias coreanas muy diferentes. Una película inteligente y tensa que te mantendrá al borde de tu asiento hasta el final.",
      likes: 5, 
      liked: false
    }
  ]

  /* Declaramos todas las variables que necesitamos */
  
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [uploadPost, setUploadPost] = useState(POSTS)

  /* Funcies para dar like */

  const handleLikeClick = (post) => {
    if(!post.liked){
      setUploadPost(uploadPost.map((p) => (p.id === post.id ? { ...p, likes: p.likes + 1, liked: true } : p)));
    }else{
      setUploadPost(uploadPost.map((p) => (p.id === post.id ? { ...p, likes: p.likes - 1, liked: false } : p)));
    }
  }

  

  /* Funciones para cambiar el estado de las variables */

  const handleTitleChange = (e) => {
    setNewPostTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setNewPostContent(e.target.value)
  }

/* Publicar post nuevo */

  const handleUploadPost = () => {
    if(newPostTitle && newPostContent){
      const newPost = {
        id: crypto.randomUUID(),
        titulo: newPostTitle,
        fecha: new Date().toLocaleDateString(),
        contenido: newPostContent,
        likes: 0
      }
      Swal.fire({
        title: "¡Post enviado!",
        icon: "success"
      });
      setUploadPost([...uploadPost, newPost])
      setNewPostTitle("")
      setNewPostContent("")
    }else{
      Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "¡Tienes que escribir algo!"
      })
    }
  }

/* Comentarios del blog */ 
  
  const renderPosts = () => {
    return uploadPost.map((post) => {
      return (
        <ul> 
          <li key={post.id}  className='border-solid border-4 border-gray-200 my-2 p-4 bg-gray-100 rounded-xl w-full'>
            <h3 className='text-2xl text-red-800 my-3'>{post.titulo}</h3>
            <p className='text-slate-900'>{post.contenido}</p>
            <div className='flex flex-row gap-4 items-center my-2'>
              <button className='flex justify-center items-center hover:animate-pulse' onClick={() => handleLikeClick(post)}>
              ❤️
              </button>
              <p className='text-black'>({post.likes})</p>
            </div>
            
            <p className='text-red-600'>{post.fecha}</p>
          </li>
        </ul>
        
      )
    })
  }
  useEffect(() => {
    renderPosts()
  }, [uploadPost])

  return (
    <>
      <Header/>
      <div className='bg-gradient-to-b from-slate-900 to-slate-700 p-3 md:h-screen'>

        <h1 className="text-white text-5xl font-bold text-center my-4 p-10 w-full border border-gray-800 border-solid rounded-xl">Nuestro Blog</h1>
        <h2 className='text-white text-3xl m-8 text-center border-b p-2'>Entradas recientes</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:h-1/2'>

          <article className="bg-white shadow-md rounded-lg p-4 max-md:mb-4 overflow-y-scroll max-h-lg">
            <ul className='md:h-dvh h-fit w-full'>
              {renderPosts()}
            </ul>
          </article>

          <section className='w-full h-full flex flex-col gap-8'>
            <h2 className='text-white text-3xl m-8 text-center border-b p-2'>Crear entrada</h2>
            <div className='flex flex-col gap-8 w-full'>
              <label for="title">
                <input className='h-10 w-full border rounded-md shadow-sm p-2' id='title' type="text" placeholder="Titulo" value={newPostTitle} onChange={handleTitleChange} />
              </label>
              <label for="content">
                <textarea className='text-black min-h-20 w-full border rounded-md shadow-sm p-2 md:h-fit' id='content' rows="4" placeholder="Deja tu comentario" value={newPostContent} onChange={handleContentChange} />
              </label>
              <button onClick={handleUploadPost} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Enviar</button>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
