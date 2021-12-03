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
import { useToasts } from 'react-toast-notifications';


export default function UpdateAnswer() {
    const history = useHistory();
    const params = useParams();
    const { addToast } = useToasts();
    
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
    const [extension, setExtension] = useState();
    const [file, setFile] = useState();
    const [formData, setFormData] = useState({});

    const uploadHalf = (e) => {
        const filename = e.target.files[0].name;
            const ext = filename.split('.')[1];
            setExtension(ext);
            if(ext === "docx"){
                setBtnDisbaled(false);
                setFile(e.target.files[0]);
                setFormData({...formData, [e.target.name]: e.target.files[0] })
            }else{
                setBtnDisbaled(true);
                addToast('Only .docx files are allowed', { appearance: 'error', autoDismiss: true });
        }
    }

    // const uploadFull = (e) => {
    //     const filename = e.target.files[0].name;
    //         console.log('file onchange ' ,  filename);
    //         const ext = filename.split('.')[1];
    //         setExtension(ext);
    //         if(ext === "docx"){
    //             setBtnDisbaled(false);
    //             setFile(e.target.files[0]);
    //             formDataUpload.append('file2', e.target.files[0]);
    //         }else{
    //             setBtnDisbaled(true);
    //             addToast('Only .docx files are allowed', { appearance: 'error', autoDismiss: true });
    //     }
    // }

    // const uploadImage = (e) => {
    //     e.preventDefault();
    //     var file, img, base64,blob, reader;
    //     if ((file = e.target.files[0])) {
    //         img = new Image();
    //         blob = new Blob([file],{ type: file.type })
    //         img.src = _URL.createObjectURL(blob);
    //         reader = new FileReader(); 
    //         reader.readAsDataURL(blob); 
    //         reader.onload = function () { 
    //            base64 = reader.result;
    //            setBlogImage(base64);
    //            setFormData({...formData,image: base64}) 
    //         }  
    //     }
    // }

    async  function handleSubmit(e){
        e.preventDefault();
        const formDataUpload = new FormData();
        let response = null;
        setLoading(true);
        setBtnDisbaled(true);
        formDataUpload.append('file1', formData.file1)
        formDataUpload.append('file2', formData.file2)

        response = await axios.patch(`${API_URL}assignment/update-answer-assignment/${params.id}`, formDataUpload, options);
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
                    <h2>Update Assignment</h2>
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
                                <strong>Assignment:</strong>
                            </Form.Label><br/>
                            <Form.Label style={{color:"green"}}>
                                <div className="card-text" id="high" dangerouslySetInnerHTML={{ __html: data && data.question  }} />
                            </Form.Label>
                            
                            
                        </Form.Group>
                        {/* <FileViewer
                            fileType={"png"}
                            filePath={s3Path+data.image0}
                        /> */}
                        {/*<FileViewer
                            fileType={"docx"}
                            filePath={s3Path+data.image1}
                        />
                        <FileViewer
                            filePath={s3Path+data.image2}
                        /> */}
                        <hr/>
                        <Form.Group className="col-md-12">
                        <div className="problem_no">{data?._id} | <span style={{color:"red"}}>{data?.payment_status}</span> | <span style={{color:"green"}}>{data?.subject+"/"+data?.sub_subject}</span> | <span style={{color:"red"}}>Pages: {data?.pages}</span> | <span style={{color:"grey"}}>Reference: {data?.referenceString}</span></div>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            {data.image0 != "" && 
                            <a href={s3Path + data.image0} target="_blank" download={data.image0} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> 1</a>
                            }
                            {data.image1 != "" && 
                                <a href={s3Path + data.image1} target="_blank" download={data.image1} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> 2</a>
                            }
                            {data.image2 != "" &&
                                <a href={s3Path + data.image2} target="_blank" download={data.image2} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> 3</a>
                            }
                            {data.solutionHalf != "undefined" && data.solutionFull != "" && data.solutionFull != undefined &&
                                <a href={s3Path + data.solutionHalf} target="_blank" download={data.solutionHalf} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> Assignment Half</a>
                            }
                            {data.solutionFull != "undefined" &&  data.solutionFull != "" && data.solutionFull != undefined &&
                                <a href={s3Path + data.solutionFull} target="_blank" download={data.solutionFull} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> Assignment Full</a>
                            }
                        </Form.Group >
                        <hr/>
                        {data.payment_status != "unpaid" ? <Form.Group className="col-md-12">
                            <Form.Label>
                                Choose Half Assignment
                            </Form.Label> 
                            <Form.Control name="file1" type="file" 
                            onChange={uploadHalf}
                            />  
                            <small style={{color:"green"}}>only .docx extenion files can be uploaded</small>
                        </Form.Group> :""}
                        {data.payment_status == "paid-full" ? <Form.Group className="col-md-12">
                            <Form.Label>
                                Choose Full Assignment
                            </Form.Label> 
                            <Form.Control name="file2" type="file" 
                            onChange={uploadHalf}
                            />  
                            <small style={{color:"green"}}>only .docx extenion files can be uploaded</small>
                        </Form.Group> : ""} 
                        {data.payment_status != "unpaid" ? <Form.Group className="col-md-12">
                            <Button 
                            onClick={handleSubmit}
                            disabled={!loading && btnDisabled}
                            className="btn dark btn-md">
                                {loading ? 'processing...': 'Update Assignment'} 
                            </Button>
                        </Form.Group> : ""}
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
