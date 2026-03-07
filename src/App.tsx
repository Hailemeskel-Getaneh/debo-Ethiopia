import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { AuthGuard } from "./auth/AuthGuard";
import { GlobalErrorListener } from "./components";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AuthGuard>
            <GlobalErrorListener />
            <AppRoutes />
          </AuthGuard>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
