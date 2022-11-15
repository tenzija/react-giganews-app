import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from 'react-redux'

import {
    TextField,
    Divider,
    Button,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core'

import { updateUserProfile } from '../../../store/actions/users_actions'

const buttonTheme = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 15,
    }
})

export const UserProfile = () => {
    const { firstname, lastname, age } = useSelector(state=> state.users.data)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: { firstname, lastname, age },
        onSubmit:(values,{resetForm})=>{
            dispatch(updateUserProfile(values))
        }
    })

    const confirmeBtn = () => (
        <MuiThemeProvider
            theme={buttonTheme}
        >
            <Button
                variant="outlined"
                style={{background:'black',color:'white',fontWeight:'800'}}
                className='mt-2'
                type='submit'
            >
                &gt; Edit_<span style={{fontWeight:'400'}}>Profile</span>
            </Button>
        </MuiThemeProvider>
    )

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    return(
        <>
            <form className="mt-3 article_form" onSubmit={formik.handleSubmit} style={{maxWidth:'250px'}}>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name='firstname'
                        label='Change your firstname: '
                        variant="filled"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik,'firstname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name='lastname'
                        label='Change your lastname: '
                        variant="filled"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik,'lastname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name='age'
                        label='Change your age: '
                        variant="filled"
                        {...formik.getFieldProps('age')}
                        {...errorHelper(formik,'age')}
                    />
                </div>
                { confirmeBtn() }
            </form>
        </>
    )
}

export default UserProfile