import * as JSZip from 'jszip';

export class pakerTemplates {

  public links = "";
  private _viewTemplate = {
    "html": "",
    "cssHeader": "",
    "cssMain": "",
    "cssFooter": "",
    "cssUser": ""
  }

  public setHtmlCode(object) {

    let arr = [];

    for (let i = 0; i < object.length; i++) {

      arr.push(object[i].block);
      arr.push(object[i].body);
      arr.push(object[i].endBlock);

    }

    let bodyHtml = arr.join('\n');

    this.addHeadLinks(object)

    let htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Generate Banana BEM</title>
` + this.links + `
</head>
<body>
    
`
      + bodyHtml + `

<!-- GENERATE WITH BANANA BEM -->
    <!-- Thanks for using -->
</body>
</html>
     `;

    this._viewTemplate.html = htmlBody;
  }

  public setCssCode(object) {

    for (let i = 0; i < object.length; i++) {

      this.pakerCss(object[i].endBlock[2], object[i].css)

    }

  }

  private addHeadLinks(object) {

    for (let i = 0; i < object.length; i++) {

      let name = object[i].endBlock[2];

      switch (name) {

        case 'h':
          this.links = this.links + '<link rel=\"stylesheet\" href=\"./src/header/header.css\">\n';
          break;
        case 'm':
          this.links = this.links + '<link rel=\"stylesheet\" href=\"./src/main/main.css\">';
          break;
        case 'f':
          this.links = this.links + '\n<link rel=\"stylesheet\" href=\"./src/footer/footer.css\">';
          break;
        default:
          console.log('not correct name' + name);

      }
    }

  }

  public pakerCss(name, css) {
    debugger
    let arr = [];
    let lastElement = css.length - 1;
    let leng = css[lastElement].rules.length;
    for (let i = 0; i < css[lastElement].rules.length; i++) {

      arr.push(css[lastElement].rules[i]);

    }

    let stringCSS = arr.join('\n');
    let cssBody = `
        /* GENERATE WITH BANANA BEM */
        /* THANKS FOR USING ^_^ */
        
` + css[0].mainRule + '\n' + stringCSS;

    switch (name) {

      case 'h':
        this._viewTemplate.cssHeader = cssBody;
        break;
      case 'm':
        this._viewTemplate.cssMain = cssBody;
        break;
      case 'f':
        this._viewTemplate.cssFooter = cssBody;
        break;
      case 'u':
        this._viewTemplate.cssUser = cssBody;
        break;
      default:
        console.log('not correct name' + name);

    }

  }

  public generateZip() {

    let zip = new JSZip();
    zip.file("index.html", this._viewTemplate.html);

    if (this._viewTemplate.cssHeader !== "") {

      zip.file("src/header/header.css", this._viewTemplate.cssHeader);

    }

    if (this._viewTemplate.cssMain !== "") {

      zip.file("src/main/main.css", this._viewTemplate.cssMain);

    }

    if (this._viewTemplate.cssFooter !== "") {

      zip.file("src/footer/footer.css", ".footer {}");

    }

    zip.generateAsync({ type: "base64" })
      .then(function (content) {
        location.href = "data:application/zip;base64," + content;
      });


  }
  constructor() { }

}
