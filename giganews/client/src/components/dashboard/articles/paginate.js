import React from 'react'
import {
    Table,
    Pagination
} from 'react-bootstrap'
import Loader from '../../../utils/loader'
import Moment from 'react-moment'

const PaginationComponent = ({
    arts,prev,next,handleStatusChange,editArtsAction,handleShow
}) => {

    const goToPrevPage = (page) => {
        prev(page)
    }

    const goToNextPage = (page) => {
        next(page)
    }

    return(
        <>
            { arts && arts.docs ?

                <>
                    <Table striped bordered hover className='table table-dark'>
                        <thead>
                            <tr>
                                <th>
                                    Created
                                </th>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Score
                                </th>
                                <th colSpan="3"
                                className='text-center'>
                                    Action Buttons
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { arts.docs.map((item)=>(
                                <tr key={item._id}>
                                    <td><Moment to={item.date}></Moment></td>
                                    <td>{item.title}</td>
                                    <td>{item.score}</td>
                                    <td className='action_btn remove_btn'
                                        onClick={()=> handleShow(item._id,item.title)}    
                                    >
                                        Remove
                                    </td>
                                    <td className='action_btn edit_btn'
                                        onClick={()=> editArtsAction(item._id)}    
                                    >
                                        Edit
                                    </td>
                                    <td className='action_btn status_btn'
                                        onClick={()=> handleStatusChange(item.status,item._id)}    
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            )) }

                        </tbody>
                    </Table>
                    <Pagination className='pagination'>
                        {arts.hasPrevPage ? 
                            <>
                                <Pagination.Prev onClick={()=>goToPrevPage(arts.prevPage)}/>
                                <Pagination.Item onClick={()=>goToPrevPage(arts.prevPage)}>
                                    {arts.prevPage}
                                </Pagination.Item>
                            </>
                        
                        :null}

                        <Pagination.Item active>{arts.page}</Pagination.Item>
                        {arts.hasNextPage ? 
                            <>
                                <Pagination.Item onClick={()=>goToNextPage(arts.nextPage)}>
                                    {arts.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=>goToNextPage(arts.nextPage)}/>
                            </>
                        
                        :null}
                        
                    </Pagination>
                </>

                :
                
                <div className="d-flex justify-content-center">
                    <Loader/> 
                </div> 
            }
        </>
    )
}

export default PaginationComponent