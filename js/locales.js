// Store data
const storesData = [
  {
    id: 1,
    name: "Boutique Elegance",
    category: "moda",
    floor: "PB",
    location: "L-101",
    hours: "10:00-22:00",
    isOpen: true,
    tags: ["nuevo", "destacado"],
    url: "individual/local-1.html",
    x: 100,
    y: 100,
  },
  {
    id: 2,
    name: "Tech Hub",
    category: "tecnologia",
    floor: "PB",
    location: "L-102",
    hours: "10:00-22:00",
    isOpen: true,
    tags: ["destacado"],
    url: "individual/local-2.html",
    x: 250,
    y: 100,
  },
  {
    id: 3,
    name: "Deco Home",
    category: "decoracion",
    floor: "PB",
    location: "L-103",
    hours: "10:00-22:00",
    isOpen: true,
    tags: [],
    url: "individual/local-3.html",
    x: 400,
    y: 100,
  },
  {
    id: 4,
    name: "Sport Zone",
    category: "deportes",
    floor: "1",
    location: "L-201",
    hours: "10:00-22:00",
    isOpen: true,
    tags: [],
    url: "individual/local-4.html",
    x: 550,
    y: 100,
  },
  {
    id: 5,
    name: "Beauty Studio",
    category: "belleza",
    floor: "1",
    location: "L-202",
    hours: "10:00-22:00",
    isOpen: true,
    tags: ["nuevo"],
    url: "individual/local-5.html",
    x: 700,
    y: 100,
  },
  {
    id: 6,
    name: "Zapatería Premium",
    category: "moda",
    floor: "1",
    location: "L-203",
    hours: "10:00-22:00",
    isOpen: false,
    tags: [],
    url: "#",
    x: 100,
    y: 250,
  },
  {
    id: 7,
    name: "Joyería Brillante",
    category: "joyeria",
    floor: "2",
    location: "L-301",
    hours: "10:00-22:00",
    isOpen: true,
    tags: ["destacado"],
    url: "#",
    x: 250,
    y: 250,
  },
  {
    id: 8,
    name: "Librería Moderna",
    category: "decoracion",
    floor: "2",
    location: "L-302",
    hours: "10:00-22:00",
    isOpen: true,
    tags: [],
    url: "#",
    x: 400,
    y: 250,
  },
  {
    id: 9,
    name: "Perfumería Essence",
    category: "belleza",
    floor: "PB",
    location: "L-104",
    hours: "10:00-22:00",
    isOpen: true,
    tags: [],
    url: "#",
    x: 550,
    y: 250,
  },
  {
    id: 10,
    name: "Electro Store",
    category: "tecnologia",
    floor: "1",
    location: "L-204",
    hours: "10:00-22:00",
    isOpen: false,
    tags: [],
    url: "#",
    x: 700,
    y: 250,
  },
  {
    id: 11,
    name: "Fashion Outlet",
    category: "moda",
    floor: "2",
    location: "L-303",
    hours: "10:00-22:00",
    isOpen: true,
    tags: ["pronto"],
    url: "#",
    x: 100,
    y: 400,
  },
  {
    id: 12,
    name: "Gym Fitness",
    category: "deportes",
    floor: "2",
    location: "L-304",
    hours: "06:00-23:00",
    isOpen: true,
    tags: [],
    url: "#",
    x: 250,
    y: 400,
  },
]

let filteredStores = [...storesData]

// Category colors for map
const categoryColors = {
  moda: "#3b82f6",
  tecnologia: "#a855f7",
  decoracion: "#10b981",
  deportes: "#ef4444",
  belleza: "#ec4899",
  joyeria: "#eab308",
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderStores()
  renderMap()
  attachFilterListeners()
  hideLoadingState()
})

function renderStores() {
  const grid = document.getElementById("stores-grid")
  const emptyState = document.getElementById("empty-state")
  const countNumber = document.getElementById("count-number")

  if (!grid) return

  grid.innerHTML = ""

  if (filteredStores.length === 0) {
    grid.classList.add("hidden")
    emptyState.classList.remove("hidden")
    countNumber.textContent = "0"
    return
  }

  grid.classList.remove("hidden")
  emptyState.classList.add("hidden")
  countNumber.textContent = filteredStores.length

  filteredStores.forEach((store) => {
    const card = createStoreCard(store)
    grid.appendChild(card)
  })
}

function createStoreCard(store) {
  const card = document.createElement("article")
  card.className = "bg-surface-dark rounded-xl p-6 card-hover focus-within:ring-2 focus-within:ring-accent-gold"

  const badges = store.tags
    .map((tag) => {
      const badgeClass =
        tag === "nuevo"
          ? "badge-new"
          : tag === "destacado"
            ? "badge-featured"
            : tag === "pronto"
              ? "badge-soon"
              : "badge-temp"
      return `<span class="badge ${badgeClass}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
    })
    .join(" ")

  const statusClass = store.isOpen ? "status-open" : "status-closed"
  const statusText = store.isOpen ? "Abierto" : "Cerrado"
  const statusDotClass = store.isOpen ? "open" : "closed"

  card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div>
                <h3 class="text-xl font-bold mb-1">${store.name}</h3>
                <p class="text-sm text-text-secondary capitalize">${store.category}</p>
            </div>
            ${badges}
        </div>
        
        <div class="space-y-2 mb-4 text-sm">
            <div class="flex items-center text-text-secondary">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Piso ${store.floor} - ${store.location}</span>
            </div>
            <div class="flex items-center text-text-secondary">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${store.hours}</span>
            </div>
            <div class="flex items-center ${statusClass}">
                <span class="status-dot ${statusDotClass}"></span>
                <span class="font-semibold">${statusText}</span>
            </div>
        </div>

        <div class="flex gap-2">
            <a href="${store.url}" target="_blank" rel="noopener noreferrer" class="flex-1 px-4 py-2 bg-accent-gold text-bg-dark text-center rounded-lg hover:bg-accent-gold-light transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-accent-gold">
                Ver sitio
            </a>
            <button onclick="showOnMap(${store.id})" class="px-4 py-2 bg-surface-light text-text-primary rounded-lg hover:bg-surface-dark transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold" aria-label="Ver ${store.name} en el mapa">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
            </button>
        </div>
    `

  return card
}

function attachFilterListeners() {
  const searchInput = document.getElementById("search-input")
  const categoryFilter = document.getElementById("category-filter")
  const floorFilter = document.getElementById("floor-filter")
  const statusFilter = document.getElementById("status-filter")
  const sortSelect = document.getElementById("sort-select")
  const clearBtn = document.getElementById("clear-filters")
  const clearBtnEmpty = document.getElementById("clear-filters-empty")

  if (searchInput) {
    searchInput.addEventListener("input", debounce(applyFilters, 300))
  }
  ;[categoryFilter, floorFilter, statusFilter, sortSelect].forEach((el) => {
    if (el) el.addEventListener("change", applyFilters)
  })
  ;[clearBtn, clearBtnEmpty].forEach((btn) => {
    if (btn) btn.addEventListener("click", clearFilters)
  })
}

function applyFilters() {
  const searchTerm = document.getElementById("search-input")?.value.toLowerCase() || ""
  const category = document.getElementById("category-filter")?.value || ""
  const floor = document.getElementById("floor-filter")?.value || ""
  const status = document.getElementById("status-filter")?.value || ""
  const sort = document.getElementById("sort-select")?.value || "name-asc"

  // Filter
  filteredStores = storesData.filter((store) => {
    const matchesSearch =
      fuzzyMatch(store.name.toLowerCase(), searchTerm) || store.category.toLowerCase().includes(searchTerm)
    const matchesCategory = !category || store.category === category
    const matchesFloor = !floor || store.floor === floor
    const matchesStatus = !status || (status === "open" && store.isOpen) || (status === "closed" && !store.isOpen)

    return matchesSearch && matchesCategory && matchesFloor && matchesStatus
  })

  // Sort
  filteredStores.sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name)
    if (sort === "name-desc") return b.name.localeCompare(a.name)
    if (sort === "status") return b.isOpen - a.isOpen
    return 0
  })

  renderStores()

  // Track search
  if (searchTerm) {
    console.log("[v0] Search:", searchTerm, "Results:", filteredStores.length)
  }
}

function clearFilters() {
  document.getElementById("search-input").value = ""
  document.getElementById("category-filter").value = ""
  document.getElementById("floor-filter").value = ""
  document.getElementById("status-filter").value = ""
  document.getElementById("sort-select").value = "name-asc"

  applyFilters()
}

// Fuzzy matching for typo tolerance
function fuzzyMatch(str, pattern) {
  if (!pattern) return true

  // Remove accents for comparison
  const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const normalizedStr = normalize(str)
  const normalizedPattern = normalize(pattern)

  return normalizedStr.includes(normalizedPattern)
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function hideLoadingState() {
  const loadingState = document.getElementById("loading-state")
  if (loadingState) {
    setTimeout(() => {
      loadingState.style.display = "none"
    }, 500)
  }
}

// Map functionality
function renderMap() {
  const hotspots = document.getElementById("map-hotspots")
  const mapList = document.getElementById("map-list")

  if (!hotspots || !mapList) return

  hotspots.innerHTML = ""
  mapList.innerHTML = ""

  storesData.forEach((store) => {
    // Create SVG hotspot
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", store.x)
    circle.setAttribute("cy", store.y)
    circle.setAttribute("r", "15")
    circle.setAttribute("fill", categoryColors[store.category] || "#d4af37")
    circle.setAttribute("stroke", "#d4af37")
    circle.setAttribute("stroke-width", "2")
    circle.setAttribute("class", "cursor-pointer transition-all hover:r-20")
    circle.setAttribute("data-store-id", store.id)
    circle.setAttribute("role", "button")
    circle.setAttribute("aria-label", `${store.name} - ${store.location}`)
    circle.setAttribute("tabindex", "0")

    circle.addEventListener("mouseenter", (e) => showMapCard(store, e))
    circle.addEventListener("mouseleave", hideMapCard)
    circle.addEventListener("click", () => showStoreDetails(store))
    circle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        showStoreDetails(store)
      }
    })

    hotspots.appendChild(circle)

    // Add to accessible list
    const listItem = document.createElement("li")
    listItem.innerHTML = `
            <button class="w-full text-left p-2 hover:bg-surface-dark rounded focus:outline-none focus:ring-2 focus:ring-accent-gold" onclick="showStoreDetails(${JSON.stringify(store).replace(/"/g, "&quot;")})">
                <span class="font-semibold">${store.name}</span> - ${store.location} (Piso ${store.floor})
            </button>
        `
    mapList.appendChild(listItem)
  })
}

function showMapCard(store, event) {
  const card = document.getElementById("map-card")
  const content = document.getElementById("map-card-content")

  if (!card || !content) return

  const statusClass = store.isOpen ? "status-open" : "status-closed"
  const statusText = store.isOpen ? "Abierto" : "Cerrado"

  content.innerHTML = `
        <h3 class="font-bold text-lg mb-2">${store.name}</h3>
        <p class="text-sm text-text-secondary mb-2 capitalize">${store.category}</p>
        <p class="text-sm mb-1">${store.location} - Piso ${store.floor}</p>
        <p class="text-sm mb-2">${store.hours}</p>
        <p class="text-sm ${statusClass} font-semibold">${statusText}</p>
    `

  // Position card near cursor
  const rect = event.target.getBoundingClientRect()
  card.style.left = `${rect.left + 30}px`
  card.style.top = `${rect.top - 50}px`

  card.classList.remove("hidden")
}

function hideMapCard() {
  const card = document.getElementById("map-card")
  if (card) card.classList.add("hidden")
}

function showStoreDetails(store) {
  if (typeof store === "string") {
    store = JSON.parse(store)
  }

  alert(
    `${store.name}\n${store.location} - Piso ${store.floor}\n${store.hours}\n${store.isOpen ? "Abierto ahora" : "Cerrado"}`,
  )

  // In a real implementation, this would open a modal or navigate to the store page
  console.log("[v0] Show store details:", store)
}

function showOnMap(storeId) {
  const store = storesData.find((s) => s.id === storeId)
  if (!store) return

  // Scroll to map
  const mapSection = document.getElementById("mapa")
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: "smooth" })
  }

  // Highlight the store on map
  setTimeout(() => {
    const circle = document.querySelector(`[data-store-id="${storeId}"]`)
    if (circle) {
      // Pulse animation
      circle.style.animation = "pulse 1s ease-in-out 3"

      // Show card
      const event = { target: circle, clientX: store.x, clientY: store.y }
      showMapCard(store, event)

      setTimeout(() => {
        circle.style.animation = ""
      }, 3000)
    }
  }, 500)
}

// Make functions globally available
window.showOnMap = showOnMap
window.showStoreDetails = showStoreDetails
