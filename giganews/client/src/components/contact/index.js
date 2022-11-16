import React, { useEffect, useState } from "react";
import { Form, useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import {
    TextField,
    Button,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core'
import Loader from "../../utils/loader";
import { contactUs } from '../../store/actions/users_actions'

const buttonTheme = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 15,
    }
})

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email:'',
            firstname:'',
            lastname:'',
            message:''
        },
        validationSchema: Yup.object({
            email:Yup.string()
                .required('Sorry the email is required')
                .email('This must be a valid email'),
            firstname:Yup.string()
                .required('Sorry the firstname is required')
                .min(2)
                .max(15),
            lastname:Yup.string()
                .required('Sorry the lastname is required')
                .min(2)
                .max(15),
            message:Yup.string()
                .required('Sorry the message is required')
                .min(20)
                .max(500, 'Sorry to many characters'),
        }),
        onSubmit: (values) => {
            setLoading(true)
            dispatch(contactUs(values))
        }
    })

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    useEffect(() => {
        if(notifications && notifications.success){
            formik.resetForm()
            setLoading(false)
        }
    },[notifications])
    
    return(
        <>
            { loading ?
                <div className="d-flex justify-content-center">
                    <Loader/> 
                </div>
                :
                <>
                    <div className="contact-title">
                        <h1 style={{fontFamily:'Turret Road',fontWeight:'200'}}>
                            &gt; Contact
                                <span style={{fontWeight:'800'}}>
                                    _us:
                                </span>
                            </h1>
                    </div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name='email'
                                label='Enter your email'
                                variant="filled"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name='firstname'
                                label='Enter your firstname'
                                variant="filled"
                                {...formik.getFieldProps('firstname')}
                                {...errorHelper(formik,'firstname')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name='lastname'
                                label='Enter your lastname'
                                variant="filled"
                                {...formik.getFieldProps('lastname')}
                                {...errorHelper(formik,'lastname')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name='message'
                                label='Enter your message'
                                variant="filled"
                                multiline
                                rows={4}
                                {...formik.getFieldProps('message')}
                                {...errorHelper(formik,'message')}
                            />
                        </div>

                        <MuiThemeProvider
                            theme={buttonTheme}
                        >
                            <Button
                                variant="contained"
                                type='submit'
                                style={{background:'black',color:'white'}}
                            >
                                &gt; Send_<span style={{fontWeight:'800'}}>Message</span>
                            </Button>
                        </MuiThemeProvider>

                    </form>
                </>
            }
        </>
    )
}

export default Contact