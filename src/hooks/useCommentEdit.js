import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useCommentEdit = (id, body, setComments, setShowEditComment) => {
  const [commentBody, setCommentBody] = useState(body);
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.put(`/comments/${id}/`, {
        body: commentBody.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                body: commentBody.trim(),
                updated_at_edited: "edited",
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditComment(false);
      setSuccessToast("Comment Updated");
    } catch (err) {
      setErrors(err.response?.data);
      setFailToast(
        `Unable to update comment (status: ${err.response?.status})`
      );
    }
  };

  return { commentBody, handleChange, handleSubmit, errors };
};

export default useCommentEdit;
