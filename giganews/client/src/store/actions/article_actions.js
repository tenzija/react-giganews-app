import * as articles from './index'
import Axios from 'axios'

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