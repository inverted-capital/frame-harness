import { useState, useCallback } from 'react';
import { ScreenSize, TestHarnessState, TestHarnessActions } from '../types';

export const useTestHarness = (): [TestHarnessState, TestHarnessActions] => {
  const [state, setState] = useState<TestHarnessState>({
    apiUrl: 'https://api.example.com',
    frameSource: 'https://source.example.com',
    screenSize: 'desktop',
    isDashboardVisible: true,
    isAuthenticated: true,
    showBorder: true,
  });

  const setApiUrl = useCallback((apiUrl: string) => {
    setState((prev) => ({ ...prev, apiUrl }));
  }, []);

  const setFrameSource = useCallback((frameSource: string) => {
    setState((prev) => ({ ...prev, frameSource }));
  }, []);

  const setScreenSize = useCallback((screenSize: ScreenSize) => {
    setState((prev) => ({ ...prev, screenSize }));
  }, []);

  const toggleDashboard = useCallback(() => {
    setState((prev) => ({ ...prev, isDashboardVisible: !prev.isDashboardVisible }));
  }, []);

  const toggleBorder = useCallback(() => {
    setState((prev) => ({ ...prev, showBorder: !prev.showBorder }));
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: false }));
  }, []);

  const actions: TestHarnessActions = {
    setApiUrl,
    setFrameSource,
    setScreenSize,
    toggleDashboard,
    toggleBorder,
    signOut,
  };

  return [state, actions];
};