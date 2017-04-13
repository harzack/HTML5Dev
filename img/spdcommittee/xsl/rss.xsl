<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method='html' version='4.01' encoding='UTF-8' indent='yes'/>

<xsl:template match="/">
	<xsl:for-each select="rss/channel/item">
		<div>
			<a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
				<xsl:value-of select="title" />
			</a>
		</div>
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>