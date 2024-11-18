'use client';
import { useState,useEffect } from 'react';


interface SongResult {
  trackName: string;
  artistName: string;
  genreName: string;
  trackId: string;
}

interface ArtistResult {
  artists: string;
  artist_id: any;
}

export default function ForYouPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Canción');
  const [displayType, setDisplayType] = useState('Canción');
  const [results, setResults] = useState<SongResult[] | ArtistResult[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  const handleSearch = async () => {
    const endpoint = searchType === 'Canción' ? 'search/search-song' : 'search/search-artist';

    try {
      const response = await fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchTerm }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error en la búsqueda: ${response.status} - ${errorText}`);
        setResults(null);
        return;
      }

      const data = await response.json();
      setResults(data);
      setDisplayType(searchType); // Actualiza displayType solo cuando se realiza la búsqueda
    } catch (error) {
      console.error('Error de conexión:', error);
      setResults(null);
    }
  };

  // Definición del componente SongCard
  const SongCard = ({ trackName, artistName, genreName, trackId}: { trackName: string; artistName: string; genreName: string; trackId: string }) => {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
      // Verifica si la canción está en favoritos al cargar el componente
      const checkFavoriteStatus = async () => {
        try {
          const response = await fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/search/check-favorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, trackName }),
          });


          const data = await response.json();
          setLiked(data); // `data` es `true` si la relación existe, `false` si no

          
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };

      if (userId) {
        checkFavoriteStatus();
      }
    }, [trackName, userId]);

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
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        <p><strong>Título:</strong> {trackName}</p>
        <p><strong>Artista:</strong> {artistName}</p>
        <p><strong>Género:</strong> {genreName}</p>
        <button
          onClick={() => {setLiked(!liked);
            handleFavorito(trackId, liked)
          }
          }
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            color: liked ? 'black' : 'gray',
            cursor: 'pointer',
          }}
        >
          ♥
        </button>
        <button
          onClick={() => {setIsPlaying(!isPlaying);
            registrarEscucha(trackId);
          }}
          style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
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



  // Definición del componente ArtistCard
  const ArtistCard = ({ artistName, artistId}: { artistName: string, artistId: any }) => {
    const [following, setFollowing] = useState(false);

    useEffect(() => {
      // Verifica si sigue al artista
      const checkFollowStatus = async () => {
        try {
          const response = await fetch(`https://proyectobases2-backend-grupo5-production.up.railway.app/search/check-follow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, artistId }),
          });


          const data = await response.json();
          setFollowing(data); // `data` es `true` si la relación existe, `false` si no

          
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      };

      if (userId) {
        checkFollowStatus();
      }
    }, [artistName, userId]);

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
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        <p><strong>Artista:</strong> {artistName}</p>
        <button
          onClick={() => {setFollowing(!following);
            handleArtist(artistId, following);
          }
        }
          style={{
            backgroundColor: following ? '#4CAF50' : '#f0f0f0',
            color: following ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          {following ? 'Seguido' : 'Seguir'}
        </button>
      </div>
    );
  };

  function handleArtist(artistId: any, follow: boolean) {
    artistId= artistId?.low ?? artistId
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
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Busca aquí..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            backgroundColor: '#f0f0f0',
            width: '200px',
          }}
        />

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
          }}
        >
          <option value="Canción">Canción</option>
          <option value="Artista">Artista</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: 'black',
          }}
        >
          🔍
        </button>
      </div>

      {results && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}>
          {displayType === 'Canción' ? (
            (results as SongResult[]).map((item: SongResult, index: number) => (
              <SongCard
                key={index}
                trackName={item.trackName}
                artistName={item.artistName}
                genreName={item.genreName}
                trackId={item.trackId}
              />
            ))
          ) : (
            (results as ArtistResult[]).map((item: ArtistResult, index: number) => (
              <ArtistCard
                key={index}
                artistName={item.artists} // Usa "artists" para el nombre del artista
                artistId={item.artist_id?.low ?? item.artist_id}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}
