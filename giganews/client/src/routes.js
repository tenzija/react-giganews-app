import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser } from './store/actions/users_actions'

import Home from './components/home'
import Header from './components/navigation/header'
import Auth from './components/auth'
import MainLayout from './hoc/mainLayout'
import Loader from './utils/loader'


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