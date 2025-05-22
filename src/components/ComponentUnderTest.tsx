import React from 'react';
import { ComponentUnderTestProps } from '../types';

const ComponentUnderTest: React.FC<ComponentUnderTestProps> = ({ apiUrl, frameSource }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Component Under Test</h2>
      <p className="mb-4 text-gray-700">
        This is a placeholder for your component. Replace this with the actual component you want to test.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Props Received:</h3>
        <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
          {JSON.stringify({ apiUrl, frameSource }, null, 2)}
        </pre>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-700 mb-2">Implementation Notes:</h3>
        <p className="text-sm text-blue-700">
          Replace this component with your actual component under test. The props shown above
          are passed from the dashboard and can be used by your component.
        </p>
      </div>
    </div>
  );
};

export default ComponentUnderTest;