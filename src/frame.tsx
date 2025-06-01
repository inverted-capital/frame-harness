import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { ArtifactFrame } from '@artifact/client/react'
import ComponentUnderTest from './components/ComponentUnderTest'

function FrameApp() {
  const params = new URLSearchParams(window.location.search)
  const frameSource = params.get('frameSource') || ''
  const privyAppId = params.get('privyAppId') || ''
  const scope = {
    repo: params.get('repo') || '',
    branch: params.get('branch') || '',
    commit: params.get('commit') || '',
    path: params.get('path') || ''
  }

  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <ArtifactFrame>
      <ComponentUnderTest
        frameSource={frameSource}
        privyAppId={privyAppId}
        scope={scope}
      />
    </ArtifactFrame>
  )
}

createRoot(document.getElementById('frame-root')!).render(<FrameApp />)

export default FrameApp
