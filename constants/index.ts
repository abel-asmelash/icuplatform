import {
  House,
  Users,
  BookmarkSimple,
  Tag,
  
  Question,
} from "@phosphor-icons/react";

export const sidebarLinks = [
  { icon: House, route: "/", label: "Home" },
  { icon: Users, route: "/community", label: "Community" },
  { icon: BookmarkSimple, route: "/collection", label: "Collections" },
  { icon: Tag, route: "/tags", label: "Tags" },
   
  { icon: Question, route: "/ask-question", label: "Ask a question" },
];
