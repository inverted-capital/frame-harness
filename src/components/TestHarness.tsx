import React, { useEffect } from 'react'
import Dashboard from './Dashboard'
import { ArtifactHolder } from '@artifact/client/react'
import { HOST_SCOPE } from '@artifact/client/api'
import type { Selection, Message } from '@artifact/client/hooks'
import type { Scope } from '@artifact/client/api'
import { usePrivy } from '@privy-io/react-auth'
import { ScreenSize, BackgroundType } from '../types'
import { useHarnessStore } from '../store/useHarnessStore'
import Debug from 'debug'

const log = Debug('frame-harness:TestHarness')

const deviceDimensions = {
  mobile: { width: '375px', height: '667px' },
  tablet: { width: '768px', height: '1024px' },
  desktop: { width: '100%', height: 'auto' }
}

const getBackgroundStyles = (backgroundType: BackgroundType) => {
  switch (backgroundType) {
    case 'white':
      return 'bg-white'
    case 'checkered':
      return 'bg-checkered'
    default:
      return 'bg-checkered'
  }
}

const TestHarness: React.FC = () => {
  const {
    apiUrl,
    frameSource,
    privyAppId,
    screenSize,
    isDashboardVisible,
    showBorder,
    background,
    scope,
    initializeFromUrl
  } = useHarnessStore()
  const { user } = usePrivy()
  const did = user?.id
  const frameUrl = React.useMemo(() => {
    const base = frameSource || '/frame.html'
    const url = new URL(base, window.location.origin)
    const params: Record<string, string> = {
      apiUrl,
      frameSource: base,
      privyAppId
    }
    if (scope.repo) params.repo = scope.repo
    if (scope.branch) params.branch = scope.branch
    if (scope.commit) params.commit = scope.commit
    if (scope.path) params.path = scope.path
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    return `${url.origin}${url.pathname}?${query}`
  }, [apiUrl, frameSource, privyAppId, scope])

  useEffect(() => {
    initializeFromUrl()
  }, [initializeFromUrl])

  const backgroundStyles = getBackgroundStyles(background)

  return (
    <div className="min-h-screen flex flex-col">
      {isDashboardVisible && <Dashboard />}

      <div
        className={`flex-1 flex items-center justify-center py-8 ${backgroundStyles}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div
              className={`${
                showBorder
                  ? 'border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg'
                  : ''
              } transition-all duration-300`}
              style={{
                width: deviceDimensions[screenSize as ScreenSize].width,
                height:
                  screenSize !== 'desktop'
                    ? deviceDimensions[screenSize as ScreenSize].height
                    : 'auto'
              }}
            >
              <div
                className={`
                ${screenSize !== 'desktop' ? 'h-full overflow-auto' : ''}
                ${showBorder ? 'bg-white p-4' : ''}
              `}
              >
                <ArtifactHolder
                  src={frameUrl}
                  target={{
                    ...HOST_SCOPE,
                    ...scope,
                    did: did || HOST_SCOPE.did
                  }}
                  diffs={[]}
                  access={[]}
                  selection={undefined}
                  onSelection={(selection: Selection) => {
                    log('selection', selection)
                  }}
                  onMessage={(message: Message) => {
                    log('message', message)
                  }}
                  onAccessRequest={(request: Scope[]) => {
                    log('accessRequest', request)
                  }}
                  onNavigateTo={(scope: Scope) => {
                    log('navigateTo', scope)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestHarness
