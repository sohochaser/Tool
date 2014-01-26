<%@ page language="java"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../header.jsp"%>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/js/dojo/cbtree/themes/claro/claro.css" />
<style>
.dijitTree {
	overflow: visible;
}

.gridContainerZone>* {
	margin: 1px !important;
}

.gridContainerTable {
	border: 0px;
}

.gridContainer:focus {
	outline: none;
}

.claro .dijitTitlePaneContentInner {
	padding: 2px;
}
</style>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/widgets.css" />
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type='text/javascript'>
    google.load("visualization", "1.1", {
        packages : [ "table", "corechart", 'controls', 'geochart' ]
    });
    dojo.require("dijit/form/Button");
    dojo.require("dijit/Toolbar");
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/dojo/sdar/ColumnLayout.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/ips/ipsgeochart.js?type=ips"></script>
</head>
</head>
<body class="claro">
	<div id="sdar-container" data-dojo-type="dijit/layout/BorderContainer"
		data-dojo-props="gutters:false"
		style="width: 100%; height: 100%; margin: 0px; padding: 0px;">
		<div data-dojo-type="dijit/layout/ContentPane"
			data-dojo-props="region:'top'" id="sdar-header">
			<jsp:include page="../menu.jsp"></jsp:include>
		</div>
		<div data-dojo-type="dijit/layout/BorderContainer"
			data-dojo-props="region:'center'" id="mainContent"
			style="margin: 0px; padding: 0px;">
			<div data-dojo-type="dijit/layout/ContentPane"
				data-dojo-props="region:'top'" align="right"
				style="border: 0px; width: 100%; margin: 0px; padding: 0px; border-top: 1px solid #c3cad5;">
				<div data-dojo-type="dijit/Toolbar" style="height: 30px;">					
					<div id="removeWidgetsButton" data-dojo-type="dijit/form/Button"
						data-dojo-props="iconClass:'widgetDeleteIcon', showLabel:false">Clear Chart</div>
				</div>
			</div>
			<div data-dojo-type="dijit/layout/BorderContainer"
				data-dojo-props="region: 'center', splitter:false,gutters:false"
				style="border: 0px; margin: 0px; padding: 0px;">
				<div data-dojo-type="dijit/layout/ContentPane"
					data-dojo-props="region:'left'"
					style="width: 300px; padding: 0px; margin: 0px; border: 1px solid #efefef;">
					<div id="tree" style="overflow: auto; height: 99%;"></div>
				</div>
				<div data-dojo-type="dijit/layout/ContentPane"
					data-dojo-props="region:'center'"
					style="border: 0px; padding: 0px; margin: 0px;" id="widgetsPanel">
				</div>
			</div>
		</div>
	</div>
</body>
</html>