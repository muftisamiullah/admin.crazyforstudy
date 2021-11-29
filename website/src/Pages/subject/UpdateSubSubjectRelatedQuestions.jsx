import React, {useContext, useState, useEffect, useRef} from 'react'
import '../mainDash.css';
import {  useParams, Link, useHistory  } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {Notification} from '../../components/Notification';
import {LoadingComp} from '../../components/LoadingComp';
import useQuestions from './hooks/useQuestions';
import useRelatedQuestions from './hooks/useRelatedQuestions';
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import * as cons from '../../Helper/Cons.jsx'
import * as utils from '../../utils/MakeSlug'

import { useToasts } from 'react-toast-notifications';
import Breadcrumb from './SeoBreadCrumbSubSubject';
import {htmlDecode} from '../../utils/MakeSlug'

export default function UpdateSubSubjectRelatedQuestions() {  

const history = useHistory();
const params = useParams();
const { addToast } = useToasts();
const {state} = useContext(AuthContext);

const {data:AllQuestions, isLoading} = useQuestions();
const {data:relatedQuestions} = useRelatedQuestions();

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

const [error, setError] = useState();
const [loading, setLoading] = useState(false);

const queryClient = useQueryClient()


const mutation = useMutation(formData => {
        return axios.post(`${API_URL}books/add-similar-books`, formData, options)
    },{
    onSuccess: () => {
        queryClient.invalidateQueries('relatedquestions')
        setLoading(false);
        history.push(`/book-similar-books/${params.isbn}/${params.book_id}`);
        setFormData([]);
        setSelectedBooks([]);
        setUpdateBooks([]);
        setUpdateSBook(false);
        addToast('Similar Book`s added successfully', { appearance: 'success',autoDismiss: true });
    }
});
const [formData, setFormData] = useState([]);

const [SelectedBooks,setSelectedBooks] = useState([]);

const handleAllQuestions = async (id) => {
    setUpdateSBook(false);
    let Questions = await AllQuestions.filter( book => book._id === id);
    setSelectedBooks([Questions[0]]);
}
const [updateSBook, setUpdateSBook] = useState(false);
const [updateBooks, setUpdateBooks] = useState([])
const handleSimilarBooks = async (id) => {
    setUpdateSBook(true);
    let Books = await relatedQuestions.filter( book => book._id === id);
    setUpdateBooks(Books)
    setSelectedBooks([Books[0]]);
}

const handleDisplayTitle = async (question_id, question,shortanswer,completeanswer) => {
    let id = question_id;
    let array = [];
    const questionData = {
        question: question, 
        BookId: question_id,
        shortanswer: shortanswer,  
        completeanswer: completeanswer, 
    }
    array.push(questionData)
    let SData = {relatedQuestions: array, book_id: params?.book_id, book_isbn: params?.isbn}
    setTimeout(async () => {
        await mutation.mutate(SData); 
        document.getElementById(id).style.display = 'none'
    }, 1000);
}
const handleUpdateTitle = async (id, book_id, book_isbn, edition) => {
    let div = document.getElementById(`display-title-${id}`).value
    if(div !== ""){
        document.getElementById(`DisplayTitle-${id}`).innerHTML = div
        document.getElementById(`Title-${id}`).innerHTML = div
        document.getElementById(`display-title-${id}`).value = '';   
        const booksData = {
            DisplayTitle: div, 
            AltImage: div
        }
        let SData = {relatedQuestions: booksData, id, book_id: params?.book_id, book_isbn: params?.isbn}
        setTimeout(async () => {
            await mutation.mutate(SData); 
            
            // document.getElementById(id).style.display = 'none'
        }, 1000);
    }
}

return (
<>
{state.isLoggedIn && (
<div className="col-lg-10 col-md-10 main_dash_area">
<div className="main-area-all">
<div className="dashboard_main-container">
<div className="dash-main-head">
    <h2>Similar Questions: </h2>
</div>
{error && <Notification>{error.message}</Notification>}
{isLoading && <LoadingComp />}

<div className="dash-con-heading">
    <div className="col-md-12 row">
        <Breadcrumb />
    </div>    
</div>
{!isLoading && (
<div className="dash-cont-start">
    <div className="pl-0 pt-0 pr-0 pb-0">    
        <form>
        <div className="row col-md-12 pl-0 pr-0">
            <div className="col-md-4 pr-0">
                <p><b> All Questions</b></p>
                <hr className="mt-1 mb-2"/>
                <div className="col-md-12 pl-0" style={{ height: '950px', overflowY: 'scroll'}}>

                {AllQuestions?.map(item => {
                    return (
                    <div className="card mb-1" style={{ cursor: 'pointer'}}
                    key={item?._id}
                    id={item?._id}
                    onClick={handleAllQuestions.bind(this, item?._id)}>
                        <div className="row col-md-12">
                            <div className="col-md-9 pl-1">
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Isbn:  </b>{item?._id}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Question:  </b>
                                    {/* {utils.GetString(item?.question,100)} */}
                                    {utils.isHTML(item?.question) ?
                                        <span dangerouslySetInnerHTML={{ __html:utils.GetString(item?.question, 200)  }} />
                                        :
                                        <span dangerouslySetInnerHTML={{ __html:utils.GetString( htmlDecode(item?.question) , 200)  }} />
                                    }
                                        </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Subject:  </b>{item?.subject}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Sub Subject:  </b>{item?.sub_subject}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Flag:  </b>{item?.flag}
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    )
                })}
                </div>
            </div>
            {!updateSBook && SelectedBooks.length > 0 && (
                <div className="col-md-4 pl-1 pr-0">
                <p>Selected Books: </p>
                <hr className="mt-1 mb-1"/>
                <div className="col-md-12 pr-0 pl-0" style={{ height: '950px', overflowY: 'scroll'}}>
                {SelectedBooks?.map(ques => {
                    return (
                    <div className="card mb-1" style={{ cursor: 'pointer'}}
                        key={ques?._id}
                        >
                        <div className="row col-md-12">   
                        {/* <div className="col-md-12 pl-1 pr-0"> */}
                            <div className="col-md-12 pl-0 pr-0">
                                    <b>Isbn:  </b>
                                    <span id={`Title-${ques?._id}`}>{ques?._id}</span>
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                <b>Question:  </b>
                                    {utils.isHTML(ques?.question) 
                                        ?
                                            <span dangerouslySetInnerHTML={{ __html:utils.GetString(ques?.question, 200)  }} />
                                        :
                                            <span dangerouslySetInnerHTML={{ __html:utils.GetString( htmlDecode(ques?.question) , 200)  }} />
                                    }
                            </div>
                                <div className="col-md-12 pl-0 pr-0">
                                <b>Subject:  </b>{ques?.subject}
                            </div>
                            <div className="col-md-12 pl-0 pr-0">
                                    <b>Sub Subject:  </b>{ques  ?.sub_subject}
                            </div>
                            <div className="col-md-12 pl-0 pr-0">
                                    <b>Flag:  </b>{ques ?.flag}
                            </div>
                            <div className="col-md-12 pl-0 pr-0">
                                <b>Display Title:  </b>
                                {/* <span id={`DisplayTitle-${ques?._id}`}>{ques?.DisplayTitle}</span> */}
                            </div>
                       {/* </div> */}
                       </div>
                        <hr className="mt-2 mb-2"/>
                        <div className="row col-md-12 pr-0" style={{ display: 'flex', flexDirection: 'space-between'}}>
                            <div className="col-md-9 pl-0 pr-0">
                                {/* <input type="text" id={`display-title-${ques?._id}`} autoComplete="off" className="form-control" placeholder="enter display title"/>    */}
                            </div>
                            <div className="col-md-3 pr-0" style={{ display: 'flex', flexDirection: 'space-between'}}>
                                <button type="button" onClick={handleDisplayTitle.bind(this, ques?._id, ques?.ISBN13,ques?.Edition)} className="fa fa-save dark btn btn-sm"></button>
                                <button type="button"
                                onClick={e => { 
                                    setFormData([]);
                                    setSelectedBooks([]);
                                    setUpdateSBook(false);
                                 }} className="fa fa-times dark btn btn-sm ml-1"></button>
                            </div>
                        </div>
                    </div>
                    )
                })}

                </div>
            </div>
            
            )}

            {updateSBook && (
               <div className="col-md-4 pl-1 pr-0">
               <p>Update Books: </p>
               <hr className="mt-1 mb-1"/>
               <div className="col-md-12 pr-0 pl-0" style={{ height: '950px', overflowY: 'scroll'}}>
               {updateBooks?.map(book => {
                   return (
                   <div className="card mb-1" style={{ cursor: 'pointer'}}
                       key={book?._id}
                       >
                        <div className="row col-md-12">   
                        <div className="col-md-12 pl-1 pr-0">
                            <div className="col-md-12 pl-0 pr-0">
                                    <b>Title:  </b>
                                    <span id={`Title-${book?._id}`}>{book?.DisplayTitle}</span>
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                <b>ISBN13:  </b>{book?.ISBN13}
                            </div>
                                <div className="col-md-12 pl-0 pr-0">
                                <b>Edition:  </b>{book?.Edition}
                            </div>
                            <div className="col-md-12 pl-0 pr-0">
                                <b>Display Title:  </b>
                                <span id={`DisplayTitle-${book?._id}`}>{book?.DisplayTitle}</span>
                            </div>
                       </div>
                       </div>

                       <hr className="mt-2 mb-2"/>
                       <div className="row col-md-12 pr-0" style={{ display: 'flex', flexDirection: 'space-between'}}>
                           <div className="col-md-10 pl-0 pr-0">
                               <input type="text" id={`display-title-${book?._id}`} autoComplete="off" className="form-control" placeholder="enter display title"/>   
                           </div>
                           <div className="col-md-2 pr-0" style={{ display: 'flex', flexDirection: 'space-between'}}>
                               <button type="button" onClick={handleUpdateTitle.bind(this, book?._id,book?.BookId, book?.ISBN13, book?.Edition)} className="fa fa-save dark btn btn-sm"></button>
                               <button type="button" onClick={e => { 
                                    setFormData([]);
                                    setSelectedBooks([]);
                                    setUpdateBooks([]);
                                    setUpdateSBook(false);
                                 }} className="fa fa-times dark btn btn-sm ml-1"></button>
                           </div>
                       </div>
                   </div>
                   )
               })}

               </div>
           </div> 
            )}
            
            <div className="col-md-4 pl-1 pr-0">
                <p><b> Similar Questions</b></p>
                <hr className="mt-1 mb-2"/>
                <div className="col-md-12 pl-0 pr-0" style={{ height: '950px', overflowY: 'scroll', overflowX: 'hidden'}}>
                {relatedQuestions?.map(rQues => {
                    return (
                    <div className="card mr-0 mb-1" style={{ cursor: 'pointer'}}
                    key={rQues?._id}
                    id={rQues?._id}
                    onClick={handleSimilarBooks.bind(this, rQues?._id)}
                    >
                        <div className="row col-md-12">
                            <div className="col-md-9 pl-1">
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Isbn:  </b>{rQues?._id}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Question:  </b>
                                    {/* {utils.GetString(rQues?.question,100)} */}
                                    {utils.isHTML(rQues?.question) ?
                                        <span dangerouslySetInnerHTML={{ __html:utils.GetString(rQues?.question, 200)  }} />
                                        :
                                        <span dangerouslySetInnerHTML={{ __html:utils.GetString( htmlDecode(rQues?.question) , 200)  }} />
                                    }
                                        </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Subject:  </b>{rQues?.subject}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Sub Subject:  </b>{rQues?.sub_subject}
                                </div>
                                <div className="col-md-12 pl-0 pr-0">
                                    <b>Flag:  </b>{rQues?.flag}
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            
        
        </div>
        
        </form>
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
