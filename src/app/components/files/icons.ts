import { fileTypes } from './file-types';

interface icon {
  name: string;
  color: string;
}

export class Icons {
  private static imap = new Map<string, icon>([
    [fileTypes.Audio, { name: "audio", color: "#32CD32" }],
    [fileTypes.Video, { name: "video-camera", color: "#800080" }],
    [fileTypes.Image, { name: "file-image", color: "#FF1493" }],
    [fileTypes.Archive, { name: "file-zip", color: "#EFCC00" }],
    [fileTypes.Presentation, { name: "file-ppt", color: "#D04423" }],
    [fileTypes.Spreadsheet, { name: "file-excel", color: "#339966" }],
    [fileTypes.Application, { name: "appstore", color: "#FF0000" }],
    [fileTypes.Text, { name: "file-text", color: "#00008b" }],
    [fileTypes.Font, { name: "book", color: "#40e0d0" }],
    [fileTypes.Document, { name: "container", color: "#1890ff" }],
    ["pdf", { name: "file-pdf", color: "#ff0000" }],
    ["doc", { name: "file-word", color: "#00a2ed" }],
    ["docx", { name: "file-word", color: "#00a2ed" }],
    ["unknown", { name: "file-unknown", color: "#a9a9a9" }],
  ])

  static getIcon(ext: string, realType: string): icon {
    if (Icons.imap.has(ext)) {
      return Icons.imap.get(ext)!
    }
    if (Icons.imap.has(realType)) {
      return Icons.imap.get(realType)!
    }
    return Icons.imap.get("unknown")!
  }
}


