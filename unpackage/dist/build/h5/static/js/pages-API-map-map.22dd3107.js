(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-map-map"],{"053d":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".content[data-v-1b9d53f3]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.map[data-v-1b9d53f3]{width:%?750?%;height:%?500?%;background-color:#666}.scrollview[data-v-1b9d53f3]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:10px}.list-item[data-v-1b9d53f3]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:5px 0}.list-text[data-v-1b9d53f3]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.button[data-v-1b9d53f3]{margin-top:5px;margin-bottom:5px}",""])},3387:function(t,e,n){"use strict";var o=n("288e"),i=o(n("f499")),a=o(n("bd86")),l=[{id:0,latitude:39.989631,longitude:116.481018,title:"方恒国际 阜通东大街6号",zIndex:"1",rotate:0,width:20,height:20,anchor:{x:.5,y:1},callout:{content:"方恒国际 阜通东大街6号",color:"#00BFFF",fontSize:10,borderRadius:4,borderWidth:1,borderColor:"#333300",bgColor:"#CCFF99",padding:"5",display:"ALWAYS"}},{id:1,latitude:39.908692,longitude:116.397477,title:"天安门",zIndex:"1",iconPath:"/static/location.png",width:40,height:40,anchor:{x:.5,y:1},callout:{content:"首都北京\n天安门",color:"#00BFFF",fontSize:12,borderRadius:2,borderWidth:0,borderColor:"#333300",bgColor:"#CCFF11",padding:"1",display:"ALWAYS"}}],d=[{points:[{latitude:39.925539,longitude:116.279037},{latitude:39.925539,longitude:116.520285}],color:"#FFCCFF",width:7,dottedLine:!0,arrowLine:!0,borderColor:"#000000",borderWidth:2},{points:[{latitude:39.938698,longitude:116.275177},{latitude:39.966069,longitude:116.289253},{latitude:39.944226,longitude:116.306076},{latitude:39.966069,longitude:116.322899},{latitude:39.938698,longitude:116.336975}],color:"#CCFFFF",width:5,dottedLine:!0,arrowLine:!0,borderColor:"#CC0000",borderWidth:3}],u=[{points:[{latitude:39.781892,longitude:116.293413},{latitude:39.7876,longitude:116.391842},{latitude:39.733187,longitude:116.417932},{latitude:39.704653,longitude:116.338255}],fillColor:"#FFCCFF",strokeWidth:3,strokeColor:"#CC99CC",zIndex:11},{points:[{latitude:39.8876,longitude:116.518932},{latitude:39.781892,longitude:116.518932},{latitude:39.781892,longitude:116.428932},{latitude:39.8876,longitude:116.428932}],fillColor:"#CCFFFF",strokeWidth:5,strokeColor:"#CC0000",zIndex:3}],c=[{latitude:39.996441,longitude:116.411146,radius:15e3,strokeWidth:5,color:"#CCFFFF",fillColor:"#CC0000"},{latitude:40.096441,longitude:116.511146,radius:12e3,strokeWidth:3,color:"#CCFFFF",fillColor:"#FFCCFF"},{latitude:39.896441,longitude:116.311146,radius:9e3,strokeWidth:1,color:"#CCFFFF",fillColor:"#CC0000"}],s=[{latitude:39.989631,longitude:116.481018},{latitude:39.908692,longitude:116.397477}];t.exports={data:function(){var t;return t={location:{longitude:116.397477,latitude:39.908692},controls:[{id:1,position:{left:5,top:5,width:30,height:30},iconPath:"/static/logo.png",clickable:!0}],showLocation:!1,scale:13,showCompass:!0,enable3D:!0,enableOverlooking:!0},(0,a.default)(t,"enableOverlooking",!0),(0,a.default)(t,"enableZoom",!0),(0,a.default)(t,"enableScroll",!0),(0,a.default)(t,"enableRotate",!0),(0,a.default)(t,"enableSatellite",!1),(0,a.default)(t,"enableTraffic",!1),(0,a.default)(t,"polyline",[]),(0,a.default)(t,"markers",[]),(0,a.default)(t,"polygons",[]),(0,a.default)(t,"circles",[]),(0,a.default)(t,"includePoints",[]),(0,a.default)(t,"rotate",0),(0,a.default)(t,"skew",0),t},onLoad:function(){},onReady:function(){this.map=uni.createMapContext("map1",this)},methods:{changeScale:function(){this.scale=9==this.scale?15:9},changeRotate:function(){this.rotate=90==this.rotate?0:90},changeSkew:function(){this.skew=30==this.skew?0:30},enableThreeD:function(t){this.enable3D=t.detail.value},changeShowCompass:function(t){this.showCompass=t.detail.value},changeEnableOverlooking:function(t){this.enableOverlooking=t.detail.value},changeEnableZoom:function(t){this.enableZoom=t.detail.value},changeEnableScroll:function(t){this.enableScroll=t.detail.value},changeEnableRotate:function(t){this.enableRotate=t.detail.value},changeEnableSatellite:function(t){this.enableSatellite=t.detail.value},changeEnableTraffic:function(t){this.enableTraffic=t.detail.value},addMarkers:function(){this.markers=l},addPolyline:function(){this.polyline=d},addPolygons:function(){this.polygons=u},addCircles:function(){this.circles=c},includePoint:function(){this.includePoints=s},getCenterLocation:function(){this.map.getCenterLocation(function(t){console.log((0,i.default)(t)),uni.showModal({content:(0,i.default)(t)})})},getRegion:function(){this.map.getRegion(function(t){console.log((0,i.default)(t)),uni.showModal({content:(0,i.default)(t)})})},translateMarker:function(){this.map.translateMarker({markerId:1,destination:{latitude:39.989631,longitude:116.481018},duration:2e3},function(t){console.log((0,i.default)(t)),uni.showModal({content:(0,i.default)(t)})})},bindtap:function(t){uni.showModal({content:(0,i.default)(t)})},bindmarkertap:function(t){uni.showModal({content:(0,i.default)(t)})},bindcontroltap:function(t){uni.showModal({content:(0,i.default)(t)})},bindcallouttap:function(t){uni.showModal({content:(0,i.default)(t)})},bindupdated:function(t){uni.showModal({content:(0,i.default)(t)})},bindregionchange:function(t){uni.showModal({content:(0,i.default)(t)})},bindpoitap:function(t){uni.showModal({content:(0,i.default)(t)})}}}},"56d4":function(t,e,n){"use strict";n.r(e);var o=n("3387"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},a6b5:function(t,e,n){var o=n("053d");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("66f7ff7c",o,!0,{sourceMap:!1,shadowMode:!1})},abd1:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-map",{ref:"map1",staticClass:"map",attrs:{id:"map1",controls:t.controls,scale:t.scale,longitude:t.location.longitude,latitude:t.location.latitude,"show-location":t.showLocation,"enable-3D":t.enable3D,rotate:t.rotate,skew:t.skew,"show-compass":t.showCompass,"enable-overlooking":t.enableOverlooking,"enable-zoom":t.enableZoom,"enable-scroll":t.enableScroll,"enable-rotate":t.enableRotate,"enable-satellite":t.enableSatellite,"enable-traffic":t.enableTraffic,markers:t.markers,polyline:t.polyline,circles:t.circles,polygons:t.polygons,"include-points":t.includePoints}}),n("v-uni-scroll-view",{staticClass:"scrollview",attrs:{"scroll-y":"true"}},[n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.changeScale(e)}}},[t._v("changeScale")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.changeRotate(e)}}},[t._v("changeRotate")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.changeSkew(e)}}},[t._v("skew")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.addMarkers(e)}}},[t._v("addMarkers")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.addPolyline(e)}}},[t._v("addPolyline")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.addPolygons(e)}}},[t._v("addPolygons")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.addCircles(e)}}},[t._v("addCircles")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.includePoint(e)}}},[t._v("includePoints")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.getCenterLocation(e)}}},[t._v("getCenterLocation")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.getRegion(e)}}},[t._v("getRegion")]),n("v-uni-button",{staticClass:"button",on:{click:function(e){e=t.$handleEvent(e),t.translateMarker(e)}}},[t._v("translateMarker")])],1)],1)},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},cf47:function(t,e,n){"use strict";n.r(e);var o=n("abd1"),i=n("56d4");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("e8b4");var l=n("2877"),d=Object(l["a"])(i["default"],o["a"],o["b"],!1,null,"1b9d53f3",null);e["default"]=d.exports},e8b4:function(t,e,n){"use strict";var o=n("a6b5"),i=n.n(o);i.a}}]);