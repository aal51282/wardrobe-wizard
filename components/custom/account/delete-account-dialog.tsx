import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface DeleteAccountDialogProps {
  onDelete: () => void;
}

export function DeleteAccountDialog({ onDelete }: DeleteAccountDialogProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const userEmail = session?.user?.email || "No email found";
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (emailConfirmation.toLowerCase() !== userEmail.toLowerCase()) {
      setError("Email address doesn't match");
      return;
    }

    try {
      setIsDeleting(true);
      
      const response = await fetch('/api/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete account');
      }

      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted",
      });

      // Sign out the user
      await signOut({ redirect: false });
      
      // Redirect to home page
      router.push('/');
      
      onDelete();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
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
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 