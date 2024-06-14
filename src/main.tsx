import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/main.tsx";
import "./index.css";
import { ThemeProvider } from "./components/custom/theme-provider.tsx";
import Topic from "./pages/topic.tsx";
import { UserProvider } from "./components/custom/user-provider.tsx";
import Signup from "./pages/signup.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Login from "./pages/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <UserProvider>
          <Home />
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <ThemeProvider>
        <UserProvider>
          <Signup></Signup>
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <ThemeProvider>
        <UserProvider>
          <Login></Login>
        </UserProvider>
      </ThemeProvider>
    ),
  },
  {
    path: "topic/:topicId",
    element: (
      <ThemeProvider>
        <UserProvider>
          <Topic></Topic>
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
