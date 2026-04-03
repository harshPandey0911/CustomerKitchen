import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/common/App.jsx'
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
console.log('Attempting to render app...')
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
console.log('App rendered')
