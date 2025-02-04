import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// auth0
const authODomain = import.meta.env.VITE_AUTH0_DOMAIN
const authOClientId = import.meta.env.VITE_AUTH0_CLIENT_ID

// ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})


createRoot(document.getElementById('root')!).render(
  <Auth0Provider domain={authODomain} clientId={authOClientId} authorizationParams={{ redirect_uri: window.location.origin }}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>
)
