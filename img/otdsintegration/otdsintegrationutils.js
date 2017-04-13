//Global Variables
var hintStyle = "hintStyle valueEditable";            //class for hint inputs
var defaultStyle = "inputTextStyle valueEditable";        //class for non-hint inputs


//Validate form values before submission
//
//input:
//    fieldRequiredError : text to be shown in error case
//
//return:
//    TRUE if no errors are found, FALSE (and an alert) if found

function validateFormValues(fieldRequiredError)
{
    try
    {
        var isOtdsAuthentication = false;
        var isWebServerAuthentication = false;
        var inputFields = document.getElementsByTagName('input');
        
        for (var i = 0; i < inputFields.length; i++)
        {
            if ((inputFields[i].id == "whichAuthentication") && (inputFields[i].value == "otdsAuthentication"))
            {
                isOtdsAuthentication = inputFields[i].checked;
            }
            if (inputFields[i].id == "webServerAuthentication")
            {
                isWebServerAuthentication = inputFields[i].checked;
            }
        }
        
        // Web Server Authentication section
        if (isWebServerAuthentication == true)
        {
            for (i = 0; i < inputFields.length; i++)
            {
                if (inputFields[i].id == "environmentVariable")
                {
                    if (inputFields[i].value.length < 1)
                    {
                        alert(fieldRequiredError + inputFields[i].title);
                        inputFields[i].focus();
                        return false;
                    }
                }
            }
        }
        
        // OTDS Authentication section
        for (i = 0; i < inputFields.length; i++)
        {
            //remove help text
            if (inputFields[i].value == inputFields[i].helpText)
            {
                inputFields[i].value = '';
                inputFields[i].className = defaultStyle;
            }
        
            //check required field
            if (isOtdsAuthentication == true)
            {
                if ((inputFields[i].id == "resourceID" || inputFields[i].id == "webService"))
                {
                    if (inputFields[i].value.length < 1)
                    {
                        alert(fieldRequiredError + inputFields[i].title);
                        inputFields[i].focus();
                        return false;
                    }
                }
            }
        }
    }
    catch (err)
    {
        return false;
    }

    return true;
}

function verifyWSConnection(overhead)
{
    var url = overhead.baseUrl + "?func=otdsintegration.verifyconnection" + "&url=" + encodeURIComponent(document.getElementById("webService").value);
    OTsendHTTPGetAjaxRequest(url, verifyWSConnectionResponse, null, overhead, null );
}

function verifyLoginConnection(overhead)
{
    var url = overhead.baseUrl + "?func=otdsintegration.verifyaccessibility" + "&url=" + encodeURIComponent(document.getElementById("loginURL").value + "/otdsws/login");
    OTsendHTTPGetAjaxRequest(url, verifyLoginURLResponse, null, overhead, null );
}

// Test connectivity
//
//input:
//    overhead: JS Object containing xlates, support path and base url. 
//
//return:
//    true if tests were successful, false otherwise
function verifyConnection(overhead)
{
    try
    {
        document.getElementById("testSummary").innerHTML = overhead.pending;
        document.getElementById("webServiceVerification").innerHTML = '';
        document.getElementById("loginURLVerification").innerHTML = '';
        
        setTimeout(function(){verifyWSConnection(overhead);}, 0);
    }
    catch (err)
    {
        return false;
    }
    
    return true;
}

// Return connection to OTDS WSDL Endpoint response
//
// input:
//    overhead: JS Object containing xlates, support path and base url. 
//    responseText: JSON formated string
//
// return:
//    true if tests were successful, false otherwise
function verifyWSConnectionResponse(responseText, overhead)
{
    var failureImg = "<IMG SRC='" + overhead.img + "multifile/failure.gif'/>";
    var successImg = "<IMG SRC='" + overhead.img + "multifile/success.gif'/>";
    
    var imgSpan = document.getElementById("webServiceVerification");
    var retval = eval(responseText);
    if (retval.verified == true)
    {
        imgSpan.innerHTML = successImg;
    }
    else
    {
        imgSpan.innerHTML = failureImg;
    }
    
    overhead.wsTestDone = true;
    overhead.wsResult = retval.verified;
    
    setTimeout(function(){verifyLoginConnection(overhead);}, 0);    
    return true;
}
function verifyLoginURLResponse(responseText, overhead)
{
    var failureImg = "<IMG SRC='" + overhead.img + "multifile/failure.gif'/>";
    var successImg = "<IMG SRC='" + overhead.img + "multifile/success.gif'/>";
    
    var imgSpan = document.getElementById("loginURLVerification");
    var retval = eval(responseText);
    if (retval.verified == true)
    {
        imgSpan.innerHTML = successImg;
    }
    else
    {
        imgSpan.innerHTML = failureImg;
    }

    overhead.loginTestDone = true;
    overhead.loginResult = retval.verified;
    
    setTestStatus(overhead);
    return true;
}
function setTestStatus(overhead)
{
    var failureImg = "<IMG SRC='" + overhead.img + "multifile/failure.gif'/>";
    var successImg = "<IMG SRC='" + overhead.img + "multifile/success.gif'/>";
    
    if (overhead.wsTestDone == true && overhead.loginTestDone == true)
    {
        if (overhead.wsResult == true && overhead.loginResult == true)
        {
            document.getElementById("testSummary").innerHTML = successImg + overhead.success;
        }
        else
        {
            document.getElementById("testSummary").innerHTML = failureImg + overhead.failure
        }
    }
}

// Called by OTsendHTTPGetAjaxRequest
function killPopup() {
}


//Set help text and events on the current element
//
//input: elemID - current DOM element ID
//input: helpText - help text to display
//
function addHintText(elemID, helpText)
{
    try
    {
        var elem = document.getElementById(elemID);
        elem.helpText = helpText;
        
        if (elem.value == '' || elem.value == helpText)
        {
            elem.value = elem.helpText;
            elem.className = hintStyle;
        }
        
        elem.onfocus = clearHelp;
        elem.onblur = showHelp;
    }
    catch (err)
    {
        return false;
    }
    
    return true;
}

function loginURLUpdated()
{
    try
    {
        var loginElem = document.getElementById('loginURL');
        var wsElem = document.getElementById('webService');
        
        wsElem.defaultValue = wsElem.value;
        loginElem.defaultValue = loginElem.value;
    }
    catch(err)
    {
        return false;
    }
    
    return true;
}

function webServiceUpdated()
{
    try
    {
        var loginElem = document.getElementById('loginURL');
        var wsElem = document.getElementById('webService');
        if (loginElem.value == loginElem.helpText || wsElem.defaultValue == loginElem.value) {
            loginElem.className = defaultStyle;
            loginElem.value = wsElem.value;
        }
        wsElem.defaultValue = wsElem.value;
        loginElem.defaultValue = loginElem.value;
    }
    catch (err)
    {
        return false;
    }
    
    return true;
}

//Remove ghost help text from the input field

function clearHelp()
{
    try
    {
        if (this.value == this.helpText && this.className == hintStyle)
        {
            this.value = '';
            this.className = defaultStyle;
        }
    }
    catch (err)
    {
        return false;
    }
    
    return true;
}


//Add ghosted hint text to an input field

function showHelp()
{
    try
    {
        if (this.value == '')
        {
            this.value = this.helpText;
            this.className = hintStyle;
        }
        if (this.id == 'webService')
        {
            var loginElem = document.getElementById('loginURL');
            loginElem.onblur();
        }
        if (this.id == 'loginURL')
        {
            var wsElem = document.getElementById('webService');
            wsElem.onblur();
        }
    }
    catch (err)
    {
        return false;
    }
    
    return true;
}

function onLoad()
{
    toggleOptions();
}

function toggleOptions()
{
    try
    {
        document.adminsettings.environmentVariable.disabled=!document.adminsettings.webServerAuthentication.checked
        document.adminsettings.usernameStyle[0].disabled=!document.adminsettings.webServerAuthentication.checked
        document.adminsettings.usernameStyle[1].disabled=!document.adminsettings.webServerAuthentication.checked
        document.adminsettings.usernameStyle[2].disabled=!document.adminsettings.webServerAuthentication.checked||document.adminsettings.whichAuthentication[0].checked
        if (document.adminsettings.whichAuthentication[0].checked && document.adminsettings.usernameStyle[2].checked)
        {
            document.adminsettings.usernameStyle[2].checked = false;
            document.adminsettings.usernameStyle[0].checked = true;
        }
    }
    catch (err)
    {
    }
}
