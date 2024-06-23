import AddPostButton from "@/components/custom/add-post-button";
import Header from "@/components/custom/header";
import TopicCard from "@/components/custom/topic-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TopicType } from "@/lib/types";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import TopicForm from "@/components/custom/topic-form";
import { useUser } from "@/components/custom/user-provider";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const PAGE_SIZE = 5 as const;

  const [page, setPage] = useState(0);

  const [topicsLoading, setTopicsLoading] = useState(true);

  const [topics, setTopics] = useState<TopicType[] | null>(null);

  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const incrementPage = () => {
    if (topics && topics?.length < PAGE_SIZE) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  useEffect(() => {
    if (open) return; // Don't fetch if the component is 'open'
    setTopicsLoading(true);
    fetch(`http://localhost:8090/topics?page=${page}&pageSize=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data: TopicType[]) => {
        console.log(data);
        setTopics(data);
        setTopicsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setTopicsLoading(false);
      });
  }, [open, page]);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <Header></Header>
      <div className="max-w-screen-xl mx-auto p-2">
        <div className="flex flex-col gap-4 py-4">
          {topicsLoading && (
            <div className="animate-pulse bg-foreground rounded-lg p-4">
              <h1 className="text-2xl font-bold text-background">Loading...</h1>
            </div>
          )}
          {!topicsLoading &&
            topics?.map((topic: TopicType) => {
              return <TopicCard topic={topic} key={topic.id} />;
            })}
          {topics && topics?.length == 0 && (
            <div className="bg-foreground rounded-lg p-4">
              <h1 className="text-2xl font-bold text-background">
                No topics found
              </h1>
            </div>
          )}
        </div>
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
            {topics && topics?.length == PAGE_SIZE && (
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
            {topics && (
              <PaginationItem>
                <PaginationNext
                  isActive={topics?.length != PAGE_SIZE}
                  onClick={() => incrementPage()}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new topic</DialogTitle>
              <DialogDescription>
                Create a new topic to share with the community. Topic is
                discoverable by other users by its title.
              </DialogDescription>
            </DialogHeader>
            <TopicForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="p-4">
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Click to submit when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <TopicForm setOpen={setOpen} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <AddPostButton
        onClick={() => {
          if (!user) {
            toast({
              title: "Not logged in",
              description: `Please login in order to create new topics!`,
              variant: "destructive",
            });

            navigate("/login");

            return;
          }
          setOpen(() => true);
        }}
      />
    </>
  );
}
