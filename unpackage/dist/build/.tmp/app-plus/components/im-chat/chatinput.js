(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/im-chat/chatinput"],{"4b08":function(t,n,e){"use strict";e.r(n);var u=e("fca0"),a=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,function(){return u[t]})}(i);n["default"]=a.a},"8e36":function(t,n,e){"use strict";e.r(n);var u=e("f0df"),a=e("4b08");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("e1e2");var c=e("2877"),o=Object(c["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=o.exports},b728:function(t,n,e){},e1e2:function(t,n,e){"use strict";var u=e("b728"),a=e.n(u);a.a},f0df:function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return a})},fca0:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"chat-input",data:function(){return{inputValue:""}},methods:{startRecognize:function(){var n={},e=this;n.engine="iFly",e.inputValue="",plus.speech.startRecognize(n,function(n){console.log(t(n," at components\\im-chat\\chatinput.vue:30")),e.inputValue+=n},function(n){console.log(t("语音识别失败："+n.message," at components\\im-chat\\chatinput.vue:33"))})},sendMessge:function(){var t=this;""==t.inputValue.trim()?t.inputValue="":(this.$emit("send-message",{type:"text",content:t.inputValue}),t.inputValue="")}}};n.default=e}).call(this,e("0de9")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/im-chat/chatinput-create-component',
    {
        'components/im-chat/chatinput-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("8e36"))
        })
    },
    [['components/im-chat/chatinput-create-component']]
]);
