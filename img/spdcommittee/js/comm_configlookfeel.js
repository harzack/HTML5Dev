var pageDirty = false;

function switchMainTab( tab )
{
	var theForm = getForm();
	theForm.objAction.value = "ConfigLookFeel";
	theForm.tab.value = tab;
	
	onSubmit();
}

function switchRole( selectList, tab )
{
	var theForm = getForm();
	theForm.tab.value = tab;
	theForm.objAction.value = "ConfigLookFeel";

	var o_col_length = selectList.length;

	for(var n=0; n < o_col_length; n++){
		if(selectList[n].selected == true){
			theForm.newroleid.value = selectList.options[n].value;
			break;
		}
	}
	
	onSubmit();
}

function enableRolebasedView( isEnabled, tab )
{
	var theForm = getForm();
	theForm.tab.value = tab;
	theForm.objAction.value = "ConfigLookFeel";

  var currentElement = document.createElement("input");
  currentElement.setAttribute("type", "hidden");
  currentElement.setAttribute("name", "rview");
  currentElement.setAttribute("id", "rview");
  currentElement.setAttribute("value", isEnabled );
  theForm.appendChild(currentElement);
  
	onSubmit();
}

function makeDirty()
{
	pageDirty = true
}
