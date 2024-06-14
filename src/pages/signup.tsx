import Header from "@/components/custom/header";
import { useUser } from "@/components/custom/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Header></Header>
    </>
  );
}
