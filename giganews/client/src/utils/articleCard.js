import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core'

import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

const buttonTheme = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 16,
        "fontWeightLight": 200,
        "fontWeightRegular": 400,
        "fontWeightBold": 800
    }
})

const ArticleCard = ({article}) => {

    const [favorite, setFavorite] = useState(false)

    return(
        <Card>
            <CardMedia
                style={{height:0,paddingTop:'56.25%'}}
                image="https://picsum.photos/500/500"
                title='Some title'
            />
            <CardContent>
                <Typography variant='h5' component='h2' style={{fontFamily:'Rajdhani'}}>
                    {article.title}
                </Typography>
                <hr style={{background:'black'}}/>
                <Typography variant='body2' component='p' style={{fontFamily:'Rajdhani'}}>
                    {article.excerpt}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            { favorite ?
                <IconButton style={{color:'black'}} onClick={()=>setFavorite(false)}>
                    <FavoriteSharpIcon/>
                </IconButton> :
                <IconButton style={{color:'black'}} onClick={()=>setFavorite(true)}>
                    <FavoriteBorderSharpIcon/>
                </IconButton>
            }
            <MuiThemeProvider theme={buttonTheme}>
                <Button size='small' style={{color:'black',fontWeight:800}} component={RouterLink} to={`/article/${article._id}`}>
                    View_<span style={{fontWeight:400}}>article</span>
                </Button>
            </MuiThemeProvider>
            </CardActions>
        </Card>
    )
}


export default ArticleCard