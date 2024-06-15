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
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);

  const [topicsLoading, setTopicsLoading] = useState(true);

  const [topics, setTopics] = useState<TopicType[] | null>(null);

  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetch("http://localhost:8080/topics?=page=0&pageSize=55")
      .then((res) => res.json())
      .then((data: TopicType[]) => {
        console.log(data);
        setTopics(data);
      })
      .catch((err) => {
        console.error(err);
      });

    setTopicsLoading(false);
  }, [open === false]);

  return (
    <>
      <Header></Header>
      <div className="max-w-screen-xl mx-auto py-2">
        <div className="">
          <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>
        </div>
        <div className="flex flex-col gap-4 py-4">
          {!topicsLoading &&
            topics?.map((topic: TopicType) => {
              return <TopicCard topic={topic} key={topic.id} />;
            })}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {page > 0 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setPage(() => page - 1);
                  }}
                  href="#"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive href="#">
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{page + 2}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new topic</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <TopicForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
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
