export interface UserObject {
  _id: string;
  name: string;
}

export interface MessageObject {
  sender: UserObject;
  recipient: UserObject;
  content: string;
}

export interface ChatData {
  messages: MessageObject[];
  recipient: UserObject;
}

export interface CommentObject {
  _id: string;
  creator_name: string;
  creator_id: string;
  content: string;
}