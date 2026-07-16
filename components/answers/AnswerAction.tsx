"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Props {
  onEdit: () => void;
  onDeleteClick: () => void;
}

const AnswerActions = ({ onEdit, onDeleteClick }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const triggerButton = (
    <button className="flex items-center justify-center rounded-full p-2 text-dark400_light700 hover:bg-light-800 hover:text-dark-300 dark:hover:bg-dark-400 dark:hover:text-light-800 transition-colors">
      <MoreVertical size={16} />
    </button>
  );

  return isDesktop ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" collisionPadding={16} avoidCollisions>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil size={14} className="mr-2" />
          Bewerken
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onDeleteClick();
          }}
          className="text-red-500 focus:text-red-500"
        >
          <Trash2 size={14} className="mr-2" />
          Verwijderen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Antwoord opties</DrawerTitle>
        <div className="flex flex-col gap-1 p-4 pb-8">
          <button
            onClick={() => {
              setDrawerOpen(false);
              onEdit();
            }}
            className="flex items-center gap-3 rounded-md p-3 text-left text-base text-dark200_light900 hover:bg-light-800 dark:hover:bg-dark-400"
          >
            <Pencil size={18} />
            Bewerken
          </button>
          <button
            onClick={() => {
              setDrawerOpen(false);
              onDeleteClick();
            }}
            className="flex items-center gap-3 rounded-md p-3 text-left text-base text-red-500 hover:bg-light-800 dark:hover:bg-dark-400"
          >
            <Trash2 size={18} />
            Verwijderen
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AnswerActions;
