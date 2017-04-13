var isIE = (document.all) ? true : false;
var isNS = !isIE;  //(document.layers) ? true : false;
var treeMenuBackground = "";
var treeMenuBgColor    = "#ffffff"; //"#ffffaa"//"#CCCC99";
var treeMenuFgColor    = "#000000";
var treeMenuHiBg       = "gray"; //"red"; //"#006666";
var treeMenuHiFg       = "#ffffff";
var treeMenuHoverColor = "blue";
var treeMenuHoverBgColor = "FFFF99"; //"yellow";
var treeMenuFont       = "Tahoma, Verdana, Geneva, Arial, Helvetica, sans-serif";
var treeMenuFontSize   = 2;
var treeMenuFontPoint   = "12px"; //"10pt";
var treeMenuFolders    = 1;
var treeMenuAltText    = true;
var gItems = new Array();

var displayIcons = false;
var disableFirstLevelClick = false;
var disableFolderClick = false;
//var usePathList = false;
var gSpacing = 1; //3
var useConnectingLines = false; //true

var MenuBarGif;
var MenuCornerGif;
var MenuTeeGif;
var MenuCornerMinusGif;
var MenuCornerPlusGif;
var MenuTeeMinusGif;
var MenuTeePlusGif;
var	MenuSpacerGif = treeMenuImgDir + "menu_spacer.gif";

if ( useConnectingLines )
{
	MenuBarGif = treeMenuImgDir + "menu_bar.gif";
	MenuCornerGif = treeMenuImgDir + "menu_corner.gif";
	MenuTeeGif = treeMenuImgDir + "menu_tee.gif";
	MenuCornerMinusGif = treeMenuImgDir + "menu_corner_minus.gif";
	MenuCornerPlusGif = treeMenuImgDir + "menu_corner_plus.gif";
	MenuTeeMinusGif = treeMenuImgDir + "menu_tee_minus.gif";
	MenuTeePlusGif = treeMenuImgDir + "menu_tee_plus.gif";
}
else
{
	MenuBarGif = MenuSpacerGif;
	MenuCornerGif = MenuSpacerGif;
	MenuTeeGif = MenuSpacerGif;
	MenuCornerMinusGif = treeMenuImgDir + "minus.gif";
	MenuCornerPlusGif = treeMenuImgDir + "plus.gif";
	MenuTeeMinusGif = treeMenuImgDir + "minus.gif";
	MenuTeePlusGif = treeMenuImgDir + "plus.gif";
}


var rootBGGif = treeMenuImgDir + "rootbackground1.gif";
var firstlevelBGGif = treeMenuImgDir + "rootbackground.gif";

var FolderClosedGif = treeMenuImgDir + "menu_folder_closed.gif";
var FolderOpenedGif = treeMenuImgDir + "menu_folder_open.gif";
var FolderOpenedGif2 = treeMenuImgDir + "menu_folder_open2.gif";
var DocumentGif = treeMenuImgDir + "menu_link_local.gif";
var RootGif = treeMenuImgDir + "menu_root.gif";

