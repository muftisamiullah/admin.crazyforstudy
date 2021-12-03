import React, {useContext, useEffect} from 'react'
import '../mainDash.css';
import {  useHistory , useParams , Link, useLocation} from "react-router-dom";
import { Button } from 'react-bootstrap'
import SingleQuestion from '../SolveAsk50/components/SingleQuestion';

import useAllSubjects from '../../hooks/useAllSubjects';
import useGetSubSubjects from '../../hooks/useGetSubSubjects';

import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';

import useAsk50 from './hooks/useAsk50';

import Pagination from './Pagination';
import * as utils from '../../utils/MakeSlug';

export default function Solve50List() {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const {state} = useContext(AuthContext);

    const {data, isLoading:isLoadingQestions, error} = useAsk50();
    const {data:subjects,isLoading: isLoadingSubject} = useAllSubjects();
    const {data:sub_subjects,isLoading: isLoadingSubSubject} = useGetSubSubjects();

    return(<>
            
            {state.isLoggedIn && (
            <div className="col-lg-10 col-md-10 main_dash_area">
                <div className="main-area-all">
                    <div className="dashboard_main-container">
                        <div className="dash-main-head">
                            <h2>Ask 50</h2>
                        </div>
                        {isLoadingQestions && (<LoadingComp />)}
                        <div className="dash-con-heading">
                            <div className="col-md-12 row">
                                {/* <button className="btn btn-sm dark">
                                    <span className="fa fa-arrow-left"></span>
                                </button> */}
                                <div className="col-md-12 row">
                                {/* <div className="col-md-2">
                                    <h2>Questions</h2>
                                </div> */}
                                <select className="col-md-2 ml-2 form-control"
                                onChange={e => {
                                    const data = e.target.value;
                                    const split_val = data.split("_");
                                    const subject = split_val[1];
                                    const subject_id = split_val[0];
                                    if(subject === undefined){
                                        history.push(`/solve-ask50`)
                                    }else{
                                        history.push(`/solve-ask50/${subject_id}`)
                                    }
                                }}
                            >
                                <option>{isLoadingSubject ? 'loading...': 'Select Subjects'}</option>
                                {subjects?.map(subjects => {
                                    return (
                                        <option 
                                            value={`${subjects?._id}_${utils.MakeSlug(subjects?.subject)}`}
                                            selected={subjects?._id === params?.subject_id ? 'selected': ''}
                                            key={subjects?._id}>{subjects?.subject}</option>
                                    )
                                })}
                            </select>
                            <select className="col-md-2 ml-2 form-control"
                                onChange={e => {
                                    const data = e.target.value;
                                    const split_val = data.split("_");
                                    const sub_subject = split_val[1];
                                    const sub_subject_id = split_val[0];
                                    if(sub_subject === undefined){
                                        history.push(`/solve-ask50`)
                                    }else{
                                        history.push(`/solve-ask50/${params.subject_id}/${sub_subject_id}`)
                                    }
                                }}
                            >
                                <option>{isLoadingSubSubject ? 'loading...': 'Select Subjects'}</option>
                                {sub_subjects?.map(sub => {
                                    return (
                                        <option 
                                            value={`${sub?._id}_${utils.MakeSlug(sub?.subject)}`}
                                            selected={sub?._id === params?.sub_subject_id ? 'selected': ''}
                                            key={sub?._id}>{sub?.sub_subject}</option>
                                    )
                                })}
                            </select>
                            <select className="col-md-2 ml-2 form-control"
                                onChange={e => {   
                                    const filter = e.target.value;
                                    if(filter != 999){
                                        history.push(`/solve-ask50/${params.subject_id}/${params.sub_subject_id}/${filter}`)
                                    }
                                }}
                            >
                                <option value="999">Select Filter</option>
                                <option value="pending" selected={params.filter == "pending" ? true : false}>Pending</option>
                                <option value="answered" selected={params.filter == "answered" ? true : false}>Answered</option>
                                <option value="rejected" selected={params.filter == "rejected" ? true : false}>Rejected</option>
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