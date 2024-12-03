import React from "react";
import * as AiIcons from "react-icons/ai";
import { isAuthenticated } from "../shared/ProtectedRoute";

// Sidebar Data for default type, i.e. common pages
// To be passed with Navbar
export const SidebarData = [
  {
    title: "User Dashboard",
    path: "/user-dashboard",
    icon: <AiIcons.AiOutlineHome />,
    cName: "Nav-text",
    display: "block",
  },
  {
    title: "Safety Tools",
    path: "/user-dashboard/safety-tools",
    icon: <AiIcons.AiOutlineTool />,
    cName: "Nav-text",
    display: "block",
  },
  {
    title: "Lessons",
    path: "/user-dashboard/safety-tools/lessons-home",
    icon: <AiIcons.AiOutlineBook />,
    cName: "Nav-text",
    display: isAuthenticated() ? "block" : "none",
  },
  {
    title: "Tips",
    path: "/user-dashboard/safety-tools/tips/1",
    icon: <AiIcons.AiOutlinePaperClip />,
    cName: "Nav-text",
    display: "block",
  },
  {
    title: "About",
    path: "/about",
    icon: <AiIcons.AiOutlineLogout />,
    cName: "Nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <AiIcons.AiOutlineLogout />,
    cName: "Nav-text",
    display: isAuthenticated() ? "block" : "none",
  },
];