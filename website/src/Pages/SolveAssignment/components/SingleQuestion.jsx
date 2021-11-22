import React from 'react'
import {useHistory, useParams, Link} from 'react-router-dom'
import {htmlDecode, calculateTime1} from '../../../utils/MakeSlug'
import {s3Path} from '../../../Helper/ApiUrl'

// import '../Chapters/math.css';
// import HighlighterComponent from '../../components/HighlighterComponent';

function SingleQuestion({problem, search}) {
    const history = useHistory();
    const params = useParams();
    const manageQuestion = (e) => {
        history.push(`/solve-assignment-update-answer/${params.filter}/${params.subject_id}/${params.sub_subject_id}/${params.page_no}/${e?._id}`)
    }
    // const rejectQuestion = (e) => {
    //     history.push(`/solve-assignment-reject-question/${params.subject_id}/${params.sub_subject_id}/${params.filter}/${params.page_no}/${e?._id}`)
    // }

    let answers = '';
    if(problem?.source == "bartelby"){
        answers = JSON.parse(problem?.answer);
    }else{
        answers = problem?.answer;
    }
    var utcDate =  problem?.deadline_date;// ISO-8601 formatted date returned from server
    var localDate = new Date(utcDate);
    return (
        <>
        <div className="card col-md-12 mb-2" key={problem?.problem_no}>
        <div className="card-title col-md-12 p-0 mb-0" id={problem?.problem_no}> 
            <div className="subject-card-heading pt-2"> 
                <div className="problem_no"><span style={{color:"red"}}>{problem?.payment_status}</span> | <span style={{color:"green"}}>{problem?.subject+"/"+problem?.sub_subject}</span> | <span style={{color:"red"}}>Pages: {problem?.pages}</span> | <span style={{color:"grey"}}>Reference: {problem?.referenceString}</span></div>

                <div>
                    {problem.image0 != "" && 
                        <a href={s3Path + problem.image0} target="_blank" download={problem.image0} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> Download 1</a>
                    }
                    {problem.image1 != "" && 
                        <a href={s3Path + problem.image1} target="_blank" download={problem.image1} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> Download 2</a>
                    }
                    {problem.image2 != "" &&
                        <a href={s3Path + problem.image2} target="_blank" download={problem.image2} className="btn btn-sm bg-secondary text-white mr-2"><i className="fa fa-download"></i> Download 3</a>
                    }
                    {problem.solutionHalf != "" || problem.solutionHalf != "undefined" && <button className="btn btn-sm bg-secondary text-white mr-2">
                        <a href={s3Path + problem.solutionHalf} target="_blank" download={problem.solutionHalf}><i className="fa fa-download"></i> Download Soltuion Half</a>
                    </button>}
                    {problem.solutionFull != "" || problem.solutionFull != "undefined" && <button className="btn btn-sm bg-secondary text-white mr-2">
                        <a href={s3Path + problem.solutionFull} target="_blank" download={problem.solutionFull}><i className="fa fa-download"></i> Download Solution Full</a>
                    </button>}
                    {params?.filter === 'pending' && (
                        <button className="btn btn-sm bg-warning text-white mr-2">
                            <span id={`${problem?._id}_timer`}>{calculateTime1(`${problem?._id}_timer`, localDate.getTime(), 'time-over')}</span>
                        </button>
                    )}
                    {/* <button className="btn btn-sm bg-primary text-white mr-2"
                        onClick={rejectQuestion.bind(this,{_id: problem?._id})} disabled={problem.old_qid ? true : false}>
                        <span className="fa fa-eye mr-2"></span>Reject Question</button> */}
                    <button className="btn btn-sm dark"
                        onClick={manageQuestion.bind(this,{_id: problem?._id})}>Answer Question</button>
                </div>    
            </div>
        </div>
        {problem?.question != '' &&  (

            <div className="card-body" style={{ padding: '0px 0px 10px 0px' }}>
            <hr style={{ padding: '0px', margin: '5px 0px' }}/>            
            <div className="card-text question" id="high" dangerouslySetInnerHTML={{ __html: (problem.question)  }} />
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
