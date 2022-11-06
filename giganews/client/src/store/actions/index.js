import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER
} from '../types'

// ARTICLES

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})

// NOTIFICATION

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

// USERS

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
})
