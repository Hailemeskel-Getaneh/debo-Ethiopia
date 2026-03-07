import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthGuard } from "./auth/AuthGuard";

function App() {
  return (
    <ThemeProvider>
      <AuthGuard>
        <AuthProvider>
          <BrowserRouter>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </BrowserRouter>
        </AuthProvider>
      </AuthGuard>
    </ThemeProvider>
  );
}

export default App;
