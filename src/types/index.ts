export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export interface TestHarnessState {
  apiUrl: string;
  frameSource: string;
  screenSize: ScreenSize;
  isDashboardVisible: boolean;
  isAuthenticated: boolean;
  showBorder: boolean;
}

export interface TestHarnessActions {
  setApiUrl: (url: string) => void;
  setFrameSource: (url: string) => void;
  setScreenSize: (size: ScreenSize) => void;
  toggleDashboard: () => void;
  toggleBorder: () => void;
  signOut: () => void;
}

export interface ComponentUnderTestProps {
  apiUrl: string;
  frameSource: string;
}