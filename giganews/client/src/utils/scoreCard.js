import React from 'react'
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@material-ui/core'

import TheaterComedySharpIcon from '@material-ui/icons/TheatersSharp'
import PersonSharpIcon from '@material-ui/icons/PersonSharp'
import StarRateSharpIcon from '@material-ui/icons/StarRateSharp'

const ScoreCard = ({current}) => {


    return(
        <List className='scorecard'>
            {/* score */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarRateSharpIcon style={{color: 'black'}}/></Avatar>
                </ListItemAvatar>
                <ListItemText primary='Our score' secondary={current.score} className='rating'/>
            </ListItem>
            <Divider variant='inset' component='li'/>
            {/* actors */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><PersonSharpIcon style={{color: 'black'}}/></Avatar>
                </ListItemAvatar>
                <div>
                    { current.actors.map((item,index)=>(
                        <Chip
                            key={`${index+item}`}
                            item={item}
                            label={item}
                            clickable
                            style={{color:'white',background:'black'}}
                            variant='outlined'
                            className='chip'
                        />
                    ))

                    }
                </div>
            </ListItem>
            <Divider variant='inset' component='li'/>
            {/* director */}
            
            <ListItem>
                <ListItemAvatar>
                    <Avatar><TheaterComedySharpIcon style={{color: 'black'}}/></Avatar>
                </ListItemAvatar>
                <ListItemText primary='Director' secondary={current.director} className='rating'/>
            </ListItem>
        </List>
    )
}

export default ScoreCard