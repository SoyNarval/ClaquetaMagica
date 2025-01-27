import "../app/globals.css"

export default function Film({ movie }) {
    return (
        <div className="bg-black h-screen justify-center flex flex-col items-center"> 
            <h2 className="text-white text-3xl font-bold text-center m-4">{movie.Title}</h2>
            <p className="text-white text-lg mt-4">{movie.Year}</p>
            <div className="max-md:w-4/5 h-1/2 flex max-md:flex-col justify-center items-center rounded-lg shadow-lg m-4 ">
                <img src={movie.Poster} alt={movie.Title} className="w-full max-md:h-auto object-cover rounded md:w-1/2 md:m-8" />
                <p className="text-white text-xl text-left m-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt enim nisi adipisci eaque veniam sint aliquam ratione tempore expedita quidem eligendi iusto aut iure ad unde quia, numquam aspernatur praesentium?</p>
            </div>
        </div>
    );
}
