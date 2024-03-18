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
