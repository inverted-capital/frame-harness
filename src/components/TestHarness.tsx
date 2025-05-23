import React from 'react';
import Dashboard from './Dashboard';
import ComponentUnderTest from './ComponentUnderTest';
import { useTestHarness } from '../hooks/useTestHarness';
import { ScreenSize, BackgroundType } from '../types';

const deviceDimensions = {
  mobile: { width: '375px', height: '667px' },
  tablet: { width: '768px', height: '1024px' },
  desktop: { width: '100%', height: 'auto' },
};

const getBackgroundStyles = (backgroundType: BackgroundType) => {
  switch (backgroundType) {
    case 'white':
      return 'bg-white';
    case 'checkered':
      return 'bg-checkered';
    default:
      return 'bg-checkered';
  }
};

const TestHarness: React.FC = () => {
  const [state, actions] = useTestHarness();
  const { apiUrl, frameSource, privyAppId, screenSize, isDashboardVisible, isAuthenticated, showBorder, background, scope } = state;

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In Required</h2>
          <p className="text-gray-600 mb-6">You have been signed out. Refresh the page to sign in again.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const backgroundStyles = getBackgroundStyles(background);

  return (
    <div className="min-h-screen flex flex-col">
      {isDashboardVisible && <Dashboard state={state} actions={actions} />}
      
      <div className={`flex-1 flex items-center justify-center py-8 ${backgroundStyles}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">            
            <div 
              className={`${
                showBorder ? 'border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg' : ''
              } transition-all duration-300`}
              style={{ 
                width: deviceDimensions[screenSize as ScreenSize].width,
                height: screenSize !== 'desktop' ? deviceDimensions[screenSize as ScreenSize].height : 'auto',
              }}
            >
              <div className={`
                ${screenSize !== 'desktop' ? 'h-full overflow-auto' : ''}
                ${showBorder ? 'bg-white p-4' : ''}
              `}>
                <ComponentUnderTest 
                  apiUrl={apiUrl} 
                  frameSource={frameSource}
                  privyAppId={privyAppId}
                  scope={scope}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHarness;