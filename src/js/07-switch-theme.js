;(function () {
  'use strict'

  activateSwitch(document.getElementById('switch-theme-checkbox'))

  function activateSwitch (control) {
    if (!control) return
    control.checked = document.documentElement.classList.contains('dark-theme')
    control.addEventListener('change', onThemeChange.bind(control))
  }

  function onThemeChange () {
    document.documentElement.classList.toggle('dark-theme', this.checked)
    document.documentElement.setAttribute('data-theme', this.checked ? 'dark' : 'light')
    saveTheme(this.checked ? 'dark' : 'light')
    if (this.checked) {
      this.parentElement.classList.add('active')
    } else {
      this.parentElement.classList.remove('active')
    }
  }

  function saveTheme (theme) {
    window.localStorage && window.localStorage.setItem('theme', theme)
  }
})()
