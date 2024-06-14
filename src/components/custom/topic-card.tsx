import { TopicType } from "@/lib/types";

export default function TopicCard({ topic, ...props }: { topic: TopicType }) {
  return (
    <div className=" border shadow rounded-md p-2 w-full mx-auto" {...props}>
      <h2 className="text-xl font-bold">{topic.title}</h2>
      <p className="text-gray-300">{topic.username}</p>
      <p className="text-gray-500">{topic.created}</p>
    </div>
  );
}
