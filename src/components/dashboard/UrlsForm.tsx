import { TestHarnessActions } from '../../types'
import LabeledInput from './LabeledInput'

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
    <h2 className="section-heading">
      URLs
    </h2>
    <div className="space-y-3">
      <LabeledInput
        id="api-url"
        label="API URL"
        value={apiUrl}
        onChange={setApiUrl}
        placeholder="https://api.example.com"
      />
      <LabeledInput
        id="frame-source"
        label="Frame Source"
        value={frameSource}
        onChange={setFrameSource}
        placeholder="https://source.example.com"
      />
      <LabeledInput
        id="privy-app-id"
        label="Privy App ID"
        value={privyAppId}
        onChange={setPrivyAppId}
        placeholder="123456789"
      />
    </div>
  </div>
)

export default UrlsForm
