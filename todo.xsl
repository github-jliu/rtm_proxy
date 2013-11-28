<?xml version='1.0'?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:feed="http://www.w3.org/2005/Atom"
	xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<xsl:output method="html"/>

<xsl:template match="feeds">
	<ol>
	<xsl:for-each select="//feed:entry">
		<xsl:sort select="feed:updated" order="descending"/>

		<xsl:apply-templates select="."/>
	</xsl:for-each>
	</ol>
</xsl:template>

<xsl:template match="feed:feed">
	<ol>
	<xsl:apply-templates select="feed:entry"/>
	</ol>
</xsl:template>

<xsl:template match="feed:entry">
	<li class="pr_{feed:content//xhtml:span[@class = 'rtm_priority_value'][1]/text()}">
	<xsl:value-of select="feed:title"/>
	</li>
</xsl:template>

<xsl:template match="feed:feed[@completedtasks='1']//feed:entry">
	<li class="complete"><s><xsl:value-of select="feed:title"/></s></li>
</xsl:template>
<xsl:template match="feed:feed[@completedtasks='0']//feed:entry">
	<li class="incomplete"><xsl:value-of select="feed:title"/></li>
</xsl:template>

</xsl:stylesheet>