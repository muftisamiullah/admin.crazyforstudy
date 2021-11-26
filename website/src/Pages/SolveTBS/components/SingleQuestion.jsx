import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
// import Answers from './Answers'
import {htmlDecode, calculateTime} from '../../../utils/MakeSlug'
// import '../Chapters/math.css';
// import HighlighterComponent from '../../components/HighlighterComponent';

function SingleQuestion({problem, search}) {
    const history = useHistory();
    const params = useParams();
    const manageQuestion = (e) => {
        history.push(`/solve-tbs-update-answer/${params.filter}/${params.page_no}/${e?._id}`)
    }
    // const rejectQuestion = (e) => {
    //     history.push(`/solve-tbs-reject-question/${params.subject_id}/${params.sub_subject_id}/${params.filter}/${params.page_no}/${e?._id}`)
    // }

    let answers = '';
    if(problem?.source == "bartelby"){
        answers = JSON.parse(problem?.answer);
    }else{
        answers = problem?.answer;
    }
    const sortRequested = problem.answerRequestedIds;
    sortRequested.sort(function(a, b){
        var keyA = new Date(a.answerRequestDate),
            keyB = new Date(b.answerRequestDate);
        // Compare the 2 dates
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
    });
    //console.log(sortRequested[0].answerRequestDate, sortRequested.length);
    var utcDate =  sortRequested[0]?.answerRequestDate;// ISO-8601 formatted date returned from server
    console.log(utcDate,);
    var localDate = new Date(utcDate);
    return (
        <>
        <div className="card col-md-12 mb-2" key={problem?.problem_no}>
        <div className="card-title col-md-12 p-0 mb-0" id={problem?.problem_no}> 
            <div className="subject-card-heading pt-2"> 
                <div className="problem_no" >Q.No: <span style={{"color":"green"}}>{problem?.problem_no}</span> </div>
                <div className="problem_no" >ISBN: <span style={{"color":"green"}}>{problem?.book_isbn}</span> </div>
                <div>
                    {params?.filter === 'pending' && sortRequested[0]?.answerRequestDate && (
                        <button className="btn btn-sm bg-warning text-white mr-2">
                            <span id={`${problem?._id}_timer`}>{calculateTime(`${problem?._id}_timer`, localDate.getTime(), 'time-over')}</span>
                        </button>
                    )}
                    {/* <button className="btn btn-sm bg-primary text-white mr-2"
                    onClick={rejectQuestion.bind(this,{_id: problem?._id})}>
                        <span className="fa fa-eye mr-2"></span>Reject Question</button> */}
                    <button className="btn btn-sm dark"
                    onClick={manageQuestion.bind(this,{_id: problem?._id})}>Answer Question</button>
                </div>    
                
            </div>
        </div>
        {problem?.question != '' &&  (

            <div className="card-body" style={{ padding: '0px 0px 10px 0px' }}>
            <hr style={{ padding: '0px', margin: '5px 0px' }}/>            
            <div className="card-text question" id="high" dangerouslySetInnerHTML={{ __html: htmlDecode(problem?.question)  }} />
            {problem?.image && (
                <div style={{ height: '130px', overflow: 'hidden', marginTop: '10px' }}>
                    <img src={problem?.image} />
                </div>
            )}
            {/* {problem?.source === "bartelby" ? (
                <Answers answers={answers} key={problem?.q_id}/>
            ) : (

                <div className="answer" dangerouslySetInnerHTML={{ __html: answers  }} />
            )} */}
                
            </div>
        )}
        
        </div>    
        </>
    )
}

export default SingleQuestion
