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
            {data.map((item, index) => {
              const artistId = item.artist_id?.low ?? item.artist_id; // Usa low si es un objeto
              return(
              <ArtistCard key={index} artistName={item.artists} artist_id={artistId} />
            )
        })}
          </div>
        );
      } else {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <SongCard key={index} title={item.track_name} track_id={item.track_id} />

            ))}
          </div>
        );
      }
    } else {
      return <p>{JSON.stringify(data)}</p>;
    }
  };

  const SongCard = ({ title, track_id }: { title: string, track_id: string }, ) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    
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
          onClick={() => {setLiked(!liked);
            console.log(liked);
            handleFavorito(track_id, liked);
          } }
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
          onClick={() => {setIsPlaying(!isPlaying);
            registrarEscucha(track_id);
          }} 
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

  function registrarEscucha(trackId: string) {
    console.log(trackId);
    console.log(userId)
    fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/listen-to-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({trackId, userId }),
    })
    .then(response => {
      console.log(response)
      if (response.ok) {
        console.log('Relación ESCUCHO registrada exitosamente');
      } else {
        console.error('Error al registrar la relación ESCUCHO');
      }
    })
    .catch(error => console.error('Error en la solicitud:', error));
  }
  

  function handleFavorito(trackId: string, like: boolean) {
    console.log(trackId);
    console.log(userId);
    console.log(like);
    if (like == false){
    fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/add-to-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({trackId, userId }),
    })
    .then(response => {
      console.log(response)
      if (response.ok) {
        console.log('Relación TIENE EN FAVORITOS registrada exitosamente');
      } else {
        console.error('Error al registrar la relación TIENE EN FAVORITOS');
      }
    })
    .catch(error => console.error('Error en la solicitud:', error));
    }
    else{
      fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/quit-from-favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({trackId, userId }),
      })
      .then(response => {
        console.log(response)
        if (response.ok) {
          console.log('Relación TIENE EN FAVORITOS DESTRUIDA exitosamente');
        } else {
          console.error('Error al DESTRUIR la relación TIENE EN FAVORITOS');
        }
      })
      .catch(error => console.error('Error en la solicitud:', error));
      }
    }
    
  

  const ArtistCard = ({ artistName, artist_id }: { artistName: string , artist_id: number}) => {
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
          onClick={() => {setFollowing(!following)
            handleArtist(artist_id, following);
          }} 
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

  function handleArtist(artistId: number, follow: boolean) {
    console.log(artistId);
    console.log(userId);
    console.log(follow);
    if (follow == false){
    fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/follow-artist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({artistId, userId }),
    })
    .then(response => {
      console.log(response)
      if (response.ok) {
        console.log('Relación SIGUE A registrada exitosamente');
      } else {
        console.error('Error al registrar la relación SIGUE A');
      }
    })
    .catch(error => console.error('Error en la solicitud:', error));
    }
    else{
      fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/stop-following-artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({artistId, userId }),
      })
      .then(response => {
        console.log(response)
        if (response.ok) {
          console.log('Relación SIGUE A DESTRUIDA exitosamente');
        } else {
          console.error('Error al DESTRUIR la relación SIGUE A');
        }
      })
      .catch(error => console.error('Error en la solicitud:', error));
      }
    }

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


