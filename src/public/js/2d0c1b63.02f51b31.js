(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0c1b63"],{"46e0":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"form q-pa-lg"},[n("div",{staticClass:"row gutter-sm"},[n("div",{staticClass:"col-xs-12 col-md-6"},[n("q-field",{attrs:{label:"Start Number:",orientation:"vertical"}},[n("q-input",{attrs:{type:"number"},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.form.start=0}},model:{value:e.form.start,callback:function(t){e.$set(e.form,"start",t)},expression:"form.start"}})],1)],1),n("div",{staticClass:"col-xs-12 col-md-6"},[n("q-field",{attrs:{label:"End Number:",orientation:"vertical"}},[n("q-input",{attrs:{type:"number"},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.form.end=0}},model:{value:e.form.end,callback:function(t){e.$set(e.form,"end",t)},expression:"form.end"}})],1)],1),n("div",{staticClass:"col-xs-12"},[n("q-btn",{on:{click:e.cancelOperation}},[e._v("Cancel")]),n("q-btn",{staticClass:"float-right",attrs:{icon:"add",color:"primary"},on:{click:e.saveItem}},[e._v("Save")])],1)])])])},a=[];o._withStripped=!0;var r=n("2ef0"),i=n.n(r),s=n("ed08"),c=n("cf63"),l=n("2f62"),u={name:"ReceiptCreate",mounted:function(){},data:function(){return{form:{start:"",end:""},originalRow:{start:"",end:""}}},computed:i.a.merge(Object(l["b"])({}),{}),methods:{cancelOperation:function(){var e=this,t=[];for(var n in e.form)""!==e.form[n]&&t.push(n);t.length?e.$q.dialog({title:"Cancel Operation",message:"You still have pending changes. Are you sure you want to leave this page?",ok:"Agree",cancel:"Disagree"}).then(function(){e.$router.push({name:"receipt.index"}),e.$q.notify("Agreed!")}).catch(function(){e.$q.notify("Disagreed...")}):e.$router.push({name:"receipt.index"})},saveItem:function(){var e=this;try{var t=e.form;c["a"].Store(t).then(function(t){200===t.status&&(t.data.error?e.$q.notify({color:"negative",message:t.data.error,position:"top"}):(e.$router.push({name:"receipt.index"}),e.$q.notify({color:"positive",message:"Receipt Added!",position:"top"})))},function(t){e.$q.notify({color:"negative",message:t.response.data.error,position:"top"})})}catch(e){console.log(e),Object(s["b"])()}}}},d=u,f=n("2877"),p=Object(f["a"])(d,o,a,!1,null,null,null);p.options.__file="Create.vue";t["default"]=p.exports}}]);