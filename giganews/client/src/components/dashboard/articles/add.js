import React, { useState,useEffect,useRef } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from '../../../store/actions/article_actions'
import { validation, formValues } from './validationSchema'

import WYSIWYG from "../../../utils/forms/wysisyg";

import {
    TextField,
    Button,
    Divider,
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core'

import AddSharpIcon from "@material-ui/icons/AddSharp";
import Loader from '../../../utils/loader'
import RemoveSharpIcon from '@material-ui/icons/ClearSharp'

const buttonTheme = createMuiTheme({
    typography: {
        "fontFamily": `'Turret Road', cursive`,
        "fontSize": 15,
    }
})

const AddArticle = (props) => {
    const [editorBlur, setEditorBlur] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    
    const actorsValue = useRef('')

    const dispatch = useDispatch()
    const notifications = useSelector(state=>state.notifications)

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:formValues,
        validationSchema:validation,
        onSubmit:(values,{resetForm}) => {
            setIsSubmiting(true)
            dispatch(addArticle(values))
        }
    })

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }

    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true)
    }

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true:false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    })

    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard/articles')
        }
        if(notifications && notifications.error){
            setIsSubmiting(false)
        }
    },[notifications, props.history])

    return(
        <AdminLayout section='Add article'>

            { isSubmiting ?
                <div className="d-flex justify-content-center">
                    <Loader/> 
                </div>           
            :

            <form className="mt-3 article_form"
             onSubmit={formik.handleSubmit}
            >

                <div className="form-group">
                    <TextField
                        style={{width:'50%'}}
                        name='title'
                        label='Enter a title'
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik,'title')}
                    />
                </div>

                <div className="form-group">
                    <WYSIWYG
                        setEditorState={(state)=>handleEditorState(state)}
                        setEditorBlur={(blur)=>handleEditorBlur(blur)}
                    />

                        { formik.errors.content && editorBlur ?
                            <FormHelperText error={true}>
                                {formik.errors.content}
                            </FormHelperText>  
                        :null}

                    <TextField
                        type="hidden"
                        name='content'
                        {...formik.getFieldProps('content')}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        style={{width:'70%'}}
                        name='excerpt'
                        label='Enter an excerpt'
                        variant="outlined"
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik,'excerpt')}
                        multiline
                        rows={2}
                    />
                </div>

                <Divider className="mt-3 mb-3"/>
                    <h4>Movie data and score</h4>
                <div className="form-group">
                    <TextField
                        style={{width:'25%'}}
                        name='score'
                        label='Enter a score'
                        variant="outlined"
                        {...formik.getFieldProps('score')}
                        {...errorHelper(formik,'score')}
                    />
                </div>

                <FormikProvider value={formik}>
                    <h5>Add the actors</h5>
                    <FieldArray
                        name='actors'
                        render={
                            arrayhelpers => (
                                <div>
                                    <Paper className="actors_form">
                                        <InputBase
                                            inputRef={actorsValue}
                                            className="input"
                                            placeholder="Add actor name here"
                                        />
                                        <IconButton
                                            onClick={()=>{
                                                arrayhelpers.push(actorsValue.current.value)
                                                actorsValue.current.value = ''
                                            }}
                                        >
                                            <AddSharpIcon
                                                style={{color:'black'}}
                                            />
                                        </IconButton>
                                    </Paper>

                                    { formik.errors.actors && formik.touched.actors ?
                                        <FormHelperText error={true}>
                                            {formik.errors.actors}
                                        </FormHelperText>  
                                    :null}

                                    <div className="chip_container">
                                        { formik.values.actors.map((actor,index)=>(
                                            <div key={index}>
                                                <Chip
                                                    label={`${actor}`}
                                                    clickable
                                                    style={{background:'black',color:'white'}}
                                                    onDelete={()=> arrayhelpers.remove(index)}
                                                    deleteIcon={<RemoveSharpIcon style={{color:'white'}}/>}
                                                />
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            )
                        } 
                    />
                </FormikProvider>

                <div className="form-group">
                    <TextField
                        style={{width:'46%'}}
                        name='director'
                        label='Enter a director'
                        variant="outlined"
                        {...formik.getFieldProps('director')}
                        {...errorHelper(formik,'director')}
                    />
                </div>

                <FormControl variant="outlined">
                    <h5>Select status</h5>
                    <Select
                        name='status'
                        {...formik.getFieldProps('status')}
                        error={ formik.errors.status && formik.touched.status ? true:false }
                        style={{width:'89%'}}
                        variant='standard'
                    >
                        <MenuItem value=''></MenuItem>
                        <MenuItem value='draft'>Draft</MenuItem>
                        <MenuItem value='public'>Public</MenuItem>
                    </Select>
                    { formik.errors.status && formik.touched.status ?
                        <FormHelperText error={true}>
                            {formik.errors.status}
                        </FormHelperText>  
                    :null}

                </FormControl>

                <Divider className="mt-3 mb-3"/>
                <MuiThemeProvider
                    theme={buttonTheme}
                >
                    <Button
                        variant="contained"
                        color='primary'
                        type='submit'
                        disabled={false}
                        style={{background:'black',color:'white'}}
                    >
                        Add_<span style={{fontWeight:'800'}}>Article</span>
                    </Button>
                </MuiThemeProvider>
            </form>
            }
        </AdminLayout>
    )
}

export default AddArticle