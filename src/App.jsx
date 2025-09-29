import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Componente para el screamer
const Screamer = ({ onRestart }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart()
    }, 3000) // 3 segundos de screamer

    return () => clearTimeout(timer)
  }, [onRestart])

  return (
    <div className="screamer-container">
      <video 
        className="screamer-video" 
        autoPlay 
        onEnded={onRestart}
      >
        <source src="/screamer.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>
  )
}


// Componente para el contador de error
const ErrorCountdown = ({ message, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(3)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Precargar el video
    const video = document.createElement('video')
    video.src = '/screamer.mp4'
    video.preload = 'auto'
    video.oncanplaythrough = () => setVideoLoaded(true)
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        // Reproducir pitido para cada segundo
        if (prev > 1) {
          playBeepSound()
        }
        
        if (prev <= 1) {
          clearInterval(timer)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Pitido inicial
    playBeepSound()

    return () => clearInterval(timer)
  }, [onComplete])

  const playBeepSound = () => {
    try {
      // Crear un pitido usando Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Si el contexto está suspendido (requiere interacción del usuario), intentar resumirlo
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          createBeep(audioContext)
        })
      } else {
        createBeep(audioContext)
      }
    } catch (error) {
      // Fallback: usar el método alternativo con HTML5 Audio
      playFallbackBeep()
    }
  }

  const createBeep = (audioContext) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // Frecuencia del pitido
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime) // Volumen
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2) // Fade out
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2) // Duración del pitido
  }

  const playFallbackBeep = () => {
    // Fallback usando HTML5 Audio con data URI
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OSdTgwOUarm7blmGgU7k9n1unEiBS13yO/eizEIHWq+8+OWT')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Si falla el audio, no hacer nada
    })
  }

  return (
    <div className="container">
      <div className="error-message">{message}</div>
      <div className="countdown">{timeLeft}</div>
      {videoLoaded && <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}></div>}
    </div>
  )
}

// Componente principal
function App() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState('start')
  const [showScreamer, setShowScreamer] = useState(false)
  const [errorCountdown, setErrorCountdown] = useState(null)
  
  // Estados para las preguntas
  const [years, setYears] = useState('')
  const [months, setMonths] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [giftAnswer, setGiftAnswer] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(1)

  const triggerScreamer = (message) => {
    setErrorCountdown(message)
  }

  const handleErrorComplete = () => {
    setErrorCountdown(null)
    setShowScreamer(true)
  }

  const restartApp = () => {
    setCurrentScreen('start')
    setShowScreamer(false)
    setErrorCountdown(null)
    setYears('')
    setMonths('')
    setSelectedSize('')
    setGiftAnswer('')
    setDay('')
    setMonth('')
    setFinalAnswer('')
    setCurrentQuestion(1)
  }

  const handleStartScreen = (isLuci) => {
    if (!isLuci) {
      triggerScreamer('Pues qué haces aquí, fuera chupa pitos')
    } else {
      setCurrentScreen('confirmation')
    }
  }

  const handleConfirmation = (isSure) => {
    if (!isSure) {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    } else {
      setCurrentScreen('questions')
    }
  }

  const handleQuestion1 = () => {
    if (years === '4' && months === '7') {
      setCurrentQuestion(2)
    } else {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    }
  }

  const handleQuestion2 = () => {
    if (selectedSize === '7cm') {
      setCurrentQuestion(3)
    } else {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    }
  }

  const handleQuestion3 = () => {
    const validAnswers = ['fuet', 'Fuet', 'FUET']
    if (validAnswers.includes(giftAnswer.trim())) {
      setCurrentQuestion(4)
    } else {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    }
  }

  const handleQuestion4 = () => {
    if (day === '2' && month === '2') {
      setCurrentQuestion(5)
    } else {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    }
  }

  const handleQuestion5 = () => {
    const validAnswers = ['nada', 'NADA', 'nd', 'ninguna', 'ninguna cosa', 'no existe']
    if (validAnswers.includes(finalAnswer.toLowerCase().trim())) {
      // Guardar en localStorage que completó el formulario correctamente
      localStorage.setItem('luciFormularioCompletado', 'true')
      navigate('/lucitin')
    } else {
      triggerScreamer('INCORRECTO FUERA DE AQUI')
    }
  }

  if (showScreamer) {
    return <Screamer onRestart={restartApp} />
  }

  if (errorCountdown) {
    return <ErrorCountdown message={errorCountdown} onComplete={handleErrorComplete} />
  }

  return (
    <div className="container">

      {currentScreen === 'start' && (
        <>
          <h1 className="title">Esta es una página para mi Luci, de Valen</h1>
          <p className="subtitle">¿Eres Luci?</p>
          <div className="button-group">
            <button 
              className="btn btn-primary" 
              onClick={() => handleStartScreen(true)}
            >
              Sí
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleStartScreen(false)}
            >
              No
            </button>
          </div>
        </>
      )}

      {currentScreen === 'confirmation' && (
        <>
          <h2 className="question">¿Segura que eres Luci?</h2>
          <div className="button-group">
            <button 
              className="btn btn-primary" 
              onClick={() => handleConfirmation(true)}
            >
              Que sí coño
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleConfirmation(false)}
            >
              Bueno no
            </button>
          </div>
        </>
      )}

      {currentScreen === 'questions' && (
        <>
          {currentQuestion === 1 && (
            <>
              <h2 className="question">¿Cuánto tiempo llevamos juntos?</h2>
              <div className="input-group">
                <input
                  type="number"
                  className="input-field"
                  placeholder="Años"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
                <span>años</span>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Meses"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                <span>meses</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleQuestion1}
              >
                Confirmar
              </button>
            </>
          )}

          {currentQuestion === 2 && (
            <>
              <h2 className="question">¿Cuánto me mide la poronga?</h2>
              <div className="options-grid">
                {['7cm', '9cm', '13cm', '16cm', '19cm', '22cm'].map((size) => (
                  <button
                    key={size}
                    className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleQuestion2}
                disabled={!selectedSize}
              >
                Confirmar
              </button>
            </>
          )}

          {currentQuestion === 3 && (
            <>
              <h2 className="question">Cuando te fui a ver, ¿qué te llevé de regalito?</h2>
              <input
                type="text"
                className="text-input"
                placeholder="Escribe tu respuesta..."
                value={giftAnswer}
                onChange={(e) => setGiftAnswer(e.target.value)}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleQuestion3}
              >
                Confirmar
              </button>
            </>
          )}

          {currentQuestion === 4 && (
            <>
              <h2 className="question">¿Cuál es nuestro aniversario?</h2>
              <div className="input-group">
                <input
                  type="number"
                  className="input-field"
                  placeholder="Día"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <span>de</span>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Mes"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleQuestion4}
              >
                Confirmar
              </button>
            </>
          )}

          {currentQuestion === 5 && (
            <>
              <h2 className="question">Dime qué es lo que NO me gusta de ti</h2>
              <input
                type="text"
                className="text-input"
                placeholder="Escribe tu respuesta..."
                value={finalAnswer}
                onChange={(e) => setFinalAnswer(e.target.value)}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleQuestion5}
              >
                Confirmar
              </button>
            </>
          )}
        </>
      )}

    </div>
  )
}

export default App
