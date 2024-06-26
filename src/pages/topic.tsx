import Header from "@/components/custom/header";
import { Textarea } from "@/components/ui/textarea";
import { TopicReplyType, TopicType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import TopicReply from "@/components/custom/topic-reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "@/components/custom/user-provider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MIN_REPLY_LENGTH = 3;
const MAX_REPLY_LENGTH = 512;

const FormSchema = z.object({
  text: z
    .string()
    .min(MIN_REPLY_LENGTH, {
      message: `Reply must be at least ${MIN_REPLY_LENGTH} characters.`,
    })
    .max(MAX_REPLY_LENGTH, {
      message: `Reply must not be longer than ${MAX_REPLY_LENGTH} characters.`,
    }),
  username: z.string().optional(),
  topicId: z.string().optional(),
});

export default function Topic() {
  const PAGE_SIZE = 5 as const;
  const { topicId } = useParams();

  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [topic, setTopic] = useState<TopicType | null>(null);

  const [replies, setReplies] = useState<TopicReplyType[] | null>(null);

  const [page, setPage] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      toast({
        title: "Not logged in",
        description: `Please login in order to reply to this topics!`,
        variant: "destructive",
      });

      return;
    }

    data.topicId = topicId || "";
    data.username = user.username;

    console.log(data);

    setIsSubmitting(true);

    fetch(`http://localhost:8090/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Reply submitted",
            description: `Successfully replied to this topic`,
          });
          setIsSubmitting(false);
        } else {
          toast({
            title: "Error replying to topic",
            description: `Please try again letter.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
        }
      })
      .catch(() => {
        toast({
          title: "Error submitting!",
          description: `Please retry latter!`,
          variant: "destructive",
        });
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    document.title = "Topic";

    fetch(`http://localhost:8090/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTopic(data);
        setIsLoading(false);

        if (topic) {
          document.title = `Topic ${topic?.title}`;
        }
      });
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      return;
    }

    fetch(
      `http://localhost:8090/replies/${topicId}?page=${page}&pageSize=${PAGE_SIZE}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setReplies(data);
        }
        if (data.length == 0 && page) {
          toast({
            title: "Replies page limit reached!",
            description: `No more replies available for this topic!`,
            variant: "destructive",
          });
          decrementPage();
        }
        setIsLoading(false);
      });
  }, [isSubmitting, page]);

  const incrementPage = () => {
    if (replies && replies?.length < PAGE_SIZE) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  return (
    <>
      <Header></Header>
      <div className="max-w-screen-xl mx-auto p-2">
        {(isLoading || !topic || !replies) && (
          <div className="animate-pulse bg-foreground rounded-lg p-4">
            <h1 className="text-2xl font-bold text-background">Loading...</h1>
          </div>
        )}
        {!isLoading && topic && replies && (
          <>
            <h1 className="text-3xl font-bold"> Topic {topicId} </h1>
            <div>
              <h1> {topic?.title} </h1>
              <p> {topic?.username} </p>
            </div>
            <div>
              <h1> Replies </h1>
              {replies?.length == 0 && (
                <div className="sm:w-2/3 sm:flex p-4 my-4 gap-8 sm:flex-row-reverse justify-end items-center border-2 border-muted  rounded-3xl space-2-y">
                  <div className="w-full">
                    <h2 className="text-2xl">Be the first to comment</h2>
                    <p className="text-gray-500">
                      Nobody's responded to this post yet.
                    </p>
                    <p className="text-gray-500">
                      Add your thoughts and get the conversation going.
                    </p>
                  </div>
                  <FontAwesomeIcon
                    className="w-full m-auto pt-2 sm:w-auto text-muted"
                    size="3x"
                    icon={faComments}
                  />
                </div>
              )}
              {replies?.length > 0 && (
                <>
                  {replies?.map((reply) => (
                    <TopicReply key={reply.id} reply={reply} />
                  ))}
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious onClick={() => decrementPage()} />
                      </PaginationItem>
                      {page > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      {page > 0 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => decrementPage()}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink isActive>{page + 1}</PaginationLink>
                      </PaginationItem>
                      {replies && replies?.length == PAGE_SIZE && (
                        <>
                          <PaginationItem>
                            <PaginationLink onClick={() => incrementPage()}>
                              {page + 2}
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        </>
                      )}
                      {replies && (
                        <PaginationItem>
                          <PaginationNext
                            isActive={replies?.length != PAGE_SIZE}
                            onClick={() => incrementPage()}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-2/3 space-y-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add a reply"
                          className="resize-none rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                      {!replies ||
                        (replies.length == 0 && (
                          <FormDescription></FormDescription>
                        ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  Submit reply
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
