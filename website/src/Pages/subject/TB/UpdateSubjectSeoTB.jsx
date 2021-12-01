import React, {useContext,useState, useEffect} from 'react'
import '../../mainDash.css';
import {  useHistory, Link, useParams  } from "react-router-dom";
import { Button,Form } from 'react-bootstrap'
import * as api from '../../../Helper/ApiHelper.jsx';
import useAxios from '../../../hooks/useAxios'
import {AuthContext} from '../../../context/AuthContext';
import {Notification} from '../../../components/Notification';
import {ErrorContext} from '../../../context/ErrorContext';
import {SubjectContext} from '../../../context/SubjectContext';
import Breadcrumb from './SeoBreadCrumbSubjectTB';

export default function UpdateSubjectSeoTB() {
    const history = useHistory();
    const params = useParams();
    const {state} = useContext(AuthContext);
    const {state: errorState, dispatch: errorDispatch} = useContext(ErrorContext);
    const {state: sState, dispatch: sDispatch} = useContext(SubjectContext);

    const [formData, setFormData] = useState("");

    async  function handleSubmit(e){
        e.preventDefault();
        let response = null;
        if(formData == ''){
            errorDispatch({type: 'SET_ERROR', payload: "You haven't change anything"});
        }else{
            if(params.id){
                response = await api.patch(`subject/update-textbook/${params.id}`,formData);
            }
            errorDispatch({type: 'SET_SUCCESS', payload: response.message});
            history.push('/subject');
        }
    }
    async function handelChange(e){
        const data = e.target.value;
        const subject = data.replace(/[^a-zA-Z0-9, ]/g, "");
        setFormData({...formData, [e.target.name]: subject});
    }
    const {response} = useAxios({
        method: 'get', url: `subject/view/${params.id}`
    });
    
    const [metatitle, setMetaTitle] = useState('');
    const [metadescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    
    useEffect( () => {
        if(response && response.data !== null){
            const subRes = response.data.textbook_seo_details;
            sDispatch({type: 'SET_SUBJECT', payload: subRes});
            if(sState){

                if(subRes){
                    
                        setMetaTitle(subRes.meta_title)
                        setMetaDescription(subRes.meta_description)
                        setMetaKeywords(subRes.meta_keywords)

                        setFormData({
                        meta_title : subRes.meta_title,
                        meta_description : subRes.meta_description,
                        meta_keywords : subRes.meta_keywords
                        });
                }
                

            }
        }   
    },[params.id, response])
    useEffect( () => {
        let timerError = setTimeout(() => errorDispatch({type: 'SET_ERROR', payload: ''}), 1500);
        let timerSuccess = setTimeout(() => errorDispatch({type: 'SET_SUCCESS', payload: ''}), 1500);
        return () => {
            clearTimeout(timerError)
            clearTimeout(timerSuccess)
        }
    },[errorState.error, errorState.success])

return (

    <>
    {state.isLoggedIn && errorState && sState && (
      
    <div className="col-lg-10 col-md-10 main_dash_area">
        <div className="main-area-all">
            <div className="dashboard_main-container">
                <div className="dash-main-head">
                    <h2>Manage Textbook Subject Seo</h2>
                </div>
                <div className="dash-con-heading">
                    <div className="col-md-12 pl-0">
                        {/* <Link to={`/subject`} className="btn btn-sm dark">
                            <span className="fa fa-arrow-left text-success mr-2"></span>
                        </Link> */}
                        <Breadcrumb/>
                    </div>
                </div>
                <div className="dash-cont-start">
                    <div className="org-main-area">
                        
                        <div className="col-md-12 no-gutter p-0 mt-2">
                        {errorState.error && ( 
                            <Notification>{errorState.error}</Notification>
                        )}
                            
                        {errorState.success && ( 
                            <Notification>{errorState.success}</Notification>
                        )}
                        <h6> <span className="fa fa-globe"></span> Manage SEO</h6>
                        <hr />
                        <Form method="POST" className="col-md-6 p-0">

                            <Form.Group>    
                            <Form.Label>Meta Title</Form.Label>
                                <Form.Control name="meta_title" autoComplete="off"
                                defaultValue={metatitle}
                                onChange={handelChange}
                                onKeyDown={ 
                                    event => {
                                        if(event.key === 'Enter'){
                                            event.preventDefault()
                                        }
                                    }
                                } placeholder="Meta Title"/>
                            </Form.Group>

                            <Form.Group>                                
                            <Form.Label>Meta Description</Form.Label>
                                <Form.Control name="meta_description" autoComplete="off"
                                defaultValue={metadescription}
                                onChange={handelChange}
                                onKeyDown={ 
                                    event => {
                                        if(event.key === 'Enter'){
                                            event.preventDefault()
                                        }
                                    }
                                } placeholder="Meta Description"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Meta Keywords</Form.Label>
                                <Form.Control name="meta_keywords" autoComplete="off"
                                defaultValue={metaKeywords}
                                onChange={handelChange}
                                onKeyDown={ 
                                    event => {
                                        if(event.key === 'Enter'){
                                            event.preventDefault()
                                        }
                                    }
                                } placeholder="Meta Keywords"/>
                            </Form.Group>
                            
                            <Form.Group>
                                <Button 
                                onClick={handleSubmit}
                                className="btn dark btn-sm">
                                    {'Update Seo'}
                                </Button>
                            </Form.Group>
                        </Form>
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
