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
}
