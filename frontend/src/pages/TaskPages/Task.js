import useAuth from "../../authentication/hook/useAuth";
import CommentsPanel from "../../components/Comment/CommentsPanel";
import TwoComponentPageLayout from "../../components/TwoComponentPageLayout";
import Spinner from "../../components/Spinner";
import TaskDetails from "../../components/Task/TaskDetails";
import { useParams } from "react-router-dom";

const Task = () => {
  debugger;
  let { taskId } = useParams();
  const [auth, authDispatch, history] = useAuth();

  return (
    <TwoComponentPageLayout
      main={
        <TaskDetails
          id={taskId}
          authDispatch={authDispatch}
          loggedInUser={auth.data}
        ></TaskDetails>
      }
      secondary={
        <CommentsPanel
          loggedInUser={auth.data}
          authDispatch={authDispatch}
          commentsSource={"task-comments/"}
          id={taskId}
        ></CommentsPanel>
      }
    ></TwoComponentPageLayout>
  );
};

export default Task;