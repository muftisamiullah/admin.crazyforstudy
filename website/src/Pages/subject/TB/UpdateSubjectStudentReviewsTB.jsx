import React, {useContext, useState, useEffect, useRef} from 'react'
import '../../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import {Notification} from '../../../components/Notification';
import {LoadingComp} from '../../../components/LoadingComp';
import useSubjectReviews from '../hooks/useSubjectReviewsTB';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../../Helper/Cons.jsx'
import Rating from 'react-rating';
import ReviewSubjectHeading from './ReviewSubjectHeadingTB'
import { useToasts } from 'react-toast-notifications';
import Breadcrumb from './SeoBreadCrumbSubjectTB';
import DatePicker from "react-datepicker";
import {s3Path} from '../../../Helper/ApiUrl'

export default function UpdateSubjectStudentReviewsTB() {

const history = useHistory();
const params = useParams();
const { addToast } = useToasts();
const {state} = useContext(AuthContext);
const {data, isLoading} = useSubjectReviews();

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
const instituteRef = useRef('');
const ratingRef = useRef('');
const [startDate, setStartDate] = useState(new Date());
const [file, setFile] = useState(null);

const formDataUpload = new FormData();

const mutation = useMutation(formDataUpload => {
        return axios.patch(`${API_URL}subject/save-reviews/${params.id}`, formDataUpload, options)
    },{
    onSuccess: () => {
        setLoading(false);
        reviewRef.current.value = '';
        userNameRef.current.value = '';
        instituteRef.current.value = '';
        queryClient.invalidateQueries(['reviews',params.id]);
        addToast('Review added successfully', { appearance: 'success',autoDismiss: true });
    }
});



const handleReview = async (e) => {
    e.preventDefault();
    if(userNameRef.current.value === ''){
        addToast('Please enter name', { appearance: 'error',autoDismiss: true });
        userNameRef.current.focus();
        return;
    }

    formData['name'] = formData.name !== '' ? userNameRef.current.value : formData.name
    formData['institute'] = formData.institute !== '' ? instituteRef.current.value : formData.institute
    formData['review'] = formData.review !== '' ? reviewRef.current.value : formData.review   

    formDataUpload.append('name',formData['name'])
    formDataUpload.append('review',formData['review'])
    formDataUpload.append('rating',rating)
    formDataUpload.append('img_path',formData['img_path'])
    formDataUpload.append('institute',formData['institute'])
    setLoading(true);
    await mutation.mutate(formDataUpload);
}

    useEffect(() => {
            let timerError = setTimeout(() => setError(''), 1500);
            return () => {
            clearTimeout(timerError)
        }
    }, [error]);

const [singleReview, setSingleReview] = useState({name: '',review:'', institute:""});
const filterReview = async () => {
    const reviews = data && data.data;
    const rev = reviews && reviews.filter( rev => rev._id === params.review_id); 
    setSingleReview(rev && rev[0]);
    setRating(rev && rev[0]?.rating)
}
useEffect(filterReview,[data, params.review_id])

return (
<>
{state.isLoggedIn && (
<div className="col-lg-10 col-md-10 main_dash_area">
<div className="main-area-all">
<div className="dashboard_main-container">
<div className="dash-main-head">
    <h2>Manage Textbook Subject Reviews</h2>
</div>
{error && <Notification>{error.message}</Notification>}
{isLoading && <LoadingComp />}

<div className="dash-con-heading">
    <div className="col-md-12 row">
        <Breadcrumb/>
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
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            ref={userNameRef}
                            defaultValue={singleReview && singleReview.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="form-control" autoComplete="off" placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label>Institute</label>
                        <input  
                            ref={instituteRef}
                            defaultValue={singleReview && singleReview.institute}
                            onChange={e => setFormData({...formData, institute: e.target.value})}
                            className="form-control" autoComplete="off" placeholder="Enter institute"/>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file"
                            onChange={e => setFormData({...formData, img_path: e.target.files[0]})}
                            className="form-control"/>
                    </div>
                    {/* <div className="form-group">
                        <label>Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div> */}
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
                            initialRating={singleReview && singleReview.rating} 
                            defaultValue={singleReview && singleReview.rating}
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            onChange={e => setRating(e)}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-md text-success block dark" onClick={handleReview}>
                            {loading && (
                                <><span className="fa fa-spinner"></span> Processing</>
                            )}
                            {!loading && (
                                <><span className="fa fa-save"></span> Save Review</> 
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-md-8 offset-1">
                <h6> <span className="fa fa-star"></span>
                {data && data.reviews.length ? data && data.reviews.length : 'All ' } Reviews for this Subject:</h6>
                <hr />
                <div style={{ height: '420px', overflowY: 'scroll', paddingRight: '15px'}} id="reviewDiv">
                    {data && data.reviews.map(review => {
                        const local = new Date(review && review.created_at)
                        return (
                            <div className="subject-card"
                            style={{width: '100%'}}
                            key={review._id}>
                                
                                <div className="subject-card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={s3Path + review?.img_path} className="img-fluid"/>
                                        </div>
                                        <div className="col-md-9">
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
                                                    {local.toLocaleDateString()}
                                                </div>
                                            </div> 
                                            
                                            
                                            <div className="admin-name"> 
                                                <div className="name-label">
                                                    <span className="fa fa-user fa-1x mr-2 pt-1"></span> 
                                                    &nbsp; name: 
                                                </div>
                                                <div className="name-main">
                                                    {review && review.name}
                                                </div>
                                            </div> 
                                            <div className="admin-name"> 
                                                <div className="name-label">
                                                    <span className="fa fa-user fa-1x mr-2 pt-1"></span> 
                                                    &nbsp; institute: 
                                                </div>
                                                <div className="name-main">
                                                    {review && review.institute}
                                                </div>
                                            </div> 
                                            <div className="admin-name"> 
                                                <div className="name-label">
                                                    <span className="fa fa-comments fa-1x mr-2 pt-1"></span> 
                                                    &nbsp; Reviews: 
                                                </div>
                                                <div className="name-main text-justify">
                                                    {review && review.review?.substr(0,100) + '...'}
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    
                                    

                                </div> 
                                <hr className="mt-1 mb-2"/>
                                    <ReviewSubjectHeading review={review} />
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
