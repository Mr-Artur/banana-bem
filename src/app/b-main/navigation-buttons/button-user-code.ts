export class ButtonUserCode {
  private _userCodeTemplate = {
    "name": 'user-code',
    "header": '<user class="code">',
    "closeHeader": "</user>",
    "disabled": false,
     "margin": 0
  };
  constructor() { }

  public get template() {

    return this._userCodeTemplate;

  }

}
