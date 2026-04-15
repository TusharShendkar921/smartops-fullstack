import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    deadline: "",
    projectId: "",
    assignedToUserId: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();

    if (role === "ADMIN") {
      fetchUsers();
    }
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
      await api.post("/tasks", {
        ...form,
        projectId: Number(form.projectId),
        assignedToUserId: Number(form.assignedToUserId),
      });

      setForm({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        deadline: "",
        projectId: "",
        assignedToUserId: "",
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status?status=${status}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>

        {(role === "ADMIN" || role === "MANAGER") && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
          >
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Task description"
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
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select
              name="assignedToUserId"
              value={form.assignedToUserId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Assign user</option>
              {users.map((userItem) => (
                <option key={userItem.id} value={userItem.id}>
                  {userItem.name} - {userItem.email}
                </option>
              ))}
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Create Task
            </button>
          </form>
        )}

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm">Status: {task.status}</p>
              <p className="text-sm">Priority: {task.priority}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(task.id, "TODO")}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  TODO
                </button>
                <button
                  onClick={() => updateStatus(task.id, "IN_PROGRESS")}
                  className="px-3 py-1 bg-yellow-200 rounded"
                >
                  IN_PROGRESS
                </button>
                <button
                  onClick={() => updateStatus(task.id, "DONE")}
                  className="px-3 py-1 bg-green-200 rounded"
                >
                  DONE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;