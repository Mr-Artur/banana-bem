
export class SavedTamplate {
    private _templates = [];

    public templates(template) {

        this._templates.push(template);
       
    }

    public listTemplates() {
      
     return  this._templates;

    }

    constructor() { }

}
