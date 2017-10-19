export class Website {
  _id: String;
  name: String;
  developerId: String;
  description: String;
  constructor(id, name, developerId, description) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.developerId = developerId;
  }
}
