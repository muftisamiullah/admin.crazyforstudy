import React, {useContext, useState, useEffect, useRef} from 'react'
import '../../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import {Notification} from '../../../components/Notification';
import {LoadingComp} from '../../../components/LoadingComp';
import useSubSubjectContent from '../hooks/useSubSubjectContentTB';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../../Helper/Cons.jsx'

import { useToasts } from 'react-toast-notifications';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import Breadcrumb from './SeoBreadCrumbSubSubjectQA';

export default function UpdateSubSubjectContentTB() {
    const {data: content, isLoading} = useSubSubjectContent();
    const history = useHistory();
    const params = useParams();
    const { addToast } = useToasts();
    const {state} = useContext(AuthContext);

    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+state.access_token
        }
    };

    const [formData, setFormData] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    
    const bannerText = useRef('');
    const questionHeading = useRef('');
    const questionSubHeading = useRef('');
    const aboutHeading = useRef('');
    const aboutContent = useRef('');

    const handleContent = async (e) => {
        e.preventDefault();
        formData['bannerText'] = formData.bannerText !== '' ? bannerText.current.value : formData.bannerText
        formData['questionHeading'] = formData.questionHeading !== '' ? questionHeading.current.value : formData.questionHeading
        formData['questionSubHeading'] = formData.questionSubHeading !== '' ? questionSubHeading.current.value : formData.questionSubHeading
        formData['aboutHeading'] = formData.aboutHeading !== '' ? aboutHeading.current.value : formData.aboutHeading
        formData['aboutContent'] = formData.aboutContent !== '' ? aboutContent.current.value : formData.aboutContent
        setLoading(true);
        await mutation.mutate(formData);
    }

    const mutation = useMutation(formData => {
            return axios.patch(`${API_URL}sub-subject/save-content-qa/${params.id}`, formData, options)
        },{
        onSuccess: () => {
            setLoading(false);
            history.push(`/sub-subject`);
            addToast('Content updated successfully', { appearance: 'success',autoDismiss: true });
        }
    });

    return(
        <>
            {state.isLoggedIn && (
            <div className="col-lg-10 col-md-10 main_dash_area">
            <div className="main-area-all">
            <div className="dashboard_main-container">
            <div className="dash-main-head">
                <h2>Manage QA  Sub Subject Content</h2>
            </div>
            {error && <Notification>{error.message}</Notification>}
            {/* {isLoading && <LoadingComp />} */}

            <div className="dash-con-heading">
                <div className="col-md-12 row">
                        <Breadcrumb/>
                    <div className="row col-md-10">
                    </div>
                </div>    
            </div>

            {/* {!isLoading && ( */}
            <div className="dash-cont-start">
                <div className="subject-main-container pl-0 pt-0 pr-0 pb-0">    
                    <div className="row col-md-12">
                        <div className="col-md-12">
                            <h6> <span className="fa fa-book"></span> Manage Content</h6>
                            <hr />
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Banner Text</label>
                                            <input 
                                                ref={bannerText}
                                                defaultValue={content && content.qa_content && content.qa_content.bannerText}
                                                onChange={e => setFormData({...formData, bannerText: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter Banner Text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Question Heading Text</label>
                                            <input 
                                                ref={questionHeading}
                                                defaultValue={content && content.qa_content  && content.qa_content.questionHeading}
                                                onChange={e => setFormData({...formData, questionHeading: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter Question Heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Question Sub Heading Text</label>
                                            <input 
                                                ref={questionSubHeading}
                                                defaultValue={content  && content.qa_content && content.qa_content.questionSubHeading}
                                                onChange={e => setFormData({...formData, questionSubHeading: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter Question Sub Heading"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>About Heading</label>
                                            <input 
                                                ref={aboutHeading}
                                                defaultValue={content && content.qa_content  && content.qa_content.aboutHeading}
                                                onChange={e => {
                                                    setFormData({...formData, aboutHeading: e.target.value})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter About Heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>About Content</label>
                                            <input 
                                                ref={aboutContent}
                                                defaultValue={content && content.qa_content  && content.qa_content.aboutContent}
                                                onChange={e => {
                                                    setFormData({...formData, aboutContent: e.target.value})
                                                    }
                                                }
                                                className="form-control" autoComplete="off" placeholder="Enter About Heading"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                </div>
                                <button onClick={handleContent} className="btn btn-sm btn-dark">Save Content</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}


            </div>
            </div>
            </div>

            )}  
            </>
    )
}
