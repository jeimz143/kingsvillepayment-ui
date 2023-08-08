(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["a37919ec"],{"0ec4":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"row gutter-sm"},[i("div",{staticClass:"col-xs-12"},[i("div",{staticClass:"row gutter-sm float-right"},[i("div",[i("q-btn",{staticClass:"float-right",attrs:{flat:"",color:"positive",round:"",disabled:0===e.students.length},on:{click:function(t){e.onBtExport()}}},[i("q-icon",{attrs:{name:"file_download",size:"sm"}}),i("q-tooltip",[e._v("\n              Download CSV File\n            ")])],1)],1)])]),i("div",{staticClass:"col-xs-12"},[i("AgGrid",{staticClass:"ag-theme-material ag-list-page",attrs:{rowData:e.students,rowSelection:e.grid.rowSelection,rowAnimation:e.grid.rowAnimation,gridOptions:e.grid.gridOptions,defaultColDef:e.grid.defaultColDef,columnDefs:e.grid.tableColumns,overlayLoadingTemplate:e.grid.overlayLoadingTemplate,overlayNoRowsTemplate:e.grid.overlayNoRowsTemplate,pagination:!0,paginationPageSize:e.grid.paginationPageSize,context:e.grid.context,frameworkComponents:e.grid.frameworkComponents},on:{"grid-ready":e.onGridReady,"cell-clicked":e.showItem}})],1)])])},r=[];a._withStripped=!0;i("ac6a");var o=i("2f62"),n=i("2ef0"),l=i.n(n),d=i("c1df"),s=i.n(d),u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"row gutter-sm"},[i("div",[i("q-btn",{staticClass:"float-right",attrs:{flat:"",color:"negative",round:""},on:{click:function(t){e.deleteStudent()}}},[i("q-icon",{attrs:{name:"delete",size:"sm"}}),i("q-tooltip",[e._v("\n          Delete\n        ")])],1)],1)])])},c=[];u._withStripped=!0;i("96cf");var m=i("c973"),p=i.n(m),f=i("2b0e"),g=i("ed08"),h=i("1723"),w=f["default"].extend({name:"IndexCellButtonRenderer",created:function(){},data:function(){return{}},computed:l.a.merge(Object(o["b"])({user:"Auth/getUser"}),{}),methods:{deleteStudent:function(){var e=this;e.deleteLoading=!0;try{e.$q.dialog({title:"Delete Student",message:"This will delete the record of the selected Students. Are you sure?",ok:"Delete",cancel:"Cancel"}).then(p()(regeneratorRuntime.mark(function t(){var i,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["a"].Delete({_id:e.params.data._id});case 2:i=t.sent,a=i.data,r=i.status,200===r&&(a.error?e.$q.notify({color:"negative",message:a.error,position:"top"}):(e.params.context.resetData(e.params.data._id),e.$q.notify({color:"positive",message:"Student Deleted.",position:"top"})),e.isPageReloading=!1);case 6:case"end":return t.stop()}},t)}))).catch()}catch(e){Object(g["b"])(e)}}}}),v=w,b=i("2877"),C=Object(b["a"])(v,u,c,!1,null,null,null);C.options.__file="IndexCellButtonRenderer.vue";var N=C.exports,A={name:"StudentList",sockets:{StudentList:function(e){var t=this;t.$store.dispatch("Student/listAll",e)}},beforeMount:function(){var e=this;e.grid.gridOptions={onGridSizeChanged:function(){e.grid.gridOptions.api.sizeColumnsToFit()}},this.grid.context=this,this.grid.frameworkComponents={IndexCellButtonRenderer:N},this.grid.overlayLoadingTemplate='<span style="padding: 10px; border: 1px solid #eceff1; background: #fafafad6; width: 50%;">Loading... <q-icon name=""></span>',this.grid.overlayNoRowsTemplate='<span style="padding: 10px; border: 1px solid #eceff1; background: #fafafad6; width: 50%;">No rows to display <q-icon name=""></span>',this.grid.tableColumns=[{headerName:"Student No.",field:"studentNumber",pinned:"left",sortable:!0,filter:!0,width:150},{headerName:"LRN",field:"lrn",pinned:"left",sortable:!0,filter:!0,width:150},{headerName:"Given Name",field:"givenName",sortable:!0,filter:!0,width:150},{headerName:"Middle Name",field:"middleName",sortable:!0,filter:!0,width:150},{headerName:"Last Name",field:"lastName",sortable:!0,filter:!0,width:150},{headerName:"Birth Date",field:"birthDate",sortable:!0,filter:!0,width:150},{headerName:"Mobile Number",field:"mobileNumber",sortable:!0,filter:!0,width:150},{headerName:"Telephone Number",field:"telephoneNumber",sortable:!0,filter:!0,width:150},{headerName:"Complete Address",field:"completeAddress",sortable:!0,filter:!0,width:150},{headerName:"Actions",field:"id",cellRenderer:"IndexCellButtonRenderer",sortable:!1,pinned:"right"}]},mounted:function(){var e=this,t=this;t.grid.gridApi=t.grid.gridOptions.api,t.grid.gridColumnApi=t.grid.gridOptions.columnApi,setTimeout(function(){return e.autoSizeAll()},800)},data:function(){return{grid:{context:null,frameworkComponents:null,gridApi:null,gridColumnApi:null,gridOptions:{},rowData:[],overlayLoadingTemplate:null,overlayNoRowsTemplate:null,paginationPageSize:100,defaultColDef:{sortable:!0,resizable:!0,suppressSizeToFit:!0,cellClass:["pointer"]},rowAnimation:!0,rowSelection:"multiple",tableColumns:null}}},computed:l.a.merge(Object(o["b"])({user:"Auth/getUser",students:"Student/getAll"}),{}),methods:{autoSizeAll:function(){var e=[];this.grid.gridColumnApi.getAllColumns().forEach(function(t){e.push(t.colId)}),this.grid.gridColumnApi.autoSizeColumns(e)},onBtExport:function(){var e=this,t="Student_List_"+s()().format("MM_DD_YYYY_hh_mm_ss"),i={skipHeader:!1,columnGroups:!1,allColumns:!0,fileName:t,columnSeparator:"",customHeader:"",customFooter:""};e.grid.gridApi.exportDataAsCsv(i)},onGridReady:function(e){var t=this;e.api.sizeColumnsToFit(),e.api.showLoadingOverlay(),this.$store.dispatch("Student/setAll").then(function(){0===t.students.length?e.api.showNoRowsOverlay():e.api.hideOverlay(),t.autoSizeAll()})},resetData:function(e){var t=this,i=l.a.remove(t.grid.gridOptions.rowData,function(t,i){return t.id!==e});t.grid.gridApi.setRowData(i),t.grid.gridApi.refreshCells({force:!0})},showItem:function(e){var t=this;"id"!==e.colDef.field&&t.$router.push({name:"student.edit",query:{id:e.data._id}})}}},S=A,_=(i("2c16"),Object(b["a"])(S,a,r,!1,null,null,null));_.options.__file="List.vue";t["default"]=_.exports},"2c16":function(e,t,i){"use strict";var a=i("56f4"),r=i.n(a);r.a},"56f4":function(e,t,i){}}]);