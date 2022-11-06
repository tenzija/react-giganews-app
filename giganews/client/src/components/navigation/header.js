import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../store/actions/index'

import SideDrawer from './sideNavigation';
import { showToast } from '../../utils/tools'


const Header = (props) => {

  const dispatch = useDispatch()
  
  const notification = useSelector(state=>state.notifications)

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
      <nav className='navbar fixed-top'>
        <Link style={{fontFamily:'Turret Road',fontWeight:800,fontSize:26}} to='/'
          className='navbar-brand d-flex align-items-center ml-2'
        >
          &gt; Sapphire<span style={{fontWeight:200}}>_Docs</span>
        </Link>     
        <SideDrawer/>
      </nav>
    </>
  )
}

export default withRouter(Header);