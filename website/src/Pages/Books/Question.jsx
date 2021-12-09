import React from "react";
import { useHistory } from "react-router-dom";
import Answers from "./Answers";
import { useParams } from "react-router-dom";
import * as cons from "../../Helper/Cons.jsx";
import axios from "axios";

import "../Chapters/math.css";
// import HighlighterComponent from '../../components/HighlighterComponent';
function download(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
}

function Question({ problem, search }) {
  let API_URL = "";
  if (process.env.NODE_ENV === "development") {
    API_URL = cons.LOCAL_UPLOADS_URL;
  } else {
    API_URL = cons.UPLOADS_URL;
  }
  const params = useParams();

  const history = useHistory();
  const manageQuestion = (e) => {
    history.push(`/books-chapter-add-question/${params.book_id}/${e?.q_id}`);
  };
  const manageQuestionSolutions = (data, e) => {   
    if (data?.problem?.answer) {
      let isFile = data?.problem?.answer.split("-");
      if (isFile[0] === "file") {
        download(API_URL + data?.problem?.answer, data?.problem?.answer);
      } else {
        history.push(
          `/books-chapter-question-upload/${params.book_id}/${data?.q_id}`
        );
      }
    }
  };
  const uploadQuestionSolutions = (e) => {
    history.push(`/books-chapter-question-upload/${params.book_id}/${e?.q_id}`);
  };

  // let answers = '';
  // if(problem?.source == "bartelby"){
  //     answers = JSON.parse(problem?.answer);
  // }else{
  //     answers = problem?.answer;
  // }

  return (
    <>
      <div className="card col-md-12 mb-2" key={problem?.problem_no}>
        <div className="card-title col-md-12 p-0 mb-0" id={problem?.problem_no}>
          <div className="subject-card-heading pt-2">
            <div className="problem_no">Q.No: {problem?.problem_no} </div>
            <div>
              <button
                className="btn btn-sm dark text-white mr-2"
                onClick={uploadQuestionSolutions.bind(this, {
                  q_id: problem?.q_id,
                })}
              >
                <span className="fa fa-upload mr-2"></span>Upload Solution
              </button>
              <button
                className="btn btn-sm bg-primary text-white mr-2"
                onClick={manageQuestionSolutions.bind(this, {
                  q_id: problem?.q_id,
                  problem,
                })}
              >
                <span className="fa fa-eye mr-2"></span>View Solution
              </button>
              <button
                className="btn btn-sm dark"
                onClick={manageQuestion.bind(this, { q_id: problem?.q_id })}
              >
                Manage Question
              </button>
            </div>
          </div>
        </div>
        {/* {console.log(problem)} */}
        {/* {problem?.question != '' &&  ( */}

        <div className="card-body" style={{ padding: "0px 0px 10px 0px" }}>
          <hr style={{ padding: "0px", margin: "5px 0px" }} />

          {problem?.question != "" ? (
            <>
              <div className="problem_no" style={{ display: "inline-block" }}>
                Question:{" "}
              </div>
              <div
                className="card-text question"
                id="high"
                dangerouslySetInnerHTML={{ __html: problem?.question }}
              />
            </>
          ) : (
            <>
              <div className="problem_no" style={{ display: "inline-block" }}>
                Question:{" "}
              </div>
              <span className="fa fa-close" style={{ color: "red" }}>
                {" "}
                <strong> not available</strong>
              </span>
            </>
          )}
          <hr />
          {problem?.image && (
            <div
              style={{ height: "130px", overflow: "hidden", marginTop: "10px" }}
            >
              <img src={problem?.image} />
            </div>
          )}
          {problem?.source === "bartelby" ? (
            <>
              <Answers
                answers={JSON.parse(problem.answer)}
                key={problem?.q_id}
              />
            </>
          ) : (
            <>
              {console.log(problem)}
              <div
                className="answer"
                dangerouslySetInnerHTML={{ __html: problem.answer }}
              />
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default Question;
