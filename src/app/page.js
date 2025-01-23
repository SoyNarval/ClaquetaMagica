import Login from "../../pages/login";
import Tienda from "../../pages/tienda";
import Link from "next/link";


export default function Home() {

  const url = "https://www.omdbapi.com/?apikey=b73bd8ad&s="

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-700 h-screen overflow-hidden">
      <Login/>
    </div>
  );
}
