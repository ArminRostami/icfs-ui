import { fileTypes } from './file-types';
export const iconmap = new Map([
  // main types:
  [fileTypes.Audio, { name: "audio", color: "#32CD32" }],
  [fileTypes.Video, { name: "video-camera", color: "#800080" }],
  [fileTypes.Image, { name: "file-image", color: "#FF1493" }],
  [fileTypes.Archive, { name: "file-zip", color: "#EFCC00" }],
  [fileTypes.Presentation, { name: "file-ppt", color: "#D04423" }],
  [fileTypes.Spreadsheet, { name: "file-excel", color: "#339966" }],
  [fileTypes.Application, { name: "appstore", color: "#FF0000" }],
  [fileTypes.Text, { name: "file-text", color: "#00008b" }],
  [fileTypes.Font, { name: "book", color: "#40e0d0" }],
  [fileTypes.Document, { name: "container" }],
  // extensions:
  ["pdf", { name: "file-pdf", color: "#ff0000" }],
  ["doc", { name: "file-word", color: "#00a2ed" }],
  ["docx", { name: "file-word", color: "#00a2ed" }],
  // fallback:
  ["unknown", { name: "file-unknown", color: "#a9a9a9" }],

])


