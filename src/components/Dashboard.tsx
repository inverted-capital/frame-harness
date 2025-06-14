import { LogOut, Maximize } from 'lucide-react'
import UrlsForm from './dashboard/UrlsForm'
import ScopeForm from './dashboard/ScopeForm'
import DisplayOptions from './dashboard/DisplayOptions'
import ComponentInfo from './dashboard/ComponentInfo'
import { useHarnessStore } from '../store/useHarnessStore'
import { usePrivy } from '@privy-io/react-auth'

const Dashboard: React.FC = () => {
  const {
    apiUrl,
    frameSource,
    privyAppId,
    screenSize,
    showBorder,
    background,
    scope,
    setApiUrl,
    setFrameSource,
    setPrivyAppId,
    setScreenSize,
    toggleBorder,
    openFullscreen,
    setBackground,
    setScope,
    resetParams
  } = useHarnessStore()
  const { logout } = usePrivy()

  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-4 py-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Component Test Harness
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={openFullscreen}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
            >
              <Maximize size={16} />
              <span>View Fullscreen</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
            <button
              onClick={resetParams}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
            >
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <UrlsForm
            apiUrl={apiUrl}
            frameSource={frameSource}
            privyAppId={privyAppId}
            setApiUrl={setApiUrl}
            setFrameSource={setFrameSource}
            setPrivyAppId={setPrivyAppId}
          />

          <ScopeForm scope={scope} setScope={setScope} />

          <DisplayOptions
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            background={background}
            setBackground={setBackground}
            showBorder={showBorder}
            toggleBorder={toggleBorder}
          />

          <ComponentInfo
            apiUrl={apiUrl}
            frameSource={frameSource}
            privyAppId={privyAppId}
            screenSize={screenSize}
            showBorder={showBorder}
            background={background}
            scope={scope}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
