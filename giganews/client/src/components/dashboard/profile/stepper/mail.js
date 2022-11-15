import React,{ useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { changeUserEmail } from '../../../../store/actions/users_actions'

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core'

const buttonTheme = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 15,
    }
})

export const EmailStepper = ({user}) => {
    const [activeStep, setActiveStep] = useState(0)
    const steps = ['Enter current email: ','Enter new email: ','Are you sure?']
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{email:'',newemail:''},
        validationSchema:Yup.object({
            email:Yup.string()
            .required('This is required!')
            .email('This is not a valid email')
            .test('match', 'Email does not match current email!',(email)=>{
                return email === user.data.email
            }),
            newemail:Yup.string()
            .required('This is required!')
            .email('This is not a valid email')
            .test('equal', 'New email cant be the same as the current one!',(newemail)=>{
                return newemail !== user.data.email
            })
        }),
        onSubmit:(values,{resetForm})=>{
            dispatch(changeUserEmail(values))
        }
    })
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const nextBtn = () => (
        <MuiThemeProvider
            theme={buttonTheme}
        >
            <Button
                variant="contained"
                style={{background:'black',color:'white',fontWeight:'800'}}
                className='mt-2 ml-3'
                onClick={handleNext}
            >
                &gt;_<span style={{fontWeight:'400'}}>next</span>
            </Button>
        </MuiThemeProvider>
    )

    const backBtn = () => (
        <MuiThemeProvider
            theme={buttonTheme}
        >
            <Button
                variant="outlined"
                style={{background:'white',color:'black',fontWeight:'800'}}
                className='mt-2 ml-3'
                onClick={handleBack}
            >
                &gt;_<span style={{fontWeight:'400'}}>back</span>
            </Button>
        </MuiThemeProvider>
    )

    const confirmeBtn = () => (
        <MuiThemeProvider
            theme={buttonTheme}
        >
            <Button
                variant="outlined"
                style={{background:'black',color:'white',fontWeight:'800'}}
                className='mt-2 ml-3'
                onClick={formik.submitForm}
            >
                &gt; Change_<span style={{fontWeight:'400'}}>email</span>
            </Button>
        </MuiThemeProvider>
    )

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    return(
        <>
            <Stepper activeStep={activeStep}>
            { steps.map((label,index)=>{
                return(
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )
            })}
            </Stepper>
            <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                { activeStep === 0 ?
                    <div className="form-group">
                        <TextField
                            style={{width:'50%'}}
                            name='email'
                            label='Current email: '
                            /// variant=""
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik,'email')}
                        />
                        { formik.values.email && !formik.errors.email ?
                            nextBtn()
                        :null}
                    </div>
                :null}
                { activeStep === 1 ?
                    <div className="form-group">
                        <TextField
                            style={{width:'50%'}}
                            name='newemail'
                            label='New email: '
                            /// variant=""
                            {...formik.getFieldProps('newemail')}
                            {...errorHelper(formik,'newemail')}
                        />
                        { formik.values.newemail && !formik.errors.newemail ?
                            nextBtn()
                        :null}
                        { backBtn() }
                    </div>
                :null}
                { activeStep === 2 ?
                    <div className="form-group">
                        { confirmeBtn() }
                        { backBtn() }
                    </div>
                :null}
            </form>
        </>
    )
}

export default EmailStepper