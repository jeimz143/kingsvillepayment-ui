(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["d099a0ec"],{"02b0":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("q-search",{attrs:{placeholder:"Type Fee Code",autofocus:""},model:{value:e.feeItemCode,callback:function(t){e.feeItemCode=t},expression:"feeItemCode"}},[a("q-autocomplete",{attrs:{"min-characters":0},on:{selected:e.getFeeItem,search:e.getFeeCode}})],1)],1)},o=[];n._withStripped=!0;a("7f7f");var r=a("2b0e"),i=a("2ef0"),s=a.n(i),l=a("7bb4"),c=r["default"].extend({name:"CodeFeeInput",created:function(){this.params.value&&(this.feeItemCode=this.params.value)},mounted:function(){var e=this;e.getFeeCode()},data:function(){return{feeItemCode:"",feeItemLists:[]}},methods:{mapFeeItems:function(e){return s.a.map(e,function(e){return{label:e.code+" - "+e.name+" "+e.description,value:e.code}})},getFeeItem:function(e){this.feeItemCode=e.value,this.params.stopEditing()},getFeeCode:function(e,t){var a=this,n=[],o={terms:e,branch:a.params.context.form.branch};l["a"].PickList(o).then(function(e){if(200===e.status)if(e.data.error)a.$q.notify({color:"negative",message:e.data.error,position:"top"}),void 0!==t&&t(n);else{var o=JSON.parse(JSON.stringify(e.data));n=a.mapFeeItems(o),void 0!==t&&(a.$store.dispatch("Fee/listAll",o),t(n))}},function(e){a.$q.notify({message:e.response.data.error,position:"top",type:"negative"})})},getValue:function(){return this.feeItemCode}}}),u=c,d=a("2877"),f=Object(d["a"])(u,n,o,!1,null,null,null);f.options.__file="CodeFeeInput.vue";t["a"]=f.exports},"0676":function(e,t){function a(){throw new TypeError("Invalid attempt to spread non-iterable instance")}e.exports=a},"11b0":function(e,t,a){var n=a("2a06"),o=a("883d");function r(e){if(o(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return n(e)}e.exports=r},"20fd":function(e,t,a){"use strict";var n=a("d9f6"),o=a("aebd");e.exports=function(e,t,a){t in e?n.f(e,t,o(0,a)):e[t]=a}},2236:function(e,t){function a(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}e.exports=a},"2a06":function(e,t,a){e.exports=a("d2d5")},"2fbd":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("q-input",{attrs:{type:"number",autofocus:""},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.model=0},blur:e.onBlur,focus:function(t){e.parseTwoDecimal()}},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1)},o=[];n._withStripped=!0;var r=a("2b0e"),i=r["default"].extend({name:"NumberInput",created:function(){this.params.value&&(this.model=this.params.value)},data:function(){return{model:0}},methods:{parseTwoDecimal:function(){},getValue:function(){return this.model},onBlur:function(){this.params.stopEditing()}}}),s=i,l=a("2877"),c=Object(l["a"])(s,n,o,!1,null,null,null);c.options.__file="NumberInput.vue";t["a"]=c.exports},"448a":function(e,t,a){var n=a("2236"),o=a("11b0"),r=a("0676");function i(e){return n(e)||o(e)||r()}e.exports=i},"52c5":function(e,t,a){"use strict";var n=a("3f4a");t["a"]={List:function(e){return Object(n["a"])().get("branches")},Update:function(e){return Object(n["a"])().patch("branches/"+e._id,e)},Store:function(e){return Object(n["a"])().post("branches",e)},Show:function(e){return Object(n["a"])().get("branches/"+e.id)},ShowByCode:function(e){return Object(n["a"])().post("branches/bycode",e)},PickList:function(e){return Object(n["a"])().post("branches/picklist",e)},Delete:function(e){return Object(n["a"])().delete("branches",{data:e})}}},"549b":function(e,t,a){"use strict";var n=a("d864"),o=a("63b6"),r=a("241e"),i=a("b0dc"),s=a("3702"),l=a("b447"),c=a("20fd"),u=a("7cd6");o(o.S+o.F*!a("4ee1")(function(e){Array.from(e)}),"Array",{from:function(e){var t,a,o,d,f=r(e),m="function"==typeof this?this:Array,p=arguments.length,h=p>1?arguments[1]:void 0,v=void 0!==h,b=0,y=u(f);if(v&&(h=n(h,p>2?arguments[2]:void 0,2)),void 0==y||m==Array&&s(y))for(t=l(f.length),a=new m(t);t>b;b++)c(a,b,v?h(f[b],b):f[b]);else for(d=y.call(f),a=new m;!(o=d.next()).done;b++)c(a,b,v?i(d,h,[o.value,b],!0):o.value);return a.length=b,a}})},"54a1":function(e,t,a){a("6c1c"),a("1654"),e.exports=a("95d5")},"883d":function(e,t,a){e.exports=a("54a1")},"95d5":function(e,t,a){var n=a("40c3"),o=a("5168")("iterator"),r=a("481b");e.exports=a("584a").isIterable=function(e){var t=Object(e);return void 0!==t[o]||"@@iterator"in t||r.hasOwnProperty(n(t))}},b1f1:function(e,t,a){"use strict";var n=a("3f4a");t["a"]={List:function(e){return Object(n["a"])().get("enrollmentfees")},Update:function(e){return Object(n["a"])().patch("enrollmentfees/"+e._id,e)},Store:function(e){return Object(n["a"])().post("enrollmentfees",e)},Show:function(e){return Object(n["a"])().get("enrollmentfees/"+e.feeId)},PickList:function(e){return Object(n["a"])().post("enrollmentfees/picklist",e)},Delete:function(e){return Object(n["a"])().delete("enrollmentfees",{data:e})}}},d2d5:function(e,t,a){a("1654"),a("549b"),e.exports=a("584a").Array.from},e258:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"form q-pa-lg"},[a("div",{staticClass:"row gutter-sm"},[a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Select School Year:",orientation:"vertical"}},[a("q-search",{attrs:{placeholder:"Type School Year."},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.deleteSchoolYear()}},model:{value:e.form.schoolYearCode,callback:function(t){e.$set(e.form,"schoolYearCode",t)},expression:"form.schoolYearCode"}},[a("q-autocomplete",{attrs:{"min-characters":0},on:{selected:e.getSelectedSchoolYear,search:e.getSchoolYear}})],1)],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Select School Branch:",orientation:"vertical"}},[a("q-search",{attrs:{placeholder:"Type School Branch"},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.deleteSchoolBranch()}},model:{value:e.form.branch,callback:function(t){e.$set(e.form,"branch",t)},expression:"form.branch"}},[a("q-autocomplete",{attrs:{"min-characters":0},on:{selected:e.getSelectedSchoolBranch,search:e.getSchoolBranch}})],1)],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Student's No.:",orientation:"vertical"}},[a("q-search",{attrs:{placeholder:"Type Student No."},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.deleteStudent()}},model:{value:e.form.studentNumber,callback:function(t){e.$set(e.form,"studentNumber",t)},expression:"form.studentNumber"}},[a("q-autocomplete",{attrs:{"min-characters":0},on:{selected:e.getSelectedStudent,search:e.getStudent}})],1)],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Student's Name.:",orientation:"vertical"}},[a("q-input",{attrs:{readonly:""},model:{value:e.form.studentName,callback:function(t){e.$set(e.form,"studentName",t)},expression:"form.studentName"}})],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"In-Cash / Monthly Base","label-width":"4",orientation:"vertical"}},[a("q-select",{attrs:{inline:"",color:"secondary",radio:"",options:[{label:"",value:0},{label:"In-Cash",value:1},{label:"Monthly",value:2}]},on:{input:e.paymentTermFieldSet},model:{value:e.form.paymentTerm,callback:function(t){e.$set(e.form,"paymentTerm",t)},expression:"form.paymentTerm"}})],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Is Scholar or With Voucher","label-width":"4",orientation:"vertical"}},[a("q-select",{attrs:{options:[{label:"Yes",value:!0},{label:"No",value:!1}]},model:{value:e.form.isScholar,callback:function(t){e.$set(e.form,"isScholar",t)},expression:"form.isScholar"}})],1)],1),0!==e.form.paymentTerm?a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Grade/Level Code",orientation:"vertical"}},[a("q-search",{attrs:{placeholder:"Select Grade / Level Code"},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"]))return null;e.deleteLevel()}},model:{value:e.form.levelCode,callback:function(t){e.$set(e.form,"levelCode",t)},expression:"form.levelCode"}},[a("q-autocomplete",{attrs:{"min-characters":0},on:{selected:e.getSelectedLevel,search:e.getLevel}})],1)],1)],1):e._e(),0!==e.form.paymentTerm?a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-field",{attrs:{label:"Grade/Level Description",orientation:"vertical"}},[a("q-input",{attrs:{readonly:""},model:{value:e.form.levelDescription,callback:function(t){e.$set(e.form,"levelDescription",t)},expression:"form.levelDescription"}})],1)],1):e._e(),0!==e.form.fees.length?a("div",{staticClass:"col-xs-12"},[a("q-btn",{staticClass:"float-right",attrs:{flat:"",color:"positive",round:""},on:{click:function(t){e.onAddRow()}}},[a("q-icon",{attrs:{name:"add",size:"sm"}}),a("q-tooltip",[e._v("\n            Add New Row\n          ")])],1),a("q-btn",{staticClass:"float-right",attrs:{flat:"",color:"negative",round:""},on:{click:function(t){e.onRemoveSelected()}}},[a("q-icon",{attrs:{name:"delete",size:"sm"}}),a("q-tooltip",[e._v("\n            Remove Selected Item\n          ")])],1)],1):e._e(),0!==e.form.fees.length?a("div",{staticClass:"col-xs-12"},[a("AgGrid",{staticClass:"ag-theme-material ag-edit-page",attrs:{rowData:e.form.fees,rowSelection:e.grid.rowSelection,rowAnimation:e.grid.rowAnimation,gridOptions:e.grid.gridOptions,defaultColDef:e.grid.defaultColDef,columnDefs:e.grid.tableColumns,frameworkComponents:e.grid.frameworkComponents,overlayNoRowsTemplate:e.grid.overlayNoRowsTemplate,suppressRowClickSelection:!0},on:{"grid-ready":e.onGridReady,"cell-value-changed":e.onCellValueChanged}})],1):e._e(),a("div",{staticClass:"col-xs-12"},[a("q-btn",{on:{click:function(t){e.cancelOperation()}}},[e._v("Cancel")]),a("q-btn",{staticClass:"float-right",attrs:{type:"submit",icon:"add",color:"primary",loading:e.loading,label:"Save"},on:{click:e.saveItem}},[a("q-spinner",{attrs:{slot:"loading"},slot:"loading"})],1)],1)])])])},o=[];n._withStripped=!0;a("96cf");var r=a("c973"),i=a.n(r),s=a("448a"),l=a.n(s),c=(a("ac6a"),a("7f7f"),a("7514"),a("2ef0")),u=a.n(c),d=a("c1df"),f=a.n(d),m=a("ed08"),p=a("c242"),h=a("b1f1"),v=a("7bb4"),b=a("7882"),y=a("1723"),g=a("659a"),S=a("52c5"),P=a("2f62"),C=a("02b0"),k=a("2fbd"),N=["Fee","Item"],w=["","In-Cash","Monthly Basis"],O={name:"EnrollmentCreate",beforeMount:function(){var e=this;e.grid.overlayNoRowsTemplate='<span style="padding: 10px; border: 1px solid #eceff1; background: #fafafad6; width: 50%;">No rows to display <q-icon name=""></span>',e.grid.gridOptions={singleClickEdit:!0},e.grid.frameworkComponents={CodeFeeInput:C["a"],NumberInput:k["a"]},e.grid.tableColumns=[{headerName:"No",field:"lineNumber",width:133,sortable:!0,filter:!0,editable:!1,resizable:!0,suppressSizeToFit:!0,checkboxSelection:function(e){return!e.data.isMandatory},cellClass:function(e){return e.data.isMandatory?"not-allowed":""}},{headerName:"Type",field:"type",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,editable:!1,cellEditor:"agSelectCellEditor",cellEditorParams:{values:[0,1]},valueFormatter:function(e){return Object(m["g"])(N,e.value)},valueParser:function(e){return Object(m["f"])(N,e.newValue)}},{headerName:"Code",field:"code",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,editable:function(e){return!e.data.isMandatory},cellEditor:"CodeFeeInput"},{headerName:"Name",field:"name",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,editable:!0},{headerName:"Description",field:"description",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,editable:!0},{headerName:"Payment Term",field:"paymentTerm",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,editable:function(e){return null!==e.data.type&&(1===e.data.type||"1"===e.data.type)},cellClass:function(e){return null===e.data.type||1!==e.data.type&&"1"!==e.data.type?["not-allowed"]:[]},cellEditor:"agSelectCellEditor",cellEditorParams:{values:[0,1,2]},valueFormatter:function(e){return Object(m["g"])(w,e.value)},valueParser:function(e){return Object(m["f"])(w,e.newValue)}},{headerName:"Quantity",field:"quantity",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,cellEditor:"NumberInput",editable:function(e){return null!==e.data.type&&(1===e.data.type||"1"===e.data.type)},cellClass:function(e){return null===e.data.type||1!==e.data.type&&"1"!==e.data.type?"not-allowed":""},valueFormatter:function(e){return e.data.quantity?Object(m["e"])(e.data.quantity):""},cellRenderer:function(e){return e.data.quantity?Object(m["e"])(e.data.quantity):""}},{headerName:"Unit Price",field:"unitPrice",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,cellEditor:"NumberInput",editable:function(e){return null!==e.data.type&&(1===e.data.type||"1"===e.data.type)},cellClass:function(e){return null===e.data.type||1!==e.data.type&&"1"!==e.data.type?"not-allowed":""},valueFormatter:function(e){return e.data.unitPrice?Object(m["e"])(e.data.unitPrice):"-"}},{headerName:"Discount (%)",field:"discount",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,cellEditor:"NumberInput",editable:!0,cellClass:["pointer"],valueFormatter:function(e){return e.data.discount?Object(m["e"])(e.data.discount):""}},{headerName:"Amount",field:"amount",sortable:!0,filter:!0,resizable:!0,suppressSizeToFit:!0,cellEditor:"NumberInput",editable:!1,cellClass:["not-allowed"],valueFormatter:function(e){return e.data.amount?Object(m["e"])(e.data.amount):""}},{headerName:"Remarks",field:"remarks",sortable:!0,filter:!0,editable:!0,resizable:!0,suppressSizeToFit:!0,cellEditor:"agLargeTextCellEditor"}]},mounted:function(){var e=this;e.getOpenSchoolYear(),u.a.isEmpty(e.user.branch)||(e.form.branch=e.user.branch)},data:function(){return{loading:!1,levels:[],students:[],schoolyears:[],branches:[],grid:{gridApi:null,overlayNoRowsTemplate:null,gridColumnApi:null,frameworkComponents:null,gridOptions:{},defaultColDef:{sortable:!0,resizable:!0,suppressSizeToFit:!0},rowAnimation:!0,rowSelection:"multiple",tableColumns:null},form:{branch:"",isReserved:!1,isGraduating:!1,studentNumber:"",studentName:"",schoolYearCode:"",levelCode:"",levelDescription:"",paymentTerm:0,isScholar:!1,fees:[]},schoolYear:{},formPayment:{}}},computed:u.a.merge(Object(P["b"])({feeLists:"Fee/getAll",user:"Auth/getUser"}),{}),methods:{getOpenSchoolYear:function(){try{var e=this;g["a"].OpenSchoolYear().then(function(t){200===t.status&&(t.data.error?e.$q.notify({color:"negative",message:t.data.error,position:"top"}):0!==t.data.length?e.schoolyears=t.data:setTimeout(function(){e.$router.push({name:"enrollment.index"}),e.$q.notify({color:"negative",message:"Please Open a School year first!",position:"top"})},200))})}catch(e){Object(m["b"])(e)}},paymentTermFieldSet:function(){var e=this;e.deleteLevel()},onGridReady:function(e){var t=this;t.grid.gridApi=e.api,t.grid.gridColumnApi=e.columnApi},onCellValueChanged:function(e){var t=this,a=u.a.find(t.form.fees,["_id",e.data._id]),n=null;if(a){if(n=JSON.parse(JSON.stringify(a)),"code"===e.colDef.field){var o=u.a.find(t.feeLists,["code",n.code]);n["description"]=o.description,n["name"]=o.name,n["paymentTerm"]=o.paymentTerm,n["unitPrice"]=o.unitPrice,n["isAnticipatedEventsAccessories"]=o.isAnticipatedEventsAccessories}else if("quantity"===e.colDef.field||"unitPrice"===e.colDef.field||"discount"===e.colDef.field)if(n.discount||(n.discount=0),"1"===n.type){var r=n["quantity"]*n.unitPrice;n["amount"]=r-n["quantity"]*n.unitPrice*(n.discount/100)}else n["amount"]=n.unitPrice-n.unitPrice*(n.discount/100);n["balance"]=n["amount"],t.form.fees.forEach(function(a,o){a._id===e.data._id&&t.form.fees.splice(o,1,n)})}},onRemoveSelected:function(){var e=this,t=e.grid.gridApi.getSelectedRows(),a=JSON.parse(JSON.stringify(e.form.fees));u.a.forEach(t,function(e,t){u.a.remove(a,function(t){return t._id===e._id})}),e.form.fees=a},onAddRow:function(e){var t=this,a=null;setTimeout(function(){var n=JSON.parse(JSON.stringify(t.form.fees));t.$nextTick(function(){var o=[{_id:Object(m["h"])(),type:"1",code:"",name:"",description:"",discount:0,paymentTerm:0,balance:0,quantity:null,amount:0,unitPrice:0,isNew:!0}];a=e?l()(e.concat(n)):l()(o.concat(n)),t.form.fees=a})},200)},cancelOperation:function(){var e=this,t=[];for(var a in e.form)""!==e.form[a]&&t.push(a);t.length?e.$q.dialog({title:"Cancel Operation",message:"You still have pending changes. Are you sure you want to leave this page?",ok:"Agree",cancel:"Disagree"}).then(function(){e.$router.push({name:"enrollment.index"}),e.$q.notify("Agreed!")}).catch(function(){e.$q.notify("Disagreed...")}):e.$router.push({name:"enrollment.index"})},addMandatoryFees:function(){var e=i()(regeneratorRuntime.mark(function e(t){var a,n,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=this,a.form.fees=[],n=[],e.next=6,v["a"].ShowMandatoryFees({branch:a.form.branch});case 6:o=e.sent,o.data&&(o.data.forEach(function(e,o){var r={_id:Object(m["h"])(),type:0,code:e.code,name:e.name,discount:0,description:e.description,paymentTerm:a.form.paymentTerm,quantity:e.quantity,amount:t.unitPrice,unitPrice:t.unitPrice,balance:t.unitPrice,isMandatory:e.isMandatory,isNew:!0};a.form.isScholar?("Registration Fees"===e.name&&(r["amount"]=t.registrationFee,r["unitPrice"]=t.registrationFee,r["balance"]=t.registrationFee,r["paymentTerm"]=1),"Books"===e.name&&(r["amount"]=t.booksScholarUnitPrice,r["unitPrice"]=t.booksScholarUnitPrice,r["balance"]=t.booksScholarUnitPrice,r["paymentTerm"]=1),"Tuition Fees"===e.name&&(r["amount"]=t.scholarUnitPrice,r["unitPrice"]=t.scholarUnitPrice,r["balance"]=t.scholarUnitPrice),"Miscellaneous Fees"===e.name&&(r["amount"]=t.miscellScholarUnitPrice,r["unitPrice"]=t.miscellScholarUnitPrice,r["balance"]=t.miscellScholarUnitPrice)):("Registration Fees"===e.name&&(r["amount"]=t.registrationFee,r["unitPrice"]=t.registrationFee,r["balance"]=t.registrationFee,r["paymentTerm"]=1),"Books"===e.name&&(r["amount"]=t.booksUnitPrice,r["unitPrice"]=t.booksUnitPrice,r["balance"]=t.booksUnitPrice,r["paymentTerm"]=1),"Tuition Fees"===e.name&&(r["amount"]=t.unitPrice,r["unitPrice"]=t.unitPrice,r["balance"]=t.unitPrice),"Miscellaneous Fees"===e.name&&(r["amount"]=t.miscellUnitPrice,r["unitPrice"]=t.miscellUnitPrice,r["balance"]=t.miscellUnitPrice)),n.push(r)}),a.onAddRow(n)),e.next=12;break;case 10:e.prev=10,e.t0=e["catch"](0);case 12:case"end":return e.stop()}},e,this,[[0,10]])}));return function(t){return e.apply(this,arguments)}}(),getSelectedSchoolYear:function(e){var t=this,a=u.a.find(t.schoolyears,["code",e.value]);a&&(t.form.schoolYearCode=a.code)},deleteSchoolYear:function(){var e=this;e.form.schoolYearCode=""},mapSchoolYear:function(e){return u.a.map(e,function(e){return{label:e.code,value:e.code}})},getSchoolYear:function(e,t){var a=this,n=[],o={terms:e};g["a"].PickList(o).then(function(e){if(200===e.status)if(e.data.error)a.$q.notify({color:"negative",message:e.data.error,position:"top"}),void 0!==t&&t(n);else{var o=JSON.parse(JSON.stringify(e.data));n=a.mapSchoolYear(o),void 0!==t&&(a.schoolyears=o,t(n))}},function(e){a.$q.notify({message:e.response.data.error,position:"top",type:"negative"})})},getSelectedSchoolBranch:function(e){var t=this,a=u.a.find(t.branches,["code",e.value]);a&&(t.form.branch=a.code)},deleteSchoolBranch:function(){var e=this;e.form.branch="",e.deleteLevel()},mapSchoolBranch:function(e){return u.a.map(e,function(e){return{label:"".concat(e.code," - ").concat(e.name),value:e.code}})},getSchoolBranch:function(e,t){var a=this,n=[],o={terms:e};S["a"].PickList(o).then(function(e){if(200===e.status)if(e.data.error)a.$q.notify({color:"negative",message:e.data.error,position:"top"}),void 0!==t&&t(n);else{var o=JSON.parse(JSON.stringify(e.data));n=a.mapSchoolBranch(o),void 0!==t&&(a.branches=o,t(n))}},function(e){a.$q.notify({message:e.response.data.error,position:"top",type:"negative"})})},getSelectedLevel:function(e){var t=this,a=u.a.find(t.levels,["code",e.value]);a&&(t.form.levelCode=a.code,t.form.levelDescription=a.name+" - "+a.description,t.form.isGraduating=a.isGraduating,t.addMandatoryFees(a))},deleteLevel:function(){var e=this;e.form.levelCode="",e.form.levelDescription="",e.form.fees=[]},mapLevel:function(e){return u.a.map(e,function(e){return{label:e.code+" - "+e.name,value:e.code}})},getLevel:function(e,t){var a=this,n=[],o={terms:e,branch:a.form.branch};b["a"].PickList(o).then(function(e){if(200===e.status)if(e.data.error)a.$q.notify({color:"negative",message:e.data.error,position:"top"}),void 0!==t&&t(n);else{var o=JSON.parse(JSON.stringify(e.data));n=a.mapLevel(o),void 0!==t&&(a.levels=o,t(n))}},function(e){a.$q.notify({message:e.response.data.error,position:"top",type:"negative"})})},getSelectedStudent:function(e){var t=this,a=u.a.find(t.students,["studentNumber",e.value]);console.log(a,e),a&&(t.form.studentNumber=a.studentNumber,t.form.studentName=a.lastName+" "+a.givenName)},deleteStudent:function(){var e=this;e.form.studentNumber="",e.form.studentName=""},mapStudent:function(e){return u.a.map(e,function(e){return{label:e.studentNumber+" - "+e.lastName+" "+e.givenName,value:e.studentNumber}})},getStudent:function(e,t){var a=this,n=[],o={terms:e};y["a"].PickList(o).then(function(e){if(200===e.status)if(e.data.error)a.$q.notify({color:"negative",message:e.data.error,position:"top"}),void 0!==t&&t(n);else{var o=JSON.parse(JSON.stringify(e.data));n=a.mapStudent(o),void 0!==t&&(a.students=o,t(n))}},function(e){a.$q.notify({message:e.response.data.error,position:"top",type:"negative"})})},saveItem:function(){var e=this;try{var t=e.form;p["a"].Store(t).then(function(t){200===t.status&&(t.data.error?e.$q.notify({color:"negative",message:t.data.error,position:"top"}):(e.$router.push({name:"enrollment.edit",query:{id:t.data.enrollmentId}}),e.$q.notify({color:"positive",message:"Student Enrolled!",position:"top"})))},function(t){e.$q.notify({color:"negative",message:t.response.data.error,position:"top"})})}catch(e){console.log(e),Object(m["b"])()}},paymentGetRow:function(){var e=i()(regeneratorRuntime.mark(function e(t,a){var n,o,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=this,n.schoolYear=null,n.formPayment=null,n.formPayment.balance=null;try{o=t,null!==o&&(r={feeId:a,enrollmentId:t},n.formPayment={payments:[],balance:null},h["a"].Show(r).then(function(e){200===e.status&&(e.data.error?n.$q.notify({color:"negative",message:e.data.error,position:"top"}):(n.schoolYear=e.data.schoolYear,n.formPayment=e.data.enrollment,n.formPayment.balance=n.paymentBalance,n.formPayment.payments&&0!==n.formPayment.payments.length||(n.formPayment["payments"]=[],n.paymentonAddRow())))},function(e){throw e}))}catch(e){console.log(e),Object(m["b"])()}case 5:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}(),paymentonAddRow:function(e,t){var a=this,n=null;setTimeout(function(){var t=JSON.parse(JSON.stringify(a.formPayment.payments));a.$nextTick(function(){var o=[],r=a.formPayment.amount;if(2===a.formPayment.paymentTerm&&100!==a.formPayment.discount)for(var i=f()(f()().format(),"YYYY-MM-DD"),s=f()(a.schoolYear.schoolStartDate),c=f()(a.schoolYear.schoolEndDate),u=a.amountdaysDueValue,d=Math.round(c.diff(s,"months",!0))+1,p=0,h=5,v=f()(s.format("YYYY-MM-DD"),"YYYY-MM-DD"),b=0;b<d;b++){var y={_id:Object(m["h"])(),number:"",formOfPayment:1,cashTendered:0,dateToPay:null,dueDate:null,numberOfDaysDue:0,datePaid:f()().format("YYYY-MM-DD"),isPaid:!1,receipt:null,remarks:"",isNew:!0};y["dateToPay"]=f()(v.format("YYYY-MM-DD"),"YYYY-MM-DD").add(p,"month"),y["dueDate"]=f()(y["dateToPay"].format("YYYY-MM-DD"),"YYYY-MM-DD").add(h,"days"),y["amountToPayPerMonth"]=r/d;var g=parseInt(i.diff(y["dueDate"],"days",!0));y["amountDue"]=0===g?y["amountToPayPerMonth"]+g*u:y["amountToPayPerMonth"],p++,o.push(y)}else{var S=!1;100===a.formPayment.discount&&(S=!0),o.push({_id:Object(m["h"])(),number:"",formOfPayment:1,cashTendered:0,amountToPayPerMonth:r,amountDue:r,numberOfDaysDue:0,dateToPay:f()().format("YYYY-MM-DD"),dueDate:f()().add(5,"days").format("YYYY-MM-DD"),datePaid:f()().format("YYYY-MM-DD"),isPaid:S,receipt:null,remarks:"",isNew:!0})}n=e?l()(e.concat(t)):l()(o.concat(t)),a.formPayment.payments=n,console.log(a.formPayment.payments)})},200)},paymentsaveItem:function(e){var t=this;try{var a=t.formPayment;h["a"].Update(a).then(function(e){e.status},function(e){t.$q.notify({color:"negative",message:e.response.data.error,position:"top"})})}catch(e){Object(m["b"])(e)}}}},Y=O,q=a("2877"),D=Object(q["a"])(Y,n,o,!1,null,null,null);D.options.__file="Create.vue";t["default"]=D.exports}}]);