import { useState, useCallback, useEffect } from 'react';
import { ScreenSize, TestHarnessState, TestHarnessActions } from '../types';

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
    screenSize: 'desktop',
    isDashboardVisible: initDashboardVisible(),
    isAuthenticated: true,
    showBorder: true,
  });

  // Update state from URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const apiUrl = urlParams.get('apiUrl');
    const frameSource = urlParams.get('frameSource');
    const screenSize = urlParams.get('screenSize');
    
    setState(prev => ({
      ...prev,
      apiUrl: apiUrl || prev.apiUrl,
      frameSource: frameSource || prev.frameSource,
      screenSize: (screenSize as ScreenSize) || prev.screenSize,
    }));
  }, []);

  const setApiUrl = useCallback((apiUrl: string) => {
    setState((prev) => ({ ...prev, apiUrl }));
  }, []);

  const setFrameSource = useCallback((frameSource: string) => {
    setState((prev) => ({ ...prev, frameSource }));
  }, []);

  const setScreenSize = useCallback((screenSize: ScreenSize) => {
    setState((prev) => ({ ...prev, screenSize }));
  }, []);

  const toggleBorder = useCallback(() => {
    setState((prev) => ({ ...prev, showBorder: !prev.showBorder }));
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: false }));
  }, []);

  const openFullscreen = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('hideDashboard', 'true');
    url.searchParams.set('apiUrl', state.apiUrl);
    url.searchParams.set('frameSource', state.frameSource);
    url.searchParams.set('screenSize', state.screenSize);
    window.open(url.toString(), '_blank');
  }, [state.apiUrl, state.frameSource, state.screenSize]);

  const actions: TestHarnessActions = {
    setApiUrl,
    setFrameSource,
    setScreenSize,
    toggleBorder,
    signOut,
    openFullscreen,
  };

  return [state, actions];
};