import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser } from './store/actions/users_actions'

import authguard from './hoc/authGuard'
import Article from './components/articles/article'
import AddArticle from './components/dashboard/articles/add'
import EditArticle from './components/dashboard/articles/edit'
import Contact from './components/contact'

import Home from './components/home'
import Header from './components/navigation/header'
import Auth from './components/auth'
import MainLayout from './hoc/mainLayout'
import Loader from './utils/loader'
import Dashboard from './components/dashboard'
import Profile from './components/dashboard/profile'
import Articles from './components/dashboard/articles'

const Routes = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const users = useSelector(state=>state.users)

  useEffect(()=>{
    dispatch(isAuthUser())
  },[dispatch])

  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])
  
  return(
    <BrowserRouter>
      <Header/>

      { loading ? 
        <div className="d-flex justify-content-center">
          <Loader/> 
        </div>
        :
        <MainLayout>
          <Switch>
            <Route path='/dashboard/articles/edit/:id' component={authguard(EditArticle,true)}/>
            <Route path='/dashboard/articles/add' component={authguard(AddArticle,true)}/>
            <Route path='/dashboard/articles' component={authguard(Articles,true)}/>
            <Route path='/dashboard/profile' component={authguard(Profile)}/>
            <Route path='/dashboard' component={authguard(Dashboard)}/>
            <Route path='/article/:id' component={Article}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/' component={Home}/>
          </Switch>
        </MainLayout> }
      
      <GoogleFontLoader
        fonts={[
          { font:'Turret Road', weights: [200, 400, 800] },
          { font: 'Rajdhani', weights: [300, 500, 700] }
        ]}
      />
    </BrowserRouter>
  )
}


export default Routes