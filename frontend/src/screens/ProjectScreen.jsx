import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECT } from "../queries/projectQueries";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const ProjectScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  if (error) return <p className="lead">Something went wrong!</p>;
  if (loading) return <Spinner />;
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link
            to="/"
            className="btn btn-primary btn-sm w-25 d-inline ms-auto p-2"
          >
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <div className="mt-3">
            <span className="mt-3">Project Status: </span>
            <strong
              className={
                data.project.status == "Completed"
                  ? "text-success "
                  : data.project.status == "In Progress"
                  ? "text-warning"
                  : "text-dark"
              }
            >
              {data.project.status}
            </strong>
          </div>
          <ClientInfo client={data.project.client} />
          <EditProjectForm project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
};

export default ProjectScreen;
