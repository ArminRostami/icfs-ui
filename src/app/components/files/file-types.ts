export const fileTypes = {
  Font: 'font',
  Text: 'text',
  Image: 'image',
  Audio: 'audio',
  Video: 'video',
  Spreadsheet: 'spreadsheet',
  Presentation: 'presentation',
  Document: 'document',
  Archive: 'archive',
  Application: 'application',
}

export class Ftypes {
  static getRealType(extension: string, type: string): string {
    switch (extension) {
      case "7z":
      case "arj":
      case "deb":
      case "pkg":
      case "rar":
      case "rpm":
      case "tar.gz":
      case "z":
      case "zip":
      case "gz":
      case "cab":
        return fileTypes.Archive

      case "xls":
      case "ods":
      case "xlsx":
      case "xlsm":
        return fileTypes.Spreadsheet

      case "key":
      case "odp":
      case "pps":
      case "ppt":
      case "pptx":
        return fileTypes.Presentation

      case "doc":
      case "docx":
      case "pdf":
      case "odt":
      case "tex":
      case "wpd":
        return fileTypes.Document

      default: return type.split("/", 2)[0]
    }
  }
}