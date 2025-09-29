import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AlbumPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Verificar si el usuario completó el formulario correctamente
  useEffect(() => {
    const formularioCompletado = localStorage.getItem('luciFormularioCompletado')
    if (formularioCompletado !== 'true') {
      // Si no completó el formulario, redirigir a la página principal
      navigate('/')
    }
  }, [navigate])

  // Función para volver a la página principal
  const handleBack = () => {
    navigate('/lucitin')
  }

  // Función para manejar la carga del iframe
  const handleIframeLoad = () => {
    setLoading(false)
  }

  return (
    <div className="album-container" style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          zIndex: 5
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p style={{ marginTop: '10px', fontSize: '18px' }}>Cargando el álbum...</p>
          </div>
        </div>
      )}
      
      <iframe 
        src="/luci-libro/index.html" 
        title="Álbum de Luci" 
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        loading="lazy"
        onLoad={handleIframeLoad}
      />
      
      <button 
        className="btn btn-primary back-btn" 
        onClick={handleBack}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000
        }}
      >
        ← Volver
      </button>
    </div>
  )
}

export default AlbumPage