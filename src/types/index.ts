export type ScreenSize = 'mobile' | 'tablet' | 'desktop';
export type BackgroundType = 'white' | 'checkered';

export interface ScopeProps {
  repo?: string;
  branch?: string;
  commit?: string;
  path?: string;
}

export interface TestHarnessState {
  apiUrl: string;
  frameSource: string;
  privyAppId: string;
  screenSize: ScreenSize;
  isDashboardVisible: boolean;
  isAuthenticated: boolean;
  showBorder: boolean;
  background: BackgroundType;
  scope: ScopeProps;
}

export interface TestHarnessActions {
  setApiUrl: (url: string) => void;
  setFrameSource: (url: string) => void;
  setPrivyAppId: (id: string) => void;
  setScreenSize: (size: ScreenSize) => void;
  toggleBorder: () => void;
  signOut: () => void;
  openFullscreen: () => void;
  setBackground: (type: BackgroundType) => void;
  setScope: (field: keyof ScopeProps, value: string) => void;
}

export interface ComponentUnderTestProps {
  apiUrl: string;
  frameSource: string;
  privyAppId: string;
  scope: ScopeProps;
}