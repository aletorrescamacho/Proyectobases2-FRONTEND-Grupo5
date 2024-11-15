'use client';
import { useState } from 'react';

interface SongResult {
  trackName: string;
  artistName: string;
  genreName: string;
}

interface ArtistResult {
  artists: string;
}

export default function ForYouPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Canción');
  const [displayType, setDisplayType] = useState('Canción');
  const [results, setResults] = useState<SongResult[] | ArtistResult[] | null>(null);

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
  const SongCard = ({ trackName, artistName, genreName }: { trackName: string; artistName: string; genreName: string }) => {
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
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        <p><strong>Título:</strong> {trackName}</p>
        <p><strong>Artista:</strong> {artistName}</p>
        <p><strong>Género:</strong> {genreName}</p>
        <button
          onClick={() => setLiked(!liked)}
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
          onClick={() => setIsPlaying(!isPlaying)}
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

  // Definición del componente ArtistCard
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
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        <p><strong>Artista:</strong> {artistName}</p>
        <button
          onClick={() => setFollowing(!following)}
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
              />
            ))
          ) : (
            (results as ArtistResult[]).map((item: ArtistResult, index: number) => (
              <ArtistCard
                key={index}
                artistName={item.artists} // Usa "artists" para el nombre del artista
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}
