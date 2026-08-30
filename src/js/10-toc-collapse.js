;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('aside.toc.sidebar')
    if (!sidebar) return
    if (window.innerWidth < 1024) return // sidebar TOC is desktop-only

    var btn = document.createElement('button')
    btn.className = 'toc-collapse-btn'
    btn.setAttribute('aria-label', 'Collapse table of contents')
    btn.setAttribute('aria-expanded', 'true')
    btn.setAttribute('type', 'button')
    btn.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M9.34319 7.70711L5.10055 11.9497M5.10055 11.9497L9.34319 16.1924' +
      'M5.10055 11.9497H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M19 8V17" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>'

    // runs after 02-on-this-page.js, which has already built the <h3> title
    var tocTitle = sidebar.querySelector('.toc-menu h3')
    if (!tocTitle) return
    tocTitle.appendChild(btn)

    btn.addEventListener('click', function () {
      applyState(!sidebar.classList.contains('collapsed'))
    })

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        btn.click()
      }
    })
  })

  function applyState (collapsed) {
    var sidebar = document.querySelector('aside.toc.sidebar')
    var btn = sidebar.querySelector('.toc-collapse-btn')
    sidebar.classList.toggle('collapsed', collapsed)
    document.body.classList.toggle('toc-collapsed', collapsed)
    btn.setAttribute('aria-expanded', (!collapsed).toString())
    btn.setAttribute('aria-label', collapsed ? 'Expand table of contents' : 'Collapse table of contents')
  }
})()
