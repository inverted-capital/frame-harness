import { useReducer, useCallback, useEffect } from 'react'
import {
  ScreenSize,
  TestHarnessState,
  TestHarnessActions,
  BackgroundType,
  ScopeProps
} from '../types'

type Action =
  | { type: 'setApiUrl'; payload: string }
  | { type: 'setFrameSource'; payload: string }
  | { type: 'setPrivyAppId'; payload: string }
  | { type: 'setScreenSize'; payload: ScreenSize }
  | { type: 'toggleBorder' }
  | { type: 'setBackground'; payload: BackgroundType }
  | { type: 'setScope'; field: keyof ScopeProps; value: string }
  | { type: 'signOut' }

const reducer = (state: TestHarnessState, action: Action): TestHarnessState => {
  switch (action.type) {
    case 'setApiUrl':
      return { ...state, apiUrl: action.payload }
    case 'setFrameSource':
      return { ...state, frameSource: action.payload }
    case 'setPrivyAppId':
      return { ...state, privyAppId: action.payload }
    case 'setScreenSize':
      return { ...state, screenSize: action.payload }
    case 'toggleBorder':
      return { ...state, showBorder: !state.showBorder }
    case 'setBackground':
      return { ...state, background: action.payload }
    case 'setScope':
      return {
        ...state,
        scope: { ...state.scope, [action.field]: action.value }
      }
    case 'signOut':
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

export const useTestHarness = (): [TestHarnessState, TestHarnessActions] => {
  // Check URL params for dashboard visibility
  const initDashboardVisible = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const hideParam = urlParams.get('hideDashboard')
    return hideParam !== 'true'
  }

  const [state, dispatch] = useReducer(reducer, {
    apiUrl: 'https://api.example.com',
    frameSource: 'https://source.example.com',
    privyAppId: '123456789',
    screenSize: 'desktop',
    isDashboardVisible: initDashboardVisible(),
    isAuthenticated: true,
    showBorder: false,
    background: 'checkered',
    scope: {
      repo: '',
      branch: '',
      commit: '',
      path: ''
    }
  })

  // Update state from URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const apiUrl = urlParams.get('apiUrl')
    const frameSource = urlParams.get('frameSource')
    const privyAppId = urlParams.get('privyAppId')
    const screenSize = urlParams.get('screenSize') as ScreenSize | null
    const background = urlParams.get('background') as BackgroundType | null
    const repo = urlParams.get('repo')
    const branch = urlParams.get('branch')
    const commit = urlParams.get('commit')
    const path = urlParams.get('path')

    if (apiUrl) dispatch({ type: 'setApiUrl', payload: apiUrl })
    if (frameSource) dispatch({ type: 'setFrameSource', payload: frameSource })
    if (privyAppId) dispatch({ type: 'setPrivyAppId', payload: privyAppId })
    if (screenSize) dispatch({ type: 'setScreenSize', payload: screenSize })
    if (background) dispatch({ type: 'setBackground', payload: background })
    if (repo) dispatch({ type: 'setScope', field: 'repo', value: repo })
    if (branch) dispatch({ type: 'setScope', field: 'branch', value: branch })
    if (commit) dispatch({ type: 'setScope', field: 'commit', value: commit })
    if (path) dispatch({ type: 'setScope', field: 'path', value: path })
  }, [])

  const setApiUrl = useCallback((apiUrl: string) => {
    dispatch({ type: 'setApiUrl', payload: apiUrl })
  }, [])

  const setFrameSource = useCallback((frameSource: string) => {
    dispatch({ type: 'setFrameSource', payload: frameSource })
  }, [])

  const setPrivyAppId = useCallback((privyAppId: string) => {
    dispatch({ type: 'setPrivyAppId', payload: privyAppId })
  }, [])

  const setScreenSize = useCallback((screenSize: ScreenSize) => {
    dispatch({ type: 'setScreenSize', payload: screenSize })
  }, [])

  const toggleBorder = useCallback(() => {
    dispatch({ type: 'toggleBorder' })
  }, [])

  const setBackground = useCallback((background: BackgroundType) => {
    dispatch({ type: 'setBackground', payload: background })
  }, [])

  const setScope = useCallback((field: keyof ScopeProps, value: string) => {
    dispatch({ type: 'setScope', field, value })
  }, [])

  const signOut = useCallback(() => {
    dispatch({ type: 'signOut' })
  }, [])

  const openFullscreen = useCallback(() => {
    // Create base URL without existing query parameters
    const baseUrl = window.location.href.split('?')[0]

    const params = new URLSearchParams({
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
    })

    const fullUrl = `${baseUrl}?${params.toString()}`

    // Open in new tab
    window.open(fullUrl, '_blank')
  }, [
    state.apiUrl,
    state.frameSource,
    state.privyAppId,
    state.screenSize,
    state.background,
    state.scope
  ])

  const actions: TestHarnessActions = {
    setApiUrl,
    setFrameSource,
    setPrivyAppId,
    setScreenSize,
    toggleBorder,
    signOut,
    openFullscreen,
    setBackground,
    setScope
  }

  return [state, actions]
}
