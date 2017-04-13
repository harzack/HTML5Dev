<!-- Begin
//  SET ARRAYS
var day_of_week = new Array();
var month_of_year = new Array();
var appointments = new Array();
var gifs = new Array();
var gifs_index = 0;

//  DECLARE AND INITIALIZE VARIABLES
var Calendar = new Date();
var year = Calendar.getFullYear();   // Returns year
var month = Calendar.getMonth();    // Returns month (0-11)
var today = Calendar.getDate();    // Returns day (1-31)
var weekday = Calendar.getDay();    // Returns day (1-31)

var DAYS_OF_WEEK = 7;    // "constant" for number of days in a week
var DAYS_OF_MONTH = 31;    // "constant" for number of days in a month
var cal;    // Used for printing

var	dayURL;

function set_daylabels( sun, mon, tue, wed, th, fri, sat  ){
day_of_week = new Array( sun, mon, tue, wed, th, fri, sat );
}

function set_monthlabels1( jan, feb, mar, apr, may, jun ) {
month_of_year = new Array( jan, feb, mar, apr, may, jun );
}

function set_monthlabels2( jul, aug, sep, oct, nov, dec ) {
var monthList = new Array( jul, aug, sep, oct, nov, dec );
month_of_year = month_of_year.concat( monthList );
}

function set_dates( in_year, in_month, in_day, in_dayURL, in_appointments, in_gifs ) {

Calendar = new Date(in_year,in_month,in_day);

year = Calendar.getFullYear();   // Returns year
month = Calendar.getMonth();    // Returns month (0-11)
today = Calendar.getDate();    // Returns day (1-31)
weekday = Calendar.getDay();    // Returns day (1-31)

	dayURL = in_dayURL;
	appointments = in_appointments;
	gifs = in_gifs
}

function setPreviousMonth(){
Calendar = new Date(year,month-1,today);

year = Calendar.getFullYear();   // Returns year
month = Calendar.getMonth();    // Returns month (0-11)
today = Calendar.getDate();    // Returns day (1-31)
weekday = Calendar.getDay();    // Returns day (1-31)

	draw_Calendar();
}

function setNextMonth(){
Calendar = new Date(year,month+1,today);

year = Calendar.getFullYear();   // Returns year
month = Calendar.getMonth();    // Returns month (0-11)
today = Calendar.getDate();    // Returns day (1-31)
weekday = Calendar.getDay();    // Returns day (1-31)

	draw_Calendar();
}

function setToday(){
Calendar = new Date();

year = Calendar.getFullYear();   // Returns year
month = Calendar.getMonth();    // Returns month (0-11)
today = Calendar.getDate();    // Returns day (1-31)
weekday = Calendar.getDay();    // Returns day (1-31)

	GoCurrentMonth();
}

function GoCurrentMonth() {
	
	document.calButtons.calDate.value = year + "-" + ( month + 1 ) + "-" + today;
	document.calButtons.submit();
}

function draw_Calendar() {


Calendar.setDate(1);    // Start the calendar day at '1'
Calendar.setMonth(month);    // Start the calendar month at now
Calendar.setFullYear(year);

/* VARIABLES FOR FORMATTING
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
      tags to customize your caledanr's look. */

var TR_start = '<TR>';
var TR_end = '</TR>';
var highlight_start = '<TD WIDTH="30"><TABLE CELLSPACING=0 BORDER=1 BGCOLOR=DEDEFF BORDERCOLOR=CCCCCC><TR><TD WIDTH=20><B><CENTER>';
var highlight_end   = '</CENTER></TD></TR></TABLE></B>';
var app_start = '<TD WIDTH="30"><TABLE CELLSPACING=0 BORDER=1 BGCOLOR=CD9B9B BORDERCOLOR=CD5555><TR><TD WIDTH=20><B><CENTER>';
var app_end   = '</CENTER></TD></TR></TABLE></B>';

var TD_start = '<TD WIDTH="30"><CENTER>';
var TD_end = '</CENTER></TD>';

/* BEGIN CODE FOR CALENDAR
NOTE: You can format the 'BORDER', 'BGCOLOR', 'CELLPADDING', 'BORDERCOLOR'
tags to customize your calendar's look.*/

cal =  '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=0 BORDERCOLOR=BBBBBB WIDTH=180 style="border: 1px solid #AAAAAA;"><TR HEIGHT=150><TD VALIGN="TOP">';
cal += '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=2>' + TR_start;
cal += '<TD COLSPAN="' + DAYS_OF_WEEK + '" BGCOLOR="#EFEFEF" style="border-bottom: 1px solid #AAAAAA;"><CENTER><B>';
cal += month_of_year[month]  + ' &nbsp;&nbsp;' + year + '</B>' + TD_end + TR_end;
cal += TR_start;

//   DO NOT EDIT BELOW THIS POINT  //

// LOOPS FOR EACH DAY OF WEEK
for(index=0; index < DAYS_OF_WEEK; index++)
{

// BOLD TODAY'S DAY OF WEEK
if(weekday == index)
cal += TD_start + '<B>' + day_of_week[index] + '</B>' + TD_end;

// PRINTS DAY
else
cal += TD_start + day_of_week[index] + TD_end;
}

cal += TD_end + TR_end;
cal += TR_start;

// FILL IN BLANK GAPS UNTIL TODAY'S DAY
for(index=0; index < Calendar.getDay(); index++)
cal += TD_start + '&nbsp; ' + TD_end;

// LOOPS FOR EACH DAY IN CALENDAR
for(index=0; index < DAYS_OF_MONTH; index++)
{
if( Calendar.getDate() > index )
{
  // RETURNS THE NEXT DAY TO PRINT
  week_day =Calendar.getDay();

  // START NEW ROW FOR FIRST DAY OF WEEK
  if(week_day == 0)
  cal += TR_start;

  if(week_day != DAYS_OF_WEEK)
  {

  // SET VARIABLE INSIDE LOOP FOR INCREMENTING PURPOSES
  var day  = Calendar.getDate();

  if( appointments[index] != undefined )
  {
//alert( app_start + '<A HREF="' + dayURL + '&calDate=' + year + '-' + ( month + 1 ) + '-' + day + '" onmouseover="return escape(' + "'" + escape('<IMG SRC=\'') + gifs[gifs_index] + escape('\' WIDTH=\'16\' HEIGHT=\'16\' BORDER=\'0\'> ') + appointments[index] + "')" + '">' + day + '</A>' + app_end + TD_end)
//    cal += app_start + '<A HREF="' + dayURL + '&calDate=' + year + '-' + ( month + 1 ) + '-' + day + '" onmouseover="return escape(' + "'" + '<IMG SRC=\'' + gifs[gifs_index] + '\' WIDTH=\'16\' HEIGHT=\'16\' BORDER=\'0\'> ' + appointments[index] + "')" + '">' + day + '</A>' + app_end + TD_end;

    cal += app_start + '<A HREF="' + dayURL + '&calDate=' + year + '-' + ( month + 1 ) + '-' + day + '" onmouseover="return escape(' + "'" + appointments[index] + "')" + '">' + day + '</A>' + app_end + TD_end;
  }
  // HIGHLIGHT TODAY'S DATE
  else if( today==Calendar.getDate() )
  cal += highlight_start + '<A HREF="' + dayURL + '&calDate=' + year + '-' + ( month + 1 ) + '-' + day + '">' + day + '</A>' + highlight_end + TD_end;
  // PRINTS DAY
  else
  cal += TD_start + '<A HREF="' + dayURL + '&calDate=' + year + '-' + ( month + 1 ) + '-' + day + '">' + day + '</A>' + TD_end;
  }

  // END ROW FOR LAST DAY OF WEEK
  if(week_day == DAYS_OF_WEEK)
  cal += TR_end;
  }

  // INCREMENTS UNTIL END OF THE MONTH
  Calendar.setDate(Calendar.getDate()+1);

}// end for loop

cal += '</TD></TR></TABLE></TABLE>';

//  PRINT CALENDAR

if( document.getElementById("cal") ){
	document.getElementById("cal").innerHTML=  cal ;
}

}

function ajaxOnLoad_targetArea3030361(){
	draw_Calendar();
}
//  End -->
