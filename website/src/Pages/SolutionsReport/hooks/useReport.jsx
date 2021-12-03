import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import * as cons from '../../../Helper/Cons.jsx'

export default function useReport() {
    const params = useParams();
    const q_type = params.question_type;
    const filter = params.filter;
    const {state } = useContext(AuthContext);
    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    const obj = {date : params.date}
    return useQuery(`questions-${q_type}-${obj.date}-${filter}`, async () => {
        const result = await axios.get(`${API_URL}question/solution-report/${q_type}/${filter}/${JSON.stringify(obj)}`,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        return result.data.results; 
    });
    
}
