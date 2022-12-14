import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../utils/loader'

export default function authguard(ComposedComponent,roleCheck=false){
    const AuthenticationCheck = (props) => {
        const[isAuth, setIsAuth] = useState(false)
        const users = useSelector( state=>state.users )
        
        useEffect(()=>{
            if(!users.auth){
                props.history.push('/')
            } else {
                if(roleCheck && users.data.role === 'user'){
                    props.history.push('/dashboard')
                } else {
                    setIsAuth(true)
                }
            }
        },[props,users])

        if(!isAuth){
            return(
                <div className="d-flex justify-content-center">
                    <Loader/> 
                </div>
            )
        } else{
            return(
                <ComposedComponent {...props}/>
            )
        }
    }
    return AuthenticationCheck
}