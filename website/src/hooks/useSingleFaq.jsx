import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext.jsx';

import {AdminContext} from '../context/AdminContext.jsx';
import * as cons from '../Helper/Cons.jsx'

export default function useSingleFaq() {
    const params = useParams();
    const {state } = useContext(AuthContext);
    const {state:adminState } = useContext(AdminContext);

    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    let limit = 10;
    let pageno = (adminState.CurrentPage === null ) ? 1 : adminState.CurrentPage;
    return useQuery(['singlefaq',pageno], async () => {
        const result = await axios.get(`${API_URL}faq/single/${params.faq_id}`,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        
        return {
            data: result.data.data
        };  
    });
    
}
