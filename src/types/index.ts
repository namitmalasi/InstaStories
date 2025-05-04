export interface Story {
  id: string;
  username: string;
  avatar: string;
  viewed: boolean;
  items: StoryItem[];
}

export interface StoryItem {
  id: string;
  type: "image" | "video";
  url: string;
  duration: number; // in seconds
}
