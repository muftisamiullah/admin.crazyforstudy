import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import * as cons from '../../../Helper/Cons.jsx'

export default function useSubjectReviewsTB() {
    const params = useParams();
    const id = params.id;
    const {state } = useContext(AuthContext);
    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    const data = useQuery(['reviews',id], async () => {
        const result = await axios.get(`${API_URL}subject/review/${id}`,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        return result.data.data; 
    });
    return data;
    
}
