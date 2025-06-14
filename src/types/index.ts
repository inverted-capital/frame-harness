export type ScreenSize = 'mobile' | 'tablet' | 'desktop'
export type BackgroundType = 'white' | 'checkered'

export interface ScopeProps {
  repo?: string
  branch?: string
  commit?: string
  path?: string
}

export interface TestHarnessState {
  apiUrl: string
  frameSource: string
  privyAppId: string
  screenSize: ScreenSize
  isDashboardVisible: boolean
  showBorder: boolean
  background: BackgroundType
  scope: ScopeProps
}

export interface TestHarnessActions {
  setApiUrl: (url: string) => void
  setFrameSource: (url: string) => void
  setPrivyAppId: (id: string) => void
  setScreenSize: (size: ScreenSize) => void
  toggleBorder: () => void
  openFullscreen: () => void
  setBackground: (type: BackgroundType) => void
  setScope: (field: keyof ScopeProps, value: string) => void
  resetParams: () => void
}

export interface ComponentUnderTestProps {
  frameSource: string
  privyAppId: string
  scope: ScopeProps
}
