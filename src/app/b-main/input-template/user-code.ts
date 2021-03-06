export class UserCode {
    private _userTemplate = [];
    private _tags = [];
    private _classNames = [];

    private findSubstring(string, target) {

        let str = string;
        let innerElement = target;
        let pos = 0;
        let arr = [];

        while (true) {

            let foundPos = str.indexOf(innerElement, pos);

            if (foundPos === -1) break;

            arr.push(foundPos);

            pos = foundPos + 1;

        }

        return arr;

    }

    private checkCodeString(check) {
        let str = check;
        let reg = /./g;

        if (str.match(reg)) {

            return check;

        } else {

            alert('Invalid symbols type');

        }

    }

    private codeTags(before, from, arr) {

        //find all tags in arr[str]        
        // if str = div.header work this rule ↓
        if (typeof (before) === "number" && typeof (from) === "number") {

            if (from === 0 && before !== 0) {
                this._tags.push(arr.substring(from, before));
            }
            if (before === 0 && from === 0) {
                this._tags.push(arr);
            } else if (before !== 0 && from !== 0) {
                console.error('Error: ' + arr);
            }

        }
        // if str = div.header>div.nav>ul.menu work this rule ↓        
        else if (typeof (before) === "object" && typeof (from) === "object") {

            for (let i = 0; i < before.length; i++) {

                if (i === 0) {
                    this._tags.push({
                        "parent": arr.substring(0, before[0]),
                        "childs": []
                    });
                } else if (i === (before.length - 1)) {

                    break;

                } else {
                    this._tags[this._tags.length - 1].childs.push({
                        "child-parent": arr.substring(from[i - 1] + 1, before[i]),
                        "children": arr.substring(from[i] + 1, before[i + 1])
                    });
                }

            }
        }
        // if str = div.header>div.nav work this rule ↓
        else if (typeof (before) === "object" && typeof (from) === "number") {

            for (let i = 0; i < before.length; i++) {

                if (i === 0) {
                    this._tags.push({
                        "parent": arr.substring(0, before[0]),
                        "child": ""
                    });
                } else {
                    this._tags[this._tags.length - 1].child = arr.substring(from + 1, before[i])
                }

            }

        } else {
            console.error('Error: ' + arr);
        }

    }

    private codeClassName(from, before, arr) {
        //find all class names in arr[str]       
        // if str = div.header work this rule ↓
        if (typeof (from) === "number" && typeof (before) === "number") {

            if (before === 0 && from !== 0) {
                from = from + 1;
                before = arr.length - from;
                this._classNames.push(arr.substr(from, before));
            }

        }
        // if str = div.header>div.nav>ul.menu work this rule ↓        
        else if (typeof (from) === "object" && typeof (before) === "object") {
            let step = 0;
            for (let i = 0; i < from.length; i++) {

                if (i === 0) {
                    let end = before[0] - from[0];
                    end = end - 1;
                    this._classNames.push({
                        "parent": arr.substr(from[0] + 1, end),
                        "childs": []
                    });
                } else if (i === (from.length - 1)) {

                    break;

                } else {
                    // parse string by the name class
                    let end = before[i] - from[i]; // last point parent element
                    end = end - 1;
                    step++; //step for correct display child elem
                    let beforeEnd = before[step + i] - from[i + 1]; // last point child element
                    beforeEnd = beforeEnd - 1;
                    beforeEnd = isNaN(beforeEnd) ? arr.length : beforeEnd;
                    // if child is NaN, add to him length string. 
                    //This if need becouse beforeEnd became not found in [before]                    
                    this._classNames[this._classNames.length - 1].childs.push({
                        "child-parent": arr.substr(from[i] + 1, end),
                        "children": arr.substr(from[step + i] + 1, beforeEnd)
                    });
                    step--; // reset step

                }
            }

        }
        // if str = div.header>div.nav work this rule ↓
        else if (typeof (from) === "object" && typeof (before) === "number") {

            for (let i = 0; i < from.length; i++) {
                if (i === 0) {
                    let end = before - from[0];
                    end = end - 1;
                    this._classNames.push({
                        "parent": arr.substr(from[0] + 1, end),
                        "child": ""
                    });
                } else {
                    this._classNames[this._classNames.length - 1].child = arr.substr(from[i] + 1);
                }
            }
        }

    }

    private bundleTemplate(tags, classNames) {
   
        let bundleObj = {
            html: "",
            css: ""
        };

        if (tags.length == 1 && classNames.length == 1) {

            if (typeof (tags[0]) !== 'object' && typeof (classNames[0]) !== 'object') {

                for (let i = 0; i < tags.length; i++) {

                    bundleObj.html = '<' + tags[i] + " class=\"" + classNames[i] + "\"></" + tags[i] + ">";
                    bundleObj.css = '.' + classNames[i] + " { /*enter your property..*/ }";

                }

            } else if (tags[0].hasOwnProperty("childs")) {
                //loop bundle for html
                let children = "";

                for (let i = 0; i < tags[0].childs.length; i++) {

                    children += '<' + tags[0].childs[i]["child-parent"] + " class=\"" + classNames[0].parent + "__" + classNames[0].childs[i]["child-parent"] + "\">\n" +
                        "<" + tags[0].childs[i].children + " class=\"" + classNames[0].childs[i]["child-parent"] + "__" + classNames[0].childs[i].children + "\"></" + tags[0].childs[i].children + ">"
                        + "</" + tags[0].childs[i]["child-parent"] + ">";

                }

                bundleObj.html = '<' + tags[0].parent + " class=\"" + classNames[0].parent + "\">\n" +
                    children + "</" + tags[0].parent + ">";


                //loop bundle for css rules
                bundleObj.css += '.' + classNames[0].parent + " { /*enter your property..*/ }";
                let lastElem = classNames[0].childs.length - 1;
                for (let j = 0; j < classNames[0].childs.length; j++) {

                    if (classNames[0].childs.length > 1 && j == lastElem) {

                        bundleObj.css += '.' + classNames[0].childs[j]["child-parent"] + "__" + classNames[0].childs[j].children + " { /*enter your property..*/ }";

                    } else {

                        bundleObj.css += '.' + classNames[0].parent + "__" + classNames[0].childs[j]["child-parent"] + " { /*enter your property..*/ }";
                        bundleObj.css += '.' + classNames[0].childs[j]["child-parent"] + "__" + classNames[0].childs[j].children + " { /*enter your property..*/ }";

                    }

                }

            } else {

                //loop for bundle html tags user-code
                for (let i = 0; i < tags.length; i++) {

                    bundleObj.html += '<' + tags[i].parent + " class=\"" + classNames[i].parent + "\">\n" +

                        '<' + tags[i].child + " class=\"" + classNames[i].child + "\">" + "</" + tags[i].child + ">\n"

                        + "</" + tags[i].parent + ">\n";


                }
                //loop for bundle css user-code
                for (let j = 0; j < classNames.length; j++) {

                    bundleObj.css += '.' + classNames[j].parent + " { /*enter your property..*/ }\n";
                    bundleObj.css += '.' + classNames[j].child + " { /*enter your property..*/ }\n";

                }


            }

        } else {
            //loop for bundle user-code have 2 inner or more childs
            //html tags
            for (let i = 0; i < tags.length; i++) {

                if (typeof (tags[i]) === 'object') {

                    if (tags[i].hasOwnProperty("childs")) {

                        let children = "";

                        for (let l = 0; l < tags[i].childs.length; l++) {

                            children += '<' + tags[i].childs[l]["child-parent"] + " class=\"" + classNames[i].parent + "__" + classNames[i].childs[l]["child-parent"] + "\">\n " +
                                "<" + tags[i].childs[l].children + " class=\"" + classNames[i].childs[l]["child-parent"] + "__" + classNames[i].childs[l].children + "\"></" + tags[i].childs[l].children + ">\n"
                                + "</" + tags[i].childs[l]["child-parent"] + ">\n";

                        }

                        bundleObj.html = '<' + tags[i].parent + " class=\"" + classNames[i].parent + "\">\n " +
                            children + "</" + tags[i].parent + ">\n";

                    } else {
                        bundleObj.html += '<' + tags[i].parent + " class=\"" + classNames[i].parent + "\">\n " +

                            '<' + tags[i].child + " class=\"" + classNames[i].parent + "__" + classNames[i].child + "\">" + "</" + tags[i].child + ">\n "

                            + "</" + tags[i].parent + ">\n ";
                    }

                } else {

                    bundleObj.html = '<' + tags[i] + " class=\"" + classNames[i] + "\"></" + tags[i] + ">";

                }
            }

            //loop for bundle user-code have 2 inner or more childs
            //css rules
            for (let c = 0; c < classNames.length; c++) {

                if (typeof (classNames[c]) === 'object') {

                    if (classNames[c].hasOwnProperty("childs")) {

                        bundleObj.css += '.' + classNames[c].parent + " { /*enter your property..*/ }";
                        let lastElem = classNames[c].childs.length - 1;
                        for (let j = 0; j < classNames[c].childs.length; j++) {

                            if (classNames[c].childs.length > 1 && j == lastElem) {

                                bundleObj.css += '.' + classNames[c].childs[j]["child-parent"] + "__" + classNames[c].childs[j].children + " { /*enter your property..*/ }";

                            } else {

                                bundleObj.css += '.' + classNames[c].parent + "__" + classNames[c].childs[j]["child-parent"] + " { /*enter your property..*/ }";
                                bundleObj.css += '.' + classNames[c].childs[j]["child-parent"] + "__" + classNames[c].childs[j].children + " { /*enter your property..*/ }";

                            }

                        }

                    } else {

                        bundleObj.css += '.' + classNames[c].parent + " { /*enter your property..*/ }";
                        bundleObj.css += '.' + classNames[c].parent + "__" + classNames[c].child + " { /*enter your property..*/ }";

                    }

                } else {

                    bundleObj.css = '.' + classNames[c] + " { /*enter your property..*/ }";

                }

            }
        }

        this._userTemplate.push(bundleObj);

    }

    public get userTemplate() {

        return this._userTemplate;

    }

    public setUserCode(code) {

        // this.checkCodeString(code);
        let str = code;
        //let str = 'div.header\ndiv.test>ul.menu>li.active>p.test\ndiv';   
        this._tags = []; //clear array tags
        this._classNames = []; //clear array class names
        let arrString = str.split('\n');
        let dot = [];
        let innerElement = [];
        let a = 0;
        // add items in arrays [dot] [innerElement] from arrString[],
        // converting arrays
        // two function for creating full object from items [dot] and [innerElemen]
        for (let i = 0; i < arrString.length; i++) {

            dot.push(this.findSubstring(arrString[i], '.').join());
            innerElement.push(this.findSubstring(arrString[i], '>').join());


            //converting array, string to integer
            for (; a < dot.length; a++) {


                //find sub string to break a string into an array and converting to integer
                if (dot[a].indexOf(',') > 0) {

                    dot[a] = dot[a].split(','); //converting string to array

                    for (let s = 0; s < dot[a].length; s++) { // loop, converting string items array to integer items array

                        dot[a][s] = Number(dot[a][s]);

                    }

                } else {

                    dot[a] = Number(dot[a]);

                }

                //read up ↑↑↑
                if (innerElement[a].indexOf(',') > 0) {

                    innerElement[a] = innerElement[a].split(',');

                    for (let s = 0; s < innerElement[a].length; s++) {

                        innerElement[a][s] = Number(innerElement[a][s]);

                    }

                } else {

                    innerElement[a] = Number(innerElement[a]);

                }

                this.codeTags(dot[a], innerElement[a], arrString[i]);
                this.codeClassName(dot[a], innerElement[a], arrString[i]);

            }

        }

        this.bundleTemplate(this._tags, this._classNames);

    }



}
