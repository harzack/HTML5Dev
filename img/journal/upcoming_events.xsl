<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="journal">
    <html>
      <head>
        <title>journal xslt output</title>
      </head>
      <body>
        <h1> A list of upcoming events</h1>
        <table>
          <xsl:apply-templates/>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="entry">
  <tr>
    <td><xsl:number/></td>
  </tr>
  <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="name | location | visit | phone | journaltext | thru | email | subscription | audience">
    <tr>
    <td><xsl:value-of select="."/></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>

