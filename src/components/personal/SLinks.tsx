import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ISlinks {
  handleClickButton: () => void;
  text: string;
}

export default function SidebarLinks({ handleClickButton, text }: ISlinks) {
  return (
    <Button onClick={handleClickButton} className="flex gap-4 items-center justify-center text-lg p-6 transition hover:bg-zinc-700/80">
      {text}
      <PlusIcon />
    </Button>
  );
}
