import { TopicReplyType } from "@/lib/types";

export default function TopicReply({
  reply,
  ...props
}: {
  reply: TopicReplyType;
}) {
  return <div {...props}>topic-reply: {reply.text}</div>;
}
