import React, { useState } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { UPDATE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECT } from "../queries/projectQueries";
import { toast } from "react-toastify";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState(project.status);
  const [description, setDescription] = useState(project.description);
  const [clientId, setClientId] = useState(project.client.id);
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: name,
      description: description,
      clientId: clientId,
      status: status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    onCompleted: () => {
      toast.success("Edit Saved!");
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      name === project.name &&
      description === project.description &&
      status === project.status &&
      clientId === project.client.id
    )
      return alert("Nothing to update");

    updateProject(name, description, clientId, status);
  };
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    !loading &&
    !error && (
      <div className="mt-5">
        <h3 className="mb-2">Edit Project Details</h3>
        <form onSubmit={submitHandler}>
          <input
            type="name"
            id="name"
            className="form-control"
            placeholder="Name of project"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            id="client"
            className="form-select my-2"
            placeholder="Name of project"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            {data.clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <textarea
            type="description"
            id="description"
            rows={6}
            className="form-control"
            placeholder="Description of project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            id="status"
            className="form-select my-2"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"Not Started"}>Not Started</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            data-bs-dismiss="modal"
          >
            Save Edit
          </button>
        </form>
      </div>
    )
  );
};

export default EditProjectForm;
