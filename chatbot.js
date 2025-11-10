// Chatbot functionality
class Chatbot {
  constructor() {
    this.isOpen = false
    this.conversationHistory = []
    this.init()
  }

  init() {
    this.createChatbotUI()
    this.attachEventListeners()
  }

  createChatbotUI() {
    const container = document.getElementById("chatbot-container")
    if (!container) return

    container.innerHTML = `
            <div id="chatbot-wrapper" class="fixed bottom-6 right-6 z-50">
                <!-- Chat Button -->
                <button 
                    id="chatbot-toggle" 
                    class="w-16 h-16 bg-accent-gold rounded-full shadow-2xl hover:bg-accent-gold-light transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent-gold/50"
                    aria-label="Abrir asistente virtual"
                    aria-expanded="false"
                    aria-controls="chatbot-window">
                    <svg class="w-8 h-8 mx-auto text-bg-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div 
                    id="chatbot-window" 
                    class="hidden absolute bottom-20 right-0 w-96 max-w-[calc(100vw-3rem)] bg-surface-dark rounded-2xl shadow-2xl border border-surface-light overflow-hidden"
                    role="dialog"
                    aria-labelledby="chatbot-title"
                    aria-modal="true">
                    
                    <!-- Header -->
                    <div class="bg-accent-gold p-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-10 h-10 bg-bg-dark rounded-full flex items-center justify-center mr-3">
                                <svg class="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 id="chatbot-title" class="font-bold text-bg-dark">Asistente Virtual</h2>
                                <p class="text-xs text-bg-dark/70">Estamos aquí para ayudarte</p>
                            </div>
                        </div>
                        <button 
                            id="chatbot-close" 
                            class="w-8 h-8 flex items-center justify-center rounded hover:bg-bg-dark/10 transition-colors focus:outline-none focus:ring-2 focus:ring-bg-dark"
                            aria-label="Cerrar asistente">
                            <svg class="w-5 h-5 text-bg-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div id="chatbot-messages" class="h-96 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-atomic="false">
                        <!-- Welcome message -->
                        <div class="flex items-start">
                            <div class="bg-surface-light rounded-lg p-3 max-w-[80%]">
                                <p class="text-sm">¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
                                <span class="text-xs text-text-secondary mt-1 block">${this.getCurrentTime()}</span>
                            </div>
                        </div>

                        <!-- FAQ Buttons -->
                        <div class="space-y-2" id="faq-buttons">
                            <p class="text-xs text-text-secondary mb-2">Preguntas frecuentes:</p>
                            <button class="faq-btn w-full text-left bg-surface-light hover:bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold" data-question="horarios">
                                ¿Cuáles son los horarios?
                            </button>
                            <button class="faq-btn w-full text-left bg-surface-light hover:bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold" data-question="estacionamiento">
                                ¿Tienen estacionamiento?
                            </button>
                            <button class="faq-btn w-full text-left bg-surface-light hover:bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold" data-question="ubicacion">
                                ¿Dónde están ubicados?
                            </button>
                            <button class="faq-btn w-full text-left bg-surface-light hover:bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold" data-question="ofertas">
                                ¿Qué ofertas tienen?
                            </button>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 border-t border-surface-light">
                        <form id="chatbot-form" class="flex gap-2">
                            <input 
                                type="text" 
                                id="chatbot-input" 
                                placeholder="Escribe tu mensaje..."
                                maxlength="500"
                                class="flex-1 bg-surface-light text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                                aria-label="Mensaje para el asistente virtual">
                            <button 
                                type="submit" 
                                class="bg-accent-gold text-bg-dark px-4 py-2 rounded-lg hover:bg-accent-gold-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold"
                                aria-label="Enviar mensaje">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </form>
                        <p class="text-xs text-text-secondary mt-2">Máximo 500 caracteres</p>
                    </div>
                </div>
            </div>
        `
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
    const window = document.getElementById("chatbot-window")
    const toggle = document.getElementById("chatbot-toggle")

    if (!window || !toggle) return

    this.isOpen = !this.isOpen

    if (this.isOpen) {
      window.classList.remove("hidden")
      toggle.setAttribute("aria-expanded", "true")
      toggle.setAttribute("aria-label", "Cerrar asistente virtual")
      // Focus on input when opening
      setTimeout(() => {
        document.getElementById("chatbot-input")?.focus()
      }, 100)
    } else {
      window.classList.add("hidden")
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-label", "Abrir asistente virtual")
    }
  }

  closeChat() {
    this.isOpen = false
    const window = document.getElementById("chatbot-window")
    const toggle = document.getElementById("chatbot-toggle")

    if (window) window.classList.add("hidden")
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-label", "Abrir asistente virtual")
      toggle.focus() // Return focus to toggle button
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

    // Show loading
    this.showLoading()

    // Simulate bot response
    setTimeout(() => {
      this.removeLoading()
      this.addBotResponse(message)
    }, 1000)
  }

  handleFAQ(e) {
    const question = e.target.getAttribute("data-question")
    const questionText = e.target.textContent.trim()

    this.addUserMessage(questionText)

    // Hide FAQ buttons after first interaction
    const faqContainer = document.getElementById("faq-buttons")
    if (faqContainer) {
      faqContainer.style.display = "none"
    }

    // Show loading
    this.showLoading()

    setTimeout(() => {
      this.removeLoading()
      this.addBotResponse(questionText, question)
    }, 800)
  }

  addUserMessage(message) {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const messageEl = document.createElement("div")
    messageEl.className = "flex items-start justify-end"
    messageEl.innerHTML = `
            <div class="bg-accent-gold text-bg-dark rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">${this.escapeHtml(message)}</p>
                <span class="text-xs text-bg-dark/70 mt-1 block">${this.getCurrentTime()}</span>
            </div>
        `

    container.appendChild(messageEl)
    this.scrollToBottom()

    this.conversationHistory.push({ role: "user", message, time: new Date() })
  }

  addBotResponse(userMessage, faqType = null) {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const response = this.generateResponse(userMessage, faqType)

    const messageEl = document.createElement("div")
    messageEl.className = "flex items-start"
    messageEl.innerHTML = `
            <div class="bg-surface-light rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">${response}</p>
                <span class="text-xs text-text-secondary mt-1 block">${this.getCurrentTime()}</span>
            </div>
        `

    container.appendChild(messageEl)
    this.scrollToBottom()

    this.conversationHistory.push({ role: "bot", message: response, time: new Date() })
  }

  generateResponse(message, faqType) {
    const responses = {
      horarios:
        "Nuestros horarios son:<br>• Lunes a Sábado: 10:00 - 22:00<br>• Domingos: 12:00 - 21:00<br><br>¿Necesitas algo más?",
      estacionamiento:
        "Sí, contamos con estacionamiento gratuito para clientes con más de 200 espacios disponibles. El acceso es por la calle principal. ¿Te gustaría saber más sobre nuestros servicios?",
      ubicacion:
        'Estamos ubicados en el corazón de la ciudad, en Av. Principal 1234. Puedes llegar en transporte público (líneas 10, 25, 47) o en auto. <a href="locales.html#mapa" class="text-accent-gold hover:underline">Ver mapa</a>',
      ofertas:
        'Tenemos ofertas increíbles esta semana. <a href="ofertas.html" class="text-accent-gold hover:underline">Ver todas las ofertas</a> o dime qué tipo de producto te interesa y te ayudo a encontrar descuentos.',
    }

    if (faqType && responses[faqType]) {
      return responses[faqType]
    }

    // Simple keyword matching
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("horario") || lowerMessage.includes("hora") || lowerMessage.includes("abierto")) {
      return responses.horarios
    }

    if (lowerMessage.includes("estacionamiento") || lowerMessage.includes("parking") || lowerMessage.includes("auto")) {
      return responses.estacionamiento
    }

    if (
      lowerMessage.includes("ubicacion") ||
      lowerMessage.includes("donde") ||
      lowerMessage.includes("dirección") ||
      lowerMessage.includes("como llegar")
    ) {
      return responses.ubicacion
    }

    if (
      lowerMessage.includes("oferta") ||
      lowerMessage.includes("descuento") ||
      lowerMessage.includes("promocion") ||
      lowerMessage.includes("promo")
    ) {
      return responses.ofertas
    }

    if (lowerMessage.includes("local") || lowerMessage.includes("tienda") || lowerMessage.includes("negocio")) {
      return 'Tenemos más de 50 locales exclusivos. <a href="locales.html" class="text-accent-gold hover:underline">Explora todos los locales</a> o dime qué tipo de local buscas.'
    }

    if (
      lowerMessage.includes("gastronomia") ||
      lowerMessage.includes("comida") ||
      lowerMessage.includes("restaurante") ||
      lowerMessage.includes("comer")
    ) {
      return 'Contamos con una amplia variedad gastronómica. <a href="gastronomia.html" class="text-accent-gold hover:underline">Ver opciones de gastronomía</a>'
    }

    // Default fallback
    return 'Gracias por tu mensaje. Para consultas específicas, puedes <a href="contacto.html" class="text-accent-gold hover:underline">contactarnos aquí</a> o llamarnos al (011) 1234-5678. ¿Hay algo más en lo que pueda ayudarte?'
  }

  showLoading() {
    const container = document.getElementById("chatbot-messages")
    if (!container) return

    const loadingEl = document.createElement("div")
    loadingEl.id = "chatbot-loading"
    loadingEl.className = "flex items-start"
    loadingEl.innerHTML = `
            <div class="bg-surface-light rounded-lg p-3">
                <div class="flex space-x-2">
                    <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
            </div>
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
      container.scrollTop = container.scrollHeight
    }
  }

  getCurrentTime() {
    const now = new Date()
    return now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new Chatbot()
  })
} else {
  new Chatbot()
}
