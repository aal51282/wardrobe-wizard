"use client";

import { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function RequestResetForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse({ email });
      setIsSubmitting(true);

      // Here you would make an API call to send the reset email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call

      setIsEmailSent(true);
      toast({
        title: "Success",
        description: "Reset password link has been sent to your email",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send reset link. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-[#D4AF37]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-[#D4AF37]">
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEmailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                Please check your email for the password reset link.
              </p>
              <p className="text-sm text-green-600 mt-2">
                If you don't see it, please check your spam folder.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEmailSent(false)}
              className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              Send Another Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 