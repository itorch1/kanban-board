import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchIssues, fetchRepoData, setData } from "./issuesSlice";

function RepoSearchForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    // if data exists in storage, load. Otherwise fetch from api
    if (localStorage.getItem(repoUrl)) {
      const data = JSON.parse(localStorage.getItem(repoUrl));
      dispatch(setData(data));
      dispatch(fetchRepoData(repoUrl));
      return;
    }
    dispatch(fetchIssues(repoUrl));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col xs="auto" className="flex-grow-1">
          <Form.Group controlId="repoSearch">
            <Form.Control
              placeholder="Enter Repo URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Load Issues
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RepoSearchForm;
