export interface UserType {
  email: string;
  username: string;
  name: string;
  password: string;
  role: ["user", "subscriber"];
}

export interface TopicType {
  id: string;
  title: string;
  username: string;
  created: string;
  modified: string;
  views: number;
  replyCount: number;
}

export interface TopicReplyType {
  id: string;
  topicId: string;
  username: string;
  text: string;
  created: string;
  modified: string;
}