import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { useUser } from "./user-provider";

export default function Header() {
  const navigate = useNavigate();

  const { user, isLoading } = useUser();

  return (
    <header className={"sticky top-0 w-100vw p-2 bg-secondary z-50"}>
      <div
        className={
          "w-100% max-w-screen-xl my-0 mx-auto  flex justify-between items-center"
        }
      >
        {isLoading && (
          <>
            <div>
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex gap-4 p-1 items-center">
              <ModeToggle></ModeToggle>
              <div>
                <svg
                  className="animate-spin h-7 w-5 mr-3 rounded-full border-t-4 border-primary"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            </div>
          </>
        )}
        {user && !isLoading && (
          <>
            <div>
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex gap-4 p-1 items-center">
              <ModeToggle></ModeToggle>
              <UserNav user={user} />
            </div>
          </>
        )}
        {!user && !isLoading && (
          <>
            <div>
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex gap-4 p-1">
              <ModeToggle></ModeToggle>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
