import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
      toast.success("New Project Added Successfully!");
    },
  });
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!name || !description || !clientId)
      return alert("all fields are required!");

    addProject(name, description, clientId);

    setName("");
    setDescription("");
    setClientId("");
  };
  if (loading) return <Spinner />;
  if (error) return "Something went wrong";

  return (
    !loading &&
    !error && (
      <>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProject"
        >
          <div className="d-flex align-items-center">
            <FaList className="icon" /> <span>Add Project</span>
          </div>
        </button>
        <div
          class="modal fade"
          id="addProject"
          tabindex="-1"
          aria-labelledby="addProjectLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addProjectLabel">
                  Add New Project
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={SubmitHandler}>
                  <input
                    type="name"
                    id="name"
                    className="form-control"
                    placeholder="Name of project"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <select
                    type="client"
                    id="client"
                    className="form-select my-2"
                    placeholder="Name of project"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value={""} disabled>
                      select client
                    </option>
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
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    data-bs-dismiss="modal"
                  >
                    Add Project
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
