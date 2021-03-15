import { fileTypes } from './file-types';
export const iconmap = new Map([
  // main types:
  [fileTypes.Audio, { name: "audio", color: "#32CD32" }],
  [fileTypes.Video, { name: "video-camera", color: "#3a3b3c" }],
  [fileTypes.Image, { name: "file-image", color: "#FF1493" }],
  [fileTypes.Archive, { name: "file-zip", color: "#800080" }],
  [fileTypes.Presentation, { name: "file-ppt", color: "#D04423" }],
  [fileTypes.Spreadsheet, { name: "file-excel", color: "#1D6F42" }],
  [fileTypes.Application, { name: "appstore", color: "#8b0000" }],
  [fileTypes.Text, { name: "file-text", color: "#00FFFF" }],
  [fileTypes.Font, { name: "book", color: "#00008b" }],
  [fileTypes.Document, { name: "container" }],
  // extensions:
  ["pdf", { name: "file-pdf", color: "#ff0000" }],
  ["doc", { name: "file-word", color: "#00a2ed" }],
  ["docx", { name: "file-word", color: "#00a2ed" }],
  // fallback:
  ["unknown", { name: "file-unknown", color: "#a9a9a9" }],

])


