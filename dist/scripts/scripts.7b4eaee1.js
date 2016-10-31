d3.sankey=function(){function a(){n.forEach(function(a){a.sourceLinks=[],a.targetLinks=[]}),o.forEach(function(a){var b=a.source,c=a.target;"number"==typeof b&&(b=a.source=n[a.source]),"number"==typeof c&&(c=a.target=n[a.target]),b.sourceLinks.push(a),c.targetLinks.push(a)})}function b(){n.forEach(function(a){a.value=Math.max(d3.sum(a.sourceLinks,i),d3.sum(a.targetLinks,i))})}function c(){for(var a,b=n,c=0;b.length;)a=[],b.forEach(function(b){b.x=c,b.dx=k,b.sourceLinks.forEach(function(b){a.push(b.target)})}),b=a,++c;d(c),e((m[0]-k)/(c-1))}function d(a){n.forEach(function(b){b.sourceLinks.length||(b.x=a-1)})}function e(a){n.forEach(function(b){b.x*=a})}function f(a){function b(){var a=d3.min(g,function(a){return(m[1]-(a.length-1)*l)/d3.sum(a,i)});g.forEach(function(b){b.forEach(function(b,c){b.y=c,b.dy=b.value*a})}),o.forEach(function(b){b.dy=b.value*a})}function c(a){function b(a){return h(a.source)*a.value}g.forEach(function(c,d){c.forEach(function(c){if(c.targetLinks.length){var d=d3.sum(c.targetLinks,b)/d3.sum(c.targetLinks,i);c.y+=(d-h(c))*a}})})}function d(a){function b(a){return h(a.target)*a.value}g.slice().reverse().forEach(function(c){c.forEach(function(c){if(c.sourceLinks.length){var d=d3.sum(c.sourceLinks,b)/d3.sum(c.sourceLinks,i);c.y+=(d-h(c))*a}})})}function e(){g.forEach(function(a){var b,c,d,e=0,g=a.length;for(a.sort(f),d=0;g>d;++d)b=a[d],c=e-b.y,c>0&&(b.y+=c),e=b.y+b.dy+l;if(c=e-l-m[1],c>0)for(e=b.y-=c,d=g-2;d>=0;--d)b=a[d],c=b.y+b.dy+l-e,c>0&&(b.y-=c),e=b.y})}function f(a,b){return a.y-b.y}var g=d3.nest().key(function(a){return a.x}).sortKeys(d3.ascending).entries(n).map(function(a){return a.values});b(),e();for(var j=1;a>0;--a)d(j*=.99),e(),c(j),e()}function g(){function a(a,b){return a.source.y-b.source.y}function b(a,b){return a.target.y-b.target.y}n.forEach(function(c){c.sourceLinks.sort(b),c.targetLinks.sort(a)}),n.forEach(function(a){var b=0,c=0;a.sourceLinks.forEach(function(a){a.sy=b,b+=a.dy}),a.targetLinks.forEach(function(a){a.ty=c,c+=a.dy})})}function h(a){return a.y+a.dy/2}function i(a){return a.value}var j={},k=24,l=8,m=[1,1],n=[],o=[];return j.nodeWidth=function(a){return arguments.length?(k=+a,j):k},j.nodePadding=function(a){return arguments.length?(l=+a,j):l},j.nodes=function(a){return arguments.length?(n=a,j):n},j.links=function(a){return arguments.length?(o=a,j):o},j.size=function(a){return arguments.length?(m=a,j):m},j.layout=function(d){return a(),b(),c(),f(d),g(),j},j.relayout=function(){return g(),j},j.link=function(){function a(a){var c=a.source.x+a.source.dx,d=a.target.x,e=d3.interpolateNumber(c,d),f=e(b),g=e(1-b),h=a.source.y+a.sy+a.dy/2,i=a.target.y+a.ty+a.dy/2;return"M"+c+","+h+"C"+f+","+h+" "+g+","+i+" "+d+","+i}var b=.5;return a.curvature=function(c){return arguments.length?(b=+c,a):b},a},j},angular.module("obrasMduytApp",["ngRoute","ngSanitize","slugifier","angular-flexslider","leaflet-directive","ngTable"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/buscador",{templateUrl:"views/buscador.html",controller:"BuscadorCtrl",controllerAs:"buscador"}).when("/obra/:id",{templateUrl:"views/obra.html",controller:"ObraCtrl",controllerAs:"obra"}).when("/entorno/:entorno",{templateUrl:"views/entorno.html",controller:"EntornoCtrl",controllerAs:"entorno"}).otherwise({redirectTo:"/home"})}]).service("DataService",["$http","$q","Slug",function(a,b,c){var d,e=function(a){a.entorno_slug=a.entorno?c.slugify(a.entorno):null,a.etapa_slug=a.etapa?c.slugify(a.etapa):null,a.tipo_slug=a.tipo?c.slugify(a.tipo):null;var b=a.comuna?a.comuna.split("|"):[null];a.comuna=b[0],a.barrio=a.barrio?a.barrio.split("|"):[],a.licitacion_oferta_empresas=a.licitacion_oferta_empresas?a.licitacion_oferta_empresas.split("|"):[],a.id=parseInt(a.id),a.licitacion_anio=a.licitacion_anio?parseInt(a.licitacion_anio.trim()):null,a.monto_contrato=a.monto_contrato?parseFloat(a.monto_contrato.trim()):null,a.licitacion_presupuesto_oficial=a.licitacion_presupuesto_oficial?parseFloat(a.licitacion_presupuesto_oficial.trim()):null,a.plazo_meses=a.plazo_meses?parseInt(a.plazo_meses.trim()):null,a.porcentaje_avance=a.porcentaje_avance?parseFloat(a.porcentaje_avance.trim()):null,a.fotos=[];for(var d=1;4>=d;d++){var e="imagen_"+d;a[e]&&(a.fotos[d-1]=a[e])}return a},f=["en-proyecto","en-licitacion","en-ejecucion","finalizada"],g=function(a){var b=f.indexOf(a.etapa_slug)>-1;return b},h=function(){return window.MDUYT_CONFIG||(console.error("Archivo de configuración inexistente, utilizando configuración default de desarrollo."),window.MDUYT_CONFIG={BASE_URL:"http://api.topranking.link/",HOME_CSV:"https://goo.gl/vcb6oX"}),window.MDUYT_CONFIG.BASE_URL+"?source_format=csv&source="+window.MDUYT_CONFIG.HOME_CSV+"&callback=JSON_CALLBACK"};this.getById=function(a){var c,d=b.defer();return this.retrieveAll().then(function(b){c=b.filter(function(b){return b.id===parseInt(a)}),d.resolve(c[0])}),c=d.promise,b.when(c)},this.getByEntorno=function(a){var c,d=b.defer();return this.retrieveAll().then(function(b){c=b.filter(function(b){return b.entorno_slug===a}),d.resolve(c)}),c=d.promise,b.when(c)},this.getAll=function(){var a,c=b.defer();return this.retrieveAll().then(function(a){c.resolve(a)}),a=c.promise,b.when(a)},this.retrieveAll=function(){if(!d){var c=b.defer();a.jsonp(h()).then(function(a){d=a.data.map(e).filter(g),c.resolve(d)},function(a){d=a,c.reject(a)}),d=c.promise}return b.when(d)}}]).filter("capitalize",function(){return function(a){return a?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():""}}).filter("cleanunderscore",function(){return function(a){return a.replace(/_/g," ")}}).run(function(){}),angular.module("obrasMduytApp").controller("HomeCtrl",["$scope","DataService","$filter",function(a,b,c){function d(){z.w=y.select("#home-chart-container").node().getBoundingClientRect().width,z.w=!z.svg||z.w<500?z.w-15:z.w,a.isSmallDevice=z.w<700?!0:!1,a.isSmallDevice?(z.h=z.w,z.margin=z.w/100):(z.h=3*z.w/4,z.margin=z.w/200),z.svg||(z.svg=y.select("#home-chart-container").append("svg"),z.mainGroup=z.svg.append("g").classed("main-group",!0),z.mainGroup.append("rect").attr("fill","white"),z.svg.append("g").attr("id","comunas-group"),z.svg.append("g").attr("id","map-group"),z.svg.append("g").attr("id","etapas-group"),D.group=z.svg.append("g").attr("id","bubbles-group")),z.svg.attr("width",z.w).attr("height",z.h),z.mainGroup.select("rect").attr("width",z.w).attr("height",z.h),a.showGroup()}function e(){A.w=y.select("#side-chart-container").node().getBoundingClientRect().width,A.h=400,A.margin=A.w/100,A.gap=2,A.svg||(A.svg=y.select("#side-chart-container").append("svg"),A.mainGroup=A.svg.append("g").classed("main-group",!0),A.mainGroup.append("rect").attr("fill","white")),A.scale=y.scale.linear().domain([0,a.obras.length]).range([0,A.h-(a.total_obras_by_tipo.length-1)*A.gap]),A.svg.attr("width",A.w).attr("height",A.h),A.mainGroup.select("rect").attr("width",A.w).attr("height",A.h),A.groups=A.mainGroup.selectAll("g.tipo-group").data(a.total_obras_by_tipo),A.groups.enter().append("g").attr("id",function(a){return"tipo-group-"+a.slug}).classed("tipo-group",!0).each(function(a){var b=y.select(this);b.append("rect").datum(a).classed("tipo-rect",!0).attr("fill",function(a){return E(a.tipo)}),b.append("text").datum(a).classed("tipo-text",!0).attr("fill","#000").attr("x",30).text(function(){return a.tipo})}),A.groups.selectAll("rect.tipo-rect").attr("width",20).attr("height",function(a){return A.scale(a.candidad)}),A.groups.selectAll("text.tipo-text").attr("y",function(a){return A.scale(a.candidad)/2+5});var b=0;A.groups.transition().attr("transform",function(a){var c=b;return b=b+A.gap+A.scale(a.candidad),"translate(0,"+c+")"})}function f(){B.w=y.select("#scale-chart-container").node().getBoundingClientRect().width,B.h=300,B.margin=B.w/100,B.gap=5,B.nFormatter=function(a,b){var d,e=[{value:1e6,symbol:" millones"},{value:1e3,symbol:" mil"}],f=/\.0+$|(\.[0-9]*[1-9])0+$/;for(d=0;d<e.length;d++)if(a>=e[d].value)return c("currency")((a/e[d].value).toFixed(b).replace(f,"$1"),"$",0).replace(/\,/g,".")+e[d].symbol;return a.toFixed(b).replace(f,"$1")},B.svg||(B.svg=y.select("#scale-chart-container").append("svg"),B.mainGroup=B.svg.append("g").classed("main-group",!0),B.mainGroup.append("rect").attr("fill","white"));var a;if(D.scale){var b=D.scale.domain();D.scale.range();a=[{legend:B.nFormatter(b[1],0),radius:B.w/2},{legend:B.nFormatter((b[0]+b[1])/2,0),radius:B.w/4},{legend:B.nFormatter(b[0],0),radius:B.w/6}]}else a=[{legend:"Obra",radius:10}];B.groups=B.mainGroup.selectAll("g.legend-group").data(a),B.groups.enter().append("g").attr("id",function(a,b){return"legend-group-"+b}).classed("legend-group",!0).each(function(a){var b=y.select(this);b.append("circle").datum(a).classed("legend-circle",!0).attr("fill","#B5B5B5"),b.append("text").datum(a).classed("legend-text",!0).attr("fill","#000")}),B.groups.each(function(a){var b=y.select(this);b.select("circle").datum(a),b.select("text").datum(a)}),B.groups.exit().remove();var d=0;B.groups.transition().attr("transform",function(a){var b=d;return d+=B.gap+2*a.radius,"translate(0,"+b+")"});var e=y.max(a,function(a){return a.radius});B.groups.selectAll("circle.legend-circle").attr("cy",function(a){return a.radius}).attr("cx",function(a){return e}).attr("r",function(a){return a.radius}),B.groups.selectAll("text.legend-text").attr("text-anchor","middle").attr("x",function(a){return e}).attr("y",function(a){return a.radius+5}).style("opacity",0).text(function(a){return a.legend}).transition().style("opacity",1),B.svg.attr("width",B.w).attr("height",d),B.mainGroup.select("rect").attr("width",B.w).attr("height",d)}function g(a,b,c){var d=Math.floor(z.w/b),e=0,f=0;a.transition().duration(700).attr("transform",function(g,h){var i=e*b,j=f*c;return d-1>e?e++:a[0].length!==h+1&&(e=0,f++),"translate("+i+","+j+")"})}function h(){function b(){var b={nodes:[],links:[]},c=[],d=y.nest().key(function(a){return a.comuna}).rollup(function(a){return{candidad:a.length,hijos:y.nest().key(function(a){return a.tipo}).rollup(function(a){return{candidad:a.length,hijos:y.nest().key(function(a){return a.etapa}).rollup(function(a){return{candidad:a.length,hijos:a}}).map(a.filter(function(a){return""!=a.etapa}))}}).map(a.filter(function(a){return""!=a.tipo}))}}).map(a.obras.filter(function(a){return a.comuna}));return J.each(d,function(a,b){J.each(a.hijos,function(a,d){c.push({source:b,target:d,value:a.candidad}),J.each(a.hijos,function(a,b){c.push({source:d,target:b,value:a.candidad})})})}),c.forEach(function(a){b.nodes.push({name:a.source}),b.nodes.push({name:a.target}),b.links.push({source:a.source,target:a.target,value:+a.value})}),b.nodes=y.keys(y.nest().key(function(a){return a.name}).map(b.nodes)),b.links.forEach(function(a,c){b.links[c].source=b.nodes.indexOf(b.links[c].source),b.links[c].target=b.nodes.indexOf(b.links[c].target)}),b.nodes.forEach(function(a,c){b.nodes[c]={"node:":c,name:a}}),b}C.w=y.select("#sankey-chart-container").node().getBoundingClientRect().width,C.w=!C.svg||C.w<500?C.w-15:C.w,C.h=400,C.margin=C.w/100,C.svg||(C.svg=y.select("#sankey-chart-container").append("svg"),C.mainGroup=C.svg.append("g").classed("main-group",!0),C.mainGroup.append("rect").attr("fill","white")),C.svg.attr("width",C.w).attr("height",C.h),C.mainGroup.select("rect").attr("width",C.w).attr("height",C.h),C.sankey=y.sankey().nodeWidth(20).nodePadding(2).size([C.w,C.h]),C.path=C.sankey.link(),C.graph=b(),C.sankey.nodes(C.graph.nodes).links(C.graph.links).layout(32),C.link=C.mainGroup.selectAll(".link").data(C.graph.links).enter().append("path").attr("class","link").attr("d",C.path).style("stroke-width",function(a){return Math.max(1,a.dy)}).style("stroke",function(a){return E(E.domain().indexOf(a.source.name)>-1?a.source.name:a.target.name)}).sort(function(a,b){return b.dy-a.dy}),C.link.append("title").text(function(a){var b=isNaN(a.source.name)?a.source.name:"Comuna "+a.source.name;return b+" → "+a.target.name+"\nObras: "+a.value}),C.node=C.mainGroup.selectAll(".node").data(C.graph.nodes).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.x+","+a.y+")"}),C.node.append("rect").attr("height",function(a){return a.dy}).attr("width",C.sankey.nodeWidth()).style("fill",function(a){return E.domain().indexOf(a.name)>-1?E(a.name):"#000"}).append("title").text(function(a){var b=isNaN(a.name)?a.name:"Comuna "+a.name;return b+="\nObras: "+a.value}),C.node.append("text").attr("y",function(a){return a.dy/2}).attr("x",function(a){return isNaN(a.name)?-3:3+C.sankey.nodeWidth()}).attr("text-anchor",function(a){return isNaN(a.name)?"end":"start"}).attr("dy",".35em").attr("transform",null).text(function(a){return a.name}).filter(function(a){return a.x<C.width/2})}function i(){function b(){a.isSmallDevice&&z.svg.attr("height",z.w),z.mapGroup.selectAll("path.map-item").style("display","block").style("stroke-width",0).transition().duration(1e3).style("stroke-width",3).attr("d",z.mapPath).style("opacity",1)}z.mapProjection=y.geo.mercator().center([-58.43992,-34.618]).translate([z.w/2,z.h/2]).scale(190*z.w),z.mapPath=y.geo.path().projection(z.mapProjection),z.mapGroup?b():(z.mapGroup=z.svg.select("#map-group"),y.json("geo/comunas.simple.geojson",function(a){z.mapCentroids={},z.mapFeatures=a.features,J.each(z.mapFeatures,function(a){z.mapCentroids["mapa-comuna-"+a.properties.comuna]=z.mapPath.centroid(a)}),z.mapGroup.selectAll("path.map-item").data(z.mapFeatures).enter().append("path").classed("child",!0).classed("map-item",!0).attr("id",function(a){return"mapa-comuna-"+a.properties.comuna}).classed("shape",!0).on("click",k),b()}))}function j(){D.clusters={},D.clusterPoints={},D.nodesComuna=[],D.nodes=a.obras.filter(function(a){return a.lat&&a.lng}).map(function(a){var b="i"+a.id,c=5,d={cluster:b,radius:c,data:a};D.clusters[b]=d;var e=z.mapProjection([parseFloat(a.lng),parseFloat(a.lat)]);return D.clusterPoints[b]={x:e[0],y:e[1],radius:5},d}),D.scale=!1,f()}function k(b){if(a.closeTooltip(),L.node()===this)return l();L.classed("active",!1),L=y.select(this).classed("active",!0);var c=z.mapPath.bounds(b),d=c[1][0]-c[0][0],e=c[1][1]-c[0][1],f=(c[0][0]+c[1][0])/2,g=(c[0][1]+c[1][1])/2,h=.9/Math.max(d/z.w,e/z.h),i=[z.w/2-h*f,z.h/2-h*g];z.mapGroup.transition().duration(750).attr("transform","translate("+i+")scale("+h+")"),z.mapGroup.selectAll("path").transition().duration(750).style("stroke-width","1px"),D.group.transition().duration(750).attr("transform","translate("+i+")scale("+h+")")}function l(){L.classed("active",!1),L=y.select(null),z.mapGroup.transition().duration(750).attr("transform",""),z.mapGroup.selectAll("path").transition().duration(750).style("stroke-width","3px"),D.group.transition().duration(750).attr("transform","")}function m(b){var c,d,e=y.range(1,16);a.isSmallDevice?(c=z.w,d=z.w,z.svg.attr("height",e.length*z.w),z.mainGroup.select("rect").attr("height",e.length*z.w)):(c=z.h/3,d=z.w/5),z.comunasGroup||(z.comunasGroup=z.svg.select("#comunas-group"),z.comunasGroup.selectAll("g.comunas-item").data(e).enter().append("g").classed("child",!0).classed("comunas-item",!0).style("opacity",0).attr("transform",function(a,b){return"translate("+(z.w/2-d/2)+","+(z.h/2-c/2)+")"}).attr("id",function(a){return"comunas-item-"+a}).each(function(){var a=y.select(this);a.append("rect").classed("comunas-item-frame",!0).on("click",o),a.append("text").classed("comunas-item-text",!0).attr("fill","#000").text(function(a){return"Comuna "+a})})),b||z.comunasGroup.selectAll("g.comunas-item").style("display","block"),z.comunasGroup.selectAll("rect.comunas-item-frame").transition().duration(700).attr("x",z.margin).attr("y",z.margin).attr("height",c-2*z.margin).attr("width",d-2*z.margin),z.comunasGroup.selectAll("text.comunas-item-text").transition().duration(700).attr("x",15).attr("y",25),g(z.comunasGroup.selectAll("g.comunas-item").transition().duration(1e3).style("opacity",1),d,c)}function n(b){D.clusters={},D.clusterPoints={},D.nodesComuna=[];var c=b?b.replace("comunas-item-",""):!1,d=a.obras.filter(function(a){return a.comuna&&(!c||c&&a.comuna===c)}),e=Math.ceil(y.max(d,function(b){return b[a.selectedRadioDimension]})),g=Math.floor(y.min(d,function(b){return b[a.selectedRadioDimension]}));D.scale=y.scale.linear().domain([parseInt(g),parseInt(e)]).range([10,c?100:50]),f(),D.nodes=d.filter(function(a){return a.comuna&&(!c||c&&a.comuna===c)}).map(function(b){var c="c"+b.comuna,d=D.scale(b[a.selectedRadioDimension]?b[a.selectedRadioDimension]:0),e={cluster:c,radius:d?d:10,data:b};return(!D.clusters[c]||d>D.clusters[c].radius)&&(D.clusters[c]=e),e}),y.selectAll("g.comunas-item").each(function(a){var b=y.select(this),c=b.select("rect");D.clusterPoints["c"+a]={x:y.transform(b.attr("transform")).translate[0]+c.attr("width")/2,y:y.transform(b.attr("transform")).translate[1]+c.attr("height")/2,radius:20}})}function o(b){if(a.closeTooltip(),M.node()===this)return p();M.classed("active",!1),M=y.select(this).classed("active",!0);var c=M.node().parentNode;y.selectAll("g.comunas-item").transition().style("opacity",function(){return this===c?1:0}).each("end",function(){this!==c&&y.select(this).style("display","none")}),M.transition().duration(750).attr("height",z.h-2*z.margin).attr("width",z.w-2*z.margin),y.select(c).transition().duration(750).attr("transform","translate(0,0)").each("end",function(){n(y.select(c).attr("id")),u()})}function p(a){M.classed("active",!1),M=y.select(null),y.selectAll("g.comunas-item").style("display","block"),m(a),a||setTimeout(function(){n(),u()},2e3)}function q(b){var c,d,e=["en-proyecto","en-licitacion","en-ejecucion","finalizada"],f={"en-proyecto":"En Proyecto","en-licitacion":"En Licitación","en-ejecucion":"En Ejecución",finalizada:"Finalizada"};a.isSmallDevice?(c=z.w,d=z.w,z.svg.attr("height",e.length*z.w),z.mainGroup.select("rect").attr("height",e.length*z.w)):(c=z.h/2,d=z.w/2),z.etapasGroup||(z.etapasGroup=z.svg.select("#etapas-group"),z.etapasGroup.selectAll("g.etapas-item").data(e).enter().append("g").classed("child",!0).classed("etapas-item",!0).style("opacity",0).attr("transform",function(a,b){return"translate("+(z.w/2-d/2)+","+(z.h/2-c/2)+")"}).attr("id",function(a){return"etapas-item-"+a}).each(function(){var a=y.select(this);a.append("rect").classed("etapas-item-frame",!0).on("click",t),a.append("text").classed("etapas-item-text",!0).attr("fill","#000").text(function(a){return f[a]})})),b||z.etapasGroup.selectAll("g.etapas-item").style("display","block"),z.etapasGroup.selectAll("rect.etapas-item-frame").transition().duration(700).attr("x",z.margin).attr("y",z.margin).attr("height",c-2*z.margin).attr("width",d-2*z.margin),z.etapasGroup.selectAll("text.etapas-item-text").transition().duration(700).attr("x",15).attr("y",25),g(z.etapasGroup.selectAll("g.etapas-item").transition().duration(1e3).style("opacity",1),d,c)}function r(b){D.clusters={},D.clusterPoints={},D.nodesComuna=[];var c=b?b.replace("etapas-item-",""):!1,d=a.obras.filter(function(a){return a.etapa&&(!c||c&&a.etapa_slug===c)}),e=Math.ceil(y.max(d,function(b){return b[a.selectedRadioDimension]})),g=Math.floor(y.min(d,function(b){return b[a.selectedRadioDimension]}));D.scale=y.scale.linear().domain([parseInt(g),parseInt(e)]).range([10,c?100:50]),f(),D.nodes=d.map(function(b){var c="e-"+b.etapa_slug,d=D.scale(b[a.selectedRadioDimension]?b[a.selectedRadioDimension]:10),e={cluster:c,radius:d?d:10,data:b};return(!D.clusters[c]||d>D.clusters[c].radius)&&(D.clusters[c]=e),e}),c?D.clusterPoints=!1:y.selectAll("g.etapas-item").each(function(a){var b=y.select(this),c=b.select("rect");D.clusterPoints["e-"+a]={x:y.transform(b.attr("transform")).translate[0]+c.attr("width")/2,y:y.transform(b.attr("transform")).translate[1]+c.attr("height")/2,radius:10}})}function s(a){N.classed("active",!1),N=y.select(null),y.selectAll("g.etapas-item").style("display","block"),q(a),a||setTimeout(function(){r(),u()},2e3)}function t(b){if(a.closeTooltip(),N.node()===this)return s();N.classed("active",!1),N=y.select(this).classed("active",!0);var c=N.node().parentNode;y.selectAll("g.etapas-item").transition().style("opacity",function(){return this===c?1:0}).each("end",function(){this!==c&&y.select(this).style("display","none")}),N.transition().duration(750).attr("height",z.h-2*z.margin).attr("width",z.w-2*z.margin),y.select(c).transition().duration(750).attr("transform","translate(0,0)").each("end",function(){r(y.select(c).attr("id")),u()})}function u(){D.force=y.layout.force().nodes(D.nodes).size([z.w,z.h]).gravity(0).charge(1).on("tick",v).start(),D.circles=D.group.selectAll("circle.obra").data(D.nodes),D.circles.enter().append("circle").classed("obra",!0).on("click",function(b){a.selectedObra=b,a.$apply(),a.tooltip.transition().duration(200).style("left",y.event.pageX+"px").style("top",y.event.pageY+"px").style("opacity",1)}),D.circles.attr("id",function(a){return"e"+a.data.id}).style("fill",function(a){return E(a.data.tipo)}),D.circles.transition().style("opacity",1).attr("r",function(a){return a.radius}),D.circles.exit().remove(),D.circles.each(function(a){})}function v(a){D.circles.each(w(10*a.alpha*a.alpha)).each(x(.5)).attr("cx",function(a){return a.x}).attr("cy",function(a){return a.y})}function w(a){return function(b){var c=D.clusters[b.cluster],d=1;if(c){c===b&&(D.clusterPoints?(c=D.clusterPoints[b.cluster],c={x:c.x,y:c.y,radius:-c.radius},d=.5*Math.sqrt(b.radius)):(c={x:z.w/2,y:z.h/2,radius:-b.radius},d=.1*Math.sqrt(b.radius)));var e=b.x-c.x,f=b.y-c.y,g=Math.sqrt(e*e+f*f),h=b.radius+c.radius;g!==h&&(g=(g-h)/g*a*d,b.x-=e*=g,b.y-=f*=g,c.x+=e,c.y+=f)}}}function x(a){var b=y.geom.quadtree(D.nodes);return function(c){var d=c.radius+2,e=c.x-d,f=c.x+d,g=c.y-d,h=c.y+d;b.visit(function(b,d,i,j,k){if(b.point&&b.point!==c){var l=c.x-b.point.x,m=c.y-b.point.y,n=Math.sqrt(l*l+m*m),o=c.radius+b.point.radius+2;o>n&&(n=(n-o)/n*a,c.x-=l*=n,c.y-=m*=n,b.point.x+=l,b.point.y+=m)}return d>f||e>j||i>h||g>k})}}var y=window.d3;a.pymChild=new window.pym.Child({polling:1e3});var z={},A={},B={},C={},D={},E=y.scale.ordinal().range(["#A5E668","#678DD8","#F94745","#EE73A7","#FF8F12","#00BDB7","#FFD500"]);a.selectedGroup="comunas",a.oldGroup="comunas",a.selectedObra=!1,a.selectedRadioDimension="monto_contrato",a.tooltip=y.select("#tooltip-home-chart");var F={comunas:m,etapas:q,mapa:i},G={comunas:n,etapas:r,mapa:j},H={comunas:p,etapas:s,mapa:l},I={comunas:!1,etapas:!1,mapa:!1},J=window._,K=0;$(window).load(function(){K=$(window).width()}),b.getAll().then(function(b){a.obras=b,a.obras_by_tipo=J.groupBy(b,"tipo"),a.tipo_keys=J.keys(a.obras_by_tipo),a.total_obras_by_tipo=J.reduce(a.obras_by_tipo,function(a,b,c){return a.push({tipo:c,slug:b[0].tipo_slug,candidad:b.length}),a},[]),e(),h(),d(),window.$(window).resize(function(){K!=$(window).width()&&(clearTimeout(a.timeoutId),a.timeoutId=setTimeout(function(){I={comunas:!1,etapas:!1,mapa:!1},e(),h(),d()},1e3))})}),a.showGroup=function(){a.oldGroup!==a.selectedGroup&&(a.closeTooltip(),H[a.oldGroup](!0),z.svg.selectAll(".child").style("opacity",0).style("display","none"),z.svg.selectAll("circle.obra").transition().style("opacity",.5),a.oldGroup=a.selectedGroup),F[a.selectedGroup]();var b=I[a.selectedGroup]||"mapa"===a.selectedGroup?100:2e3;I[a.selectedGroup]=!0,setTimeout(function(){G[a.selectedGroup](),u()},b)};var L=y.select(null),M=y.select(null),N=y.select(null);a.closeTooltip=function(){a.tooltip.transition().duration(200).style("opacity",0).style("top","-100px").style("left","-100px")}}]),angular.module("obrasMduytApp").controller("ObraCtrl",["$scope","DataService","$routeParams",function(a,b,c){a.pymChild=new window.pym.Child({polling:1e3}),a.pymChild.sendHeight(),a.obraId=c.id;var d={url:"//tiles1.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{y}.png",format:"tms",builder:"tms",baseLayer:!0,options:{maxZoom:18,minZoom:9,attribution:'USIG (<a href="http://www.buenosaires.gob.ar" target="_blank">GCBA</a>), © <a href="http://www.openstreetmap.org/copyright/en" target="_blank">OpenStreetMap</a> (ODbL)',tms:!0}};a.titles=d,angular.extend(a,{markers:{},center:{lat:-34.604,lng:-58.382,zoom:15},tiles:d,defaults:{scrollWheelZoom:!1}}),b.getById(c.id).then(function(b){console.log(b),a.obra=b,a.slides=b.fotos,angular.extend(a,{markers:{m1:{lat:parseFloat(b.lat),lng:parseFloat(b.lng),focus:!0,message:b.nombre}}});({starting_time:b.fecha_inicio,ending_time:b.fecha_fin_inicial})})}]),angular.module("obrasMduytApp").controller("EntornoCtrl",["$scope","DataService","$routeParams",function(a,b,c){a.pymChild=new window.pym.Child({polling:1e3}),a.pymChild.sendHeight();var d={url:"//tiles1.usig.buenosaires.gob.ar/mapcache/tms/1.0.0/amba_con_transporte_3857@GoogleMapsCompatible/{z}/{x}/{y}.png",format:"tms",builder:"tms",baseLayer:!0,options:{maxZoom:18,minZoom:9,attribution:'USIG (<a href="http://www.buenosaires.gob.ar" target="_blank">GCBA</a>), © <a href="http://www.openstreetmap.org/copyright/en" target="_blank">OpenStreetMap</a> (ODbL)',tms:!0}};a.titles=d,angular.extend(a,{markers:{},center:{lat:-34.604,lng:-58.382,zoom:15},tiles:d,defaults:{scrollWheelZoom:!1}}),b.getByEntorno(c.entorno).then(function(b){a.entorno=c.entorno,console.log(b),a.obras=b;for(var d={},e=0;e<b.length;e++){var f=b[e];d["m"+e]={lat:parseFloat(f.lat),lng:parseFloat(f.lng),focus:!0,message:f.nombre}}angular.extend(a,{markers:d})})}]),angular.module("obrasMduytApp").controller("BuscadorCtrl",["$scope","DataService","$routeParams","NgTableParams","$filter","$sce",function(a,b,c,d,e,f){a.pymChild=new window.pym.Child({polling:1e3}),a.pymChild.sendHeight(),b.getAll().then(function(b){function c(a,b){return b[this.field]}function g(a,b){var c="-";if(b[this.field])var c=e("currency")(b[this.field],"$",0).replace(/\,/g,".");return f.trustAsHtml('<p class="text-right">'+c+"</p>")}function h(a,b){var c=b[this.field],d="";return c&&""!=c&&(d="<a href='"+c+"' class='btn btn-default btn-xs btn-block' target='_blank'>Más información</a>"),f.trustAsHtml(d)}function i(b){a.cols.forEach(function(a){l[b].indexOf(a.field)>-1?a.show=!0:a.show=!1}),a.$apply()}function j(){var a=d3.select("#buscador-table").node().getBoundingClientRect().width;a>700?i("lg"):700>=a&&a>650?i("md"):650>=a&&a>600?i("sm"):600>=a&&i("xs")}console.log(b);var k={comunas:d3.keys(d3.nest().key(function(a){return a.comuna}).map(b.filter(function(a){return null!==a.comuna}))).map(function(a){return{id:a.trim(),title:"Comuna "+a}}),etapas:d3.keys(d3.nest().key(function(a){return a.etapa}).map(b)).map(function(a){return{id:a,title:a}})};k.comunas.unshift({id:"",title:"TODAS"}),k.etapas.unshift({id:"",title:"TODAS"}),a.cols=[{field:"comuna",title:"Comuna",filter:{comuna:"select"},filterData:k.comunas,show:!0,sortable:"comuna",getValue:c},{field:"nombre",title:"Nombre",filter:{nombre:"text"},show:!0,sortable:"nombre",getValue:c},{field:"area_responsable",title:"Área",filter:{area_responsable:"text"},show:!0,sortable:"area_responsable",getValue:c},{field:"licitacion_empresa",title:"Empresa",filter:{licitacion_empresa:"text"},show:!0,sortable:"licitacion_empresa",getValue:c},{field:"etapa",title:"Etapa",filter:{etapa:"select"},filterData:k.etapas,show:!0,sortable:"etapa",getValue:c},{field:"monto_contrato",title:"Monto Contrato",filter:{monto_contrato:"number"},show:!0,sortable:"monto_contrato",getValue:g},{field:"link_interno",title:"",filter:!1,show:!0,sortable:!1,getValue:h}],a.tableParams=new d({sorting:{comuna:"asc"},filter:{comuna:"",etapa:""},page:1,count:10},{dataset:b,counts:[10,25,50]});var l={lg:["comuna","nombre","area_responsable","licitacion_empresa","etapa","monto_contrato","link_interno"],md:["comuna","nombre","licitacion_empresa","etapa","monto_contrato","link_interno"],sm:["comuna","nombre","etapa","monto_contrato","link_interno"],xs:["nombre","etapa","monto_contrato","link_interno"]};a.timeoutId,window.$(window).resize(function(){clearTimeout(a.timeoutId),a.timeoutId=setTimeout(function(){j()},1e3)})})}]),angular.module("obrasMduytApp").run(["$templateCache",function(a){"use strict";a.put("views/buscador.html",'<div class="row"> <table id="buscador-table" ng-table-dynamic="tableParams with cols" class="table table-responsive"> <tr ng-repeat="row in $data"> <td ng-repeat="col in $columns" ng-bind-html="col.getValue(this, row)"></td> </tr> </table> </div>'),a.put("views/entorno.html",'<div class="row"> <div class="col-md-12"> <h2>Entorno {{entorno.id}}: {{entorno}}</h2> <div ng-repeat="obra in obras"> <!-- Obra: {{$index+1}} -> {{obra}} --> <div ng-include="\'views/includes/obra-detail.html\'"></div> </div> </div> </div> <div class="row"> <div class="col-md-12"> <h4> Ubicación en el Mapa </h4> <leaflet center="center" tiles="tiles" markers="markers" defaults="defaults" width="100%" height="350px"></leaflet> </div> </div>'),a.put("views/home.html",'<div class="row"> <div class="col-sm-12"> <h4>Explorador de Obras</h4> </div> </div> <div class="row"> <div class="col-md-4"> <form class="form-inline"> <div class="form-group"> <label for="agrupar" class="pull-left label-nav">Agrupar por</label> <div class="dropdown pull-left"> <button class="btn btn-link dropdown-toggle" type="button" id="agrupar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> {{selectedGroup | cleanunderscore}} <span class="caret"></span> </button> <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"> <li><a ng-click="selectedGroup=\'comunas\';showGroup();">Comunas</a></li> <li><a ng-click="selectedGroup=\'etapas\';showGroup();">Etapa</a></li> <li><a ng-click="selectedGroup=\'mapa\';showGroup();">Mapa</a></li> </ul> </div> </div> </form> </div> <div class="col-md-4"> <form class="form-inline"> <div class="form-group"> <label for="radio" class="pull-left label-nav">Agrupar por</label> <div class="dropdown pull-left"> <button class="btn btn-link dropdown-toggle" type="button" id="radio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> {{selectedRadioDimension | cleanunderscore}} <span class="caret"></span> </button> <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"> <li><a ng-click="selectedRadioDimension=\'monto_contrato\';showGroup();">Monto contrato</a></li> <li><a ng-click="selectedRadioDimension=\'licitacion_presupuesto_oficial\';showGroup();">Presupuesto oficial</a></li> </ul> </div> </div> </form> </div> </div> <div class="row"> <div class="col-sm-10"> <div class="row"> <div class="col-sm-12"> <div id="home-chart-container"></div> </div> </div> </div> <div class="col-sm-2"> <div class="row"> <div class="col-sm-12 col-xs-6"> <h4>Tipos de obra</h4> <div id="side-chart-container"></div> <hr> </div> <div class="col-sm-12 col-xs-6"> <h4>Monto total</h4> <div id="scale-chart-container"></div> </div> </div> </div> </div> <div class="row"> <div class="col-md-12"> <h4>Obras para una ciudad a tu medida</h4> <p>En un solo vistazo, conocé qué estamos haciendo para mejorar la Ciudad.</p> </div> <div class="col-xs-4"> Dónde: Comunas </div> <div class="col-xs-4 text-center"> Qué hacemos: Tipos de obras </div> <div class="col-xs-4 text-right"> Cómo vamos: Etapas </div> </div> <div class="row"> <div class="col-md-12"> <div id="sankey-chart-container"></div> </div> </div> <!-- Tooltip OBRAS --> <div id="tooltip-home-chart"> <button type="button" class="close pull-right" ng-click="closeTooltip()">&times;</button> <span class="title">Obra:</span> <span class="desc">{{selectedObra.data.nombre}}</span> <span class="title">Tipo:</span> <span class="desc">{{selectedObra.data.tipo}}</span> <span class="title">Estado:</span> <span class="desc">{{selectedObra.data.etapa}}</span> <a ng-href="{{selectedObra.data.link_interno}}" class="btn btn-default btn-xs btn-block">Más información</a> </div>'),a.put("views/includes/obra-detail.html",'<div class="row obra"> <div class="col-md-12"> <h3>Obra {{obra.id}}: {{obra.nombre}}</h3> <div class="row"> <div class="col-md-8"> <img ng-src="{{obra.fotos[0]}}"> <p> {{obra.descripcion}} </p> </div> <div class="col-md-3 ficha-tecnica"> <h4> Ficha técnica</h4> <div class="etapa"> <div class="row"> <div class="col-md-4"> <p>Estado de licitación:</p> </div> <div class="col-md-8"> <p><strong>{{obra.etapa}} </strong> </p> <p> <small> {{obra.etapa_detalle}}</small> </p> </div> </div> </div> <div> <p> Tipo de obra: <strong>{{obra.tipo}}</strong> </p> </div> <p> Area responsable: <strong> {{obra.area_responsable}}</strong></p> <p> Empresas <ul> <li ng-repeat="empresa in obra.licitacion_oferta_empresas"> <strong>{{empresa}}</strong> </li> </ul> </p> <p> Estado </p> <div class="progress"> <div class="progress-bar bg-color-{{obra.slug}}" role="progressbar" ng-style="{ \'width\': obra.porcentaje_avance + \'%\' }"> <div class="progressbar-w" ng-show="!obra.porcentaje_avance"><p></p> </div> <span class="progressbar-w" ng-hide="obra.porcentaje_avance<22 || !obra.porcentaje_avance"> </span> </div> <div class="progress-w" ng-show="obra.porcentaje_avance<22" ng-style="{ \'width\': (100 - obra.porcentaje_avance) + \'%\' }"></div> </div> <p ng-if="obra.plazo_meses"> Plazo total: <strong> {{obra.plazo_meses}} meses </strong> </p> <div class="row fechas" ng-show="obra.fecha_inicio"> <div class="col-md-6"> <p class="up"> Inicio</p> <p> {{obra.fecha_inicio}} </p> </div> <div class="col-md-6 right"> <p class="up"> Fin </p> <p> {{obra.fecha_fin_inicial}} </p> </div> </div> <p ng-if="obra.benficiarios"> Cantidad de Beneficiaros: <strong> {{obra.benficiarios}}<small> personas</small> </strong></p> <p ng-if="obra.mano_obra"> Mano de Obra: <strong> {{obra.mano_obra}} <small>personas</small> </strong> </p> <p ng-if="obra.monto_contrato"> Monto Contrato: <strong> {{obra.monto_contrato | currency}} </strong> </p> <p ng-if="obra.licitacion_presupuesto_oficial"> Monto Actualizado: <strong> {{obra.licitacion_presupuesto_oficial | currency}} </strong> </p> <p ng-if="obra.pliego_descarga"> <a ng-href="{{obra.pliego_descarga}}"><i class="detalle-frame-icon glyphicon glyphicon glyphicon-download-alt"> </i> Ver Pliego </a> </p> </div> </div> </div> </div>'),
a.put("views/obra.html",'<div class="row obra"> <div class="col-md-12"> <h3>Obra {{obra.id}}: {{obra.nombre}}</h3> <div class="row"> <div class="col-md-8"> <flex-slider slide="s in slides" animation="slide" control-nav="thumbnails"> <li data-thumb="{{s}}"> <img ng-src="{{s}}"> </li> </flex-slider> <p> {{obra.descripcion}} </p> </div> <div class="col-md-3 ficha-tecnica"> <h4> Ficha técnica</h4> <div class="etapa"> <div class="row"> <div class="col-md-4"> <p>Estado de licitación:</p> </div> <div class="col-md-8"> <p><strong>{{obra.etapa}} </strong> </p> <p> <small> {{obra.etapa_detalle}}</small> </p> </div> </div> </div> <div> <p> Tipo de obra: <strong>{{obra.tipo}}</strong> </p> </div> <p> Area responsable: <strong> {{obra.area_responsable}}</strong></p> <p> Empresas <ul> <li ng-repeat="empresa in obra.licitacion_oferta_empresas"> <strong>{{empresa}}</strong> </li> </ul> </p> <p> Estado </p> <div class="progress"> <div class="progress-bar bg-color-{{obra.slug}}" role="progressbar" ng-style="{ \'width\': obra.porcentaje_avance + \'%\' }"> <div class="progressbar-w" ng-show="!obra.porcentaje_avance"><p></p> </div> <span class="progressbar-w" ng-hide="obra.porcentaje_avance<22 || !obra.porcentaje_avance"> </span> </div> <div class="progress-w" ng-show="obra.porcentaje_avance<22" ng-style="{ \'width\': (100 - obra.porcentaje_avance) + \'%\' }"></div> </div> <p ng-if="obra.plazo_meses"> Plazo total: <strong> {{obra.plazo_meses}} meses </strong> </p> <div class="row fechas" ng-show="obra.fecha_inicio"> <div class="col-md-6"> <p class="up"> Inicio</p> <p> {{obra.fecha_inicio}} </p> </div> <div class="col-md-6 right"> <p class="up"> Fin </p> <p> {{obra.fecha_fin_inicial}} </p> </div> </div> <p ng-if="obra.benficiarios"> Cantidad de Beneficiaros: <strong> {{obra.benficiarios}}<small> personas</small> </strong></p> <p ng-if="obra.mano_obra"> Mano de Obra: <strong> {{obra.mano_obra}} <small>personas</small> </strong> </p> <p ng-if="obra.monto_contrato"> Monto Contrato: <strong> {{obra.monto_contrato | currency}} </strong> </p> <p ng-if="obra.licitacion_presupuesto_oficial"> Monto Actualizado: <strong> {{obra.licitacion_presupuesto_oficial | currency}} </strong> </p> <p ng-if="obra.pliego_descarga"> <a ng-href="{{obra.pliego_descarga}}"><i class="detalle-frame-icon glyphicon glyphicon glyphicon-download-alt"> </i> Ver Pliego </a> </p> </div> </div> </div> </div> <div class="row"> <div class="col-md-12"> <h4> Ubicación de obra </h4> <leaflet center="center" tiles="tiles" markers="markers" defaults="defaults" width="100%" height="350px"></leaflet> </div> </div>')}]);