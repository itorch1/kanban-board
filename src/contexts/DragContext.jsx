import { createContext, useContext, useRef } from "react";

const DragContext = createContext();

function DragProvider({ children }) {
  const draggedIssue = useRef();
  const dragOverIssue = useRef();
  const draggedList = useRef();
  const dragOverList = useRef();

  return (
    <DragContext.Provider
      value={{ draggedIssue, dragOverIssue, draggedList, dragOverList }}
    >
      {children}
    </DragContext.Provider>
  );
}

function useDrag() {
  const context = useContext(DragContext);
  if (context === undefined)
    throw new Error("DragContext was used outside of DragProvider");
  return context;
}

export { DragProvider, useDrag };
