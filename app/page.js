'use client';

import { useState } from 'react';
import { trackLead } from '@/lib/fpixel';

export default function AccessPage() {
  const [step, setStep] = useState(1);
  const [edad, setEdad] = useState('si');
  const [nombre, setNombre] = useState('');
  const [atencion, setAtencion] = useState('Atención personalizada por WhatsApp 24hs');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAutomated = atencion === 'Automatizado por la página 24hs';

  const handleNextStep = (e) => {
    if (e) e.preventDefault();

    if (edad === 'no') {
      setErrorMessage('El acceso está disponible únicamente para mayores de 18 años.');
      return;
    }

    if (!nombre.trim()) {
      setErrorMessage('Por favor ingresá tu nombre o apodo para continuar.');
      return;
    }

    setErrorMessage('');
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const userName = nombre.trim() || 'Usuario';

    // Disparo del Píxel de Meta (Lead Event)
    trackLead({
      content_name: isAutomated ? 'Acceso Automatizado' : 'Acceso WhatsApp Asesor',
      currency: 'ARS',
      value: 0.0,
    });

    if (isAutomated) {
      // Redirección directa a la URL automatizada
      const automatedUrl =
        process.env.NEXT_PUBLIC_AUTOMATED_URL || 'https://ganamosunico.com/landing';
      window.location.href = automatedUrl;
    } else {
      // Mensaje dinámico y redirección a WhatsApp
      const rawNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491178968766';
      const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
      const mensaje = `Hola, completé el acceso en la web. Mi nombre es ${userName}, soy mayor de 18 y elijo: ${atencion}. Quiero abrir mi usuario.`;
      const urlWhatsapp = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(mensaje)}`;
      window.location.href = urlWhatsapp;
    }
  };

  return (
    <>
      <div className="bg-glow-orb" aria-hidden="true" />

      <main className="page-container">
        {/* Insignias superiores de confianza */}
        <div className="status-badge">
          <span className="status-dot" />
          <span>SISTEMA 24/7 OPERATIVO</span>
        </div>

        <div className="platform-badge">
          💎 PLATAFORMA Nº 1 DE ARGENTINA
        </div>

        {/* Tarjeta de Acceso */}
        <div className="card">
          <h1 className="card-title">Configuración de acceso</h1>

          {/* PANTALLA 1 */}
          {step === 1 && (
            <div className="screen-fade" id="screen-1">
              <div className="step-text">
                <span>Paso 1 de 2</span>
                <span>50%</span>
              </div>

              <div className="progress-bar-bg" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar-fill" style={{ width: '50%' }} />
              </div>

              {errorMessage && (
                <div className="error-message" role="alert">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleNextStep}>
                {/* Pregunta 1: Edad */}
                <div className="question-block">
                  <label className="question-label">¿Confirmás que sos mayor de 18 años?</label>

                  <label
                    className={`option-label ${edad === 'si' ? 'selected' : ''}`}
                    onClick={() => setEdad('si')}
                  >
                    <input
                      type="radio"
                      name="edad"
                      value="si"
                      checked={edad === 'si'}
                      onChange={() => setEdad('si')}
                    />
                    <span>Sí, soy mayor de edad</span>
                  </label>

                  <label
                    className={`option-label ${edad === 'no' ? 'selected' : ''}`}
                    onClick={() => setEdad('no')}
                  >
                    <input
                      type="radio"
                      name="edad"
                      value="no"
                      checked={edad === 'no'}
                      onChange={() => setEdad('no')}
                    />
                    <span>No</span>
                  </label>
                </div>

                {/* Pregunta 2: Nombre */}
                <div className="question-block">
                  <label htmlFor="nombreInput" className="question-label">
                    Ingresá tu nombre o apodo
                  </label>
                  <input
                    type="text"
                    id="nombreInput"
                    className="input-text"
                    placeholder="Escribí acá tu nombre..."
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <button type="submit" className="btn-next" id="btn-continue">
                  <span>Continuar</span>
                  <span>→</span>
                </button>
              </form>
            </div>
          )}

          {/* PANTALLA 2 */}
          {step === 2 && (
            <div className="screen-fade" id="screen-2">
              <div className="step-text">
                <span>Paso 2 de 2</span>
                <span>100%</span>
              </div>

              <div className="progress-bar-bg" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar-fill" style={{ width: '100%' }} />
              </div>

              <form onSubmit={handleFinalSubmit}>
                {/* Pregunta 3: Atención */}
                <div className="question-block">
                  <label className="question-label">¿Cómo preferís la atención?</label>

                  <label
                    className={`option-label ${
                      atencion === 'Atención personalizada por WhatsApp 24hs' ? 'selected' : ''
                    }`}
                    onClick={() => setAtencion('Atención personalizada por WhatsApp 24hs')}
                  >
                    <input
                      type="radio"
                      name="atencion"
                      value="Atención personalizada por WhatsApp 24hs"
                      checked={atencion === 'Atención personalizada por WhatsApp 24hs'}
                      onChange={() => setAtencion('Atención personalizada por WhatsApp 24hs')}
                    />
                    <span>Atención personalizada por WhatsApp 24hs</span>
                  </label>

                  <label
                    className={`option-label ${
                      atencion === 'Automatizado por la página 24hs' ? 'selected' : ''
                    }`}
                    onClick={() => setAtencion('Automatizado por la página 24hs')}
                  >
                    <input
                      type="radio"
                      name="atencion"
                      value="Automatizado por la página 24hs"
                      checked={atencion === 'Automatizado por la página 24hs'}
                      onChange={() => setAtencion('Automatizado por la página 24hs')}
                    />
                    <span>Automatizado por la página 24hs</span>
                  </label>
                </div>

                {/* Chip Dinámico de Estado */}
                <div className={`operator-chip ${isAutomated ? 'automated' : ''}`}>
                  <span className={`status-dot ${isAutomated ? 'automated' : ''}`} />
                  <span>
                    {isAutomated
                      ? 'Redirección automatizada lista...'
                      : 'Asignando operador disponible...'}
                  </span>
                </div>

                {/* Botón Dinámico de Acción */}
                {isAutomated ? (
                  <button
                    type="submit"
                    className="btn-submit-automated"
                    id="btn-submit-action"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Ingresando...' : 'Ingresar directamente a la página'}</span>
                    <span>🚀</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-submit-whatsapp"
                    id="btn-submit-action"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? 'Conectando...'
                        : 'Generar acceso y chatear con asesor'}
                    </span>
                    <span>📲</span>
                  </button>
                )}

                <button
                  type="button"
                  className="btn-back"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >
                  ← Volver al paso anterior
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
