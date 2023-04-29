var render = function render(){var _vm=this,_c=_vm._self._c;return
_c('div',{attrs:{"id":"app"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.mack),expression:"mack"}],staticClass:"mack",on:{"click":function($event){(_vm.mack
= false), (_vm.optionsShow = false), (_vm.production =
false)}}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.open.showP),expression:"open.showP"}],staticClass:"open"},[_c('img',{attrs:{"src":require("./assets/huama.png"),"alt":""}}),_c('div',{staticClass:"titlePassword"},[_vm._v("提示：请向管理员索要通行码")]),_c('van-password-input',{staticClass:"password",attrs:{"value":_vm.value,"focused":_vm.showKeyboard},on:{"focus":function($event){_vm.showKeyboard
=
true}}}),_c('van-number-keyboard',{staticClass:"keyboard",attrs:{"show":_vm.showKeyboard,"theme":"custom","extra-key":".","close-button-text":"完成"},on:{"blur":function($event){_vm.showKeyboard
= false},"input":_vm.onInput},model:{value:(_vm.value),callback:function ($$v)
{_vm.value=$$v},expression:"value"}})],1),_c('div',{staticClass:"content"},[_c('div',{staticClass:"top"},[_c('p',[_c('img',{attrs:{"src":require("./assets/huama.png"),"alt":""}}),_c('input',{ref:"foreheadCir",staticClass:"photoFime",attrs:{"type":"file","name":"upload_file","id":"uploadFile","mutiple":"mutiple","accept":"image/*"},on:{"change":function($event){return
_vm.uploadImg()}}})]),_c('p',[_c('span',{on:{"click":function($event){return
_vm.confirm($event)}}},[_vm._v("专业的人用专业的软件")])]),_c('p',[_c('span',{on:{"click":function($event){return
_vm.addMachine($event)}}},[_vm._v("癞蛤蟆你兄弟超专业")])]),_c('div',{staticClass:"showOptions",on:{"click":function($event){(_vm.mack
= true), (_vm.optionsShow =
true)}}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.nowTime),expression:"nowTime"}]})]),_c('div',{staticClass:"timeShow",on:{"click":function($event){return
_vm.timeShow($event)}}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.optionsShow),expression:"optionsShow"}],staticClass:"options"},[_c('div',{staticClass:"reset",on:{"click":function($event){_vm.showReset
= !_vm.showReset}}},[_vm._v(" 重置机台"),_c('i',{staticClass:"iconfont
icon-zhiwu"})]),_c('div',{staticClass:"clearAllf",on:{"click":function($event){return
_vm.clearAllf($event)}}},[_vm._v(" 删除非收藏"),_c('i',{staticClass:"iconfont
icon-yongyan"})]),_c('div',{staticClass:"other",on:{"click":function($event){(_vm.production
= !_vm.production), (_vm.optionsShow = false)}}},[_vm._v("
其他"),_c('i',{staticClass:"iconfont
icon-remai"})]),_c('div',{staticClass:"back",on:{"click":_vm.back}},[_vm._v("
退出 "),_c('i',{staticClass:"iconfont
icon-a-Group427318885"})])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showReset),expression:"showReset"}],staticClass:"confirm"},[_vm._m(0),_c('div',{staticClass:"left",on:{"click":function($event){return
_vm.clear($event)}}},[_vm._v("取消")]),_c('div',{staticClass:"right",on:{"click":function($event){return
_vm.determine($event)}}},[_vm._v("确定")])])]),_c('div',{staticClass:"por"},_vm._l((_vm.indexData.length),function(item,index){return
_c('div',{key:index,staticClass:"machine",attrs:{"id":index}},[_c('input',{class:_vm.ipt_one
? 'clearIpt iptOne' : 'clearIpt',attrs:{"type":"text","placeholder":"0
#"},domProps:{"value":_vm.indexData[index].code},on:{"input":function($event){return
_vm.ipt($event)}}}),_c('input',{staticClass:"clearIpt",attrs:{"type":"text","placeholder":"0000"},domProps:{"value":_vm.indexData[index].coding},on:{"input":function($event){return
_vm.ipt($event)}}}),_c('input',{staticClass:"clearIpt",attrs:{"type":"text","placeholder":"产品"},domProps:{"value":_vm.indexData[index].product},on:{"input":function($event){return
_vm.ipt($event)}}}),_c('input',{staticClass:"clearIpt",attrs:{"type":"text","placeholder":"9999"},domProps:{"value":_vm.indexData[index].target},on:{"input":function($event){return
_vm.ipt($event)}}}),_c('input',{staticClass:"countIpt
clearIpt",attrs:{"type":"text"},domProps:{"value":_vm.indexData[index].count},on:{"input":function($event){return
_vm.ipt($event)}}}),_c('input',{staticClass:"countResult",attrs:{"type":"button","value":_vm.indexData[index].result,"disabled":""}}),_c('input',{staticClass:"clearBtn",style:({
background: _vm.indexData[index].clear, color: _vm.indexData[index].color,
}),attrs:{"type":"button","value":"清除"},on:{"click":function($event){return
_vm.clearIpts($event)}}}),_c('ul',{staticClass:"time"},_vm._l((7),function(item,i){return
_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.nowTime),expression:"nowTime"}],key:i,domProps:{"innerHTML":_vm._s(_vm.indexData[index].liData[i])}})}),0),_c('div',{staticClass:"slide",on:{"click":function($event){return
_vm.slide($event)}}}),_c('div',{staticClass:"confirm"},[_vm._m(1,true),_c('div',{staticClass:"left",on:{"click":function($event){return
_vm.clear($event)}}},[_vm._v("取消")]),_c('div',{staticClass:"right",on:{"click":function($event){return
_vm.cancel($event)}}},[_vm._v("确定")])]),_c('div',{staticClass:"rightBtn"},[_c('div',{staticClass:"collection",on:{"click":function($event){return
_vm.clickCollection($event)}}},[_vm._v("收藏")]),_c('div',{staticClass:"delete",on:{"click":function($event){return
_vm.clickDelete($event)}}},[_vm._v("删除")])])])}),0),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.production),expression:"production"}],staticClass:"production"},[_c('p',[_vm._v(_vm._s(_vm.dataTime()))]),_vm._l((_vm.ccc[0]),function(item,index){return
_c('p',{key:index,attrs:{"id":index}},[_vm._v(" "+_vm._s(_vm.ccc[index])+"
")])})],2)])]) } var staticRenderFns = [function (){var
_vm=this,_c=_vm._self._c;return
_c('p',[_vm._v("确定清除所有机"),_c('br'),_vm._v("台数据吗?")]) },function
(){var _vm=this,_c=_vm._self._c;return _c('p',[_vm._v("确定清除这个机
"),_c('br'),_vm._v("台数据吗?")]) }] export { render, staticRenderFns }
