import Header from "@/components/custom/header";
import { SignUpForm } from "@/components/custom/sign-up-form";
import { useUser } from "@/components/custom/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
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

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-screen-sm px-2 py-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to create your account
          </p>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
        <SignUpForm />
      </div>
    </>
  );
}
