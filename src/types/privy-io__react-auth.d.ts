declare module '@privy-io/react-auth' {
  import type { ReactNode } from 'react'

  export interface PrivyProviderProps {
    appId: string
    clientId?: string
    config?: unknown
    children: ReactNode
  }

  export const PrivyProvider: (props: PrivyProviderProps) => JSX.Element

  export interface User {
    id: string
  }

  export interface PrivyInterface {
    ready: boolean
    authenticated: boolean
    user: User | null
    login: (options?: unknown) => void
  }

  export function usePrivy(): PrivyInterface

  export function useIdentityToken(): { identityToken: string | null }
}
