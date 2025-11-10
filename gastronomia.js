// Gastronomia page functionality
;(() => {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const restaurantCards = document.querySelectorAll(".restaurant-card")
  const restaurantCount = document.getElementById("restaurant-count")
  const emptyState = document.getElementById("empty-state")
  const restaurantsGrid = document.getElementById("restaurants-grid")

  // Toggle menu functionality
  const toggleMenuButtons = document.querySelectorAll(".toggle-menu-btn")

  // Filter restaurants
  function filterRestaurants(category) {
    console.log("[v0] Filtering restaurants by category:", category)

    let visibleCount = 0

    restaurantCards.forEach((card) => {
      const categories = card.dataset.categories.split(" ")

      if (category === "all" || categories.includes(category)) {
        card.style.display = "block"
        // Animate card appearance
        setTimeout(() => {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          requestAnimationFrame(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          })
        }, visibleCount * 50)
        visibleCount++
      } else {
        card.style.display = "none"
      }
    })

    // Update count
    restaurantCount.textContent = visibleCount

    // Show/hide empty state
    if (visibleCount === 0) {
      restaurantsGrid.style.display = "none"
      emptyState.classList.remove("hidden")
    } else {
      restaurantsGrid.style.display = "grid"
      emptyState.classList.add("hidden")
    }
  }

  // Filter button click handlers
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get category and filter
      const category = this.dataset.category
      filterRestaurants(category)

      // Analytics tracking
      if (window.trackEvent) {
        window.trackEvent("filter_restaurants", { category })
      }
    })
  })

  // Toggle menu sections
  toggleMenuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const restaurantId = this.dataset.restaurant
      const menuSection = document.getElementById(`menu-${restaurantId}`)
      const icon = this.querySelector("svg")

      if (menuSection.classList.contains("expanded")) {
        // Collapse
        menuSection.classList.remove("expanded")
        icon.style.transform = "rotate(0deg)"
        this.querySelector("span").textContent = "Ver menú destacado"
      } else {
        // Expand
        menuSection.classList.add("expanded")
        icon.style.transform = "rotate(180deg)"
        this.querySelector("span").textContent = "Ocultar menú"

        // Scroll to menu section smoothly
        setTimeout(() => {
          menuSection.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 100)

        // Analytics tracking
        if (window.trackEvent) {
          window.trackEvent("view_menu", { restaurant: restaurantId })
        }
      }
    })
  })

  // Keyboard navigation for filters
  filterButtons.forEach((button) => {
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })

  // Initial animation on page load
  window.addEventListener("load", () => {
    restaurantCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "0"
        card.style.transform = "translateY(30px)"
        requestAnimationFrame(() => {
          card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        })
      }, index * 100)
    })
  })

  // Accessibility: Announce filter changes to screen readers
  function announceFilterChange(category, count) {
    const announcement = document.createElement("div")
    announcement.setAttribute("role", "status")
    announcement.setAttribute("aria-live", "polite")
    announcement.className = "sr-only"
    announcement.textContent = `Mostrando ${count} restaurantes en la categoría ${category}`
    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Enhanced filter with announcement
  const originalFilterRestaurants = filterRestaurants
  filterRestaurants = (category) => {
    originalFilterRestaurants(category)
    const count = document.querySelectorAll('.restaurant-card[style*="display: block"]').length
    announceFilterChange(category, count)
  }

  console.log("[v0] Gastronomia page initialized")
})()
