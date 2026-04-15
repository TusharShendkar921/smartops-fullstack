import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "PLANNED",
    deadline: "",
    teamId: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        ...form,
        teamId: Number(form.teamId),
      });

      setForm({
        name: "",
        description: "",
        status: "PLANNED",
        deadline: "",
        teamId: "",
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>

        {(role === "ADMIN" || role === "MANAGER") && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
          >
            <input
              type="text"
              name="name"
              placeholder="Project name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Project description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="PLANNED">PLANNED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <select
              name="teamId"
              value={form.teamId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Create Project
            </button>
          </form>
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p className="text-sm">Status: {project.status}</p>
              <p className="text-sm">Deadline: {project.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;