import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TaskSnippet from "./TaskSnippet";

import "../../styles/spinner.css";
import "../../styles/feed.css";
import axiosInstance from "../../utils/axiosInstance";
import useAuth from "../../authentication/hook/useAuth";

const Feed = ({ text, loggedInUser }) => {
  const [auth, authDispatch, history] = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    debugger;
    try {
      let res = await axiosInstance(authDispatch, history).get(`/task/${text}`);
      setTasks([...res.data]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTasks();
  }, [text]);

  return (
    <Container fluid>
      {loading && <div className="loader">Loading...</div>}
      {!loading &&
        tasks.map((task) => {
          return (
            <TaskSnippet
              key={task.taskId}
              task={task}
              loggedInUser={loggedInUser}
            ></TaskSnippet>
          );
        })}
    </Container>
  );
};

export default Feed;