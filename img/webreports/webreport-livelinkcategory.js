
// Copyright 2002-2008 Resonate KT Limited 
// Functions for the Livelink Category Attribute Operator Selection Menu

// dnalls


	// add a new Livelink Category Record. dnalls
	function addLivelinkCategory(nextNum)
	{
		document.getElementById("livelinkcategory_row_" + nextNum).style.display = "";
		document.getElementById("livelinkcategory_attrlist_row_" + nextNum).style.display = "";
		document.getElementById("livelinkcategory_attrlist_horiz_divider_" + nextNum).style.display = "";
	}
	
	
	// delete a Livelink Category Record
	function deleteLivelinkCategory(deleteRecID, deleteCatID)
	{	
		if (confirm('Are you sure you want to delete this category?'))
		{		
			var		theForm = document.SourceFrm
			
			theForm.livelinkcategory_DeleteRecID.value = deleteRecID;
			theForm.livelinkcategory_DeleteCatID.value = deleteCatID;			
			
			// skip validation. dnalls 11/26/2008
			//doSubmit(theForm, 1)
			theForm.apply.value = '1';
			theForm.submit()
		}		
	}
	
	// call action method to review the sql query - obsolete.
	// replaced with function below. dnalls 11/26/2008
	function viewQueryObsolete(nodeId, nextUrl)
	{
		var	ok = false
		if (isDirty)
		{
			if(confirm('Changes have been made and not saved.\nSelect OK to continue without saving changes.'))
			{
				ok = true
			}
		}
		else
		{
			ok = true
		}
		
		if (ok)	
		{
			window.location.href = '?func=ll&objAction=CategoryAttrsQuery&objId=' + nodeId + '&nextUrl=' + nextUrl		
		}
	}
	
	// call action method to review the sql query.
	// replacement for original function above. dnalls 11/26/2008
	function viewQuery(nodeId, nextUrl)
	{		
		
		if (isDirty)
		{	
			var		theForm 	= document.SourceFrm
			var		origNextUrl = theForm.nextURL.value
			
			// set the nextUrl value to be the CategoryAttrsQuery Page and the nextUrl for
			// that page should be our current page.
			theForm.nextURL.value = window.location.pathname + '?func=ll&objAction=CategoryAttrsQuery&objId=' + nodeId + '&nextUrl=' + escape(window.location)
			
			// skip validation			
			theForm.submit()
			
		}
		else		
		{
			window.location.href = '?func=ll&objAction=CategoryAttrsQuery&objId=' + nodeId + '&nextUrl=' + nextUrl		
		}
	}
	
		
	// update the attr param form field when a value
	// has been selected from the attribute operator menu
	function updateAttrParamStr(catId, attrId, selectedVal)
	{
		
		var	c = true
			
		// check to see if the object is checked in the opening window
		var checkObj 	= document.getElementById("livelinkcategory_attrlist_" + catId + "_" + attrId)
		var attrObj  	= document.getElementById("livelinkcategory_name_" + catId + "_" + attrId)
		var paramObj 	= document.getElementById("livelinkcategory_attrParamStr_" + catId + "_" + attrId)
		var iswrparam	= document.getElementById("livelinkcategory_iswrparam_" + catId + "_" + attrId).value
		var	imgMod  	= document.getElementById('imgMod').value
		var currVal		= paramObj.value
						
		// the attribute should be selected before we can apply a parameter.
		// technically, this should not happen because the menu will not display
		// if the attribute is not checked...but, let's cover all bases.			
		if (checkObj.checked == false)
		{							
			if(confirm("Attribute " + attrObj.value + " is not selected.\nWould you like to select the attribute now?"))
			{
				checkObj.checked=true;
			}
			else
			{
				c = false															
			}
		}
		
		// check to see if this attr is already a wr parameter
		if (c==true)
		{								
			if (iswrparam == 'true')
			{
				if (confirm('This Attribute is defined as a Web Report Parameter\n' +
					    'Select OK to automatically change the query operator for this parameter\n' +
					    'OR\n' +
					    'Select CANCEL if you would like to keep the current parameter'))
				{
					
					var chgwrparamObj 	= document.getElementById("livelinkcategory_changewrparam_" + catId + "_" + attrId)
					chgwrparamObj.value = 'true'					
				}			
			
			}
		
		}
		
		// proceed with updates?
		if (c==true)
		{	
			
			// clear checkmark image from current val				
			if (currVal != "")
			{
				document.getElementById("image_" + catId + "_" + attrId + "_" + currVal).src = imgMod + "wr_spacer.gif"
			}
			
			// clear an already selected value and update checkmark image					
			if (paramObj.value == selectedVal)
			{
				paramObj.value = ""				
			}
			
			// update new value and add checkmark image
			else
			{	
				paramObj.value = selectedVal
				document.getElementById("image_" + catId + "_" + attrId + "_" + selectedVal).src = imgMod + "wr_tinycheck.gif"		
			}						
						
			// set the menu image display
			setParamMenuDisplay(catId, attrId, paramObj.value)
										
			markDirty();							
		}		
		 			
	}
	
	
	
	// toggle the attribute parameters menu
	function setParamMenuDisplay(catId, attrId, paramStr)
	{
		
		var	imgMod  = document.getElementById('imgMod').value
		var	addStr  = document.getElementById('LivelinkCategoryAttrParamAddStr').value
		var	editStr = document.getElementById('LivelinkCategoryAttrParamEditStr').value
		var	dataId  = document.getElementById('dataId').value
		
		var checkObj = document.getElementById("livelinkcategory_attrlist_" + catId + "_" + attrId)
		var imgObj   = document.getElementById("x" + dataId + "_" + catId + "_" + attrId )
									
		if (checkObj.checked == false)
		{
			// use a spacer image so we don't have cell shifting.
			// dnalls 09/23/2008
			//imgObj.style.display = "none"	
			imgObj.src = imgMod + "wr_spacer_lg.gif"
			imgObj.alt = ""				
		}
		else
		{	
			if (imgObj != null)
			{			
				// set the image src			
				if (paramStr == "")
				{
					imgObj.src = imgMod + "wr_catparams_add.gif"	
					imgObj.alt = addStr
				}
				else
				{
					imgObj.src = imgMod + "wr_catparams_edit.gif"
					imgObj.alt = editStr
				}
				
				// now display the img
				imgObj.style.display = ""
			}				
		}	
	}
		
	
	
	// select/deselect all attributes for a category.
	// dnalls
	function checkAllAttrs(theForm, checkUncheck, catId)
	{
	
		for ( i = 0; i < theForm.length; i++ )
		{
			var paramStr = ""
			var tempobj  = theForm.elements[ i ]
			
			if ( tempobj.type.toLowerCase() == "checkbox" )
			{								 
				if (tempobj.name.substring(0,25) == "livelinkcategory_attrlist" &&
					tempobj.name.indexOf(catId)>0)						  
				{
					tempobj.checked = checkUncheck
					
					// reset the param string and image					
					var		nameList = tempobj.name.split('_')
					if (checkUncheck)
					{
						var paramObj = document.getElementById("livelinkcategory_attrParamStr_" + nameList[2] + "_" + nameList[3])
						paramStr	 = paramObj.value
					}
					
					setParamMenuDisplay(nameList[2], nameList[3], paramStr)					
					
				}	
			}
		}
		
		markDirty();
			
	}
	
	// open new window for attribute sql parameters.
	// dnalls
	function updateAttrsSQL(catId)
	{
		w = window.open("`.URL()`?func=ll&objId=`node.pId`&objAction=categoryAttrsSQL&catId=" + catId, "attrsqlupdate", "width=740,height=370,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes");
	}
	
	// validate each category for checked attributes
	// and display warnings if a category has no attributes checked.
	// also warn if no attributes are checked for all categories.
	// this will be called from validateSourceParameters() in webreports-datasource.html
	function validateAttrsOnSubmit()
	{
	
		var		oneAttrChecked = false
		var		catAttrChecked = false
		var		catId = '0'
		var		catName = ''
		var		attrArray
		var		obj
		for (i=0; i<SourceFrm.elements.length; i++)
		{
				
			obj = SourceFrm.elements[i]
			// look for a category row first
			if (obj.name.substring(0,25) == "livelinkcategory_attrlist")
			{
				// get catId
				attrArray = obj.name.split('_')
				
				if (attrArray[2] != catId)  // we hit a new set of attributes;
				{
					// check last category data and display warnings 
					if (catId != '0' && catAttrChecked == false)
					{
						//alert('Warning: Category ' + catName + ' has no attributes selected.\nIt will not be included in the SQL Query until one attribute has been selected.');
						alert(String.format( webreportStr["WarningCategory1HasNoAttributesSelectedItWillNotBeIncludedInTheSQLQueryUntilOneAttributeHasBeenSelected"] , catName));
					}
					
					// now, re-set category data and continue checks for new category					
					catId = attrArray[2]
					catName = document.getElementById("livelinkcategory_CatName_" + catId).value;
					catAttrChecked = false
										
				}
				
				if (obj.checked == true)
				{
					catAttrChecked = true
					oneAttrChecked = true
				}
				
			}
			
		}		
		
		// check last category data and display warnings 
		if (catId != '0' && catAttrChecked == false)
		{
			//alert('Warning:  Category ' + catName + ' has no attributes selected.\nIt will not be included in the SQL Query until one attribute has been selected.');
			alert(String.format(webreportStr["WarningCategory1HasNoAttributesSelectedItWillNotBeIncludedInTheSQLQueryUntilOneAttributeHasBeenSelected"], catName));
		}
		
		// alert if no attrs are checked
		if (catId != '0' && oneAttrChecked == false)
		{
			//alert('Warning: there are no attributes checked for any categories.\nThis will result in an empty SQL Query');
			alert( webreportStr["'WarningThereAreNoAttributesCheckedForAnyCategoriesThisWillResultInAnEmptySQLQuery"] );
		}	
	
	}
	

