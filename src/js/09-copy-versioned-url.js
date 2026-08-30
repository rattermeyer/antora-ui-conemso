;(function () {
  'use strict'

  var button = document.getElementById('copy-url')
  if (!button) return

  var icon = button.querySelector('.copy-icon')
  var checkIcon = button.querySelector('.copy-check-icon')

  button.addEventListener('click', function () {
    var canonical = document.querySelector('meta[name="canonical-url"]')
    var url = canonical ? canonical.content + window.location.hash : window.location.href
    window.navigator.clipboard.writeText(url).then(function () {
      icon.style.display = 'none'
      checkIcon.style.display = ''
      button.classList.add('copied')
      setTimeout(function () {
        icon.style.display = ''
        checkIcon.style.display = 'none'
        button.classList.remove('copied')
      }, 1500)
    })
  })
})()
