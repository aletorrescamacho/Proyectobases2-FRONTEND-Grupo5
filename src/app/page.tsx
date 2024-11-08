"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState(null); // Estado para almacenar la respuesta del backend
  const [error, setError] = useState(null); // Estado para almacenar errores

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommender/recommend-by-artist/5`); // Reemplaza '/ruta-del-endpoint' con tu endpoint real
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setData(data); // Guarda los datos en el estado
    } catch (error : any) {
      setError(error.message); // Guarda el mensaje de error en el estado
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">src/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div>
          <h2>Prueba de Conexión con Backend</h2>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre> // Muestra los datos en la página si la solicitud fue exitosa
          ) : error ? (
            <p>Error: {error}</p> // Muestra el error si la solicitud falló
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </main>
    </div>
  );
}
