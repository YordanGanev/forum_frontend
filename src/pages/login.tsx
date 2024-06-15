import Header from "@/components/custom/header";
import { LoginForm } from "@/components/custom/login-form";
import { useUser } from "@/components/custom/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { user } = useUser();

  const navigate = useNavigate();
  const { toast } = useToast();

  if (user) {
    toast({
      title: "Already logged in",
      description: `Currently logged as ${user?.username}`,
    });

    useEffect(() => {
      navigate("/");
    }, []);
    return (
      <div>
        <h1>Already logged in</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-sm py-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your account details below to login
          </p>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
