import { History, Menu, Settings, Zap } from "lucide-react";

export const WEBHOOK_BASE_URL = "http://localhost:3001";
export const OAUTH_GMAIL = "http://localhost:3000/api/v1/oauth2/gmail";

export const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: Menu,
  },
  {
    to: "zaps",
    label: "Zaps",
    icon: Zap,
  },
  {
    to: "history",
    label: "History",
    icon: History,
  },
  {
    to: "settings",
    label: "Settings",
    icon: Settings,
  },
];
