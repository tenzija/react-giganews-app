import * as users from './index'
import Axios from 'axios'
import { getAuthHeader } from '../../utils/tools'

Axios.defaults.headers.post['Content-Type'] = 'application/json'

export const registerUser = (values) => {
    return async(dispatch) => {
        try{
            const user = await Axios.post(`/api/users/register`, {
                email: values.email,
                password: values.password
            })
            dispatch(users.authUser({data:user.data, auth:true}))
            dispatch(users.successGlobal('Success! / Check your email..'))
        } catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const signInUser = (values) => {
    return async(dispatch) => {
        try{
            const user = await Axios.post(`/api/users/signin`, {
                email: values.email,
                password: values.password
            })
            dispatch(users.authUser({data:user.data, auth:true}))
            dispatch(users.successGlobal('Success / Welcome'))
        } catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const isAuthUser = () => {
    return async (dispatch) => {
        try{
            const user = await Axios.get(`/api/users/isauth`, getAuthHeader)
            dispatch(users.authUser({data:user.data, auth:true}))
        } catch(error){
            dispatch(users.authUser({data:{}, auth:false}))
        }
    }
}