import { timePastDateString } from "@/hooks/time-past-date";
import { TopicType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarImage } from "@/hooks/avatar-ref";
import {
  faCalendar,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import IconAccent from "./icon-accent";

export default function TopicCard({ topic, ...props }: { topic: TopicType }) {
  return (
    <div className="border shadow rounded-md p-3 w-full mx-auto" {...props}>
      <Link to={`topic/${topic.id}`}>
        <h2 className="text-xl font-bold pb-4">{topic.title}</h2>
      </Link>
      <div className="md:grid lg:gap-3 md:grid-cols-5 lg:grid-cols-8">
        <div className="col-span-2 flex gap-2 items-center">
          <Avatar className="h-7 w-7">
            <AvatarImage src={getAvatarImage(topic.username)} alt="@shadcn" />
            <AvatarFallback>{topic.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p className="opacity-80">{topic.username}</p>
        </div>
        <IconAccent text={topic.views.toString()} icon={faEye} />
        <IconAccent text={topic.replyCount.toString()} icon={faComment} />
        <IconAccent
          text={new Date(topic.created).toDateString()}
          icon={faCalendar}
        />
      </div>

      <p className="text-gray-500 pt-1">
        {timePastDateString(new Date(topic.created))}
      </p>
    </div>
  );
}
