<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:llx="http://www.opentext.com/llx/" xmlns:llxw="http://www.opentext.com/llx/workflow/">
	<xsl:output method="html" encoding="iso-8859-1" indent="yes"/>
	<xsl:template match="livelink">
		<xsl:variable name="supportBaseDir">
			<xsl:value-of select="/descendant::node()[@name = 'HTTP_livelinksupport_name']/@value"/>spdcommittee</xsl:variable>
		<html>
			<head>
				<title>
					<xsl:value-of select="descendant::translations/personalwebpage"/>
				</title>
				<link rel="stylesheet" type="text/css" href="{$supportBaseDir}/css/personal_webpage.css"/>
				<script type="text/javascript">
					function notImplemented()
					{
						alert("Not implemented yet!");
					}
					
					function checkType( theForm )
					{
						if ( theForm._ug_searchColumn.options[ theForm._ug_searchColumn.selectedIndex ].text == "<xsl:value-of select="descendant::translations/searchbygroup"/>" )
						{
							theForm._ug_searchType.value = "<xsl:value-of select="descendant::membersearch/uapigroup"/>";
							theForm._ug_sortCols.value = "LASTNAME|NAME";
						}
						else
						{
							theForm._ug_searchType.value = "<xsl:value-of select="descendant::membersearch/uapiuser"/>"
							
							if ( theForm._ug_searchColumn.options[ theForm._ug_searchColumn.selectedIndex ].text == "<xsl:value-of select="descendant::membersearch/searchby/bylogin"/>" )
							{
								theForm._ug_sortCols.value = "NAME|LASTNAME"
							}
							else
							{
								theForm._ug_sortCols.value = "LASTNAME|NAME"
							}
						}
					}
					
					function checkForm()
					{
						if(trim(document.membersearchform._ug_searchValue.value) == '')
						{
							alert("<xsl:value-of select="descendant::translations/entersearchterm"/>");
							document.membersearchform._ug_searchValue.value = '';
							document.membersearchform._ug_searchValue.focus();
							return false;
						}
						else
						{
							return true;
						}
					}
					
					function trim(str)
					{
						return str.replace(/^\s*|\s*$/g,"");
					}
					
					function showAdvanced()
					{					
				    		var moreinfo = document.getElementById('moreinfo');
				  		var showlink = document.getElementById('showLink');
				    		var hidelink = document.getElementById('hideLink');
				
				       	moreinfo.style.display = 'block';
				       	showlink.style.display = 'none';
				     		hidelink.style.display = 'inline';
					}
			
					function hideAdvanced()
					{					
				    		var moreinfo = document.getElementById('moreinfo');
				    		var hidelink = document.getElementById('hideLink');
				  		var showlink = document.getElementById('showLink');
				  
				       	moreinfo.style.display = 'none';
				       	showlink.style.display = 'inline';
				      		hidelink.style.display = 'none';
					}
					
				</script>
			</head>
			<body>
				<table width="800" border="0" align="center" cellpadding="6" cellspacing="0" style="border: 1px solid #669999;">
					<form name="membersearchform" action="{context/cgi/@script_name}" method="post" onsubmit="return checkForm()">
						<xsl:for-each select="descendant::membersearch/hiddenfields/node()[name() != '']">
							<input type="hidden" name="{name()}" value="{text()}"/>
						</xsl:for-each>
						<tr>
							<td class="textTitleBanner" bgcolor="#DEEBF4" width="50%">
								<xsl:value-of select="descendant::userinfo/fullname"/>
							</td>
							<td class="text" bgcolor="#DEEBF4" width="50%" align="right" nowrap="nowrap">
								<xsl:value-of select="descendant::translations/searchfor"/>:<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
								<input type="text" name="_ug_searchValue" size="20"/>
								<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
								<xsl:value-of select="descendant::translations/by"/>:<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
								<select name="_ug_searchColumn" onchange="checkType( this.form )">
									<option value="{descendant::membersearch/searchby/bylastname}">
										<xsl:value-of select="descendant::translations/searchbylastname"/>
									</option>
									<option value="{descendant::membersearch/searchby/byfirstname}">
										<xsl:value-of select="descendant::translations/searchbyfirstname"/>
									</option>
									<option value="{descendant::membersearch/searchby/bylogin}">
										<xsl:value-of select="descendant::translations/searchbylogin"/>
									</option>
									<option value="{descendant::membersearch/searchby/bygroup}">
										<xsl:value-of select="descendant::translations/searchbygroup"/>
									</option>
									<option value="{descendant::membersearch/searchby/byinterest}">
										<xsl:value-of select="descendant::translations/searchbyinterest"/>
									</option>
								</select>
								<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
								<input type="submit" name="Submit" value="{descendant::translations/search}" class="saveButton"/>
							</td>
						</tr>
					</form>
				</table>
				<br/>
				<xsl:if test="descendant::facilitator and descendant::facilitator = 'true'">
					<table width="800" border="0" align="center" cellpadding="6" cellspacing="0" style="border: 1px solid #AAAAAA;">
						<tr>
							<td align="right" bgcolor="#EEEEEE" class="textColor01">
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::myprofile/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/myprofile"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::personalfrontpage/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/personalfrontpage"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::mycontributions/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/mycontributions"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::mycommunities/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/mycommunities"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::myblogs/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/myblogs"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::myfriends/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/myfriends"/>
								</a>
								 |
								<a>
									<xsl:attribute name="href"><xsl:value-of select="descendant::editpage/href"/></xsl:attribute>
									<xsl:value-of select="descendant::translations/editpage"/>
								</a>
								 | <a href="javascript:notImplemented()">My Documents</a> | <a href="javascript:notImplemented()">My Lists</a>
							</td>
						</tr>
					</table>
					<br/>
				</xsl:if>
				<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">
					<tr>
						<td style="border-left: 1px solid #AAAAAA;">
							<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
						</td>
						<td width="200" align="left" valign="top" bgcolor="#F7F7F7">
							<!-- ************************************************** My Profile ************************************************** -->
							<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
								<tr>
									<td height="24" colspan="2" valign="middle" background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td width="20">
													<img src="{$supportBaseDir}/personalwebpage/my_profile.gif" width="18" height="18"/>
												</td>
												<td class="sectionTitle">
													<xsl:value-of select="descendant::translations/myprofile"/>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td height="10" colspan="2" bgcolor="#d9d9b5" class="textBold">
										<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
									</td>
								</tr>
								<tr bgcolor="#d9d9b5">
									<td colspan="2" align="center" valign="middle" class="textBold">
										<table border="0" cellspacing="0" cellpadding="1" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
											<tr>
												<td bgcolor="#CCCCCC">
													<xsl:choose>
														<xsl:when test="descendant::userinfo/photo">
															<img>
																<xsl:attribute name="src"><xsl:value-of select="descendant::header[@name = 'HTTP_baseURL']/@value"/>/<xsl:value-of select="descendant::userinfo/photo/filename"/>?func=doc.Fetch&amp;nodeId=<xsl:value-of select="descendant::userinfo/photo/photoid"/></xsl:attribute>
																<xsl:attribute name="alt"><xsl:value-of select="descendant::userinfo/fullname"/></xsl:attribute>
															</img>
														</xsl:when>
														<xsl:otherwise>
															<img width="80" height="80">
																<xsl:attribute name="src"><xsl:value-of select="$supportBaseDir"/>/personalwebpage/no_photo.gif</xsl:attribute>
																<xsl:attribute name="alt"><xsl:value-of select="descendant::userinfo/fullname"/></xsl:attribute>
															</img>
														</xsl:otherwise>
													</xsl:choose>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td height="10" colspan="2" bgcolor="#d9d9b5" class="textBold">
										<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
									</td>
								</tr>
								<xsl:if test="descendant::userinfo/name and descendant::userinfo/name != ''">
									<tr>
										<td width="30%" bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/login"/>:</td>
										<td width="70%" bgcolor="#d9d9b5" class="text">
											<xsl:value-of select="descendant::userinfo/name"/>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="descendant::userinfo/firstname and descendant::userinfo/fullname != ''">
									<tr>
										<td bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/name"/>:</td>
										<td bgcolor="#d9d9b5" class="text">
											<xsl:value-of select="descendant::userinfo/fullname"/>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="descendant::userinfo/title and descendant::userinfo/title != ''">
									<tr>
										<td bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/title"/>:</td>
										<td bgcolor="#d9d9b5" class="text">
											<xsl:value-of select="descendant::userinfo/title"/>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="(descendant::userinfo/contact and descendant::userinfo/contact != '') or descendant::userinfo/fax and descendant::userinfo/fax != ''">
									<tr>
										<td height="10" colspan="2" bgcolor="#d9d9b5">
											<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
										</td>
									</tr>
									<xsl:if test="descendant::userinfo/contact and descendant::userinfo/contact != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/phone"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/contact"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/fax and descendant::userinfo/fax != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/fax"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/fax"/>
											</td>
										</tr>
									</xsl:if>
								</xsl:if>
								<xsl:if test="descendant::userinfo/mailaddress and descendant::userinfo/mailaddress!= ''">
									<tr>
										<td height="10" colspan="2" bgcolor="#d9d9b5">
											<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
										</td>
									</tr>
									<tr>
										<td bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/email"/>:</td>
										<td bgcolor="#d9d9b5" class="text">
											<a href="mailto:{descendant::userinfo/mailaddress}">
												<xsl:value-of select="descendant::userinfo/mailaddress"/>
											</a>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="descendant::userinfo/officelocation and descendant::userinfo/officelocation != ''">
									<tr>
										<td height="10" colspan="2" bgcolor="#d9d9b5">
											<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
										</td>
									</tr>
									<tr>
										<td bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/office"/>:</td>
										<td bgcolor="#d9d9b5" class="text">
											<xsl:value-of select="descendant::userinfo/officelocation"/>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="descendant::userinfo/timezone and descendant::userinfo/timezone != ''">
									<tr>
										<td bgcolor="#d9d9b5" class="textBold">
											<xsl:value-of select="descendant::translations/timezone"/>:</td>
										<td bgcolor="#d9d9b5" class="text">
											<xsl:value-of select="descendant::userinfo/timezone"/>
										</td>
									</tr>
								</xsl:if>
								<tr>
									<td height="10" colspan="2" bgcolor="#d9d9b5">
										<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="10"/>
									</td>
								</tr>
								<tr>
									<td height="10" colspan="2" bgcolor="#d9d9b5" align="right">
										<a id="showLink" href="#" onclick="showAdvanced();" style="display:inline;">more info...</a>
										<a id="hideLink" href="#" onclick="hideAdvanced();" style="display:none;">hide more info</a>
									</td>
								</tr>
							</table>
							<div id="moreinfo" style="display:none;">
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<xsl:if test="descendant::userinfo/birthday and descendant::userinfo/birthday != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/birthday"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/birthday"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/gender and descendant::userinfo/gender != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/gender"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/gender"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/personalemail and descendant::userinfo/personalemail != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/personalemail"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<a href="mailto:{descendant::userinfo/personalemail}">
													<xsl:value-of select="descendant::userinfo/personalemail"/>
												</a>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/node()[contains(name(), 'homeaddress')]">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/homeaddress"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:for-each select="descendant::userinfo/node()[contains(name(), 'homeaddress')]">
													<xsl:value-of select="text()"/>
													<br/>
												</xsl:for-each>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/homephone and descendant::userinfo/homephone != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/homephone"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/homephone"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/homefax and descendant::userinfo/homefax != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/homefax"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/homefax"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/cellularphone and descendant::userinfo/cellularphone != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/cellularphone"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/cellularphone"/>
											</td>
										</tr>
									</xsl:if>
									<xsl:if test="descendant::userinfo/pager and descendant::userinfo/pager != ''">
										<tr>
											<td bgcolor="#d9d9b5" class="textBold">
												<xsl:value-of select="descendant::translations/pager"/>:</td>
											<td bgcolor="#d9d9b5" class="text">
												<xsl:value-of select="descendant::userinfo/pager"/>
											</td>
										</tr>
									</xsl:if>
								</table>
							</div>
							<!-- ************************************************** End My Profile ************************************************** -->
							<!-- ************************************************** Invite as a friend ************************************************** -->
							<xsl:if test="descendant::facilitator and descendant::facilitator = 'false'">
								<br/>
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border: 1px solid #AAAAAA;">
									<tr>
										<td bgcolor="#FFFFFF" height="20" align="right" width="20">
											<img src="{$supportBaseDir}/personalwebpage/invite_as_friend.gif" width="16" height="16" hspace="0" vspace="0"/>
										</td>
										<td bgcolor="#FFFFFF" valign="middle">
											<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
											<a href="javascript:notImplemented()" class="textBold">Invite as a friend</a>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End Invite as a friend ************************************************** -->
							<!-- ************************************************** My Interests ************************************************** -->
							<xsl:if test="descendant::userinfo/interests and descendant::userinfo/interests != ''">
								<br/>
								<table width="100%" border="0" cellpadding="2" cellspacing="0" bordercolor="#999999" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_interersts.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/myinterests"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td bgcolor="#FFFFFF" class="text">
											<xsl:value-of select="descendant::userinfo/interests"/>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Interests ************************************************** -->
							<!-- ************************************************** Homepage ************************************************** -->
							<xsl:if test="descendant::userinfo/node()[name() = 'homepage']">
								<br/>
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_links.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/homepage"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td class="text" bgcolor="#FFFFFF">
											<table cellspacing="1" cellpadding="2" width="100%" border="0">
												<tr>
													<!--xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute-->
													<td valign="top" class="text">
														<a href="{descendant::userinfo/node()[name() = 'homepage']}" target="_blank">
															<img src="{$supportBaseDir}/personalwebpage/url.gif" width="16" height="16" border="0"/>
														</a>
														<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
														<a href="{descendant::userinfo/node()[name() = 'homepage']}" target="_blank">
															<xsl:value-of select="descendant::userinfo/node()[name() = 'homepage']"/>
														</a>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End Homepage ************************************************** -->
							<!-- ************************************************** My Links ************************************************** -->
							<xsl:if test="descendant::userinfo/node()[contains(name(), 'favorites')]">
								<br/>
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_links.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/mylinks"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td class="text" bgcolor="#FFFFFF">
											<table cellspacing="1" cellpadding="2" width="100%" border="0">
												<xsl:for-each select="descendant::userinfo/node()[contains(name(), 'favorites')]">
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td valign="top" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<a href="{text()}" target="_blank">
																<img src="{$supportBaseDir}/personalwebpage/url.gif" width="16" height="16" border="0"/>
															</a>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="{text()}" target="_blank">
																<xsl:value-of select="text()"/>
															</a>
														</td>
													</tr>
												</xsl:for-each>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Links ************************************************** -->
						</td>
						<td width="13" align="left" valign="top" background="{$supportBaseDir}/personalwebpage/separator.gif">
							<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
						</td>
						<td width="374" align="left" valign="top">
							<!-- ************************************************** My Blog ************************************************** -->
							<table width="100%" border="0" cellpadding="2" cellspacing="0" bordercolor="#999999" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
								<tr>
									<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle.jpg" style="border-bottom: 1px solid #AAAAAA;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td width="20">
													<img src="{$supportBaseDir}/personalwebpage/my_blog.gif" width="18" height="18"/>
												</td>
												<td class="sectionTitle">My Blog</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td class="text">
										<p>
											<span class="textBold">Lorem Ipsum</span> (06/16/200)</p>
										<p>
											<img src="{$supportBaseDir}/personalwebpage/beach.jpg" alt="beach" width="120" height="80" hspace="4" vspace="0" align="left"/>Phasellus fermentum. Nulla a nulla. Nulla facilisi. Integer porttitor. In hac habitasse platea dictumst. Donec nisl. Aliquam erat volutpat. Integer egestas pede quis justo. Nulla neque. Nam consectetuer enim sit amet purus. Vestibulum at nulla.</p>
									</td>
								</tr>
							</table>
							<!-- ************************************************** End My Blog ************************************************** -->
							<!-- ************************************************** My Documents ************************************************** -->
							<xsl:if test="count(llnode/llnode) &gt; 0">
								<br/>
								<table width="100%" border="0" cellspacing="0" cellpadding="2" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/shared.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/mydocuments"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td align="left" valign="top">
											<table cellSpacing="1" cellPadding="2" width="100%" border="0">
												<tr bgcolor="#e1e8ff">
													<td valign="top" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/name"/>
													</td>
													<td width="20%" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/modified"/>
													</td>
													<td width="20%" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/size"/>
													</td>
												</tr>
												<xsl:for-each select="llnode/llnode">
													<xsl:if test="position() &lt; (/descendant::llnode/maxrec + 1)">
														<tr>
															<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
															<td valign="top" class="text">
																<xsl:if test="position() &lt; last()">
																	<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
																</xsl:if>
																<xsl:choose>
																	<xsl:when test="link/href and link/href/text() != ''">
																		<a target="_blank">
																			<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																			<img width="16" height="16" border="0">
																				<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																				<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																			</img>
																		</a>
																		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																		<a>
																			<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																			<xsl:value-of select="@name"/>
																		</a>
																	</xsl:when>
																	<xsl:otherwise>
																		<img width="16" height="16" border="0">
																			<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																			<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																		</img>
																		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																		<xsl:value-of select="@name"/>
																	</xsl:otherwise>
																</xsl:choose>
															</td>
															<td width="20%" class="text">
																<xsl:if test="position() &lt; last()">
																	<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
																</xsl:if>
																<xsl:value-of select="link/modified"/>
															</td>
															<td width="20%" class="text">
																<xsl:if test="position() &lt; last()">
																	<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
																</xsl:if>
																<xsl:choose>
																	<xsl:when test="link/size and link/size/text() != ''">
																		<xsl:value-of select="link/size"/>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																	</xsl:otherwise>
																</xsl:choose>
															</td>
														</tr>
													</xsl:if>
												</xsl:for-each>
												<xsl:if test="count(llnode/llnode) &gt; llnode/maxrec">
													<tr>
														<td colspan="3" align="right">
															<img src="{$supportBaseDir}/action.gif" width="16" height="16" hspace="0" vspace="0"/>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="javascript:notImplemented()">view more</a>
														</td>
													</tr>
												</xsl:if>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Documents ************************************************** -->
							<!-- ************************************************** My Recent Contributions ************************************************** -->
							<xsl:if test="count(llnode/reccontributions/contribution) &gt; 0">
								<br/>
								<table width="100%" border="0" cellspacing="0" cellpadding="2" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_recent_contributions.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="/descendant::translations/mycontributions"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td align="left" valign="top">
											<table cellspacing="1" cellpadding="2" width="100%" border="0">
												<tr>
													<td valign="top" bgcolor="#e1e8ff" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/name"/>
													</td>
													<td width="20%" bgcolor="#e1e8ff" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/modified"/>
													</td>
													<td width="20%" bgcolor="#e1e8ff" class="text" style="border-bottom: 1px solid #AAAAAA;">
														<xsl:value-of select="/descendant::translations/size"/>
													</td>
												</tr>
												<xsl:for-each select="llnode/reccontributions/contribution">
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td valign="top" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<xsl:choose>
																<xsl:when test="link/href and link/href/text() != ''">
																	<a target="_blank">
																		<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																		<img width="16" height="16" border="0">
																			<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																			<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																		</img>
																	</a>
																	<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																	<a>
																		<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																		<xsl:value-of select="name"/>
																	</a>
																</xsl:when>
																<xsl:otherwise>
																	<img width="16" height="16" border="0">
																		<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																		<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																	</img>
																	<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																	<xsl:value-of select="name"/>
																</xsl:otherwise>
															</xsl:choose>
														</td>
														<td width="20%" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<xsl:value-of select="link/modified"/>
														</td>
														<td width="20%" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<xsl:choose>
																<xsl:when test="link/size and link/size/text() != ''">
																	<xsl:value-of select="link/size"/>
																</xsl:when>
																<xsl:otherwise>
																	<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																</xsl:otherwise>
															</xsl:choose>
														</td>
													</tr>
												</xsl:for-each>
												<xsl:if test="llnode/reccontributions/viewmore = 'true'">
													<tr>
														<td colspan="3" align="right">
															<img src="{$supportBaseDir}/action.gif" width="16" height="16" hspace="0" vspace="0"/>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="{descendant::llnode/reccontributions/viewmorelink}">
																<xsl:value-of select="descendant::translations/viewmore"/>
															</a>
														</td>
													</tr>
												</xsl:if>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Recent Contributions ************************************************** -->
							<!-- ************************************************** MyList ************************************************** -->
							<br/>
							<table width="100%" border="0" cellspacing="0" cellpadding="2" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
								<tr>
									<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle.jpg" style="border-bottom: 1px solid #AAAAAA;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td width="20">
													<img src="{$supportBaseDir}/personalwebpage/my_list.gif" width="18" height="18"/>
												</td>
												<td class="sectionTitle">My List</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td align="left" valign="top" class="text">
										<span class="textBold">Books I like:</span>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr align="left" valign="top" class="text">
												<td width="50%">
													<ul>
														<li>
															<a href="#top">Illuminati</a>
														</li>
														<li>
															<a href="#top">The Line of Beauty</a>
														</li>
														<li>
															<a href="#top">English Passenge</a>r</li>
													</ul>
												</td>
												<td width="50%">
													<ul>
														<li>
															<a href="#top">The Good Doctor</a>
														</li>
														<li>
															<a href="#top">Fingersmith</a>
														</li>
														<li>
															<a href="#top">The Blind Assassin</a>
														</li>
													</ul>
												</td>
											</tr>
										</table>
										<span class="textBold">
											<br/>
				            Movies I like:</span>
										<br/>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr align="left" valign="top" class="text">
												<td width="50%">
													<ul>
														<li>
															<a href="#top">Pulp Fiction</a>
														</li>
														<li>
															<a href="#top">The Lord of the Rings</a>
														</li>
														<li>
															<a href="#top">The Village</a>
														</li>
													</ul>
												</td>
												<td width="50%">
													<ul>
														<li>
															<a href="#top">Hostage</a>
														</li>
														<li>
															<a href="#top">Batman</a>
														</li>
													</ul>
												</td>
											</tr>
										</table>
										<span class="textBold">
											<br/>
				            Music I like:<br/>
										</span>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr align="left" valign="top" class="text">
												<td width="50%">
													<ul>
														<li>
															<a href="#top">Eskobar</a>
														</li>
														<li>
															<a href="#top">U2</a>
														</li>
														<li>
															<a href="#top">Gorillaz</a>
														</li>
													</ul>
												</td>
												<td width="50%">
													<ul>
														<li>
															<a href="#top">Keane</a>
														</li>
														<li>
															<a href="#top">Paradise Lost</a>
														</li>
														<li>
															<a href="#top">Kasabian</a>
														</li>
													</ul>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- ************************************************** End MyList ************************************************** -->
							<!-- ************************************************** My Communities ************************************************** -->
							<xsl:if test="count(llnode/comms/comm) &gt; 0">
								<br/>
								<table width="100%" border="0" cellspacing="0" cellpadding="2" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_committees.gif" width="18" height="18"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/mycommunities"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td align="left" valign="top">
											<table cellspacing="0" cellpadding="2" width="100%" border="0">
												<xsl:for-each select="llnode/comms/comm">
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td valign="top" class="text">
															<xsl:choose>
																<xsl:when test="link/href and link/href/text() != ''">
																	<a target="_blank">
																		<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																		<img width="16" height="16" border="0">
																			<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																			<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																		</img>
																	</a>
																	<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																	<a>
																		<xsl:attribute name="href"><xsl:value-of select="link/href"/></xsl:attribute>
																		<xsl:value-of select="name"/>
																	</a>
																</xsl:when>
																<xsl:otherwise>
																	<img width="16" height="16" border="0">
																		<xsl:attribute name="src"><xsl:value-of select="img/src"/></xsl:attribute>
																		<xsl:attribute name="alt"><xsl:value-of select="img/alt"/></xsl:attribute>
																	</img>
																	<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																	<xsl:value-of select="name"/>
																</xsl:otherwise>
															</xsl:choose>
														</td>
													</tr>
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<span class="textBold">
																<xsl:value-of select="/descendant::translations/createDate"/>:</span>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<xsl:value-of select="creationDate" disable-output-escaping="yes"/>
															<br/>
															<span class="textBold">
																<xsl:value-of select="/descendant::translations/mission"/>:</span>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<xsl:value-of select="mission" disable-output-escaping="yes"/>
														</td>
													</tr>
												</xsl:for-each>
												<xsl:if test="llnode/comms/viewmore = 'true'">
													<tr>
														<td colspan="3" align="right">
															<img src="{$supportBaseDir}/action.gif" width="16" height="16" hspace="0" vspace="0"/>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="javascript:notImplemented()">view more</a>
														</td>
													</tr>
												</xsl:if>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Communities ************************************************** -->
							<br/>
						</td>
						<td width="13" align="left" valign="top" background="{$supportBaseDir}/personalwebpage/separator.gif">
							<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
						</td>
						<td width="200" align="left" valign="top" bgcolor="#F7F7F7">
							<!-- ************************************************** My Groups ************************************************** -->
							<xsl:if test="count(llnode/groups/group) &gt; 0">
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/personalwebpage/my_groups.gif" width="18" height="15"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/mygroups"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td align="left" valign="top" class="text" bgcolor="#FFFFFF">
											<table cellspacing="1" cellpadding="2" width="100%" border="0">
												<xsl:for-each select="llnode/groups/group">
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td valign="top" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<a href="{link/href}">
																<img src="{$supportBaseDir}/2-guys.gif" width="16" height="16" border="0"/>
															</a>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="{link/href}">
																<xsl:value-of select="name"/>
															</a>
														</td>
													</tr>
												</xsl:for-each>
												<xsl:if test="llnode/groups/viewmore = 'true'">
													<tr>
														<td colspan="3" align="right">
															<img src="{$supportBaseDir}/action.gif" width="16" height="16" hspace="0" vspace="0"/>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="javascript:notImplemented()">view more</a>
														</td>
													</tr>
												</xsl:if>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Groups ************************************************** -->
							<!-- ************************************************** My Friends ************************************************** -->
							<xsl:if test="count(descendant::userinfo/friends/friend) &gt; 0">
								<br/>
								<table width="100%" border="0" cellpadding="2" cellspacing="0" style="border-bottom: 1px solid #AAAAAA; border-top: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA;">
									<tr>
										<td background="{$supportBaseDir}/personalwebpage/bg_sectiontitle2.jpg" style="border-bottom: 1px solid #AAAAAA;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="20">
														<img src="{$supportBaseDir}/16friend.gif" width="16" height="16"/>
													</td>
													<td class="sectionTitle">
														<xsl:value-of select="descendant::translations/myfriends"/>
													</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td class="text" bgcolor="#FFFFFF">
											<table cellspacing="0" cellpadding="2" width="100%" border="0">
												<xsl:for-each select="llnode/userinfo/friends/friend">
													<tr>
														<xsl:attribute name="bgcolor"><xsl:choose><xsl:when test="position() mod 2 != 1">#EEEEEE</xsl:when><xsl:otherwise>#FFFFFF</xsl:otherwise></xsl:choose><xsl:if test="position() mod 2 != 1">#EEEEEE</xsl:if></xsl:attribute>
														<td align="center" valign="top" class="text">
															<xsl:if test="position() &lt; last()">
																<xsl:attribute name="style">border-bottom: 1px solid #AAAAAA;</xsl:attribute>
															</xsl:if>
															<xsl:choose>
																<xsl:when test="photo/photoid and photo/photoid/text() != '' ">
																	<img width="50" height="50">
																		<xsl:attribute name="src"><xsl:value-of select="/descendant::header[@name = 'HTTP_baseURL']/@value"/>/<xsl:value-of select="photo/filename"/>?func=doc.Fetch&amp;nodeId=<xsl:value-of select="photo/photoid"/></xsl:attribute>
																		<xsl:attribute name="alt"><xsl:value-of select="fullname"/></xsl:attribute>
																	</img>
																</xsl:when>
																<xsl:otherwise>
																	<img width="50" height="50" src="{$supportBaseDir}/personalwebpage/no_photo.gif" alt="{fullname}"/>
																</xsl:otherwise>
															</xsl:choose>
															<br/>
															<!--a target="_blank">
																<xsl:attribute name="href"><xsl:value-of select="userdialog" disable-output-escaping="yes"/></xsl:attribute>
																<xsl:value-of select="fullname"/>
															</a-->
															<a href="{personalwebpage}">
																<xsl:value-of select="fullname"/>
															</a>
															<xsl:if test="friendscount and friendscount != ''">
																<br/>
																<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																(<xsl:value-of select="friendscount"/>
																<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
																<xsl:value-of select="/descendant::translations/friends"/>)
															</xsl:if>
															<!--xsl:if test="personalwebpage and personalwebpage != ''">
																<br/>
																<table border="0" cellspacing="0" cellpadding="1">
																	<tr>
																		<td width="16">
																			<img src="{$supportBaseDir}/personalwebpage/visit_webpage.gif" width="16" height="16"/>
																		</td>
																		<td>
																			<a target="_blank">
																				<xsl:attribute name="href"><xsl:value-of select="personalwebpage" disable-output-escaping="yes"/></xsl:attribute>
																				<xsl:value-of select="/descendant::translations/visitwebpage"/>
																			</a>
																		</td>
																	</tr>
																</table>
															</xsl:if-->
														</td>
													</tr>
												</xsl:for-each>
												<xsl:if test="llnode/userinfo/friends/viewmore = 'true'">
													<tr>
														<td colspan="3" align="right">
															<img src="{$supportBaseDir}/action.gif" width="16" height="16" hspace="0" vspace="0"/>
															<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
															<a href="javascript:notImplemented()">view more</a>
														</td>
													</tr>
												</xsl:if>
											</table>
										</td>
									</tr>
								</table>
							</xsl:if>
							<!-- ************************************************** End My Friends ************************************************** -->
						</td>
						<td style="border-right: 1px solid #AAAAAA;">
							<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
						</td>
					</tr>
					<tr>
						<td height="6" colspan="7" style="border-bottom: 1px solid #AAAAAA;">
							<img src="{$supportBaseDir}/personalwebpage/spacer.gif" width="10" height="6"/>
						</td>
					</tr>
					<tr>
						<td height="20" colspan="7" class="textFooter">Content Server <xsl:text disable-output-escaping="yes">&amp;reg;</xsl:text> Version 9.5.0, Copyright <xsl:text disable-output-escaping="yes">&amp;copy;</xsl:text> 1995-2004 Open Text Inc. All rights reserved.</td>
					</tr>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
