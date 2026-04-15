import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const cards = [
    { title: "Teams", path: "/teams" },
    { title: "Projects", path: "/projects" },
    { title: "Tasks", path: "/tasks" },
    { title: "Logs", path: "/logs" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;