import {
  House,
  Users,
  BookmarkSimple,
  Tag,
  User,
  Question,
} from "@phosphor-icons/react";

export const sidebarLinks = [
  { icon: House, route: "/", label: "Home" },
  { icon: Users, route: "/community", label: "Community" },
  { icon: BookmarkSimple, route: "/collection", label: "Collections" },
  { icon: Tag, route: "/tags", label: "Tags" },
  { icon: User, route: "/profile", label: "Profile" },
  { icon: Question, route: "/ask-question", label: "Ask a question" },
];
