import { useState } from "react";
import { TbBrandShopee } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [logOutButton, setLogOutButton] = useState(false);

  const handleClick = () => {
    setLogOutButton(!logOutButton)
  }
  return (
    <nav className="w-full bg-white shadow dark:bg-gray-800 py-4  fixed">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            {/* <img src="" alt="" /> */}
            <TbBrandShopee className="text-5xl text-gray-600" />
            <h2 className="text-3xl font-semibold font-lato">Pro<span className="text-primary">Shop</span></h2>
          </a>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <TiThMenu className="text-2xl "/>
              ) : (
                <IoMdClose className="text-2xl "/>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-gray-100 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
            }`}
        >
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            <a
              href="/"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              Home
            </a>
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              About
            </a>
            <a
              href="#"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-6 py-4 md:py-0">
            <Link to='/login'>
              <button className="text-xl font-semibold">Login</button>
            </Link>
            {
              user ? <div onClick={handleClick} className="w-14 h-14 rounded-full cursor-pointer"><img className="rounded-full" src={user?.photoURL} alt="" />
                {logOutButton && <button onClick={logOut}>LogOut</button>}
              </div>
                :
                <Link to='/sign-up'>
                  <button className="px-5 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md focus:outline-none focus:bg-primary">Sign Up</button>
                </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;