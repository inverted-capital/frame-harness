export type ScreenSize = 'mobile' | 'tablet' | 'desktop';
export type BackgroundType = 'white' | 'gray' | 'black' | 'checkered' | 'gradient';

export interface TestHarnessState {
  apiUrl: string;
  frameSource: string;
  screenSize: ScreenSize;
  isDashboardVisible: boolean;
  isAuthenticated: boolean;
  showBorder: boolean;
  background: BackgroundType;
}

export interface TestHarnessActions {
  setApiUrl: (url: string) => void;
  setFrameSource: (url: string) => void;
  setScreenSize: (size: ScreenSize) => void;
  toggleBorder: () => void;
  signOut: () => void;
  openFullscreen: () => void;
  setBackground: (type: BackgroundType) => void;
}

export interface ComponentUnderTestProps {
  apiUrl: string;
  frameSource: string;
}