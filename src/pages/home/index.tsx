import { useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Providers/auth'
import { UsersTypes } from '../../utils/constants'
import { withAuth } from '../../utils/hoc/with-auth'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useLayoutEffect(() => {
      console.log('aaaaaa')
      console.log(user)
    navigate('https://main.d2ymx25fgp5qam.amplifyapp.com' + (user.tipo_usuario === UsersTypes.STUDENT ? '/follow-up/0' : '/reports/student'))
  }, [user])
  
  return <></>
}

export default withAuth(Home, [UsersTypes.ALL])