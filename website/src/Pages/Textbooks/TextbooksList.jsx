import React, {useContext, useEffect} from 'react'
import '../mainDash.css';
import {  useHistory , useParams , Link, useLocation} from "react-router-dom";
import { Button } from 'react-bootstrap'

import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';

import useCollegeTB from './hooks/useCollegeTB';

// import Pagination from '../../Pages/SolveTBS/Pagination';
import * as utils from '../../utils/MakeSlug';

export default function TextbooksList() {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const {state} = useContext(AuthContext);

    const {data, isLoading:isLoadingBooks, error} = useCollegeTB();

    const updateCTBS = (isbn,id) => {
        history.push(`/college-textbooks/${params.filter}/${isbn.isbn}/${isbn.id}`)
    }
    return(<>
            {state.isLoggedIn && (
            <div className="col-lg-10 col-md-10 main_dash_area">
                <div className="main-area-all">
                    <div className="dashboard_main-container">
                        <div className="dash-main-head">
                            <h2>TextBooks</h2>
                        </div>
                        {isLoadingBooks && (<LoadingComp />)}
                        <div className="dash-con-heading">
                            <div className="col-md-12 row">
                                <button className="btn btn-sm dark">
                                    <span className="fa fa-arrow-left"></span>
                                </button>
                                <div className="col-md-12 row">
                                <div className="col-md-2">
                                    <h2>Books</h2>
                                </div>

                            <select className="col-md-2 ml-2 form-control"
                                onChange={e => {   
                                    const filter = e.target.value;
                                    if(filter != 999){
                                        history.push(`/college-textbooks/${filter}`)
                                    }
                                }}
                            >
                                <option value="999">Select Filter</option>
                                <option value="in-stock" selected={params.filter == "in-stock" ? true : false}>In Stock</option>
                                <option value="out-of-stock" selected={params.filter == "out-of-stock" ? true : false}>Not in Stock</option>
                            </select>

                            <div className="col-md-3 pr-0 pull-right te xt-right">
                                {/* <Pagination pagination={data && data.pagination}/>   */}
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="dash-cont-start">
                            <div className="subject-main-container pl-0 pt-0 pr-0 pb-0">    
                                <h3>Requested Books: </h3>  
                                <div className="clearfix"></div>  
                                <table>
                                    <th>s. no</th>
                                    <th>Isbn</th>
                                    {params.filter != "out-of-stock" 
                                                    && <><th>Book Name</th>
                                    <th>Edition</th></>}
                                    <th>Authoring</th>
                                    <th>UserName</th>
                                    <th>Date</th>
                                    {params.filter == "out-of-stock" && <th>Action</th>}
                                    <tbody>
                                    {data && data.data.map((book,key) => {
                                        const d = new Date(book.created_at)
                                        return (
                                            <tr key={key}>
                                                <td>{key+1}</td>{console.log(book.authoring)}
                                                <td>{book?.isbn}</td>
                                                {params.filter != "out-of-stock" 
                                                    && <><td>{book?.book_name}</td>
                                                <td>{book?.edition}</td></>}
                                                <td className="text-center">{book.authoring ? <span className="badge badge-dark"> Yes</span> : <span className="badge badge-secondary">No</span>}</td>
                                                <td>{book?.user_name}</td>
                                                <td>{d.toString()}</td>
                                                {params.filter == "out-of-stock" 
                                                    && 
                                                    <td>
                                                        <button className="btn-sm btn-primary" onClick={updateCTBS.bind(this,{isbn: book?.isbn, id:book?._id})}>Update Book</button>
                                                    </td>}
                                            </tr>
                                        )
                                    })}   
                                    </tbody>
                                    </table> 
                               
                            </div>
                        </div>    
                    </div>
                </div>
            </div>)
        }</>
    )
}