(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["5c3af3de"],{"00c5":function(e,t,a){"use strict";var r=a("9418"),s=a.n(r);s.a},9418:function(e,t,a){},f241:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-layout-header",[a("div",{staticClass:"row bg-primary q-px-sm"},[a("div",{staticClass:"row gutter-sm full-width"},[a("div",[e.isUserSignedIn?a("q-btn",{staticClass:"q-mt-md",attrs:{flat:"",dense:"",round:"","aria-label":"Menu",color:"white"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}},[a("q-icon",{attrs:{name:"menu"}})],1):e._e()],1),a("div",{staticClass:"col-xs-10 col-md-8"},["page.index"!==e.$route.name&&e.isUserSignedIn?a("CustomTab",{staticClass:"float-left full-width"}):e._e()],1),a("div",{staticClass:"col-xs-3 q-mt-sm user-prof"},[e.isUserSignedIn?a("div",{staticClass:"float-right"},[a("img",{staticClass:"img-responsive avatar-nav round-borders",attrs:{src:e.user.avatar?e.user.avatar:"https://ui-avatars.com/api/?color=fff&background="+e.hexColor+"&name="+e.user.givenName+"+"+e.user.lastName,alt:e.user.givenName+" "+e.user.lastName}})]):e._e(),e.isUserSignedIn?a("div",{staticClass:"q-pa-sm float-right"},[a("p",{staticClass:"q-ma-none text-white"},[e._v(e._s(e.userFullName))])]):e._e()])])])]),e.isUserSignedIn?a("q-layout-drawer",{attrs:{"content-class":"mat"===e.$q.theme?"bg-white":null},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[a("q-scroll-area",{staticStyle:{height:"93.4vh"},attrs:{"thumb-style":{right:"4px",borderRadius:"5px",background:"black",width:"10px",opacity:.4},delay:1500}},[a("div",{staticClass:"q-pa-sm nav-logo-holder"},[a("router-link",{attrs:{to:"/dashboard"}},[a("img",{staticClass:"nav-logo",attrs:{src:"statics/KV-LION.jpg",alt:""}})])],1),a("q-list",[a("q-item",[a("q-item-main",[a("q-input",{attrs:{"float-label":"Search Menu",clearable:""},model:{value:e.searchmenu,callback:function(t){e.searchmenu=t},expression:"searchmenu"}})],1)],1)],1),e._l(e.filteredMenu,function(t,r){return 0!==t.children.length?a("q-list",{key:r,staticClass:"menu",attrs:{separator:""}},[a("q-list-header",[e._v(e._s(t.header))]),e._l(t.children,function(t,s){return e.isUserHasAccess(t)||0===r?a("q-item",{key:s,attrs:{to:t.path}},[a("q-item-side",[a("q-item-tile",{attrs:{icon:t.icon}})],1),a("q-item-main",[e._v(e._s(t.label))])],1):e._e()})],2):e._e()})],2)],1):e._e(),a("q-page-container",[a("router-view")],1)],1)},s=[];r._withStripped=!0;a("7f7f"),a("7514"),a("6762"),a("2fdb"),a("ac6a"),a("6b54");var n=a("2ef0"),i=a.n(n),l=a("2f62"),u=a("fb82"),o={name:"LayoutDefault",mounted:function(){var e=this;e.loadSetup(),u["a"].setBrand("light","#a94442"),u["a"].setBrand("primary","#680f11"),u["a"].setBrand("text-primary","#680f11"),u["a"].setBrand("bg-primary","#680f11")},data:function(){return{leftDrawerOpen:!0,searchmenu:""}},computed:i.a.merge(Object(l["b"])({isUserSignedIn:"Auth/isUserSignedIn",user:"Auth/getUser",menus:"Setup/getAppMenu"}),{hexColor:function(){return Math.floor(16777215*Math.random()).toString(16)},userFullName:function(){var e=this;return e.user.givenName+" "+e.user.lastName},filteredMenu:function(){var e=this,t=[];return i.a.forEach(e.menus,function(a,r){var s={header:a.header,children:[]};i.a.forEach(a.children,function(t,a){e.searchmenu&&!i.a.toLower(t.label).includes(i.a.toLower(e.searchmenu))||(e.isUserHasAccess(t)||0===r)&&s.children.push(t)}),0!==s.children.length&&t.push(s)}),t},apiUrl:function(){var e=this;return e.$apiUrl}}),methods:{isUserHasAccess:function(e){var t=this,a=i.a.find(t.user.permissions,function(t,a){return t===e.name});return!!a},loadSetup:function(){var e=this;e.$store.dispatch("Setup/setPageSetup")}}},c=o,d=(a("00c5"),a("2877")),m=Object(d["a"])(c,r,s,!1,null,"95731ab2",null);m.options.__file="MyLayout.vue";t["default"]=m.exports}}]);