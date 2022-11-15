import * as articles from './index'
import Axios from 'axios'
import { getAuthHeader } from '../../utils/tools'

Axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getArticles = (sort) => {
    return async(dispatch, getState) => {
        try{
            const arts = await Axios.post(`/api/articles/loadmore`, sort)
            const prevArts = getState().articles.articles
            let newArts = [...arts.data]

            if(prevArts){
                newArts = [...prevArts, ...arts.data]
            }

            dispatch(articles.getArticles(newArts))
            //dispatch(articles.successGlobal('Awesome!'))
        } catch(error){
            dispatch(articles.errorGlobal('Upps error loading articles...'))
        }
    }
}

export const getArticle = (id) => {
    return async(dispatch)=>{
        try{
            const request = await Axios.get(`/api/articles/get_byid/${id}`)
            dispatch(articles.getArticle(request.data[0]))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const addArticle = (article) => {
    return async(dispatch)=>{
        try{
            const request = await Axios.post(`/api/articles/admin/add_articles`, article, getAuthHeader())

            dispatch(articles.addArticle(request.data))
            dispatch(articles.successGlobal('Accomplishment achieved!'))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const getPaginateArticles = (page=1, limit=5) => {
    return async(dispatch)=>{
        try{
            const request = await Axios.post(`/api/articles/admin/paginate`,{
                page,
                limit
            }, getAuthHeader())

            dispatch(articles.getPaginateArticles(request.data))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const changeStatusArticle = (status,_id) => {
    return async(dispatch, getState)=>{
        try{
            const article = await Axios.patch(`/api/articles/admin/${_id}`, {
                status
            }, getAuthHeader())

            let art = article.data
            let state = getState().articles.adminArticles.docs ///last state
            let position = state.findIndex( art => art._id === _id) ///find the position
            state[position] = art

            dispatch(articles.updateArticleStatus(state))
            dispatch(articles.successGlobal('Article status successfully changed'))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const removeArticle = (id) => {
    return async(dispatch)=>{
        try{
            await Axios.delete(`/api/articles/admin/${id}`, getAuthHeader())

            dispatch(articles.removeArticle())
            dispatch(articles.successGlobal('Article removed'))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const getAdminArticle = (id) => {
    return async(dispatch)=>{
        try{
            const request = await Axios.get(`/api/articles/admin/${id}`, getAuthHeader())
            dispatch(articles.getArticle(request.data))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}

export const updateArticle = (article,id) => {
    return async(dispatch)=>{
        try{
            const newArticle = await Axios.patch(`/api/articles/admin/${id}`,article, getAuthHeader())
            dispatch(articles.getArticle(newArticle.data))
            dispatch(articles.successGlobal('Update successful!'))

        } catch(error){
            dispatch(articles.errorGlobal('Ran into an Error while updating article!'))
        }
    }
} 