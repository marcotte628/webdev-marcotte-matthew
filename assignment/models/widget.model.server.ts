class Widget {
  src: String;
  _id: String;
  widgetType: String;
  pageId: String;
  size: number;
  width: String;
  text: String;
  url: String;
  name: String;
  constructor(src: String, id: String, type: String, page: String, size: number, width: String, text: String, url: String, name: String) {
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
