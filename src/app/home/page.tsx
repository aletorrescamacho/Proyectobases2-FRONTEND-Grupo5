'use client'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [genreRecommendations, setGenreRecommendations] = useState<any>(null);
  const [secondGenreRecommendations, setSecondGenreRecommendations] = useState<any>(null);
  const [artistRecommendations, setArtistRecommendations] = useState<any>(null);
  const [artistsBySongsRecommendations, setArtistsBySongsRecommendations] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-genre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setGenreRecommendations(data))
      .catch(error => console.error('Error en datos de género', error));

    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-second-genre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setSecondGenreRecommendations(data))
      .catch(error => console.error('Error en datos de segundo género', error));

    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-by-artist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setArtistRecommendations(data))
      .catch(error => console.error('Error en datos de artista', error));

    fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/recommender/recommend-artists-by-songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(response => response.json())
      .then(data => setArtistsBySongsRecommendations(data))
      .catch(error => console.error('Error en datos de artistas por canciones escuchadas', error));
  }, [userId]);

  const renderData = (data: any, type: string) => {
    if (!data) return <p>No hay datos disponibles</p>;

    if (Array.isArray(data)) {
      if (type === "artist") {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <ArtistCard key={index} artistName={item.artists} />
            ))}
          </div>
        );
      } else {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <SongCard key={index} title={item.track_name} />
            ))}
          </div>
        );
      }
    } else {
      return <p>{JSON.stringify(data)}</p>;
    }
  };

  const SongCard = ({ title }: { title: string }) => {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        width: '200px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p><strong>{title}</strong></p>
        <button 
          onClick={() => setLiked(!liked)} 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            color: liked ? 'black' : 'gray',
            cursor: 'pointer'
          }}>
          ♥
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  };

  const ArtistCard = ({ artistName }: { artistName: string }) => {
    const [following, setFollowing] = useState(false);

    return (
      <div style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        width: '200px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p><strong>{artistName}</strong></p>
        <button 
          onClick={() => setFollowing(!following)} 
          style={{
            backgroundColor: following ? '#4CAF50' : '#f0f0f0',
            color: following ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}>
          {following ? 'Seguido' : 'Seguir'}
        </button>
      </div>
    );
  };

  return (
    <main>
      <h1>Recomendaciones</h1>

      <section>
        <h2>Canciones Recomendadas por Género</h2>
        {renderData(genreRecommendations, "songs")}
      </section>

      <section>
        <h2>Canciones Recomendadas por Segundo Género</h2>
        {renderData(secondGenreRecommendations, "songs")}
      </section>

      <section>
        <h2>Canciones Recomendadas por Artista</h2>
        {renderData(artistRecommendations, "songs")}
      </section>

      <section>
        <h2>Recomendaciones de Artistas por Canciones Escuchadas</h2>
        {renderData(artistsBySongsRecommendations, "artist")}
      </section>
    </main>
  );
}


