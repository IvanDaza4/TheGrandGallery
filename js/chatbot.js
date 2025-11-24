// ============================================
// CHATBOT FORMALIZADO Y MEJORADO
// The Grand Gallery - Asistente Virtual
// ============================================

// Configuración de estilos de Tailwind
const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0a0a0a",
        "surface-dark": "#1a1a1a",
        "surface-light": "#2a2a2a",
        "accent-gold": "#d4af37",
        "accent-gold-light": "#f0d878",
        "text-primary": "#f5f5f5",
        "text-secondary": "#a0a0a0",
        "luxury-gold": "#D4AF37",
        "luxury-bronze": "#CD7F32",
        "luxury-dark": "#0F0F0F",
        "luxury-gray": "#1A1A1A",
        "luxury-light": "#F8F8F8",
        "luxury-cream": "#FFF8E7",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        fadeIn: "fadeIn 0.4s ease-out",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
}

// Inyectar estilos CSS en el documento
function injectStyles() {
  const styleId = "chatbot-styles"
  if (document.getElementById(styleId)) return

  const styles = `
    <style id="${styleId}">
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

      /* Variables de diseño */
      :root {
        --luxury-gold: #d4af37;
        --luxury-bronze: #CD7F32;
        --luxury-dark: #0F0F0F;
        --luxury-gray: #1A1A1A;
        --luxury-light: #F8F8F8;
        --luxury-cream: #FFF8E7;
        --text-primary: #f5f5f5;
        --text-secondary: #a0a0a0;
      }

      /* Animaciones */
      @keyframes slideInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeInScale {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      /* Contenedor del chatbot */
      #chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-family: 'Inter', sans-serif;
        z-index: 9999;
      }

      /* Botón toggle */
      #chatbot-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--luxury-gold), var(--luxury-bronze));
        border: 2px solid var(--luxury-gold);
        color: var(--luxury-dark);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: fadeInScale 0.4s ease-out;
      }

      #chatbot-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 32px rgba(212, 175, 55, 0.45);
      }

      #chatbot-toggle:active {
        transform: scale(0.95);
      }

      /* Ventana del chatbot */
      #chatbot-window {
        position: absolute;
        bottom: 90px;
        right: 0;
        width: 420px;
        height: 600px;
        background: var(--luxury-dark);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        animation: slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 1px solid rgba(212, 175, 55, 0.2);
        overflow: hidden;
      }

      #chatbot-window.hidden {
        display: none;
      }

      /* Header del chatbot */
      .chatbot-header {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(205, 127, 50, 0.1));
        padding: 20px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-header-title {
        font-family: 'Playfair Display', serif;
        font-size: 18px;
        font-weight: 700;
        color: var(--luxury-gold);
        margin: 0;
      }

      .chatbot-header-subtitle {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 4px 0 0 0;
      }

      #chatbot-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 20px;
        padding: 0;
        transition: color 0.2s;
      }

      #chatbot-close:hover {
        color: var(--luxury-gold);
      }

      /* Área de mensajes */
      #chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: var(--luxury-dark);
      }

      #chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }

      #chatbot-messages::-webkit-scrollbar-track {
        background: rgba(212, 175, 55, 0.05);
        border-radius: 10px;
      }

      #chatbot-messages::-webkit-scrollbar-thumb {
        background: var(--luxury-gold);
        border-radius: 10px;
      }

      #chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: var(--luxury-bronze);
      }

      /* Mensaje del usuario */
      .chatbot-message-user {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        animation: slideInUp 0.3s ease-out;
      }

      .chatbot-message-user-text {
        background: linear-gradient(135deg, var(--luxury-gold), var(--luxury-bronze));
        color: var(--luxury-dark);
        padding: 12px 16px;
        border-radius: 12px 12px 4px 12px;
        max-width: 85%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
      }

      /* Mensaje del bot */
      .chatbot-message-bot {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        animation: slideInUp 0.3s ease-out;
      }

      .chatbot-message-bot-text {
        background: var(--luxury-gray);
        color: var(--text-primary);
        padding: 12px 16px;
        border-radius: 12px 12px 12px 4px;
        border-left: 3px solid var(--luxury-gold);
        max-width: 85%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.5;
      }

      /* Hora del mensaje */
      .chatbot-message-time {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 4px;
      }

      /* Loading */
      #chatbot-loading {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 12px 16px;
      }

      .loading-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--luxury-gold);
        animation: pulse 1.4s infinite;
      }

      .loading-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .loading-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      /* FAQ Buttons */
      #faq-buttons {
        padding: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .faq-btn {
        background: rgba(212, 175, 55, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: var(--text-primary);
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s;
        font-weight: 500;
      }

      .faq-btn:hover {
        background: rgba(212, 175, 55, 0.15);
        border-color: var(--luxury-gold);
      }

      .faq-btn:active {
        transform: scale(0.95);
      }

      /* Formulario de entrada */
      #chatbot-form {
        display: flex;
        gap: 8px;
        padding: 16px;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        background: var(--luxury-dark);
      }

      #chatbot-input {
        flex: 1;
        background: var(--luxury-gray);
        border: 1px solid rgba(212, 175, 55, 0.2);
        color: var(--text-primary);
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        transition: all 0.3s;
        resize: none;
        max-height: 100px;
      }

      #chatbot-input:focus {
        outline: none;
        border-color: var(--luxury-gold);
        background: rgba(212, 175, 55, 0.05);
      }

      #chatbot-input::placeholder {
        color: var(--text-secondary);
      }

      #chatbot-submit {
        background: linear-gradient(135deg, var(--luxury-gold), var(--luxury-bronze));
        border: none;
        color: var(--luxury-dark);
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
        font-size: 14px;
      }

      #chatbot-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(212, 175, 55, 0.3);
      }

      #chatbot-submit:active {
        transform: translateY(0);
      }

      /* Responsive */
      @media (max-width: 480px) {
        #chatbot-window {
          width: 100vw;
          height: 100vh;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }

        #chatbot-toggle {
          display: none;
        }
      }
    </style>
  `

  document.head.insertAdjacentHTML("beforeend", styles)
}

// Clase del Chatbot mejorado
class Chatbot {
  constructor() {
    this.isOpen = false
    this.conversationHistory = []
    this.responseDelay = 800
    this.init()
  }

  init() {
    injectStyles()
    this.createChatbotUI()
    this.attachEventListeners()
  }

  createChatbotUI() {
    const container = document.getElementById("chatbot-container")
    if (!container) return

    container.innerHTML = `
      <button id="chatbot-toggle" aria-label="Abrir asistente virtual" aria-expanded="false" title="Asistente Virtual">💬</button>
      
      <div id="chatbot-window" class="hidden">
        <!-- Header -->
        <div class="chatbot-header">
          <div>
            <h2 class="chatbot-header-title">Asistente Virtual</h2>
            <p class="chatbot-header-subtitle">Siempre a tu disposición</p>
          </div>
          <button id="chatbot-close" aria-label="Cerrar asistente" title="Cerrar">✕</button>
        </div>

        <!-- Mensajes -->
        <div id="chatbot-messages"></div>

        <!-- FAQ Buttons -->
        <div id="faq-buttons">
          <button class="faq-btn" data-question="horarios">¿Cuáles son los horarios?</button>
          <button class="faq-btn" data-question="estacionamiento">¿Tienen estacionamiento?</button>
          <button class="faq-btn" data-question="ubicacion">¿Dónde están ubicados?</button>
          <button class="faq-btn" data-question="servicios">¿Qué servicios ofrecen?</button>
          <button class="faq-btn" data-question="membresía">¿Qué es la membresía Premium?</button>
          <button class="faq-btn" data-question="eventos">¿Qué eventos tienen?</button>
        </div>

        <!-- Formulario -->
        <form id="chatbot-form">
          <input 
            id="chatbot-input" 
            type="text" 
            placeholder="Escribe tu pregunta..." 
            maxlength="500"
            aria-label="Campo de mensaje"
          />
          <button id="chatbot-submit" type="submit" aria-label="Enviar mensaje">↗</button>
        </form>
      </div>
    `

    // Agregar mensaje inicial
    setTimeout(() => {
      this.addBotResponse("¡Hola! Soy tu asistente virtual en The Grand Gallery. ¿En qué puedo ayudarte hoy?")
    }, 300)
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById("chatbot-toggle")
    const closeBtn = document.getElementById("chatbot-close")
    const form = document.getElementById("chatbot-form")
    const faqButtons = document.querySelectorAll(".faq-btn")

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleChat())
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeChat())
    }

    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e))
    }

    faqButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFAQ(e))
    })
  }

  toggleChat() {
    const chatWindow = document.getElementById("chatbot-window")
    const toggle = document.getElementById("chatbot-toggle")

    if (!chatWindow || !toggle) return

    this.isOpen = !this.isOpen

    if (this.isOpen) {
      chatWindow.classList.remove("hidden")
      toggle.setAttribute("aria-expanded", "true")
      toggle.setAttribute("aria-label", "Cerrar asistente virtual")
      setTimeout(() => {
        document.getElementById("chatbot-input")?.focus()
      }, 100)
    } else {
      chatWindow.classList.add("hidden")
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-label", "Abrir asistente virtual")
    }
  }

  closeChat() {
    this.isOpen = false
    const chatWindow = document.getElementById("chatbot-window")
    const toggle = document.getElementById("chatbot-toggle")

    if (chatWindow) chatWindow.classList.add("hidden")
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-label", "Abrir asistente virtual")
      toggle.focus()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const input = document.getElementById("chatbot-input")
    if (!input) return

    const message = input.value.trim()
    if (!message) return

    this.addUserMessage(message)
    input.value = ""

    this.showLoading()

    setTimeout(() => {
      this.removeLoading()
      this.addBotResponse(message)
    }, this.responseDelay)
  }

  handleFAQ(e) {
    const question = e.target.getAttribute("data-question")
    const questionText = e.target.textContent.trim()

    this.addUserMessage(questionText)

    const faqContainer = document.getElementById("faq-buttons")
    if (faqContainer) {
      faqContainer.style.display = "none"
    }

    this.showLoading()

    setTimeout(() => {
      this.removeLoading()
      this.addBotResponse(questionText, question)
    }, this.responseDelay)
  }

  addUserMessage(message) {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const messageEl = document.createElement("div")
    messageEl.className = "chatbot-message-user"
    messageEl.innerHTML = `
      <div class="chatbot-message-user-text">${this.escapeHtml(message)}</div>
      <span class="chatbot-message-time">${this.getCurrentTime()}</span>
    `

    container.appendChild(messageEl)
    this.scrollToBottom()

    this.conversationHistory.push({
      role: "user",
      message,
      time: new Date(),
    })
  }

  addBotResponse(userMessage, faqType = null) {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const response = this.generateResponse(userMessage, faqType)

    const messageEl = document.createElement("div")
    messageEl.className = "chatbot-message-bot"
    messageEl.innerHTML = `
      <div class="chatbot-message-bot-text">${response}</div>
      <span class="chatbot-message-time">${this.getCurrentTime()}</span>
    `

    container.appendChild(messageEl)
    this.scrollToBottom()

    this.conversationHistory.push({
      role: "bot",
      message: response,
      time: new Date(),
    })
  }

  generateResponse(message, faqType) {
    const responses = {
      horarios: `<strong>Horarios de atención:</strong><br/>
        • <strong>Lunes a Sábado:</strong> 10:00 - 22:00 hs<br/>
        • <strong>Domingos:</strong> 12:00 - 21:00 hs<br/>
        • <strong>Feriados:</strong> 12:00 - 20:00 hs<br/>
        <br/>Durante la temporada de compras (Nov-Dic) ampliamos horarios. ¿Necesitas algo más?`,

      estacionamiento: `<strong>Servicio de Estacionamiento:</strong><br/>
        ✓ 200+ espacios disponibles<br/>
        ✓ Acceso por Av. Int. Bulrich<br/>
        ✓ Gratuito para clientes (1º hora incluida)<br/>
        ✓ Tarifas especiales con membresía<br/>
        ✓ Carga de vehículos eléctricos<br/>
        <br/>¿Te gustaría saber sobre nuestros servicios premium?`,

      ubicacion: `<strong>Nuestra Ubicación:</strong><br/>
        📍 <strong>Av. Int. Bulrich 345</strong><br/>
        Recoleta, Buenos Aires<br/>
        <br/><strong>Acceso por transporte público:</strong><br/>
        • Líneas 10, 25, 47, 60, 92<br/>
        • Estación Subte D (Catedral)<br/>
        <br/>Estamos en el corazón del barrio más exclusivo de la ciudad.`,

      servicios: `<strong>Servicios Disponibles:</strong><br/>
        ✨ Asesoría personalizada de estilo<br/>
        🎁 Envoltorio de regalo premium<br/>
        💳 Financiación sin interés<br/>
        🚚 Entrega a domicilio<br/>
        👔 Alteraciones y ajustes<br/>
        📱 Compra online con entrega en tienda<br/>
        ☕ Lounge VIP con café y champagne<br/>
        <br/>¿Te interesa alguno en particular?`,

      membresía: `<strong>Membresía Premium The Grand Gallery:</strong><br/>
        👑 Acceso exclusivo a colecciones privadas<br/>
        🎊 Invitaciones a eventos y lanzamientos<br/>
        💰 Descuentos especiales (10-20%)<br/>
        🎁 Regalo de bienvenida<br/>
        🚚 Envío gratis en compras<br/>
        ⏰ Acceso temprano a rebajas<br/>
        📞 Atención prioritaria 24/7<br/>
        <br/>Inversión anual: $5.000 | <a href="#">Solicitar información</a>`,

      eventos: `<strong>Próximos Eventos:</strong><br/>
        📅 <strong>Diciembre 1-3:</strong> Fashion Week Exclusiva<br/>
        🎄 <strong>Diciembre 15:</strong> Gala Navideña<br/>
        🥂 <strong>Diciembre 22:</strong> Happy Hour Premium<br/>
        ✨ <strong>Enero 10:</strong> Lanzamiento Colección SS25<br/>
        <br/>Suscríbete a nuestro newsletter para no perderte ningún evento.`,

      ofertas: `<strong>Ofertas y Promociones:</strong><br/>
        🔥 <strong>Black Friday extendido:</strong> -30% en seleccionados<br/>
        💎 <strong>2x1 en accesorios</strong> (hasta el 30/11)<br/>
        🎁 <strong>Compra + regala:</strong> Envía otro producto gratis<br/>
        ⏰ <strong>Flash Sales:</strong> Jueves 20-22hs<br/>
        <br/>Explora todas las ofertas o dime qué buscas.`,

      entregas: `<strong>Opciones de Entrega:</strong><br/>
        🏠 <strong>A domicilio:</strong> CABA en 24hs<br/>
        🏪 <strong>Retiro en tienda:</strong> Inmediato<br/>
        📦 <strong>Interior del país:</strong> 3-5 días hábiles<br/>
        🌍 <strong>Internacional:</strong> Consultar tiempo y costo<br/>
        ✓ Embalaje premium incluido<br/>
        ✓ Aseguro de envío gratuito<br/>
        <br/>¿A dónde necesitas el envío?`,

      garantia: `<strong>Política de Garantía:</strong><br/>
        ⭐ Garantía de autenticidad (100%)<br/>
        🔄 Cambio sin cargo en 30 días<br/>
        ↩️ Devolución sin preguntas en 7 días<br/>
        🛡️ Protección de compra 12 meses<br/>
        🔧 Reparaciones gratuitas (primer año)<br/>
        <br/>Tu satisfacción es nuestro compromiso.`,

      pagos: `<strong>Métodos de Pago:</strong><br/>
        💳 Tarjetas de crédito y débito (todas)<br/>
        🏦 Transferencia bancaria<br/>
        💰 Efectivo en tienda<br/>
        📱 Billeteras digitales (MercadoPago, etc)<br/>
        ⏰ Cuotas sin interés (hasta 12 meses)<br/>
        💎 Promociones especiales por banco<br/>
        <br/>¿Cuál es tu método preferido?`,

      bienvenida: `
      👋 <strong>¡Hola! Bienvenido/a a The Grand Gallery</strong><br/>
      Estoy aquí para ayudarte 😊<br/>
      Puedes preguntarme por:<br/>
      • Horarios<br/>
      • Ofertas<br/>
      • Servicios<br/>
      • Ubicación<br/>
      • Membresías<br/>
      <br/>¿En qué puedo ayudarte hoy?
    `,

      saludo: `
      😊 <strong>¡Hola!</strong><br/>
      Qué gusto verte por aquí.<br/>
      ¿Buscas algo en especial o quieres que te recomiende algo?
    `,

      gracias: `
      🙌 <strong>¡Gracias a ti!</strong><br/>
      Fue un placer ayudarte.<br/>
      Si necesitas algo más, estaré por aquí 💬
    `,

      despedida: `
      👋 <strong>¡Hasta luego!</strong><br/>
      Gracias por visitar The Grand Gallery.<br/>
      ¡Que tengas un excelente día! ✨
    `,

      ayuda: `
      🤝 <strong>¡Estoy aquí para ayudarte!</strong><br/>
      Puedes preguntarme cosas como:<br/>
      • "¿Cuáles son sus horarios?"<br/>
      • "¿Dónde están ubicados?"<br/>
      • "¿Qué promociones tienen?"<br/>
      • "Quiero saber sobre envíos"<br/>
      <br/>¿Qué te gustaría saber?
    `,

      recomendaciones: `
      🛍️ <strong>Recomendaciones personalizadas</strong><br/>
      Cuéntame:<br/>
      • ¿Buscas algo para hombre o mujer?<br/>
      • ¿Es para uso diario o una ocasión especial?<br/>
      <br/>Así puedo ayudarte mejor 😊
    `,

      estadoPedido: `
      📦 <strong>Seguimiento de tu pedido</strong><br/>
      Por favor, ingresa tu número de orden para ayudarte.
    `,

      problemas: `
      ⚠️ <strong>Lamentamos el inconveniente</strong><br/>
      Cuéntame qué problema tuviste y trataré de ayudarte lo antes posible 🙏
    `,

      contactoHumano: `
      👨‍💼 <strong>Hablar con un asesor</strong><br/>
      Puedo derivarte con un asesor humano.<br/>
      Déjame tu correo o número de contacto 📩
    `,


    }


    if (faqType && responses[faqType]) {
      return responses[faqType]
    }

    const lowerMessage = message.toLowerCase()
    const text = message.toLowerCase();

    // Búsqueda por palabras clave mejorada
    if (
      lowerMessage.includes("horario") ||
      lowerMessage.includes("hora") ||
      lowerMessage.includes("abierto") ||
      lowerMessage.includes("cerrado")
    ) {
      return responses.horarios
    }

    if (
      lowerMessage.includes("estacionamiento") ||
      lowerMessage.includes("parking") ||
      lowerMessage.includes("auto") ||
      lowerMessage.includes("auto")
    ) {
      return responses.estacionamiento
    }

    if (
      lowerMessage.includes("ubicacion") ||
      lowerMessage.includes("donde") ||
      lowerMessage.includes("dirección") ||
      lowerMessage.includes("como llegar") ||
      lowerMessage.includes("localidad")
    ) {
      return responses.ubicacion
    }

    if (
      lowerMessage.includes("servicio") ||
      lowerMessage.includes("que ofrecen") ||
      lowerMessage.includes("que hacen")
    ) {
      return responses.servicios
    }

    if (
      lowerMessage.includes("membresía") ||
      lowerMessage.includes("membership") ||
      lowerMessage.includes("premium") ||
      lowerMessage.includes("vip")
    ) {
      return responses.membresía
    }

    if (
      lowerMessage.includes("evento") ||
      lowerMessage.includes("eventos") ||
      lowerMessage.includes("gala") ||
      lowerMessage.includes("fashion week")
    ) {
      return responses.eventos
    }

    if (
      lowerMessage.includes("oferta") ||
      lowerMessage.includes("descuento") ||
      lowerMessage.includes("promocion") ||
      lowerMessage.includes("promo") ||
      lowerMessage.includes("rebaja")
    ) {
      return responses.ofertas
    }

    if (
      lowerMessage.includes("entrega") ||
      lowerMessage.includes("envio") ||
      lowerMessage.includes("envío") ||
      lowerMessage.includes("domicilio") ||
      lowerMessage.includes("retiro")
    ) {
      return responses.entregas
    }

    if (
      lowerMessage.includes("garantia") ||
      lowerMessage.includes("cambio") ||
      lowerMessage.includes("devolución") ||
      lowerMessage.includes("devolucion") ||
      lowerMessage.includes("reclamo")
    ) {
      return responses.garantia
    }


    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenas") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("buen dia") ||
      lowerMessage.includes("buen día") ||
      lowerMessage.includes("buenas tardes") ||
      lowerMessage.includes("buenas noches")
    ) {
      return responses.saludo
    }

    if (
      lowerMessage.includes("gracias") ||
      lowerMessage.includes("muchas gracias") ||
      lowerMessage.includes("thanks")
    ) {
      return responses.gracias
    }

    if (
      lowerMessage.includes("chau") ||
      lowerMessage.includes("adiós") ||
      lowerMessage.includes("adios") ||
      lowerMessage.includes("nos vemos") ||
      lowerMessage.includes("hasta luego")
    ) {
      return responses.despedida
    }

    if (
      lowerMessage.includes("ayuda") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("auxilio")
    ) {
      return responses.ayuda
    }

    if (
      lowerMessage.includes("recomendaciones") ||
      lowerMessage.includes("recomienda") ||
      lowerMessage.includes("sugerir") ||
      lowerMessage.includes("sugerime")
    ) {
      return responses.recomendaciones
    }

    if (
      lowerMessage.includes("pedido") ||
      lowerMessage.includes("orden") ||
      lowerMessage.includes("seguimiento") ||
      lowerMessage.includes("envio") ||
      lowerMessage.includes("envío")
    ) {
      return responses.estadoPedido
    }

    if (
      lowerMessage.includes("problema") ||
      lowerMessage.includes("error") ||
      lowerMessage.includes("fallo") ||
      lowerMessage.includes("no funciona")
    ) {
      return responses.problemas
    }

    if (
      lowerMessage.includes("asesor") ||
      lowerMessage.includes("humano") ||
      lowerMessage.includes("persona real") ||
      lowerMessage.includes("hablar con alguien")
    ) {
      return responses.contactoHumano
    }


    if (
      lowerMessage.includes("pago") ||
      lowerMessage.includes("tarjeta") ||
      lowerMessage.includes("cuota") ||
      lowerMessage.includes("financiacion") ||
      lowerMessage.includes("financiación")
    ) {
      return responses.pagos
    }

    if (
      lowerMessage.includes("local") ||
      lowerMessage.includes("tienda") ||
      lowerMessage.includes("marca") ||
      lowerMessage.includes("negocio")
    ) {
      return `Contamos con más de 50 locales exclusivos de las mejores marcas internacionales y nacionales. ¿Qué marca te interesa conocer?`
    }

    if (
      lowerMessage.includes("gastronomia") ||
      lowerMessage.includes("gastronomía") ||
      lowerMessage.includes("comida") ||
      lowerMessage.includes("restaurante") ||
      lowerMessage.includes("comer") ||
      lowerMessage.includes("café")
    ) {
      return `Nuestra zona gastronómica cuenta con <strong>8 restaurantes y bares premium</strong>, incluyendo opciones de cocina internacional, italiana y fusión. Perfecto para descansar entre compras. ¿Te gustaría recomendaciones?`
    }

    if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("whatsapp") ||
      lowerMessage.includes("llamar") ||
      lowerMessage.includes("teléfono") ||
      lowerMessage.includes("email")
    ) {
      return `<strong>Contáctanos:</strong><br/>
        📞 (011) 4808-1234<br/>
        📱 WhatsApp: +54 9 11 2345-6789<br/>
        📧 info@thegrandgallery.com.ar<br/>
        <br/>Horario de atención: L-S 10:00-22:00 | Dom 12:00-21:00`
    }

    // Respuesta por defecto amable y profesional
    return `Gracias por tu pregunta. Para consultas más específicas, te recomendamos contactarnos directamente:<br/><br/>
      📞 <strong>(011) 4808-1234</strong><br/>
      📱 <strong>WhatsApp:</strong> +54 9 11 2345-6789<br/>
      <br/>O elige una de las opciones arriba para más información. ¿Hay algo más en lo que pueda ayudarte?`
  }

  showLoading() {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const loadingEl = document.createElement("div")
    loadingEl.id = "chatbot-loading"
    loadingEl.innerHTML = `
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    `

    container.appendChild(loadingEl)
    this.scrollToBottom()
  }

  removeLoading() {
    const loading = document.getElementById("chatbot-loading")
    if (loading) loading.remove()
  }

  scrollToBottom() {
    const container = document.getElementById("chatbot-messages")
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 0)
    }
  }

  getCurrentTime() {
    const now = new Date()
    return now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Inicializar cuando el DOM está listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new Chatbot()
  })
} else {
  new Chatbot()
}
