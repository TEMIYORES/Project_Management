import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  return (
    <>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h3>Projects</h3>
        <AddProjectModal />
      </div>
      {data.projects.length !== 0 ? (
        <div className="row mt-3">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects...</p>
      )}
    </>
  );
};

export default Projects;
