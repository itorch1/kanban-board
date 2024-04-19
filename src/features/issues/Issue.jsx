import { useDispatch } from "react-redux";
import { useDrag } from "../../contexts/DragContext";
import { subtractDays } from "../../utils/dateHelpers";
import { dropIssue } from "./issuesSlice";

function Issue({ issue, index, type }) {
  const { draggedIssue, dragOverIssue, draggedList, dragOverList } = useDrag();
  const dispatch = useDispatch();

  const createdDaysAgo = subtractDays(
    new Date().toISOString(),
    issue.created_at
  );

  function handleDragEnd() {
    dispatch(dropIssue(draggedIssue, dragOverIssue, draggedList, dragOverList));
  }

  return (
    <div
      className="text-dark border border-2 border-dark rounded bg-light p-3"
      style={{ cursor: "grab" }}
      draggable
      onDragStart={() => {
        draggedIssue.current = index;
        draggedList.current = type;
      }}
      onDragEnter={() => (dragOverIssue.current = index)}
      onDragEnd={handleDragEnd}
    >
      <h4 style={{ fontSize: "18px" }}>{issue.title}</h4>
      <p className="text-secondary d-flex gap-4">
        <span>#{issue.id}</span>
        <span>
          opened {createdDaysAgo > 0 ? `${createdDaysAgo} days ago` : "today"}
        </span>
      </p>
      <p className="text-secondary d-flex gap-3">
        <span>{issue.user}</span>|<span>Comments: {issue.comments}</span>
      </p>
    </div>
  );
}

export default Issue;
