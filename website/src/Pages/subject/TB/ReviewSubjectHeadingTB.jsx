import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Switch from "react-switch";

import { Button } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import * as cons from "../../../Helper/Cons.jsx";
import { useMutation, useQueryClient } from "react-query";
import { useToasts } from "react-toast-notifications";

function ReviewSubjectHeadingTB({ review, flag }) {
  const history = useHistory();
  const params = useParams();
  const { addToast } = useToasts();

  const handleUpdate = async (id) => {
    // history.push(`/book-rating-review/${params.isbn}/${params.book_id}/${id}`);
  };

  const { state } = useContext(AuthContext);

  let API_URL = "";
  if (process.env.NODE_ENV === "development") {
    API_URL = cons.LOCAL_API_URL;
  } else {
    API_URL = cons.LIVE_API_URL;
  }
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.access_token,
    },
  };

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  let deleteMutation ;
  console.log('flag',flag)
  if (flag == "subject") {
     deleteMutation = useMutation(
      (formData) => {
        return axios.delete(
          `${API_URL}subject/delete-review/${params.id}/${formData.review_id}`,
          options
        );
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["reviews", params.id]);
          addToast("Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        },
      }
    );
  } else {
     deleteMutation = useMutation(
      (formData) => {
        return axios.delete(
          `${API_URL}sub-subject/delete-review/${params.id}/${formData.review_id}`,
          options
        );
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["reviews", params.id]);
          addToast("Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        },
      }
    );
  }

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteMutation.mutate({ review_id: id });
  };

  return (
    <div className="subject-card-heading">
      <div>
        {/* <Switch
                    onChange={handleChange.bind(this,{review_id: review._id,status: !checked})}
                    checked={review.status ? review.status: checked}
                    className="react-switch mr-2"
                    height={20}
                    width={48}
                    handleDiameter={22}
                    onHandleColor="#f00"
                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.5)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                /> */}
      </div>
      <div>
        {/* <Button className="delBtn mr-2 ml-2" title="Update Review" onClick={handleUpdate.bind(this,review._id)}>
                    <span className="fa fa-pencil-square-o text-secondary mr-2"></span>
                </Button> */}

        <Button
          className="delBtn ml-2 mr-2"
          title="Delete Review"
          onClick={handleDelete.bind(this, review._id)}
        >
          {loading ? (
            <span className="fa fa-spinner text-danger mr-2"></span>
          ) : (
            <span className="fa fa-trash text-danger mr-2"></span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ReviewSubjectHeadingTB;
