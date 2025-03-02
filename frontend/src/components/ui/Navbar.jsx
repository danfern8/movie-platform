import { FiHome } from "react-icons/fi"; // Importamos el icono de casa de react-icons

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between ">
        <div className="text-xl font-bold mr-4 just">Películas</div>
        <div className="flex-grow flex justify-items-center">
          <a
            href="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <FiHome className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};
