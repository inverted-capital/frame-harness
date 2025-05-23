import { useState, useCallback, useEffect } from 'react';
import { ScreenSize, TestHarnessState, TestHarnessActions, BackgroundType } from '../types';

export const useTestHarness = (): [TestHarnessState, TestHarnessActions] => {
  // Check URL params for dashboard visibility
  const initDashboardVisible = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hideParam = urlParams.get('hideDashboard');
    return hideParam !== 'true';
  };

  const [state, setState] = useState<TestHarnessState>({
    apiUrl: 'https://api.example.com',
    frameSource: 'https://source.example.com',
    privyAppId: '123456789',
    screenSize: 'desktop',
    isDashboardVisible: initDashboardVisible(),
    isAuthenticated: true,
    showBorder: false,
    background: 'checkered',
  });

  // Update state from URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const apiUrl = urlParams.get('apiUrl');
    const frameSource = urlParams.get('frameSource');
    const privyAppId = urlParams.get('privyAppId');
    const screenSize = urlParams.get('screenSize');
    const background = urlParams.get('background');
    
    setState(prev => ({
      ...prev,
      apiUrl: apiUrl || prev.apiUrl,
      frameSource: frameSource || prev.frameSource,
      privyAppId: privyAppId || prev.privyAppId,
      screenSize: (screenSize as ScreenSize) || prev.screenSize,
      background: (background as BackgroundType) || prev.background,
    }));
  }, []);

  const setApiUrl = useCallback((apiUrl: string) => {
    setState((prev) => ({ ...prev, apiUrl }));
  }, []);

  const setFrameSource = useCallback((frameSource: string) => {
    setState((prev) => ({ ...prev, frameSource }));
  }, []);

  const setPrivyAppId = useCallback((privyAppId: string) => {
    setState((prev) => ({ ...prev, privyAppId }));
  }, []);

  const setScreenSize = useCallback((screenSize: ScreenSize) => {
    setState((prev) => ({ ...prev, screenSize }));
  }, []);

  const toggleBorder = useCallback(() => {
    setState((prev) => ({ ...prev, showBorder: !prev.showBorder }));
  }, []);

  const setBackground = useCallback((background: BackgroundType) => {
    setState((prev) => ({ ...prev, background }));
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: false }));
  }, []);

  const openFullscreen = useCallback(() => {
    // Create base URL without query parameters
    const baseUrl = window.location.href.split('?')[0];
    
    // Manually create query string without encoding special characters
    const queryParams = [
      'hideDashboard=true',
      `apiUrl=${state.apiUrl}`,
      `frameSource=${state.frameSource}`,
      `privyAppId=${state.privyAppId}`,
      `screenSize=${state.screenSize}`,
      `background=${state.background}`
    ].join('&');
    
    // Combine base URL and unencoded query parameters
    const fullUrl = `${baseUrl}?${queryParams}`;
    
    // Open in new tab
    window.open(fullUrl, '_blank');
  }, [state.apiUrl, state.frameSource, state.privyAppId, state.screenSize, state.background]);

  const actions: TestHarnessActions = {
    setApiUrl,
    setFrameSource,
    setPrivyAppId,
    setScreenSize,
    toggleBorder,
    signOut,
    openFullscreen,
    setBackground,
  };

  return [state, actions];
};