import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignupForm({ className, ...props }) {
  const { isSigningUp, signup, googleLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("First Name is required");
    if (!formData.lastName.trim()) return toast.error("Last Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must have atleast 6 characters");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email address");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      try {
        await signup(formData);
      } catch (error) {
        toast.error(error.response?.data?.message || "signup failed");
      }
    }
  };

  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormData({ ...formData, [name]:value});
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button" onClick={googleLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="firstName"
                      placeholder="John"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="lastName"
                      placeholder="m@example.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="current-email"
                    placeholder="m@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword?"text":"current-password"}
                      required
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      className={
                        "absolute inset-y-0 right-0 hover:bg-primary/0"
                      }
                      onClick={()=>setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="size-5"/> : <Eye className="size-5"/>}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                      <Loader2 className="animate-spin size-5"/> Signing up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
