import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-900 p-4 flex justify-around items-center shadow-lg">
      <Link to="/" className="text-white hover:text-blue-400">Home</Link>
      <Link to="/favorites" className="text-white hover:text-blue-400">Favorites</Link>
    </nav>
  );
};

export default Navbar;
