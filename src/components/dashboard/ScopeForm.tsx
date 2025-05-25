import { ScopeProps, TestHarnessActions } from '../../types'

interface ScopeFormProps {
  scope: ScopeProps
  setScope: TestHarnessActions['setScope']
}

const ScopeForm: React.FC<ScopeFormProps> = ({ scope, setScope }) => (
  <div className="space-y-4">
    <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
      Scope
    </h2>
    <div className="space-y-3">
      <div>
        <label
          htmlFor="repo"
          className="block text-sm font-medium text-gray-700"
        >
          Repo
        </label>
        <input
          id="repo"
          type="text"
          value={scope.repo}
          onChange={(e) => setScope('repo', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="username/repo"
        />
      </div>
      <div>
        <label
          htmlFor="branch"
          className="block text-sm font-medium text-gray-700"
        >
          Branch
        </label>
        <input
          id="branch"
          type="text"
          value={scope.branch}
          onChange={(e) => setScope('branch', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="main"
        />
      </div>
      <div>
        <label
          htmlFor="commit"
          className="block text-sm font-medium text-gray-700"
        >
          Commit
        </label>
        <input
          id="commit"
          type="text"
          value={scope.commit}
          onChange={(e) => setScope('commit', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="abc123"
        />
      </div>
      <div>
        <label
          htmlFor="path"
          className="block text-sm font-medium text-gray-700"
        >
          Path
        </label>
        <input
          id="path"
          type="text"
          value={scope.path}
          onChange={(e) => setScope('path', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="/src/components"
        />
      </div>
    </div>
  </div>
)

export default ScopeForm
