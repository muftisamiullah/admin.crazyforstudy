import React,{useContext, useState, useEffect} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import { Button } from 'react-bootstrap'

import {AuthContext} from '../../context/AuthContext';
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'
import {useMutation, useQueryClient} from 'react-query'
import Switch from "react-switch";
import { useToasts } from 'react-toast-notifications';


export default function TutorHeading({tutor}) {
    const { addToast } = useToasts();
    const location = useLocation();
    const params = useParams();
    const path = location.pathname;

    const history = useHistory();
    
    const handleViewDetails = async (e) => {
        history.push(`/tutor-details/${e.tutor_id}`);
    }

    const {state} = useContext(AuthContext);

    let API_URL = '';
    if(process.env.NODE_ENV === 'development'){
        API_URL = cons.LOCAL_API_URL;
    }else{
        API_URL = cons.LIVE_API_URL;
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+state.access_token
        }
    };
    
    const queryClient = useQueryClient();

    const mutation = useMutation(formData => {
        return axios.post(`${API_URL}tutor/update-status`, formData, options)
    },{
        onSuccess: () => {
            queryClient.invalidateQueries([`tutors/${params?.status}/${params?.master_subject}/${params?.type}`])
            history.push(`${path}`);
            addToast('Freelancer Published status updated', { appearance: 'success',autoDismiss: true });
        }
    });

    const [checked, setChecked] = useState(false);
    const handleChange = async ({tutor_id,status}) => {
        setChecked(status);
        const formData = {tutor_id, status}
        await mutation.mutate(formData);
    };

    return (
        <div className="subject-card-heading">
            <div>
            <Switch
                    onChange={handleChange.bind(this,{tutor_id: tutor._id,status: tutor?.status === "1" ? checked: !checked})}
                    checked={tutor?.status === '1' ? !checked : checked}
                    className="react-switch displayIcon mr-2"
                    height={20}
                    width={48}
                    handleDiameter={22}
                    onHandleColor="#f00"
                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.5)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    title="freelance tutoring"
                />
            </div>
            <div>
                <Button className="delBtn pl-1 pr-1" alt="See Details" 
                        onClick={handleViewDetails.bind(this,{tutor_id: tutor._id})}>
                    <span className="fa fa-eye text-success mr-2"></span>
                </Button>
            </div>
        </div>
    )
}


