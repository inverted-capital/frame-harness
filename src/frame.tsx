import { createRoot } from 'react-dom/client'
import { ArtifactFrame } from '@artifact/client'
import { HOST_SCOPE } from '@artifact/client/api'
import ComponentUnderTest from './components/ComponentUnderTest'

function FrameApp() {
  const params = new URLSearchParams(window.location.search)
  const apiUrl = params.get('apiUrl') || 'https://api.example.com'
  const frameSource = params.get('frameSource') || ''
  const privyAppId = params.get('privyAppId') || ''
  const scope = {
    repo: params.get('repo') || '',
    branch: params.get('branch') || '',
    commit: params.get('commit') || '',
    path: params.get('path') || ''
  }

  return (
    <ArtifactFrame
      target={{ ...HOST_SCOPE, ...scope }}
      access={[]}
      selection={undefined}
      diffs={[]}
      onSelection={() => {}}
      onMessage={() => {}}
      onAccessRequest={() => {}}
      onNavigateTo={() => {}}
    >
      <ComponentUnderTest
        apiUrl={apiUrl}
        frameSource={frameSource}
        privyAppId={privyAppId}
        scope={scope}
      />
    </ArtifactFrame>
  )
}

createRoot(document.getElementById('frame-root')!).render(<FrameApp />)

export default FrameApp
