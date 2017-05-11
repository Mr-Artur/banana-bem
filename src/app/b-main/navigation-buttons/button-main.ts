export class ButtonMain {
  private _mainTemplate = {
    "name": 'main',
    "header": '<main class="main">',
    "closeHeader": "</main>",
     "disabled": false,
     "margin": 0
  };
  constructor() { }


  public get template() {

    return this._mainTemplate;

  }

}
