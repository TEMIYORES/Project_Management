import { useMutation } from "@apollo/client";
import React from "react";
import { GrStatusWarning } from "react-icons/gr";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      toast.error("Project deleted!");
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <button
      className="btn btn-danger w-25 mt-5 d-flex align-items-center justify-content-center"
      onClick={deleteProject}
    >
      <GrStatusWarning
        className="icon text-primary"
        style={{ stroke: "#fff" }}
      />{" "}
      Delete Project
    </button>
  );
};

export default DeleteProjectButton;
