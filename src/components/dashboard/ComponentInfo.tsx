import { ScreenSize, BackgroundType, ScopeProps } from '../../types'

interface ComponentInfoProps {
  apiUrl: string
  frameSource: string
  privyAppId: string
  screenSize: ScreenSize
  showBorder: boolean
  background: BackgroundType
  scope: ScopeProps
}

const ComponentInfo: React.FC<ComponentInfoProps> = ({
  apiUrl,
  frameSource,
  privyAppId,
  screenSize,
  showBorder,
  background,
  scope
}) => (
  <div className="space-y-4">
    <h2 className="section-heading">Component Info</h2>
    <div className="info-box">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Current Screen</dt>
          <dd className="mt-1 text-sm text-gray-900 capitalize">
            {screenSize}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">API Endpoint</dt>
          <dd className="mt-1 text-sm text-gray-900 truncate">{apiUrl}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Frame Source</dt>
          <dd className="mt-1 text-sm text-gray-900 truncate">{frameSource}</dd>
        </div>
        {privyAppId && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Privy App ID</dt>
            <dd className="mt-1 text-sm text-gray-900 truncate">
              {privyAppId}
            </dd>
          </div>
        )}
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 inline">Border: </dt>
          <dd className="text-sm text-gray-900 inline">
            {showBorder ? 'Visible' : 'Hidden'}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 inline">
            Background:{' '}
          </dt>
          <dd className="text-sm text-gray-900 inline capitalize">
            {background}
          </dd>
        </div>
        {scope.repo && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 inline">Repo: </dt>
            <dd className="text-sm text-gray-900 inline truncate">
              {scope.repo}
            </dd>
          </div>
        )}
        {scope.branch && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 inline">
              Branch:{' '}
            </dt>
            <dd className="text-sm text-gray-900 inline truncate">
              {scope.branch}
            </dd>
          </div>
        )}
        {scope.commit && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 inline">
              Commit:{' '}
            </dt>
            <dd className="text-sm text-gray-900 inline truncate">
              {scope.commit}
            </dd>
          </div>
        )}
        {scope.path && (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 inline">Path: </dt>
            <dd className="text-sm text-gray-900 inline truncate">
              {scope.path}
            </dd>
          </div>
        )}
      </dl>
    </div>
  </div>
)

export default ComponentInfo
