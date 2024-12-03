import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

// Sidebar Data for non-default type, specifically Tips page
// To be passed with Navbar
export const SidebarTipData = [
  {
    title: "Phishing Email",
    path: "/user-dashboard/safety-tools/tips/1",
    icon: <AiIcons.AiOutlineMail />,
    cName: "Nav-text",
    display: "block",
  },
  {
    title: "Password Management",
    path: "/user-dashboard/safety-tools/tips/2",
    icon: <AiIcons.AiOutlineLock />,
    cName: "Nav-text",
    display: "block",
  },
  {
    title: "Terms and Conditions",
    path: "/user-dashboard/safety-tools/tips/3",
    icon: <AiIcons.AiOutlineFile />,
    cName: "Nav-text",
  },
  {
    title: "Back to Safety Tools",
    path: "/user-dashboard/safety-tools",
    icon: <AiIcons.AiFillHome />,
    cName: "Nav-text",
    display: "block",
  },
// More tips here
];