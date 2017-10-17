export class Widget {
  src: String;
  _id: String;
  widgetType: String;
  pageId: String;
  size: number;
  width: String;
  text: String;
  url: String;
  name: String
  constructor(src, id, type, page, size, width, text, url, name) {
    this.src = src;
    this._id = id;
    this.widgetType = type;
    this.pageId = page;
    this.size = size;
    this.width = width;
    this.text = text;
    this.url = url;
    this.name = name;
  }
}
