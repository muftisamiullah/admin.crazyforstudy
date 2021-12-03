import React from 'react'
import {useHistory, useParams, Link } from 'react-router-dom'

export default function SeoBreadCrumbSubjectQA() {
    const history = useHistory();
    const params = useParams();
    const backUrl = `/subject`
    return (
        <div className="p-0">
            <Link to={backUrl} className="btn btn-sm dark">
                <span className="fa fa-arrow-left"></span>
            </Link>
            <button onClick={e => history.push(`/subject-seo/qa/update/${params.id}`)} className="btn btn-sm counter btn-success pl-2 pr-2 ml-2">
                <span className="fa fa-globe mr-2"></span>
                SEO
            </button>
            
            <button onClick={e => history.push(`/subject-student-reviews/qa/update/${params.id}`)} className="btn btn-sm counter btn-primary pl-2 pr-2 ml-2">
                <span className="fa fa-star mr-2"></span>
                Student Reviews
            </button>
            
            <button onClick={e => history.push(`/subject-content/qa/update/${params.id}`)} className="btn btn-sm counter btn-warning pl-2 pr-2 ml-2">
                <span className="fa fa-book mr-2"></span>
                Content
            </button>

            {/* <button onClick={e => history.push(`/subject-seo/qa/update/${params.id}`)} className="btn btn-sm counter btn-danger pl-2 pr-2 ml-2">
                <span className="fa fa-question-circle mr-2"></span>
                FAQ
            </button> */}
        </div>
    )
}
