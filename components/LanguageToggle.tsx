"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const temporaryMessage = () => {
    toast.info(
      "Translation support is currently in development. This functionality will be available with our upcoming release.",
    );
  };

  return (
    <Button
      onClick={temporaryMessage}
      variant="outline"
      size="icon"
      className="shrink-0"
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Change language</span>
    </Button>
  );
};

export default LanguageToggle;
