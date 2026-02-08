export interface MessageData {
  _id: string;
  chatRoomId: string;
  senderId: {
    _id: string;
    profilePicture: string;
    username: string;
    title: string;
  };
  text: string;
  isRead: boolean;
}
