<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      version="1.0" >

<!-- <xsl:output method="html"/> -->


            

<xsl:template match="/">
    <HTML>
        <HEAD>
            <TITLE>XML Search Results Page</TITLE>
        </HEAD>

        <BODY>


    <SCRIPT LANGUAGE="JavaScript">

                    var     supportURL = '<xsl:value-of select=".//OTMIMEType[1]/@IconURL"/>';
                    supportURL = '/' + supportURL.split('/')[1] + '/';


        <![CDATA[
        
            var allChecked = true
            
            function getSupportURL()
            {
                return supportURL
            }

            function displayPrintable()
            {
                var pResults = window.open('', 'printableResults')
                var pDoc = pResults.document

                var frm = window.document.xmlSearchResults
                var toDisplay = frm.toDisplay   
                var bSelected = false

                pDoc.write('<html><head><title>Printable Search Results</title></head><body>')

                pDoc.write('<script>')
                pDoc.write('var supportURL=""')                
                pDoc.write('<' + '/script>')
                
                pDoc.write('<table>')                
                pDoc.write(document.all['columnNames'].outerHTML)

                if (toDisplay.value == undefined)  // if its undefined, then its an array
                {
                    for (i = 0; i < toDisplay.length; i++)
                    {
                        if (toDisplay[i].checked)
                        {
                            // display checked items in pop-up window
                            pDoc.write(document.all['x'+toDisplay[i].value].outerHTML)
                            bSelected = true
                        }
                    }
                }
                else        // there was only one toDisplay on the page
                {
                    pDoc.write(document.all['x'+toDisplay.value].outerHTML)
                    bSelected = true
                }

                pDoc.write('</table></body></html>')

                if (bSelected)
                {
                    // remove elements with ID="removeElement" (such as checkboxes)
                    var removeTags = pDoc.all.item("removeElement")

                    for (var removeTag = removeTags[0]; removeTags.length != 0; removeTag = removeTags[0])
                    {
                        removeTag.outerText = ""
                    }
                }

            }
            
            
            function deselectAll()
            {
                var frm = window.document.xmlSearchResults
                var inputChecks = window.document.all.item("inputCheck")

                if (inputChecks.value == undefined)     // if its undefined, then its an array
                {
                    for (var i = 0; i < inputChecks.length; i++)
                    {
                        if (allChecked)
                        {
                            inputChecks[i].checked = false
                        }
                        else
                        {
                            inputChecks[i].checked = true
                        }
                    }
                }
                else        // there was only one input checkbox on the page
                {
                    if (allChecked)
                    {
                        inputChecks.checked = false
                    }
                    else
                    {
                        inputChecks.checked = true
                    }
                }
                
                if (allChecked)
                {
                    allChecked = false
                    frm.selectAll.value = "Select All"
                }
                else
                {
                    allChecked = true
                    frm.selectAll.value = "Deselect All"
                }
                
            }
            
        ]]>

    </SCRIPT>


<P/>

<FORM NAME="xmlSearchResults">
            <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
                <TR>
                    <TD BGCOLOR="#660066">

                    <TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0" WIDTH="100%">
                        <TR>
                            <TD NOWRAP="1" WIDTH="1%" ALIGN="LEFT" VALIGN="MIDDLE">
                                <SCRIPT LANGUAGE="JavaScript">
                                    document.write('<IMG SRC="' + supportURL + 'icon_search.gif" ALT="Search Result" ALIGN="TOP" WIDTH="29" HEIGHT="28" BORDER="0"></IMG>');
                                </SCRIPT>
                            </TD>

                            <TD NOWRAP="1" ALIGN="LEFT" VALIGN="MIDDLE">
                                <FONT COLOR="#FFFFFF" FACE="Arial,Helvetica,sans-serif">Search Result</FONT>
                            </TD>

                            <TD NOWRAP="1" WIDTH="1%" ALIGN="RIGHT" VALIGN="MIDDLE">
                                <SCRIPT LANGUAGE="JavaScript">
                                    document.write('<IMG SRC="' + supportURL + 'mast_icon_chicklet.gif" ALIGN="RIGHT" HSPACE="0" ALT="About Livelink" WIDTH="81" HEIGHT="28" BORDER="0"></IMG>');
                                </SCRIPT>
                            </TD>

                        </TR>

                        <TR>
                            <TD ALIGN="RIGHT" NOWRAP="1" BGCOLOR="#CCCCCC" COLSPAN="3">
                            <FONT SIZE="1" FACE="Arial,Helvetica,sans-serif">
                                <SCRIPT LANGUAGE="JavaScript">
                                    var     theDate = new Date();
                                    document.write( "&#160;"+ theDate + "&#160;" );
                                </SCRIPT>
                            </FONT>
                            </TD>
                        </TR>
                    </TABLE>

                    </TD>
                </TR>
            </TABLE>

            <BR/>
            
            <xsl:apply-templates/>
            
            <P/>
            
            <TABLE WIDTH="100%">
                <TR>
                    <TD WIDTH="1%">
                        <INPUT TYPE="BUTTON" NAME="selectAll" VALUE="Deselect All" ONCLICK="deselectAll()"/>
                    </TD>
                    <TD ALIGN="CENTER">
                        <INPUT TYPE="BUTTON" VALUE="Printable Results" ONCLICK="displayPrintable()"/>
                    </TD>
                </TR>
            </TABLE>
            
            <P/>

            <TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
                <TR>
                    <TD NOWRAP="1" ALIGN="LEFT" VALIGN="MIDDLE" BGCOLOR="#CCCCCC">
                        <FONT SIZE="1" FACE="Arial,Helvetica,sans-serif" COLOR="#666666">
                            &#160;Livelink &#174; Version 9.1.0, Copyright &#169; 1995-2002 Open Text Inc.  All rights reserved.
                        </FONT>
                    </TD>

                    <TD NOWRAP="1" ALIGN="RIGHT" VALIGN="MIDDLE" BGCOLOR="#CCCCCC">
                        <A HREF="javascript:location.hash='#top';void(0)">
                            <SCRIPT LANGUAGE="JavaScript">
                                document.write('<IMG SRC="' + supportURL + 'arrowup2.gif" ALT="Top" WIDTH="16" HEIGHT="16" BORDER="0"></IMG>');
                            </SCRIPT>
                        </A>
                    </TD>
                </TR>
            </TABLE>



</FORM>

        </BODY>
    </HTML>
</xsl:template>




<xsl:template match="SearchResults">
    <TABLE WIDTH="100%" CELLPADDING="2" CELLSPACING="1" BORDER="0">
        <TR ID="columnNames">
            <TD ID="removeElement" WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                &#160;
            </TD>
        
            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Type</FONT>&#160;
                </FONT>
            </TD>

            <TD NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">DataID</FONT>&#160;
                </FONT>
            </TD>

            <TD NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Name</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">File Number</FONT>&#160;
                </FONT>
            </TD>

            <TD NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Size</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">RSI</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Status</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Status Date</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Supplemental Markings</FONT>&#160;
                </FONT>
            </TD>

            <TD WIDTH="1%" NOWRAP="1" ALIGN="CENTER" STYLE="background:#CCCCCC;">
                <FONT SIZE="2" FACE="Arial,Helvetica,sans-serif">
                    &#160;<FONT COLOR="#000000">Current Classification</FONT>&#160;
                </FONT>
            </TD>
        </TR>
    
            <!-- Sort by increasing name -->
            <xsl:apply-templates select="SearchResult">
                <xsl:sort select=" rmCURRENTSECURITY" data-type="number" order="ascending"/>
            </xsl:apply-templates>
    
        </TABLE>
</xsl:template>

<xsl:template match="SearchResult">
    <TR>
        <xsl:if test="position() mod 2">
            <xsl:attribute name="STYLE">background:#EEEEEE;</xsl:attribute>
        </xsl:if>
        
        <xsl:attribute name="ID">x<xsl:value-of select="normalize-space(OTDataID)"/></xsl:attribute>
        
        <TD ID="removeElement" NOWRAP="1" ALIGN="CENTER">
            <INPUT>
                <xsl:attribute name="TYPE">CHECKBOX</xsl:attribute>
                <xsl:attribute name="ID">inputCheck</xsl:attribute>
                <xsl:attribute name="NAME">toDisplay</xsl:attribute>
                <xsl:attribute name="VALUE"><xsl:value-of select="normalize-space(OTDataID)"/></xsl:attribute>
                <xsl:attribute name="CHECKED">1</xsl:attribute>
            </INPUT>
        </TD>
    
        <TD NOWRAP="1" ALIGN="CENTER">

            <!-- Display Official icon if the item is an official document -->
            <xsl:if test="normalize-space(rmOfficial) = '1'">
                <SCRIPT LANGUAGE="JavaScript">
                    document.write('<IMG SRC="' + supportURL + 'recman/official.gif" ALT="Official" WIDTH="8" HEIGHT="8" BORDER="0"></IMG>');
                </SCRIPT>
            </xsl:if>

            <A>
                <xsl:attribute name="HREF">
                    <xsl:value-of select="OTName/@ViewURL"/>
                </xsl:attribute>

                <IMG>
                    <xsl:attribute name="SRC">
                        <xsl:value-of select="OTMIMEType/@IconURL"/>
                    </xsl:attribute>

                    <xsl:attribute name="BORDER">
                        0
                    </xsl:attribute>
                </IMG>
            </A>

        </TD>
    
        <!-- Display the Node ID -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select="OTDataID"/>
        </TD>

        <!-- Display the name with an HREF -->
        <TD NOWRAP="1">
            &#160;
            <A>
                <xsl:attribute name="HREF">
                    <xsl:value-of select="OTName/@ViewURL"/>
                </xsl:attribute>
                <xsl:value-of select="OTName"/>
            </A>
        </TD>

        <!-- Display the File Number -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select="rmFileNumber"/>
        </TD>

        <!-- Display the Size -->
        <TD NOWRAP="1" ALIGN="RIGHT">
            &#160;
            <xsl:value-of select="OTObjectSize"/> <xsl:value-of select="OTObjectSize/@Suffix"/>
        </TD>

        <!-- Display the RSI -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select="rmRSI"/>
        </TD>

        <!-- Display the Status -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select="rmStatus"/>
        </TD>

        <!-- Display the Status Date -->
        <TD NOWRAP="1" ALIGN="CENTER">
            &#160;
            <xsl:if test="normalize-space(rmStatusDate) != ''">
                <xsl:value-of select="concat(substring(normalize-space(rmStatusDate), 5, 2), '/', substring(normalize-space(rmStatusDate), 7, 2), '/', substring(normalize-space(rmStatusDate), 1, 4))"/>
            </xsl:if>
        </TD>

        <!-- Display the Supplemental Markings -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select="rmSupplementalMarkings"/>
        </TD>

        <!-- Display the Current Classification -->
        <TD NOWRAP="1">
            &#160;
            <xsl:value-of select=" rmCURRENTSECURITY"/>
        </TD>
    </TR>

</xsl:template>

</xsl:stylesheet>
