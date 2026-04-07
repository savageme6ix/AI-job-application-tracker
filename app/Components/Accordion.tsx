import { useState, createContext, useContext } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// The cn utility for clean class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AccordionContext = createContext<{ openId: string | null; setOpenId: (id: string | null) => void }>({
  openId: null,
  setOpenId: () => {},
});

export const Accordion = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className={cn("w-full space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) => (
  <div className={cn("border rounded-xl overflow-hidden bg-white", className)}>{children}</div>
);

export const AccordionHeader = ({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) => {
  const { openId, setOpenId } = useContext(AccordionContext);
  const isOpen = openId === id;

  return (
    <button
      onClick={() => setOpenId(isOpen ? null : id)}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all"
    >
      <div className="flex items-center gap-4">{children}</div>
      <img
        src="/icons/back.svg"
        className={cn("w-3 h-3 transition-transform duration-300", isOpen ? "rotate-90" : "-rotate-90")}
      />
    </button>
  );
};

export const AccordionContent = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { openId } = useContext(AccordionContext);
  const isOpen = openId === id;

  return (
    <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
      <div className="overflow-hidden">
        <div className="p-4 pt-0 border-t bg-gray-50/30">{children}</div>
      </div>
    </div>
  );
};