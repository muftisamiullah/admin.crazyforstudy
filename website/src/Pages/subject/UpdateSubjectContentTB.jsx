import React, {useContext, useState, useEffect, useRef} from 'react'
import '../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';
import useBookReviews from '../../hooks/useBookReviews';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'

import { useToasts } from 'react-toast-notifications';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import Breadcrumb from './SeoBreadCrumbSubject';

export default function UpdateSubjectContentTB() {

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
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState({});
    const [feature, setFeature] = useState({});
    const [rating, setRating] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient()
    const reviewRef = useRef('');
    const userNameRef = useRef('');
    const ratingRef = useRef('');
    const [upload, setUpload] = useState(false);

    const backUrl = params?.book_id 
        ? `/book-seo/${params.isbn}/${params.book_id}`
        : `/books`;

    const handleContent = async (e) => {
        e.preventDefault();
        console.log(formData)
        setLoading(true);
        // await mutation.mutate(formData);
    }

    return(
        <>
            {state.isLoggedIn && (
            <div className="col-lg-10 col-md-10 main_dash_area">
            <div className="main-area-all">
            <div className="dashboard_main-container">
            <div className="dash-main-head">
                <h2>Manage Textbook Subject</h2>
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
                                            <label>Banner Heading</label>
                                            <input 
                                                onChange={e => setFormData({...formData, bannerHeading: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter Banner Heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Ask An Expert Text</label>
                                            <input 
                                                onChange={e => setFormData({...formData, askAnExpertText: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter ask an expert text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>College Text Books Text</label>
                                            <input 
                                                onChange={e => setFormData({...formData, collegeTextBooks: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter college text books text"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Question Heading</label>
                                            <input 
                                                onChange={e => {
                                                    setQuestion({...question, heading : e.target.value})
                                                    setFormData({...formData, question: question})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter question heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Question Content</label>
                                            <CKEditor
                                                    editor={ ClassicEditor }
                                                    config={{
                                                        toolbar: {
                                                            items: [
                                                                'heading', 
                                                                '|',
                                                                'bold',
                                                                'italic',
                                                                'link',
                                                                'bulletedList',
                                                                'numberedList',
                                                                'imageUpload',
                                                                'mediaEmbed',
                                                                'insertTable',
                                                                'blockQuote',
                                                                'undo',
                                                                'redo'
                                                            ]
                                                        },
                                                    }}
                                                    // data={singleFaq?.answer ? singleFaq?.answer : 'Enter Answer'}
                                                    onChange={ ( event, editor ) => {
                                                        const data = editor.getData();
                                                        setQuestion({...question, content : data})
                                                        setFormData( { ...formData, question: question } );
                                                    } }
                                                />    
                                        </div>
                                        <div className="form-group">
                                            <label>Answer Heading</label>
                                            <input 
                                                onChange={e => {
                                                    setAnswer({...answer, heading : e.target.value})
                                                    setFormData({...formData, answer: answer})
                                                    }
                                                }
                                                className="form-control" autoComplete="off" placeholder="Enter answer heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Answer Content</label>
                                            <CKEditor
                                                    editor={ ClassicEditor }
                                                    config={{
                                                        toolbar: {
                                                            items: [
                                                                'heading', 
                                                                '|',
                                                                'bold',
                                                                'italic',
                                                                'link',
                                                                'bulletedList',
                                                                'numberedList',
                                                                'imageUpload',
                                                                'mediaEmbed',
                                                                'insertTable',
                                                                'blockQuote',
                                                                'undo',
                                                                'redo'
                                                            ]
                                                        },
                                                    }}
                                                    // data={singleFaq?.answer ? singleFaq?.answer : 'Enter Answer'}
                                                    onChange={ ( event, editor ) => {
                                                        const data = editor.getData();
                                                        setAnswer({...answer, content : data})
                                                        setFormData( { ...formData, answer: answer } );
                                                    } }
                                                />    
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Feature Main Heading</label>
                                            <input 
                                                onChange={e => {
                                                    setFeature({...feature, mainHeading : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Main Heading"/>
                                        </div>     
                                        <div className="form-group">
                                            <label>Feature Content</label>
                                            <input 
                                                onChange={e => {
                                                    setFeature({...feature, mainContent : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Feature Content"/>
                                        </div> 
                                        <hr/>
                                        <div className="form-group">
                                            <label>Service Heading</label>
                                            <input 
                                                onChange={e => {
                                                    setFeature({...feature, serviceHeading : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Service Heading"/>
                                        </div>         
                                        <div className="form-group">
                                            <label>Service Content</label>
                                            <input 
                                                onChange={e => {
                                                    setFeature({...feature, serviceContent : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Service Content"/>
                                        </div>    
                                        <hr/>  
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 1</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading1 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 1</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent1 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 2</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading2 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 2</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent2 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div> 
                                        </div> 
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 3</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading3 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 3</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent3 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 4</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading4 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 4</label>
                                                <input 
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent4 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div>    
                                        </div>    
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
