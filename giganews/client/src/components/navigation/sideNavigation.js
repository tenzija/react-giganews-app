import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'

import{
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core'
import DehazeIcon from '@material-ui/icons/Dehaze';
import MailSharpIcon from '@material-ui/icons/MailSharp'
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import LogoutSharpIcon from '@material-ui/icons/TurnedInNotSharp'
import LoginSharpIcon from '@material-ui/icons/TurnedInSharp';
import DashboardIcon from '@material-ui/icons/DashboardSharp'

/// CHANGE THE ICONS


const SideDrawer = () => {
  
    const [state, setState] = useState(false)

    const sideFontTheme = createMuiTheme({
        typography: {
            "fontFamily": `'Turret Road', cursive`,
            "fontSize": 15,
            "fontWeightLight": 200,
            "fontWeightRegular": 400,
            "fontWeightBold": 800
        }
    })

  return(
    <>
        <DehazeIcon
            className='drawer_btn'
            onClick={()=>setState(true)}
        />
        <Drawer anchor={'right'} open={state} onClose={()=> setState(false)}>
            <form style={{margin:'20px'}}>
                <TextField id='outlined-basic' label='Search'
                    variant='outlined'
                />
            </form>
            <Divider/>
            <List>
                <MuiThemeProvider theme={sideFontTheme}>
                    <ListItem button component={RouterLink} to='/' onClick={()=>setState(false)} style={{fontFamily:'Turret Road'}}>
                        <ListItemIcon><HomeSharpIcon style={{color:'black'}}/></ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>

                    <ListItem button component={RouterLink} to='/contact' onClick={()=>setState(false)} style={{fontFamily:'Turret Road'}}>
                        <ListItemIcon><MailSharpIcon style={{color:'black'}}/></ListItemIcon>
                        <ListItemText primary='Contact'/>
                    </ListItem>

                    <ListItem button component={RouterLink} to='/auth' onClick={()=>setState(false)} style={{fontFamily:'Turret Road'}}>
                        <ListItemIcon><LoginSharpIcon style={{color:'black'}}/></ListItemIcon>
                        <ListItemText primary='Sign in'/>
                    </ListItem>

                    <ListItem button component={RouterLink} to='/auth' onClick={()=>setState(false)} style={{fontFamily:'Turret Road'}}>
                        <ListItemIcon><LogoutSharpIcon style={{color:'black'}}/></ListItemIcon>
                        <ListItemText primary='Sign out'/>
                    </ListItem>
                    <Divider/>
                    <List>
                        <ListItem button component={RouterLink} to='/dashboard' onClick={()=>setState(false)} style={{fontFamily:'Turret Road'}}>
                            <ListItemIcon><DashboardIcon style={{color:'black'}}/></ListItemIcon>
                            <ListItemText primary='Dashboard'/>
                        </ListItem>
                    </List>
                </MuiThemeProvider>
            </List>
        </Drawer>
    </>
  )
}

export default SideDrawer;