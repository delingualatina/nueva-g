'use client';

import { useState } from 'react';
import { trackLead } from '@/lib/fpixel';

export default function AccessPage() {
  const [step, setStep] = useState(1);
  const [edad, setEdad] = useState('si');
  const [nombre, setNombre] = useState('');
  const [medioPago, setMedioPago] = useState('Mercado Pago / Billeteras virtuales');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const descartarUsuario = () => {
    alert('El acceso y la asignación de asesor están reservados exclusivamente para usuarios con saldo operativo disponible.');
    window.location.href = 'https://www.google.com';
  };

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const userName = nombre.trim() || 'Usuario';

    // FILTRO DE CORTE: Si no tiene saldo lo sacamos de la web SIN activar evento Lead de Meta ni mandarlo a WPP
    if (medioPago === 'sin_saldo') {
      descartarUsuario();
      return;
    }

    setIsSubmitting(true);

    // 1. DISPARO DEL PÍXEL (Solo si tiene saldo y va a WhatsApp)
    trackLead({
      content_name: `Acceso WhatsApp Asesor - ${medioPago}`,
      currency: 'ARS',
      value: 0.0,
    });

    // 2. REDIRECCIÓN A WHATSAPP
    setTimeout(() => {
      const rawNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491178968766';
      const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
      const mensaje = `Hola, completé el acceso en la web. Mi nombre es ${userName}, soy mayor de 18 y opero con ${medioPago}. Quiero habilitar mi usuario.`;
      const urlWhatsapp = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(mensaje)}`;
      window.location.href = urlWhatsapp;
    }, 300);
  };

  return (
    <>
      <div className="bg-glow-orb" aria-hidden="true" />

      <main className="page-container">
        {/* Insignias superiores */}
        <div className="status-badge">
          <span className="status-dot" />
          <span>SISTEMA 24/7 OPERATIVO</span>
        </div>

        <div className="platform-badge">
          💎 PLATAFORMA N° 1 DE ARGENTINA
        </div>

        {/* Contenedor tipo Tarjeta */}
        <div className="card">
          <h1 className="card-title">Configuración de acceso</h1>

          {/* PANTALLA 1 */}
          {step === 1 && (
            <div className="screen-fade" id="screen-1">
              <div className="step-text">
                <span>Paso 1 de 2</span>
                <span>50%</span>
              </div>

              <div
                className="progress-bar-bg"
                role="progressbar"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              >
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

                {/* Pregunta 2: Nombre o Apodo */}
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
                  <span>Continuar →</span>
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

              <div
                className="progress-bar-bg"
                role="progressbar"
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress-bar-fill" style={{ width: '100%' }} />
              </div>

              <form onSubmit={handleFinalSubmit}>
                {/* Pregunta de filtro de pago / solvencia */}
                <div className="question-block">
                  <label className="question-label">¿Qué medio utilizás para transferencias?</label>

                  <label
                    className={`option-label ${
                      medioPago === 'Mercado Pago / Billeteras virtuales' ? 'selected' : ''
                    }`}
                    onClick={() => setMedioPago('Mercado Pago / Billeteras virtuales')}
                  >
                    <input
                      type="radio"
                      name="medioPago"
                      value="Mercado Pago / Billeteras virtuales"
                      checked={medioPago === 'Mercado Pago / Billeteras virtuales'}
                      onChange={() => setMedioPago('Mercado Pago / Billeteras virtuales')}
                    />
                    <span>Mercado Pago / Billeteras virtuales</span>
                  </label>

                  <label
                    className={`option-label ${
                      medioPago === 'Transferencia bancaria (CBU/CVU)' ? 'selected' : ''
                    }`}
                    onClick={() => setMedioPago('Transferencia bancaria (CBU/CVU)')}
                  >
                    <input
                      type="radio"
                      name="medioPago"
                      value="Transferencia bancaria (CBU/CVU)"
                      checked={medioPago === 'Transferencia bancaria (CBU/CVU)'}
                      onChange={() => setMedioPago('Transferencia bancaria (CBU/CVU)')}
                    />
                    <span>Transferencia bancaria (CBU/CVU)</span>
                  </label>

                  <label
                    className="option-label"
                    style={{ opacity: 0.7 }}
                    onClick={descartarUsuario}
                  >
                    <input
                      type="radio"
                      name="medioPago"
                      value="sin_saldo"
                      onChange={descartarUsuario}
                    />
                    <span>No dispongo de saldo para transferir</span>
                  </label>
                </div>

                {/* Indicador de operador */}
                <div className="operator-chip">
                  <span className="status-dot" />
                  <span>Asignando operador disponible...</span>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
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

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                  <a
                    href="javascript:void(0)"
                    onClick={() => setStep(1)}
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    ← Volver al paso anterior
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
