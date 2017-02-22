function reverse(s){
    return s.split("").reverse().join("");
}

function Num2DOCSEnh(docnum)
{
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
    return reverse(filename)+"01!.ext";
}

function Num2DOCSunix(docnum)
{
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
    return reverse(filename)+"01_.ext";
}


function init()
{
}
window.onload=init;