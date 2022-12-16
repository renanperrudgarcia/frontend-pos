import { ComponentType, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Providers/auth"
import { UsersTypes } from "../constants"

export const withAuth = <P extends object>(
    Component: ComponentType<P>,
    allowedRoles: number[] | null = null,
) => {
    return (props: P) => {
        const navigate = useNavigate()
        const { user } = useAuth()
        console.log(1, { user })
        if (!user.access_token) {
            console.log('AEFADSASF')
            navigate('/login')
            return
        }
        console.log(2, { user })
        useEffect(() => {
            if (!user.access_token) {
                console.log(3, { user })
                navigate('/login')
                return
            }
            if (allowedRoles[0] !== UsersTypes.ALL && !allowedRoles.includes(user.tipo_usuario)) {
                console.log(4, { user })
                navigate('/login')
                return
            }
        }, [user])
        // console.log(5, { user })
        // navigate(user.tipoUsuario === UsersTypes.STUDENT ? '/follow-up' : '/reports/student')

        return <Component {...props} />
    }
}
