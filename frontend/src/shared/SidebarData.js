import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "User Dashboard",
    path: "/user-dashboard",
    icon: <AiIcons.AiOutlineHome />,
    cName: "Nav-text",
  },
  {
    title: "Safety Tools",
    path: "/user-dashboard/safety-tools",
    icon: <AiIcons.AiOutlineTool />,
    cName: "Nav-text",
  },
  {
    title: "Lessons",
    path: "/user-dashboard/safety-tools/lessons-home",
    icon: <AiIcons.AiOutlineBook />,
    cName: "Nav-text",
  },
  {
    title: "Tips",
    path: "/user-dashboard/safety-tools/tips/1",
    icon: <AiIcons.AiOutlinePaperClip />,
    cName: "Nav-text",
  },
];