import React, { useEffect, useState } from "react";
import AdminLayout from '../../../hoc/adminLayout'
import PaginationComponent from "./paginate";

import { 
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusArticle, getPaginateArticles, removeArticle } from '../../../store/actions/article_actions'


export const Articles = (props) => {
    const articles = useSelector(state=>state.articles)
    const notifications = useSelector(state=>state.notifications)
    const dispatch = useDispatch()
    const [removeAlert, setRemoveAlert] = useState(false)
    const [toRemove, setToRemove] = useState(null)
    const [toTitle, setToTitle] = useState(null)
    let arts = articles.adminArticles

    const editArtsAction = (id) => {
        props.history.push(`/dashboard/articles/edit/${id}`)
    }

    const handleClose = () => setRemoveAlert(false)

    const handleShow = (id=null,title=null) => {
        setToRemove(id)
        setToTitle(title)
        setRemoveAlert(true)
    }

    const handleDelete = () => {
        dispatch(removeArticle(toRemove))
    }

    const handleStatusChange = (status,_id) => {
        let newStatus = status === 'draft' ? 'public' : 'draft'
        dispatch(changeStatusArticle(newStatus,_id))
    }

    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

    const goToNextPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

    useEffect(() => {
        handleClose()
        if(notifications && notifications.removeArticle){
            dispatch(getPaginateArticles(arts.page))
        }
    },[dispatch,notifications,arts])
    
    useEffect(() => {
        dispatch(getPaginateArticles())
    },[dispatch])
 
    return(
        <AdminLayout section='Articles'>
            <div className="articles_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className='mr-2'>
                        <LinkContainer to='/dashboard/articles/add'>
                            <Button
                                style={{background:'black',color:'white'}}
                                className='addArticleButton pl-2 pr-2'
                            >
                                &gt; Add_<span style={{fontWeight:'800'}}>Article</span>
                            </Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={()=>alert('search')}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='btnGroupAddon2'>
                                    @   
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type='text'
                                placeholder="Example"
                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>

                <PaginationComponent
                    arts={arts}
                    prev={(page)=> goToPrevPage(page)}
                    next={(page)=> goToNextPage(page)}
                    handleShow={(id,title)=> handleShow(id,title)}
                    handleStatusChange={(status,id)=> handleStatusChange(status,id)}
                    editArtsAction={(id)=> editArtsAction(id)}
                />  

                <Modal show={removeAlert} onHide={()=> handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure that you want to delete this article: <b>{toTitle}</b>?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        After deleting this article you are not going to be able to retrive it.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={()=> handleClose()}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={()=> handleDelete()} >
                            Delete Article
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>
        </AdminLayout>
    )
}

export default Articles