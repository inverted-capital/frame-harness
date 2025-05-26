import { create } from 'zustand'
import {
  ScreenSize,
  BackgroundType,
  ScopeProps,
  TestHarnessState,
  TestHarnessActions
} from '../types'

interface Store extends TestHarnessState, TestHarnessActions {
  initializeFromUrl: () => void
}

export const useHarnessStore = create<Store>((set, get) => ({
  apiUrl: 'https://api.example.com',
  frameSource: `${window.location.origin}/frame.html`,
  privyAppId: '123456789',
  screenSize: 'desktop',
  isDashboardVisible: true,
  isAuthenticated: true,
  showBorder: false,
  background: 'checkered',
  scope: { repo: '', branch: '', commit: '', path: '' },
  setApiUrl: (apiUrl: string) => set({ apiUrl }),
  setFrameSource: (frameSource: string) => set({ frameSource }),
  setPrivyAppId: (privyAppId: string) => set({ privyAppId }),
  setScreenSize: (screenSize: ScreenSize) => set({ screenSize }),
  toggleBorder: () => set((state) => ({ showBorder: !state.showBorder })),
  signOut: () => set({ isAuthenticated: false }),
  openFullscreen: () => {
    const state = get()
    const baseUrl = window.location.href.split('?')[0]
    const params = {
      hideDashboard: 'true',
      apiUrl: state.apiUrl,
      frameSource: state.frameSource,
      privyAppId: state.privyAppId,
      screenSize: state.screenSize,
      background: state.background,
      repo: state.scope.repo || '',
      branch: state.scope.branch || '',
      commit: state.scope.commit || '',
      path: state.scope.path || ''
    }
    const query = Object.entries(params)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    const fullUrl = query ? `${baseUrl}?${query}` : baseUrl
    window.open(fullUrl, '_blank')
  },
  setBackground: (background: BackgroundType) => set({ background }),
  setScope: (field: keyof ScopeProps, value: string) =>
    set((state) => ({ scope: { ...state.scope, [field]: value } })),
  initializeFromUrl: () => {
    const urlParams = new URLSearchParams(window.location.search)
    const hideParam = urlParams.get('hideDashboard')
    set({ isDashboardVisible: hideParam !== 'true' })

    const apiUrl = urlParams.get('apiUrl')
    const frameSource = urlParams.get('frameSource')
    const privyAppId = urlParams.get('privyAppId')
    const screenSize = urlParams.get('screenSize') as ScreenSize | null
    const background = urlParams.get('background') as BackgroundType | null
    const repo = urlParams.get('repo')
    const branch = urlParams.get('branch')
    const commit = urlParams.get('commit')
    const path = urlParams.get('path')

    if (apiUrl) set({ apiUrl })
    if (frameSource) set({ frameSource })
    if (privyAppId) set({ privyAppId })
    if (screenSize) set({ screenSize })
    if (background) set({ background })
    if (repo) set((state) => ({ scope: { ...state.scope, repo } }))
    if (branch) set((state) => ({ scope: { ...state.scope, branch } }))
    if (commit) set((state) => ({ scope: { ...state.scope, commit } }))
    if (path) set((state) => ({ scope: { ...state.scope, path } }))

    // Remove query parameters from the address bar once consumed
    if (window.location.search) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }
}))
