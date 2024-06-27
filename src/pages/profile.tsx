import Header from "@/components/custom/header";
import { useUser } from "@/components/custom/user-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountForm } from "@/components/custom/account-form";

export default function Profile() {
  const { user } = useUser();

  return (
    <>
      <div className="min-h-screen">
        <Header></Header>
        {!user && (
          <div className="flex items-center justify-center absolute bottom-0 top-0 w-full bg-background">
            <Card className="max-w-sm">
              <CardHeader className="m-auto text-center">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="6x"
                  className="text-gray-400 mb-4"
                />
                <CardTitle className="text-2xl font-semibold mb-2">
                  You are not logged in
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">Please log in to view your profile.</p>
                <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                  Log In
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        {user && (
          <div className="mx-auto max-w-screen-xl px-2 py-4">
            <div className="pb-4 mb-10 border-secondary border-b-2">
              <h3 className="text-lg font-medium">Account</h3>
              <p className="text-sm text-muted-foreground">
                Update your account settings.
              </p>
            </div>
            <div className="sm:w-2/3 space-y-6 py-4">
              <AccountForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
