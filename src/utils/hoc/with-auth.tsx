import { ComponentType, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Providers/auth"
import { User } from "../../services/users"
import { UsersTypes } from "../constants"

export const withAuth = <P extends object>(
    Component: ComponentType<P>,
    allowedRoles: number[] | null = null,
) => {
    return (props: P) => {
        const navigate = useNavigate()
        const user = localStorage.getItem('user')
        const userData:User = JSON.parse(user) 
        useEffect(() => {

            if (!userData?.access_token) {
                navigate('/login')
                return
            }
        }, [userData, navigate])

        return <Component {...props} />
    }
}
