// ** Icon imports
import { AccountClockOutline, ClockEdit, KeyOutline } from 'mdi-material-ui'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'

// ** Type import
import { VerticalNavItemsType } from '@app/src/_start/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Configurações',
      icon: AccountCogOutline,
      path: '/dashboard/configuracao/autenticacao-wordpress'
    },
    {
      sectionTitle: 'Configurações'
    },
  ]
}

export default navigation
