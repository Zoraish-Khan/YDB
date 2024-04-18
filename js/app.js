const dataLayoutMode = localStorage.getItem('data-bs-theme');
const dataLayout = localStorage.getItem('data-layout');

const dataSidebarMode = localStorage.getItem('data-sidebar-mode');
const dataSidebar = localStorage.getItem('data-sidebar'); 

const thememMode = localStorage.getItem('data-bs-theme');




window.addEventListener('resize', function () {
  if (this.innerWidth < 767.9) {
    document.querySelector('html').setAttribute('data-sidebar', 'large');
  }
  else if (this.innerWidth >= 768 && this.innerWidth < 991.9) {
    document.querySelector('html').setAttribute('data-sidebar', 'small');
  } 
  else if (this.innerWidth > 992.9) {
    document.querySelector('html').setAttribute('data-sidebar', 'large');
    
  }
});
  
const dataLayoutFunction = () => {
  const dataLayout = localStorage.getItem('data-layout');
  document.querySelector('html').setAttribute('data-layout', 'vertical');
  if(dataLayout === 'vertical'){
    new SimpleBar(document.getElementById('scrollbarMenu'), { autoHide: false });
    //document.getElementById('layout-vertical').setAttribute('checked','true')
    document.getElementById("scrollbarMenu").setAttribute("data-simplebar", ""), document.getElementById("navbar-nav").setAttribute("data-simplebar", ""), document.getElementById("scrollbarMenu").classList.add("h-100");
  }}
  dataLayoutFunction();
  
  


document.querySelector('#toggle-menu').addEventListener('click', function (e) {
  e.preventDefault();
  [].map.call(document.querySelectorAll('.hamburger-menu'), function (el) {
    el.classList.toggle('open');
      document.querySelector('body').classList.toggle('vertical-menu-show')
      // document.querySelector('html').setAttribute('data-sidebar', 'small');
         //added js for toggle icon 
    let layoutSidebarType=document.documentElement.getAttribute("data-sidebar");
    if (layoutSidebarType === "small") {
      document.documentElement.setAttribute("data-sidebar", "");
    }else {
      document.documentElement.setAttribute("data-sidebar", "small");
    } 
  });
});


(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()