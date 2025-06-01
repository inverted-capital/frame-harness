import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ArtifactWeb } from '@artifact/client/react'
import { useIsArtifactReady } from '@artifact/client/hooks'
import { type Artifact } from '@artifact/client/api'
import Debug from 'debug'
import { PrivyProvider, useIdentityToken, usePrivy } from '@privy-io/react-auth'
Debug.enable('artifact:client:*')

const url = 'https://web-client-shy-dawn-4057.fly.dev'

declare global {
  // eslint-disable-next-line no-var
  var artifact: Artifact | undefined
}

export function AuthenticatedApp() {
  const { ready, authenticated, user, login } = usePrivy()
  const { identityToken } = useIdentityToken()
  const [error, onError] = useState<unknown>()
  const modalShownRef = useRef(false)

  // Display the login modal on initial load if not authenticated
  useEffect(() => {
    if (ready && !authenticated && !modalShownRef.current) {
      login()
      modalShownRef.current = true
    }
  }, [ready, authenticated, login])

  if (error) {
    return <div>{String(error)}</div>
  }

  if (!ready) {
    return <div>Loading Privy authentication...</div>
  }
  if (!authenticated || !user || !identityToken) {
    return (
      <div
        className="login-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '2rem'
        }}
      >
        <h1>Welcome to the Dreamcatcher Network</h1>
        <p>Please sign in to continue</p>
        <button
          type="button"
          onClick={login}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1.1rem',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Sign in
        </button>
      </div>
    )
  }

  return (
    <ArtifactWeb
      did={user.id}
      server={url}
      secureToken={identityToken}
      onError={onError}
      global
    >
      <LoadingArtifact />
    </ArtifactWeb>
  )
}

export function LoadingArtifact() {
  const ready = useIsArtifactReady()
  if (!ready) {
    return <div>Loading Artifact...</div>
  }
  return <App />
}

export function Boot() {
  return (
    <PrivyProvider
      appId="cma4m3v6400dkl10ld7792jm2"
      config={{ externalWallets: { walletConnect: { enabled: false } } }}
    >
      <AuthenticatedApp />
    </PrivyProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Boot />
  </StrictMode>
)
