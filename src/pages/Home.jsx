import { Container, Row, Spinner } from "react-bootstrap";
import RepoSearchForm from "../features/issues/RepoSearchForm";
import RepoLinks from "../features/issues/RepoLinks";
import IssueList from "../features/issues/IssueList";
import { useSelector } from "react-redux";
import {
  getAssigned,
  getClosed,
  getStatus,
  getTodos,
} from "../features/issues/issuesSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Home() {
  const isLoading = useSelector(getStatus) === "loading";
  const todos = useSelector(getTodos);
  const assigned = useSelector(getAssigned);
  const closed = useSelector(getClosed);

  useLocalStorage(todos, assigned, closed);

  return (
    <div className="overflow-y-hidden bg-light pt-3" style={{ height: "100vh", width: '100%' }}>
      <Container className=" h-100">
        <RepoSearchForm />
        <RepoLinks />

        {isLoading ? (
          <div className="w-100 text-center pt-5">
            <Spinner />
          </div>
        ) : (
          <Row className="flex-grow-1 mb-5 flex-nowrap">
            <IssueList title="ToDo" issues={todos}></IssueList>
            <IssueList title="In Progress" issues={assigned}></IssueList>
            <IssueList title="Done" issues={closed}></IssueList>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
