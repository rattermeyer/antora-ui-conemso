;(function () {
  'use strict'

  var hostname = window.location.hostname
  if (!hostname) return

  ;[].slice.call(document.querySelectorAll('.doc a[href^="http"]')).forEach(function (link) {
    if (link.hostname === hostname) return
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener')
  })
})()
