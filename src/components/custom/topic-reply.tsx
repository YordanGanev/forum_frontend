import { TopicReplyType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarImage } from "@/hooks/avatar-ref";
import { timePastDateString } from "@/hooks/time-past-date";

export default function TopicReply({
  reply,
  ...props
}: {
  reply: TopicReplyType;
}) {
  return (
    <div className="last:border-0 border-separate py-4 flex gap-3" {...props}>
      <Avatar className="w-20 h-20">
        <AvatarImage src={getAvatarImage(reply.username)}></AvatarImage>
        <AvatarFallback>{reply.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="flex justify-between text-gray-500 ">
          <div className="flex flex-col pb-3">
            <span className="font-bold text-xl">{reply.username}</span>
            <span>{timePastDateString(new Date(reply.created))}</span>
          </div>
          <span>{new Date(reply.created).toDateString()}</span>
        </div>
        <p>{reply.text}</p>
      </div>
    </div>
  );
}
