export class Elements {
    private _elements = [];
    private _cssRules = [];
    private _cssTemplate = [];

    public isElemTooltip: boolean = false;

    private _fixElementName(tags, blockName, classNames, mod) {

        let inputStr = classNames;
        let arr = [];
        let hyphen = "";

        if (inputStr.indexOf("-") === -1) {

            for (let i = 0; i <= inputStr.length; i++) {

                if (!isNaN(inputStr[i])) {

                    arr.push(inputStr[i]);

                    inputStr = inputStr.replace(inputStr[i], "");

                    i--;

                    hyphen = "-";

                }

            }

            inputStr = inputStr + hyphen;

            for (let i = 0; i < arr.length; i++) {

                inputStr = inputStr + arr[i];

            }

        }

        this.generateRuleCss(blockName, inputStr, mod);

        let tag = '<' + tags;
        let closeTag = '\n</' + tags + '>\n';
        let className = ' class="' + blockName + '__' + inputStr + mod + '">';

        this._elements.push({
            "tag": tag,
            "name": inputStr,
            "className": className,
            "closeTag": closeTag,
            "childs": []
        });

    }

    public get items() {

        return this._elements;

    }

    public get cssRules() {

        return this._cssRules;

    }

    public get cssTemplate() {

        return this._cssTemplate;

    }

    public addElement(tags, blockName, classNames, modifier) {

        let mod = modifier;

        if (!isNaN(mod[0])) {

            throw new Error("modifier is incorrect: " + mod);

        } else if (mod === undefined || mod === "") {

            mod = "";

        } else {

            mod = "--" + mod;

        }

        if (tags === undefined || tags === "") {

            throw new Error("tag is empty: " + tags);

        }

        if (classNames === undefined || classNames === "" || !isNaN(classNames[0])) {

            this.isElemTooltip = true;

        } else {

            this._fixElementName(tags, blockName, classNames, mod);

        }

    }

    public addChildElement(tagChild, childElem, modifier, classNames, index) {

        let childClassName = childElem.value;
        let tags = tagChild.value;
        let mod = modifier.value;

        if (!isNaN(mod[0])) {

            throw new Error("modifier is incorrect: " + mod);

        } else if (mod === undefined || mod === "") {

            mod = "";

        } else {

            mod = "--" + mod;

        }

        if (tags === undefined || tags === "") {

            throw new Error("tag is empty: " + tags);

        }

        if (childClassName === "" || childClassName === undefined || !isNaN(childClassName[0])) {

            throw new Error("Invalid input type: " + '\"' + childClassName + '\"|' + ' Please use the correct spelling of the element: \"element-1\"');

        }

        this.generateRuleCss(classNames, childClassName, mod);

        this._elements[index].childs.push({
            "tag": '\n<' + tags,
            "name": ' class=\"' + classNames + '__' + childClassName + mod + '\">',
            "closeTag": '</' + tags + '>'
        });

        tagChild.value = "";
        childElem.value = "";
        modifier.value = "";

    }

    public removeElement(index) {

        this._elements.splice(index, 1);

    }

    public removeChildElement(name) {

        for (let i = 0; i < this._elements.length; i++) {

            for (let j = 0; j < this._elements[i].childs.length; j++) {

                if (this._elements[i].childs[j].name === name) {

                    this._elements[i].childs.splice(j, 1);

                }

            }

        }

    }

    public generateCss(block, template) {

        let mainRule = '.' + block + ' { /*enter your property..*/ }';

        this._cssTemplate.push({
            "mainRule": mainRule,
            "rules": [].concat(template)
        });

    }

    public generateRuleCss(block, element, modifier) {


        let rule;

        if (modifier === undefined || modifier === "") {

            rule = '.' + block + '__' + element + ' { /*enter your property..*/ }';

            this._cssRules.push(rule);

        } else {

            rule = '.' + block + '__' + element + modifier + ' { /*enter your property..*/ }';

            this._cssRules.push(rule);

        }

        this.generateCss(block, this._cssRules);

    }

} 
