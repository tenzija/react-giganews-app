import React,{ useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal'
import EmailStepper from "./stepper/mail";
import PasswordStepper from './stepper/password'

import {
    Grid,
    TextField,
    Divider
} from '@material-ui/core'

import EditIcon from '@material-ui/icons/EditSharp'

export const AuthProfile = () => {
    const [emailModal, setEmailModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const users = useSelector(state => state.users)
    const notifications = useSelector(state => state.notifications)

    const closeModalEmail = () => {
        setEmailModal(false)
    }
    const openModalEmail = () => {
        setEmailModal(true)
    }

    const closeModalPassword = () => {
        setPasswordModal(false)
    }
    const openModalPassword = () => {
        setPasswordModal(true)
    }

    useEffect(() => {
        if(notifications && notifications.success){
            closeModalEmail()
            closeModalPassword()
        }
    },[notifications])
    
    return(
        <div>
            <div className="mb-3 auth_grid">
                <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                        <TextField value={users.data.email} disabled label="email:"/>
                    </Grid>
                    <Grid item>
                        <EditIcon style={{color:'black'}} onClick={openModalEmail} className='editIcon'/>
                    </Grid>
                </Grid>
                <div className="mt-2">
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <TextField value='*******' disabled label="password:"/>
                        </Grid>
                        <Grid item>
                            <EditIcon style={{color:'black'}} className='editIcon' onClick={openModalPassword}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Divider className="mt-3"/>

            {/* EMAIL MODAL */}

            <Modal size="lg" centered show={emailModal} onHide={closeModalEmail}>
                <Modal.Header closeButton>
                    <Modal.Title>Update current email: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmailStepper user={users}/>
                </Modal.Body>
            </Modal>

            {/* EMAIL MODAL */}

            {/* PASSWORD MODAL */}

            <Modal size="lg" centered show={passwordModal} onHide={closeModalPassword}>
                <Modal.Header closeButton>
                    <Modal.Title>Update current password: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PasswordStepper/>
                </Modal.Body>
            </Modal>

            {/* PASSWORD MODAL */}

        </div>
    )
}

export default AuthProfile