import React, {useContext, useState, useEffect, useRef} from 'react'
import '../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';
import useBookReviews from '../../hooks/useBookReviews';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'
import Rating from 'react-rating';
import ReviewHeading from './ReviewHeading'
import { useToasts } from 'react-toast-notifications';

export default function BookRatingReview() {

const history = useHistory();
const params = useParams();
const { addToast } = useToasts();
const {state} = useContext(AuthContext);
const {data, isLoading} = useBookReviews();

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

const [formData, setFormData] = useState({});
const [rating, setRating] = useState('');
const [error, setError] = useState();
const [loading, setLoading] = useState(false);

const queryClient = useQueryClient()
const reviewRef = useRef('');
const userNameRef = useRef('');
const ratingRef = useRef('');
const [upload, setUpload] = useState(false);

const mutation = useMutation(formData => {
        return axios.post(`${API_URL}books/add-review`, formData, options)
    },{
    onSuccess: () => {
        queryClient.invalidateQueries('reviews')
        setLoading(false);
        reviewRef.current.value = '';
        userNameRef.current.value = '';
        history.push(`/book-rating-review/${params.isbn}/${params.book_id}`);
        var objDiv = document.getElementById("reviewDiv");
        objDiv.scrollTop = 0;
        addToast('Review added successfully', { appearance: 'success',autoDismiss: true });
    }
});
const uploadMutation = useMutation(formData => {
        return axios.post(`${API_URL}books/upload-review`, formData, options)
    },{
    onSuccess: () => {
        queryClient.invalidateQueries('reviews')
        setLoading(false);
        history.push(`/book-rating-review/${params.isbn}/${params.book_id}`);
        var objDiv = document.getElementById("reviewDiv");
        addToast('Review Uploaded Successfully', { appearance: 'success',autoDismiss: true });
        objDiv.scrollTop = 0;
    }
});


const handleReview = async (e) => {
    e.preventDefault();
    if(userNameRef.current.value === ''){
        addToast('Please enter username', { appearance: 'error',autoDismiss: true });
        userNameRef.current.focus();
        return;
    }
    formData['book_id'] = params.book_id;
    formData['isbn'] = params.isbn;
    formData['review_id'] = params.review_id;
    formData['userName'] = formData.userName !== '' ? userNameRef.current.value : formData.userName
    formData['review'] = formData.review !== '' ? reviewRef.current.value : formData.review   
    formData['rating'] = rating
    formData['stats'] = true
    setLoading(true);
    await mutation.mutate(formData);

}

const formDataUpload = new FormData();
const [file, setFile] = useState(null);

async function handelChangeUpload(e){
    const filename = e.target.files[0].name;
    const ext = filename.split('.')[1];
    if(ext === "csv"){
        setFile(e.target.files[0]);
        formDataUpload.append('file', e.target.files[0]);
    }else{
        addToast('Only .csv files are allowed', { appearance: 'error',autoDismiss: true });
    }
}
const handleUploadReview = async (e) => {
    e.preventDefault();
    if(file === null){
        addToast('Please upload csv file. download sample file.', { appearance: 'error',autoDismiss: true });
        return false;
    }
    formDataUpload.append('book_id',  params.book_id);
    formDataUpload.append('isbn',  params.isbn);
    formDataUpload.append('upload',  upload);
    formDataUpload.append('stats',  true);
    formDataUpload.append('file',  file);
    setLoading(true);
    await uploadMutation.mutate(formDataUpload);
}

useEffect(() => {
    let timerError = setTimeout(() => setError(''), 1500);
    return () => {
    clearTimeout(timerError)
}
}, [error]);
const [singleReview, setSingleReview] = useState({userName: '',review:''});
const filterReview = async () => {
    const reviews = data && data.data;
    const rev = reviews && reviews.filter( rev => rev._id === params.review_id); 
    setSingleReview(rev && rev[0]);
    setRating(rev && rev[0]?.rating)
}
useEffect(filterReview,[data, params.review_id])

const backUrl = params?.book_id 
        ? `/book-seo/${params.isbn}/${params.book_id}`
        : `/books`;

return (
<>
{state.isLoggedIn && (
<div className="col-lg-10 col-md-10 main_dash_area">
<div className="main-area-all">
<div className="dashboard_main-container">
<div className="dash-main-head">
    <h2>Books Rating and Review - ISBN13: {params?.isbn}</h2>
</div>
{error && <Notification>{error.message}</Notification>}
{isLoading && <LoadingComp />}

<div className="dash-con-heading">
    <div className="col-md-12 row">

        <div className="p-0">
            <Link to={backUrl} className="btn btn-sm dark">
                <span className="fa fa-arrow-left"></span>
            </Link>
        </div>

        <div className="row col-md-10">
        <div className="col-md-6 pr-0">
            {params && !params.review_id && (
                <button className="btn btn-sm mr-1 dark text-success"
                onClick={e => setUpload(!upload)}
                > 
                    <span className="fa fa-cloud"></span> 
                    &nbsp; Bulk Upload Review
                </button>
            )}

            {upload && (
            <a className="btn btn-sm ml-1 dark text-success" href="/sampledata/bulk_upload_review.csv" download>
            <span className="fa fa-download"></span> &nbsp;    
            Download Sample File
            </a>
        )}
        </div>  
            
    </div>
    </div>    
</div>
{!isLoading && (
<div className="dash-cont-start">
    <div className="subject-main-container pl-0 pt-0 pr-0 pb-0">    
        <div className="row col-md-12">
            <div className="col-md-3">
                <h6> <span className="fa fa-star"></span> Manage Reviews</h6>
                <hr />
                <form>
                {!upload && ( 
                    <> 
                    
                    <div className="form-group">
                        <label>userName</label>
                        <input 
                            ref={userNameRef}
                            defaultValue={singleReview && singleReview.userName}
                            onChange={e => setFormData({...formData, userName: e.target.value})}
                            className="form-control" autoComplete="off" placeholder="Enter username"/>
                    </div>
                    
                    <div className="form-group">
                        <label>Reviews</label>
                        <textarea
                            ref={reviewRef}
                            className="form-control" 
                            defaultValue={singleReview && singleReview.review}
                            onChange={e => setFormData({...formData, review: e.target.value})}
                            style={{  height: '150px'}}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <br />
                        <Rating
                            ref={ratingRef}
                            initialRating={singleReview && singleReview.rating} 
                            defaultValue={singleReview && singleReview.rating}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={e => setRating(e)}
                        />
                    </div>
                    </>
                    )}
                    {upload && (
                    <div className="form-group">
                        <label>Upload</label>
                        <input type="file" 
                            accept=".csv,"
                            onChange={handelChangeUpload}
                            onKeyDown={ 
                                event => {
                                    if(event.key === 'Enter'){
                                        event.preventDefault()
                                    }
                                }
                            }
                        />
                    </div>
                    )}

                    <div className="form-group">
                        {!upload && (
                        <button className="btn btn-md text-success block dark" onClick={handleReview}>
                        {loading && (
                            <><span className="fa fa-spinner"></span> Processing</>
                        )}
                        {!upload && !loading && (
                            <><span className="fa fa-save"></span> Save Review</> 
                        )}
                        </button>
                        )}

                        
                        {upload && (
                            <button className="btn btn-md text-success block dark" onClick={handleUploadReview}>
                        {loading && (
                            <><span className="fa fa-spinner"></span> Processing</>
                        )}
                        {upload && !loading && (
                            <><span className="fa fa-cloud"></span> Upload Review</> 
                        )}
                        </button>
                        )}

                        {params && params.review_id && (
                            <button 
                            className="btn btn-md pull-right dark text-success"
                            onClick={e => history.push(backUrl)}
                            > <span className="fa fa-times"></span> Cancel </button>
                        )}        
                        
                    </div>

                </form>
            </div>
            <div className="col-md-8 offset-1">
                <h6> <span className="fa fa-star"></span> 
                {data && data.data.length ? data && data.data.length : 'All ' } Reviews for - ISBN <b>{params.isbn}</b></h6>
                <hr />
                <div style={{ height: '420px', overflowY: 'scroll', paddingRight: '15px'}} id="reviewDiv">
                    {data && data.data.map(review => {
                        return (
                            <div className="subject-card"
                            style={{width: '100%'}}
                            key={review._id}>
                                
                                <div className="subject-card-body">
                                    <div className="admin-name"> 
                                        <div className="name-label">
                                            <span className="fa fa-star fa-1x mr-2 pt-1"></span> 
                                            &nbsp; Ratings: 
                                        </div>
                                        <div className="name-main">
                                            <Rating
                                                initialRating={review && review.rating} 
                                                emptySymbol="fa fa-star-o text-danger"
                                                fullSymbol="fa fa-star text-success"
                                                readonly
                                                className="displayRating"
                                                
                                            />
                                        </div>
                                    </div> 
                                    <div className="admin-name"> 
                                        <div className="name-label">
                                            <span className="fa fa-calendar fa-1x mr-2 pt-1"></span> 
                                            &nbsp; Review Date: 
                                        </div>
                                        <div className="name-main">
                                            {review && review.created_at}
                                        </div>
                                    </div> 
                                    
                                    
                                    <div className="admin-name"> 
                                        <div className="name-label">
                                            <span className="fa fa-user fa-1x mr-2 pt-1"></span> 
                                            &nbsp; UserName: 
                                        </div>
                                        <div className="name-main">
                                            {review && review.userName}
                                        </div>
                                    </div> 
                                    <div className="admin-name"> 
                                        <div className="name-label">
                                            <span className="fa fa-comments fa-1x mr-2 pt-1"></span> 
                                            &nbsp; Reviews: 
                                        </div>
                                        <div className="name-main text-justify">
                                            {review && review.review.substr(0,60) + '...'}
                                        </div>
                                    </div> 
                                    

                                </div> 
                                <hr className="mt-1 mb-2"/>
                                <ReviewHeading review={review} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
</div>
)}


</div>
</div>
</div>

)}  
</>
)
}
