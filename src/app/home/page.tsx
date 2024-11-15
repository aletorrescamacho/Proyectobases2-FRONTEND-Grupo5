'use client'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [genreRecommendations, setGenreRecommendations] = useState<any>(null);
  const [secondGenreRecommendations, setSecondGenreRecommendations] = useState<any>(null);
  const [artistRecommendations, setArtistRecommendations] = useState<any>(null);
  const [artistsBySongsRecommendations, setArtistsBySongsRecommendations] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Verifica si `window` está definido para asegurarte de que estás en el cliente
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    // Recomendaciones por género
    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-genre`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setGenreRecommendations(data))
      .catch(error => console.error('Error en datos de género', error));

    // Recomendaciones por segundo género
    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-second-genre`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setSecondGenreRecommendations(data))
      .catch(error => console.error('Error en datos de segundo género', error));

    // Recomendaciones por artista
    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-artist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setArtistRecommendations(data))
      .catch(error => console.error('Error en datos de artista', error));

    // Recomendaciones de artistas por canciones escuchadas
    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-artists-by-songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setArtistsBySongsRecommendations(data))
      .catch(error => console.error('Error en datos de artistas por canciones escuchadas', error));
  }, [userId]);

  const renderData = (data: any) => {
    if (!data) return <p>No hay datos disponibles</p>;

    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      );
    } else {
      return <p>{JSON.stringify(data)}</p>;
    }
  };

  return (
    <main>
      <h1>Recomendaciones</h1>

      <section>
        <h2>Canciones Recomendadas por Género</h2>
        {renderData(genreRecommendations)}
      </section>

      <section>
        <h2>Canciones Recomendadas por Segundo Género</h2>
        {renderData(secondGenreRecommendations)}
      </section>

      <section>
        <h2>Canciones Recomendadas por Artista</h2>
        {renderData(artistRecommendations)}
      </section>

      <section>
        <h2>Recomendaciones de Artistas por Canciones Escuchadas</h2>
        {renderData(artistsBySongsRecommendations)}
      </section>
    </main>
  );
}
