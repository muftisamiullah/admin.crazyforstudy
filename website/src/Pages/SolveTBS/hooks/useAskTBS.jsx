import {useContext}  from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import {AdminContext} from '../../../context/AdminContext.jsx';
import * as cons from '../../../Helper/Cons'

export default function useAskTBS() {
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
    let pageno = (params.page_no === undefined ) ? 1 : params.page_no;
    let url = `${API_URL}chapter/get-all-quesions-tbs/${params.filter}/${pageno}/${limit}`;
    return useQuery([`get-all-quesions-tbs-${params.filter}`,pageno], async () => {
        const result = await axios.get(url,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        console.log(result, limit)
        return {
            data: result.data.chapps, 
            pagination : Math.floor(result.data.totalRecords / limit)
            
            // pagination: {
            //     currentPage: result.data.currentPage,
            //     hasNextPage: result.data.hasNextPage,
            //     hasPrevPage: result.data.hasPrevPage,
            //     next: result.data.next,
            //     pageCount: result.data.pageCount,
            //     itemCount: result.data.itemCount,
            //     prev: result.data.prev,
            // }
        }; 
    },{enabled: params.filter === undefined ? false : true});
}
