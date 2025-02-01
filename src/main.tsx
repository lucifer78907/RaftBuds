import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const authODomain = import.meta.env.VITE_AUTH0_DOMAIN
const authOClientId = import.meta.env.VITE_AUTH0_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  <Auth0Provider domain={authODomain} clientId={authOClientId} authorizationParams={{ redirect_uri: window.location.origin }}>
    <App />
  </Auth0Provider>
)
