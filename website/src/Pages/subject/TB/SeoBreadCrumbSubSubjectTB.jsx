import React from 'react'
import {useHistory, useParams, Link } from 'react-router-dom'

export default function SeoBreadCrumbSubSubject() {
    const history = useHistory();
    const params = useParams();
    const backUrl = `/sub-subject`
    return (
        <div className="p-0">
            <Link to={backUrl} className="btn btn-sm dark">
                <span className="fa fa-arrow-left"></span>
            </Link>
            <button onClick={e => history.push(`/sub-subject-seo/textbook/update/${params.id}`)} className="btn btn-sm counter btn-success pl-2 pr-2 ml-2">
                <span className="fa fa-globe mr-2"></span>
                SEO
            </button>
            
            <button onClick={e => history.push(`/sub-subject-student-reviews/textbook/update/${params.id}`)} className="btn btn-sm counter btn-primary pl-2 pr-2 ml-2">
                <span className="fa fa-star mr-2"></span>
                Student Reviews
            </button>
            
            <button onClick={e => history.push(`/sub-subject-content/textbook/update/${params.id}`)} className="btn btn-sm counter btn-warning pl-2 pr-2 ml-2">
                <span className="fa fa-book mr-2"></span>
                Content
            </button>

            <button onClick={e => history.push(`/sub-subject-related-questions/textbook/update/${params.id}`)} className="btn btn-sm counter btn-danger pl-2 pr-2 ml-2">
                <span className="fa fa-question-circle mr-2"></span>
                Related Questions
            </button>
        </div>
    )
}
