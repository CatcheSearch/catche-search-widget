import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  createApp(App).mount('#app')
} else {
  function insertNotificationElement():void {
    // Check if there is custom CSS
    const scriptElement = document.querySelector('script[catche-css]')
    let cssPath = null
    if (scriptElement) {
      cssPath = scriptElement.getAttribute("catche-css") as string
    }
    // mount component to context window
    const container = document.createElement('div')
    container.setAttribute('id', 'catche-search')
    const shadowDOM = container.attachShadow?.({ mode: 'open' }) || container
    // Add CSS
    const styleEl = document.createElement('link')
    styleEl.setAttribute('rel', 'stylesheet')
    styleEl.setAttribute('href', 'https://cdn.jsdelivr.net/gh/greentfrapp/probable-robot@0.0.10/index.css')
    shadowDOM.appendChild(styleEl)
    if (cssPath) {
      const customStyleEl = document.createElement('link')
      customStyleEl.setAttribute('rel', 'stylesheet')
      customStyleEl.setAttribute('href', cssPath)
      shadowDOM.appendChild(customStyleEl)
    }
    // Mount Vue component
    const root = document.createElement('div')
    shadowDOM.appendChild(root)
    createApp(App).mount(root)
    // Append shadow DOM
    document.body.appendChild(container)
  }

  (() => {
    insertNotificationElement()
  })()
}
