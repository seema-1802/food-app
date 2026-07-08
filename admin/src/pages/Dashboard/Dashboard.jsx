import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

const Dashboard = ({ url }) => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    latestOrders: [],
    pieData: [],
    monthlyRevenue: [],
    weeklyRevenue: [],
    topProducts: [],
    growth: 0,
  });

  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data || {});
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="skeleton">Loading Dashboard...</div>;

  return (
    <div className={`dashboard ${dark ? "dark" : ""}`}>

      {/* DARK MODE */}
      <button className="dark-btn" onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

     

  {/* ROW 1 - STATS */}
  <div className="row stats-row">
    <div className="card"> <h3>Total Orders</h3>
            <p>{data.totalOrders}</p></div>
    <div className="card"> <h3>Revenue</h3>
            <p>₹{data.totalRevenue}</p>
          </div>
    <div className="card"><h3>Growth</h3>
            <p>{data.growth}%</p></div>
  </div>

  {/* ROW 2 - PIE CHART */}
  <div className="row chart-row">
    <div className="card full">
      <h3>Order Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

  {/* ROW 3 - MONTHLY */}
  <div className="row chart-row">
    <div className="card full">
      <h3>Monthly Revenue</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
    </div>
  </div>

  {/* ROW 4 - BOTTOM */}
  <div className="row bottom-row">

    <div className="card">
        <h3>Latest Orders</h3>
<ul className="list">
  {data.latestOrders?.slice(0, 5).map((order, i) => (
    <li key={i} className="list-item">
      <span className="item-name">
        {order.items?.[0]?.name || "Unknown Item"}
      </span>

      <span className="item-price">₹{order.amount}</span>
    </li>
  ))}
</ul>
    </div>

    <div className="card">
       <h3>Top Products</h3>
       <ul className="list">
  {data.topProducts?.slice(0, 5).map((p, i) => (
    <li key={i} className="list-item">
      <span className="item-name">{p.name}</span>
      <span className="item-badge">{p.sold} sold</span>
    </li>
  ))}
</ul>
    </div>

  </div>

</div>

  );
};

export default Dashboard;