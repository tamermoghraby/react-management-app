import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/dashboard";
import Navbar from "./scenes/global/Navbar";
import { registerLicense } from "@syncfusion/ej2-base";
import Departments from "./scenes/departments/departments";
import SignupForm from "./components/SignupForm";
import SignIn from "./scenes/signin/SignIn";
import Team2 from "./scenes/team/team2";

function App() {
  const [user, setUser] = useState(null);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  registerLicense(
    "MTY3NDk4OEAzMjMxMmUzMTJlMzMzNUlZcFpCWEh6UXIwbURKb0dBd2pVMHEvNTFMMVZhN294eDdFZW1ORDJ1eWc9;Mgo+DSMBaFt+QHFqVkNrWE5FcUBAXWFKblF8RmBTfFhgFChNYlxTR3ZbQ11iTX1QdUNlWXxd;Mgo+DSMBMAY9C3t2VFhhQlJBfVtdXGRWfFN0RnNbdV1zflZAcDwsT3RfQF5jTX9Td0FgWnxYdnVcRQ==;Mgo+DSMBPh8sVXJ1S0d+X1RPckBDWnxLflF1VWFTfF16d1NWACFaRnZdQV1nSH5SckZgWnlYc3NW;MTY3NDk5MkAzMjMxMmUzMTJlMzMzNVlINDFTN0pNNW4vMklEdE5lWklYRzNFM1pyOUFDRHZlbWVqeWoxcWZsMEU9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RGQmJOYVF2R2BJfVRzd19FZkwxOX1dQl9gSXpSdkRnWnxddnJdQ2M=;ORg4AjUWIQA/Gnt2VFhhQlJBfVtdXGRWfFN0RnNbdV1zflZAcDwsT3RfQF5jTX9Td0FgWnxYd3RXRQ==;MTY3NDk5NUAzMjMxMmUzMTJlMzMzNVFaNXNSQ3RMUTlvc0dhczYwZGdxcjFERlNiRk4zcW9TRXRFQW15SkduWEE9;MTY3NDk5NkAzMjMxMmUzMTJlMzMzNVBLUW5jUnYwWTdzMTJRdXpYNDlTZzhHMWxjc0c5NldZVEYwWVF3NjJRdFU9;MTY3NDk5N0AzMjMxMmUzMTJlMzMzNVNDVUhsRmo4VjliNW9DV1EzcmljNHkvWm5TWDZsVjcrWkN5U3NHcUVFdUE9;MTY3NDk5OEAzMjMxMmUzMTJlMzMzNUt6N1o4cldCVHBJNE9ZOVRqdytYNCtpcWdzTzVMTlk2MVRkNVNXVytKR3M9;MTY3NDk5OUAzMjMxMmUzMTJlMzMzNUlZcFpCWEh6UXIwbURKb0dBd2pVMHEvNTFMMVZhN294eDdFZW1ORDJ1eWc9"
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {location.pathname === "/signin" ||
          location.pathname === "/" ||
          location.pathname === "/signup" ? null : (
            <ProSidebarProvider>
              <Navbar />
            </ProSidebarProvider>
          )}

          <main className="content">
            {location.pathname === "/signin" ||
            location.pathname === "/" ||
            location.pathname === "/signup" ? null : (
              <Topbar setIsSidebar={setIsSidebar} />
            )}

            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team2 isHeader={true} />} />
              <Route
                path="/departments"
                element={<Departments isHeader={true} />}
              />
              {/* <Route
                path="/userCard2"
                element={
                  <RequireAuth loginPath="/signin">
                    <UserCard2 />
                  </RequireAuth>
                }
              /> */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
