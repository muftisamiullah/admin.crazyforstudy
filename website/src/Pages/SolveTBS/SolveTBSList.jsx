import React, {useContext, useEffect} from 'react'
import '../mainDash.css';
import {  useHistory , useParams , Link, useLocation} from "react-router-dom";
import { Button } from 'react-bootstrap'
import SingleQuestion from './components/SingleQuestion';

import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';

import useAskTBS from './hooks/useAskTBS';

import Pagination from '../../Pages/SolveTBS/Pagination';
import * as utils from '../../utils/MakeSlug';

export default function SolveTBSList() {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const {state} = useContext(AuthContext);

    const {data, isLoading:isLoadingQestions, error} = useAskTBS();

    return(<>
            {state.isLoggedIn && (
            <div className="col-lg-10 col-md-10 main_dash_area">
                <div className="main-area-all">
                    <div className="dashboard_main-container">
                        <div className="dash-main-head">
                            <h2>Solve TBS</h2>
                        </div>
                        {isLoadingQestions && (<LoadingComp />)}
                        <div className="dash-con-heading">
                            <div className="col-md-12 row">
                                <button className="btn btn-sm dark">
                                    <span className="fa fa-arrow-left"></span>
                                </button>
                                <div className="col-md-12 row">
                                <div className="col-md-2">
                                    <h2>Questions</h2>
                                </div>

                            <select className="col-md-2 ml-2 form-control"
                                onChange={e => {   
                                    const filter = e.target.value;
                                    if(filter != 999){
                                        history.push(`/solve-tbs/${filter}`)
                                    }
                                }}
                            >
                                <option value="999">Select Filter</option>
                                <option value="pending" selected={params.filter == "pending" ? true : false}>Pending</option>
                                <option value="answered" selected={params.filter == "answered" ? true : false}>Answered</option>
                            </select>

                            <div className="col-md-3 pr-0 pull-right te xt-right">
                                <Pagination pagination={data && data.pagination}/>  
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="dash-cont-start">
                            <div className="subject-main-container pl-0 pt-0 pr-0 pb-0">    
                                <h3>{params.filter != "undefined" && params.filter} questions: </h3>  
                                <div className="clearfix"></div>    
                                {data && data.data.map(problem => {
                                    return (
                                        <SingleQuestion key={problem._id} problem={problem}/>
                                    )
                                })}   
                            </div>
                        </div>    
                    </div>
                </div>
            </div>)
        }</>
    )
}