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
import { TopicType } from "@/lib/types";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);

  const [topicsLoading, setTopicsLoading] = useState(true);

  const [topics, setTopics] = useState<TopicType[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/topics")
      .then((res) => res.json())
      .then((data: TopicType[]) => {
        console.log(data);
        setTopics(data);
      })
      .catch((err) => {
        console.error(err);
      });

    setTopicsLoading(false);
  }, []);

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
    </>
  );
}
