// ==UserScript==
// @id             MRH-ff.net-list
// @name           Fanfiction.net Story Parser
// @version        4.5.4
// @namespace      window
// @author         MRH
// @description    www.fanfiction.net story parser
// @updateURL      https://github.com/MRH4287/FFNetParser/raw/master/ffnetlist.user.js
// @include        http://www.fanfiction.net/*
// @include        http://www.fictionpress.com/*
// @include        https://www.fanfiction.net/*
// @include        https://www.fictionpress.com/*
// @run-at         document-end
// ==/UserScript==


/* Inludes */

if (typeof (jQuery) == "undefined")
{
    /*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
    //@ sourceMappingURL=jquery-1.10.2.min.map
    */
    (function (e, t)
    {
        var n, r, i = typeof t, o = e.location, a = e.document, s = a.documentElement, l = e.jQuery, u = e.$, c = {}, p = [], f = "1.10.2", d = p.concat, h = p.push, g = p.slice, m = p.indexOf, y = c.toString, v = c.hasOwnProperty, b = f.trim, x = function (e, t) { return new x.fn.init(e, t, r) }, w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = /\S+/g, C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, E = /^[\],:{}\s]*$/, S = /(?:^|:|,)(?:\s*\[)+/g, A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, D = /^-ms-/, L = /-([\da-z])/gi, H = function (e, t) { return t.toUpperCase() }, q = function (e) { (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready()) }, _ = function () { a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q)) }; x.fn = x.prototype = { jquery: f, constructor: x, init: function (e, n, r) { var i, o; if (!e) return this; if ("string" == typeof e) { if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e); if (i[1]) { if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), k.test(i[1]) && x.isPlainObject(n)) for (i in n) x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]); return this } if (o = a.getElementById(i[2]), o && o.parentNode) { if (o.id !== i[2]) return r.find(e); this.length = 1, this[0] = o } return this.context = a, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this)) }, selector: "", length: 0, toArray: function () { return g.call(this) }, get: function (e) { return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e] }, pushStack: function (e) { var t = x.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function (e, t) { return x.each(this, e, t) }, ready: function (e) { return x.ready.promise().done(e), this }, slice: function () { return this.pushStack(g.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (e) { var t = this.length, n = +e + (0 > e ? t : 0); return this.pushStack(n >= 0 && t > n ? [this[n]] : []) }, map: function (e) { return this.pushStack(x.map(this, function (t, n) { return e.call(t, n, t) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: h, sort: [].sort, splice: [].splice }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () { var e, n, r, i, o, a, s = arguments[0] || {}, l = 1, u = arguments.length, c = !1; for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l) ; u > l; l++) if (null != (o = arguments[l])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r)); return s }, x.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), noConflict: function (t) { return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x }, isReady: !1, readyWait: 1, holdReady: function (e) { e ? x.readyWait++ : x.ready(!0) }, ready: function (e) { if (e === !0 ? !--x.readyWait : !x.isReady) { if (!a.body) return setTimeout(x.ready); x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [x]), x.fn.trigger && x(a).trigger("ready").off("ready")) } }, isFunction: function (e) { return "function" === x.type(e) }, isArray: Array.isArray || function (e) { return "array" === x.type(e) }, isWindow: function (e) { return null != e && e == e.window }, isNumeric: function (e) { return !isNaN(parseFloat(e)) && isFinite(e) }, type: function (e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e }, isPlainObject: function (e) { var n; if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1; try { if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) return !1 } catch (r) { return !1 } if (x.support.ownLast) for (n in e) return v.call(e, n); for (n in e); return n === t || v.call(e, n) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, error: function (e) { throw Error(e) }, parseHTML: function (e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || a; var r = k.exec(e), i = !n && []; return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes)) }, parseJSON: function (n) { return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t) }, parseXML: function (n) { var r, i; if (!n || "string" != typeof n) return null; try { e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n)) } catch (o) { r = t } return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r }, noop: function () { }, globalEval: function (t) { t && x.trim(t) && (e.execScript || function (t) { e.eval.call(e, t) })(t) }, camelCase: function (e) { return e.replace(D, "ms-").replace(L, H) }, nodeName: function (e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function (e, t, n) { var r, i = 0, o = e.length, a = M(e); if (n) { if (a) { for (; o > i; i++) if (r = t.apply(e[i], n), r === !1) break } else for (i in e) if (r = t.apply(e[i], n), r === !1) break } else if (a) { for (; o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break; return e }, trim: b && !b.call("\ufeff\u00a0") ? function (e) { return null == e ? "" : b.call(e) } : function (e) { return null == e ? "" : (e + "").replace(C, "") }, makeArray: function (e, t) { var n = t || []; return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n }, inArray: function (e, t, n) { var r; if (t) { if (m) return m.call(t, e, n); for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n } return -1 }, merge: function (e, n) { var r = n.length, i = e.length, o = 0; if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++]; return e.length = i, e }, grep: function (e, t, n) { var r, i = [], o = 0, a = e.length; for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]); return i }, map: function (e, t, n) { var r, i = 0, o = e.length, a = M(e), s = []; if (a) for (; o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), null != r && (s[s.length] = r); return d.apply([], s) }, guid: 1, proxy: function (e, n) { var r, i, o; return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), i = function () { return e.apply(n || this, r.concat(g.call(arguments))) }, i.guid = e.guid = e.guid || x.guid++, i) : t }, access: function (e, n, r, i, o, a, s) { var l = 0, u = e.length, c = null == r; if ("object" === x.type(r)) { o = !0; for (l in r) x.access(e, n, l, r[l], !0, a, s) } else if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) { return c.call(x(e), n) })), n)) for (; u > l; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r))); return o ? e : c ? n.call(e) : u ? n(e[0], r) : a }, now: function () { return (new Date).getTime() }, swap: function (e, t, n, r) { var i, o, a = {}; for (o in t) a[o] = e.style[o], e.style[o] = t[o]; i = n.apply(e, r || []); for (o in t) e.style[o] = a[o]; return i } }), x.ready.promise = function (t) { if (!n) if (n = x.Deferred(), "complete" === a.readyState) setTimeout(x.ready); else if (a.addEventListener) a.addEventListener("DOMContentLoaded", q, !1), e.addEventListener("load", q, !1); else { a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q); var r = !1; try { r = null == e.frameElement && a.documentElement } catch (i) { } r && r.doScroll && function o() { if (!x.isReady) { try { r.doScroll("left") } catch (e) { return setTimeout(o, 50) } _(), x.ready() } }() } return n.promise(t) }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) { c["[object " + t + "]"] = t.toLowerCase() }); function M(e) { var t = e.length, n = x.type(e); return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e) } r = x(a), function (e, t) { var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date, w = e.document, T = 0, C = 0, N = st(), k = st(), E = st(), S = !1, A = function (e, t) { return e === t ? (S = !0, 0) : 0 }, j = typeof t, D = 1 << 31, L = {}.hasOwnProperty, H = [], q = H.pop, _ = H.push, M = H.push, O = H.slice, F = H.indexOf || function (e) { var t = 0, n = this.length; for (; n > t; t++) if (this[t] === e) return t; return -1 }, B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = R.replace("w", "w#"), $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]", I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)", z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), X = RegExp("^" + P + "*," + P + "*"), U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), V = RegExp(P + "*[+~]"), Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"), J = RegExp(I), G = RegExp("^" + W + "$"), Q = { ID: RegExp("^#(" + R + ")"), CLASS: RegExp("^\\.(" + R + ")"), TAG: RegExp("^(" + R.replace("w", "w*") + ")"), ATTR: RegExp("^" + $), PSEUDO: RegExp("^" + I), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"), bool: RegExp("^(?:" + B + ")$", "i"), needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i") }, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /^(?:input|select|textarea|button)$/i, tt = /^h\d$/i, nt = /'|\\/g, rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), it = function (e, t, n) { var r = "0x" + t - 65536; return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r) }; try { M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType } catch (ot) { M = { apply: H.length ? function (e, t) { _.apply(e, O.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function at(e, t, n, i) { var o, a, s, l, u, c, d, m, y, x; if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) return n; if (1 !== (l = t.nodeType) && 9 !== l) return []; if (h && !i) { if (o = Z.exec(e)) if (s = o[1]) { if (9 === l) { if (a = t.getElementById(s), !a || !a.parentNode) return n; if (a.id === s) return n.push(a), n } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) return n.push(a), n } else { if (o[2]) return M.apply(n, t.getElementsByTagName(e)), n; if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) return M.apply(n, t.getElementsByClassName(s)), n } if (r.qsa && (!g || !g.test(e))) { if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) { c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", u = c.length; while (u--) c[u] = m + yt(c[u]); y = V.test(e) && t.parentNode || t, x = c.join(",") } if (x) try { return M.apply(n, y.querySelectorAll(x)), n } catch (T) { } finally { d || t.removeAttribute("id") } } } return kt(e.replace(z, "$1"), t, n, i) } function st() { var e = []; function t(n, r) { return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r } return t } function lt(e) { return e[b] = !0, e } function ut(e) { var t = f.createElement("div"); try { return !!e(t) } catch (n) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function ct(e, t) { var n = e.split("|"), r = e.length; while (r--) o.attrHandle[n[r]] = t } function pt(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D); if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function ft(e) { return function (t) { var n = t.nodeName.toLowerCase(); return "input" === n && t.type === e } } function dt(e) { return function (t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } } function ht(e) { return lt(function (t) { return t = +t, lt(function (n, r) { var i, o = e([], n.length, t), a = o.length; while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i])) }) }) } s = at.isXML = function (e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, r = at.support = {}, p = at.setDocument = function (e) { var n = e ? e.ownerDocument || e : w, i = n.defaultView; return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function () { p() }), r.attributes = ut(function (e) { return e.className = "i", !e.getAttribute("className") }), r.getElementsByTagName = ut(function (e) { return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length }), r.getElementsByClassName = ut(function (e) { return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length }), r.getById = ut(function (e) { return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length }), r.getById ? (o.find.ID = function (e, t) { if (typeof t.getElementById !== j && h) { var n = t.getElementById(e); return n && n.parentNode ? [n] : [] } }, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { return e.getAttribute("id") === t } }) : (delete o.find.ID, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id"); return n && n.value === t } }), o.find.TAG = r.getElementsByTagName ? function (e, n) { return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, o.find.CLASS = r.getElementsByClassName && function (e, n) { return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function (e) { e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked") }), ut(function (e) { var t = n.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:") })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function (e) { r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I) }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, A = d.compareDocumentPosition ? function (e, t) { if (e === t) return S = !0, 0; var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t); return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1 } : function (e, t) { var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t]; if (e === t) return S = !0, 0; if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0; if (o === a) return pt(e, t); r = e; while (r = r.parentNode) s.unshift(r); r = t; while (r = r.parentNode) l.unshift(r); while (s[i] === l[i]) i++; return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0 }, n) : f }, at.matches = function (e, t) { return at(e, null, null, t) }, at.matchesSelector = function (e, t) { if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) try { var n = y.call(e, t); if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (i) { } return at(t, f, null, [e]).length > 0 }, at.contains = function (e, t) { return (e.ownerDocument || e) !== f && p(e), v(e, t) }, at.attr = function (e, n) { (e.ownerDocument || e) !== f && p(e); var i = o.attrHandle[n.toLowerCase()], a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t; return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a }, at.error = function (e) { throw Error("Syntax error, unrecognized expression: " + e) }, at.uniqueSort = function (e) { var t, n = [], i = 0, o = 0; if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) { while (t = e[o++]) t === e[o] && (i = n.push(o)); while (i--) e.splice(n[i], 1) } return e }, a = at.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) n += a(e) } else if (3 === i || 4 === i) return e.nodeValue } else for (; t = e[r]; r++) n += a(t); return n }, o = at.selectors = { cacheLength: 50, createPseudo: lt, match: Q, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e }, PSEUDO: function (e) { var n, r = !e[5] && e[2]; return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(rt, it).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = N[e + " "]; return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function (e) { return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "") }) }, ATTR: function (e, t, n) { return function (r) { var i = at.attr(r, e); return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0 } }, CHILD: function (e, t, n, r, i) { var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t; return 1 === r && 0 === i ? function (e) { return !!e.parentNode } : function (t, n, l) { var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s; if (m) { if (o) { while (g) { p = t; while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1; h = g = "only" === e && !h && "nextSibling" } return !0 } if (h = [a ? m.firstChild : m.lastChild], a && v) { c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d]; while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) { c[e] = [T, d, f]; break } } else if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) f = u[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0 } } }, PSEUDO: function (e, t) { var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e); return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function (e, n) { var i, o = r(e, t), a = o.length; while (a--) i = F.call(e, o[a]), e[i] = !(n[i] = o[a]) }) : function (e) { return r(e, 0, n) }) : r } }, pseudos: { not: lt(function (e) { var t = [], n = [], r = l(e.replace(z, "$1")); return r[b] ? lt(function (e, t, n, i) { var o, a = r(e, null, i, []), s = e.length; while (s--) (o = a[s]) && (e[s] = !(t[s] = o)) }) : function (e, i, o) { return t[0] = e, r(t, null, o, n), !n.pop() } }), has: lt(function (e) { return function (t) { return at(e, t).length > 0 } }), contains: lt(function (e) { return function (t) { return (t.textContent || t.innerText || a(t)).indexOf(e) > -1 } }), lang: lt(function (e) { return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(), function (t) { var n; do if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType); return !1 } }), target: function (t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function (e) { return e === d }, focus: function (e) { return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: function (e) { return e.disabled === !1 }, disabled: function (e) { return e.disabled === !0 }, checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1; return !0 }, parent: function (e) { return !o.pseudos.empty(e) }, header: function (e) { return tt.test(e.nodeName) }, input: function (e) { return et.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type) }, first: ht(function () { return [0] }), last: ht(function (e, t) { return [t - 1] }), eq: ht(function (e, t, n) { return [0 > n ? n + t : n] }), even: ht(function (e, t) { var n = 0; for (; t > n; n += 2) e.push(n); return e }), odd: ht(function (e, t) { var n = 1; for (; t > n; n += 2) e.push(n); return e }), lt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; --r >= 0;) e.push(r); return e }), gt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; t > ++r;) e.push(r); return e }) } }, o.pseudos.nth = o.pseudos.eq; for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) o.pseudos[n] = ft(n); for (n in { submit: !0, reset: !0 }) o.pseudos[n] = dt(n); function gt() { } gt.prototype = o.filters = o.pseudos, o.setFilters = new gt; function mt(e, t) { var n, r, i, a, s, l, u, c = k[e + " "]; if (c) return t ? 0 : c.slice(0); s = e, l = [], u = o.preFilter; while (s) { (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({ value: n, type: r[0].replace(z, " ") }), s = s.slice(n.length)); for (a in o.filter) !(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({ value: n, type: a, matches: r }), s = s.slice(n.length)); if (!n) break } return t ? s.length : s ? at.error(e) : k(e, l).slice(0) } function yt(e) { var t = 0, n = e.length, r = ""; for (; n > t; t++) r += e[t].value; return r } function vt(e, t, n) { var r = t.dir, o = n && "parentNode" === r, a = C++; return t.first ? function (t, n, i) { while (t = t[r]) if (1 === t.nodeType || o) return e(t, n, i) } : function (t, n, s) { var l, u, c, p = T + " " + a; if (s) { while (t = t[r]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0 } else while (t = t[r]) if (1 === t.nodeType || o) if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) { if ((l = u[1]) === !0 || l === i) return l === !0 } else if (u = c[r] = [p], u[1] = e(t, n, s) || i, u[1] === !0) return !0 } } function bt(e) { return e.length > 1 ? function (t, n, r) { var i = e.length; while (i--) if (!e[i](t, n, r)) return !1; return !0 } : e[0] } function xt(e, t, n, r, i) { var o, a = [], s = 0, l = e.length, u = null != t; for (; l > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s)); return a } function wt(e, t, n, r, i, o) { return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function (o, a, s, l) { var u, c, p, f = [], d = [], h = a.length, g = o || Nt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : xt(g, f, e, s, l), y = n ? i || (o ? e : h || r) ? [] : a : m; if (n && n(m, y, s, l), r) { u = xt(y, d), r(u, [], s, l), c = u.length; while (c--) (p = u[c]) && (y[d[c]] = !(m[d[c]] = p)) } if (o) { if (i || e) { if (i) { u = [], c = y.length; while (c--) (p = y[c]) && u.push(m[c] = p); i(null, y = [], u, l) } c = y.length; while (c--) (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p)) } } else y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y) }) } function Tt(e) { var t, n, r, i = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], l = a ? 1 : 0, c = vt(function (e) { return e === t }, s, !0), p = vt(function (e) { return F.call(t, e) > -1 }, s, !0), f = [function (e, n, r) { return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r)) }]; for (; i > l; l++) if (n = o.relative[e[l].type]) f = [vt(bt(f), n)]; else { if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) { for (r = ++l; i > r; r++) if (o.relative[e[r].type]) break; return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({ value: " " === e[l - 2].type ? "*" : "" })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e)) } f.push(n) } return bt(f) } function Ct(e, t) { var n = 0, r = t.length > 0, a = e.length > 0, s = function (s, l, c, p, d) { var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, C = u, N = s || a && o.find.TAG("*", d && l.parentNode || l), k = T += null == C ? 1 : Math.random() || .1; for (w && (u = l !== f && l, i = n) ; null != (h = N[b]) ; b++) { if (a && h) { g = 0; while (m = e[g++]) if (m(h, l, c)) { p.push(h); break } w && (T = k, i = ++n) } r && ((h = !m && h) && v--, s && x.push(h)) } if (v += b, r && b !== v) { g = 0; while (m = t[g++]) m(x, y, l, c); if (s) { if (v > 0) while (b--) x[b] || y[b] || (y[b] = q.call(p)); y = xt(y) } M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p) } return w && (T = k, u = C), x }; return r ? lt(s) : s } l = at.compile = function (e, t) { var n, r = [], i = [], o = E[e + " "]; if (!o) { t || (t = mt(e)), n = t.length; while (n--) o = Tt(t[n]), o[b] ? r.push(o) : i.push(o); o = E(e, Ct(i, r)) } return o }; function Nt(e, t, n) { var r = 0, i = t.length; for (; i > r; r++) at(e, t[r], n); return n } function kt(e, t, n, i) { var a, s, u, c, p, f = mt(e); if (!i && 1 === f.length) { if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) { if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) return n; e = e.slice(s.shift().value.length) } a = Q.needsContext.test(e) ? 0 : s.length; while (a--) { if (u = s[a], o.relative[c = u.type]) break; if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) { if (s.splice(a, 1), e = i.length && yt(s), !e) return M.apply(n, i), n; break } } } return l(e, f)(i, t, !h, n, V.test(e)), n } r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function (e) { return 1 & e.compareDocumentPosition(f.createElement("div")) }), ut(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || ct("type|href|height|width", function (e, n, r) { return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2) }), r.attributes && ut(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || ct("value", function (e, n, r) { return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue }), ut(function (e) { return null == e.getAttribute("disabled") }) || ct(B, function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains }(e); var O = {}; function F(e) { var t = O[e] = {}; return x.each(e.match(T) || [], function (e, n) { t[n] = !0 }), t } x.Callbacks = function (e) { e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e); var n, r, i, o, a, s, l = [], u = !e.once && [], c = function (t) { for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) { r = !1; break } n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable()) }, p = { add: function () { if (l) { var t = l.length; (function i(t) { x.each(t, function (t, n) { var r = x.type(n); "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n) }) })(arguments), n ? o = l.length : r && (s = t, c(r)) } return this }, remove: function () { return l && x.each(arguments, function (e, t) { var r; while ((r = x.inArray(t, l, r)) > -1) l.splice(r, 1), n && (o >= r && o--, a >= r && a--) }), this }, has: function (e) { return e ? x.inArray(e, l) > -1 : !(!l || !l.length) }, empty: function () { return l = [], o = 0, this }, disable: function () { return l = u = r = t, this }, disabled: function () { return !l }, lock: function () { return u = t, r || p.disable(), this }, locked: function () { return !u }, fireWith: function (e, t) { return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this }, fire: function () { return p.fireWith(this, arguments), this }, fired: function () { return !!i } }; return p }, x.extend({ Deferred: function (e) { var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]], n = "pending", r = { state: function () { return n }, always: function () { return i.done(arguments).fail(arguments), this }, then: function () { var e = arguments; return x.Deferred(function (n) { x.each(t, function (t, o) { var a = o[0], s = x.isFunction(e[t]) && e[t]; i[o[1]](function () { var e = s && s.apply(this, arguments); e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments) }) }), e = null }).promise() }, promise: function (e) { return null != e ? x.extend(e, r) : r } }, i = {}; return r.pipe = r.then, x.each(t, function (e, o) { var a = o[2], s = o[3]; r[o[1]] = a.add, s && a.add(function () { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () { return i[o[0] + "With"](this === i ? r : this, arguments), this }, i[o[0] + "With"] = a.fireWith }), r.promise(i), e && e.call(i, i), i }, when: function (e) { var t = 0, n = g.call(arguments), r = n.length, i = 1 !== r || e && x.isFunction(e.promise) ? r : 0, o = 1 === i ? e : x.Deferred(), a = function (e, t, n) { return function (r) { t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n) } }, s, l, u; if (r > 1) for (s = Array(r), l = Array(r), u = Array(r) ; r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i; return i || o.resolveWith(u, n), o.promise() } }), x.support = function (t)
        {
            var n, r, o, s, l, u, c, p, f, d = a.createElement("div"); if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t; s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled; try { delete d.test } catch (h) { t.deleteExpando = !1 } o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function () { t.noCloneEvent = !1 }), d.cloneNode(!0).click()); for (f in { submit: !0, change: !0, focusin: !0 }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1; d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip; for (f in x(t)) break; return t.ownLast = "0" !== f, x(function () { var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", l = a.getElementsByTagName("body")[0]; l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l, null != l.style.zoom ? { zoom: 1 } : {}, function () { t.boxSizing = 4 === d.offsetWidth }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || { width: "4px" }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null) }), n = s = l = u = r = o = null, t
        }({}); var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, P = /([A-Z])/g; function R(e, n, r, i) { if (x.acceptData(e)) { var o, a, s = x.expando, l = e.nodeType, u = l ? x.cache : e, c = l ? e[s] : e[s] && s; if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : { toJSON: x.noop }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o } } function W(e, t, n) { if (x.acceptData(e)) { var r, i, o = e.nodeType, a = o ? x.cache : e, s = o ? e[x.expando] : x.expando; if (a[s]) { if (t && (r = n ? a[s] : a[s].data)) { x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length; while (i--) delete r[t[i]]; if (n ? !I(r) : !x.isEmptyObject(r)) return } (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null) } } } x.extend({ cache: {}, noData: { applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (e) { return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e) }, data: function (e, t, n) { return R(e, t, n) }, removeData: function (e, t) { return W(e, t) }, _data: function (e, t, n) { return R(e, t, n, !0) }, _removeData: function (e, t) { return W(e, t, !0) }, acceptData: function (e) { if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1; var t = e.nodeName && x.noData[e.nodeName.toLowerCase()]; return !t || t !== !0 && e.getAttribute("classid") === t } }), x.fn.extend({ data: function (e, n) { var r, i, o = null, a = 0, s = this[0]; if (e === t) { if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) { for (r = s.attributes; r.length > a; a++) i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s, i, o[i])); x._data(s, "parsedAttrs", !0) } return o } return "object" == typeof e ? this.each(function () { x.data(this, e) }) : arguments.length > 1 ? this.each(function () { x.data(this, e, n) }) : s ? $(s, e, x.data(s, e)) : null }, removeData: function (e) { return this.each(function () { x.removeData(this, e) }) } }); function $(e, n, r) { if (r === t && 1 === e.nodeType) { var i = "data-" + n.replace(P, "-$1").toLowerCase(); if (r = e.getAttribute(i), "string" == typeof r) { try { r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r } catch (o) { } x.data(e, n, r) } else r = t } return r } function I(e) { var t; for (t in e) if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) return !1; return !0 } x.extend({ queue: function (e, n, r) { var i; return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), i || []) : t }, dequeue: function (e, t) { t = t || "fx"; var n = x.queue(e, t), r = n.length, i = n.shift(), o = x._queueHooks(e, t), a = function () { x.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return x._data(e, n) || x._data(e, n, { empty: x.Callbacks("once memory").add(function () { x._removeData(e, t + "queue"), x._removeData(e, n) }) }) } }), x.fn.extend({ queue: function (e, n) { var r = 2; return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function () { var t = x.queue(this, e, n); x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e) }) }, dequeue: function (e) { return this.each(function () { x.dequeue(this, e) }) }, delay: function (e, t) { return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) { var r = setTimeout(t, e); n.stop = function () { clearTimeout(r) } }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, n) { var r, i = 1, o = x.Deferred(), a = this, s = this.length, l = function () { --i || o.resolveWith(a, [a]) }; "string" != typeof e && (n = e, e = t), e = e || "fx"; while (s--) r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l)); return l(), o.promise(n) } }); var z, X, U = /[\t\r\n\f]/g, V = /\r/g, Y = /^(?:input|select|textarea|button|object)$/i, J = /^(?:a|area)$/i, G = /^(?:checked|selected)$/i, Q = x.support.getSetAttribute, K = x.support.input; x.fn.extend({ attr: function (e, t) { return x.access(this, x.attr, e, t, arguments.length > 1) }, removeAttr: function (e) { return this.each(function () { x.removeAttr(this, e) }) }, prop: function (e, t) { return x.access(this, x.prop, e, t, arguments.length > 1) }, removeProp: function (e) { return e = x.propFix[e] || e, this.each(function () { try { this[e] = t, delete this[e] } catch (n) { } }) }, addClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).addClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) { o = 0; while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " "); n.className = x.trim(r) } return this }, removeClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).removeClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) { o = 0; while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " "); n.className = e ? x.trim(r) : "" } return this }, toggleClass: function (e, t) { var n = typeof e; return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function (n) { x(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function () { if ("string" === n) { var t, r = 0, o = x(this), a = e.match(T) || []; while (t = a[r++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t) } else (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "") }) }, hasClass: function (e) { var t = " " + e + " ", n = 0, r = this.length; for (; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) return !0; return !1 }, val: function (e) { var n, r, i, o = this[0]; { if (arguments.length) return i = x.isFunction(e), this.each(function (n) { var o; 1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function (e) { return null == e ? "" : e + "" })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o)) }); if (o) return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V, "") : null == n ? "" : n) } } }), x.extend({ valHooks: { option: { get: function (e) { var t = x.find.attr(e, "value"); return null != t ? t : e.text } }, select: { get: function (e) { var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; for (; s > l; l++) if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) { if (t = x(n).val(), o) return t; a.push(t) } return a }, set: function (e, t) { var n, r, i = e.options, o = x.makeArray(t), a = i.length; while (a--) r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0); return n || (e.selectedIndex = -1), o } } }, attr: function (e, n, r) { var o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : (x.removeAttr(e, n), t)) }, removeAttr: function (e, t) { var n, r, i = 0, o = t && t.match(T); if (o && 1 === e.nodeType) while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), e.removeAttribute(Q ? n : r) }, attrHooks: { type: { set: function (e, t) { if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, propFix: { "for": "htmlFor", "class": "className" }, prop: function (e, n, r) { var i, o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n] }, propHooks: { tabIndex: { get: function (e) { var t = x.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1 } } } }), X = { set: function (e, t, n) { return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, n } }, x.each(x.expr.match.bool.source.match(/\w+/g), function (e, n) { var r = x.expr.attrHandle[n] || x.find.attr; x.expr.attrHandle[n] = K && Q || !G.test(n) ? function (e, n, i) { var o = x.expr.attrHandle[n], a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null; return x.expr.attrHandle[n] = o, a } : function (e, n, r) { return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null } }), K && Q || (x.attrHooks.value = { set: function (e, n, r) { return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r) } }), Q || (z = { set: function (e, n, r) { var i = e.getAttributeNode(r); return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t } }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null }, x.valHooks.button = { get: function (e, n) { var r = e.getAttributeNode(n); return r && r.specified ? r.value : t }, set: z.set }, x.attrHooks.contenteditable = { set: function (e, t, n) { z.set(e, "" === t ? !1 : t, n) } }, x.each(["width", "height"], function (e, n) { x.attrHooks[n] = { set: function (e, r) { return "" === r ? (e.setAttribute(n, "auto"), r) : t } } })), x.support.hrefNormalized || x.each(["href", "src"], function (e, t) { x.propHooks[t] = { get: function (e) { return e.getAttribute(t, 4) } } }), x.support.style || (x.attrHooks.style = { get: function (e) { return e.style.cssText || t }, set: function (e, t) { return e.style.cssText = t + "" } }), x.support.optSelected || (x.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null } }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { x.propFix[this.toLowerCase()] = this }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio", "checkbox"], function () { x.valHooks[this] = { set: function (e, n) { return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t } }, x.support.checkOn || (x.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }); var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/; function it() { return !0 } function ot() { return !1 } function at() { try { return a.activeElement } catch (e) { } } x.event = { global: {}, add: function (e, n, r, o, a) { var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e); if (v) { r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function (e) { return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments) }, f.elem = e), n = (n || "").match(T) || [""], u = n.length; while (u--) s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({ type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && x.expr.match.needsContext.test(a), namespace: m.join(".") }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), x.event.global[g] = !0); e = null } }, remove: function (e, t, n, r, i) { var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e); if (m && (c = m.events)) { t = (t || "").match(T) || [""], u = t.length; while (u--) if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) { p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a)); l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), delete c[d]) } else for (d in c) x.event.remove(e, d + t[u], n, r, !0); x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events")) } }, trigger: function (n, r, i, o) { var s, l, u, c, p, f, d, h = [i || a], g = v.call(n, "type") ? n.type : n, m = v.call(n, "namespace") ? n.namespace.split(".") : []; if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r, [n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) { if (!o && !p.noBubble && !x.isWindow(i)) { for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode) ; u; u = u.parentNode) h.push(u), f = u; f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e) } d = 0; while ((u = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault(); if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) { f = i[l], f && (i[l] = null), x.event.triggered = g; try { i[g]() } catch (y) { } x.event.triggered = t, f && (i[l] = f) } return n.result } }, dispatch: function (e) { e = x.event.fix(e); var n, r, i, o, a, s = [], l = g.call(arguments), u = (x._data(this, "events") || {})[e.type] || [], c = x.event.special[e.type] || {}; if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) { s = x.event.handlers.call(this, e, u), n = 0; while ((o = s[n++]) && !e.isPropagationStopped()) { e.currentTarget = o.elem, a = 0; while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, e), e.result } }, handlers: function (e, n) { var r, i, o, a, s = [], l = n.delegateCount, u = e.target; if (l && u.nodeType && (!e.button || "click" !== e.type)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) { for (o = [], a = 0; l > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [u]).length), o[r] && o.push(i); o.length && s.push({ elem: u, handlers: o }) } return n.length > l && s.push({ elem: this, handlers: n.slice(l) }), s }, fix: function (e) { if (e[x.expando]) return e; var t, n, r, i = e.type, o = e, s = this.fixHooks[i]; s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length; while (t--) n = r[t], e[n] = o[n]; return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) { var r, i, o, s = n.button, l = n.fromElement; return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e } }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== at() && this.focus) try { return this.focus(), !1 } catch (e) { } }, delegateType: "focusin" }, blur: { trigger: function () { return this === at() && this.blur ? (this.blur(), !1) : t }, delegateType: "focusout" }, click: { trigger: function () { return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t }, _default: function (e) { return x.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function (e) { e.result !== t && (e.originalEvent.returnValue = e.result) } } }, simulate: function (e, t, n, r) { var i = x.extend(new x.Event, n, { type: e, isSimulated: !0, originalEvent: {} }); r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault() } }, x.removeEvent = a.removeEventListener ? function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) } : function (e, t, n) { var r = "on" + t; e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n)) }, x.Event = function (e, n) { return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e, n) }, x.Event.prototype = { isDefaultPrevented: ot, isPropagationStopped: ot, isImmediatePropagationStopped: ot, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1) }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = it, this.stopPropagation() } }, x.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) { x.event.special[e] = { delegateType: t, bindType: t, handle: function (e) { var n, r = this, i = e.relatedTarget, o = e.handleObj; return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n } } }), x.support.submitBubbles || (x.event.special.submit = { setup: function () { return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function (e) { var n = e.target, r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t; r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function (e) { e._submit_bubble = !0 }), x._data(r, "submitBubbles", !0)) }), t) }, postDispatch: function (e) { e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0)) }, teardown: function () { return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t) } }), x.support.changeBubbles || (x.event.special.change = { setup: function () { return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function (e) { "checked" === e.originalEvent.propertyName && (this._just_changed = !0) }), x.event.add(this, "click._change", function (e) { this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0) })), !1) : (x.event.add(this, "beforeactivate._change", function (e) { var t = e.target; Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function (e) { !this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0) }), x._data(t, "changeBubbles", !0)) }), t) }, handle: function (e) { var n = e.target; return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t }, teardown: function () { return x.event.remove(this, "._change"), !Z.test(this.nodeName) } }), x.support.focusinBubbles || x.each({ focus: "focusin", blur: "focusout" }, function (e, t) { var n = 0, r = function (e) { x.event.simulate(t, e.target, x.event.fix(e), !0) }; x.event.special[t] = { setup: function () { 0 === n++ && a.addEventListener(e, r, !0) }, teardown: function () { 0 === --n && a.removeEventListener(e, r, !0) } } }), x.fn.extend({ on: function (e, n, r, i, o) { var a, s; if ("object" == typeof e) { "string" != typeof n && (r = r || n, n = t); for (a in e) this.on(a, n, r, e[a], o); return this } if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this; return 1 === o && (s = i, i = function (e) { return x().off(e), s.apply(this, arguments) }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function () { x.event.add(this, e, i, r, n) }) }, one: function (e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function (e, n, r) { var i, o; if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this; if ("object" == typeof e) { for (o in e) this.off(o, n, e[o]); return this } return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () { x.event.remove(this, e, r, n) }) }, trigger: function (e, t) { return this.each(function () { x.event.trigger(e, t, this) }) }, triggerHandler: function (e, n) { var r = this[0]; return r ? x.event.trigger(e, n, r, !0) : t } }); var st = /^.[^:#\[\.,]*$/, lt = /^(?:parents|prev(?:Until|All))/, ut = x.expr.match.needsContext, ct = { children: !0, contents: !0, next: !0, prev: !0 }; x.fn.extend({ find: function (e) { var t, n = [], r = this, i = r.length; if ("string" != typeof e) return this.pushStack(x(e).filter(function () { for (t = 0; i > t; t++) if (x.contains(r[t], this)) return !0 })); for (t = 0; i > t; t++) x.find(e, r[t], n); return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n }, has: function (e) { var t, n = x(e, this), r = n.length; return this.filter(function () { for (t = 0; r > t; t++) if (x.contains(this, n[t])) return !0 }) }, not: function (e) { return this.pushStack(ft(this, e || [], !0)) }, filter: function (e) { return this.pushStack(ft(this, e || [], !1)) }, is: function (e) { return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0; for (; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) { n = o.push(n); break } return this.pushStack(o.length > 1 ? x.unique(o) : o) }, index: function (e) { return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e), r = x.merge(this.get(), n); return this.pushStack(x.unique(r)) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }); function pt(e, t) { do e = e[t]; while (e && 1 !== e.nodeType); return e } x.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return x.dir(e, "parentNode") }, parentsUntil: function (e, t, n) { return x.dir(e, "parentNode", n) }, next: function (e) { return pt(e, "nextSibling") }, prev: function (e) { return pt(e, "previousSibling") }, nextAll: function (e) { return x.dir(e, "nextSibling") }, prevAll: function (e) { return x.dir(e, "previousSibling") }, nextUntil: function (e, t, n) { return x.dir(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return x.dir(e, "previousSibling", n) }, siblings: function (e) { return x.sibling((e.parentNode || {}).firstChild, e) }, children: function (e) { return x.sibling(e.firstChild) }, contents: function (e) { return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes) } }, function (e, t) { x.fn[e] = function (n, r) { var i = x.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i) } }), x.extend({ filter: function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) { return 1 === e.nodeType })) }, dir: function (e, n, r) { var i = [], o = e[n]; while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) 1 === o.nodeType && i.push(o), o = o[n]; return i }, sibling: function (e, t) { var n = []; for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }); function ft(e, t, n) { if (x.isFunction(t)) return x.grep(e, function (e, r) { return !!t.call(e, r, e) !== n }); if (t.nodeType) return x.grep(e, function (e) { return e === t !== n }); if ("string" == typeof t) { if (st.test(t)) return x.filter(t, e, n); t = x.filter(t, e) } return x.grep(e, function (e) { return x.inArray(e, t) >= 0 !== n }) } function dt(e) { var t = ht.split("|"), n = e.createDocumentFragment(); if (n.createElement) while (t.length) n.createElement(t.pop()); return n } var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Ct = /^(?:checkbox|radio)$/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, jt = dt(a), Dt = jt.appendChild(a.createElement("div")); At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({ text: function (e) { return x.access(this, function (e) { return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e)) }, null, e, arguments.length) }, append: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.appendChild(e) } }) }, prepend: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function (e, t) { var n, r = e ? x.filter(e, this) : this, i = 0; for (; null != (n = r[i]) ; i++) t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), n.parentNode.removeChild(n)); return this }, empty: function () { var e, t = 0; for (; null != (e = this[t]) ; t++) { 1 === e.nodeType && x.cleanData(Ft(e, !1)); while (e.firstChild) e.removeChild(e.firstChild); e.options && x.nodeName(e, "select") && (e.options.length = 0) } return this }, clone: function (e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () { return x.clone(this, e, t) }) }, html: function (e) { return x.access(this, function (e) { var n = this[0] || {}, r = 0, i = this.length; if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t; if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) { e = e.replace(vt, "<$1></$2>"); try { for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), n.innerHTML = e); n = 0 } catch (o) { } } n && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var e = x.map(this, function (e) { return [e.nextSibling, e.parentNode] }), t = 0; return this.domManip(arguments, function (n) { var r = e[t++], i = e[t++]; i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r)) }, !0), t ? this : this.remove() }, detach: function (e) { return this.remove(e, !0) }, domManip: function (e, t, n) { e = d.apply([], e); var r, i, o, a, s, l, u = 0, c = this.length, p = this, f = c - 1, h = e[0], g = x.isFunction(h); if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) return this.each(function (r) { var i = p.eq(r); g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n) }); if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) { for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) i = l, u !== f && (i = x.clone(i, !0, !0), o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u); if (o) for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) i = a[u], kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, ""))); l = r = null } return this } }); function Lt(e, t) { return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e } function Ht(e) { return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e } function qt(e) { var t = Et.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e } function _t(e, t) { var n, r = 0; for (; null != (n = e[r]) ; r++) x._data(n, "globalEval", !t || x._data(t[r], "globalEval")) } function Mt(e, t) { if (1 === t.nodeType && x.hasData(e)) { var n, r, i, o = x._data(e), a = x._data(t, o), s = o.events; if (s) { delete a.handle, a.events = {}; for (n in s) for (r = 0, i = s[n].length; i > r; r++) x.event.add(t, n, s[n][r]) } a.data && (a.data = x.extend({}, a.data)) } } function Ot(e, t) { var n, r, i; if (1 === t.nodeType) { if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) { i = x._data(t); for (r in i.events) x.removeEvent(t, r, i.handle); t.removeAttribute(x.expando) } "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue) } } x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) { x.fn[e] = function (e) { var n, r = 0, i = [], o = x(e), a = o.length - 1; for (; a >= r; r++) n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get()); return this.pushStack(i) } }); function Ft(e, n) { var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t; if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]) ; a++) !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n)); return n === t || n && x.nodeName(e, n) ? x.merge([e], s) : s } function Bt(e) { Ct.test(e.type) && (e.defaultChecked = e.checked) } x.extend({
            clone: function (e, t, n) { var r, i, o, a, s, l = x.contains(e.ownerDocument, e); if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]) ; ++a) r[a] && Ot(i, r[a]); if (t) if (n) for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]) ; a++) Mt(i, r[a]); else Mt(e, o); return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, o }, buildFragment: function (e, t, n, r) { var i, o, a, s, l, u, c, p = e.length, f = dt(t), d = [], h = 0; for (; p > h; h++) if (o = e[h], o || 0 === o) if ("object" === x.type(o)) x.merge(d, o.nodeType ? [o] : o); else if (wt.test(o)) { s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0]; while (i--) s = s.lastChild; if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) { o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; while (i--) x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u) } x.merge(d, s.childNodes), s.textContent = ""; while (s.firstChild) s.removeChild(s.firstChild); s = f.lastChild } else d.push(t.createTextNode(o)); s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0; while (o = d[h++]) if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), s = Ft(f.appendChild(o), "script"), a && _t(s), n)) { i = 0; while (o = s[i++]) kt.test(o.type || "") && n.push(o) } return s = null, f }, cleanData: function (e, t)
            {
                var n, r, o, a, s = 0, l = x.expando, u = x.cache, c = x.support.deleteExpando, f = x.event.special; for (; null != (n = e[s]) ; s++) if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o]))
                {
                    if (a.events) for (r in a.events) f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
                    u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o))
                }
            }, _evalUrl: function (e) { return x.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }
        }), x.fn.extend({ wrapAll: function (e) { if (x.isFunction(e)) return this.each(function (t) { x(this).wrapAll(e.call(this, t)) }); if (this[0]) { var t = x(e, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild; return e }).append(this) } return this }, wrapInner: function (e) { return x.isFunction(e) ? this.each(function (t) { x(this).wrapInner(e.call(this, t)) }) : this.each(function () { var t = x(this), n = t.contents(); n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function (e) { var t = x.isFunction(e); return this.each(function (n) { x(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function () { return this.parent().each(function () { x.nodeName(this, "body") || x(this).replaceWith(this.childNodes) }).end() } }); var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + w + ")(.*)$", "i"), Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + w + ")", "i"), Gt = { BODY: "block" }, Qt = { position: "absolute", visibility: "hidden", display: "block" }, Kt = { letterSpacing: 0, fontWeight: 400 }, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"]; function tn(e, t) { if (t in e) return t; var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length; while (i--) if (t = en[i] + n, t in e) return t; return r } function nn(e, t) { return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e) } function rn(e, t) { var n, r, i, o = [], a = 0, s = e.length; for (; s > a; a++) r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display")))); for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none")); return e } x.fn.extend({ css: function (e, n) { return x.access(this, function (e, n, r) { var i, o, a = {}, s = 0; if (x.isArray(n)) { for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = x.css(e, n[s], !1, o); return a } return r !== t ? x.style(e, n, r) : x.css(e, n) }, e, n, arguments.length > 1) }, show: function () { return rn(this, !0) }, hide: function () { return rn(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { nn(this) ? x(this).show() : x(this).hide() }) } }), x.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Wt(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": x.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (e, n, r, i) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var o, a, s, l = x.camelCase(n), u = e.style; if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n]; if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try { u[n] = r } catch (c) { } } }, css: function (e, n, r, i) { var o, a, s, l = x.camelCase(n); return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a } }), e.getComputedStyle ? (Rt = function (t) { return e.getComputedStyle(t, null) }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s.getPropertyValue(n) || s[n] : t, u = e.style; return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l }) : a.documentElement.currentStyle && (Rt = function (e) { return e.currentStyle }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s[n] : t, u = e.style; return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l }); function on(e, t, n) { var r = Vt.exec(t); return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t } function an(e, t, n, r, i) { var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; for (; 4 > o; o += 2) "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i))); return a } function sn(e, t, n) { var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o); if (0 >= i || null == i) { if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i; r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0 } return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px" } function ln(e) { var t = a, n = Gt[e]; return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n } function un(e, t) { var n = x(t.createElement(e)).appendTo(t.body), r = x.css(n[0], "display"); return n.remove(), r } x.each(["height", "width"], function (e, n) { x.cssHooks[n] = { get: function (e, r, i) { return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function () { return sn(e, n, i) }) : sn(e, n, i) : t }, set: function (e, t, r) { var i = r && Rt(e); return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0) } } }), x.support.opacity || (x.cssHooks.opacity = { get: function (e, t) { return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "" }, set: function (e, t) { var n = e.style, r = e.currentStyle, i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || ""; n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i) } }), x(function () { x.support.reliableMarginRight || (x.cssHooks.marginRight = { get: function (e, n) { return n ? x.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"]) : t } }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, n) { x.cssHooks[n] = { get: function (e, r) { return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t } } }) }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) { return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display")) }, x.expr.filters.visible = function (e) { return !x.expr.filters.hidden(e) }), x.each({ margin: "", padding: "", border: "Width" }, function (e, t) { x.cssHooks[e + t] = { expand: function (n) { var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; for (; 4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0]; return i } }, Ut.test(e) || (x.cssHooks[e + t].set = on) }); var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i; x.fn.extend({ serialize: function () { return x.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = x.prop(this, "elements"); return e ? x.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e)) }).map(function (e, t) { var n = x(this).val(); return null == n ? null : x.isArray(n) ? x.map(n, function (e) { return { name: t.name, value: e.replace(fn, "\r\n") } }) : { name: t.name, value: n.replace(fn, "\r\n") } }).get() } }), x.param = function (e, n) { var r, i = [], o = function (e, t) { t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () { o(this.name, this.value) }); else for (r in e) gn(r, e[r], n, o); return i.join("&").replace(cn, "+") }; function gn(e, t, n, r) { var i; if (x.isArray(t)) x.each(t, function (t, i) { n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) }); else if (n || "object" !== x.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r) } x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) { x.fn[t] = function (e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), x.fn.extend({ hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } }); var mn, yn, vn = x.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = x.fn.load, An = {}, jn = {}, Dn = "*/".concat("*"); try { yn = o.href } catch (Ln) { yn = a.createElement("a"), yn.href = "", yn = yn.href } mn = En.exec(yn.toLowerCase()) || []; function Hn(e) { return function (t, n) { "string" != typeof t && (n = t, t = "*"); var r, i = 0, o = t.toLowerCase().match(T) || []; if (x.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } } function qn(e, n, r, i) { var o = {}, a = e === jn; function s(l) { var u; return o[l] = !0, x.each(e[l] || [], function (e, l) { var c = l(n, r, i); return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1) }), u } return s(n.dataTypes[0]) || !o["*"] && s("*") } function _n(e, n) { var r, i, o = x.ajaxSettings.flatOptions || {}; for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]); return r && x.extend(!0, e, r), e } x.fn.load = function (e, n, r) { if ("string" != typeof e && Sn) return Sn.apply(this, arguments); var i, o, a, s = this, l = e.indexOf(" "); return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({ url: e, type: a, dataType: "html", data: n }).done(function (e) { o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e) }).complete(r && function (e, t) { s.each(r, o || [e.responseText, t, e]) }), this }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { x.fn[t] = function (e) { return this.on(t, e) } }), x.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: yn, type: "GET", isLocal: Cn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (e, t) { return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e) }, ajaxPrefilter: Hn(An), ajaxTransport: Hn(jn), ajax: function (e, n) { "object" == typeof e && (n = e, e = t), n = n || {}; var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event, h = x.Deferred(), g = x.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, b = 0, w = "canceled", C = { readyState: 0, getResponseHeader: function (e) { var t; if (2 === b) { if (!c) { c = {}; while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2] } t = c[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function () { return 2 === b ? a : null }, setRequestHeader: function (e, t) { var n = e.toLowerCase(); return b || (e = v[n] = v[n] || e, y[e] = t), this }, overrideMimeType: function (e) { return b || (p.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (2 > b) for (t in e) m[t] = [m[t], e[t]]; else C.always(e[C.status]); return this }, abort: function (e) { var t = e || w; return u && u.abort(t), k(0, t), this } }; if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), qn(An, p, n, C), 2 === b) return C; l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]); for (i in p.headers) C.setRequestHeader(i, p.headers[i]); if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) return C.abort(); w = "abort"; for (i in { success: 1, error: 1, complete: 1 }) C[i](p[i]); if (u = qn(jn, p, n, C)) { C.readyState = 1, l && d.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (s = setTimeout(function () { C.abort("timeout") }, p.timeout)); try { b = 1, u.send(y, k) } catch (N) { if (!(2 > b)) throw N; k(-1, N) } } else k(-1, "No Transport"); function k(e, n, r, i) { var c, y, v, w, T, N = n; 2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]), g.fireWith(f, [C, N]), l && (d.trigger("ajaxComplete", [C, p]), --x.active || x.event.trigger("ajaxStop"))) } return C }, getJSON: function (e, t, n) { return x.get(e, t, n, "json") }, getScript: function (e, n) { return x.get(e, t, n, "script") } }), x.each(["get", "post"], function (e, n) { x[n] = function (e, r, i, o) { return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({ url: e, type: n, dataType: o, data: r, success: i }) } }); function Mn(e, n, r) { var i, o, a, s, l = e.contents, u = e.dataTypes; while ("*" === u[0]) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type")); if (o) for (s in l) if (l[s] && l[s].test(o)) { u.unshift(s); break } if (u[0] in r) a = u[0]; else { for (s in r) { if (!u[0] || e.converters[s + " " + u[0]]) { a = s; break } i || (i = s) } a = a || i } return a ? (a !== u[0] && u.unshift(a), r[a]) : t } function On(e, t, n, r) { var i, o, a, s, l, u = {}, c = e.dataTypes.slice(); if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a]; o = c.shift(); while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) { if (a = u[l + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) { a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1])); break } if (a !== !0) if (a && e["throws"]) t = a(t); else try { t = a(t) } catch (p) { return { state: "parsererror", error: a ? p : "No conversion from " + l + " to " + o } } } return { state: "success", data: t } } x.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (e) { return x.globalEval(e), e } } }), x.ajaxPrefilter("script", function (e) { e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1) }), x.ajaxTransport("script", function (e) { if (e.crossDomain) { var n, r = a.head || x("head")[0] || a.documentElement; return { send: function (t, i) { n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) { (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success")) }, r.insertBefore(n, r.firstChild) }, abort: function () { n && n.onload(t, !0) } } } }); var Fn = [], Bn = /(=)\?(?=&|$)|\?\?/; x.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = Fn.pop() || x.expando + "_" + vn++; return this[e] = !0, e } }), x.ajaxPrefilter("json jsonp", function (n, r, i) { var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data"); return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () { return s || x.error(o + " was not called"), s[0] }, n.dataTypes[0] = "json", a = e[o], e[o] = function () { s = arguments }, i.always(function () { e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t }), "script") : t }); var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function () { var e; for (e in Pn) Pn[e](t, !0) }; function In() { try { return new e.XMLHttpRequest } catch (t) { } } function zn() { try { return new e.ActiveXObject("Microsoft.XMLHTTP") } catch (t) { } } x.ajaxSettings.xhr = e.ActiveXObject ? function () { return !this.isLocal && In() || zn() } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function (n) { if (!n.crossDomain || x.support.cors) { var r; return { send: function (i, o) { var a, s, l = n.xhr(); if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s]; n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"); try { for (s in i) l.setRequestHeader(s, i[s]) } catch (u) { } l.send(n.hasContent && n.data || null), r = function (e, i) { var s, u, c, p; try { if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) 4 !== l.readyState && l.abort(); else { p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText); try { c = l.statusText } catch (f) { c = "" } s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404 } } catch (d) { i || o(-1, d) } p && o(s, c, p, u) }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r() }, abort: function () { r && r(t, !0) } } } }); var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = { "*": [function (e, t) { var n = this.createTween(e, t), r = n.cur(), i = Yn.exec(t), o = i && i[3] || (x.cssNumber[e] ? "" : "px"), a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)), s = 1, l = 20; if (a && a[3] !== o) { o = o || a[3], i = i || [], a = +r || 1; do s = s || ".5", a /= s, x.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l) } return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n }] }; function Kn() { return setTimeout(function () { Xn = t }), Xn = x.now() } function Zn(e, t, n) { var r, i = (Qn[t] || []).concat(Qn["*"]), o = 0, a = i.length; for (; a > o; o++) if (r = i[o].call(n, t, e)) return r } function er(e, t, n) { var r, i, o = 0, a = Gn.length, s = x.Deferred().always(function () { delete l.elem }), l = function () { if (i) return !1; var t = Xn || Kn(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; for (; l > a; a++) u.tweens[a].run(o); return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1) }, u = s.promise({ elem: e, props: x.extend({}, t), opts: x.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Xn || Kn(), duration: n.duration, tweens: [], createTween: function (t, n) { var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing); return u.tweens.push(r), r }, stop: function (t) { var n = 0, r = t ? u.tweens.length : 0; if (i) return this; for (i = !0; r > n; n++) u.tweens[n].run(1); return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this } }), c = u.props; for (tr(c, u.opts.specialEasing) ; a > o; o++) if (r = Gn[o].call(u, e, c, u.opts)) return r; return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always) } function tr(e, t) { var n, r, i, o, a; for (n in e) if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) { o = a.expand(o), delete e[r]; for (n in o) n in e || (e[n] = o[n], t[n] = i) } else t[r] = i } x.Animation = x.extend(er, { tweener: function (e, t) { x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); var n, r = 0, i = e.length; for (; i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t) }, prefilter: function (e, t) { t ? Gn.unshift(e) : Gn.push(e) } }); function nr(e, t, n) { var r, i, o, a, s, l, u = this, c = {}, p = e.style, f = e.nodeType && nn(e), d = x._data(e, "fxshow"); n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () { s.unqueued || l() }), s.unqueued++, u.always(function () { u.always(function () { s.unqueued--, x.queue(e, "fx").length || s.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function () { p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2] })); for (r in t) if (i = t[r], Vn.exec(i)) { if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) continue; c[r] = d && d[r] || x.style(e, r) } if (!x.isEmptyObject(c)) { d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), f ? x(e).show() : u.done(function () { x(e).hide() }), u.done(function () { var t; x._removeData(e, "fxshow"); for (t in c) x.style(e, t, c[t]) }); for (r in c) a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0)) } } function rr(e, t, n, r, i) { return new rr.prototype.init(e, t, n, r, i) } x.Tween = rr, rr.prototype = { constructor: rr, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px") }, cur: function () { var e = rr.propHooks[this.prop]; return e && e.get ? e.get(this) : rr.propHooks._default.get(this) }, run: function (e) { var t, n = rr.propHooks[this.prop]; return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this } }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = { _default: { get: function (e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function (e) { x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, x.each(["toggle", "show", "hide"], function (e, t) { var n = x.fn[t]; x.fn[t] = function (e, r, i) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i) } }), x.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(nn).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (e, t, n, r) { var i = x.isEmptyObject(e), o = x.speed(t, n, r), a = function () { var t = er(this, x.extend({}, e), o); (i || x._data(this, "finish")) && t.stop(!0) }; return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a) }, stop: function (e, n, r) { var i = function (e) { var t = e.stop; delete e.stop, t(r) }; return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () { var t = !0, n = null != e && e + "queueHooks", o = x.timers, a = x._data(this); if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]); for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && x.dequeue(this, e) }) }, finish: function (e) { return e !== !1 && (e = e || "fx"), this.each(function () { var t, n = x._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = x.timers, a = r ? r.length : 0; for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)); for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this); delete n.finish }) } }); function ir(e, t) { var n, r = { height: e }, i = 0; for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e; return t && (r.opacity = r.width = e), r } x.each({ slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) { x.fn[e] = function (e, n, r) { return this.animate(t, e, n, r) } }), x.speed = function (e, t, n) { var r = e && "object" == typeof e ? x.extend({}, e) : { complete: n || !n && t || x.isFunction(e) && e, duration: e, easing: n && t || t && !x.isFunction(t) && t }; return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () { x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue) }, r }, x.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 } }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function () { var e, n = x.timers, r = 0; for (Xn = x.now() ; n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1); n.length || x.fx.stop(), Xn = t }, x.fx.timer = function (e) { e() && x.timers.push(e) && x.fx.start() }, x.fx.interval = 13, x.fx.start = function () { Un || (Un = setInterval(x.fx.tick, x.fx.interval)) }, x.fx.stop = function () { clearInterval(Un), Un = null }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) { return x.grep(x.timers, function (t) { return e === t.elem }).length }), x.fn.offset = function (e) { if (arguments.length) return e === t ? this : this.each(function (t) { x.offset.setOffset(this, e, t) }); var n, r, o = { top: 0, left: 0 }, a = this[0], s = a && a.ownerDocument; if (s) return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), { top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : o }, x.offset = { setOffset: function (e, t, n) { var r = x.css(e, "position"); "static" === r && (e.style.position = "relative"); var i = x(e), o = i.offset(), a = x.css(e, "top"), s = x.css(e, "left"), l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [a, s]) > -1, u = {}, c = {}, p, f; l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u) } }, x.fn.extend({ position: function () { if (this[0]) { var e, t, n = { top: 0, left: 0 }, r = this[0]; return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), n.left += x.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - x.css(r, "marginTop", !0), left: t.left - n.left - x.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent || s; while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent; return e || s }) } }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) { var r = /Y/.test(n); x.fn[e] = function (i) { return x.access(this, function (e, i, o) { var a = or(e); return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, t) }, e, i, arguments.length, null) } }); function or(e) { return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1 } x.each({ Height: "height", Width: "width" }, function (e, n) { x.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) { x.fn[i] = function (i, o) { var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border"); return x.access(this, function (n, r, i) { var o; return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s) }, n, a ? i : t, a, null) } }) }), x.fn.size = function () { return this.length }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, "function" == typeof define && define.amd && define("jquery", [], function () { return x }))
    })(window);
}

if (typeof (jQuery.ui) == "undefined")
{

    /*! jQuery UI - v1.10.3 - 2013-05-22
    * http://jqueryui.com
    * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
    * Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

    (function (e, t) { function i(t, i) { var a, n, r, o = t.nodeName.toLowerCase(); return "area" === o ? (a = t.parentNode, n = a.name, t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0], !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && s(t) } function s(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () { return "hidden" === e.css(this, "visibility") }).length } var a = 0, n = /^ui-id-\d+$/; e.ui = e.ui || {}, e.extend(e.ui, { version: "1.10.3", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({ focus: function (t) { return function (i, s) { return "number" == typeof i ? this.each(function () { var t = this; setTimeout(function () { e(t).focus(), s && s.call(t) }, i) }) : t.apply(this, arguments) } }(e.fn.focus), scrollParent: function () { var t; return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () { return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0) : this.parents().filter(function () { return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t }, zIndex: function (i) { if (i !== t) return this.css("zIndex", i); if (this.length) for (var s, a, n = e(this[0]) ; n.length && n[0] !== document;) { if (s = n.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (a = parseInt(n.css("zIndex"), 10), !isNaN(a) && 0 !== a)) return a; n = n.parent() } return 0 }, uniqueId: function () { return this.each(function () { this.id || (this.id = "ui-id-" + ++a) }) }, removeUniqueId: function () { return this.each(function () { n.test(this.id) && e(this).removeAttr("id") }) } }), e.extend(e.expr[":"], { data: e.expr.createPseudo ? e.expr.createPseudo(function (t) { return function (i) { return !!e.data(i, t) } }) : function (t, i, s) { return !!e.data(t, s[3]) }, focusable: function (t) { return i(t, !isNaN(e.attr(t, "tabindex"))) }, tabbable: function (t) { var s = e.attr(t, "tabindex"), a = isNaN(s); return (a || s >= 0) && i(t, !a) } }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (i, s) { function a(t, i, s, a) { return e.each(n, function () { i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0) }), i } var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"], r = s.toLowerCase(), o = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight }; e.fn["inner" + s] = function (i) { return i === t ? o["inner" + s].call(this) : this.each(function () { e(this).css(r, a(this, i) + "px") }) }, e.fn["outer" + s] = function (t, i) { return "number" != typeof t ? o["outer" + s].call(this, t) : this.each(function () { e(this).css(r, a(this, t, !0, i) + "px") }) } }), e.fn.addBack || (e.fn.addBack = function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) { return function (i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({ disableSelection: function () { return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) { e.preventDefault() }) }, enableSelection: function () { return this.unbind(".ui-disableSelection") } }), e.extend(e.ui, { plugin: { add: function (t, i, s) { var a, n = e.ui[t].prototype; for (a in s) n.plugins[a] = n.plugins[a] || [], n.plugins[a].push([i, s[a]]) }, call: function (e, t, i) { var s, a = e.plugins[t]; if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (s = 0; a.length > s; s++) e.options[a[s][0]] && a[s][1].apply(e.element, i) } }, hasScroll: function (t, i) { if ("hidden" === e(t).css("overflow")) return !1; var s = i && "left" === i ? "scrollLeft" : "scrollTop", a = !1; return t[s] > 0 ? !0 : (t[s] = 1, a = t[s] > 0, t[s] = 0, a) } }) })(jQuery); (function (e, t) { var i = 0, s = Array.prototype.slice, n = e.cleanData; e.cleanData = function (t) { for (var i, s = 0; null != (i = t[s]) ; s++) try { e(i).triggerHandler("remove") } catch (a) { } n(t) }, e.widget = function (i, s, n) { var a, r, o, h, l = {}, u = i.split(".")[0]; i = i.split(".")[1], a = u + "-" + i, n || (n = s, s = e.Widget), e.expr[":"][a.toLowerCase()] = function (t) { return !!e.data(t, a) }, e[u] = e[u] || {}, r = e[u][i], o = e[u][i] = function (e, i) { return this._createWidget ? (arguments.length && this._createWidget(e, i), t) : new o(e, i) }, e.extend(o, r, { version: n.version, _proto: e.extend({}, n), _childConstructors: [] }), h = new s, h.options = e.widget.extend({}, h.options), e.each(n, function (i, n) { return e.isFunction(n) ? (l[i] = function () { var e = function () { return s.prototype[i].apply(this, arguments) }, t = function (e) { return s.prototype[i].apply(this, e) }; return function () { var i, s = this._super, a = this._superApply; return this._super = e, this._superApply = t, i = n.apply(this, arguments), this._super = s, this._superApply = a, i } }(), t) : (l[i] = n, t) }), o.prototype = e.widget.extend(h, { widgetEventPrefix: r ? h.widgetEventPrefix : i }, l, { constructor: o, namespace: u, widgetName: i, widgetFullName: a }), r ? (e.each(r._childConstructors, function (t, i) { var s = i.prototype; e.widget(s.namespace + "." + s.widgetName, o, i._proto) }), delete r._childConstructors) : s._childConstructors.push(o), e.widget.bridge(i, o) }, e.widget.extend = function (i) { for (var n, a, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++) for (n in r[o]) a = r[o][n], r[o].hasOwnProperty(n) && a !== t && (i[n] = e.isPlainObject(a) ? e.isPlainObject(i[n]) ? e.widget.extend({}, i[n], a) : e.widget.extend({}, a) : a); return i }, e.widget.bridge = function (i, n) { var a = n.prototype.widgetFullName || i; e.fn[i] = function (r) { var o = "string" == typeof r, h = s.call(arguments, 1), l = this; return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r, o ? this.each(function () { var s, n = e.data(this, a); return n ? e.isFunction(n[r]) && "_" !== r.charAt(0) ? (s = n[r].apply(n, h), s !== n && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'") }) : this.each(function () { var t = e.data(this, a); t ? t.option(r || {})._init() : e.data(this, a, new n(r, this)) }), l } }, e.Widget = function () { }, e.Widget._childConstructors = [], e.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: !1, create: null }, _createWidget: function (t, s) { s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, { remove: function (e) { e.target === s && this.destroy() } }), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: e.noop, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function () { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") }, _destroy: e.noop, widget: function () { return this.element }, option: function (i, s) { var n, a, r, o = i; if (0 === arguments.length) return e.widget.extend({}, this.options); if ("string" == typeof i) if (o = {}, n = i.split("."), i = n.shift(), n.length) { for (a = o[i] = e.widget.extend({}, this.options[i]), r = 0; n.length - 1 > r; r++) a[n[r]] = a[n[r]] || {}, a = a[n[r]]; if (i = n.pop(), s === t) return a[i] === t ? null : a[i]; a[i] = s } else { if (s === t) return this.options[i] === t ? null : this.options[i]; o[i] = s } return this._setOptions(o), this }, _setOptions: function (e) { var t; for (t in e) this._setOption(t, e[t]); return this }, _setOption: function (e, t) { return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this }, enable: function () { return this._setOption("disabled", !1) }, disable: function () { return this._setOption("disabled", !0) }, _on: function (i, s, n) { var a, r = this; "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = a = e(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, a = this.widget()), e.each(n, function (n, o) { function h() { return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t } "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++); var l = n.match(/^(\w+)\s*(.*)$/), u = l[1] + r.eventNamespace, c = l[2]; c ? a.delegate(c, u, h) : s.bind(u, h) }) }, _off: function (e, t) { t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t) }, _delay: function (e, t) { function i() { return ("string" == typeof e ? s[e] : e).apply(s, arguments) } var s = this; return setTimeout(i, t || 0) }, _hoverable: function (t) { this.hoverable = this.hoverable.add(t), this._on(t, { mouseenter: function (t) { e(t.currentTarget).addClass("ui-state-hover") }, mouseleave: function (t) { e(t.currentTarget).removeClass("ui-state-hover") } }) }, _focusable: function (t) { this.focusable = this.focusable.add(t), this._on(t, { focusin: function (t) { e(t.currentTarget).addClass("ui-state-focus") }, focusout: function (t) { e(t.currentTarget).removeClass("ui-state-focus") } }) }, _trigger: function (t, i, s) { var n, a, r = this.options[t]; if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a) n in i || (i[n] = a[n]); return this.element.trigger(i, s), !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented()) } }, e.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) { e.Widget.prototype["_" + t] = function (s, n, a) { "string" == typeof n && (n = { effect: n }); var r, o = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t; n = n || {}, "number" == typeof n && (n = { duration: n }), r = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), r && e.effects && e.effects.effect[o] ? s[t](n) : o !== t && s[o] ? s[o](n.duration, n.easing, a) : s.queue(function (i) { e(this)[t](), a && a.call(s[0]), i() }) } }) })(jQuery); (function (e) { var t = !1; e(document).mouseup(function () { t = !1 }), e.widget("ui.mouse", { version: "1.10.3", options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 }, _mouseInit: function () { var t = this; this.element.bind("mousedown." + this.widgetName, function (e) { return t._mouseDown(e) }).bind("click." + this.widgetName, function (i) { return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined }), this.started = !1 }, _mouseDestroy: function () { this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate) }, _mouseDown: function (i) { if (!t) { this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i; var s = this, n = 1 === i.which, a = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1; return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () { s.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) { return s._mouseMove(e) }, this._mouseUpDelegate = function (e) { return s._mouseUp(e) }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0 } }, _mouseMove: function (t) { return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) }, _mouseUp: function (t) { return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1 }, _mouseDistanceMet: function (e) { return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance }, _mouseDelayMet: function () { return this.mouseDelayMet }, _mouseStart: function () { }, _mouseDrag: function () { }, _mouseStop: function () { }, _mouseCapture: function () { return !0 } }) })(jQuery); (function (t, e) { function i(t, e, i) { return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)] } function s(e, i) { return parseInt(t.css(e, i), 10) || 0 } function n(e) { var i = e[0]; return 9 === i.nodeType ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } } : t.isWindow(i) ? { width: e.width(), height: e.height(), offset: { top: e.scrollTop(), left: e.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: e.outerWidth(), height: e.outerHeight(), offset: e.offset() } } t.ui = t.ui || {}; var a, o = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, c = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position; t.position = { scrollbarWidth: function () { if (a !== e) return a; var i, s, n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = n.children()[0]; return t("body").append(n), i = o.offsetWidth, n.css("overflow", "scroll"), s = o.offsetWidth, i === s && (s = n[0].clientWidth), n.remove(), a = i - s }, getScrollInfo: function (e) { var i = e.isWindow ? "" : e.element.css("overflow-x"), s = e.isWindow ? "" : e.element.css("overflow-y"), n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, a = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight; return { width: a ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0 } }, getWithinInfo: function (e) { var i = t(e || window), s = t.isWindow(i[0]); return { element: i, isWindow: s, offset: i.offset() || { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s ? i.width() : i.outerWidth(), height: s ? i.height() : i.outerHeight() } } }, t.fn.position = function (e) { if (!e || !e.of) return f.apply(this, arguments); e = t.extend({}, e); var a, p, m, g, v, b, _ = t(e.of), y = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(y), x = (e.collision || "flip").split(" "), k = {}; return b = n(_), _[0].preventDefault && (e.at = "left top"), p = b.width, m = b.height, g = b.offset, v = t.extend({}, g), t.each(["my", "at"], function () { var t, i, s = (e[this] || "").split(" "); 1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = l.test(s[0]) ? s[0] : "center", s[1] = c.test(s[1]) ? s[1] : "center", t = u.exec(s[0]), i = u.exec(s[1]), k[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]] }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), a = i(k.at, p, m), v.left += a[0], v.top += a[1], this.each(function () { var n, l, c = t(this), u = c.outerWidth(), d = c.outerHeight(), f = s(this, "marginLeft"), b = s(this, "marginTop"), D = u + f + s(this, "marginRight") + w.width, T = d + b + s(this, "marginBottom") + w.height, C = t.extend({}, v), M = i(k.my, c.outerWidth(), c.outerHeight()); "right" === e.my[0] ? C.left -= u : "center" === e.my[0] && (C.left -= u / 2), "bottom" === e.my[1] ? C.top -= d : "center" === e.my[1] && (C.top -= d / 2), C.left += M[0], C.top += M[1], t.support.offsetFractions || (C.left = h(C.left), C.top = h(C.top)), n = { marginLeft: f, marginTop: b }, t.each(["left", "top"], function (i, s) { t.ui.position[x[i]] && t.ui.position[x[i]][s](C, { targetWidth: p, targetHeight: m, elemWidth: u, elemHeight: d, collisionPosition: n, collisionWidth: D, collisionHeight: T, offset: [a[0] + M[0], a[1] + M[1]], my: e.my, at: e.at, within: y, elem: c }) }), e.using && (l = function (t) { var i = g.left - C.left, s = i + p - u, n = g.top - C.top, a = n + m - d, h = { target: { element: _, left: g.left, top: g.top, width: p, height: m }, element: { element: c, left: C.left, top: C.top, width: u, height: d }, horizontal: 0 > s ? "left" : i > 0 ? "right" : "center", vertical: 0 > a ? "top" : n > 0 ? "bottom" : "middle" }; u > p && p > r(i + s) && (h.horizontal = "center"), d > m && m > r(n + a) && (h.vertical = "middle"), h.important = o(r(i), r(s)) > o(r(n), r(a)) ? "horizontal" : "vertical", e.using.call(this, t, h) }), c.offset(t.extend(C, { using: l })) }) }, t.ui.position = { fit: { left: function (t, e) { var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width, r = t.left - e.collisionPosition.marginLeft, h = n - r, l = r + e.collisionWidth - a - n; e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left) }, top: function (t, e) { var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = e.within.height, r = t.top - e.collisionPosition.marginTop, h = n - r, l = r + e.collisionHeight - a - n; e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top) } }, flip: { left: function (t, e) { var i, s, n = e.within, a = n.offset.left + n.scrollLeft, o = n.width, h = n.isWindow ? n.scrollLeft : n.offset.left, l = t.left - e.collisionPosition.marginLeft, c = l - h, u = l + e.collisionWidth - o - h, d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0]; 0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > r(s)) && (t.left += d + p + f)) }, top: function (t, e) { var i, s, n = e.within, a = n.offset.top + n.scrollTop, o = n.height, h = n.isWindow ? n.scrollTop : n.offset.top, l = t.top - e.collisionPosition.marginTop, c = l - h, u = l + e.collisionHeight - o - h, d = "top" === e.my[1], p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1]; 0 > c ? (s = t.top + p + f + m + e.collisionHeight - o - a, t.top + p + f + m > c && (0 > s || r(c) > s) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - h, t.top + p + f + m > u && (i > 0 || u > r(i)) && (t.top += p + f + m)) } }, flipfit: { left: function () { t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments) }, top: function () { t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments) } } }, function () { var e, i, s, n, a, o = document.getElementsByTagName("body")[0], r = document.createElement("div"); e = document.createElement(o ? "div" : "body"), s = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }, o && t.extend(s, { position: "absolute", left: "-1000px", top: "-1000px" }); for (a in s) e.style[a] = s[a]; e.appendChild(r), i = o || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", n = t(r).offset().left, t.support.offsetFractions = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e) }() })(jQuery); (function (e) { e.widget("ui.draggable", e.ui.mouse, { version: "1.10.3", widgetEventPrefix: "drag", options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null }, _create: function () { "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit() }, _destroy: function () { this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy() }, _mouseCapture: function (t) { var i = this.options; return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () { e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({ width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3 }).css(e(this).offset()).appendTo("body") }), !0) : !1) }, _mouseStart: function (t) { var i = this.options; return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, this.offset.scroll = !1, e.extend(this.offset, { click: { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0) }, _mouseDrag: function (t, i) { if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) { var s = this._uiHash(); if (this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1; this.position = s.position } return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1 }, _mouseStop: function (t) { var i = this, s = !1; return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () { i._trigger("stop", t) !== !1 && i._clear() }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1 }, _mouseUp: function (t) { return e("div.ui-draggable-iframeFix").each(function () { this.parentNode.removeChild(this) }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t) }, cancel: function () { return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this }, _getHandle: function (t) { return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0 }, _createHelper: function (t) { var i = this.options, s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element; return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s }, _adjustOffsetFromHelper: function (t) { "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top) }, _getParentOffset: function () { var t = this.offsetParent.offset(); return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = { top: 0, left: 0 }), { top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) } }, _getRelativeOffset: function () { if ("relative" === this.cssPosition) { var e = this.element.position(); return { top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() } } return { top: 0, left: 0 } }, _cacheMargins: function () { this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 } }, _cacheHelperProportions: function () { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } }, _setContainment: function () { var t, i, s, n = this.options; return n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined) }, _convertPositionTo: function (t, i) { i || (i = this.position); var s = "absolute" === t ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent; return this.offset.scroll || (this.offset.scroll = { top: n.scrollTop(), left: n.scrollLeft() }), { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s } }, _generatePosition: function (t) { var i, s, n, a, o = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = t.pageX, l = t.pageY; return this.offset.scroll || (this.offset.scroll = { top: r.scrollTop(), left: r.scrollLeft() }), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), { top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top), left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) } }, _clear: function () { this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1 }, _trigger: function (t, i, s) { return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, s) }, plugins: {}, _uiHash: function () { return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs } } }), e.ui.plugin.add("draggable", "connectToSortable", { start: function (t, i) { var s = e(this).data("ui-draggable"), n = s.options, a = e.extend({}, i, { item: s.element }); s.sortables = [], e(n.connectToSortable).each(function () { var i = e.data(this, "ui-sortable"); i && !i.options.disabled && (s.sortables.push({ instance: i, shouldRevert: i.options.revert }), i.refreshPositions(), i._trigger("activate", t, a)) }) }, stop: function (t, i) { var s = e(this).data("ui-draggable"), n = e.extend({}, i, { item: s.element }); e.each(s.sortables, function () { this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({ top: "auto", left: "auto" })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, n)) }) }, drag: function (t, i) { var s = e(this).data("ui-draggable"), n = this; e.each(s.sortables, function () { var a = !1, o = this; this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (a = !0, e.each(s.sortables, function () { return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (a = !1), a })), a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () { return i.helper[0] }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", t), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", t), s.dropped = !1) }) } }), e.ui.plugin.add("draggable", "cursor", { start: function () { var t = e("body"), i = e(this).data("ui-draggable").options; t.css("cursor") && (i._cursor = t.css("cursor")), t.css("cursor", i.cursor) }, stop: function () { var t = e(this).data("ui-draggable").options; t._cursor && e("body").css("cursor", t._cursor) } }), e.ui.plugin.add("draggable", "opacity", { start: function (t, i) { var s = e(i.helper), n = e(this).data("ui-draggable").options; s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity) }, stop: function (t, i) { var s = e(this).data("ui-draggable").options; s._opacity && e(i.helper).css("opacity", s._opacity) } }), e.ui.plugin.add("draggable", "scroll", { start: function () { var t = e(this).data("ui-draggable"); t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset()) }, drag: function (t) { var i = e(this).data("ui-draggable"), s = i.options, n = !1; i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(document).scrollTop() < s.scrollSensitivity ? n = e(document).scrollTop(e(document).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < s.scrollSensitivity && (n = e(document).scrollTop(e(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (t.pageX - e(document).scrollLeft() < s.scrollSensitivity ? n = e(document).scrollLeft(e(document).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < s.scrollSensitivity && (n = e(document).scrollLeft(e(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t) } }), e.ui.plugin.add("draggable", "snap", { start: function () { var t = e(this).data("ui-draggable"), i = t.options; t.snapElements = [], e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () { var i = e(this), s = i.offset(); this !== t.element[0] && t.snapElements.push({ item: this, width: i.outerWidth(), height: i.outerHeight(), top: s.top, left: s.left }) }) }, drag: function (t, i) { var s, n, a, o, r, h, l, u, c, d, p = e(this).data("ui-draggable"), f = p.options, m = f.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, b = i.offset.top, y = b + p.helperProportions.height; for (c = p.snapElements.length - 1; c >= 0; c--) r = p.snapElements[c].left, h = r + p.snapElements[c].width, l = p.snapElements[c].top, u = l + p.snapElements[c].height, r - m > v || g > h + m || l - m > y || b > u + m || !e.contains(p.snapElements[c].item.ownerDocument, p.snapElements[c].item) ? (p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), { snapItem: p.snapElements[c].item })), p.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (s = m >= Math.abs(l - y), n = m >= Math.abs(u - b), a = m >= Math.abs(r - v), o = m >= Math.abs(h - g), s && (i.position.top = p._convertPositionTo("relative", { top: l - p.helperProportions.height, left: 0 }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", { top: u, left: 0 }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", { top: 0, left: r - p.helperProportions.width }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", { top: 0, left: h }).left - p.margins.left)), d = s || n || a || o, "outer" !== f.snapMode && (s = m >= Math.abs(l - b), n = m >= Math.abs(u - y), a = m >= Math.abs(r - g), o = m >= Math.abs(h - v), s && (i.position.top = p._convertPositionTo("relative", { top: l, left: 0 }).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", { top: u - p.helperProportions.height, left: 0 }).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", { top: 0, left: r }).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", { top: 0, left: h - p.helperProportions.width }).left - p.margins.left)), !p.snapElements[c].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), { snapItem: p.snapElements[c].item })), p.snapElements[c].snapping = s || n || a || o || d) } }), e.ui.plugin.add("draggable", "stack", { start: function () { var t, i = this.data("ui-draggable").options, s = e.makeArray(e(i.stack)).sort(function (t, i) { return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0) }); s.length && (t = parseInt(e(s[0]).css("zIndex"), 10) || 0, e(s).each(function (i) { e(this).css("zIndex", t + i) }), this.css("zIndex", t + s.length)) } }), e.ui.plugin.add("draggable", "zIndex", { start: function (t, i) { var s = e(i.helper), n = e(this).data("ui-draggable").options; s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex) }, stop: function (t, i) { var s = e(this).data("ui-draggable").options; s._zIndex && e(i.helper).css("zIndex", s._zIndex) } }) })(jQuery); (function (e) { function t(e, t, i) { return e > t && t + i > e } e.widget("ui.droppable", { version: "1.10.3", widgetEventPrefix: "drop", options: { accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null }, _create: function () { var t = this.options, i = t.accept; this.isover = !1, this.isout = !0, this.accept = e.isFunction(i) ? i : function (e) { return e.is(i) }, this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable") }, _destroy: function () { for (var t = 0, i = e.ui.ddmanager.droppables[this.options.scope]; i.length > t; t++) i[t] === this && i.splice(t, 1); this.element.removeClass("ui-droppable ui-droppable-disabled") }, _setOption: function (t, i) { "accept" === t && (this.accept = e.isFunction(i) ? i : function (e) { return e.is(i) }), e.Widget.prototype._setOption.apply(this, arguments) }, _activate: function (t) { var i = e.ui.ddmanager.current; this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i)) }, _deactivate: function (t) { var i = e.ui.ddmanager.current; this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i)) }, _over: function (t) { var i = e.ui.ddmanager.current; i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i))) }, _out: function (t) { var i = e.ui.ddmanager.current; i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i))) }, _drop: function (t, i) { var s = i || e.ui.ddmanager.current, n = !1; return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () { var t = e.data(this, "ui-droppable"); return t.options.greedy && !t.options.disabled && t.options.scope === s.options.scope && t.accept.call(t.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(t, { offset: t.element.offset() }), t.options.tolerance) ? (n = !0, !1) : undefined }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element) : !1) : !1 }, ui: function (e) { return { draggable: e.currentItem || e.element, helper: e.helper, position: e.position, offset: e.positionAbs } } }), e.ui.intersect = function (e, i, s) { if (!i.offset) return !1; var n, a, o = (e.positionAbs || e.position.absolute).left, r = o + e.helperProportions.width, h = (e.positionAbs || e.position.absolute).top, l = h + e.helperProportions.height, u = i.offset.left, c = u + i.proportions.width, d = i.offset.top, p = d + i.proportions.height; switch (s) { case "fit": return o >= u && c >= r && h >= d && p >= l; case "intersect": return o + e.helperProportions.width / 2 > u && c > r - e.helperProportions.width / 2 && h + e.helperProportions.height / 2 > d && p > l - e.helperProportions.height / 2; case "pointer": return n = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, a = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, t(a, d, i.proportions.height) && t(n, u, i.proportions.width); case "touch": return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (o >= u && c >= o || r >= u && c >= r || u > o && r > c); default: return !1 } }, e.ui.ddmanager = { current: null, droppables: { "default": [] }, prepareOffsets: function (t, i) { var s, n, a = e.ui.ddmanager.droppables[t.options.scope] || [], o = i ? i.type : null, r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack(); e: for (s = 0; a.length > s; s++) if (!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) { for (n = 0; r.length > n; n++) if (r[n] === a[s].element[0]) { a[s].proportions.height = 0; continue e } a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions = { width: a[s].element[0].offsetWidth, height: a[s].element[0].offsetHeight }) } }, drop: function (t, i) { var s = !1; return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function () { this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i))) }), s }, dragStart: function (t, i) { t.element.parentsUntil("body").bind("scroll.droppable", function () { t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i) }) }, drag: function (t, i) { t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () { if (!this.options.disabled && !this.greedyChild && this.visible) { var s, n, a, o = e.ui.intersect(t, this, this.options.tolerance), r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null; r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function () { return e.data(this, "ui-droppable").options.scope === n }), a.length && (s = e.data(a[0], "ui-droppable"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i))) } }) }, dragStop: function (t, i) { t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i) } } })(jQuery); (function (e) { function t(e) { return parseInt(e, 10) || 0 } function i(e) { return !isNaN(parseInt(e, 10)) } e.widget("ui.resizable", e.ui.mouse, { version: "1.10.3", widgetEventPrefix: "resize", options: { alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null }, _create: function () { var t, i, s, n, a, o = this, r = this.options; if (this.element.addClass("ui-resizable"), e.extend(this, { _aspectRatio: !!r.aspectRatio, aspectRatio: r.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") }), this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css({ margin: this.originalElement.css("margin") }), this._proportionallyResize()), this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) s = e.trim(t[i]), a = "ui-resizable-" + s, n = e("<div class='ui-resizable-handle " + a + "'></div>"), n.css({ zIndex: r.zIndex }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n); this._renderAxis = function (t) { var i, s, n, a; t = t || this.element; for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = e(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(n, a), this._proportionallyResize()), e(this.handles[i]).length }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () { o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se") }), r.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function () { r.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show()) }).mouseleave(function () { r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide()) })), this._mouseInit() }, _destroy: function () { this._mouseDestroy(); var t, i = function (t) { e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove() }; return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({ position: t.css("position"), width: t.outerWidth(), height: t.outerHeight(), top: t.css("top"), left: t.css("left") }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this }, _mouseCapture: function (t) { var i, s, n = !1; for (i in this.handles) s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (n = !0); return !this.options.disabled && n }, _mouseStart: function (i) { var s, n, a, o = this.options, r = this.element.position(), h = this.element; return this.resizing = !0, /absolute/.test(h.css("position")) ? h.css({ position: "absolute", top: h.css("top"), left: h.css("left") }) : h.is(".ui-draggable") && h.css({ position: "absolute", top: r.top, left: r.left }), this._renderProxy(), s = t(this.helper.css("left")), n = t(this.helper.css("top")), o.containment && (s += e(o.containment).scrollLeft() || 0, n += e(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: s, top: n }, this.size = this._helper ? { width: h.outerWidth(), height: h.outerHeight() } : { width: h.width(), height: h.height() }, this.originalSize = this._helper ? { width: h.outerWidth(), height: h.outerHeight() } : { width: h.width(), height: h.height() }, this.originalPosition = { left: s, top: n }, this.sizeDiff = { width: h.outerWidth() - h.width(), height: h.outerHeight() - h.height() }, this.originalMousePosition = { left: i.pageX, top: i.pageY }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, a = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === a ? this.axis + "-resize" : a), h.addClass("ui-resizable-resizing"), this._propagate("start", i), !0 }, _mouseDrag: function (t) { var i, s = this.helper, n = {}, a = this.originalMousePosition, o = this.axis, r = this.position.top, h = this.position.left, l = this.size.width, u = this.size.height, c = t.pageX - a.left || 0, d = t.pageY - a.top || 0, p = this._change[o]; return p ? (i = p.apply(this, [t, c, d]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), this.position.top !== r && (n.top = this.position.top + "px"), this.position.left !== h && (n.left = this.position.left + "px"), this.size.width !== l && (n.width = this.size.width + "px"), this.size.height !== u && (n.height = this.size.height + "px"), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(n) || this._trigger("resize", t, this.ui()), !1) : !1 }, _mouseStop: function (t) { this.resizing = !1; var i, s, n, a, o, r, h, l = this.options, u = this; return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && e.ui.hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, a = s ? 0 : u.sizeDiff.width, o = { width: u.helper.width() - a, height: u.helper.height() - n }, r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, { top: h, left: r })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1 }, _updateVirtualBoundaries: function (e) { var t, s, n, a, o, r = this.options; o = { minWidth: i(r.minWidth) ? r.minWidth : 0, maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0, minHeight: i(r.minHeight) ? r.minHeight : 0, maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0 }, (this._aspectRatio || e) && (t = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, s = o.maxHeight * this.aspectRatio, a = o.maxWidth / this.aspectRatio, t > o.minWidth && (o.minWidth = t), n > o.minHeight && (o.minHeight = n), o.maxWidth > s && (o.maxWidth = s), o.maxHeight > a && (o.maxHeight = a)), this._vBoundaries = o }, _updateCache: function (e) { this.offset = this.helper.offset(), i(e.left) && (this.position.left = e.left), i(e.top) && (this.position.top = e.top), i(e.height) && (this.size.height = e.height), i(e.width) && (this.size.width = e.width) }, _updateRatio: function (e) { var t = this.position, s = this.size, n = this.axis; return i(e.height) ? e.width = e.height * this.aspectRatio : i(e.width) && (e.height = e.width / this.aspectRatio), "sw" === n && (e.left = t.left + (s.width - e.width), e.top = null), "nw" === n && (e.top = t.top + (s.height - e.height), e.left = t.left + (s.width - e.width)), e }, _respectSize: function (e) { var t = this._vBoundaries, s = this.axis, n = i(e.width) && t.maxWidth && t.maxWidth < e.width, a = i(e.height) && t.maxHeight && t.maxHeight < e.height, o = i(e.width) && t.minWidth && t.minWidth > e.width, r = i(e.height) && t.minHeight && t.minHeight > e.height, h = this.originalPosition.left + this.originalSize.width, l = this.position.top + this.size.height, u = /sw|nw|w/.test(s), c = /nw|ne|n/.test(s); return o && (e.width = t.minWidth), r && (e.height = t.minHeight), n && (e.width = t.maxWidth), a && (e.height = t.maxHeight), o && u && (e.left = h - t.minWidth), n && u && (e.left = h - t.maxWidth), r && c && (e.top = l - t.minHeight), a && c && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e }, _proportionallyResize: function () { if (this._proportionallyResizeElements.length) { var e, t, i, s, n, a = this.helper || this.element; for (e = 0; this._proportionallyResizeElements.length > e; e++) { if (n = this._proportionallyResizeElements[e], !this.borderDif) for (this.borderDif = [], i = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], s = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], t = 0; i.length > t; t++) this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(s[t], 10) || 0); n.css({ height: a.height() - this.borderDif[0] - this.borderDif[2] || 0, width: a.width() - this.borderDif[1] - this.borderDif[3] || 0 }) } } }, _renderProxy: function () { var t = this.element, i = this.options; this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({ width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++i.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element }, _change: { e: function (e, t) { return { width: this.originalSize.width + t } }, w: function (e, t) { var i = this.originalSize, s = this.originalPosition; return { left: s.left + t, width: i.width - t } }, n: function (e, t, i) { var s = this.originalSize, n = this.originalPosition; return { top: n.top + i, height: s.height - i } }, s: function (e, t, i) { return { height: this.originalSize.height + i } }, se: function (t, i, s) { return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s])) }, sw: function (t, i, s) { return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s])) }, ne: function (t, i, s) { return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s])) }, nw: function (t, i, s) { return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s])) } }, _propagate: function (t, i) { e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui()) }, plugins: {}, ui: function () { return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition } } }), e.ui.plugin.add("resizable", "animate", { stop: function (t) { var i = e(this).data("ui-resizable"), s = i.options, n = i._proportionallyResizeElements, a = n.length && /textarea/i.test(n[0].nodeName), o = a && e.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height, r = a ? 0 : i.sizeDiff.width, h = { width: i.size.width - r, height: i.size.height - o }, l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null; i.element.animate(e.extend(h, u && l ? { top: u, left: l } : {}), { duration: s.animateDuration, easing: s.animateEasing, step: function () { var s = { width: parseInt(i.element.css("width"), 10), height: parseInt(i.element.css("height"), 10), top: parseInt(i.element.css("top"), 10), left: parseInt(i.element.css("left"), 10) }; n && n.length && e(n[0]).css({ width: s.width, height: s.height }), i._updateCache(s), i._propagate("resize", t) } }) } }), e.ui.plugin.add("resizable", "containment", { start: function () { var i, s, n, a, o, r, h, l = e(this).data("ui-resizable"), u = l.options, c = l.element, d = u.containment, p = d instanceof e ? d.get(0) : /parent/.test(d) ? c.parent().get(0) : d; p && (l.containerElement = e(p), /document/.test(d) || d === document ? (l.containerOffset = { left: 0, top: 0 }, l.containerPosition = { left: 0, top: 0 }, l.parentData = { element: e(document), left: 0, top: 0, width: e(document).width(), height: e(document).height() || document.body.parentNode.scrollHeight }) : (i = e(p), s = [], e(["Top", "Right", "Left", "Bottom"]).each(function (e, n) { s[e] = t(i.css("padding" + n)) }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = { height: i.innerHeight() - s[3], width: i.innerWidth() - s[1] }, n = l.containerOffset, a = l.containerSize.height, o = l.containerSize.width, r = e.ui.hasScroll(p, "left") ? p.scrollWidth : o, h = e.ui.hasScroll(p) ? p.scrollHeight : a, l.parentData = { element: p, left: n.left, top: n.top, width: r, height: h })) }, resize: function (t) { var i, s, n, a, o = e(this).data("ui-resizable"), r = o.options, h = o.containerOffset, l = o.position, u = o._aspectRatio || t.shiftKey, c = { top: 0, left: 0 }, d = o.containerElement; d[0] !== document && /static/.test(d.css("position")) && (c = h), l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - c.left), u && (o.size.height = o.size.width / o.aspectRatio), o.position.left = r.helper ? h.left : 0), l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? h.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, i = Math.abs((o._helper ? o.offset.left - c.left : o.offset.left - c.left) + o.sizeDiff.width), s = Math.abs((o._helper ? o.offset.top - c.top : o.offset.top - h.top) + o.sizeDiff.height), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a && (i -= o.parentData.left), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio)) }, stop: function () { var t = e(this).data("ui-resizable"), i = t.options, s = t.containerOffset, n = t.containerPosition, a = t.containerElement, o = e(t.helper), r = o.offset(), h = o.outerWidth() - t.sizeDiff.width, l = o.outerHeight() - t.sizeDiff.height; t._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({ left: r.left - n.left - s.left, width: h, height: l }), t._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({ left: r.left - n.left - s.left, width: h, height: l }) } }), e.ui.plugin.add("resizable", "alsoResize", { start: function () { var t = e(this).data("ui-resizable"), i = t.options, s = function (t) { e(t).each(function () { var t = e(this); t.data("ui-resizable-alsoresize", { width: parseInt(t.width(), 10), height: parseInt(t.height(), 10), left: parseInt(t.css("left"), 10), top: parseInt(t.css("top"), 10) }) }) }; "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function (e) { s(e) }) }, resize: function (t, i) { var s = e(this).data("ui-resizable"), n = s.options, a = s.originalSize, o = s.originalPosition, r = { height: s.size.height - a.height || 0, width: s.size.width - a.width || 0, top: s.position.top - o.top || 0, left: s.position.left - o.left || 0 }, h = function (t, s) { e(t).each(function () { var t = e(this), n = e(this).data("ui-resizable-alsoresize"), a = {}, o = s && s.length ? s : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"]; e.each(o, function (e, t) { var i = (n[t] || 0) + (r[t] || 0); i && i >= 0 && (a[t] = i || null) }), t.css(a) }) }; "object" != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : e.each(n.alsoResize, function (e, t) { h(e, t) }) }, stop: function () { e(this).removeData("resizable-alsoresize") } }), e.ui.plugin.add("resizable", "ghost", { start: function () { var t = e(this).data("ui-resizable"), i = t.options, s = t.size; t.ghost = t.originalElement.clone(), t.ghost.css({ opacity: .25, display: "block", position: "relative", height: s.height, width: s.width, margin: 0, left: 0, top: 0 }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper) }, resize: function () { var t = e(this).data("ui-resizable"); t.ghost && t.ghost.css({ position: "relative", height: t.size.height, width: t.size.width }) }, stop: function () { var t = e(this).data("ui-resizable"); t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0)) } }), e.ui.plugin.add("resizable", "grid", { resize: function () { var t = e(this).data("ui-resizable"), i = t.options, s = t.size, n = t.originalSize, a = t.originalPosition, o = t.axis, r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid, h = r[0] || 1, l = r[1] || 1, u = Math.round((s.width - n.width) / h) * h, c = Math.round((s.height - n.height) / l) * l, d = n.width + u, p = n.height + c, f = i.maxWidth && d > i.maxWidth, m = i.maxHeight && p > i.maxHeight, g = i.minWidth && i.minWidth > d, v = i.minHeight && i.minHeight > p; i.grid = r, g && (d += h), v && (p += l), f && (d -= h), m && (p -= l), /^(se|s|e)$/.test(o) ? (t.size.width = d, t.size.height = p) : /^(ne)$/.test(o) ? (t.size.width = d, t.size.height = p, t.position.top = a.top - c) : /^(sw)$/.test(o) ? (t.size.width = d, t.size.height = p, t.position.left = a.left - u) : (t.size.width = d, t.size.height = p, t.position.top = a.top - c, t.position.left = a.left - u) } }) })(jQuery); (function (e) { e.widget("ui.selectable", e.ui.mouse, { version: "1.10.3", options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null }, _create: function () { var t, i = this; this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () { t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function () { var t = e(this), i = t.offset(); e.data(this, "selectable-item", { element: this, $element: t, left: i.left, top: i.top, right: i.left + t.outerWidth(), bottom: i.top + t.outerHeight(), startselected: !1, selected: t.hasClass("ui-selected"), selecting: t.hasClass("ui-selecting"), unselecting: t.hasClass("ui-unselecting") }) }) }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>") }, _destroy: function () { this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy() }, _mouseStart: function (t) { var i = this, s = this.options; this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({ left: t.pageX, top: t.pageY, width: 0, height: 0 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () { var s = e.data(this, "selectable-item"); s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, { unselecting: s.element })) }), e(t.target).parents().addBack().each(function () { var s, n = e.data(this, "selectable-item"); return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", t, { selecting: n.element }) : i._trigger("unselecting", t, { unselecting: n.element }), !1) : undefined })) }, _mouseDrag: function (t) { if (this.dragged = !0, !this.options.disabled) { var i, s = this, n = this.options, a = this.opos[0], o = this.opos[1], r = t.pageX, h = t.pageY; return a > r && (i = r, r = a, a = i), o > h && (i = h, h = o, o = i), this.helper.css({ left: a, top: o, width: r - a, height: h - o }), this.selectees.each(function () { var i = e.data(this, "selectable-item"), l = !1; i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || a > i.right || i.top > h || o > i.bottom) : "fit" === n.tolerance && (l = i.left > a && r > i.right && i.top > o && h > i.bottom), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, { selecting: i.element }))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, { unselecting: i.element }))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, { unselecting: i.element }))))) }), !1 } }, _mouseStop: function (t) { var i = this; return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function () { var s = e.data(this, "selectable-item"); s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, { unselected: s.element }) }), e(".ui-selecting", this.element[0]).each(function () { var s = e.data(this, "selectable-item"); s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, { selected: s.element }) }), this._trigger("stop", t), this.helper.remove(), !1 } }) })(jQuery); (function (t) { function e(t, e, i) { return t > e && e + i > t } function i(t) { return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display")) } t.widget("ui.sortable", t.ui.mouse, { version: "1.10.3", widgetEventPrefix: "sort", ready: !1, options: { appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null }, _create: function () { var t = this.options; this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0 }, _destroy: function () { this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy(); for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item"); return this }, _setOption: function (e, i) { "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments) }, _mouseCapture: function (e, i) { var s = null, n = !1, a = this; return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () { return t.data(this, a.widgetName + "-item") === a ? (s = t(this), !1) : undefined }), t.data(e.target, a.widgetName + "-item") === a && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () { this === e.target && (n = !0) }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1) }, _mouseStart: function (e, i, s) { var n, a, o = this.options; if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (a = this.document.find("body"), this.storedCursor = a.css("cursor"), a.css("cursor", o.cursor), this.storedStylesheet = t("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this)); return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0 }, _mouseDrag: function (e) { var i, s, n, a, o = this.options, r = !1; for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)), e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))), r !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) { if (this.direction = 1 === a ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break; this._rearrange(e, s), this._trigger("change", e, this._uiHash()); break } return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1 }, _mouseStop: function (e, i) { if (e) { if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) { var s = this, n = this.placeholder.offset(), a = this.options.axis, o = {}; a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function () { s._clear(e) }) } else this._clear(e, i); return !1 } }, cancel: function () { if (this.dragging) { this._mouseUp({ target: null }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show(); for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0) } return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this }, serialize: function (e) { var i = this._getItemsAsjQuery(e && e.connected), s = []; return e = e || {}, t(i).each(function () { var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/); i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2])) }), !s.length && e.key && s.push(e.key + "="), s.join("&") }, toArray: function (e) { var i = this._getItemsAsjQuery(e && e.connected), s = []; return e = e || {}, i.each(function () { s.push(t(e.item || this).attr(e.attribute || "id") || "") }), s }, _intersectsWith: function (t) { var e = this.positionAbs.left, i = e + this.helperProportions.width, s = this.positionAbs.top, n = s + this.helperProportions.height, a = t.left, o = a + t.width, r = t.top, h = r + t.height, l = this.offset.click.top, c = this.offset.click.left, u = "x" === this.options.axis || s + l > r && h > s + l, d = "y" === this.options.axis || e + c > a && o > e + c, p = u && d; return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2 }, _intersectsWithPointer: function (t) { var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height), s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width), n = i && s, a = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection(); return n ? this.floating ? o && "right" === o || "down" === a ? 2 : 1 : a && ("down" === a ? 2 : 1) : !1 }, _intersectsWithSides: function (t) { var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), n = this._getDragVerticalDirection(), a = this._getDragHorizontalDirection(); return this.floating && a ? "right" === a && s || "left" === a && !s : n && ("down" === n && i || "up" === n && !i) }, _getDragVerticalDirection: function () { var t = this.positionAbs.top - this.lastPositionAbs.top; return 0 !== t && (t > 0 ? "down" : "up") }, _getDragHorizontalDirection: function () { var t = this.positionAbs.left - this.lastPositionAbs.left; return 0 !== t && (t > 0 ? "right" : "left") }, refresh: function (t) { return this._refreshItems(t), this.refreshPositions(), this }, _connectWith: function () { var t = this.options; return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith }, _getItemsAsjQuery: function (e) { var i, s, n, a, o = [], r = [], h = this._connectWith(); if (h && e) for (i = h.length - 1; i >= 0; i--) for (n = t(h[i]), s = n.length - 1; s >= 0; s--) a = t.data(n[s], this.widgetFullName), a && a !== this && !a.options.disabled && r.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]); for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = r.length - 1; i >= 0; i--) r[i][0].each(function () { o.push(this) }); return t(o) }, _removeCurrentsFromItems: function () { var e = this.currentItem.find(":data(" + this.widgetName + "-item)"); this.items = t.grep(this.items, function (t) { for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1; return !0 }) }, _refreshItems: function (e) { this.items = [], this.containers = [this]; var i, s, n, a, o, r, h, l, c = this.items, u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, { item: this.currentItem }) : t(this.options.items, this.element), this]], d = this._connectWith(); if (d && this.ready) for (i = d.length - 1; i >= 0; i--) for (n = t(d[i]), s = n.length - 1; s >= 0; s--) a = t.data(n[s], this.widgetFullName), a && a !== this && !a.options.disabled && (u.push([t.isFunction(a.options.items) ? a.options.items.call(a.element[0], e, { item: this.currentItem }) : t(a.options.items, a.element), a]), this.containers.push(a)); for (i = u.length - 1; i >= 0; i--) for (o = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]), h.data(this.widgetName + "-item", o), c.push({ item: h, instance: o, width: 0, height: 0, left: 0, top: 0 }) }, refreshPositions: function (e) { this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()); var i, s, n, a; for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top); if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) a = this.containers[i].element.offset(), this.containers[i].containerCache.left = a.left, this.containers[i].containerCache.top = a.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight(); return this }, _createPlaceholder: function (e) { e = e || this; var i, s = e.options; s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = { element: function () { var s = e.currentItem[0].nodeName.toLowerCase(), n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper"); return "tr" === s ? e.currentItem.children().each(function () { t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(n) }) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n }, update: function (t, n) { (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10))) } }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder) }, _contactContainers: function (s) { var n, a, o, r, h, l, c, u, d, p, f = null, m = null; for (n = this.containers.length - 1; n >= 0; n--) if (!t.contains(this.currentItem[0], this.containers[n].element[0])) if (this._intersectsWith(this.containers[n].containerCache)) { if (f && t.contains(this.containers[n].element[0], f.element[0])) continue; f = this.containers[n], m = n } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)), this.containers[n].containerCache.over = 0); if (f) if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", s, this._uiHash(this)), this.containers[m].containerCache.over = 1); else { for (o = 1e4, r = null, p = f.floating || i(this.currentItem), h = p ? "left" : "top", l = p ? "width" : "height", c = this.positionAbs[h] + this.offset.click[h], a = this.items.length - 1; a >= 0; a--) t.contains(this.containers[m].element[0], this.items[a].item[0]) && this.items[a].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[a].top, this.items[a].height)) && (u = this.items[a].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[a][l] - c) && (d = !0, u += this.items[a][l]), o > Math.abs(u - c) && (o = Math.abs(u - c), r = this.items[a], this.direction = d ? "up" : "down")); if (!r && !this.options.dropOnEmpty) return; if (this.currentContainer === this.containers[m]) return; r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[m].element, !0), this._trigger("change", s, this._uiHash()), this.containers[m]._trigger("change", s, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", s, this._uiHash(this)), this.containers[m].containerCache.over = 1 } }, _createHelper: function (e) { var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem; return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s }, _adjustOffsetFromHelper: function (e) { "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top) }, _getParentOffset: function () { this.offsetParent = this.helper.offsetParent(); var e = this.offsetParent.offset(); return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) } }, _getRelativeOffset: function () { if ("relative" === this.cssPosition) { var t = this.currentItem.position(); return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() } } return { top: 0, left: 0 } }, _cacheMargins: function () { this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 } }, _cacheHelperProportions: function () { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } }, _setContainment: function () { var e, i, s, n = this.options; "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]) }, _convertPositionTo: function (e, i) { i || (i = this.position); var s = "absolute" === e ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, a = /(html|body)/i.test(n[0].tagName); return { top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s } }, _generatePosition: function (e) { var i, s, n = this.options, a = e.pageX, o = e.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName); return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), { top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()), left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft()) } }, _rearrange: function (t, e, i, s) { i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1; var n = this.counter; this._delay(function () { n === this.counter && this.refreshPositions(!s) }) }, _clear: function (t, e) { this.reverting = !1; var i, s = []; if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) { for (i in this._storedCSS) ("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = ""); this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") } else this.currentItem.show(); for (this.fromOutside && !e && s.push(function (t) { this._trigger("receive", t, this._uiHash(this.fromOutside)) }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function (t) { this._trigger("update", t, this._uiHash()) }), this !== this.currentContainer && (e || (s.push(function (t) { this._trigger("remove", t, this._uiHash()) }), s.push(function (t) { return function (e) { t._trigger("receive", e, this._uiHash(this)) } }.call(this, this.currentContainer)), s.push(function (t) { return function (e) { t._trigger("update", e, this._uiHash(this)) } }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) e || s.push(function (t) { return function (e) { t._trigger("deactivate", e, this._uiHash(this)) } }.call(this, this.containers[i])), this.containers[i].containerCache.over && (s.push(function (t) { return function (e) { t._trigger("out", e, this._uiHash(this)) } }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0); if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) { if (!e) { for (this._trigger("beforeStop", t, this._uiHash()), i = 0; s.length > i; i++) s[i].call(this, t); this._trigger("stop", t, this._uiHash()) } return this.fromOutside = !1, !1 } if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) { for (i = 0; s.length > i; i++) s[i].call(this, t); this._trigger("stop", t, this._uiHash()) } return this.fromOutside = !1, !0 }, _trigger: function () { t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel() }, _uiHash: function (e) { var i = e || this; return { helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null } } }) })(jQuery); (function (t) { var e = 0, i = {}, s = {}; i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show", t.widget("ui.accordion", { version: "1.10.3", options: { active: 0, animate: {}, collapsible: !1, event: "click", header: "> li > :first-child,> :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null }, _create: function () { var e = this.options; this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || e.active !== !1 && null != e.active || (e.active = 0), this._processPanels(), 0 > e.active && (e.active += this.headers.length), this._refresh() }, _getCreateEventData: function () { return { header: this.active, panel: this.active.length ? this.active.next() : t(), content: this.active.length ? this.active.next() : t() } }, _createIcons: function () { var e = this.options.icons; e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons")) }, _destroyIcons: function () { this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove() }, _destroy: function () { var t; this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () { /^ui-accordion/.test(this.id) && this.removeAttribute("id") }), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () { /^ui-accordion/.test(this.id) && this.removeAttribute("id") }), "content" !== this.options.heightStyle && t.css("height", "") }, _setOption: function (t, e) { return "active" === t ? (this._activate(e), undefined) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || this.options.active !== !1 || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e), undefined) }, _keydown: function (e) { if (!e.altKey && !e.ctrlKey) { var i = t.ui.keyCode, s = this.headers.length, n = this.headers.index(e.target), a = !1; switch (e.keyCode) { case i.RIGHT: case i.DOWN: a = this.headers[(n + 1) % s]; break; case i.LEFT: case i.UP: a = this.headers[(n - 1 + s) % s]; break; case i.SPACE: case i.ENTER: this._eventHandler(e); break; case i.HOME: a = this.headers[0]; break; case i.END: a = this.headers[s - 1] } a && (t(e.target).attr("tabIndex", -1), t(a).attr("tabIndex", 0), a.focus(), e.preventDefault()) } }, _panelKeyDown: function (e) { e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus() }, refresh: function () { var e = this.options; this._processPanels(), e.active === !1 && e.collapsible === !0 || !this.headers.length ? (e.active = !1, this.active = t()) : e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh() }, _processPanels: function () { this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide() }, _refresh: function () { var i, s = this.options, n = s.heightStyle, a = this.element.parent(), o = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e); this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function (e) { var i = t(this), s = i.attr("id"), n = i.next(), a = n.attr("id"); s || (s = o + "-header-" + e, i.attr("id", s)), a || (a = o + "-panel-" + e, n.attr("id", a)), i.attr("aria-controls", a), n.attr("aria-labelledby", s) }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", tabIndex: -1 }).next().attr({ "aria-expanded": "false", "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", tabIndex: 0 }).next().attr({ "aria-expanded": "true", "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(s.event), "fill" === n ? (i = a.height(), this.element.siblings(":visible").each(function () { var e = t(this), s = e.css("position"); "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0)) }), this.headers.each(function () { i -= t(this).outerHeight(!0) }), this.headers.next().each(function () { t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height())) }).css("overflow", "auto")) : "auto" === n && (i = 0, this.headers.next().each(function () { i = Math.max(i, t(this).css("height", "").height()) }).height(i)) }, _activate: function (e) { var i = this._findActive(e)[0]; i !== this.active[0] && (i = i || this.active[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop })) }, _findActive: function (e) { return "number" == typeof e ? this.headers.eq(e) : t() }, _setupEvents: function (e) { var i = { keydown: "_keydown" }; e && t.each(e.split(" "), function (t, e) { i[e] = "_eventHandler" }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers) }, _eventHandler: function (e) { var i = this.options, s = this.active, n = t(e.currentTarget), a = n[0] === s[0], o = a && i.collapsible, r = o ? t() : n.next(), h = s.next(), l = { oldHeader: s, oldPanel: h, newHeader: o ? t() : n, newPanel: r }; e.preventDefault(), a && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = o ? !1 : this.headers.index(n), this.active = a ? t() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), a || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active"))) }, _toggle: function (e) { var i = e.newPanel, s = this.prevShow.length ? this.prevShow : e.oldPanel; this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, e) : (s.hide(), i.show(), this._toggleComplete(e)), s.attr({ "aria-expanded": "false", "aria-hidden": "true" }), s.prev().attr("aria-selected", "false"), i.length && s.length ? s.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function () { return 0 === t(this).attr("tabIndex") }).attr("tabIndex", -1), i.attr({ "aria-expanded": "true", "aria-hidden": "false" }).prev().attr({ "aria-selected": "true", tabIndex: 0 }) }, _animate: function (t, e, n) { var a, o, r, h = this, l = 0, c = t.length && (!e.length || t.index() < e.index()), u = this.options.animate || {}, d = c && u.down || u, p = function () { h._toggleComplete(n) }; return "number" == typeof d && (r = d), "string" == typeof d && (o = d), o = o || d.easing || u.easing, r = r || d.duration || u.duration, e.length ? t.length ? (a = t.show().outerHeight(), e.animate(i, { duration: r, easing: o, step: function (t, e) { e.now = Math.round(t) } }), t.hide().animate(s, { duration: r, easing: o, complete: p, step: function (t, i) { i.now = Math.round(t), "height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(a - e.outerHeight() - l), l = 0) } }), undefined) : e.animate(i, r, o, p) : t.animate(s, r, o, p) }, _toggleComplete: function (t) { var e = t.oldPanel; e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t) } }) })(jQuery); (function (t) { var e = 0; t.widget("ui.autocomplete", { version: "1.10.3", defaultElement: "<input>", options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, pending: 0, _create: function () { var e, i, s, n = this.element[0].nodeName.toLowerCase(), a = "textarea" === n, o = "input" === n; this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, { keydown: function (n) { if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, undefined; e = !1, s = !1, i = !1; var a = t.ui.keyCode; switch (n.keyCode) { case a.PAGE_UP: e = !0, this._move("previousPage", n); break; case a.PAGE_DOWN: e = !0, this._move("nextPage", n); break; case a.UP: e = !0, this._keyEvent("previous", n); break; case a.DOWN: e = !0, this._keyEvent("next", n); break; case a.ENTER: case a.NUMPAD_ENTER: this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n)); break; case a.TAB: this.menu.active && this.menu.select(n); break; case a.ESCAPE: this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault()); break; default: i = !0, this._searchTimeout(n) } }, keypress: function (s) { if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), undefined; if (!i) { var n = t.ui.keyCode; switch (s.keyCode) { case n.PAGE_UP: this._move("previousPage", s); break; case n.PAGE_DOWN: this._move("nextPage", s); break; case n.UP: this._keyEvent("previous", s); break; case n.DOWN: this._keyEvent("next", s) } } }, input: function (t) { return s ? (s = !1, t.preventDefault(), undefined) : (this._searchTimeout(t), undefined) }, focus: function () { this.selectedItem = null, this.previous = this._value() }, blur: function (t) { return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(t), this._change(t), undefined) } }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().data("ui-menu"), this._on(this.menu.element, { mousedown: function (e) { e.preventDefault(), this.cancelBlur = !0, this._delay(function () { delete this.cancelBlur }); var i = this.menu.element[0]; t(e.target).closest(".ui-menu-item").length || this._delay(function () { var e = this; this.document.one("mousedown", function (s) { s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close() }) }) }, menufocus: function (e, i) { if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function () { t(e.target).trigger(e.originalEvent) }), undefined; var s = i.item.data("ui-autocomplete-item"); !1 !== this._trigger("focus", e, { item: s }) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value) }, menuselect: function (t, e) { var i = e.item.data("ui-autocomplete-item"), s = this.previous; this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () { this.previous = s, this.selectedItem = i })), !1 !== this._trigger("select", t, { item: i }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i } }), this.liveRegion = t("<span>", { role: "status", "aria-live": "polite" }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, { beforeunload: function () { this.element.removeAttr("autocomplete") } }) }, _destroy: function () { clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove() }, _setOption: function (t, e) { this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort() }, _appendTo: function () { var e = this.options.appendTo; return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e }, _initSource: function () { var e, i, s = this; t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) { s(t.ui.autocomplete.filter(e, i.term)) }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) { s.xhr && s.xhr.abort(), s.xhr = t.ajax({ url: i, data: e, dataType: "json", success: function (t) { n(t) }, error: function () { n([]) } }) }) : this.source = this.options.source }, _searchTimeout: function (t) { clearTimeout(this.searching), this.searching = this._delay(function () { this.term !== this._value() && (this.selectedItem = null, this.search(null, t)) }, this.options.delay) }, search: function (t, e) { return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : undefined }, _search: function (t) { this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: t }, this._response()) }, _response: function () { var t = this, i = ++e; return function (s) { i === e && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading") } }, __response: function (t) { t && (t = this._normalize(t)), this._trigger("response", null, { content: t }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close() }, close: function (t) { this.cancelSearch = !0, this._close(t) }, _close: function (t) { this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t)) }, _change: function (t) { this.previous !== this._value() && this._trigger("change", t, { item: this.selectedItem }) }, _normalize: function (e) { return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) { return "string" == typeof e ? { label: e, value: e } : t.extend({ label: e.label || e.value, value: e.value || e.label }, e) }) }, _suggest: function (e) { var i = this.menu.element.empty(); this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next() }, _resizeMenu: function () { var t = this.menu.element; t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())) }, _renderMenu: function (e, i) { var s = this; t.each(i, function (t, i) { s._renderItemData(e, i) }) }, _renderItemData: function (t, e) { return this._renderItem(t, e).data("ui-autocomplete-item", e) }, _renderItem: function (e, i) { return t("<li>").append(t("<a>").text(i.label)).appendTo(e) }, _move: function (t, e) { return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[t](e), undefined) : (this.search(null, e), undefined) }, widget: function () { return this.menu.element }, _value: function () { return this.valueMethod.apply(this.element, arguments) }, _keyEvent: function (t, e) { (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault()) } }), t.extend(t.ui.autocomplete, { escapeRegex: function (t) { return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }, filter: function (e, i) { var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i"); return t.grep(e, function (t) { return s.test(t.label || t.value || t) }) } }), t.widget("ui.autocomplete", t.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function (t) { return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate." } } }, __response: function (t) { var e; this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e)) } }) })(jQuery); (function (t) { var e, i, s, n, a = "ui-button ui-widget ui-state-default ui-corner-all", o = "ui-state-hover ui-state-active ", r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", h = function () { var e = t(this); setTimeout(function () { e.find(":ui-button").button("refresh") }, 1) }, l = function (e) { var i = e.name, s = e.form, n = t([]); return i && (i = i.replace(/'/g, "\\'"), n = s ? t(s).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function () { return !this.form })), n }; t.widget("ui.button", { version: "1.10.3", defaultElement: "<button>", options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } }, _create: function () { this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title"); var o = this, r = this.options, c = "checkbox" === this.type || "radio" === this.type, u = c ? "" : "ui-state-active", d = "ui-state-focus"; null === r.label && (r.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(a).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () { r.disabled || this === e && t(this).addClass("ui-state-active") }).bind("mouseleave" + this.eventNamespace, function () { r.disabled || t(this).removeClass(u) }).bind("click" + this.eventNamespace, function (t) { r.disabled && (t.preventDefault(), t.stopImmediatePropagation()) }), this.element.bind("focus" + this.eventNamespace, function () { o.buttonElement.addClass(d) }).bind("blur" + this.eventNamespace, function () { o.buttonElement.removeClass(d) }), c && (this.element.bind("change" + this.eventNamespace, function () { n || o.refresh() }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (t) { r.disabled || (n = !1, i = t.pageX, s = t.pageY) }).bind("mouseup" + this.eventNamespace, function (t) { r.disabled || (i !== t.pageX || s !== t.pageY) && (n = !0) })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () { return r.disabled || n ? !1 : undefined }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () { if (r.disabled || n) return !1; t(this).addClass("ui-state-active"), o.buttonElement.attr("aria-pressed", "true"); var e = o.element[0]; l(e).not(e).map(function () { return t(this).button("widget")[0] }).removeClass("ui-state-active").attr("aria-pressed", "false") }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () { return r.disabled ? !1 : (t(this).addClass("ui-state-active"), e = this, o.document.one("mouseup", function () { e = null }), undefined) }).bind("mouseup" + this.eventNamespace, function () { return r.disabled ? !1 : (t(this).removeClass("ui-state-active"), undefined) }).bind("keydown" + this.eventNamespace, function (e) { return r.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"), undefined) }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () { t(this).removeClass("ui-state-active") }), this.buttonElement.is("a") && this.buttonElement.keyup(function (e) { e.keyCode === t.ui.keyCode.SPACE && t(this).click() })), this._setOption("disabled", r.disabled), this._resetButton() }, _determineButtonType: function () { var t, e, i; this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element }, widget: function () { return this.buttonElement }, _destroy: function () { this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(a + " " + o + " " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title") }, _setOption: function (t, e) { return this._super(t, e), "disabled" === t ? (e ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), undefined) : (this._resetButton(), undefined) }, refresh: function () { var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled"); e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? l(this.element[0]).each(function () { t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false") }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")) }, _resetButton: function () { if ("input" === this.type) return this.options.label && this.element.val(this.options.label), undefined; var e = this.buttonElement.removeClass(r), i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(), s = this.options.icons, n = s.primary && s.secondary, a = []; s.primary || s.secondary ? (this.options.text && a.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (a.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : a.push("ui-button-text-only"), e.addClass(a.join(" ")) } }), t.widget("ui.buttonset", { version: "1.10.3", options: { items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)" }, _create: function () { this.element.addClass("ui-buttonset") }, _init: function () { this.refresh() }, _setOption: function (t, e) { "disabled" === t && this.buttons.button("option", t, e), this._super(t, e) }, refresh: function () { var e = "rtl" === this.element.css("direction"); this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () { return t(this).button("widget")[0] }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end() }, _destroy: function () { this.element.removeClass("ui-buttonset"), this.buttons.map(function () { return t(this).button("widget")[0] }).removeClass("ui-corner-left ui-corner-right").end().button("destroy") } }) })(jQuery); (function (t, e)
    {
        function i() { this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) } function s(e) { var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"; return e.delegate(i, "mouseout", function () { t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover") }).delegate(i, "mouseover", function () { t.datepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover")) }) } function n(e, i) { t.extend(e, i); for (var s in i) null == i[s] && (e[s] = i[s]); return e } t.extend(t.ui, { datepicker: { version: "1.10.3" } }); var a, r = "datepicker"; t.extend(i.prototype, {
            markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function () { return this.dpDiv }, setDefaults: function (t) { return n(this._defaults, t || {}), this }, _attachDatepicker: function (e, i) { var s, n, a; s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), a = this._newInst(t(e), n), a.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a) }, _newInst: function (e, i) { var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); return { id: n, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv } }, _connectDatepicker: function (e, i) { var s = t(e); i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, r, i), i.settings.disabled && this._disableDatepicker(e)) }, _attachments: function (e, i) { var s, n, a, r = this._get(i, "appendText"), o = this._get(i, "isRTL"); i.append && i.append.remove(), r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"), e[o ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({ src: a, alt: n, title: n }) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({ src: a, alt: n, title: n }) : n)), e[o ? "before" : "after"](i.trigger), i.trigger.click(function () { return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1 })) }, _autoSize: function (t) { if (this._get(t, "autoSize") && !t.inline) { var e, i, s, n, a = new Date(2009, 11, 20), r = this._get(t, "dateFormat"); r.match(/[DM]/) && (e = function (t) { for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n); return s }, a.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), t.input.attr("size", this._formatDate(t, a).length) } }, _inlineDatepicker: function (e, i) { var s = t(e); s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, r, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block")) }, _dialogDatepicker: function (e, i, s, a, o) { var h, l, c, u, d, p = this._dialogInst; return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], r, p)), n(p.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], r, p), this }, _destroyDatepicker: function (e) { var i, s = t(e), n = t.data(e, r); s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, r), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty()) }, _enableDatepicker: function (e) { var i, s, n = t(e), a = t.data(e, r); n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, a.trigger.filter("button").each(function () { this.disabled = !1 }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) { return t === e ? null : t })) }, _disableDatepicker: function (e) { var i, s, n = t(e), a = t.data(e, r); n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, a.trigger.filter("button").each(function () { this.disabled = !0 }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) { return t === e ? null : t }), this._disabledInputs[this._disabledInputs.length] = e) }, _isDisabledDatepicker: function (t) { if (!t) return !1; for (var e = 0; this._disabledInputs.length > e; e++) if (this._disabledInputs[e] === t) return !0; return !1 }, _getInst: function (e) { try { return t.data(e, r) } catch (i) { throw "Missing instance data for this datepicker" } }, _optionDatepicker: function (i, s, a) { var r, o, h, l, c = this._getInst(i); return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (r = s || {}, "string" == typeof s && (r = {}, r[s] = a), c && (this._curInst === c && this._hideDatepicker(), o = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, r), null !== h && r.dateFormat !== e && r.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && r.dateFormat !== e && r.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, o), this._updateAlternate(c), this._updateDatepicker(c)), e) }, _changeDatepicker: function (t, e, i) { this._optionDatepicker(t, e, i) }, _refreshDatepicker: function (t) { var e = this._getInst(t); e && this._updateDatepicker(e) }, _setDateDatepicker: function (t, e) { var i = this._getInst(t); i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i)) }, _getDateDatepicker: function (t, e) { var i = this._getInst(t); return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null }, _doKeyDown: function (e) { var i, s, n, a = t.datepicker._getInst(e.target), r = !0, o = a.dpDiv.is(".ui-datepicker-rtl"); if (a._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) { case 9: t.datepicker._hideDatepicker(), r = !1; break; case 13: return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", a.dpDiv), n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]), i = t.datepicker._get(a, "onSelect"), i ? (s = t.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : t.datepicker._hideDatepicker(), !1; case 27: t.datepicker._hideDatepicker(); break; case 33: t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M"); break; case 34: t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M"); break; case 35: (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), r = e.ctrlKey || e.metaKey; break; case 36: (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), r = e.ctrlKey || e.metaKey; break; case 37: (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? 1 : -1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M"); break; case 38: (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), r = e.ctrlKey || e.metaKey; break; case 39: (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? -1 : 1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M"); break; case 40: (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), r = e.ctrlKey || e.metaKey; break; default: r = !1 } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : r = !1; r && (e.preventDefault(), e.stopPropagation()) }, _doKeyPress: function (i) { var s, n, a = t.datepicker._getInst(i.target); return t.datepicker._get(a, "constrainInput") ? (s = t.datepicker._possibleChars(t.datepicker._get(a, "dateFormat")), n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e }, _doKeyUp: function (e) { var i, s = t.datepicker._getInst(e.target); if (s.input.val() !== s.lastVal) try { i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s)) } catch (n) { } return !0 }, _showDatepicker: function (e) { if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) { var i, s, a, r, o, h, l; i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), a = s ? s.apply(e, [e, i]) : {}, a !== !1 && (n(i.settings, a), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function () { return r |= "fixed" === t(this).css("position"), !r }), o = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), t.datepicker._updateDatepicker(i), o = t.datepicker._checkOffset(i, o, r), i.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: o.left + "px", top: o.top + "px" }), i.inline || (h = t.datepicker._get(i, "showAnim"), l = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i)) } }, _updateDatepicker: function (e) { this.maxRows = 4, a = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover(); var i, s = this._getNumberOfMonths(e), n = s[1], r = 17; e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", r * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function () { i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null }, 0)) }, _shouldFocusInput: function (t) { return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus") }, _checkOffset: function (e, i, s) { var n = e.dpDiv.outerWidth(), a = e.dpDiv.outerHeight(), r = e.input ? e.input.outerWidth() : 0, o = e.input ? e.input.outerHeight() : 0, h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()), l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop()); return i.left -= this._get(e, "isRTL") ? n - r : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + o ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + o) : 0), i }, _findPos: function (e) { for (var i, s = this._getInst(e), n = this._get(s, "isRTL") ; e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e)) ;) e = e[n ? "previousSibling" : "nextSibling"]; return i = t(e).offset(), [i.left, i.top] }, _hideDatepicker: function (e) { var i, s, n, a, o = this._curInst; !o || e && o !== t.data(e, r) || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function () { t.datepicker._tidyDialog(o) }, t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1) }, _tidyDialog: function (t) { t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar") }, _checkExternalClick: function (e) { if (t.datepicker._curInst) { var i = t(e.target), s = t.datepicker._getInst(i[0]); (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker() } }, _adjustDate: function (e, i, s) { var n = t(e), a = this._getInst(n[0]); this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a)) }, _gotoToday: function (e) { var i, s = t(e), n = this._getInst(s[0]); this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s) }, _selectMonthYear: function (e, i, s) { var n = t(e), a = this._getInst(n[0]); a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n) }, _selectDay: function (e, i, s, n) { var a, r = t(e); t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (a = this._getInst(r[0]), a.selectedDay = a.currentDay = t("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear))) }, _clearDate: function (e) { var i = t(e); this._selectDate(i, "") }, _selectDate: function (e, i) { var s, n = t(e), a = this._getInst(n[0]); i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null) }, _updateAlternate: function (e) { var i, s, n, a = this._get(e, "altField"); a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).each(function () { t(this).val(n) })) }, noWeekends: function (t) { var e = t.getDay(); return [e > 0 && 6 > e, ""] }, iso8601Week: function (t) { var e, i = new Date(t.getTime()); return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1 }, parseDate: function (i, s, n) { if (null == i || null == s) throw "Invalid arguments"; if (s = "object" == typeof s ? "" + s : s + "", "" === s) return null; var a, r, o, h, l = 0, c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, p = (n ? n.dayNames : null) || this._defaults.dayNames, f = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, m = (n ? n.monthNames : null) || this._defaults.monthNames, g = -1, v = -1, _ = -1, b = -1, y = !1, x = function (t) { var e = i.length > a + 1 && i.charAt(a + 1) === t; return e && a++, e }, k = function (t) { var e = x(t), i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2, n = RegExp("^\\d{1," + i + "}"), a = s.substring(l).match(n); if (!a) throw "Missing number at position " + l; return l += a[0].length, parseInt(a[0], 10) }, w = function (i, n, a) { var r = -1, o = t.map(x(i) ? a : n, function (t, e) { return [[e, t]] }).sort(function (t, e) { return -(t[1].length - e[1].length) }); if (t.each(o, function (t, i) { var n = i[1]; return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = i[0], l += n.length, !1) : e }), -1 !== r) return r + 1; throw "Unknown name at position " + l }, D = function () { if (s.charAt(l) !== i.charAt(a)) throw "Unexpected literal at position " + l; l++ }; for (a = 0; i.length > a; a++) if (y) "'" !== i.charAt(a) || x("'") ? D() : y = !1; else switch (i.charAt(a)) { case "d": _ = k("d"); break; case "D": w("D", d, p); break; case "o": b = k("o"); break; case "m": v = k("m"); break; case "M": v = w("M", f, m); break; case "y": g = k("y"); break; case "@": h = new Date(k("@")), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate(); break; case "!": h = new Date((k("!") - this._ticksTo1970) / 1e4), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate(); break; case "'": x("'") ? D() : y = !0; break; default: D() } if (s.length > l && (o = s.substr(l), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o; if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)), b > -1) for (v = 1, _ = b; ;) { if (r = this._getDaysInMonth(g, v - 1), r >= _) break; v++, _ -= r } if (h = this._daylightSavingAdjust(new Date(g, v - 1, _)), h.getFullYear() !== g || h.getMonth() + 1 !== v || h.getDate() !== _) throw "Invalid date"; return h }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function (t, e, i) { if (!e) return ""; var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, a = (i ? i.dayNames : null) || this._defaults.dayNames, r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, o = (i ? i.monthNames : null) || this._defaults.monthNames, h = function (e) { var i = t.length > s + 1 && t.charAt(s + 1) === e; return i && s++, i }, l = function (t, e, i) { var s = "" + e; if (h(t)) for (; i > s.length;) s = "0" + s; return s }, c = function (t, e, i, s) { return h(t) ? s[e] : i[e] }, u = "", d = !1; if (e) for (s = 0; t.length > s; s++) if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1; else switch (t.charAt(s)) { case "d": u += l("d", e.getDate(), 2); break; case "D": u += c("D", e.getDay(), n, a); break; case "o": u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3); break; case "m": u += l("m", e.getMonth() + 1, 2); break; case "M": u += c("M", e.getMonth(), r, o); break; case "y": u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100; break; case "@": u += e.getTime(); break; case "!": u += 1e4 * e.getTime() + this._ticksTo1970; break; case "'": h("'") ? u += "'" : d = !0; break; default: u += t.charAt(s) } return u }, _possibleChars: function (t) { var e, i = "", s = !1, n = function (i) { var s = t.length > e + 1 && t.charAt(e + 1) === i; return s && e++, s }; for (e = 0; t.length > e; e++) if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1; else switch (t.charAt(e)) { case "d": case "m": case "y": case "@": i += "0123456789"; break; case "D": case "M": return null; case "'": n("'") ? i += "'" : s = !0; break; default: i += t.charAt(e) } return i }, _get: function (t, i) { return t.settings[i] !== e ? t.settings[i] : this._defaults[i] }, _setDateFromField: function (t, e) { if (t.input.val() !== t.lastVal) { var i = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null, n = this._getDefaultDate(t), a = n, r = this._getFormatConfig(t); try { a = this.parseDate(i, s, r) || n } catch (o) { s = e ? "" : s } t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), t.currentDay = s ? a.getDate() : 0, t.currentMonth = s ? a.getMonth() : 0, t.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(t) } }, _getDefaultDate: function (t) { return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date)) }, _determineDate: function (e, i, s) { var n = function (t) { var e = new Date; return e.setDate(e.getDate() + t), e }, a = function (i) { try { return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e)) } catch (s) { } for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), r = n.getMonth(), o = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i) ; l;) { switch (l[2] || "d") { case "d": case "D": o += parseInt(l[1], 10); break; case "w": case "W": o += 7 * parseInt(l[1], 10); break; case "m": case "M": r += parseInt(l[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(a, r)); break; case "y": case "Y": a += parseInt(l[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(a, r)) } l = h.exec(i) } return new Date(a, r, o) }, r = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime()); return r = r && "Invalid Date" == "" + r ? s : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r) }, _daylightSavingAdjust: function (t) { return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null }, _setDate: function (t, e, i) { var s = !e, n = t.selectedMonth, a = t.selectedYear, r = this._restrictMinMax(t, this._determineDate(t, e, new Date)); t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t)) }, _getDate: function (t) { var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay)); return e }, _attachHandlers: function (e) { var i = this._get(e, "stepMonths"), s = "#" + e.id.replace(/\\\\/g, "\\"); e.dpDiv.find("[data-handler]").map(function () { var e = { prev: function () { t.datepicker._adjustDate(s, -i, "M") }, next: function () { t.datepicker._adjustDate(s, +i, "M") }, hide: function () { t.datepicker._hideDatepicker() }, today: function () { t.datepicker._gotoToday(s) }, selectDay: function () { return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1 }, selectMonth: function () { return t.datepicker._selectMonthYear(s, this, "M"), !1 }, selectYear: function () { return t.datepicker._selectMonthYear(s, this, "Y"), !1 } }; t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]) }) }, _generateHTML: function (t) { var e, i, s, n, a, r, o, h, l, c, u, d, p, f, m, g, v, _, b, y, x, k, w, D, T, C, M, S, N, I, P, A, z, H, E, F, O, W, j, R = new Date, L = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())), Y = this._get(t, "isRTL"), B = this._get(t, "showButtonPanel"), J = this._get(t, "hideIfNoPrevNext"), K = this._get(t, "navigationAsDateFormat"), Q = this._getNumberOfMonths(t), V = this._get(t, "showCurrentAtPos"), U = this._get(t, "stepMonths"), q = 1 !== Q[0] || 1 !== Q[1], X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)), G = this._getMinMaxDate(t, "min"), $ = this._getMinMaxDate(t, "max"), Z = t.drawMonth - V, te = t.drawYear; if (0 > Z && (Z += 12, te--), $) for (e = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - Q[0] * Q[1] + 1, $.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--); for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - U, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : J ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + U, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : J ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", r = this._get(t, "currentText"), o = this._get(t, "gotoCurrent") && t.currentDay ? X : L, r = K ? this.formatDate(r, o, this._getFormatConfig(t)) : r, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; Q[0] > k; k++) { for (w = "", this.maxRows = 4, D = 0; Q[1] > D; D++) { if (T = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), C = " ui-corner-all", M = "", q) { if (M += "<div class='ui-datepicker-group", Q[1] > 1) switch (D) { case 0: M += " ui-datepicker-group-first", C = " ui-corner-" + (Y ? "right" : "left"); break; case Q[1] - 1: M += " ui-datepicker-group-last", C = " ui-corner-" + (Y ? "left" : "right"); break; default: M += " ui-datepicker-group-middle", C = "" } M += "'>" } for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && 0 === k ? Y ? a : s : "") + (/all|right/.test(C) && 0 === k ? Y ? s : a : "") + this._generateMonthYearHeader(t, Z, te, G, $, k > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", S = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) N = (x + c) % 7, S += "<th" + ((x + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[N] + "'>" + p[N] + "</span></th>"; for (M += S + "</tr></thead><tbody>", I = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), P = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((P + I) / 7), z = q ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = z, H = this._daylightSavingAdjust(new Date(te, Z, 1 - P)), E = 0; z > E; E++) { for (M += "<tr>", F = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>" : "", x = 0; 7 > x; x++) O = g ? g.apply(t.input ? t.input[0] : null, [H]) : [!0, ""], W = H.getMonth() !== Z, j = W && !_ || !O[0] || G && G > H || $ && H > $, F += "<td class='" + ((x + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (j ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + O[1] + (H.getTime() === X.getTime() ? " " + this._currentClass : "") + (H.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : j ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === L.getTime() ? " ui-state-highlight" : "") + (H.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H); M += F + "</tr>" } Z++, Z > 11 && (Z = 0, te++), M += "</tbody></table>" + (q ? "</div>" + (Q[0] > 0 && D === Q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), w += M } y += w } return y += l, t._keyEvent = !1, y }, _generateMonthYearHeader: function (t, e, i, s, n, a, r, o)
            {
                var h, l, c, u, d, p, f, m, g = this._get(t, "changeMonth"), v = this._get(t, "changeYear"), _ = this._get(t, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = ""; if (a || !g) y += "<span class='ui-datepicker-month'>" + r[e] + "</span>"; else { for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++) (!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + o[c] + "</option>"); y += "</select>" } if (_ || (b += y + (!a && g && v ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>"; else
                {
                    for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function (t)
                    {
                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                    return isNaN(e) ? d : e
                    }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>"; t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                } return b += this._get(t, "yearSuffix"), _ && (b += (!a && g && v ? "" : "&#xa0;") + y), b += "</div>"
            }, _adjustInstDate: function (t, e, i) { var s = t.drawYear + ("Y" === i ? e : 0), n = t.drawMonth + ("M" === i ? e : 0), a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0), r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a))); t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t) }, _restrictMinMax: function (t, e) { var i = this._getMinMaxDate(t, "min"), s = this._getMinMaxDate(t, "max"), n = i && i > e ? i : e; return s && n > s ? s : n }, _notifyChange: function (t) { var e = this._get(t, "onChangeMonthYear"); e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]) }, _getNumberOfMonths: function (t) { var e = this._get(t, "numberOfMonths"); return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e }, _getMinMaxDate: function (t, e) { return this._determineDate(t, this._get(t, e + "Date"), null) }, _getDaysInMonth: function (t, e) { return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate() }, _getFirstDayOfMonth: function (t, e) { return new Date(t, e, 1).getDay() }, _canAdjustMonth: function (t, e, i, s) { var n = this._getNumberOfMonths(t), a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1)); return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a) }, _isInRange: function (t, e) { var i, s, n = this._getMinMaxDate(t, "min"), a = this._getMinMaxDate(t, "max"), r = null, o = null, h = this._get(t, "yearRange"); return h && (i = h.split(":"), s = (new Date).getFullYear(), r = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += s), i[1].match(/[+\-].*/) && (o += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!r || e.getFullYear() >= r) && (!o || o >= e.getFullYear()) }, _getFormatConfig: function (t) { var e = this._get(t, "shortYearCutoff"); return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), { shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames") } }, _formatDate: function (t, e, i, s) { e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear); var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay)); return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t)) }
        }), t.fn.datepicker = function (e) { if (!this.length) return this; t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv); var i = Array.prototype.slice.call(arguments, 1); return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () { "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e) }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
    })(jQuery); (function (t) { var e = { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 }, i = { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 }; t.widget("ui.dialog", { version: "1.10.3", options: { appendTo: "body", autoOpen: !0, buttons: [], closeOnEscape: !0, closeText: "close", dialogClass: "", draggable: !0, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: !1, position: { my: "center", at: "center", of: window, collision: "fit", using: function (e) { var i = t(this).css(e).offset().top; 0 > i && t(this).css("top", e.top - i) } }, resizable: !0, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null }, _create: function () { this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1 }, _init: function () { this.options.autoOpen && this.open() }, _appendTo: function () { var e = this.options.appendTo; return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0) }, _destroy: function () { var t, e = this.originalPosition; this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element) }, widget: function () { return this.uiDialog }, disable: t.noop, enable: t.noop, close: function (e) { var i = this; this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function () { i._trigger("close", e) })) }, isOpen: function () { return this._isOpen }, moveToTop: function () { this._moveToTop() }, _moveToTop: function (t, e) { var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length; return i && !e && this._trigger("focus", t), i }, open: function () { var e = this; return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function () { e._focusTabbable(), e._trigger("focus") }), this._trigger("open"), undefined) }, _focusTabbable: function () { var t = this.element.find("[autofocus]"); t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus() }, _keepFocus: function (e) { function i() { var e = this.document[0].activeElement, i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e); i || this._focusTabbable() } e.preventDefault(), i.call(this), this._delay(i) }, _createWrapper: function () { this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._on(this.uiDialog, { keydown: function (e) { if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), undefined; if (e.keyCode === t.ui.keyCode.TAB) { var i = this.uiDialog.find(":tabbable"), s = i.filter(":first"), n = i.filter(":last"); e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (n.focus(1), e.preventDefault()) : (s.focus(1), e.preventDefault()) } }, mousedown: function (t) { this._moveToTop(t) && this._focusTabbable() } }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") }) }, _createTitlebar: function () { var e; this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, { mousedown: function (e) { t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus() } }), this.uiDialogTitlebarClose = t("<button></button>").button({ label: this.options.closeText, icons: { primary: "ui-icon-closethick" }, text: !1 }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, { click: function (t) { t.preventDefault(), this.close(t) } }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({ "aria-labelledby": e.attr("id") }) }, _title: function (t) { this.options.title || t.html("&#160;"), t.text(this.options.title) }, _createButtonPane: function () { this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons() }, _createButtons: function () { var e = this, i = this.options.buttons; return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (t.each(i, function (i, s) { var n, a; s = t.isFunction(s) ? { click: s, text: i } : s, s = t.extend({ type: "button" }, s), n = s.click, s.click = function () { n.apply(e.element[0], arguments) }, a = { icons: s.icons, text: s.showText }, delete s.icons, delete s.showText, t("<button></button>", s).button(a).appendTo(e.uiButtonSet) }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined) }, _makeDraggable: function () { function e(t) { return { position: t.position, offset: t.offset } } var i = this, s = this.options; this.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function (s, n) { t(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n)) }, drag: function (t, s) { i._trigger("drag", t, e(s)) }, stop: function (n, a) { s.position = [a.position.left - i.document.scrollLeft(), a.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(a)) } }) }, _makeResizable: function () { function e(t) { return { originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size } } var i = this, s = this.options, n = s.resizable, a = this.uiDialog.css("position"), o = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw"; this.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: s.maxWidth, maxHeight: s.maxHeight, minWidth: s.minWidth, minHeight: this._minHeight(), handles: o, start: function (s, n) { t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n)) }, resize: function (t, s) { i._trigger("resize", t, e(s)) }, stop: function (n, a) { s.height = t(this).height(), s.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(a)) } }).css("position", a) }, _minHeight: function () { var t = this.options; return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height) }, _position: function () { var t = this.uiDialog.is(":visible"); t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide() }, _setOptions: function (s) { var n = this, a = !1, o = {}; t.each(s, function (t, s) { n._setOption(t, s), t in e && (a = !0), t in i && (o[t] = s) }), a && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", o) }, _setOption: function (t, e) { var i, s, n = this.uiDialog; "dialogClass" === t && n.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({ label: "" + e }), "draggable" === t && (i = n.is(":data(ui-draggable)"), i && !e && n.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (s = n.is(":data(ui-resizable)"), s && !e && n.resizable("destroy"), s && "string" == typeof e && n.resizable("option", "handles", e), s || e === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))) }, _size: function () { var t, e, i, s = this.options; this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({ height: "auto", width: s.width }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight()) }, _blockFrames: function () { this.iframeBlocks = this.document.find("iframe").map(function () { var e = t(this); return t("<div>").css({ position: "absolute", width: e.outerWidth(), height: e.outerHeight() }).appendTo(e.parent()).offset(e.offset())[0] }) }, _unblockFrames: function () { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) }, _allowInteraction: function (e) { return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length }, _createOverlay: function () { if (this.options.modal) { var e = this, i = this.widgetFullName; t.ui.dialog.overlayInstances || this._delay(function () { t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function (s) { e._allowInteraction(s) || (s.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable()) }) }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, { mousedown: "_keepFocus" }), t.ui.dialog.overlayInstances++ } }, _destroyOverlay: function () { this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null) } }), t.ui.dialog.overlayInstances = 0, t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, { _position: function () { var e, i = this.options.position, s = [], n = [0, 0]; i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (s = i.split ? i.split(" ") : [i[0], i[1]], 1 === s.length && (s[1] = s[0]), t.each(["left", "top"], function (t, e) { +s[t] === s[t] && (n[t] = s[t], s[t] = e) }), i = { my: s[0] + (0 > n[0] ? n[0] : "+" + n[0]) + " " + s[1] + (0 > n[1] ? n[1] : "+" + n[1]), at: s.join(" ") }), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide() } }) })(jQuery); (function (t) { t.widget("ui.menu", { version: "1.10.3", defaultElement: "<ul>", delay: 300, options: { icons: { submenu: "ui-icon-carat-1-e" }, menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null }, _create: function () { this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }).bind("click" + this.eventNamespace, t.proxy(function (t) { this.options.disabled && t.preventDefault() }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({ "mousedown .ui-menu-item > a": function (t) { t.preventDefault() }, "click .ui-state-disabled > a": function (t) { t.preventDefault() }, "click .ui-menu-item:has(a)": function (e) { var i = t(e.target).closest(".ui-menu-item"); !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer))) }, "mouseenter .ui-menu-item": function (e) { var i = t(e.currentTarget); i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i) }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (t, e) { var i = this.active || this.element.children(".ui-menu-item").eq(0); e || this.focus(t, i) }, blur: function (e) { this._delay(function () { t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e) }) }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function (e) { t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1 } }) }, _destroy: function () { this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () { var e = t(this); e.data("ui-menu-submenu-carat") && e.remove() }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content") }, _keydown: function (e) { function i(t) { return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") } var s, n, a, o, r, h = !0; switch (e.keyCode) { case t.ui.keyCode.PAGE_UP: this.previousPage(e); break; case t.ui.keyCode.PAGE_DOWN: this.nextPage(e); break; case t.ui.keyCode.HOME: this._move("first", "first", e); break; case t.ui.keyCode.END: this._move("last", "last", e); break; case t.ui.keyCode.UP: this.previous(e); break; case t.ui.keyCode.DOWN: this.next(e); break; case t.ui.keyCode.LEFT: this.collapse(e); break; case t.ui.keyCode.RIGHT: this.active && !this.active.is(".ui-state-disabled") && this.expand(e); break; case t.ui.keyCode.ENTER: case t.ui.keyCode.SPACE: this._activate(e); break; case t.ui.keyCode.ESCAPE: this.collapse(e); break; default: h = !1, n = this.previousFilter || "", a = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), a === n ? o = !0 : a = n + a, r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function () { return r.test(t(this).children("a").text()) }), s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (a = String.fromCharCode(e.keyCode), r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function () { return r.test(t(this).children("a").text()) })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = a, this.filterTimer = this._delay(function () { delete this.previousFilter }, 1e3)) : delete this.previousFilter) : delete this.previousFilter } h && e.preventDefault() }, _activate: function (t) { this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t)) }, refresh: function () { var e, i = this.options.icons.submenu, s = this.element.find(this.options.menus); s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function () { var e = t(this), s = e.prev("a"), n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0); s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id")) }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({ tabIndex: -1, role: this._itemRole() }), e.children(":not(.ui-menu-item)").each(function () { var e = t(this); /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider") }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur() }, _itemRole: function () { return { menu: "menuitem", listbox: "option" }[this.options.role] }, _setOption: function (t, e) { "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e) }, focus: function (t, e) { var i, s; this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () { this._close() }, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, { item: e }) }, _scrollIntoView: function (e) { var i, s, n, a, o, r; this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r)) }, blur: function (t, e) { e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, { item: this.active })) }, _startOpening: function (t) { clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () { this._close(), this._open(t) }, this.delay)) }, _open: function (e) { var i = t.extend({ of: this.active }, this.options.position); clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i) }, collapseAll: function (e, i) { clearTimeout(this.timer), this.timer = this._delay(function () { var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu")); s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s }, this.delay) }, _close: function (t) { t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active") }, collapse: function (t) { var e = this.active && this.active.parent().closest(".ui-menu-item", this.element); e && e.length && (this._close(), this.focus(t, e)) }, expand: function (t) { var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first(); e && e.length && (this._open(e.parent()), this._delay(function () { this.focus(t, e) })) }, next: function (t) { this._move("next", "first", t) }, previous: function (t) { this._move("prev", "last", t) }, isFirstItem: function () { return this.active && !this.active.prevAll(".ui-menu-item").length }, isLastItem: function () { return this.active && !this.active.nextAll(".ui-menu-item").length }, _move: function (t, e, i) { var s; this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s) }, nextPage: function (e) { var i, s, n; return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () { return i = t(this), 0 > i.offset().top - s - n }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined) }, previousPage: function (e) { var i, s, n; return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () { return i = t(this), i.offset().top - s + n > 0 }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined) }, _hasScroll: function () { return this.element.outerHeight() < this.element.prop("scrollHeight") }, select: function (e) { this.active = this.active || t(e.target).closest(".ui-menu-item"); var i = { item: this.active }; this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i) } }) })(jQuery); (function (t, e) { t.widget("ui.progressbar", { version: "1.10.3", options: { max: 100, value: 0, change: null, complete: null }, min: 0, _create: function () { this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({ role: "progressbar", "aria-valuemin": this.min }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue() }, _destroy: function () { this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove() }, value: function (t) { return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), this._refreshValue(), e) }, _constrainedValue: function (t) { return t === e && (t = this.options.value), this.indeterminate = t === !1, "number" != typeof t && (t = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t)) }, _setOptions: function (t) { var e = t.value; delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue() }, _setOption: function (t, e) { "max" === t && (e = Math.max(this.min, e)), this._super(t, e) }, _percentage: function () { return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min) }, _refreshValue: function () { var e = this.options.value, i = this._percentage(); this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": e }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete") } }) })(jQuery); (function (t) { var e = 5; t.widget("ui.slider", t.ui.mouse, { version: "1.10.3", widgetEventPrefix: "slide", options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, _create: function () { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1 }, _refresh: function () { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() }, _createHandles: function () { var e, i, s = this.options, n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), a = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", o = []; for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) o.push(a); this.handles = n.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (e) { t(this).data("ui-slider-handle-index", e) }) }, _createRange: function () { var e = this.options, i = ""; e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : this.range = t([]) }, _setupEvents: function () { var t = this.handles.add(this.range).filter("a"); this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t) }, _destroy: function () { this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy() }, _mouseCapture: function (e) { var i, s, n, a, o, r, h, l, u = this, c = this.options; return c.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e.pageX, y: e.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) { var i = Math.abs(s - u.values(e)); (n > i || n === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (n = i, a = t(this), o = e) }), r = this._start(e, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? { left: 0, top: 0 } : { left: e.pageX - h.left - a.width() / 2, top: e.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, s), this._animateOff = !0, !0)) }, _mouseStart: function () { return !0 }, _mouseDrag: function (t) { var e = { x: t.pageX, y: t.pageY }, i = this._normValueFromMouse(e); return this._slide(t, this._handleIndex, i), !1 }, _mouseStop: function (t) { return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 }, _detectOrientation: function () { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" }, _normValueFromMouse: function (t) { var e, i, s, n, a; return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a) }, _start: function (t, e) { var i = { handle: this.handles[e], value: this.value() }; return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i) }, _slide: function (t, e, i) { var s, n, a; this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, a = this._trigger("slide", t, { handle: this.handles[e], value: i, values: n }), s = this.values(e ? 0 : 1), a !== !1 && this.values(e, i, !0))) : i !== this.value() && (a = this._trigger("slide", t, { handle: this.handles[e], value: i }), a !== !1 && this.value(i)) }, _stop: function (t, e) { var i = { handle: this.handles[e], value: this.value() }; this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i) }, _change: function (t, e) { if (!this._keySliding && !this._mouseSliding) { var i = { handle: this.handles[e], value: this.value() }; this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i) } }, value: function (t) { return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value() }, values: function (e, i) { var s, n, a; if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), undefined; if (!arguments.length) return this._values(); if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value(); for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a); this._refreshValue() }, _setOption: function (e, i) { var s, n = 0; switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) { case "orientation": this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(); break; case "value": this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1; break; case "values": for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s); this._animateOff = !1; break; case "min": case "max": this._animateOff = !0, this._refreshValue(), this._animateOff = !1; break; case "range": this._animateOff = !0, this._refresh(), this._animateOff = !1 } }, _value: function () { var t = this.options.value; return t = this._trimAlignValue(t) }, _values: function (t) { var e, i, s; if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e); if (this.options.values && this.options.values.length) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]); return i } return [] }, _trimAlignValue: function (t) { if (this._valueMin() >= t) return this._valueMin(); if (t >= this._valueMax()) return this._valueMax(); var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i; return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5)) }, _valueMin: function () { return this.options.min }, _valueMax: function () { return this.options.max }, _refreshValue: function () { var e, i, s, n, a, o = this.options.range, r = this.options, h = this, l = this._animateOff ? !1 : r.animate, u = {}; this.options.values && this.options.values.length ? this.handles.each(function (s) { i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))), e = i }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: r.animate }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: r.animate })) }, _handleEvents: { keydown: function (i) { var s, n, a, o, r = t(i.target).data("ui-slider-handle-index"); switch (i.keyCode) { case t.ui.keyCode.HOME: case t.ui.keyCode.END: case t.ui.keyCode.PAGE_UP: case t.ui.keyCode.PAGE_DOWN: case t.ui.keyCode.UP: case t.ui.keyCode.RIGHT: case t.ui.keyCode.DOWN: case t.ui.keyCode.LEFT: if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1)) return } switch (o = this.options.step, n = a = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) { case t.ui.keyCode.HOME: a = this._valueMin(); break; case t.ui.keyCode.END: a = this._valueMax(); break; case t.ui.keyCode.PAGE_UP: a = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e); break; case t.ui.keyCode.PAGE_DOWN: a = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e); break; case t.ui.keyCode.UP: case t.ui.keyCode.RIGHT: if (n === this._valueMax()) return; a = this._trimAlignValue(n + o); break; case t.ui.keyCode.DOWN: case t.ui.keyCode.LEFT: if (n === this._valueMin()) return; a = this._trimAlignValue(n - o) } this._slide(i, r, a) }, click: function (t) { t.preventDefault() }, keyup: function (e) { var i = t(e.target).data("ui-slider-handle-index"); this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active")) } } }) })(jQuery); (function (t) { function e(t) { return function () { var e = this.element.val(); t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change") } } t.widget("ui.spinner", { version: "1.10.3", defaultElement: "<input>", widgetEventPrefix: "spin", options: { culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null }, _create: function () { this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function () { this.element.removeAttr("autocomplete") } }) }, _getCreateOptions: function () { var e = {}, i = this.element; return t.each(["min", "max", "step"], function (t, s) { var n = i.attr(s); void 0 !== n && n.length && (e[s] = n) }), e }, _events: { keydown: function (t) { this._start(t) && this._keydown(t) && t.preventDefault() }, keyup: "_stop", focus: function () { this.previous = this.element.val() }, blur: function (t) { return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t), void 0) }, mousewheel: function (t, e) { if (e) { if (!this.spinning && !this._start(t)) return !1; this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () { this.spinning && this._stop(t) }, 100), t.preventDefault() } }, "mousedown .ui-spinner-button": function (e) { function i() { var t = this.element[0] === this.document[0].activeElement; t || (this.element.focus(), this.previous = s, this._delay(function () { this.previous = s })) } var s; s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function () { delete this.cancelBlur, i.call(this) }), this._start(e) !== !1 && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function (e) { return t(e.currentTarget).hasClass("ui-state-active") ? this._start(e) === !1 ? !1 : (this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e), void 0) : void 0 }, "mouseleave .ui-spinner-button": "_stop" }, _draw: function () { var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml()); this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable() }, _keydown: function (e) { var i = this.options, s = t.ui.keyCode; switch (e.keyCode) { case s.UP: return this._repeat(null, 1, e), !0; case s.DOWN: return this._repeat(null, -1, e), !0; case s.PAGE_UP: return this._repeat(null, i.page, e), !0; case s.PAGE_DOWN: return this._repeat(null, -i.page, e), !0 } return !1 }, _uiSpinnerHtml: function () { return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>" }, _buttonHtml: function () { return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>" }, _start: function (t) { return this.spinning || this._trigger("start", t) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1 }, _repeat: function (t, e, i) { t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function () { this._repeat(40, e, i) }, t), this._spin(e * this.options.step, i) }, _spin: function (t, e) { var i = this.value() || 0; this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && this._trigger("spin", e, { value: i }) === !1 || (this._value(i), this.counter++) }, _increment: function (e) { var i = this.options.incremental; return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1 }, _precision: function () { var t = this._precisionOf(this.options.step); return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t }, _precisionOf: function (t) { var e = "" + t, i = e.indexOf("."); return -1 === i ? 0 : e.length - i - 1 }, _adjustValue: function (t) { var e, i, s = this.options; return e = null !== s.min ? s.min : 0, i = t - e, i = Math.round(i / s.step) * s.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t }, _stop: function (t) { this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t)) }, _setOption: function (t, e) { if ("culture" === t || "numberFormat" === t) { var i = this._parse(this.element.val()); return this.options[t] = e, this.element.val(this._format(i)), void 0 } ("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable"))) }, _setOptions: e(function (t) { this._super(t), this._value(this.element.val()) }), _parse: function (t) { return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t }, _format: function (t) { return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t }, _refresh: function () { this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) }) }, _value: function (t, e) { var i; "" !== t && (i = this._parse(t), null !== i && (e || (i = this._adjustValue(i)), t = this._format(i))), this.element.val(t), this._refresh() }, _destroy: function () { this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element) }, stepUp: e(function (t) { this._stepUp(t) }), _stepUp: function (t) { this._start() && (this._spin((t || 1) * this.options.step), this._stop()) }, stepDown: e(function (t) { this._stepDown(t) }), _stepDown: function (t) { this._start() && (this._spin((t || 1) * -this.options.step), this._stop()) }, pageUp: e(function (t) { this._stepUp((t || 1) * this.options.page) }), pageDown: e(function (t) { this._stepDown((t || 1) * this.options.page) }), value: function (t) { return arguments.length ? (e(this._value).call(this, t), void 0) : this._parse(this.element.val()) }, widget: function () { return this.uiSpinner } }) })(jQuery); (function (t, e) { function i() { return ++n } function s(t) { return t.hash.length > 1 && decodeURIComponent(t.href.replace(a, "")) === decodeURIComponent(location.href.replace(a, "")) } var n = 0, a = /#.*$/; t.widget("ui.tabs", { version: "1.10.3", delay: 300, options: { active: null, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null }, _create: function () { var e = this, i = this.options; this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (e) { t(this).is(".ui-state-disabled") && e.preventDefault() }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () { t(this).closest("li").is(".ui-state-disabled") && this.blur() }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function (t) { return e.tabs.index(t) }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : t(), this._refresh(), this.active.length && this.load(i.active) }, _initialActive: function () { var i = this.options.active, s = this.options.collapsible, n = location.hash.substring(1); return null === i && (n && this.tabs.each(function (s, a) { return t(a).attr("aria-controls") === n ? (i = s, !1) : e }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = s ? !1 : 0)), !s && i === !1 && this.anchors.length && (i = 0), i }, _getCreateEventData: function () { return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : t() } }, _tabKeydown: function (i) { var s = t(this.document[0].activeElement).closest("li"), n = this.tabs.index(s), a = !0; if (!this._handlePageNav(i)) { switch (i.keyCode) { case t.ui.keyCode.RIGHT: case t.ui.keyCode.DOWN: n++; break; case t.ui.keyCode.UP: case t.ui.keyCode.LEFT: a = !1, n--; break; case t.ui.keyCode.END: n = this.anchors.length - 1; break; case t.ui.keyCode.HOME: n = 0; break; case t.ui.keyCode.SPACE: return i.preventDefault(), clearTimeout(this.activating), this._activate(n), e; case t.ui.keyCode.ENTER: return i.preventDefault(), clearTimeout(this.activating), this._activate(n === this.options.active ? !1 : n), e; default: return } i.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, a), i.ctrlKey || (s.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function () { this.option("active", n) }, this.delay)) } }, _panelKeydown: function (e) { this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus()) }, _handlePageNav: function (i) { return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : e }, _findNextTab: function (e, i) { function s() { return e > n && (e = 0), 0 > e && (e = n), e } for (var n = this.tabs.length - 1; -1 !== t.inArray(s(), this.options.disabled) ;) e = i ? e + 1 : e - 1; return e }, _focusNextTab: function (t, e) { return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t }, _setOption: function (t, i) { return "active" === t ? (this._activate(i), e) : "disabled" === t ? (this._setupDisabled(i), e) : (this._super(t, i), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === t && this._setupEvents(i), "heightStyle" === t && this._setupHeightStyle(i), e) }, _tabId: function (t) { return t.attr("aria-controls") || "ui-tabs-" + i() }, _sanitizeSelector: function (t) { return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "" }, refresh: function () { var e = this.options, i = this.tablist.children(":has(a[href])"); e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) { return i.index(t) }), this._processTabs(), e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1, this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh() }, _refresh: function () { this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-expanded": "false", "aria-hidden": "true" }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({ "aria-selected": "true", tabIndex: 0 }), this._getPanelForTab(this.active).show().attr({ "aria-expanded": "true", "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0) }, _processTabs: function () { var e = this; this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({ role: "tab", tabIndex: -1 }), this.anchors = this.tabs.map(function () { return t("a", this)[0] }).addClass("ui-tabs-anchor").attr({ role: "presentation", tabIndex: -1 }), this.panels = t(), this.anchors.each(function (i, n) { var a, o, r, h = t(n).uniqueId().attr("id"), l = t(n).closest("li"), u = l.attr("aria-controls"); s(n) ? (a = n.hash, o = e.element.find(e._sanitizeSelector(a))) : (r = e._tabId(l), a = "#" + r, o = e.element.find(a), o.length || (o = e._createPanel(r), o.insertAfter(e.panels[i - 1] || e.tablist)), o.attr("aria-live", "polite")), o.length && (e.panels = e.panels.add(o)), u && l.data("ui-tabs-aria-controls", u), l.attr({ "aria-controls": a.substring(1), "aria-labelledby": h }), o.attr("aria-labelledby", h) }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel") }, _getList: function () { return this.element.find("ol,ul").eq(0) }, _createPanel: function (e) { return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0) }, _setupDisabled: function (e) { t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1); for (var i, s = 0; i = this.tabs[s]; s++) e === !0 || -1 !== t.inArray(s, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled"); this.options.disabled = e }, _setupEvents: function (e) { var i = { click: function (t) { t.preventDefault() } }; e && t.each(e.split(" "), function (t, e) { i[e] = "_eventHandler" }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs) }, _setupHeightStyle: function (e) { var i, s = this.element.parent(); "fill" === e ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () { var e = t(this), s = e.css("position"); "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0)) }), this.element.children().not(this.panels).each(function () { i -= t(this).outerHeight(!0) }), this.panels.each(function () { t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height())) }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function () { i = Math.max(i, t(this).height("").height()) }).height(i)) }, _eventHandler: function (e) { var i = this.options, s = this.active, n = t(e.currentTarget), a = n.closest("li"), o = a[0] === s[0], r = o && i.collapsible, h = r ? t() : this._getPanelForTab(a), l = s.length ? this._getPanelForTab(s) : t(), u = { oldTab: s, oldPanel: l, newTab: r ? t() : a, newPanel: h }; e.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", e, u) === !1 || (i.active = r ? !1 : this.tabs.index(a), this.active = o ? t() : a, this.xhr && this.xhr.abort(), l.length || h.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), e), this._toggle(e, u)) }, _toggle: function (e, i) { function s() { a.running = !1, a._trigger("activate", e, i) } function n() { i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show ? a._show(o, a.options.show, s) : (o.show(), s()) } var a = this, o = i.newPanel, r = i.oldPanel; this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function () { i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n() }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr({ "aria-expanded": "false", "aria-hidden": "true" }), i.oldTab.attr("aria-selected", "false"), o.length && r.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function () { return 0 === t(this).attr("tabIndex") }).attr("tabIndex", -1), o.attr({ "aria-expanded": "true", "aria-hidden": "false" }), i.newTab.attr({ "aria-selected": "true", tabIndex: 0 }) }, _activate: function (e) { var i, s = this._findActive(e); s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({ target: i, currentTarget: i, preventDefault: t.noop })) }, _findActive: function (e) { return e === !1 ? t() : this.tabs.eq(e) }, _getIndex: function (t) { return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t }, _destroy: function () { this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function () { t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role") }), this.tabs.each(function () { var e = t(this), i = e.data("ui-tabs-aria-controls"); i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls") }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "") }, enable: function (i) { var s = this.options.disabled; s !== !1 && (i === e ? s = !1 : (i = this._getIndex(i), s = t.isArray(s) ? t.map(s, function (t) { return t !== i ? t : null }) : t.map(this.tabs, function (t, e) { return e !== i ? e : null })), this._setupDisabled(s)) }, disable: function (i) { var s = this.options.disabled; if (s !== !0) { if (i === e) s = !0; else { if (i = this._getIndex(i), -1 !== t.inArray(i, s)) return; s = t.isArray(s) ? t.merge([i], s).sort() : [i] } this._setupDisabled(s) } }, load: function (e, i) { e = this._getIndex(e); var n = this, a = this.tabs.eq(e), o = a.find(".ui-tabs-anchor"), r = this._getPanelForTab(a), h = { tab: a, panel: r }; s(o[0]) || (this.xhr = t.ajax(this._ajaxSettings(o, i, h)), this.xhr && "canceled" !== this.xhr.statusText && (a.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function (t) { setTimeout(function () { r.html(t), n._trigger("load", i, h) }, 1) }).complete(function (t, e) { setTimeout(function () { "abort" === e && n.panels.stop(!1, !0), a.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === n.xhr && delete n.xhr }, 1) }))) }, _ajaxSettings: function (e, i, s) { var n = this; return { url: e.attr("href"), beforeSend: function (e, a) { return n._trigger("beforeLoad", i, t.extend({ jqXHR: e, ajaxSettings: a }, s)) } } }, _getPanelForTab: function (e) { var i = t(e).attr("aria-controls"); return this.element.find(this._sanitizeSelector("#" + i)) } }) })(jQuery); (function (t) { function e(e, i) { var s = (e.attr("aria-describedby") || "").split(/\s+/); s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" "))) } function i(e) { var i = e.data("ui-tooltip-id"), s = (e.attr("aria-describedby") || "").split(/\s+/), n = t.inArray(i, s); -1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby") } var s = 0; t.widget("ui.tooltip", { version: "1.10.3", options: { content: function () { var e = t(this).attr("title") || ""; return t("<a>").text(e).html() }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, tooltipClass: null, track: !1, close: null, open: null }, _create: function () { this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable() }, _setOption: function (e, i) { var s = this; return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function (t, e) { s._updateContent(e) }), void 0) }, _disable: function () { var e = this; t.each(this.tooltips, function (i, s) { var n = t.Event("blur"); n.target = n.currentTarget = s[0], e.close(n, !0) }), this.element.find(this.options.items).addBack().each(function () { var e = t(this); e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "") }) }, _enable: function () { this.element.find(this.options.items).addBack().each(function () { var e = t(this); e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")) }) }, open: function (e) { var i = this, s = t(e ? e.target : this.element).closest(this.options.items); s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () { var e, s = t(this); s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = { element: this, title: s.attr("title") }, s.attr("title", "")) }), this._updateContent(s, e)) }, _updateContent: function (t, e) { var i, s = this.options.content, n = this, a = e ? e.type : null; return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function (i) { t.data("ui-tooltip-open") && n._delay(function () { e && (e.type = a), this._open(e, t, i) }) }), i && this._open(e, t, i), void 0) }, _open: function (i, s, n) { function a(t) { l.of = t, o.is(":hidden") || o.position(l) } var o, r, h, l = t.extend({}, this.options.position); if (n) { if (o = this._find(s), o.length) return o.find(".ui-tooltip-content").html(n), void 0; s.is("[title]") && (i && "mouseover" === i.type ? s.attr("title", "") : s.removeAttr("title")), o = this._tooltip(s), e(s, o.attr("id")), o.find(".ui-tooltip-content").html(n), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, { mousemove: a }), a(i)) : o.position(t.extend({ of: s }, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function () { o.is(":visible") && (a(l.of), clearInterval(h)) }, t.fx.interval)), this._trigger("open", i, { tooltip: o }), r = { keyup: function (e) { if (e.keyCode === t.ui.keyCode.ESCAPE) { var i = t.Event(e); i.currentTarget = s[0], this.close(i, !0) } }, remove: function () { this._removeTooltip(o) } }, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, s, r) } }, close: function (e) { var s = this, n = t(e ? e.currentTarget : this.element), a = this._find(n); this.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && n.attr("title", n.data("ui-tooltip-title")), i(n), a.stop(!0), this._hide(a, this.options.hide, function () { s._removeTooltip(t(this)) }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) { t(i.element).attr("title", i.title), delete s.parents[e] }), this.closing = !0, this._trigger("close", e, { tooltip: a }), this.closing = !1) }, _tooltip: function (e) { var i = "ui-tooltip-" + s++, n = t("<div>").attr({ id: i, role: "tooltip" }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")); return t("<div>").addClass("ui-tooltip-content").appendTo(n), n.appendTo(this.document[0].body), this.tooltips[i] = e, n }, _find: function (e) { var i = e.data("ui-tooltip-id"); return i ? t("#" + i) : t() }, _removeTooltip: function (t) { t.remove(), delete this.tooltips[t.attr("id")] }, _destroy: function () { var e = this; t.each(this.tooltips, function (i, s) { var n = t.Event("blur"); n.target = n.currentTarget = s[0], e.close(n, !0), t("#" + i).remove(), s.data("ui-tooltip-title") && (s.attr("title", s.data("ui-tooltip-title")), s.removeData("ui-tooltip-title")) }) } }) })(jQuery); (function (t, e) { var i = "ui-effects-"; t.effects = { effect: {} }, function (t, e) { function i(t, e, i) { var s = u[e.type] || {}; return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t) } function s(i) { var s = l(), n = s._rgba = []; return i = i.toLowerCase(), f(h, function (t, a) { var o, r = a.re.exec(i), h = r && a.parse(r), l = a.space || "rgba"; return h ? (o = s[l](h), s[c[l].cache] = o[c[l].cache], n = s._rgba = o._rgba, !1) : e }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, a.transparent), s) : a[i] } function n(t, e, i) { return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t } var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (t) { return [t[1], t[2], t[3], t[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (t) { return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (t) { return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (t) { return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (t) { return [t[1], t[2] / 100, t[3] / 100, t[4]] } }], l = t.Color = function (e, i, s, n) { return new t.Color.fn.parse(e, i, s, n) }, c = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } }, u = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } }, d = l.support = {}, p = t("<p>")[0], f = t.each; p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) { e.cache = "_" + t, e.props.alpha = { idx: 3, type: "percent", def: 1 } }), l.fn = t.extend(l.prototype, { parse: function (n, o, r, h) { if (n === e) return this._rgba = [null, null, null, null], this; (n.jquery || n.nodeType) && (n = t(n).css(o), o = e); var u = this, d = t.type(n), p = this._rgba = []; return o !== e && (n = [n, o, r, h], d = "array"), "string" === d ? this.parse(s(n) || a._default) : "array" === d ? (f(c.rgba.props, function (t, e) { p[e.idx] = i(n[e.idx], e) }), this) : "object" === d ? (n instanceof l ? f(c, function (t, e) { n[e.cache] && (u[e.cache] = n[e.cache].slice()) }) : f(c, function (e, s) { var a = s.cache; f(s.props, function (t, e) { if (!u[a] && s.to) { if ("alpha" === t || null == n[t]) return; u[a] = s.to(u._rgba) } u[a][e.idx] = i(n[t], e, !0) }), u[a] && 0 > t.inArray(null, u[a].slice(0, 3)) && (u[a][3] = 1, s.from && (u._rgba = s.from(u[a]))) }), this) : e }, is: function (t) { var i = l(t), s = !0, n = this; return f(c, function (t, a) { var o, r = i[a.cache]; return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function (t, i) { return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : e })), s }), s }, _space: function () { var t = [], e = this; return f(c, function (i, s) { e[s.cache] && t.push(i) }), t.pop() }, transition: function (t, e) { var s = l(t), n = s._space(), a = c[n], o = 0 === this.alpha() ? l("transparent") : this, r = o[a.cache] || a.to(o._rgba), h = r.slice(); return s = s[a.cache], f(a.props, function (t, n) { var a = n.idx, o = r[a], l = s[a], c = u[n.type] || {}; null !== l && (null === o ? h[a] = l : (c.mod && (l - o > c.mod / 2 ? o += c.mod : o - l > c.mod / 2 && (o -= c.mod)), h[a] = i((l - o) * e + o, n))) }), this[n](h) }, blend: function (e) { if (1 === this._rgba[3]) return this; var i = this._rgba.slice(), s = i.pop(), n = l(e)._rgba; return l(t.map(i, function (t, e) { return (1 - s) * n[e] + s * t })) }, toRgbaString: function () { var e = "rgba(", i = t.map(this._rgba, function (t, e) { return null == t ? e > 2 ? 1 : 0 : t }); return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")" }, toHslaString: function () { var e = "hsla(", i = t.map(this.hsla(), function (t, e) { return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t }); return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")" }, toHexString: function (e) { var i = this._rgba.slice(), s = i.pop(); return e && i.push(~~(255 * s)), "#" + t.map(i, function (t) { return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t }).join("") }, toString: function () { return 0 === this._rgba[3] ? "transparent" : this.toRgbaString() } }), l.fn.parse.prototype = l.fn, c.hsla.to = function (t) { if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]]; var e, i, s = t[0] / 255, n = t[1] / 255, a = t[2] / 255, o = t[3], r = Math.max(s, n, a), h = Math.min(s, n, a), l = r - h, c = r + h, u = .5 * c; return e = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == o ? 1 : o] }, c.hsla.from = function (t) { if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]]; var e = t[0] / 360, i = t[1], s = t[2], a = t[3], o = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - o; return [Math.round(255 * n(r, o, e + 1 / 3)), Math.round(255 * n(r, o, e)), Math.round(255 * n(r, o, e - 1 / 3)), a] }, f(c, function (s, n) { var a = n.props, o = n.cache, h = n.to, c = n.from; l.fn[s] = function (s) { if (h && !this[o] && (this[o] = h(this._rgba)), s === e) return this[o].slice(); var n, r = t.type(s), u = "array" === r || "object" === r ? s : arguments, d = this[o].slice(); return f(a, function (t, e) { var s = u["object" === r ? t : e.idx]; null == s && (s = d[e.idx]), d[e.idx] = i(s, e) }), c ? (n = l(c(d)), n[o] = d, n) : l(d) }, f(a, function (e, i) { l.fn[e] || (l.fn[e] = function (n) { var a, o = t.type(n), h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), c = l[i.idx]; return "undefined" === o ? c : ("function" === o && (n = n.call(this, c), o = t.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = c + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l))) }) }) }), l.hook = function (e) { var i = e.split(" "); f(i, function (e, i) { t.cssHooks[i] = { set: function (e, n) { var a, o, r = ""; if ("transparent" !== n && ("string" !== t.type(n) || (a = s(n)))) { if (n = l(a || n), !d.rgba && 1 !== n._rgba[3]) { for (o = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && o && o.style;) try { r = t.css(o, "backgroundColor"), o = o.parentNode } catch (h) { } n = n.blend(r && "transparent" !== r ? r : "_default") } n = n.toRgbaString() } try { e.style[i] = n } catch (h) { } } }, t.fx.step[i] = function (e) { e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos)) } }) }, l.hook(o), t.cssHooks.borderColor = { expand: function (t) { var e = {}; return f(["Top", "Right", "Bottom", "Left"], function (i, s) { e["border" + s + "Color"] = t }), e } }, a = t.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" } }(jQuery), function () { function i(e) { var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle, a = {}; if (n && n.length && n[0] && n[n[0]]) for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (a[t.camelCase(i)] = n[i]); else for (i in n) "string" == typeof n[i] && (a[i] = n[i]); return a } function s(e, i) { var s, n, o = {}; for (s in i) n = i[s], e[s] !== n && (a[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n)); return o } var n = ["add", "remove", "toggle"], a = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 }; t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) { t.fx.step[i] = function (t) { ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0) } }), t.fn.addBack || (t.fn.addBack = function (t) { return this.add(null == t ? this.prevObject : this.prevObject.filter(t)) }), t.effects.animateClass = function (e, a, o, r) { var h = t.speed(a, o, r); return this.queue(function () { var a, o = t(this), r = o.attr("class") || "", l = h.children ? o.find("*").addBack() : o; l = l.map(function () { var e = t(this); return { el: e, start: i(this) } }), a = function () { t.each(n, function (t, i) { e[i] && o[i + "Class"](e[i]) }) }, a(), l = l.map(function () { return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this }), o.attr("class", r), l = l.map(function () { var e = this, i = t.Deferred(), s = t.extend({}, h, { queue: !1, complete: function () { i.resolve(e) } }); return this.el.animate(this.diff, s), i.promise() }), t.when.apply(t, l.get()).done(function () { a(), t.each(arguments, function () { var e = this.el; t.each(this.diff, function (t) { e.css(t, "") }) }), h.complete.call(o[0]) }) }) }, t.fn.extend({ addClass: function (e) { return function (i, s, n, a) { return s ? t.effects.animateClass.call(this, { add: i }, s, n, a) : e.apply(this, arguments) } }(t.fn.addClass), removeClass: function (e) { return function (i, s, n, a) { return arguments.length > 1 ? t.effects.animateClass.call(this, { remove: i }, s, n, a) : e.apply(this, arguments) } }(t.fn.removeClass), toggleClass: function (i) { return function (s, n, a, o, r) { return "boolean" == typeof n || n === e ? a ? t.effects.animateClass.call(this, n ? { add: s } : { remove: s }, a, o, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, { toggle: s }, n, a, o) } }(t.fn.toggleClass), switchClass: function (e, i, s, n, a) { return t.effects.animateClass.call(this, { add: i, remove: e }, s, n, a) } }) }(), function () { function s(e, i, s, n) { return t.isPlainObject(e) && (i = e, e = e.effect), e = { effect: e }, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e } function n(e) { return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0 } t.extend(t.effects, { version: "1.10.3", save: function (t, e) { for (var s = 0; e.length > s; s++) null !== e[s] && t.data(i + e[s], t[0].style[e[s]]) }, restore: function (t, s) { var n, a; for (a = 0; s.length > a; a++) null !== s[a] && (n = t.data(i + s[a]), n === e && (n = ""), t.css(s[a], n)) }, setMode: function (t, e) { return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e }, getBaseline: function (t, e) { var i, s; switch (t[0]) { case "top": i = 0; break; case "middle": i = .5; break; case "bottom": i = 1; break; default: i = t[0] / e.height } switch (t[1]) { case "left": s = 0; break; case "center": s = .5; break; case "right": s = 1; break; default: s = t[1] / e.width } return { x: s, y: i } }, createWrapper: function (e) { if (e.parent().is(".ui-effects-wrapper")) return e.parent(); var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float") }, s = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }), n = { width: e.width(), height: e.height() }, a = document.activeElement; try { a.id } catch (o) { a = document.body } return e.wrap(s), (e[0] === a || t.contains(e[0], a)) && t(a).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({ position: "relative" }), e.css({ position: "relative" })) : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }), t.each(["top", "left", "bottom", "right"], function (t, s) { i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto") }), e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), e.css(n), s.css(i).show() }, removeWrapper: function (e) { var i = document.activeElement; return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e }, setTransition: function (e, i, s, n) { return n = n || {}, t.each(i, function (t, i) { var a = e.cssUnit(i); a[0] > 0 && (n[i] = a[0] * s + a[1]) }), n } }), t.fn.extend({ effect: function () { function e(e) { function s() { t.isFunction(a) && a.call(n[0]), t.isFunction(e) && e() } var n = t(this), a = i.complete, r = i.mode; (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : o.call(n[0], i, s) } var i = s.apply(this, arguments), n = i.mode, a = i.queue, o = t.effects.effect[i.effect]; return t.fx.off || !o ? n ? this[n](i.duration, i.complete) : this.each(function () { i.complete && i.complete.call(this) }) : a === !1 ? this.each(e) : this.queue(a || "fx", e) }, show: function (t) { return function (e) { if (n(e)) return t.apply(this, arguments); var i = s.apply(this, arguments); return i.mode = "show", this.effect.call(this, i) } }(t.fn.show), hide: function (t) { return function (e) { if (n(e)) return t.apply(this, arguments); var i = s.apply(this, arguments); return i.mode = "hide", this.effect.call(this, i) } }(t.fn.hide), toggle: function (t) { return function (e) { if (n(e) || "boolean" == typeof e) return t.apply(this, arguments); var i = s.apply(this, arguments); return i.mode = "toggle", this.effect.call(this, i) } }(t.fn.toggle), cssUnit: function (e) { var i = this.css(e), s = []; return t.each(["em", "px", "%", "pt"], function (t, e) { i.indexOf(e) > 0 && (s = [parseFloat(i), e]) }), s } }) }(), function () { var e = {}; t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) { e[i] = function (e) { return Math.pow(e, t + 2) } }), t.extend(e, { Sine: function (t) { return 1 - Math.cos(t * Math.PI / 2) }, Circ: function (t) { return 1 - Math.sqrt(1 - t * t) }, Elastic: function (t) { return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15) }, Back: function (t) { return t * t * (3 * t - 2) }, Bounce: function (t) { for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;); return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2) } }), t.each(e, function (e, i) { t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) { return 1 - i(1 - t) }, t.easing["easeInOut" + e] = function (t) { return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2 } }) }() })(jQuery); (function (t) { var e = /up|down|vertical/, i = /up|left|vertical|horizontal/; t.effects.effect.blind = function (s, n) { var a, o, r, h = t(this), l = ["position", "top", "bottom", "left", "right", "height", "width"], c = t.effects.setMode(h, s.mode || "hide"), u = s.direction || "up", d = e.test(u), p = d ? "height" : "width", f = d ? "top" : "left", m = i.test(u), g = {}, v = "show" === c; h.parent().is(".ui-effects-wrapper") ? t.effects.save(h.parent(), l) : t.effects.save(h, l), h.show(), a = t.effects.createWrapper(h).css({ overflow: "hidden" }), o = a[p](), r = parseFloat(a.css(f)) || 0, g[p] = v ? o : 0, m || (h.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({ position: "absolute" }), g[f] = v ? r : o + r), v && (a.css(p, 0), m || a.css(f, r + o)), a.animate(g, { duration: s.duration, easing: s.easing, queue: !1, complete: function () { "hide" === c && h.hide(), t.effects.restore(h, l), t.effects.removeWrapper(h), n() } }) } })(jQuery); (function (t) { t.effects.effect.bounce = function (e, i) { var s, n, a, o = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], h = t.effects.setMode(o, e.mode || "effect"), l = "hide" === h, c = "show" === h, u = e.direction || "up", d = e.distance, p = e.times || 5, f = 2 * p + (c || l ? 1 : 0), m = e.duration / f, g = e.easing, v = "up" === u || "down" === u ? "top" : "left", _ = "up" === u || "left" === u, b = o.queue(), y = b.length; for ((c || l) && r.push("opacity"), t.effects.save(o, r), o.show(), t.effects.createWrapper(o), d || (d = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (a = { opacity: 1 }, a[v] = 0, o.css("opacity", 0).css(v, _ ? 2 * -d : 2 * d).animate(a, m, g)), l && (d /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, m, g).animate(a, m, g), d = l ? 2 * d : d / 2; l && (n = { opacity: 0 }, n[v] = (_ ? "-=" : "+=") + d, o.animate(n, m, g)), o.queue(function () { l && o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i() }), y > 1 && b.splice.apply(b, [1, 0].concat(b.splice(y, f + 1))), o.dequeue() } })(jQuery); (function (t) { t.effects.effect.clip = function (e, i) { var s, n, a, o = t(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], h = t.effects.setMode(o, e.mode || "hide"), l = "show" === h, c = e.direction || "vertical", u = "vertical" === c, d = u ? "height" : "width", p = u ? "top" : "left", f = {}; t.effects.save(o, r), o.show(), s = t.effects.createWrapper(o).css({ overflow: "hidden" }), n = "IMG" === o[0].tagName ? s : o, a = n[d](), l && (n.css(d, 0), n.css(p, a / 2)), f[d] = l ? a : 0, f[p] = l ? 0 : a / 2, n.animate(f, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { l || o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i() } }) } })(jQuery); (function (t) { t.effects.effect.drop = function (e, i) { var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], o = t.effects.setMode(n, e.mode || "hide"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h ? "pos" : "neg", u = { opacity: r ? 1 : 0 }; t.effects.save(n, a), n.show(), t.effects.createWrapper(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === c ? -s : s), u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s, n.animate(u, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i() } }) } })(jQuery); (function (t) { t.effects.effect.explode = function (e, i) { function s() { b.push(this), b.length === u * d && n() } function n() { p.css({ visibility: "visible" }), t(b).remove(), m || p.hide(), i() } var a, o, r, h, l, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3, d = u, p = t(this), f = t.effects.setMode(p, e.mode || "hide"), m = "show" === f, g = p.show().css("visibility", "hidden").offset(), v = Math.ceil(p.outerWidth() / d), _ = Math.ceil(p.outerHeight() / u), b = []; for (a = 0; u > a; a++) for (h = g.top + a * _, c = a - (u - 1) / 2, o = 0; d > o; o++) r = g.left + o * v, l = o - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -o * v, top: -a * _ }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: v, height: _, left: r + (m ? l * v : 0), top: h + (m ? c * _ : 0), opacity: m ? 0 : 1 }).animate({ left: r + (m ? 0 : l * v), top: h + (m ? 0 : c * _), opacity: m ? 1 : 0 }, e.duration || 500, e.easing, s) } })(jQuery); (function (t) { t.effects.effect.fade = function (e, i) { var s = t(this), n = t.effects.setMode(s, e.mode || "toggle"); s.animate({ opacity: n }, { queue: !1, duration: e.duration, easing: e.easing, complete: i }) } })(jQuery); (function (t) { t.effects.effect.fold = function (e, i) { var s, n, a = t(this), o = ["position", "top", "bottom", "left", "right", "height", "width"], r = t.effects.setMode(a, e.mode || "hide"), h = "show" === r, l = "hide" === r, c = e.size || 15, u = /([0-9]+)%/.exec(c), d = !!e.horizFirst, p = h !== d, f = p ? ["width", "height"] : ["height", "width"], m = e.duration / 2, g = {}, v = {}; t.effects.save(a, o), a.show(), s = t.effects.createWrapper(a).css({ overflow: "hidden" }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], u && (c = parseInt(u[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(d ? { height: 0, width: c } : { height: c, width: 0 }), g[f[0]] = h ? n[0] : c, v[f[1]] = h ? n[1] : 0, s.animate(g, m, e.easing).animate(v, m, e.easing, function () { l && a.hide(), t.effects.restore(a, o), t.effects.removeWrapper(a), i() }) } })(jQuery); (function (t) { t.effects.effect.highlight = function (e, i) { var s = t(this), n = ["backgroundImage", "backgroundColor", "opacity"], a = t.effects.setMode(s, e.mode || "show"), o = { backgroundColor: s.css("backgroundColor") }; "hide" === a && (o.opacity = 0), t.effects.save(s, n), s.show().css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" }).animate(o, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { "hide" === a && s.hide(), t.effects.restore(s, n), i() } }) } })(jQuery); (function (t) { t.effects.effect.pulsate = function (e, i) { var s, n = t(this), a = t.effects.setMode(n, e.mode || "show"), o = "show" === a, r = "hide" === a, h = o || "hide" === a, l = 2 * (e.times || 5) + (h ? 1 : 0), c = e.duration / l, u = 0, d = n.queue(), p = d.length; for ((o || !n.is(":visible")) && (n.css("opacity", 0).show(), u = 1), s = 1; l > s; s++) n.animate({ opacity: u }, c, e.easing), u = 1 - u; n.animate({ opacity: u }, c, e.easing), n.queue(function () { r && n.hide(), i() }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, l + 1))), n.dequeue() } })(jQuery); (function (t) { t.effects.effect.puff = function (e, i) { var s = t(this), n = t.effects.setMode(s, e.mode || "hide"), a = "hide" === n, o = parseInt(e.percent, 10) || 150, r = o / 100, h = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() }; t.extend(e, { effect: "scale", queue: !1, fade: !0, mode: n, complete: i, percent: a ? o : 100, from: a ? h : { height: h.height * r, width: h.width * r, outerHeight: h.outerHeight * r, outerWidth: h.outerWidth * r } }), s.effect(e) }, t.effects.effect.scale = function (e, i) { var s = t(this), n = t.extend(!0, {}, e), a = t.effects.setMode(s, e.mode || "effect"), o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === a ? 0 : 100), r = e.direction || "both", h = e.origin, l = { height: s.height(), width: s.width(), outerHeight: s.outerHeight(), outerWidth: s.outerWidth() }, c = { y: "horizontal" !== r ? o / 100 : 1, x: "vertical" !== r ? o / 100 : 1 }; n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = e.from || ("show" === a ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 } : l), n.to = { height: l.height * c.y, width: l.width * c.x, outerHeight: l.outerHeight * c.y, outerWidth: l.outerWidth * c.x }, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n) }, t.effects.effect.size = function (e, i) { var s, n, a, o = t(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], l = ["width", "height", "overflow"], c = ["fontSize"], u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = t.effects.setMode(o, e.mode || "effect"), f = e.restore || "effect" !== p, m = e.scale || "both", g = e.origin || ["middle", "center"], v = o.css("position"), _ = f ? r : h, b = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 }; "show" === p && o.show(), s = { height: o.height(), width: o.width(), outerHeight: o.outerHeight(), outerWidth: o.outerWidth() }, "toggle" === e.mode && "show" === p ? (o.from = e.to || b, o.to = e.from || s) : (o.from = e.from || ("show" === p ? b : s), o.to = e.to || ("hide" === p ? b : s)), a = { from: { y: o.from.height / s.height, x: o.from.width / s.width }, to: { y: o.to.height / s.height, x: o.to.width / s.width } }, ("box" === m || "both" === m) && (a.from.y !== a.to.y && (_ = _.concat(u), o.from = t.effects.setTransition(o, u, a.from.y, o.from), o.to = t.effects.setTransition(o, u, a.to.y, o.to)), a.from.x !== a.to.x && (_ = _.concat(d), o.from = t.effects.setTransition(o, d, a.from.x, o.from), o.to = t.effects.setTransition(o, d, a.to.x, o.to))), ("content" === m || "both" === m) && a.from.y !== a.to.y && (_ = _.concat(c).concat(l), o.from = t.effects.setTransition(o, c, a.from.y, o.from), o.to = t.effects.setTransition(o, c, a.to.y, o.to)), t.effects.save(o, _), o.show(), t.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (n = t.effects.getBaseline(g, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === m || "both" === m) && (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), l = r.concat(u).concat(d), o.find("*[width]").each(function () { var i = t(this), s = { height: i.height(), width: i.width(), outerHeight: i.outerHeight(), outerWidth: i.outerWidth() }; f && t.effects.save(i, l), i.from = { height: s.height * a.from.y, width: s.width * a.from.x, outerHeight: s.outerHeight * a.from.y, outerWidth: s.outerWidth * a.from.x }, i.to = { height: s.height * a.to.y, width: s.width * a.to.x, outerHeight: s.height * a.to.y, outerWidth: s.width * a.to.x }, a.from.y !== a.to.y && (i.from = t.effects.setTransition(i, u, a.from.y, i.from), i.to = t.effects.setTransition(i, u, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = t.effects.setTransition(i, d, a.from.x, i.from), i.to = t.effects.setTransition(i, d, a.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function () { f && t.effects.restore(i, l) }) })), o.animate(o.to, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { 0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), t.effects.restore(o, _), f || ("static" === v ? o.css({ position: "relative", top: o.to.top, left: o.to.left }) : t.each(["top", "left"], function (t, e) { o.css(e, function (e, i) { var s = parseInt(i, 10), n = t ? o.to.left : o.to.top; return "auto" === i ? n + "px" : s + n + "px" }) })), t.effects.removeWrapper(o), i() } }) } })(jQuery); (function (t) { t.effects.effect.shake = function (e, i) { var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "height", "width"], o = t.effects.setMode(n, e.mode || "effect"), r = e.direction || "left", h = e.distance || 20, l = e.times || 3, c = 2 * l + 1, u = Math.round(e.duration / c), d = "up" === r || "down" === r ? "top" : "left", p = "up" === r || "left" === r, f = {}, m = {}, g = {}, v = n.queue(), _ = v.length; for (t.effects.save(n, a), n.show(), t.effects.createWrapper(n), f[d] = (p ? "-=" : "+=") + h, m[d] = (p ? "+=" : "-=") + 2 * h, g[d] = (p ? "-=" : "+=") + 2 * h, n.animate(f, u, e.easing), s = 1; l > s; s++) n.animate(m, u, e.easing).animate(g, u, e.easing); n.animate(m, u, e.easing).animate(f, u / 2, e.easing).queue(function () { "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i() }), _ > 1 && v.splice.apply(v, [1, 0].concat(v.splice(_, c + 1))), n.dequeue() } })(jQuery); (function (t) { t.effects.effect.slide = function (e, i) { var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "width", "height"], o = t.effects.setMode(n, e.mode || "show"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h, u = {}; t.effects.save(n, a), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({ overflow: "hidden" }), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, { queue: !1, duration: e.duration, easing: e.easing, complete: function () { "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i() } }) } })(jQuery); (function (t) { t.effects.effect.transfer = function (e, i) { var s = t(this), n = t(e.to), a = "fixed" === n.css("position"), o = t("body"), r = a ? o.scrollTop() : 0, h = a ? o.scrollLeft() : 0, l = n.offset(), c = { top: l.top - r, left: l.left - h, height: n.innerHeight(), width: n.innerWidth() }, u = s.offset(), d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({ top: u.top - r, left: u.left - h, height: s.innerHeight(), width: s.innerWidth(), position: a ? "fixed" : "absolute" }).animate(c, e.duration, e.easing, function () { d.remove(), i() }) } })(jQuery);

}


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
(function ($) { $.colorpicker = new function () { this.regional = []; this.regional[""] = { ok: "OK", cancel: "Cancel", none: "None", button: "Color", title: "Pick a color", transparent: "Transparent", hsvH: "H", hsvS: "S", hsvV: "V", rgbR: "R", rgbG: "G", rgbB: "B", labL: "L", labA: "a", labB: "b", hslH: "H", hslS: "S", hslL: "L", cmykC: "C", cmykM: "M", cmykY: "Y", cmykK: "K", alphaA: "A" } }; var _colorpicker_index = 0, _container_popup = '<div class="ui-colorpicker ui-colorpicker-dialog ui-dialog ui-widget ui-widget-content ui-corner-all" style="display: none;"></div>', _container_inline = '<div class="ui-colorpicker ui-colorpicker-inline ui-dialog ui-widget ui-widget-content ui-corner-all"></div>', _parts_lists = { "full": ["header", "map", "bar", "hex", "hsv", "rgb", "alpha", "lab", "cmyk", "preview", "swatches", "footer"], "popup": ["map", "bar", "hex", "hsv", "rgb", "alpha", "preview", "footer"], "draggable": ["header", "map", "bar", "hex", "hsv", "rgb", "alpha", "preview", "footer"], "inline": ["map", "bar", "hex", "hsv", "rgb", "alpha", "preview"] }, _intToHex = function (dec) { var result = Math.round(dec).toString(16); if (result.length === 1) result = "0" + result; return result.toLowerCase() }, _formats = { "#HEX": function (color) { return _formatColor("#rxgxbx", color) }, "#HEX3": function (color) { var hex3 = _formats.HEX3(color); return hex3 === false ? false : "#" + hex3 }, "HEX": function (color) { return _formatColor("rxgxbx", color) }, "HEX3": function (color) { var rgb = color.getRGB(), r = Math.round(rgb.r * 255), g = Math.round(rgb.g * 255), b = Math.round(rgb.b * 255); if (r >>> 4 == (r &= 15) && g >>> 4 == (g &= 15) && b >>> 4 == (b &= 15)) return r.toString(16) + g.toString(16) + b.toString(16); return false }, "RGB": function (color) { return color.getAlpha() >= 1 ? _formatColor("rgb(rd,gd,bd)", color) : false }, "RGBA": function (color) { return _formatColor("rgba(rd,gd,bd,af)", color) }, "RGB%": function (color) { return color.getAlpha() >= 1 ? _formatColor("rgb(rp%,gp%,bp%)", color) : false }, "RGBA%": function (color) { return _formatColor("rgba(rp%,gp%,bp%,af)", color) }, "HSL": function (color) { return color.getAlpha() >= 1 ? _formatColor("hsl(hd,sd,vd)", color) : false }, "HSLA": function (color) { return _formatColor("hsla(hd,sd,vd,af)", color) }, "HSL%": function (color) { return color.getAlpha() >= 1 ? _formatColor("hsl(hp%,sp%,vp%)", color) : false }, "HSLA%": function (color) { return _formatColor("hsla(hp%,sp%,vp%,af)", color) }, "NAME": function (color) { return _closestName(color) }, "EXACT": function (color) { return _exactName(color) } }, _formatColor = function (formats, color) { var that = this, text = null, types = { "x": function (v) { return _intToHex(v * 255) }, "d": function (v) { return Math.round(v * 255) }, "f": function (v) { return v }, "p": function (v) { return v * 100 } }, channels = color.getChannels(); if (!$.isArray(formats)) formats = [formats]; $.each(formats, function (index, format) { if (_formats[format]) { text = _formats[format](color); return text === false } else { text = format.replace(/\\?[argbhsvcmykLAB][xdfp]/g, function (m) { if (m.match(/^\\/)) return m.slice(1); return types[m.charAt(1)](channels[m.charAt(0)]) }); return false } }); return text }, _colors = { "black": { r: 0, g: 0, b: 0 }, "dimgray": { r: 0.4117647058823529, g: 0.4117647058823529, b: 0.4117647058823529 }, "gray": { r: 0.5019607843137255, g: 0.5019607843137255, b: 0.5019607843137255 }, "darkgray": { r: 0.6627450980392157, g: 0.6627450980392157, b: 0.6627450980392157 }, "silver": { r: 0.7529411764705882, g: 0.7529411764705882, b: 0.7529411764705882 }, "lightgrey": { r: 0.8274509803921568, g: 0.8274509803921568, b: 0.8274509803921568 }, "gainsboro": { r: 0.8627450980392157, g: 0.8627450980392157, b: 0.8627450980392157 }, "whitesmoke": { r: 0.9607843137254902, g: 0.9607843137254902, b: 0.9607843137254902 }, "white": { r: 1, g: 1, b: 1 }, "rosybrown": { r: 0.7372549019607844, g: 0.5607843137254902, b: 0.5607843137254902 }, "indianred": { r: 0.803921568627451, g: 0.3607843137254902, b: 0.3607843137254902 }, "brown": { r: 0.6470588235294118, g: 0.16470588235294117, b: 0.16470588235294117 }, "firebrick": { r: 0.6980392156862745, g: 0.13333333333333333, b: 0.13333333333333333 }, "lightcoral": { r: 0.9411764705882353, g: 0.5019607843137255, b: 0.5019607843137255 }, "maroon": { r: 0.5019607843137255, g: 0, b: 0 }, "darkred": { r: 0.5450980392156862, g: 0, b: 0 }, "red": { r: 1, g: 0, b: 0 }, "snow": { r: 1, g: 0.9803921568627451, b: 0.9803921568627451 }, "salmon": { r: 0.9803921568627451, g: 0.5019607843137255, b: 0.4470588235294118 }, "mistyrose": { r: 1, g: 0.8941176470588236, b: 0.8823529411764706 }, "tomato": { r: 1, g: 0.38823529411764707, b: 0.2784313725490196 }, "darksalmon": { r: 0.9137254901960784, g: 0.5882352941176471, b: 0.47843137254901963 }, "orangered": { r: 1, g: 0.27058823529411763, b: 0 }, "coral": { r: 1, g: 0.4980392156862745, b: 0.3137254901960784 }, "lightsalmon": { r: 1, g: 0.6274509803921569, b: 0.47843137254901963 }, "sienna": { r: 0.6274509803921569, g: 0.3215686274509804, b: 0.17647058823529413 }, "seashell": { r: 1, g: 0.9607843137254902, b: 0.9333333333333333 }, "chocolate": { r: 0.8235294117647058, g: 0.4117647058823529, b: 0.11764705882352941 }, "saddlebrown": { r: 0.5450980392156862, g: 0.27058823529411763, b: 0.07450980392156863 }, "sandybrown": { r: 0.9568627450980393, g: 0.6431372549019608, b: 0.3764705882352941 }, "peachpuff": { r: 1, g: 0.8549019607843137, b: 0.7254901960784313 }, "peru": { r: 0.803921568627451, g: 0.5215686274509804, b: 0.24705882352941178 }, "linen": { r: 0.9803921568627451, g: 0.9411764705882353, b: 0.9019607843137255 }, "darkorange": { r: 1, g: 0.5490196078431373, b: 0 }, "bisque": { r: 1, g: 0.8941176470588236, b: 0.7686274509803922 }, "burlywood": { r: 0.8705882352941177, g: 0.7215686274509804, b: 0.5294117647058824 }, "tan": { r: 0.8235294117647058, g: 0.7058823529411765, b: 0.5490196078431373 }, "antiquewhite": { r: 0.9803921568627451, g: 0.9215686274509803, b: 0.8431372549019608 }, "navajowhite": { r: 1, g: 0.8705882352941177, b: 0.6784313725490196 }, "blanchedalmond": { r: 1, g: 0.9215686274509803, b: 0.803921568627451 }, "papayawhip": { r: 1, g: 0.9372549019607843, b: 0.8352941176470589 }, "orange": { r: 1, g: 0.6470588235294118, b: 0 }, "moccasin": { r: 1, g: 0.8941176470588236, b: 0.7098039215686275 }, "wheat": { r: 0.9607843137254902, g: 0.8705882352941177, b: 0.7019607843137254 }, "oldlace": { r: 0.9921568627450981, g: 0.9607843137254902, b: 0.9019607843137255 }, "floralwhite": { r: 1, g: 0.9803921568627451, b: 0.9411764705882353 }, "goldenrod": { r: 0.8549019607843137, g: 0.6470588235294118, b: 0.12549019607843137 }, "darkgoldenrod": { r: 0.7215686274509804, g: 0.5254901960784314, b: 0.043137254901960784 }, "cornsilk": { r: 1, g: 0.9725490196078431, b: 0.8627450980392157 }, "gold": { r: 1, g: 0.8431372549019608, b: 0 }, "palegoldenrod": { r: 0.9333333333333333, g: 0.9098039215686274, b: 0.6666666666666666 }, "khaki": { r: 0.9411764705882353, g: 0.9019607843137255, b: 0.5490196078431373 }, "lemonchiffon": { r: 1, g: 0.9803921568627451, b: 0.803921568627451 }, "darkkhaki": { r: 0.7411764705882353, g: 0.7176470588235294, b: 0.4196078431372549 }, "beige": { r: 0.9607843137254902, g: 0.9607843137254902, b: 0.8627450980392157 }, "lightgoldenrodyellow": { r: 0.9803921568627451, g: 0.9803921568627451, b: 0.8235294117647058 }, "olive": { r: 0.5019607843137255, g: 0.5019607843137255, b: 0 }, "yellow": { r: 1, g: 1, b: 0 }, "lightyellow": { r: 1, g: 1, b: 0.8784313725490196 }, "ivory": { r: 1, g: 1, b: 0.9411764705882353 }, "olivedrab": { r: 0.4196078431372549, g: 0.5568627450980392, b: 0.13725490196078433 }, "yellowgreen": { r: 0.6039215686274509, g: 0.803921568627451, b: 0.19607843137254902 }, "darkolivegreen": { r: 0.3333333333333333, g: 0.4196078431372549, b: 0.1843137254901961 }, "greenyellow": { r: 0.6784313725490196, g: 1, b: 0.1843137254901961 }, "lawngreen": { r: 0.48627450980392156, g: 0.9882352941176471, b: 0 }, "chartreuse": { r: 0.4980392156862745, g: 1, b: 0 }, "darkseagreen": { r: 0.5607843137254902, g: 0.7372549019607844, b: 0.5607843137254902 }, "forestgreen": { r: 0.13333333333333333, g: 0.5450980392156862, b: 0.13333333333333333 }, "limegreen": { r: 0.19607843137254902, g: 0.803921568627451, b: 0.19607843137254902 }, "lightgreen": { r: 0.5647058823529412, g: 0.9333333333333333, b: 0.5647058823529412 }, "palegreen": { r: 0.596078431372549, g: 0.984313725490196, b: 0.596078431372549 }, "darkgreen": { r: 0, g: 0.39215686274509803, b: 0 }, "green": { r: 0, g: 0.5019607843137255, b: 0 }, "lime": { r: 0, g: 1, b: 0 }, "honeydew": { r: 0.9411764705882353, g: 1, b: 0.9411764705882353 }, "mediumseagreen": { r: 0.23529411764705882, g: 0.7019607843137254, b: 0.44313725490196076 }, "seagreen": { r: 0.1803921568627451, g: 0.5450980392156862, b: 0.3411764705882353 }, "springgreen": { r: 0, g: 1, b: 0.4980392156862745 }, "mintcream": { r: 0.9607843137254902, g: 1, b: 0.9803921568627451 }, "mediumspringgreen": { r: 0, g: 0.9803921568627451, b: 0.6039215686274509 }, "mediumaquamarine": { r: 0.4, g: 0.803921568627451, b: 0.6666666666666666 }, "aquamarine": { r: 0.4980392156862745, g: 1, b: 0.8313725490196079 }, "turquoise": { r: 0.25098039215686274, g: 0.8784313725490196, b: 0.8156862745098039 }, "lightseagreen": { r: 0.12549019607843137, g: 0.6980392156862745, b: 0.6666666666666666 }, "mediumturquoise": { r: 0.2823529411764706, g: 0.8196078431372549, b: 0.8 }, "darkslategray": { r: 0.1843137254901961, g: 0.30980392156862746, b: 0.30980392156862746 }, "paleturquoise": { r: 0.6862745098039216, g: 0.9333333333333333, b: 0.9333333333333333 }, "teal": { r: 0, g: 0.5019607843137255, b: 0.5019607843137255 }, "darkcyan": { r: 0, g: 0.5450980392156862, b: 0.5450980392156862 }, "darkturquoise": { r: 0, g: 0.807843137254902, b: 0.8196078431372549 }, "aqua": { r: 0, g: 1, b: 1 }, "cyan": { r: 0, g: 1, b: 1 }, "lightcyan": { r: 0.8784313725490196, g: 1, b: 1 }, "azure": { r: 0.9411764705882353, g: 1, b: 1 }, "cadetblue": { r: 0.37254901960784315, g: 0.6196078431372549, b: 0.6274509803921569 }, "powderblue": { r: 0.6901960784313725, g: 0.8784313725490196, b: 0.9019607843137255 }, "lightblue": { r: 0.6784313725490196, g: 0.8470588235294118, b: 0.9019607843137255 }, "deepskyblue": { r: 0, g: 0.7490196078431373, b: 1 }, "skyblue": { r: 0.5294117647058824, g: 0.807843137254902, b: 0.9215686274509803 }, "lightskyblue": { r: 0.5294117647058824, g: 0.807843137254902, b: 0.9803921568627451 }, "steelblue": { r: 0.27450980392156865, g: 0.5098039215686274, b: 0.7058823529411765 }, "aliceblue": { r: 0.9411764705882353, g: 0.9725490196078431, b: 1 }, "dodgerblue": { r: 0.11764705882352941, g: 0.5647058823529412, b: 1 }, "slategray": { r: 0.4392156862745098, g: 0.5019607843137255, b: 0.5647058823529412 }, "lightslategray": { r: 0.4666666666666667, g: 0.5333333333333333, b: 0.6 }, "lightsteelblue": { r: 0.6901960784313725, g: 0.7686274509803922, b: 0.8705882352941177 }, "cornflowerblue": { r: 0.39215686274509803, g: 0.5843137254901961, b: 0.9294117647058824 }, "royalblue": { r: 0.2549019607843137, g: 0.4117647058823529, b: 0.8823529411764706 }, "midnightblue": { r: 0.09803921568627451, g: 0.09803921568627451, b: 0.4392156862745098 }, "lavender": { r: 0.9019607843137255, g: 0.9019607843137255, b: 0.9803921568627451 }, "navy": { r: 0, g: 0, b: 0.5019607843137255 }, "darkblue": { r: 0, g: 0, b: 0.5450980392156862 }, "mediumblue": { r: 0, g: 0, b: 0.803921568627451 }, "blue": { r: 0, g: 0, b: 1 }, "ghostwhite": { r: 0.9725490196078431, g: 0.9725490196078431, b: 1 }, "darkslateblue": { r: 0.2823529411764706, g: 0.23921568627450981, b: 0.5450980392156862 }, "slateblue": { r: 0.41568627450980394, g: 0.35294117647058826, b: 0.803921568627451 }, "mediumslateblue": { r: 0.4823529411764706, g: 0.40784313725490196, b: 0.9333333333333333 }, "mediumpurple": { r: 0.5764705882352941, g: 0.4392156862745098, b: 0.8588235294117647 }, "blueviolet": { r: 0.5411764705882353, g: 0.16862745098039217, b: 0.8862745098039215 }, "indigo": { r: 0.29411764705882354, g: 0, b: 0.5098039215686274 }, "darkorchid": { r: 0.6, g: 0.19607843137254902, b: 0.8 }, "darkviolet": { r: 0.5803921568627451, g: 0, b: 0.8274509803921568 }, "mediumorchid": { r: 0.7294117647058823, g: 0.3333333333333333, b: 0.8274509803921568 }, "thistle": { r: 0.8470588235294118, g: 0.7490196078431373, b: 0.8470588235294118 }, "plum": { r: 0.8666666666666667, g: 0.6274509803921569, b: 0.8666666666666667 }, "violet": { r: 0.9333333333333333, g: 0.5098039215686274, b: 0.9333333333333333 }, "purple": { r: 0.5019607843137255, g: 0, b: 0.5019607843137255 }, "darkmagenta": { r: 0.5450980392156862, g: 0, b: 0.5450980392156862 }, "magenta": { r: 1, g: 0, b: 1 }, "fuchsia": { r: 1, g: 0, b: 1 }, "orchid": { r: 0.8549019607843137, g: 0.4392156862745098, b: 0.8392156862745098 }, "mediumvioletred": { r: 0.7803921568627451, g: 0.08235294117647059, b: 0.5215686274509804 }, "deeppink": { r: 1, g: 0.0784313725490196, b: 0.5764705882352941 }, "hotpink": { r: 1, g: 0.4117647058823529, b: 0.7058823529411765 }, "palevioletred": { r: 0.8588235294117647, g: 0.4392156862745098, b: 0.5764705882352941 }, "lavenderblush": { r: 1, g: 0.9411764705882353, b: 0.9607843137254902 }, "crimson": { r: 0.8627450980392157, g: 0.0784313725490196, b: 0.23529411764705882 }, "pink": { r: 1, g: 0.7529411764705882, b: 0.796078431372549 }, "lightpink": { r: 1, g: 0.7137254901960784, b: 0.7568627450980392 } }, _exactName = function (color) { var name = false; $.each(_colors, function (n, color_b) { if (color.equals(new Color(color_b.r, color_b.g, color_b.b))) { name = n; return false } }); return name }, _closestName = function (color) { var rgb = color.getRGB(), distance = null, name = false, d; $.each(_colors, function (n, color_b) { d = color.distance(new Color(color_b.r, color_b.g, color_b.b)); if (d < distance || distance === null) { name = n; if (d == 0) return false; distance = d } }); return name }, _parseHex = function (color) { var c, m; m = /^#?([a-fA-F0-9]{1,6})$/.exec(color); if (m) { c = parseInt(m[1], 16); return new Color((c >> 16 & 255) / 255, (c >> 8 & 255) / 255, (c & 255) / 255) } return false }, _parseColor = function (color) { var name = $.trim(color).toLowerCase(), m; if (color == "") return new Color; if (_colors[name]) return new Color(_colors[name].r, _colors[name].g, _colors[name].b); m = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color); if (m) return new Color(m[1] / 255, m[2] / 255, m[3] / 255, parseFloat(m[4])); m = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color); if (m) return (new Color).setHSL(m[1] / 255, m[2] / 255, m[3] / 255).setAlpha(parseFloat(m[4])); m = /^rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color); if (m) return new Color(m[1] / 100, m[2] / 100, m[3] / 100, m[4] / 100); m = /^hsla?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(color); if (m) return (new Color).setHSL(m[1] / 100, m[2] / 100, m[3] / 100).setAlpha(m[4] / 100); m = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color); if (m) return new Color(parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255); m = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(color); if (m) return new Color(parseInt(m[1] + m[1], 16) / 255, parseInt(m[2] + m[2], 16) / 255, parseInt(m[3] + m[3], 16) / 255); return _parseHex(color) }, _layoutTable = function (layout, callback) { var bitmap, x, y, width, height, columns, rows, index, cell, html, w, h, colspan, walked; layout.sort(function (a, b) { if (a.pos[1] == b.pos[1]) return a.pos[0] - b.pos[0]; return a.pos[1] - b.pos[1] }); width = 0; height = 0; $.each(layout, function (index, part) { width = Math.max(width, part.pos[0] + part.pos[2]); height = Math.max(height, part.pos[1] + part.pos[3]) }); bitmap = []; for (x = 0; x < width; ++x) bitmap.push([]); rows = []; columns = []; $.each(layout, function (index, part) { for (x = 0; x < part.pos[2]; x += 1) columns[part.pos[0] + x] = true; for (y = 0; y < part.pos[3]; y += 1) rows[part.pos[1] + y] = true }); html = ""; cell = layout[index = 0]; for (y = 0; y < height; ++y) { html += "<tr>"; for (x = 0; x < width; x) if (typeof cell !== "undefined" && x == cell.pos[0] && y == cell.pos[1]) { html += callback(cell, x, y); for (h = 0; h < cell.pos[3]; h += 1) for (w = 0; w < cell.pos[2]; w += 1) bitmap[x + w][y + h] = true; x += cell.pos[2]; cell = layout[++index] } else { colspan = 0; walked = false; while (x < width && bitmap[x][y] === undefined && (cell === undefined || y < cell.pos[1] || y == cell.pos[1] && x < cell.pos[0])) { if (columns[x] === true) colspan += 1; walked = true; x += 1 } if (colspan > 0) html += '<td colspan="' + colspan + '"></td>'; else if (!walked) x += 1 } html += "</tr>" } return '<table cellspacing="0" cellpadding="0" border="0"><tbody>' + html + "</tbody></table>" }, _parts = { header: function (inst) { var that = this, e = null, _html = function () { var title = inst.options.title || inst._getRegional("title"), html = '<span class="ui-dialog-title">' + title + "</span>"; if (!inst.inline && inst.options.showCloseButton) html += '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button">' + '<span class="ui-icon ui-icon-closethick">close</span></a>'; return '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">' + html + "</div>" }; this.init = function () { e = $(_html()).prependTo(inst.dialog); var close = $(".ui-dialog-titlebar-close", e); inst._hoverable(close); inst._focusable(close); close.click(function (event) { event.preventDefault(); inst.close() }); if (!inst.inline && inst.options.draggable) inst.dialog.draggable({ handle: e }) } }, map: function (inst) { var that = this, e = null, mousemove_timeout = null, _mousedown, _mouseup, _mousemove, _html; _mousedown = function (event) { if (!inst.opened) return; var div = $(".ui-colorpicker-map-layer-pointer", e), offset = div.offset(), width = div.width(), height = div.height(), x = event.pageX - offset.left, y = event.pageY - offset.top; if (x >= 0 && x < width && y >= 0 && y < height) { event.stopImmediatePropagation(); event.preventDefault(); e.unbind("mousedown", _mousedown); $(document).bind("mouseup", _mouseup); $(document).bind("mousemove", _mousemove); _mousemove(event) } }; _mouseup = function (event) { event.stopImmediatePropagation(); event.preventDefault(); $(document).unbind("mouseup", _mouseup); $(document).unbind("mousemove", _mousemove); e.bind("mousedown", _mousedown) }; _mousemove = function (event) { event.stopImmediatePropagation(); event.preventDefault(); if (event.pageX === that.x && event.pageY === that.y) return; that.x = event.pageX; that.y = event.pageY; var div = $(".ui-colorpicker-map-layer-pointer", e), offset = div.offset(), width = div.width(), height = div.height(), x = event.pageX - offset.left, y = event.pageY - offset.top; x = Math.max(0, Math.min(x / width, 1)); y = Math.max(0, Math.min(y / height, 1)); switch (inst.mode) { case "h": inst.color.setHSV(null, x, 1 - y); break; case "s": case "a": inst.color.setHSV(x, null, 1 - y); break; case "v": inst.color.setHSV(x, 1 - y, null); break; case "r": inst.color.setRGB(null, 1 - y, x); break; case "g": inst.color.setRGB(1 - y, null, x); break; case "b": inst.color.setRGB(x, 1 - y, null); break } inst._change() }; _html = function () { var html = '<div class="ui-colorpicker-map ui-colorpicker-border">' + '<span class="ui-colorpicker-map-layer-1">&nbsp;</span>' + '<span class="ui-colorpicker-map-layer-2">&nbsp;</span>' + (inst.options.alpha ? '<span class="ui-colorpicker-map-layer-alpha">&nbsp;</span>' : "") + '<span class="ui-colorpicker-map-layer-pointer"><span class="ui-colorpicker-map-pointer"></span></span></div>'; return html }; this.update = function () { switch (inst.mode) { case "h": $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 0", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).hide(); break; case "s": case "a": $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 -260px", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).css({ "background-position": "0 -520px", "opacity": "" }).show(); break; case "v": $(e).css("background-color", "black"); $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 -780px", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).hide(); break; case "r": $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 -1040px", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).css({ "background-position": "0 -1300px", "opacity": "" }).show(); break; case "g": $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 -1560px", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).css({ "background-position": "0 -1820px", "opacity": "" }).show(); break; case "b": $(".ui-colorpicker-map-layer-1", e).css({ "background-position": "0 -2080px", "opacity": "" }).show(); $(".ui-colorpicker-map-layer-2", e).css({ "background-position": "0 -2340px", "opacity": "" }).show(); break } that.repaint() }; this.repaint = function () { var div = $(".ui-colorpicker-map-layer-pointer", e), x = 0, y = 0; switch (inst.mode) { case "h": x = inst.color.getHSV().s * div.width(); y = (1 - inst.color.getHSV().v) * div.width(); $(e).css("background-color", inst.color.copy().normalize().toCSS()); break; case "s": case "a": x = inst.color.getHSV().h * div.width(); y = (1 - inst.color.getHSV().v) * div.width(); $(".ui-colorpicker-map-layer-2", e).css("opacity", 1 - inst.color.getHSV().s); break; case "v": x = inst.color.getHSV().h * div.width(); y = (1 - inst.color.getHSV().s) * div.width(); $(".ui-colorpicker-map-layer-1", e).css("opacity", inst.color.getHSV().v); break; case "r": x = inst.color.getRGB().b * div.width(); y = (1 - inst.color.getRGB().g) * div.width(); $(".ui-colorpicker-map-layer-2", e).css("opacity", inst.color.getRGB().r); break; case "g": x = inst.color.getRGB().b * div.width(); y = (1 - inst.color.getRGB().r) * div.width(); $(".ui-colorpicker-map-layer-2", e).css("opacity", inst.color.getRGB().g); break; case "b": x = inst.color.getRGB().r * div.width(); y = (1 - inst.color.getRGB().g) * div.width(); $(".ui-colorpicker-map-layer-2", e).css("opacity", inst.color.getRGB().b); break } if (inst.options.alpha) $(".ui-colorpicker-map-layer-alpha", e).css("opacity", 1 - inst.color.getAlpha()); $(".ui-colorpicker-map-pointer", e).css({ "left": x - 7, "top": y - 7 }) }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-map-container", inst.dialog)); e.bind("mousedown", _mousedown) } }, bar: function (inst) { var that = this, e = null, _mousedown, _mouseup, _mousemove, _html; _mousedown = function (event) { if (!inst.opened) return; var div = $(".ui-colorpicker-bar-layer-pointer", e), offset = div.offset(), width = div.width(), height = div.height(), x = event.pageX - offset.left, y = event.pageY - offset.top; if (x >= 0 && x < width && y >= 0 && y < height) { event.stopImmediatePropagation(); event.preventDefault(); e.unbind("mousedown", _mousedown); $(document).bind("mouseup", _mouseup); $(document).bind("mousemove", _mousemove); _mousemove(event) } }; _mouseup = function (event) { event.stopImmediatePropagation(); event.preventDefault(); $(document).unbind("mouseup", _mouseup); $(document).unbind("mousemove", _mousemove); e.bind("mousedown", _mousedown) }; _mousemove = function (event) { event.stopImmediatePropagation(); event.preventDefault(); if (event.pageY === that.y) return; that.y = event.pageY; var div = $(".ui-colorpicker-bar-layer-pointer", e), offset = div.offset(), height = div.height(), y = event.pageY - offset.top; y = Math.max(0, Math.min(y / height, 1)); switch (inst.mode) { case "h": inst.color.setHSV(1 - y, null, null); break; case "s": inst.color.setHSV(null, 1 - y, null); break; case "v": inst.color.setHSV(null, null, 1 - y); break; case "r": inst.color.setRGB(1 - y, null, null); break; case "g": inst.color.setRGB(null, 1 - y, null); break; case "b": inst.color.setRGB(null, null, 1 - y); break; case "a": inst.color.setAlpha(1 - y); break } inst._change() }; _html = function () { var html = '<div class="ui-colorpicker-bar ui-colorpicker-border">' + '<span class="ui-colorpicker-bar-layer-1">&nbsp;</span>' + '<span class="ui-colorpicker-bar-layer-2">&nbsp;</span>' + '<span class="ui-colorpicker-bar-layer-3">&nbsp;</span>' + '<span class="ui-colorpicker-bar-layer-4">&nbsp;</span>'; if (inst.options.alpha) html += '<span class="ui-colorpicker-bar-layer-alpha">&nbsp;</span>' + '<span class="ui-colorpicker-bar-layer-alphabar">&nbsp;</span>'; html += '<span class="ui-colorpicker-bar-layer-pointer"><span class="ui-colorpicker-bar-pointer"></span></span></div>'; return html }; this.update = function () { switch (inst.mode) { case "h": case "s": case "v": case "r": case "g": case "b": $(".ui-colorpicker-bar-layer-alpha", e).show(); $(".ui-colorpicker-bar-layer-alphabar", e).hide(); break; case "a": $(".ui-colorpicker-bar-layer-alpha", e).hide(); $(".ui-colorpicker-bar-layer-alphabar", e).show(); break } switch (inst.mode) { case "h": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 0", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).hide(); $(".ui-colorpicker-bar-layer-3", e).hide(); $(".ui-colorpicker-bar-layer-4", e).hide(); break; case "s": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 -260px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).css({ "background-position": "0 -520px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-3", e).hide(); $(".ui-colorpicker-bar-layer-4", e).hide(); break; case "v": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 -520px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).hide(); $(".ui-colorpicker-bar-layer-3", e).hide(); $(".ui-colorpicker-bar-layer-4", e).hide(); break; case "r": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 -1560px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).css({ "background-position": "0 -1300px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-3", e).css({ "background-position": "0 -780px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-4", e).css({ "background-position": "0 -1040px", "opacity": "" }).show(); break; case "g": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 -2600px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).css({ "background-position": "0 -2340px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-3", e).css({ "background-position": "0 -1820px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-4", e).css({ "background-position": "0 -2080px", "opacity": "" }).show(); break; case "b": $(".ui-colorpicker-bar-layer-1", e).css({ "background-position": "0 -3640px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-2", e).css({ "background-position": "0 -3380px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-3", e).css({ "background-position": "0 -2860px", "opacity": "" }).show(); $(".ui-colorpicker-bar-layer-4", e).css({ "background-position": "0 -3120px", "opacity": "" }).show(); break; case "a": $(".ui-colorpicker-bar-layer-1", e).hide(); $(".ui-colorpicker-bar-layer-2", e).hide(); $(".ui-colorpicker-bar-layer-3", e).hide(); $(".ui-colorpicker-bar-layer-4", e).hide(); break } that.repaint() }; this.repaint = function () { var div = $(".ui-colorpicker-bar-layer-pointer", e), y = 0; switch (inst.mode) { case "h": y = (1 - inst.color.getHSV().h) * div.height(); break; case "s": y = (1 - inst.color.getHSV().s) * div.height(); $(".ui-colorpicker-bar-layer-2", e).css("opacity", 1 - inst.color.getHSV().v); $(e).css("background-color", inst.color.copy().normalize().toCSS()); break; case "v": y = (1 - inst.color.getHSV().v) * div.height(); $(e).css("background-color", inst.color.copy().normalize().toCSS()); break; case "r": y = (1 - inst.color.getRGB().r) * div.height(); $(".ui-colorpicker-bar-layer-2", e).css("opacity", Math.max(0, inst.color.getRGB().b - inst.color.getRGB().g)); $(".ui-colorpicker-bar-layer-3", e).css("opacity", Math.max(0, inst.color.getRGB().g - inst.color.getRGB().b)); $(".ui-colorpicker-bar-layer-4", e).css("opacity", Math.min(inst.color.getRGB().b, inst.color.getRGB().g)); break; case "g": y = (1 - inst.color.getRGB().g) * div.height(); $(".ui-colorpicker-bar-layer-2", e).css("opacity", Math.max(0, inst.color.getRGB().b - inst.color.getRGB().r)); $(".ui-colorpicker-bar-layer-3", e).css("opacity", Math.max(0, inst.color.getRGB().r - inst.color.getRGB().b)); $(".ui-colorpicker-bar-layer-4", e).css("opacity", Math.min(inst.color.getRGB().r, inst.color.getRGB().b)); break; case "b": y = (1 - inst.color.getRGB().b) * div.height(); $(".ui-colorpicker-bar-layer-2", e).css("opacity", Math.max(0, inst.color.getRGB().r - inst.color.getRGB().g)); $(".ui-colorpicker-bar-layer-3", e).css("opacity", Math.max(0, inst.color.getRGB().g - inst.color.getRGB().r)); $(".ui-colorpicker-bar-layer-4", e).css("opacity", Math.min(inst.color.getRGB().r, inst.color.getRGB().g)); break; case "a": y = (1 - inst.color.getAlpha()) * div.height(); $(e).css("background-color", inst.color.copy().normalize().toCSS()); break } if (inst.mode !== "a") $(".ui-colorpicker-bar-layer-alpha", e).css("opacity", 1 - inst.color.getAlpha()); $(".ui-colorpicker-bar-pointer", e).css("top", y - 3) }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-bar-container", inst.dialog)); e.bind("mousedown", _mousedown) } }, preview: function (inst) { var that = this, e = null, _html; _html = function () { return '<div class="ui-colorpicker-preview ui-colorpicker-border">' + '<div class="ui-colorpicker-preview-initial"><div class="ui-colorpicker-preview-initial-alpha"></div></div>' + '<div class="ui-colorpicker-preview-current"><div class="ui-colorpicker-preview-current-alpha"></div></div>' + "</div>" }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-preview-container", inst.dialog)); $(".ui-colorpicker-preview-initial", e).click(function () { inst.color = inst.currentColor.copy(); inst._change() }) }; this.update = function () { if (inst.options.alpha) $(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha", e).show(); else $(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha", e).hide(); this.repaint() }; this.repaint = function () { $(".ui-colorpicker-preview-initial", e).css("background-color", inst.currentColor.toCSS()).attr("title", inst.currentColor.toHex()); $(".ui-colorpicker-preview-initial-alpha", e).css("opacity", 1 - inst.currentColor.getAlpha()); $(".ui-colorpicker-preview-current", e).css("background-color", inst.color.toCSS()).attr("title", inst.color.toHex()); $(".ui-colorpicker-preview-current-alpha", e).css("opacity", 1 - inst.color.getAlpha()) } }, hsv: function (inst) { var that = this, e = null, _html; _html = function () { var html = ""; if (inst.options.hsv) html += '<div class="ui-colorpicker-hsv-h"><input class="ui-colorpicker-mode" type="radio" value="h"/><label>' + inst._getRegional("hsvH") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="360" size="10"/><span class="ui-colorpicker-unit">&deg;</span></div>' + '<div class="ui-colorpicker-hsv-s"><input class="ui-colorpicker-mode" type="radio" value="s"/><label>' + inst._getRegional("hsvS") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div>' + '<div class="ui-colorpicker-hsv-v"><input class="ui-colorpicker-mode" type="radio" value="v"/><label>' + inst._getRegional("hsvV") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div>'; return '<div class="ui-colorpicker-hsv">' + html + "</div>" }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-hsv-container", inst.dialog)); $(".ui-colorpicker-mode", e).click(function () { inst.mode = $(this).val(); inst._updateAllParts() }); $(".ui-colorpicker-number", e).bind("change keyup", function () { inst.color.setHSV($(".ui-colorpicker-hsv-h .ui-colorpicker-number", e).val() / 360, $(".ui-colorpicker-hsv-s .ui-colorpicker-number", e).val() / 100, $(".ui-colorpicker-hsv-v .ui-colorpicker-number", e).val() / 100); inst._change() }) }; this.repaint = function () { var hsv = inst.color.getHSV(); hsv.h *= 360; hsv.s *= 100; hsv.v *= 100; $.each(hsv, function (index, value) { var input = $(".ui-colorpicker-hsv-" + index + " .ui-colorpicker-number", e); value = Math.round(value); if (input.val() !== value) input.val(value) }) }; this.update = function () { $(".ui-colorpicker-mode", e).each(function () { $(this).attr("checked", $(this).val() === inst.mode) }); this.repaint() } }, rgb: function (inst) { var that = this, e = null, _html; _html = function () { var html = ""; if (inst.options.rgb) html += '<div class="ui-colorpicker-rgb-r"><input class="ui-colorpicker-mode" type="radio" value="r"/><label>' + inst._getRegional("rgbR") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>' + '<div class="ui-colorpicker-rgb-g"><input class="ui-colorpicker-mode" type="radio" value="g"/><label>' + inst._getRegional("rgbG") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>' + '<div class="ui-colorpicker-rgb-b"><input class="ui-colorpicker-mode" type="radio" value="b"/><label>' + inst._getRegional("rgbB") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>'; return '<div class="ui-colorpicker-rgb">' + html + "</div>" }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-rgb-container", inst.dialog)); $(".ui-colorpicker-mode", e).click(function () { inst.mode = $(this).val(); inst._updateAllParts() }); $(".ui-colorpicker-number", e).bind("change keyup", function () { inst.color.setRGB($(".ui-colorpicker-rgb-r .ui-colorpicker-number", e).val() / 255, $(".ui-colorpicker-rgb-g .ui-colorpicker-number", e).val() / 255, $(".ui-colorpicker-rgb-b .ui-colorpicker-number", e).val() / 255); inst._change() }) }; this.repaint = function () { $.each(inst.color.getRGB(), function (index, value) { var input = $(".ui-colorpicker-rgb-" + index + " .ui-colorpicker-number", e); value = Math.round(value * 255); if (input.val() !== value) input.val(value) }) }; this.update = function () { $(".ui-colorpicker-mode", e).each(function () { $(this).attr("checked", $(this).val() === inst.mode) }); this.repaint() } }, lab: function (inst) { var that = this, part = null, html = function () { var html = ""; if (inst.options.hsv) html += '<div class="ui-colorpicker-lab-l"><label>' + inst._getRegional("labL") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/></div>' + '<div class="ui-colorpicker-lab-a"><label>' + inst._getRegional("labA") + '</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div>' + '<div class="ui-colorpicker-lab-b"><label>' + inst._getRegional("labB") + '</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div>'; return '<div class="ui-colorpicker-lab">' + html + "</div>" }; this.init = function () { var data = 0; part = $(html()).appendTo($(".ui-colorpicker-lab-container", inst.dialog)); $(".ui-colorpicker-number", part).on("change keyup", function (event) { inst.color.setLAB(parseInt($(".ui-colorpicker-lab-l .ui-colorpicker-number", part).val(), 10) / 100, (parseInt($(".ui-colorpicker-lab-a .ui-colorpicker-number", part).val(), 10) + 128) / 255, (parseInt($(".ui-colorpicker-lab-b .ui-colorpicker-number", part).val(), 10) + 128) / 255); inst._change() }) }; this.repaint = function () { var lab = inst.color.getLAB(); lab.l *= 100; lab.a = lab.a * 255 - 128; lab.b = lab.b * 255 - 128; $.each(lab, function (index, value) { var input = $(".ui-colorpicker-lab-" + index + " .ui-colorpicker-number", part); value = Math.round(value); if (input.val() !== value) input.val(value) }) }; this.update = function () { this.repaint() } }, cmyk: function (inst) { var that = this, part = null, html = function () { var html = ""; if (inst.options.hsv) html += '<div class="ui-colorpicker-cmyk-c"><label>' + inst._getRegional("cmykC") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>' + '<div class="ui-colorpicker-cmyk-m"><label>' + inst._getRegional("cmykM") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>' + '<div class="ui-colorpicker-cmyk-y"><label>' + inst._getRegional("cmykY") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>' + '<div class="ui-colorpicker-cmyk-k"><label>' + inst._getRegional("cmykK") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'; return '<div class="ui-colorpicker-cmyk">' + html + "</div>" }; this.init = function () { part = $(html()).appendTo($(".ui-colorpicker-cmyk-container", inst.dialog)); $(".ui-colorpicker-number", part).on("change keyup", function (event) { inst.color.setCMYK(parseInt($(".ui-colorpicker-cmyk-c .ui-colorpicker-number", part).val(), 10) / 100, parseInt($(".ui-colorpicker-cmyk-m .ui-colorpicker-number", part).val(), 10) / 100, parseInt($(".ui-colorpicker-cmyk-y .ui-colorpicker-number", part).val(), 10) / 100, parseInt($(".ui-colorpicker-cmyk-k .ui-colorpicker-number", part).val(), 10) / 100); inst._change() }) }; this.repaint = function () { $.each(inst.color.getCMYK(), function (index, value) { var input = $(".ui-colorpicker-cmyk-" + index + " .ui-colorpicker-number", part); value = Math.round(value * 100); if (input.val() !== value) input.val(value) }) }; this.update = function () { this.repaint() } }, alpha: function (inst) { var that = this, e = null, _html; _html = function () { var html = ""; if (inst.options.alpha) html += '<div class="ui-colorpicker-a"><input class="ui-colorpicker-mode" name="mode" type="radio" value="a"/><label>' + inst._getRegional("alphaA") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'; return '<div class="ui-colorpicker-alpha">' + html + "</div>" }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-alpha-container", inst.dialog)); $(".ui-colorpicker-mode", e).click(function () { inst.mode = $(this).val(); inst._updateAllParts() }); $(".ui-colorpicker-number", e).bind("change keyup", function () { inst.color.setAlpha($(".ui-colorpicker-a .ui-colorpicker-number", e).val() / 100); inst._change() }) }; this.update = function () { $(".ui-colorpicker-mode", e).each(function () { $(this).attr("checked", $(this).val() === inst.mode) }); this.repaint() }; this.repaint = function () { var input = $(".ui-colorpicker-a .ui-colorpicker-number", e), value = Math.round(inst.color.getAlpha() * 100); if (!input.is(":focus") && input.val() !== value) input.val(value) } }, hex: function (inst) { var that = this, e = null, _html; _html = function () { var html = ""; if (inst.options.alpha) html += '<input class="ui-colorpicker-hex-alpha" type="text" maxlength="2" size="2"/>'; html += '<input class="ui-colorpicker-hex-input" type="text" maxlength="6" size="6"/>'; return '<div class="ui-colorpicker-hex"><label>#</label>' + html + "</div>" }; this.init = function () { e = $(_html()).appendTo($(".ui-colorpicker-hex-container", inst.dialog)); $(".ui-colorpicker-hex-input", e).bind("change keydown keyup", function (a, b, c) { if (/[^a-fA-F0-9]/.test($(this).val())) $(this).val($(this).val().replace(/[^a-fA-F0-9]/, "")) }); $(".ui-colorpicker-hex-input", e).bind("change keyup", function () { inst.color = _parseHex($(this).val()).setAlpha(inst.color.getAlpha()); inst._change() }); $(".ui-colorpicker-hex-alpha", e).bind("change keydown keyup", function () { if (/[^a-fA-F0-9]/.test($(this).val())) $(this).val($(this).val().replace(/[^a-fA-F0-9]/, "")) }); $(".ui-colorpicker-hex-alpha", e).bind("change keyup", function () { inst.color.setAlpha(parseInt($(".ui-colorpicker-hex-alpha", e).val(), 16) / 255); inst._change() }) }; this.update = function () { this.repaint() }; this.repaint = function () { if (!$(".ui-colorpicker-hex-input", e).is(":focus")) $(".ui-colorpicker-hex-input", e).val(inst.color.toHex(true)); if (!$(".ui-colorpicker-hex-alpha", e).is(":focus")) $(".ui-colorpicker-hex-alpha", e).val(_intToHex(inst.color.getAlpha() * 255)) } }, swatches: function (inst) { var that = this, part = null, html = function () { var html = ""; $.each(inst.options.swatches, function (name, color) { var c = new Color(color.r, color.g, color.b), css = c.toCSS(); html += '<div class="ui-colorpicker-swatch" style="background-color: ' + css + '" title="' + name + '"></div>' }); return '<div class="ui-colorpicker-swatches ui-colorpicker-border">' + html + "</div>" }; this.init = function () { part = $(html()).appendTo($(".ui-colorpicker-swatches-container", inst.dialog)); $(".ui-colorpicker-swatch", part).click(function () { inst.color = _parseColor($(this).css("background-color")); inst._change() }) } }, footer: function (inst) { var that = this, part = null, id_transparent = "ui-colorpicker-special-transparent-" + _colorpicker_index, id_none = "ui-colorpicker-special-none-" + _colorpicker_index, html = function () { var html = ""; if (inst.options.alpha || !inst.inline && inst.options.showNoneButton) { html += '<div class="ui-colorpicker-buttonset">'; if (inst.options.alpha) html += '<input type="radio" name="ui-colorpicker-special" id="' + id_transparent + '" class="ui-colorpicker-special-transparent"/><label for="' + id_transparent + '">' + inst._getRegional("transparent") + "</label>"; if (!inst.inline && inst.options.showNoneButton) html += '<input type="radio" name="ui-colorpicker-special" id="' + id_none + '" class="ui-colorpicker-special-none"><label for="' + id_none + '">' + inst._getRegional("none") + "</label>"; html += "</div>" } if (!inst.inline) { html += '<div class="ui-dialog-buttonset">'; if (inst.options.showCancelButton) html += '<button class="ui-colorpicker-cancel">' + inst._getRegional("cancel") + "</button>"; html += '<button class="ui-colorpicker-ok">' + inst._getRegional("ok") + "</button>"; html += "</div>" } return '<div class="ui-dialog-buttonpane ui-widget-content">' + html + "</div>" }; this.init = function () { part = $(html()).appendTo(inst.dialog); $(".ui-colorpicker-ok", part).button().click(function () { inst.close() }); $(".ui-colorpicker-cancel", part).button().click(function () { inst.color = inst.currentColor.copy(); inst._change(inst.color.set); inst.close() }); $(".ui-colorpicker-buttonset", part).buttonset(); $(".ui-colorpicker-special-color", part).click(function () { inst._change() }); $("#" + id_none, part).click(function () { inst._change(false) }); $("#" + id_transparent, part).click(function () { inst.color.setAlpha(0); inst._change() }) }; this.repaint = function () { if (!inst.color.set) $(".ui-colorpicker-special-none", part).attr("checked", true).button("refresh"); else if (inst.color.getAlpha() == 0) $(".ui-colorpicker-special-transparent", part).attr("checked", true).button("refresh"); else $("input", part).attr("checked", false).button("refresh"); $(".ui-colorpicker-cancel", part).button(inst.changed ? "enable" : "disable") }; this.update = function () { } } }, Color = function () { var spaces = { rgb: { r: 0, g: 0, b: 0 }, hsv: { h: 0, s: 0, v: 0 }, hsl: { h: 0, s: 0, l: 0 }, lab: { l: 0, a: 0, b: 0 }, cmyk: { c: 0, m: 0, y: 0, k: 1 } }, a = 1, args = arguments, _clip = function (v) { if (isNaN(v) || v === null) return 0; if (typeof v == "string") v = parseInt(v, 10); return Math.max(0, Math.min(v, 1)) }, _hexify = function (number) { var digits = "0123456789abcdef", lsd = number % 16, msd = (number - lsd) / 16, hexified = digits.charAt(msd) + digits.charAt(lsd); return hexified }, _rgb_to_xyz = function (rgb) { var r = rgb.r > 0.04045 ? Math.pow((rgb.r + 0.055) / 1.055, 2.4) : rgb.r / 12.92, g = rgb.g > 0.04045 ? Math.pow((rgb.g + 0.055) / 1.055, 2.4) : rgb.g / 12.92, b = rgb.b > 0.04045 ? Math.pow((rgb.b + 0.055) / 1.055, 2.4) : rgb.b / 12.92; return { x: r * 0.4124 + g * 0.3576 + b * 0.1805, y: r * 0.2126 + g * 0.7152 + b * 0.0722, z: r * 0.0193 + g * 0.1192 + b * 0.9505 } }, _xyz_to_rgb = function (xyz) { var rgb = { r: xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986, g: xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415, b: xyz.x * 0.0557 + xyz.y * -0.204 + xyz.z * 1.057 }; rgb.r = rgb.r > 0.0031308 ? 1.055 * Math.pow(rgb.r, 1 / 2.4) - 0.055 : 12.92 * rgb.r; rgb.g = rgb.g > 0.0031308 ? 1.055 * Math.pow(rgb.g, 1 / 2.4) - 0.055 : 12.92 * rgb.g; rgb.b = rgb.b > 0.0031308 ? 1.055 * Math.pow(rgb.b, 1 / 2.4) - 0.055 : 12.92 * rgb.b; return rgb }, _rgb_to_hsv = function (rgb) { var minVal = Math.min(rgb.r, rgb.g, rgb.b), maxVal = Math.max(rgb.r, rgb.g, rgb.b), delta = maxVal - minVal, del_R, del_G, del_B, hsv = { h: 0, s: 0, v: maxVal }; if (delta === 0) { hsv.h = 0; hsv.s = 0 } else { hsv.s = delta / maxVal; del_R = ((maxVal - rgb.r) / 6 + delta / 2) / delta; del_G = ((maxVal - rgb.g) / 6 + delta / 2) / delta; del_B = ((maxVal - rgb.b) / 6 + delta / 2) / delta; if (rgb.r === maxVal) hsv.h = del_B - del_G; else if (rgb.g === maxVal) hsv.h = 1 / 3 + del_R - del_B; else if (rgb.b === maxVal) hsv.h = 2 / 3 + del_G - del_R; if (hsv.h < 0) hsv.h += 1; else if (hsv.h > 1) hsv.h -= 1 } return hsv }, _hsv_to_rgb = function (hsv) { var rgb = { r: 0, g: 0, b: 0 }, var_h, var_i, var_1, var_2, var_3; if (hsv.s === 0) rgb.r = rgb.g = rgb.b = hsv.v; else { var_h = hsv.h === 1 ? 0 : hsv.h * 6; var_i = Math.floor(var_h); var_1 = hsv.v * (1 - hsv.s); var_2 = hsv.v * (1 - hsv.s * (var_h - var_i)); var_3 = hsv.v * (1 - hsv.s * (1 - (var_h - var_i))); if (var_i === 0) { rgb.r = hsv.v; rgb.g = var_3; rgb.b = var_1 } else if (var_i === 1) { rgb.r = var_2; rgb.g = hsv.v; rgb.b = var_1 } else if (var_i === 2) { rgb.r = var_1; rgb.g = hsv.v; rgb.b = var_3 } else if (var_i === 3) { rgb.r = var_1; rgb.g = var_2; rgb.b = hsv.v } else if (var_i === 4) { rgb.r = var_3; rgb.g = var_1; rgb.b = hsv.v } else { rgb.r = hsv.v; rgb.g = var_1; rgb.b = var_2 } } return rgb }, _rgb_to_hsl = function (rgb) { var minVal = Math.min(rgb.r, rgb.g, rgb.b), maxVal = Math.max(rgb.r, rgb.g, rgb.b), delta = maxVal - minVal, del_R, del_G, del_B, hsl = { h: 0, s: 0, l: (maxVal + minVal) / 2 }; if (delta === 0) { hsl.h = 0; hsl.s = 0 } else { hsl.s = hsl.l < 0.5 ? delta / (maxVal + minVal) : delta / (2 - maxVal - minVal); del_R = ((maxVal - rgb.r) / 6 + delta / 2) / delta; del_G = ((maxVal - rgb.g) / 6 + delta / 2) / delta; del_B = ((maxVal - rgb.b) / 6 + delta / 2) / delta; if (rgb.r === maxVal) hsl.h = del_B - del_G; else if (rgb.g === maxVal) hsl.h = 1 / 3 + del_R - del_B; else if (rgb.b === maxVal) hsl.h = 2 / 3 + del_G - del_R; if (hsl.h < 0) hsl.h += 1; else if (hsl.h > 1) hsl.h -= 1 } return hsl }, _hsl_to_rgb = function (hsl) { var var_1, var_2, hue_to_rgb = function (v1, v2, vH) { if (vH < 0) vH += 1; if (vH > 1) vH -= 1; if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH; if (2 * vH < 1) return v2; if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6; return v1 }; if (hsl.s === 0) return { r: hsl.l, g: hsl.l, b: hsl.l }; var_2 = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.s * hsl.l; var_1 = 2 * hsl.l - var_2; return { r: hue_to_rgb(var_1, var_2, hsl.h + 1 / 3), g: hue_to_rgb(var_1, var_2, hsl.h), b: hue_to_rgb(var_1, var_2, hsl.h - 1 / 3) } }, _xyz_to_lab = function (xyz) { var x = xyz.x / 0.95047, y = xyz.y, z = xyz.z / 1.08883; x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116; y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116; z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116; return { l: (116 * y - 16) / 100, a: (500 * (x - y) + 128) / 255, b: (200 * (y - z) + 128) / 255 } }, _lab_to_xyz = function (lab) { var lab2 = { l: lab.l * 100, a: lab.a * 255 - 128, b: lab.b * 255 - 128 }, xyz = { x: 0, y: (lab2.l + 16) / 116, z: 0 }; xyz.x = lab2.a / 500 + xyz.y; xyz.z = xyz.y - lab2.b / 200; xyz.x = Math.pow(xyz.x, 3) > 0.008856 ? Math.pow(xyz.x, 3) : (xyz.x - 16 / 116) / 7.787; xyz.y = Math.pow(xyz.y, 3) > 0.008856 ? Math.pow(xyz.y, 3) : (xyz.y - 16 / 116) / 7.787; xyz.z = Math.pow(xyz.z, 3) > 0.008856 ? Math.pow(xyz.z, 3) : (xyz.z - 16 / 116) / 7.787; xyz.x *= 0.95047; xyz.y *= 1; xyz.z *= 1.08883; return xyz }, _rgb_to_cmy = function (rgb) { return { c: 1 - rgb.r, m: 1 - rgb.g, y: 1 - rgb.b } }, _cmy_to_rgb = function (cmy) { return { r: 1 - cmy.c, g: 1 - cmy.m, b: 1 - cmy.y } }, _cmy_to_cmyk = function (cmy) { var K = 1; if (cmy.c < K) K = cmy.c; if (cmy.m < K) K = cmy.m; if (cmy.y < K) K = cmy.y; if (K == 1) return { c: 0, m: 0, y: 0, k: 1 }; return { c: (cmy.c - K) / (1 - K), m: (cmy.m - K) / (1 - K), y: (cmy.y - K) / (1 - K), k: K } }, _cmyk_to_cmy = function (cmyk) { return { c: cmyk.c * (1 - cmyk.k) + cmyk.k, m: cmyk.m * (1 - cmyk.k) + cmyk.k, y: cmyk.y * (1 - cmyk.k) + cmyk.k } }; this.set = true; this.setAlpha = function (_a) { if (_a !== null) a = _clip(_a); return this }; this.getAlpha = function () { return a }; this.setRGB = function (r, g, b) { spaces = { rgb: this.getRGB() }; if (r !== null) spaces.rgb.r = _clip(r); if (g !== null) spaces.rgb.g = _clip(g); if (b !== null) spaces.rgb.b = _clip(b); return this }; this.setHSV = function (h, s, v) { spaces = { hsv: this.getHSV() }; if (h !== null) spaces.hsv.h = _clip(h); if (s !== null) spaces.hsv.s = _clip(s); if (v !== null) spaces.hsv.v = _clip(v); return this }; this.setHSL = function (h, s, l) { spaces = { hsl: this.getHSL() }; if (h !== null) spaces.hsl.h = _clip(h); if (s !== null) spaces.hsl.s = _clip(s); if (l !== null) spaces.hsl.l = _clip(l); return this }; this.setLAB = function (l, a, b) { spaces = { lab: this.getLAB() }; if (l !== null) spaces.lab.l = _clip(l); if (a !== null) spaces.lab.a = _clip(a); if (b !== null) spaces.lab.b = _clip(b); return this }; this.setCMYK = function (c, m, y, k) { spaces = { cmyk: this.getCMYK() }; if (c !== null) spaces.cmyk.c = _clip(c); if (m !== null) spaces.cmyk.m = _clip(m); if (y !== null) spaces.cmyk.y = _clip(y); if (k !== null) spaces.cmyk.k = _clip(k); return this }; this.getRGB = function () { if (!spaces.rgb) { spaces.rgb = spaces.lab ? _xyz_to_rgb(_lab_to_xyz(spaces.lab)) : spaces.hsv ? _hsv_to_rgb(spaces.hsv) : spaces.hsl ? _hsl_to_rgb(spaces.hsl) : spaces.cmyk ? _cmy_to_rgb(_cmyk_to_cmy(spaces.cmyk)) : { r: 0, g: 0, b: 0 }; spaces.rgb.r = _clip(spaces.rgb.r); spaces.rgb.g = _clip(spaces.rgb.g); spaces.rgb.b = _clip(spaces.rgb.b) } return $.extend({}, spaces.rgb) }; this.getHSV = function () { if (!spaces.hsv) { spaces.hsv = spaces.lab ? _rgb_to_hsv(this.getRGB()) : spaces.rgb ? _rgb_to_hsv(spaces.rgb) : spaces.hsl ? _rgb_to_hsv(this.getRGB()) : spaces.cmyk ? _rgb_to_hsv(this.getRGB()) : { h: 0, s: 0, v: 0 }; spaces.hsv.h = _clip(spaces.hsv.h); spaces.hsv.s = _clip(spaces.hsv.s); spaces.hsv.v = _clip(spaces.hsv.v) } return $.extend({}, spaces.hsv) }; this.getHSL = function () { if (!spaces.hsl) { spaces.hsl = spaces.rgb ? _rgb_to_hsl(spaces.rgb) : spaces.hsv ? _rgb_to_hsl(this.getRGB()) : spaces.cmyk ? _rgb_to_hsl(this.getRGB()) : spaces.hsv ? _rgb_to_hsl(this.getRGB()) : { h: 0, s: 0, l: 0 }; spaces.hsl.h = _clip(spaces.hsl.h); spaces.hsl.s = _clip(spaces.hsl.s); spaces.hsl.l = _clip(spaces.hsl.l) } return $.extend({}, spaces.hsl) }; this.getCMYK = function () { if (!spaces.cmyk) { spaces.cmyk = spaces.rgb ? _cmy_to_cmyk(_rgb_to_cmy(spaces.rgb)) : spaces.hsv ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB())) : spaces.hsl ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB())) : spaces.lab ? _cmy_to_cmyk(_rgb_to_cmy(this.getRGB())) : { c: 0, m: 0, y: 0, k: 1 }; spaces.cmyk.c = _clip(spaces.cmyk.c); spaces.cmyk.m = _clip(spaces.cmyk.m); spaces.cmyk.y = _clip(spaces.cmyk.y); spaces.cmyk.k = _clip(spaces.cmyk.k) } return $.extend({}, spaces.cmyk) }; this.getLAB = function () { if (!spaces.lab) { spaces.lab = spaces.rgb ? _xyz_to_lab(_rgb_to_xyz(spaces.rgb)) : spaces.hsv ? _xyz_to_lab(_rgb_to_xyz(this.getRGB())) : spaces.hsl ? _xyz_to_lab(_rgb_to_xyz(this.getRGB())) : spaces.cmyk ? _xyz_to_lab(_rgb_to_xyz(this.getRGB())) : { l: 0, a: 0, b: 0 }; spaces.lab.l = _clip(spaces.lab.l); spaces.lab.a = _clip(spaces.lab.a); spaces.lab.b = _clip(spaces.lab.b) } return $.extend({}, spaces.lab) }; this.getChannels = function () { return { r: this.getRGB().r, g: this.getRGB().g, b: this.getRGB().b, a: this.getAlpha(), h: this.getHSV().h, s: this.getHSV().s, v: this.getHSV().v, c: this.getCMYK().c, m: this.getCMYK().m, y: this.getCMYK().y, k: this.getCMYK().k, L: this.getLAB().l, A: this.getLAB().a, B: this.getLAB().b } }; this.getSpaces = function () { return $.extend(true, {}, spaces) }; this.setSpaces = function (new_spaces) { spaces = new_spaces; return this }; this.distance = function (color) { var space = "lab", getter = "get" + space.toUpperCase(), a = this[getter](), b = color[getter](), distance = 0, channel; for (channel in a) distance += Math.pow(a[channel] - b[channel], 2); return distance }; this.equals = function (color) { var a = this.getRGB(), b = color.getRGB(); return this.getAlpha() == color.getAlpha() && a.r == b.r && a.g == b.g && a.b == b.b }; this.limit = function (steps) { steps -= 1; var rgb = this.getRGB(); this.setRGB(Math.round(rgb.r * steps) / steps, Math.round(rgb.g * steps) / steps, Math.round(rgb.b * steps) / steps) }; this.toHex = function () { var rgb = this.getRGB(); return _hexify(rgb.r * 255) + _hexify(rgb.g * 255) + _hexify(rgb.b * 255) }; this.toCSS = function () { return "#" + this.toHex() }; this.normalize = function () { this.setHSV(null, 1, 1); return this }; this.copy = function () { var spaces = this.getSpaces(), a = this.getAlpha(); return new Color(spaces, a) }; if (args.length == 2) { this.setSpaces(args[0]); this.setAlpha(args[1] === 0 ? 0 : args[1] || 1) } if (args.length > 2) { this.setRGB(args[0], args[1], args[2]); this.setAlpha(args[3] === 0 ? 0 : args[3] || 1) } }; $.widget("vanderlee.colorpicker", { options: { alpha: false, altAlpha: true, altField: "", altOnChange: true, altProperties: "background-color", autoOpen: false, buttonColorize: false, buttonImage: "images/ui-colorpicker.png", buttonImageOnly: false, buttonText: null, closeOnEscape: true, closeOnOutside: true, color: "#00FF00", colorFormat: "HEX", draggable: true, duration: "fast", hsv: true, regional: "", layout: { map: [0, 0, 1, 5], bar: [1, 0, 1, 5], preview: [2, 0, 1, 1], hsv: [2, 1, 1, 1], rgb: [2, 2, 1, 1], alpha: [2, 3, 1, 1], hex: [2, 4, 1, 1], lab: [3, 1, 1, 1], cmyk: [3, 2, 1, 2], swatches: [4, 0, 1, 5] }, limit: "", modal: false, mode: "h", parts: "", rgb: true, showAnim: "fadeIn", showCancelButton: true, showNoneButton: false, showCloseButton: true, showOn: "focus", showOptions: {}, swatches: null, title: null, close: null, init: null, select: null, open: null }, _create: function () { var that = this, text; ++_colorpicker_index; that.widgetEventPrefix = "color"; that.opened = false; that.generated = false; that.inline = false; that.changed = false; that.dialog = null; that.button = null; that.image = null; that.overlay = null; that.mode = that.options.mode; if (that.options.swatches === null) that.options.swatches = _colors; if (this.element[0].nodeName.toLowerCase() === "input" || !this.inline) { that._setColor(that.element.val()); this._callback("init"); $("body").append(_container_popup); that.dialog = $(".ui-colorpicker:last"); $(document).mousedown(function (event) { if (!that.opened || event.target === that.element[0] || that.overlay) return; if (that.dialog.is(event.target) || that.dialog.has(event.target).length > 0) { that.element.blur(); return } var p, parents = $(event.target).parents(); for (p = 0; p <= parents.length; ++p) if (that.button !== null && parents[p] === that.button[0]) return; if (!that.options.closeOnOutside) return; that.close() }); $(document).keydown(function (event) { if (event.keyCode == 27 && that.opened && that.options.closeOnEscape) that.close() }); if (that.options.showOn === "focus" || that.options.showOn === "both") that.element.focus(function () { that.open() }); if (that.options.showOn === "button" || that.options.showOn === "both") { if (that.options.buttonImage !== "") { text = that.options.buttonText || that._getRegional("button"); that.image = $("<img/>").attr({ "src": that.options.buttonImage, "alt": text, "title": text }); that._setImageBackground() } if (that.options.buttonImageOnly && that.image) that.button = that.image; else { that.button = $('<button type="button"></button>').html(that.image || that.options.buttonText).button(); that.image = that.image ? $("img", that.button).first() : null } that.button.insertAfter(that.element).click(function () { that[that.opened ? "close" : "open"]() }) } if (that.options.autoOpen) that.open(); that.element.keydown(function (event) { if (event.keyCode === 9) that.close() }).keyup(function (event) { var color = _parseColor(that.element.val()); if (!that.color.equals(color)) { that.color = color; that._change() } }) } else { that.inline = true; $(this.element).html(_container_inline); that.dialog = $(".ui-colorpicker", this.element); that._generate(); that.opened = true } return this }, _setOption: function (key, value) { var that = this; switch (key) { case "disabled": if (value) that.dialog.addClass("ui-colorpicker-disabled"); else that.dialog.removeClass("ui-colorpicker-disabled"); break } $.Widget.prototype._setOption.apply(that, arguments) }, _setImageBackground: function () { if (this.image && this.options.buttonColorize) this.image.css("background-color", this.color.set ? _formatColor("RGBA", this.color) : "") }, _setAltField: function () { if (this.options.altOnChange && this.options.altField && this.options.altProperties) { var index, property, properties = this.options.altProperties.split(","); for (index = 0; index <= properties.length; ++index) { property = $.trim(properties[index]); switch (property) { case "color": case "background-color": case "outline-color": case "border-color": $(this.options.altField).css(property, this.color.set ? this.color.toCSS() : ""); break } } if (this.options.altAlpha) $(this.options.altField).css("opacity", this.color.set ? this.color.getAlpha() : "") } }, _setColor: function (text) { this.color = _parseColor(text); this.currentColor = this.color.copy(); this._setImageBackground(); this._setAltField() }, setColor: function (text) { this._setColor(text); this._change(this.color.set) }, _generate: function () { var that = this, index, part, parts_list, layout_parts; that._setColor(that.inline ? that.options.color : that.element.val()); if (typeof that.options.parts === "string") if (_parts_lists[that.options.parts]) parts_list = _parts_lists[that.options.parts]; else parts_list = _parts_lists[that.inline ? "inline" : "popup"]; else parts_list = that.options.parts; that.parts = {}; $.each(parts_list, function (index, part) { if (_parts[part]) that.parts[part] = new _parts[part](that) }); if (!that.generated) { layout_parts = []; $.each(that.options.layout, function (part, pos) { if (that.parts[part]) layout_parts.push({ "part": part, "pos": pos }) }); $(_layoutTable(layout_parts, function (cell, x, y) { var classes = ["ui-colorpicker-" + cell.part + "-container"]; if (x > 0) classes.push("ui-colorpicker-padding-left"); if (y > 0) classes.push("ui-colorpicker-padding-top"); return '<td  class="' + classes.join(" ") + '"' + (cell.pos[2] > 1 ? ' colspan="' + cell.pos[2] + '"' : "") + (cell.pos[3] > 1 ? ' rowspan="' + cell.pos[3] + '"' : "") + ' valign="top"></td>' })).appendTo(that.dialog).addClass("ui-dialog-content ui-widget-content"); that._initAllParts(); that._updateAllParts(); that.generated = true } }, _effectGeneric: function (element, show, slide, fade, callback) { var that = this; if ($.effects && $.effects[that.options.showAnim]) element[show](that.options.showAnim, that.options.showOptions, that.options.duration, callback); else { element[that.options.showAnim === "slideDown" ? slide : that.options.showAnim === "fadeIn" ? fade : show](that.options.showAnim ? that.options.duration : null, callback); if (!that.options.showAnim || !that.options.duration) callback() } }, _effectShow: function (element, callback) { this._effectGeneric(element, "show", "slideDown", "fadeIn", callback) }, _effectHide: function (element, callback) { this._effectGeneric(element, "hide", "slideUp", "fadeOut", callback) }, open: function () { var that = this, offset, bottom, right, height, width, x, y, zIndex; if (!that.opened) { that._generate(); offset = that.element.offset(); bottom = $(window).height() + $(window).scrollTop(); right = $(window).width() + $(window).scrollLeft(); height = that.dialog.outerHeight(); width = that.dialog.outerWidth(); x = offset.left; y = offset.top + that.element.outerHeight(); if (x + width > right) x = Math.max(0, right - width); if (y + height > bottom) if (offset.top - height >= $(window).scrollTop()) y = offset.top - height; else y = Math.max(0, bottom - height); that.dialog.css({ "left": x, "top": y }); zIndex = 0; $(that.element[0]).parents().each(function () { var z = $(this).css("z-index"); if ((typeof z === "number" || typeof z === "string") && z !== "" && !isNaN(z)) { zIndex = z; return false } }); that.dialog.css("z-index", zIndex += 2); that.overlay = that.options.modal ? new $.ui.dialog.overlay(that) : null; that._effectShow(this.dialog); that.opened = true; that._callback("open", true); $(function () { that._repaintAllParts() }) } }, close: function () { var that = this; that.currentColor = that.color.copy(); that.changed = false; that._effectHide(that.dialog, function () { that.dialog.empty(); that.generated = false; that.opened = false; that._callback("close", true) }); if (that.overlay) that.overlay.destroy() }, destroy: function () { this.element.unbind(); if (this.image !== null) this.image.remove(); if (this.button !== null) this.button.remove(); if (this.dialog !== null) this.dialog.remove(); if (this.overlay) this.overlay.destroy() }, _callback: function (callback, spaces) { var that = this, data, lab; if (that.color.set) { data = { formatted: _formatColor(that.options.colorFormat, that.color) }; lab = that.color.getLAB(); lab.a = lab.a * 2 - 1; lab.b = lab.b * 2 - 1; if (spaces === true) { data.a = that.color.getAlpha(); data.rgb = that.color.getRGB(); data.hsv = that.color.getHSV(); data.cmyk = that.color.getCMYK(); data.hsl = that.color.getHSL(); data.lab = lab } return that._trigger(callback, null, data) } else return that._trigger(callback, null, { formatted: "" }) }, _initAllParts: function () { $.each(this.parts, function (index, part) { if (part.init) part.init() }) }, _updateAllParts: function () { $.each(this.parts, function (index, part) { if (part.update) part.update() }) }, _repaintAllParts: function () { $.each(this.parts, function (index, part) { if (part.repaint) part.repaint() }) }, _change: function (set) { this.color.set = set !== false; this.changed = true; switch (this.options.limit) { case "websafe": this.color.limit(6); break; case "nibble": this.color.limit(16); break; case "binary": this.color.limit(2); break; case "name": var name = _closestName(this.color); this.color.setRGB(_colors[name].r, _colors[name].g, _colors[name].b); break } if (!this.inline) { if (!this.color.set) this.element.val(""); else if (!this.color.equals(_parseColor(this.element.val()))) this.element.val(_formatColor(this.options.colorFormat, this.color)); this._setImageBackground(); this._setAltField() } if (this.opened) this._repaintAllParts(); this._callback("select") }, _hoverable: function (e) { e.hover(function () { e.addClass("ui-state-hover") }, function () { e.removeClass("ui-state-hover") }) }, _focusable: function (e) { e.focus(function () { e.addClass("ui-state-focus") }).blur(function () { e.removeClass("ui-state-focus") }) }, _getRegional: function (name) { return $.colorpicker.regional[this.options.regional][name] !== undefined ? $.colorpicker.regional[this.options.regional][name] : $.colorpicker.regional[""][name] } }) })(jQuery);


// -- Start Script --

function storyParser()
{
    var _DEBUG = true;
    var _IGNORE_NEW_VERSION = false;

    var _VERSION = '4.5.4';
    var _BRANCH = 'dev';

    var _LOAD_INTERNAL = false;


    // Default-Config:
    var _config = {

        // Story:
        story_search_depth: 2,                  // The Max depth for a recursive search
        mark_M_storys: true,                    // Mark every Story Rated as M
        hide_non_english_storys: true,          // Hide all Storys, that are not in english
        allow_copy: false,

        // Layout:
        color_normal: '#FFFFFF',
        color_mouse_over: '#EEF0F4',
        color_odd_color: '#dfdfdf',
        hide_images: false,
        hide_lazy_images: false,
        disable_image_hover: false,
        content_width: "90%",

        // API:
        pocket_user: null,
        pocket_password: null,
        api_url: 'http://www.mrh-development.de/FanFictionUserScript',
        api_lookupKey: 'ffnet-api-interface',
        api_timeout: 3000,
        api_retries: 2,
        api_checkForUpdates: true,

        // advanced Features:
        disable_cache: false,
        disable_highlighter: false,


        // Do not change below this line:
        storage_key: 'ffnet-storycache',
        config_key: 'ffnet-config',
        dataStorage_key: 'ffnet-dataStore',

        highlighter: {},
        marker: {}
    }


    var _baseConfig = _config;

    // ..................

    var _element = null;
    var _hidden = 0;
    var _hidden_elements = {};

    var _eList = {};

    var _found = [];
    var _storyCache = {};

    // Config that is only available in this session
    var _dataConfig = {};

    // Use the Cross-Origin-Resource-Sharing Feature
    var _useCORS = false;

    var _gui_container = null;

    /**
    *   Resets Config to the default setting
    */
    var _defaultConfig = function ()
    {

        if (typeof (_config['token']) == "undefined")
        {
            // Generates Random Token
            _config['token'] = Math.random().toString().split(".")[1];
            _save_config();
        }

        var token = _config.token;

        _config = _baseConfig;

        _save_config();

    }

    /**
    *   Initializes System
    */
    var __init = function ()
    {
        var isNested = _IGNORE_NEW_VERSION;

        if (typeof (sessionStorage["ffnet-mutex"]) != "undefined")
        {
            if (_DEBUG)
            {
                console.log("Found Mutex!");
            }

            isNested = true;

            if (typeof (localStorage["ffnet-Script-VersionID"]) != "undefined")
            {
                var newVersionID = Number(localStorage["ffnet-Script-VersionID"]);
                var currentID = _getVersionId(_VERSION);

                _log("Current Version ID: ", currentID);
                _log("Cached Version ID: ", newVersionID);

                if (newVersionID > currentID)
                {
                    _log("New Version in Storage found ...");
                }
                else
                {
                    try
                    {
                        _log("The cached Version is older or the same as the current -> delete");
                        delete (localStorage["ffnet-Script-VersionID"]);
                        delete (localStorage["ffnet-Script"]);
                    }
                    catch (e)
                    {
                        console.error("Couldn't delete cached Version", e);
                    }

                }

            }

        }

        if (!isNested)
        {
            // Check for new Version
            var data = _loadFromMemory(localStorage, "ffnet-Script");
            if (typeof (data.script) != "undefined")
            {
                if (_DEBUG)
                {
                    console.info("Found External Script! Loading ....");
                }

                sessionStorage["ffnet-mutex"] = true;

                window.setTimeout(function ()
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
                catch (e)
                {
                    console.error("Invalid Local Script! Deleting");
                    delete localStorage["ffnet-Script"];
                }

                _LOAD_INTERNAL = true;

                // Abort
                return;
            }
        }
        else
        {
            try
            {
                // Load Version Infos into the Local Storage:
                localStorage["ffnet-Script-VersionID"] = _getVersionId(_VERSION);
            }
            catch (e)
            {
                console.error("Can't save Version id: ", e);
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

        var defaultConfig = _config;

        try
        {
            _config = _loadFromMemory(localStorage, _config.config_key);

        } catch (ex)
        {
            console.warn(ex);
        }


        // Check for Config Values:

        if ((typeof (_config['pocket_user']) == "undefined") || (_config['pocket_user'] === ""))
        {
            _config['pocket_user'] = null;
        }

        if ((typeof (_config['pocket_password']) == "undefined") || (_config['pocket_password'] === ""))
        {
            _config['pocket_password'] = null;
        }

        if (typeof (_config['token']) == "undefined")
        {
            // Generates Random Token
            _config['token'] = Math.random().toString().split(".")[1];
            _save_config();
        }

        if (typeof (_config['api_autoIncludeNewVersion']) == "undefined")
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

            var dialog = $('<div title="Fanfiction Story Parser"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text + '</p></div>')
            .appendTo($("body"));

            window.setTimeout(function ()
            {
                dialog.dialog({
                    resizable: true,
                    height: 140,
                    modal: true,
                    buttons:
                    {
                        "Enable Feature": function ()
                        {
                            $(this).dialog("close");

                            _config['api_autoIncludeNewVersion'] = true;
                            _save_config();

                        },
                        Cancel: function ()
                        {
                            $(this).dialog("close");

                            _config['api_autoIncludeNewVersion'] = false;
                            _save_config();
                        }
                    }
                });
            }, 1000);
        }


        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue)
        {
            if (typeof (_config[name]) == "undefined")
            {
                _config[name] = defaultValue;
            }
        });

        // Replace https in BackendURL to http
        _config.api_url = _config.api_url.replace("https", "http");

        // Check for CORS:
        _useCORS = 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();

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
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/ui-lightness/jquery-ui.css");
        $("head").append(block);

        if (typeof ($.ui) == "undefined")
        {
            console.error("Can't include jQuery UI!");
        }

        // Add jQuery Color Picker to the Page:     
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://private.mrh-development.de/ff/jquery.colorpicker.css");
        $("head").append(block);

        /*
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://www.mrh-development.de/FanFictionUserScript/Css?branch=" + _BRANCH);
        $("head").append(block);
        */

        // Use this because of the new HTTPS Restrictions ...
        _api_getStyles();


        // Check for DEBUG-Mode
        if ((typeof (_config['debug']) != "undefined") || (_BRANCH == "dev"))
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

    /**
    *   Adds GUI Elements like Menu Link
    */
    var _updateGUI = function ()
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
                $('<a></a>').addClass('menu-link').html('Reparse Stories').attr('href', '#').click(function (e)
                {
                    _readList($('.z-list'));
                    e.preventDefault();

                }).attr('title', 'Parse the Stories again')
            ).append(
                $('<a></a>').addClass('menu-link').html('Menu').attr('href', '#').click(function (e)
                {
                    _gui();
                    e.preventDefault();

                }).attr('title', 'Open Config Menu')
            );
            /*
                .append(
                $('<a></a>').addClass('menu-link').html('Config Import / Export').attr('href', '#').click(function (e)
                {
                    _openSaveConfig();
                    e.preventDefault();

                }).attr('title', 'Config Export')
            ).append(
                $('<a></a>').addClass('menu-link').html('Reset Config').attr('href', '#').click(function (e)
                {
                    if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
                    {
                        _defaultConfig();
                    }
                    e.preventDefault();

                }).attr('title', 'Load default Config')
            );
            */

        }

        // Add Messages Menu:
        _log("Add Messages Menu")

        var menulinks = $(".menulink").first();


        if (menulinks.length > 0)
        {
            var imageContainer = $("<div></div>")
            .css("display", "inline-block")
            .css("margin-left", "10px")
            .css("height", "100%")
            .addClass("ffnetMessageContainer")
            .addClass("clickable")
            .attr("title", "Advanced Messaging Features. Sorry, this is not a PM Button :-(")
            .appendTo(menulinks);


            imageContainer.append(

                $("<img></img>")
                .attr("src", "http://private.mrh-development.de/ff/message-white.png")
                .css("width", "20px")
                .css("margin-bottom", "4px")
            );


            var radius = 15;
            var height = 120;
            var width = 260;


            var messageContainer = $("<div></div>")
            .addClass("ffnet_messageContainer")
            .appendTo("body");




            var innerContainer = $("<div></div>")
            .addClass("innerContainer")
            .appendTo(messageContainer);

            imageContainer.click(function ()
            {
                if (messageContainer.is(":hidden"))
                {
                    //Set Position of Element:
                    var pos = imageContainer.position();

                    messageContainer
                    .css("top", (pos.top + 20) + "px")
                    .css("left", (pos.left - 100) + "px")
                    .show();

                }
                else
                {
                    messageContainer.hide();
                }

            });

            innerContainer.append(
                $("<div>Message Menu (Script)</div>")
                .css("font-weight", "bold")
                .css("margin-bottom", "10px")
            );

            var count = 0;

            if (typeof (_dataConfig['messages']) != "undefined")
            {
                count = _dataConfig['messages'].length;
            }


            innerContainer.append(
                $('<div><span class="ffnet-messageCount">' + count + "</span> Message(s)</div>")
                .addClass("menuItem")
                .click(function ()
                {
                    messageContainer.hide();

                    _messagesGUI();

                })
            );

            innerContainer.append(
                $("<div>Give Feedback</div>")
                .addClass("menuItem")
                .click(function ()
                {
                    messageContainer.hide();

                    _feedbackGUI();
                })
            );



        }
        else
        {
            if (_DEBUG)
            {
                console.warn("Can't find Element .menulink ", menulinks);

            }
        }


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
        var container = $("#filters > form > .modal-body");

        if (container.length > 0)
        {
            if (_DEBUG)
            {
                console.log('Add GUI for "Only Mode"');
            }

            var input = $("<select></select>")
            .attr("title", "Display Only Elements that match a specific Filter")
            .change(function ()
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

            }).addClass("filter_select");

            var noneEntry = $('<option value="off">Display: Everything</option>').appendTo(input);

            if (typeof (_dataConfig["displayOnly"]) == "undefined")
            {
                noneEntry.attr("selected", "selected");
            }


            $.each(_config.marker, function (title, info)
            {
                var entry = $('<option></option>').attr('value', title).html(title).appendTo(input);

                if ((typeof (_dataConfig["displayOnly"]) != "undefined") && (title == _dataConfig["displayOnly"]))
                {
                    entry.attr("selected", "selected");
                }

            });


            container.find("select").not(".filter_select_negative ").last().after(input);

            input.before("&nbsp;");
        }

        // Key Control for Page:

        $("body").keydown(function (event)
        {
            var container = $("#content_wrapper_inner").find("center").last();
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
                    .click(function (e)
                    {
                        _loadPrevPage();

                        //e.preventDefault();
                    })
                );

                $(".z-list").last().after(
                    $("<a></a>").html("LoadNextPage")
                    .attr("href", "#")
                    .click(function (e)
                    {
                        _loadNextPage();

                        //e.preventDefault();
                    })
                );
            }
        }

    }

    /**
    *   Start parsing story List
    *   @param __element Base Element to start parsing
    */
    var _readList = function (__element)
    {
        if (_LOAD_INTERNAL)
        {
            return;
        }
        _element = __element;
        _read();
    }

    this.readList = _readList;

    /**
    *   Parses the elements in the specified Container
    *   @remark Use readList for initial parsing
    */
    var _read = function ()
    {

        var odd = false;

        // Clear old Session:
        _found = [];
        _eList = {};
        _hidden = 0;
        _hidden_elements = {};
        $('.parser-msg').remove();
        $('[data-color]').removeAttr("data-color");

        _element.each(function (k, e)
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
                if (_DEBUG)
                {
                    console.log("Hide Element because of 'hide_non_english_storys'", link);
                }

                _hidden_elements[link] = "hide_non_english_storys";

                element.hide();
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

            $.each(_config.marker, function (headline, config)
            {

                var ignore = false;
                $.each(config.ignore, function (i, marker)
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

                $.each(config.keywords, function (i, marker)
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

                    //_updateColor(element, color, colorMo, true);
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

            if (!_config.disable_highlighter)
            {
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
                contextMenu.click(function ()
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
                if (typeof (_config['highlighter'][link]) != "undefined")
                {
                    if (_DEBUG)
                    {
                        console.info("Highlight Element Found: ", element);
                    }

                    // Update old Format
                    if (typeof (_config['highlighter'][link]) != "object")
                    {
                        if (_DEBUG)
                        {
                            console.log("Updated old Highlighter Object");
                        }

                        _config['highlighter'][link] = { image: _config['highlighter'][link], hide: false };
                    }

                    if (_config['highlighter'][link].hide)
                    {
                        if (_DEBUG)
                        {
                            console.log("Hide Entry because of Story Config: ", link);
                        }
                        _hidden_elements[link] = "storyConfig";

                        element.attr("data-hiddenBy", "storyConfig");

                        element.hide();
                        _hidden++;
                    }


                    var img = $("<img></img>").attr("src", _config['highlighter'][link].image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("parser-msg");

                    element.find("a").last().after(img);

                }
            }

            if (!marker_found)
            {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element); 
                }*/

                if (typeof (_dataConfig["displayOnly"]) != "undefined")
                {
                    if (_DEBUG)
                    {
                        console.log("Hide Entry because of Display-Only Mode: ", element);
                    }

                    _hidden_elements[link] = "Display-Only Mode";


                    element.hide();
                    _hidden += 1;
                }
                else
                {
                    _updateColor(element, color, colorMo, true);
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
        setTimeout(function ()
        {
            // Color corrections            
            _element.filter("[data-color]").each(function (k, el)
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

                $(".cimage").each(function (k, el)
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

            if (_config.allow_copy)
            {
                _log("Allow Selection of Text");
                $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
            }



        }, 1000);


        setTimeout(function ()
        {
            // Get Messages from Server:  
            if (typeof (_dataConfig['messages']) == "undefined")
            {
                _apiGetMessages(function (messages)
                {
                    if ((typeof (messages.Messages) != "undefined") && (messages.Messages.length > 0))
                    {
                        // New Messages:
                        _dataConfig['messages'] = messages.Messages;

                        // Update Icon:
                        $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message_new-white.png");

                        $('.ffnet-messageCount').text(messages.Messages.length);

                        _save_dataStore();
                    }
                });

            }
            else
            {
                // Update Icon:
                $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message_new-white.png");
                $('.ffnet-messageCount').text(_dataConfig['messages'].length);
            }

        }, 5000);


    }

    /**
    *   Gets the name of a story from a Link
    *   @param link Link to story
    *   @result Name of Story
    */
    var _getStoryName = function (link)
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

    /**
    *   Starts Recursive Parsing of stories
    *   @param queue List of Stories to parse
    *   @param i What element in the queue should be parsed
    *   @remark Don't specify the second Argument for initial parsing
    */
    var _doParse = function (queue, i)
    {
        if (typeof i == "undefined")
        {
            i = 0;
        }

        if (_DEBUG)
        {
            console.info('Execute Queue on ' + i + ': ', queue);
        }

        if (i >= queue.length)
        {
            return;
        }

        var data = queue[i];

        // Check for ScriptInsert Page:
        if (data.url.indexOf("?url=") == -1)
        {
            url = 'https://www.fanfiction.net' + data.url;
        }
        else
        {
            url = data.url;
        }

        keywords = data.keywords;

        if (typeof keywords == "undefined")
        {
            console.warn('No Keywords!');
        }

        var executeNext = function ()
        {
            _doParse(queue, i + 1);
        }

        callback = function (info)
        {
            var el = queue[i];

            if (_DEBUG)
            {
                console.info('execute Callback Function ' + el.headline + ' for ', info);
            }

            _elementCallback(el.config, el.element, el.textEl, el.headline, info);

            _found.push(el.storyName);

            executeNext();
        }

        _parse(url, keywords, callback, 0, executeNext);

    }

    /**
    *   Recursive Parsing function
    *   @param url URL to Story
    *   @param keyword  Keywords for parsing
    *   @param callback Callback in case of a found entry
    *   @param i Recursive Depth
    *   @param executeNext Callback for executing next element in the queue
    */
    var _parse = function (url, keywords, callback, i, executeNext)
    {

        if (i >= _config.story_search_depth)
        {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var ajax_callback = function (text)
        {
            if (!(url in _storyCache) && _config.disable_cache)
            {
                if (_DEBUG)
                {
                    console.log('Story ' + url + ' Not in Cache -> save');
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

            var sentence = null;

            if ((sentence = _parseSite(body, keywords)) != null)
            {
                var storyName = _getStoryName(url);
                callback({
                    'name': storyName,
                    'url': url,
                    'chapter': (i + 1),
                    'sentence': sentence
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
                        _parse(data, keywords, callback, i + 1, executeNext);
                    }
                }
                //console.log('Content not found in: ', url);

            }

        };

        if (url in _storyCache)
        {
            if (_DEBUG)
            {
                console.log('Story ' + url + ' in Cache -> use Cache');
            }


            ajax_callback(_storyCache[url]);
        } else
        {
            if (_DEBUG)
            {
                console.log('Story ' + url + ' not in Cache -> request');
            }

            $.ajax({
                url: url,
                success: ajax_callback
            });
        }

        //console.log('reponse revieved');


    }


    /**
    *   Parses a story page for recursive search.
    *   @see _parse
    *   @param body Body Element of the loaded page
    *   @param keywords What Keywords to look for
    *   @result Matching Sentence or null
    */
    var _parseSite = function (body, keywords)
    {
        var storyEl = body.find('.storytext');

        //console.log('search in ', storyEl);

        if (storyEl.length == 1)
        {
            var storyText = storyEl.html().toLowerCase();

            var result = null;

            $.each(keywords, function (k, word)
            {
                if (!result)
                {
                    try
                    {
                        var reg = new RegExp(word, "i");
                        if (reg.test(storyText))
                        {

                            var append = "([a-zA-Z0-9, :-_\*]+)?";
                            var regEx = "[^|\.]?" + append + word + append + "[\.|$]?";
                            _log("Use RegExp for InStory Search: ", regEx);

                            var reg = new RegExp(regEx, "i");
                            var data = reg.exec(storyText);

                            var sentence = "";
                            for (i = 1; i < data.length; i++)
                            {
                                if (typeof (data[i]) != "undefined")
                                {
                                    sentence += data[i];
                                }
                            }

                            _log("Found Sentence: ", sentence);


                            result = sentence;

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

        return null;

    }

    /**
    *   Callback triggered, if an element was found
    *   @param config Element Config, as specified by the user
    *   @param element The instance of the HTML-Entity containing the match
    *   @param textEl The HTML-Instance containing the Text
    *   @param headline  The Headline of the Found story
    *   @param info The Info to the found element
    */
    var _elementCallback = function (config, element, textEl, headline, info)
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

        if ((typeof (_dataConfig["displayOnly"]) != "undefined") && (_dataConfig["displayOnly"] == headline))
        {
            if (_DEBUG)
            {
                console.info("Display Only Mode: Match found for", element);
            }

            window.setTimeout(function ()
            {
                element.show();
            }, 100);

            _hidden -= 1;
        }
        else if (typeof (_dataConfig["displayOnly"]) != "undefined")
        {
            // Hide this Element because the Only Mode do not match

            if (_DEBUG)
            {
                console.log("Hide Element because of 'displayOnly' ", info);
            }

            _hidden_elements[info.url] = "displayOnly";

            element.hide();
            _hidden += 1;
        }


        if (!config.display)
        {
            if (_DEBUG)
            {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }

            _hidden_elements[info.url] = "Filter '" + headline + "'";

            element.hide();
            element.addClass('hidden');
            _updateListColor();
            _hidden += 1;
        } else
        {
            if (config.background != null)
            {
                element.css('background-image', 'url(' + config.background + ')')
                .css('background-repeat', 'no-repeat')
                .css('background-position', 'right');
            }

            if (config.mark_chapter)
            {
                element.find('a').first().after(
                    $("<span class=\"parser-msg\"> <b>[" + headline + "-" + found_where + "]</b></span>")
                        .attr("title", info.sentence)
                    );
            }

            if (!config.ignoreColor && config.text_color != null)
            {
                textEl.css('color', config.text_color);
            }

            $.each(config.keywords, function (key, keyword)
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

                    replace = front + '<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">' + replace + '</span>' + behind;

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

    /**
    *   Updates the List of found elements
    */
    var _updateList = function ()
    {
        // Wrap Content:
        _createPageWrapper();


        var text = "";

        if (_DEBUG)
        {
            console.log("Headline-List = ", _eList);
        }

        var headlineContainer = $("<div></div>");
        $.each(_eList, function (headline, elements)
        {
            if (_config.marker[headline].print_story)
            {
                headlineContainer.append("<u>" + headline + ": </u>");

                var eUl = $("<ul></ul>");

                $.each(elements, function (i, value)
                {
                    eUl.append(
                        $("<li></li>").append(
                            $("<a></a>").attr('href', value.url).html(value.name)
                        ).append(" - " + value.chapter)
                        .attr("title", value.sentence)
                    )
                });

                headlineContainer.append(eUl);
            }

            if (_config.marker[headline].mention_in_headline)
            {
                text += "<b>" + headline + ":</b> " + _eList[headline].length + " ";
            }

        });

        $('#mrhOutput').remove();

        var hiddenByStoryConfig = $('div[data-hiddenBy="storyConfig"]');

        if (hiddenByStoryConfig.length > 0)
        {
            text += "<i>Hidden by StoryConfig</i>: " + hiddenByStoryConfig.length + " ";
        }

        var list = $('<div id=\'mrhOutput\'></div>')
        .html(text + ' <i>All hidden elements:</i> ').append(
            $("<u></u>").text(_hidden).click(
                function (e)
                {
                    // Build Dialog
                    var dialog = $('<div title="Hidden Elements"></div>');
                    var table = $("<table></table>").appendTo(dialog);

                    $.each(_hidden_elements, function (key, value)
                    {
                        table.append(
                            $("<tr></tr>").append(
                                $("<th></th>").append(
                                    $("<a></a>").text(_getStoryName(key))
                                    .attr("href", key)
                                )
                            )
                            .append
                            (
                                $('<td style="padding-left: 15px"></td>').text(value)
                            )
                        )

                    });


                    // Show Dialog:
                    dialog.dialog(
                        {
                            width: 668
                        });

                    e.preventDefault();
                }

            )
            .attr("title", "Show the reasons for hiding")
            .addClass("clickable")
        )
        .css('margin-bottom', '10px')
        .append(headlineContainer);

        if (hiddenByStoryConfig.length > 0)
        {
            list.append($('<a href="#">Show Elements hidden by Story Config</a>').click(function (e)
            {
                hiddenByStoryConfig.slideDown();
                e.preventDefault();
            }));
        }

        $(".ffNetPageWrapper").first().before(list);
    }

    /**
    *   Updates the colors of the elements in the story list
    */
    var _updateListColor = function ()
    {
        var odd = false;
        _element.not('.hidden').each(function (k, el)
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

            if (!el.is('[data-color]'))
            {
                _updateColor(el, color, colorMo, true);
            }

            /*
            if (_found.indexOf(storyName) == -1)
            {
                //
                
                /*if (_DEBUG)
                {
                    console.log("[UpdateList] Change Color of Line: ",el); 
                }* /
                
            }
            */
        });


    }

    /**
    *   Updates the Color of a specifiy Element in the list
    *   @param element HTML-Instance of found element
    *   @param color The Color to set the Element to
    *   @param colorMo The color used for the Mouse Over effect
    *   @param notSetAttr Don't set the HTML-Attribute
    */
    var _updateColor = function (element, color, colorMo, notSetAttr)
    {
        element.css('background-color', color);

        if (typeof (notSetAttr) == "undefined")
        {
            element.attr("data-color", color);
            element.attr("data-mouseOverColor", colorMo);
        }

        element.unbind("mouseenter").unbind("mouseleave");

        element.mouseenter(function ()
        {
            $(this).css('background-color', colorMo);
        }).mouseleave(function ()
        {
            $(this).css('background-color', color);
        })
    }


    /**
    *   Enables the In Story Highlighter (Story View)
    */
    var _enableInStoryHighlighter = function ()
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
        contextMenu.click(function ()
        {

            _toggleStoryConfig({
                url: document.location.pathname,
                //element: element,
                name: field.text()
            });

        });

        field.after(contextMenu);

        // Highlighter found:
        if (typeof (_config['highlighter'][document.location.pathname]) != "undefined")
        {
            if (_DEBUG)
            {
                console.info("Highlight Element Found");
            }

            // Update old Format
            if (typeof (_config['highlighter'][link]) != "object")
            {
                if (_DEBUG)
                {
                    console.log("Updated old Highlighter Object");
                }

                _config['highlighter'][link] = { image: _config['highlighter'][link], hide: false };
            }

            var img = $("<img></img>").attr("src", _config['highlighter'][document.location.pathname].image)
            .css("width", "20px")
            .css("height", "20px")
            .css("margin-left", "15px")
            .addClass("parser-msg")

            field.after(img);

        }



    }

    this.enableInStoryHighlighter = _enableInStoryHighlighter;

    /**
    *   Enables the Pocket Save Feature (Story View)
    */
    this.enablePocketSave = function ()
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

        var field = body.find("#profile_top").find("b");


        var options = {
            'all': "From this chapter to the End",
            '1': "One Chapter",
            '2': "Two Chapters",
            '5': "Five Chapters",
            '10': "Ten Chapters"
        };

        var select = $("<select></select>")
        .css("margin-left", "20px")
        .change(function ()
        {
            $("#ffnet-pocket-save-button").removeAttr("disabled")
                  .html("Save To Pocket");

        });

        $.each(options, function (key, value)
        {
            select.append(
                $("<option></option>")
                .text(value)
                .attr("value", key)
            );

        });



        field.after(
            $('<button class="btn">Save To Pocket</button>')
            .click(function ()
            {
                var option = select.children().filter(":selected").first().attr("value");

                _log("Selected Option: ", option);


                _parsePocket(document.location.pathname, field.text() + ": ", option);

            }).css("margin-left", "10px")
            .attr("id", "ffnet-pocket-save-button")
        );



        field.after(select);

    }

    /**
    *   Recursive Function for Pocket Saving
    *   @param url Url of first story
    *   @param prefix Prefix used for the story
    *   @param length The max length for the recusion
    *   @param currentDepth The current depth of the recusion
    *   @remark Leave the Arguments length and currentDepth away, to achive default behavior
    */
    var _parsePocket = function (url, prefix, length, currentDepth)
    {
        if (typeof prefix == "undefined")
        {
            prefix = "";
        }

        if ((typeof length == "undefined") || (length == "all"))
        {
            length = 100;
        }

        if (typeof currentDepth == "undefined")
        {
            currentDepth = 1;
        }

        var user = _config['pocket_user'];
        var password = _config['pocket_password'];


        if ((user == null) || (password == null))
        {
            return;
        }

        $("#ffnet-pocket-save-button").attr("disabled", "disabled").html("Working ...");

        var ajax_callback = function (text)
        {
            var body = $(text);

            //var title = prefix + $(body.find('#chap_select')).first().children().filter('[selected="selected"]').html();

            var title = body.find("title").first().text();

            $("body").append(
                $("<img>").attr("src", 'https://readitlaterlist.com/v2/add?username=' + user + '&password=' + password + '&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=https://www.fanfiction.net' + url + '&title=' + title)
            );

            console.log(url + ' - ' + title + ' - Done');

            var next = body.find('button:contains(Next)').first();


            if ((next.length != 0) && (currentDepth + 1 <= length))
            {
                var data = url = _getUrlFromButton(next);

                if (data != null)
                {
                    setTimeout(function ()
                    {
                        _parsePocket(data, prefix, length, currentDepth + 1);
                    }, 500);
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

    var _getPageContent = function (base, prev, callback)
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

        $.get(url, function (content)
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

    var _createWrapper = function (page)
    {
        return $("<div></div>").addClass("ffNetPageWrapper")
                .attr("data-page", page);
    }

    var _createPageWrapper = function ()
    {
        // Wrap the current Page into a PageWrapper
        var currentPage = _getCurrentPage($("body"));

        if (_DEBUG)
        {
            console.log("Current Page: ", currentPage);
        }

        var wrapper = $(".ffNetPageWrapper");
        if (wrapper.length == 0)
        {
            wrapper = _createWrapper(currentPage);
        }

        var notWrapped = $('.z-list[data-wrapped!="wrapped"]');

        if (notWrapped.length != 0)
        {
            if (_DEBUG)
            {
                console.log("Not Wrapped Elements found");
            }


            notWrapped.last().after(wrapper);

            notWrapped.detach().appendTo(wrapper)
            .attr("data-wrapped", "wrapped")
            .attr("data-page", currentPage);
        }
    }


    var _loadPage = function (loadPrev)
    {
        if (typeof (loadPrev) == "undefined")
        {
            loadPrev = false;
        }

        var base = null;

        if (_currentPage == null)
        {
            base = $("#myform");
        }
        else
        {
            base = _currentPage.find("#myform").first();
        }



        // Wrapper moved to _createPageWrapper

        _getPageContent(base, loadPrev, function (elements, data)
        {
            // Add elements to DOM:
            if (elements.length > 0)
            {
                var last = $(".ffNetPageWrapper").last();

                var page = _getCurrentPage(data);
                var wrapper = _createWrapper(page);

                last.after(wrapper);

                _element = elements;

                elements.appendTo(wrapper);

                window.setTimeout(function ()
                {
                    _readList(wrapper.children())

                }, 200);

                $("#myform").find("center").html(data.find("#myform").find("center").last().html());

                // Hide last Page: 
                last.slideUp();


                _currentPage = data;
            }

        });
    }

    var _getCurrentPage = function (content)
    {
        return content.find("center > b").first().text()
    }


    var _loadNextPage = function ()
    {
        _loadPage(false);
    }

    var _loadPrevPage = function ()
    {
        _loadPage(true);
    }

    var _getNextPage = function (base)
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

    var _getPrevPage = function (base)
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

    /*
    *   Creates the GUI used for the Menus
    */
    var _gui_create = function ()
    {
        _log("Creating GUI ");

        var width = 600;
        var win_width = window.outerWidth;

        var container = $('<div title="Fanfiction Story Parser"></div>')
        //.addClass("ffnet_guiContainer")
        //.css('left', ((win_width - width) / 2) + "px")
        .hide();

        //TODO: Check what this was for ...
        //container.html($('#content').hide().html());

        $("body").append(container);

        _gui_container = container;

        _log("GUI Created");

    }

    /**
    *   Renders GUI for the Config-Menu
    */
    var _gui_update = function ()
    {
        _log("Update GUI");

        _gui_elements = {};
        _settings_elements = {};
        _gui_container.html('');

        // Reset Position:
        //_gui_container.css("position", "absolute");

        _add_count = 0;

        // Displays current Version:
        _gui_container.attr("title", "Fanfiction Story Parser - Version: " + _VERSION + " - Branch: " + _BRANCH);


        // render Settings Container:
        var s_container = $("<div></div>")
        .addClass("ffnet_settingsContainer")

        .appendTo(_gui_container);

        _log("Container rendered");


        // Buttons

        var saveButtonContainer = $('<div class="fflist-buttonContainer"></div>');

        $('<input class="btn" type="button" value="Save"></input>')
            .button({
                icons: {
                    primary: "ui-icon-check"
                }
            }).addClass("ffnetSaveButton").appendTo(saveButtonContainer);



        // Button Logic:
        var __buttonLogic = function ()
        {
            var target = $(this).attr("data-target");

            $(".ffnet_Config_Button_Container").fadeOut(400, function ()
            {
                $("." + target).fadeIn();
            });

        }

        var __backLogic = function ()
        {
            $(".ffnet_Config_Category:visible").fadeOut(400, function ()
            {
                $(".ffnet_Config_Button_Container").fadeIn();
            });
        }

        // Render SubLogic:

        var __getButton = function (name, target, container)
        {
            return $("<div></div>").addClass("ffnet_Config_Button").text(name)
                .attr("data-target", target).click(__buttonLogic).appendTo(container);
        }

        var __getCategory = function (name, id, container)
        {
            var cat = $("<div></div>").addClass("ffnet_Config_Category").addClass(id).appendTo(container);
            var headline = $("<div></div>").addClass("headline").appendTo(cat);
            var backField = $("<div></div>").addClass("back").appendTo(headline);
            var backButton = $('<button class="btn">Back</back>').click(__backLogic).appendTo(backField);
            var textField = $("<div></div>").appendTo(headline).text(name);

            var table = $('<table width="100%"></table>').appendTo(cat);


            var result =
            {
                category: cat,
                headline: headline,
                table: table
            };

            return result;
        }

        // ----------- GUI -------------------------

        var spacer = $('<tr></tr>').append
            (
                $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
                $('<td></td>')
            );


        var buttonContainer = $('<div class="ffnet_Config_Button_Container"></div>').appendTo(s_container);

        __getButton("Story Settings", "ffnetConfig-Settings", buttonContainer);
        __getButton("Layout Settings", "ffnetConfig-Layout", buttonContainer);
        __getButton("API Settings", "ffnetConfig-API", buttonContainer);
        __getButton("Advanced", "ffnetConfig-Andvanced", buttonContainer);

        // --------------------------------------------------------------------------------------------------------------------------
        var cat = __getCategory("Story Settings", "ffnetConfig-Settings", s_container);
        var table = cat.table;

        // story_search_depth
        _log("GUI - story_search_depth");

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
        _log("GUI - mark_M_storys");

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
        _log("GUI - hide_non_english_storys");

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

        // allow_copy
        _log("GUI - allow_copy");

        checkbox = $('<input type="checkbox" id="fflist-allow_copy">');
        if (_config.allow_copy)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['allow_copy'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-allow_copy">Allow the selection of Text: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("Layout Settings", "ffnetConfig-Layout", s_container);
        table = cat.table;


        // hide_images:
        _log("GUI - hide_images");

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
        _log("GUI - hide_lazy_images");

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
        _log("GUI - disable_image_hover");

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
        _log("GUI - content_width");

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
        _log("GUI - color_normal");

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
        _log("GUI - color_mouse_over");

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
        _log("GUI - color_odd_color");

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


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("API Settings", "ffnetConfig-API", s_container);
        table = cat.table;


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
        _log("GUI - pocket_user");

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
        _log("GUI - pocket_password");

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

        if (_DEBUG)
        {

            // api_url
            _log("GUI - api_url");

            var input = $('<input type="text" id="fflist-api_url">')
                        .attr('value', _config.api_url);

            _settings_elements['api_url'] = input;

            table.append(
                $('<tr></tr>').append(
                    $('<td width="30%"></td>').append(
                        $('<label for="fflist-api_url">Server Backend Address: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                    $('<td class="ffnetparser_InputField"></td>').append(
                        input
                    ).append(
                        $("<button>Default</button>").click(function ()
                        {
                            $('#fflist-api_url').val("http://www.mrh-development.de/FanFictionUserScript");
                        })
                    ).append(
                        $("<button>Local</button>").click(function ()
                        {
                            $('#fflist-api_url').val("http://localhost:49990/FanFictionUserScript");
                        })
                    )
                )
            );

            // spacer:
            table.append(spacer.clone());
        }

        // api_checkForUpdates
        _log("GUI - api_checkForUpdates");

        checkbox = $('<input type="checkbox" id="fflist-api_checkForUpdates">');
        if (_config.api_checkForUpdates)
        {
            checkbox.attr('checked', 'checked');
        }
        else
        {
            $("#api_autoIncludeNewVersion").attr("disabled", "disabled");
        }


        checkbox.change(function ()
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


        // spacer:
        table.append(spacer.clone());

        // api_autoIncludeNewVersion
        _log("GUI - api_autoIncludeNewVersion");

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


        // spacer:
        table.append(spacer.clone());

        // token
        _log("GUI - token");

        input = $('<input type="text" id="fflist-token">')
            .attr('value', _config.token)
            .attr('size', '50')
            .attr("pattern", "[0-9a-zA-Z]+");

        _settings_elements['token'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-token"><abbr title="Used for identification on the Web-Service (e.g. Synchronization)">Token</abbr>: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                )
            )
        );


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("Advanced", "ffnetConfig-Andvanced", s_container);
        table = cat.table;


        // disable_highlighter
        _log("GUI - disable_highlighter");

        checkbox = $('<input type="checkbox" id="fflist-disable_highlighter">');
        if (_config.disable_highlighter)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['disable_highlighter'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_highlighter"><abbr title="Disable the Story Highlighter Feature.">Disable Highlighter</abbr>: </label>')
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


        // disable_cache
        _log("GUI - disable_cache");

        checkbox = $('<input type="checkbox" id="fflist-disable_cache">');
        if (_config.disable_cache)
        {
            checkbox.attr('checked', 'checked');
        }

        _settings_elements['disable_cache'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_cache"><abbr title="Disable the Caching function used for the in Story search.">Disable Cache</abbr>: </label>')
                    .css('font-weight', 'bold')
                )
                .css('border-right', '1px solid gray')
            ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                        checkbox
                )
            )
        );

        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------

        _log("GUI - Add Markers: ", _config.marker);

        var container = $("<div></div>").appendTo(_gui_container);

        $.each(_config.marker, function (name, marker)
        {
            _gui_add_form(name, marker, container);
        });

        _log("GUI - Markers added");

        if (_DEBUG)
        {
            console.log("Config elements: ", _gui_elements);
        }


        var filterButtonContainer = saveButtonContainer.clone();
        filterButtonContainer.appendTo(_gui_container);

        $('<input class="btn" type="button" value="Add Field"></input>')
             .button({
                 icons: {
                     primary: "ui-icon-plusthick"
                 }
             })
            .click(function ()
            {
                _gui_add_form('New-Form ' + (_add_count++),
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
                        text_color: '#686868',
                        revision: -1
                    }, container
                    , true // Display Big
                );

            }).appendTo(filterButtonContainer);


        // Save Logic
        $(".ffnetSaveButton").click(function ()
        {
            var new_config = {};

            _log("Save Config");
            _log("Parsing Config elements: ", _gui_elements);


            $.each(_gui_elements, function (k, data)
            {
                if (data == undefined)
                {
                    return;
                }

                var name = data.name.val();
                if (name == '')
                {
                    return;
                }

                var config =
                {
                    name: name,
                    color: data.color.val(),
                    ignore: data.ignore.val().split(', '),
                    keywords: data.keywords.val().split(', '),
                    mark_chapter: data.mark_chapter.is(':checked'),
                    mention_in_headline: data.mention_in_headline.is(':checked'),
                    display: data.display.is(':checked'),
                    mouseOver: data.mouseOver.val(),
                    print_story: data.print_story.is(':checked'),
                    search_story: data.search_story.is(':checked'),
                    ignoreColor: data.ignoreColor.is(':checked'),
                    background: (name in _config.marker && _config.marker[name].background != null) ? (_config.marker[name].background) : null,
                    text_color: data.text_color.val(),
                    revision: ((typeof (_config.marker[name]) == "undefined") || (typeof (_config.marker[name].revision) == "undefined")) ? 0 : _config.marker[name].revision + 1
                };

                if (config.text_color == "")
                {
                    config.text_color = "#686868";
                }

                if (_DEBUG)
                {
                    console.log("Filter '" + name + "' saved: ", config);
                }


                //console.log(name, config);
                new_config[name] = config;

            });

            _config.story_search_depth = Number(_settings_elements.story_search_depth.val());
            _config.mark_M_storys = _settings_elements.mark_M_storys.is(':checked');
            _config.hide_non_english_storys = _settings_elements.hide_non_english_storys.is(':checked');
            _config.hide_images = _settings_elements.hide_images.is(':checked');
            _config.hide_lazy_images = _settings_elements.hide_lazy_images.is(':checked');
            _config.disable_image_hover = _settings_elements.disable_image_hover.is(':checked');
            _config.allow_copy = _settings_elements.allow_copy.is(':checked');
            _config.disable_highlighter = _settings_elements.disable_highlighter.is(':checked');
            _config.disable_cache = _settings_elements.disable_cache.is(':checked');
            _config.content_width = _settings_elements.content_width.val();
            _config.color_normal = _settings_elements.color_normal.val();
            _config.color_odd_color = _settings_elements.color_odd_color.val();
            _config.color_mouse_over = _settings_elements.color_mouse_over.val();
            _config.pocket_user = _settings_elements.pocket_user.val();
            _config.pocket_password = _settings_elements.pocket_password.val();
            _config.api_checkForUpdates = _settings_elements.api_checkForUpdates.is(':checked');
            _config.api_autoIncludeNewVersion = _settings_elements.api_autoIncludeNewVersion.is(':checked');
            _config.token = _settings_elements.token.val();

            if (_DEBUG)
            {
                _config.api_url = _settings_elements.api_url.val();
            }


            _config.marker = new_config;

            _save_config();

            _log("Config Saved Successfully");



            _gui_hide();
        });




        _log("GUI Update Complete");
    }

    /**
    *   Add a form for filter input
    *   @param name Name of the Input field
    *   @param marker Marker Config
    *   @param mainContainer Container for addition
    *   @param displayBig Don't minimize Element after adding
    */
    var _gui_add_form = function (name, marker, mainContainer, displayBig)
    {
        _log("GUI Add Form: ", name);

        _gui_elements[name] = {};

        var radius = 10;

        if (typeof (displayBig) == "undefined")
        {
            displayBig = false;
        }

        var height = 35;

        if (displayBig)
        {
            height = 580;
        }

        var container = $('<div class="fflist-filterField"></div>')
        .css('height', height + 'px')


        .appendTo(mainContainer)
        .hide();

        if (!displayBig)
        {
            container.css("cursor", "pointer")
            .attr('title', "Click to Edit")

            .click(function ()
            {
                /*
                // Get the element, for the scrolling
                parent = container.offsetParent();
                var offset = container.offset().top - 10;

                _log("Current ScrollTop: ", parent.scrollTop());
                parent.scrollTop(parent.scrollTop() + offset);
                _log("Scroll Offset: ", offset);
                */

                container.css('height', '580px');
                container.css("cursor", "auto");
                container.removeAttr("title")
                .unbind();




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
        var input = $('<input type="text" id="fflist-' + name + '-name">')
                    .attr('value', name)
                    .attr('size', '50');

        _gui_elements[name]['name'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-name">Name: </label>')
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
        var checkbox = $('<input type="checkbox" id="fflist-' + name + '-display">');
        if (marker.display)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['display'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-display">Display Found Entries: </label>')
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
        var input = $('<input type="text" id="fflist-' + name + '-keywords">')
                    .attr('value', marker.keywords.join(', '))
                    .attr('size', '50');

        _gui_elements[name]['keywords'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-keywords">Keywords: </label>')
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
        var input = $('<input type="text" id="fflist-' + name + '-ignore">')
                    .attr('value', marker.ignore.join(', '))
                    .attr('size', '50');

        _gui_elements[name]['ignore'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-ignore">Ignore when: </label>')
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
        var checkbox = $('<input type="checkbox" id="fflist-' + name + '-ignoreColor">');
        if (marker.ignoreColor)
        {
            checkbox.attr('checked', 'checked');
        }

        checkbox.change(function ()
        {
            if ($('#fflist-' + name + '-ignoreColor').is(":checked"))
            {
                $('#fflist-' + name + '-color')
                .add('#fflist-' + name + '-mouseOver')
                .add('#fflist-' + name + '-text_color')
                .attr("disabled", "disabled");
            }
            else
            {
                $('#fflist-' + name + '-color')
                .add('#fflist-' + name + '-mouseOver')
                .add('#fflist-' + name + '-text_color')
                .removeAttr("disabled");
            }


        });

        _gui_elements[name]['ignoreColor'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-ignoreColor">Ignore Color Settings: </label>')
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
        var input = $('<input type="text" id="fflist-' + name + '-color">')
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
                    $('<label for="fflist-' + name + '-color">Color: </label>')
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
        var input = $('<input type="text" id="fflist-' + name + '-mouseOver">')
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
                    $('<label for="fflist-' + name + '-mouseOver">Mouse Over Color: </label>')
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

        //  text_color:
        var input = $('<input type="text" id="fflist-' + name + '-text_color">')
                    .attr('value', marker.text_color)
                    .attr('size', '50')
                    .colorpicker({
                        colorFormat: "#HEX"
                    });

        _gui_elements[name]['text_color'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-text_color">Info Text Color: </label>')
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
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-search_story">');
        if (marker.search_story)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['search_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-search_story">Search in Storys: </label>')
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
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-mark_chapter">');
        if (marker.mark_chapter)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['mark_chapter'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-mark_chapter">Mark Chaper: </label>')
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
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-print_story">');
        if (marker.print_story)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['print_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-print_story">List Storys: </label>')
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
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-mention_in_headline">');
        if (marker.mention_in_headline)
        {
            checkbox.attr('checked', 'checked');
        }

        _gui_elements[name]['mention_in_headline'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-mention_in_headline">Mention in Headline: </label>')
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
                    $('<input class="btn" type="button" value="Remove">').click(function ()
                    {
                        _gui_elements[name] = undefined;

                        container.fadeOut(function ()
                        {
                            container.remove();
                        })

                    })
                )
            )
        );


        //Spacer:
        table.append(spacer.clone());

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>')
                .css('border-right', '1px solid gray')
            ).append(
                $('<td></td>').append(
                    $('<img src="http://private.mrh-development.de/ff/glyphicons_369_collapse_top.png" alt="Minimize"></img>').click(function ()
                    {

                        container
                        .unbind()
                        .css("cursor", "pointer")
                        .css("height", "35px")
                        .attr('title', "Click to Edit");

                        setTimeout(function ()
                        {
                            container.click(function ()
                            {
                                container.css('height', '550px');
                                container.css("cursor", "auto");
                                container.removeAttr("title");

                            });

                        }, 100);
                    })
                    .css("cursor", "pointer")
                )
            )
        );





        container.fadeIn();

        _log("Form added");
    }

    /**
    *   Hides the GUI
    */
    var _gui_hide = function ()
    {
        _gui_container.dialog("close");
        //_gui_container.fadeOut();
    }

    /**
    *   Displays the GUI
    */
    var _gui_show = function ()
    {

        _gui_container.dialog({
            resizable: true,
            modal: true,
            height: 900,
            width: 664,
            buttons:
            {
                "Synchronization": function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();

                        _syncGUI();
                    }
                },

                "Config Import / Export": function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _openSaveConfig();
                    }
                },

                "Menu": function ()
                {
                    // Reopen:
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();

                        _gui();

                    }

                },

                "Reset Config": function ()
                {
                    if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
                    {
                        $(this).dialog("close");

                        _defaultConfig();
                    }

                },

                Close: function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        $(this).dialog("close");
                    }
                }
            }
        });


        // _gui_container.fadeIn();
    }

    /**
    *   Creates and displays the GUI
    */
    var _gui = function ()
    {
        if (_gui_container == null)
        {
            _gui_create();
        }

        _gui_update();
        _gui_show();

    }

    /**
    *   Open "Save Config" Submenu
    */
    var _openSaveConfig = function ()
    {
        if (_gui_container == null)
        {
            _gui_create();
        }

        if (_gui_container.is(':visible'))
        {
            // Currently Visible, reopen
            _gui_hide();

            _openSaveConfig();

        } else
        {
            _gui_container.html('');

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            */

            _gui_container.append('<label for="ffnet-config-display">Your current Config:</label><br/>');

            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(_getConfig())
                .appendTo(_gui_container);


            _gui_container.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');

            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(_gui_container);

            _gui_container.append(
                $('<input class="btn" type="button" value="Set" />')
                    .click(function ()
                    {
                        _setConfig(neu.val());
                        _gui_hide();
                        _read();
                    })
            );

            _gui_show();
        }

    }

    /**
    *   Open or closes the GUI for the Story Config
    *   @param storyInfo Infos about the story
    */
    var _toggleStoryConfig = function (storyInfo)
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
            if (typeof (storyInfo) == "undefined")
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
            //_gui_container.css("position", "fixed");

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_container.css("position", "absolute");
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            */

            _gui_container.append("<p>This Menu allows you to set story specific options for:</p>");
            _gui_container.append(storyInfo.name);
            _gui_container.append("<hr />");
            _gui_container.append("<p>Highlighter Options:</p>");

            _gui_container.append($('<label for="ffnet-story-highlighter-hide">Hide Story</label>').css("display", "inline-block"));
            var hide = $('<input type="checkbox" id="ffnet-story-highlighter-hide">')
            .css("display", "inline-block").css("margin-left", "15px")
            .appendTo(_gui_container);

            if ((typeof (_config['highlighter'][storyInfo.url]) != "undefined") && (_config['highlighter'][storyInfo.url].hide))
            {
                hide.attr('checked', 'checked');
            }

            _gui_container.append("<hr />");

            _gui_container.append('<label for="ffnet-story-highlighter">Highlighter Path: (leave empty to clear)</label><br/>');
            var highlighter = $('<input id="ffnet-story-highlighter" type="text"></input>')
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
            .click(function ()
            {
                highlighter.val("");
            });

            for (var i = 1; i <= 6; i++)
            {
                image.clone()
                .attr("src", "http://private.mrh-development.de/ff/" + i + ".gif")
                .appendTo(image_container)
                .click(function ()
                {
                    highlighter.val($(this).attr("src"));
                });
            }


            if (typeof (_config['highlighter'][storyInfo.url]) != "undefined")
            {
                highlighter.val(_config['highlighter'][storyInfo.url].image);
            }

            _gui_container.append("<p></p>");



            _gui_container.append(
                $('<input class="btn" type="button" value="Set" />')
                    .click(function ()
                    {
                        var newVal = highlighter.val();
                        var hidden = hide.is(":checked");

                        if ((newVal == "") && (!hidden))
                        {
                            _config['highlighter'][storyInfo.url] = undefined;
                        }
                        else
                        {
                            _config['highlighter'][storyInfo.url] = {
                                image: newVal,
                                hide: hidden
                            };
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

    /**
    *   Open or closes the GUI for the Synchronize Feature 
    */
    var _syncGUI = function ()
    {

        if (typeof ($.fn.progressbar) == "undefined")
        {

            var element = $('<div title="Fanfiction Story Parser"></div>')
            .append(
                $('<p></p>')
                .append($('<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'))
                .append(
                    "<b>Error</b><br/>To use this feature, you need to update your Userscript manually.<br />" +
                    "Sorry for this, but i had to change some dependencies.<br />"
                    )
            ).appendTo($("body"));


            element.dialog({
                modal: true
            });

            return;

        }

        var progressBar = $('<div></div>').progressbar({
            value: 0
        });

        var element = $('<div title="Fanfiction Story Parser"></div>')
        .append(
            $('<p></p>')
            .append($('<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'))
            .append(
                "<b>Synchronization</b><br/>This System synchronizes the local Filter Settings with the Web Service.<br />" +
                "This data can be retrieved from every Machine, that has the same Token.<br />" +
                "<b>If you use this, you agree, that the data transfered is saved on the web service!</b><br />" +
                "<b>Use at own risk! Make backups if possible.</b><br />" +
                "<br /><b>Your Token: " + _config.token + "</b><br/><b>Progress:</b><br />"

            ).append(progressBar)
        ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                "Start": function ()
                {
                    var progress = function (value)
                    {
                        progressBar.progressbar("option", {
                            value: value
                        });

                        if (value == 100)
                        {
                            element.dialog("close");

                            var message = $('<div title="Fanfiction Story Parser"></div>')
                            .append(
                                $('<p></p>')
                                .append($('<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'))
                                .append(
                                    "<b>Synchronization</b><br/>Sync Complete! <br /><br />"
                                ).append(progressBar)
                            ).appendTo($("body"));

                            message.dialog({
                                modal: true
                            });

                        }

                    }

                    _api_syncFilter(progress);
                },
                Cancel: function ()
                {
                    $(this).dialog("close");
                }
            }
        });


    }

    /**
    *   Open or closes the GUI for the Messaging GUI
    */
    var _messagesGUI = function ()
    {
        // Mark Messages as read:
        var localMessages = _dataConfig['messages'];

        var messages = $("<div></div>");

        if (typeof (localMessages) != "undefined")
        {
            _apiMarkMessages();

            $.each(localMessages, function (k, el)
            {
                messages.append(
                    $("<b></b>")
                    .text(el.Title)
                )
                .append(
                    $("<p></p>")
                    .html(el.Content)
                )
                .append("<hr />");
            });
        }



        var element = $('<div title="Fanfiction Story Parser"></div>')
       .append(
           $('<p></p>')
           .append($('<span class="" style="float: left; margin: 0 7px 20px 0;"></span>'))
           .append(
               "<b>Messages:</b><br/><br />"
           )
           .append(messages)
       ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                Close: function ()
                {
                    $(this).dialog("close");
                }
            }
        });
    }

    /**
    *   Open or closes the GUI for the Feedback Function
    */
    var _feedbackGUI = function ()
    {
        var types = ["Bug", "Feature Request", "Question", "Other"];

        var input_type = $("<select></select>");
        $.each(types, function (_, type)
        {
            $("<option></option>").text(type)
            .appendTo(input_type);
        });

        var input_title = $('<input type="text" required />');
        var input_message = $('<textarea style="width:90%; height: 100px;" required></textarea>');


        var element = $('<div title="Fanfiction Story Parser"></div>')
       .append(
           $('<p></p>')
           .append($('<span class="" style="float: left; margin: 0 7px 20px 0;"></span>'))
           .append(
               "<b>Feedback:</b><br /><br />"
           )
           .append("<b>Type:</b><br />")
           .append(input_type)

            .append("<br /><b>Title:</b><br />")
           .append(input_title)

           .append("<br /><b>Message:</b><br />")
           .append(input_message)

       ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                Send: function ()
                {
                    var data = {
                        Token: _config.token,
                        Type: input_type.val(),
                        Title: input_title.val(),
                        Message: input_message.val(),
                        Version: _VERSION,
                        Branch: _BRANCH
                    };


                    _apiRequest({ command: "postFeedback", data: JSON.stringify(data) }, function () { });

                    alert("Message sent ...");

                    $(this).dialog("close");
                },

                Close: function ()
                {
                    $(this).dialog("close");
                }
            }
        });
    }


    // ----- API-Interface ------

    /**
    *   Generic API-Request
    *   @param data Request Options
    *   @param callback Function executed after result was found
    */
    var _apiRequest = function (data, callback)
    {
        var url = _config.api_url;
        var apiLookupKey = _config.api_lookupKey;
        var timeout = _config.api_timeout;
        var retrys = _config.api_retries;

        data.CORS = true;

        if (_useCORS)
        {
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                contentType: "application/json",
                dataType: 'json',
                crossDomain: true,
                data: data,
                cache: false
            })
            .done(function (result)
            {
                _log("Got Result from Server: ", result);

                var data = result.Data[0].Value;

                callback(data);

            })
            .fail(function(state)
            {
                console.error("[FFNet-Parser] Error while fetching Result from Server: ", state);
            });

        }
        else
        {
            var messageID = Math.random().toString().split(".")[1];
            data.adress = apiLookupKey + messageID;

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

            var checkFunction = function ()
            {
                if (_DEBUG)
                {
                    console.log("API_Request - CheckFor Result");
                }

                if (tries >= retrys)
                {
                    if (_DEBUG)
                    {
                        console.log("API_Request - To many tries, abort for ", data);
                    }

                    return;
                }

                if ((typeof sessionStorage[apiLookupKey + messageID] != "undefined") &&
                    (typeof sessionStorage[apiLookupKey + messageID] != "null") &&
                    sessionStorage[apiLookupKey + messageID] != "undefined" &&
                    sessionStorage[apiLookupKey + messageID] != "null" &&
                    sessionStorage[apiLookupKey + messageID] != "" &&
                    sessionStorage[apiLookupKey + messageID] != null)
                {
                    if (_DEBUG)
                    {
                        //console.log("API_Request - Result found, exec callback - ", sessionStorage[apiLookupKey]);
                    }

                    var result = sessionStorage[apiLookupKey + messageID];

                    // Clear last Result
                    delete sessionStorage[apiLookupKey + messageID];

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
    }

    /**
    *   Checks the current Version
    */
    var _api_checkVersion = function ()
    {
        if ((_config.api_checkForUpdates))
        {
            var statisticData =
            {
                Version: _VERSION,
                Token: _config.token,
                Nested: (typeof (sessionStorage["ffnet-mutex"]) != "undefined") ? true : false,
                Branch: _BRANCH,
                Page: window.location.href
            }

            if (_DEBUG)
            {
                console.info("Check for Updates ...");
                console.log("Sending Statistic Data: ", statisticData);
            }

            var requestData = JSON.stringify(statisticData);

            _apiRequest({ command: "getVersion", data: requestData }, function (res)
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

                var versionID = _getVersionId(_VERSION);
                var removeVersionID = _getVersionId(version.version);

                if (removeVersionID > versionID)
                {
                    if (!_config.api_autoIncludeNewVersion)
                    {
                        $(".menulinks").append(" [Notice: There is a newer Version of the Fanfiction.net Story Parser (" + version.version + ")]");
                    }
                    else
                    {
                        _api_updateScript();
                    }
                }
                else
                {
                    _log("No new Version found ...");
                }

            });

        }
    }

    /**
    *   Loads the CSS-Styles from the Server
    */
    var _api_getStyles = function()
    {
        insertStyles = function (style)
        {
            _log("Insert Styles ...");

            var cssElement = $('<style id="ffnetParser-CSS" type="text/css"></style>').html(style);

            $("head").append(cssElement);

        };

        if (typeof (_dataConfig["styles"]) == "undefined")
        {
            _log("Load Styles from Remote Server ...");

            _apiRequest({ command: "getStyles", data: _BRANCH }, function (styles)
            {
                _dataConfig["styles"] = styles;

                insertStyles(styles);
            });
        }
        else
        {
            insertStyles(_dataConfig["styles"]);
        }

    }

    /**
    *   Updates the current script to the newest Version
    */
    var _api_updateScript = function ()
    {
        if (_config.api_autoIncludeNewVersion)
        {
            if (_DEBUG)
            {
                console.log("Loading new Version from Server");
            }

            _apiRequest({ command: "getCurrent", data: _BRANCH }, function (res)
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

    /**
    *   Synchronize - Send Marker Config
    *   @param data Marker Config
    *   @param callback Executed after transfer
    */
    var _api_sendMarker = function (data, callback)
    {
        _apiRequest({ command: "sendFilter", data: JSON.stringify(data) }, function (result)
        {

            if (typeof (callback) == "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Send all markers
    *   @param keys List of all Markers
    *   @param onFinish Callback after the transfer
    *   @param progress Callback after every step
    */
    var _api_sendMarkers = function (keys, onFinish, progress)
    {
        _log("Send Markers to Server: ", keys);

        var index = 0;

        var next = function ()
        {
            if (index > keys.length - 1)
            {
                _log("Upload Finished");
                _save_config();

                if (typeof (onFinish) == "function")
                {
                    onFinish();
                }

                return;
            }

            progress(index + 1);


            var el = _config.marker[keys[index]];



            var data = {
                Name: el.name,
                User: _config.token,
                Display: el.display,
                Keywords: el.keywords.join(", "),
                Ignore: el.ignore.join(", "),
                IgnoreColor: el.ignoreColor,
                Color: el.color,
                MouseOver: el.mouseOver,
                SearchStory: el.search_story,
                MarkChapter: el.mark_chapter,
                PrintStory: el.print_story,
                MentionInHeadline: el.mention_in_headline,
                Background: el.background,
                TextColor: el.text_color,
                Revision: el.revision
            };

            _log("Upload Element: ", data);

            _api_sendMarker(data, function (response)
            {
                _log("Error: ", response.Error);
                _log("New Revision", response.Revision);

                if (!response.Error)
                {
                    // Save Revision into internal Data-Structure
                    if (typeof (keys[index]) == "undefined")
                    {
                        _log("Error keys[", index, "] is undefined");
                        _log("keys : ", keys);
                    }
                    else if (typeof (_config.marker[keys[index]]) == "undefined")
                    {
                        _log("Error _config.marker[", keys[index], "] is undefined");
                        _log("_config.marker : ", _config.marker);
                    }
                    else
                    {
                        _config.marker[keys[index]].revision = response.Revision;
                    }
                }
                else
                {
                    console.error("Error while uploading Filter to server: ", response.Message);
                }

                next();
            });


            index++;
        };

        next();
    }

    /**
    *   Synchronize - Get the Versions of the marker on the remote Server
    *   @param callback Callback Function
    */
    var _api_getRevisions = function (callback)
    {
        _apiRequest({ command: "getNewestRevisions", data: _config.token }, function (result)
        {

            if (typeof (callback) == "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Checks if all marker are up to date
    *   @param callback Callback after success
    */
    var _api_getNeedUpdate = function (callback)
    {
        _log("API - Checking for Filter Changes");

        var upload = [];
        var download = [];
        var checked = [];

        // Get the current saved Revisions:
        _api_getRevisions(function (revisions)
        {
            _log("Got Server Revisions: ", revisions);

            $.each(revisions.Revisions, function (key, el)
            {
                var marker = _config.marker[el.Key];

                checked.push(el.Key);

                _log("Check Element: ", el);

                if (typeof (marker) != "undefined")
                {
                    _log("Local Marker Found - Version: ", marker.revision);

                    // Marker exists -> check Revision
                    if (typeof (marker.revision) == "undefined")
                    {
                        marker.revision = 0;
                    }

                    var revision = Number(el.Value);


                    if (marker.revision > revision)
                    {
                        _log("Our Marker is newer -> Upload");
                        upload.push(marker.name);
                    }
                    else if (marker.revision < revision)
                    {
                        _log("Our Marker is older -> Download");
                        download.push(marker.name);
                    }
                    else
                    {
                        _log("Marker Up to date");
                    }

                }
                else
                {
                    _log("We don't have this Marker -> Download");
                    download.push(el.Key);
                }

            });

            // Check for Filter, that are not on the Server
            $.each(_config.marker, function (key, el)
            {
                if (checked.indexOf(key) == -1)
                {
                    _log("Filter ", el.name, " not on the Server -> upload");

                    upload.push(el.name);
                }

            });



            callback({ upload: upload, download: download });
        });

    }

    /**
    *   Synchronize - Get a specific marker from the remote Server
    *   @param marker Name of the Marker
    *   @param callback Callback after success
    *   @param progress Callback after every step
    */
    var _api_getMarker = function (marker, callback, progress)
    {
        _log("Get Marker from Server: ", marker);

        if (marker.length == 0)
        {
            callback({
                Error: false,
                Marker: [],
                Revision: 0
            });

            return;
        }

        var data =
        {
            User: _config.token,
            Marker: marker
        };

        _apiRequest({ command: "getFilter", data: JSON.stringify(data) }, function (result)
        {

            if (typeof (callback) == "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Starts the synchronization
    *   @param progress_callback Callback with progress information
    */
    var _api_syncFilter = function (progress_callback)
    {
        progress_callback(false);

        _api_getNeedUpdate(function (elements)
        {
            var numberOfElements = elements.upload.length + elements.download.length + 1;

            var progress = function (index)
            {
                progress_callback((index / numberOfElements) * 100);
            }

            // Upload Markers:
            _api_sendMarkers(elements.upload, function ()
            {
                progress = function ()
                {
                    progress_callback(((numberOfElements - 1) / numberOfElements) * 100);
                }

                _api_getMarker(elements.download, function (result)
                {
                    if (!result.Error)
                    {

                        _log("Create Backup of Filters ... just in case ;)");
                        _config.markerBackup = _config.marker;

                        _log("Apply Filters to local Config: ", result);

                        $.each(result.Marker, function (k, el)
                        {
                            _log("Apply changes to ", el.name);

                            var data = {
                                name: el.Name,
                                display: el.Display,
                                keywords: el.Keywords.split(", "),
                                ignore: el.Ignore.split(", "),
                                ignoreColor: el.IgnoreColor,
                                color: el.Color,
                                mouseOver: el.MouseOver,
                                search_story: el.SearchStroy,
                                mark_chapter: el.MarkChapter,
                                print_story: el.PrintStory,
                                mention_in_headline: el.MentionInHeadline,
                                background: el.Background,
                                text_color: el.TextColor,
                                revision: el.Revision
                            };

                            _config.marker[el.Name] = data;


                        });

                        _save_config();

                        _log("Sync Finished");
                        progress_callback(100);

                    }
                    else
                    {
                        console.error("Can't retrieve Filters from Server: ", result.Message);
                    }

                }, progress);

            }, progress);

        });

    }

    /**
    *   Get all new Messages from the Server
    *   @param callback Callback after success
    */
    var _apiGetMessages = function (callback)
    {
        _apiRequest({ command: "getMessages", data: _config.token }, function (result)
        {
            var response = JSON.parse(result);

            callback(response);

        });

    }

    /**
    *   Tell the remote Server, that all new messages have been read
    */
    var _apiMarkMessages = function ()
    {
        delete _dataConfig['messages'];
        _save_dataStore();

        $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message-white.png");
        $(".ffnet-messageCount").text("0");


        _apiRequest({ command: "readMessages", data: _config.token }, function (result)
        {
        });

    }

    /**
    *   Gets the Version Ident Number
    *   @param name Name of the Version
    *   @result Version Ident Number
    */
    var _getVersionId = function (name)
    {
        var parts = name.split(".");
        var version = 0;

        for (i = 0; i < parts.length; i++)
        {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }

        return version;
    }


    /**
    *   Activates Debug Options
    */
    this.debugOptions = function ()
    {
        if (_DEBUG)
        {

            /*
            var table = $(".zui").find("td").first();

            if (table.length > 0)
            {


                // Add User Interface
                table.append(
                    $('<a></a>').addClass('menu-link').html('Debug').attr('href', '#').click(function (e)
                    {

                        _messagesGUI();

                    }).attr('title', 'DEBUG Options')
                );

            }
            */
            //alert("Currently not used")

        }
    }





    // --------------------------

    /**
    *   Save Config
    */
    var _save_config = function ()
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

    /**
    *   Save to the session storage
    */
    var _save_dataStore = function ()
    {
        _saveToMemory(sessionStorage, _config.dataStorage_key, _dataConfig);

        if (_DEBUG)
        {
            console.info("Save to Memory: ", _dataConfig);
        }
    }

    /**
    *   Loads Config from Memory
    */
    var _getConfig = function ()
    {
        return JSON.stringify(_config);
    }

    this.getConfig = _getConfig;

    /**
    *   Overwrites the config with a new one
    *   @param newConfig New Config
    */
    var _setConfig = function (newConfig)
    {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
        {
            var data = JSON.parse(newConfig);
            _config = data;

            _save_config();
        }
    }

    this.setConfig = _setConfig;

    /**
    *   Returns the List of found Story Elements
    *   @returns List of found Elements
    */
    this.getList = function ()
    {
        return _eList;
    }

    // -------- Multiuse Functions ---------

    /**
    *   Load a JSON-Text from Memory
    *   @param memory Memory to load from
    *   @param key Key of element
    *   @result desearialized Object
    */
    var _loadFromMemory = function (memory, key)
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

    /**
    *   Save an object to an JSON File
    *   @param memory Memory to save to
    *   @param key Key of Element
    *   @param object Object File
    */
    var _saveToMemory = function (memory, key, object)
    {
        try
        {
            memory[key] = JSON.stringify(object);

        } catch (e)
        {
            console.warn(e);
        }

    }

    /**
    *   Gets the URL from a Button
    *   @param button Button Instance
    */
    var _getUrlFromButton = function (button)
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

    /**
    *   Log to the Debug-Console
    *   @param a Parameter A
    *   @param b Parameter B
    *   @param c Paramater C
    */
    var _log = function (a, b, c)
    {
        if (_DEBUG)
        {
            if (typeof (b) == "undefined")
            {
                console.log(a);
            }
            else if (typeof (c) == "undefined")
            {
                console.log(a, b);
            }
            else
            {
                console.log(a, b, c);
            }
        }
    }

    /**
    *   Creates an Info Message
    *   @param a Parameter A
    *   @param b Parameter B
    *   @param c Parameter C
    */
    var _info = function (a, b, c)
    {
        if (_DEBUG)
        {
            if (typeof (b) == "undefined")
            {
                console.info(a);
            }
            else if (typeof (c) == "undefined")
            {
                console.info(a, b);
            }
            else
            {
                console.info(a, b, c);
            }
        }
    }


    // -------------------------------------------

    __init();
}

var parser = new storyParser($('.z-list'));
parser.readList($('.z-list'));
parser.enablePocketSave($('#content_wrapper_inner'));
parser.enableInStoryHighlighter($('#content_wrapper_inner'));

parser.debugOptions();