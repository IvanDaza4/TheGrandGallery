// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true"
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded)
    mobileMenu.classList.toggle("hidden")
  })
}

// Video controls
const video = document.getElementById("hero-video")
const videoToggle = document.getElementById("video-toggle")
const videoRestart = document.getElementById("video-restart")
const pauseIcon = document.getElementById("pause-icon")
const playIcon = document.getElementById("play-icon")

if (video && videoToggle) {
  videoToggle.addEventListener("click", () => {
    if (video.paused) {
      video.play()
      pauseIcon.classList.remove("hidden")
      playIcon.classList.add("hidden")
      videoToggle.setAttribute("aria-label", "Pausar video")
    } else {
      video.pause()
      pauseIcon.classList.add("hidden")
      playIcon.classList.remove("hidden")
      videoToggle.setAttribute("aria-label", "Reproducir video")
    }
  })
}

if (video && videoRestart) {
  videoRestart.addEventListener("click", () => {
    video.currentTime = 0
    video.play()
    pauseIcon.classList.remove("hidden")
    playIcon.classList.add("hidden")
  })
}

// Smooth scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href === "#") return

    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in")
    }
  })
}, observerOptions)

// Observe elements with animation class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
  console.log("[v0] Analytics:", { category, action, label })
  // GA4 implementation would go here
  // gtag('event', action, { event_category: category, event_label: label });
}

// Track CTA clicks
document.querySelectorAll('a[href*="locales"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("Navigation", "click_to_locales", link.textContent.trim())
  })
})
