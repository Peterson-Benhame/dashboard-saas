import { useContext } from 'react'

import { SettingsContext, SettingsContextValue } from '@app/src/_start/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
