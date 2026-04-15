import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Logs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/logs");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Activity Logs</h2>

        <div className="grid gap-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-xl shadow">
              <p><span className="font-semibold">Action:</span> {log.action}</p>
              <p><span className="font-semibold">Entity:</span> {log.entityType}</p>
              <p><span className="font-semibold">Description:</span> {log.description}</p>
              <p><span className="font-semibold">Time:</span> {log.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Logs;