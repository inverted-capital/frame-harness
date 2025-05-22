import React from 'react';
import { ScreenSize, TestHarnessState, TestHarnessActions } from '../types';
import { Smartphone, Tablet, Monitor, LogOut, Maximize, Square } from 'lucide-react';

interface DashboardProps {
  state: TestHarnessState;
  actions: TestHarnessActions;
}

const Dashboard: React.FC<DashboardProps> = ({ state, actions }) => {
  const { apiUrl, frameSource, screenSize, showBorder } = state;
  const { setApiUrl, setFrameSource, setScreenSize, toggleBorder, signOut, openFullscreen } = actions;

  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-4 py-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Component Test Harness</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={openFullscreen}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
            >
              <Maximize size={16} />
              <span>View Fullscreen</span>
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">URLs</h2>
            <div className="space-y-3">
              <div>
                <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="frame-source" className="block text-sm font-medium text-gray-700">
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
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Screen Size</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setScreenSize('mobile')}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  screenSize === 'mobile' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Smartphone size={24} />
                <span className="mt-1 text-sm">Mobile</span>
              </button>
              <button
                onClick={() => setScreenSize('tablet')}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  screenSize === 'tablet' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Tablet size={24} />
                <span className="mt-1 text-sm">Tablet</span>
              </button>
              <button
                onClick={() => setScreenSize('desktop')}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  screenSize === 'desktop' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Monitor size={24} />
                <span className="mt-1 text-sm">Desktop</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Display Options</h2>
            <div className="flex gap-3">
              <button
                onClick={toggleBorder}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  showBorder ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Square size={24} />
                <span className="mt-1 text-sm">{showBorder ? 'Hide Border' : 'Show Border'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Component Info</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Current Screen</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{screenSize}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">API Endpoint</dt>
                  <dd className="mt-1 text-sm text-gray-900 truncate">{apiUrl}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Frame Source</dt>
                  <dd className="mt-1 text-sm text-gray-900 truncate">{frameSource}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Border</dt>
                  <dd className="mt-1 text-sm text-gray-900">{showBorder ? 'Visible' : 'Hidden'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;