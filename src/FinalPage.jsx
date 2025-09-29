import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Componente para el contador regresivo
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({})

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="countdown-display">
      <div className="countdown-unit">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">Días</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-number">{timeLeft.hours}</span>
        <span className="countdown-label">Horas</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-number">{timeLeft.minutes}</span>
        <span className="countdown-label">Minutos</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-number">{timeLeft.seconds}</span>
        <span className="countdown-label">Segundos</span>
      </div>
    </div>
  )
}

// Componente del modal de carta
const LetterModal = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="letter-envelope">
          <div className="letter-paper">
            <div className="letter-header">
              <div className="letter-seal">💕</div>
            </div>
            <div className="letter-body">
              <div className="letter-content">
                Mi querida Luci,

                Esta carta es para ti, la persona más especial en mi vida. Cada día que paso contigo es un regalo, y aunque esta página web es algo pequeño comparado con todo lo que sientes por mí, quiero que sepas que cada detalle lo hice pensando en ti.

                Eres mi luz, mi razón de sonreír, y la persona que hace que cada día valga la pena. Espero que esta pequeña sorpresa te haya hecho sonreír tanto como yo sonrío cuando pienso en ti.

                Te amo más de lo que las palabras pueden expresar.

                Con todo mi amor,
                Valen 💕

                P.D.: El contador de arriba cuenta los días hasta nuestro próximo encuentro especial. Cada segundo que pasa es un segundo menos para volver a estar juntos.
              </div>
            </div>
            <div className="letter-footer">
              <button className="btn btn-primary" onClick={onClose}>
                Cerrar carta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal de la página final
function FinalPage() {
  const [showLetter, setShowLetter] = useState(false)
  const targetDate = '2026-01-06T00:00:00'
  const navigate = useNavigate()

  // Verificar si el usuario completó el formulario correctamente
  useEffect(() => {
    const formularioCompletado = localStorage.getItem('luciFormularioCompletado')
    if (formularioCompletado !== 'true') {
      // Si no completó el formulario, redirigir a la página principal
      navigate('/')
    }
  }, [navigate])

  // Función para ir al álbum
  const goToAlbum = () => {
    navigate('/album')
  }

  return (
    <div className="final-container">
      <h1 className="title">Hola mi Luci, eres tú jeje… o eso espero eh chupa verga</h1>
      <p className="final-message">
        Sé que esto no es mucho pero es lo que te puedo dar ahora 💕
      </p>
      
      <div className="countdown-container">
        <h3 className="countdown-title">Tiempo hasta nuestro próximo encuentro:</h3>
        <CountdownTimer targetDate={targetDate} />
      </div>

      <div className="button-group" style={{marginTop: '30px'}}>
        <button 
          className="btn btn-primary letter-btn" 
          onClick={() => setShowLetter(true)}
        >
          📮 Ver Carta
        </button>
        <button 
          className="btn btn-primary letter-btn" 
          onClick={goToAlbum}
        >
          📚 Ver Álbum
        </button>
      </div>

      <LetterModal isOpen={showLetter} onClose={() => setShowLetter(false)} />
    </div>
  )
}

export default FinalPage
