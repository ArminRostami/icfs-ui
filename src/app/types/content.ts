export interface Content {
  id: string
  name: string;
  description: string
  extension: string;
  rating: number;
  uploaded_at: Date;
  downloads: number;
  uploader: string;
  size: number;
  file_type: string;
  comments: Comment[]
}

export interface Comment {
  username: string;
  rating: number;
  comment_text: string;
  comment_time: Date
}