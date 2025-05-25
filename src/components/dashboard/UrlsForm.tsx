import { TestHarnessActions } from '../../types'

interface UrlsFormProps {
  apiUrl: string
  frameSource: string
  privyAppId: string
  setApiUrl: TestHarnessActions['setApiUrl']
  setFrameSource: TestHarnessActions['setFrameSource']
  setPrivyAppId: TestHarnessActions['setPrivyAppId']
}

const UrlsForm: React.FC<UrlsFormProps> = ({
  apiUrl,
  frameSource,
  privyAppId,
  setApiUrl,
  setFrameSource,
  setPrivyAppId
}) => (
  <div className="space-y-4">
    <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
      URLs
    </h2>
    <div className="space-y-3">
      <div>
        <label
          htmlFor="api-url"
          className="block text-sm font-medium text-gray-700"
        >
          API URL
        </label>
        <input
          id="api-url"
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://api.example.com"
        />
      </div>
      <div>
        <label
          htmlFor="frame-source"
          className="block text-sm font-medium text-gray-700"
        >
          Frame Source
        </label>
        <input
          id="frame-source"
          type="text"
          value={frameSource}
          onChange={(e) => setFrameSource(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://source.example.com"
        />
      </div>
      <div>
        <label
          htmlFor="privy-app-id"
          className="block text-sm font-medium text-gray-700"
        >
          Privy App ID
        </label>
        <input
          id="privy-app-id"
          type="text"
          value={privyAppId}
          onChange={(e) => setPrivyAppId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="123456789"
        />
      </div>
    </div>
  </div>
)

export default UrlsForm
