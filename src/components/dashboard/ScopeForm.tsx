import { ScopeProps, TestHarnessActions } from '../../types'
import LabeledInput from './LabeledInput'

interface ScopeFormProps {
  scope: ScopeProps
  setScope: TestHarnessActions['setScope']
}

const ScopeForm: React.FC<ScopeFormProps> = ({ scope, setScope }) => (
  <div className="space-y-4">
    <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Scope</h2>
    <div className="space-y-3">
      <LabeledInput
        id="repo"
        label="Repo"
        value={scope.repo}
        onChange={(v) => setScope('repo', v)}
        placeholder="username/repo"
      />
      <LabeledInput
        id="branch"
        label="Branch"
        value={scope.branch}
        onChange={(v) => setScope('branch', v)}
        placeholder="main"
      />
      <LabeledInput
        id="commit"
        label="Commit"
        value={scope.commit}
        onChange={(v) => setScope('commit', v)}
        placeholder="abc123"
      />
      <LabeledInput
        id="path"
        label="Path"
        value={scope.path}
        onChange={(v) => setScope('path', v)}
        placeholder="/src/components"
      />
    </div>
  </div>
)

export default ScopeForm
