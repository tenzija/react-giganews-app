import React,{ useState, useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDispatch, useSelector }  from 'react-redux'
import { registerUser, signInUser } from '../../store/actions/users_actions'
import {
    TextField,
    Button,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core'

/// IMPORT ICONS

const authFont = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 15,
        "fontWeightLight": 200,
        "fontWeightRegular": 400,
        "fontWeightBold": 800
    }
})

const Auth = (props) => {

    const [register, setRegister] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues:{ email:'',password:'' },
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry, the email is required!')
            .email('Sorry, this is not a valid email!'),
            password:Yup.string()
            .required('Sorry, the password is required')
        }),
        onSubmit:(values, {resetForm})=>{
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if(register){
            ///register
            dispatch(registerUser(values))
        } else{
            ///login
            dispatch(signInUser(values))
        }
    }

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard')
        }
    },[notifications, props.history])

    return(
        <>
            <div className="auth_container">
                <div style={{fontFamily:'Turret Road',fontWeight:800,fontSize:34}}><span style={{fontFamily:'Turret Road',fontWeight:200}}>&gt;_</span>Authenticate:</div>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name='email'
                            label='Enter your email'
                            //variant
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik,'email')}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name='password'
                            label='Enter your password'
                            type="password"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik,'password')}
                        />
                    </div>
                    <MuiThemeProvider theme={authFont}>
                        <Button variant="contained" type='submit' size='large' style={{background:'black',color:'white', fontWeight:400}}>
                            {register ? 'Register':'Login'}
                        </Button>
                        <Button variant="outlined" size='small' 
                        className='mt-3' onClick={()=>setRegister(!register)}
                        >
                            Want ot <span style={{fontWeight:800}}>&nbsp;{ !register ? 'Register' : 'Login' }</span>?
                        </Button>
                    </MuiThemeProvider>
                </form>
            </div>
        </>
    )
}

export default Auth