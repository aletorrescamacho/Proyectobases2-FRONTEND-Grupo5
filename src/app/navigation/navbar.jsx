/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <header className="bg-creamhs w-full">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
        
        {/* Logo */}
        <div>
          <img className="w-16" src="./assets/tunequestlogo.pmg" alt="TuneQuest Logo" />
        </div>
        
        {/* Navigation Links */}
        <div className="md:static absolute bg-creamhs py-6 md:min-h-fit min-h-[60vh] left-0 md:w-auto w-full flex items-center px-5">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ml-4">
            <li>
              <Link href="/" passHref>
                <span className="text-black dark:text-white hover:text-gray-500">Inicio</span>
              </Link>
            </li>
            <li>
              <Link href="/foryou" passHref>
                <span className="text-black dark:text-white hover:text-gray-500">Para ti</span>
              </Link>
            </li>
            <li>
              <Link href="/searchmusic" passHref>
                <span className="text-black dark:text-white hover:text-gray-500">Buscar Música</span>
              </Link>
            </li>
            <li>
              <Link href="/login" passHref>
                <span className="text-black dark:text-white hover:text-gray-500">Iniciar Sesión</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
