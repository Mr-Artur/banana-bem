export class ButtonHeader {
  private _headerTemplate = {
    "name": 'header',
    "header": '<header class="header">',
    "closeHeader": "</header>",
     "disabled": false,
     "margin": 0
  };

  constructor() { }

  public get template() {

    return this._headerTemplate;

  }

}
