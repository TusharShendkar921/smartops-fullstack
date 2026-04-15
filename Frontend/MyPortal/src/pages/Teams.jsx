import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchTeams = async () => {
    try {
      const res = await api.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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
      await api.post("/teams", form);
      setForm({ name: "", description: "" });
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Teams</h2>

        {(role === "ADMIN" || role === "MANAGER") && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
          >
            <input
              type="text"
              name="name"
              placeholder="Team name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Team description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Create Team
            </button>
          </form>
        )}

        <div className="grid gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{team.name}</h3>
              <p className="text-sm text-gray-600">{team.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;