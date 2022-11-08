import React, { useReducer, useEffect } from 'react';
import {
  Button,
  Grid,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../store/actions/article_actions'

import ArticleCard from '../../utils/articleCard';

const initialSort = {
  sortBy:"_id",
  order:"desc",
  limit:8,
  skip:0
}

const buttonTheme = createMuiTheme({
  typography: {
      "fontFamily": `'Turret Road', cursive`,
      "fontSize": 15,
  }
})

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({...state, ...newState}),
    initialSort
  )

  const articles = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    // trigger only on first render
    if(articles && !articles.articles){
    // dispatch
    dispatch(getArticles(initialSort))
    }

  }, [dispatch, articles])

  return(
    <div>
      <div>
        CARROUSEL
      </div>
      <Grid container spacing={2} className='article_card'>
        { articles && articles.articles ?
          articles.articles.map((item)=>(
            <Grid item key={item._id} xs={12} sm={6} lg={3}>
              <ArticleCard key={item._id} article={item}/>
            </Grid>
          ))
        :null}
      </Grid>
      <MuiThemeProvider theme={buttonTheme}>
        <Button
          variant="contained"
          onClick={()=>{
            let skip = sort.skip + sort.limit
            dispatch(getArticles({...sort, skip:skip}))
            setSort({skip:skip})
          }}
          className='mt-3'
          style={{background:'black',color:'white', fontWeight:400}}
        >
          &gt; Load_<span style={{fontWeight:800}}>more</span>
        </Button>
      </MuiThemeProvider>
    </div>
  )
}

export default Home;