/* eslint-disable @next/next/no-img-element */
import React from 'react';
import logo from '../../../public/tunequestlogo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-100 text-gray-600 py-10 w-full">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center space-y-6">
        
        <img src={logo.src} alt="TuneQuest Logo" className="w-24 opacity-90" />
        
        <p className="font-semibold text-gray-700">
        ¡Siempre en busqueda de la melodía perfecta!
        </p>

        <div className="w-full h-[1px] bg-orange-300 mt-4 mb-6"></div>

        <p className="text-sm">
          Integrantes: <strong>Paula Briceño</strong>, <strong>Camila Fermoso</strong>, <strong>Camila García</strong> <strong>Cristian Gouveia</strong>, <strong>Andrés Imery</strong>, <strong>Mauricio Méndez</strong>, <strong>Luis Soriano</strong> y <strong>Alessandra Torres</strong>.
        </p>

        <div className="flex space-x-6 mt-2">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="hover:text-gray-800 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.162 0H15.77l-3.77 5.707L8.23 0H1.837l7.444 10.87L.089 24h6.393l4.84-7.228L16.162 24h6.359l-9.21-13.094L22.162 0z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gray-800 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-800 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-800 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.257 0-3.667.014-4.947.072-1.562.067-2.97.39-4.032 1.453-1.063 1.062-1.386 2.47-1.453 4.032-.058 1.28-.072 1.69-.072 4.947s.014 3.667.072 4.947c.067 1.562.39 2.97 1.453 4.032 1.062 1.063 2.47 1.386 4.032 1.453 1.28.058 1.69.072 4.947.072s3.667-.014 4.947-.072c1.562-.067 2.97-.39 4.032-1.453 1.063-1.062 1.386-2.47 1.453-4.032.058-1.28.072-1.69.072-4.947s-.014-3.667-.072-4.947c-.067-1.562-.39-2.97-1.453-4.032-1.062-1.063-2.47-1.386-4.032-1.453-1.28-.058-1.69-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6.406-11.845c-.796 0-1.444.648-1.444 1.444s.648 1.444 1.444 1.444 1.444-.648 1.444-1.444-.648-1.444-1.444-1.444z" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} TuneQuest. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
