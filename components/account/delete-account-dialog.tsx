import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeleteAccountDialogProps {
  userEmail: string;
  onDelete: () => void;
}

export function DeleteAccountDialog({ userEmail, onDelete }: DeleteAccountDialogProps) {
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleDelete = () => {
    if (emailConfirmation.toLowerCase() !== userEmail.toLowerCase()) {
      setError("Email address doesn't match");
      return;
    }
    onDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>This action cannot be undone. This will permanently delete your
               account and remove your data from our servers.</p>
            <div className="space-y-2">
              <Label htmlFor="email-confirmation">
                Please type your email address to confirm:
              </Label>
              <Input
                id="email-confirmation"
                type="email"
                value={emailConfirmation}
                onChange={(e) => {
                  setEmailConfirmation(e.target.value);
                  setError("");
                }}
                placeholder={userEmail}
                className="mt-2"
              />
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 