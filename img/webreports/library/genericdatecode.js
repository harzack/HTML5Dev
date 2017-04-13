// Modification date: 2007/07/31		
// Version 2.2
// This file provides a generic version of the functions used by Livelink to manage
// dates. Normally Livelink forms and attributes have a copy of these functions for 
// every date field.  This code allows the date fields to pass in the identifier of 
// the particular date field so that the generic code can do its thing. 
//
// To use these generic functions, each onchange="_updateDate... call needs to pass an 
// identifier in the fourth parameter.  E.g: 
//	
//	onChange="_updateDate( this, this.form, null, '_1_1_11_1' );"
//
//
// In addion to the above, a ultility script, _setDate(), is provided.  This is normally 
// used to set initial date values in a form or WR Power View with the current value
// in the database for a given field. E.g: 
//
//	_setDate( document.forms.wfForm._1_1_8_1, "[LL_REPTAG=PAYMENTDUE DATE:'%Y.%m.%d' /]");
//
// in this example, the DATE subtag is used to get the date into the right format for
// _setDate().  _setDate() expects two parameters
//	1) The HTML form field element
//	2) The initial date value in format YY.MM.DD
//
//



// Global Variables
// 
// These variables are used for the _updateDate function for all dates.
var formfield;
var formfieldyear;
var formfieldmonth;
var formfieldday;
 
function _updateDate( changedField, form, newDate ,fieldStr){

	formfield = form[ fieldStr ];
	formfieldday = form[ fieldStr + '_day' ];
	formfieldmonth = form[ fieldStr + '_month' ];
	formfieldyear = form[ fieldStr + '_year' ];

	var	t;
	if ( null == changedField ){
		t = form;
	} else {
		t = changedField.form;
	}
	if ( ( null != changedField ) && ( changedField.selectedIndex == 0 ) ){
		_noSelection( t )
	} else {
		var	year;
		var	theDate = newDate;
		if ( null == newDate ){
			theDate = new Date();
		}
		year = _updateYearCentury( t, theDate );
		_updateDayMonth( t, year, theDate );
		_constructOScripDate( t );
	}
} // _updateDate


function _noSelection( form ){
	formfieldday.selectedIndex = 0;
	formfieldyear.selectedIndex = 0;
	formfield.value = '?';
} // _noSelection


function _updateYearCentury( form, newDate ){
	var	year;
	var	yearIndex = formfieldyear.selectedIndex;
	var curYear = ( newDate.getFullYear == null ) ? newDate.getYear() : newDate.getFullYear();
	if ( formfieldyear.selectedIndex == 0 ){
		// NO year was selected, use the current year. Find the index:
		var yearList = formfieldyear.children;
		for (yearIndex=1;yearIndex < yearList.length;yearIndex++) {
			if (yearList[yearIndex].value == curYear) {
				break;
			}
		}
	}
	var	yearString = formfieldyear.options[ yearIndex ].value
	year = eval( yearString )
	formfieldyear.selectedIndex = yearIndex;
	return year
} // _updateYearCentury


function _updateDayMonth( form, year, newDate ){
	var	monthIndex = formfieldmonth.selectedIndex;
	var	dayIndex = formfieldday.selectedIndex;
	if ( 0 == formfieldmonth.selectedIndex ){
		monthIndex = newDate.getMonth() + 1;
	}
	if ( 0 == formfieldday.selectedIndex ){
		dayIndex = newDate.getDate();
	}
	if ( "2" == formfieldmonth.options[ monthIndex ].value ){
		formfieldday.options[ 31 ] = null;
		formfieldday.options[ 30 ] = null;
		if ( ( ( year % 400 ) == 0 ) || ( ( ( year % 100 ) !=0 ) && ( ( year % 4 ) ==0 ) ) ){
			if ( formfieldday.options[ 29 ] == null ){
				formfieldday.options[ 29 ] = new Option( "29"  );
				formfieldday.options[ 29 ].value = "29";
			}
			if ( dayIndex > 29 ){
				dayIndex = 29;
			}
		} else {
			formfieldday.options[ 29 ] = null;
			if ( dayIndex > 28 ){
				dayIndex = 28;
			}
		}
	}
	if ( formfieldmonth.options[ monthIndex ].value ==  "1" ||
		formfieldmonth.options[ monthIndex ].value ==  "3" ||
		formfieldmonth.options[ monthIndex ].value ==  "5" ||
		formfieldmonth.options[ monthIndex ].value ==  "7" ||
		formfieldmonth.options[ monthIndex ].value ==  "8" ||
		formfieldmonth.options[ monthIndex ].value == "10" ||
		formfieldmonth.options[ monthIndex ].value == "12"
	){
		if ( formfieldday.options[ 29 ] == null ){
			formfieldday.options[ 29 ] = new Option( "29" );
			formfieldday.options[ 29 ].value = "29";
		}
		if ( formfieldday.options[ 30 ] == null ){
			formfieldday.options[ 30 ] = new Option( "30" );
			formfieldday.options[ 30 ].value = "30";
		}
		if ( formfieldday.options[ 31 ] == null ){
			formfieldday.options[ 31 ] = new Option( "31" );
			formfieldday.options[ 31 ].value = "31";
		}
	}
	if ( formfieldmonth.options[ monthIndex ].value ==  "4" ||
		formfieldmonth.options[ monthIndex ].value ==  "6" ||
		formfieldmonth.options[ monthIndex ].value ==  "9" ||
		formfieldmonth.options[ monthIndex ].value == "11" 
	){
		if ( formfieldday.options[ 29 ] == null ){
			formfieldday.options[ 29 ] = new Option( "29" );
			formfieldday.options[ 29 ].value = "29";
		}
		if ( formfieldday.options[ 30 ] == null ){
			formfieldday.options[ 30 ] = new Option( "30" );
			formfieldday.options[ 30 ].value = "30";
		}
		formfieldday.options[ 31 ] = null;
		if ( dayIndex > 30 ){
			dayIndex = 30;
		}
	}
	formfieldmonth.selectedIndex = monthIndex;
	formfieldday.selectedIndex = dayIndex;
} // _updateDayMonth


function _constructOScripDate( form ){
	var yearString = formfieldyear.options[ formfieldyear.selectedIndex ].value;
	formfield.value = 'D/' + yearString + '/';
	formfield.value = formfield.value + formfieldmonth.options[ formfieldmonth.selectedIndex].value + '/';
	formfield.value = formfield.value + formfieldday.options[ formfieldday.selectedIndex].value + ':';
	formfield.value = formfield.value + '0:0:0';
} // _constructOScripDate


function _changeTo( newDate, form ){
	formfieldmonth.selectedIndex = 0;
	formfieldday.selectedIndex = 0;
	formfieldyear.selectedIndex = 0;
	if ( newDate != null ){
		_updateDate( null, form, newDate );
	}
} // _changeTo


function _getDate( form ){
	var	retDate = null
	var	oscriptDateString = formfield.value
	if ( oscriptDateString != '?' ){
		var	temp = oscriptDateString.split( '/' )
		var	temp2 = temp[ 3 ].split( ':' )
		var	yearX = parseInt( temp[ 1 ] )
		var	monthX = parseInt( temp[ 2 ] ) - 1
		var	dayX = parseInt( temp2[ 0 ] )
		retDate = new Date( yearX, monthX, dayX, hourX, minuteX, secondX )
	}
	return retDate
} // _getDate



function _setDate( elem, strdate ){
	if (strdate != "?"){
		var temp = strdate.split('.');
		var newDate = new Date(temp[0],(temp[1]-1),temp[2]);
		var name = elem.name;
		_updateDate ( null, elem.form, newDate, name );
	}
} // _setDate