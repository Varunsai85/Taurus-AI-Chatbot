import { LoginForm } from "@/components/utils/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex max-h-screen items-center justify-center md:p-10 mt-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Taurus AI
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
