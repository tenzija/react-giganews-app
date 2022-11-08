import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    SITE_LAYOUT,
    GET_ARTICLE
} from '../types'

// ARTICLES

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})

export const getArticle = (article) => ({
    type:GET_ARTICLE,
    payload:article
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

export const signOut = () => ({
    type: SIGN_OUT
})

// SITE

export const appLayout = (layout) => ({
    type:SITE_LAYOUT,
    payload:layout
})