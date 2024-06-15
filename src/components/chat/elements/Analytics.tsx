import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { handleAPIRequest } from "../../../context/ContextFunctions";
import { useAuth } from "../../../context/AuthContext";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const UsersToday = () => {
  const { user } = useAuth();
  const [data, setData] = useState();

  const fetchData = async () => {
    await handleAPIRequest("/api/analytics", {
      usersToday: user,
    })
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, .75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      <h1>As of Today</h1>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export const UsersAnalytics = () => {
  const { user } = useAuth();
  const [data, setData] = useState();

  const fetchData = async () => {
    await handleAPIRequest("/api/analytics", {
      users: user,
    })
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, .75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      <h1>As of {months[new Date().getMonth()]}</h1>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export const MessagesAnalytics = () => {
  const { user } = useAuth();
  const [data, setData] = useState();

  const fetchData = async () => {
    await handleAPIRequest("/api/analytics", {
      messages: user,
    })
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, .75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      <h1>As of {months[new Date().getMonth()]}</h1>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="messages" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};
