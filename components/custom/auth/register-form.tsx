"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { User, Mail, Lock } from "lucide-react";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

interface FormErrors {
  [key: string]: string;
}

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      registerSchema.parse(formState);
      setIsSubmitting(true);

      // Here you would make an API call to register the user
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call

      // Show success message briefly before redirect
      setShowSuccess(true);

      // Automatically redirect after a short delay
      setTimeout(() => {
        router.push("/registered-user-view");
      }, 4000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create account. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      icon: <User className="h-4 w-4" />,
      placeholder: "Enter your first name",
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      icon: <User className="h-4 w-4" />,
      placeholder: "Enter your last name",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      icon: <Mail className="h-4 w-4" />,
      placeholder: "Enter your email",
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      icon: <Lock className="h-4 w-4" />,
      placeholder: "Create a password",
      required: true,
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      icon: <User className="h-4 w-4" />,
      placeholder: "Enter a username",
      required: true,
    },
  ];

  return (
    <>
      <Card className="w-full max-w-md border-[#D4AF37]/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#D4AF37]">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {inputFields.map(
              ({ id, label, type, icon, placeholder, required }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id} className="flex items-center">
                    {label}
                    {required && (
                      <span className="text-red-500 ml-1" aria-label="required">
                        *
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {icon}
                    </div>
                    <Input
                      id={id}
                      type={type}
                      value={formState[id as keyof FormState]}
                      onChange={handleInputChange(id as keyof FormState)}
                      className={`pl-10 ${errors[id] ? "border-red-500" : ""}`}
                      placeholder={placeholder}
                      disabled={isSubmitting}
                      required={required}
                      aria-required={required}
                    />
                  </div>
                  {errors[id] && (
                    <p className="text-sm text-red-500">{errors[id]}</p>
                  )}
                </div>
              )
            )}

            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-[#D4AF37] hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome aboard!</AlertDialogTitle>
            <AlertDialogDescription>
              Your account has been created successfully. Redirecting you to
              your dashboard...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push("/registered-user-view")}
              className="bg-[#D4AF37] hover:bg-[#B4941F] text-white"
            >
              Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
