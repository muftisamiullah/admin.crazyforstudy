import React from 'react';
import {  useHistory , useParams , Link} from "react-router-dom";
import { Button } from 'react-bootstrap'

import Pagination from '../../components/Pagination';

function TopMenu({data}) {
    const history = useHistory();
    const params = useParams();
    return (
        <div className="dash-con-heading">
            <div className="row pl-3" style={{ display: 'flex', flexContent: 'space-between' }}>
                <Button className="dark mr-1"
                    onClick={e => history.push('/manage-faq')}
                >
                    <span className="fa fa-arrow-left"></span>
                </Button>
                <Button className="dark mr-1"
                    onClick={e => history.push('/master-admin/create')}
                >
                    <span className="fa fa-plus-circle"></span>   
                    &nbsp; 
                    Add New Admin
                </Button>
                {!params.faq_id && (
                    <div className="row pl-3" style={{ display: 'flex', flexContent: 'space-between' }}>
                        <Pagination pagination={data && data.pagination}/>
                    </div>    
                )}
            </div>
        </div>
    )
}

export default TopMenu