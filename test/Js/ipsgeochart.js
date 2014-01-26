var defaultChartOptions = {
    geo : {
        allowRedraw : true,
        displayAnnotations : false,
        colorAxis : {
            colors : [ "#E5E3E3", "c6ff59", "c6ff59", "c6ff59", "c6ff59", "c6ff59", "ccfb59", "d0f959", "daf359",
                    "e6eb59", "f1e659", "f6e259", "ffd855", "ffd352", "ffc84c", "ffc44a", "ffbd46", "ffbb44", "ffb23f",
                    "ff7d37", "ff7937", "ff7236", "ff6834" ]
        }
    }
};

var scripts = document.getElementsByTagName('script');
var myScript = scripts[scripts.length - 1];
var queryString = myScript.src.replace(/^[^\?]+\??/, '');
var parameters = parseQuery(queryString);
var url=getURLParameters("type");

function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }

}

function parseQuery(query) {
    var Params = new Object();
    if (!query)
        return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for ( var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2)
            continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

var currentItem = null;
var weeklyTrend = false;
dojo.ready(function() {
    require(
            [ "cbtree/Tree", "cbtree/store/ObjectStore", "cbtree/extensions/TreeStyling",
                    "cbtree/model/ForestStoreModel", "dojo/on", "sdar/WidgetConstruct", "sdar/ColumnLayout",
                    "dojo/_base/lang" ], function(Tree, ObjectStore, TreeStyling, ForestStoreModel, on,
                    WidgetConstruct, ColumnLayout, lang) {
                var url = '/rest/ips/ipsTree';
                if (parameters['type'] == 'ips') {
                    url = '/rest/ips/ipsTree';
                } else if (parameters['type'] == 'app') {
                    url = '/rest/ips/appTree';
                }
                var store = new ObjectStore({
                    url : url,
                    idProperty : "id"
                });
                var model = new ForestStoreModel({
                    store : store,
                    query : {
                        type : "category"
                    },
                    options : {
                        sort : [ {
                            attribute : "name"
                        } ]
                    }
                });
                var tree = new Tree({
                    model : model,
                    id : "widgetsTree",
                    branchCheckBox : false,
                    valueToIconMap : {
                        "icon" : {}
                    },
                    showRoot : false
                }, "tree");
                var layout = new ColumnLayout({
                    container : dijit.byId('widgetsPanel').domNode,
                    columns : 2
                });
                var createWidget = function(item) {
                    var title = store.get(item.parent[0]).name + '/' + item.name;
                    var l = WidgetConstruct.createWidget(item, title, {
                        widgetHeight : 300,
                        chartOptions : defaultChartOptions
                    }, function(item) {
                        layout.remove(item.id);
                        model.setChecked(item, false);
                    });
                    layout.add(l);
                };
                tree.on("checkBoxClick", function(item, nodeWidget, event) {
                    if (item.checked) {
                        if (weeklyTrend) {
                            layout.removeAll();
                            weeklyTrend = false;
                            if (currentItem) {
                                createWidget(currentItem);
                            }
                        }
                        createWidget(item);
                        currentItem = item;
                    } else {
                        layout.remove(item.id);
                    }
                });
                tree.startup();

                store.query({
                    type : 'feature',
                    checked : true
                }).forEach(function(item) {
                    currentItem = item;
                    createWidget(item);
                });

                on(dijit.byId('removeWidgetsButton'), 'click', function() {
                    layout.removeAll();
                    store.query({
                        type : 'feature'
                    }).forEach(function(item) {
                        model.setChecked(item, false);
                    });
                    currentItem = null;
                });
            });
});