import type { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import type { ReactElement, ReactNode } from 'react'

declare module 'dashboard' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}
