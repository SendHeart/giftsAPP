(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-sqlite-sqlite"],{1774:function(t,e,n){var a=n("8fcf");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("1112b355",a,!0,{sourceMap:!1,shadowMode:!1})},"1ce0":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("page-head",{attrs:{title:t.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.openDB(e)}}},[t._v("打开数据库test.db")])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.executeSQL(e)}}},[t._v("创建表database及插入数据")])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.selectSQL(e)}}},[t._v("查询表database的数据")])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.droptable(e)}}},[t._v("删除表database")])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.closeDB(e)}}},[t._v("关闭数据库test.db")])],1),n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.isOpenDB(e)}}},[t._v("查询是否打开数据库")])],1)],1)],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},4683:function(t,e,n){"use strict";n.r(e);var a=n("1ce0"),i=n("e2c4");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("a601");var u=n("2877"),l=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,"4f97bb75",null);e["default"]=l.exports},"8fcf":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".uni-btn-v[data-v-4f97bb75]{margin:%?20?% 0;padding:0}",""])},a601:function(t,e,n){"use strict";var a=n("1774"),i=n.n(a);i.a},a700:function(t,e,n){"use strict";var a=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("f499")),s={data:function(){return{title:"SQLite"}},methods:{openDB:function(){plus.sqlite.openDatabase({name:"first",path:"_doc/test.db",success:function(t){plus.nativeUI.alert("打开数据库test.db成功 ")},fail:function(t){plus.nativeUI.alert("打开数据库test.db失败: "+(0,i.default)(t))}})},executeSQL:function(){plus.sqlite.executeSql({name:"first",sql:'create table if not exists database("name" CHAR(110),"sex" CHAR(10),"age" INT(11))',success:function(t){plus.sqlite.executeSql({name:"first",sql:"insert into database values('彦','女','7000')",success:function(t){plus.nativeUI.alert("创建表table和插入数据成功")},fail:function(t){plus.nativeUI.alert("创建表table成功但插入数据失败: "+(0,i.default)(t))}})},fail:function(t){plus.nativeUI.alert("创建表table失败: "+(0,i.default)(t))}})},selectSQL:function(){plus.sqlite.selectSql({name:"first",sql:"select * from database",success:function(t){plus.nativeUI.alert("查询SQL语句成功: "+(0,i.default)(t))},fail:function(t){plus.nativeUI.alert("查询SQL语句失败: "+(0,i.default)(t))}})},droptable:function(){plus.sqlite.executeSql({name:"first",sql:"drop table database",success:function(t){plus.nativeUI.alert("删除表database成功")},fail:function(t){plus.nativeUI.alert("删除表database失败: "+(0,i.default)(t))}})},closeDB:function(){plus.sqlite.closeDatabase({name:"first",success:function(t){plus.nativeUI.alert("关闭数据库成功")},fail:function(t){plus.nativeUI.alert("关闭数据库失败: "+(0,i.default)(t))}})},isOpenDB:function(){plus.sqlite.isOpenDatabase({name:"first",path:"_doc/test.db"})?plus.nativeUI.alert("Opened!"):plus.nativeUI.alert("Unopened!")}}};e.default=s},e2c4:function(t,e,n){"use strict";n.r(e);var a=n("a700"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=i.a}}]);