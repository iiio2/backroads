// ********** navbar toggle ************

const navBtn = document.getElementById('nav-toggle')
const links = document.getElementById('nav-links')
navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links')
})

// ********** set date ************
const date = (document.getElementById('date').innerHTML =
  new Date().getFullYear())

// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link')
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    links.classList.remove('show-links')

    const id = e.target.getAttribute('href').slice(1)
    const element = document.getElementById(id)
    let position = element.offsetTop - 62

    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    })
  })
})

// ********** toast notification ************
const form = document.querySelector('.contact-form')
const email = document.querySelector('input[name="email"]')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (email.value.trim()) {
    Toastify({
      text: 'Your email is successfully submitted',
      style: {
        background: 'rgba(46, 204, 113, 1)',
      },
    }).showToast()
    email.value = ''
  }
})

// ********** gallery lightbox ************
const galleryImages = [...document.querySelectorAll('.gallery-img')]

if (galleryImages.length) {
  const lightbox = document.createElement('div')
  lightbox.className = 'lightbox'
  lightbox.setAttribute('role', 'dialog')
  lightbox.setAttribute('aria-modal', 'true')
  lightbox.setAttribute('aria-label', 'gallery image viewer')
  lightbox.innerHTML = `
    <button type="button" class="lightbox-btn lightbox-close" aria-label="close">
      <i class="fas fa-times"></i>
    </button>
    <button type="button" class="lightbox-btn lightbox-prev" aria-label="previous image">
      <i class="fas fa-chevron-left"></i>
    </button>
    <figure class="lightbox-figure">
      <img class="lightbox-img" alt="" />
      <figcaption class="lightbox-caption">
        <span class="lightbox-title"></span>
        <span class="lightbox-count"></span>
      </figcaption>
    </figure>
    <button type="button" class="lightbox-btn lightbox-next" aria-label="next image">
      <i class="fas fa-chevron-right"></i>
    </button>
  `
  document.body.appendChild(lightbox)

  const lightboxImg = lightbox.querySelector('.lightbox-img')
  const lightboxTitle = lightbox.querySelector('.lightbox-title')
  const lightboxCount = lightbox.querySelector('.lightbox-count')
  const closeBtn = lightbox.querySelector('.lightbox-close')

  let current = 0
  let lastFocused = null

  const showImage = (index) => {
    // wrap around both ends
    current = (index + galleryImages.length) % galleryImages.length
    const image = galleryImages[current]
    // currentSrc is the bundled url vite emits for the thumbnail
    lightboxImg.src = image.currentSrc || image.src
    lightboxImg.alt = image.alt
    lightboxTitle.textContent = image.alt
    lightboxCount.textContent = `${current + 1} / ${galleryImages.length}`
  }

  const openLightbox = (index) => {
    lastFocused = document.activeElement
    showImage(index)
    lightbox.classList.add('show-lightbox')
    document.body.classList.add('lightbox-open')
    closeBtn.focus()
  }

  const closeLightbox = () => {
    lightbox.classList.remove('show-lightbox')
    document.body.classList.remove('lightbox-open')
    if (lastFocused) lastFocused.focus()
  }

  document.querySelector('.gallery-center').addEventListener('click', (e) => {
    const container = e.target.closest('.gallery-img-container')
    if (!container) return
    const image = container.querySelector('.gallery-img')
    openLightbox(galleryImages.indexOf(image))
  })

  lightbox.addEventListener('click', (e) => {
    if (e.target.closest('.lightbox-close')) return closeLightbox()
    if (e.target.closest('.lightbox-prev')) return showImage(current - 1)
    if (e.target.closest('.lightbox-next')) return showImage(current + 1)
    // clicking the backdrop (not the image or caption) closes as well
    if (!e.target.closest('.lightbox-figure')) closeLightbox()
  })

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show-lightbox')) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') showImage(current - 1)
    if (e.key === 'ArrowRight') showImage(current + 1)
  })
}
