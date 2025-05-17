document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const header = document.querySelector("header")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      header.classList.toggle("mobile-menu-active")

      // Change icon based on menu state
      const icon = this.querySelector("i")
      if (header.classList.contains("mobile-menu-active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-item")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (header.classList.contains("mobile-menu-active")) {
        header.classList.remove("mobile-menu-active")
        const icon = mobileMenuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  })

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
    updateThemeIcon(true)
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
      const isDarkMode = body.classList.contains("dark-mode")

      // Save theme preference
      localStorage.setItem("theme", isDarkMode ? "dark" : "light")

      // Update icon
      updateThemeIcon(isDarkMode)
    })
  }

  function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector("i")
    if (isDarkMode) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".progress")

  // Intersection Observer for skill bars
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the width from the style attribute
          const width = entry.target.style.width
          // Initially set width to 0
          entry.target.style.width = "0"
          // After a small delay, set it to the original width
          setTimeout(() => {
            entry.target.style.width = width
          }, 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  skillBars.forEach((bar) => {
    observer.observe(bar)
  })

  // Form submission handling with validation
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      let isValid = true
      const formInputs = contactForm.querySelectorAll("input, textarea")

      formInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("error")

          // Remove error class when user starts typing
          input.addEventListener(
            "input",
            function () {
              this.classList.remove("error")
            },
            { once: true },
          )
        }
      })

      if (!isValid) {
        showNotification("Please fill in all required fields", "error")
        return
      }

      // Email validation
      const emailInput = document.getElementById("email")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("error")
        showNotification("Please enter a valid email address", "error")
        return
      }

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: emailInput.value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // Show success message (in a real application, you would send this data to a server)
      showNotification("Thank you for your message! I will get back to you soon.", "success")
      contactForm.reset()
    })
  }

  // Notification function
  function showNotification(message, type) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector(".notification-container")
    if (!notificationContainer) {
      notificationContainer = document.createElement("div")
      notificationContainer.className = "notification-container"
      document.body.appendChild(notificationContainer)
    }

    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <p>${message}</p>
      </div>
    `

    // Add to container
    notificationContainer.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  // Add CSS for notifications
  const notificationStyles = document.createElement("style")
  notificationStyles.textContent = `
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
    .notification {
      background-color: white;
      color: #333;
      padding: 15px 20px;
      margin-bottom: 10px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .notification.show {
      transform: translateX(0);
      opacity: 1;
    }
    .notification.success {
      border-left: 4px solid #10b981;
    }
    .notification.error {
      border-left: 4px solid #ef4444;
    }
    .error {
      border-color: #ef4444 !important;
    }
  `
  document.head.appendChild(notificationStyles)

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active class to nav items based on scroll position
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")
    const headerHeight = document.querySelector("header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Add animation to timeline items
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          timelineObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  timelineItems.forEach((item) => {
    timelineObserver.observe(item)
  })

  // Certificate Modal
  const modal = document.getElementById("certificate-modal")
  const certificateImage = document.getElementById("certificate-image")
  const certificateBadges = document.querySelectorAll(".certificate-badge")
  const closeModal = document.querySelector(".close-modal")

  // Certificate data - in a real application, you would have actual certificate images
  const certificates = {
    "unified-mentor": "./pic2.jpeg", // Placeholder - replace with actual certificate image
    codesoft: "./pic2.jpeg", // Placeholder - replace with actual certificate image
  }

  certificateBadges.forEach((badge) => {
    badge.addEventListener("click", function () {
      const certType = this.getAttribute("data-certificate")
      if (certificates[certType]) {
        certificateImage.src = certificates[certType]
        modal.classList.add("show")
      }
    })
  })

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show")
    })
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show")
    }
  })

  // Resume download functionality
  const downloadResumeBtn = document.getElementById("download-resume")
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // In a real application, this would be a link to an actual resume file
      showNotification("Resume download started!", "success")
    })
  }

  // Add CSS for error styling
  const errorStyles = document.createElement("style")
  errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
  `
  document.head.appendChild(errorStyles)

  // Handle certification links
  document.querySelectorAll(".cert-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      // This opens the certificate in a new tab
      // You could also implement a modal view here if preferred
      showNotification("Opening certificate...", "success")
    })
  })

  // Fix for placeholder.svg issue
  document.querySelectorAll('img[src*="placeholder.svg"]').forEach((img) => {
    // Replace with a data URI for a simple placeholder
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150' viewBox='0 0 300 150'%3E%3Crect fill='%23ddd' width='300' height='150'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='30' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EImage%3C/text%3E%3C/svg%3E"
  })

  // Check if the device is touch-enabled
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice) {
    document.body.classList.add("touch-device")

    // Add touch-specific interactions
    document.querySelectorAll(".project-card, .certification-card, .activity-card").forEach((card) => {
      card.addEventListener(
        "touchstart",
        function () {
          this.classList.add("touch-active")
        },
        { passive: true },
      )

      card.addEventListener(
        "touchend",
        function () {
          setTimeout(() => {
            this.classList.remove("touch-active")
          }, 300)
        },
        { passive: true },
      )
    })
  }

  // Add resize handler for better responsiveness
  window.addEventListener(
    "resize",
    debounce(() => {
      // Recalculate any dimensions that might need adjustment
      if (window.innerWidth <= 768) {
        // Mobile-specific adjustments
        document.querySelectorAll(".project-header").forEach((header) => {
          header.style.flexDirection = "column"
        })
      } else {
        // Desktop-specific adjustments
        document.querySelectorAll(".project-header").forEach((header) => {
          header.style.flexDirection = "row"
        })
      }
    }, 250),
  )

  // Debounce function to limit how often a function is called
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

  console.log("Portfolio loaded successfully!")
})
