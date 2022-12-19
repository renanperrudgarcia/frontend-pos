import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Providers/auth'
import { UsersTypes } from '../../utils/constants'
import { withAuth } from '../../utils/hoc/with-auth'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    navigate(user.tipo_usuario === UsersTypes.STUDENT ? '/follow-up/0' : '/reports/student')
  }, [user])
  
  return <></>
}

export default withAuth(Home, [UsersTypes.ALL])