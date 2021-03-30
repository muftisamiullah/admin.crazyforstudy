import React,{useState,useContext} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useMutation, useQuery, QueryCache} from 'react-query'
import {AuthContext} from '../../context/AuthContext';
import * as utils from '../../utils/MakeSlug'
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'

function FaqForm() {

    

    const history = useHistory();
    const params = useParams();
    const {state} = useContext(AuthContext);

    const [formData, setFormData] = useState({});
    
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
    const [loading, setLoading] = useState(false);
    const mutation = useMutation(formData => {
        return axios.post(`${API_URL}faq/add-question/${params.faq_id}`, formData, options)
    },{
        onSuccess: () => {
            setLoading(false);
            history.push(`/add-faq-question/${params.faq_category}/${params.faq_id}`);
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await mutation.mutate(formData);
    }

    return (
        <form>
            <div className="form-group">
                <label>
                    Question
                </label>
                <input 
                    type="text" name="question"
                    onChange={e=> setFormData({...formData, question: e.target.value})}
                    className="form-control" autoComplete="off"/>
            </div>
            
            <div className="form-group">
                <label>
                    Answer
                </label>
                <input 
                type="text" name="answer" 
                onChange={e=> setFormData({...formData, answer: e.target.value})}
                className="form-control" autoComplete="off"/>
            </div>

            
            <div className="form-group">
               <button type="button" className="dark btn btn-md"
               onClick={handleSubmit}
               > {loading ? 'Processing...' : 'Save Category'}</button>
            </div>

        </form>
    )
}

export default FaqForm
