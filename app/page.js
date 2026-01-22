'use client'

import { useState } from 'react'

export default function Home() {
  const [catImages, setCatImages] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCats = async () => {
    setLoading(true)
    try {
      const responses = await Promise.all([
        fetch('https://api.thecatapi.com/v1/images/search'),
        fetch('https://api.thecatapi.com/v1/images/search')
      ])
      const data = await Promise.all(responses.map(r => r.json()))
      setCatImages([data[0][0].url, data[1][0].url])
    } catch (error) {
      console.error('Error fetching cats:', error)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '3.5rem',
        marginBottom: '2rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        🐱 Cat Me and Me 🐱
      </h1>

      <button
        onClick={fetchCats}
        disabled={loading}
        style={{
          padding: '15px 40px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: 'white',
          background: loading ? '#999' : '#ff6b6b',
          border: 'none',
          borderRadius: '50px',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          marginBottom: '3rem'
        }}
        onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        {loading ? 'Loading...' : 'Show Me Cats!'}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {catImages.map((url, index) => (
          <div key={index} style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img
              src={url}
              alt={`Cat ${index + 1}`}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              padding: '20px',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#667eea'
            }}>
              Cat #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {catImages.length === 0 && !loading && (
        <p style={{
          color: 'white',
          fontSize: '1.3rem',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Click the button above to see two adorable cats! 🐈 🐈
        </p>
      )}
    </div>
  )
}
