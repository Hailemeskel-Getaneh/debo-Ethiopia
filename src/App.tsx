import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
