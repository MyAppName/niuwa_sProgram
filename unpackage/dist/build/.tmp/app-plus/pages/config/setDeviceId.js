(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/config/setDeviceId"],{"29ad":function(i,e,n){"use strict";n.r(e);var t=n("3ffe"),u=n("826f");for(var o in u)"default"!==o&&function(i){n.d(e,i,function(){return u[i]})}(o);n("d153");var a=n("2877"),s=Object(a["a"])(u["default"],t["a"],t["b"],!1,null,null,null);e["default"]=s.exports},"3ffe":function(i,e,n){"use strict";var t=function(){var i=this,e=i.$createElement;i._self._c},u=[];n.d(e,"a",function(){return t}),n.d(e,"b",function(){return u})},"826f":function(i,e,n){"use strict";n.r(e);var t=n("895e"),u=n.n(t);for(var o in t)"default"!==o&&function(i){n.d(e,i,function(){return t[i]})}(o);e["default"]=u.a},"895e":function(i,e,n){"use strict";(function(i,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{url:"",isActive:!0,isActive2:!0,img:"\tcloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_defult.png",img2:"cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_defult.png",img3:"cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/password_hide.png",see:!1,username:"",password:"",deviceId:"",ipv4:""}},methods:{inview:function(){this.isActive=!0,this.img="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_success.png"},outview:function(){""==this.username&&(this.isActive=!1,this.img="cloud://niuwa-js2i2.6e69-niuwa-js2i2-1300106435/img/login/mod_defult.png")},gotoInfo:function(){console.log(i(this.username+";"+this.password," at pages\\config\\setDeviceId.vue:69"));var e=this.username;e.length>0&&(n.setStorageSync("deviceId",e),n.navigateBack({delta:1}))},logon:function(){"172.16.2.61"==this.ipv4?n.navigateTo({url:"../index/toGetiIP"}):n.showToast({title:"请检查是否连着盒子WIFI",icon:"loading",duration:2e3})}},onLoad:function(e){this.url=this.$consturl;var t=this;t.deviceId=n.getStorageSync("deviceId"),t.ipv4=e.ipv4,console.log(i(t.ipv4," at pages\\config\\setDeviceId.vue:98"))}};e.default=t}).call(this,n("0de9")["default"],n("6e42")["default"])},a9d0:function(i,e,n){"use strict";(function(i){n("20e7"),n("921b");t(n("66fd"));var e=t(n("29ad"));function t(i){return i&&i.__esModule?i:{default:i}}i(e.default)}).call(this,n("6e42")["createPage"])},b4a0:function(i,e,n){},d153:function(i,e,n){"use strict";var t=n("b4a0"),u=n.n(t);u.a}},[["a9d0","common/runtime","common/vendor"]]]);