import { Card, Col } from "react-bootstrap";
import Issue from "./Issue";
import { useDrag } from "../../contexts/DragContext";
import { useRef } from "react";

function IssueList({ title, issues }) {
  const { dragOverList } = useDrag();
  const ref = useRef();

  function handleDragLeave(e) {
    if (ref.current !== e.target) return;
    dragOverList.current = null;
  }

  // Determine type based on title
  const type =
    title === "ToDo"
      ? "todos"
      : title === "In Progress"
      ? "assigned"
      : "closed";

  return (
    <Col className="d-flex flex-column align-items-center col-md-4">
      <h3 className="text-dark">{title}</h3>
      <Card
        ref={ref} 
        className="mt-3 w-100 bg-secondary border-3 border-dark h-100"
        onDragEnter={() => (dragOverList.current = type)}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
      >
        <Card.Body
          className="d-flex flex-column gap-3 overflow-scroll"
          style={{ height: "calc(100vh - 248px)" }}
        >
          {issues &&
            issues.map((issue, index) => (
              <Issue issue={issue} index={index} type={type} key={issue.id} />
            ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default IssueList;
