// ==UserScript==
// @id             MRH-ff.net-list
// @name           Fanfiction.net Story Parser
// @version        4.3.2
// @namespace      window
// @author         MRH
// @description    www.fanfiction.net story parser
// @updateURL      https://github.com/MRH4287/FFNetParser/raw/master/ffnetlist.user.js
// @include        http://www.fanfiction.net/search.php
// @include        http://www.fanfiction.net/anime/*
// @include        http://www.fanfiction.net/book/*
// @include        http://www.fanfiction.net/cartoon/*
// @include        http://www.fanfiction.net/comic/*
// @include        http://www.fanfiction.net/game/*
// @include        http://www.fanfiction.net/misc/*
// @include        http://www.fanfiction.net/movie/*
// @include        http://www.fanfiction.net/crossovers/play/*
// @include        http://www.fanfiction.net/tv/*
// @include        http://www.fanfiction.net/communities/*
// @include        http://www.fanfiction.net/community/*
// @include        http://www.fanfiction.net/u/*
// @include        http://www.fanfiction.net/s/*
// @include        http://www.fanfiction.net/forums/*
// @run-at         document-end
// ==/UserScript==


/* Inludes */

/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);

/*! jQuery UI - v1.10.2 - 2013-04-04
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.resizable.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.tooltip.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),i.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i,s=this,n=!1,a=!1;for(e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),i=this.element[0];i&&(i=i.parentNode);)i===document&&(n=!0);return n||"original"!==this.options.helper?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;if("parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=["document"===n.containment?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,"document"===n.containment?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,("document"===n.containment?0:e(window).scrollLeft())+e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,("document"===n.containment?0:e(window).scrollTop())+(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||n.containment.constructor===Array)n.containment.constructor===Array&&(this.containment=n.containment);else{if(i=e(n.containment),s=i[0],!s)return;t="hidden"!==e(s).css("overflow"),this.containment=[(parseInt(e(s).css("borderLeftWidth"),10)||0)+(parseInt(e(s).css("paddingLeft"),10)||0),(parseInt(e(s).css("borderTopWidth"),10)||0)+(parseInt(e(s).css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e(s).css("borderRightWidth"),10)||0)-(parseInt(e(s).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e(s).css("borderBottomWidth"),10)||0)-(parseInt(e(s).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i}},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n,a,o=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName),l=t.pageX,u=t.pageY;return this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(u=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(u=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((u-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,u=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,l=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a)),{top:u-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var s=e(this).data("ui-draggable"),n=s.options,a=e.extend({},i,{item:s.element});s.sortables=[],e(n.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,a))})},stop:function(t,i){var s=e(this).data("ui-draggable"),n=e.extend({},i,{item:s.element});e.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,n))})},drag:function(t,i){var s=e(this).data("ui-draggable"),n=this;e.each(s.sortables,function(){var a=!1,o=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(a=!0,e.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==o&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(o.instance.element[0],this.instance.element[0])&&(a=!1),a})),a?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",t),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",t),s.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._opacity&&e(i.helper).css("opacity",s._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-e(document).scrollTop()<s.scrollSensitivity?n=e(document).scrollTop(e(document).scrollTop()-s.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<s.scrollSensitivity&&(n=e(document).scrollTop(e(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-e(document).scrollLeft()<s.scrollSensitivity?n=e(document).scrollLeft(e(document).scrollLeft()-s.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<s.scrollSensitivity&&(n=e(document).scrollLeft(e(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),s=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(t,i){var s,n,a,o,r,h,l,u,c,d,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(c=p.snapElements.length-1;c>=0;c--)r=p.snapElements[c].left,h=r+p.snapElements[c].width,l=p.snapElements[c].top,u=l+p.snapElements[c].height,g>r-m&&h+m>g&&y>l-m&&u+m>y||g>r-m&&h+m>g&&b>l-m&&u+m>b||v>r-m&&h+m>v&&y>l-m&&u+m>y||v>r-m&&h+m>v&&b>l-m&&u+m>b?("inner"!==f.snapMode&&(s=m>=Math.abs(l-b),n=m>=Math.abs(u-y),a=m>=Math.abs(r-v),o=m>=Math.abs(h-g),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||a||o,"outer"!==f.snapMode&&(s=m>=Math.abs(l-y),n=m>=Math.abs(u-b),a=m>=Math.abs(r-g),o=m>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[c].snapping&&(s||n||a||o||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=s||n||a||o||d):(p.snapElements[c].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=!1)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,s=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});s.length&&(t=parseInt(e(s[0]).css("zIndex"),10)||0,e(s).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+s.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._zIndex&&e(i.helper).css("zIndex",s._zIndex)}})})(jQuery);(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,a,o=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=t(this.helper.css("left")),n=t(this.helper.css("top")),o.containment&&(s+=e(o.containment).scrollLeft()||0,n+=e(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,a=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===a?this.axis+"-resize":a),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,n={},a=this.originalMousePosition,o=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-a.left||0,d=t.pageY-a.top||0,p=this._change[o];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==u&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(n)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,n,a,o,r=this.options;o={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||e)&&(t=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,s=o.maxHeight*this.aspectRatio,a=o.maxWidth/this.aspectRatio,t>o.minWidth&&(o.minWidth=t),n>o.minHeight&&(o.minHeight=n),o.maxWidth>s&&(o.maxWidth=s),o.maxHeight>a&&(o.maxHeight=a)),this._vBoundaries=o},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,n=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===n&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===n&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,n=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,a=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,o=i(e.width)&&t.minWidth&&t.minWidth>e.width,r=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return o&&(e.width=t.minWidth),r&&(e.height=t.minHeight),n&&(e.width=t.maxWidth),a&&(e.height=t.maxHeight),o&&u&&(e.left=h-t.minWidth),n&&u&&(e.left=h-t.maxWidth),r&&c&&(e.top=l-t.minHeight),a&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,n,a=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(n=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);n.css({height:a.height()-this.borderDif[0]-this.borderDif[2]||0,width:a.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&e.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,a,o,r,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,n){s[e]=t(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,a=l.containerSize.height,o=l.containerSize.width,r=e.ui.hasScroll(p,"left")?p.scrollWidth:o,h=e.ui.hasScroll(p)?p.scrollHeight:a,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(t){var i,s,n,a,o=e(this).data("ui-resizable"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,c={top:0,left:0},d=o.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-c.left),u&&(o.size.height=o.size.width/o.aspectRatio),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio),o.position.top=o._helper?h.top:0),o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top,i=Math.abs((o._helper?o.offset.left-c.left:o.offset.left-c.left)+o.sizeDiff.width),s=Math.abs((o._helper?o.offset.top-c.top:o.offset.top-h.top)+o.sizeDiff.height),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a&&(i-=o.parentData.left),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,n=t.originalSize,a=t.originalPosition,o=t.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,u=Math.round((s.width-n.width)/h)*h,c=Math.round((s.height-n.height)/l)*l,d=n.width+u,p=n.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(o)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.top=a.top-c):/^(sw)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.left=a.left-u):(t.size.width=d,t.size.height=p,t.position.top=a.top-c,t.position.left=a.left-u)}})})(jQuery);(function(t){var e,i,s,n,a="ui-button ui-widget ui-state-default ui-corner-all",o="ui-state-hover ui-state-active ",r="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var e=t(this).find(":ui-button");setTimeout(function(){e.button("refresh")},1)},l=function(e){var i=e.name,s=e.form,n=t([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),n};t.widget("ui.button",{version:"1.10.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var o=this,r=this.options,c="checkbox"===this.type||"radio"===this.type,u=c?"":"ui-state-active",d="ui-state-focus";null===r.label&&(r.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(a).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){r.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){r.disabled||t(this).removeClass(u)}).bind("click"+this.eventNamespace,function(t){r.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){o.buttonElement.addClass(d)}).bind("blur"+this.eventNamespace,function(){o.buttonElement.removeClass(d)}),c&&(this.element.bind("change"+this.eventNamespace,function(){n||o.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(t){r.disabled||(n=!1,i=t.pageX,s=t.pageY)}).bind("mouseup"+this.eventNamespace,function(t){r.disabled||(i!==t.pageX||s!==t.pageY)&&(n=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return r.disabled||n?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(r.disabled||n)return!1;t(this).addClass("ui-state-active"),o.buttonElement.attr("aria-pressed","true");var e=o.element[0];l(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return r.disabled?!1:(t(this).addClass("ui-state-active"),e=this,o.document.one("mouseup",function(){e=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return r.disabled?!1:(t(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(e){return r.disabled?!1:((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",r.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(a+" "+o+" "+r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(e?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?l(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var e=this.buttonElement.removeClass(r),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):a.push("ui-button-text-only"),e.addClass(a.join(" "))}}),t.widget("ui.buttonset",{version:"1.10.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);(function(t,e){function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.dpDiv=s(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(i,"mouseout",function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",function(){t.datepicker._isDisabledDatepicker(a.inline?e.parent()[0]:a.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))})}function n(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}t.extend(t.ui,{datepicker:{version:"1.10.2"}});var a,r="datepicker",o=(new Date).getTime();t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return n(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,a;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),a=this._newInst(t(e),n),a.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,a):n&&this._inlineDatepicker(e,a)},_newInst:function(e,i){var n=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),t.data(e,r,i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,a,r=this._get(i,"appendText"),o=this._get(i,"isRTL");i.append&&i.append.remove(),r&&(i.append=t("<span class='"+this._appendClass+"'>"+r+"</span>"),e[o?"before":"after"](i.append)),e.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(a?t("<img/>").attr({src:a,alt:n,title:n}):n)),e[o?"before":"after"](i.trigger),i.trigger.click(function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,a=new Date(2009,11,20),r=this._get(t,"dateFormat");r.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},a.setMonth(e(this._get(t,r.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(e(this._get(t,r.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),t.input.attr("size",this._formatDate(t,a).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,r,i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,a,o){var h,l,c,u,d,p=this._dialogInst;return p||(this.uuid+=1,h="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+h+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),t("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},t.data(this._dialogInput[0],r,p)),n(p.settings,a||{}),i=i&&i.constructor===Date?this._formatDate(p,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(l=document.documentElement.clientWidth,c=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+u,c/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],r,p),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,r);s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,r),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())},_enableDatepicker:function(e){var i,s,n=t(e),a=t.data(e,r);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),a=t.data(e,r);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,r)}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(i,s,a){var r,o,h,l,c=this._getInst(i);return 2===arguments.length&&"string"==typeof s?"defaults"===s?t.extend({},t.datepicker._defaults):c?"all"===s?t.extend({},c.settings):this._get(c,s):null:(r=s||{},"string"==typeof s&&(r={},r[s]=a),c&&(this._curInst===c&&this._hideDatepicker(),o=this._getDateDatepicker(i,!0),h=this._getMinMaxDate(c,"min"),l=this._getMinMaxDate(c,"max"),n(c.settings,r),null!==h&&r.dateFormat!==e&&r.minDate===e&&(c.settings.minDate=this._formatDate(c,h)),null!==l&&r.dateFormat!==e&&r.maxDate===e&&(c.settings.maxDate=this._formatDate(c,l)),"disabled"in r&&(r.disabled?this._disableDatepicker(i):this._enableDatepicker(i)),this._attachments(t(i),c),this._autoSize(c),this._setDate(c,o),this._updateAlternate(c),this._updateDatepicker(c)),e)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,a=t.datepicker._getInst(e.target),r=!0,o=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),r=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",a.dpDiv),n[0]&&t.datepicker._selectDay(e.target,a.selectedMonth,a.selectedYear,n[0]),i=t.datepicker._get(a,"onSelect"),i?(s=t.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(a,"stepBigMonths"):-t.datepicker._get(a,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(a,"stepBigMonths"):+t.datepicker._get(a,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),r=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),r=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,o?1:-1,"D"),r=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(a,"stepBigMonths"):-t.datepicker._get(a,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),r=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,o?-1:1,"D"),r=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(a,"stepBigMonths"):+t.datepicker._get(a,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),r=e.ctrlKey||e.metaKey;break;default:r=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):r=!1;r&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(i){var s,n,a=t.datepicker._getInst(i.target);return t.datepicker._get(a,"constrainInput")?(s=t.datepicker._possibleChars(t.datepicker._get(a,"dateFormat")),n=String.fromCharCode(null==i.charCode?i.keyCode:i.charCode),i.ctrlKey||i.metaKey||" ">n||!s||s.indexOf(n)>-1):e},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var i,s,a,r,o,h,l;i=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==i&&(t.datepicker._curInst.dpDiv.stop(!0,!0),i&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),s=t.datepicker._get(i,"beforeShow"),a=s?s.apply(e,[e,i]):{},a!==!1&&(n(i.settings,a),i.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(i),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),r=!1,t(e).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),o={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(i),o=t.datepicker._checkOffset(i,o,r),i.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:o.left+"px",top:o.top+"px"}),i.inline||(h=t.datepicker._get(i,"showAnim"),l=t.datepicker._get(i,"duration"),i.dpDiv.zIndex(t(e).zIndex()+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?i.dpDiv.show(h,t.datepicker._get(i,"showOptions"),l):i.dpDiv[h||"show"](h?l:null),i.input.is(":visible")&&!i.input.is(":disabled")&&i.input.focus(),t.datepicker._curInst=i))}},_updateDatepicker:function(e){this.maxRows=4,a=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var i,s=this._getNumberOfMonths(e),n=s[1],r=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",r*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!==document.activeElement&&e.input.focus(),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_getBorders:function(t){var e=function(t){return{thin:1,medium:2,thick:3}[t]||t};return[parseFloat(e(t.css("border-left-width"))),parseFloat(e(t.css("border-top-width")))]},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),a=e.dpDiv.outerHeight(),r=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-r:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+o?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+o):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,a,o=this._curInst;!o||e&&o!==t.data(e,r)||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){t.datepicker._tidyDialog(o)},t.effects&&(t.effects.effect[i]||t.effects[i])?o.dpDiv.hide(i,t.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(e,i,s,n){var a,r=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(r[0])||(a=this._getInst(r[0]),a.selectedDay=a.currentDay=t("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(e,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,a=this._get(e,"altField");a&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(a).each(function(){t(this).val(n)}))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(i,s,n){if(null==i||null==s)throw"Invalid arguments";if(s="object"==typeof s?""+s:s+"",""===s)return null;var a,r,o,h,l=0,c=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof c?c:(new Date).getFullYear()%100+parseInt(c,10),d=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,p=(n?n.dayNames:null)||this._defaults.dayNames,f=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,m=(n?n.monthNames:null)||this._defaults.monthNames,g=-1,v=-1,_=-1,b=-1,y=!1,w=function(t){var e=i.length>a+1&&i.charAt(a+1)===t;return e&&a++,e},k=function(t){var e=w(t),i="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n=RegExp("^\\d{1,"+i+"}"),a=s.substring(l).match(n);if(!a)throw"Missing number at position "+l;return l+=a[0].length,parseInt(a[0],10)},x=function(i,n,a){var r=-1,o=t.map(w(i)?a:n,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(o,function(t,i){var n=i[1];return s.substr(l,n.length).toLowerCase()===n.toLowerCase()?(r=i[0],l+=n.length,!1):e}),-1!==r)return r+1;throw"Unknown name at position "+l},D=function(){if(s.charAt(l)!==i.charAt(a))throw"Unexpected literal at position "+l;l++};for(a=0;i.length>a;a++)if(y)"'"!==i.charAt(a)||w("'")?D():y=!1;else switch(i.charAt(a)){case"d":_=k("d");break;case"D":x("D",d,p);break;case"o":b=k("o");break;case"m":v=k("m");break;case"M":v=x("M",f,m);break;case"y":g=k("y");break;case"@":h=new Date(k("@")),g=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"!":h=new Date((k("!")-this._ticksTo1970)/1e4),g=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"'":w("'")?D():y=!0;break;default:D()}if(s.length>l&&(o=s.substr(l),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=g?0:-100)),b>-1)for(v=1,_=b;;){if(r=this._getDaysInMonth(g,v-1),r>=_)break;v++,_-=r}if(h=this._daylightSavingAdjust(new Date(g,v-1,_)),h.getFullYear()!==g||h.getMonth()+1!==v||h.getDate()!==_)throw"Invalid date";return h},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,r=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,o=(i?i.monthNames:null)||this._defaults.monthNames,h=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},l=function(t,e,i){var s=""+e;if(h(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return h(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||h("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=l("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,a);break;case"o":u+=l("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=l("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),r,o);break;case"y":u+=h("y")?e.getFullYear():(10>e.getYear()%100?"0":"")+e.getYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":h("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,i){return t.settings[i]!==e?t.settings[i]:this._defaults[i]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),a=n,r=this._getFormatConfig(t);try{a=this.parseDate(i,s,r)||n}catch(o){s=e?"":s}t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),t.currentDay=s?a.getDate():0,t.currentMonth=s?a.getMonth():0,t.currentYear=s?a.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},a=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,a=n.getFullYear(),r=n.getMonth(),o=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":o+=parseInt(l[1],10);break;case"w":case"W":o+=7*parseInt(l[1],10);break;case"m":case"M":r+=parseInt(l[1],10),o=Math.min(o,t.datepicker._getDaysInMonth(a,r));break;case"y":case"Y":a+=parseInt(l[1],10),o=Math.min(o,t.datepicker._getDaysInMonth(a,r))}l=h.exec(i)}return new Date(a,r,o)},r=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return r=r&&"Invalid Date"==""+r?s:r,r&&(r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0)),this._daylightSavingAdjust(r)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,a=t.selectedYear,r=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=r.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=r.getMonth(),t.drawYear=t.selectedYear=t.currentYear=r.getFullYear(),n===t.selectedMonth&&a===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+o].datepicker._adjustDate(s,-i,"M")},next:function(){window["DP_jQuery_"+o].datepicker._adjustDate(s,+i,"M")},hide:function(){window["DP_jQuery_"+o].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+o].datepicker._gotoToday(s)},selectDay:function(){return window["DP_jQuery_"+o].datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+o].datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+o].datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,a,r,o,h,l,c,u,d,p,f,m,g,v,_,b,y,w,k,x,D,T,C,S,M,N,I,P,A,z,H,E,F,O,W,j,R=new Date,L=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),Y=this._get(t,"isRTL"),B=this._get(t,"showButtonPanel"),J=this._get(t,"hideIfNoPrevNext"),Q=this._get(t,"navigationAsDateFormat"),K=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),U=this._get(t,"stepMonths"),q=1!==K[0]||1!==K[1],X=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(t,"min"),$=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),$)for(e=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),e=G&&G>e?G:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=Q?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-U,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=Q?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+U,1)),this._getFormatConfig(t)):n,a=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",r=this._get(t,"currentText"),o=this._get(t,"gotoCurrent")&&t.currentDay?X:L,r=Q?this.formatDate(r,o,this._getFormatConfig(t)):r,h=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(t,o)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+r+"</button>":"")+(Y?"":h)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),m=this._get(t,"monthNamesShort"),g=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),_=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;K[0]>k;k++){for(x="",this.maxRows=4,D=0;K[1]>D;D++){if(T=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),C=" ui-corner-all",S="",q){if(S+="<div class='ui-datepicker-group",K[1]>1)switch(D){case 0:S+=" ui-datepicker-group-first",C=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:S+=" ui-datepicker-group-last",C=" ui-corner-"+(Y?"left":"right");break;default:S+=" ui-datepicker-group-middle",C=""}S+="'>"}for(S+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+C+"'>"+(/all|left/.test(C)&&0===k?Y?a:s:"")+(/all|right/.test(C)&&0===k?Y?s:a:"")+this._generateMonthYearHeader(t,Z,te,G,$,k>0||D>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",M=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)N=(w+c)%7,M+="<th"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[N]+"'>"+p[N]+"</span></th>";for(S+=M+"</tr></thead><tbody>",I=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,I)),P=(this._getFirstDayOfMonth(te,Z)-c+7)%7,A=Math.ceil((P+I)/7),z=q?this.maxRows>A?this.maxRows:A:A,this.maxRows=z,H=this._daylightSavingAdjust(new Date(te,Z,1-P)),E=0;z>E;E++){for(S+="<tr>",F=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(H)+"</td>":"",w=0;7>w;w++)O=g?g.apply(t.input?t.input[0]:null,[H]):[!0,""],W=H.getMonth()!==Z,j=W&&!_||!O[0]||G&&G>H||$&&H>$,F+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(W?" ui-datepicker-other-month":"")+(H.getTime()===T.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===H.getTime()&&b.getTime()===T.getTime()?" "+this._dayOverClass:"")+(j?" "+this._unselectableClass+" ui-state-disabled":"")+(W&&!v?"":" "+O[1]+(H.getTime()===X.getTime()?" "+this._currentClass:"")+(H.getTime()===L.getTime()?" ui-datepicker-today":""))+"'"+(W&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(j?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(W&&!v?"&#xa0;":j?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===L.getTime()?" ui-state-highlight":"")+(H.getTime()===X.getTime()?" ui-state-active":"")+(W?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);S+=F+"</tr>"}Z++,Z>11&&(Z=0,te++),S+="</tbody></table>"+(q?"</div>"+(K[0]>0&&D===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=S}y+=x}return y+=l,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,a,r,o){var h,l,c,u,d,p,f,m,g=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),_=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(a||!g)y+="<span class='ui-datepicker-month'>"+r[e]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!h||c>=s.getMonth())&&(!l||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+o[c]+"</option>");
y+="</select>"}if(_||(b+=y+(!a&&g&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),m=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),_&&(b+=(!a&&g&&v?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.drawYear+("Y"===i?e:0),n=t.drawMonth+("M"===i?e:0),a=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),r=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,a)));t.selectedDay=r.getDate(),t.drawMonth=t.selectedMonth=r.getMonth(),t.drawYear=t.selectedYear=r.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),a=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(t,a)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),a=this._getMinMaxDate(t,"max"),r=null,o=null,h=this._get(t,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),r=parseInt(i[0],10),o=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(r+=s),i[1].match(/[+\-].*/)&&(o+=s)),(!n||e.getTime()>=n.getTime())&&(!a||e.getTime()<=a.getTime())&&(!r||e.getFullYear()>=r)&&(!o||o>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).mousedown(t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.10.2",window["DP_jQuery_"+o]=t})(jQuery);(function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||t(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),undefined;if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(n.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(t.each(i,function(i,s){var n,a;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(e.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(a).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,a){s.position=[a.position.left-i.document.scrollLeft(),a.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(a))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,a){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(a))}}).css("position",a)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var n=this,a=!1,o={};t.each(s,function(t,s){n._setOption(t,s),t in e&&(a=!0),t in i&&(o[t]=s)}),a&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",o)},_setOption:function(t,e){var i,s,n=this.uiDialog;"dialogClass"===t&&n.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=n.is(":data(ui-draggable)"),i&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(s=n.is(":data(ui-resizable)"),s&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(t.ui.dialog.overlayInstances--,t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],n=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(s=i.split?i.split(" "):[i[0],i[1]],1===s.length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(n[t]=s[t],s[t]=e)}),i={my:s[0]+(0>n[0]?n[0]:"+"+n[0])+" "+s[1]+(0>n[1]?n[1]:"+"+n[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})})(jQuery);(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.2",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);


/*
 * ColorPicker
 *
 * Copyright (c) 2011-2012 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * Full-featured colorpicker for jQueryUI with full theming support.
 * Most images from jPicker by Christopher T. Tillman.
 * Sourcecode created from scratch by Martijn W. van der Lee.
 */
(function($){$.colorpicker=new function(){this.regional=[];this.regional[""]={ok:"OK",cancel:"Cancel",none:"None",button:"Color",title:"Pick a color",transparent:"Transparent",hsvH:"H",hsvS:"S",hsvV:"V",rgbR:"R",rgbG:"G",rgbB:"B",labL:"L",labA:"a",labB:"b",hslH:"H",hslS:"S",hslL:"L",cmykC:"C",cmykM:"M",cmykY:"Y",cmykK:"K",alphaA:"A"}};var _colorpicker_index=0,_container_popup='<div class="ui-colorpicker ui-colorpicker-dialog ui-dialog ui-widget ui-widget-content ui-corner-all" style="display: none;"></div>',  _container_inline='<div class="ui-colorpicker ui-colorpicker-inline ui-dialog ui-widget ui-widget-content ui-corner-all"></div>',_parts_lists={"full":["header","map","bar","hex","hsv","rgb","alpha","lab","cmyk","preview","swatches","footer"],"popup":["map","bar","hex","hsv","rgb","alpha","preview","footer"],"draggable":["header","map","bar","hex","hsv","rgb","alpha","preview","footer"],"inline":["map","bar","hex","hsv","rgb","alpha","preview"]},_intToHex=function(dec){var result=Math.round(dec).toString(16);  if(result.length===1)result="0"+result;return result.toLowerCase()},_formats={"#HEX":function(color){return _formatColor("#rxgxbx",color)},"#HEX3":function(color){var hex3=_formats.HEX3(color);return hex3===false?false:"#"+hex3},"HEX":function(color){return _formatColor("rxgxbx",color)},"HEX3":function(color){var rgb=color.getRGB(),r=Math.round(rgb.r*255),g=Math.round(rgb.g*255),b=Math.round(rgb.b*255);if(r>>>4==(r&=15)&&g>>>4==(g&=15)&&b>>>4==(b&=15))return r.toString(16)+g.toString(16)+b.toString(16);  return false},"RGB":function(color){return color.getAlpha()>=1?_formatColor("rgb(rd,gd,bd)",color):false},"RGBA":function(color){return _formatColor("rgba(rd,gd,bd,af)",color)},"RGB%":function(color){return color.getAlpha()>=1?_formatColor("rgb(rp%,gp%,bp%)",color):false},"RGBA%":function(color){return _formatColor("rgba(rp%,gp%,bp%,af)",color)},"HSL":function(color){return color.getAlpha()>=1?_formatColor("hsl(hd,sd,vd)",color):false},"HSLA":function(color){return _formatColor("hsla(hd,sd,vd,af)",  color)},"HSL%":function(color){return color.getAlpha()>=1?_formatColor("hsl(hp%,sp%,vp%)",color):false},"HSLA%":function(color){return _formatColor("hsla(hp%,sp%,vp%,af)",color)},"NAME":function(color){return _closestName(color)},"EXACT":function(color){return _exactName(color)}},_formatColor=function(formats,color){var that=this,text=null,types={"x":function(v){return _intToHex(v*255)},"d":function(v){return Math.round(v*255)},"f":function(v){return v},"p":function(v){return v*100}},channels=color.getChannels();  if(!$.isArray(formats))formats=[formats];$.each(formats,function(index,format){if(_formats[format]){text=_formats[format](color);return text===false}else{text=format.replace(/\\?[argbhsvcmykLAB][xdfp]/g,function(m){if(m.match(/^\\/))return m.slice(1);return types[m.charAt(1)](channels[m.charAt(0)])});return false}});return text},_colors={"black":{r:0,g:0,b:0},"dimgray":{r:0.4117647058823529,g:0.4117647058823529,b:0.4117647058823529},"gray":{r:0.5019607843137255,g:0.5019607843137255,b:0.5019607843137255},  "darkgray":{r:0.6627450980392157,g:0.6627450980392157,b:0.6627450980392157},"silver":{r:0.7529411764705882,g:0.7529411764705882,b:0.7529411764705882},"lightgrey":{r:0.8274509803921568,g:0.8274509803921568,b:0.8274509803921568},"gainsboro":{r:0.8627450980392157,g:0.8627450980392157,b:0.8627450980392157},"whitesmoke":{r:0.9607843137254902,g:0.9607843137254902,b:0.9607843137254902},"white":{r:1,g:1,b:1},"rosybrown":{r:0.7372549019607844,g:0.5607843137254902,b:0.5607843137254902},"indianred":{r:0.803921568627451,  g:0.3607843137254902,b:0.3607843137254902},"brown":{r:0.6470588235294118,g:0.16470588235294117,b:0.16470588235294117},"firebrick":{r:0.6980392156862745,g:0.13333333333333333,b:0.13333333333333333},"lightcoral":{r:0.9411764705882353,g:0.5019607843137255,b:0.5019607843137255},"maroon":{r:0.5019607843137255,g:0,b:0},"darkred":{r:0.5450980392156862,g:0,b:0},"red":{r:1,g:0,b:0},"snow":{r:1,g:0.9803921568627451,b:0.9803921568627451},"salmon":{r:0.9803921568627451,g:0.5019607843137255,b:0.4470588235294118},  "mistyrose":{r:1,g:0.8941176470588236,b:0.8823529411764706},"tomato":{r:1,g:0.38823529411764707,b:0.2784313725490196},"darksalmon":{r:0.9137254901960784,g:0.5882352941176471,b:0.47843137254901963},"orangered":{r:1,g:0.27058823529411763,b:0},"coral":{r:1,g:0.4980392156862745,b:0.3137254901960784},"lightsalmon":{r:1,g:0.6274509803921569,b:0.47843137254901963},"sienna":{r:0.6274509803921569,g:0.3215686274509804,b:0.17647058823529413},"seashell":{r:1,g:0.9607843137254902,b:0.9333333333333333},"chocolate":{r:0.8235294117647058,  g:0.4117647058823529,b:0.11764705882352941},"saddlebrown":{r:0.5450980392156862,g:0.27058823529411763,b:0.07450980392156863},"sandybrown":{r:0.9568627450980393,g:0.6431372549019608,b:0.3764705882352941},"peachpuff":{r:1,g:0.8549019607843137,b:0.7254901960784313},"peru":{r:0.803921568627451,g:0.5215686274509804,b:0.24705882352941178},"linen":{r:0.9803921568627451,g:0.9411764705882353,b:0.9019607843137255},"darkorange":{r:1,g:0.5490196078431373,b:0},"bisque":{r:1,g:0.8941176470588236,b:0.7686274509803922},  "burlywood":{r:0.8705882352941177,g:0.7215686274509804,b:0.5294117647058824},"tan":{r:0.8235294117647058,g:0.7058823529411765,b:0.5490196078431373},"antiquewhite":{r:0.9803921568627451,g:0.9215686274509803,b:0.8431372549019608},"navajowhite":{r:1,g:0.8705882352941177,b:0.6784313725490196},"blanchedalmond":{r:1,g:0.9215686274509803,b:0.803921568627451},"papayawhip":{r:1,g:0.9372549019607843,b:0.8352941176470589},"orange":{r:1,g:0.6470588235294118,b:0},"moccasin":{r:1,g:0.8941176470588236,b:0.7098039215686275},  "wheat":{r:0.9607843137254902,g:0.8705882352941177,b:0.7019607843137254},"oldlace":{r:0.9921568627450981,g:0.9607843137254902,b:0.9019607843137255},"floralwhite":{r:1,g:0.9803921568627451,b:0.9411764705882353},"goldenrod":{r:0.8549019607843137,g:0.6470588235294118,b:0.12549019607843137},"darkgoldenrod":{r:0.7215686274509804,g:0.5254901960784314,b:0.043137254901960784},"cornsilk":{r:1,g:0.9725490196078431,b:0.8627450980392157},"gold":{r:1,g:0.8431372549019608,b:0},"palegoldenrod":{r:0.9333333333333333,  g:0.9098039215686274,b:0.6666666666666666},"khaki":{r:0.9411764705882353,g:0.9019607843137255,b:0.5490196078431373},"lemonchiffon":{r:1,g:0.9803921568627451,b:0.803921568627451},"darkkhaki":{r:0.7411764705882353,g:0.7176470588235294,b:0.4196078431372549},"beige":{r:0.9607843137254902,g:0.9607843137254902,b:0.8627450980392157},"lightgoldenrodyellow":{r:0.9803921568627451,g:0.9803921568627451,b:0.8235294117647058},"olive":{r:0.5019607843137255,g:0.5019607843137255,b:0},"yellow":{r:1,g:1,b:0},"lightyellow":{r:1,  g:1,b:0.8784313725490196},"ivory":{r:1,g:1,b:0.9411764705882353},"olivedrab":{r:0.4196078431372549,g:0.5568627450980392,b:0.13725490196078433},"yellowgreen":{r:0.6039215686274509,g:0.803921568627451,b:0.19607843137254902},"darkolivegreen":{r:0.3333333333333333,g:0.4196078431372549,b:0.1843137254901961},"greenyellow":{r:0.6784313725490196,g:1,b:0.1843137254901961},"lawngreen":{r:0.48627450980392156,g:0.9882352941176471,b:0},"chartreuse":{r:0.4980392156862745,g:1,b:0},"darkseagreen":{r:0.5607843137254902,  g:0.7372549019607844,b:0.5607843137254902},"forestgreen":{r:0.13333333333333333,g:0.5450980392156862,b:0.13333333333333333},"limegreen":{r:0.19607843137254902,g:0.803921568627451,b:0.19607843137254902},"lightgreen":{r:0.5647058823529412,g:0.9333333333333333,b:0.5647058823529412},"palegreen":{r:0.596078431372549,g:0.984313725490196,b:0.596078431372549},"darkgreen":{r:0,g:0.39215686274509803,b:0},"green":{r:0,g:0.5019607843137255,b:0},"lime":{r:0,g:1,b:0},"honeydew":{r:0.9411764705882353,g:1,b:0.9411764705882353},  "mediumseagreen":{r:0.23529411764705882,g:0.7019607843137254,b:0.44313725490196076},"seagreen":{r:0.1803921568627451,g:0.5450980392156862,b:0.3411764705882353},"springgreen":{r:0,g:1,b:0.4980392156862745},"mintcream":{r:0.9607843137254902,g:1,b:0.9803921568627451},"mediumspringgreen":{r:0,g:0.9803921568627451,b:0.6039215686274509},"mediumaquamarine":{r:0.4,g:0.803921568627451,b:0.6666666666666666},"aquamarine":{r:0.4980392156862745,g:1,b:0.8313725490196079},"turquoise":{r:0.25098039215686274,g:0.8784313725490196,  b:0.8156862745098039},"lightseagreen":{r:0.12549019607843137,g:0.6980392156862745,b:0.6666666666666666},"mediumturquoise":{r:0.2823529411764706,g:0.8196078431372549,b:0.8},"darkslategray":{r:0.1843137254901961,g:0.30980392156862746,b:0.30980392156862746},"paleturquoise":{r:0.6862745098039216,g:0.9333333333333333,b:0.9333333333333333},"teal":{r:0,g:0.5019607843137255,b:0.5019607843137255},"darkcyan":{r:0,g:0.5450980392156862,b:0.5450980392156862},"darkturquoise":{r:0,g:0.807843137254902,b:0.8196078431372549},  "aqua":{r:0,g:1,b:1},"cyan":{r:0,g:1,b:1},"lightcyan":{r:0.8784313725490196,g:1,b:1},"azure":{r:0.9411764705882353,g:1,b:1},"cadetblue":{r:0.37254901960784315,g:0.6196078431372549,b:0.6274509803921569},"powderblue":{r:0.6901960784313725,g:0.8784313725490196,b:0.9019607843137255},"lightblue":{r:0.6784313725490196,g:0.8470588235294118,b:0.9019607843137255},"deepskyblue":{r:0,g:0.7490196078431373,b:1},"skyblue":{r:0.5294117647058824,g:0.807843137254902,b:0.9215686274509803},"lightskyblue":{r:0.5294117647058824,  g:0.807843137254902,b:0.9803921568627451},"steelblue":{r:0.27450980392156865,g:0.5098039215686274,b:0.7058823529411765},"aliceblue":{r:0.9411764705882353,g:0.9725490196078431,b:1},"dodgerblue":{r:0.11764705882352941,g:0.5647058823529412,b:1},"slategray":{r:0.4392156862745098,g:0.5019607843137255,b:0.5647058823529412},"lightslategray":{r:0.4666666666666667,g:0.5333333333333333,b:0.6},"lightsteelblue":{r:0.6901960784313725,g:0.7686274509803922,b:0.8705882352941177},"cornflowerblue":{r:0.39215686274509803,  g:0.5843137254901961,b:0.9294117647058824},"royalblue":{r:0.2549019607843137,g:0.4117647058823529,b:0.8823529411764706},"midnightblue":{r:0.09803921568627451,g:0.09803921568627451,b:0.4392156862745098},"lavender":{r:0.9019607843137255,g:0.9019607843137255,b:0.9803921568627451},"navy":{r:0,g:0,b:0.5019607843137255},"darkblue":{r:0,g:0,b:0.5450980392156862},"mediumblue":{r:0,g:0,b:0.803921568627451},"blue":{r:0,g:0,b:1},"ghostwhite":{r:0.9725490196078431,g:0.9725490196078431,b:1},"darkslateblue":{r:0.2823529411764706,  g:0.23921568627450981,b:0.5450980392156862},"slateblue":{r:0.41568627450980394,g:0.35294117647058826,b:0.803921568627451},"mediumslateblue":{r:0.4823529411764706,g:0.40784313725490196,b:0.9333333333333333},"mediumpurple":{r:0.5764705882352941,g:0.4392156862745098,b:0.8588235294117647},"blueviolet":{r:0.5411764705882353,g:0.16862745098039217,b:0.8862745098039215},"indigo":{r:0.29411764705882354,g:0,b:0.5098039215686274},"darkorchid":{r:0.6,g:0.19607843137254902,b:0.8},"darkviolet":{r:0.5803921568627451,  g:0,b:0.8274509803921568},"mediumorchid":{r:0.7294117647058823,g:0.3333333333333333,b:0.8274509803921568},"thistle":{r:0.8470588235294118,g:0.7490196078431373,b:0.8470588235294118},"plum":{r:0.8666666666666667,g:0.6274509803921569,b:0.8666666666666667},"violet":{r:0.9333333333333333,g:0.5098039215686274,b:0.9333333333333333},"purple":{r:0.5019607843137255,g:0,b:0.5019607843137255},"darkmagenta":{r:0.5450980392156862,g:0,b:0.5450980392156862},"magenta":{r:1,g:0,b:1},"fuchsia":{r:1,g:0,b:1},"orchid":{r:0.8549019607843137,  g:0.4392156862745098,b:0.8392156862745098},"mediumvioletred":{r:0.7803921568627451,g:0.08235294117647059,b:0.5215686274509804},"deeppink":{r:1,g:0.0784313725490196,b:0.5764705882352941},"hotpink":{r:1,g:0.4117647058823529,b:0.7058823529411765},"palevioletred":{r:0.8588235294117647,g:0.4392156862745098,b:0.5764705882352941},"lavenderblush":{r:1,g:0.9411764705882353,b:0.9607843137254902},"crimson":{r:0.8627450980392157,g:0.0784313725490196,b:0.23529411764705882},"pink":{r:1,g:0.7529411764705882,b:0.796078431372549},  "lightpink":{r:1,g:0.7137254901960784,b:0.7568627450980392}},_exactName=function(color){var name=false;$.each(_colors,function(n,color_b){if(color.equals(new Color(color_b.r,color_b.g,color_b.b))){name=n;return false}});return name},_closestName=function(color){var rgb=color.getRGB(),distance=null,name=false,d;$.each(_colors,function(n,color_b){d=color.distance(new Color(color_b.r,color_b.g,color_b.b));if(d<distance||distance===null){name=n;if(d==0)return false;distance=d}});return name},_parseHex=  function(color){var c,m;m=/^#?([a-fA-F0-9]{1,6})$/.exec(color);if(m){c=parseInt(m[1],16);return new Color((c>>16&255)/255,(c>>8&255)/255,(c&255)/255)}return false},_parseColor=function(color){var name=$.trim(color).toLowerCase(),m;if(color=="")return new Color;if(_colors[name])return new Color(_colors[name].r,_colors[name].g,_colors[name].b);m=/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color);if(m)return new Color(m[1]/255,m[2]/255,m[3]/255,parseFloat(m[4]));  m=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color);if(m)return(new Color).setHSL(m[1]/255,m[2]/255,m[3]/255).setAlpha(parseFloat(m[4]));m=/^rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color);if(m)return new Color(m[1]/100,m[2]/100,m[3]/100,m[4]/100);m=/^hsla?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color);if(m)return(new Color).setHSL(m[1]/  100,m[2]/100,m[3]/100).setAlpha(m[4]/100);m=/^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color);if(m)return new Color(parseInt(m[1],16)/255,parseInt(m[2],16)/255,parseInt(m[3],16)/255);m=/^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(color);if(m)return new Color(parseInt(m[1]+m[1],16)/255,parseInt(m[2]+m[2],16)/255,parseInt(m[3]+m[3],16)/255);return _parseHex(color)},_layoutTable=function(layout,callback){var bitmap,x,y,width,height,columns,rows,index,cell,html,w,h,colspan,walked;  layout.sort(function(a,b){if(a.pos[1]==b.pos[1])return a.pos[0]-b.pos[0];return a.pos[1]-b.pos[1]});width=0;height=0;$.each(layout,function(index,part){width=Math.max(width,part.pos[0]+part.pos[2]);height=Math.max(height,part.pos[1]+part.pos[3])});bitmap=[];for(x=0;x<width;++x)bitmap.push([]);rows=[];columns=[];$.each(layout,function(index,part){for(x=0;x<part.pos[2];x+=1)columns[part.pos[0]+x]=true;for(y=0;y<part.pos[3];y+=1)rows[part.pos[1]+y]=true});html="";cell=layout[index=0];for(y=0;y<height;++y){html+=  "<tr>";for(x=0;x<width;x)if(typeof cell!=="undefined"&&x==cell.pos[0]&&y==cell.pos[1]){html+=callback(cell,x,y);for(h=0;h<cell.pos[3];h+=1)for(w=0;w<cell.pos[2];w+=1)bitmap[x+w][y+h]=true;x+=cell.pos[2];cell=layout[++index]}else{colspan=0;walked=false;while(x<width&&bitmap[x][y]===undefined&&(cell===undefined||y<cell.pos[1]||y==cell.pos[1]&&x<cell.pos[0])){if(columns[x]===true)colspan+=1;walked=true;x+=1}if(colspan>0)html+='<td colspan="'+colspan+'"></td>';else if(!walked)x+=1}html+="</tr>"}return'<table cellspacing="0" cellpadding="0" border="0"><tbody>'+  html+"</tbody></table>"},_parts={header:function(inst){var that=this,e=null,_html=function(){var title=inst.options.title||inst._getRegional("title"),html='<span class="ui-dialog-title">'+title+"</span>";if(!inst.inline&&inst.options.showCloseButton)html+='<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button">'+'<span class="ui-icon ui-icon-closethick">close</span></a>';return'<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'+html+"</div>"};this.init=  function(){e=$(_html()).prependTo(inst.dialog);var close=$(".ui-dialog-titlebar-close",e);inst._hoverable(close);inst._focusable(close);close.click(function(event){event.preventDefault();inst.close()});if(!inst.inline&&inst.options.draggable)inst.dialog.draggable({handle:e})}},map:function(inst){var that=this,e=null,mousemove_timeout=null,_mousedown,_mouseup,_mousemove,_html;_mousedown=function(event){if(!inst.opened)return;var div=$(".ui-colorpicker-map-layer-pointer",e),offset=div.offset(),width=  div.width(),height=div.height(),x=event.pageX-offset.left,y=event.pageY-offset.top;if(x>=0&&x<width&&y>=0&&y<height){event.stopImmediatePropagation();event.preventDefault();e.unbind("mousedown",_mousedown);$(document).bind("mouseup",_mouseup);$(document).bind("mousemove",_mousemove);_mousemove(event)}};_mouseup=function(event){event.stopImmediatePropagation();event.preventDefault();$(document).unbind("mouseup",_mouseup);$(document).unbind("mousemove",_mousemove);e.bind("mousedown",_mousedown)};_mousemove=  function(event){event.stopImmediatePropagation();event.preventDefault();if(event.pageX===that.x&&event.pageY===that.y)return;that.x=event.pageX;that.y=event.pageY;var div=$(".ui-colorpicker-map-layer-pointer",e),offset=div.offset(),width=div.width(),height=div.height(),x=event.pageX-offset.left,y=event.pageY-offset.top;x=Math.max(0,Math.min(x/width,1));y=Math.max(0,Math.min(y/height,1));switch(inst.mode){case "h":inst.color.setHSV(null,x,1-y);break;case "s":case "a":inst.color.setHSV(x,null,1-y);  break;case "v":inst.color.setHSV(x,1-y,null);break;case "r":inst.color.setRGB(null,1-y,x);break;case "g":inst.color.setRGB(1-y,null,x);break;case "b":inst.color.setRGB(x,1-y,null);break}inst._change()};_html=function(){var html='<div class="ui-colorpicker-map ui-colorpicker-border">'+'<span class="ui-colorpicker-map-layer-1">&nbsp;</span>'+'<span class="ui-colorpicker-map-layer-2">&nbsp;</span>'+(inst.options.alpha?'<span class="ui-colorpicker-map-layer-alpha">&nbsp;</span>':"")+'<span class="ui-colorpicker-map-layer-pointer"><span class="ui-colorpicker-map-pointer"></span></span></div>';  return html};this.update=function(){switch(inst.mode){case "h":$(".ui-colorpicker-map-layer-1",e).css({"background-position":"0 0","opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).hide();break;case "s":case "a":$(".ui-colorpicker-map-layer-1",e).css({"background-position":"0 -260px","opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).css({"background-position":"0 -520px","opacity":""}).show();break;case "v":$(e).css("background-color","black");$(".ui-colorpicker-map-layer-1",e).css({"background-position":"0 -780px",  "opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).hide();break;case "r":$(".ui-colorpicker-map-layer-1",e).css({"background-position":"0 -1040px","opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).css({"background-position":"0 -1300px","opacity":""}).show();break;case "g":$(".ui-colorpicker-map-layer-1",e).css({"background-position":"0 -1560px","opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).css({"background-position":"0 -1820px","opacity":""}).show();break;case "b":$(".ui-colorpicker-map-layer-1",  e).css({"background-position":"0 -2080px","opacity":""}).show();$(".ui-colorpicker-map-layer-2",e).css({"background-position":"0 -2340px","opacity":""}).show();break}that.repaint()};this.repaint=function(){var div=$(".ui-colorpicker-map-layer-pointer",e),x=0,y=0;switch(inst.mode){case "h":x=inst.color.getHSV().s*div.width();y=(1-inst.color.getHSV().v)*div.width();$(e).css("background-color",inst.color.copy().normalize().toCSS());break;case "s":case "a":x=inst.color.getHSV().h*div.width();y=(1-inst.color.getHSV().v)*  div.width();$(".ui-colorpicker-map-layer-2",e).css("opacity",1-inst.color.getHSV().s);break;case "v":x=inst.color.getHSV().h*div.width();y=(1-inst.color.getHSV().s)*div.width();$(".ui-colorpicker-map-layer-1",e).css("opacity",inst.color.getHSV().v);break;case "r":x=inst.color.getRGB().b*div.width();y=(1-inst.color.getRGB().g)*div.width();$(".ui-colorpicker-map-layer-2",e).css("opacity",inst.color.getRGB().r);break;case "g":x=inst.color.getRGB().b*div.width();y=(1-inst.color.getRGB().r)*div.width();  $(".ui-colorpicker-map-layer-2",e).css("opacity",inst.color.getRGB().g);break;case "b":x=inst.color.getRGB().r*div.width();y=(1-inst.color.getRGB().g)*div.width();$(".ui-colorpicker-map-layer-2",e).css("opacity",inst.color.getRGB().b);break}if(inst.options.alpha)$(".ui-colorpicker-map-layer-alpha",e).css("opacity",1-inst.color.getAlpha());$(".ui-colorpicker-map-pointer",e).css({"left":x-7,"top":y-7})};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-map-container",inst.dialog));e.bind("mousedown",  _mousedown)}},bar:function(inst){var that=this,e=null,_mousedown,_mouseup,_mousemove,_html;_mousedown=function(event){if(!inst.opened)return;var div=$(".ui-colorpicker-bar-layer-pointer",e),offset=div.offset(),width=div.width(),height=div.height(),x=event.pageX-offset.left,y=event.pageY-offset.top;if(x>=0&&x<width&&y>=0&&y<height){event.stopImmediatePropagation();event.preventDefault();e.unbind("mousedown",_mousedown);$(document).bind("mouseup",_mouseup);$(document).bind("mousemove",_mousemove);_mousemove(event)}};  _mouseup=function(event){event.stopImmediatePropagation();event.preventDefault();$(document).unbind("mouseup",_mouseup);$(document).unbind("mousemove",_mousemove);e.bind("mousedown",_mousedown)};_mousemove=function(event){event.stopImmediatePropagation();event.preventDefault();if(event.pageY===that.y)return;that.y=event.pageY;var div=$(".ui-colorpicker-bar-layer-pointer",e),offset=div.offset(),height=div.height(),y=event.pageY-offset.top;y=Math.max(0,Math.min(y/height,1));switch(inst.mode){case "h":inst.color.setHSV(1-  y,null,null);break;case "s":inst.color.setHSV(null,1-y,null);break;case "v":inst.color.setHSV(null,null,1-y);break;case "r":inst.color.setRGB(1-y,null,null);break;case "g":inst.color.setRGB(null,1-y,null);break;case "b":inst.color.setRGB(null,null,1-y);break;case "a":inst.color.setAlpha(1-y);break}inst._change()};_html=function(){var html='<div class="ui-colorpicker-bar ui-colorpicker-border">'+'<span class="ui-colorpicker-bar-layer-1">&nbsp;</span>'+'<span class="ui-colorpicker-bar-layer-2">&nbsp;</span>'+  '<span class="ui-colorpicker-bar-layer-3">&nbsp;</span>'+'<span class="ui-colorpicker-bar-layer-4">&nbsp;</span>';if(inst.options.alpha)html+='<span class="ui-colorpicker-bar-layer-alpha">&nbsp;</span>'+'<span class="ui-colorpicker-bar-layer-alphabar">&nbsp;</span>';html+='<span class="ui-colorpicker-bar-layer-pointer"><span class="ui-colorpicker-bar-pointer"></span></span></div>';return html};this.update=function(){switch(inst.mode){case "h":case "s":case "v":case "r":case "g":case "b":$(".ui-colorpicker-bar-layer-alpha",  e).show();$(".ui-colorpicker-bar-layer-alphabar",e).hide();break;case "a":$(".ui-colorpicker-bar-layer-alpha",e).hide();$(".ui-colorpicker-bar-layer-alphabar",e).show();break}switch(inst.mode){case "h":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 0","opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).hide();$(".ui-colorpicker-bar-layer-3",e).hide();$(".ui-colorpicker-bar-layer-4",e).hide();break;case "s":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 -260px",  "opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).css({"background-position":"0 -520px","opacity":""}).show();$(".ui-colorpicker-bar-layer-3",e).hide();$(".ui-colorpicker-bar-layer-4",e).hide();break;case "v":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 -520px","opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).hide();$(".ui-colorpicker-bar-layer-3",e).hide();$(".ui-colorpicker-bar-layer-4",e).hide();break;case "r":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 -1560px",  "opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).css({"background-position":"0 -1300px","opacity":""}).show();$(".ui-colorpicker-bar-layer-3",e).css({"background-position":"0 -780px","opacity":""}).show();$(".ui-colorpicker-bar-layer-4",e).css({"background-position":"0 -1040px","opacity":""}).show();break;case "g":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 -2600px","opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).css({"background-position":"0 -2340px","opacity":""}).show();  $(".ui-colorpicker-bar-layer-3",e).css({"background-position":"0 -1820px","opacity":""}).show();$(".ui-colorpicker-bar-layer-4",e).css({"background-position":"0 -2080px","opacity":""}).show();break;case "b":$(".ui-colorpicker-bar-layer-1",e).css({"background-position":"0 -3640px","opacity":""}).show();$(".ui-colorpicker-bar-layer-2",e).css({"background-position":"0 -3380px","opacity":""}).show();$(".ui-colorpicker-bar-layer-3",e).css({"background-position":"0 -2860px","opacity":""}).show();$(".ui-colorpicker-bar-layer-4",  e).css({"background-position":"0 -3120px","opacity":""}).show();break;case "a":$(".ui-colorpicker-bar-layer-1",e).hide();$(".ui-colorpicker-bar-layer-2",e).hide();$(".ui-colorpicker-bar-layer-3",e).hide();$(".ui-colorpicker-bar-layer-4",e).hide();break}that.repaint()};this.repaint=function(){var div=$(".ui-colorpicker-bar-layer-pointer",e),y=0;switch(inst.mode){case "h":y=(1-inst.color.getHSV().h)*div.height();break;case "s":y=(1-inst.color.getHSV().s)*div.height();$(".ui-colorpicker-bar-layer-2",  e).css("opacity",1-inst.color.getHSV().v);$(e).css("background-color",inst.color.copy().normalize().toCSS());break;case "v":y=(1-inst.color.getHSV().v)*div.height();$(e).css("background-color",inst.color.copy().normalize().toCSS());break;case "r":y=(1-inst.color.getRGB().r)*div.height();$(".ui-colorpicker-bar-layer-2",e).css("opacity",Math.max(0,inst.color.getRGB().b-inst.color.getRGB().g));$(".ui-colorpicker-bar-layer-3",e).css("opacity",Math.max(0,inst.color.getRGB().g-inst.color.getRGB().b));$(".ui-colorpicker-bar-layer-4",  e).css("opacity",Math.min(inst.color.getRGB().b,inst.color.getRGB().g));break;case "g":y=(1-inst.color.getRGB().g)*div.height();$(".ui-colorpicker-bar-layer-2",e).css("opacity",Math.max(0,inst.color.getRGB().b-inst.color.getRGB().r));$(".ui-colorpicker-bar-layer-3",e).css("opacity",Math.max(0,inst.color.getRGB().r-inst.color.getRGB().b));$(".ui-colorpicker-bar-layer-4",e).css("opacity",Math.min(inst.color.getRGB().r,inst.color.getRGB().b));break;case "b":y=(1-inst.color.getRGB().b)*div.height();$(".ui-colorpicker-bar-layer-2",  e).css("opacity",Math.max(0,inst.color.getRGB().r-inst.color.getRGB().g));$(".ui-colorpicker-bar-layer-3",e).css("opacity",Math.max(0,inst.color.getRGB().g-inst.color.getRGB().r));$(".ui-colorpicker-bar-layer-4",e).css("opacity",Math.min(inst.color.getRGB().r,inst.color.getRGB().g));break;case "a":y=(1-inst.color.getAlpha())*div.height();$(e).css("background-color",inst.color.copy().normalize().toCSS());break}if(inst.mode!=="a")$(".ui-colorpicker-bar-layer-alpha",e).css("opacity",1-inst.color.getAlpha());  $(".ui-colorpicker-bar-pointer",e).css("top",y-3)};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-bar-container",inst.dialog));e.bind("mousedown",_mousedown)}},preview:function(inst){var that=this,e=null,_html;_html=function(){return'<div class="ui-colorpicker-preview ui-colorpicker-border">'+'<div class="ui-colorpicker-preview-initial"><div class="ui-colorpicker-preview-initial-alpha"></div></div>'+'<div class="ui-colorpicker-preview-current"><div class="ui-colorpicker-preview-current-alpha"></div></div>'+  "</div>"};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-preview-container",inst.dialog));$(".ui-colorpicker-preview-initial",e).click(function(){inst.color=inst.currentColor.copy();inst._change()})};this.update=function(){if(inst.options.alpha)$(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha",e).show();else $(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha",e).hide();this.repaint()};this.repaint=function(){$(".ui-colorpicker-preview-initial",  e).css("background-color",inst.currentColor.toCSS()).attr("title",inst.currentColor.toHex());$(".ui-colorpicker-preview-initial-alpha",e).css("opacity",1-inst.currentColor.getAlpha());$(".ui-colorpicker-preview-current",e).css("background-color",inst.color.toCSS()).attr("title",inst.color.toHex());$(".ui-colorpicker-preview-current-alpha",e).css("opacity",1-inst.color.getAlpha())}},hsv:function(inst){var that=this,e=null,_html;_html=function(){var html="";if(inst.options.hsv)html+='<div class="ui-colorpicker-hsv-h"><input class="ui-colorpicker-mode" type="radio" value="h"/><label>'+  inst._getRegional("hsvH")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="360" size="10"/><span class="ui-colorpicker-unit">&deg;</span></div>'+'<div class="ui-colorpicker-hsv-s"><input class="ui-colorpicker-mode" type="radio" value="s"/><label>'+inst._getRegional("hsvS")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div>'+'<div class="ui-colorpicker-hsv-v"><input class="ui-colorpicker-mode" type="radio" value="v"/><label>'+  inst._getRegional("hsvV")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div>';return'<div class="ui-colorpicker-hsv">'+html+"</div>"};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-hsv-container",inst.dialog));$(".ui-colorpicker-mode",e).click(function(){inst.mode=$(this).val();inst._updateAllParts()});$(".ui-colorpicker-number",e).bind("change keyup",function(){inst.color.setHSV($(".ui-colorpicker-hsv-h .ui-colorpicker-number",  e).val()/360,$(".ui-colorpicker-hsv-s .ui-colorpicker-number",e).val()/100,$(".ui-colorpicker-hsv-v .ui-colorpicker-number",e).val()/100);inst._change()})};this.repaint=function(){var hsv=inst.color.getHSV();hsv.h*=360;hsv.s*=100;hsv.v*=100;$.each(hsv,function(index,value){var input=$(".ui-colorpicker-hsv-"+index+" .ui-colorpicker-number",e);value=Math.round(value);if(input.val()!==value)input.val(value)})};this.update=function(){$(".ui-colorpicker-mode",e).each(function(){$(this).attr("checked",  $(this).val()===inst.mode)});this.repaint()}},rgb:function(inst){var that=this,e=null,_html;_html=function(){var html="";if(inst.options.rgb)html+='<div class="ui-colorpicker-rgb-r"><input class="ui-colorpicker-mode" type="radio" value="r"/><label>'+inst._getRegional("rgbR")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>'+'<div class="ui-colorpicker-rgb-g"><input class="ui-colorpicker-mode" type="radio" value="g"/><label>'+inst._getRegional("rgbG")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>'+  '<div class="ui-colorpicker-rgb-b"><input class="ui-colorpicker-mode" type="radio" value="b"/><label>'+inst._getRegional("rgbB")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>';return'<div class="ui-colorpicker-rgb">'+html+"</div>"};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-rgb-container",inst.dialog));$(".ui-colorpicker-mode",e).click(function(){inst.mode=$(this).val();inst._updateAllParts()});$(".ui-colorpicker-number",e).bind("change keyup",  function(){inst.color.setRGB($(".ui-colorpicker-rgb-r .ui-colorpicker-number",e).val()/255,$(".ui-colorpicker-rgb-g .ui-colorpicker-number",e).val()/255,$(".ui-colorpicker-rgb-b .ui-colorpicker-number",e).val()/255);inst._change()})};this.repaint=function(){$.each(inst.color.getRGB(),function(index,value){var input=$(".ui-colorpicker-rgb-"+index+" .ui-colorpicker-number",e);value=Math.round(value*255);if(input.val()!==value)input.val(value)})};this.update=function(){$(".ui-colorpicker-mode",e).each(function(){$(this).attr("checked",  $(this).val()===inst.mode)});this.repaint()}},lab:function(inst){var that=this,part=null,html=function(){var html="";if(inst.options.hsv)html+='<div class="ui-colorpicker-lab-l"><label>'+inst._getRegional("labL")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/></div>'+'<div class="ui-colorpicker-lab-a"><label>'+inst._getRegional("labA")+'</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div>'+'<div class="ui-colorpicker-lab-b"><label>'+  inst._getRegional("labB")+'</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div>';return'<div class="ui-colorpicker-lab">'+html+"</div>"};this.init=function(){var data=0;part=$(html()).appendTo($(".ui-colorpicker-lab-container",inst.dialog));$(".ui-colorpicker-number",part).on("change keyup",function(event){inst.color.setLAB(parseInt($(".ui-colorpicker-lab-l .ui-colorpicker-number",part).val(),10)/100,(parseInt($(".ui-colorpicker-lab-a .ui-colorpicker-number",part).val(),  10)+128)/255,(parseInt($(".ui-colorpicker-lab-b .ui-colorpicker-number",part).val(),10)+128)/255);inst._change()})};this.repaint=function(){var lab=inst.color.getLAB();lab.l*=100;lab.a=lab.a*255-128;lab.b=lab.b*255-128;$.each(lab,function(index,value){var input=$(".ui-colorpicker-lab-"+index+" .ui-colorpicker-number",part);value=Math.round(value);if(input.val()!==value)input.val(value)})};this.update=function(){this.repaint()}},cmyk:function(inst){var that=this,part=null,html=function(){var html=  "";if(inst.options.hsv)html+='<div class="ui-colorpicker-cmyk-c"><label>'+inst._getRegional("cmykC")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'+'<div class="ui-colorpicker-cmyk-m"><label>'+inst._getRegional("cmykM")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'+'<div class="ui-colorpicker-cmyk-y"><label>'+inst._getRegional("cmykY")+  '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'+'<div class="ui-colorpicker-cmyk-k"><label>'+inst._getRegional("cmykK")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>';return'<div class="ui-colorpicker-cmyk">'+html+"</div>"};this.init=function(){part=$(html()).appendTo($(".ui-colorpicker-cmyk-container",inst.dialog));$(".ui-colorpicker-number",  part).on("change keyup",function(event){inst.color.setCMYK(parseInt($(".ui-colorpicker-cmyk-c .ui-colorpicker-number",part).val(),10)/100,parseInt($(".ui-colorpicker-cmyk-m .ui-colorpicker-number",part).val(),10)/100,parseInt($(".ui-colorpicker-cmyk-y .ui-colorpicker-number",part).val(),10)/100,parseInt($(".ui-colorpicker-cmyk-k .ui-colorpicker-number",part).val(),10)/100);inst._change()})};this.repaint=function(){$.each(inst.color.getCMYK(),function(index,value){var input=$(".ui-colorpicker-cmyk-"+  index+" .ui-colorpicker-number",part);value=Math.round(value*100);if(input.val()!==value)input.val(value)})};this.update=function(){this.repaint()}},alpha:function(inst){var that=this,e=null,_html;_html=function(){var html="";if(inst.options.alpha)html+='<div class="ui-colorpicker-a"><input class="ui-colorpicker-mode" name="mode" type="radio" value="a"/><label>'+inst._getRegional("alphaA")+'</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>';  return'<div class="ui-colorpicker-alpha">'+html+"</div>"};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-alpha-container",inst.dialog));$(".ui-colorpicker-mode",e).click(function(){inst.mode=$(this).val();inst._updateAllParts()});$(".ui-colorpicker-number",e).bind("change keyup",function(){inst.color.setAlpha($(".ui-colorpicker-a .ui-colorpicker-number",e).val()/100);inst._change()})};this.update=function(){$(".ui-colorpicker-mode",e).each(function(){$(this).attr("checked",$(this).val()===  inst.mode)});this.repaint()};this.repaint=function(){var input=$(".ui-colorpicker-a .ui-colorpicker-number",e),value=Math.round(inst.color.getAlpha()*100);if(!input.is(":focus")&&input.val()!==value)input.val(value)}},hex:function(inst){var that=this,e=null,_html;_html=function(){var html="";if(inst.options.alpha)html+='<input class="ui-colorpicker-hex-alpha" type="text" maxlength="2" size="2"/>';html+='<input class="ui-colorpicker-hex-input" type="text" maxlength="6" size="6"/>';return'<div class="ui-colorpicker-hex"><label>#</label>'+  html+"</div>"};this.init=function(){e=$(_html()).appendTo($(".ui-colorpicker-hex-container",inst.dialog));$(".ui-colorpicker-hex-input",e).bind("change keydown keyup",function(a,b,c){if(/[^a-fA-F0-9]/.test($(this).val()))$(this).val($(this).val().replace(/[^a-fA-F0-9]/,""))});$(".ui-colorpicker-hex-input",e).bind("change keyup",function(){inst.color=_parseHex($(this).val()).setAlpha(inst.color.getAlpha());inst._change()});$(".ui-colorpicker-hex-alpha",e).bind("change keydown keyup",function(){if(/[^a-fA-F0-9]/.test($(this).val()))$(this).val($(this).val().replace(/[^a-fA-F0-9]/,  ""))});$(".ui-colorpicker-hex-alpha",e).bind("change keyup",function(){inst.color.setAlpha(parseInt($(".ui-colorpicker-hex-alpha",e).val(),16)/255);inst._change()})};this.update=function(){this.repaint()};this.repaint=function(){if(!$(".ui-colorpicker-hex-input",e).is(":focus"))$(".ui-colorpicker-hex-input",e).val(inst.color.toHex(true));if(!$(".ui-colorpicker-hex-alpha",e).is(":focus"))$(".ui-colorpicker-hex-alpha",e).val(_intToHex(inst.color.getAlpha()*255))}},swatches:function(inst){var that=this,  part=null,html=function(){var html="";$.each(inst.options.swatches,function(name,color){var c=new Color(color.r,color.g,color.b),css=c.toCSS();html+='<div class="ui-colorpicker-swatch" style="background-color: '+css+'" title="'+name+'"></div>'});return'<div class="ui-colorpicker-swatches ui-colorpicker-border">'+html+"</div>"};this.init=function(){part=$(html()).appendTo($(".ui-colorpicker-swatches-container",inst.dialog));$(".ui-colorpicker-swatch",part).click(function(){inst.color=_parseColor($(this).css("background-color"));  inst._change()})}},footer:function(inst){var that=this,part=null,id_transparent="ui-colorpicker-special-transparent-"+_colorpicker_index,id_none="ui-colorpicker-special-none-"+_colorpicker_index,html=function(){var html="";if(inst.options.alpha||!inst.inline&&inst.options.showNoneButton){html+='<div class="ui-colorpicker-buttonset">';if(inst.options.alpha)html+='<input type="radio" name="ui-colorpicker-special" id="'+id_transparent+'" class="ui-colorpicker-special-transparent"/><label for="'+id_transparent+  '">'+inst._getRegional("transparent")+"</label>";if(!inst.inline&&inst.options.showNoneButton)html+='<input type="radio" name="ui-colorpicker-special" id="'+id_none+'" class="ui-colorpicker-special-none"><label for="'+id_none+'">'+inst._getRegional("none")+"</label>";html+="</div>"}if(!inst.inline){html+='<div class="ui-dialog-buttonset">';if(inst.options.showCancelButton)html+='<button class="ui-colorpicker-cancel">'+inst._getRegional("cancel")+"</button>";html+='<button class="ui-colorpicker-ok">'+  inst._getRegional("ok")+"</button>";html+="</div>"}return'<div class="ui-dialog-buttonpane ui-widget-content">'+html+"</div>"};this.init=function(){part=$(html()).appendTo(inst.dialog);$(".ui-colorpicker-ok",part).button().click(function(){inst.close()});$(".ui-colorpicker-cancel",part).button().click(function(){inst.color=inst.currentColor.copy();inst._change(inst.color.set);inst.close()});$(".ui-colorpicker-buttonset",part).buttonset();$(".ui-colorpicker-special-color",part).click(function(){inst._change()});  $("#"+id_none,part).click(function(){inst._change(false)});$("#"+id_transparent,part).click(function(){inst.color.setAlpha(0);inst._change()})};this.repaint=function(){if(!inst.color.set)$(".ui-colorpicker-special-none",part).attr("checked",true).button("refresh");else if(inst.color.getAlpha()==0)$(".ui-colorpicker-special-transparent",part).attr("checked",true).button("refresh");else $("input",part).attr("checked",false).button("refresh");$(".ui-colorpicker-cancel",part).button(inst.changed?"enable":  "disable")};this.update=function(){}}},Color=function(){var spaces={rgb:{r:0,g:0,b:0},hsv:{h:0,s:0,v:0},hsl:{h:0,s:0,l:0},lab:{l:0,a:0,b:0},cmyk:{c:0,m:0,y:0,k:1}},a=1,args=arguments,_clip=function(v){if(isNaN(v)||v===null)return 0;if(typeof v=="string")v=parseInt(v,10);return Math.max(0,Math.min(v,1))},_hexify=function(number){var digits="0123456789abcdef",lsd=number%16,msd=(number-lsd)/16,hexified=digits.charAt(msd)+digits.charAt(lsd);return hexified},_rgb_to_xyz=function(rgb){var r=rgb.r>0.04045?  Math.pow((rgb.r+0.055)/1.055,2.4):rgb.r/12.92,g=rgb.g>0.04045?Math.pow((rgb.g+0.055)/1.055,2.4):rgb.g/12.92,b=rgb.b>0.04045?Math.pow((rgb.b+0.055)/1.055,2.4):rgb.b/12.92;return{x:r*0.4124+g*0.3576+b*0.1805,y:r*0.2126+g*0.7152+b*0.0722,z:r*0.0193+g*0.1192+b*0.9505}},_xyz_to_rgb=function(xyz){var rgb={r:xyz.x*3.2406+xyz.y*-1.5372+xyz.z*-0.4986,g:xyz.x*-0.9689+xyz.y*1.8758+xyz.z*0.0415,b:xyz.x*0.0557+xyz.y*-0.204+xyz.z*1.057};rgb.r=rgb.r>0.0031308?1.055*Math.pow(rgb.r,1/2.4)-0.055:12.92*rgb.r;rgb.g=  rgb.g>0.0031308?1.055*Math.pow(rgb.g,1/2.4)-0.055:12.92*rgb.g;rgb.b=rgb.b>0.0031308?1.055*Math.pow(rgb.b,1/2.4)-0.055:12.92*rgb.b;return rgb},_rgb_to_hsv=function(rgb){var minVal=Math.min(rgb.r,rgb.g,rgb.b),maxVal=Math.max(rgb.r,rgb.g,rgb.b),delta=maxVal-minVal,del_R,del_G,del_B,hsv={h:0,s:0,v:maxVal};if(delta===0){hsv.h=0;hsv.s=0}else{hsv.s=delta/maxVal;del_R=((maxVal-rgb.r)/6+delta/2)/delta;del_G=((maxVal-rgb.g)/6+delta/2)/delta;del_B=((maxVal-rgb.b)/6+delta/2)/delta;if(rgb.r===maxVal)hsv.h=del_B-  del_G;else if(rgb.g===maxVal)hsv.h=1/3+del_R-del_B;else if(rgb.b===maxVal)hsv.h=2/3+del_G-del_R;if(hsv.h<0)hsv.h+=1;else if(hsv.h>1)hsv.h-=1}return hsv},_hsv_to_rgb=function(hsv){var rgb={r:0,g:0,b:0},var_h,var_i,var_1,var_2,var_3;if(hsv.s===0)rgb.r=rgb.g=rgb.b=hsv.v;else{var_h=hsv.h===1?0:hsv.h*6;var_i=Math.floor(var_h);var_1=hsv.v*(1-hsv.s);var_2=hsv.v*(1-hsv.s*(var_h-var_i));var_3=hsv.v*(1-hsv.s*(1-(var_h-var_i)));if(var_i===0){rgb.r=hsv.v;rgb.g=var_3;rgb.b=var_1}else if(var_i===1){rgb.r=var_2;  rgb.g=hsv.v;rgb.b=var_1}else if(var_i===2){rgb.r=var_1;rgb.g=hsv.v;rgb.b=var_3}else if(var_i===3){rgb.r=var_1;rgb.g=var_2;rgb.b=hsv.v}else if(var_i===4){rgb.r=var_3;rgb.g=var_1;rgb.b=hsv.v}else{rgb.r=hsv.v;rgb.g=var_1;rgb.b=var_2}}return rgb},_rgb_to_hsl=function(rgb){var minVal=Math.min(rgb.r,rgb.g,rgb.b),maxVal=Math.max(rgb.r,rgb.g,rgb.b),delta=maxVal-minVal,del_R,del_G,del_B,hsl={h:0,s:0,l:(maxVal+minVal)/2};if(delta===0){hsl.h=0;hsl.s=0}else{hsl.s=hsl.l<0.5?delta/(maxVal+minVal):delta/(2-maxVal-  minVal);del_R=((maxVal-rgb.r)/6+delta/2)/delta;del_G=((maxVal-rgb.g)/6+delta/2)/delta;del_B=((maxVal-rgb.b)/6+delta/2)/delta;if(rgb.r===maxVal)hsl.h=del_B-del_G;else if(rgb.g===maxVal)hsl.h=1/3+del_R-del_B;else if(rgb.b===maxVal)hsl.h=2/3+del_G-del_R;if(hsl.h<0)hsl.h+=1;else if(hsl.h>1)hsl.h-=1}return hsl},_hsl_to_rgb=function(hsl){var var_1,var_2,hue_to_rgb=function(v1,v2,vH){if(vH<0)vH+=1;if(vH>1)vH-=1;if(6*vH<1)return v1+(v2-v1)*6*vH;if(2*vH<1)return v2;if(3*vH<2)return v1+(v2-v1)*(2/3-vH)*6;return v1};  if(hsl.s===0)return{r:hsl.l,g:hsl.l,b:hsl.l};var_2=hsl.l<0.5?hsl.l*(1+hsl.s):hsl.l+hsl.s-hsl.s*hsl.l;var_1=2*hsl.l-var_2;return{r:hue_to_rgb(var_1,var_2,hsl.h+1/3),g:hue_to_rgb(var_1,var_2,hsl.h),b:hue_to_rgb(var_1,var_2,hsl.h-1/3)}},_xyz_to_lab=function(xyz){var x=xyz.x/0.95047,y=xyz.y,z=xyz.z/1.08883;x=x>0.008856?Math.pow(x,1/3):7.787*x+16/116;y=y>0.008856?Math.pow(y,1/3):7.787*y+16/116;z=z>0.008856?Math.pow(z,1/3):7.787*z+16/116;return{l:(116*y-16)/100,a:(500*(x-y)+128)/255,b:(200*(y-z)+128)/255}},  _lab_to_xyz=function(lab){var lab2={l:lab.l*100,a:lab.a*255-128,b:lab.b*255-128},xyz={x:0,y:(lab2.l+16)/116,z:0};xyz.x=lab2.a/500+xyz.y;xyz.z=xyz.y-lab2.b/200;xyz.x=Math.pow(xyz.x,3)>0.008856?Math.pow(xyz.x,3):(xyz.x-16/116)/7.787;xyz.y=Math.pow(xyz.y,3)>0.008856?Math.pow(xyz.y,3):(xyz.y-16/116)/7.787;xyz.z=Math.pow(xyz.z,3)>0.008856?Math.pow(xyz.z,3):(xyz.z-16/116)/7.787;xyz.x*=0.95047;xyz.y*=1;xyz.z*=1.08883;return xyz},_rgb_to_cmy=function(rgb){return{c:1-rgb.r,m:1-rgb.g,y:1-rgb.b}},_cmy_to_rgb=  function(cmy){return{r:1-cmy.c,g:1-cmy.m,b:1-cmy.y}},_cmy_to_cmyk=function(cmy){var K=1;if(cmy.c<K)K=cmy.c;if(cmy.m<K)K=cmy.m;if(cmy.y<K)K=cmy.y;if(K==1)return{c:0,m:0,y:0,k:1};return{c:(cmy.c-K)/(1-K),m:(cmy.m-K)/(1-K),y:(cmy.y-K)/(1-K),k:K}},_cmyk_to_cmy=function(cmyk){return{c:cmyk.c*(1-cmyk.k)+cmyk.k,m:cmyk.m*(1-cmyk.k)+cmyk.k,y:cmyk.y*(1-cmyk.k)+cmyk.k}};this.set=true;this.setAlpha=function(_a){if(_a!==null)a=_clip(_a);return this};this.getAlpha=function(){return a};this.setRGB=function(r,g,  b){spaces={rgb:this.getRGB()};if(r!==null)spaces.rgb.r=_clip(r);if(g!==null)spaces.rgb.g=_clip(g);if(b!==null)spaces.rgb.b=_clip(b);return this};this.setHSV=function(h,s,v){spaces={hsv:this.getHSV()};if(h!==null)spaces.hsv.h=_clip(h);if(s!==null)spaces.hsv.s=_clip(s);if(v!==null)spaces.hsv.v=_clip(v);return this};this.setHSL=function(h,s,l){spaces={hsl:this.getHSL()};if(h!==null)spaces.hsl.h=_clip(h);if(s!==null)spaces.hsl.s=_clip(s);if(l!==null)spaces.hsl.l=_clip(l);return this};this.setLAB=function(l,  a,b){spaces={lab:this.getLAB()};if(l!==null)spaces.lab.l=_clip(l);if(a!==null)spaces.lab.a=_clip(a);if(b!==null)spaces.lab.b=_clip(b);return this};this.setCMYK=function(c,m,y,k){spaces={cmyk:this.getCMYK()};if(c!==null)spaces.cmyk.c=_clip(c);if(m!==null)spaces.cmyk.m=_clip(m);if(y!==null)spaces.cmyk.y=_clip(y);if(k!==null)spaces.cmyk.k=_clip(k);return this};this.getRGB=function(){if(!spaces.rgb){spaces.rgb=spaces.lab?_xyz_to_rgb(_lab_to_xyz(spaces.lab)):spaces.hsv?_hsv_to_rgb(spaces.hsv):spaces.hsl?  _hsl_to_rgb(spaces.hsl):spaces.cmyk?_cmy_to_rgb(_cmyk_to_cmy(spaces.cmyk)):{r:0,g:0,b:0};spaces.rgb.r=_clip(spaces.rgb.r);spaces.rgb.g=_clip(spaces.rgb.g);spaces.rgb.b=_clip(spaces.rgb.b)}return $.extend({},spaces.rgb)};this.getHSV=function(){if(!spaces.hsv){spaces.hsv=spaces.lab?_rgb_to_hsv(this.getRGB()):spaces.rgb?_rgb_to_hsv(spaces.rgb):spaces.hsl?_rgb_to_hsv(this.getRGB()):spaces.cmyk?_rgb_to_hsv(this.getRGB()):{h:0,s:0,v:0};spaces.hsv.h=_clip(spaces.hsv.h);spaces.hsv.s=_clip(spaces.hsv.s);spaces.hsv.v=  _clip(spaces.hsv.v)}return $.extend({},spaces.hsv)};this.getHSL=function(){if(!spaces.hsl){spaces.hsl=spaces.rgb?_rgb_to_hsl(spaces.rgb):spaces.hsv?_rgb_to_hsl(this.getRGB()):spaces.cmyk?_rgb_to_hsl(this.getRGB()):spaces.hsv?_rgb_to_hsl(this.getRGB()):{h:0,s:0,l:0};spaces.hsl.h=_clip(spaces.hsl.h);spaces.hsl.s=_clip(spaces.hsl.s);spaces.hsl.l=_clip(spaces.hsl.l)}return $.extend({},spaces.hsl)};this.getCMYK=function(){if(!spaces.cmyk){spaces.cmyk=spaces.rgb?_cmy_to_cmyk(_rgb_to_cmy(spaces.rgb)):spaces.hsv?  _cmy_to_cmyk(_rgb_to_cmy(this.getRGB())):spaces.hsl?_cmy_to_cmyk(_rgb_to_cmy(this.getRGB())):spaces.lab?_cmy_to_cmyk(_rgb_to_cmy(this.getRGB())):{c:0,m:0,y:0,k:1};spaces.cmyk.c=_clip(spaces.cmyk.c);spaces.cmyk.m=_clip(spaces.cmyk.m);spaces.cmyk.y=_clip(spaces.cmyk.y);spaces.cmyk.k=_clip(spaces.cmyk.k)}return $.extend({},spaces.cmyk)};this.getLAB=function(){if(!spaces.lab){spaces.lab=spaces.rgb?_xyz_to_lab(_rgb_to_xyz(spaces.rgb)):spaces.hsv?_xyz_to_lab(_rgb_to_xyz(this.getRGB())):spaces.hsl?_xyz_to_lab(_rgb_to_xyz(this.getRGB())):  spaces.cmyk?_xyz_to_lab(_rgb_to_xyz(this.getRGB())):{l:0,a:0,b:0};spaces.lab.l=_clip(spaces.lab.l);spaces.lab.a=_clip(spaces.lab.a);spaces.lab.b=_clip(spaces.lab.b)}return $.extend({},spaces.lab)};this.getChannels=function(){return{r:this.getRGB().r,g:this.getRGB().g,b:this.getRGB().b,a:this.getAlpha(),h:this.getHSV().h,s:this.getHSV().s,v:this.getHSV().v,c:this.getCMYK().c,m:this.getCMYK().m,y:this.getCMYK().y,k:this.getCMYK().k,L:this.getLAB().l,A:this.getLAB().a,B:this.getLAB().b}};this.getSpaces=  function(){return $.extend(true,{},spaces)};this.setSpaces=function(new_spaces){spaces=new_spaces;return this};this.distance=function(color){var space="lab",getter="get"+space.toUpperCase(),a=this[getter](),b=color[getter](),distance=0,channel;for(channel in a)distance+=Math.pow(a[channel]-b[channel],2);return distance};this.equals=function(color){var a=this.getRGB(),b=color.getRGB();return this.getAlpha()==color.getAlpha()&&a.r==b.r&&a.g==b.g&&a.b==b.b};this.limit=function(steps){steps-=1;var rgb=  this.getRGB();this.setRGB(Math.round(rgb.r*steps)/steps,Math.round(rgb.g*steps)/steps,Math.round(rgb.b*steps)/steps)};this.toHex=function(){var rgb=this.getRGB();return _hexify(rgb.r*255)+_hexify(rgb.g*255)+_hexify(rgb.b*255)};this.toCSS=function(){return"#"+this.toHex()};this.normalize=function(){this.setHSV(null,1,1);return this};this.copy=function(){var spaces=this.getSpaces(),a=this.getAlpha();return new Color(spaces,a)};if(args.length==2){this.setSpaces(args[0]);this.setAlpha(args[1]===0?0:args[1]||  1)}if(args.length>2){this.setRGB(args[0],args[1],args[2]);this.setAlpha(args[3]===0?0:args[3]||1)}};$.widget("vanderlee.colorpicker",{options:{alpha:false,altAlpha:true,altField:"",altOnChange:true,altProperties:"background-color",autoOpen:false,buttonColorize:false,buttonImage:"images/ui-colorpicker.png",buttonImageOnly:false,buttonText:null,closeOnEscape:true,closeOnOutside:true,color:"#00FF00",colorFormat:"HEX",draggable:true,duration:"fast",hsv:true,regional:"",layout:{map:[0,0,1,5],bar:[1,0,  1,5],preview:[2,0,1,1],hsv:[2,1,1,1],rgb:[2,2,1,1],alpha:[2,3,1,1],hex:[2,4,1,1],lab:[3,1,1,1],cmyk:[3,2,1,2],swatches:[4,0,1,5]},limit:"",modal:false,mode:"h",parts:"",rgb:true,showAnim:"fadeIn",showCancelButton:true,showNoneButton:false,showCloseButton:true,showOn:"focus",showOptions:{},swatches:null,title:null,close:null,init:null,select:null,open:null},_create:function(){var that=this,text;++_colorpicker_index;that.widgetEventPrefix="color";that.opened=false;that.generated=false;that.inline=false;  that.changed=false;that.dialog=null;that.button=null;that.image=null;that.overlay=null;that.mode=that.options.mode;if(that.options.swatches===null)that.options.swatches=_colors;if(this.element[0].nodeName.toLowerCase()==="input"||!this.inline){that._setColor(that.element.val());this._callback("init");$("body").append(_container_popup);that.dialog=$(".ui-colorpicker:last");$(document).mousedown(function(event){if(!that.opened||event.target===that.element[0]||that.overlay)return;if(that.dialog.is(event.target)||  that.dialog.has(event.target).length>0){that.element.blur();return}var p,parents=$(event.target).parents();for(p=0;p<=parents.length;++p)if(that.button!==null&&parents[p]===that.button[0])return;if(!that.options.closeOnOutside)return;that.close()});$(document).keydown(function(event){if(event.keyCode==27&&that.opened&&that.options.closeOnEscape)that.close()});if(that.options.showOn==="focus"||that.options.showOn==="both")that.element.focus(function(){that.open()});if(that.options.showOn==="button"||  that.options.showOn==="both"){if(that.options.buttonImage!==""){text=that.options.buttonText||that._getRegional("button");that.image=$("<img/>").attr({"src":that.options.buttonImage,"alt":text,"title":text});that._setImageBackground()}if(that.options.buttonImageOnly&&that.image)that.button=that.image;else{that.button=$('<button type="button"></button>').html(that.image||that.options.buttonText).button();that.image=that.image?$("img",that.button).first():null}that.button.insertAfter(that.element).click(function(){that[that.opened?  "close":"open"]()})}if(that.options.autoOpen)that.open();that.element.keydown(function(event){if(event.keyCode===9)that.close()}).keyup(function(event){var color=_parseColor(that.element.val());if(!that.color.equals(color)){that.color=color;that._change()}})}else{that.inline=true;$(this.element).html(_container_inline);that.dialog=$(".ui-colorpicker",this.element);that._generate();that.opened=true}return this},_setOption:function(key,value){var that=this;switch(key){case "disabled":if(value)that.dialog.addClass("ui-colorpicker-disabled");  else that.dialog.removeClass("ui-colorpicker-disabled");break}$.Widget.prototype._setOption.apply(that,arguments)},_setImageBackground:function(){if(this.image&&this.options.buttonColorize)this.image.css("background-color",this.color.set?_formatColor("RGBA",this.color):"")},_setAltField:function(){if(this.options.altOnChange&&this.options.altField&&this.options.altProperties){var index,property,properties=this.options.altProperties.split(",");for(index=0;index<=properties.length;++index){property=  $.trim(properties[index]);switch(property){case "color":case "background-color":case "outline-color":case "border-color":$(this.options.altField).css(property,this.color.set?this.color.toCSS():"");break}}if(this.options.altAlpha)$(this.options.altField).css("opacity",this.color.set?this.color.getAlpha():"")}},_setColor:function(text){this.color=_parseColor(text);this.currentColor=this.color.copy();this._setImageBackground();this._setAltField()},setColor:function(text){this._setColor(text);this._change(this.color.set)},  _generate:function(){var that=this,index,part,parts_list,layout_parts;that._setColor(that.inline?that.options.color:that.element.val());if(typeof that.options.parts==="string")if(_parts_lists[that.options.parts])parts_list=_parts_lists[that.options.parts];else parts_list=_parts_lists[that.inline?"inline":"popup"];else parts_list=that.options.parts;that.parts={};$.each(parts_list,function(index,part){if(_parts[part])that.parts[part]=new _parts[part](that)});if(!that.generated){layout_parts=[];$.each(that.options.layout,  function(part,pos){if(that.parts[part])layout_parts.push({"part":part,"pos":pos})});$(_layoutTable(layout_parts,function(cell,x,y){var classes=["ui-colorpicker-"+cell.part+"-container"];if(x>0)classes.push("ui-colorpicker-padding-left");if(y>0)classes.push("ui-colorpicker-padding-top");return'<td  class="'+classes.join(" ")+'"'+(cell.pos[2]>1?' colspan="'+cell.pos[2]+'"':"")+(cell.pos[3]>1?' rowspan="'+cell.pos[3]+'"':"")+' valign="top"></td>'})).appendTo(that.dialog).addClass("ui-dialog-content ui-widget-content");  that._initAllParts();that._updateAllParts();that.generated=true}},_effectGeneric:function(element,show,slide,fade,callback){var that=this;if($.effects&&$.effects[that.options.showAnim])element[show](that.options.showAnim,that.options.showOptions,that.options.duration,callback);else{element[that.options.showAnim==="slideDown"?slide:that.options.showAnim==="fadeIn"?fade:show](that.options.showAnim?that.options.duration:null,callback);if(!that.options.showAnim||!that.options.duration)callback()}},_effectShow:function(element,  callback){this._effectGeneric(element,"show","slideDown","fadeIn",callback)},_effectHide:function(element,callback){this._effectGeneric(element,"hide","slideUp","fadeOut",callback)},open:function(){var that=this,offset,bottom,right,height,width,x,y,zIndex;if(!that.opened){that._generate();offset=that.element.offset();bottom=$(window).height()+$(window).scrollTop();right=$(window).width()+$(window).scrollLeft();height=that.dialog.outerHeight();width=that.dialog.outerWidth();x=offset.left;y=offset.top+  that.element.outerHeight();if(x+width>right)x=Math.max(0,right-width);if(y+height>bottom)if(offset.top-height>=$(window).scrollTop())y=offset.top-height;else y=Math.max(0,bottom-height);that.dialog.css({"left":x,"top":y});zIndex=0;$(that.element[0]).parents().each(function(){var z=$(this).css("z-index");if((typeof z==="number"||typeof z==="string")&&z!==""&&!isNaN(z)){zIndex=z;return false}});that.dialog.css("z-index",zIndex+=2);that.overlay=that.options.modal?new $.ui.dialog.overlay(that):null;that._effectShow(this.dialog);  that.opened=true;that._callback("open",true);$(function(){that._repaintAllParts()})}},close:function(){var that=this;that.currentColor=that.color.copy();that.changed=false;that._effectHide(that.dialog,function(){that.dialog.empty();that.generated=false;that.opened=false;that._callback("close",true)});if(that.overlay)that.overlay.destroy()},destroy:function(){this.element.unbind();if(this.image!==null)this.image.remove();if(this.button!==null)this.button.remove();if(this.dialog!==null)this.dialog.remove();  if(this.overlay)this.overlay.destroy()},_callback:function(callback,spaces){var that=this,data,lab;if(that.color.set){data={formatted:_formatColor(that.options.colorFormat,that.color)};lab=that.color.getLAB();lab.a=lab.a*2-1;lab.b=lab.b*2-1;if(spaces===true){data.a=that.color.getAlpha();data.rgb=that.color.getRGB();data.hsv=that.color.getHSV();data.cmyk=that.color.getCMYK();data.hsl=that.color.getHSL();data.lab=lab}return that._trigger(callback,null,data)}else return that._trigger(callback,null,{formatted:""})},  _initAllParts:function(){$.each(this.parts,function(index,part){if(part.init)part.init()})},_updateAllParts:function(){$.each(this.parts,function(index,part){if(part.update)part.update()})},_repaintAllParts:function(){$.each(this.parts,function(index,part){if(part.repaint)part.repaint()})},_change:function(set){this.color.set=set!==false;this.changed=true;switch(this.options.limit){case "websafe":this.color.limit(6);break;case "nibble":this.color.limit(16);break;case "binary":this.color.limit(2);  break;case "name":var name=_closestName(this.color);this.color.setRGB(_colors[name].r,_colors[name].g,_colors[name].b);break}if(!this.inline){if(!this.color.set)this.element.val("");else if(!this.color.equals(_parseColor(this.element.val())))this.element.val(_formatColor(this.options.colorFormat,this.color));this._setImageBackground();this._setAltField()}if(this.opened)this._repaintAllParts();this._callback("select")},_hoverable:function(e){e.hover(function(){e.addClass("ui-state-hover")},function(){e.removeClass("ui-state-hover")})},  _focusable:function(e){e.focus(function(){e.addClass("ui-state-focus")}).blur(function(){e.removeClass("ui-state-focus")})},_getRegional:function(name){return $.colorpicker.regional[this.options.regional][name]!==undefined?$.colorpicker.regional[this.options.regional][name]:$.colorpicker.regional[""][name]}})})(jQuery);


// -- Start Script --

function storyParser()
{
    var _DEBUG = false;
    var _IGNORE_NEW_VERSION = true;
    
    var _VERSION = '4.3.2';
    
    var _LOAD_INTERNAL = false;
    
    
    // Default-Config:
    var _config = {
        story_search_depth: 2,                  // The Max depth for a recursive search
        mark_M_storys: true,                    // Mark every Story Rated as M
        hide_non_english_storys: true,          // Hide all Storys, that are not in english
        color_normal: '#FFFFFF',
        color_mouse_over: '#EEF0F4',
        color_odd_color: '#dfdfdf',
        hide_images: false,
        hide_lazy_images: false,
        disable_image_hover: false,
        content_width: "90%",
        pocket_user: null,
        pocket_password: null,
        api_url: 'http://www.mrh-development.de/FanFictionUserScript',
        api_lookupKey: 'ffnet-api-interface',
        api_timeout: 3000,
        api_retries: 2,
        api_checkForUpdates: true,
        
        // Do not change below this line:
        storage_key: 'ffnet-storycache',
        config_key: 'ffnet-config',
        dataStorage_key: 'ffnet-dataStore',

        highlighter: {},   
        marker: {}
    }

    // ----- Styles ------
    
    var _styleApply = "                                 \
                                                        \
        abbr[title],                                    \
        abbr[data-original-title] {                     \
          cursor: help;                                 \
          border-bottom: 1px dotted #999999;            \
        }                                               \
                                                        \
        .ffnetparser_InputField                         \
        {                                               \
            padding-left: 10px;                         \
        }                                               \
                                                        \
        #mrhOutput > div > ul                           \
        {                                               \
            margin-top: 5px;                            \
            margin-bottom: 10px;                        \
        }                                               \
    ";
    
    
    // ..................

    var _element = null;
    var _hidden = 0;

    var _eList = {};

    var _found = [];
    var _storyCache = {};
    
    // Config that is only available in this session
    var _dataConfig = {}; 
    
    var _gui_container = null;

    var _defaultConfig = function()
    {
        _config =
        {
            story_search_depth: 1,                  // The Max depth for a recursive search
            mark_M_storys: false,                    // Mark every Story Rated as M
            hide_non_english_storys: true,          // Hide all Storys, that are not in english
            color_normal: '#FFFFFF',
            color_mouse_over: '#EEF0F4',
            color_odd_color: '#dfdfdf',
            hide_images: false,
            disable_image_hover: false,
            hide_lazy_images: false,
            content_width: "90%",
            pocket_user: null,
            pocket_password: null,
            storage_key: 'ffnet-storycache',
            dataStorage_key: 'ffnet-dataStore',
            config_key: 'ffnet-config',
            api_url: 'http://www.mrh-development.de/FanFictionUserScript',
            api_lookupKey: 'ffnet-api-interface',
            api_checkForUpdates: true,
            api_timeout: 3000,
            api_retries: 2,
            api_autoIncludeNewVersion: false,
            
            highlighter:
            {
            },
            
            marker:
            {

            }
        }
    }


    var _init = function()
    {
        var isNested = _IGNORE_NEW_VERSION;
        
        if (typeof(sessionStorage["ffnet-mutex"]) != "undefined")
        {
            if (_DEBUG)
            {
                console.log("Found Mutex!");
            }
            
            isNested = true;
        }
    
        if (!isNested)
        {
            // Check for new Version
            var data = _loadFromMemory(localStorage, "ffnet-Script");
            if (typeof(data.script) != "undefined")
            {
                if (_DEBUG)
                {
                    console.info("Found External Script! Loading ....");
                }
                
                sessionStorage["ffnet-mutex"] = true;
                
                window.setTimeout(function()
                {
                    delete sessionStorage["ffnet-mutex"];
                    
                    if (_DEBUG)
                    {
                        console.log("Delete Mutex Var");
                    }
                    
                }, 1000);
                
                try
                {
                    eval(data.script);
                } 
                catch(e)
                {
                    console.error("Invalid Local Script! Deleting");
                    delete localStorage["ffnet-Script"];
                }
                
                _LOAD_INTERNAL = true;
                
                // Abort
                return;
            }
        }
    
        try
        {
            // Checks if sessionStorage entry is valid:
            _storyCache = _loadFromMemory(sessionStorage, _config.storage_key);
            _dataConfig = _loadFromMemory(sessionStorage, _config.dataStorage_key);
            
        } catch (ex)
        {
            console.warn(ex);
        }
        
        try
        {
            _config = _loadFromMemory(localStorage, _config.config_key);

        } catch (ex)
        {
            console.warn(ex);
        }
        
        
        // Check for Config Values:
    
        if (typeof(_config['story_search_depth']) == "undefined")
        {
            _config['story_search_depth'] = 1;
        }
        
        if (typeof(_config['mark_M_storys']) == "undefined")
        {
            _config['mark_M_storys'] = false;
        }
        
        if (typeof(_config['hide_non_english_storys']) == "undefined")
        {
            _config['hide_non_english_storys'] = false;
        }
        
        if (typeof(_config['color_normal']) == "undefined")
        {
            _config['color_normal'] = '#FFFFFF';
        }
        
        if (typeof(_config['color_mouse_over']) == "undefined")
        {
            _config['color_mouse_over'] = '#EEF0F4';
        }
        
        if (typeof(_config['color_odd_color']) == "undefined")
        {
            _config['color_odd_color'] = '#dfdfdf';
        }

        if (typeof(_config['hide_images']) == "undefined")
        {
            _config['hide_images'] = false;
        }
        
        if (typeof(_config['content_width']) == "undefined")
        {
            _config['content_width'] = "90%";
        }
                
        if ((typeof(_config['pocket_user']) == "undefined") || (_config['pocket_user'] === ""))
        {
            _config['pocket_user'] = null;
        }
        
        if ((typeof(_config['pocket_password']) == "undefined") || (_config['pocket_password'] === ""))
        {
            _config['pocket_password'] = null;
        }

        if (typeof(_config['highlighter']) == "undefined")
        {
            _config['highlighter'] = {};
        }
            
        if (typeof(_config['api_url']) == "undefined")
        {
            _config['api_url'] = 'http://www.mrh-development.de/FanFictionUserScript';
        }
        
        if (typeof(_config['api_lookupKey']) == "undefined")
        {
            _config['api_lookupKey'] = 'ffnet-api-interface';
        }
        
        if (typeof(_config['api_timeout']) == "undefined")
        {
            _config['api_timeout'] = 3000;
        }
        
        if (typeof(_config['api_retries']) == "undefined")
        {
            _config['api_retries'] = 2;
        }            
        
        if (typeof(_config['api_checkForUpdates']) == "undefined")
        {
            _config['api_checkForUpdates'] = false;
        }            
        
        if (typeof(_config['dataStorage_key']) == "undefined")
        {
            _config['dataStorage_key'] = 'ffnet-dataStore';
        }
        
        if (typeof(_config['disable_image_hover']) == "undefined")
        {
            _config['disable_image_hover'] = false;
        }
        
        if (typeof(_config['hide_lazy_images']) == "undefined")
        {
            _config['hide_lazy_images'] = false;
        }
        
        if (typeof(_config['token']) == "undefined")
        {
            // Generates Random Token
            _config['token'] = Math.random().toString().split(".")[1];
            _save_config();
        }
        
        if (typeof(_config['api_autoIncludeNewVersion']) == "undefined")
        {
            // Updates Timeout Settings
            _config['api_timeout'] = 3000;
        
            // Creates Warning for new Feature:

            var text = "<b>Please Read!</b><br />";
            text += "In this Version, a new Feature has been implemented. With this Feature activated, you don't have to manually install new Versions. ";
            text += "Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ";
            text += "can be wrong. To Display the Version Number, check your Config Editor.";
            text += "<br /><br /><b>Newer Versions will be saved in your Local Memory. Attackers could modify this data! This is unrealistic, but possible</b><br /><br />";
            text += "Do you want to activate this Feature?";
            
            var dialog = $('<div title="Fanfiction Story Parser"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'+text+'</p></div>')
            .appendTo($("body"));
            
            window.setTimeout(function()
            {
                dialog.dialog({
                    resizable: true,
                    height:140,
                    modal: true,
                    buttons: 
                    {
                        "Enable Feature": function() 
                        {
                            $( this ).dialog( "close" );
                            
                            _config['api_autoIncludeNewVersion'] = true;
                            _save_config();
                            
                        },
                        Cancel: function() 
                        {
                            $( this ).dialog( "close" );
                            
                            _config['api_autoIncludeNewVersion'] = false;
                            _save_config();
                        }
                    }
                });
            }, 1000);
        }
        
        
        if (_DEBUG)
        {
            console.info("Loading User Script...");
        }
        
        _api_checkVersion();
        
        if (_DEBUG)
        {
            console.log("Update Check done.");
            console.log("Pre GUI Update");
        }
        
        // Add jQueryUI to the Page:        
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/ui-lightness/jquery-ui.css");
        $("head").append(block);

        if (typeof($.ui) == "undefined")
        {
            console.error("Can't include jQuery UI!");
        }
        
        
        // Add jQuery Color Picker to the Page:     
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://private.mrh-development.de/ff/jquery.colorpicker.css");
        $("head").append(block);
        
        // Check for DEBUG-Mode
        if (typeof(_config['debug']) != "undefined")
        {
            _DEBUG = true;
        }
        
        
        if (_DEBUG)
        {
            console.log("Pre GUI Update done.");
            console.log("Starts GUI Update");
        }
        
        _updateGUI();
        
        if (_DEBUG)
        {
            console.log("GUI Update done.");
        }
        
        
    }

    var _updateGUI = function()
    {
        // Updates Content_width
        $('#content_wrapper').css('width', _config['content_width']);
    
        var table = $(".zui").find("td").first();
    
        if (table.length > 0)
        {
            if (_DEBUG)
            {
                console.log("Adds User Interface");
            }
        
            // Add User Interface
            table.append(
                $('<a></a>').addClass('menu-link').html('Reparse Stories').attr('href', '#').click(function(e)
                {
                    _readList($('.z-list'));
                    e.preventDefault();

                }).attr('title', 'Parse the Stories again')
            ).append(
                $('<a></a>').addClass('menu-link').html('Config Editor').attr('href', '#').click(function(e)
                {
                    _gui();
                    e.preventDefault();

                }).attr('title', 'Open Config Editor')
            ).append(
                $('<a></a>').addClass('menu-link').html('Config Import / Export').attr('href', '#').click(function(e)
                {
                    _toggleSaveConfig();
                    e.preventDefault();

                }).attr('title', 'Config Export')
            ).append(
                $('<a></a>').addClass('menu-link').html('Reset Config').attr('href', '#').click(function(e)
                {
                    if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
                    {
                        _defaultConfig();
                    }
                    e.preventDefault();

                }).attr('title', 'Load default Config')
            );
        
        }
        
        if (_DEBUG)
        {
            console.log("Append Styles");
        }
        
        // Append Styles
        $("head").append(
            $("<style></style>").text(_styleApply)
        );
        
        
        if (_DEBUG)
        {
            /*
            $('.zui').last().append(
                $('<a></a>').addClass('menu-link').html('Test - Feature').attr('href', '#').click(function(e)
                {
                    _loadNextPage();

                }).attr('title', 'Test Feature')
            );
            */
        }
        
        // Add GUI for "Only Mode":
        var container = $("#myform").first().children().first();
        
        if (container.length > 0)
        {
            if (_DEBUG)
            {
                console.log('Add GUI for "Only Mode"');
            }
        
            var input = $("<select></select>")
            .attr("title", "Display Only Elements that match a specific Filter")
            .change(function()
            {
                var selected = input.children().filter(":selected").attr('value');
                if (_DEBUG)
                {
                    console.info("Display Only - Element Selected: ", selected);
                }
                
                if (selected != "off")
                {
                    _dataConfig["displayOnly"] = selected;
                }
                else
                {
                    _dataConfig["displayOnly"] = undefined;
                }
                
                _save_dataStore();
                _readList($('.z-list'));
            
            });
            
            var noneEntry = $('<option value="off">Display: Everything</option>').appendTo(input);
            
            if (typeof(_dataConfig["displayOnly"]) == "undefined")
            {
                noneEntry.attr("selected", "selected");
            }
            
            
            $.each(_config.marker, function(title, info)
            {
                var entry = $('<option></option>').attr('value', title).html(title).appendTo(input);
                
                if ((typeof(_dataConfig["displayOnly"]) != "undefined") && (title == _dataConfig["displayOnly"]))
                {
                    entry.attr("selected", "selected");
                }
                
            });
            
            
            container.find("select").last().after(input);
        }
    
        // Key Control for Page:
        
        $("body").keydown(function(event)
        {
            var container = $("#myform").find("center").last();
            var current = container.find("b").first();
            var url = null;

            if ($(event.target).is("body"))
            {
        
                // right
                if (event.keyCode == 39)
                {
                    var element = current.next("a");
                    if (element.length != 0)
                    {
                        url = element.attr("href");
                    }
                    
                    if (url == null)
                    {
                        element = $("body").find('button:contains(Next)').first();
                        if (element.length != 0)
                        {
                            url = _getUrlFromButton(element);
                        }
                    }
                    
                }
                // left
                else if (event.keyCode == 37)
                {
                    var element = current.prev("a");
                    if (element.length != 0)
                    {
                        url = element.attr("href");
                    }
                    
                    if (url == null)
                    {
                        element = $("body").find('button:contains(Prev)').first();
                        if (element.length != 0)
                        {
                            url = _getUrlFromButton(element);
                        }
                    }
                    
                }
                
                if (_DEBUG)
                {
                    console.log("Changes to Page: ", url);
                }
                
                
                if (url != null)
                {
                    location.href = url;
                }
            }
        
        });
    
    
        // Endless Mode --- DEBUG-Mode
        if (_DEBUG)
        {
            if ($(".z-list").length > 0)
            {
        
                $(".z-list").first().before(
                    $("<a></a>").html("LoadPrevPage")
                    .attr("href", "#")
                    .click(function(e)
                    {
                        _loadPrevPage();
                        
                        //e.preventDefault();
                    })
                );
                
                $(".z-list").last().after(
                    $("<a></a>").html("LoadNextPage")
                    .attr("href", "#")
                    .click(function(e)
                    {
                        _loadNextPage();
                        
                        //e.preventDefault();
                    })
                );
            }
        }
    
    }
    
    var _readList = function(__element)
    {
        if (_LOAD_INTERNAL)
        {
            return;
        }

        _element = __element;
        _read();
    }

    this.readList = _readList;
    
    var _read = function()
    {

        var odd = false;

        // Clear old Session:
        _found = [];
        _eList = {};
        _hidden = 0;
        $('.parser-msg').remove();
        $('[data-color]').removeAttr("data-color");
        
        _element.each(function(k, e)
        {
            var element = $(e)
            
            // Reset Hide:
            element.show();
            
            var textEl = element.find('div').last();
            var text = element.text().toLowerCase();
            var color = _config.color_normal;
            var colorMo = _config.color_mouse_over;
            var link = element.find('a').first().attr('href');

            var storyName = _getStoryName(link);
            
            var requestQueue = [];
            
            if (_config.hide_non_english_storys && (text.indexOf('english') == -1))
            {
                element.slideUp();
                _hidden += 1;
                return;
            }

            if (odd)
            {
                color = _config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }

            var marker_found = false;
                        
            $.each(_config.marker, function(headline, config)
            {

                var ignore = false;
                $.each(config.ignore, function(i, marker)
                {
                    try
                    {
                        var reg = new RegExp(marker, "i");
                        
                        if ((marker != "") && reg.test(text))
                        {
                            // Ignore this Element
                            ignore = true;
                            return;
                        }
                    } catch (e)
                    {
                        warn(e);
                    }
                });

                if (ignore)
                {
                    return;
                }
                
                var found = false;

                $.each(config.keywords, function(i, marker)
                {
                    var reg = new RegExp(marker, "i");
                    
                    if (!found)
                    {
                        if (reg.test(text))
                        {
                            found = true;
                        }
                    }
                });

                if (found)
                {
                    if (!config.ignoreColor)
                    {
                        marker_found = true;
                    }
                    else if (_DEBUG)
                    {
                        console.log("Ignore Color for ", headline);
                    }
                
                    var info = {
                        'name': storyName,
                        'url': link,
                        'chapter': 0
                    }
                    _elementCallback(config, element, textEl, headline, info);

                    
                    _found.push(storyName);

                } else if (config.search_story)
                {
                    var parseData = {
                        url: link,
                        keywords: config.keywords,
                        headline: headline,
                        config: config,
                        element: element,
                        textEl: textEl,
                        info: info,
                        storyName: storyName
                    };
                    
                    requestQueue.push(parseData);

                } else if (_found.indexOf(storyName) == -1)
                {
                
                    /*if (_DEBUG)
                    {
                        console.log("[_read-1] Change Color of Line: ",element); 
                    }*/
                
                    _updateColor(element, color, colorMo);
                }

                if (_config.mark_M_storys)
                {
                    textEl.html(textEl.html().replace('Rated: M', '<b>Rated: M</b>'));
                }
            });
            
            if (_config['hide_images'])
            {
                element.find('img').hide();
            }
            
            // Highlighter:
            // Build Context Menu for Storys:
            var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .addClass("context-menu")
            .append(
                $("<img></img>")
                .attr("src", "http://private.mrh-development.de/ff/edit.gif")
                .css("width", "100%")
                .css("height", "100%")
            );
            
            // Open GUI
            contextMenu.click(function()
            {
                if (_DEBUG)
                {
                    console.log("Context Menu for ", element, " clicked");
                }
            
                _toggleStoryConfig({
                    url: link,
                    element: element,
                    name: storyName
                });
            
            });
            
            element.find("div").first().before(contextMenu);
            
            
            // Highlighter found:
            if (typeof(_config['highlighter'][link]) != "undefined")
            {
                if (_DEBUG)
                {
                    console.info("Highlight Element Found: ", element);
                }
                
                var img = $("<img></img>").attr("src", _config['highlighter'][link])
                .css("width", "20px")
                .css("height", "20px")
                .css("margin-left", "15px")
                .addClass("parser-msg");
                
                element.find("a").last().after(img);
                
            }
            
            if (!marker_found)
            {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element); 
                }*/
            
                if (typeof(_dataConfig["displayOnly"]) != "undefined")
                {
                    if (_DEBUG)
                    {
                        console.log("Hide Entry because of Display-Only Mode: ", element);
                    }
                
                
                    element.hide();
                    _hidden += 1;
                }
                else
                {
                    _updateColor(element, color, colorMo);
                }
            
                
            }
            
            _doParse(requestQueue);
            

        });
        
        if (_DEBUG)
        {
            console.info("Current Highlighter Settings: ", _config['highlighter']);
        }
        
        _updateList();
        
        // Timed Events:
        setTimeout(function()
        {
            // Color corrections            
            _element.filter("[data-color]").each(function(k, el)
            {
                el = $(el);
                var color = el.attr("data-color");
                
                el.css("background-color", color);          
            
            });
            
            // Disable Image Hover Effect:
            if (_config.disable_image_hover)
            {
                $("head").append(
                    $("<style></style")
                    .text(".z-list_hover { height: auto !important }")
                    .addClass("parser-msg")
                );
                
                $(".cimage").each(function(k, el)
                {
                    el = $(el);
                    var width = el.width();
                    var height = el.height();
                    
                    el.css("width", width + "px")
                    .css("height", height + "px");

                });
            }
            
            if (_config.hide_lazy_images)
            {
                $(".lazy").remove();
            }

        }, 1000);
        
        
    }

    var _getStoryName = function(link)
    {
        var storyName_reg = /\/s\/[0-9]+\/[0-9]+\/(.+)/;
        var result = storyName_reg.exec(link);

        if ((result != null) && (result.length > 1))
        {
            return result[1];
        } else
        {
            storyName_reg = /\/[^\/]+\/(.+)/;
            result = storyName_reg.exec(link);
            if ((result != null) && (result.length > 1))
            {
                return result[1];
            } else
            {
                return "None";
            }
        }
    }

    var _doParse = function(queue, i)
    {    
        if (typeof i == "undefined")
        {
            i = 0;
        }
    
        if (_DEBUG)
        {
            console.info('Execute Queue on '+i+': ', queue);
        }
            
        if (i >= queue.length)
        {
            return;
        }

        var data = queue[i];
        
        url = 'http://www.fanfiction.net' + data.url;
    

        keywords = data.keywords;

        if (typeof keywords == "undefined")
        {
            console.warn('No Keywords!');
        }
        
        var executeNext = function()
        {
            _doParse(queue, i+1);
        }
        
        callback = function(info)
        {
            var el = queue[i];
            
            if (_DEBUG)
            {
                console.info('execute Callback Function '+el.headline+' for ', info);
            }
            
            _elementCallback(el.config, el.element, el.textEl, el.headline, info);
            
            _found.push(el.storyName);
            
            executeNext();
        }
        
        _parse(url, keywords, callback, 0, executeNext);
        
    }


    var _parse = function(url, keywords, callback, i, executeNext)
    {    
        
        if (i >= _config.story_search_depth)
        {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var ajax_callback = function(text)
        {
            if (!(url in _storyCache))
            {
                if (_DEBUG)
                {
                    console.log('Story '+url+' Not in Cache -> save');
                }
                
                _storyCache[url] = text;

                try
                {
                    sessionStorage[_config.storage_key] = JSON.stringify(_storyCache);
                } catch (ex)
                {
                    try
                    {
                        sessionStorage[_config.storage_key] = '';

                    } catch (e)
                    {
                        console.warn(e);
                    }
                }

            }

            var body = $(text);
            
            if (_parseSite(body, keywords))
            {
                var storyName = _getStoryName(url);
                callback({
                    'name': storyName,
                    'url': url,
                    'chapter': ( i + 1 )
                });
                
            } else
            {
                //console.log('find next el');
                var next = body.find('button:contains(Next)').first();
                //console.log('next: ', next);

                if (next.length != 0)
                {
                    var data = url = _getUrlFromButton(next);

                    //console.log('data:', data);

                    if (data != null)
                    {
                        _parse(data, keywords, callback, i+1, executeNext);
                    }
                }
                //console.log('Content not found in: ', url);
                
            }

        };

        if (url in _storyCache)
        {
            if (_DEBUG)
            {
                console.log('Story '+url+' in Cache -> use Cache');
            }
                
        
            ajax_callback(_storyCache[url]);
        } else
        {
            if (_DEBUG)
            {
                console.log('Story '+url+' not in Cache -> request');
            }
        
            $.ajax({
                url: url,
                success: ajax_callback
            });
        }

        //console.log('reponse revieved');


    }
    
    
    var _parseSite = function(body, keywords)
    {
        var storyEl = body.find('.storytext');

        //console.log('search in ', storyEl);

        if (storyEl.length == 1)
        {
            var storyText = storyEl.html().toLowerCase();

            var result = false;

            $.each(keywords, function(k, word)
            {
                if (!result)
                {
                    try
                    {
                        var reg = new RegExp(word, "i");
                        if (reg.test(storyText))
                        {
                            result = true;

                            return;
                        }
                    } catch (e)
                    {
                        console.warn(e);
                    }
                }
            });
            return result;
        }

        return false;

    }

    var _elementCallback = function(config, element, textEl, headline, info)
    {
        var found_where = info.chapter;

        if (!(headline in _eList))
        {
            _eList[headline] = [];
        }
        _eList[headline].push(info);

        if (_DEBUG)
        {
            console.info("Element Callback for ", headline, info);
        }
        
        if ((typeof(_dataConfig["displayOnly"]) != "undefined") && (_dataConfig["displayOnly"] == headline))
        {
            if (_DEBUG)
            {
                console.info("Display Only Mode: Match found for", element);
            }

            window.setTimeout(function()
            {
                element.show();
            }, 100);
            
            _hidden -= 1;
        }
        else if (typeof(_dataConfig["displayOnly"]) != "undefined")
        {
            // Hide this Element becazse the Only Mode do not match
            element.hide();
            _hidden += 1;
        }
        
        
        if (!config.display)
        {
            element.slideUp();
            element.addClass('hidden');
            _updateListColor();
            _hidden += 1;
        } else
        {           
            if (config.background != null)
            {
                element.css('background-image', 'url('+config.background+')')
                .css('background-repeat', 'no-repeat')
                .css('background-position', 'right');
            }

            if (config.mark_chapter)
            {
                element.find('a').first().after("<span class=\"parser-msg\"> <b>["+headline+"-"+found_where+"]</b></span>");
            }

            if (config.text_color != null)
            {
                textEl.css('color', config.text_color);
            }
            
            $.each(config.keywords, function(key, keyword)
            {
                var el = element.find('div').first();
                var reg = new RegExp(keyword, "i");
                var text = el.html();

                var erg = reg.exec(text);
                var front = '';
                var replace = '';
                var behind = '';
                
                color = config.color;
                colorMo = config.mouseOver;

                
                if (erg != null)
                {
                    if (erg.length == 1)
                    {
                        replace = keyword;
                    } else if (erg.length == 2)
                    {
                        front = erg[1];
                    } else if (erg.length == 3)
                    {
                        front = erg[1];
                        replace = erg[2];
                    } else
                    {
                        front = erg[1];
                        replace = erg[2];
                        behind = erg[3];
                    }
                    
                    replace = front+'<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">'+replace+'</span>'+behind;
                    
                    text = text.replace(new RegExp(keyword, "i"), replace);
                }  
                    
                el.html(text);

            });

            if (!config.ignoreColor)
            {
                /*if (_DEBUG)
                {
                    console.log("[ElementCallback] Change Color of Line: ",element); 
                }*/
                
                _updateColor(element, color, colorMo);
            }

        }

        _updateList();
    }

    var _updateList = function()
    {
        var text = "";

        var headlineContainer = $("<div></div>");
        $.each(_eList, function(headline, elements)
        {
            if (_config.marker[headline].print_story)
            {
                headlineContainer.append("<u>"+headline+": </u>");

                var eUl = $("<ul></ul>");

                $.each(elements, function(i, value)
                {
                    eUl.append(
                        $("<li></li>").append(
                            $("<a></a>").attr('href', value.url).html(value.name)
                        ).append(" - "+value.chapter)
                    )
                });

                headlineContainer.append(eUl);
            }

            if (_config.marker[headline].mention_in_headline)
            {
                text += "<b>"+headline+":</b> "+_eList[headline].length+ " ";
            }

        });

        $('#mrhOutput').remove();

        _element.first().before($('<div id=\'mrhOutput\'>'+text+' <i>All hidden elements:</i> '+_hidden+'<br></div>')
        .css('margin-bottom', '10px')
        .append(headlineContainer));
    }

    var _updateListColor = function()
    {
        var odd = false;
        _element.not('.hidden').each(function(k, el)
        {
            var el = $(el);
            var link = el.find('a').first().attr('href');
            var storyName = _getStoryName(link);
            var color = _config.color_normal;
            var colorMo = _config.color_mouse_over;

            if (el.is('.hidden'))
            {
                return;
            }

            if (odd)
            {
                color = _config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }

            if (_found.indexOf(storyName) == -1)
            {
                _updateColor(el, color, colorMo);
                
                /*if (_DEBUG)
                {
                    console.log("[UpdateList] Change Color of Line: ",el); 
                }*/
                
            }
        });


    }

    var _updateColor = function(element, color, colorMo)
    {
        element.css('background-color', color); 
        element.attr("data-color", color);
        element.attr("data-mouseOverColor", colorMo); 
        
        element.mouseenter(function()
        {
            $(this).css('background-color', colorMo);
        }).mouseleave(function()
        {
             $(this).css('background-color', color);
        })
    }

    
    var _enableInStoryHighlighter = function()
    {
        if (_LOAD_INTERNAL)
        {
            return;
        }
    
        if (_DEBUG)
        {
            console.log("Enable In Story Highlighter");
        }

        var body = $("body");
        var field = body.find('#gui_table1i').first().find("b").first();
        
        var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .append(
                $("<img></img>")
                .attr("src", "http://private.mrh-development.de/ff/edit.gif")
                .css("width", "100%")
                .css("height", "100%")
            );
            
        // Open GUI
        contextMenu.click(function()
        {
        
            _toggleStoryConfig({
                url: document.location.pathname,
                //element: element,
                name: field.text()
            });
        
        });
        
        field.after(contextMenu);
        
        // Highlighter found:
        if (typeof(_config['highlighter'][document.location.pathname]) != "undefined")
        {
            if (_DEBUG)
            {
                console.info("Highlight Element Found");
            }
            
            var img = $("<img></img>").attr("src", _config['highlighter'][document.location.pathname])
            .css("width", "20px")
            .css("height", "20px")
            .css("margin-left", "15px")
            .addClass("parser-msg")
            
            field.after(img);
            
        }
        
        
        
    }
    
    this.enableInStoryHighlighter = _enableInStoryHighlighter;
    
    this.enablePocketSave = function()
    {    
        if (_LOAD_INTERNAL)
        {
            return;
        }
    
        var user = _config['pocket_user'];
        var password = _config['pocket_password'];
        
        var body = $("body");
        
        if ((user == null) || (password == null))
        {
            console.log("Disables Pocket Save Function");
            return;        
        }
    
        var field = body.find('#gui_table1i').first().find("b").first();
    
        field.after(
            $('<button class="btn">Save To Pocket</button>')
            .click( function()
            {
                _parsePocket(document.location.pathname, field.text() + ": ");

            }).css("margin-left", "20px")
            .attr("id", "ffnet-pocket-save-button")
        );
    }
    
    var _parsePocket  = function(url, prefix)
    {
        if (typeof prefix == "undefined")
        {
            prefix = "";
        }
        
        var user = _config['pocket_user'];
        var password = _config['pocket_password'];
        
        
        if ((user == null) || (password == null))
        {
            return;
        }
        
        var ajax_callback = function(text)
        {
            var body = $(text);
            
            //var title = prefix + $(body.find('#chap_select')).first().children().filter('[selected="selected"]').html();

            var title = body.find("title").first().text();
            
            $("body").append(
                $("<img>").attr("src", 'https://readitlaterlist.com/v2/add?username='+user+'&password='+password+'&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=http://www.fanfiction.net'+url+'&title='+title)
            );
            
            console.log(url+' - '+title+' - Done');
            
            var next = body.find('button:contains(Next)').first();


            if (next.length != 0)
            {
                var data = url = _getUrlFromButton(next);
            
                if (data != null)
                {
                    _parsePocket(data, prefix);
                }
            
            } else
            {
                $("#ffnet-pocket-save-button").attr("disabled", "disabled")
                .html("Save done!");
            }

        };

        $.ajax({
            url: url,
            success: ajax_callback
        });
    
    }
    
    // ------- Endless Mode ------
    
    var _currentPage = null;
    
    var _getPageContent = function(base, prev, callback)
    {
        var url = null;
        if (prev)
        {
            url = _getPrevPage(base);
        }
        else
        {
            url = _getNextPage(base);
        }
        
        
        if (_DEBUG)
        {
            console.log("Requesting next page: ", url);
        }
    
        $.get(url, function(content)
        {
        
            var data = $(content);
            
            var elements = data.find(".z-list");
            
            if (_DEBUG)
            {
                console.log("Elements Found: ", elements);
            }
        
            callback(elements, data);
        
        });
        
        
    }
    
    var _loadNextPage = function()
    {
        var base = null;
        
        if (_currentPage == null)
        {
            base = $("#myform");
        }
        else
        {
            base = _currentPage.find("#myform").first();
        }
        
    
        _getPageContent(base, false, function(elements, data)
        {       
            // Add elements to DOM:
            if (elements.length > 0)
            {
                var last = $(".z-list").last();
                
        
                
                elements.each(function(k, el)
                {
                    el = $(el);
                    
                    last.after(el);
                    last = el;
                });
                
                // Only allow 25 entries at all times:
                var all = $(".z-list");
                
                if (all.length > 25)
                {
                    if (_DEBUG)
                    {
                        console.log("Count greather then 40 entries, remove some ...");
                    }
                
                    for ($i = 0; $i < all.length - 25; $i++)
                    {
                        $(all[$i]).slideUp().remove();
                    }
                }
                
                window.setTimeout( _readList($('.z-list')), 200);
            
                $("#myform").find("center").last().html(data.find("#myform").find("center").last().html());
            
            
                _currentPage = data;
            }
            
        });
    }
    
    var _loadPrevPage = function()
    {
        var base = null;
        
        if (_currentPage == null)
        {
            base = $("#myform");
        }
        else
        {
            base = _currentPage.find("#myform").first();
        }
        
    
        _getPageContent(base, true, function(elements, data)
        {       
            // Add elements to DOM:
            if (elements.length > 0)
            {       
                var last = $(".z-list").first();
                
                elements.each(function(k, el)
                {
                    el = $(el);
                    
                    last.before(el);
                    last = el;
                });
                
                // Only allow 25 entries at all times:
                var all = $(".z-list");
                
                if (all.length > 25)
                {
                    if (_DEBUG)
                    {
                        console.log("Count greather then 40 entries, remove some ...");
                    }
                
                    for ($i = 0; $i < all.length - 25; $i++)
                    {
                        $(all[$i]).slideUp().remove();
                    }
                }
                
                window.setTimeout( _readList($('.z-list')), 200);
                
                $("#myform").find("center").each(function(k, el)
                {
                    $(el).html(data.find("#myform").find("center").last().html());
                });
                _currentPage = data;
            }
            
        });
    }
    
    
    
    var _getNextPage = function(base)
    {
        var container = base.find("center").last();
        
        var current = container.find("b").first();
        var next = current.next("a");
        
        if (next.length > 0)
        {
            return next.attr("href");   
        }
        
        return null;    
    }
    
    var _getPrevPage = function(base)
    {
        var container = base.find("center").last();
        
        var current = container.find("b").first();
        var prev = current.prev("a");
        
        if (prev.length > 0)
        {
            return prev.attr("href");   
        }
        
        return null;    
    }
    
    
    
    // --------- GUI -------------

    var _settings_elements = {};
    var _gui_elements = {};
    var _add_count = 0;

    var _gui_create = function()
    {
        var width = 600;
        var radius = 15;
        var win_width = window.outerWidth;

        var container = $("<div></div>")
        .css('position', 'absolute')
        .css('top', '15px')
        .css('left', ((win_width - width) / 2) + "px")
        .css('z-index', '999')
        .css('background-color', 'white')
        .css('width', width+ "px")
        .css('min-height', '500px')
        .css('overflow', 'auto')
        .css('padding', '10px 5px 10px 5px')

        // Background
        .css('background', '-moz-linear-gradient(center top, #CCCCCC, #FFFFFF 300px) repeat scroll 0 0 #CCCCCC')
        .css('background', '-webkit-gradient( linear, center top, center 300px, from(#CCCCCC), to(#FFFFFF)) repeat scroll 0 0 #CCCCCC')
        .css('background', '-o-linear-gradient( center top, #CCCCCC, #FFFFFF )')

        // Border-Radius
        .css('-moz-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-webkit-border-top-left-radius', radius+'pxpx')
        .css('-webkit-border-top-right-radius', radius+'px')
        .css('-webkit-border-bottom-left-radius', radius+'px')
        .css('-webkit-border-bottom-right-radius', radius+'px')
        .css('-goog-ms-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-khtml-border-radius', radius+'px')
        .css('-moz-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-webkit-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-goog-ms-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('border', '1px black solid')

        .hide()
        ;

        container.html($('#content').hide().html());

        $("body").append(container);

        _gui_container = container;

    }

    var _gui_update = function()
    {
        _gui_elements = {};
        _settings_elements = {};
        _gui_container.html('');

        // Reset Position:
        _gui_container.css("position", "absolute");
        
        _add_count = 0;
        
        // Displays current Version:
        $('<div style="width:70%; display:inline-block; text-align:left; margin-bottom: 5px"></div>').append(
            $("<span></span>").html("Current Version: <b>" + _VERSION + "</b>")        
        ).appendTo(_gui_container);
        
        
        $('<div style="width:30%; display:inline-block; text-align:right; margin-bottom: 5px"></div>').append(
            $('<input type="button" value="Close"></input>').click(function()
            {
                if (confirm("All unsaved changes will be deleted!"))
                {
                    _gui_hide();
                }

            })
        ).appendTo(_gui_container);
        
                
        var radius = 15;

        // render Settings Container:
        var s_container = $("<div></div>")
        .css('margin', 'auto')
        //.css('height', '260px')
        .css('margin-bottom', '30px')
        .css('background-color', 'white')
        .css('padding', '5px')

        // Border-Radius
        .css('-moz-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-webkit-border-top-left-radius', radius+'pxpx')
        .css('-webkit-border-top-right-radius', radius+'px')
        .css('-webkit-border-bottom-left-radius', radius+'px')
        .css('-webkit-border-bottom-right-radius', radius+'px')
        .css('-goog-ms-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-khtml-border-radius', radius+'px')
        .css('-moz-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-webkit-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-goog-ms-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('border', '2px black solid')

        .appendTo(_gui_container);


        var table = $('<table width="100%"></table>').appendTo(s_container);

        var spacer = $('<tr></tr>').append
            (
                $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
                $('<td></td>')
            );

        // story_search_depth
        var input = $('<input type="text" id="fflist-story_search_depth">')
                    .attr('value', _config.story_search_depth)
                    .attr('size', '50');

        _settings_elements['story_search_depth'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-story_search_depth">Max Search depth: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // mark_M_storys:
        var checkbox = $('<input type="checkbox" id="fflist-mark_M_storys">');
        if (_config.mark_M_storys)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['mark_M_storys'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-mark_M_storys">Mark "M" rated Storys: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // hide_non_english_storys:
        checkbox = $('<input type="checkbox" id="fflist-hide_non_english_storys">');
        if (_config.hide_non_english_storys)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['hide_non_english_storys'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_non_english_storys">Hide non English Storys: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());
        
        // hide_images:
        checkbox = $('<input type="checkbox" id="fflist-hide_images">');
        if (_config.hide_images)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['hide_images'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_images">Hide Story Images: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );
        
        // spacer:
        table.append(spacer.clone());
        
        // hide_lazy_images:
        checkbox = $('<input type="checkbox" id="fflist-hide_lazy_images">');
        if (_config.hide_lazy_images)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['hide_lazy_images'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_lazy_images">Hide <abbr title="Images that are loaded after the first run. Mostly Story Images, not User Images">lazy</abbr> images: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );
        
        
        // spacer:
        table.append(spacer.clone());
        
        // disable_image_hover:
        checkbox = $('<input type="checkbox" id="fflist-disable_image_hover">');
        if (_config.disable_image_hover)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['disable_image_hover'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_image_hover">Disable Image Hover Effect: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());
        
        // content_width
        input = $('<input type="text" id="fflist-content_width">')
                    .attr('value', _config.content_width)
                    .attr('size', '50');

        _settings_elements['content_width'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-content_width">Content Width: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );

        // spacer:
        table.append(spacer.clone());
        

        // color_normal
        input = $('<input type="text" id="fflist-color_normal">')
                    .attr('value', _config.color_normal)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _settings_elements['color_normal'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_normal">Normal Background-Color: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // spacer:
        table.append(spacer.clone());

        // color_mouse_over
        input = $('<input type="text" id="fflist-color_mouse_over">')
                    .attr('value', _config.color_mouse_over)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _settings_elements['color_mouse_over'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_mouse_over">MouseOver Background-Color: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // color_odd_color
        input = $('<input type="text" id="fflist-color_odd_color">')
                    .attr('value', _config.color_odd_color)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _settings_elements['color_odd_color'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_odd_color">Odd Background-Color: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );
        
        
        // spacer:
        table.append(spacer.clone());

        // Pocket ---
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append("--------")
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    " ---- <a href=\"http://www.getpocket.com\">Pocket</a> Settings ----"
                )
            )
        );
        
        // spacer:
        table.append(spacer.clone());
        
        // pocket_user
        input = $('<input type="text" id="fflist-pocket_user">')
                    .attr('value', _config.pocket_user)
                    .attr('size', '50');

        _settings_elements['pocket_user'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-pocket_user">Username: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );
        
        
        // spacer:
        table.append(spacer.clone());
        
        // pocket_password
        input = $('<input type="password" id="fflist-pocket_password">')
                    .attr('value', _config.pocket_password)
                    .attr('size', '50');

        _settings_elements['pocket_password'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-pocket_password">Password: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );
        
        
        // spacer:
        table.append(spacer.clone());

        // API ---
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append("--------")
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    " ---- API Settings ----"
                )
            )
        );
        
        // spacer:
        table.append(spacer.clone());
        
        // api_checkForUpdates
        checkbox = $('<input type="checkbox" id="fflist-api_checkForUpdates">');
        if (_config.api_checkForUpdates)
        {
            checkbox.attr('checked', 'checked');
        }
        else
        {
            $("#api_autoIncludeNewVersion").attr("disabled", "disabled");
        }
        

        checkbox.change(function()
        {
            if (!$("#fflist-api_checkForUpdates").is(":checked"))
            {
                $("#fflist-api_autoIncludeNewVersion").attr("disabled", "disabled");
            }
            else
            {
                $("#fflist-api_autoIncludeNewVersion").removeAttr("disabled", "disabled");
            }
        
        });

        _settings_elements['api_checkForUpdates'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-api_checkForUpdates">Check for Updates: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );
        
        
        // api_autoIncludeNewVersion
        checkbox = $('<input type="checkbox" id="fflist-api_autoIncludeNewVersion">');
        if (_config.api_autoIncludeNewVersion)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['api_autoIncludeNewVersion'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-api_autoIncludeNewVersion">Auto Update: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );
        



        // -------------------------------

        var container = $("<div></div>").appendTo(_gui_container);

        $.each(_config.marker, function(name, marker)
        {
            _gui_add_form(name, marker, container);
        });

        $('<input type="button" value="Save"></input>').click(function()
        {
            var new_config = {};

            $.each(_gui_elements, function(k, data)
            {
                if (data == undefined)
                {
                    return;
                }

                var name = data.name.attr('value');
                if (name == '')
                {
                    return;
                }

                var config =
                {
                    name: name,
                    color: data.color.attr('value'),
                    ignore: data.ignore.attr('value').split(', '),
                    keywords: data.keywords.attr('value').split(', '),
                    mark_chapter: data.mark_chapter.is(':checked'),
                    mention_in_headline: data.mention_in_headline.is(':checked'),
                    display: data.display.is(':checked'),
                    mouseOver: data.mouseOver.attr('value'),
                    print_story: data.print_story.is(':checked'),
                    search_story: data.search_story.is(':checked'),
                    ignoreColor: data.ignoreColor.is(':checked'),
                    background: (name in _config.marker && _config.marker[name].background != null) ? (_config.marker[name].background) : null,
                    text_color: (name in _config.marker &&_config.marker[name].text_color != null) ? (_config.marker[name].text_color) : null
                };

                
                //console.log(name, config);
                new_config[name] = config;

            });

            _config.story_search_depth = Number(_settings_elements.story_search_depth.attr('value'));
            _config.mark_M_storys = _settings_elements.mark_M_storys.is(':checked');
            _config.hide_non_english_storys = _settings_elements.hide_non_english_storys.is(':checked');
            _config.hide_images = _settings_elements.hide_images.is(':checked');
            _config.hide_lazy_images = _settings_elements.hide_lazy_images.is(':checked');
            _config.disable_image_hover = _settings_elements.disable_image_hover.is(':checked');
            _config.content_width = _settings_elements.content_width.attr('value');
            _config.color_normal = _settings_elements.color_normal.attr('value');
            _config.color_odd_color = _settings_elements.color_odd_color.attr('value');
            _config.color_mouse_over = _settings_elements.color_mouse_over.attr('value');
            _config.pocket_user = _settings_elements.pocket_user.attr('value');
            _config.pocket_password = _settings_elements.pocket_password.attr('value');
            _config.api_checkForUpdates = _settings_elements.api_checkForUpdates.is(':checked');
            _config.api_autoIncludeNewVersion = _settings_elements.api_autoIncludeNewVersion.is(':checked');
            
            
            _config.marker = new_config;

            _save_config();

            _gui_hide();
        }).appendTo(_gui_container);


        $('<input type="button" value="Add Field"></input>').click(function()
        {
            _gui_add_form('New-Form '+(_add_count++),
                {
                    display: true,
                    keywords: [

                    ],
                    ignore: [

                    ],
                    color: '#FFFFFF',
                    mouseOver: '#FFFFFF',
                    background: null,
                    search_story: false,
                    mark_chapter: false,
                    print_story: false,
                    mention_in_headline: true,
                    text_color: null
                }, container
                , true // Display Big
            );

        }).appendTo(_gui_container);

        $('<input type="button" value="Close"></input>').click(function()
        {
            if (confirm("All unsaved changes will be deleted!"))
            {
                _gui_hide();
            }

        }).appendTo(_gui_container);

        $('<input type="button" value="Reset Config"></input>').click(function()
        {
            if (confirm("Do you want to delet your whole config! This can't be undone!"))
            {
                _gui_elements = {};
                _reset_config();
                _gui_hide();
            }

        }).appendTo(_gui_container);

    }

    var _gui_add_form = function(name, marker, mainContainer, displayBig)
    {
        _gui_elements[name] = {};

        var radius = 10;

        if (typeof(displayBig) == "undefined")
        {
            displayBig = false;
        }
        
        var height = 35;
        
        if (displayBig)
        {
            height = 550;
        }
        
        var container = $('<div class="fflist-filterField"></div>')

        .css('margin', 'auto')
        .css('height', height+'px')
        .css('margin-bottom', '15px')
        .css('background-color', 'white')
        .css('padding', '5px')
        .css('overflow', 'hidden')
        
        // Border-Radius
        .css('-moz-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-webkit-border-top-left-radius', radius+'pxpx')
        .css('-webkit-border-top-right-radius', radius+'px')
        .css('-webkit-border-bottom-left-radius', radius+'px')
        .css('-webkit-border-bottom-right-radius', radius+'px')
        .css('-goog-ms-border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('border-radius', radius+'px '+radius+'px '+radius+'px '+radius+'px')
        .css('-khtml-border-radius', radius+'px')
        .css('-moz-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-webkit-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('-goog-ms-box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('box-shadow', '0 1px 3px rgba(0, 0, 0, .15)')
        .css('border', '1px black solid')

        .appendTo(mainContainer)
        .hide();

        if (!displayBig)
        {
            container.css("cursor", "pointer")
            .css("cursor", "hand")
            .attr('title', "Click to Edit")
            
            .click(function()
            {
                container.css('height', '550px');
                container.css("cursor", "auto");
                container.removeAttr("title");              
                
            });

        }
        
        
        var table = $('<table width="100%"></table>').appendTo(container);

        var spacer = $('<tr></tr>').append
            (
                $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
                $('<td></td>')
            );

        // Name
        var input = $('<input type="text" id="fflist-'+name+'-name">')
                    .attr('value', name)
                    .attr('size', '50');

        _gui_elements[name]['name'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-'+name+'-name">Name: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );

        // spacer:
        table.append(spacer.clone());



        // Display:
        var checkbox = $('<input type="checkbox" id="fflist-'+name+'-display">');
        if (marker.display)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['display'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-display">Display Found Entrys: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // Keywords:
        var input = $('<input type="text" id="fflist-'+name+'-keywords">')
                    .attr('value', marker.keywords.join(', '))
                    .attr('size', '50');

        _gui_elements[name]['keywords'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-'+name+'-keywords">Keywords: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                ).append(
                    '<br><span style="font-size: small;">Seperated with ", "</span>'
                )

            )
        );


        // spacer:
        table.append(spacer.clone());

        // Ignore:
        var input = $('<input type="text" id="fflist-'+name+'-ignore">')
                    .attr('value', marker.ignore.join(', '))
                    .attr('size', '50');

        _gui_elements[name]['ignore'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-'+name+'-ignore">Ignore when: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                ).append(
                    '<br><span style="font-size: small;">Seperated with ", "</span>'
                )

            )
        );
        
        // spacer:
        table.append(spacer.clone());

        // Ignore Color:
        var checkbox = $('<input type="checkbox" id="fflist-'+name+'-ignoreColor">');
        if (marker.ignoreColor)
        {
            checkbox.attr('checked', 'checked');
        }

        checkbox.change(function()
        {
            if ($('#fflist-'+name+'-ignoreColor').is(":checked"))
            {
                $('#fflist-'+name+'-color').add('#fflist-'+name+'-mouseOver').attr("disabled", "disabled");
            }
            else
            {
                $('#fflist-'+name+'-color').add('#fflist-'+name+'-mouseOver').removeAttr("disabled");
            }
        
        
        });
        
        _gui_elements[name]['ignoreColor'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-ignoreColor">Ignore Color Settings: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );


        
        // spacer:
        table.append(spacer.clone());

        // Color:
        var input = $('<input type="text" id="fflist-'+name+'-color">')
                    .attr('value', marker.color)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _gui_elements[name]['color'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }
        
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-'+name+'-color">Color: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )

            )
        );

        // spacer:
        table.append(spacer.clone());

        // MouseOver:
        var input = $('<input type="text" id="fflist-'+name+'-mouseOver">')
                    .attr('value', marker.mouseOver)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _gui_elements[name]['mouseOver'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }
        
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-'+name+'-mouseOver">Mouse Over Color: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )

            )
        );

        // spacer:
        table.append(spacer.clone());

        // search_story:
        checkbox = $('<input type="checkbox" id="fflist-'+name+'-search_story">');
        if (marker.search_story)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['search_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-search_story">Search in Storys: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );


        // spacer:
        table.append(spacer.clone());

        // mark_chapter:
        checkbox = $('<input type="checkbox" id="fflist-'+name+'-mark_chapter">');
        if (marker.mark_chapter)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['mark_chapter'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-mark_chapter">Mark Chaper: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );


        // spacer:
        table.append(spacer.clone());

        // print_story:
        checkbox = $('<input type="checkbox" id="fflist-'+name+'-print_story">');
        if (marker.print_story)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['print_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-print_story">List Storys: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());

        // mention_in_headline:
        checkbox = $('<input type="checkbox" id="fflist-'+name+'-mention_in_headline">');
        if (marker.mention_in_headline)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['mention_in_headline'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-'+name+'-mention_in_headline">Mention in Headline: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        // spacer:
        table.append(spacer.clone());


        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>')
                .css('border-right', '1px solid gray')
            ).append(
                $('<td></td>').append(
                    $('<input type="button" value="Remove">').click(function()
                    {
                        _gui_elements[name] = undefined;

                        container.fadeOut(function()
                        {
                            container.remove();
                        })

                    })
                )
            )
        );

        container.fadeIn();

    }

    var _gui_hide = function()
    {
        _gui_container.fadeOut();
    }

    var _gui_show = function()
    {
        _gui_container.fadeIn();
    }

    var _reset_config = function()
    {
        _config.marker = {};
        _save_config();
    }

    var _gui = function()
    {
        if (_gui_container == null)
        {
            _gui_create();
        }

        _gui_update();
        _gui_show();

    }

    var _toggleSaveConfig = function()
    {
        if (_gui_container == null)
        {
            _gui_create();
        }
        
        if (_gui_container.is(':visible'))
        {
            _gui_hide();
            
        } else
        {        
            _gui_container.html('');
            
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input type="button" value="Close"></input>').click(function()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            
            _gui_container.append('<label for="ffnet-config-display">Your current Config:</label><br/>');
            
            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(_getConfig())
                .appendTo(_gui_container);

                
            _gui_container.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');
            
            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(_gui_container);
                
            _gui_container.append(
                $('<input type="button" value="Set" />')
                    .click(function()
                    {
                        _setConfig(neu.val());
                        _gui_hide();
                        _read();
                    })
            );
                
            _gui_show();
        }
        
    } 
    
    var _toggleStoryConfig = function(storyInfo)
    {
        if (_gui_container == null)
        {
            if (_DEBUG)
            {
                console.log("Generate GUI Container");
            }
        
            _gui_create();
        }
        
        if (_gui_container.is(':visible'))
        {
            if (_DEBUG)
            {
                console.log("Hide GUI Container");
            }
        
            _gui_hide();
            
        } else
        {        
            if (typeof(storyInfo) == "undefined")
            {
                if (_DEBUG)
                {
                    console.warn("_toggleStoryConfig: No Parameter given!");
                }
                
                return;
            }
        
            if (_DEBUG)
            {
                console.log("Starting Content Generation");
            }
        
            _gui_container.html('');
            
            
            // Set Position:
            _gui_container.css("position", "fixed");
            
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input type="button" value="Close"></input>').click(function()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_container.css("position", "absolute");
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            
            _gui_container.append("<p>This Menu allows you to set story specific options for:</p>");
            _gui_container.append(storyInfo.name);
            _gui_container.append("<hr />");
            _gui_container.append("<p>Highlighter Options:</p>");
            
            _gui_container.append('<label for="ffnet-story-highlighter">Highlighter Path: (leave empty to clear)</label><br/>');
            var highlighter = $('<input type="text"></input>')
            .appendTo(_gui_container)
            .css("width", "500px");
                
            _gui_container.append("<p></p>");
            
            var image_container = $("<div></div>")
            .css("border", "1px solid black")
            .css("padding", "2px")
            .appendTo(_gui_container);
            
            var image = $("<img></img>")
            .css("width", "30px")
            .css("height", "30px")
            .css("margin-left", "5px")
            .css("border", "1px solid black")
            .css("display", "inline-block");
            
            image.clone()
            .attr("src", "http://private.mrh-development.de/ff/none.gif")
            .appendTo(image_container)
            .click(function()
            {            
                highlighter.val("");
            });
            
            for (var i = 1; i <= 6; i++)
            {
                image.clone()
                .attr("src", "http://private.mrh-development.de/ff/"+i+".gif")
                .appendTo(image_container)
                .click(function()
                {            
                    highlighter.val($(this).attr("src"));
                });
            }
                
                
            if (typeof(_config['highlighter'][storyInfo.url] != "undefined"))
            {
                highlighter.val(_config['highlighter'][storyInfo.url]);
            }
                
            _gui_container.append(
                $('<input type="button" value="Set" />')
                    .click(function()
                    {
                        var newVal = highlighter.val();
                        if (newVal == "")
                        {
                            _config['highlighter'][storyInfo.url] = undefined;
                        } else
                        {
                            _config['highlighter'][storyInfo.url] = newVal;
                        }
                        
                        _save_config();
                        
                        _gui_container.css("position", "absolute");
                        _gui_hide();
                        _read();
                        _enableInStoryHighlighter();
                    })
            );

            
            if (_DEBUG)
            {
                console.log("Display Content");
            }
            
            _gui_show();
        }
        
    }
    
    // ----- API-Interface ------
    
    var _apiRequest = function (data, callback)
    {        
        var url = _config.api_url;
        var apiLookupKey = _config.api_lookupKey;
        var timeout = _config.api_timeout;
        var retrys = _config.api_retries;
                    
        $.ajax({
           type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            data: data,
            cache: false
        });
        
        var tries = 0;
    
        var checkFunction = function()
        {
            if (_DEBUG)
            {
                console.log("API_Request - CheckFor Result");
            }
            
            if (tries >= retrys)
            {
                if (_DEBUG)
                {
                    console.log("API_Request - To many tries, abort");
                }
            
                return;
            }
            
            if ((typeof sessionStorage[apiLookupKey] != "undefined") &&
                (typeof sessionStorage[apiLookupKey] != "null") &&
                sessionStorage[apiLookupKey] != "undefined" &&
                sessionStorage[apiLookupKey] != "null" &&
                sessionStorage[apiLookupKey] != "" &&
                sessionStorage[apiLookupKey] != null)
            {
                if (_DEBUG)
                {
                    //console.log("API_Request - Result found, exec callback - ", sessionStorage[apiLookupKey]);
                }
            
                var result = sessionStorage[apiLookupKey];
            
                // Clear last Result
                delete sessionStorage[apiLookupKey];
            
                callback(result);

            } else
            {
                if (_DEBUG)
                {
                    console.log("API_Request - No Result found, Retry");
                }
                tries++;
                window.setTimeout(checkFunction, timeout);
            }
        };
        
        window.setTimeout(checkFunction, timeout);
    
    }
    
    
    var _api_checkVersion = function()
    {
        if (_config.api_checkForUpdates)
        {
            var statisticData =
            {
                Version: _VERSION,
                Token: _config.token
            }
        
            if (_DEBUG)
            {
                console.info("Check for Updates ...");
                console.log("Sending Statistic Data: ", statisticData);
            }
            
            var requestData = JSON.stringify(statisticData);
            
            _apiRequest({command: "getVersion", data: requestData}, function(res)
            {
                if (_DEBUG)
                {
                    console.log("Version Received: ", res);
                }
                
                var version = JSON.parse(res);
                
                if (_DEBUG)
                {
                    console.log("Version Info Recieved: ", version);
                    console.log("Current Version: ", _VERSION);
                }
                
                if (_VERSION != version.version)
                {
                    if (!_config.api_autoIncludeNewVersion)
                    {               
                        $(".menulinks").append(" [Notice: There is a newer Version of the Fanfiction.net Story Parser ("+ version.version +")]");
                    }
                    else
                    {
                        _api_updateScript();
                    }
                }
                
            });
            
        }
    }
        
    var _api_updateScript = function()
    {
        if (_config.api_autoIncludeNewVersion)
        {
            if (_DEBUG)
            {
                console.log("Loading new Version from Server");
            }
        
            _apiRequest({command: "getCurrent", data: ""}, function(res)
            {
                //console.log("Script: ", res);
            
                _saveToMemory(localStorage, "ffnet-Script", { script: res });    

                if (_DEBUG)
                {
                    console.log("New Version Recieved");
                }
                
            });
        }
    }
        
    // --------------------------

    var _save_config = function()
    {
        try
        {
            localStorage[_config.config_key] = JSON.stringify(_config);

        } catch (e)
        {
            
        
            console.warn(e);
            console.log("Current Config: ", _config);
        }

    }

    var _save_dataStore = function()
    {
        _saveToMemory(sessionStorage, _config.dataStorage_key, _dataConfig);
        
        if (_DEBUG)
        {
            console.info("Save to Memory: ", _dataConfig);
        }
    }
    
    var _getConfig = function()
    {
        return JSON.stringify(_config);
    }
    
    this.getConfig = _getConfig;
    
    var _setConfig = function(newConfig)
    {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
        {
            var data = JSON.parse(newConfig);
            _config = data;
            
            _save_config();
        }
    }

    this.setConfig = _setConfig;
    

    this.getList = function()
    {
        return _eList;
    }

    // -------- Multiuse Functions ---------
    
    var _loadFromMemory = function(memory, key)
    {
        if ((typeof memory[key] != "undefined") &&
                (typeof memory[key] != "null") &&
                memory[key] != "undefined" &&
                memory[key] != "null" &&
                memory[key] != "" &&
                memory[key] != null)
        {
            return JSON.parse(memory[key]);
        }
        
        return {};
    }
    
    
    var _saveToMemory = function(memory, key, object)
    {
        try
        {
            memory[key] = JSON.stringify(object);

        } catch (e)
        {
            console.warn(e);
        }
    
    }
    
    var _getUrlFromButton = function(button)
    {
        var script = button.attr('onclick');
        var script_reg = /self\.location=\'([^']+)\'/;
        var data = script_reg.exec(script);
        
        if ((data != null) && (data.length > 1))
        {
            return data[1];
        }
        else
        {
            return null
        }
    }
    
    
    // -------------------------------------------
    
    _init();
}

var parser = new storyParser($('.z-list'));
parser.readList($('.z-list'));
parser.enablePocketSave($('#content_wrapper_inner'));
parser.enableInStoryHighlighter($('#content_wrapper_inner'));