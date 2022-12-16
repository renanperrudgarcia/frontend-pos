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
    navigate('/follow-up/0')
  }, [user])
  
  return <></>
}

export default withAuth(Home, [UsersTypes.ALL])