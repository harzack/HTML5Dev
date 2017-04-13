var _testkeyon = false;
function LocString(key) {
    try {
        var ret = lStr[key];
        if (ret === undefined) {
            ret = key;
        }

        if (_testkeyon) {
            return "\u00FC" + ret;
        }

        return ret;
    }
    catch (ex) {
        // Do nothing.
        return "NO TRANSLATION: " + key;
    }

    return key;
}
String.formatLoc = function() {
    var i;
    var re;
    var str;

    if (0 === arguments.length) {
        return null;
    }

    str = LocString(arguments[0]);

    re = new RegExp('\\%\\%', 'gm');
    str = str.replace(re, '%');

    for (i = 1; i < arguments.length; i++) {
        re = new RegExp('\\%' + (i), 'gm');
        str = str.replace(re, arguments[i]);
    }

    return str;
};
// Adding copyright content to footer
var footer = document.getElementById("footer");
var copyrightContent = document.createElement('p');
var copyrightText = String.formatLoc('Copyright');
copyrightContent.setAttribute('class', 'copyright');
copyrightContent.appendChild(document.createTextNode(copyrightText));
footer.appendChild(copyrightContent);