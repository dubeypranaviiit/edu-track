"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "secondary" | "outline" | "ghost" | "link";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="mt-2 text-slate-500 dark:text-slate-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              {cancelText}
            </Button>
          </DialogClose>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
