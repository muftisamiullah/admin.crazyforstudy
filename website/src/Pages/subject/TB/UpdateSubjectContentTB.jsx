import React, {useContext, useState, useEffect, useRef} from 'react'
import '../../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import {Notification} from '../../../components/Notification';
import {LoadingComp} from '../../../components/LoadingComp';
import useSubjectContent from '../hooks/useSubjectContentTB';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../../Helper/Cons.jsx'

import { useToasts } from 'react-toast-notifications';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import Breadcrumb from './SeoBreadCrumbSubjectTB';

export default function UpdateSubjectContentTB() {
    const {data: content, isLoading} = useSubjectContent();
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
    const [question, setQuestion] = useState({heading:'', content:''});
    const [answer, setAnswer] = useState({heading:'',content:''});
    const [feature, setFeature] = useState(
                                        {
                                            mainHeading:'',mainContent:'',serviceHeading:'',serviceContent:'',subServiceHeading1:'',
                                            subServiceHeading2:'',subServiceHeading3:'',subServiceHeading4:'',subServiceContent1:'',
                                            subServiceContent2:'',subServiceContent3:'',subServiceContent4:'',
                                        });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    
    const bannerHeading = useRef('');
    const askAnExpertText = useRef('');
    const collegeTextBooks = useRef('');
    const questionHeading = useRef('');
    const questionContent = useRef('');
    const answerHeading = useRef('');
    const answerContent = useRef('');
    const featureMainHeading = useRef('');
    const featureMainContent = useRef('');
    const featureServiceHeading = useRef('');
    const featureServiceContent = useRef('');
    const featureSubServiceHeading1 = useRef('');
    const featureSubServiceContent1 = useRef('');
    const featureSubServiceHeading2 = useRef('');
    const featureSubServiceContent2 = useRef('');
    const featureSubServiceHeading3 = useRef('');
    const featureSubServiceContent3 = useRef('');
    const featureSubServiceHeading4 = useRef('');
    const featureSubServiceContent4 = useRef('');

    const handleContent = async (e) => {
        e.preventDefault();
        if(formData.question == undefined){
            let question = { heading:"", content:"" }
            // setFormData(() => ({...formData, question: question}))
            formData.question = question;
        }
        if(formData.answer == undefined){
            let answer = { heading:"", content:"" }
            // setFormData(() => ({...formData, answer: answer}))
            formData.answer = answer;
        }
        if(formData.feature == undefined){
            let feature = 
                        { 
                            mainHeading:"",mainContent:"",serviceHeading:"",serviceContent:"",subServiceHeading1:"",subServiceContent1:"",subServiceHeading2:"",
                            subServiceContent2:"",subServiceHeading3:"",subServiceContent3:"",subServiceHeading4:"",subServiceContent4:"", 
                        }
            // setFormData(() => ({...formData, feature: feature}))
            formData.feature = feature;
        }
        formData['bannerHeading'] = formData.bannerHeading !== '' ? bannerHeading.current.value : formData.bannerHeading
        formData['askAnExpertText'] = formData.askAnExpertText !== '' ? askAnExpertText.current.value : formData.askAnExpertText
        formData['collegeTextBooks'] = formData.collegeTextBooks !== '' ? collegeTextBooks.current.value : formData.collegeTextBooks
        formData.question.heading = formData.question.heading == '' ? questionHeading.current.value : formData.question.heading
        formData.question.content = formData.question.content == '' ? questionContent.current.value : formData.question.content
        formData.answer.heading = formData.answer.heading == '' ? answerHeading.current.value : formData.answer.heading
        formData.answer.content = formData.answer.content == '' ? answerContent.current.value : formData.answer.content
        formData.feature.mainHeading = formData.feature.mainHeading == '' ? featureMainHeading.current.value : formData.feature.mainHeading
        formData.feature.mainContent = formData.feature.mainContent == '' ? featureMainContent.current.value : formData.feature.mainContent
        formData.feature.serviceHeading = formData.feature.serviceHeading == '' ? featureServiceHeading.current.value : formData.feature.serviceHeading
        formData.feature.serviceContent = formData.feature.serviceContent == '' ? featureServiceContent.current.value : formData.feature.serviceContent
        formData.feature.subServiceHeading1 = formData.feature.subServiceHeading1 == '' ? featureSubServiceHeading1.current.value : formData.feature.subServiceHeading1
        formData.feature.subServiceContent1 = formData.feature.subServiceContent1 == '' ? featureSubServiceContent1.current.value : formData.feature.subServiceContent1
        formData.feature.subServiceHeading2 = formData.feature.subServiceHeading2 == '' ? featureSubServiceHeading2.current.value : formData.feature.subServiceHeading2
        formData.feature.subServiceContent2 = formData.feature.subServiceContent2 == '' ? featureSubServiceContent2.current.value : formData.feature.subServiceContent2
        formData.feature.subServiceHeading3 = formData.feature.subServiceHeading3 == '' ? featureSubServiceHeading3.current.value : formData.feature.subServiceHeading3
        formData.feature.subServiceContent3 = formData.feature.subServiceContent3 == '' ? featureSubServiceContent3.current.value : formData.feature.subServiceContent3
        formData.feature.subServiceHeading4 = formData.feature.subServiceHeading4 == '' ? featureSubServiceHeading4.current.value : formData.feature.subServiceHeading4
        formData.feature.subServiceContent4 = formData.feature.subServiceContent4 == '' ? featureSubServiceContent4.current.value : formData.feature.subServiceContent4
        setLoading(true);
        await mutation.mutate(formData);
    }

    const mutation = useMutation(formData => {
            return axios.patch(`${API_URL}subject/save-content/${params.id}`, formData, options)
        },{
        onSuccess: () => {
            setLoading(false);
            history.push(`/subject`);
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
                <h2>Manage Textbook Subject Content</h2>
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
                                                ref={bannerHeading}
                                                defaultValue={content && content.content && content.content.bannerHeading}
                                                onChange={e => setFormData({...formData, bannerHeading: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter Banner Heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Ask An Expert Text</label>
                                            <input 
                                                ref={askAnExpertText}
                                                defaultValue={content && content.content && content.content.askAnExpertText}
                                                onChange={e => setFormData({...formData, askAnExpertText: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter ask an expert text"/>
                                        </div>
                                        <div className="form-group">
                                            <label>College Text Books Text</label>
                                            <input 
                                                ref={collegeTextBooks}
                                                defaultValue={content && content.content && content.content.collegeTextBooks}
                                                onChange={e => setFormData({...formData, collegeTextBooks: e.target.value})}
                                                className="form-control" autoComplete="off" placeholder="Enter college text books text"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Question Heading</label>
                                            <input 
                                                ref={questionHeading}
                                                defaultValue={content && content.content && content.content.question.heading}
                                                onChange={e => {
                                                    setQuestion({...question, heading : e.target.value})
                                                    setFormData({...formData, question: question})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter question heading"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Question Content</label>
                                            <CKEditor
                                                ref={questionContent}
                                                    data={content && content.content && content.content.question.content ? content.content.question.content : ''}
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
                                                ref={answerHeading}
                                                defaultValue={content && content.content && content.content.answer.heading}
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
                                                ref={answerContent}
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
                                                    data={content && content.content && content.content.answer.content ? content.content.answer.content : ''}
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
                                                ref={featureMainHeading}
                                                defaultValue={content && content.content && content.content.feature.mainHeading}
                                                onChange={e => {
                                                    setFeature({...feature, mainHeading : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Main Heading"/>
                                        </div>     
                                        <div className="form-group">
                                            <label>Feature Content</label>
                                            <input 
                                                ref={featureMainContent}
                                                defaultValue={content && content.content && content.content.feature.mainContent}
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
                                                ref={featureServiceHeading}
                                                defaultValue={content && content.content && content.content.feature.serviceHeading}
                                                onChange={e => {
                                                    setFeature({...feature, serviceHeading : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Service Heading"/>
                                        </div>         
                                        <div className="form-group">
                                            <label>Service Content</label>


                                            <CKEditor
                                                ref={featureServiceContent}
                                                    data={content && content.content && content.content.feature.serviceContent ? content.content.feature.serviceContent : ''}
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
                                                    onChange={e => {
                                                        setFeature({...feature, serviceContent : e?.target?.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                />  

                                            {/* <input 
                                                ref={featureServiceContent}
                                                defaultValue={content && content.content && content.content.feature.serviceContent}
                                                onChange={e => {
                                                    setFeature({...feature, serviceContent : e.target.value})
                                                    setFormData({...formData, feature: feature})
                                                }}
                                                className="form-control" autoComplete="off" placeholder="Enter Service Content"/> */}
                                        </div>    
                                        <hr/>  
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 1</label>
                                                <input 
                                                    ref={featureSubServiceHeading1}
                                                    defaultValue={content && content.content && content.content.feature.subServiceHeading1}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading1 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 1</label>
                                                <input 
                                                    ref={featureSubServiceContent1}
                                                    defaultValue={content && content.content && content.content.feature.subServiceContent1}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent1 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 2</label>
                                                <input 
                                                    ref={featureSubServiceHeading2}
                                                    defaultValue={content && content.content && content.content.feature.subServiceHeading2}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading2 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 2</label>
                                                <input 
                                                    ref={featureSubServiceContent2}
                                                    defaultValue={content && content.content && content.content.feature.subServiceContent2}
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
                                                    ref={featureSubServiceHeading3}
                                                    defaultValue={content && content.content && content.content.feature.subServiceHeading3}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading3 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 3</label>
                                                <input 
                                                    ref={featureSubServiceContent3}
                                                    defaultValue={content && content.content && content.content.feature.subServiceContent3}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceContent3 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Content"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Service Sub Service Heading 4</label>
                                                <input 
                                                    ref={featureSubServiceHeading4}
                                                    defaultValue={content && content.content && content.content.feature.subServiceHeading4}
                                                    onChange={e => {
                                                        setFeature({...feature, subServiceHeading4 : e.target.value})
                                                        setFormData({...formData, feature: feature})
                                                    }}
                                                    className="form-control" autoComplete="off" placeholder="Enter Sub Service Heading"/>
                                            </div> 
                                            <div className="form-group">
                                                <label>Service Sub Service Content 4</label>
                                                <input 
                                                    ref={featureSubServiceContent4}
                                                    defaultValue={content && content.content && content.content.feature.subServiceContent4}
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
