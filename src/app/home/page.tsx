"use client"
import { useEffect, useState } from 'react';
import { useAuthFetch, AuthFetchResponse } from '@/hooks/useAuthFetch';

export default function HomePage() {
  const [genreRecommendations, setGenreRecommendations] = useState<AuthFetchResponse[]>([]);
  const [secondGenreRecommendations, setSecondGenreRecommendations] = useState<AuthFetchResponse[]>([]);
  const [artistRecommendations, setArtistRecommendations] = useState<AuthFetchResponse[]>([]);
  const [artistsBySongsRecommendations, setArtistsBySongsRecommendations] = useState<AuthFetchResponse[]>([]);
  
  const authFetch = useAuthFetch();

  useEffect(() => {
    // Obtener recomendaciones por género
    authFetch({ endpoint: 'recommender/recommend-by-genre' })
      .then(data => setGenreRecommendations(data))
      .catch(console.error);

    // Obtener recomendaciones por segundo género
    authFetch({ endpoint: 'recommender/recommend-by-second-genre' })
      .then(data => setSecondGenreRecommendations(data))
      .catch(console.error);

    // Obtener recomendaciones por artista
    authFetch({ endpoint: 'recommender/recommend-by-artist' })
      .then(data => setArtistRecommendations(data))
      .catch(console.error);

    // Obtener recomendaciones de artistas por canciones escuchadas
    authFetch({ endpoint: 'recommender/recommend-artists-by-songs' })
      .then(data => setArtistsBySongsRecommendations(data))
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Recomendaciones</h1>

      <section>
        <h2>Canciones Recomendadas por Género</h2>
        <ul>
          {genreRecommendations.map((song, index) => (
            <li key={index}>{song.trackName}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Canciones Recomendadas por Segundo Género</h2>
        <ul>
          {secondGenreRecommendations.map((song, index) => (
            <li key={index}>{song.trackName}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Canciones Recomendadas por Artista</h2>
        <ul>
          {artistRecommendations.map((song, index) => (
            <li key={index}>{song.trackName}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Artistas Recomendados</h2>
        <ul>
          {artistsBySongsRecommendations.map((artist, index) => (
            <li key={index}>{artist.artistName}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

