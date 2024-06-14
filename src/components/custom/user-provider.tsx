import { UserType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

type UserProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type UserProviderState = {
  user: UserType | null;
  isLoading: boolean;
  login: (user: UserType) => void;
  logout: () => void;
};

const initialState: UserProviderState = {
  user: null,
  isLoading: false,
  login: () => null,
  logout: () => null,
};

const UserProviderContext = createContext<UserProviderState>(initialState);

export function UserProvider({
  children,
  storageKey = "user",
  ...props
}: UserProviderProps) {
  const getUserFromLocalStorage = (): UserType | null => {
    const storedUser = localStorage.getItem(storageKey);
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as UserType;
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState<UserType | null>(() =>
    getUserFromLocalStorage()
  );
  const [isLoading, setIsLoading] = useState(false);

  function login(user: UserType) {
    setIsLoading(true);
    fetch(`http://localhost:8080/users/${user.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data: UserType) => {
        console.log(data);
        localStorage.setItem(storageKey, JSON.stringify(user));
        setUser(() => user);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsLoading(false);
  }

  function logout() {
    setIsLoading(true);
    localStorage.removeItem(storageKey);
    setUser(null);
    setIsLoading(false);
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <UserProviderContext.Provider {...props} value={value}>
      {children}
    </UserProviderContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserProviderContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};
