function pad2(number) {
     return (number < 10 ? '0' : '') + number
}

function reverse(s) {
    return s.split("").reverse().join("");
}

function Num2DOCSEnh(docnum, docver, docext) {
    var filename = "";
    var numberinitial = docnum;
    
    while(docnum >= 1)
    {   var mod36 = docnum % 36;
        
        if (mod36 < 10)
        { filename += mod36; }
        else if (mod36 === 10)
        { filename += "@"; }
        else if (mod36 === 14)
        { filename += "#"; }
        else if (mod36 === 18)
        { filename += "$"; }
        else if (mod36 == 24)
        { filename += "_"; }
        else if (mod36 === 30)
        { filename += "%"; }
        else
        { filename += String.fromCharCode(mod36 + 55); }
        
        docnum = (docnum - mod36) / 36;
    }
    filename = filename.toLowerCase();
    return reverse(filename)+docver+"!."+docext;
}

function Num2DOCSunix(docnum, docver, docext) {
    var filename = "";
    var numberinitial = docnum;
    
    while(docnum >= 1)
    {   var mod32 = docnum % 32;
        
        if (mod32 < 10)
        { filename += mod32; }
        else if (mod32 === 10)
        { filename += "W"; }
        else if (mod32 === 14)
        { filename += "X"; }
        else if (mod32 === 18)
        { filename += "Y"; }
        else if (mod32 == 24)
        { filename += "Z"; }
        else if (mod32 === 30)
        { filename += "_"; }
        else
        { filename += String.fromCharCode(mod32 + 55); }
        
        docnum = (docnum - mod32) / 32;
    }
    filename = filename.toLowerCase();
    return reverse(filename)+docver+"_."+docext;
}


// Convert DOCS filename to document number using enhanced filing scheme
function DOCSEnh2Num(filename) {
	    var docnum = 0;
	    var c = "";
	    var numbersRegex = /[0-9]/;
	    var lettersRegex = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
	    
	    // Calculate doc number from characters
	    for (j = 1;  j < filename.length+1; j++){
        	docnum *= 36;
        	c = filename.slice(j-1,j).toUpperCase();
        	if (!!numbersRegex.test(c)) {
				docnum += Number(c);
            }
			else if (!!lettersRegex.test(c)) {
				docnum = docnum + c.charCodeAt(0) - 55;
				}
			else if (c === "@") {
				docnum += 10;
				}
			else if (c === "#") {
				docnum += 14;
				}
			else if (c === "$") {
				docnum += 18;
				}
			else if (c === "_") {
				docnum += 24;
				}
			else if (c === "%") {
				docnum += 30;
				}
			else {
				docnum = 0;
				}
        }
	    return docnum;
}

// Convert DOCS filename to document number using unix filing scheme
function DOCSUnix2Num(filename) {
    	var docnum = 0;
    	var c = "";
	    var numbersRegex = /[0-9]/;
	    var lettersRegex = /[ABCDEFGHIJKLMNOPQRSTUV]/;
	    // Calculate doc number from characters
	    for (j = 1;  j < filename.length+1; j++){
        	docnum *= 32;
			c = filename.slice(j-1,j).toUpperCase();
			if (!!numbersRegex.test(c)) {
				docnum += Number(c);
            }
			else if (!!lettersRegex.test(c)) {
				docnum = docnum + c.charCodeAt(0) - 55;
				}
			else if (c === "W") {
				docnum += 10;
				}
			else if (c === "X") {
				docnum += 14;
				}
			else if (c === "Y") {
				docnum += 18;
				}
			else if (c === "Z") {
				docnum += 24;
				}
			else if (c === "_") {
				docnum += 30;
				}
			else {
				docnum = 0;
				}				
			}
    return docnum;
}

// 6 fields, 4 can be changed: docN = Document Number, verN = version number, ext = extension, fileChange = filename added
// This function is called by each of the field that can be changed, and pass the change code documented above to switch
function convert(fieldchanged) {
	var docNumber = document.getElementById("docNumber").value;
	var docVers = document.getElementById("docVers").value;
	var docExt = document.getElementById("docExt").value;
	var fileName = document.getElementById("fileName").value;
	var fileMethod = "";
	var fileVersion = "";
	var fileExtension = "";
	var extPos = 0;

	// remove any alert
	document.getElementById("docNumberComment").value = "";
	document.getElementById("docVersComment").value = "";
	document.getElementById("docExtComment").value = "";
	document.getElementById("fileNameComment").value = "";
	//console.log(docNumber + "-" + docVers + "-" + docExt + "-" + fileNameEnh + "-" + fileNameUnix);
	
	// switch based on the value of changes. check values: doc number must be a number only, version must be a number between 1 and 99, ext a text of 4 char max
	switch(fieldchanged) {
		case 'docN':
			if (isNaN(docNumber)) 
				{ document.getElementById("docNumberComment").value = "--> must be a number";
				document.getElementById("docNumber").value = 1;
				}
			else {
				document.getElementById("fileNameEnh").value = Num2DOCSEnh(docNumber, docVers, docExt);
				document.getElementById("fileNameUnix").value = Num2DOCSunix(docNumber, docVers, docExt);
				}
			break;
		case 'verN':
			document.getElementById("docVers").value = pad2(docVers);
			document.getElementById("fileNameEnh").value = Num2DOCSEnh(docNumber, pad2(docVers), docExt);
			document.getElementById("fileNameUnix").value = Num2DOCSunix(docNumber, pad2(docVers), docExt);
			break;
		case 'ext':
			if (docExt.length < 2 || docExt.length > 4 || docExt.lastIndexOf(".") != -1) 
				{ document.getElementById("docExtComment").value = "--> between 2 & 4 chars and no '.'";
				  document.getElementById("docExt").value = 'txt';
				 }
			else {
			document.getElementById("fileNameEnh").value = Num2DOCSEnh(docNumber, docVers, docExt);
			document.getElementById("fileNameUnix").value = Num2DOCSunix(docNumber, docVers, docExt);
			}
			break;
		case 'fileChange':
			// if the filename has a "!" then its enhanced, if it has a "_" then its unix, otherwise it's not a valid file name
			
			extPos = fileName.lastIndexOf(".");
			// extract method, version number and extension
			if (extPos === -1) {
				document.getElementById("fileNameComment").value = "--> not a valid name: missing '.'";
				break;
			}
			else {
				fileMethod = fileName.slice(extPos-1, extPos);
				fileVersion = pad2(Number(fileName.slice(extPos-3, extPos-1)));
				fileExtension = fileName.slice(extPos+1, fileName.length);
			}

			if (fileMethod === "!"){
				// calculate document number and extract version and extension to display
				document.getElementById("docNumber").value = DOCSEnh2Num(fileName.slice(0, extPos-3));
				document.getElementById("docVers").value = fileVersion;
				document.getElementById("docExt").value = fileExtension;
				document.getElementById("fileNameEnh").value = "Enhanced";
				document.getElementById("fileNameUnix").value = "";
			}
			else if (fileMethod === "_") {
				// calculate document number and extract version and extension to display
				document.getElementById("docNumber").value = DOCSUnix2Num(fileName.slice(0, extPos-3));
				document.getElementById("docVers").value = fileVersion;
				document.getElementById("docExt").value = fileExtension;
				document.getElementById("fileNameEnh").value = "";
				document.getElementById("fileNameUnix").value = "Unix";
			}
			else {
				document.getElementById("fileNameComment").value = "--> not a valid name";
				}			
			// file name to test: 2801!.docx = 80 | 5jp01!.wpd = 7189 | 7w201_.xls = 7490
			break;
	}
}

function init()
{
}
window.onload=init;