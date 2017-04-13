// JavaScript Document
	function IsNumeric(strString)
   		//  check for valid numeric strings	
	   {
	   var strValidChars = "0123456789";
	   var strChar;
	   var blnResult = true;
	
	   if (strString.length == 0) return false;
	
	   //  test strString consists of valid characters listed above
	   for (i = 0; i < strString.length && blnResult == true; i++)
	      {
	      strChar = strString.charAt(i);
	      if (strValidChars.indexOf(strChar) == -1)
	         {
	         blnResult = false;
	         }
	      }
	   return blnResult;
	   }

		function doSubmit( theForm, operation )
		{
			//debugger;
			theForm.Operation.value = operation;
			if(theForm.topics){//There are entries
				if(theForm.topics.type=="text"){ //one
					if (!IsNumeric(theForm.topics.value)){
						alert("`[BLOG_ERRMSG.NumberOfTopicsMustBeNumeric]`");
						return false;
					}
				}
				else{ //array of elements
					for(var i=0;i<theForm.topics.length;i++){
						if (!IsNumeric(theForm.topics[i].value)){
							alert("`[BLOG_ERRMSG.NumberOfTopicsMustBeNumeric]`");
							return false;
						}
					}
				}
				if(theForm.topicsLength.type=="text"){ //one
					if (!IsNumeric(theForm.topicsLength.value)){
						alert("`[BLOG_ERRMSG.TopicLengthMustBeNumeric]`");
						return false;
					}
				}
				else{ //array of elements
					for(var i=0;i<theForm.topicsLength.length;i++){
						if (!IsNumeric(theForm.topicsLength[i].value)){
							alert("`[BLOG_ERRMSG.TopicLengthMustBeNumeric]`");
							return false;
						}
					}
				}
			}
			theForm.submit();
			return false;
		}

		function ATT_DoSelection(selectedList)
		{
			document.CreateForm.ATT_ID.value=selectedList
			document.CreateForm.Operation.value = 'Add';
			document.CreateForm.submit();
		}

		function HeadlinesATT_DoSelection(selectedList)
		{
			document.CreateForm.ATT_ID.value=selectedList
			document.CreateForm.Operation.value = 'AddHeadlineBlog';
			document.CreateForm.submit();
		}

		function select_all(array)
		{
			for ( var i = 0; i < document.Frm.length; i++ )
			{
				var s = Number(document.Frm[ i ].name);
				if (s > 0) {
					document.Frm[ i ].checked = true;
					addSelectedNodeIndex( s, array )
				}
			}
		}

		function select_all_headlines(array)
		{
			for ( var i = 0; i < document.FrmHeadlines.length; i++ )
			{
				var s = Number(document.FrmHeadlines[ i ].name);
				if (s > 0) {
					document.FrmHeadlines[ i ].checked = true;
					addSelectedNodeIndex( s, array )
				}
			}
		}

		function executeUpdate(url)
		{
			document.Frm.action=url;
			document.Frm.removelist.value="{" + selectedNodeArray.join(',') + "}";
			document.Frm.Operation.value = 'Delete';
			document.Frm.submit();
			return false;
		}

		function executeHeadlinesUpdate(url)
		{
			document.FrmHeadlines.action=url;
			document.FrmHeadlines.removelist.value="{" + selectedHeadlinesNodeArray.join(',') + "}";
			document.FrmHeadlines.Operation.value = 'DeleteHeadlineBlog';
			document.FrmHeadlines.submit();
			return false;
		}

		// open the new window to select flagged documents of the specific department or project
		function doSelectFlagged(formName, fieldPrefix, deptorprojID)
		{
			var	w;

			w = window.open("`.URL()`?func=ll&objID=" + deptorprojID + "&objAction=listflaggeddocuments&formName=" + formName + "&fieldPrefix=" + fieldPrefix + "&multiSelect=on", "SelectWidget", "width=650,height=450,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes");
			if (w.focus)
			{
				w.focus()
			}
		}

		var selectedNodeArray = new Array();
		//var clearBasketNodeArray = new Array();

		var selectedHeadlinesNodeArray = new Array();

		function getSelectedNodeIndex( nodeid, array )
		{
			if ( array != null )
			{
				for ( var i = 0; i < array.length; i++ )
				{
					if ( array[ i ] == nodeid )
					{
						return i;
					}
				}
			}

			return -1;
		}

		function addSelectedNodeIndex( nodeid, array )
		{
			var sidx = getSelectedNodeIndex( nodeid, array )
			if ( sidx < 0 )
			{
				array.length += 1;
				array[ array.length-1 ] = nodeid;
			}
		}

		//function addAllNodeIndex( nodeid, array )
		//{
		//	var sidx = getSelectedNodeIndex( nodeid, array )
		//	if ( sidx < 0 )
		//	{
		//		clearBasketNodeArray.length += 1;
		//		clearBasketNodeArray[ clearBasketNodeArray.length-1 ] = nodeid;
		//	}
		//}

		function removeSelectedNodeIndex( nodeid, array )
		{
			var si = getSelectedNodeIndex( nodeid, array )
			if ( si >= 0 )
			{
				for ( var j = ( si + 1 ); j < array.length; j++ )
				{
					array[ j - 1 ] = array[ j ];
				}
				array.length -= 1;
			}
		}

		function switchMainTab( id )
		{
			var div1 = document.getElementById('Blogs');
			var div2 = document.getElementById('Headlines');
			var tab1 = document.getElementById('nav-1');
			var tab2 = document.getElementById('nav-2');

			document.CreateForm.tab.value = id;
		
			if ( id == 1 )
			{
				div1.style.display = "block";
				div2.style.display = "none";;
				tab1.className="tab_selected";
				tab2.className="tab_notselected";
			}
			else
			{
				div1.style.display = "none"
				div2.style.display = "block"
				tab1.className="tab_notselected";
				tab2.className="tab_selected";
			}	
		}

    function showFonts( key )
    {
 			var div1 = document.getElementById('fonts' + key);
 			
 			div1.style.display = "block"; 
    }
    
    function setFont( key, fontvalue, fontlabel )
    {
			var fontinput = document.getElementById('fontsize' + key);
      fontinput.value = fontvalue;

			var fontdisplay = document.getElementById('fontsizedisplay' + key);
      fontdisplay.value = fontlabel;

 			var div1 = document.getElementById('fonts' + key);			
 			div1.style.display = "none"; 
    }
