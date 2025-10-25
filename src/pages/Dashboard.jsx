import { useState, useEffect } from "react";
import Statistics from "../components/Statistics";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const userTickets = allTickets.filter((t) => t.userId === currentUser.id);
    setTickets(userTickets);
  }, [currentUser.id]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">Dashboard</h1>
      <Statistics tickets={tickets} />
    </div>
  );
}
