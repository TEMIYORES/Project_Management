import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex flex-column justify-content-center align-items-left">
            <h5 className="card-title text-uppercase">{project.name}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <span className="font-weight-bold text-capitalize">
                By: <strong>{project.client.name}</strong>
              </span>
              <a href={`/projects/${project.id}`} className="btn btn-primary">
                View
              </a>
            </div>
            <p className="small">
              Status:{" "}
              <strong
                className={
                  project.status == "Completed"
                    ? "text-success"
                    : project.status == "In Progress"
                    ? "text-warning"
                    : "text-dark"
                }
              >
                {project.status}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
