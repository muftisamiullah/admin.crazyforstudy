import {useContext}  from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import {AdminContext} from '../../../context/AdminContext.jsx';
import * as cons from '../../../Helper/Cons'

export default function useGetSingleCTBS() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const location = useLocation();
    const {state:adminState } = useContext(AdminContext);

    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    let limit = 20;
    let url = `${API_URL}student/get-single-college-textbooks/${params.filter}/${params.isbn}/${params.id}`;

    return useQuery([`get-college-textbooks-${params.isbn}`], async () => {
        const result = await axios.get(url,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        
        return {
            data: result.data.data
        }; 
    },{enabled: params.filter === undefined ? false : true});
}
