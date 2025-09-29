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
                Hola mi luci, esta carta madafakin virtual es para ti mi miña, primero que nada feliz cumple bb, tienes ya 20 añotes, madre mia que rico una madura uf, bromita. Crecimos juntos mi niña, desde los 15 años que te veo todos los dias mi amor, y se que seran muchos mas, y seguro leas esta carta con 21, 22 y asi cada vez mas viejarda, como yo que triste. En unos dias nos veremos otra vez un fackin mes, es muy loco lo que voy a hacer porque osea wtf bro no se da miedo pero se que saldra todo bien, y todo sea por ver a mi niña, me gustas mucho mi amor, y sabes que eres el amor de mi vida, y creo que nunca te lo dije pero tienes un brillo propio bb, tipo donde vas iluminas a todo el mundo, eso me gusta mucho de ti y lo digo de verdad bb, tipo se que donde seas que vayas con el brillito que tienes te ira bien, porque no se si te das cuenta pero eres muy muy perfecta, y mira osea en te basto por ejemplo menos de una hora para convencer a 3 conchudas de que te aceptace en el piso, osea tienes algo bb que aunque este triste siempre esta mi niña, y es me encanta de ti, pero nada mi niña, el contador de la pagina funciona cuando quieras verlo debes en cuando miralo, te amo mucho y toy muy orgulloso de usted bb, porque a pesar de tener problemas como por ejemplo en casa, con amigos o conmigo, siempre sale adelante mi niña, y va logrando todo de apoquito y eso esta muy bien mi amor, te amo mucho, no se que mas decirle, pero eso mi amor, mañana a disfrutar con sus compas y yo a fackin estudiar y espero que le guste mi regalo de mañana aunque es pobre y no le puedo dar aun cosas chulas pero ya cuando tenga le dare cositas jeje, igual el regalo del 8 de octubre que llegara es espectacular, espero que te guste, te amo mi amor, nos vemos pronto mua ❤️
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
