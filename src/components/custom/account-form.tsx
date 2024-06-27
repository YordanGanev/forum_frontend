import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUser } from "./user-provider";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { user } = useUser();
  const [disabled, setDisabled] = useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  if (!user) {
    return null;
  }

  function onSubmit(data: AccountFormValues) {
    setDisabled(true);
    fetch(`http://localhost:8090/users/${user?.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Account information updated",
          description: `Successfully updated your account information.`,
        });
        form.reset({
          name: "",
          email: "",
        });
      } else {
        toast({
          title: "Error creating topic",
          description: `Please try again letter.`,
          variant: "destructive",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be used for account recovery and
                notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled} type="submit">
          Update account
        </Button>
      </form>
    </Form>
  );
}
