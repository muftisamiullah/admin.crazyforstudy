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
import useGetSingleQuestion50 from './hooks/useGetSingleQuestionAssignment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';
import {htmlDecode} from '../../utils/MakeSlug'
import {s3Path} from '../../Helper/ApiUrl'

export default function UpdateAnswer() {
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
    const [blogImage, setBlogImage] = useState("");
    const uploadImage = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type })
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function () { 
               base64 = reader.result;
               setBlogImage(base64);
               setFormData({...formData,image: base64}) 
            }  
        }
    }
    const [formData, setFormData] = useState({});
    async  function handleSubmit(e){
        e.preventDefault();
        let response = null;
        setLoading(true);
        setBtnDisbaled(true);
        response = await axios.patch(`${API_URL}assignment/update-answer-assignment/${params.id}`,formData, options);
        console.log(response);
        errorDispatch({type: 'SET_SUCCESS', payload: response.message});
        setBtnDisbaled(false);
        setLoading(false);

        history.push(`/solve-assignment/${params.filter}/${params.subject_id}/${params.sub_subject_id}/${params.page_no}`);
    
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
                    <h2>Answer Question</h2>
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
                    
                    <Link to={`/solve-assignment/${params.filter}/${params.subject_id}/${params.sub_subject_id}/${params.page_no}`} className="btn btn-sm dark">
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
                                <div className="card-text" id="high" dangerouslySetInnerHTML={{ __html: data && data.question  }} />
                            </Form.Label>
                            {/* <CKEditor
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
                                disabled
                                data={data && data.question}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setFormData( { ...formData, question: data } );
                                } }
                            /> */}
                            
                        </Form.Group>{console.log(data)}
                        {/* <FileViewer
                            fileType={"png"}
                            filePath={s3Path+data.image0}
                        />
                        <FileViewer
                            fileType={"docx"}
                            filePath={s3Path+data.image1}
                        />
                        <FileViewer
                            filePath={s3Path+data.image2}
                        /> */}
                        <Form.Group className="col-md-12">
                            {data.image0 != "" && <button className="btn btn-sm bg-secondary text-white mr-2">
                                <a href={s3Path + data.image0} target="_blank" download={data.image0}><i class="fa fa-download"></i> Download Attachment 1</a>
                            </button>}
                            {data.image1 != "" && <button className="btn btn-sm bg-secondary text-white mr-2">
                                <a href={s3Path + data.image1} target="_blank" download={data.image1}><i class="fa fa-download"></i> Download Attachment 2</a>
                            </button>}
                            {data.image2 != "" && <button className="btn btn-sm bg-secondary text-white mr-2">
                                <a href={s3Path + data.image2} target="_blank" download={data.image2}><i class="fa fa-download"></i> Download Attachment 3</a>
                            </button>}

                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>
                                <strong>Complete Answer</strong>
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
                                data={data && data.completeanswer}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setFormData( { ...formData, answer: data } );
                                } }
                            />
                            
                        </Form.Group>      
                        <Form.Group className="col-md-12">
                            <Button 
                            onClick={handleSubmit}
                            disabled={!loading && btnDisabled}
                            className="btn dark btn-md">
                                {loading ? 'processing...': 'Update Answer'} 
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
