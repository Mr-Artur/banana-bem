import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonHeader } from './button-header';
import { ButtonMain } from './button-main';
import { ButtonFooter } from './button-footer';
import { ButtonUserCode } from './button-user-code';
import { pakerTemplates } from './paker-templates';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})

export class NavigationButtonsComponent implements OnInit {
  public _buttonsName = [];
  private _buttonHeader: ButtonHeader;
  private _buttonMain: ButtonMain;
  private _buttonFooter: ButtonFooter;
  private _buttonUserCode: ButtonUserCode;
  private _paker: pakerTemplates;
  private _inputTemplate: InputTemplateComponent;

  private decorHtmlTemplate() {

  }

  @Input() public generatedButton = true;
  @Input() public nameButtonsSaved = "";
  @Input() public generateTemplate = "";
  @Output() public itemClicked = new EventEmitter();

  public isOn = this.generatedButton;
  public isReady = true;
  public imgPath: string = './src/assets/img/banana.png';

  constructor() {

    this._buttonHeader = new ButtonHeader();
    this._buttonMain = new ButtonMain();
    this._buttonFooter = new ButtonFooter();
    this._buttonUserCode = new ButtonUserCode();
    this._paker = new pakerTemplates();
    this._inputTemplate = new InputTemplateComponent();

    this.addButtonName(this._buttonHeader.template);
    this.addButtonName(this._buttonMain.template);
    this.addButtonName(this._buttonFooter.template);
    this.addButtonName(this._buttonUserCode.template);

  }

  public markButton(name) {

    switch (name) {

      case 'header':
        this._buttonHeader.template.disabled = true;
        break;
      case 'main':
        this._buttonMain.template.disabled = true;
        break;
      case 'footer':
        this._buttonFooter.template.disabled = true;
        break;
      case 'user-code':
        this._buttonUserCode.template.disabled = true;
        break;
      default:
        console.log('not correct name' + name);

    }

  }

  public chekMarkButton() {

    let buttons = this._buttonsName;

    for (let i = 0; i < buttons.length; i++) {

      if (buttons[i].disabled === true) {

        buttons[i].margin = 10;

      } else {

        buttons[i].margin = 0;

      }

    }

    setTimeout(() => {
      this.isReady = false;
    }, 500);


  }
  public reloadPage() {

    setTimeout(() => {
      window.location.reload();
    }, 1500);

  }
  public addButtonName(template) {

    return this._buttonsName.push(template);

  }

  public onItemClicked(item) {

    this.itemClicked.emit(item);

  }

  public generateProject() {
 
    this._paker.setHtmlCode(this.generateTemplate);
    this._paker.setCssCode(this.generateTemplate);
    this._paker.generateZip();

    this.reloadPage();

  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.generatedButton === false) {

      this.isOn = false;

    }

    if (this.nameButtonsSaved !== "") {

      this.markButton(this.nameButtonsSaved);

    }

  }

}
