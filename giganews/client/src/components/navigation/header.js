import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../store/actions/index'

import SideDrawer from './sideNavigation';
import { showToast } from '../../utils/tools'
import { appLayout } from '../../store/actions/site_actions';
import { signOut } from '../../store/actions/users_actions'


const Header = (props) => {

  const [layout, setLayout] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.notifications)
  const users = useSelector(state=>state.users)

  const signOutUser = () => {
    dispatch(signOut())
    props.history.push('/')
    window.location.reload()
  }

  useEffect(()=>{
    let pathArray = props.location.pathname.split('/')
    if(pathArray[1] === 'dashboard'){
      setLayout('dash_layout')
      dispatch(appLayout('dash_layout'))
    } else {
      setLayout('')
      dispatch(appLayout(''))
    }
  }, [props.location.pathname, dispatch])

  useEffect(()=>{
    if(notification && notification.error){
      const msg = notification.msg ? notification.msg : 'Error'
      showToast('ERROR', msg)
      dispatch(clearNotification())
    }

    if(notification && notification.success){
      const msg = notification.msg ? notification.msg : 'Success'
      showToast('SUCCESS', msg)
      dispatch(clearNotification())
    }

  },[notification, dispatch])

  return(
    <>
      <nav className={`navbar fixed-top ${layout}`}>
        <Link style={{fontFamily:'Turret Road',fontWeight:800,fontSize:26}} to='/'
          className='navbar-brand d-flex align-items-center ml-2'
        >
          &gt; Sapphire<span style={{fontWeight:200}}>_Docs</span>
        </Link>     
        <SideDrawer 
          users={users}
          signOutUser={signOutUser}
        />
      </nav>
    </>
  )
}

export default withRouter(Header);