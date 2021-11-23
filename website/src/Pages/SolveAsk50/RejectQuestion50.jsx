import React, {useContext,useState, useEffect} from 'react'
import '../mainDash.css';
import {  useHistory, Link, useParams  } from "react-router-dom";
import { Button,Form } from 'react-bootstrap'


import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {ErrorContext} from '../../context/ErrorContext';

import * as util from '../../utils/MakeSlug';
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'
import useGetSingleQuestion50 from './hooks/useGetSingleQuestion50';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';
// import {htmlDecode} from '../../../utils/MakeSlug'

export default function RejectQuestion() {
    const history = useHistory();
    const params = useParams();
    
    const {state} = useContext(AuthContext);
    const {state: errorState, dispatch: errorDispatch} = useContext(ErrorContext);

    const [loading, setLoading] = useState(false);
    
    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    const options = {
        headers: {
            'Content-Type': 'Application/json',
            'Authorization':'Bearer '+state.access_token
        }
    };
    const [btnDisabled, setBtnDisbaled] = useState(false);

    let _URL = window.URL || window.webkitURL;
    
    const [formData, setFormData] = useState({});
    async  function handleSubmit(e){
        e.preventDefault();
        let response = null;
        setLoading(true);
        setBtnDisbaled(true);
        response = await axios.patch(`${API_URL}question/reject-question-50/${params.question_id}`,formData, options);
        console.log(response);
        errorDispatch({type: 'SET_SUCCESS', payload: response.message});
        setBtnDisbaled(false);
        setLoading(false);

        history.push(`/solve-ask50/${params.subject_id}/${params.sub_subject_id}/${params.filter}/${params.page_no}`);
    
    }
    const {data, isLoading} = useGetSingleQuestion50();
    
    useEffect( () => {
        let timerError = setTimeout(() => errorDispatch({type: 'SET_ERROR', payload: ''}), 1500);
        let timerSuccess = setTimeout(() => errorDispatch({type: 'SET_SUCCESS', payload: ''}), 1500);
        return () => {
            clearTimeout(timerError)
            clearTimeout(timerSuccess)
        }
    
    },[errorState.error, errorState.success]);
    
return (

    <>
    {state.isLoggedIn && (
      
    <div className="col-lg-10 col-md-10 main_dash_area">
        <div className="main-area-all">
            <div className="dashboard_main-container">
                <div className="dash-main-head">
                    <h2>Reject Question</h2>
                </div>
                {errorState.error && ( 
                    <Notification>{errorState.error}</Notification>
                )}
                    
                {errorState.success && ( 
                    <Notification>{errorState.success}</Notification>
                )}
                <div className="dash-con-heading">
                    <div className="row">
                    <div className="col-md-1 pl-3">
                    
                    <Link to={`/solve-ask50/${params.subject_id}/${params.sub_subject_id}/${params.filter}/${params.page_no}`} className="btn btn-sm dark">
                    <span className="fa fa-arrow-left"></span>
                    </Link>
                    </div>
                    </div>
                </div>
                <div className="dash-cont-start">
                    <div className="org-main-area">
                    <div className="col-md-12 row no-gutter p-0 mt-2">
                    {!isLoading && (
                    <Form method="POST" className="col-md-12 pl-2" encType="multipart/form-data">

                    <Form.Group className="col-md-12">
                            <Form.Label>
                                <strong>Question:</strong>
                            </Form.Label><br/>
                            <Form.Label style={{color:"green"}}>
                                <span dangerouslySetInnerHTML={{__html: data && data.question}}></span>
                            </Form.Label>                        
                        </Form.Group>
                        
                        {/* <Form.Group className="col-md-12">
                            <Form.Label>
                                Question Image
                            </Form.Label> 
                            <Form.Control name="image" type="file" 
                            onChange={uploadImage}
                            />  
                            <div style={{ height: '130px', overflow: 'hidden', marginTop: '10px' }}>
                                <img src={blogImage ? blogImage: data && data.image} />
                            </div>
                        </Form.Group>   */}
                        {data && (data.image0 || data.image1) && <Form.Group className="col-md-12">
                            <Form.Label>
                            <strong>Question Image:</strong>
                            </Form.Label> 
                            {/* <Form.Control name="image" type="file" 
                            onChange={uploadImage}
                            />   */}
                            {data.image0 && <div style={{ height: '500px', marginTop: '10px' }}>
                                <img src={`https://crazyforstudy.s3.ap-south-1.amazonaws.com/uploads/${data && data.image0}`} alt-text="image0" style={{objectFit: "cover", height:"500px"}}/>
                            </div>}
                            {data.image1 && <div style={{ height: '500px', marginTop: '10px' }}>
                                <img src={`https://crazyforstudy.s3.ap-south-1.amazonaws.com/uploads/${data && data.image1}`} alt-text="image1" style={{objectFit: "cover", height:"500px"}}/>
                            </div>}
                        </Form.Group>}
                        <Form.Group className="col-md-12">
                            <Form.Label>
                            <strong>Choose Reason for Rejection:</strong>
                            </Form.Label>
                            <Form.Check type="radio">
                                <Form.Check.Input type="radio" name="fav_language" value="Your question is incomplete, or you have provided insufficient information" onChange={ ( event ) => {
                                    setFormData( { ...formData, rejectionReason: event.target.value, assignment:false } );
                                } }/>
                                <Form.Check.Label> Your question is incomplete, or you have provided insufficient information </Form.Check.Label>
                            </Form.Check>
                            <Form.Check type="radio">
                                <Form.Check.Input type="radio" name="fav_language" value="Your question seems to be invalid, or it is out-of-the-subject or has some language issues" onChange={ ( event ) => {
                                    setFormData( { ...formData, rejectionReason: event.target.value, assignment:false } );
                                } }/>
                                <Form.Check.Label>Your question seems to be invalid, or it is out-of-the-subject or has some language issues.</Form.Check.Label>
                            </Form.Check>
                            <Form.Check type="radio">
                                <Form.Check.Input type="radio" name="fav_language" value="99" onChange={ ( event ) => {
                                    setFormData( { ...formData, rejectionReason: "Your Question will be treated as Assignment", assignment:true } );
                                } }/>
                                <Form.Check.Label>Your Question will be treated as Assignment.</Form.Check.Label>
                            </Form.Check>
                        </Form.Group>

                        <Form.Group className="col-md-12">
                            <Form.Label>
                            <strong>Rejection Reason:</strong>
                            </Form.Label>
                            
                            <CKEditor
                                editor={ ClassicEditor }
                                config={{
                                    toolbar: {
                                        items: [
                                            'MathType', 'ChemType','heading', 
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
                                data={data && data.rejectionReason1}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setFormData( { ...formData, rejectionReason1: data } );
                                } }
                            />
                        </Form.Group>

                        <Form.Group className="col-md-12">
                            <Button 
                            onClick={handleSubmit}
                            disabled={!loading && btnDisabled}
                            className="btn dark btn-md">
                                {loading ? 'processing...': 'Reject Question'} 
                            </Button>
                        </Form.Group>
                        </Form>
                    )} 
                    
                     
                   
                    </div>    
                    
                    </div>
                </div>
            </div>
        </div>
        
    </div>
        
    )}  
    </>

)
}
