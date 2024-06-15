"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { useState } from "react";
import { UserType } from "@/lib/types";
import { useUser } from "./user-provider";
import { useNavigate } from "react-router-dom";

const SignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function LoginForm() {
  const FAIL_TOAST = {
    title: "Failed to login",
    description: `Please try again letter.`,
  } as const;

  const SUCCESS_TOAST = (name: string) => ({
    title: "Successfully logged in",
    description: `Welcome, ${name}!`,
  });

  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const { login } = useUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setDisabled(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    fetch(`http://localhost:8090/users/${values.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log;
        res
          .json()
          .then((data: UserType) => {
            if (data.password === values.password) {
              toast(SUCCESS_TOAST(data.name));
              login(data);
              navigate("/");
            } else {
              toast(FAIL_TOAST);
            }
          })
          .catch(() => {
            toast(FAIL_TOAST);
          });
      }
    });
    setDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Username of registered user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Secure password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Password of registrated user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
