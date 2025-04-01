// src/app.tsx
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./auth/components/AuthContext";
import { getaccountAPI } from "./api/api";

// ADD:
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* App content */}
    </div>
  const { auth, setAuth } = useAuth();
  const [appLoading, setAppLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setAppLoading(false);
        return; // No token means no authentication, stop execution
      }

      try {
        const response = await getaccountAPI(); // Fetch user data
        setAuth({
          isAuthenticated: true,
          user: {
            email: response.user.email,
            name: response.user.name || response.user.email, // Fallback to email if name is missing
          },
        });
      } catch (error) {
        console.error("Failed to fetch user account:", error);
        setAuth({ isAuthenticated: false, user: { email: "", name: "" } });
      } finally {
        setAppLoading(false); // Ensure loading state ends
      }
    };

    fetchUser();
  }, [setAuth]);

  return (
    <>
      <AppRoutes />
      {/* Add ToastContainer so toast notifications can appear */}
      <ToastContainer />
    </>
  );
  return (
    <>
      {appLoading ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <h2 className="text-xl font-semibold text-blue-600">Loading your dashboard...</h2>
        </div>
      ) : (
        <>
          <AppRoutes />
          <ToastContainer />
        </>
      )}
    </>
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      {appLoading ? (
        <div className="flex items-center justify-center h-screen">
          <h2 className="text-xl font-semibold text-blue-600">Loading...</h2>
        </div>
      ) : (
        <>
          <AppRoutes />
          <ToastContainer />
        </>
      )}
    </div>
  );

}

export default App;
