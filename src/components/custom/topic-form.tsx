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
import { useUser } from "./user-provider";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const TopicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  username: z.string(),
});

export default function TopicForm({
  setOpen,
  ...props
}: {
  setOpen: (open: boolean) => void;
}) {
  const { user } = useUser();

  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof TopicSchema>>({
    resolver: zodResolver(TopicSchema),
    defaultValues: {
      title: "",
      username: user?.username || "",
    },
  });

  if (!user) {
    return null;
  }

  function onSubmit(values: z.infer<typeof TopicSchema>) {
    setDisabled(true);
    fetch(`http://localhost:8090/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Topic created",
          description: `Successfully created new topic`,
        });
      } else {
        toast({
          title: "Error creating topic",
          description: `Please try again letter.`,
          variant: "destructive",
        });
      }
      setOpen(false);
    });
    setDisabled(false);
  }

  return (
    <Form {...form} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Topic Title" {...field} />
              </FormControl>
              <FormDescription>New topic title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
