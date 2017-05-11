export class ButtonFooter {
  private _footerTemplate = {
    "name": 'footer',
    "header": '<footer class="footer">',
    "closeHeader": "</footer>",
     "disabled": false,
     "margin": 0
  };
  constructor() { }

  public get template() {

    return this._footerTemplate;

  }

}
