import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { DragProvider } from "./contexts/DragContext";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000, style: { backgroundColor: "#d0ffcd" } },
          error: { duration: 5000, style: { backgroundColor: "#ffcdd2" } },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
            textAlign: "center",
          },
        }}
      />
      <DragProvider>
        <Home />
      </DragProvider>
    </>
  );
}

export default App;
