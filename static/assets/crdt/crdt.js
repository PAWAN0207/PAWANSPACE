// \0rolldown/runtime.js
var e = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), n, r, i = e((() => {
	n = Object.defineProperty, r = (e, t) => {
		let r = {};
		for (var i in e) n(r, i, {
			get: e[i],
			enumerable: !0
		});
		return t || n(r, Symbol.toStringTag, { value: "Module" }), r;
	};
}));
// node_modules/orderedmap/dist/index.js
function a(e) {
	this.content = e;
}
var o = e((() => {
	a.prototype = {
		constructor: a,
		find: function(e) {
			for (var t = 0; t < this.content.length; t += 2) if (this.content[t] === e) return t;
			return -1;
		},
		get: function(e) {
			var t = this.find(e);
			return t == -1 ? void 0 : this.content[t + 1];
		},
		update: function(e, t, n) {
			var r = n && n != e ? this.remove(n) : this, i = r.find(e), o = r.content.slice();
			return i == -1 ? o.push(n || e, t) : (o[i + 1] = t, n && (o[i] = n)), new a(o);
		},
		remove: function(e) {
			var t = this.find(e);
			if (t == -1) return this;
			var n = this.content.slice();
			return n.splice(t, 2), new a(n);
		},
		addToStart: function(e, t) {
			return new a([e, t].concat(this.remove(e).content));
		},
		addToEnd: function(e, t) {
			var n = this.remove(e).content.slice();
			return n.push(e, t), new a(n);
		},
		addBefore: function(e, t, n) {
			var r = this.remove(t), i = r.content.slice(), o = r.find(e);
			return i.splice(o == -1 ? i.length : o, 0, t, n), new a(i);
		},
		forEach: function(e) {
			for (var t = 0; t < this.content.length; t += 2) e(this.content[t], this.content[t + 1]);
		},
		prepend: function(e) {
			return e = a.from(e), e.size ? new a(e.content.concat(this.subtract(e).content)) : this;
		},
		append: function(e) {
			return e = a.from(e), e.size ? new a(this.subtract(e).content.concat(e.content)) : this;
		},
		subtract: function(e) {
			var t = this;
			e = a.from(e);
			for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
			return t;
		},
		toObject: function() {
			var e = {};
			return this.forEach(function(t, n) {
				e[t] = n;
			}), e;
		},
		get size() {
			return this.content.length >> 1;
		}
	}, a.from = function(e) {
		if (e instanceof a) return e;
		var t = [];
		if (e) for (var n in e) t.push(n, e[n]);
		return new a(t);
	};
}));
// node_modules/prosemirror-model/dist/index.js
function s(e, t, n) {
	for (let r = 0;; r++) {
		if (r == e.childCount || r == t.childCount) return e.childCount == t.childCount ? null : n;
		let i = e.child(r), a = t.child(r);
		if (i == a) n += i.nodeSize;
		else {
			if (!i.sameMarkup(a)) return n;
			if (i.isText && i.text != a.text) {
				let e = i.text, t = a.text, r = 0;
				for (; e[r] == t[r]; r++) n++;
				return r && r < e.length && r < t.length && u(e.charCodeAt(r - 1)) && l(e.charCodeAt(r)) && n--, n;
			}
			if (i.content.size || a.content.size) {
				let e = s(i.content, a.content, n + 1);
				if (e != null) return e;
			}
			n += i.nodeSize;
		}
	}
}
function c(e, t, n, r) {
	for (let i = e.childCount, a = t.childCount;;) {
		if (i == 0 || a == 0) return i == a ? null : {
			a: n,
			b: r
		};
		let o = e.child(--i), s = t.child(--a), d = o.nodeSize;
		if (o == s) n -= d, r -= d;
		else {
			if (!o.sameMarkup(s)) return {
				a: n,
				b: r
			};
			if (o.isText && o.text != s.text) {
				let e = o.text, t = s.text, i = e.length, a = t.length;
				for (; i > 0 && a > 0 && e[i - 1] == t[a - 1];) i--, a--, n--, r--;
				return i && a && i < e.length && u(e.charCodeAt(i - 1)) && l(e.charCodeAt(i)) && (n++, r++), {
					a: n,
					b: r
				};
			}
			if (o.content.size || s.content.size) {
				let e = c(o.content, s.content, n - 1, r - 1);
				if (e) return e;
			}
			n -= d, r -= d;
		}
	}
}
function l(e) {
	return e >= 56320 && e < 57344;
}
function u(e) {
	return e >= 55296 && e < 56320;
}
function d(e, t) {
	return Fe.index = e, Fe.offset = t, Fe;
}
function f(e, t) {
	if (e === t) return !0;
	if (!(e && typeof e == "object") || !(t && typeof t == "object")) return !1;
	let n = Array.isArray(e);
	if (Array.isArray(t) != n) return !1;
	if (n) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) if (!f(e[n], t[n])) return !1;
	} else {
		for (let n in e) if (!(n in t) || !f(e[n], t[n])) return !1;
		for (let n in t) if (!(n in e)) return !1;
	}
	return !0;
}
function p(e, t, n) {
	let { index: r, offset: i } = e.findIndex(t), a = e.maybeChild(r), { index: o, offset: s } = e.findIndex(n);
	if (i == t || a.isText) {
		if (s != n && !e.child(o).isText) throw RangeError("Removing non-flat range");
		return e.cut(0, t).append(e.cut(n));
	}
	if (r != o) throw RangeError("Removing non-flat range");
	return e.replaceChild(r, a.copy(p(a.content, t - i - 1, n - i - 1)));
}
function m(e, t, n, r, i, a) {
	let { index: o, offset: s } = e.findIndex(t), c = e.maybeChild(o);
	if (s == t || c.isText) return a && r <= 0 && i <= 0 && !a.canReplace(o, o, n) ? null : e.cut(0, t).append(n).append(e.cut(t));
	let l = m(c.content, t - s - 1, n, o == 0 ? r - 1 : 0, o == e.childCount - 1 ? i - 1 : 0, c);
	return l && e.replaceChild(o, c.copy(l));
}
function h(e, t, n) {
	if (n.openStart > e.depth) throw new Ie("Inserted content deeper than insertion position");
	if (e.depth - n.openStart != t.depth - n.openEnd) throw new Ie("Inconsistent open depths");
	return g(e, t, n, 0);
}
function g(e, t, n, r) {
	let i = e.index(r), a = e.node(r);
	if (i == t.index(r) && r < e.depth - n.openStart) {
		let o = g(e, t, n, r + 1);
		return a.copy(a.content.replaceChild(i, o));
	}
	if (!n.content.size) return b(a, ne(e, t, r));
	if (!n.openStart && !n.openEnd && e.depth == r && t.depth == r) {
		let r = e.parent, i = r.content;
		return b(r, i.cut(0, e.parentOffset).append(n.content).append(i.cut(t.parentOffset)));
	}
	{
		let { start: i, end: o } = re(n, e);
		return b(a, te(e, i, o, t, r));
	}
}
function _(e, t) {
	if (!t.type.compatibleContent(e.type)) throw new Ie("Cannot join " + t.type.name + " onto " + e.type.name);
}
function ee(e, t, n) {
	let r = e.node(n);
	return _(r, t.node(n)), r;
}
function v(e, t) {
	let n = t.length - 1;
	n >= 0 && e.isText && e.sameMarkup(t[n]) ? t[n] = e.withText(t[n].text + e.text) : t.push(e);
}
function y(e, t, n, r) {
	let i = (t || e).node(n), a = 0, o = t ? t.index(n) : i.childCount;
	e && (a = e.index(n), e.depth > n ? a++ : e.textOffset && (v(e.nodeAfter, r), a++));
	for (let e = a; e < o; e++) v(i.child(e), r);
	t && t.depth == n && t.textOffset && v(t.nodeBefore, r);
}
function b(e, t) {
	if (!e.type.validContent(t)) throw new Ie("Invalid content for node " + e.type.name);
	return e.copy(t);
}
function te(e, t, n, r, i) {
	let a = e.depth > i && ee(e, t, i + 1), o = r.depth > i && ee(n, r, i + 1), s = [];
	return y(null, e, i, s), a && o && t.index(i) == n.index(i) ? (_(a, o), v(b(a, te(e, t, n, r, i + 1)), s)) : (a && v(b(a, ne(e, t, i + 1)), s), y(t, n, i, s), o && v(b(o, ne(n, r, i + 1)), s)), y(r, null, i, s), new x(s);
}
function ne(e, t, n) {
	let r = [];
	return y(null, e, n, r), e.depth > n && v(b(ee(e, t, n + 1), ne(e, t, n + 1)), r), y(t, null, n, r), new x(r);
}
function re(e, t) {
	let n = t.depth - e.openStart, r = t.node(n).copy(e.content);
	for (let e = n - 1; e >= 0; e--) r = t.node(e).copy(x.from(r));
	return {
		start: r.resolveNoCache(e.openStart + n),
		end: r.resolveNoCache(r.content.size - e.openEnd - n)
	};
}
function ie(e, t) {
	for (let n = e.length - 1; n >= 0; n--) t = e[n].type.name + "(" + t + ")";
	return t;
}
function ae(e, t, n, r) {
	for (let i in t) if (!(i in e)) throw RangeError(`Unsupported attribute ${i} for ${n} of type ${r}`);
	for (let n in e) e[n].validate && e[n].validate(t[n]);
}
function oe(e) {
	let t = [];
	do
		t.push(se(e));
	while (e.eat("|"));
	return t.length == 1 ? t[0] : {
		type: "choice",
		exprs: t
	};
}
function se(e) {
	let t = [];
	do
		t.push(ce(e));
	while (e.next && e.next != ")" && e.next != "|");
	return t.length == 1 ? t[0] : {
		type: "seq",
		exprs: t
	};
}
function ce(e) {
	let t = fe(e);
	for (;;) if (e.eat("+")) t = {
		type: "plus",
		expr: t
	};
	else if (e.eat("*")) t = {
		type: "star",
		expr: t
	};
	else if (e.eat("?")) t = {
		type: "opt",
		expr: t
	};
	else if (e.eat("{")) t = ue(e, t);
	else break;
	return t;
}
function le(e) {
	/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
	let t = Number(e.next);
	return e.pos++, t;
}
function ue(e, t) {
	let n = le(e), r = n;
	return e.eat(",") && (r = e.next == "}" ? -1 : le(e)), e.eat("}") || e.err("Unclosed braced range"), {
		type: "range",
		min: n,
		max: r,
		expr: t
	};
}
function de(e, t) {
	let n = e.nodeTypes, r = n[t];
	if (r) return [r];
	let i = [];
	for (let e in n) {
		let r = n[e];
		r.isInGroup(t) && i.push(r);
	}
	return i.length == 0 && e.err("No node type or group '" + t + "' found"), i;
}
function fe(e) {
	if (e.eat("(")) {
		let t = oe(e);
		return e.eat(")") || e.err("Missing closing paren"), t;
	}
	if (/\W/.test(e.next)) e.err("Unexpected token '" + e.next + "'");
	else {
		let t = de(e, e.next).map((t) => (e.inline == null ? e.inline = t.isInline : e.inline != t.isInline && e.err("Mixing inline and block content"), {
			type: "name",
			value: t
		}));
		return e.pos++, t.length == 1 ? t[0] : {
			type: "choice",
			exprs: t
		};
	}
}
function pe(e) {
	let t = [[]];
	return i(a(e, 0), n()), t;
	function n() {
		return t.push([]) - 1;
	}
	function r(e, n, r) {
		let i = {
			term: r,
			to: n
		};
		return t[e].push(i), i;
	}
	function i(e, t) {
		e.forEach((e) => e.to = t);
	}
	function a(e, t) {
		if (e.type == "choice") return e.exprs.reduce((e, n) => e.concat(a(n, t)), []);
		if (e.type == "seq") for (let r = 0;; r++) {
			let o = a(e.exprs[r], t);
			if (r == e.exprs.length - 1) return o;
			i(o, t = n());
		}
		else if (e.type == "star") {
			let o = n();
			return r(t, o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "plus") {
			let o = n();
			return i(a(e.expr, t), o), i(a(e.expr, o), o), [r(o)];
		} else if (e.type == "opt") return [r(t)].concat(a(e.expr, t));
		else if (e.type == "range") {
			let o = t;
			for (let t = 0; t < e.min; t++) {
				let t = n();
				i(a(e.expr, o), t), o = t;
			}
			if (e.max == -1) i(a(e.expr, o), o);
			else for (let t = e.min; t < e.max; t++) {
				let t = n();
				r(o, t), i(a(e.expr, o), t), o = t;
			}
			return [r(o)];
		} else if (e.type == "name") return [r(t, void 0, e.value)];
		else throw Error("Unknown expr type");
	}
}
function me(e, t) {
	return t - e;
}
function he(e, t) {
	let n = [];
	return r(t), n.sort(me);
	function r(t) {
		let i = e[t];
		if (i.length == 1 && !i[0].term) return r(i[0].to);
		n.push(t);
		for (let e = 0; e < i.length; e++) {
			let { term: t, to: a } = i[e];
			!t && n.indexOf(a) == -1 && r(a);
		}
	}
}
function ge(e) {
	let t = Object.create(null);
	return n(he(e, 0));
	function n(r) {
		let i = [];
		r.forEach((t) => {
			e[t].forEach(({ term: t, to: n }) => {
				if (!t) return;
				let r;
				for (let e = 0; e < i.length; e++) i[e][0] == t && (r = i[e][1]);
				he(e, n).forEach((e) => {
					r || i.push([t, r = []]), r.indexOf(e) == -1 && r.push(e);
				});
			});
		});
		let a = t[r.join(",")] = new Ge(r.indexOf(e.length - 1) > -1);
		for (let e = 0; e < i.length; e++) {
			let r = i[e][1].sort(me);
			a.next.push({
				type: i[e][0],
				next: t[r.join(",")] || n(r)
			});
		}
		return a;
	}
}
function _e(e, t) {
	for (let n = 0, r = [e]; n < r.length; n++) {
		let e = r[n], i = !e.validEnd, a = [];
		for (let t = 0; t < e.next.length; t++) {
			let { type: n, next: o } = e.next[t];
			a.push(n.name), i && !(n.isText || n.hasRequiredAttrs()) && (i = !1), r.indexOf(o) == -1 && r.push(o);
		}
		i && t.err("Only non-generatable nodes (" + a.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
	}
}
function ve(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		if (!r.hasDefault) return null;
		t[n] = r.default;
	}
	return t;
}
function ye(e, t) {
	let n = Object.create(null);
	for (let r in e) {
		let i = e[r], a = t && t[r];
		if (a === void 0) {
			if (i.hasDefault) a = i.default;
			else throw RangeError("No value supplied for attribute " + r);
		} else i.validate && i.validate(a);
		n[r] = a;
	}
	return n;
}
function be(e, t) {
	let n = Object.create(null);
	if (t) for (let r in t) n[r] = new Je(e, r, t[r]);
	return n;
}
function xe(e, t, n) {
	let r = n.split("|");
	return (n) => {
		let i = n === null ? "null" : typeof n;
		if (r.indexOf(i) < 0) throw RangeError(`Expected value of type ${r} for attribute ${t} on type ${e}, got ${i}`);
	};
}
function Se(e, t) {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e.marks[i], o = a;
		if (a) n.push(a);
		else for (let t in e.marks) {
			let r = e.marks[t];
			(i == "_" || r.spec.group && r.spec.group.split(" ").indexOf(i) > -1) && n.push(o = r);
		}
		if (!o) throw SyntaxError("Unknown mark type: '" + t[r] + "'");
	}
	return n;
}
function Ce(e) {
	return e.tag != null;
}
function we(e) {
	return e.style != null;
}
function Te(e, t, n) {
	return t == null ? e && e.whitespace == "pre" ? 3 : n & -5 : (t ? tt : 0) | (t === "full" ? nt : 0);
}
function Ee(e) {
	for (let t = e.firstChild, n = null; t; t = t.nextSibling) {
		let e = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
		e && et.hasOwnProperty(e) && n ? (n.appendChild(t), t = n) : e == "li" ? n = t : e && (n = null);
	}
}
function De(e, t) {
	return (e.matches || e.msMatchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector).call(e, t);
}
function Oe(e) {
	let t = {};
	for (let n in e) t[n] = e[n];
	return t;
}
function ke(e, t) {
	let n = t.schema.nodes;
	for (let r in n) {
		let i = n[r];
		if (!i.allowsMarkType(e)) continue;
		let a = [], o = (e) => {
			a.push(e);
			for (let n = 0; n < e.edgeCount; n++) {
				let { type: r, next: i } = e.edge(n);
				if (r == t || a.indexOf(i) < 0 && o(i)) return !0;
			}
		};
		if (o(i.contentMatch)) return !0;
	}
}
function Ae(e) {
	let t = {};
	for (let n in e) {
		let r = e[n].spec.toDOM;
		r && (t[n] = r);
	}
	return t;
}
function je(e) {
	return e.document || window.document;
}
function Me(e) {
	let t = st.get(e);
	return t === void 0 && st.set(e, t = Ne(e)), t;
}
function Ne(e) {
	let t = null;
	function n(e) {
		if (e && typeof e == "object") {
			if (Array.isArray(e)) {
				if (typeof e[0] == "string") t ||= [], t.push(e);
				else for (let t = 0; t < e.length; t++) n(e[t]);
			} else for (let t in e) n(e[t]);
		}
	}
	return n(e), t;
}
function Pe(e, t, n, r) {
	if (t.nodeType == 1) return { dom: t };
	if (t.dom && t.dom.nodeType == 1) return t;
	let i = t[0], a;
	if (typeof i != "string") throw RangeError("Invalid array passed to renderSpec");
	if (r && (a = Me(r)) && a.indexOf(t) > -1) throw RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
	let o = i.indexOf(" ");
	o > 0 && (n = i.slice(0, o), i = i.slice(o + 1));
	let s, c = n ? e.createElementNS(n, i) : e.createElement(i), l = t[1], u = 1;
	if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
		u = 2;
		for (let e in l) if (l[e] != null) {
			let t = e.indexOf(" ");
			t > 0 ? c.setAttributeNS(e.slice(0, t), e.slice(t + 1), l[e]) : e == "style" && c.style ? c.style.cssText = l[e] : c.setAttribute(e, l[e]);
		}
	}
	for (let i = u; i < t.length; i++) {
		let a = t[i];
		if (a === 0) {
			if (i < t.length - 1 || i > u) throw RangeError("Content hole must be the only child of its parent node");
			return {
				dom: c,
				contentDOM: c
			};
		}
		if (typeof a == "string") c.appendChild(e.createTextNode(a));
		else {
			let { dom: t, contentDOM: i } = Pe(e, a, n, r);
			if (c.appendChild(t), i) {
				if (s) throw RangeError("Multiple content holes");
				s = i;
			}
		}
	}
	return {
		dom: c,
		contentDOM: s
	};
}
var x, Fe, S, Ie, C, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st, ct = e((() => {
	o(), x = class e {
		constructor(e, t) {
			if (this.content = e, this.size = t || 0, t == null) for (let t = 0; t < e.length; t++) this.size += e[t].nodeSize;
		}
		nodesBetween(e, t, n, r = 0, i) {
			for (let a = 0, o = 0; o < t; a++) {
				let s = this.content[a], c = o + s.nodeSize;
				if (c > e && n(s, r + o, i || null, a) !== !1 && s.content.size) {
					let i = o + 1;
					s.nodesBetween(Math.max(0, e - i), Math.min(s.content.size, t - i), n, r + i);
				}
				o = c;
			}
		}
		descendants(e) {
			this.nodesBetween(0, this.size, e);
		}
		textBetween(e, t, n, r) {
			let i = "", a = !0;
			return this.nodesBetween(e, t, (o, s) => {
				let c = o.isText ? o.text.slice(Math.max(e, s) - s, t - s) : o.isLeaf ? r ? typeof r == "function" ? r(o) : r : o.type.spec.leafText ? o.type.spec.leafText(o) : "" : "";
				o.isBlock && (o.isLeaf && c || o.isTextblock) && n && (a ? a = !1 : i += n), i += c;
			}, 0), i;
		}
		append(t) {
			if (!t.size) return this;
			if (!this.size) return t;
			let n = this.lastChild, r = t.firstChild, i = this.content.slice(), a = 0;
			for (n.isText && n.sameMarkup(r) && (i[i.length - 1] = n.withText(n.text + r.text), a = 1); a < t.content.length; a++) i.push(t.content[a]);
			return new e(i, this.size + t.size);
		}
		cut(t, n = this.size) {
			if (t == 0 && n == this.size) return this;
			let r = [], i = 0;
			if (n > t) for (let e = 0, a = 0; a < n; e++) {
				let o = this.content[e], s = a + o.nodeSize;
				s > t && ((a < t || s > n) && (o = o.isText ? o.cut(Math.max(0, t - a), Math.min(o.text.length, n - a)) : o.cut(Math.max(0, t - a - 1), Math.min(o.content.size, n - a - 1))), r.push(o), i += o.nodeSize), a = s;
			}
			return new e(r, i);
		}
		cutByIndex(t, n) {
			return t == n ? e.empty : t == 0 && n == this.content.length ? this : new e(this.content.slice(t, n));
		}
		replaceChild(t, n) {
			let r = this.content[t];
			if (r == n) return this;
			let i = this.content.slice(), a = this.size + n.nodeSize - r.nodeSize;
			return i[t] = n, new e(i, a);
		}
		addToStart(t) {
			return new e([t].concat(this.content), this.size + t.nodeSize);
		}
		addToEnd(t) {
			return new e(this.content.concat(t), this.size + t.nodeSize);
		}
		eq(e) {
			if (this.content.length != e.content.length) return !1;
			for (let t = 0; t < this.content.length; t++) if (!this.content[t].eq(e.content[t])) return !1;
			return !0;
		}
		get firstChild() {
			return this.content.length ? this.content[0] : null;
		}
		get lastChild() {
			return this.content.length ? this.content[this.content.length - 1] : null;
		}
		get childCount() {
			return this.content.length;
		}
		child(e) {
			let t = this.content[e];
			if (!t) throw RangeError("Index " + e + " out of range for " + this);
			return t;
		}
		maybeChild(e) {
			return this.content[e] || null;
		}
		forEach(e) {
			for (let t = 0, n = 0; t < this.content.length; t++) {
				let r = this.content[t];
				e(r, n, t), n += r.nodeSize;
			}
		}
		findDiffStart(e, t = 0) {
			return s(this, e, t);
		}
		findDiffEnd(e, t = this.size, n = e.size) {
			return c(this, e, t, n);
		}
		findIndex(e) {
			if (e == 0) return d(0, e);
			if (e == this.size) return d(this.content.length, e);
			if (e > this.size || e < 0) throw RangeError(`Position ${e} outside of fragment (${this})`);
			for (let t = 0, n = 0;; t++) {
				let r = this.child(t), i = n + r.nodeSize;
				if (i >= e) return i == e ? d(t + 1, i) : d(t, n);
				n = i;
			}
		}
		toString() {
			return "<" + this.toStringInner() + ">";
		}
		toStringInner() {
			return this.content.join(", ");
		}
		toJSON() {
			return this.content.length ? this.content.map((e) => e.toJSON()) : null;
		}
		static fromJSON(t, n) {
			if (!n) return e.empty;
			if (!Array.isArray(n)) throw RangeError("Invalid input for Fragment.fromJSON");
			return e.fromArray(n.map(t.nodeFromJSON));
		}
		static fromArray(t) {
			if (!t.length) return e.empty;
			let n, r = 0;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				r += i.nodeSize, e && i.isText && t[e - 1].sameMarkup(i) ? (n ||= t.slice(0, e), n[n.length - 1] = i.withText(n[n.length - 1].text + i.text)) : n && n.push(i);
			}
			return new e(n || t, r);
		}
		static from(t) {
			if (!t) return e.empty;
			if (t instanceof e) return t;
			if (Array.isArray(t)) return this.fromArray(t);
			if (t.attrs) return new e([t], t.nodeSize);
			throw RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
		}
	}, x.empty = new x([], 0), Fe = {
		index: 0,
		offset: 0
	}, S = class e {
		constructor(e, t) {
			this.type = e, this.attrs = t;
		}
		addToSet(e) {
			let t, n = !1;
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (this.eq(i)) return e;
				if (this.type.excludes(i.type)) t ||= e.slice(0, r);
				else if (i.type.excludes(this.type)) return e;
				else !n && i.type.rank > this.type.rank && (t ||= e.slice(0, r), t.push(this), n = !0), t && t.push(i);
			}
			return t ||= e.slice(), n || t.push(this), t;
		}
		removeFromSet(e) {
			for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
			return e;
		}
		isInSet(e) {
			for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
			return !1;
		}
		eq(e) {
			return this == e || this.type == e.type && f(this.attrs, e.attrs);
		}
		toJSON() {
			let e = { type: this.type.name };
			for (let t in this.attrs) {
				e.attrs = this.attrs;
				break;
			}
			return e;
		}
		static fromJSON(e, t) {
			if (!t) throw RangeError("Invalid input for Mark.fromJSON");
			let n = e.marks[t.type];
			if (!n) throw RangeError(`There is no mark type ${t.type} in this schema`);
			return n.create(t.attrs);
		}
		static sameSet(e, t) {
			if (e == t) return !0;
			if (e.length != t.length) return !1;
			for (let n = 0; n < e.length; n++) if (!e[n].eq(t[n])) return !1;
			return !0;
		}
		static setFrom(t) {
			if (!t || Array.isArray(t) && t.length == 0) return e.none;
			if (t instanceof e) return [t];
			let n = t.slice();
			return n.sort((e, t) => e.type.rank - t.type.rank), n;
		}
	}, S.none = [], Ie = class extends Error {}, C = class e {
		constructor(e, t, n) {
			this.content = e, this.openStart = t, this.openEnd = n;
		}
		get size() {
			return this.content.size - this.openStart - this.openEnd;
		}
		insertAt(t, n) {
			let r = m(this.content, t + this.openStart, n, this.openStart + 1, this.openEnd + 1);
			return r && new e(r, this.openStart, this.openEnd);
		}
		removeBetween(t, n) {
			return new e(p(this.content, t + this.openStart, n + this.openStart), this.openStart, this.openEnd);
		}
		eq(e) {
			return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
		}
		toString() {
			return this.content + "(" + this.openStart + "," + this.openEnd + ")";
		}
		toJSON() {
			if (!this.content.size) return null;
			let e = { content: this.content.toJSON() };
			return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
		}
		static fromJSON(t, n) {
			if (!n) return e.empty;
			let r = n.openStart || 0, i = n.openEnd || 0;
			if (typeof r != "number" || typeof i != "number") throw RangeError("Invalid input for Slice.fromJSON");
			return new e(x.fromJSON(t, n.content), r, i);
		}
		static maxOpen(t, n = !0) {
			let r = 0, i = 0;
			for (let e = t.firstChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.firstChild) r++;
			for (let e = t.lastChild; e && !e.isLeaf && (n || !e.type.spec.isolating); e = e.lastChild) i++;
			return new e(t, r, i);
		}
	}, C.empty = new C(x.empty, 0, 0), Le = class e {
		constructor(e, t, n) {
			this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
		}
		resolveDepth(e) {
			return e == null ? this.depth : e < 0 ? this.depth + e : e;
		}
		get parent() {
			return this.node(this.depth);
		}
		get doc() {
			return this.node(0);
		}
		node(e) {
			return this.path[this.resolveDepth(e) * 3];
		}
		index(e) {
			return this.path[this.resolveDepth(e) * 3 + 1];
		}
		indexAfter(e) {
			return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
		}
		start(e) {
			return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
		}
		end(e) {
			return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
		}
		before(e) {
			if (e = this.resolveDepth(e), !e) throw RangeError("There is no position before the top-level node");
			return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
		}
		after(e) {
			if (e = this.resolveDepth(e), !e) throw RangeError("There is no position after the top-level node");
			return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
		}
		get textOffset() {
			return this.pos - this.path[this.path.length - 1];
		}
		get nodeAfter() {
			let e = this.parent, t = this.index(this.depth);
			if (t == e.childCount) return null;
			let n = this.pos - this.path[this.path.length - 1], r = e.child(t);
			return n ? e.child(t).cut(n) : r;
		}
		get nodeBefore() {
			let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
			return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
		}
		posAtIndex(e, t) {
			t = this.resolveDepth(t);
			let n = this.path[t * 3], r = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
			for (let t = 0; t < e; t++) r += n.child(t).nodeSize;
			return r;
		}
		marks() {
			let e = this.parent, t = this.index();
			if (e.content.size == 0) return S.none;
			if (this.textOffset) return e.child(t).marks;
			let n = e.maybeChild(t - 1), r = e.maybeChild(t);
			if (!n) {
				let e = n;
				n = r, r = e;
			}
			let i = n.marks;
			for (var a = 0; a < i.length; a++) i[a].type.spec.inclusive !== !1 || r && i[a].isInSet(r.marks) || (i = i[a--].removeFromSet(i));
			return i;
		}
		marksAcross(e) {
			let t = this.parent.maybeChild(this.index());
			if (!t || !t.isInline) return null;
			let n = t.marks, r = e.parent.maybeChild(e.index());
			for (var i = 0; i < n.length; i++) n[i].type.spec.inclusive !== !1 || r && n[i].isInSet(r.marks) || (n = n[i--].removeFromSet(n));
			return n;
		}
		sharedDepth(e) {
			for (let t = this.depth; t > 0; t--) if (this.start(t) <= e && this.end(t) >= e) return t;
			return 0;
		}
		blockRange(e = this, t) {
			if (e.pos < this.pos) return e.blockRange(this);
			for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--) if (e.pos <= this.end(n) && (!t || t(this.node(n)))) return new Ve(this, e, n);
			return null;
		}
		sameParent(e) {
			return this.pos - this.parentOffset == e.pos - e.parentOffset;
		}
		max(e) {
			return e.pos > this.pos ? e : this;
		}
		min(e) {
			return e.pos < this.pos ? e : this;
		}
		toString() {
			let e = "";
			for (let t = 1; t <= this.depth; t++) e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
			return e + ":" + this.parentOffset;
		}
		static resolve(t, n) {
			if (!(n >= 0 && n <= t.content.size)) throw RangeError("Position " + n + " out of range");
			let r = [], i = 0, a = n;
			for (let e = t;;) {
				let { index: t, offset: n } = e.content.findIndex(a), o = a - n;
				if (r.push(e, t, i + n), !o || (e = e.child(t), e.isText)) break;
				a = o - 1, i += n + 1;
			}
			return new e(n, r, a);
		}
		static resolveCached(t, n) {
			let r = Be.get(t);
			if (r) for (let e = 0; e < r.elts.length; e++) {
				let t = r.elts[e];
				if (t.pos == n) return t;
			}
			else Be.set(t, r = new Re());
			let i = r.elts[r.i] = e.resolve(t, n);
			return r.i = (r.i + 1) % ze, i;
		}
	}, Re = class {
		constructor() {
			this.elts = [], this.i = 0;
		}
	}, ze = 12, Be = /* @__PURE__ */ new WeakMap(), Ve = class {
		constructor(e, t, n) {
			this.$from = e, this.$to = t, this.depth = n;
		}
		get start() {
			return this.$from.before(this.depth + 1);
		}
		get end() {
			return this.$to.after(this.depth + 1);
		}
		get parent() {
			return this.$from.node(this.depth);
		}
		get startIndex() {
			return this.$from.index(this.depth);
		}
		get endIndex() {
			return this.$to.indexAfter(this.depth);
		}
	}, He = Object.create(null), Ue = class e {
		constructor(e, t, n, r = S.none) {
			this.type = e, this.attrs = t, this.marks = r, this.content = n || x.empty;
		}
		get children() {
			return this.content.content;
		}
		get nodeSize() {
			return this.isLeaf ? 1 : 2 + this.content.size;
		}
		get childCount() {
			return this.content.childCount;
		}
		child(e) {
			return this.content.child(e);
		}
		maybeChild(e) {
			return this.content.maybeChild(e);
		}
		forEach(e) {
			this.content.forEach(e);
		}
		nodesBetween(e, t, n, r = 0) {
			this.content.nodesBetween(e, t, n, r, this);
		}
		descendants(e) {
			this.nodesBetween(0, this.content.size, e);
		}
		get textContent() {
			return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
		}
		textBetween(e, t, n, r) {
			return this.content.textBetween(e, t, n, r);
		}
		get firstChild() {
			return this.content.firstChild;
		}
		get lastChild() {
			return this.content.lastChild;
		}
		eq(e) {
			return this == e || this.sameMarkup(e) && this.content.eq(e.content);
		}
		sameMarkup(e) {
			return this.hasMarkup(e.type, e.attrs, e.marks);
		}
		hasMarkup(e, t, n) {
			return this.type == e && f(this.attrs, t || e.defaultAttrs || He) && S.sameSet(this.marks, n || S.none);
		}
		copy(t = null) {
			return t == this.content ? this : new e(this.type, this.attrs, t, this.marks);
		}
		mark(t) {
			return t == this.marks ? this : new e(this.type, this.attrs, this.content, t);
		}
		cut(e, t = this.content.size) {
			return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
		}
		slice(e, t = this.content.size, n = !1) {
			if (e == t) return C.empty;
			let r = this.resolve(e), i = this.resolve(t), a = n ? 0 : r.sharedDepth(t), o = r.start(a), s = r.node(a).content.cut(r.pos - o, i.pos - o);
			return new C(s, r.depth - a, i.depth - a);
		}
		replace(e, t, n) {
			return h(this.resolve(e), this.resolve(t), n);
		}
		nodeAt(e) {
			for (let t = this;;) {
				let { index: n, offset: r } = t.content.findIndex(e);
				if (t = t.maybeChild(n), !t) return null;
				if (r == e || t.isText) return t;
				e -= r + 1;
			}
		}
		childAfter(e) {
			let { index: t, offset: n } = this.content.findIndex(e);
			return {
				node: this.content.maybeChild(t),
				index: t,
				offset: n
			};
		}
		childBefore(e) {
			if (e == 0) return {
				node: null,
				index: 0,
				offset: 0
			};
			let { index: t, offset: n } = this.content.findIndex(e);
			if (n < e) return {
				node: this.content.child(t),
				index: t,
				offset: n
			};
			let r = this.content.child(t - 1);
			return {
				node: r,
				index: t - 1,
				offset: n - r.nodeSize
			};
		}
		resolve(e) {
			return Le.resolveCached(this, e);
		}
		resolveNoCache(e) {
			return Le.resolve(this, e);
		}
		rangeHasMark(e, t, n) {
			let r = !1;
			return t > e && this.nodesBetween(e, t, (e) => (n.isInSet(e.marks) && (r = !0), !r)), r;
		}
		get isBlock() {
			return this.type.isBlock;
		}
		get isTextblock() {
			return this.type.isTextblock;
		}
		get inlineContent() {
			return this.type.inlineContent;
		}
		get isInline() {
			return this.type.isInline;
		}
		get isText() {
			return this.type.isText;
		}
		get isLeaf() {
			return this.type.isLeaf;
		}
		get isAtom() {
			return this.type.isAtom;
		}
		toString() {
			if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
			let e = this.type.name;
			return this.content.size && (e += "(" + this.content.toStringInner() + ")"), ie(this.marks, e);
		}
		contentMatchAt(e) {
			let t = this.type.contentMatch.matchFragment(this.content, 0, e);
			if (!t) throw Error("Called contentMatchAt on a node with invalid content");
			return t;
		}
		canReplace(e, t, n = x.empty, r = 0, i = n.childCount) {
			let a = this.contentMatchAt(e).matchFragment(n, r, i), o = a && a.matchFragment(this.content, t);
			if (!o || !o.validEnd) return !1;
			for (let e = r; e < i; e++) if (!this.type.allowsMarks(n.child(e).marks)) return !1;
			return !0;
		}
		canReplaceWith(e, t, n, r) {
			if (r && !this.type.allowsMarks(r)) return !1;
			let i = this.contentMatchAt(e).matchType(n), a = i && i.matchFragment(this.content, t);
			return a ? a.validEnd : !1;
		}
		canAppend(e) {
			return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
		}
		check() {
			this.type.checkContent(this.content), ae(this.type.attrs, this.attrs, "node", this.type.name);
			let e = S.none;
			for (let t = 0; t < this.marks.length; t++) {
				let n = this.marks[t];
				ae(n.type.attrs, n.attrs, "mark", n.type.name), e = n.addToSet(e);
			}
			if (!S.sameSet(e, this.marks)) throw RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
			this.content.forEach((e) => e.check());
		}
		toJSON() {
			let e = { type: this.type.name };
			for (let t in this.attrs) {
				e.attrs = this.attrs;
				break;
			}
			return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((e) => e.toJSON())), e;
		}
		static fromJSON(e, t) {
			if (!t) throw RangeError("Invalid input for Node.fromJSON");
			let n;
			if (t.marks) {
				if (!Array.isArray(t.marks)) throw RangeError("Invalid mark data for Node.fromJSON");
				n = t.marks.map(e.markFromJSON);
			}
			if (t.type == "text") {
				if (typeof t.text != "string") throw RangeError("Invalid text node in JSON");
				return e.text(t.text, n);
			}
			let r = x.fromJSON(e, t.content);
			return e.nodeType(t.type).create(t.attrs, r, n);
		}
	}, Ue.prototype.text = void 0, We = class e extends Ue {
		constructor(e, t, n, r) {
			if (super(e, t, null, r), !n) throw RangeError("Empty text nodes are not allowed");
			this.text = n;
		}
		toString() {
			return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ie(this.marks, JSON.stringify(this.text));
		}
		get textContent() {
			return this.text;
		}
		textBetween(e, t) {
			return this.text.slice(e, t);
		}
		get nodeSize() {
			return this.text.length;
		}
		mark(t) {
			return t == this.marks ? this : new e(this.type, this.attrs, this.text, t);
		}
		withText(t) {
			return t == this.text ? this : new e(this.type, this.attrs, t, this.marks);
		}
		cut(e = 0, t = this.text.length) {
			return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
		}
		eq(e) {
			return this.sameMarkup(e) && this.text == e.text;
		}
		toJSON() {
			let e = super.toJSON();
			return e.text = this.text, e;
		}
	}, Ge = class e {
		constructor(e) {
			this.validEnd = e, this.next = [], this.wrapCache = [];
		}
		static parse(t, n) {
			let r = new Ke(t, n);
			if (r.next == null) return e.empty;
			let i = oe(r);
			r.next && r.err("Unexpected trailing text");
			let a = ge(pe(i));
			return _e(a, r), a;
		}
		matchType(e) {
			for (let t = 0; t < this.next.length; t++) if (this.next[t].type == e) return this.next[t].next;
			return null;
		}
		matchFragment(e, t = 0, n = e.childCount) {
			let r = this;
			for (let i = t; r && i < n; i++) r = r.matchType(e.child(i).type);
			return r;
		}
		get inlineContent() {
			return this.next.length != 0 && this.next[0].type.isInline;
		}
		get defaultType() {
			for (let e = 0; e < this.next.length; e++) {
				let { type: t } = this.next[e];
				if (!(t.isText || t.hasRequiredAttrs())) return t;
			}
			return null;
		}
		compatible(e) {
			for (let t = 0; t < this.next.length; t++) for (let n = 0; n < e.next.length; n++) if (this.next[t].type == e.next[n].type) return !0;
			return !1;
		}
		fillBefore(e, t = !1, n = 0) {
			let r = [this];
			function i(a, o) {
				let s = a.matchFragment(e, n);
				if (s && (!t || s.validEnd)) return x.from(o.map((e) => e.createAndFill()));
				for (let e = 0; e < a.next.length; e++) {
					let { type: t, next: n } = a.next[e];
					if (!(t.isText || t.hasRequiredAttrs()) && r.indexOf(n) == -1) {
						r.push(n);
						let e = i(n, o.concat(t));
						if (e) return e;
					}
				}
				return null;
			}
			return i(this, []);
		}
		findWrapping(e) {
			for (let t = 0; t < this.wrapCache.length; t += 2) if (this.wrapCache[t] == e) return this.wrapCache[t + 1];
			let t = this.computeWrapping(e);
			return this.wrapCache.push(e, t), t;
		}
		computeWrapping(e) {
			let t = Object.create(null), n = [{
				match: this,
				type: null,
				via: null
			}];
			for (; n.length;) {
				let r = n.shift(), i = r.match;
				if (i.matchType(e)) {
					let e = [];
					for (let t = r; t.type; t = t.via) e.push(t.type);
					return e.reverse();
				}
				for (let e = 0; e < i.next.length; e++) {
					let { type: a, next: o } = i.next[e];
					a.isLeaf || a.hasRequiredAttrs() || a.name in t || r.type && !o.validEnd || (n.push({
						match: a.contentMatch,
						type: a,
						via: r
					}), t[a.name] = !0);
				}
			}
			return null;
		}
		get edgeCount() {
			return this.next.length;
		}
		edge(e) {
			if (e >= this.next.length) throw RangeError(`There's no ${e}th edge in this content match`);
			return this.next[e];
		}
		toString() {
			let e = [];
			function t(n) {
				e.push(n);
				for (let r = 0; r < n.next.length; r++) e.indexOf(n.next[r].next) == -1 && t(n.next[r].next);
			}
			return t(this), e.map((t, n) => {
				let r = n + (t.validEnd ? "*" : " ") + " ";
				for (let n = 0; n < t.next.length; n++) r += (n ? ", " : "") + t.next[n].type.name + "->" + e.indexOf(t.next[n].next);
				return r;
			}).join("\n");
		}
	}, Ge.empty = new Ge(!0), Ke = class {
		constructor(e, t) {
			this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
		}
		get next() {
			return this.tokens[this.pos];
		}
		eat(e) {
			return this.next == e && (this.pos++ || !0);
		}
		err(e) {
			throw SyntaxError(e + " (in content expression '" + this.string + "')");
		}
	}, qe = class e {
		constructor(e, t, n) {
			this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = be(e, n.attrs), this.defaultAttrs = ve(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
		}
		get isInline() {
			return !this.isBlock;
		}
		get isTextblock() {
			return this.isBlock && this.inlineContent;
		}
		get isLeaf() {
			return this.contentMatch == Ge.empty;
		}
		get isAtom() {
			return this.isLeaf || !!this.spec.atom;
		}
		isInGroup(e) {
			return this.groups.indexOf(e) > -1;
		}
		get whitespace() {
			return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
		}
		hasRequiredAttrs() {
			for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
			return !1;
		}
		compatibleContent(e) {
			return this == e || this.contentMatch.compatible(e.contentMatch);
		}
		computeAttrs(e) {
			return !e && this.defaultAttrs ? this.defaultAttrs : ye(this.attrs, e);
		}
		create(e = null, t, n) {
			if (this.isText) throw Error("NodeType.create can't construct text nodes");
			return new Ue(this, this.computeAttrs(e), x.from(t), S.setFrom(n));
		}
		createChecked(e = null, t, n) {
			return t = x.from(t), this.checkContent(t), new Ue(this, this.computeAttrs(e), t, S.setFrom(n));
		}
		createAndFill(e = null, t, n) {
			if (e = this.computeAttrs(e), t = x.from(t), t.size) {
				let e = this.contentMatch.fillBefore(t);
				if (!e) return null;
				t = e.append(t);
			}
			let r = this.contentMatch.matchFragment(t), i = r && r.fillBefore(x.empty, !0);
			return i ? new Ue(this, e, t.append(i), S.setFrom(n)) : null;
		}
		validContent(e) {
			let t = this.contentMatch.matchFragment(e);
			if (!t || !t.validEnd) return !1;
			for (let t = 0; t < e.childCount; t++) if (!this.allowsMarks(e.child(t).marks)) return !1;
			return !0;
		}
		checkContent(e) {
			if (!this.validContent(e)) throw RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
		}
		checkAttrs(e) {}
		allowsMarkType(e) {
			return this.markSet == null || this.markSet.indexOf(e) > -1;
		}
		allowsMarks(e) {
			if (this.markSet == null) return !0;
			for (let t = 0; t < e.length; t++) if (!this.allowsMarkType(e[t].type)) return !1;
			return !0;
		}
		allowedMarks(e) {
			if (this.markSet == null) return e;
			let t;
			for (let n = 0; n < e.length; n++) this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t ||= e.slice(0, n);
			return t ? t.length ? t : S.none : e;
		}
		static compile(t, n) {
			let r = Object.create(null);
			t.forEach((t, i) => r[t] = new e(t, n, i));
			let i = n.spec.topNode || "doc";
			if (!r[i]) throw RangeError("Schema is missing its top node type ('" + i + "')");
			if (!r.text) throw RangeError("Every schema needs a 'text' type");
			for (let e in r.text.attrs) throw RangeError("The text node type should not have attributes");
			return r;
		}
	}, Je = class {
		constructor(e, t, n) {
			this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? xe(e, t, n.validate) : n.validate;
		}
		get isRequired() {
			return !this.hasDefault;
		}
	}, Ye = class e {
		constructor(e, t, n, r) {
			this.name = e, this.rank = t, this.schema = n, this.spec = r, this.attrs = be(e, r.attrs), this.excluded = null;
			let i = ve(this.attrs);
			this.instance = i ? new S(this, i) : null;
		}
		create(e = null) {
			return !e && this.instance ? this.instance : new S(this, ye(this.attrs, e));
		}
		static compile(t, n) {
			let r = Object.create(null), i = 0;
			return t.forEach((t, a) => r[t] = new e(t, i++, n, a)), r;
		}
		removeFromSet(e) {
			for (var t = 0; t < e.length; t++) e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
			return e;
		}
		isInSet(e) {
			for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
		}
		excludes(e) {
			return this.excluded.indexOf(e) > -1;
		}
	}, Xe = class {
		constructor(e) {
			this.linebreakReplacement = null, this.cached = Object.create(null);
			let t = this.spec = {};
			for (let n in e) t[n] = e[n];
			t.nodes = a.from(e.nodes), t.marks = a.from(e.marks || {}), this.nodes = qe.compile(this.spec.nodes, this), this.marks = Ye.compile(this.spec.marks, this);
			let n = Object.create(null);
			for (let e in this.nodes) {
				if (e in this.marks) throw RangeError(e + " can not be both a node and a mark");
				let t = this.nodes[e], r = t.spec.content || "", i = t.spec.marks;
				if (t.contentMatch = n[r] || (n[r] = Ge.parse(r, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.spec.linebreakReplacement) {
					if (this.linebreakReplacement) throw RangeError("Multiple linebreak nodes defined");
					if (!t.isInline || !t.isLeaf) throw RangeError("Linebreak replacement nodes must be inline leaf nodes");
					this.linebreakReplacement = t;
				}
				t.markSet = i == "_" ? null : i ? Se(this, i.split(" ")) : i == "" || !t.inlineContent ? [] : null;
			}
			for (let e in this.marks) {
				let t = this.marks[e], n = t.spec.excludes;
				t.excluded = n == null ? [t] : n == "" ? [] : Se(this, n.split(" "));
			}
			this.nodeFromJSON = (e) => Ue.fromJSON(this, e), this.markFromJSON = (e) => S.fromJSON(this, e), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = Object.create(null);
		}
		node(e, t = null, n, r) {
			if (typeof e == "string") e = this.nodeType(e);
			else if (!(e instanceof qe)) throw RangeError("Invalid node type: " + e);
			else if (e.schema != this) throw RangeError("Node type from different schema used (" + e.name + ")");
			return e.createChecked(t, n, r);
		}
		text(e, t) {
			let n = this.nodes.text;
			return new We(n, n.defaultAttrs, e, S.setFrom(t));
		}
		mark(e, t) {
			return typeof e == "string" && (e = this.marks[e]), e.create(t);
		}
		nodeType(e) {
			let t = this.nodes[e];
			if (!t) throw RangeError("Unknown node type: " + e);
			return t;
		}
	}, Ze = class e {
		constructor(e, t) {
			this.schema = e, this.rules = t, this.tags = [], this.styles = [];
			let n = this.matchedStyles = [];
			t.forEach((e) => {
				if (Ce(e)) this.tags.push(e);
				else if (we(e)) {
					let t = /[^=]*/.exec(e.style)[0];
					n.indexOf(t) < 0 && n.push(t), this.styles.push(e);
				}
			}), this.normalizeLists = !this.tags.some((t) => {
				if (!/^(ul|ol)\b/.test(t.tag) || !t.node) return !1;
				let n = e.nodes[t.node];
				return n.contentMatch.matchType(n);
			});
		}
		parse(e, t = {}) {
			let n = new at(this, t, !1);
			return n.addAll(e, S.none, t.from, t.to), n.finish();
		}
		parseSlice(e, t = {}) {
			let n = new at(this, t, !0);
			return n.addAll(e, S.none, t.from, t.to), C.maxOpen(n.finish());
		}
		matchTag(e, t, n) {
			for (let r = n ? this.tags.indexOf(n) + 1 : 0; r < this.tags.length; r++) {
				let n = this.tags[r];
				if (De(e, n.tag) && (n.namespace === void 0 || e.namespaceURI == n.namespace) && (!n.context || t.matchesContext(n.context))) {
					if (n.getAttrs) {
						let t = n.getAttrs(e);
						if (t === !1) continue;
						n.attrs = t || void 0;
					}
					return n;
				}
			}
		}
		matchStyle(e, t, n, r) {
			for (let i = r ? this.styles.indexOf(r) + 1 : 0; i < this.styles.length; i++) {
				let r = this.styles[i], a = r.style;
				if (!(a.indexOf(e) != 0 || r.context && !n.matchesContext(r.context) || a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
					if (r.getAttrs) {
						let e = r.getAttrs(t);
						if (e === !1) continue;
						r.attrs = e || void 0;
					}
					return r;
				}
			}
		}
		static schemaRules(e) {
			let t = [];
			function n(e) {
				let n = e.priority == null ? 50 : e.priority, r = 0;
				for (; r < t.length; r++) {
					let e = t[r];
					if ((e.priority == null ? 50 : e.priority) < n) break;
				}
				t.splice(r, 0, e);
			}
			for (let t in e.marks) {
				let r = e.marks[t].spec.parseDOM;
				r && r.forEach((e) => {
					n(e = Oe(e)), e.mark || e.ignore || e.clearMark || (e.mark = t);
				});
			}
			for (let t in e.nodes) {
				let r = e.nodes[t].spec.parseDOM;
				r && r.forEach((e) => {
					n(e = Oe(e)), e.node || e.ignore || e.mark || (e.node = t);
				});
			}
			return t;
		}
		static fromSchema(t) {
			return t.cached.domParser || (t.cached.domParser = new e(t, e.schemaRules(t)));
		}
	}, Qe = {
		address: !0,
		article: !0,
		aside: !0,
		blockquote: !0,
		body: !0,
		canvas: !0,
		dd: !0,
		div: !0,
		dl: !0,
		fieldset: !0,
		figcaption: !0,
		figure: !0,
		footer: !0,
		form: !0,
		h1: !0,
		h2: !0,
		h3: !0,
		h4: !0,
		h5: !0,
		h6: !0,
		header: !0,
		hgroup: !0,
		hr: !0,
		li: !0,
		noscript: !0,
		ol: !0,
		output: !0,
		p: !0,
		pre: !0,
		section: !0,
		table: !0,
		tfoot: !0,
		ul: !0
	}, $e = {
		head: !0,
		noscript: !0,
		object: !0,
		script: !0,
		style: !0,
		title: !0
	}, et = {
		ol: !0,
		ul: !0
	}, tt = 1, nt = 2, rt = 4, it = class {
		constructor(e, t, n, r, i, a) {
			this.type = e, this.attrs = t, this.marks = n, this.solid = r, this.options = a, this.content = [], this.activeMarks = S.none, this.match = i || (a & rt ? null : e.contentMatch);
		}
		findWrapping(e) {
			if (!this.match) {
				if (!this.type) return [];
				let t = this.type.contentMatch.fillBefore(x.from(e));
				if (t) this.match = this.type.contentMatch.matchFragment(t);
				else {
					let t = this.type.contentMatch, n;
					return (n = t.findWrapping(e.type)) ? (this.match = t, n) : null;
				}
			}
			return this.match.findWrapping(e.type);
		}
		finish(e) {
			if (!(this.options & tt)) {
				let e = this.content[this.content.length - 1], t;
				if (e && e.isText && (t = /[ \t\r\n\u000c]+$/.exec(e.text))) {
					let n = e;
					e.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = n.withText(n.text.slice(0, n.text.length - t[0].length));
				}
			}
			let t = x.from(this.content);
			return !e && this.match && (t = t.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
		}
		inlineContext(e) {
			return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Qe.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
		}
	}, at = class {
		constructor(e, t, n) {
			this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
			let r = t.topNode, i, a = Te(null, t.preserveWhitespace, 0) | (n ? rt : 0);
			i = r ? new it(r.type, r.attrs, S.none, !0, t.topMatch || r.type.contentMatch, a) : n ? new it(null, null, S.none, !0, null, a) : new it(e.schema.topNodeType, null, S.none, !0, null, a), this.nodes = [i], this.find = t.findPositions, this.needsBlock = !1;
		}
		get top() {
			return this.nodes[this.open];
		}
		addDOM(e, t) {
			e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
		}
		addTextNode(e, t) {
			let n = e.nodeValue, r = this.top, i = r.options & nt ? "full" : this.localPreserveWS || (r.options & tt) > 0, { schema: a } = this.parser;
			if (i === "full" || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
				if (!i) {
					if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
						let t = r.content[r.content.length - 1], i = e.previousSibling;
						(!t || i && i.nodeName == "BR" || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (n = n.slice(1));
					}
				} else if (i === "full") n = n.replace(/\r\n?/g, "\n");
				else if (a.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(a.linebreakReplacement.create())) {
					let e = n.split(/\r?\n|\r/);
					for (let n = 0; n < e.length; n++) n && this.insertNode(a.linebreakReplacement.create(), t, !0), e[n] && this.insertNode(a.text(e[n]), t, !/\S/.test(e[n]));
					n = "";
				} else n = n.replace(/\r?\n|\r/g, " ");
				n && this.insertNode(a.text(n), t, !/\S/.test(n)), this.findInText(e);
			} else this.findInside(e);
		}
		addElement(e, t, n) {
			let r = this.localPreserveWS, i = this.top;
			(e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
			let a = e.nodeName.toLowerCase(), o;
			et.hasOwnProperty(a) && this.parser.normalizeLists && Ee(e);
			let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, n));
			out: if (s ? s.ignore : $e.hasOwnProperty(a)) this.findInside(e), this.ignoreFallback(e, t);
			else if (!s || s.skip || s.closeParent) {
				s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
				let n, r = this.needsBlock;
				if (Qe.hasOwnProperty(a)) i.content.length && i.content[0].isInline && this.open && (this.open--, i = this.top), n = !0, i.type || (this.needsBlock = !0);
				else if (!e.firstChild) {
					this.leafFallback(e, t);
					break out;
				}
				let o = s && s.skip ? t : this.readStyles(e, t);
				o && this.addAll(e, o), n && this.sync(i), this.needsBlock = r;
			} else {
				let n = this.readStyles(e, t);
				n && this.addElementByRule(e, s, n, s.consuming === !1 ? o : void 0);
			}
			this.localPreserveWS = r;
		}
		leafFallback(e, t) {
			e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode("\n"), t);
		}
		ignoreFallback(e, t) {
			e.nodeName != "BR" || this.top.type && this.top.type.inlineContent || this.findPlace(this.parser.schema.text("-"), t, !0);
		}
		readStyles(e, t) {
			let n = e.style;
			if (n && n.length) for (let e = 0; e < this.parser.matchedStyles.length; e++) {
				let r = this.parser.matchedStyles[e], i = n.getPropertyValue(r);
				if (i) for (let e;;) {
					let n = this.parser.matchStyle(r, i, this, e);
					if (!n) break;
					if (n.ignore) return null;
					if (t = n.clearMark ? t.filter((e) => !n.clearMark(e)) : t.concat(this.parser.schema.marks[n.mark].create(n.attrs)), n.consuming === !1) e = n;
					else break;
				}
			}
			return t;
		}
		addElementByRule(e, t, n, r) {
			let i, a;
			if (t.node) {
				if (a = this.parser.schema.nodes[t.node], a.isLeaf) this.insertNode(a.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
				else {
					let e = this.enter(a, t.attrs || null, n, t.preserveWhitespace);
					e && (i = !0, n = e);
				}
			} else {
				let e = this.parser.schema.marks[t.mark];
				n = n.concat(e.create(t.attrs));
			}
			let o = this.top;
			if (a && a.isLeaf) this.findInside(e);
			else if (r) this.addElement(e, n, r);
			else if (t.getContent) this.findInside(e), t.getContent(e, this.parser.schema).forEach((e) => this.insertNode(e, n, !1));
			else {
				let r = e;
				typeof t.contentElement == "string" ? r = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? r = t.contentElement(e) : t.contentElement && (r = t.contentElement), this.findAround(e, r, !0), this.addAll(r, n), this.findAround(e, r, !1);
			}
			i && this.sync(o) && this.open--;
		}
		addAll(e, t, n, r) {
			let i = n || 0;
			for (let a = n ? e.childNodes[n] : e.firstChild, o = r == null ? null : e.childNodes[r]; a != o; a = a.nextSibling, ++i) this.findAtPoint(e, i), this.addDOM(a, t);
			this.findAtPoint(e, i);
		}
		findPlace(e, t, n) {
			let r, i;
			for (let t = this.open, a = 0; t >= 0; t--) {
				let o = this.nodes[t], s = o.findWrapping(e);
				if (s && (!r || r.length > s.length + a) && (r = s, i = o, !s.length)) break;
				if (o.solid) {
					if (n) break;
					a += 2;
				}
			}
			if (!r) return null;
			this.sync(i);
			for (let e = 0; e < r.length; e++) t = this.enterInner(r[e], null, t, !1);
			return t;
		}
		insertNode(e, t, n) {
			if (e.isInline && this.needsBlock && !this.top.type) {
				let e = this.textblockFromContext();
				e && (t = this.enterInner(e, null, t));
			}
			let r = this.findPlace(e, t, n);
			if (r) {
				this.closeExtra();
				let t = this.top;
				t.match &&= t.match.matchType(e.type);
				let n = S.none;
				for (let i of r.concat(e.marks)) (t.type ? t.type.allowsMarkType(i.type) : ke(i.type, e.type)) && (n = i.addToSet(n));
				return t.content.push(e.mark(n)), !0;
			}
			return !1;
		}
		enter(e, t, n, r) {
			let i = this.findPlace(e.create(t), n, !1);
			return i &&= this.enterInner(e, t, n, !0, r), i;
		}
		enterInner(e, t, n, r = !1, i) {
			this.closeExtra();
			let a = this.top;
			a.match = a.match && a.match.matchType(e);
			let o = Te(e, i, a.options);
			a.options & rt && a.content.length == 0 && (o |= rt);
			let s = S.none;
			return n = n.filter((t) => !(a.type ? a.type.allowsMarkType(t.type) : ke(t.type, e)) || (s = t.addToSet(s), !1)), this.nodes.push(new it(e, t, s, r, null, o)), this.open++, n;
		}
		closeExtra(e = !1) {
			let t = this.nodes.length - 1;
			if (t > this.open) {
				for (; t > this.open; t--) this.nodes[t - 1].content.push(this.nodes[t].finish(e));
				this.nodes.length = this.open + 1;
			}
		}
		finish() {
			return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
		}
		sync(e) {
			for (let t = this.open; t >= 0; t--) if (this.nodes[t] == e) return this.open = t, !0;
			else this.localPreserveWS && (this.nodes[t].options |= tt);
			return !1;
		}
		get currentPos() {
			this.closeExtra();
			let e = 0;
			for (let t = this.open; t >= 0; t--) {
				let n = this.nodes[t].content;
				for (let t = n.length - 1; t >= 0; t--) e += n[t].nodeSize;
				t && e++;
			}
			return e;
		}
		findAtPoint(e, t) {
			if (this.find) for (let n = 0; n < this.find.length; n++) this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
		}
		findInside(e) {
			if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
		}
		findAround(e, t, n) {
			if (e != t && this.find) for (let r = 0; r < this.find.length; r++) this.find[r].pos == null && e.nodeType == 1 && e.contains(this.find[r].node) && t.compareDocumentPosition(this.find[r].node) & (n ? 2 : 4) && (this.find[r].pos = this.currentPos);
		}
		findInText(e) {
			if (this.find) for (let t = 0; t < this.find.length; t++) this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
		}
		matchesContext(e) {
			if (e.indexOf("|") > -1) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
			let t = e.split("/"), n = this.options.context, r = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), i = -(n ? n.depth + 1 : 0) + +!r, a = (e, o) => {
				for (; e >= 0; e--) {
					let s = t[e];
					if (s == "") {
						if (e == t.length - 1 || e == 0) continue;
						for (; o >= i; o--) if (a(e - 1, o)) return !0;
						return !1;
					}
					{
						let e = o > 0 || o == 0 && r ? this.nodes[o].type : n && o >= i ? n.node(o - i).type : null;
						if (!e || e.name != s && !e.isInGroup(s)) return !1;
						o--;
					}
				}
				return !0;
			};
			return a(t.length - 1, this.open);
		}
		textblockFromContext() {
			let e = this.options.context;
			if (e) for (let t = e.depth; t >= 0; t--) {
				let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
				if (n && n.isTextblock && n.defaultAttrs) return n;
			}
			for (let e in this.parser.schema.nodes) {
				let t = this.parser.schema.nodes[e];
				if (t.isTextblock && t.defaultAttrs) return t;
			}
		}
	}, ot = class e {
		constructor(e, t) {
			this.nodes = e, this.marks = t;
		}
		serializeFragment(e, t = {}, n) {
			n ||= je(t).createDocumentFragment();
			let r = n, i = [];
			return e.forEach((e) => {
				if (i.length || e.marks.length) {
					let n = 0, a = 0;
					for (; n < i.length && a < e.marks.length;) {
						let t = e.marks[a];
						if (!this.marks[t.type.name]) a++;
						else {
							if (!t.eq(i[n][0]) || t.type.spec.spanning === !1) break;
							n++, a++;
						}
					}
					for (; n < i.length;) r = i.pop()[1];
					for (; a < e.marks.length;) {
						let n = e.marks[a++], o = this.serializeMark(n, e.isInline, t);
						o && (i.push([n, r]), r.appendChild(o.dom), r = o.contentDOM || o.dom);
					}
				}
				r.appendChild(this.serializeNodeInner(e, t));
			}), n;
		}
		serializeNodeInner(e, t) {
			if (e.isText) return je(t).createTextNode(e.text);
			let { dom: n, contentDOM: r } = Pe(je(t), this.nodes[e.type.name](e), null, e.attrs);
			if (r) {
				if (e.isLeaf) throw RangeError("Content hole not allowed in a leaf node spec");
				this.serializeFragment(e.content, t, r);
			}
			return n;
		}
		serializeNode(e, t = {}) {
			let n = this.serializeNodeInner(e, t);
			for (let r = e.marks.length - 1; r >= 0; r--) {
				let i = this.serializeMark(e.marks[r], e.isInline, t);
				i && ((i.contentDOM || i.dom).appendChild(n), n = i.dom);
			}
			return n;
		}
		serializeMark(e, t, n = {}) {
			let r = this.marks[e.type.name];
			return r && Pe(je(n), r(e, t), null, e.attrs);
		}
		static renderSpec(e, t, n = null, r) {
			return typeof t == "string" ? { dom: e.createTextNode(t) } : Pe(e, t, n, r);
		}
		static fromSchema(t) {
			return t.cached.domSerializer || (t.cached.domSerializer = new e(this.nodesFromSchema(t), this.marksFromSchema(t)));
		}
		static nodesFromSchema(e) {
			let t = Ae(e.nodes);
			return t.text ||= (e) => e.text, t;
		}
		static marksFromSchema(e) {
			return Ae(e.marks);
		}
	}, st = /* @__PURE__ */ new WeakMap();
}));
// node_modules/prosemirror-transform/dist/index.js
function lt(e, t) {
	return e + t * nn;
}
function ut(e) {
	return e & tn;
}
function dt(e) {
	return (e - (e & tn)) / nn;
}
function ft(e, t, n) {
	let r = [];
	for (let i = 0; i < e.childCount; i++) {
		let a = e.child(i);
		a.content.size && (a = a.copy(ft(a.content, t, a))), a.isInline && (a = t(a, n, i)), r.push(a);
	}
	return x.fromArray(r);
}
function pt(e, t, n, r, i) {
	let a = i.length ? i[i.length - 1] : null;
	a && a instanceof e && a.to == t && a.mark.eq(r) ? i[i.length - 1] = new e(a.from, n, r) : i.push(new e(t, n, r));
}
function mt(e, t, n) {
	let r = e.resolve(t), i = n - t, a = r.depth;
	for (; i > 0 && a > 0 && r.indexAfter(a) == r.node(a).childCount;) a--, i--;
	if (i > 0) {
		let e = r.node(a).maybeChild(r.indexAfter(a));
		for (; i > 0;) {
			if (!e || e.isLeaf) return !0;
			e = e.firstChild, i--;
		}
	}
	return !1;
}
function ht(e, t, n, r) {
	let i = [];
	e.doc.nodesBetween(t, n, (e, a, o) => {
		if (!e.isInline) return;
		let s = e.marks;
		if (!r.isInSet(s) && o.type.allowsMarkType(r.type)) {
			let o = Math.max(a, t), s = Math.min(a + e.nodeSize, n);
			pt(pn, o, s, r, i);
		}
	}), i.forEach((t) => e.step(t));
}
function gt(e, t, n, r) {
	let i = [], a = 0;
	e.doc.nodesBetween(t, n, (e, o) => {
		if (!e.isInline || !e.isAtom) return;
		a++;
		let s = null;
		if (r instanceof Ye) {
			let t = e.marks, n;
			for (; n = r.isInSet(t);) (s ||= []).push(n), t = n.removeFromSet(t);
		} else r ? r.isInSet(e.marks) && (s = [r]) : s = e.marks;
		if (s && s.length) {
			let r = Math.min(o + e.nodeSize, n);
			for (let e = 0; e < s.length; e++) {
				let n = s[e], c;
				for (let e = 0; e < i.length; e++) {
					let t = i[e];
					t.step == a - 1 && n.eq(i[e].style) && (c = t);
				}
				c ? (c.to = r, c.step = a) : i.push({
					style: n,
					from: Math.max(o, t),
					to: r,
					step: a
				});
			}
		}
	}), i.forEach((t) => e.step(new mn(t.from, t.to, t.style)));
}
function _t(e, t, n, r = n.contentMatch, i = !0) {
	let a = e.doc.nodeAt(t), o = [], s = t + 1;
	for (let t = 0; t < a.childCount; t++) {
		let c = a.child(t), l = s + c.nodeSize, u = r.matchType(c.type);
		if (!u) o.push(new vn(s, l, C.empty));
		else {
			r = u;
			for (let t = 0; t < c.marks.length; t++) n.allowsMarkType(c.marks[t].type) || e.step(new mn(s, l, c.marks[t]));
			if (i && c.isText && n.whitespace != "pre") {
				let e, t = /\r?\n|\r/g, r;
				for (; e = t.exec(c.text);) r ||= new C(x.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0), o.push(new vn(s + e.index, s + e.index + e[0].length, r));
			}
		}
		s = l;
	}
	if (!r.validEnd) {
		let t = r.fillBefore(x.empty, !0);
		e.replace(s, s, new C(t, 0, 0));
	}
	for (let t = o.length - 1; t >= 0; t--) e.step(o[t]);
}
function vt(e, t, n) {
	return (t == 0 || e.canReplace(t, e.childCount)) && (n == e.childCount || e.canReplace(0, n));
}
function yt(e) {
	let t = e.parent.content.cutByIndex(e.startIndex, e.endIndex);
	for (let n = e.depth, r = 0, i = 0;; --n) {
		let a = e.$from.node(n), o = e.$from.index(n) + r, s = e.$to.indexAfter(n) - i;
		if (n < e.depth && a.canReplace(o, s, t)) return n;
		if (n == 0 || a.type.spec.isolating || !vt(a, o, s)) break;
		o && (r = 1), s < a.childCount && (i = 1);
	}
	return null;
}
function bt(e, t, n) {
	let { $from: r, $to: i, depth: a } = t, o = r.before(a + 1), s = i.after(a + 1), c = o, l = s, u = x.empty, d = 0;
	for (let e = a, t = !1; e > n; e--) t || r.index(e) > 0 ? (t = !0, u = x.from(r.node(e).copy(u)), d++) : c--;
	let f = x.empty, p = 0;
	for (let e = a, t = !1; e > n; e--) t || i.after(e + 1) < i.end(e) ? (t = !0, f = x.from(i.node(e).copy(f)), p++) : l++;
	e.step(new yn(c, l, o, s, new C(u.append(f), d, p), u.size - d, !0));
}
function xt(e, t, n = null, r = e) {
	let i = Ct(e, t), a = i && wt(r, t);
	return a ? i.map(St).concat({
		type: t,
		attrs: n
	}).concat(a.map(St)) : null;
}
function St(e) {
	return {
		type: e,
		attrs: null
	};
}
function Ct(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.contentMatchAt(r).findWrapping(t);
	if (!a) return null;
	let o = a.length ? a[0] : t;
	return n.canReplaceWith(r, i, o) ? a : null;
}
function wt(e, t) {
	let { parent: n, startIndex: r, endIndex: i } = e, a = n.child(r), o = t.contentMatch.findWrapping(a.type);
	if (!o) return null;
	let s = (o.length ? o[o.length - 1] : t).contentMatch;
	for (let e = r; s && e < i; e++) s = s.matchType(n.child(e).type);
	return !s || !s.validEnd ? null : o;
}
function Tt(e, t, n) {
	let r = x.empty;
	for (let e = n.length - 1; e >= 0; e--) {
		if (r.size) {
			let t = n[e].type.contentMatch.matchFragment(r);
			if (!t || !t.validEnd) throw RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
		}
		r = x.from(n[e].type.create(n[e].attrs, r));
	}
	let i = t.start, a = t.end;
	e.step(new yn(i, a, i, a, new C(r, 0, 0), n.length, !0));
}
function Et(e, t, n, r, i) {
	if (!r.isTextblock) throw RangeError("Type given to setBlockType should be a textblock");
	let a = e.steps.length;
	e.doc.nodesBetween(t, n, (t, n) => {
		let o = typeof i == "function" ? i(t) : i;
		if (t.isTextblock && !t.hasMarkup(r, o) && kt(e.doc, e.mapping.slice(a).map(n), r)) {
			let i = null;
			if (r.schema.linebreakReplacement) {
				let e = r.whitespace == "pre", t = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
				e && !t ? i = !1 : !e && t && (i = !0);
			}
			i === !1 && Ot(e, t, n, a), _t(e, e.mapping.slice(a).map(n, 1), r, void 0, i === null);
			let s = e.mapping.slice(a), c = s.map(n, 1), l = s.map(n + t.nodeSize, 1);
			return e.step(new yn(c, l, c + 1, l - 1, new C(x.from(r.create(o, null, t.marks)), 0, 0), 1, !0)), i === !0 && Dt(e, t, n, a), !1;
		}
	});
}
function Dt(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.isText) {
			let o, s = /\r?\n|\r/g;
			for (; o = s.exec(i.text);) {
				let i = e.mapping.slice(r).map(n + 1 + a + o.index);
				e.replaceWith(i, i + 1, t.type.schema.linebreakReplacement.create());
			}
		}
	});
}
function Ot(e, t, n, r) {
	t.forEach((i, a) => {
		if (i.type == i.type.schema.linebreakReplacement) {
			let i = e.mapping.slice(r).map(n + 1 + a);
			e.replaceWith(i, i + 1, t.type.schema.text("\n"));
		}
	});
}
function kt(e, t, n) {
	let r = e.resolve(t), i = r.index();
	return r.parent.canReplaceWith(i, i + 1, n);
}
function At(e, t, n, r, i) {
	let a = e.doc.nodeAt(t);
	if (!a) throw RangeError("No node at given position");
	n ||= a.type;
	let o = n.create(r, null, i || a.marks);
	if (a.isLeaf) return e.replaceWith(t, t + a.nodeSize, o);
	if (!n.validContent(a.content)) throw RangeError("Invalid content for node type " + n.name);
	e.step(new yn(t, t + a.nodeSize, t + 1, t + a.nodeSize - 1, new C(x.from(o), 0, 0), 1, !0));
}
function jt(e, t, n = 1, r) {
	let i = e.resolve(t), a = i.depth - n, o = r && r[r.length - 1] || i.parent;
	if (a < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))) return !1;
	for (let e = i.depth - 1, t = n - 2; e > a; e--, t--) {
		let n = i.node(e), a = i.index(e);
		if (n.type.spec.isolating) return !1;
		let o = n.content.cutByIndex(a, n.childCount), s = r && r[t + 1];
		s && (o = o.replaceChild(0, s.type.create(s.attrs)));
		let c = r && r[t] || n;
		if (!n.canReplace(a + 1, n.childCount) || !c.type.validContent(o)) return !1;
	}
	let s = i.indexAfter(a), c = r && r[0];
	return i.node(a).canReplaceWith(s, s, c ? c.type : i.node(a + 1).type);
}
function Mt(e, t, n = 1, r) {
	let i = e.doc.resolve(t), a = x.empty, o = x.empty;
	for (let e = i.depth, t = i.depth - n, s = n - 1; e > t; e--, s--) {
		a = x.from(i.node(e).copy(a));
		let t = r && r[s];
		o = x.from(t ? t.type.create(t.attrs, o) : i.node(e).copy(o));
	}
	e.step(new vn(t, t, new C(a.append(o), n, n), !0));
}
function Nt(e, t) {
	let n = e.resolve(t), r = n.index();
	return Ft(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function Pt(e, t) {
	t.content.size || e.type.compatibleContent(t.type);
	let n = e.contentMatchAt(e.childCount), { linebreakReplacement: r } = e.type.schema;
	for (let i = 0; i < t.childCount; i++) {
		let a = t.child(i), o = a.type == r ? e.type.schema.nodes.text : a.type;
		if (n = n.matchType(o), !n || !e.type.allowsMarks(a.marks)) return !1;
	}
	return n.validEnd;
}
function Ft(e, t) {
	return !!(e && t && !e.isLeaf && Pt(e, t));
}
function It(e, t, n = -1) {
	let r = e.resolve(t);
	for (let e = r.depth;; e--) {
		let i, a, o = r.index(e);
		if (e == r.depth ? (i = r.nodeBefore, a = r.nodeAfter) : n > 0 ? (i = r.node(e + 1), o++, a = r.node(e).maybeChild(o)) : (i = r.node(e).maybeChild(o - 1), a = r.node(e + 1)), i && !i.isTextblock && Ft(i, a) && r.node(e).canReplace(o, o + 1)) return t;
		if (e == 0) break;
		t = n < 0 ? r.before(e) : r.after(e);
	}
}
function Lt(e, t, n) {
	let r = null, { linebreakReplacement: i } = e.doc.type.schema, a = e.doc.resolve(t - n), o = a.node().type;
	if (i && o.inlineContent) {
		let e = o.whitespace == "pre", t = !!o.contentMatch.matchType(i);
		e && !t ? r = !1 : !e && t && (r = !0);
	}
	let s = e.steps.length;
	if (r === !1) {
		let r = e.doc.resolve(t + n);
		Ot(e, r.node(), r.before(), s);
	}
	o.inlineContent && _t(e, t + n - 1, o, a.node().contentMatchAt(a.index()), r == null);
	let c = e.mapping.slice(s), l = c.map(t - n);
	if (e.step(new vn(l, c.map(t + n, -1), C.empty, !0)), r === !0) {
		let t = e.doc.resolve(l);
		Dt(e, t.node(), t.before(), e.steps.length);
	}
	return e;
}
function Rt(e, t, n) {
	let r = e.resolve(t);
	if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
	if (r.parentOffset == 0) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.index(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.before(e + 1);
		if (t > 0) return null;
	}
	if (r.parentOffset == r.parent.content.size) for (let e = r.depth - 1; e >= 0; e--) {
		let t = r.indexAfter(e);
		if (r.node(e).canReplaceWith(t, t, n)) return r.after(e + 1);
		if (t < r.node(e).childCount) return null;
	}
	return null;
}
function zt(e, t, n) {
	let r = e.resolve(t);
	if (!n.content.size) return t;
	let i = n.content;
	for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
	for (let e = 1; e <= (n.openStart == 0 && n.size ? 2 : 1); e++) for (let t = r.depth; t >= 0; t--) {
		let n = t == r.depth ? 0 : r.pos <= (r.start(t + 1) + r.end(t + 1)) / 2 ? -1 : 1, a = r.index(t) + +(n > 0), o = r.node(t), s = !1;
		if (e == 1) s = o.canReplace(a, a, i);
		else {
			let e = o.contentMatchAt(a).findWrapping(i.firstChild.type);
			s = e && o.canReplaceWith(a, a, e[0]);
		}
		if (s) return n == 0 ? r.pos : n < 0 ? r.before(t + 1) : r.after(t + 1);
	}
	return null;
}
function Bt(e, t, n = t, r = C.empty) {
	if (t == n && !r.size) return null;
	let i = e.resolve(t), a = e.resolve(n);
	return Vt(i, a, r) ? new vn(t, n, r) : new bn(i, a, r).fit();
}
function Vt(e, t, n) {
	return !n.openStart && !n.openEnd && e.start() == t.start() && e.parent.canReplace(e.index(), t.index(), n.content);
}
function Ht(e, t, n) {
	return t == 0 ? e.cutByIndex(n, e.childCount) : e.replaceChild(0, e.firstChild.copy(Ht(e.firstChild.content, t - 1, n)));
}
function Ut(e, t, n) {
	return t == 0 ? e.append(n) : e.replaceChild(e.childCount - 1, e.lastChild.copy(Ut(e.lastChild.content, t - 1, n)));
}
function Wt(e, t) {
	for (let n = 0; n < t; n++) e = e.firstChild.content;
	return e;
}
function Gt(e, t, n) {
	if (t <= 0) return e;
	let r = e.content;
	return t > 1 && (r = r.replaceChild(0, Gt(r.firstChild, t - 1, r.childCount == 1 ? n - 1 : 0))), t > 0 && (r = e.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(e.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), e.copy(r);
}
function Kt(e, t, n, r, i) {
	let a = e.node(t), o = i ? e.indexAfter(t) : e.index(t);
	if (o == a.childCount && !n.compatibleContent(a.type)) return null;
	let s = r.fillBefore(a.content, !0, o);
	return s && !qt(n, a.content, o) ? s : null;
}
function qt(e, t, n) {
	for (let r = n; r < t.childCount; r++) if (!e.allowsMarks(t.child(r).marks)) return !0;
	return !1;
}
function Jt(e) {
	return e.spec.defining || e.spec.definingForContent;
}
function Yt(e, t) {
	for (let n = 0;; n++) {
		let r = t < 0 ? e.firstChild : e.lastChild;
		if (!r || r.isAtom) return n;
		e = r.content;
	}
}
function Xt(e, t, n, r) {
	if (!r.size) return e.deleteRange(t, n);
	let i = e.doc.resolve(t), a = e.doc.resolve(n);
	if (Vt(i, a, r)) return e.step(new vn(t, n, r));
	let o = en(i, a);
	o[o.length - 1] == 0 && o.pop();
	let s = -(i.depth + 1);
	o.unshift(s);
	for (let e = i.depth, t = i.pos - 1; e > 0; e--, t--) {
		let n = i.node(e).type.spec;
		if (n.defining || n.definingAsContext || n.isolating) break;
		o.indexOf(e) > -1 ? s = e : i.before(e) == t && o.splice(1, 0, -e);
	}
	let c = o.indexOf(s), l = [], u = r.openStart;
	for (let e = r.content, t = 0;; t++) {
		let n = e.firstChild;
		if (l.push(n), t == r.openStart) break;
		e = n.content;
	}
	for (let e = u - 1; e >= 0; e--) {
		let t = l[e], n = Jt(t.type);
		if (n && !t.sameMarkup(i.node(Math.abs(s) - 1))) u = e;
		else if (n || !t.type.isTextblock) break;
	}
	for (let t = r.openStart; t >= 0; t--) {
		let s = (t + u + 1) % (r.openStart + 1), d = l[s];
		if (d) for (let t = 0; t < o.length; t++) {
			let l = o[(t + c) % o.length], u = !0;
			l < 0 && (u = !1, l = -l);
			let f = i.node(l - 1), p = i.index(l - 1);
			if (f.canReplaceWith(p, p, d.type, d.marks)) return e.replace(i.before(l), u ? a.after(l) : n, new C(Zt(r.content, 0, r.openStart, s), s, r.openEnd));
		}
	}
	let d = e.steps.length;
	for (let s = o.length - 1; s >= 0 && (e.replace(t, n, r), !(e.steps.length > d)); s--) {
		let e = o[s];
		e < 0 || (t = i.before(e), n = a.after(e));
	}
}
function Zt(e, t, n, r, i) {
	if (t < n) {
		let i = e.firstChild;
		e = e.replaceChild(0, i.copy(Zt(i.content, t + 1, n, r, i)));
	}
	if (t > r) {
		let t = i.contentMatchAt(0), n = t.fillBefore(e).append(e);
		e = n.append(t.matchFragment(n).fillBefore(x.empty, !0));
	}
	return e;
}
function Qt(e, t, n, r) {
	if (!r.isInline && t == n && e.doc.resolve(t).parent.content.size) {
		let i = Rt(e.doc, t, r.type);
		i != null && (t = n = i);
	}
	e.replaceRange(t, n, new C(x.from(r), 0, 0));
}
function $t(e, t, n) {
	let r = e.doc.resolve(t), i = e.doc.resolve(n);
	if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
		let a = r.sharedDepth(n), o = !1;
		for (let e = r.depth; e > a; e--) r.node(e).type.spec.isolating && (o = !0);
		for (let e = i.depth; e > a; e--) i.node(e).type.spec.isolating && (o = !0);
		if (!o) {
			for (let e = r.depth; e > 0 && t == r.start(e); e--) t = r.before(e);
			for (let e = i.depth; e > 0 && n == i.start(e); e--) n = i.before(e);
			r = e.doc.resolve(t), i = e.doc.resolve(n);
		}
	}
	let a = en(r, i);
	for (let t = 0; t < a.length; t++) {
		let n = a[t], o = t == a.length - 1;
		if (o && n == 0 || r.node(n).type.contentMatch.validEnd) return e.delete(r.start(n), i.end(n));
		if (n > 0 && (o || r.node(n - 1).canReplace(r.index(n - 1), i.indexAfter(n - 1)))) return e.delete(r.before(n), i.after(n));
	}
	for (let a = 1; a <= r.depth && a <= i.depth; a++) if (t - r.start(a) == r.depth - a && n > r.end(a) && i.end(a) - n != i.depth - a && r.start(a - 1) == i.start(a - 1) && r.node(a - 1).canReplace(r.index(a - 1), i.index(a - 1))) return e.delete(r.before(a), n);
	e.delete(t, n);
}
function en(e, t) {
	let n = [], r = Math.min(e.depth, t.depth);
	for (let i = r; i >= 0; i--) {
		let r = e.start(i);
		if (r < e.pos - (e.depth - i) || t.end(i) > t.pos + (t.depth - i) || e.node(i).type.spec.isolating || t.node(i).type.spec.isolating) break;
		(r == t.start(i) || i == e.depth && i == t.depth && e.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == r - 1) && n.push(i);
	}
	return n;
}
var tn, nn, rn, an, on, sn, cn, ln, un, dn, w, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn, Sn, Cn, wn, Tn = e((() => {
	ct(), tn = 65535, nn = 2 ** 16, rn = 1, an = 2, on = 4, sn = 8, cn = class {
		constructor(e, t, n) {
			this.pos = e, this.delInfo = t, this.recover = n;
		}
		get deleted() {
			return (this.delInfo & sn) > 0;
		}
		get deletedBefore() {
			return (this.delInfo & 5) > 0;
		}
		get deletedAfter() {
			return (this.delInfo & 6) > 0;
		}
		get deletedAcross() {
			return (this.delInfo & on) > 0;
		}
	}, ln = class e {
		constructor(t, n = !1) {
			if (this.ranges = t, this.inverted = n, !t.length && e.empty) return e.empty;
		}
		recover(e) {
			let t = 0, n = ut(e);
			if (!this.inverted) for (let e = 0; e < n; e++) t += this.ranges[e * 3 + 2] - this.ranges[e * 3 + 1];
			return this.ranges[n * 3] + t + dt(e);
		}
		mapResult(e, t = 1) {
			return this._map(e, t, !1);
		}
		map(e, t = 1) {
			return this._map(e, t, !0);
		}
		_map(e, t, n) {
			let r = 0, i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
			for (let o = 0; o < this.ranges.length; o += 3) {
				let s = this.ranges[o] - (this.inverted ? r : 0);
				if (s > e) break;
				let c = this.ranges[o + i], l = this.ranges[o + a], u = s + c;
				if (e <= u) {
					let i = c ? e == s ? -1 : e == u ? 1 : t : t, a = s + r + (i < 0 ? 0 : l);
					if (n) return a;
					let d = e == (t < 0 ? s : u) ? null : lt(o / 3, e - s), f = 0;
					return c && (f |= e == s ? an : e == u ? rn : on, (t < 0 ? e != s : e != u) && (f |= sn)), new cn(a, f, d);
				}
				r += l - c;
			}
			return n ? e + r : new cn(e + r, 0, null);
		}
		touches(e, t) {
			let n = 0, r = ut(t), i = this.inverted ? 2 : 1, a = this.inverted ? 1 : 2;
			for (let t = 0; t < this.ranges.length; t += 3) {
				let o = this.ranges[t] - (this.inverted ? n : 0);
				if (o > e) break;
				let s = this.ranges[t + i];
				if (e <= o + s && t == r * 3) return !0;
				n += this.ranges[t + a] - s;
			}
			return !1;
		}
		forEach(e) {
			let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
			for (let r = 0, i = 0; r < this.ranges.length; r += 3) {
				let a = this.ranges[r], o = a - (this.inverted ? i : 0), s = a + (this.inverted ? 0 : i), c = this.ranges[r + t], l = this.ranges[r + n];
				e(o, o + c, s, s + l), i += l - c;
			}
		}
		invert() {
			return new e(this.ranges, !this.inverted);
		}
		toString() {
			return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
		}
		static offset(t) {
			return t == 0 ? e.empty : new e(t < 0 ? [
				0,
				-t,
				0
			] : [
				0,
				0,
				t
			]);
		}
	}, ln.empty = new ln([]), un = class e {
		constructor(e, t, n = 0, r = e ? e.length : 0) {
			this.mirror = t, this.from = n, this.to = r, this._maps = e || [], this.ownData = !(e || t);
		}
		get maps() {
			return this._maps;
		}
		slice(t = 0, n = this.maps.length) {
			return new e(this._maps, this.mirror, t, n);
		}
		appendMap(e, t) {
			this.ownData ||= (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
		}
		appendMapping(e) {
			for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
				let r = e.getMirror(t);
				this.appendMap(e._maps[t], r != null && r < t ? n + r : void 0);
			}
		}
		getMirror(e) {
			if (this.mirror) {
				for (let t = 0; t < this.mirror.length; t++) if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
			}
		}
		setMirror(e, t) {
			this.mirror ||= [], this.mirror.push(e, t);
		}
		appendMappingInverted(e) {
			for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
				let r = e.getMirror(t);
				this.appendMap(e._maps[t].invert(), r != null && r > t ? n - r - 1 : void 0);
			}
		}
		invert() {
			let t = new e();
			return t.appendMappingInverted(this), t;
		}
		map(e, t = 1) {
			if (this.mirror) return this._map(e, t, !0);
			for (let n = this.from; n < this.to; n++) e = this._maps[n].map(e, t);
			return e;
		}
		mapResult(e, t = 1) {
			return this._map(e, t, !1);
		}
		_map(e, t, n) {
			let r = 0;
			for (let n = this.from; n < this.to; n++) {
				let i = this._maps[n].mapResult(e, t);
				if (i.recover != null) {
					let t = this.getMirror(n);
					if (t != null && t > n && t < this.to) {
						n = t, e = this._maps[t].recover(i.recover);
						continue;
					}
				}
				r |= i.delInfo, e = i.pos;
			}
			return n ? e : new cn(e, r, null);
		}
	}, dn = Object.create(null), w = class {
		getMap() {
			return ln.empty;
		}
		merge(e) {
			return null;
		}
		static fromJSON(e, t) {
			if (!t || !t.stepType) throw RangeError("Invalid input for Step.fromJSON");
			let n = dn[t.stepType];
			if (!n) throw RangeError(`No step type ${t.stepType} defined`);
			return n.fromJSON(e, t);
		}
		static jsonID(e, t) {
			if (e in dn) throw RangeError("Duplicate use of step JSON ID " + e);
			return dn[e] = t, t.prototype.jsonID = e, t;
		}
	}, fn = class e {
		constructor(e, t) {
			this.doc = e, this.failed = t;
		}
		static ok(t) {
			return new e(t, null);
		}
		static fail(t) {
			return new e(null, t);
		}
		static fromReplace(t, n, r, i) {
			try {
				return e.ok(t.replace(n, r, i));
			} catch (t) {
				if (t instanceof Ie) return e.fail(t.message);
				throw t;
			}
		}
	}, pn = class e extends w {
		constructor(e, t, n) {
			super(), this.from = e, this.to = t, this.mark = n;
		}
		apply(e) {
			let t = e.slice(this.from, this.to), n = e.resolve(this.from), r = n.node(n.sharedDepth(this.to)), i = new C(ft(t.content, (e, t) => !e.isAtom || !t.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), r), t.openStart, t.openEnd);
			return fn.fromReplace(e, this.from, this.to, i);
		}
		invert(t) {
			let n = [];
			return t.nodesBetween(this.from, this.to, (t, r) => {
				if (t.isInline && t.isAtom) {
					let i = this.mark.addToSet(t.marks);
					if (!S.sameSet(i, t.marks)) {
						let a = Math.max(this.from, r), o = Math.min(this.to, r + t.nodeSize);
						pt(mn, a, o, this.mark, n);
						for (let r of t.marks) r.isInSet(i) || pt(e, a, o, r, n);
					}
				}
			}), n.length == 1 ? n[0] : new hn(n);
		}
		map(t) {
			let n = t.map(this.from, 1), r = t.map(this.to, -1);
			return n >= r ? null : new e(n, r, this.mark);
		}
		merge(t) {
			return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
		}
		toJSON() {
			return {
				stepType: "addMark",
				mark: this.mark.toJSON(),
				from: this.from,
				to: this.to
			};
		}
		static fromJSON(t, n) {
			if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for AddMarkStep.fromJSON");
			return new e(n.from, n.to, t.markFromJSON(n.mark));
		}
	}, w.jsonID("addMark", pn), mn = class e extends w {
		constructor(e, t, n) {
			super(), this.from = e, this.to = t, this.mark = n;
		}
		apply(e) {
			let t = e.slice(this.from, this.to), n = new C(ft(t.content, (e) => e.mark(this.mark.removeFromSet(e.marks)), e), t.openStart, t.openEnd);
			return fn.fromReplace(e, this.from, this.to, n);
		}
		invert(e) {
			let t = [];
			return e.nodesBetween(this.from, this.to, (e, n) => {
				e.isInline && e.isAtom && this.mark.isInSet(e.marks) && pt(pn, Math.max(this.from, n), Math.min(this.to, n + e.nodeSize), this.mark, t);
			}), t.length == 1 ? t[0] : new hn(t);
		}
		map(t) {
			let n = t.map(this.from, 1), r = t.map(this.to, -1);
			return n >= r ? null : new e(n, r, this.mark);
		}
		merge(t) {
			return t instanceof e && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new e(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
		}
		toJSON() {
			return {
				stepType: "removeMark",
				mark: this.mark.toJSON(),
				from: this.from,
				to: this.to
			};
		}
		static fromJSON(t, n) {
			if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for RemoveMarkStep.fromJSON");
			return new e(n.from, n.to, t.markFromJSON(n.mark));
		}
	}, w.jsonID("removeMark", mn), hn = class e extends w {
		constructor(e) {
			super(), this.steps = e;
		}
		apply(e) {
			for (let t of this.steps) {
				let n = t.apply(e);
				if (!n.doc) return n;
				e = n.doc;
			}
			return new fn(e, null);
		}
		invert(t) {
			return new e(this.steps.map((e) => e.invert(t)));
		}
		map(t) {
			let n = [];
			for (let e of this.steps) {
				let r = e.map(t);
				r && n.push(r);
			}
			return n.length ? new e(n) : null;
		}
		toJSON() {
			return {
				stepType: "markSet",
				steps: this.steps.map((e) => e.toJSON())
			};
		}
		static fromJSON(t, n) {
			if (!Array.isArray(n.steps) || !n.steps.every((e) => e.stepType == "addMark" || e.stepType == "removeMark")) throw RangeError("Invalid JSON for MarkSetStep");
			return new e(n.steps.map((e) => w.fromJSON(t, e)));
		}
	}, w.jsonID("markSet", hn), gn = class e extends w {
		constructor(e, t) {
			super(), this.pos = e, this.mark = t;
		}
		apply(e) {
			let t = e.nodeAt(this.pos);
			if (!t) return fn.fail("No node at mark step's position");
			let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
			return fn.fromReplace(e, this.pos, this.pos + 1, new C(x.from(n), 0, +!t.isLeaf));
		}
		invert(t) {
			let n = t.nodeAt(this.pos);
			if (n) {
				let t = this.mark.addToSet(n.marks);
				if (t.length == n.marks.length) {
					for (let r = 0; r < n.marks.length; r++) if (!n.marks[r].isInSet(t)) return new e(this.pos, n.marks[r]);
					return new e(this.pos, this.mark);
				}
			}
			return new _n(this.pos, this.mark);
		}
		map(t) {
			let n = t.mapResult(this.pos, 1);
			return n.deletedAfter ? null : new e(n.pos, this.mark);
		}
		toJSON() {
			return {
				stepType: "addNodeMark",
				pos: this.pos,
				mark: this.mark.toJSON()
			};
		}
		static fromJSON(t, n) {
			if (typeof n.pos != "number") throw RangeError("Invalid input for AddNodeMarkStep.fromJSON");
			return new e(n.pos, t.markFromJSON(n.mark));
		}
	}, w.jsonID("addNodeMark", gn), _n = class e extends w {
		constructor(e, t) {
			super(), this.pos = e, this.mark = t;
		}
		apply(e) {
			let t = e.nodeAt(this.pos);
			if (!t) return fn.fail("No node at mark step's position");
			let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
			return fn.fromReplace(e, this.pos, this.pos + 1, new C(x.from(n), 0, +!t.isLeaf));
		}
		invert(e) {
			let t = e.nodeAt(this.pos);
			return !t || !this.mark.isInSet(t.marks) ? this : new gn(this.pos, this.mark);
		}
		map(t) {
			let n = t.mapResult(this.pos, 1);
			return n.deletedAfter ? null : new e(n.pos, this.mark);
		}
		toJSON() {
			return {
				stepType: "removeNodeMark",
				pos: this.pos,
				mark: this.mark.toJSON()
			};
		}
		static fromJSON(t, n) {
			if (typeof n.pos != "number") throw RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
			return new e(n.pos, t.markFromJSON(n.mark));
		}
	}, w.jsonID("removeNodeMark", _n), vn = class e extends w {
		constructor(e, t, n, r = !1) {
			super(), this.from = e, this.to = t, this.slice = n, this.structure = r;
		}
		apply(e) {
			return this.structure && mt(e, this.from, this.to) ? fn.fail("Structure replace would overwrite content") : fn.fromReplace(e, this.from, this.to, this.slice);
		}
		getMap() {
			return new ln([
				this.from,
				this.to - this.from,
				this.slice.size
			]);
		}
		invert(t) {
			return new e(this.from, this.from + this.slice.size, t.slice(this.from, this.to));
		}
		map(t) {
			let n = t.mapResult(this.to, -1), r = this.from == this.to && e.MAP_BIAS < 0 ? n : t.mapResult(this.from, 1);
			return r.deletedAcross && n.deletedAcross ? null : new e(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
		}
		merge(t) {
			if (!(t instanceof e) || t.structure || this.structure) return null;
			if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
				let n = this.slice.size + t.slice.size == 0 ? C.empty : new C(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
				return new e(this.from, this.to + (t.to - t.from), n, this.structure);
			}
			if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
				let n = this.slice.size + t.slice.size == 0 ? C.empty : new C(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
				return new e(t.from, this.to, n, this.structure);
			}
			return null;
		}
		toJSON() {
			let e = {
				stepType: "replace",
				from: this.from,
				to: this.to
			};
			return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
		}
		static fromJSON(t, n) {
			if (typeof n.from != "number" || typeof n.to != "number") throw RangeError("Invalid input for ReplaceStep.fromJSON");
			return new e(n.from, n.to, C.fromJSON(t, n.slice), !!n.structure);
		}
	}, vn.MAP_BIAS = 1, w.jsonID("replace", vn), yn = class e extends w {
		constructor(e, t, n, r, i, a, o = !1) {
			super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = r, this.slice = i, this.insert = a, this.structure = o;
		}
		apply(e) {
			if (this.structure && (mt(e, this.from, this.gapFrom) || mt(e, this.gapTo, this.to))) return fn.fail("Structure gap-replace would overwrite content");
			let t = e.slice(this.gapFrom, this.gapTo);
			if (t.openStart || t.openEnd) return fn.fail("Gap is not a flat range");
			let n = this.slice.insertAt(this.insert, t.content);
			return n ? fn.fromReplace(e, this.from, this.to, n) : fn.fail("Content does not fit in gap");
		}
		getMap() {
			return new ln([
				this.from,
				this.gapFrom - this.from,
				this.insert,
				this.gapTo,
				this.to - this.gapTo,
				this.slice.size - this.insert
			]);
		}
		invert(t) {
			let n = this.gapTo - this.gapFrom;
			return new e(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
		}
		map(t) {
			let n = t.mapResult(this.from, 1), r = t.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : t.map(this.gapFrom, -1), a = this.to == this.gapTo ? r.pos : t.map(this.gapTo, 1);
			return n.deletedAcross && r.deletedAcross || i < n.pos || a > r.pos || i > a ? null : new e(n.pos, r.pos, i, a, this.slice, this.insert, this.structure);
		}
		toJSON() {
			let e = {
				stepType: "replaceAround",
				from: this.from,
				to: this.to,
				gapFrom: this.gapFrom,
				gapTo: this.gapTo,
				insert: this.insert
			};
			return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
		}
		static fromJSON(t, n) {
			if (typeof n.from != "number" || typeof n.to != "number" || typeof n.gapFrom != "number" || typeof n.gapTo != "number" || typeof n.insert != "number") throw RangeError("Invalid input for ReplaceAroundStep.fromJSON");
			return new e(n.from, n.to, n.gapFrom, n.gapTo, C.fromJSON(t, n.slice), n.insert, !!n.structure);
		}
	}, w.jsonID("replaceAround", yn), bn = class {
		constructor(e, t, n) {
			this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = x.empty;
			for (let t = 0; t <= e.depth; t++) {
				let n = e.node(t);
				this.frontier.push({
					type: n.type,
					match: n.contentMatchAt(e.indexAfter(t))
				});
			}
			for (let t = e.depth; t > 0; t--) this.placed = x.from(e.node(t).copy(this.placed));
		}
		get depth() {
			return this.frontier.length - 1;
		}
		fit() {
			for (; this.unplaced.size;) {
				let e = this.findFittable();
				e ? this.placeNodes(e) : this.openMore() || this.dropNode();
			}
			let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, r = this.close(e < 0 ? this.$to : n.doc.resolve(e));
			if (!r) return null;
			let i = this.placed, a = n.depth, o = r.depth;
			for (; a && o && i.childCount == 1;) i = i.firstChild.content, a--, o--;
			let s = new C(i, a, o);
			return e > -1 ? new yn(n.pos, e, this.$to.pos, this.$to.end(), s, t) : s.size || n.pos != this.$to.pos ? new vn(n.pos, r.pos, s) : null;
		}
		findFittable() {
			let e = this.unplaced.openStart;
			for (let t = this.unplaced.content, n = 0, r = this.unplaced.openEnd; n < e; n++) {
				let i = t.firstChild;
				if (t.childCount > 1 && (r = 0), i.type.spec.isolating && r <= n) {
					e = n;
					break;
				}
				t = i.content;
			}
			for (let t = 1; t <= 2; t++) for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
				let e, r = null;
				n ? (r = Wt(this.unplaced.content, n - 1).firstChild, e = r.content) : e = this.unplaced.content;
				let i = e.firstChild;
				for (let e = this.depth; e >= 0; e--) {
					let { type: a, match: o } = this.frontier[e], s, c = null;
					if (t == 1 && (i ? o.matchType(i.type) || (c = o.fillBefore(x.from(i), !1)) : r && a.compatibleContent(r.type))) return {
						sliceDepth: n,
						frontierDepth: e,
						parent: r,
						inject: c
					};
					if (t == 2 && i && (s = o.findWrapping(i.type))) return {
						sliceDepth: n,
						frontierDepth: e,
						parent: r,
						wrap: s
					};
					if (r && o.matchType(r.type)) break;
				}
			}
		}
		openMore() {
			let { content: e, openStart: t, openEnd: n } = this.unplaced;
			return Yt(e, -1) <= t ? !1 : (this.unplaced.size > 1 && Yt(e, 1) > n && n++, this.unplaced = new C(e, t + 1, n), !0);
		}
		dropNode() {
			let { content: e, openStart: t, openEnd: n } = this.unplaced, r = Wt(e, t);
			if (r.childCount <= 1 && t > 0) {
				let i = e.size - t <= t + r.size;
				this.unplaced = new C(Ht(e, t - 1, 1), t - 1, i ? t - 1 : n);
			} else this.unplaced = new C(Ht(e, t, 1), t, n);
		}
		placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: r, wrap: i }) {
			for (; this.depth > t;) this.closeFrontierNode();
			if (i) for (let e = 0; e < i.length; e++) this.openFrontierNode(i[e]);
			let a = this.unplaced, o = n ? n.content : a.content, s = a.openStart - e, c = 0, l = [], { match: u, type: d } = this.frontier[t];
			if (r) {
				for (let e = 0; e < r.childCount; e++) l.push(r.child(e));
				u = u.matchFragment(r);
			}
			let f = o.size + e - (a.content.size - a.openEnd);
			for (; c < o.childCount;) {
				let e = o.child(c), t = u.matchType(e.type);
				if (!t) break;
				c++, (c > 1 || s == 0 || e.content.size) && (u = t, l.push(Gt(e.mark(d.allowedMarks(e.marks)), c == 1 ? s : 0, c == o.childCount ? f : -1)));
			}
			let p = c == o.childCount;
			p || (f = -1), this.placed = Ut(this.placed, t, x.from(l)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
			for (let e = 0, t = l[l.length - 1]; t && e < f; e++) this.frontier.push({
				type: t.type,
				match: t.contentMatchAt(t.childCount)
			}), t = t.lastChild;
			this.unplaced = p ? e == 0 ? C.empty : new C(Ht(a.content, e - 1, 1), e - 1, f < 0 ? a.openEnd : e - 1) : new C(Ht(a.content, e, c), e, a.openEnd);
		}
		mustMoveInline() {
			if (!this.$to.parent.isTextblock) return -1;
			let e = this.frontier[this.depth], t;
			if (!e.type.isTextblock || !Kt(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth) return -1;
			let { depth: n } = this.$to, r = this.$to.after(n);
			for (; n > 1 && r == this.$to.end(--n);) ++r;
			return r;
		}
		findCloseLevel(e) {
			scan: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
				let { match: n, type: r } = this.frontier[t], i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), a = Kt(e, t, r, n, i);
				if (a) {
					for (let n = t - 1; n >= 0; n--) {
						let { match: t, type: r } = this.frontier[n], i = Kt(e, n, r, t, !0);
						if (!i || i.childCount) continue scan;
					}
					return {
						depth: t,
						fit: a,
						move: i ? e.doc.resolve(e.after(t + 1)) : e
					};
				}
			}
		}
		close(e) {
			let t = this.findCloseLevel(e);
			if (!t) return null;
			for (; this.depth > t.depth;) this.closeFrontierNode();
			t.fit.childCount && (this.placed = Ut(this.placed, t.depth, t.fit)), e = t.move;
			for (let n = t.depth + 1; n <= e.depth; n++) {
				let t = e.node(n), r = t.type.contentMatch.fillBefore(t.content, !0, e.index(n));
				this.openFrontierNode(t.type, t.attrs, r);
			}
			return e;
		}
		openFrontierNode(e, t = null, n) {
			let r = this.frontier[this.depth];
			r.match = r.match.matchType(e), this.placed = Ut(this.placed, this.depth, x.from(e.create(t, n))), this.frontier.push({
				type: e,
				match: e.contentMatch
			});
		}
		closeFrontierNode() {
			let e = this.frontier.pop().match.fillBefore(x.empty, !0);
			e.childCount && (this.placed = Ut(this.placed, this.frontier.length, e));
		}
	}, xn = class e extends w {
		constructor(e, t, n) {
			super(), this.pos = e, this.attr = t, this.value = n;
		}
		apply(e) {
			let t = e.nodeAt(this.pos);
			if (!t) return fn.fail("No node at attribute step's position");
			let n = Object.create(null);
			for (let e in t.attrs) n[e] = t.attrs[e];
			n[this.attr] = this.value;
			let r = t.type.create(n, null, t.marks);
			return fn.fromReplace(e, this.pos, this.pos + 1, new C(x.from(r), 0, +!t.isLeaf));
		}
		getMap() {
			return ln.empty;
		}
		invert(t) {
			return new e(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
		}
		map(t) {
			let n = t.mapResult(this.pos, 1);
			return n.deletedAfter ? null : new e(n.pos, this.attr, this.value);
		}
		toJSON() {
			return {
				stepType: "attr",
				pos: this.pos,
				attr: this.attr,
				value: this.value
			};
		}
		static fromJSON(t, n) {
			if (typeof n.pos != "number" || typeof n.attr != "string") throw RangeError("Invalid input for AttrStep.fromJSON");
			return new e(n.pos, n.attr, n.value);
		}
	}, w.jsonID("attr", xn), Sn = class e extends w {
		constructor(e, t) {
			super(), this.attr = e, this.value = t;
		}
		apply(e) {
			let t = Object.create(null);
			for (let n in e.attrs) t[n] = e.attrs[n];
			t[this.attr] = this.value;
			let n = e.type.create(t, e.content, e.marks);
			return fn.ok(n);
		}
		getMap() {
			return ln.empty;
		}
		invert(t) {
			return new e(this.attr, t.attrs[this.attr]);
		}
		map(e) {
			return this;
		}
		toJSON() {
			return {
				stepType: "docAttr",
				attr: this.attr,
				value: this.value
			};
		}
		static fromJSON(t, n) {
			if (typeof n.attr != "string") throw RangeError("Invalid input for DocAttrStep.fromJSON");
			return new e(n.attr, n.value);
		}
	}, w.jsonID("docAttr", Sn), Cn = class extends Error {}, Cn = function e(t) {
		let n = Error.call(this, t);
		return n.__proto__ = e.prototype, n;
	}, Cn.prototype = Object.create(Error.prototype), Cn.prototype.constructor = Cn, Cn.prototype.name = "TransformError", wn = class {
		constructor(e) {
			this.doc = e, this.steps = [], this.docs = [], this.mapping = new un();
		}
		get before() {
			return this.docs.length ? this.docs[0] : this.doc;
		}
		step(e) {
			let t = this.maybeStep(e);
			if (t.failed) throw new Cn(t.failed);
			return this;
		}
		maybeStep(e) {
			let t = e.apply(this.doc);
			return t.failed || this.addStep(e, t.doc), t;
		}
		get docChanged() {
			return this.steps.length > 0;
		}
		changedRange() {
			let e = 1e9, t = -1e9;
			for (let n = 0; n < this.mapping.maps.length; n++) {
				let r = this.mapping.maps[n];
				n && (e = r.map(e, 1), t = r.map(t, -1)), r.forEach((n, r, i, a) => {
					e = Math.min(e, i), t = Math.max(t, a);
				});
			}
			return e == 1e9 ? null : {
				from: e,
				to: t
			};
		}
		addStep(e, t) {
			this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
		}
		replace(e, t = e, n = C.empty) {
			let r = Bt(this.doc, e, t, n);
			return r && this.step(r), this;
		}
		replaceWith(e, t, n) {
			return this.replace(e, t, new C(x.from(n), 0, 0));
		}
		delete(e, t) {
			return this.replace(e, t, C.empty);
		}
		insert(e, t) {
			return this.replaceWith(e, e, t);
		}
		replaceRange(e, t, n) {
			return Xt(this, e, t, n), this;
		}
		replaceRangeWith(e, t, n) {
			return Qt(this, e, t, n), this;
		}
		deleteRange(e, t) {
			return $t(this, e, t), this;
		}
		lift(e, t) {
			return bt(this, e, t), this;
		}
		join(e, t = 1) {
			return Lt(this, e, t), this;
		}
		wrap(e, t) {
			return Tt(this, e, t), this;
		}
		setBlockType(e, t = e, n, r = null) {
			return Et(this, e, t, n, r), this;
		}
		setNodeMarkup(e, t, n = null, r) {
			return At(this, e, t, n, r), this;
		}
		setNodeAttribute(e, t, n) {
			return this.step(new xn(e, t, n)), this;
		}
		setDocAttribute(e, t) {
			return this.step(new Sn(e, t)), this;
		}
		addNodeMark(e, t) {
			return this.step(new gn(e, t)), this;
		}
		removeNodeMark(e, t) {
			let n = this.doc.nodeAt(e);
			if (!n) throw RangeError("No node at position " + e);
			if (t instanceof S) t.isInSet(n.marks) && this.step(new _n(e, t));
			else {
				let r = n.marks, i, a = [];
				for (; i = t.isInSet(r);) a.push(new _n(e, i)), r = i.removeFromSet(r);
				for (let e = a.length - 1; e >= 0; e--) this.step(a[e]);
			}
			return this;
		}
		split(e, t = 1, n) {
			return Mt(this, e, t, n), this;
		}
		addMark(e, t, n) {
			return ht(this, e, t, n), this;
		}
		removeMark(e, t, n) {
			return gt(this, e, t, n), this;
		}
		clearIncompatible(e, t, n) {
			return _t(this, e, t, n), this;
		}
	};
})), En = e((() => {
	Tn();
}));
// node_modules/prosemirror-state/dist/index.js
function Dn(e) {
	!Fn && !e.parent.inlineContent && (Fn = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + e.parent.type.name + ")"));
}
function On(e, t, n, r, i, a = !1) {
	if (t.inlineContent) return E.create(e, n);
	for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
		let r = t.child(o);
		if (!r.isAtom) {
			let t = On(e, r, n + i, i < 0 ? r.childCount : 0, i, a);
			if (t) return t;
		} else if (!a && D.isSelectable(r)) return D.create(e, n - (i < 0 ? r.nodeSize : 0));
		n += r.nodeSize * i;
	}
	return null;
}
function kn(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof vn || i instanceof yn)) return;
	let a = e.mapping.maps[r], o;
	a.forEach((e, t, n, r) => {
		o ??= r;
	}), e.setSelection(T.near(e.doc.resolve(o), n));
}
function An(e, t) {
	return !t || !e ? e : e.bind(t);
}
function jn(e, t, n) {
	for (let r in e) {
		let i = e[r];
		i instanceof Function ? i = i.bind(t) : r == "handleDOMEvents" && (i = jn(i, t, {})), n[r] = i;
	}
	return n;
}
function Mn(e) {
	return e in Jn ? e + "$" + ++Jn[e] : (Jn[e] = 0, e + "$");
}
var Nn, T, Pn, Fn, E, In, D, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, O, Jn, k, Yn = e((() => {
	ct(), Tn(), Nn = Object.create(null), T = class {
		constructor(e, t, n) {
			this.$anchor = e, this.$head = t, this.ranges = n || [new Pn(e.min(t), e.max(t))];
		}
		get anchor() {
			return this.$anchor.pos;
		}
		get head() {
			return this.$head.pos;
		}
		get from() {
			return this.$from.pos;
		}
		get to() {
			return this.$to.pos;
		}
		get $from() {
			return this.ranges[0].$from;
		}
		get $to() {
			return this.ranges[0].$to;
		}
		get empty() {
			let e = this.ranges;
			for (let t = 0; t < e.length; t++) if (e[t].$from.pos != e[t].$to.pos) return !1;
			return !0;
		}
		content() {
			return this.$from.doc.slice(this.from, this.to, !0);
		}
		replace(e, t = C.empty) {
			let n = t.content.lastChild, r = null;
			for (let e = 0; e < t.openEnd; e++) r = n, n = n.lastChild;
			let i = e.steps.length, a = this.ranges;
			for (let o = 0; o < a.length; o++) {
				let { $from: s, $to: c } = a[o], l = e.mapping.slice(i);
				e.replaceRange(l.map(s.pos), l.map(c.pos), o ? C.empty : t), o == 0 && kn(e, i, (n ? n.isInline : r && r.isTextblock) ? -1 : 1);
			}
		}
		replaceWith(e, t) {
			let n = e.steps.length, r = this.ranges;
			for (let i = 0; i < r.length; i++) {
				let { $from: a, $to: o } = r[i], s = e.mapping.slice(n), c = s.map(a.pos), l = s.map(o.pos);
				i ? e.deleteRange(c, l) : (e.replaceRangeWith(c, l, t), kn(e, n, t.isInline ? -1 : 1));
			}
		}
		static findFrom(e, t, n = !1) {
			let r = e.parent.inlineContent ? new E(e) : On(e.node(0), e.parent, e.pos, e.index(), t, n);
			if (r) return r;
			for (let r = e.depth - 1; r >= 0; r--) {
				let i = t < 0 ? On(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : On(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
				if (i) return i;
			}
			return null;
		}
		static near(e, t = 1) {
			return this.findFrom(e, t) || this.findFrom(e, -t) || new Rn(e.node(0));
		}
		static atStart(e) {
			return On(e, e, 0, 0, 1) || new Rn(e);
		}
		static atEnd(e) {
			return On(e, e, e.content.size, e.childCount, -1) || new Rn(e);
		}
		static fromJSON(e, t) {
			if (!t || !t.type) throw RangeError("Invalid input for Selection.fromJSON");
			let n = Nn[t.type];
			if (!n) throw RangeError(`No selection type ${t.type} defined`);
			return n.fromJSON(e, t);
		}
		static jsonID(e, t) {
			if (e in Nn) throw RangeError("Duplicate use of selection JSON ID " + e);
			return Nn[e] = t, t.prototype.jsonID = e, t;
		}
		getBookmark() {
			return E.between(this.$anchor, this.$head).getBookmark();
		}
	}, T.prototype.visible = !0, Pn = class {
		constructor(e, t) {
			this.$from = e, this.$to = t;
		}
	}, Fn = !1, E = class e extends T {
		constructor(e, t = e) {
			Dn(e), Dn(t), super(e, t);
		}
		get $cursor() {
			return this.$anchor.pos == this.$head.pos ? this.$head : null;
		}
		map(t, n) {
			let r = t.resolve(n.map(this.head));
			if (!r.parent.inlineContent) return T.near(r);
			let i = t.resolve(n.map(this.anchor));
			return new e(i.parent.inlineContent ? i : r, r);
		}
		replace(e, t = C.empty) {
			if (super.replace(e, t), t == C.empty) {
				let t = this.$from.marksAcross(this.$to);
				t && e.ensureMarks(t);
			}
		}
		eq(t) {
			return t instanceof e && t.anchor == this.anchor && t.head == this.head;
		}
		getBookmark() {
			return new In(this.anchor, this.head);
		}
		toJSON() {
			return {
				type: "text",
				anchor: this.anchor,
				head: this.head
			};
		}
		static fromJSON(t, n) {
			if (typeof n.anchor != "number" || typeof n.head != "number") throw RangeError("Invalid input for TextSelection.fromJSON");
			return new e(t.resolve(n.anchor), t.resolve(n.head));
		}
		static create(e, t, n = t) {
			let r = e.resolve(t);
			return new this(r, n == t ? r : e.resolve(n));
		}
		static between(t, n, r) {
			let i = t.pos - n.pos;
			if ((!r || i) && (r = i >= 0 ? 1 : -1), !n.parent.inlineContent) {
				let e = T.findFrom(n, r, !0) || T.findFrom(n, -r, !0);
				if (e) n = e.$head;
				else return T.near(n, r);
			}
			return t.parent.inlineContent || (i == 0 ? t = n : (t = (T.findFrom(t, -r, !0) || T.findFrom(t, r, !0)).$anchor, t.pos < n.pos != i < 0 && (t = n))), new e(t, n);
		}
	}, T.jsonID("text", E), In = class e {
		constructor(e, t) {
			this.anchor = e, this.head = t;
		}
		map(t) {
			return new e(t.map(this.anchor), t.map(this.head));
		}
		resolve(e) {
			return E.between(e.resolve(this.anchor), e.resolve(this.head));
		}
	}, D = class e extends T {
		constructor(e) {
			let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
			super(e, n), this.node = t;
		}
		map(t, n) {
			let { deleted: r, pos: i } = n.mapResult(this.anchor), a = t.resolve(i);
			return r ? T.near(a) : new e(a);
		}
		content() {
			return new C(x.from(this.node), 0, 0);
		}
		eq(t) {
			return t instanceof e && t.anchor == this.anchor;
		}
		toJSON() {
			return {
				type: "node",
				anchor: this.anchor
			};
		}
		getBookmark() {
			return new Ln(this.anchor);
		}
		static fromJSON(t, n) {
			if (typeof n.anchor != "number") throw RangeError("Invalid input for NodeSelection.fromJSON");
			return new e(t.resolve(n.anchor));
		}
		static create(t, n) {
			return new e(t.resolve(n));
		}
		static isSelectable(e) {
			return !e.isText && e.type.spec.selectable !== !1;
		}
	}, D.prototype.visible = !1, T.jsonID("node", D), Ln = class e {
		constructor(e) {
			this.anchor = e;
		}
		map(t) {
			let { deleted: n, pos: r } = t.mapResult(this.anchor);
			return n ? new In(r, r) : new e(r);
		}
		resolve(e) {
			let t = e.resolve(this.anchor), n = t.nodeAfter;
			return n && D.isSelectable(n) ? new D(t) : T.near(t);
		}
	}, Rn = class e extends T {
		constructor(e) {
			super(e.resolve(0), e.resolve(e.content.size));
		}
		replace(e, t = C.empty) {
			if (t == C.empty) {
				e.delete(0, e.doc.content.size);
				let t = T.atStart(e.doc);
				t.eq(e.selection) || e.setSelection(t);
			} else super.replace(e, t);
		}
		toJSON() {
			return { type: "all" };
		}
		static fromJSON(t) {
			return new e(t);
		}
		map(t) {
			return new e(t);
		}
		eq(t) {
			return t instanceof e;
		}
		getBookmark() {
			return zn;
		}
	}, T.jsonID("all", Rn), zn = {
		map() {
			return this;
		},
		resolve(e) {
			return new Rn(e);
		}
	}, Bn = 1, Vn = 2, Hn = 4, Un = class extends wn {
		constructor(e) {
			super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
		}
		get selection() {
			return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
		}
		setSelection(e) {
			if (e.$from.doc != this.doc) throw RangeError("Selection passed to setSelection must point at the current document");
			return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Bn) & -3, this.storedMarks = null, this;
		}
		get selectionSet() {
			return (this.updated & Bn) > 0;
		}
		setStoredMarks(e) {
			return this.storedMarks = e, this.updated |= Vn, this;
		}
		ensureMarks(e) {
			return S.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
		}
		addStoredMark(e) {
			return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
		}
		removeStoredMark(e) {
			return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
		}
		get storedMarksSet() {
			return (this.updated & Vn) > 0;
		}
		addStep(e, t) {
			super.addStep(e, t), this.updated &= -3, this.storedMarks = null;
		}
		setTime(e) {
			return this.time = e, this;
		}
		replaceSelection(e) {
			return this.selection.replace(this, e), this;
		}
		replaceSelectionWith(e, t = !0) {
			let n = this.selection;
			return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || S.none))), n.replaceWith(this, e), this;
		}
		deleteSelection() {
			return this.selection.replace(this), this;
		}
		insertText(e, t, n) {
			let r = this.doc.type.schema;
			if (t == null) return e ? this.replaceSelectionWith(r.text(e), !0) : this.deleteSelection();
			{
				if (n ??= t, !e) return this.deleteRange(t, n);
				let i = this.storedMarks;
				if (!i) {
					let e = this.doc.resolve(t);
					i = n == t ? e.marks() : e.marksAcross(this.doc.resolve(n));
				}
				return this.replaceRangeWith(t, n, r.text(e, i)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(T.near(this.selection.$to)), this;
			}
		}
		setMeta(e, t) {
			return this.meta[typeof e == "string" ? e : e.key] = t, this;
		}
		getMeta(e) {
			return this.meta[typeof e == "string" ? e : e.key];
		}
		get isGeneric() {
			for (let e in this.meta) return !1;
			return !0;
		}
		scrollIntoView() {
			return this.updated |= Hn, this;
		}
		get scrolledIntoView() {
			return (this.updated & Hn) > 0;
		}
	}, Wn = class {
		constructor(e, t, n) {
			this.name = e, this.init = An(t.init, n), this.apply = An(t.apply, n);
		}
	}, Gn = [
		new Wn("doc", {
			init(e) {
				return e.doc || e.schema.topNodeType.createAndFill();
			},
			apply(e) {
				return e.doc;
			}
		}),
		new Wn("selection", {
			init(e, t) {
				return e.selection || T.atStart(t.doc);
			},
			apply(e) {
				return e.selection;
			}
		}),
		new Wn("storedMarks", {
			init(e) {
				return e.storedMarks || null;
			},
			apply(e, t, n, r) {
				return r.selection.$cursor ? e.storedMarks : null;
			}
		}),
		new Wn("scrollToSelection", {
			init() {
				return 0;
			},
			apply(e, t) {
				return e.scrolledIntoView ? t + 1 : t;
			}
		})
	], Kn = class {
		constructor(e, t) {
			this.schema = e, this.plugins = [], this.pluginsByKey = Object.create(null), this.fields = Gn.slice(), t && t.forEach((e) => {
				if (this.pluginsByKey[e.key]) throw RangeError("Adding different instances of a keyed plugin (" + e.key + ")");
				this.plugins.push(e), this.pluginsByKey[e.key] = e, e.spec.state && this.fields.push(new Wn(e.key, e.spec.state, e));
			});
		}
	}, qn = class e {
		constructor(e) {
			this.config = e;
		}
		get schema() {
			return this.config.schema;
		}
		get plugins() {
			return this.config.plugins;
		}
		apply(e) {
			return this.applyTransaction(e).state;
		}
		filterTransaction(e, t = -1) {
			for (let n = 0; n < this.config.plugins.length; n++) if (n != t) {
				let t = this.config.plugins[n];
				if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, e, this)) return !1;
			}
			return !0;
		}
		applyTransaction(e) {
			if (!this.filterTransaction(e)) return {
				state: this,
				transactions: []
			};
			let t = [e], n = this.applyInner(e), r = null;
			for (;;) {
				let i = !1;
				for (let a = 0; a < this.config.plugins.length; a++) {
					let o = this.config.plugins[a];
					if (o.spec.appendTransaction) {
						let s = r ? r[a].n : 0, c = r ? r[a].state : this, l = s < t.length && o.spec.appendTransaction.call(o, s ? t.slice(s) : t, c, n);
						if (l && n.filterTransaction(l, a)) {
							if (l.setMeta("appendedTransaction", e), !r) {
								r = [];
								for (let e = 0; e < this.config.plugins.length; e++) r.push(e < a ? {
									state: n,
									n: t.length
								} : {
									state: this,
									n: 0
								});
							}
							t.push(l), n = n.applyInner(l), i = !0;
						}
						r && (r[a] = {
							state: n,
							n: t.length
						});
					}
				}
				if (!i) return {
					state: n,
					transactions: t
				};
			}
		}
		applyInner(t) {
			if (!t.before.eq(this.doc)) throw RangeError("Applying a mismatched transaction");
			let n = new e(this.config), r = this.config.fields;
			for (let e = 0; e < r.length; e++) {
				let i = r[e];
				n[i.name] = i.apply(t, this[i.name], this, n);
			}
			return n;
		}
		get tr() {
			return new Un(this);
		}
		static create(t) {
			let n = new Kn(t.doc ? t.doc.type.schema : t.schema, t.plugins), r = new e(n);
			for (let e = 0; e < n.fields.length; e++) r[n.fields[e].name] = n.fields[e].init(t, r);
			return r;
		}
		reconfigure(t) {
			let n = new Kn(this.schema, t.plugins), r = n.fields, i = new e(n);
			for (let e = 0; e < r.length; e++) {
				let n = r[e].name;
				i[n] = this.hasOwnProperty(n) ? this[n] : r[e].init(t, i);
			}
			return i;
		}
		toJSON(e) {
			let t = {
				doc: this.doc.toJSON(),
				selection: this.selection.toJSON()
			};
			if (this.storedMarks && (t.storedMarks = this.storedMarks.map((e) => e.toJSON())), e && typeof e == "object") for (let n in e) {
				if (n == "doc" || n == "selection") throw RangeError("The JSON fields `doc` and `selection` are reserved");
				let r = e[n], i = r.spec.state;
				i && i.toJSON && (t[n] = i.toJSON.call(r, this[r.key]));
			}
			return t;
		}
		static fromJSON(t, n, r) {
			if (!n) throw RangeError("Invalid input for EditorState.fromJSON");
			if (!t.schema) throw RangeError("Required config field 'schema' missing");
			let i = new Kn(t.schema, t.plugins), a = new e(i);
			return i.fields.forEach((e) => {
				if (e.name == "doc") a.doc = Ue.fromJSON(t.schema, n.doc);
				else if (e.name == "selection") a.selection = T.fromJSON(a.doc, n.selection);
				else if (e.name == "storedMarks") n.storedMarks && (a.storedMarks = n.storedMarks.map(t.schema.markFromJSON));
				else {
					if (r) for (let i in r) {
						let o = r[i], s = o.spec.state;
						if (o.key == e.name && s && s.fromJSON && Object.prototype.hasOwnProperty.call(n, i)) {
							a[e.name] = s.fromJSON.call(o, t, n[i], a);
							return;
						}
					}
					a[e.name] = e.init(t, a);
				}
			}), a;
		}
	}, O = class {
		constructor(e) {
			this.spec = e, this.props = {}, e.props && jn(e.props, this, this.props), this.key = e.key ? e.key.key : Mn("plugin");
		}
		getState(e) {
			return e[this.key];
		}
	}, Jn = Object.create(null), k = class {
		constructor(e = "key") {
			this.key = Mn(e);
		}
		get(e) {
			return e.config.pluginsByKey[this.key];
		}
		getState(e) {
			return e[this.key];
		}
	};
}));
// node_modules/prosemirror-commands/dist/index.js
function Xn(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("backward", e) : n.parentOffset > 0) ? null : n;
}
function Zn(e, t, n) {
	let r = t.nodeBefore, i = t.pos - 1;
	for (; !r.isTextblock; i--) {
		if (r.type.spec.isolating) return !1;
		let e = r.lastChild;
		if (!e) return !1;
		r = e;
	}
	let a = t.nodeAfter, o = t.pos + 1;
	for (; !a.isTextblock; o++) {
		if (a.type.spec.isolating) return !1;
		let e = a.firstChild;
		if (!e) return !1;
		a = e;
	}
	let s = Bt(e.doc, i, o, C.empty);
	if (!s || s.from != i || s instanceof vn && s.slice.size >= o - i) return !1;
	if (n) {
		let t = e.tr.step(s);
		t.setSelection(E.create(t.doc, i)), n(t.scrollIntoView());
	}
	return !0;
}
function Qn(e, t, n = !1) {
	for (let r = e; r; r = t == "start" ? r.firstChild : r.lastChild) {
		if (r.isTextblock) return !0;
		if (n && r.childCount != 1) return !1;
	}
	return !1;
}
function $n(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		if (e.index(t) > 0) return e.doc.resolve(e.before(t + 1));
		if (e.node(t).type.spec.isolating) break;
	}
	return null;
}
function er(e, t) {
	let { $cursor: n } = e.selection;
	return !n || (t ? !t.endOfTextblock("forward", e) : n.parentOffset < n.parent.content.size) ? null : n;
}
function tr(e) {
	if (!e.parent.type.spec.isolating) for (let t = e.depth - 1; t >= 0; t--) {
		let n = e.node(t);
		if (e.index(t) + 1 < n.childCount) return e.doc.resolve(e.after(t + 1));
		if (n.type.spec.isolating) break;
	}
	return null;
}
function nr(e) {
	for (let t = 0; t < e.edgeCount; t++) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function rr(e) {
	return (t, n) => {
		if (t.selection instanceof D && t.selection.node.isBlock) {
			let { $from: e } = t.selection;
			return !e.parentOffset || !jt(t.doc, e.pos) ? !1 : (n && n(t.tr.split(e.pos).scrollIntoView()), !0);
		}
		if (!t.selection.$from.depth) return !1;
		let r = t.tr;
		!t.selection.empty && (t.selection instanceof E || t.selection instanceof Rn) && r.deleteSelection();
		let { $from: i } = r.selection, a = r.steps.length, o = [], s, c, l = !1, u = !1;
		for (let t = i.depth;; t--) if (i.node(t).isBlock) {
			l = i.end(t) == i.pos + (i.depth - t), u = i.start(t) == i.pos - (i.depth - t), c = nr(i.node(t - 1).contentMatchAt(i.indexAfter(t - 1)));
			let n = e && e(i.parent, l, i);
			o.unshift(n || (l && c ? { type: c } : null)), s = t;
			break;
		} else {
			if (t == 1) return !1;
			o.unshift(null);
		}
		let d = i.pos, f = jt(r.doc, d, o.length, o);
		if (f ||= (o[0] = c ? { type: c } : null, jt(r.doc, d, o.length, o)), !f) return !1;
		if (r.split(d, o.length, o), !l && u && i.node(s).type != c) {
			let e = r.mapping.slice(a), t = e.map(i.before(s)), n = r.doc.resolve(t);
			c && i.node(s - 1).canReplaceWith(n.index(), n.index() + 1, c) && r.setNodeMarkup(e.map(i.before(s)), c);
		}
		return n && n(r.scrollIntoView()), !0;
	};
}
function ir(e, t, n) {
	let r = t.nodeBefore, i = t.nodeAfter, a = t.index();
	return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && t.parent.canReplace(a - 1, a) ? (n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView()), !0) : !t.parent.canReplace(a, a + 1) || !(i.isTextblock || Nt(e.doc, t.pos)) ? !1 : (n && n(e.tr.join(t.pos).scrollIntoView()), !0);
}
function ar(e, t, n, r) {
	let i = t.nodeBefore, a = t.nodeAfter, o, s, c = i.type.spec.isolating || a.type.spec.isolating;
	if (!c && ir(e, t, n)) return !0;
	let l = !c && t.parent.canReplace(t.index(), t.index() + 1);
	if (l && (o = (s = i.contentMatchAt(i.childCount)).findWrapping(a.type)) && s.matchType(o[0] || a.type).validEnd) {
		if (n) {
			let r = t.pos + a.nodeSize, s = x.empty;
			for (let e = o.length - 1; e >= 0; e--) s = x.from(o[e].create(null, s));
			s = x.from(i.copy(s));
			let c = e.tr.step(new yn(t.pos - 1, r, t.pos, r, new C(s, 1, 0), o.length, !0)), l = c.doc.resolve(r + 2 * o.length);
			l.nodeAfter && l.nodeAfter.type == i.type && Nt(c.doc, l.pos) && c.join(l.pos), n(c.scrollIntoView());
		}
		return !0;
	}
	let u = a.type.spec.isolating || r > 0 && c ? null : T.findFrom(t, 1), d = u && u.$from.blockRange(u.$to), f = d && yt(d);
	if (f != null && f >= t.depth) return n && n(e.tr.lift(d, f).scrollIntoView()), !0;
	if (l && Qn(a, "start", !0) && Qn(i, "end")) {
		let r = i, o = [];
		for (; o.push(r), !r.isTextblock;) r = r.lastChild;
		let s = a, c = 1;
		for (; !s.isTextblock; s = s.firstChild) c++;
		if (r.canReplace(r.childCount, r.childCount, s.content)) {
			if (n) {
				let r = x.empty;
				for (let e = o.length - 1; e >= 0; e--) r = x.from(o[e].copy(r));
				n(e.tr.step(new yn(t.pos - o.length, t.pos + a.nodeSize, t.pos + c, t.pos + a.nodeSize - c, new C(r, o.length, 0), 0, !0)).scrollIntoView());
			}
			return !0;
		}
	}
	return !1;
}
function or(e) {
	return function(t, n) {
		let r = t.selection, i = e < 0 ? r.$from : r.$to, a = i.depth;
		for (; i.node(a).isInline;) {
			if (!a) return !1;
			a--;
		}
		return i.node(a).isTextblock ? (n && n(t.tr.setSelection(E.create(t.doc, e < 0 ? i.start(a) : i.end(a)))), !0) : !1;
	};
}
function sr(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a), s = o && xt(o, e, t);
		return s ? (r && r(n.tr.wrap(o, s).scrollIntoView()), !0) : !1;
	};
}
function cr(e, t = null) {
	return function(n, r) {
		let i = !1;
		for (let r = 0; r < n.selection.ranges.length && !i; r++) {
			let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
			n.doc.nodesBetween(a, o, (r, a) => {
				if (i) return !1;
				if (r.isTextblock && !r.hasMarkup(e, t)) {
					if (r.type == e) i = !0;
					else {
						let t = n.doc.resolve(a), r = t.index();
						i = t.parent.canReplaceWith(r, r + 1, e);
					}
				}
			});
		}
		if (!i) return !1;
		if (r) {
			let i = n.tr;
			for (let r = 0; r < n.selection.ranges.length; r++) {
				let { $from: { pos: a }, $to: { pos: o } } = n.selection.ranges[r];
				i.setBlockType(a, o, e, t);
			}
			r(i.scrollIntoView());
		}
		return !0;
	};
}
function lr(...e) {
	return function(t, n, r) {
		for (let i = 0; i < e.length; i++) if (e[i](t, n, r)) return !0;
		return !1;
	};
}
var ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr = e((() => {
	Tn(), ct(), Yn(), ur = (e, t) => !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0), dr = (e, t, n) => {
		let r = Xn(e, n);
		if (!r) return !1;
		let i = $n(r);
		if (!i) {
			let n = r.blockRange(), i = n && yt(n);
			return i != null && (t && t(e.tr.lift(n, i).scrollIntoView()), !0);
		}
		let a = i.nodeBefore;
		if (ar(e, i, t, -1)) return !0;
		if (r.parent.content.size == 0 && (Qn(a, "end") || D.isSelectable(a))) for (let n = r.depth;; n--) {
			let o = Bt(e.doc, r.before(n), r.after(n), C.empty);
			if (o && o.slice.size < o.to - o.from) {
				if (t) {
					let n = e.tr.step(o);
					n.setSelection(Qn(a, "end") ? T.findFrom(n.doc.resolve(n.mapping.map(i.pos, -1)), -1) : D.create(n.doc, i.pos - a.nodeSize)), t(n.scrollIntoView());
				}
				return !0;
			}
			if (n == 1 || r.node(n - 1).childCount > 1) break;
		}
		return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos - a.nodeSize, i.pos).scrollIntoView()), !0) : !1;
	}, fr = (e, t, n) => {
		let r = Xn(e, n);
		if (!r) return !1;
		let i = $n(r);
		return i ? Zn(e, i, t) : !1;
	}, pr = (e, t, n) => {
		let r = er(e, n);
		if (!r) return !1;
		let i = tr(r);
		return i ? Zn(e, i, t) : !1;
	}, mr = (e, t, n) => {
		let { $head: r, empty: i } = e.selection, a = r;
		if (!i) return !1;
		if (r.parent.isTextblock) {
			if (n ? !n.endOfTextblock("backward", e) : r.parentOffset > 0) return !1;
			a = $n(r);
		}
		let o = a && a.nodeBefore;
		return !o || !D.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(D.create(e.doc, a.pos - o.nodeSize)).scrollIntoView()), !0);
	}, hr = (e, t, n) => {
		let r = er(e, n);
		if (!r) return !1;
		let i = tr(r);
		if (!i) return !1;
		let a = i.nodeAfter;
		if (ar(e, i, t, 1)) return !0;
		if (r.parent.content.size == 0 && (Qn(a, "start") || D.isSelectable(a))) {
			let n = Bt(e.doc, r.before(), r.after(), C.empty);
			if (n && n.slice.size < n.to - n.from) {
				if (t) {
					let r = e.tr.step(n);
					r.setSelection(Qn(a, "start") ? T.findFrom(r.doc.resolve(r.mapping.map(i.pos)), 1) : D.create(r.doc, r.mapping.map(i.pos))), t(r.scrollIntoView());
				}
				return !0;
			}
		}
		return a.isAtom && i.depth == r.depth - 1 ? (t && t(e.tr.delete(i.pos, i.pos + a.nodeSize).scrollIntoView()), !0) : !1;
	}, gr = (e, t, n) => {
		let { $head: r, empty: i } = e.selection, a = r;
		if (!i) return !1;
		if (r.parent.isTextblock) {
			if (n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size) return !1;
			a = tr(r);
		}
		let o = a && a.nodeAfter;
		return !o || !D.isSelectable(o) ? !1 : (t && t(e.tr.setSelection(D.create(e.doc, a.pos)).scrollIntoView()), !0);
	}, _r = (e, t) => {
		let n = e.selection, r = n instanceof D, i;
		if (r) {
			if (n.node.isTextblock || !Nt(e.doc, n.from)) return !1;
			i = n.from;
		} else if (i = It(e.doc, n.from, -1), i == null) return !1;
		if (t) {
			let n = e.tr.join(i);
			r && n.setSelection(D.create(n.doc, i - e.doc.resolve(i).nodeBefore.nodeSize)), t(n.scrollIntoView());
		}
		return !0;
	}, vr = (e, t) => {
		let n = e.selection, r;
		if (n instanceof D) {
			if (n.node.isTextblock || !Nt(e.doc, n.to)) return !1;
			r = n.to;
		} else if (r = It(e.doc, n.to, 1), r == null) return !1;
		return t && t(e.tr.join(r).scrollIntoView()), !0;
	}, yr = (e, t) => {
		let { $from: n, $to: r } = e.selection, i = n.blockRange(r), a = i && yt(i);
		return a != null && (t && t(e.tr.lift(i, a).scrollIntoView()), !0);
	}, br = (e, t) => {
		let { $head: n, $anchor: r } = e.selection;
		return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (t && t(e.tr.insertText("\n").scrollIntoView()), !0);
	}, xr = (e, t) => {
		let { $head: n, $anchor: r } = e.selection;
		if (!n.parent.type.spec.code || !n.sameParent(r)) return !1;
		let i = n.node(-1), a = n.indexAfter(-1), o = nr(i.contentMatchAt(a));
		if (!o || !i.canReplaceWith(a, a, o)) return !1;
		if (t) {
			let r = n.after(), i = e.tr.replaceWith(r, r, o.createAndFill());
			i.setSelection(T.near(i.doc.resolve(r), 1)), t(i.scrollIntoView());
		}
		return !0;
	}, Sr = (e, t) => {
		let n = e.selection, { $from: r, $to: i } = n;
		if (n instanceof Rn || r.parent.inlineContent || i.parent.inlineContent) return !1;
		let a = nr(i.parent.contentMatchAt(i.indexAfter()));
		if (!a || !a.isTextblock) return !1;
		if (t) {
			let n = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, o = e.tr.insert(n, a.createAndFill());
			o.setSelection(E.create(o.doc, n + 1)), t(o.scrollIntoView());
		}
		return !0;
	}, Cr = (e, t) => {
		let { $cursor: n } = e.selection;
		if (!n || n.parent.content.size) return !1;
		if (n.depth > 1 && n.after() != n.end(-1)) {
			let r = n.before();
			if (jt(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
		}
		let r = n.blockRange(), i = r && yt(r);
		return i != null && (t && t(e.tr.lift(r, i).scrollIntoView()), !0);
	}, wr = rr(), Tr = (e, t) => {
		let { $from: n, to: r } = e.selection, i, a = n.sharedDepth(r);
		return a != 0 && (i = n.before(a), t && t(e.tr.setSelection(D.create(e.doc, i))), !0);
	}, Er = (e, t) => (t && t(e.tr.setSelection(new Rn(e.doc))), !0), Dr = or(-1), Or = or(1), kr = lr(ur, dr, mr), Ar = lr(ur, hr, gr), jr = {
		Enter: lr(br, Sr, Cr, wr),
		"Mod-Enter": xr,
		Backspace: kr,
		"Mod-Backspace": kr,
		"Shift-Backspace": kr,
		Delete: Ar,
		"Mod-Delete": Ar,
		"Mod-a": Er
	}, Mr = {
		"Ctrl-h": jr.Backspace,
		"Alt-Backspace": jr["Mod-Backspace"],
		"Ctrl-d": jr.Delete,
		"Ctrl-Alt-Backspace": jr["Mod-Delete"],
		"Alt-Delete": jr["Mod-Delete"],
		"Alt-d": jr["Mod-Delete"],
		"Ctrl-a": Dr,
		"Ctrl-e": Or
	};
	for (let e in jr) Mr[e] = jr[e];
	typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform();
})), Pr = e((() => {
	Nr();
})), Fr = e((() => {
	Yn();
})), Ir = e((() => {
	ct();
}));
// node_modules/prosemirror-schema-list/dist/index.js
function Lr(e, t = null) {
	return function(n, r) {
		let { $from: i, $to: a } = n.selection, o = i.blockRange(a);
		if (!o) return !1;
		let s = r ? n.tr : null;
		return Rr(s, o, e, t) ? (r && r(s.scrollIntoView()), !0) : !1;
	};
}
function Rr(e, t, n, r = null) {
	let i = !1, a = t, o = t.$from.doc;
	if (t.depth >= 2 && t.$from.node(t.depth - 1).type.compatibleContent(n) && t.startIndex == 0) {
		if (t.$from.index(t.depth - 1) == 0) return !1;
		let e = o.resolve(t.start - 2);
		a = new Ve(e, e, t.depth), t.endIndex < t.parent.childCount && (t = new Ve(t.$from, o.resolve(t.$to.end(t.depth)), t.depth)), i = !0;
	}
	let s = xt(a, n, r, t);
	return s ? (e && zr(e, t, s, i, n), !0) : !1;
}
function zr(e, t, n, r, i) {
	let a = x.empty;
	for (let e = n.length - 1; e >= 0; e--) a = x.from(n[e].type.create(n[e].attrs, a));
	e.step(new yn(t.start - (r ? 2 : 0), t.end, t.start, t.end, new C(a, 0, 0), n.length, !0));
	let o = 0;
	for (let e = 0; e < n.length; e++) n[e].type == i && (o = e + 1);
	let s = n.length - o, c = t.start + n.length - (r ? 2 : 0), l = t.parent;
	for (let n = t.startIndex, r = t.endIndex, i = !0; n < r; n++, i = !1) !i && s && jt(e.doc, c, s) && (e.split(c, s), c += 2 * s), c += l.child(n).nodeSize;
	return e;
}
function Br(e, t) {
	return e instanceof qe ? t == e : e.indexOf(t) > -1;
}
function Vr(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && Br(e, t.firstChild.type));
		return a ? n ? Br(e, r.node(a.depth - 1).type) ? Hr(t, n, a) : Ur(t, n, a) : !0 : !1;
	};
}
function Hr(e, t, n) {
	let r = e.tr, i = n.end, a = n.$to.end(n.depth), o = n.parent.child(n.endIndex - 1).type;
	i < a && (r.step(new yn(i - 1, a, i, a, new C(x.from(o.create(null, n.parent.copy())), 1, 0), 1, !0)), n = new Ve(r.doc.resolve(n.$from.pos), r.doc.resolve(a), n.depth));
	let s = yt(n);
	if (s == null) return !1;
	r.lift(n, s);
	let c = r.doc.resolve(r.mapping.map(i, -1) - 1);
	return Nt(r.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && r.join(c.pos), t(r.scrollIntoView()), !0;
}
function Ur(e, t, n) {
	let r = e.tr, i = n.parent;
	for (let e = n.end, t = n.endIndex - 1, a = n.startIndex; t > a; t--) e -= i.child(t).nodeSize, r.delete(e - 1, e + 1);
	let a = r.doc.resolve(n.start), o = a.nodeAfter;
	if (r.mapping.map(n.end) != n.start + a.nodeAfter.nodeSize) return !1;
	let s = n.startIndex == 0, c = n.endIndex == i.childCount, l = a.node(-1), u = a.index(-1);
	if (!l.canReplace(u + +!s, u + 1, o.content.append(c ? x.empty : x.from(i)))) return !1;
	let d = a.pos, f = d + o.nodeSize;
	return r.step(new yn(d - +!!s, f + +!!c, d + 1, f - 1, new C((s ? x.empty : x.from(i.copy(x.empty))).append(c ? x.empty : x.from(i.copy(x.empty))), +!s, +!c), +!s)), t(r.scrollIntoView()), !0;
}
function Wr(e) {
	return function(t, n) {
		let { $from: r, $to: i } = t.selection, a = r.blockRange(i, (t) => t.childCount > 0 && Br(e, t.firstChild.type));
		if (!a) return !1;
		let o = a.startIndex;
		if (o == 0) return !1;
		let s = a.parent, c = s.child(o - 1);
		if (!Br(e, c.type)) return !1;
		if (n) {
			let e = c.lastChild && c.lastChild.type == s.type, r = x.from(e ? c.lastChild.lastChild.type.create() : null), i = new C(x.from(c.type.create(null, x.from(s.type.create(null, r)))), e ? 3 : 1, 0), o = a.start, l = a.end;
			n(t.tr.step(new yn(o - (e ? 3 : 1), l, o, l, i, 1, !0)).scrollIntoView());
		}
		return !0;
	};
}
var Gr = e((() => {
	Tn(), ct();
})), Kr = e((() => {
	Gr();
}));
// node_modules/prosemirror-view/dist/index.js
function qr(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : Jr(e))) {
			let n = e.parentNode;
			if (!n || !A(n) || ei(e) || Qo.test(e.nodeName) || e.contentEditable == "false") return !1;
			t = Ko(e) + (i < 0 ? 0 : 1), e = n;
		} else if (A(e)) {
			let n = e.childNodes[t + (i < 0 ? -1 : 0)];
			if (A(n) && n.contentEditable == "false") {
				if (n.pmViewDesc?.ignoreForSelection) t += i;
				else return !1;
			} else e = n, t = i < 0 ? Jr(e) : 0;
		} else return !1;
	}
}
function Jr(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function A(e) {
	return e.nodeType == 1;
}
function Yr(e) {
	return e.nodeType == 3;
}
function Xr(e, t) {
	return t ? e.contains(A(t) ? t : t.parentNode) : !1;
}
function Zr(e, t) {
	for (;;) {
		if (Yr(e) && t) return e;
		if (A(e) && t > 0) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t - 1], t = Jr(e);
		} else if (e.parentNode && !ei(e)) t = Ko(e), e = e.parentNode;
		else return null;
	}
}
function Qr(e, t) {
	for (;;) {
		if (Yr(e) && t < e.nodeValue.length) return e;
		if (A(e) && t < e.childNodes.length) {
			if (e.contentEditable == "false") return null;
			e = e.childNodes[t], t = 0;
		} else if (e.parentNode && !ei(e)) t = Ko(e) + 1, e = e.parentNode;
		else return null;
	}
}
function $r(e, t, n) {
	for (let r = t == 0, i = t == Jr(e); r || i;) {
		if (e == n) return !0;
		let t = Ko(e);
		if (e = e.parentNode, !e) return !1;
		r &&= t == 0, i &&= t == Jr(e);
	}
}
function ei(e) {
	let t;
	for (let n = e; n && !(t = n.pmViewDesc); n = n.parentNode);
	return t && t.node && t.node.isBlock && (t.dom == e || t.contentDOM == e);
}
function ti(e, t) {
	let n = document.createEvent("Event");
	return n.initEvent("keydown", !0, !0), n.keyCode = e, n.key = n.code = t, n;
}
function ni(e) {
	let t = e.activeElement;
	for (; t && t.shadowRoot;) t = t.shadowRoot.activeElement;
	return t;
}
function ri(e, t, n) {
	if (e.caretPositionFromPoint) try {
		let r = e.caretPositionFromPoint(t, n);
		if (r) return {
			node: r.offsetNode,
			offset: Math.min(Jr(r.offsetNode), r.offset)
		};
	} catch {}
	if (e.caretRangeFromPoint) {
		let r = e.caretRangeFromPoint(t, n);
		if (r) return {
			node: r.startContainer,
			offset: Math.min(Jr(r.startContainer), r.startOffset)
		};
	}
}
function ii(e) {
	let t = e.defaultView && e.defaultView.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.documentElement.clientWidth,
		top: 0,
		bottom: e.documentElement.clientHeight
	};
}
function ai(e, t) {
	return typeof e == "number" ? e : e[t];
}
function oi(e) {
	let t = e.getBoundingClientRect(), n = t.width / e.offsetWidth || 1, r = t.height / e.offsetHeight || 1;
	return {
		left: t.left,
		right: t.left + e.clientWidth * n,
		top: t.top,
		bottom: t.top + e.clientHeight * r
	};
}
function si(e, t, n) {
	if (!xi(t) && t.left == 0) return;
	let r = e.someProp("scrollThreshold") || 0, i = e.someProp("scrollMargin") || 5, a = e.dom.ownerDocument;
	for (let o = n || e.dom; o;) {
		if (!A(o)) {
			o = qo(o);
			continue;
		}
		let e = o == a.body, n = e ? ii(a) : oi(o), s = 0, c = 0;
		if (t.top < n.top + ai(r, "top") ? c = -(n.top - t.top + ai(i, "top")) : t.bottom > n.bottom - ai(r, "bottom") && (c = t.bottom - t.top > n.bottom - n.top ? t.top + ai(i, "top") - n.top : t.bottom - n.bottom + ai(i, "bottom")), t.left < n.left + ai(r, "left") ? s = -(n.left - t.left + ai(i, "left")) : t.right > n.right - ai(r, "right") && (s = t.right - n.right + ai(i, "right")), s || c) {
			if (e) a.defaultView.scrollBy(s, c);
			else {
				let e = o.scrollLeft, n = o.scrollTop;
				c && (o.scrollTop += c), s && (o.scrollLeft += s);
				let r = o.scrollLeft - e, i = o.scrollTop - n;
				t = {
					left: t.left - r,
					top: t.top - i,
					right: t.right - r,
					bottom: t.bottom - i
				};
			}
		}
		let l = e ? "fixed" : getComputedStyle(o).position;
		if (/^(fixed|sticky)$/.test(l)) break;
		o = l == "absolute" ? o.offsetParent : qo(o);
	}
}
function ci(e) {
	let t = e.dom.getBoundingClientRect(), n = Math.max(0, t.top), r, i;
	for (let a = (t.left + t.right) / 2, o = n + 1; o < Math.min(innerHeight, t.bottom); o += 5) {
		let t = e.root.elementFromPoint(a, o);
		if (!t || t == e.dom || !e.dom.contains(t)) continue;
		let s = t.getBoundingClientRect();
		if (s.top >= n - 20) {
			r = t, i = s.top;
			break;
		}
	}
	return {
		refDOM: r,
		refTop: i,
		stack: li(e.dom)
	};
}
function li(e) {
	let t = [], n = e.ownerDocument;
	for (let r = e; r && (t.push({
		dom: r,
		top: r.scrollTop,
		left: r.scrollLeft
	}), e != n); r = qo(r));
	return t;
}
function ui({ refDOM: e, refTop: t, stack: n }) {
	let r = e ? e.getBoundingClientRect().top : 0;
	di(n, r == 0 ? 0 : r - t);
}
function di(e, t) {
	for (let n = 0; n < e.length; n++) {
		let { dom: r, top: i, left: a } = e[n];
		r.scrollTop != i + t && (r.scrollTop = i + t), r.scrollLeft != a && (r.scrollLeft = a);
	}
}
function fi(e) {
	if (e.setActive) return e.setActive();
	if (bs) return e.focus(bs);
	let t = li(e);
	e.focus(bs == null ? { get preventScroll() {
		return bs = { preventScroll: !0 }, !0;
	} } : void 0), bs || (bs = !1, di(t, 0));
}
function pi(e, t) {
	let n, r = 2e8, i, a = 0, o = t.top, s = t.top, c, l;
	for (let u = e.firstChild, d = 0; u; u = u.nextSibling, d++) {
		let e;
		if (A(u)) e = u.getClientRects();
		else if (Yr(u)) e = Yo(u).getClientRects();
		else continue;
		for (let f = 0; f < e.length; f++) {
			let p = e[f];
			if (p.top <= o && p.bottom >= s) {
				o = Math.max(p.bottom, o), s = Math.min(p.top, s);
				let e = p.left > t.left ? p.left - t.left : p.right < t.left ? t.left - p.right : 0;
				if (e < r) {
					n = u, r = e, i = e && Yr(n) ? {
						left: p.right < t.left ? p.right : p.left,
						top: t.top
					} : t, A(u) && e && (a = d + +(t.left >= (p.left + p.right) / 2));
					continue;
				}
			} else p.top > t.top && !c && p.left <= t.left && p.right >= t.left && (c = u, l = {
				left: Math.max(p.left, Math.min(p.right, t.left)),
				top: p.top
			});
			!n && (t.left >= p.right && t.top >= p.top || t.left >= p.left && t.top >= p.bottom) && (a = d + 1);
		}
	}
	return !n && c && (n = c, i = l, r = 0), n && Yr(n) ? mi(n, i) : !n || r ? {
		node: e,
		offset: a
	} : pi(n, i);
}
function mi(e, t) {
	let n = e.nodeValue.length, r = document.createRange(), i;
	for (let a = 0; a < n; a++) {
		r.setEnd(e, a + 1), r.setStart(e, a);
		let n = Si(r, 1);
		if (n.top != n.bottom && hi(t, n)) {
			i = {
				node: e,
				offset: a + +(t.left >= (n.left + n.right) / 2)
			};
			break;
		}
	}
	return r.detach(), i || {
		node: e,
		offset: 0
	};
}
function hi(e, t) {
	return e.left >= t.left - 1 && e.left <= t.right + 1 && e.top >= t.top - 1 && e.top <= t.bottom + 1;
}
function gi(e, t) {
	let n = e.parentNode;
	return n && /^li$/i.test(n.nodeName) && t.left < e.getBoundingClientRect().left ? n : e;
}
function _i(e, t, n) {
	let { node: r, offset: i } = pi(t, n), a = -1;
	if (A(r) && !r.firstChild) {
		let e = r.getBoundingClientRect();
		a = e.left != e.right && n.left > (e.left + e.right) / 2 ? 1 : -1;
	}
	return e.docView.posFromDOM(r, i, a);
}
function vi(e, t, n, r) {
	let i = -1;
	for (let n = t, a = !1; n != e.dom;) {
		let t = e.docView.nearestDesc(n, !0), o;
		if (!t) return null;
		if (A(t.dom) && (t.node.isBlock && t.parent || !t.contentDOM) && ((o = t.dom.getBoundingClientRect()).width || o.height) && (t.node.isBlock && t.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(t.dom.nodeName) && (!a && o.left > r.left || o.top > r.top ? i = t.posBefore : (!a && o.right < r.left || o.bottom < r.top) && (i = t.posAfter), a = !0), !t.contentDOM && i < 0 && !t.node.isText)) return (t.node.isBlock ? r.top < (o.top + o.bottom) / 2 : r.left < (o.left + o.right) / 2) ? t.posBefore : t.posAfter;
		n = t.dom.parentNode;
	}
	return i > -1 ? i : e.docView.posFromDOM(t, n, -1);
}
function yi(e, t, n) {
	let r = e.childNodes.length;
	if (r && n.top < n.bottom) for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (t.top - n.top) / (n.bottom - n.top)) - 2)), a = i;;) {
		let n = e.childNodes[a];
		if (A(n)) {
			let e = n.getClientRects();
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				if (hi(t, i)) return yi(n, t, i);
			}
		}
		if ((a = (a + 1) % r) == i) break;
	}
	return e;
}
function bi(e, t) {
	let n = e.dom.ownerDocument, r, i = 0, a = ri(n, t.left, t.top);
	a && ({node: r, offset: i} = a);
	let o = (e.root.elementFromPoint ? e.root : n).elementFromPoint(t.left, t.top), s;
	if (!o || !e.dom.contains(o)) {
		let n = e.dom.getBoundingClientRect();
		if (!hi(t, n) || (o = yi(e.dom, t, n), !o)) return null;
	}
	if (ps) for (let e = o; r && e; e = qo(e)) e.draggable && (r = void 0);
	if (o = gi(o, t), r) {
		if (ls && A(r) && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
			let e = r.childNodes[i], n;
			e.nodeName == "IMG" && (n = e.getBoundingClientRect()).right <= t.left && n.bottom > t.top && i++;
		}
		let n;
		vs && i && A(r) && A(n = r.childNodes[i - 1]) && n.contentEditable == "false" && n.getBoundingClientRect().top >= t.top && i--, r == e.dom && i == r.childNodes.length - 1 && A(r.lastChild) && t.top > r.lastChild.getBoundingClientRect().bottom ? s = e.state.doc.content.size : i != 0 && A(r) && r.childNodes[i - 1].nodeName == "BR" || (s = vi(e, r, i, t));
	}
	s ??= _i(e, o, t);
	let c = e.docView.nearestDesc(o, !0);
	return {
		pos: s,
		inside: c ? c.posAtStart - c.border : -1
	};
}
function xi(e) {
	return e.top < e.bottom || e.left < e.right;
}
function Si(e, t) {
	let n = e.getClientRects();
	if (n.length) {
		let e = n[t < 0 ? 0 : n.length - 1];
		if (xi(e)) return e;
	}
	return Array.prototype.find.call(n, xi) || e.getBoundingClientRect();
}
function Ci(e, t, n) {
	let { node: r, offset: i, atom: a } = e.docView.domFromPos(t, n < 0 ? -1 : 1), o = vs || ls;
	if (Yr(r)) {
		if (o && (xs.test(r.nodeValue) || (n < 0 ? !i : i == r.nodeValue.length))) {
			let e = Si(Yo(r, i, i), n);
			if (ls && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
				let t = Si(Yo(r, i - 1, i - 1), -1);
				if (t.top == e.top) {
					let n = Si(Yo(r, i, i + 1), -1);
					if (n.top != e.top) return wi(n, n.left < t.left);
				}
			}
			return e;
		}
		{
			let e = i, t = i, a = n < 0 ? 1 : -1;
			return n < 0 && !i ? (t++, a = -1) : n >= 0 && i == r.nodeValue.length ? (e--, a = 1) : n < 0 ? e-- : t++, wi(Si(Yo(r, e, t), a), a < 0);
		}
	}
	if (!e.state.doc.resolve(t - (a || 0)).parent.inlineContent) {
		if (a == null && i && (n < 0 || i == Jr(r))) {
			let e = r.childNodes[i - 1];
			if (A(e)) return Ti(e.getBoundingClientRect(), !1);
		}
		if (a == null && i < Jr(r)) {
			let e = r.childNodes[i];
			if (A(e)) return Ti(e.getBoundingClientRect(), !0);
		}
		return Ti(r.getBoundingClientRect(), n >= 0);
	}
	if (a == null && i && (n < 0 || i == Jr(r))) {
		let e = r.childNodes[i - 1], t = Yr(e) ? Yo(e, Jr(e) - +!o) : A(e) && (e.nodeName != "BR" || !e.nextSibling) ? e : null;
		if (t) return wi(Si(t, 1), !1);
	}
	if (a == null && i < Jr(r)) {
		let e = r.childNodes[i];
		for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords;) e = e.nextSibling;
		let t = e ? Yr(e) ? Yo(e, 0, +!o) : A(e) ? e : null : null;
		if (t) return wi(Si(t, -1), !0);
	}
	return wi(Si(Yr(r) ? Yo(r) : r, -n), n >= 0);
}
function wi(e, t) {
	if (e.width == 0) return e;
	let n = t ? e.left : e.right;
	return {
		top: e.top,
		bottom: e.bottom,
		left: n,
		right: n
	};
}
function Ti(e, t) {
	if (e.height == 0) return e;
	let n = t ? e.top : e.bottom;
	return {
		top: n,
		bottom: n,
		left: e.left,
		right: e.right
	};
}
function Ei(e, t, n) {
	let r = e.state, i = e.root.activeElement;
	r != t && e.updateState(t), i != e.dom && e.focus();
	try {
		return n();
	} finally {
		r != t && e.updateState(r), i != e.dom && i && i.focus();
	}
}
function Di(e, t, n) {
	let r = t.selection, i = n == "up" ? r.$from : r.$to;
	return Ei(e, t, () => {
		let { node: t } = e.docView.domFromPos(i.pos, n == "up" ? -1 : 1);
		for (;;) {
			let n = e.docView.nearestDesc(t, !0);
			if (!n) break;
			if (n.node.isBlock) {
				t = n.contentDOM || n.dom;
				break;
			}
			t = n.dom.parentNode;
		}
		let r = Ci(e, i.pos, 1);
		for (let e = t.firstChild; e; e = e.nextSibling) {
			let t;
			if (A(e)) t = e.getClientRects();
			else if (Yr(e)) t = Yo(e, 0, e.nodeValue.length).getClientRects();
			else continue;
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (i.bottom > i.top + 1 && (n == "up" ? r.top - i.top > (i.bottom - r.top) * 2 : i.bottom - r.bottom > (r.bottom - i.top) * 2)) return !1;
			}
		}
		return !0;
	});
}
function Oi(e, t, n) {
	let { $head: r } = t.selection;
	if (!r.parent.isTextblock) return !1;
	let i = r.parentOffset, a = !i, o = i == r.parent.content.size, s = e.domSelection();
	return s ? !Ss.test(r.parent.textContent) || !s.modify ? n == "left" || n == "backward" ? a : o : Ei(e, t, () => {
		let { focusNode: t, focusOffset: i, anchorNode: a, anchorOffset: o } = e.domSelectionRange(), c = s.caretBidiLevel;
		s.modify("move", n, "character");
		let l = r.depth ? e.docView.domAfterPos(r.before()) : e.dom, { focusNode: u, focusOffset: d } = e.domSelectionRange(), f = u && !Xr(l, u) || t == u && i == d;
		try {
			s.collapse(a, o), t && (t != a || i != o) && s.extend && s.extend(t, i);
		} catch {}
		return c != null && (s.caretBidiLevel = c), f;
	}) : r.pos == r.start() || r.pos == r.end();
}
function ki(e, t, n) {
	return Cs == t && ws == n ? Ts : (Cs = t, ws = n, Ts = n == "up" || n == "down" ? Di(e, t, n) : Oi(e, t, n));
}
function Ai(e, t, n, r, i) {
	Fi(r, t, e);
	let a = new Ps(void 0, e, t, n, r, r, r);
	return a.contentDOM && a.updateChildren(i, 0), a;
}
function ji(e, t, n) {
	let r = e.firstChild, i = !1;
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = o.dom;
		if (s.parentNode == e) {
			for (; s != r;) r = Li(r), i = !0;
			r = r.nextSibling;
		} else i = !0, e.insertBefore(s, r);
		if (o instanceof Ns) {
			let t = r ? r.previousSibling : e.lastChild;
			ji(o.contentDOM, o.children, n), r = t ? t.nextSibling : e.firstChild;
		}
	}
	for (; r;) r = Li(r), i = !0;
	i && n.trackWrites == e && (n.trackWrites = null);
}
function Mi(e, t, n) {
	if (e.length == 0) return zs;
	let r = n ? zs[0] : new Rs(), i = [r];
	for (let a = 0; a < e.length; a++) {
		let o = e[a].type.attrs;
		if (o) {
			o.nodeName && i.push(r = new Rs(o.nodeName));
			for (let e in o) {
				let a = o[e];
				a != null && (n && i.length == 1 && i.push(r = new Rs(t.isInline ? "span" : "div")), e == "class" ? r.class = (r.class ? r.class + " " : "") + a : e == "style" ? r.style = (r.style ? r.style + ";" : "") + a : e != "nodeName" && (r[e] = a));
			}
		}
	}
	return i;
}
function Ni(e, t, n, r) {
	if (n == zs && r == zs) return t;
	let i = t;
	for (let t = 0; t < r.length; t++) {
		let a = r[t], o = n[t];
		if (t) {
			let t;
			o && o.nodeName == a.nodeName && i != e && (t = i.parentNode) && t.nodeName.toLowerCase() == a.nodeName || (t = document.createElement(a.nodeName), t.pmIsDeco = !0, t.appendChild(i), o = zs[0]), i = t;
		}
		Pi(i, o || zs[0], a);
	}
	return i;
}
function Pi(e, t, n) {
	for (let r in t) r != "class" && r != "style" && r != "nodeName" && !(r in n) && e.removeAttribute(r);
	for (let r in n) r != "class" && r != "style" && r != "nodeName" && n[r] != t[r] && e.setAttribute(r, n[r]);
	if (t.class != n.class) {
		let r = t.class ? t.class.split(" ").filter(Boolean) : [], i = n.class ? n.class.split(" ").filter(Boolean) : [];
		for (let t = 0; t < r.length; t++) i.indexOf(r[t]) == -1 && e.classList.remove(r[t]);
		for (let t = 0; t < i.length; t++) r.indexOf(i[t]) == -1 && e.classList.add(i[t]);
		e.classList.length == 0 && e.removeAttribute("class");
	}
	if (t.style != n.style) {
		if (t.style) {
			let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, r;
			for (; r = n.exec(t.style);) e.style.removeProperty(r[1]);
		}
		n.style && (e.style.cssText += n.style);
	}
}
function Fi(e, t, n) {
	return Ni(e, e, zs, Mi(t, n, !A(e)));
}
function Ii(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].type.eq(t[n].type)) return !1;
	return !0;
}
function Li(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
function Ri(e, t) {
	let n = t, r = n.children.length, i = e.childCount, a = /* @__PURE__ */ new Map(), o = [];
	outer: for (; i > 0;) {
		let s;
		for (;;) if (r) {
			let e = n.children[r - 1];
			if (e instanceof Ns) n = e, r = e.children.length;
			else {
				s = e, r--;
				break;
			}
		} else if (n == t) break outer;
		else r = n.parent.children.indexOf(n), n = n.parent;
		let c = s.node;
		if (c) {
			if (c != e.child(i - 1)) break;
			--i, a.set(s, i), o.push(s);
		}
	}
	return {
		index: i,
		matched: a,
		matches: o.reverse()
	};
}
function zi(e, t) {
	return e.type.side - t.type.side;
}
function Bi(e, t, n, r) {
	let i = t.locals(e), a = 0;
	if (i.length == 0) {
		for (let n = 0; n < e.childCount; n++) {
			let o = e.child(n);
			r(o, i, t.forChild(a, o), n), a += o.nodeSize;
		}
		return;
	}
	let o = 0, s = [], c = null;
	for (let l = 0;;) {
		let u, d;
		for (; o < i.length && i[o].to == a;) {
			let e = i[o++];
			e.widget && (u ? (d ||= [u]).push(e) : u = e);
		}
		if (u) {
			if (d) {
				d.sort(zi);
				for (let e = 0; e < d.length; e++) n(d[e], l, !!c);
			} else n(u, l, !!c);
		}
		let f, p;
		if (c) p = -1, f = c, c = null;
		else if (l < e.childCount) p = l, f = e.child(l++);
		else break;
		for (let e = 0; e < s.length; e++) s[e].to <= a && s.splice(e--, 1);
		for (; o < i.length && i[o].from <= a && i[o].to > a;) s.push(i[o++]);
		let m = a + f.nodeSize;
		if (f.isText) {
			let e = m;
			o < i.length && i[o].from < e && (e = i[o].from);
			for (let t = 0; t < s.length; t++) s[t].to < e && (e = s[t].to);
			e < m && (c = f.cut(e - a), f = f.cut(0, e - a), m = e, p = -1);
		} else for (; o < i.length && i[o].to < m;) o++;
		let h = f.isInline && !f.isLeaf ? s.filter((e) => !e.inline) : s.slice();
		r(f, h, t.forChild(a, f), p), a = m;
	}
}
function Vi(e) {
	if (e.nodeName == "UL" || e.nodeName == "OL") {
		let t = e.style.cssText;
		e.style.cssText = t + "; list-style: square !important", window.getComputedStyle(e).listStyle, e.style.cssText = t;
	}
}
function Hi(e, t, n, r) {
	for (let i = 0, a = 0; i < e.childCount && a <= r;) {
		let o = e.child(i++), s = a;
		if (a += o.nodeSize, !o.isText) continue;
		let c = o.text;
		for (; i < e.childCount;) {
			let t = e.child(i++);
			if (a += t.nodeSize, !t.isText) break;
			c += t.text;
		}
		if (a >= n) {
			if (a >= r && c.slice(r - t.length - s, r - s) == t) return r - t.length;
			let e = s < r ? c.lastIndexOf(t, r - s - 1) : -1;
			if (e >= 0 && e + t.length + s >= n) return s + e;
			if (n == r && c.length >= r + t.length - s && c.slice(r - s, r - s + t.length) == t) return r;
		}
	}
	return -1;
}
function Ui(e, t, n, r, i) {
	let a = [];
	for (let o = 0, s = 0; o < e.length; o++) {
		let c = e[o], l = s, u = s += c.size;
		l >= n || u <= t ? a.push(c) : (l < t && a.push(c.slice(0, t - l, r)), i &&= (a.push(i), void 0), u > n && a.push(c.slice(n - l, c.size, r)));
	}
	return a;
}
function Wi(e, t = null) {
	let n = e.domSelectionRange(), r = e.state.doc;
	if (!n.focusNode) return null;
	let i = e.docView.nearestDesc(n.focusNode), a = i && i.size == 0, o = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
	if (o < 0) return null;
	let s = r.resolve(o), c, l;
	if ($o(n)) {
		for (c = o; i && !i.node;) i = i.parent;
		if (i && i.node.isAtom && D.isSelectable(i.node) && i.parent && !(i.node.isInline && $r(n.focusNode, n.focusOffset, i.dom))) {
			let e = i.posBefore;
			l = new D(o == e ? s : r.resolve(e));
		} else if (ls && t == "key" && o > e.state.selection.to && A(n.focusNode) && n.focusOffset == n.focusNode.childNodes.length && i && i.posAtStart > e.state.selection.to) for (let e = n.focusNode;; e = e.parentNode) {
			if (getComputedStyle(e).overflow != "visible") {
				l = T.findFrom(r.resolve(i.posAtStart), 1);
				break;
			}
			if (e == i.dom || e.nextSibling || !e.parentNode || !A(e.parentNode)) break;
		}
	} else {
		if (n instanceof e.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
			let t = o, i = o;
			for (let r = 0; r < n.rangeCount; r++) {
				let a = n.getRangeAt(r);
				t = Math.min(t, e.docView.posFromDOM(a.startContainer, a.startOffset, 1)), i = Math.max(i, e.docView.posFromDOM(a.endContainer, a.endOffset, -1));
			}
			if (t < 0) return null;
			[c, o] = i == e.state.selection.anchor ? [i, t] : [t, i], s = r.resolve(o);
		} else c = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
		if (c < 0) return null;
	}
	let u = r.resolve(c);
	if (!l) {
		let n = t == "pointer" || e.state.selection.head < s.pos && !a ? 1 : -1;
		l = ea(e, u, s, n);
	}
	return l;
}
function Gi(e) {
	return e.editable ? e.hasFocus() : na(e) && document.activeElement && document.activeElement.contains(e.dom);
}
function Ki(e, t = !1) {
	let n = e.state.selection;
	if (Qi(e, n), !Gi(e)) return;
	let r = e.input.mouseDown;
	if (!t && ds && r) {
		let t = e.domSelectionRange(), n = e.domObserver.currentSelection;
		if (t.anchorNode && n.anchorNode && Zo(t.anchorNode, t.anchorOffset, n.anchorNode, n.anchorOffset) && r.delaySelUpdate()) {
			e.domObserver.setCurSelection();
			return;
		}
	}
	if (e.domObserver.disconnectSelection(), e.cursorWrapper) Zi(e);
	else {
		let { anchor: r, head: i } = n, a, o;
		Vs && !(n instanceof E) && (n.$from.parent.inlineContent || (a = qi(e, n.from)), !n.empty && !n.$from.parent.inlineContent && (o = qi(e, n.to))), e.docView.setSelection(r, i, e, t), Vs && (a && Yi(a), o && Yi(o)), n.visible ? e.dom.classList.remove("ProseMirror-hideselection") : (e.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Xi(e));
	}
	e.domObserver.setCurSelection(), e.domObserver.connectSelection();
}
function qi(e, t) {
	let { node: n, offset: r } = e.docView.domFromPos(t, 0), i = r < n.childNodes.length ? n.childNodes[r] : null, a = r ? n.childNodes[r - 1] : null;
	if (ps && i && i.contentEditable == "false") return Ji(i);
	if ((!i || i.contentEditable == "false") && (!a || a.contentEditable == "false")) {
		if (i) return Ji(i);
		if (a) return Ji(a);
	}
}
function Ji(e) {
	return e.contentEditable = "true", ps && e.draggable && (e.draggable = !1, e.wasDraggable = !0), e;
}
function Yi(e) {
	e.contentEditable = "false", e.wasDraggable &&= (e.draggable = !0, null);
}
function Xi(e) {
	let t = e.dom.ownerDocument;
	t.removeEventListener("selectionchange", e.input.hideSelectionGuard);
	let n = e.domSelectionRange(), r = n.anchorNode, i = n.anchorOffset;
	t.addEventListener("selectionchange", e.input.hideSelectionGuard = () => {
		(n.anchorNode != r || n.anchorOffset != i) && (t.removeEventListener("selectionchange", e.input.hideSelectionGuard), setTimeout(() => {
			(!Gi(e) || e.state.selection.visible) && e.dom.classList.remove("ProseMirror-hideselection");
		}, 20));
	});
}
function Zi(e) {
	let t = e.domSelection();
	if (!t) return;
	let n = e.cursorWrapper.dom, r = n.nodeName == "IMG";
	r ? t.collapse(n.parentNode, Ko(n) + 1) : t.collapse(n, 0), !r && !e.state.selection.visible && ss && cs <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Qi(e, t) {
	if (t instanceof D) {
		let n = e.docView.descAt(t.from);
		n != e.lastSelectedViewDesc && ($i(e), n && n.selectNode(), e.lastSelectedViewDesc = n);
	} else $i(e);
}
function $i(e) {
	e.lastSelectedViewDesc &&= (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(), void 0);
}
function ea(e, t, n, r) {
	return e.someProp("createSelectionBetween", (r) => r(e, t, n)) || E.between(t, n, r);
}
function ta(e) {
	return e.editable && !e.hasFocus() ? !1 : na(e);
}
function na(e) {
	let t = e.domSelectionRange();
	if (!t.anchorNode) return !1;
	try {
		return Xr(e.dom, t.anchorNode) && (e.editable || Xr(e.dom, t.focusNode));
	} catch {
		return !1;
	}
}
function ra(e) {
	let t = e.docView.domFromPos(e.state.selection.anchor, 0), n = e.domSelectionRange();
	return Zo(t.node, t.offset, n.anchorNode, n.anchorOffset);
}
function ia(e, t) {
	let { $anchor: n, $head: r } = e.selection, i = t > 0 ? n.max(r) : n.min(r), a = i.parent.inlineContent ? i.depth ? e.doc.resolve(t > 0 ? i.after() : i.before()) : null : i;
	return a && T.findFrom(a, t);
}
function aa(e, t) {
	return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function oa(e, t, n) {
	let r = e.state.selection;
	if (r instanceof E) {
		if (n.indexOf("s") > -1) {
			let { $head: n } = r, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter;
			if (!i || i.isText || !i.isLeaf) return !1;
			let a = e.state.doc.resolve(n.pos + i.nodeSize * (t < 0 ? -1 : 1));
			return aa(e, new E(r.$anchor, a));
		}
		if (!r.empty) return !1;
		if (e.endOfTextblock(t > 0 ? "forward" : "backward")) {
			let n = ia(e.state, t);
			return n && n instanceof D ? aa(e, n) : !1;
		}
		if (!hs || n.indexOf("m") < 0) {
			let n = r.$head, i = n.textOffset ? null : t < 0 ? n.nodeBefore : n.nodeAfter, a;
			if (!i || i.isText) return !1;
			let o = t < 0 ? n.pos - i.nodeSize : n.pos;
			return i.isAtom || (a = e.docView.descAt(o)) && !a.contentDOM ? D.isSelectable(i) ? aa(e, new D(t < 0 ? e.state.doc.resolve(n.pos - i.nodeSize) : n)) : aa(e, new E(e.state.doc.resolve(t < 0 ? o : o + i.nodeSize))) : !1;
		}
	} else if (r instanceof D && r.node.isInline) return aa(e, new E(t > 0 ? r.$to : r.$from));
	else {
		let n = ia(e.state, t);
		return n ? aa(e, n) : !1;
	}
}
function sa(e, t) {
	let n = e.pmViewDesc;
	return n ? n.size == 0 && (t < 0 || e.nextSibling || e.nodeName != "BR") : A(e) && e.contentEditable == "false";
}
function ca(e, t) {
	return t < 0 ? la(e) : ua(e);
}
function la(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i, a, o = !1;
	for (ls && A(n) && r < Jr(n) && sa(n.childNodes[r], -1) && (o = !0);;) if (r > 0) {
		if (!A(n)) break;
		let e = n.childNodes[r - 1];
		if (sa(e, -1)) i = n, a = --r;
		else if (Yr(e)) n = e, r = n.nodeValue.length;
		else break;
	} else if (da(n)) break;
	else {
		let t = n.previousSibling;
		for (; t && sa(t, -1);) i = n.parentNode, a = Ko(t), t = t.previousSibling;
		if (t) n = t, r = Jr(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = 0;
		}
	}
	o ? ma(e, n, r) : i && ma(e, i, a);
}
function ua(e) {
	let t = e.domSelectionRange(), n = t.focusNode, r = t.focusOffset;
	if (!n) return;
	let i = Jr(n), a, o;
	for (;;) if (r < i) {
		if (!A(n)) break;
		let e = n.childNodes[r];
		if (sa(e, 1)) a = n, o = ++r;
		else break;
	} else if (da(n)) break;
	else {
		let t = n.nextSibling;
		for (; t && sa(t, 1);) a = t.parentNode, o = Ko(t) + 1, t = t.nextSibling;
		if (t) n = t, r = 0, i = Jr(n);
		else {
			if (n = n.parentNode, n == e.dom) break;
			r = i = 0;
		}
	}
	a && ma(e, a, o);
}
function da(e) {
	let t = e.pmViewDesc;
	return t && t.node && t.node.isBlock;
}
function fa(e, t) {
	for (; e && t == e.childNodes.length && !ei(e);) t = Ko(e) + 1, e = e.parentNode;
	for (; e && t < e.childNodes.length;) {
		let n = e.childNodes[t];
		if (Yr(n)) return n;
		if (A(n) && n.contentEditable == "false") break;
		e = n, t = 0;
	}
}
function pa(e, t) {
	for (; e && !t && !ei(e);) t = Ko(e), e = e.parentNode;
	for (; e && t;) {
		let n = e.childNodes[t - 1];
		if (Yr(n)) return n;
		if (A(n) && n.contentEditable == "false") break;
		e = n, t = e.childNodes.length;
	}
}
function ma(e, t, n) {
	if (!Yr(t)) {
		let e, r;
		(r = fa(t, n)) ? (t = r, n = 0) : (e = pa(t, n)) && (t = e, n = e.nodeValue.length);
	}
	let r = e.domSelection(), i = e.domSelectionRange();
	if (!r) return;
	$o(i) ? r.collapse(t, n) : r.extend && (r.collapse(i.anchorNode, i.anchorOffset), r.extend(t, n)), e.domObserver.setCurSelection();
	let { state: a } = e;
	setTimeout(() => {
		e.state == a && Ki(e);
	}, 50);
}
function ha(e, t) {
	let n = e.state.doc.resolve(t);
	if (!(ds || gs) && n.parent.inlineContent) {
		let r = e.coordsAtPos(t);
		if (t > n.start()) {
			let n = e.coordsAtPos(t - 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left < r.left ? "ltr" : "rtl";
		}
		if (t < n.end()) {
			let n = e.coordsAtPos(t + 1), i = (n.top + n.bottom) / 2;
			if (i > r.top && i < r.bottom && Math.abs(n.left - r.left) > 1) return n.left > r.left ? "ltr" : "rtl";
		}
	}
	let r = e.dom;
	for (let t = n.depth; t > 0; t--) if (n.node(t).isBlock) {
		r = e.nodeDOM(n.before(t)) || r;
		break;
	}
	return getComputedStyle(r).direction == "rtl" ? "rtl" : "ltr";
}
function ga(e, t, n) {
	let r = e.state.selection;
	if (r instanceof E && !r.empty || n.indexOf("s") > -1 || hs && n.indexOf("m") > -1) return !1;
	let { $from: i, $to: a } = r;
	if (!i.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
		let n = ia(e.state, t);
		if (n && n instanceof D) return aa(e, n);
	}
	if (!i.parent.inlineContent) {
		let n = t < 0 ? i : a, o = r instanceof Rn ? T.near(n, t) : T.findFrom(n, t);
		return o ? aa(e, o) : !1;
	}
	return !1;
}
function _a(e, t) {
	if (!(e.state.selection instanceof E)) return !0;
	let { $head: n, $anchor: r, empty: i } = e.state.selection;
	if (!n.sameParent(r)) return !0;
	if (!i) return !1;
	if (e.endOfTextblock(t > 0 ? "forward" : "backward")) return !0;
	let a = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter);
	if (a && !a.isText) {
		let r = e.state.tr;
		return t < 0 ? r.delete(n.pos - a.nodeSize, n.pos) : r.delete(n.pos, n.pos + a.nodeSize), e.dispatch(r), !0;
	}
	return !1;
}
function va(e, t, n) {
	e.domObserver.stop(), t.contentEditable = n, e.domObserver.start();
}
function ya(e) {
	if (!ps || e.state.selection.$head.parentOffset > 0) return !1;
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (t && A(t) && n == 0 && t.firstChild && A(t.firstChild) && t.firstChild.contentEditable == "false") {
		let n = t.firstChild;
		va(e, n, "true"), setTimeout(() => va(e, n, "false"), 20);
	}
	return !1;
}
function ba(e) {
	let t = "";
	return e.ctrlKey && (t += "c"), e.metaKey && (t += "m"), e.altKey && (t += "a"), e.shiftKey && (t += "s"), t;
}
function xa(e, t) {
	let n = t.keyCode, r = ba(t);
	if (n == 8 || hs && n == 72 && r == "c") return _a(e, -1) || ca(e, -1);
	if (n == 46 && !t.shiftKey || hs && n == 68 && r == "c") return _a(e, 1) || ca(e, 1);
	if (n == 13 || n == 27) return !0;
	if (n == 37 || hs && n == 66 && r == "c") {
		let t = n == 37 ? ha(e, e.state.selection.from) == "ltr" ? -1 : 1 : -1;
		return oa(e, t, r) || ca(e, t);
	}
	if (n == 39 || hs && n == 70 && r == "c") {
		let t = n == 39 ? ha(e, e.state.selection.from) == "ltr" ? 1 : -1 : 1;
		return oa(e, t, r) || ca(e, t);
	}
	return n == 38 || hs && n == 80 && r == "c" ? ga(e, -1, r) || ca(e, -1) : n == 40 || hs && n == 78 && r == "c" ? ya(e) || ga(e, 1, r) || ca(e, 1) : !(r != (hs ? "m" : "c") || n != 66 && n != 73 && n != 89 && n != 90);
}
function Sa(e, t) {
	e.someProp("transformCopied", (n) => {
		t = n(t, e);
	});
	let n = [], { content: r, openStart: i, openEnd: a } = t;
	for (; i > 1 && a > 1 && r.childCount == 1 && r.firstChild.childCount == 1;) {
		i--, a--;
		let e = r.firstChild;
		n.push(e.type.name, e.attrs == e.type.defaultAttrs ? null : e.attrs), r = e.content;
	}
	let o = e.someProp("clipboardSerializer") || ot.fromSchema(e.state.schema), s = Aa(), c = s.createElement("div");
	c.appendChild(o.serializeFragment(r, { document: s }));
	let l = c.firstChild, u, d = 0;
	for (; l && A(l) && (u = Us[l.nodeName.toLowerCase()]);) {
		for (let e = u.length - 1; e >= 0; e--) {
			let t = s.createElement(u[e]);
			for (; c.firstChild;) t.appendChild(c.firstChild);
			c.appendChild(t), d++;
		}
		l = c.firstChild;
	}
	return l && A(l) && l.setAttribute("data-pm-slice", `${i} ${a}${d ? ` -${d}` : ""} ${JSON.stringify(n)}`), {
		dom: c,
		text: e.someProp("clipboardTextSerializer", (n) => n(t, e)) || t.content.textBetween(0, t.content.size, "\n\n"),
		slice: t
	};
}
function Ca(e, t, n, r, i) {
	let a = i.parent.type.spec.code, o, s;
	if (!n && !t) return null;
	let c = !!t && (r || a || !n);
	if (c) {
		if (e.someProp("transformPastedText", (n) => {
			t = n(t, a || r, e);
		}), a) return s = new C(x.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0), e.someProp("transformPasted", (t) => {
			s = t(s, e, !0);
		}), s;
		let n = e.someProp("clipboardTextParser", (n) => n(t, i, r, e));
		if (n) s = n;
		else {
			let n = i.marks(), { schema: r } = e.state, a = ot.fromSchema(r);
			o = document.createElement("div"), t.split(/(?:\r\n?|\n)+/).forEach((e) => {
				let t = o.appendChild(document.createElement("p"));
				e && t.appendChild(a.serializeNode(r.text(e, n)));
			});
		}
	} else e.someProp("transformPastedHTML", (t) => {
		n = t(n, e);
	}), o = Ma(n), vs && Na(o);
	let l = o && o.querySelector("[data-pm-slice]"), u = l && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(l.getAttribute("data-pm-slice") || "");
	if (u && u[3]) for (let e = +u[3]; e > 0; e--) {
		let e = o.firstChild;
		for (; e && !A(e);) e = e.nextSibling;
		if (!e) break;
		o = e;
	}
	if (s ||= (e.someProp("clipboardParser") || e.someProp("domParser") || Ze.fromSchema(e.state.schema)).parseSlice(o, {
		preserveWhitespace: !!(c || u),
		context: i,
		ruleFromNode(e) {
			return e.nodeName == "BR" && !e.nextSibling && e.parentNode && !Hs.test(e.parentNode.nodeName) ? { ignore: !0 } : null;
		}
	}), u) s = Pa(ka(s, +u[1], +u[2]), u[4]);
	else if (s = C.maxOpen(wa(s.content, i), !0), s.openStart || s.openEnd) {
		let e = 0, t = 0;
		for (let t = s.content.firstChild; e < s.openStart && !t.type.spec.isolating; e++, t = t.firstChild);
		for (let e = s.content.lastChild; t < s.openEnd && !e.type.spec.isolating; t++, e = e.lastChild);
		s = ka(s, e, t);
	}
	return e.someProp("transformPasted", (t) => {
		s = t(s, e, c);
	}), s;
}
function wa(e, t) {
	if (e.childCount < 2) return e;
	for (let n = t.depth; n >= 0; n--) {
		let r = t.node(n).contentMatchAt(t.index(n)), i, a = [];
		if (e.forEach((e) => {
			if (!a) return;
			let t = r.findWrapping(e.type), n;
			if (!t) return a = null;
			if (n = a.length && i.length && Ea(t, i, e, a[a.length - 1], 0)) a[a.length - 1] = n;
			else {
				a.length && (a[a.length - 1] = Da(a[a.length - 1], i.length));
				let n = Ta(e, t);
				a.push(n), r = r.matchType(n.type), i = t;
			}
		}), a) return x.from(a);
	}
	return e;
}
function Ta(e, t, n = 0) {
	for (let r = t.length - 1; r >= n; r--) e = t[r].create(null, x.from(e));
	return e;
}
function Ea(e, t, n, r, i) {
	if (i < e.length && i < t.length && e[i] == t[i]) {
		let a = Ea(e, t, n, r.lastChild, i + 1);
		if (a) return r.copy(r.content.replaceChild(r.childCount - 1, a));
		if (r.contentMatchAt(r.childCount).matchType(i == e.length - 1 ? n.type : e[i + 1])) return r.copy(r.content.append(x.from(Ta(n, e, i + 1))));
	}
}
function Da(e, t) {
	if (t == 0) return e;
	let n = e.content.replaceChild(e.childCount - 1, Da(e.lastChild, t - 1)), r = e.contentMatchAt(e.childCount).fillBefore(x.empty, !0);
	return e.copy(n.append(r));
}
function Oa(e, t, n, r, i, a) {
	let o = t < 0 ? e.firstChild : e.lastChild, s = o.content;
	return e.childCount > 1 && (a = 0), i < r - 1 && (s = Oa(s, t, n, r, i + 1, a)), i >= n && (s = t < 0 ? o.contentMatchAt(0).fillBefore(s, a <= i).append(s) : s.append(o.contentMatchAt(o.childCount).fillBefore(x.empty, !0))), e.replaceChild(t < 0 ? 0 : e.childCount - 1, o.copy(s));
}
function ka(e, t, n) {
	return t < e.openStart && (e = new C(Oa(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)), n < e.openEnd && (e = new C(Oa(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)), e;
}
function Aa() {
	return document.implementation.createHTMLDocument("title");
}
function ja(e) {
	let t = window.trustedTypes;
	if (!t) return e;
	if (!Ws) {
		if (Ws = t.defaultPolicy) try {
			return Ws.createHTML(e);
		} catch {}
		Ws = t.createPolicy("ProseMirrorClipboard", { createHTML: (e) => e });
	}
	return Ws.createHTML(e);
}
function Ma(e) {
	let t = /^(\s*<meta [^>]*>)*/.exec(e);
	t && (e = e.slice(t[0].length));
	let n = Aa(), r = n.body, i = /<([a-z][^>\s]+)/i.exec(e), a;
	if ((a = i && Us[i[1].toLowerCase()]) && (e = a.map((e) => "<" + e + ">").join("") + e + a.map((e) => "</" + e + ">").reverse().join("")), r.innerHTML = ja(e), a) for (let e = 0; e < a.length; e++) r = r.querySelector(a[e]) || r;
	for (let e = 0; e < n.styleSheets.length; e++) {
		let t = n.styleSheets[e];
		for (let e = 0; e < t.rules.length; e++) {
			let n = t.rules[e];
			if (n instanceof CSSStyleRule) {
				let e = r.querySelectorAll(n.selectorText);
				for (let t = 0; t < e.length; t++) e[t].style.cssText += n.style.cssText;
			}
		}
	}
	return r;
}
function Na(e) {
	let t = e.querySelectorAll(ds ? "span:not([class]):not([style])" : "span.Apple-converted-space");
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.childNodes.length == 1 && r.textContent == "\xA0" && r.parentNode && r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "), r);
	}
}
function Pa(e, t) {
	if (!e.size) return e;
	let n = e.content.firstChild.type.schema, r;
	try {
		r = JSON.parse(t);
	} catch {
		return e;
	}
	let { content: i, openStart: a, openEnd: o } = e;
	for (let e = r.length - 2; e >= 0; e -= 2) {
		let t = n.nodes[r[e]];
		if (!t || t.hasRequiredAttrs()) break;
		try {
			i = x.from(t.create(r[e + 1], i));
		} catch {
			break;
		}
		a++, o++;
	}
	return new C(i, a, o);
}
function Fa(e) {
	for (let t in Gs) {
		let n = Gs[t];
		e.dom.addEventListener(t, e.input.eventHandlers[t] = (t) => {
			Ba(e, t) && !za(e, t) && (e.editable || !(t.type in Ks)) && n(e, t);
		}, qs[t] ? { passive: !0 } : void 0);
	}
	ps && e.dom.addEventListener("input", () => null), Ra(e);
}
function Ia(e, t) {
	e.input.lastSelectionOrigin = t, e.input.lastSelectionTime = Date.now();
}
function La(e) {
	e.input.mouseDown && e.input.mouseDown.done(), e.domObserver.stop();
	for (let t in e.input.eventHandlers) e.dom.removeEventListener(t, e.input.eventHandlers[t]);
	clearTimeout(e.input.composingTimeout), clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function Ra(e) {
	e.someProp("handleDOMEvents", (t) => {
		for (let n in t) e.input.eventHandlers[n] || e.dom.addEventListener(n, e.input.eventHandlers[n] = (t) => za(e, t));
	});
}
function za(e, t) {
	return e.someProp("handleDOMEvents", (n) => {
		let r = n[t.type];
		return r ? r(e, t) || t.defaultPrevented : !1;
	});
}
function Ba(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target; n != e.dom; n = n.parentNode) if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(t)) return !1;
	return !0;
}
function Va(e, t) {
	!za(e, t) && Gs[t.type] && (e.editable || !(t.type in Ks)) && Gs[t.type](e, t);
}
function Ha(e, t) {
	let { input: n } = e;
	return n.lastKeyDispatched || e.composing ? !1 : (n.lastKeyDispatched = !0, typeof t == "string" && (t = ti(t == "Backspace" ? 8 : 13, t)), e.someProp("handleKeyDown", (n) => n(e, t)));
}
function Ua(e) {
	return {
		left: e.clientX,
		top: e.clientY
	};
}
function Wa(e, t) {
	let n = t.x - e.clientX, r = t.y - e.clientY;
	return n * n + r * r < 100;
}
function Ga(e, t, n, r, i) {
	if (r == -1) return !1;
	let a = e.state.doc.resolve(r);
	for (let r = a.depth + 1; r > 0; r--) if (e.someProp(t, (t) => r > a.depth ? t(e, n, a.nodeAfter, a.before(r), i, !0) : t(e, n, a.node(r), a.before(r), i, !1))) return !0;
	return !1;
}
function Ka(e, t, n) {
	if (e.focused || e.focus(), e.state.selection.eq(t)) return;
	let r = e.state.tr.setSelection(t);
	r.setMeta("pointer", !0), e.dispatch(r);
}
function qa(e, t) {
	if (t == -1) return !1;
	let n = e.state.doc.resolve(t), r = n.nodeAfter;
	return r && r.isAtom && D.isSelectable(r) ? (Ka(e, new D(n)), !0) : !1;
}
function Ja(e, t) {
	if (t == -1) return !1;
	let n = e.state.selection, r, i;
	n instanceof D && (r = n.node);
	let a = e.state.doc.resolve(t);
	for (let e = a.depth + 1; e > 0; e--) {
		let t = e > a.depth ? a.nodeAfter : a.node(e);
		if (D.isSelectable(t)) {
			i = r && n.$from.depth > 0 && e >= n.$from.depth && a.before(n.$from.depth + 1) == n.$from.pos ? a.before(n.$from.depth) : a.before(e);
			break;
		}
	}
	return i != null && (Ka(e, D.create(e.state.doc, i)), !0);
}
function Ya(e, t, n, r, i) {
	return Ga(e, "handleClickOn", t, n, r) || e.someProp("handleClick", (n) => n(e, t, r)) || (i ? Ja(e, n) : qa(e, n));
}
function Xa(e, t, n, r) {
	return Ga(e, "handleDoubleClickOn", t, n, r) || e.someProp("handleDoubleClick", (n) => n(e, t, r));
}
function Za(e, t, n, r) {
	return Ga(e, "handleTripleClickOn", t, n, r) || e.someProp("handleTripleClick", (n) => n(e, t, r)) || Qa(e, n, r);
}
function Qa(e, t, n) {
	if (n.button != 0) return !1;
	let r = $a(e, t, !0), i = e.state.doc;
	return r ? (Ka(e, r), r instanceof E && i.eq(e.state.doc) && (e.input.mouseDown = new Qs(e, r)), !0) : !1;
}
function $a(e, t, n) {
	let r = e.state.doc;
	if (t == -1) return r.inlineContent ? E.create(r, 0, r.content.size) : null;
	let i = r.resolve(t);
	for (let e = i.depth + 1; e > 0; e--) {
		let t = e > i.depth ? i.nodeAfter : i.node(e), a = i.before(e);
		if (t.inlineContent) return E.create(r, a + 1, a + 1 + t.content.size);
		if (n && D.isSelectable(t)) return D.create(r, a);
	}
	return null;
}
function eo(e) {
	return oo(e);
}
function to(e, t) {
	return e.composing ? !0 : ps && Math.abs(Date.now() - e.input.compositionEndedAt) < 500 ? (e.input.compositionEndedAt = -2e8, !0) : !1;
}
function no(e) {
	let { focusNode: t, focusOffset: n } = e.domSelectionRange();
	if (!t || !A(t) || n >= t.childNodes.length) return !1;
	let r = t.childNodes[n];
	return A(r) && r.contentEditable == "false";
}
function ro(e, t) {
	clearTimeout(e.input.composingTimeout), t > -1 && (e.input.composingTimeout = setTimeout(() => oo(e), t));
}
function io(e) {
	for (e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now()); e.input.compositionNodes.length > 0;) e.input.compositionNodes.pop().markParentsDirty();
}
function ao(e) {
	let t = e.domSelectionRange();
	if (!t.focusNode) return null;
	let n = Zr(t.focusNode, t.focusOffset), r = Qr(t.focusNode, t.focusOffset);
	if (n && r && n != r) {
		let t = r.pmViewDesc, i = e.domObserver.lastChangedTextNode;
		if (n == i || r == i) return i;
		if (!t || !t.isText(r.nodeValue)) return r;
		if (e.input.compositionNode == r) {
			let e = n.pmViewDesc;
			if (e && e.isText(n.nodeValue)) return r;
		}
	}
	return n || r;
}
function oo(e, t = !1) {
	if (!(_s && e.domObserver.flushingSoon >= 0)) {
		if (e.domObserver.forceFlush(), io(e), t || e.docView && e.docView.dirty) {
			let n = Wi(e), r = e.state.selection;
			return n && !n.eq(r) ? e.dispatch(e.state.tr.setSelection(n)) : (e.markCursor || t) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? e.dispatch(e.state.tr.deleteSelection()) : e.updateState(e.state), !0;
		}
		return !1;
	}
}
function so(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.dom.parentNode.appendChild(document.createElement("div"));
	n.appendChild(t), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
	let r = getSelection(), i = document.createRange();
	i.selectNodeContents(t), e.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
		n.parentNode && n.parentNode.removeChild(n), e.focus();
	}, 50);
}
function co(e) {
	return e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1 ? e.content.firstChild : null;
}
function lo(e, t) {
	if (!e.dom.parentNode) return;
	let n = e.input.shiftKey || e.state.selection.$from.parent.type.spec.code, r = e.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
	n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
	let i = e.input.shiftKey && e.input.lastKeyCode != 45;
	setTimeout(() => {
		e.focus(), r.parentNode && r.parentNode.removeChild(r), n ? uo(e, r.value, null, i, t) : uo(e, r.textContent, r.innerHTML, i, t);
	}, 50);
}
function uo(e, t, n, r, i) {
	let a = Ca(e, t, n, r, e.state.selection.$from);
	if (e.someProp("handlePaste", (t) => t(e, i, a || C.empty))) return !0;
	if (!a) return !1;
	let o = co(a), s = o ? e.state.tr.replaceSelectionWith(o, r) : e.state.tr.replaceSelection(a);
	return e.dispatch(s.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function fo(e) {
	let t = e.getData("text/plain") || e.getData("Text");
	if (t) return t;
	let n = e.getData("text/uri-list");
	return n ? n.replace(/\r?\n/g, " ") : "";
}
function po(e, t) {
	let n;
	return e.someProp("dragCopies", (e) => {
		n ||= e(t);
	}), n == null ? !t[nc] : !n;
}
function mo(e, t, n) {
	if (!t.dataTransfer) return;
	let r = e.posAtCoords(Ua(t));
	if (!r) return;
	let i = e.state.doc.resolve(r.pos), a = n && n.slice;
	a ? e.someProp("transformPasted", (t) => {
		a = t(a, e, !1);
	}) : a = Ca(e, fo(t.dataTransfer), ec ? null : t.dataTransfer.getData("text/html"), !1, i);
	let o = !!(n && po(e, t));
	if (e.someProp("handleDrop", (n) => n(e, t, a || C.empty, o))) {
		t.preventDefault();
		return;
	}
	if (!a) return;
	t.preventDefault();
	let s = a ? zt(e.state.doc, i.pos, a) : i.pos;
	s ??= i.pos;
	let c = e.state.tr;
	if (o) {
		let { node: e } = n;
		e ? e.replace(c) : c.deleteSelection();
	}
	let l = c.mapping.map(s), u = a.openStart == 0 && a.openEnd == 0 && a.content.childCount == 1, d = c.doc;
	if (u ? c.replaceRangeWith(l, l, a.content.firstChild) : c.replaceRange(l, l, a), c.doc.eq(d)) return;
	let f = c.doc.resolve(l);
	if (u && D.isSelectable(a.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(a.content.firstChild)) c.setSelection(new D(f));
	else {
		let t = c.mapping.map(s);
		c.mapping.maps[c.mapping.maps.length - 1].forEach((e, n, r, i) => t = i), c.setSelection(ea(e, f, c.doc.resolve(t)));
	}
	e.focus(), e.dispatch(c.setMeta("uiEvent", "drop"));
}
function ho(e, t) {
	if (e == t) return !0;
	for (let n in e) if (e[n] !== t[n]) return !1;
	for (let n in t) if (!(n in e)) return !1;
	return !0;
}
function go(e, t, n, r, i, a, o) {
	let s = e.slice();
	for (let e = 0, t = a; e < n.maps.length; e++) {
		let r = 0;
		n.maps[e].forEach((e, n, i, a) => {
			let o = a - i - (n - e);
			for (let i = 0; i < s.length; i += 3) {
				let a = s[i + 1];
				if (a < 0 || e > a + t - r) continue;
				let c = s[i] + t - r;
				n >= c ? s[i + 1] = e <= c ? -2 : -1 : e >= t && o && (s[i] += o, s[i + 1] += o);
			}
			r += o;
		}), t = n.maps[e].map(t, -1);
	}
	let c = !1;
	for (let t = 0; t < s.length; t += 3) if (s[t + 1] < 0) {
		if (s[t + 1] == -2) {
			c = !0, s[t + 1] = -1;
			continue;
		}
		let l = n.map(e[t] + a), u = l - i;
		if (u < 0 || u >= r.content.size) {
			c = !0;
			continue;
		}
		let d = n.map(e[t + 1] + a, -1) - i, { index: f, offset: p } = r.content.findIndex(u), m = r.maybeChild(f);
		if (m && p == u && p + m.nodeSize == d) {
			let r = s[t + 2].mapInner(n, m, l + 1, e[t] + a + 1, o);
			r == uc ? (s[t + 1] = -2, c = !0) : (s[t] = u, s[t + 1] = d, s[t + 2] = r);
		} else c = !0;
	}
	if (c) {
		let c = xo(vo(s, e, t, n, i, a, o), r, 0, o);
		t = c.local;
		for (let e = 0; e < s.length; e += 3) s[e + 1] < 0 && (s.splice(e, 3), e -= 3);
		for (let e = 0, t = 0; e < c.children.length; e += 3) {
			let n = c.children[e];
			for (; t < s.length && s[t] < n;) t += 3;
			s.splice(t, 0, c.children[e], c.children[e + 1], c.children[e + 2]);
		}
	}
	return new j(t.sort(So), s);
}
function _o(e, t) {
	if (!t || !e.length) return e;
	let n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		n.push(new sc(i.from + t, i.to + t, i.type));
	}
	return n;
}
function vo(e, t, n, r, i, a, o) {
	function s(e, t) {
		for (let a = 0; a < e.local.length; a++) {
			let s = e.local[a].map(r, i, t);
			s ? n.push(s) : o.onRemove && o.onRemove(e.local[a].spec);
		}
		for (let n = 0; n < e.children.length; n += 3) s(e.children[n + 2], e.children[n] + t + 1);
	}
	for (let n = 0; n < e.length; n += 3) e[n + 1] == -1 && s(e[n + 2], t[n] + a + 1);
	return n;
}
function yo(e, t, n) {
	if (t.isLeaf) return null;
	let r = n + t.nodeSize, i = null;
	for (let t = 0, a; t < e.length; t++) (a = e[t]) && a.from > n && a.to < r && ((i ||= []).push(a), e[t] = null);
	return i;
}
function bo(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) e[n] != null && t.push(e[n]);
	return t;
}
function xo(e, t, n, r) {
	let i = [], a = !1;
	t.forEach((t, o) => {
		let s = yo(e, t, o + n);
		if (s) {
			a = !0;
			let e = xo(s, t, n + o + 1, r);
			e != uc && i.push(o, o + t.nodeSize, e);
		}
	});
	let o = _o(a ? bo(e) : e, -n).sort(So);
	if (o.length) {
		let e = new rc(t.content);
		for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || (r.onRemove && r.onRemove(o[n].spec), o.splice(n--, 1));
	}
	return o.length || i.length ? new j(o, i) : uc;
}
function So(e, t) {
	return e.from - t.from || e.to - t.to;
}
function Co(e) {
	let t = e;
	for (let n = 0; n < t.length - 1; n++) {
		let r = t[n];
		if (r.from != r.to) for (let i = n + 1; i < t.length; i++) {
			let a = t[i];
			if (a.from == r.from) a.to != r.to && (t == e && (t = e.slice()), t[i] = a.copy(a.from, r.to), wo(t, i + 1, a.copy(r.to, a.to)));
			else {
				a.from < r.to && (t == e && (t = e.slice()), t[n] = r.copy(r.from, a.from), wo(t, i, r.copy(a.from, r.to)));
				break;
			}
		}
	}
	return t;
}
function wo(e, t, n) {
	for (; t < e.length && So(n, e[t]) > 0;) t++;
	e.splice(t, 0, n);
}
function To(e) {
	let t = [];
	return e.someProp("decorations", (n) => {
		let r = n(e.state);
		r && r != uc && t.push(r);
	}), e.cursorWrapper && t.push(j.create(e.state.doc, [e.cursorWrapper.deco])), dc.from(t);
}
function Eo(e) {
	if (!gc.has(e) && (gc.set(e, null), [
		"normal",
		"nowrap",
		"pre-line"
	].indexOf(getComputedStyle(e.dom).whiteSpace) !== -1)) {
		if (e.requiresGeckoHackNode = ls, _c) return;
		console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), _c = !0;
	}
}
function Do(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.domAtPos(e.state.selection.anchor);
	return Zo(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function Oo(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return Do(e, n);
	}
	let n;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), e.dom.removeEventListener("beforeinput", r, !0), n ? Do(e, n) : null;
}
function ko(e, t) {
	for (let n = t.parentNode; n && n != e.dom; n = n.parentNode) {
		let t = e.docView.nearestDesc(n, !0);
		if (t && t.node.isBlock) return n;
	}
	return null;
}
function Ao(e, t) {
	let { focusNode: n, focusOffset: r } = e.domSelectionRange();
	for (let i of t) if (i.parentNode?.nodeName == "TR") {
		let t = i.nextSibling;
		for (; t && t.nodeName != "TD" && t.nodeName != "TH";) t = t.nextSibling;
		if (t) {
			let a = t;
			for (;;) {
				let e = a.firstChild;
				if (!e || !A(e) || e.contentEditable == "false" || /^(BR|IMG)$/.test(e.nodeName)) break;
				a = e;
			}
			a.insertBefore(i, a.firstChild), n == i && e.domSelection().collapse(i, r);
		} else i.parentNode.removeChild(i);
	}
}
function jo(e, t, n, r) {
	let { node: i, fromOffset: a, toOffset: o, from: s, to: c } = e.docView.parseRange(t, n), l = e.domSelectionRange(), u, d = l.anchorNode;
	if (d && Xr(e.dom, d) && (u = [{
		node: d,
		offset: l.anchorOffset
	}], $o(l) || u.push({
		node: l.focusNode,
		offset: l.focusOffset
	})), ds && e.input.lastKeyCode === 8) for (let e = o; e > a; e--) {
		let t = i.childNodes[e - 1], n = t.pmViewDesc;
		if (t.nodeName == "BR" && !n) {
			o = e;
			break;
		}
		if (!n || n.size) break;
	}
	let f = e.state.doc, p = e.someProp("domParser") || Ze.fromSchema(e.state.schema), m = f.resolve(s), h = null, g = p.parse(i, {
		topNode: m.parent,
		topMatch: m.parent.contentMatchAt(m.index()),
		topOpen: !0,
		from: a,
		to: o,
		preserveWhitespace: m.parent.type.whitespace != "pre" || "full",
		findPositions: u,
		ruleFromNode: vc(r),
		context: m
	});
	if (u && u[0].pos != null) {
		let e = u[0].pos, t = u[1] && u[1].pos;
		t ??= e, h = {
			anchor: e + s,
			head: t + s
		};
	}
	return {
		doc: g,
		sel: h,
		from: s,
		to: c
	};
}
function Mo(e, t, n, r, i) {
	let a = e.input.compositionPendingChanges || (e.composing ? e.input.compositionID : 0);
	if (e.input.compositionPendingChanges = 0, t < 0) {
		let t = e.input.lastSelectionTime > Date.now() - 50 ? e.input.lastSelectionOrigin : null, n = Wi(e, t);
		if (n && !e.state.selection.eq(n)) {
			if (ds && _s && e.input.lastKeyCode === 13 && Date.now() - 100 < e.input.lastKeyCodeTime && Ha(e, "Enter")) return;
			let r = e.state.tr.setSelection(n);
			t == "pointer" ? r.setMeta("pointer", !0) : t == "key" && r.scrollIntoView(), a && r.setMeta("composition", a), e.dispatch(r);
		}
		return;
	}
	let o = e.state.doc.resolve(t), s = o.sharedDepth(n);
	t = o.before(s + 1), n = e.state.doc.resolve(n).after(s + 1);
	let c = e.state.selection, l = jo(e, t, n, i), u = e.state.doc, d = u.slice(l.from, l.to), f, p;
	e.input.lastKeyCode === 8 && Date.now() - 100 < e.input.lastKeyCodeTime ? (f = e.state.selection.to, p = "end") : (f = e.state.selection.from, p = "start"), e.input.lastKeyCode = null;
	let m = Ro(d.content, l.doc.content, l.from, f, p);
	if (m && e.input.domChangeCount++, (ms && e.input.lastIOSEnter > Date.now() - 225 || _s) && i.some((e) => A(e) && !yc.test(e.nodeName)) && (!m || m.endA >= m.endB) && Ha(e, "Enter")) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (!m) {
		if (r && c instanceof E && !c.empty && c.$head.sameParent(c.$anchor) && !e.composing && !(l.sel && l.sel.anchor != l.sel.head)) m = {
			start: c.from,
			endA: c.to,
			endB: c.to
		};
		else {
			if (l.sel) {
				let t = No(e, e.state.doc, l.sel);
				if (t && !t.eq(e.state.selection)) {
					let n = e.state.tr.setSelection(t);
					a && n.setMeta("composition", a), e.dispatch(n);
				}
			}
			return;
		}
	}
	e.state.selection.from < e.state.selection.to && m.start == m.endB && e.state.selection instanceof E && (m.start > e.state.selection.from && m.start <= e.state.selection.from + 2 && e.state.selection.from >= l.from ? m.start = e.state.selection.from : m.endA < e.state.selection.to && m.endA >= e.state.selection.to - 2 && e.state.selection.to <= l.to && (m.endB += e.state.selection.to - m.endA, m.endA = e.state.selection.to)), ss && cs <= 11 && m.endB == m.start + 1 && m.endA == m.start && m.start > l.from && l.doc.textBetween(m.start - l.from - 1, m.start - l.from + 1) == " \xA0" && (m.start--, m.endA--, m.endB--);
	let h = l.doc.resolveNoCache(m.start - l.from), g = l.doc.resolveNoCache(m.endB - l.from), _ = u.resolve(m.start), ee = h.sameParent(g) && h.parent.inlineContent && _.end() >= m.endA;
	if ((ms && e.input.lastIOSEnter > Date.now() - 225 && (!ee || i.some((e) => e.nodeName == "DIV" || e.nodeName == "P")) || !ee && Io(l.doc, h.pos, g.pos)) && Ha(e, "Enter")) {
		e.input.lastIOSEnter = 0;
		return;
	}
	if (e.state.selection.anchor > m.start && (ee ? m.endA > m.start && m.endB == m.start : Fo(u, m.start, m.endA, h, g)) && Ha(e, "Backspace")) {
		_s && ds && e.domObserver.suppressSelectionUpdates();
		return;
	}
	ds && m.endB == m.start && (e.input.lastChromeDelete = Date.now()), _s && !ee && h.start() != g.start() && g.parentOffset == 0 && h.depth == g.depth && l.sel && l.sel.anchor == l.sel.head && l.sel.head == m.endA && (m.endB -= 2, g = l.doc.resolveNoCache(m.endB - l.from), setTimeout(() => Ha(e, "Enter"), 20));
	let v = m.start, y = m.endA, b = (t) => {
		let n = t || e.state.tr.replace(v, y, l.doc.slice(m.start - l.from, m.endB - l.from));
		if (l.sel) {
			let t = No(e, n.doc, l.sel);
			t && !(ds && e.composing && t.empty && (m.start != m.endB || e.input.lastChromeDelete < Date.now() - 100) && (t.head == v || t.head == n.mapping.map(y) - 1) || ss && t.empty && t.head == v) && n.setSelection(t);
		}
		return a && n.setMeta("composition", a), n.scrollIntoView();
	}, te;
	if (ee) {
		if (h.pos == g.pos) {
			ss && cs <= 11 && h.parentOffset == 0 && (e.domObserver.suppressSelectionUpdates(), setTimeout(() => Ki(e), 20));
			let t = b(e.state.tr.delete(v, y)), n = u.resolve(m.start).marksAcross(u.resolve(m.endA));
			n && t.ensureMarks(n), e.dispatch(t);
		} else if (m.endA == m.endB && (te = Po(h.parent.content.cut(h.parentOffset, g.parentOffset), _.parent.content.cut(_.parentOffset, m.endA - _.start())))) {
			let t = b(e.state.tr);
			te.type == "add" ? t.addMark(v, y, te.mark) : t.removeMark(v, y, te.mark), e.dispatch(t);
		} else if (h.parent.child(h.index()).isText && h.index() == g.index() - +!g.textOffset) {
			let t = h.parent.textBetween(h.parentOffset, g.parentOffset), n = () => b(e.state.tr.insertText(t, v, y));
			e.someProp("handleTextInput", (r) => r(e, v, y, t, n)) || e.dispatch(n());
		} else e.dispatch(b());
	} else e.dispatch(b());
}
function No(e, t, n) {
	return Math.max(n.anchor, n.head) > t.content.size ? null : ea(e, t.resolve(n.anchor), t.resolve(n.head));
}
function Po(e, t) {
	let n = e.firstChild.marks, r = t.firstChild.marks, i = n, a = r, o, s, c;
	for (let e = 0; e < r.length; e++) i = r[e].removeFromSet(i);
	for (let e = 0; e < n.length; e++) a = n[e].removeFromSet(a);
	if (i.length == 1 && a.length == 0) s = i[0], o = "add", c = (e) => e.mark(s.addToSet(e.marks));
	else if (i.length == 0 && a.length == 1) s = a[0], o = "remove", c = (e) => e.mark(s.removeFromSet(e.marks));
	else return null;
	let l = [];
	for (let e = 0; e < t.childCount; e++) l.push(c(t.child(e)));
	if (x.from(l).eq(e)) return {
		mark: s,
		type: o
	};
}
function Fo(e, t, n, r, i) {
	if (n - t <= i.pos - r.pos || Lo(r, !0, !1) < i.pos) return !1;
	let a = e.resolve(t);
	if (!r.parent.inlineContent) {
		let e = a.nodeAfter;
		return e != null && n == t + e.nodeSize;
	}
	if (a.parentOffset < a.parent.content.size || !a.parent.isTextblock) return !1;
	let o = e.resolve(Lo(a, !0, !0));
	return !o.parent.isTextblock || o.pos > n || Lo(o, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Io(e, t, n) {
	let r = 0, i = 0;
	return e.nodesBetween(t, n, (e, a) => {
		e.isTextblock && a >= t && a < n ? r++ : (e.isText ? /\S/.test(e.text.slice(Math.max(0, t - a), Math.min(e.nodeSize, n - a))) : e.isLeaf) && i++;
	}), i == 0 && r == 1;
}
function Lo(e, t, n) {
	let r = e.depth, i = t ? e.end() : e.pos;
	for (; r > 0 && (t || e.indexAfter(r) == e.node(r).childCount);) r--, i++, t = !1;
	if (n) {
		let t = e.node(r).maybeChild(e.indexAfter(r));
		for (; t && !t.isLeaf;) t = t.firstChild, i++;
	}
	return i;
}
function Ro(e, t, n, r, i) {
	let a = e.findDiffStart(t, n), o = n + e.size, s = n + t.size;
	if (a == null) return null;
	let { a: c, b: l } = e.findDiffEnd(t, o, s);
	if (i == "end") {
		let e = Math.max(0, a - Math.min(c, l));
		r -= c + e - a;
	}
	if (c < a && o < s) {
		let e = r <= a && r >= c ? a - r : 0;
		a -= e, l = a + (l - c), c = a;
	} else if (l < a) {
		let e = r <= a && r >= l ? a - r : 0;
		a -= e, c = a + (c - l), l = a;
	}
	return {
		start: a,
		endA: c,
		endB: l
	};
}
function zo(e) {
	let t = Object.create(null);
	return t.class = "ProseMirror", t.contenteditable = String(e.editable), e.someProp("attributes", (n) => {
		if (typeof n == "function" && (n = n(e.state)), n) for (let e in n) e == "class" ? t.class += " " + n[e] : e == "style" ? t.style = (t.style ? t.style + ";" : "") + n[e] : !t[e] && e != "contenteditable" && e != "nodeName" && (t[e] = String(n[e]));
	}), t.translate ||= "no", [sc.node(0, e.state.doc.content.size, t)];
}
function Bo(e) {
	if (e.markCursor) {
		let t = document.createElement("img");
		t.className = "ProseMirror-separator", t.setAttribute("mark-placeholder", "true"), t.setAttribute("alt", ""), e.cursorWrapper = {
			dom: t,
			deco: sc.widget(e.state.selection.from, t, {
				raw: !0,
				marks: e.markCursor
			})
		};
	} else e.cursorWrapper = null;
}
function Vo(e) {
	return !e.someProp("editable", (t) => t(e.state) === !1);
}
function Ho(e, t) {
	let n = Math.min(e.$anchor.sharedDepth(e.head), t.$anchor.sharedDepth(t.head));
	return e.$anchor.start(n) != t.$anchor.start(n);
}
function Uo(e) {
	let t = Object.create(null);
	function n(e) {
		for (let n in e) Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
	}
	return e.someProp("nodeViews", n), e.someProp("markViews", n), t;
}
function Wo(e, t) {
	let n = 0, r = 0;
	for (let r in e) {
		if (e[r] != t[r]) return !0;
		n++;
	}
	for (let e in t) r++;
	return n != r;
}
function Go(e) {
	if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction) throw RangeError("Plugins passed directly to the view must not have a state component");
}
var Ko, qo, Jo, Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, ss, cs, ls, us, ds, fs, ps, ms, hs, gs, _s, vs, ys, bs, xs, Ss, Cs, ws, Ts, Es, Ds, Os, ks, As, js, Ms, Ns, Ps, Fs, Is, Ls, Rs, zs, Bs, Vs, Hs, Us, Ws, Gs, Ks, qs, Js, Ys, Xs, Zs, Qs, $s, ec, tc, nc, rc, ic, ac, oc, sc, cc, lc, j, uc, dc, fc, pc, mc, hc, gc, _c, vc, yc, bc, xc = e((() => {
	Yn(), ct(), Tn(), Ko = function(e) {
		for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
	}, qo = function(e) {
		let t = e.assignedSlot || e.parentNode;
		return t && t.nodeType == 11 ? t.host : t;
	}, Jo = null, Yo = function(e, t, n) {
		let r = Jo ||= document.createRange();
		return r.setEnd(e, n ?? e.nodeValue.length), r.setStart(e, t || 0), r;
	}, Xo = function() {
		Jo = null;
	}, Zo = function(e, t, n, r) {
		return n && (qr(e, t, n, r, -1) || qr(e, t, n, r, 1));
	}, Qo = /^(img|br|input|textarea|hr)$/i, $o = function(e) {
		return e.focusNode && Zo(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset);
	}, es = typeof navigator < "u" ? navigator : null, ts = typeof document < "u" ? document : null, ns = es && es.userAgent || "", rs = /Edge\/(\d+)/.exec(ns), is = /MSIE \d/.exec(ns), as = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ns), ss = !!(is || as || rs), cs = is ? document.documentMode : as ? +as[1] : rs ? +rs[1] : 0, ls = !ss && /gecko\/(\d+)/i.test(ns), ls && +(/Firefox\/(\d+)/.exec(ns) || [0, 0])[1], us = !ss && /Chrome\/(\d+)/.exec(ns), ds = !!us, fs = us ? +us[1] : 0, ps = !ss && !!es && /Apple Computer/.test(es.vendor), ms = ps && (/Mobile\/\w+/.test(ns) || !!es && es.maxTouchPoints > 2), hs = ms || (es ? /Mac/.test(es.platform) : !1), gs = es ? /Win/.test(es.platform) : !1, _s = /Android \d/.test(ns), vs = !!ts && "webkitFontSmoothing" in ts.documentElement.style, ys = vs ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0, bs = null, xs = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, Ss = /[\u0590-\u08ac]/, Cs = null, ws = null, Ts = !1, Es = 0, Ds = 1, Os = 2, ks = 3, As = class {
		constructor(e, t, n, r) {
			this.parent = e, this.children = t, this.dom = n, this.contentDOM = r, this.dirty = Es, n.pmViewDesc = this;
		}
		matchesWidget(e) {
			return !1;
		}
		matchesMark(e) {
			return !1;
		}
		matchesNode(e, t, n) {
			return !1;
		}
		matchesHack(e) {
			return !1;
		}
		parseRule(e) {
			return null;
		}
		stopEvent(e) {
			return !1;
		}
		get size() {
			let e = 0;
			for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
			return e;
		}
		get border() {
			return 0;
		}
		destroy() {
			this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
			for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
		}
		posBeforeChild(e) {
			for (let t = 0, n = this.posAtStart;; t++) {
				let r = this.children[t];
				if (r == e) return n;
				n += r.size;
			}
		}
		get posBefore() {
			return this.parent.posBeforeChild(this);
		}
		get posAtStart() {
			return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
		}
		get posAfter() {
			return this.posBefore + this.size;
		}
		get posAtEnd() {
			return this.posAtStart + this.size - 2 * this.border;
		}
		localPosFromDOM(e, t, n) {
			if (this.contentDOM && Xr(this.contentDOM, e)) {
				if (n < 0) {
					let n, r;
					if (e == this.contentDOM) n = e.childNodes[t - 1];
					else {
						for (; e.parentNode != this.contentDOM;) e = e.parentNode;
						n = e.previousSibling;
					}
					for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.previousSibling;
					return n ? this.posBeforeChild(r) + r.size : this.posAtStart;
				}
				{
					let n, r;
					if (e == this.contentDOM) n = e.childNodes[t];
					else {
						for (; e.parentNode != this.contentDOM;) e = e.parentNode;
						n = e.nextSibling;
					}
					for (; n && !((r = n.pmViewDesc) && r.parent == this);) n = n.nextSibling;
					return n ? this.posBeforeChild(r) : this.posAtEnd;
				}
			}
			let r;
			if (e == this.dom && this.contentDOM) r = t > Ko(this.contentDOM);
			else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
				let n = e.compareDocumentPosition(this.contentDOM);
				r = n & 16 ? t > Array.from(e.childNodes).findIndex((e) => e.contains(this.contentDOM)) : !(n & 4);
			} else if (this.dom.firstChild) {
				if (t == 0) for (let t = e;; t = t.parentNode) {
					if (t == this.dom) {
						r = !1;
						break;
					}
					if (t.previousSibling) break;
				}
				if (r == null && t == e.childNodes.length) for (let t = e;; t = t.parentNode) {
					if (t == this.dom) {
						r = !0;
						break;
					}
					if (t.nextSibling) break;
				}
			}
			return r ?? n > 0 ? this.posAtEnd : this.posAtStart;
		}
		nearestDesc(e, t = !1) {
			for (let n = !0, r = e; r; r = r.parentNode) {
				let i = this.getDesc(r), a;
				if (i && (!t || i.node)) {
					if (n && (a = i.nodeDOM) && !(A(a) ? Xr(a, e) : a == e)) n = !1;
					else return i;
				}
			}
		}
		getDesc(e) {
			let t = e.pmViewDesc;
			for (let e = t; e; e = e.parent) if (e == this) return t;
		}
		posFromDOM(e, t, n) {
			for (let r = e; r; r = r.parentNode) {
				let i = this.getDesc(r);
				if (i) return i.localPosFromDOM(e, t, n);
			}
			return -1;
		}
		descAt(e) {
			for (let t = 0, n = 0; t < this.children.length; t++) {
				let r = this.children[t], i = n + r.size;
				if (n == e && i != n) {
					for (; !r.border && r.children.length;) for (let e = 0; e < r.children.length; e++) {
						let t = r.children[e];
						if (t.size) {
							r = t;
							break;
						}
					}
					return r;
				}
				if (e < i) return r.descAt(e - n - r.border);
				n = i;
			}
		}
		domFromPos(e, t) {
			if (!this.contentDOM) return {
				node: this.dom,
				offset: 0,
				atom: e + 1
			};
			let n = 0, r = 0;
			for (let t = 0; n < this.children.length; n++) {
				let i = this.children[n], a = t + i.size;
				if (a > e) {
					r = e - t;
					break;
				}
				t = a;
			}
			if (r) return this.children[n].domFromPos(r - this.children[n].border, t);
			for (; n > 0; n--) {
				let e = this.children[n - 1];
				if (e.size || !(e instanceof Is || e instanceof js && e.side >= 0)) break;
			}
			if (t <= 0) {
				let e, r = !0;
				for (; e = n ? this.children[n - 1] : null, e && e.dom.parentNode != this.contentDOM; n--, r = !1);
				return e && t && r && !e.border && !e.domAtom ? e.domFromPos(e.size, t) : {
					node: this.contentDOM,
					offset: e ? Ko(e.dom) + 1 : 0
				};
			}
			{
				let e, r = !0;
				for (; e = n < this.children.length ? this.children[n] : null, e && e.dom.parentNode != this.contentDOM; n++, r = !1);
				return e && r && !e.border && !e.domAtom ? e.domFromPos(0, t) : {
					node: this.contentDOM,
					offset: e ? Ko(e.dom) : this.contentDOM.childNodes.length
				};
			}
		}
		parseRange(e, t, n = 0) {
			if (this.children.length == 0) return {
				node: this.contentDOM,
				from: e,
				to: t,
				fromOffset: 0,
				toOffset: this.contentDOM.childNodes.length
			};
			let r = -1, i = -1;
			for (let a = n, o = 0;; o++) {
				let n = this.children[o], s = a + n.size;
				if (r == -1 && e <= s) {
					let i = a + n.border;
					if (e >= i && t <= s - n.border && n.node && n.contentDOM && this.contentDOM.contains(n.contentDOM)) return n.parseRange(e, t, i);
					e = a;
					for (let t = o; t > 0; t--) {
						let n = this.children[t - 1];
						if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
							r = Ko(n.dom) + 1;
							break;
						}
						e -= n.size;
					}
					r == -1 && (r = 0);
				}
				if (r > -1 && (s > t || o == this.children.length - 1)) {
					t = s;
					for (let e = o + 1; e < this.children.length; e++) {
						let n = this.children[e];
						if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(-1)) {
							i = Ko(n.dom);
							break;
						}
						t += n.size;
					}
					i == -1 && (i = this.contentDOM.childNodes.length);
					break;
				}
				a = s;
			}
			return {
				node: this.contentDOM,
				from: e,
				to: t,
				fromOffset: r,
				toOffset: i
			};
		}
		emptyChildAt(e) {
			if (this.border || !this.contentDOM || !this.children.length) return !1;
			let t = this.children[e < 0 ? 0 : this.children.length - 1];
			return t.size == 0 || t.emptyChildAt(e);
		}
		domAfterPos(e) {
			let { node: t, offset: n } = this.domFromPos(e, 0);
			if (!A(t) || n == t.childNodes.length) throw RangeError("No node after pos " + e);
			return t.childNodes[n];
		}
		setSelection(e, t, n, r = !1) {
			let i = Math.min(e, t), a = Math.max(e, t);
			for (let o = 0, s = 0; o < this.children.length; o++) {
				let c = this.children[o], l = s + c.size;
				if (i > s && a < l) return c.setSelection(e - s - c.border, t - s - c.border, n, r);
				s = l;
			}
			let o = this.domFromPos(e, e ? -1 : 1), s = t == e ? o : this.domFromPos(t, t ? -1 : 1), c = n.root.getSelection(), l = n.domSelectionRange(), u = !1;
			if ((ls || ps) && e == t) {
				let { node: e, offset: t } = o;
				if (Yr(e)) {
					if (u = !!(t && e.nodeValue[t - 1] == "\n"), u && t == e.nodeValue.length) for (let t = e, n; t; t = t.parentNode) {
						if (n = t.nextSibling) {
							n.nodeName == "BR" && (o = s = {
								node: n.parentNode,
								offset: Ko(n) + 1
							});
							break;
						}
						let e = t.pmViewDesc;
						if (e && e.node && e.node.isBlock) break;
					}
				} else {
					let n = e.childNodes[t - 1];
					u = n && (n.nodeName == "BR" || n.contentEditable == "false");
				}
			}
			if (ls && l.focusNode && l.focusNode != s.node && A(l.focusNode)) {
				let e = l.focusNode.childNodes[l.focusOffset];
				e && e.contentEditable == "false" && (r = !0);
			}
			if (!(r || u && ps) && Zo(o.node, o.offset, l.anchorNode, l.anchorOffset) && Zo(s.node, s.offset, l.focusNode, l.focusOffset)) return;
			let d = !1;
			if ((c.extend || e == t) && !(u && ls)) {
				c.collapse(o.node, o.offset);
				try {
					e != t && c.extend(s.node, s.offset), d = !0;
				} catch {}
			}
			if (!d) {
				if (e > t) {
					let e = o;
					o = s, s = e;
				}
				let n = document.createRange();
				n.setEnd(s.node, s.offset), n.setStart(o.node, o.offset), c.removeAllRanges(), c.addRange(n);
			}
		}
		ignoreMutation(e) {
			return !this.contentDOM && e.type != "selection";
		}
		get contentLost() {
			return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
		}
		markDirty(e, t) {
			for (let n = 0, r = 0; r < this.children.length; r++) {
				let i = this.children[r], a = n + i.size;
				if (n == a ? e <= a && t >= n : e < a && t > n) {
					let r = n + i.border, o = a - i.border;
					if (e >= r && t <= o) {
						this.dirty = e == n || t == a ? Os : Ds, e == r && t == o && (i.contentLost || i.dom.parentNode != this.contentDOM) ? i.dirty = ks : i.markDirty(e - r, t - r);
						return;
					}
					i.dirty = i.dom == i.contentDOM && i.dom.parentNode == this.contentDOM && !i.children.length ? Os : ks;
				}
				n = a;
			}
			this.dirty = Os;
		}
		markParentsDirty() {
			let e = 1;
			for (let t = this.parent; t; t = t.parent, e++) {
				let n = e == 1 ? Os : Ds;
				t.dirty < n && (t.dirty = n);
			}
		}
		get domAtom() {
			return !1;
		}
		get ignoreForCoords() {
			return !1;
		}
		get ignoreForSelection() {
			return !1;
		}
		isText(e) {
			return !1;
		}
	}, js = class extends As {
		constructor(e, t, n, r) {
			let i, a = t.type.toDOM;
			if (typeof a == "function" && (a = a(n, () => {
				if (!i) return r;
				if (i.parent) return i.parent.posBeforeChild(i);
			})), !t.type.spec.raw) {
				let e = A(a) ? a : document.createElement("span");
				e != a && (e.appendChild(a), a = e), e.hasAttribute("contenteditable") || (e.contentEditable = "false"), e.classList.add("ProseMirror-widget");
			}
			super(e, [], a, null), this.widget = t, this.widget = t, i = this;
		}
		matchesWidget(e) {
			return this.dirty == Es && e.type.eq(this.widget.type);
		}
		parseRule() {
			return { ignore: !0 };
		}
		stopEvent(e) {
			let t = this.widget.spec.stopEvent;
			return t ? t(e) : !1;
		}
		ignoreMutation(e) {
			return e.type != "selection" || this.widget.spec.ignoreSelection;
		}
		destroy() {
			this.widget.type.destroy(this.dom), super.destroy();
		}
		get domAtom() {
			return !0;
		}
		get ignoreForSelection() {
			return !!this.widget.type.spec.relaxedSide;
		}
		get side() {
			return this.widget.type.side;
		}
	}, Ms = class extends As {
		constructor(e, t, n, r) {
			super(e, [], t, null), this.textDOM = n, this.text = r;
		}
		get size() {
			return this.text.length;
		}
		localPosFromDOM(e, t) {
			return e == this.textDOM ? this.posAtStart + t : this.posAtStart + (t ? this.size : 0);
		}
		domFromPos(e) {
			return {
				node: this.textDOM,
				offset: e
			};
		}
		ignoreMutation(e) {
			return e.type === "characterData" && e.target.nodeValue == e.oldValue;
		}
	}, Ns = class e extends As {
		constructor(e, t, n, r, i) {
			super(e, [], n, r), this.mark = t, this.spec = i;
		}
		static create(t, n, r, i) {
			let a = i.nodeViews[n.type.name], o = a && a(n, i, r);
			return o && o.dom || (o = ot.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new e(t, n, o.dom, o.contentDOM || o.dom, o);
		}
		parseRule() {
			return this.dirty & ks || this.mark.type.spec.reparseInView ? null : {
				mark: this.mark.type.name,
				attrs: this.mark.attrs,
				contentElement: this.contentDOM
			};
		}
		matchesMark(e) {
			return this.dirty != ks && this.mark.eq(e);
		}
		markDirty(e, t) {
			if (super.markDirty(e, t), this.dirty != Es) {
				let e = this.parent;
				for (; !e.node;) e = e.parent;
				e.dirty < this.dirty && (e.dirty = this.dirty), this.dirty = Es;
			}
		}
		slice(t, n, r) {
			let i = e.create(this.parent, this.mark, !0, r), a = this.children, o = this.size;
			n < o && (a = Ui(a, n, o, r)), t > 0 && (a = Ui(a, 0, t, r));
			for (let e = 0; e < a.length; e++) a[e].parent = i;
			return i.children = a, i;
		}
		ignoreMutation(e) {
			return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
		}
		destroy() {
			this.spec.destroy && this.spec.destroy(), super.destroy();
		}
	}, Ps = class e extends As {
		constructor(e, t, n, r, i, a, o) {
			super(e, [], i, a), this.node = t, this.outerDeco = n, this.innerDeco = r, this.nodeDOM = o;
		}
		static create(t, n, r, i, a, o) {
			let s = a.nodeViews[n.type.name], c, l = s && s(n, a, () => {
				if (!c) return o;
				if (c.parent) return c.parent.posBeforeChild(c);
			}, r, i), u = l && l.dom, d = l && l.contentDOM;
			if (n.isText) {
				if (!u) u = document.createTextNode(n.text);
				else if (!Yr(u)) throw RangeError("Text must be rendered as a DOM text node");
			} else if (!u) {
				let e = ot.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs);
				({dom: u, contentDOM: d} = e);
			}
			!d && !n.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), n.type.spec.draggable && (u.draggable = !0));
			let f = u;
			return u = Fi(u, r, n), l ? c = new Ls(t, n, r, i, u, d || null, f, l) : n.isText ? new Fs(t, n, r, i, u, f) : new e(t, n, r, i, u, d || null, f);
		}
		parseRule(e) {
			if (this.node.type.spec.reparseInView) return null;
			let t = {
				node: this.node.type.name,
				attrs: this.node.attrs
			};
			if (this.node.type.whitespace == "pre" && (t.preserveWhitespace = "full"), !this.contentDOM) t.getContent = () => this.node.content;
			else if (!this.contentLost) t.contentElement = this.contentDOM;
			else {
				for (let e = this.children.length - 1; e >= 0; e--) {
					let n = this.children[e];
					if (this.dom.contains(n.dom.parentNode)) {
						t.contentElement = n.dom.parentNode;
						break;
					}
				}
				if (!t.contentElement) {
					let n = e && e.find((t) => A(t) && e.indexOf(t.parentNode) < 0 && this.dom.contains(t));
					n ? t.contentElement = n : t.getContent = () => x.empty;
				}
			}
			return t;
		}
		matchesNode(e, t, n) {
			return this.dirty == Es && e.eq(this.node) && Ii(t, this.outerDeco) && n.eq(this.innerDeco);
		}
		get size() {
			return this.node.nodeSize;
		}
		get border() {
			return +!this.node.isLeaf;
		}
		updateChildren(e, t) {
			let n = this.node.inlineContent, r = t, i = e.composing ? this.localCompositionInfo(e, t) : null, a = i && i.pos > -1 ? i : null, o = i && i.pos < 0, s = new Bs(this, a && a.node, e), c = this.node.inlineContent, l = c && this.node.isBlock;
			Bi(this.node, this.innerDeco, (t, i, a) => {
				t.spec.marks ? s.syncToMarks(t.spec.marks, n, e, i) : t.type.side >= 0 && !a && s.syncToMarks(i == this.node.childCount ? S.none : this.node.child(i).marks, n, e, i), s.placeWidget(t, e, r);
			}, (t, a, u, d) => {
				s.syncToMarks(t.marks, n, e, d), l && t.isAtom && !t.isText && s.addHackNode("IMG", s.top);
				let f;
				s.findNodeMatch(t, a, u, d) || o && e.state.selection.from > r && e.state.selection.to < r + t.nodeSize && (f = s.findIndexWithChild(i.node)) > -1 && s.updateNodeAt(t, a, u, f, e) || s.updateNextNode(t, a, u, e, d, r) || s.addNode(t, a, u, e, r), r += t.nodeSize, c && (l = t.isAtom && !t.isText);
			}), s.syncToMarks([], n, e, 0), this.node.isTextblock && s.addTextblockHacks(), s.destroyRest(), (s.changed || this.dirty == Os) && (a && this.protectLocalComposition(e, a), ji(this.contentDOM, this.children, e), ms && Vi(this.dom));
		}
		localCompositionInfo(e, t) {
			let { from: n, to: r } = e.state.selection;
			if (!(e.state.selection instanceof E) || n < t || r > t + this.node.content.size) return null;
			let i = e.input.compositionNode;
			if (!i || !this.dom.contains(i.parentNode)) return null;
			if (this.node.inlineContent) {
				let e = i.nodeValue, a = Hi(this.node.content, e, n - t, r - t);
				return a < 0 ? null : {
					node: i,
					pos: a,
					text: e
				};
			}
			return {
				node: i,
				pos: -1,
				text: ""
			};
		}
		protectLocalComposition(e, { node: t, pos: n, text: r }) {
			if (this.getDesc(t)) return;
			let i = t;
			for (; i.parentNode != this.contentDOM; i = i.parentNode) {
				for (; i.previousSibling;) i.parentNode.removeChild(i.previousSibling);
				for (; i.nextSibling;) i.parentNode.removeChild(i.nextSibling);
				i.pmViewDesc && (i.pmViewDesc = void 0);
			}
			let a = new Ms(this, i, t, r);
			e.input.compositionNodes.push(a), this.children = Ui(this.children, n, n + r.length, e, a);
		}
		update(e, t, n, r) {
			return this.dirty == ks || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, r), !0);
		}
		updateInner(e, t, n, r) {
			this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(r, this.posAtStart), this.dirty = Es;
		}
		updateOuterDeco(e) {
			if (Ii(e, this.outerDeco)) return;
			let t = !A(this.nodeDOM), n = this.dom;
			this.dom = Ni(this.dom, this.nodeDOM, Mi(this.outerDeco, this.node, t), Mi(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
		}
		selectNode() {
			A(this.nodeDOM) && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
		}
		deselectNode() {
			A(this.nodeDOM) && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
		}
		get domAtom() {
			return this.node.isAtom;
		}
	}, Fs = class e extends Ps {
		constructor(e, t, n, r, i, a) {
			super(e, t, n, r, i, null, a);
		}
		parseRule() {
			let e = this.nodeDOM.parentNode;
			for (; e && e != this.dom && !e.pmIsDeco;) e = e.parentNode;
			return { skip: e || !0 };
		}
		update(e, t, n, r) {
			return this.dirty == ks || this.dirty != Es && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Es || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, r.trackWrites == this.nodeDOM && (r.trackWrites = null)), this.node = e, this.dirty = Es, !0);
		}
		inParent() {
			let e = this.parent.contentDOM;
			for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
			return !1;
		}
		domFromPos(e) {
			return {
				node: this.nodeDOM,
				offset: e
			};
		}
		localPosFromDOM(e, t, n) {
			return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n);
		}
		ignoreMutation(e) {
			return e.type != "characterData" && e.type != "selection";
		}
		slice(t, n, r) {
			let i = this.node.cut(t, n), a = document.createTextNode(i.text);
			return new e(this.parent, i, this.outerDeco, this.innerDeco, a, a);
		}
		markDirty(e, t) {
			super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = ks);
		}
		get domAtom() {
			return !1;
		}
		isText(e) {
			return this.node.text == e;
		}
	}, Is = class extends As {
		parseRule() {
			return { ignore: !0 };
		}
		matchesHack(e) {
			return this.dirty == Es && this.dom.nodeName == e;
		}
		get domAtom() {
			return !0;
		}
		get ignoreForCoords() {
			return this.dom.nodeName == "IMG";
		}
	}, Ls = class extends Ps {
		constructor(e, t, n, r, i, a, o, s) {
			super(e, t, n, r, i, a, o), this.spec = s;
		}
		update(e, t, n, r) {
			if (this.dirty == ks) return !1;
			if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
				let i = this.spec.update(e, t, n);
				return i && this.updateInner(e, t, n, r), i;
			}
			return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, r);
		}
		selectNode() {
			this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
		}
		deselectNode() {
			this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
		}
		setSelection(e, t, n, r) {
			this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, r);
		}
		destroy() {
			this.spec.destroy && this.spec.destroy(), super.destroy();
		}
		stopEvent(e) {
			return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
		}
		ignoreMutation(e) {
			return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
		}
	}, Rs = function(e) {
		e && (this.nodeName = e);
	}, Rs.prototype = Object.create(null), zs = [new Rs()], Bs = class {
		constructor(e, t, n) {
			this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Ri(e.node.content, e);
		}
		destroyBetween(e, t) {
			if (e != t) {
				for (let n = e; n < t; n++) this.top.children[n].destroy();
				this.top.children.splice(e, t - e), this.changed = !0;
			}
		}
		destroyRest() {
			this.destroyBetween(this.index, this.top.children.length);
		}
		syncToMarks(e, t, n, r) {
			let i = 0, a = this.stack.length >> 1, o = Math.min(a, e.length);
			for (; i < o && (i == a - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1;) i++;
			for (; i < a;) this.destroyRest(), this.top.dirty = Es, this.index = this.stack.pop(), this.top = this.stack.pop(), a--;
			for (; a < e.length;) {
				this.stack.push(this.top, this.index + 1);
				let i = -1, o = this.top.children.length;
				r < this.preMatch.index && (o = Math.min(this.index + 3, o));
				for (let t = this.index; t < o; t++) {
					let n = this.top.children[t];
					if (n.matchesMark(e[a]) && !this.isLocked(n.dom)) {
						i = t;
						break;
					}
				}
				if (i < 0 && this.index < this.top.children.length) {
					let t = this.top.children[this.index];
					t instanceof Ns && t.dirty != ks && t.mark.type == e[a].type && t.spec.update && !this.isLocked(t.dom) && t.spec.update(e[a]) && (t.mark = e[a], i = this.index, this.changed = !0);
				}
				if (i > -1) i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
				else {
					let r = Ns.create(this.top, e[a], t, n);
					this.top.children.splice(this.index, 0, r), this.top = r, this.changed = !0;
				}
				this.index = 0, a++;
			}
		}
		findNodeMatch(e, t, n, r) {
			let i = -1, a;
			if (r >= this.preMatch.index && (a = this.preMatch.matches[r - this.preMatch.index]).parent == this.top && a.matchesNode(e, t, n)) i = this.top.children.indexOf(a, this.index);
			else for (let r = this.index, a = Math.min(this.top.children.length, r + 5); r < a; r++) {
				let a = this.top.children[r];
				if (a.matchesNode(e, t, n) && !this.preMatch.matched.has(a)) {
					i = r;
					break;
				}
			}
			return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
		}
		updateNodeAt(e, t, n, r, i) {
			let a = this.top.children[r];
			return a.dirty == ks && a.dom == a.contentDOM && (a.dirty = Os), a.update(e, t, n, i) ? (this.destroyBetween(this.index, r), this.index++, !0) : !1;
		}
		findIndexWithChild(e) {
			for (;;) {
				let t = e.parentNode;
				if (!t) return -1;
				if (t == this.top.contentDOM) {
					let t = e.pmViewDesc;
					if (t) {
						for (let e = this.index; e < this.top.children.length; e++) if (this.top.children[e] == t) return e;
					}
					return -1;
				}
				e = t;
			}
		}
		updateNextNode(e, t, n, r, i, a) {
			for (let o = this.index; o < this.top.children.length; o++) {
				let s = this.top.children[o];
				if (s instanceof Ps) {
					let c = this.preMatch.matched.get(s);
					if (c != null && c != i) return !1;
					let l = s.dom, u, d = this.isLocked(l) && !(e.isText && s.node && s.node.isText && s.nodeDOM.nodeValue == e.text && s.dirty != ks && Ii(t, s.outerDeco));
					if (!d && s.update(e, t, n, r)) return this.destroyBetween(this.index, o), s.dom != l && (this.changed = !0), this.index++, !0;
					if (!d && (u = this.recreateWrapper(s, e, t, n, r, a))) return this.destroyBetween(this.index, o), this.top.children[this.index] = u, u.contentDOM && (u.dirty = Os, u.updateChildren(r, a + 1), u.dirty = Es), this.changed = !0, this.index++, !0;
					break;
				}
			}
			return !1;
		}
		recreateWrapper(e, t, n, r, i, a) {
			if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Ii(n, e.outerDeco) || !r.eq(e.innerDeco)) return null;
			let o = Ps.create(this.top, t, n, r, i, a);
			if (o.contentDOM) {
				o.children = e.children, e.children = [];
				for (let e of o.children) e.parent = o;
			}
			return e.destroy(), o;
		}
		addNode(e, t, n, r, i) {
			let a = Ps.create(this.top, e, t, n, r, i);
			a.contentDOM && a.updateChildren(r, i + 1), this.top.children.splice(this.index++, 0, a), this.changed = !0;
		}
		placeWidget(e, t, n) {
			let r = this.index < this.top.children.length ? this.top.children[this.index] : null;
			if (r && r.matchesWidget(e) && (e == r.widget || !r.widget.type.toDOM.parentNode)) this.index++;
			else {
				let r = new js(this.top, e, t, n);
				this.top.children.splice(this.index++, 0, r), this.changed = !0;
			}
		}
		addTextblockHacks() {
			let e = this.top.children[this.index - 1], t = this.top;
			for (; e instanceof Ns;) t = e, e = t.children[t.children.length - 1];
			(!e || !(e instanceof Fs) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((ps || ds) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
		}
		addHackNode(e, t) {
			if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e)) this.index++;
			else {
				let n = document.createElement(e);
				e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
				let r = new Is(this.top, [], n, null);
				t == this.top ? t.children.splice(this.index++, 0, r) : t.children.push(r), this.changed = !0;
			}
		}
		isLocked(e) {
			return this.lock && (e == this.lock || A(e) && e.contains(this.lock.parentNode));
		}
	}, Vs = ps || ds && fs < 63, Hs = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i, Us = {
		thead: ["table"],
		tbody: ["table"],
		tfoot: ["table"],
		caption: ["table"],
		colgroup: ["table"],
		col: ["table", "colgroup"],
		tr: ["table", "tbody"],
		td: [
			"table",
			"tbody",
			"tr"
		],
		th: [
			"table",
			"tbody",
			"tr"
		]
	}, Ws = null, Gs = {}, Ks = {}, qs = {
		touchstart: !0,
		touchmove: !0
	}, Js = class {
		constructor() {
			this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastKeyDispatched = !1, this.lastClick = {
				time: 0,
				x: 0,
				y: 0,
				type: "",
				button: 0
			}, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = Object.create(null), this.hideSelectionGuard = null;
		}
	}, Ks.keydown = (e, t) => {
		let n = t;
		if (e.input.shiftKey = n.keyCode == 16 || n.shiftKey, !to(e) && (e.input.lastKeyCode = n.keyCode, e.input.lastKeyCodeTime = Date.now(), e.input.lastKeyDispatched = !1, !(_s && ds && n.keyCode == 13))) {
			if (n.keyCode != 229 && e.domObserver.forceFlush(), ms && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
				let t = Date.now();
				e.input.lastIOSEnter = t, e.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
					e.input.lastIOSEnter == t && (Ha(e, "Enter"), e.input.lastIOSEnter = 0);
				}, 200);
			} else Ha(e, n) || xa(e, n) ? n.preventDefault() : Ia(e, "key");
		}
	}, Ks.keyup = (e, t) => {
		t.keyCode == 16 && (e.input.shiftKey = !1);
	}, Ks.keypress = (e, t) => {
		let n = t;
		if (to(e) || !n.charCode || n.ctrlKey && !n.altKey || hs && n.metaKey) return;
		if (e.someProp("handleKeyPress", (t) => t(e, n))) {
			n.preventDefault();
			return;
		}
		let r = e.state.selection;
		if (!(r instanceof E) || !r.$from.sameParent(r.$to)) {
			let t = String.fromCharCode(n.charCode), i = () => e.state.tr.insertText(t).scrollIntoView();
			!/[\r\n]/.test(t) && !e.someProp("handleTextInput", (n) => n(e, r.$from.pos, r.$to.pos, t, i)) && e.dispatch(i()), n.preventDefault();
		}
	}, Ys = hs ? "metaKey" : "ctrlKey", Gs.mousedown = (e, t) => {
		let n = t;
		e.input.shiftKey = n.shiftKey;
		let r = eo(e), i = Date.now(), a = "singleClick";
		i - e.input.lastClick.time < 500 && Wa(n, e.input.lastClick) && !n[Ys] && e.input.lastClick.button == n.button && (e.input.lastClick.type == "singleClick" ? a = "doubleClick" : e.input.lastClick.type == "doubleClick" && (a = "tripleClick")), e.input.lastClick = {
			time: i,
			x: n.clientX,
			y: n.clientY,
			type: a,
			button: n.button
		}, e.input.mouseDown && e.input.mouseDown.done();
		let o = e.posAtCoords(Ua(n));
		o && (a == "singleClick" ? e.input.mouseDown = new Zs(e, o, n, !!r) : (a == "doubleClick" ? Xa : Za)(e, o.pos, o.inside, n) ? n.preventDefault() : Ia(e, "pointer"));
	}, Xs = class {
		constructor(e) {
			this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
		}
		up(e) {
			this.done();
		}
		move(e) {
			e.buttons == 0 && this.done();
		}
		done() {
			this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
		}
		delaySelUpdate() {
			return !1;
		}
	}, Zs = class extends Xs {
		constructor(e, t, n, r) {
			super(e), this.pos = t, this.event = n, this.flushed = r, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!n[Ys], this.allowDefault = n.shiftKey;
			let i, a;
			if (t.inside > -1) i = e.state.doc.nodeAt(t.inside), a = t.inside;
			else {
				let n = e.state.doc.resolve(t.pos);
				i = n.parent, a = n.depth ? n.before() : 0;
			}
			let o = r ? null : n.target, s = o ? e.docView.nearestDesc(o, !0) : null;
			this.target = s && A(s.nodeDOM) ? s.nodeDOM : null;
			let { selection: c } = e.state;
			n.button == 0 && (i.type.spec.draggable && i.type.spec.selectable !== !1 || c instanceof D && c.from <= a && c.to > a) && (this.mightDrag = {
				node: i,
				pos: a,
				addAttr: !(!this.target || this.target.draggable),
				setUneditable: !!(this.target && ls && !this.target.hasAttribute("contentEditable"))
			}), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
				this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
			}, 20), this.view.domObserver.start()), Ia(e, "pointer");
		}
		done() {
			super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
				this.view.isDestroyed || Ki(this.view);
			});
		}
		up(e) {
			if (this.done(), !this.view.dom.contains(e.target)) return;
			let t = this.pos;
			this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ua(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Ia(this.view, "pointer") : Ya(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || ps && this.mightDrag && !this.mightDrag.node.isAtom || ds && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Ka(this.view, T.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Ia(this.view, "pointer");
		}
		move(e) {
			this.updateAllowDefault(e), Ia(this.view, "pointer"), super.move(e);
		}
		updateAllowDefault(e) {
			!this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
		}
		delaySelUpdate() {
			return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
		}
	}, Qs = class extends Xs {
		constructor(e, t) {
			super(e), this.startSelection = t, this.startDoc = e.state.doc;
		}
		move(e) {
			if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
				this.done();
				return;
			}
			e.preventDefault(), Ia(this.view, "pointer");
			let t = this.view.posAtCoords(Ua(e)), n = t && $a(this.view, t.inside, !1);
			if (!n) return;
			let { doc: r } = this.view.state, i = this.startSelection, [a, o] = n.from < i.from ? [i.to, n.from] : [i.from, n.to];
			Ka(this.view, E.create(r, a, o));
		}
	}, Gs.touchstart = (e) => {
		e.input.lastTouch = Date.now(), eo(e), Ia(e, "pointer");
	}, Gs.touchmove = (e) => {
		e.input.lastTouch = Date.now(), Ia(e, "pointer");
	}, Gs.contextmenu = (e) => eo(e), $s = _s ? 5e3 : -1, Ks.compositionstart = Ks.compositionupdate = (e) => {
		if (!e.composing) {
			e.domObserver.flush();
			let { state: t } = e, n = t.selection.$to;
			if (t.selection instanceof E && t.selection.empty && (t.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((e) => e.type.spec.inclusive === !1) || ds && gs && no(e))) e.markCursor = e.state.storedMarks || n.marks(), oo(e, !0), e.markCursor = null;
			else if (oo(e, !t.selection.empty), ls && t.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
				let t = e.domSelectionRange();
				for (let n = t.focusNode, r = t.focusOffset; n && A(n) && r != 0;) {
					let t = r < 0 ? n.lastChild : n.childNodes[r - 1];
					if (!t) break;
					if (Yr(t)) {
						let n = e.domSelection();
						n && n.collapse(t, t.nodeValue.length);
						break;
					}
					n = t, r = -1;
				}
			}
			e.input.composing = !0;
		}
		ro(e, $s);
	}, Ks.compositionend = (e, t) => {
		e.composing && (e.input.composing = !1, e.input.compositionEndedAt = Date.now(), e.input.compositionPendingChanges = e.domObserver.pendingRecords().length ? e.input.compositionID : 0, e.input.compositionNode = null, e.input.badSafariComposition ? e.domObserver.forceFlush() : e.input.compositionPendingChanges && Promise.resolve().then(() => e.domObserver.flush()), e.input.compositionID++, ro(e, 20));
	}, ec = ss && cs < 15 || ms && ys < 604, Gs.copy = Ks.cut = (e, t) => {
		let n = t, r = e.state.selection, i = n.type == "cut";
		if (r.empty) return;
		let a = ec ? null : n.clipboardData, { dom: o, text: s } = Sa(e, r.content());
		a ? (n.preventDefault(), a.clearData(), a.setData("text/html", o.innerHTML), a.setData("text/plain", s)) : so(e, o), i && e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
	}, Ks.paste = (e, t) => {
		let n = t;
		if (e.composing && !_s) return;
		let r = ec ? null : n.clipboardData, i = e.input.shiftKey && e.input.lastKeyCode != 45;
		r && uo(e, fo(r), r.getData("text/html"), i, n) ? n.preventDefault() : lo(e, n);
	}, tc = class {
		constructor(e, t, n) {
			this.slice = e, this.move = t, this.node = n;
		}
	}, nc = hs ? "altKey" : "ctrlKey", Gs.dragstart = (e, t) => {
		let n = t, r = e.input.mouseDown;
		if (r && r.done(), !n.dataTransfer) return;
		let i = e.state.selection, a = i.empty ? null : e.posAtCoords(Ua(n)), o;
		if (!(a && a.pos >= i.from && a.pos <= (i instanceof D ? i.to - 1 : i.to))) {
			if (r && r.mightDrag) o = D.create(e.state.doc, r.mightDrag.pos);
			else if (n.target && A(n.target)) {
				let t = e.docView.nearestDesc(n.target, !0);
				t && t.node.type.spec.draggable && t != e.docView && (o = D.create(e.state.doc, t.posBefore));
			}
		}
		let { dom: s, text: c, slice: l } = Sa(e, (o || e.state.selection).content());
		(!n.dataTransfer.files.length || !ds || fs > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(ec ? "Text" : "text/html", s.innerHTML), n.dataTransfer.effectAllowed = "copyMove", ec || n.dataTransfer.setData("text/plain", c), e.dragging = new tc(l, po(e, n), o);
	}, Gs.dragend = (e) => {
		let t = e.dragging;
		window.setTimeout(() => {
			e.dragging == t && (e.dragging = null);
		}, 50);
	}, Ks.dragover = Ks.dragenter = (e, t) => t.preventDefault(), Ks.drop = (e, t) => {
		try {
			mo(e, t, e.dragging);
		} finally {
			e.dragging = null;
		}
	}, Gs.focus = (e) => {
		if (e.input.lastFocus = Date.now(), !e.focused) {
			e.domObserver.stop(), e.dom.classList.add("ProseMirror-focused"), e.domObserver.start(), e.focused = !0;
			let t = e.domSelectionRange();
			if (!e.domObserver.currentSelection.eq(t)) {
				let { focusNode: n, focusOffset: r } = t;
				setTimeout(() => {
					let t = e.domSelectionRange();
					t.focusNode == n && t.focusOffset == r && e.docView && e.hasFocus() && Ki(e);
				}, 20);
			}
		}
	}, Gs.blur = (e, t) => {
		let n = t;
		e.focused &&= (e.domObserver.stop(), e.dom.classList.remove("ProseMirror-focused"), e.domObserver.start(), n.relatedTarget && e.dom.contains(n.relatedTarget) && e.domObserver.currentSelection.clear(), !1);
	}, Gs.beforeinput = (e, t) => {
		if (_s && t.inputType == "deleteContentBackward") {
			e.domObserver.flushSoon();
			let { domChangeCount: t } = e.input;
			setTimeout(() => {
				if (e.input.domChangeCount != t || e.domObserver.pendingRecords().length || (e.dom.blur(), e.focus(), Ha(e, "Backspace"))) return;
				let { $cursor: n } = e.state.selection;
				n && n.pos > 0 && e.dispatch(e.state.tr.delete(n.pos - 1, n.pos).scrollIntoView());
			}, 50);
		}
	};
	for (let e in Ks) Gs[e] = Ks[e];
	rc = class {
		constructor(e) {
			this.frag = e, this.index = 0, this.off = 0;
		}
		nodeAt(e) {
			for (; this.off <= e && this.index < this.frag.childCount;) {
				let t = this.frag.child(this.index);
				if (this.off == e) return t;
				this.off += t.nodeSize, this.index++;
			}
			return null;
		}
	}, ic = class e {
		constructor(e, t) {
			this.toDOM = e, this.spec = t || lc, this.side = this.spec.side || 0;
		}
		map(e, t, n, r) {
			let { pos: i, deleted: a } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
			return a ? null : new sc(i - n, i - n, this);
		}
		valid() {
			return !0;
		}
		eq(t) {
			return this == t || t instanceof e && (this.spec.key && this.spec.key == t.spec.key || this.toDOM == t.toDOM && ho(this.spec, t.spec));
		}
		destroy(e) {
			this.spec.destroy && this.spec.destroy(e);
		}
	}, ac = class e {
		constructor(e, t) {
			this.attrs = e, this.spec = t || lc;
		}
		map(e, t, n, r) {
			let i = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n, a = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
			return i >= a ? null : new sc(i, a, this);
		}
		valid(e, t) {
			return t.from < t.to;
		}
		eq(t) {
			return this == t || t instanceof e && ho(this.attrs, t.attrs) && ho(this.spec, t.spec);
		}
		static is(t) {
			return t.type instanceof e;
		}
		destroy() {}
	}, oc = class e {
		constructor(e, t) {
			this.attrs = e, this.spec = t || lc;
		}
		map(e, t, n, r) {
			let i = e.mapResult(t.from + r, 1);
			if (i.deleted) return null;
			let a = e.mapResult(t.to + r, -1);
			return a.deleted || a.pos <= i.pos ? null : new sc(i.pos - n, a.pos - n, this);
		}
		valid(e, t, n) {
			let r = n.nodeAt(t.from);
			return !!r && !r.isText && t.from + r.nodeSize == t.to;
		}
		eq(t) {
			return this == t || t instanceof e && ho(this.attrs, t.attrs) && ho(this.spec, t.spec);
		}
		destroy() {}
	}, sc = class e {
		constructor(e, t, n) {
			this.from = e, this.to = t, this.type = n;
		}
		copy(t, n) {
			return new e(t, n, this.type);
		}
		eq(e, t = 0) {
			return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
		}
		map(e, t, n) {
			return this.type.map(e, this, t, n);
		}
		static widget(t, n, r) {
			return new e(t, t, new ic(n, r));
		}
		static inline(t, n, r, i) {
			return new e(t, n, new ac(r, i));
		}
		static node(t, n, r, i) {
			return new e(t, n, new oc(r, i));
		}
		get spec() {
			return this.type.spec;
		}
		get inline() {
			return this.type instanceof ac;
		}
		get widget() {
			return this.type instanceof ic;
		}
	}, cc = [], lc = {}, j = class e {
		constructor(e, t) {
			this.local = e.length ? e : cc, this.children = t.length ? t : cc;
		}
		static create(e, t) {
			return t.length ? xo(t, e, 0, lc) : uc;
		}
		find(e, t, n) {
			let r = [];
			return this.findInner(e ?? 0, t ?? 1e9, r, 0, n), r;
		}
		findInner(e, t, n, r, i) {
			for (let a = 0; a < this.local.length; a++) {
				let o = this.local[a];
				o.from <= t && o.to >= e && (!i || i(o.spec)) && n.push(o.copy(o.from + r, o.to + r));
			}
			for (let a = 0; a < this.children.length; a += 3) if (this.children[a] < t && this.children[a + 1] > e) {
				let o = this.children[a] + 1;
				this.children[a + 2].findInner(e - o, t - o, n, r + o, i);
			}
		}
		map(e, t, n) {
			return this == uc || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || lc);
		}
		mapInner(t, n, r, i, a) {
			let o;
			if (this.local.length) {
				let e = new rc(n.content);
				for (let s = 0; s < this.local.length; s++) {
					let c = this.local[s].map(t, r, i);
					c && c.type.valid(n, c, e) ? (o ||= []).push(c) : a.onRemove && a.onRemove(this.local[s].spec);
				}
			}
			return this.children.length ? go(this.children, o || [], t, n, r, i, a) : o ? new e(o.sort(So), cc) : uc;
		}
		add(t, n) {
			return n.length ? this == uc ? e.create(t, n) : this.addInner(t, n, 0) : this;
		}
		addInner(t, n, r) {
			let i, a = 0;
			t.forEach((e, t) => {
				let o = t + r, s;
				if (s = yo(n, e, o)) {
					for (i ||= this.children.slice(); a < i.length && i[a] < t;) a += 3;
					i[a] == t ? i[a + 2] = i[a + 2].addInner(e, s, o + 1) : i.splice(a, 0, t, t + e.nodeSize, xo(s, e, o + 1, lc)), a += 3;
				}
			});
			let o = _o(a ? bo(n) : n, -r);
			if (o.length) {
				let e = new rc(t.content);
				for (let n = 0; n < o.length; n++) o[n].type.valid(t, o[n], e) || o.splice(n--, 1);
			}
			return new e(o.length ? this.local.concat(o).sort(So) : this.local, i || this.children);
		}
		remove(e) {
			return e.length == 0 || this == uc ? this : this.removeInner(e, 0);
		}
		removeInner(t, n) {
			let r = this.children, i = this.local;
			for (let e = 0; e < r.length; e += 3) {
				let i, a = r[e] + n, o = r[e + 1] + n;
				for (let e = 0, n; e < t.length; e++) (n = t[e]) && n.from > a && n.to < o && (t[e] = null, (i ||= []).push(n));
				if (!i) continue;
				r == this.children && (r = this.children.slice());
				let s = r[e + 2].removeInner(i, a + 1);
				s == uc ? (r.splice(e, 3), e -= 3) : r[e + 2] = s;
			}
			if (i.length) {
				for (let e = 0, r; e < t.length; e++) if (r = t[e]) for (let e = 0; e < i.length; e++) i[e].eq(r, n) && (i == this.local && (i = this.local.slice()), i.splice(e--, 1));
			}
			return r == this.children && i == this.local ? this : i.length || r.length ? new e(i, r) : uc;
		}
		forChild(t, n) {
			if (this == uc) return this;
			if (n.isLeaf) return e.empty;
			let r, i;
			for (let e = 0; e < this.children.length; e += 3) if (this.children[e] >= t) {
				this.children[e] == t && (r = this.children[e + 2]);
				break;
			}
			let a = t + 1, o = a + n.content.size;
			for (let e = 0; e < this.local.length; e++) {
				let t = this.local[e];
				if (t.from < o && t.to > a && t.type instanceof ac) {
					let e = Math.max(a, t.from) - a, n = Math.min(o, t.to) - a;
					e < n && (i ||= []).push(t.copy(e, n));
				}
			}
			if (i) {
				let t = new e(i.sort(So), cc);
				return r ? new dc([t, r]) : t;
			}
			return r || uc;
		}
		eq(t) {
			if (this == t) return !0;
			if (!(t instanceof e) || this.local.length != t.local.length || this.children.length != t.children.length) return !1;
			for (let e = 0; e < this.local.length; e++) if (!this.local[e].eq(t.local[e])) return !1;
			for (let e = 0; e < this.children.length; e += 3) if (this.children[e] != t.children[e] || this.children[e + 1] != t.children[e + 1] || !this.children[e + 2].eq(t.children[e + 2])) return !1;
			return !0;
		}
		locals(e) {
			return Co(this.localsInner(e));
		}
		localsInner(e) {
			if (this == uc) return cc;
			if (e.inlineContent || !this.local.some(ac.is)) return this.local;
			let t = [];
			for (let e = 0; e < this.local.length; e++) this.local[e].type instanceof ac || t.push(this.local[e]);
			return t;
		}
		forEachSet(e) {
			e(this);
		}
	}, j.empty = new j([], []), j.removeOverlap = Co, uc = j.empty, dc = class e {
		constructor(e) {
			this.members = e;
		}
		map(t, n) {
			let r = this.members.map((e) => e.map(t, n, lc));
			return e.from(r);
		}
		forChild(t, n) {
			if (n.isLeaf) return j.empty;
			let r = [];
			for (let i = 0; i < this.members.length; i++) {
				let a = this.members[i].forChild(t, n);
				a != uc && (a instanceof e ? r = r.concat(a.members) : r.push(a));
			}
			return e.from(r);
		}
		eq(t) {
			if (!(t instanceof e) || t.members.length != this.members.length) return !1;
			for (let e = 0; e < this.members.length; e++) if (!this.members[e].eq(t.members[e])) return !1;
			return !0;
		}
		locals(e) {
			let t, n = !0;
			for (let r = 0; r < this.members.length; r++) {
				let i = this.members[r].localsInner(e);
				if (i.length) {
					if (!t) t = i;
					else {
						n &&= (t = t.slice(), !1);
						for (let e = 0; e < i.length; e++) t.push(i[e]);
					}
				}
			}
			return t ? Co(n ? t : t.sort(So)) : cc;
		}
		static from(t) {
			switch (t.length) {
				case 0: return uc;
				case 1: return t[0];
				default: return new e(t.every((e) => e instanceof j) ? t : t.reduce((e, t) => e.concat(t instanceof j ? t : t.members), []));
			}
		}
		forEachSet(e) {
			for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
		}
	}, fc = {
		childList: !0,
		characterData: !0,
		characterDataOldValue: !0,
		attributes: !0,
		attributeOldValue: !0,
		subtree: !0
	}, pc = ss && cs <= 11, mc = class {
		constructor() {
			this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
		}
		set(e) {
			this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
		}
		clear() {
			this.anchorNode = this.focusNode = null;
		}
		eq(e) {
			return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
		}
	}, hc = class {
		constructor(e, t) {
			this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new mc(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((t) => {
				for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
				ss && cs <= 11 && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : ps && e.composing && t.some((e) => e.type == "childList" && e.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
			}), pc && (this.onCharData = (e) => {
				this.queue.push({
					target: e.target,
					type: "characterData",
					oldValue: e.prevValue
				}), this.flushSoon();
			}), this.onSelectionChange = this.onSelectionChange.bind(this);
		}
		flushSoon() {
			this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
				this.flushingSoon = -1, this.flush();
			}, 20));
		}
		forceFlush() {
			this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
		}
		start() {
			this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, fc)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
		}
		stop() {
			if (this.observer) {
				let e = this.observer.takeRecords();
				if (e.length) {
					for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
					window.setTimeout(() => this.flush(), 20);
				}
				this.observer.disconnect();
			}
			this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
		}
		connectSelection() {
			this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
		}
		disconnectSelection() {
			this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
		}
		suppressSelectionUpdates() {
			this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
		}
		onSelectionChange() {
			if (ta(this.view)) {
				if (this.suppressingSelectionUpdates) return Ki(this.view);
				if (ss && cs <= 11 && !this.view.state.selection.empty) {
					let e = this.view.domSelectionRange();
					if (e.focusNode && Zo(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)) return this.flushSoon();
				}
				this.flush();
			}
		}
		setCurSelection() {
			this.currentSelection.set(this.view.domSelectionRange());
		}
		ignoreSelectionChange(e) {
			if (!e.focusNode) return !0;
			let t = /* @__PURE__ */ new Set(), n;
			for (let n = e.focusNode; n; n = qo(n)) t.add(n);
			for (let r = e.anchorNode; r; r = qo(r)) if (t.has(r)) {
				n = r;
				break;
			}
			let r = n && this.view.docView.nearestDesc(n);
			if (r && r.ignoreMutation({
				type: "selection",
				target: Yr(n) ? n.parentNode : n
			})) return this.setCurSelection(), !0;
		}
		pendingRecords() {
			if (this.observer) for (let e of this.observer.takeRecords()) this.queue.push(e);
			return this.queue;
		}
		flush() {
			let { view: e } = this;
			if (!e.docView || this.flushingSoon > -1) return;
			let t = this.pendingRecords();
			t.length && (this.queue = []);
			let n, r = !1;
			!this.suppressingSelectionUpdates && ta(e) && (n = e.domSelectionRange(), r = !this.currentSelection.eq(n) && !this.ignoreSelectionChange(n));
			let i = -1, a = -1, o = !1, s = [];
			if (e.editable) for (let e = 0; e < t.length; e++) {
				let n = this.registerMutation(t[e], s);
				n && (i = i < 0 ? n.from : Math.min(n.from, i), a = a < 0 ? n.to : Math.max(n.to, a), n.typeOver && (o = !0));
			}
			if (s.some((e) => e.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || ds && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((e) => e.type == "childList" && e.removedNodes.length))) {
				for (let e of s) if (e.nodeName == "BR" && e.parentNode) {
					let t = e.nextSibling;
					for (; t && A(t);) {
						if (t.contentEditable == "false") {
							e.parentNode.removeChild(e);
							break;
						}
						t = t.firstChild;
					}
				}
			} else if (ls && s.length) {
				let t = s.filter((e) => e.nodeName == "BR");
				if (t.length == 2) {
					let [e, n] = t;
					e.parentNode && e.parentNode.parentNode == n.parentNode ? n.remove() : e.remove();
				} else {
					let { focusNode: n } = this.currentSelection;
					for (let r of t) {
						let t = r.parentNode;
						t && t.nodeName == "LI" && (!n || ko(e, n) != t) && r.remove();
					}
				}
			}
			let c = null;
			i < 0 && r && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && $o(n) && (c = Wi(e)) && c.eq(T.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Ki(e), this.currentSelection.set(n), e.scrollToSelection()) : (i > -1 || r) && (i > -1 && (e.docView.markDirty(i, a), Eo(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, Ao(e, s)), this.handleDOMChange(i, a, o, s), e.docView && e.docView.dirty ? e.updateState(e.state) : n && !this.currentSelection.eq(n) && Ki(e), n && this.currentSelection.set(n));
		}
		registerMutation(e, t) {
			if (t.indexOf(e.target) > -1) return null;
			let n = this.view.docView.nearestDesc(e.target);
			if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e)) return null;
			if (e.type == "childList") {
				for (let n = 0; n < e.addedNodes.length; n++) {
					let r = e.addedNodes[n];
					t.push(r), Yr(r) && (this.lastChangedTextNode = r);
				}
				if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target)) return {
					from: n.posBefore,
					to: n.posAfter
				};
				let r = e.previousSibling, i = e.nextSibling;
				if (ss && cs <= 11 && e.addedNodes.length) for (let t = 0; t < e.addedNodes.length; t++) {
					let { previousSibling: n, nextSibling: a } = e.addedNodes[t];
					(!n || Array.prototype.indexOf.call(e.addedNodes, n) < 0) && (r = n), (!a || Array.prototype.indexOf.call(e.addedNodes, a) < 0) && (i = a);
				}
				let a = r && r.parentNode == e.target ? Ko(r) + 1 : 0, o = n.localPosFromDOM(e.target, a, -1), s = i && i.parentNode == e.target ? Ko(i) : e.target.childNodes.length;
				return {
					from: o,
					to: n.localPosFromDOM(e.target, s, 1)
				};
			}
			return e.type == "attributes" ? {
				from: n.posAtStart - n.border,
				to: n.posAtEnd + n.border
			} : (this.lastChangedTextNode = e.target, {
				from: n.posAtStart,
				to: n.posAtEnd,
				typeOver: e.target.nodeValue == e.oldValue
			});
		}
	}, gc = /* @__PURE__ */ new WeakMap(), _c = !1, vc = (e) => (t) => {
		let n = t.pmViewDesc;
		if (n) return n.parseRule(e);
		if (t.nodeName == "BR" && t.parentNode) {
			if (ps && /^(ul|ol)$/i.test(t.parentNode.nodeName)) {
				let e = document.createElement("div");
				return e.appendChild(document.createElement("li")), { skip: e };
			}
			if (t.parentNode.lastChild == t || ps && /^(tr|table)$/i.test(t.parentNode.nodeName)) return { ignore: !0 };
		} else if (t.nodeName == "IMG" && t.getAttribute("mark-placeholder")) return { ignore: !0 };
		return null;
	}, yc = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i, bc = class {
		constructor(e, t) {
			this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Js(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Go), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Vo(this), Bo(this), this.nodeViews = Uo(this), this.docView = Ai(this.state.doc, zo(this), To(this), this.dom, this), this.domObserver = new hc(this, (e, t, n, r) => Mo(this, e, t, n, r)), this.domObserver.start(), Fa(this), this.updatePluginViews();
		}
		get composing() {
			return this.input.composing;
		}
		get props() {
			if (this._props.state != this.state) {
				let e = this._props;
				this._props = {};
				for (let t in e) this._props[t] = e[t];
				this._props.state = this.state;
			}
			return this._props;
		}
		update(e) {
			e.handleDOMEvents != this._props.handleDOMEvents && Ra(this);
			let t = this._props;
			this._props = e, e.plugins && (e.plugins.forEach(Go), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
		}
		setProps(e) {
			let t = {};
			for (let e in this._props) t[e] = this._props[e];
			t.state = this.state;
			for (let n in e) t[n] = e[n];
			this.update(t);
		}
		updateState(e) {
			this.updateStateInner(e, this._props);
		}
		updateStateInner(e, t) {
			let n = this.state, r = !1, i = !1;
			e.storedMarks && this.composing && (io(this), i = !0), this.state = e;
			let a = n.plugins != e.plugins || this._props.plugins != t.plugins;
			if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
				let e = Uo(this);
				Wo(e, this.nodeViews) && (this.nodeViews = e, r = !0);
			}
			(a || t.handleDOMEvents != this._props.handleDOMEvents) && Ra(this), this.editable = Vo(this), Bo(this);
			let o = To(this), s = zo(this), c = n.plugins != e.plugins && !n.doc.eq(e.doc) ? "reset" : e.scrollToSelection > n.scrollToSelection ? "to selection" : "preserve", l = r || !this.docView.matchesNode(e.doc, s, o);
			(l || !e.selection.eq(n.selection)) && (i = !0);
			let u = c == "preserve" && i && this.dom.style.overflowAnchor == null && ci(this);
			if (i) {
				this.domObserver.stop();
				let t = l && (ss || ds) && !this.composing && !n.selection.empty && !e.selection.empty && Ho(n.selection, e.selection);
				if (l) {
					let n = ds ? this.trackWrites = this.domSelectionRange().focusNode : null;
					this.composing && (this.input.compositionNode = ao(this)), (r || !this.docView.update(e.doc, s, o, this)) && (this.docView.updateOuterDeco(s), this.docView.destroy(), this.docView = Ai(e.doc, s, o, this.dom, this)), !n || this.trackWrites && this.dom.contains(this.trackWrites) || (t = !0);
				}
				let i = this.input.mouseDown;
				t || !(i && this.domObserver.currentSelection.eq(this.domSelectionRange()) && ra(this) && i.delaySelUpdate()) ? Ki(this, t) : (Qi(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
			}
			this.updatePluginViews(n), this.dragging?.node && !n.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, n), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : u && ui(u);
		}
		scrollToSelection() {
			let e = this.domSelectionRange().focusNode;
			if (e && Xr(this.dom, e) && !this.someProp("handleScrollToSelection", (e) => e(this))) {
				if (this.state.selection instanceof D) {
					let t = this.docView.domAfterPos(this.state.selection.from);
					A(t) && si(this, t.getBoundingClientRect(), e);
				} else si(this, this.coordsAtPos(this.state.selection.head, 1), e);
			}
		}
		destroyPluginViews() {
			let e;
			for (; e = this.pluginViews.pop();) e.destroy && e.destroy();
		}
		updatePluginViews(e) {
			if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
				this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
				for (let e = 0; e < this.directPlugins.length; e++) {
					let t = this.directPlugins[e];
					t.spec.view && this.pluginViews.push(t.spec.view(this));
				}
				for (let e = 0; e < this.state.plugins.length; e++) {
					let t = this.state.plugins[e];
					t.spec.view && this.pluginViews.push(t.spec.view(this));
				}
			} else for (let t = 0; t < this.pluginViews.length; t++) {
				let n = this.pluginViews[t];
				n.update && n.update(this, e);
			}
		}
		updateDraggedNode(e, t) {
			let n = e.node, r = -1;
			if (n.from < this.state.doc.content.size && this.state.doc.nodeAt(n.from) == n.node) r = n.from;
			else {
				let e = n.from + (this.state.doc.content.size - t.doc.content.size);
				(e > 0 && e < this.state.doc.content.size && this.state.doc.nodeAt(e)) == n.node && (r = e);
			}
			this.dragging = new tc(e.slice, e.move, r < 0 ? void 0 : D.create(this.state.doc, r));
		}
		someProp(e, t) {
			let n = this._props && this._props[e], r;
			if (n != null && (r = t ? t(n) : n)) return r;
			for (let n = 0; n < this.directPlugins.length; n++) {
				let i = this.directPlugins[n].props[e];
				if (i != null && (r = t ? t(i) : i)) return r;
			}
			let i = this.state.plugins;
			if (i) for (let n = 0; n < i.length; n++) {
				let a = i[n].props[e];
				if (a != null && (r = t ? t(a) : a)) return r;
			}
		}
		hasFocus() {
			if (ss) {
				let e = this.root.activeElement;
				if (e == this.dom) return !0;
				if (!e || !this.dom.contains(e)) return !1;
				for (; e && this.dom != e && this.dom.contains(e);) {
					if (e.contentEditable == "false") return !1;
					e = e.parentElement;
				}
				return !0;
			}
			return this.root.activeElement == this.dom;
		}
		focus() {
			this.domObserver.stop(), this.editable && fi(this.dom), Ki(this), this.domObserver.start();
		}
		get root() {
			let e = this._root;
			if (e == null) {
				for (let e = this.dom.parentNode; e; e = e.parentNode) if (e.nodeType == 9 || e.nodeType == 11 && e.host) return e.getSelection || (Object.getPrototypeOf(e).getSelection = () => e.ownerDocument.getSelection()), this._root = e;
			}
			return e || document;
		}
		updateRoot() {
			this._root = null;
		}
		posAtCoords(e) {
			return bi(this, e);
		}
		coordsAtPos(e, t = 1) {
			return Ci(this, e, t);
		}
		domAtPos(e, t = 0) {
			return this.docView.domFromPos(e, t);
		}
		nodeDOM(e) {
			let t = this.docView.descAt(e);
			return t ? t.nodeDOM : null;
		}
		posAtDOM(e, t, n = -1) {
			let r = this.docView.posFromDOM(e, t, n);
			if (r == null) throw RangeError("DOM position not inside the editor");
			return r;
		}
		endOfTextblock(e, t) {
			return ki(this, t || this.state, e);
		}
		pasteHTML(e, t) {
			return uo(this, "", e, !1, t || new ClipboardEvent("paste"));
		}
		pasteText(e, t) {
			return uo(this, e, null, !0, t || new ClipboardEvent("paste"));
		}
		serializeForClipboard(e) {
			return Sa(this, e);
		}
		destroy() {
			this.docView && (La(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], To(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Xo());
		}
		get isDestroyed() {
			return this.docView == null;
		}
		dispatchEvent(e) {
			return Va(this, e);
		}
		domSelectionRange() {
			let e = this.dom.isConnected !== !1 && this.domSelection();
			return e ? ps && this.root.nodeType === 11 && ni(this.dom.ownerDocument) == this.dom && Oo(this, e) || e : {
				focusNode: null,
				focusOffset: 0,
				anchorNode: null,
				anchorOffset: 0
			};
		}
		domSelection() {
			return this.root.getSelection();
		}
	}, bc.prototype.dispatch = function(e) {
		let t = this._props.dispatchTransaction;
		t ? t.call(this, e) : this.updateState(this.state.apply(e));
	};
})), Sc = e((() => {
	xc();
}));
// node_modules/w3c-keyname/index.js
function Cc(e) {
	var t = !(Ec && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Dc && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? Tc : wc)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
var wc, Tc, Ec, Dc, Oc, kc = e((() => {
	for (wc = {
		8: "Backspace",
		9: "Tab",
		10: "Enter",
		12: "NumLock",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		44: "PrintScreen",
		45: "Insert",
		46: "Delete",
		59: ";",
		61: "=",
		91: "Meta",
		92: "Meta",
		106: "*",
		107: "+",
		108: ",",
		109: "-",
		110: ".",
		111: "/",
		144: "NumLock",
		145: "ScrollLock",
		160: "Shift",
		161: "Shift",
		162: "Control",
		163: "Control",
		164: "Alt",
		165: "Alt",
		173: "-",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'"
	}, Tc = {
		48: ")",
		49: "!",
		50: "@",
		51: "#",
		52: "$",
		53: "%",
		54: "^",
		55: "&",
		56: "*",
		57: "(",
		59: ":",
		61: "+",
		173: "_",
		186: ":",
		187: "+",
		188: "<",
		189: "_",
		190: ">",
		191: "?",
		192: "~",
		219: "{",
		220: "|",
		221: "}",
		222: "\""
	}, Ec = typeof navigator < "u" && /Mac/.test(navigator.platform), Dc = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Oc = 0; Oc < 10; Oc++) wc[48 + Oc] = wc[96 + Oc] = String(Oc);
	for (Oc = 1; Oc <= 24; Oc++) wc[Oc + 111] = "F" + Oc;
	for (Oc = 65; Oc <= 90; Oc++) wc[Oc] = String.fromCharCode(Oc + 32), Tc[Oc] = String.fromCharCode(Oc);
	for (var e in wc) Tc.hasOwnProperty(e) || (Tc[e] = wc[e]);
}));
// node_modules/prosemirror-keymap/dist/index.js
function Ac(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n == "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) Fc ? o = !0 : i = !0;
		else throw Error("Unrecognized modifier name: " + n);
	}
	return r && (n = "Alt-" + n), i && (n = "Ctrl-" + n), o && (n = "Meta-" + n), a && (n = "Shift-" + n), n;
}
function jc(e) {
	let t = Object.create(null);
	for (let n in e) t[Ac(n)] = e[n];
	return t;
}
function Mc(e, t, n = !0) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n && t.shiftKey && (e = "Shift-" + e), e;
}
function Nc(e) {
	return new O({ props: { handleKeyDown: Pc(e) } });
}
function Pc(e) {
	let t = jc(e);
	return function(e, n) {
		let r = Cc(n), i, a = t[Mc(r, n)];
		if (a && a(e.state, e.dispatch, e)) return !0;
		if (r.length == 1 && r != " ") {
			if (n.shiftKey) {
				let i = t[Mc(r, n, !1)];
				if (i && i(e.state, e.dispatch, e)) return !0;
			}
			if ((n.altKey || n.metaKey || n.ctrlKey) && !(Ic && n.ctrlKey && n.altKey) && (i = wc[n.keyCode]) && i != r) {
				let r = t[Mc(i, n)];
				if (r && r(e.state, e.dispatch, e)) return !0;
			}
		}
		return !1;
	};
}
var Fc, Ic, Lc = e((() => {
	kc(), Yn(), Fc = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), Ic = typeof navigator < "u" && /Win/.test(navigator.platform);
})), Rc = e((() => {
	Lc();
})), zc, Bc, Vc, Hc, Uc = e((() => {
	zc = 200, Bc = function() {}, Bc.prototype.append = function(e) {
		return e.length ? (e = Bc.from(e), !this.length && e || e.length < zc && this.leafAppend(e) || this.length < zc && e.leafPrepend(this) || this.appendInner(e)) : this;
	}, Bc.prototype.prepend = function(e) {
		return e.length ? Bc.from(e).append(this) : this;
	}, Bc.prototype.appendInner = function(e) {
		return new Hc(this, e);
	}, Bc.prototype.slice = function(e, t) {
		return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Bc.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
	}, Bc.prototype.get = function(e) {
		if (!(e < 0 || e >= this.length)) return this.getInner(e);
	}, Bc.prototype.forEach = function(e, t, n) {
		t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
	}, Bc.prototype.map = function(e, t, n) {
		t === void 0 && (t = 0), n === void 0 && (n = this.length);
		var r = [];
		return this.forEach(function(t, n) {
			return r.push(e(t, n));
		}, t, n), r;
	}, Bc.from = function(e) {
		return e instanceof Bc ? e : e && e.length ? new Vc(e) : Bc.empty;
	}, Vc = /* @__PURE__ */ function(e) {
		function t(t) {
			e.call(this), this.values = t;
		}
		e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
		var n = {
			length: { configurable: !0 },
			depth: { configurable: !0 }
		};
		return t.prototype.flatten = function() {
			return this.values;
		}, t.prototype.sliceInner = function(e, n) {
			return e == 0 && n == this.length ? this : new t(this.values.slice(e, n));
		}, t.prototype.getInner = function(e) {
			return this.values[e];
		}, t.prototype.forEachInner = function(e, t, n, r) {
			for (var i = t; i < n; i++) if (e(this.values[i], r + i) === !1) return !1;
		}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
			for (var i = t - 1; i >= n; i--) if (e(this.values[i], r + i) === !1) return !1;
		}, t.prototype.leafAppend = function(e) {
			if (this.length + e.length <= zc) return new t(this.values.concat(e.flatten()));
		}, t.prototype.leafPrepend = function(e) {
			if (this.length + e.length <= zc) return new t(e.flatten().concat(this.values));
		}, n.length.get = function() {
			return this.values.length;
		}, n.depth.get = function() {
			return 0;
		}, Object.defineProperties(t.prototype, n), t;
	}(Bc), Bc.empty = new Vc([]), Hc = /* @__PURE__ */ function(e) {
		function t(t, n) {
			e.call(this), this.left = t, this.right = n, this.length = t.length + n.length, this.depth = Math.max(t.depth, n.depth) + 1;
		}
		return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.flatten = function() {
			return this.left.flatten().concat(this.right.flatten());
		}, t.prototype.getInner = function(e) {
			return e < this.left.length ? this.left.get(e) : this.right.get(e - this.left.length);
		}, t.prototype.forEachInner = function(e, t, n, r) {
			var i = this.left.length;
			if (t < i && this.left.forEachInner(e, t, Math.min(n, i), r) === !1 || n > i && this.right.forEachInner(e, Math.max(t - i, 0), Math.min(this.length, n) - i, r + i) === !1) return !1;
		}, t.prototype.forEachInvertedInner = function(e, t, n, r) {
			var i = this.left.length;
			if (t > i && this.right.forEachInvertedInner(e, t - i, Math.max(n, i) - i, r + i) === !1 || n < i && this.left.forEachInvertedInner(e, Math.min(t, i), n, r) === !1) return !1;
		}, t.prototype.sliceInner = function(e, t) {
			if (e == 0 && t == this.length) return this;
			var n = this.left.length;
			return t <= n ? this.left.slice(e, t) : e >= n ? this.right.slice(e - n, t - n) : this.left.slice(e, n).append(this.right.slice(0, t - n));
		}, t.prototype.leafAppend = function(e) {
			var n = this.right.leafAppend(e);
			if (n) return new t(this.left, n);
		}, t.prototype.leafPrepend = function(e) {
			var n = this.left.leafPrepend(e);
			if (n) return new t(n, this.right);
		}, t.prototype.appendInner = function(e) {
			return this.left.depth >= Math.max(this.right.depth, e.depth) + 1 ? new t(this.left, new t(this.right, e)) : new t(this, e);
		}, t;
	}(Bc);
}));
// node_modules/prosemirror-history/dist/index.js
function Wc(e, t) {
	let n;
	return e.forEach((e, r) => {
		if (e.selection && t-- == 0) return n = r, !1;
	}), e.slice(n);
}
function Gc(e, t, n, r) {
	let i = n.getMeta(cl), a;
	if (i) return i.historyState;
	n.getMeta(ll) && (e = new il(e.done, e.undone, null, 0, -1));
	let o = n.getMeta("appendedTransaction");
	if (n.steps.length == 0) return e;
	if (o && o.getMeta(cl)) return o.getMeta(cl).redo ? new il(e.done.addTransform(n, void 0, r, Xc(t)), e.undone, qc(n.mapping.maps), e.prevTime, e.prevComposition) : new il(e.done, e.undone.addTransform(n, void 0, r, Xc(t)), null, e.prevTime, e.prevComposition);
	if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
		let i = n.getMeta("composition"), a = e.prevTime == 0 || !o && e.prevComposition != i && (e.prevTime < (n.time || 0) - r.newGroupDelay || !Kc(n, e.prevRanges)), s = o ? Jc(e.prevRanges, n.mapping) : qc(n.mapping.maps);
		return new il(e.done.addTransform(n, a ? t.selection.getBookmark() : void 0, r, Xc(t)), nl.empty, s, n.time, i ?? e.prevComposition);
	}
	return (a = n.getMeta("rebased")) ? new il(e.done.rebased(n, a), e.undone.rebased(n, a), Jc(e.prevRanges, n.mapping), e.prevTime, e.prevComposition) : new il(e.done.addMaps(n.mapping.maps), e.undone.addMaps(n.mapping.maps), Jc(e.prevRanges, n.mapping), e.prevTime, e.prevComposition);
}
function Kc(e, t) {
	if (!t) return !1;
	if (!e.docChanged) return !0;
	let n = !1;
	return e.mapping.maps[0].forEach((e, r) => {
		for (let i = 0; i < t.length; i += 2) e <= t[i + 1] && r >= t[i] && (n = !0);
	}), n;
}
function qc(e) {
	let t = [];
	for (let n = e.length - 1; n >= 0 && t.length == 0; n--) e[n].forEach((e, n, r, i) => t.push(r, i));
	return t;
}
function Jc(e, t) {
	if (!e) return null;
	let n = [];
	for (let r = 0; r < e.length; r += 2) {
		let i = t.map(e[r], 1), a = t.map(e[r + 1], -1);
		i <= a && n.push(i, a);
	}
	return n;
}
function Yc(e, t, n) {
	let r = Xc(t), i = cl.get(t).spec.config, a = (n ? e.undone : e.done).popEvent(t, r);
	if (!a) return null;
	let o = a.selection.resolve(a.transform.doc), s = (n ? e.done : e.undone).addTransform(a.transform, t.selection.getBookmark(), i, r), c = new il(n ? s : a.remaining, n ? a.remaining : s, null, 0, -1);
	return a.transform.setSelection(o).setMeta(cl, {
		redo: n,
		historyState: c
	});
}
function Xc(e) {
	let t = e.plugins;
	if (sl != t) {
		ol = !1, sl = t;
		for (let e = 0; e < t.length; e++) if (t[e].spec.historyPreserveItems) {
			ol = !0;
			break;
		}
	}
	return ol;
}
function Zc(e) {
	return e.setMeta(ll, !0);
}
function Qc(e = {}) {
	return e = {
		depth: e.depth || 100,
		newGroupDelay: e.newGroupDelay || 500
	}, new O({
		key: cl,
		state: {
			init() {
				return new il(nl.empty, nl.empty, null, 0, -1);
			},
			apply(t, n, r) {
				return Gc(n, r, t, e);
			}
		},
		config: e,
		props: { handleDOMEvents: { beforeinput(e, t) {
			let n = t.inputType, r = n == "historyUndo" ? ul : n == "historyRedo" ? dl : null;
			return !r || !e.editable ? !1 : (t.preventDefault(), r(e.state, e.dispatch));
		} } }
	});
}
function $c(e, t) {
	return (n, r) => {
		let i = cl.getState(n);
		if (!i || (e ? i.undone : i.done).eventCount == 0) return !1;
		if (r) {
			let a = Yc(i, n, e);
			a && r(t ? a.scrollIntoView() : a);
		}
		return !0;
	};
}
function el(e) {
	return e.getMeta(cl) != null;
}
var tl, nl, rl, il, al, ol, sl, cl, ll, ul, dl, fl = e((() => {
	Uc(), Tn(), Yn(), tl = 500, nl = class e {
		constructor(e, t) {
			this.items = e, this.eventCount = t;
		}
		popEvent(t, n) {
			if (this.eventCount == 0) return null;
			let r = this.items.length;
			for (;; r--) if (this.items.get(r - 1).selection) {
				--r;
				break;
			}
			let i, a;
			n && (i = this.remapping(r, this.items.length), a = i.maps.length);
			let o = t.tr, s, c, l = [], u = [];
			return this.items.forEach((t, n) => {
				if (!t.step) i || (i = this.remapping(r, n + 1), a = i.maps.length), a--, u.push(t);
				else {
					if (i) {
						u.push(new rl(t.map));
						let e = t.step.map(i.slice(a)), n;
						e && o.maybeStep(e).doc && (n = o.mapping.maps[o.mapping.maps.length - 1], l.push(new rl(n, void 0, void 0, l.length + u.length))), a--, n && i.appendMap(n, a);
					} else o.maybeStep(t.step);
					if (t.selection) return s = i ? t.selection.map(i.slice(a)) : t.selection, c = new e(this.items.slice(0, r).append(u.reverse().concat(l)), this.eventCount - 1), !1;
				}
			}, this.items.length, 0), {
				remaining: c,
				transform: o,
				selection: s
			};
		}
		addTransform(t, n, r, i) {
			let a = [], o = this.eventCount, s = this.items, c = !i && s.length ? s.get(s.length - 1) : null;
			for (let e = 0; e < t.steps.length; e++) {
				let r = t.steps[e].invert(t.docs[e]), l = new rl(t.mapping.maps[e], r, n), u;
				(u = c && c.merge(l)) && (l = u, e ? a.pop() : s = s.slice(0, s.length - 1)), a.push(l), n &&= (o++, void 0), i || (c = l);
			}
			let l = o - r.depth;
			return l > al && (s = Wc(s, l), o -= l), new e(s.append(a), o);
		}
		remapping(e, t) {
			let n = new un();
			return this.items.forEach((t, r) => {
				let i = t.mirrorOffset != null && r - t.mirrorOffset >= e ? n.maps.length - t.mirrorOffset : void 0;
				n.appendMap(t.map, i);
			}, e, t), n;
		}
		addMaps(t) {
			return this.eventCount == 0 ? this : new e(this.items.append(t.map((e) => new rl(e))), this.eventCount);
		}
		rebased(t, n) {
			if (!this.eventCount) return this;
			n = Math.min(this.items.length, n);
			let r = [], i = this.items.length - n, a = t.mapping, o = t.steps.length, s = this.eventCount;
			this.items.forEach((e) => {
				e.selection && s--;
			}, i);
			let c = n;
			this.items.forEach((e) => {
				let n = a.getMirror(--c);
				if (n == null) return;
				o = Math.min(o, n);
				let i = a.maps[n];
				if (e.step) {
					let o = t.steps[n].invert(t.docs[n]), l = e.selection && e.selection.map(a.slice(c + 1, n));
					l && s++, r.push(new rl(i, o, l));
				} else r.push(new rl(i));
			}, i);
			let l = [];
			for (let e = n; e < o; e++) l.push(new rl(a.maps[e]));
			let u = this.items.slice(0, i).append(l).append(r), d = new e(u, s);
			return d.emptyItemCount() > tl && (d = d.compress(this.items.length - r.length)), d;
		}
		emptyItemCount() {
			let e = 0;
			return this.items.forEach((t) => {
				t.step || e++;
			}), e;
		}
		compress(t = this.items.length) {
			let n = this.remapping(0, t), r = n.maps.length, i = [], a = 0;
			return this.items.forEach((e, o) => {
				if (o >= t) i.push(e), e.selection && a++;
				else if (e.step) {
					let t = e.step.map(n.slice(r)), o = t && t.getMap();
					if (r--, o && n.appendMap(o, r), t) {
						let s = e.selection && e.selection.map(n.slice(r));
						s && a++;
						let c = new rl(o.invert(), t, s), l, u = i.length - 1;
						(l = i.length && i[u].merge(c)) ? i[u] = l : i.push(c);
					}
				} else e.map && r--;
			}, this.items.length, 0), new e(Bc.from(i.reverse()), a);
		}
	}, nl.empty = new nl(Bc.empty, 0), rl = class e {
		constructor(e, t, n, r) {
			this.map = e, this.step = t, this.selection = n, this.mirrorOffset = r;
		}
		merge(t) {
			if (this.step && t.step && !t.selection) {
				let n = t.step.merge(this.step);
				if (n) return new e(n.getMap().invert(), n, this.selection);
			}
		}
	}, il = class {
		constructor(e, t, n, r, i) {
			this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = r, this.prevComposition = i;
		}
	}, al = 20, ol = !1, sl = null, cl = new k("history"), ll = new k("closeHistory"), ul = $c(!1, !0), dl = $c(!0, !0);
})), pl = e((() => {
	fl();
}));
// node_modules/@tiptap/core/dist/index.js
function ml(e) {
	let { state: t, transaction: n } = e, { selection: r } = n, { doc: i } = n, { storedMarks: a } = n;
	return {
		...t,
		apply: t.apply.bind(t),
		applyTransaction: t.applyTransaction.bind(t),
		plugins: t.plugins,
		schema: t.schema,
		reconfigure: t.reconfigure.bind(t),
		toJSON: t.toJSON.bind(t),
		get storedMarks() {
			return a;
		},
		get selection() {
			return r;
		},
		get doc() {
			return i;
		},
		get tr() {
			return r = n.selection, i = n.doc, a = n.storedMarks, n;
		}
	};
}
function hl(e, t) {
	if (typeof e == "string") {
		if (!t.nodes[e]) throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`);
		return t.nodes[e];
	}
	return e;
}
function gl(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function _l(e, t, n = { strict: !0 }) {
	let r = Object.keys(t);
	return !r.length || r.every((r) => n.strict ? t[r] === e[r] : gl(t[r]) ? t[r].test(e[r]) : t[r] === e[r]);
}
function vl(e, t, n = {}) {
	return e.find((e) => e.type === t && _l(Object.fromEntries(Object.keys(n).map((t) => [t, e.attrs[t]])), n));
}
function yl(e, t, n = {}) {
	return !!vl(e, t, n);
}
function bl(e, t, n) {
	if (!e || !t) return;
	let r = e.parent.childAfter(e.parentOffset);
	if (r.node && r.node.marks.some((e) => e.type === t) || (r = e.parent.childBefore(e.parentOffset)), !r.node || !r.node.marks.some((e) => e.type === t)) return;
	if (!n) {
		let e = r.node.marks.find((e) => e.type === t);
		e && (n = e.attrs);
	}
	if (!vl([...r.node.marks], t, n)) return;
	let i = r.index, a = e.start() + r.offset, o = i + 1, s = a + r.node.nodeSize;
	for (; i > 0 && yl([...e.parent.child(i - 1).marks], t, n);) --i, a -= e.parent.child(i).nodeSize;
	for (; o < e.parent.childCount && yl([...e.parent.child(o).marks], t, n);) s += e.parent.child(o).nodeSize, o += 1;
	return {
		from: a,
		to: s
	};
}
function xl(e, t) {
	if (typeof e == "string") {
		if (!t.marks[e]) throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`);
		return t.marks[e];
	}
	return e;
}
function Sl(e) {
	return e instanceof E;
}
function Cl(e = 0, t = 0, n = 0) {
	return Math.min(Math.max(e, t), n);
}
function wl(e, t = null) {
	if (!t) return null;
	let n = T.atStart(e), r = T.atEnd(e);
	if (t === "start" || t === !0) return n;
	if (t === "end") return r;
	let i = n.from, a = r.to;
	return t === "all" ? E.create(e, Cl(0, i, a), Cl(e.content.size, i, a)) : E.create(e, Cl(t, i, a), Cl(t, i, a));
}
function Tl() {
	return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function El() {
	return [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Dl() {
	return typeof navigator < "u" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function Ol(e) {
	if (typeof window > "u") throw Error("[tiptap error]: there is no window object available, so this function cannot be used");
	let t = `<body>${e}</body>`, n = new window.DOMParser().parseFromString(t, "text/html").body;
	return sf(n);
}
function kl(e) {
	return typeof e?.nodesBetween == "function";
}
function Al(e, t, n) {
	if (kl(e)) return e;
	let r = typeof e == "object" && !!e;
	n = {
		slice: !0,
		parseOptions: {},
		...n
	};
	let i = typeof e == "string";
	if (r) try {
		if (Array.isArray(e) && e.length > 0) return x.fromArray(e.map((e) => t.nodeFromJSON(e)));
		let r = t.nodeFromJSON(e);
		return n.errorOnInvalidContent && r.check(), r;
	} catch (r) {
		if (n.errorOnInvalidContent) throw Error("[tiptap error]: Invalid JSON content", { cause: r });
		return console.warn("[tiptap warn]: Invalid content.", "Passed value:", e, "Error:", r), Al("", t, n);
	}
	if (i) {
		if (n.errorOnInvalidContent) {
			let r = !1, i = "", a = new Xe({
				topNode: t.spec.topNode,
				marks: t.spec.marks,
				nodes: t.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
					content: "inline*",
					group: "block",
					parseDOM: [{
						tag: "*",
						getAttrs: (e) => (r = !0, i = typeof e == "string" ? e : e.outerHTML, null)
					}]
				} })
			});
			if (n.slice ? Ze.fromSchema(a).parseSlice(Ol(e), n.parseOptions) : Ze.fromSchema(a).parse(Ol(e), n.parseOptions), n.errorOnInvalidContent && r) throw Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ Error(`Invalid element found: ${i}`) });
		}
		let r = Ze.fromSchema(t);
		return n.slice ? r.parseSlice(Ol(e), n.parseOptions).content : r.parse(Ol(e), n.parseOptions);
	}
	return Al("", t, n);
}
function jl(e) {
	return !("type" in e);
}
function Ml(e, t, n) {
	let r = e.steps.length - 1;
	if (r < t) return;
	let i = e.steps[r];
	if (!(i instanceof vn || i instanceof yn)) return;
	let a = e.mapping.maps[r], o = 0;
	a.forEach((e, t, n, r) => {
		o === 0 && (o = r);
	}), e.setSelection(T.near(e.doc.resolve(o), n));
}
function Nl(e) {
	for (let t = 0; t < e.edgeCount; t += 1) {
		let { type: n } = e.edge(t);
		if (n.isTextblock && !n.hasRequiredAttrs()) return n;
	}
	return null;
}
function Pl() {
	return typeof navigator < "u" && /Mac/.test(navigator.platform);
}
function Fl(e) {
	let t = e.split(/-(?!$)/), n = t[t.length - 1];
	n === "Space" && (n = " ");
	let r, i, a, o;
	for (let e = 0; e < t.length - 1; e += 1) {
		let n = t[e];
		if (/^(cmd|meta|m)$/i.test(n)) o = !0;
		else if (/^a(lt)?$/i.test(n)) r = !0;
		else if (/^(c|ctrl|control)$/i.test(n)) i = !0;
		else if (/^s(hift)?$/i.test(n)) a = !0;
		else if (/^mod$/i.test(n)) El() || Pl() ? o = !0 : i = !0;
		else throw Error(`Unrecognized modifier name: ${n}`);
	}
	return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), o && (n = `Meta-${n}`), a && (n = `Shift-${n}`), n;
}
function Il(e, t, n = {}) {
	let { from: r, to: i, empty: a } = e.selection, o = t ? hl(t, e.schema) : null, s = [];
	e.doc.nodesBetween(r, i, (e, t) => {
		if (e.isText) return;
		let n = Math.max(r, t), a = Math.min(i, t + e.nodeSize);
		s.push({
			node: e,
			from: n,
			to: a
		});
	});
	let c = i - r, l = s.filter((e) => !o || o.name === e.node.type.name).filter((e) => _l(e.node.attrs, n, { strict: !1 }));
	return a ? !!l.length : l.reduce((e, t) => e + t.to - t.from, 0) >= c;
}
function Ll(e, t) {
	return t.nodes[e] ? "node" : t.marks[e] ? "mark" : null;
}
function Rl(e, t) {
	let n = typeof t == "string" ? [t] : t;
	return Object.keys(e).reduce((t, r) => (n.includes(r) || (t[r] = e[r]), t), {});
}
function zl(e, t, n = {}, r = {}) {
	return Al(e, t, {
		slice: !1,
		parseOptions: n,
		errorOnInvalidContent: r.errorOnInvalidContent
	});
}
function Bl(e, t) {
	let n = xl(t, e.schema), { from: r, to: i, empty: a } = e.selection, o = [];
	a ? (e.storedMarks && o.push(...e.storedMarks), o.push(...e.selection.$head.marks())) : e.doc.nodesBetween(r, i, (e) => {
		o.push(...e.marks);
	});
	let s = o.find((e) => e.type.name === n.name);
	return s ? { ...s.attrs } : {};
}
function Vl(e, t) {
	let n = new wn(e);
	return t.forEach((e) => {
		e.steps.forEach((e) => {
			n.step(e);
		});
	}), n;
}
function Hl(e, t, n) {
	let r = [];
	return e.nodesBetween(t.from, t.to, (e, t) => {
		n(e) && r.push({
			node: e,
			pos: t
		});
	}), r;
}
function Ul(e, t) {
	for (let n = e.depth; n > 0; --n) {
		let r = e.node(n);
		if (t(r)) return {
			pos: n > 0 ? e.before(n) : 0,
			start: e.start(n),
			depth: n,
			node: r
		};
	}
}
function Wl(e) {
	return (t) => Ul(t.$from, e);
}
function M(e, t, n) {
	return e.config[t] === void 0 && e.parent ? M(e.parent, t, n) : typeof e.config[t] == "function" ? e.config[t].bind({
		...n,
		parent: e.parent ? M(e.parent, t, n) : null
	}) : e.config[t];
}
function Gl(e) {
	return e.map((e) => {
		let t = M(e, "addExtensions", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		return t ? [e, ...Gl(t())] : e;
	}).flat(10);
}
function Kl(e, t) {
	let n = ot.fromSchema(t).serializeFragment(e), r = document.implementation.createHTMLDocument().createElement("div");
	return r.appendChild(n), r.innerHTML;
}
function ql(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = n.get(t.type) ?? /* @__PURE__ */ new Map();
		e.set(t.name, t), n.set(t.type, e);
	}
	return [...Object.values(t.nodes), ...Object.values(t.marks)].flatMap((e) => Object.entries(e.spec.attrs ?? {}).map(([t, r]) => {
		let i = n.get(e.name)?.get(t), a = Object.hasOwn(r, "default");
		return {
			type: e.name,
			name: t,
			attribute: {
				rendered: !0,
				renderHTML: null,
				parseHTML: null,
				keepOnSplit: !0,
				...i?.attribute,
				default: r.default,
				isRequired: !a,
				validate: r.validate
			}
		};
	}));
}
function Jl(e, t, n) {
	return Object.fromEntries(Object.entries(t).flatMap(([t, r]) => {
		let i = e[t];
		if (i === void 0) return [];
		if (!(typeof r == "string" ? typeof i === r : typeof i == "string" && r.includes(i))) throw RangeError(`Invalid schemaSpec field '${n}.${t}'`);
		return [[t, i]];
	}));
}
function Yl(e, t, n, r) {
	return {
		...Object.fromEntries(Object.entries(t).filter(([e]) => e !== "attrs" && !Object.hasOwn(r, e))),
		...Jl(n, r, e),
		attrs: n.attrs
	};
}
function Xl(e, t, n) {
	for (let r of Object.keys(t)) if (!Object.hasOwn(e, r)) throw RangeError(`schemaSpec requires a local ${n} extension named '${r}'`);
	for (let r of Object.keys(e)) if (!Object.hasOwn(t, r)) throw RangeError(`Local ${n} extension '${r}' is not in schemaSpec`);
}
function Zl(e, t) {
	Xl(e.nodes, t.nodes, "node"), Xl(e.marks, t.marks, "mark");
	let n = t.spec.nodes, r = t.spec.marks;
	return t.spec.nodes.forEach((t, r) => {
		n = n.update(t, Yl(t, e.nodes[t], r, Nf));
	}), t.spec.marks.forEach((t, n) => {
		r = r.update(t, Yl(t, e.marks[t], n, Pf));
	}), {
		topNode: t.topNodeType.name,
		nodes: n,
		marks: r
	};
}
function Ql(e) {
	let t = e.filter((t, n) => e.indexOf(t) !== n);
	return Array.from(new Set(t));
}
function $l(e) {
	return {
		baseExtensions: e.filter((e) => e.type === "extension"),
		nodeExtensions: e.filter((e) => e.type === "node"),
		markExtensions: e.filter((e) => e.type === "mark")
	};
}
function eu(e) {
	let t = [], { nodeExtensions: n, markExtensions: r } = $l(e), i = [...n, ...r], a = {
		default: null,
		validate: void 0,
		rendered: !0,
		renderHTML: null,
		parseHTML: null,
		keepOnSplit: !0,
		isRequired: !1
	}, o = n.filter((e) => e.name !== "text").map((e) => e.name), s = r.map((e) => e.name), c = [...o, ...s];
	return e.forEach((e) => {
		let n = M(e, "addGlobalAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage,
			extensions: i
		});
		n && n().forEach((e) => {
			let n;
			n = Array.isArray(e.types) ? e.types : e.types === "*" ? c : e.types === "nodes" ? o : e.types === "marks" ? s : [], n.forEach((n) => {
				Object.entries(e.attributes).forEach(([e, r]) => {
					t.push({
						type: n,
						name: e,
						attribute: {
							...a,
							...r
						}
					});
				});
			});
		});
	}), i.forEach((e) => {
		let n = M(e, "addAttributes", {
			name: e.name,
			options: e.options,
			storage: e.storage
		});
		if (!n) return;
		let r = n();
		Object.entries(r).forEach(([n, r]) => {
			let i = {
				...a,
				...r
			};
			typeof i?.default == "function" && (i.default = i.default()), i?.isRequired && i?.default === void 0 && delete i.default, t.push({
				type: e.name,
				name: n,
				attribute: i
			});
		});
	}), t;
}
function tu(e) {
	return typeof e == "function";
}
function N(e, t = void 0, ...n) {
	return tu(e) ? t ? e.bind(t)(...n) : e(...n) : e;
}
function nu(e = {}) {
	return Object.keys(e).length === 0 && e.constructor === Object;
}
function ru(e) {
	let t = [], n = "", r = !1, i = !1, a = 0, o = e.length;
	for (let s = 0; s < o; s += 1) {
		let o = e[s];
		if (o === "'" && !i) r = !r, n += o;
		else if (o === "\"" && !r) i = !i, n += o;
		else {
			if (!r && !i) {
				if (o === "(") {
					a += 1, n += o;
					continue;
				}
				if (o === ")" && a > 0) {
					--a, n += o;
					continue;
				}
				if (o === ";" && a === 0) {
					t.push(n), n = "";
					continue;
				}
			}
			n += o;
		}
	}
	return n && t.push(n), t;
}
function iu(e) {
	let t = [], n = ru(e || ""), r = n.length;
	for (let e = 0; e < r; e += 1) {
		let r = n[e], i = r.indexOf(":");
		if (i === -1) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		a && o && t.push([a, o]);
	}
	return t;
}
function P(...e) {
	return e.filter((e) => !!e).reduce((e, t) => {
		let n = { ...e };
		return Object.entries(t).forEach(([e, t]) => {
			if (e === "__proto__") Object.defineProperty(n, e, {
				configurable: !0,
				enumerable: !0,
				value: t,
				writable: !0
			});
			else if (!n[e]) n[e] = t;
			else if (e === "class") {
				let r = t ? String(t).split(" ") : [], i = n[e] ? n[e].split(" ") : [], a = r.filter((e) => !i.includes(e));
				n[e] = [...i, ...a].join(" ");
			} else if (e === "style") {
				let r = new Map([...iu(n[e]), ...iu(t)]);
				n[e] = Array.from(r.entries()).map(([e, t]) => `${e}: ${t}`).join("; ");
			} else n[e] = t;
		}), n;
	}, {});
}
function au(e, t) {
	return t.filter((t) => t.type === e.type.name).filter((e) => e.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(e.attrs) || {} : { [t.name]: e.attrs[t.name] }).reduce((e, t) => P(e, t), {});
}
function ou(e) {
	return typeof e == "string" ? e.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(e) : e === "true" || e !== "false" && e : e;
}
function su(e, t) {
	return "style" in e ? e : {
		...e,
		getAttrs: (n) => {
			let r = e.getAttrs ? e.getAttrs(n) : e.attrs;
			if (r === !1) return !1;
			let i = t.reduce((e, t) => {
				let r = t.attribute.parseHTML ? t.attribute.parseHTML(n) : ou(n.getAttribute(t.name));
				return r == null ? e : {
					...e,
					[t.name]: r
				};
			}, {});
			return {
				...r,
				...i
			};
		}
	};
}
function cu(e) {
	return Object.fromEntries(Object.entries(e).filter(([e, t]) => e === "attrs" && nu(t) ? !1 : t != null));
}
function lu(e) {
	var t, n;
	let r = {};
	return !(e != null && (t = e.attribute) != null && t.isRequired) && "default" in (e?.attribute || {}) && (r.default = e.attribute.default), (e == null || (n = e.attribute) == null ? void 0 : n.validate) !== void 0 && (r.validate = e.attribute.validate), [e.name, r];
}
function uu(e, t, n = eu(e)) {
	let { nodeExtensions: r, markExtensions: i } = $l(e);
	return {
		topNode: r.find((e) => M(e, "topNode"))?.name,
		nodes: Object.fromEntries(r.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = cu({
				...e.reduce((e, t) => {
					let n = M(t, "extendNodeSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				content: N(M(r, "content", a)),
				marks: N(M(r, "marks", a)),
				group: N(M(r, "group", a)),
				inline: N(M(r, "inline", a)),
				atom: N(M(r, "atom", a)),
				selectable: N(M(r, "selectable", a)),
				draggable: N(M(r, "draggable", a)),
				code: N(M(r, "code", a)),
				whitespace: N(M(r, "whitespace", a)),
				linebreakReplacement: N(M(r, "linebreakReplacement", a)),
				defining: N(M(r, "defining", a)),
				isolating: N(M(r, "isolating", a)),
				attrs: Object.fromEntries(i.map(lu))
			}), s = N(M(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => su(e, i)));
			let c = M(r, "renderHTML", a);
			c && (o.toDOM = (e) => c({
				node: e,
				HTMLAttributes: au(e, i)
			}));
			let l = M(r, "renderText", a);
			return l && (o.toText = l), [r.name, o];
		})),
		marks: Object.fromEntries(i.map((r) => {
			let i = n.filter((e) => e.type === r.name), a = {
				name: r.name,
				options: r.options,
				storage: r.storage,
				editor: t
			}, o = cu({
				...e.reduce((e, t) => {
					let n = M(t, "extendMarkSchema", a);
					return {
						...e,
						...n ? n(r) : {}
					};
				}, {}),
				inclusive: N(M(r, "inclusive", a)),
				excludes: N(M(r, "excludes", a)),
				group: N(M(r, "group", a)),
				spanning: N(M(r, "spanning", a)),
				code: N(M(r, "code", a)),
				attrs: Object.fromEntries(i.map(lu))
			}), s = N(M(r, "parseHTML", a));
			s && (o.parseDOM = s.map((e) => su(e, i)));
			let c = M(r, "renderHTML", a);
			return c && (o.toDOM = (e) => c({
				mark: e,
				HTMLAttributes: au(e, i)
			})), [r.name, o];
		}))
	};
}
function du(e, t, n) {
	if (n === void 0) return new Xe(uu(e, t));
	let r = Ql(e.filter((e) => e.type !== "extension").map((e) => e.name));
	if (r.length) throw RangeError(`Duplicate local schema types: ${r.join(", ")}`);
	let i = new Xe(n), a = uu(e, t, ql(eu(e), i));
	return new Xe(Zl(a, i));
}
function fu(e) {
	return e.sort((e, t) => {
		let n = M(e, "priority") || 100, r = M(t, "priority") || 100;
		return n > r ? -1 : +(n < r);
	});
}
function pu(e) {
	let t = fu(Gl(e)), n = Ql(t.map((e) => e.name));
	return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e) => `'${e}'`).join(", ")}]. This can lead to issues.`), t;
}
function mu(e, t, n) {
	let { from: r, to: i } = t, { blockSeparator: a = "\n\n", textSerializers: o = {} } = n || {}, s = "";
	return e.nodesBetween(r, i, (e, n, c, l) => {
		e.isBlock && n > r && (s += a);
		let u = o?.[e.type.name];
		if (u) return c && (s += u({
			node: e,
			pos: n,
			parent: c,
			index: l,
			range: t
		})), !1;
		if (e.isText) {
			var d;
			s += e == null || (d = e.text) == null ? void 0 : d.slice(Math.max(r, n) - n, i - n);
		}
	}), s;
}
function hu(e, t) {
	return mu(e, {
		from: 0,
		to: e.content.size
	}, t);
}
function gu(e) {
	return Object.fromEntries(Object.entries(e.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function _u(e, t) {
	let n = hl(t, e.schema), { from: r, to: i } = e.selection, a = [];
	e.doc.nodesBetween(r, i, (e) => {
		a.push(e);
	});
	let o = a.reverse().find((e) => e.type.name === n.name);
	return o ? { ...o.attrs } : {};
}
function vu(e, t) {
	let n = Ll(typeof t == "string" ? t : t.name, e.schema);
	return n === "node" ? _u(e, t) : n === "mark" ? Bl(e, t) : {};
}
function yu(e, t = JSON.stringify) {
	let n = {};
	return e.filter((e) => {
		let r = t(e);
		return Object.prototype.hasOwnProperty.call(n, r) ? !1 : n[r] = !0;
	});
}
function bu(e) {
	let t = yu(e);
	return t.length === 1 ? t : t.filter((e, n) => !t.filter((e, t) => t !== n).some((t) => e.oldRange.from >= t.oldRange.from && e.oldRange.to <= t.oldRange.to && e.newRange.from >= t.newRange.from && e.newRange.to <= t.newRange.to));
}
function xu(e) {
	let { mapping: t, steps: n } = e, r = [], i = t.invert();
	return t.maps.forEach((e, a) => {
		let o = [];
		if (e.ranges.length) e.forEach((e, t) => {
			o.push({
				from: e,
				to: t
			});
		});
		else {
			let { from: e, to: t } = n[a];
			if (e === void 0 || t === void 0) return;
			o.push({
				from: e,
				to: t
			});
		}
		let s = t.slice(a);
		o.forEach(({ from: e, to: t }) => {
			let n = s.map(e, -1), a = s.map(t), o = i.map(n, -1), c = i.map(a);
			r.push({
				oldRange: {
					from: o,
					to: c
				},
				newRange: {
					from: n,
					to: a
				}
			});
		});
	}), bu(r);
}
function Su(e, t, n) {
	let r = [];
	return e === t ? n.resolve(e).marks().forEach((t) => {
		let i = bl(n.resolve(e), t.type);
		i && r.push({
			mark: t,
			...i
		});
	}) : n.nodesBetween(e, t, (e, t) => {
		e && e?.nodeSize !== void 0 && r.push(...e.marks.map((n) => ({
			from: t,
			to: t + e.nodeSize,
			mark: n
		})));
	}), r;
}
function Cu(e, t) {
	return t.nodes[e] || t.marks[e] || null;
}
function wu(e, t, n) {
	return Object.fromEntries(Object.entries(n).filter(([n]) => {
		let r = e.find((e) => e.type === t && e.name === n);
		return r ? r.attribute.keepOnSplit : !1;
	}));
}
function Tu(e, t, n = {}) {
	let { empty: r, ranges: i } = e.selection, a = t ? xl(t, e.schema) : null;
	if (r) return !!(e.storedMarks || e.selection.$from.marks()).filter((e) => !a || a.name === e.type.name).find((e) => _l(e.attrs, n, { strict: !1 }));
	let o = 0, s = [];
	if (i.forEach(({ $from: t, $to: n }) => {
		let r = t.pos, i = n.pos;
		e.doc.nodesBetween(r, i, (e, t) => {
			if (a && e.inlineContent && !e.type.allowsMarkType(a)) return !1;
			if (!e.isText && !e.marks.length) return;
			let n = Math.max(r, t), c = Math.min(i, t + e.nodeSize), l = c - n;
			o += l, s.push(...e.marks.map((e) => ({
				mark: e,
				from: n,
				to: c
			})));
		});
	}), o === 0) return !1;
	let c = s.filter((e) => !a || a.name === e.mark.type.name).filter((e) => _l(e.mark.attrs, n, { strict: !1 })).reduce((e, t) => e + t.to - t.from, 0), l = s.filter((e) => !a || e.mark.type !== a && e.mark.type.excludes(a)).reduce((e, t) => e + t.to - t.from, 0);
	return (c > 0 ? c + l : c) >= o;
}
function Eu(e, t, n = {}) {
	if (!t) return Il(e, null, n) || Tu(e, null, n);
	let r = Ll(t, e.schema);
	return r === "node" ? Il(e, t, n) : r === "mark" && Tu(e, t, n);
}
function Du(e, t) {
	return Array.isArray(t) ? t.some((t) => (typeof t == "string" ? t : t.name) === e.name) : t;
}
function Ou(e, t) {
	let { nodeExtensions: n } = $l(t), r = n.find((t) => t.name === e);
	if (!r) return !1;
	let i = N(M(r, "group", {
		name: r.name,
		options: r.options,
		storage: r.storage
	}));
	return typeof i == "string" && i.split(" ").includes("list");
}
function ku(e, { checkChildren: t = !0, ignoreWhitespace: n = !1 } = {}) {
	if (n) {
		if (e.type.name === "hardBreak") return !0;
		if (e.isText) return !/\S/.test(e.text ?? "");
	}
	if (e.isText) return !e.text;
	if (e.isAtom || e.isLeaf) return !1;
	if (e.content.childCount === 0) return !0;
	if (t) {
		let r = !0;
		return e.content.forEach((e) => {
			r !== !1 && (ku(e, {
				ignoreWhitespace: n,
				checkChildren: t
			}) || (r = !1));
		}), r;
	}
	return !1;
}
function Au(e) {
	return e instanceof D;
}
function ju(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.apply == "function" && typeof t.getMap == "function" && typeof t.invert == "function" && typeof t.map == "function" && typeof t.merge == "function" && typeof t.toJSON == "function";
}
function Mu(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (!ju(t)) return !1;
	let n = t.toJSON();
	return !(typeof n != "object" || !n || n.stepType !== "replace");
}
function Nu(e, t) {
	let n = t.mapping.mapResult(e.position);
	return {
		position: new Bf(n.pos),
		mapResult: n
	};
}
function Pu(e) {
	return new Bf(e);
}
function Fu(e, t, n) {
	let { selection: r } = t, i = null;
	if (Sl(r) && (i = r.$cursor), i) {
		let t = e.storedMarks ?? i.marks();
		return i.parent.type.allowsMarkType(n) && (!!n.isInSet(t) || !t.some((e) => e.type.excludes(n)));
	}
	let { ranges: a } = r;
	return a.some(({ $from: t, $to: r }) => {
		let i = t.depth === 0 && e.doc.inlineContent && e.doc.type.allowsMarkType(n);
		return e.doc.nodesBetween(t.pos, r.pos, (e, t, r) => {
			if (i) return !1;
			if (e.isInline) {
				let t = !r || r.type.allowsMarkType(n), a = !!n.isInSet(e.marks) || !e.marks.some((e) => e.type.excludes(n));
				i = t && a;
			}
			return !i;
		}), i;
	});
}
function Iu(e, t) {
	let n = e.storedMarks || e.selection.$to.parentOffset && e.selection.$from.marks();
	if (n) {
		let r = n.filter((e) => t?.includes(e.type.name));
		e.tr.ensureMarks(r);
	}
}
function Lu(e, t, n) {
	if (!e.validContent(t)) return null;
	try {
		return e.create(n, t);
	} catch {
		return null;
	}
}
function Ru(e, t) {
	if (e.pendingContent.length === 0) return !0;
	let n = Lu(t, x.from(e.pendingContent));
	return n ? (e.items.push(n), e.pendingContent = [], !0) : !1;
}
function zu(e, t, n) {
	return n.validContent(x.from([...t.pendingContent, e])) ? (t.pendingContent.push(e), !0) : !Ru(t, n) || !n.validContent(x.from(e)) ? !1 : (t.pendingContent.push(e), !0);
}
function Bu(e, t, n, r) {
	let i = r(e, n);
	if (!i) return !1;
	let a = Lu(n.listType, x.from(i), e.attrs);
	return a ? n.itemType.validContent(x.from([...t.pendingContent, a])) ? (t.pendingContent.push(a), !0) : Ru(t, n.itemType) ? (t.items.push(...i), !0) : !1 : !1;
}
function Vu(e, t, n) {
	let r = {
		items: [],
		pendingContent: []
	};
	for (let i = 0; i < e.childCount; i += 1) {
		let a = e.child(i);
		if (!(t.isListNode(a) ? Bu(a, r, t, n) : zu(a, r, t.itemType))) return null;
	}
	return Ru(r, t.itemType) ? r.items : null;
}
function Hu(e, t) {
	let n = [];
	for (let r = 0; r < e.childCount; r += 1) {
		let i = Vu(e.child(r), t, Hu);
		if (!i) return null;
		n.push(...i);
	}
	return n;
}
function Uu(e, t) {
	let n = null;
	return e.descendants((e, r) => e !== t || (n = r, !1)), n;
}
function Wu(e) {
	return !e || e === "1" ? null : e;
}
function Gu(e, t) {
	return Wu(e) === Wu(t);
}
function Ku(e) {
	let t = e.doc, n = t.firstChild;
	if (!n) return null;
	let r = t.resolve(1), i = t.resolve(n.nodeSize - 1);
	return E.between(r, i);
}
function qu(e, t) {
	fp.set(e, (fp.get(e) ?? 0) + 1);
	try {
		return t();
	} finally {
		let t = (fp.get(e) ?? 1) - 1;
		t > 0 ? fp.set(e, t) : fp.delete(e);
	}
}
function Ju(e) {
	return fp.has(e);
}
function Yu(e) {
	return e.kind === "widget";
}
function Xu(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let i of e) i.kind === "widget" && Yu(i) && r.add(i.key), n.push(i.toPMDecoration(t));
	return {
		decorations: n,
		widgetKeys: r
	};
}
function Zu(e, t, n) {
	let { decorations: r, widgetKeys: i } = Xu(t, n);
	return {
		set: j.create(e, r),
		widgetKeys: i
	};
}
function Qu({ position: e, from: t, to: n, docSize: r }) {
	return e < t ? !1 : e < n || e === n && n === r;
}
function $u({ decorations: e, from: t, to: n, docSize: r, extensionName: i, warnedExtensions: a }) {
	return e.filter((e) => Qu({
		position: e.anchor,
		from: t,
		to: n,
		docSize: r
	}) ? !0 : (e.anchor === n || a.has(i) || (a.add(i), console.warn(`[tiptap warn]: Extension "${i}" returned a decoration outside the requested range [${t}, ${n}). It was ignored.`)), !1));
}
function ed(e) {
	let t = e.spec?.key;
	return typeof t == "string" ? t : void 0;
}
function td(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e.find()) {
		let e = ed(r);
		if (!e) continue;
		let i = r.spec.extensionName ?? "unknown", a = t.get(e) ?? /* @__PURE__ */ new Set();
		a.add(i), t.set(e, a), n.set(e, (n.get(e) ?? 0) + 1);
	}
	return Array.from(t, ([e, t]) => ({
		key: e,
		extensions: t
	})).filter(({ key: e }) => (n.get(e) ?? 0) > 1);
}
function nd(e) {
	return e.jsonID === "attr";
}
function rd(e) {
	let t = !1;
	if (e.getMap().forEach(() => {
		t = !0;
	}), t || nd(e)) return !0;
	let n = e;
	return typeof n.from == "number" && typeof n.to == "number";
}
function id(e, t) {
	let n = null, r = 0, i = 0;
	for (let a = 0; a < e.childCount && !(i > t.to); a += 1) {
		let o = i + e.child(a).nodeSize;
		o >= t.from && (n === null && (n = i), r = o), i = o;
	}
	return n === null ? null : {
		from: n,
		to: r
	};
}
function ad(e, t) {
	if (e.steps.some((e) => !rd(e))) return { type: "full" };
	let n = xu(e).map(({ newRange: e }) => e);
	e.steps.forEach((t, r) => {
		if (!nd(t)) return;
		let i = e.mapping.slice(r);
		n.push({
			from: i.map(t.pos, -1),
			to: i.map(t.pos + 1)
		});
	});
	let r = [];
	for (let e of n) {
		let n = id(t, e);
		n && r.push(n);
	}
	r.sort((e, t) => e.from - t.from);
	let i = [];
	for (let e of r) {
		let t = i[i.length - 1];
		t && e.from <= t.to ? t.to = Math.max(t.to, e.to) : i.push({ ...e });
	}
	return {
		type: "ranges",
		ranges: i
	};
}
function od(e, t, n, r) {
	return e.map(t, n, { onRemove: (e) => {
		let t = e?.key;
		typeof t == "string" && r.delete(t);
	} });
}
function sd(e, t, n) {
	let r = t.decorationSetsByExtension[e] ?? j.empty, i = new Set(t.widgetKeysByExtension[e] ?? []);
	return {
		set: od(r, n.mapping, n.doc, i),
		widgetKeys: i
	};
}
function cd(e, t) {
	let n = Object.values(t).flatMap((e) => e.find());
	return j.create(e, n);
}
function ld(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Object.values(e)) for (let e of n) t.add(e);
	return t;
}
function ud(e, t) {
	switch (t.update ?? "document") {
		case "document":
			if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" provides createInRange() but does not use the "changedRanges" decoration update strategy.`);
			return;
		case "changedRanges":
			if (!t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "changedRanges" decoration update strategy but does not provide createInRange().`);
			return;
		case "manual":
			if (t.createInRange) throw Error(`[tiptap error]: Extension "${e}" uses the "manual" decoration update strategy, which is not compatible with createInRange(). createInRange() requires the "changedRanges" strategy.`);
			if (t.shouldUpdate) throw Error(`[tiptap error]: Extension "${e}" cannot combine the "manual" decoration update strategy with shouldUpdate().`);
			return;
		default: throw Error(`[tiptap error]: Extension "${e}" uses an unknown decoration update strategy. Expected "document", "changedRanges", or "manual".`);
	}
}
function dd(e, t, n) {
	return n ? !0 : e.update === "manual" ? !1 : e.shouldUpdate ? e.shouldUpdate(t) : t.tr.docChanged;
}
function fd(e, t) {
	let { selection: n } = e, { $from: r } = n;
	if (n instanceof D) {
		let e = r.index();
		return r.parent.canReplaceWith(e, e + 1, t);
	}
	let i = r.depth;
	for (; i >= 0;) {
		let e = r.index(i);
		if (r.node(i).contentMatchAt(e).matchType(t)) return !0;
		--i;
	}
	return !1;
}
function pd(e, t, n) {
	let r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
	if (r !== null) return r;
	let i = document.createElement("style");
	return t && i.setAttribute("nonce", t), i.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i;
}
function md(e) {
	return typeof e == "number";
}
function hd(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function gd(e) {
	return hd(e) === "Object" && e.constructor === Object && Object.getPrototypeOf(e) === Object.prototype;
}
function _d(e) {
	return typeof e == "string" && e.trim().length > 0 && !/[;{}]/.test(e);
}
function vd(e, t) {
	return e.replace(/^[ \t]*/, (e) => {
		let n = 0;
		for (let t of e) n += t === "	" ? 4 - n % 4 : 1;
		return " ".repeat(Math.max(0, n - t));
	});
}
function yd(e, t) {
	let n = `text\n${e}\n`, r = t(n)[0];
	return (r?.type === "paragraph" || r?.type === "text") && r.raw === n;
}
function bd(e, t, n) {
	let r = t.split("\n"), i = n.isParagraphContinuation ?? ((e) => yd(e, n.blockTokens)), a = 0;
	for (let e of r) {
		if (!e.trim() || !i(e)) break;
		a += 1;
	}
	return {
		mainContent: [e, ...r.slice(0, a).map((e) => e.trimStart())].join("\n"),
		nestedContent: r.slice(a).join("\n")
	};
}
function xd(e, t, n) {
	let r = e.split("\n"), i = [], a = "", o = 0, s = t.baseIndentSize || 2;
	for (; o < r.length;) {
		let e = r[o], u = e.match(t.itemPattern);
		if (!u) {
			if (i.length > 0) break;
			if (e.trim() === "") {
				o += 1, a = `${a}${e}\n`;
				continue;
			}
			return;
		}
		let d = t.extractItemData(u), { indentLevel: f, mainContent: p } = d;
		a = `${a}${e}\n`;
		let m = [p];
		for (o += 1; o < r.length;) {
			var c;
			let e = r[o];
			if (e.trim() === "") {
				var l;
				let t = r.slice(o + 1).findIndex((e) => e.trim() !== "");
				if (t === -1) break;
				if ((((l = r[o + 1 + t].match(/^(\s*)/)) == null || (l = l[1]) == null ? void 0 : l.length) || 0) > f) {
					m.push(e), a = `${a}${e}\n`, o += 1;
					continue;
				}
				break;
			}
			if ((((c = e.match(/^(\s*)/)) == null || (c = c[1]) == null ? void 0 : c.length) || 0) > f) m.push(e), a = `${a}${e}\n`, o += 1;
			else break;
		}
		let h, g = m.slice(1);
		if (g.length > 0) {
			let e = bd(p, g.map((e) => vd(e, f + s)).join("\n"), n);
			d.mainContent = e.mainContent;
			let r = e.nestedContent;
			r.trim() && (h = t.customNestedParser ? t.customNestedParser(r) : n.blockTokens(r));
		}
		let _ = t.createToken(d, h);
		i.push(_);
	}
	if (i.length !== 0) return {
		items: i,
		raw: a.slice(0, e.length)
	};
}
function Sd(e) {
	let t = 0;
	for (let n of e) t = n === "	" ? t + _p - t % _p : t + 1;
	return t;
}
function Cd(e, t, n, r, i) {
	if (!e || !Array.isArray(e.content)) return "";
	let a = typeof n == "function" ? n(r) : n, [o, ...s] = e.content, c = t.renderChildren([o]), l = `${a}${i?.indentMainContent ? c.split("\n").map((e, n) => n === 0 ? e : t.indent(e)).join("\n") : c}`;
	return s && s.length > 0 && s.forEach((e, n) => {
		let r = t.renderChild?.call(t, e, n + 1) ?? t.renderChildren([e]);
		if (r != null) {
			let n = (e) => {
				if (!i?.alignNestedToPrefix) return t.indent(e);
				let n = t.indent(""), r = Sd(a);
				return (Sd(n) >= r ? n : " ".repeat(r)) + e;
			}, o = r.split("\n").map((e) => n(e || "")).join("\n");
			l += e.type === "paragraph" ? `\n\n${o}` : `\n${o}`;
		}
	}), l;
}
function wd(e, t) {
	let n = { ...e };
	return gd(e) && gd(t) && Object.keys(t).forEach((r) => {
		gd(t[r]) && gd(e[r]) ? n[r] = wd(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function Td(e, t, n = {}) {
	let { state: r } = t, { doc: i, tr: a } = r, o = e;
	i.descendants((t, r) => {
		let i = a.mapping.map(r), s = a.mapping.map(r) + t.nodeSize, c = null;
		if (t.marks.forEach((e) => {
			if (e !== o) return !1;
			c = e;
		}), !c) return;
		let l = !1;
		if (Object.keys(n).forEach((e) => {
			n[e] !== c.attrs[e] && (l = !0);
		}), l) {
			let t = e.type.create({
				...e.attrs,
				...n
			});
			a.removeMark(i, s, e.type), a.addMark(i, s, t);
		}
	}), a.docChanged && t.view.dispatch(a);
}
function Ed(e) {
	let { editor: t, from: n, to: r, text: i, insertText: a } = e;
	if (!a) return {
		inputTransaction: null,
		tr: t.view.state.tr
	};
	let o = t.view.state.tr.insertText(i, n, r);
	return {
		inputTransaction: o,
		tr: qn.create({
			doc: o.doc,
			selection: o.selection,
			storedMarks: o.storedMarks
		}).tr
	};
}
function Dd(e) {
	let { editor: t, from: n, to: r, text: i, rule: a, match: o, plugin: s, insertText: c } = e, { view: l } = t, { inputTransaction: u, tr: d } = Ed({
		editor: t,
		from: n,
		to: r,
		text: i,
		insertText: c
	}), f = u ? n + i.length : r, p = ml({
		state: l.state,
		transaction: d
	}), m = {
		from: n - (o[0].length - i.length),
		to: f
	}, { commands: h, chain: g, can: _ } = new zd({
		editor: t,
		state: p
	});
	return a.handler({
		state: p,
		range: m,
		match: o,
		commands: h,
		chain: g,
		can: _
	}) === null || !d.steps.length ? !1 : (u && (l.dispatch(u), !l.state.doc.eq(u.doc)) || (Zc(d), d.setMeta("inputRule", !0), a.undoable && d.setMeta(s, {
		transform: d,
		from: n,
		to: f,
		text: i
	}), l.dispatch(d)), !0);
}
function Od(e, t, n) {
	let r = t[0].length - n.length;
	if (r <= 0) return !0;
	let i = e.parentOffset - r;
	return i >= 0 && e.parent.textBetween(i, e.parentOffset) === t[0].slice(0, r);
}
function kd(e) {
	let { editor: t, from: n, to: r, text: i, rules: a, plugin: o, insertText: s } = e, { view: c } = t;
	if (c.composing) return !1;
	let l = c.state.doc.resolve(n);
	if (l.parent.type.spec.code || (l.nodeBefore || l.nodeAfter)?.marks.find((e) => e.type.spec.code)) return !1;
	let u = Lf(l) + i;
	for (let e of a) {
		let a = yp(u, e.find);
		if (a && Od(l, a, i) && Dd({
			editor: t,
			from: n,
			to: r,
			text: i,
			rule: e,
			match: a,
			plugin: o,
			insertText: s
		})) return !0;
	}
	return !1;
}
function Ad(e) {
	let { editor: t, rules: n } = e, r = new O({
		state: {
			init() {
				return null;
			},
			apply(e, i, a) {
				let o = e.getMeta(r);
				if (o) return o;
				let s = e.getMeta("applyInputRules");
				return s && setTimeout(() => {
					let { text: e } = s;
					e = typeof e == "string" ? e : Kl(x.from(e), a.schema);
					let { from: i } = s, o = i + e.length;
					kd({
						editor: t,
						from: i,
						to: o,
						text: e,
						rules: n,
						plugin: r
					});
				}), e.selectionSet || e.docChanged ? null : i;
			}
		},
		props: {
			handleTextInput(e, i, a, o) {
				return kd({
					editor: t,
					from: i,
					to: a,
					text: o,
					rules: n,
					plugin: r,
					insertText: !0
				});
			},
			handleDOMEvents: { compositionend: (e) => (setTimeout(() => {
				let { $cursor: i } = e.state.selection;
				i && kd({
					editor: t,
					from: i.pos,
					to: i.pos,
					text: "",
					rules: n,
					plugin: r
				});
			}), !1) },
			handleKeyDown(e, i) {
				if (i.key !== "Enter") return !1;
				let { $cursor: a } = e.state.selection;
				return a ? kd({
					editor: t,
					from: a.pos,
					to: a.pos,
					text: "\n",
					rules: n,
					plugin: r
				}) : !1;
			}
		},
		isInputRules: !0
	});
	return r;
}
function jd(e) {
	let { editor: t, state: n, from: r, to: i, rule: a, pasteEvent: o, dropEvent: s } = e, { commands: c, chain: l, can: u } = new zd({
		editor: t,
		state: n
	}), d = [];
	return n.doc.nodesBetween(r, i, (e, t) => {
		var f;
		if ((f = e.type) != null && (f = f.spec) != null && f.code || !(e.isText || e.isTextblock || e.isInline)) return;
		let p = e.content?.size ?? e.nodeSize ?? 0, m = Math.max(r, t), h = Math.min(i, t + p);
		if (m >= h) return;
		let g = e.isText ? e.text || "" : e.textBetween(m - t, h - t, void 0, "￼");
		Cp(g, a.find, o).forEach((e) => {
			if (e.index === void 0) return;
			let t = m + e.index + 1, r = t + e[0].length, i = {
				from: n.tr.mapping.map(t),
				to: n.tr.mapping.map(r)
			}, f = a.handler({
				state: n,
				range: i,
				match: e,
				commands: c,
				chain: l,
				can: u,
				pasteEvent: o,
				dropEvent: s
			});
			d.push(f);
		});
	}), d.every((e) => e !== null);
}
function Md(e) {
	let { editor: t, rules: n } = e, r = null, i = !1, a = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, s;
	try {
		s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
	} catch {
		s = null;
	}
	let c = ({ state: e, from: n, to: r, rule: i, pasteEvt: a }) => {
		let c = e.tr, l = ml({
			state: e,
			transaction: c
		});
		if (jd({
			editor: t,
			state: l,
			from: Math.max(n - 1, 0),
			to: r.b - 1,
			rule: i,
			pasteEvent: a,
			dropEvent: s
		}) && c.steps.length) {
			try {
				s = typeof DragEvent < "u" ? new DragEvent("drop") : null;
			} catch {
				s = null;
			}
			return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, c;
		}
	};
	return t.on("destroy", () => {
		wp === t && (wp = null);
	}), n.map((e) => new O({
		view(e) {
			let n = (n) => {
				r = e.dom.parentElement?.contains(n.target) ? e.dom.parentElement : null, r && (wp = t);
			}, i = () => {
				wp &&= null;
			};
			return window.addEventListener("dragstart", n), window.addEventListener("dragend", i), { destroy() {
				window.removeEventListener("dragstart", n), window.removeEventListener("dragend", i);
			} };
		},
		props: { handleDOMEvents: {
			drop: (e, t) => {
				if (a = r === e.dom.parentElement, s = t, !a) {
					let e = wp;
					e?.isEditable && setTimeout(() => {
						if (e.isDestroyed) return;
						let t = e.state.selection;
						t && e.commands.deleteRange({
							from: t.from,
							to: t.to
						});
					}, 10);
				}
				return !1;
			},
			paste: (e, t) => {
				let n = t.clipboardData?.getData("text/html");
				return o = t, i = !!n?.includes("data-pm-slice"), !1;
			}
		} },
		appendTransaction: (t, n, r) => {
			let s = t[0], l = s.getMeta("uiEvent") === "paste" && !i, u = s.getMeta("uiEvent") === "drop" && !a, d = s.getMeta("applyPasteRules"), f = !!d;
			if (!l && !u && !f) return;
			if (f) {
				let { text: t } = d;
				t = typeof t == "string" ? t : Kl(x.from(t), r.schema);
				let { from: n } = d, i = n + t.length, a = Tp(t);
				return c({
					rule: e,
					state: r,
					from: n,
					to: { b: i },
					pasteEvt: a
				});
			}
			let p = n.doc.content.findDiffStart(r.doc.content), m = n.doc.content.findDiffEnd(r.doc.content);
			if (md(p) && m && p !== m.b) return c({
				rule: e,
				state: r,
				from: p,
				to: m,
				pasteEvt: o
			});
		}
	}));
}
function Nd(e) {
	if (Rp) return;
	Rp = !0;
	let t;
	try {
		let n = vn.fromJSON(e, {
			from: 0,
			to: 0
		});
		if (!Mu(n)) return;
		t = n.slice.content;
	} catch {
		return;
	}
	t instanceof x || console.warn("[tiptap warn]: prosemirror-model is loaded more than once. Wrapping and splitting nodes will fail. Deduplicate it in your lock file, or alias it to a single copy in your bundler.");
}
function Pd(e) {
	return new vp({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = N(e.getAttributes, void 0, r);
			if (i === !1 || i === null) return null;
			let { tr: a } = t, o = r[r.length - 1], s = r[0];
			if (o) {
				let r = s.search(/\S/), c = n.from + s.indexOf(o), l = c + o.length;
				if (Su(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > c).length) return null;
				l < n.to && a.delete(l, n.to), c > n.from && a.delete(n.from + r, c);
				let u = n.from + r + o.length;
				a.addMark(n.from + r, u, e.type.create(i || {})), a.removeStoredMark(e.type);
			}
		},
		undoable: e.undoable
	});
}
function Fd(e) {
	return new vp({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = N(e.getAttributes, void 0, r) || {}, { tr: a } = t, o = n.from, s = n.to, c = e.type.create(i);
			if (r[1]) {
				let e = o + r[0].lastIndexOf(r[1]);
				e > s ? e = s : s = e + r[1].length;
				let t = r[0][r[0].length - 1];
				a.insertText(t, o + r[0].length - 1), a.replaceWith(e, s, c);
			} else if (r[0]) {
				let t = e.type.isInline ? o : o - 1;
				a.insert(t, e.type.create(i)).delete(a.mapping.map(o), a.mapping.map(s));
			}
			a.scrollIntoView();
		},
		undoable: e.undoable
	});
}
function Id(e) {
	return new vp({
		find: e.find,
		handler: ({ state: t, range: n, match: r }) => {
			let i = t.doc.resolve(n.from), a = N(e.getAttributes, void 0, r) || {};
			if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), e.type)) return null;
			t.tr.delete(n.from, n.to).setBlockType(n.from, n.from, e.type, a);
		},
		undoable: e.undoable
	});
}
function Ld(e) {
	return new vp({
		find: e.find,
		handler: ({ state: t, range: n, match: r, chain: i }) => {
			let a = N(e.getAttributes, void 0, r) || {}, o = t.tr.delete(n.from, n.to), s = o.doc.resolve(n.from).blockRange(), c = s && xt(s, e.type, a);
			if (!c) return null;
			if (o.wrap(s, c), e.keepMarks && e.editor) {
				let { selection: n, storedMarks: r } = t, { splittableMarks: i } = e.editor.extensionManager, a = r || n.$to.parentOffset && n.$from.marks();
				if (a) {
					let e = a.filter((e) => i.includes(e.type.name));
					o.ensureMarks(e);
				}
			}
			if (e.keepAttributes) {
				let t = e.type.name === "bulletList" || e.type.name === "orderedList" ? "listItem" : "taskList";
				i().updateAttributes(t, a).run();
			}
			let l = o.doc.resolve(n.from - 1).nodeBefore;
			l && l.type === e.type && Nt(o.doc, n.from - 1) && (!e.joinPredicate || e.joinPredicate(r, l)) && o.join(n.from - 1);
		},
		undoable: e.undoable
	});
}
function Rd(e) {
	return new Sp({
		find: e.find,
		handler: ({ state: t, range: n, match: r, pasteEvent: i }) => {
			let a = N(e.getAttributes, void 0, r, i);
			if (a === !1 || a === null) return null;
			let { tr: o } = t, s = r[r.length - 1], c = r[0], l = n.to;
			if (s) {
				let i = c.search(/\S/), u = n.from + c.indexOf(s), d = u + s.length;
				if (Su(n.from, n.to, t.doc).filter((t) => t.mark.type.excluded.find((n) => n === e.type && n !== t.mark.type)).filter((e) => e.to > u).length) return null;
				d < n.to && o.delete(d, n.to), u > n.from && o.delete(n.from + i, u), l = n.from + i + s.length, o.addMark(n.from + i, l, e.type.create(a || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(e.type);
			}
		}
	});
}
var zd, Bd, Vd, Hd, Ud, Wd, Gd, Kd, qd, Jd, Yd, Xd, Zd, Qd, $d, ef, tf, nf, rf, af, of, sf, cf, lf, uf, df, ff, pf, mf, hf, gf, _f, vf, yf, bf, xf, Sf, Cf, wf, Tf, Ef, Df, Of, kf, Af, jf, Mf, Nf, Pf, Ff, If, Lf, Rf, zf, Bf, Vf, Hf, Uf, Wf, Gf, Kf, qf, Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np, rp, ip, ap, op, sp, cp, lp, up, dp, fp, pp, mp, hp, gp, _p, vp, yp, bp, xp, Sp, Cp, wp, Tp, Ep, F, Dp, Op, kp, Ap, jp, Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, I = e((() => {
	i(), En(), Pr(), Fr(), Ir(), Kr(), Sc(), Rc(), pl(), zd = class e {
		constructor(e) {
			this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
		}
		get hasCustomState() {
			return !!this.customState;
		}
		get state() {
			return this.customState || this.editor.state;
		}
		get commands() {
			let { rawCommands: e, editor: t, state: n } = this, { view: r } = t, { tr: i } = n, a = this.buildProps(i);
			return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, (...e) => {
				let n = t(...e)(a);
				return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), n;
			}]));
		}
		get chain() {
			return () => this.createChain();
		}
		get can() {
			return () => this.createCan();
		}
		createChain(e, t = !0) {
			let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = [], s = !!e, c = e || i.tr, l = () => (!s && t && !c.getMeta("preventDispatch") && !this.hasCustomState && a.dispatch(c), o.every((e) => e === !0)), u = {
				...Object.fromEntries(Object.entries(n).map(([e, n]) => [e, (...e) => {
					let r = this.buildProps(c, t), i = n(...e)(r);
					return o.push(i), u;
				}])),
				run: l
			};
			return u;
		}
		static createFakeChain() {
			let e = new Proxy({}, { get: (t, n) => {
				if (n !== "then") return n === "run" ? () => !1 : () => e;
			} });
			return e;
		}
		createCan(e) {
			let { rawCommands: t, state: n } = this, r = e || n.tr, i = this.buildProps(r, !1);
			return {
				...Object.fromEntries(Object.entries(t).map(([e, t]) => [e, (...e) => t(...e)({
					...i,
					dispatch: void 0
				})])),
				chain: () => this.createChain(r, !1)
			};
		}
		static createFallbackCan() {
			let t = e.createFakeChain();
			return new Proxy({ chain: () => t }, { get: (e, t) => {
				if (t !== "then") return t === "chain" ? e.chain : () => !1;
			} });
		}
		buildProps(e, t = !0) {
			let { rawCommands: n, editor: r, state: i } = this, { view: a } = r, o = {
				tr: e,
				editor: r,
				view: a,
				state: ml({
					state: i,
					transaction: e
				}),
				dispatch: t ? () => void 0 : void 0,
				chain: () => this.createChain(e, t),
				can: () => this.createCan(e),
				get commands() {
					return Object.fromEntries(Object.entries(n).map(([e, t]) => [e, (...e) => t(...e)(o)]));
				}
			};
			return o;
		}
	}, Bd = () => ({ editor: e, view: t }) => (requestAnimationFrame(() => {
		if (!e.isDestroyed) {
			var n;
			t.dom.blur(), (n = window) == null || (n = n.getSelection()) == null || n.removeAllRanges();
		}
	}), !0), Vd = (e = !0) => ({ commands: t }) => t.setContent("", { emitUpdate: e }), Hd = () => ({ tr: e, dispatch: t }) => {
		let { selection: n } = e, { ranges: r } = n;
		if (!t) return !0;
		let i = e.mapping.maps.length;
		return r.forEach(({ $from: t, $to: n }) => {
			let r = t.pos, a = n.pos, o = e.mapping.slice(i), s = 1;
			e.doc.nodesBetween(o.map(r), o.map(a), (t, n) => {
				s = Math.max(s, e.doc.resolve(n).depth + 1);
			});
			for (let t = 0; t < s; t += 1) {
				let t = e.doc, n = e.mapping.maps.length, o = e.mapping.slice(i), s = n, c = e.mapping.slice(n), l = o.map(r), u = o.map(a);
				if (t.nodesBetween(l, u, (t, r) => {
					if (t.type.isText) return;
					e.mapping.maps.length !== s && (s = e.mapping.maps.length, c = e.mapping.slice(n));
					let i = e.doc.resolve(c.map(r)), a = e.doc.resolve(c.map(r + t.nodeSize)), o = i.blockRange(a);
					if (!o) return;
					let l = yt(o);
					if (t.type.isTextblock) {
						let { defaultType: t } = i.parent.contentMatchAt(i.index()), n = e.doc.nodeAt(o.start);
						t && n && !n.hasMarkup(t) && t.validContent(n.content) && e.setNodeMarkup(o.start, t);
					}
					(l || l === 0) && e.lift(o, l);
				}), e.doc.eq(t)) break;
			}
		}), !0;
	}, Ud = (e) => (t) => e(t), Wd = () => ({ state: e, dispatch: t }) => Sr(e, t), Gd = (e, t) => ({ editor: n, tr: r }) => {
		let { state: i } = n, a = i.doc.slice(e.from, e.to);
		r.deleteRange(e.from, e.to);
		let o = r.mapping.map(t);
		return r.insert(o, a.content), r.setSelection(new E(r.doc.resolve(Math.max(o - 1, 0)))), !0;
	}, Kd = () => ({ tr: e, dispatch: t }) => {
		let { selection: n } = e, r = n.$anchor.node();
		if (r.content.size > 0) return !1;
		let i = e.selection.$anchor;
		for (let n = i.depth; n > 0; --n) if (i.node(n).type === r.type) {
			if (t) {
				let t = i.before(n), r = i.after(n);
				e.delete(t, r).scrollIntoView();
			}
			return !0;
		}
		return !1;
	}, qd = (e) => ({ tr: t, state: n, dispatch: r }) => {
		let i = hl(e, n.schema), a = t.selection.$anchor;
		for (let e = a.depth; e > 0; --e) if (a.node(e).type === i) {
			if (r) {
				let n = a.before(e), r = a.after(e);
				t.delete(n, r).scrollIntoView();
			}
			return !0;
		}
		return !1;
	}, Jd = (e) => ({ tr: t, dispatch: n }) => {
		let { from: r, to: i } = e;
		return n && t.delete(r, i), !0;
	}, Yd = (e) => e.content ? /^text(\*|\+)/.test(e.content) : !1, Xd = (e, t, n) => {
		if (!e.parent.isInline || n === "left" && e.pos > e.start() || n === "right" && e.pos < e.end()) return e.pos;
		let r = t.nodes[e.parent.type.name].spec;
		return Yd(r) ? n === "left" ? e.start() - 1 : e.end() + 1 : e.pos;
	}, Zd = (e, t, n) => ({
		from: Xd(e, n, "left"),
		to: Xd(t, n, "right")
	}), Qd = () => ({ state: e, dispatch: t }) => {
		if (e.selection.empty) return !1;
		if (t) {
			let n = e.tr, { ranges: r } = e.selection, i = e.selection instanceof E ? e.selection.$from.marksAcross(e.selection.$to) : null, a = n.steps.length;
			r.forEach((t) => {
				let r = n.mapping.slice(a), i = n.doc.resolve(r.map(t.$from.pos)), o = n.doc.resolve(r.map(t.$to.pos)), { from: s, to: c } = Zd(i, o, e.schema);
				n.deleteRange(s, c);
			}), n.selection.empty || n.setSelection(E.near(n.doc.resolve(n.selection.from))), i && n.ensureMarks(i), n.scrollIntoView(), t(n);
		}
		return !0;
	}, $d = () => ({ commands: e }) => e.keyboardShortcut("Enter"), ef = () => ({ state: e, dispatch: t }) => xr(e, t), tf = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
		let a = xl(e, r.schema), { doc: o, selection: s } = n, { $from: c, from: l, to: u } = s;
		if (i) {
			let e = bl(c, a, t);
			if (e && e.from <= l && e.to >= u) {
				let t = E.create(o, e.from, e.to);
				n.setSelection(t);
			}
		}
		return !0;
	}, nf = (e) => (t) => {
		let n = typeof e == "function" ? e(t) : e;
		for (let e = 0; e < n.length; e += 1) if (n[e](t)) return !0;
		return !1;
	}, rf = (e = null, t = {}) => ({ editor: n, view: r, tr: i, dispatch: a }) => {
		t = {
			scrollIntoView: !0,
			...t
		};
		let o = () => {
			(El() || Tl()) && r.dom.focus(), Dl() && !El() && !Tl() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
				n.isDestroyed || (r.focus(), t?.scrollIntoView && n.commands.scrollIntoView());
			});
		};
		try {
			if (r.hasFocus() && e === null || e === !1) return !0;
		} catch {
			return !1;
		}
		if (a && e === null && !Sl(n.state.selection)) return o(), !0;
		let s = wl(i.doc, e) || n.state.selection, c = n.state.selection.eq(s);
		return a && (c || i.setSelection(s), c && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
	}, af = (e, t) => (n) => e.every((e, r) => t(e, {
		...n,
		index: r
	})), of = (e, t) => ({ tr: n, commands: r }) => r.insertContentAt({
		from: n.selection.from,
		to: n.selection.to
	}, e, t), sf = (e) => {
		let t = e.childNodes;
		for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n];
			r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? e.removeChild(r) : r.nodeType === 1 && sf(r);
		}
		return e;
	}, cf = (e, t, n) => ({ tr: r, dispatch: i, editor: a }) => {
		if (i) {
			n = {
				parseOptions: a.options.parseOptions,
				updateSelection: !0,
				applyInputRules: !1,
				applyPasteRules: !1,
				...n
			};
			let i, o = (e) => {
				a.emit("contentError", {
					editor: a,
					error: e,
					disableCollaboration: () => {
						"collaboration" in a.storage && typeof a.storage.collaboration == "object" && a.storage.collaboration && (a.storage.collaboration.isDisabled = !0);
					}
				});
			}, s = {
				preserveWhitespace: "full",
				...n.parseOptions
			};
			if (!n.errorOnInvalidContent && !a.options.enableContentCheck && a.options.emitContentError) try {
				Al(t, a.schema, {
					parseOptions: s,
					errorOnInvalidContent: !0
				});
			} catch (e) {
				o(e);
			}
			try {
				i = Al(t, a.schema, {
					parseOptions: s,
					errorOnInvalidContent: n.errorOnInvalidContent ?? a.options.enableContentCheck
				});
			} catch (e) {
				return o(e), !1;
			}
			let { from: c, to: l } = typeof e == "number" ? {
				from: e,
				to: e
			} : {
				from: e.from,
				to: e.to
			}, u = !0, d = !0, f = jl(i) ? i.content : [i];
			if (f.forEach((e) => {
				e.check(), u = u ? e.isText && e.marks.length === 0 : !1, d = d ? e.isBlock : !1;
			}), c === l && d) {
				let { parent: e } = r.doc.resolve(c);
				e.isTextblock && !e.type.spec.code && !e.childCount && (--c, l += 1);
			}
			let p;
			if (u) p = Array.isArray(t) ? t.map((e) => e.text || "").join("") : kl(t) ? f.map((e) => e.text ?? "").join("") : typeof t == "object" && t && t.text ? t.text : t, r.insertText(p, c, l);
			else {
				p = x.from(f);
				let e = r.doc.resolve(c), t = e.node(), n = e.parentOffset === 0, i = t.isText || t.isTextblock, a = t.content.size > 0;
				n && i && a && d && (c = Math.max(0, c - 1)), r.replaceWith(c, l, f);
			}
			n.updateSelection && Ml(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
				from: c,
				text: p
			}), n.applyPasteRules && r.setMeta("applyPasteRules", {
				from: c,
				text: p
			});
		}
		return !0;
	}, lf = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
		let { pos: i, attrs: a, content: o, updateSelection: s = !0 } = e, c;
		c = typeof i == "number" ? t.doc.resolve(i) : i || t.selection.$from;
		let l = Nl(c.parent.contentMatchAt(c.index()));
		if (!l) return !1;
		let u = Object.keys(l.spec.attrs || {}), d = a ? Object.fromEntries(Object.entries(a).filter(([e]) => u.includes(e))) : {}, f;
		if (o) {
			let e = Al(o, r.schema);
			f = l.createAndFill(d, e);
		} else f = l.createAndFill(d);
		return f ? (n && (t.insert(c.pos, f), s && Ml(t, t.steps.length - 1, -1)), !0) : !1;
	}, uf = () => ({ state: e, dispatch: t }) => _r(e, t), df = () => ({ state: e, dispatch: t }) => vr(e, t), ff = () => ({ state: e, dispatch: t }) => dr(e, t), pf = () => ({ state: e, dispatch: t }) => hr(e, t), mf = (e, t) => {
		let n = e.resolve(t), r = n.nodeBefore, i = n.nodeAfter;
		return !r || !i ? !1 : !r.type.spec.isolating && !i.type.spec.isolating;
	}, hf = () => ({ state: e, dispatch: t, tr: n }) => {
		try {
			let r = It(e.doc, e.selection.$from.pos, -1);
			return r == null || !mf(e.doc, r) ? !1 : (n.join(r, 2), t && t(n), !0);
		} catch {
			return !1;
		}
	}, gf = () => ({ state: e, dispatch: t, tr: n }) => {
		try {
			let r = It(e.doc, e.selection.$from.pos, 1);
			return r == null || !mf(e.doc, r) ? !1 : (n.join(r, 2), t && t(n), !0);
		} catch {
			return !1;
		}
	}, _f = () => ({ state: e, dispatch: t }) => fr(e, t), vf = () => ({ state: e, dispatch: t }) => pr(e, t), yf = (e) => ({ editor: t, view: n, tr: r, dispatch: i }) => {
		let a = Fl(e).split(/-(?!$)/), o = a.find((e) => ![
			"Alt",
			"Ctrl",
			"Meta",
			"Shift"
		].includes(e)), s = new KeyboardEvent("keydown", {
			key: o === "Space" ? " " : o,
			altKey: a.includes("Alt"),
			ctrlKey: a.includes("Ctrl"),
			metaKey: a.includes("Meta"),
			shiftKey: a.includes("Shift"),
			bubbles: !0,
			cancelable: !0
		});
		return t.captureTransaction(() => {
			n.someProp("handleKeyDown", (e) => e(n, s));
		})?.steps.forEach((e) => {
			let t = e.map(r.mapping);
			t && i && r.maybeStep(t);
		}), !0;
	}, bf = (e, t = {}) => ({ state: n, dispatch: r }) => Il(n, hl(e, n.schema), t) ? yr(n, r) : !1, xf = () => ({ state: e, dispatch: t }) => Cr(e, t), Sf = (e) => ({ state: t, dispatch: n }) => Vr(hl(e, t.schema))(t, n), Cf = () => ({ state: e, dispatch: t }) => br(e, t), wf = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
		let a = null, o = null, s = Ll(typeof e == "string" ? e : e.name, r.schema);
		if (!s) return !1;
		s === "node" && (a = hl(e, r.schema)), s === "mark" && (o = xl(e, r.schema));
		let c = !1;
		return n.selection.ranges.forEach((e) => {
			r.doc.nodesBetween(e.$from.pos, e.$to.pos, (e, r) => {
				a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, Rl(e.attrs, t))), o && e.marks.length && e.marks.forEach((a) => {
					o === a.type && (c = !0, i && n.addMark(r, r + e.nodeSize, o.create(Rl(a.attrs, t))));
				});
			});
		}), c;
	}, Tf = () => ({ tr: e, dispatch: t }) => (t && e.scrollIntoView(), !0), Ef = () => ({ tr: e, dispatch: t }) => {
		if (t) {
			let t = new Rn(e.doc);
			e.setSelection(t);
		}
		return !0;
	}, Df = () => ({ state: e, dispatch: t }) => mr(e, t), Of = () => ({ state: e, dispatch: t }) => gr(e, t), kf = () => ({ state: e, dispatch: t }) => Tr(e, t), Af = () => ({ state: e, dispatch: t }) => Or(e, t), jf = () => ({ state: e, dispatch: t }) => Dr(e, t), Mf = (e, { errorOnInvalidContent: t, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: a, dispatch: o, commands: s }) => {
		let { doc: c } = a;
		if (r.preserveWhitespace !== "full") {
			let s = zl(e, i.schema, r, { errorOnInvalidContent: t ?? i.options.enableContentCheck });
			if (o) {
				let e = jl(s) ? s.content : [s];
				a.replaceWith(0, c.content.size, e).setMeta("preventUpdate", !n);
			}
			return !0;
		}
		return o && a.setMeta("preventUpdate", !n), s.insertContentAt({
			from: 0,
			to: c.content.size
		}, e, {
			parseOptions: r,
			errorOnInvalidContent: t ?? i.options.enableContentCheck
		});
	}, Nf = {
		content: "string",
		marks: "string",
		group: "string",
		inline: "boolean",
		atom: "boolean",
		selectable: "boolean",
		draggable: "boolean",
		code: "boolean",
		whitespace: ["pre", "normal"],
		definingAsContext: "boolean",
		definingForContent: "boolean",
		defining: "boolean",
		isolating: "boolean",
		linebreakReplacement: "boolean"
	}, Pf = {
		inclusive: "boolean",
		excludes: "string",
		group: "string",
		spanning: "boolean",
		code: "boolean"
	}, Ff = (e, t, n, r = 20) => {
		let i = e.doc.resolve(n), a = r, o = null;
		for (; a > 0 && o === null;) {
			let e = i.node(a);
			e?.type.name === t ? o = e : --a;
		}
		return [o, a];
	}, If = (e) => {
		let t = e.depth - 1;
		if (t < 0) return null;
		let n = e.index(t);
		return n === 0 ? null : e.node(t).child(n - 1);
	}, Lf = (e, t = 500) => {
		let n = "", r = e.parentOffset;
		return e.parent.nodesBetween(Math.max(0, r - t), r, (e, t, i, a) => {
			var o;
			let s = (o = e.type.spec).toText?.call(o, {
				node: e,
				pos: t,
				parent: i,
				index: a
			}) || e.textContent || "%leaf%";
			n += e.isAtom && !e.isText ? s : s.slice(0, Math.max(0, r - t));
		}), n;
	}, Rf = (e, t) => {
		let { $from: n, $to: r, $anchor: i } = e.selection;
		if (t) {
			let n = Wl((e) => e.type.name === t)(e.selection);
			if (!n) return !1;
			let r = e.doc.resolve(n.pos + 1);
			return i.pos + 1 === r.end();
		}
		return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
	}, zf = (e) => {
		let { $from: t, $to: n } = e.selection;
		return !(t.parentOffset > 0 || t.pos !== n.pos);
	}, Bf = class e {
		constructor(e) {
			this.position = e;
		}
		static fromJSON(t) {
			return new e(t.position);
		}
		toJSON() {
			return { position: this.position };
		}
	}, Vf = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let { selection: a } = n, { empty: o, ranges: s } = a, c = xl(e, r.schema);
		if (i) {
			if (o) {
				let e = Bl(r, c);
				n.addStoredMark(c.create({
					...e,
					...t
				}));
			} else s.forEach((e) => {
				let i = e.$from.pos, a = e.$to.pos;
				r.doc.nodesBetween(i, a, (e, r) => {
					let o = Math.max(r, i), s = Math.min(r + e.nodeSize, a);
					e.marks.find((e) => e.type === c) ? e.marks.forEach((e) => {
						c === e.type && n.addMark(o, s, c.create({
							...e.attrs,
							...t
						}));
					}) : n.addMark(o, s, c.create(t));
				});
			});
		}
		return Fu(r, n, c);
	}, Hf = (e, t) => ({ tr: n }) => (n.setMeta(e, t), !0), Uf = (e, t = {}) => ({ state: n, dispatch: r, chain: i }) => {
		let a = hl(e, n.schema), o;
		return n.selection.$anchor.sameParent(n.selection.$head) && (o = n.selection.$anchor.parent.attrs), a.isTextblock ? i().command(({ commands: e }) => cr(a, {
			...o,
			...t
		})(n) ? !0 : e.clearNodes()).command(({ state: e }) => cr(a, {
			...o,
			...t
		})(e, r)).run() : (console.warn("[tiptap warn]: Currently \"setNode()\" only supports text block nodes."), !1);
	}, Wf = (e) => ({ tr: t, dispatch: n }) => {
		if (n) {
			let { doc: n } = t, r = Cl(e, 0, n.content.size), i = D.create(n, r);
			t.setSelection(i);
		}
		return !0;
	}, Gf = (e, t) => ({ tr: n, state: r, dispatch: i }) => {
		let { selection: a } = r, o, s;
		return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = a.from, s = a.to), i && n.doc.nodesBetween(o, s, (t, r) => {
			t.isText || n.setNodeMarkup(r, void 0, {
				...t.attrs,
				dir: e
			});
		}), !0;
	}, Kf = (e) => ({ tr: t, dispatch: n }) => {
		if (n) {
			let { doc: n } = t, { from: r, to: i } = typeof e == "number" ? {
				from: e,
				to: e
			} : e, a = E.atStart(n).from, o = E.atEnd(n).to, s = Cl(r, a, o), c = Cl(i, a, o), l = E.create(n, s, c);
			t.setSelection(l);
		}
		return !0;
	}, qf = (e) => ({ state: t, dispatch: n }) => Wr(hl(e, t.schema))(t, n), Jf = ({ keepMarks: e = !0 } = {}) => ({ tr: t, state: n, dispatch: r, editor: i }) => {
		let { selection: a, doc: o } = t, { $from: s, $to: c } = a, l = i.extensionManager.attributes, u = wu(l, s.node().type.name, s.node().attrs);
		if (a instanceof D && a.node.isBlock) return !s.parentOffset || !jt(o, s.pos) ? !1 : (r && (e && Iu(n, i.extensionManager.splittableMarks), t.split(s.pos).scrollIntoView()), !0);
		if (!s.parent.isBlock) return !1;
		let d = c.parentOffset === c.parent.content.size, f = s.depth === 0 ? void 0 : Nl(s.node(-1).contentMatchAt(s.indexAfter(-1))), p = d && f ? [{
			type: f,
			attrs: u
		}] : void 0, m = a instanceof E && !a.empty ? qn.create({
			doc: t.doc,
			selection: a
		}).tr.deleteSelection() : null, h = m ? m.doc : t.doc, g = m ? m.mapping.map(s.pos) : s.pos, _ = jt(h, g, 1, p);
		if (!p && !_ && jt(h, g, 1, f ? [{ type: f }] : void 0) && (_ = !0, p = f ? [{
			type: f,
			attrs: u
		}] : void 0), r) {
			if (_) {
				let e = t.steps.length;
				if (a instanceof E && t.deleteSelection(), t.split(t.mapping.slice(e).map(s.pos), 1, p), f && !d && !s.parentOffset && s.parent.type !== f) {
					let n = t.mapping.slice(e).map(s.before()), r = t.doc.resolve(n);
					s.node(-1).canReplaceWith(r.index(), r.index() + 1, f) && t.setNodeMarkup(t.mapping.slice(e).map(s.before()), f);
				}
			}
			e && Iu(n, i.extensionManager.splittableMarks), t.scrollIntoView();
		}
		return _;
	}, Yf = (e, t = {}) => ({ tr: n, state: r, dispatch: i, editor: a }) => {
		let o = hl(e, r.schema), { $from: s, $to: c } = r.selection, l = r.selection.node;
		if (l && l.isBlock || s.depth < 2 || !s.sameParent(c)) return !1;
		let u = s.node(-1);
		if (u.type !== o) return !1;
		let d = a.extensionManager.attributes;
		if (s.parent.content.size === 0 && s.node(-1).childCount === s.indexAfter(-1)) {
			if (s.depth === 2 || s.node(-3).type !== o || s.index(-2) !== s.node(-2).childCount - 1) return !1;
			if (i) {
				let e = x.empty, r = s.index(-1) ? 1 : s.index(-2) ? 2 : 3;
				for (let t = s.depth - r; t >= s.depth - 3; --t) e = x.from(s.node(t).copy(e));
				let i = s.indexAfter(-1) < s.node(-2).childCount ? 1 : s.indexAfter(-2) < s.node(-3).childCount ? 2 : 3, a = {
					...wu(d, s.node().type.name, s.node().attrs),
					...t
				}, c = o.contentMatch.defaultType?.createAndFill(a) || void 0;
				e = e.append(x.from(o.createAndFill(null, c) || void 0));
				let l = s.before(s.depth - (r - 1));
				n.replace(l, s.after(-i), new C(e, 4 - r, 0));
				let u = -1;
				n.doc.nodesBetween(l, n.doc.content.size, (e, t) => {
					if (u > -1) return !1;
					e.isTextblock && e.content.size === 0 && (u = t + 1);
				}), u > -1 && n.setSelection(E.near(n.doc.resolve(u))), n.scrollIntoView();
			}
			return !0;
		}
		let f = c.pos === s.end() ? u.contentMatchAt(0).defaultType : null, p = {
			...wu(d, u.type.name, u.attrs),
			...t
		}, m = {
			...wu(d, s.node().type.name, s.node().attrs),
			...t
		}, h = s.parentOffset === 0 && s.index(-1) === 0, g = s.before(-1);
		n.delete(s.pos, c.pos);
		let _ = h ? u.attrs : p, ee = f ? [{
			type: o,
			attrs: _
		}, {
			type: f,
			attrs: m
		}] : [{
			type: o,
			attrs: _
		}];
		if (!jt(n.doc, s.pos, 2)) return !1;
		if (i) {
			let { selection: e, storedMarks: t } = r, { splittableMarks: o } = a.extensionManager, c = t || e.$to.parentOffset && e.$from.marks();
			if (n.split(s.pos, 2, ee).scrollIntoView(), h && n.setNodeMarkup(g, void 0, p), !c || !i) return !0;
			let l = c.filter((e) => o.includes(e.type.name));
			n.ensureMarks(l);
		}
		return !0;
	}, Xf = (e, t) => {
		let n = Wl((e) => e.type === t)(e.selection);
		if (!n) return !0;
		let r = e.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
		if (r === void 0) return !0;
		let i = e.doc.nodeAt(r);
		return !(n.node.type === i?.type && Nt(e.doc, n.pos)) || !Gu(n.node.attrs.type, i?.attrs.type) || e.join(n.pos), !0;
	}, Zf = (e, t) => {
		let n = Wl((e) => e.type === t)(e.selection);
		if (!n) return !0;
		let r = e.doc.resolve(n.start).after(n.depth);
		if (r === void 0) return !0;
		let i = e.doc.nodeAt(r);
		return !(n.node.type === i?.type && Nt(e.doc, r)) || !Gu(n.node.attrs.type, i?.attrs.type) || e.join(r), !0;
	}, Qf = (e, t, n, r = {}) => ({ editor: i, tr: a, state: o, dispatch: s, chain: c, commands: l, can: u }) => {
		let { extensions: d, splittableMarks: f } = i.extensionManager, p = hl(e, o.schema), m = hl(t, o.schema), { selection: h, storedMarks: g } = o, { $from: _, $to: ee } = h, v = _.blockRange(ee), y = g || h.$to.parentOffset && h.$from.marks();
		if (!v) return !1;
		let b = Wl((e) => Ou(e.type.name, d))(h), te = h.from === 0 && h.to === o.doc.content.size, ne = o.doc.content.content, re = ne.length === 1 ? ne[0] : null, ie = te && re && Ou(re.type.name, d) ? {
			node: re,
			pos: 0,
			depth: 0
		} : null, ae = b ?? ie, oe = !!b && v.depth >= 1 && v.depth - b.depth <= 1, se = !!ie;
		if ((oe || se) && ae) {
			if (ae.node.type === p) return te && se ? c().command(({ tr: e, dispatch: t }) => {
				let n = Ku(e);
				return n ? (e.setSelection(n), t && t(e), !0) : !1;
			}).liftListItem(m).run() : l.liftListItem(m);
			if (Ou(ae.node.type.name, d) && p.validContent(ae.node.content)) return c().command(() => (a.setNodeMarkup(ae.pos, p), !0)).command(() => Xf(a, p)).command(() => Zf(a, p)).run();
			if (Ou(ae.node.type.name, d)) {
				let e = ae.node.firstChild?.type;
				if (e && e !== m) {
					let e = Hu(ae.node, {
						listType: p,
						itemType: m,
						isListNode: (e) => Ou(e.type.name, d)
					}), t = e ? x.from(e) : null;
					return !t || !p.validContent(t) ? !1 : c().command(() => {
						let { $anchor: e, $head: n } = a.selection, i = e.parent, o = n.parent, s = e.parentOffset, c = n.parentOffset, l;
						try {
							l = p.create(r, t);
						} catch {
							return !1;
						}
						if (a.replaceWith(ae.pos, ae.pos + ae.node.nodeSize, l), i.inlineContent && o.inlineContent) {
							let e = Uu(l, i), t = Uu(l, o);
							if (e !== null && t !== null) {
								let n = ae.pos + e + 2 + s, r = ae.pos + t + 2 + c;
								a.setSelection(E.create(a.doc, n, r));
							}
						}
						return !0;
					}).command(() => Xf(a, p)).command(() => Zf(a, p)).run();
				}
			}
		}
		return !n || !y || !s ? c().command(() => u().wrapInList(p, r) ? !0 : l.clearNodes()).wrapInList(p, r).command(() => Xf(a, p)).command(() => Zf(a, p)).run() : c().command(() => {
			let e = u().wrapInList(p, r), t = y.filter((e) => f.includes(e.type.name));
			return a.ensureMarks(t), e ? !0 : l.clearNodes();
		}).wrapInList(p, r).command(() => Xf(a, p)).command(() => Zf(a, p)).run();
	}, $f = (e, t = {}, n = {}) => ({ state: r, commands: i }) => {
		let { extendEmptyMarkRange: a = !1 } = n, o = xl(e, r.schema);
		return Tu(r, o, t) ? i.unsetMark(o, { extendEmptyMarkRange: a }) : i.setMark(o, t);
	}, ep = (e, t, n = {}) => ({ state: r, commands: i }) => {
		let a = hl(e, r.schema), o = hl(t, r.schema), s = Il(r, a, n), c;
		return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), s ? i.setNode(o, c) : i.setNode(a, {
			...c,
			...n
		});
	}, tp = (e, t = {}) => ({ state: n, commands: r }) => {
		let i = hl(e, n.schema);
		return Il(n, i, t) ? r.lift(i) : r.wrapIn(i, t);
	}, np = () => ({ state: e, dispatch: t }) => {
		let n = e.plugins;
		for (let r = 0; r < n.length; r += 1) {
			let i = n[r], a;
			if (i.spec.isInputRules && (a = i.getState(e))) {
				if (t) {
					let t = e.tr, n = a.transform;
					for (let e = n.steps.length - 1; e >= 0; --e) t.step(n.steps[e].invert(n.docs[e]));
					if (a.text) {
						let n = t.doc.resolve(a.from).marks();
						t.replaceWith(a.from, a.to, e.schema.text(a.text, n));
					} else t.delete(a.from, a.to);
				}
				return !0;
			}
		}
		return !1;
	}, rp = (e = {}) => ({ tr: t, dispatch: n, editor: r }) => {
		let { ignoreClearable: i = !1 } = e, { selection: a } = t, { empty: o, ranges: s } = a;
		if (o) return !0;
		let { nonClearableMarks: c } = r.extensionManager;
		if (n) {
			let e = Object.values(r.schema.marks).filter((e) => i || !c.includes(e.name));
			s.forEach((n) => {
				for (let r of e) t.removeMark(n.$from.pos, n.$to.pos, r);
			});
		}
		return !0;
	}, ip = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let { extendEmptyMarkRange: a = !1 } = t, { selection: o } = n, s = xl(e, r.schema), { $from: c, empty: l, ranges: u } = o;
		if (!i) return !0;
		if (l && a) {
			let { from: e, to: t } = o, r = bl(c, s, c.marks().find((e) => e.type === s)?.attrs);
			r && (e = r.from, t = r.to), n.removeMark(e, t, s);
		} else u.forEach((e) => {
			n.removeMark(e.$from.pos, e.$to.pos, s);
		});
		return n.removeStoredMark(s), !0;
	}, ap = (e) => ({ tr: t, state: n, dispatch: r }) => {
		let { selection: i } = n, a, o;
		return typeof e == "number" ? (a = e, o = e) : e && "from" in e && "to" in e ? (a = e.from, o = e.to) : (a = i.from, o = i.to), r && t.doc.nodesBetween(a, o, (e, n) => {
			if (e.isText) return;
			let r = { ...e.attrs };
			delete r.dir, t.setNodeMarkup(n, void 0, r);
		}), !0;
	}, op = (e, t = {}) => ({ tr: n, state: r, dispatch: i }) => {
		let a = null, o = null, s = Ll(typeof e == "string" ? e : e.name, r.schema);
		if (!s) return !1;
		s === "node" && (a = hl(e, r.schema)), s === "mark" && (o = xl(e, r.schema));
		let c = !1;
		return n.selection.ranges.forEach((e) => {
			let s = e.$from.pos, l = e.$to.pos, u, d, f, p;
			n.selection.empty ? r.doc.nodesBetween(s, l, (e, t) => {
				a && a === e.type && (c = !0, f = Math.max(t, s), p = Math.min(t + e.nodeSize, l), u = t, d = e);
			}) : r.doc.nodesBetween(s, l, (e, r) => {
				r < s && a && a === e.type && (c = !0, f = Math.max(r, s), p = Math.min(r + e.nodeSize, l), u = r, d = e), r >= s && r <= l && (a && a === e.type && (c = !0, i && n.setNodeMarkup(r, void 0, {
					...e.attrs,
					...t
				})), o && e.marks.length && e.marks.forEach((a) => {
					if (o === a.type && (c = !0, i)) {
						let i = Math.max(r, s), c = Math.min(r + e.nodeSize, l);
						n.addMark(i, c, o.create({
							...a.attrs,
							...t
						}));
					}
				}));
			}), d && (u !== void 0 && i && n.setNodeMarkup(u, void 0, {
				...d.attrs,
				...t
			}), o && d.marks.length && d.marks.forEach((e) => {
				o === e.type && i && n.addMark(f, p, o.create({
					...e.attrs,
					...t
				}));
			}));
		}), c;
	}, sp = new k("__tiptap_decorations__"), cp = (e) => ({ tr: t, dispatch: n }) => (n && t.setMeta(sp, {
		type: "force",
		name: e
	}), !0), lp = (e, t = {}) => ({ state: n, dispatch: r }) => sr(hl(e, n.schema), t)(n, r), up = (e, t = {}) => ({ state: n, dispatch: r }) => Lr(hl(e, n.schema), t)(n, r), dp = /* @__PURE__ */ r({
		blur: () => Bd,
		clearContent: () => Vd,
		clearNodes: () => Hd,
		command: () => Ud,
		createParagraphNear: () => Wd,
		cut: () => Gd,
		deleteCurrentNode: () => Kd,
		deleteNode: () => qd,
		deleteRange: () => Jd,
		deleteSelection: () => Qd,
		enter: () => $d,
		exitCode: () => ef,
		extendMarkRange: () => tf,
		first: () => nf,
		focus: () => rf,
		forEach: () => af,
		insertContent: () => of,
		insertContentAt: () => cf,
		insertDefaultBlock: () => lf,
		joinBackward: () => ff,
		joinDown: () => df,
		joinForward: () => pf,
		joinItemBackward: () => hf,
		joinItemForward: () => gf,
		joinTextblockBackward: () => _f,
		joinTextblockForward: () => vf,
		joinUp: () => uf,
		keyboardShortcut: () => yf,
		lift: () => bf,
		liftEmptyBlock: () => xf,
		liftListItem: () => Sf,
		newlineInCode: () => Cf,
		resetAttributes: () => wf,
		scrollIntoView: () => Tf,
		selectAll: () => Ef,
		selectNodeBackward: () => Df,
		selectNodeForward: () => Of,
		selectParentNode: () => kf,
		selectTextblockEnd: () => Af,
		selectTextblockStart: () => jf,
		setContent: () => Mf,
		setMark: () => Vf,
		setMeta: () => Hf,
		setNode: () => Uf,
		setNodeSelection: () => Wf,
		setTextDirection: () => Gf,
		setTextSelection: () => Kf,
		sinkListItem: () => qf,
		splitBlock: () => Jf,
		splitListItem: () => Yf,
		toggleList: () => Qf,
		toggleMark: () => $f,
		toggleNode: () => ep,
		toggleWrap: () => tp,
		undoInputRule: () => np,
		unsetAllMarks: () => rp,
		unsetMark: () => ip,
		unsetTextDirection: () => ap,
		updateAttributes: () => op,
		updateDecorations: () => cp,
		wrapIn: () => lp,
		wrapInList: () => up
	}), fp = /* @__PURE__ */ new WeakMap(), pp = class {
		constructor() {
			this.callbacks = {};
		}
		on(e, t) {
			return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
		}
		emit(e, ...t) {
			let n = this.callbacks[e];
			return n && n.forEach((e) => e.apply(this, t)), this;
		}
		off(e, t) {
			let n = this.callbacks[e];
			return n && (t ? this.callbacks[e] = n.filter((e) => e !== t) : delete this.callbacks[e]), this;
		}
		once(e, t) {
			let n = (...r) => {
				this.off(e, n), t.apply(this, r);
			};
			return this.on(e, n);
		}
		removeAllListeners() {
			this.callbacks = {};
		}
	}, mp = typeof process < "u" && process.env.NODE_ENV !== "production", hp = /* @__PURE__ */ new Set(), gp = class {
		constructor(e) {
			this.warnedWidgetKeys = /* @__PURE__ */ new Set(), this.warnedOutOfRangeExtensions = /* @__PURE__ */ new Set(), this.handleBeforeTransaction = ({ nextState: e }) => {
				let t = sp.getState(e);
				t && this.warnDuplicateWidgetKeys(t);
			}, this.editor = e.editor, this.entries = this.resolveEntries(e.entries), this.entries.forEach(({ name: e, spec: t }) => ud(e, t)), this.plugin = this.entries.length > 0 ? this.createPlugin() : null, this.editor.on("beforeTransaction", this.handleBeforeTransaction);
		}
		destroy() {
			this.editor.off("beforeTransaction", this.handleBeforeTransaction);
		}
		liveWidgetKeys() {
			return sp.getState(this.editor.state)?.widgetKeys ?? hp;
		}
		get mountedView() {
			return this.editor.isDestroyed ? null : this.editor.view;
		}
		resolveEntries(e) {
			let t = [];
			for (let { name: n, addDecorations: r } of e) {
				let e = r();
				e && t.push({
					name: n,
					spec: e
				});
			}
			return t;
		}
		createPlugin() {
			let { editor: e, entries: t } = this;
			return new O({
				key: sp,
				state: {
					init: (e, n) => {
						let r = {}, i = {};
						for (let { name: e, spec: a } of t) {
							let { set: t, widgetKeys: o } = this.buildFullSet(e, a, n);
							r[e] = t, i[e] = o;
						}
						let a = {
							decorationSetsByExtension: r,
							widgetKeysByExtension: i,
							mergedDecorationSet: this.buildMergedSet(n.doc, r),
							widgetKeys: ld(i)
						};
						return this.warnDuplicateWidgetKeys(a), a;
					},
					apply: (n, r, i, a) => {
						let o = n.getMeta(sp), s = o?.type === "force" && !o.name, c = o?.type === "force" ? o.name : void 0, l = {}, u = {}, d = /* @__PURE__ */ new Set();
						return qu(e, () => {
							for (let { name: o, spec: f } of t) {
								let t = s || c === o;
								if (!dd(f, {
									editor: e,
									tr: n,
									oldState: i,
									newState: a
								}, t)) {
									let e = sd(o, r, n);
									l[o] = e.set, u[o] = e.widgetKeys;
								} else if (f.update === "changedRanges" && n.docChanged && !t) {
									let e = this.applyChangedRangesRecompute(o, f, r, n, a);
									l[o] = e.set, u[o] = e.widgetKeys, d.add(o);
								} else {
									let { set: e, widgetKeys: t } = this.buildFullSet(o, f, a);
									l[o] = e, u[o] = t, d.add(o);
								}
							}
						}), d.size === 0 && !n.docChanged ? r : {
							decorationSetsByExtension: l,
							widgetKeysByExtension: u,
							mergedDecorationSet: this.mergeAfterApply({
								entries: t,
								previous: r,
								tr: n,
								decorationSetsByExtension: l,
								recomputedNames: d
							}),
							widgetKeys: ld(u)
						};
					}
				},
				props: { decorations(e) {
					return sp.getState(e)?.mergedDecorationSet ?? j.empty;
				} }
			});
		}
		applyChangedRangesRecompute(e, t, n, r, i) {
			let a = ad(r, i.doc);
			return a.type === "full" ? this.buildFullSet(e, t, i) : this.rebuildRanges(e, t, n, r, i, a.ranges);
		}
		rebuildRanges(e, t, n, r, i, a) {
			let o = n.decorationSetsByExtension[e] ?? j.empty, s = new Set(n.widgetKeysByExtension[e] ?? []), c = od(o, r.mapping, r.doc, s), l = i.doc.content.size;
			for (let { from: n, to: r } of a) {
				let a = c.find(n, r).filter((e) => Qu({
					position: e.from,
					from: n,
					to: r,
					docSize: l
				}));
				for (let e of a) {
					let t = ed(e);
					t && s.delete(t);
				}
				c = c.remove(a);
				let { decorations: o, widgetKeys: u } = Xu($u({
					decorations: this.runCreate(e, "createInRange", () => t.createInRange({
						editor: this.editor,
						state: i,
						view: this.mountedView,
						from: n,
						to: r
					})),
					from: n,
					to: r,
					docSize: l,
					extensionName: e,
					warnedExtensions: this.warnedOutOfRangeExtensions
				}), e);
				c = c.add(i.doc, o);
				for (let e of u) s.add(e);
			}
			return {
				set: c,
				widgetKeys: s
			};
		}
		buildFullSet(e, t, n) {
			let r = this.runCreate(e, "create", () => t.create({
				editor: this.editor,
				state: n,
				view: this.mountedView
			}));
			return Zu(n.doc, r, e);
		}
		runCreate(e, t, n) {
			try {
				return n();
			} catch (n) {
				return console.error(`[tiptap error]: Extension "${e}" threw in \`addDecorations().${t}()\`. Its decorations were dropped for this update.`, n), [];
			}
		}
		warnDuplicateWidgetKeys(e) {
			if (!mp) return;
			if (e.widgetKeys.size === 0) {
				this.warnedWidgetKeys.clear();
				return;
			}
			let t = td(e.mergedDecorationSet), n = new Set(t.map(({ key: e }) => e));
			for (let { key: e, extensions: n } of t) {
				if (this.warnedWidgetKeys.has(e)) continue;
				let t = Array.from(n).map((e) => `"${e}"`).join(", ");
				console.warn(`[tiptap warn]: Duplicate widget decoration key "${e}" in extension${n.size === 1 ? "" : "s"} ${t}. Widget decoration keys must be globally unique, otherwise ProseMirror misplaces the widget DOM. Use a stable, unique key (e.g. \`comment-\${id}\`).`);
			}
			this.warnedWidgetKeys = n;
		}
		buildMergedSet(e, t) {
			let n = Object.keys(t);
			return n.length === 1 ? t[n[0]] : cd(e, t);
		}
		mergeAfterApply({ entries: e, previous: t, tr: n, decorationSetsByExtension: r, recomputedNames: i }) {
			return e.length === 1 ? r[e[0].name] : i.size === 0 ? t.mergedDecorationSet.map(n.mapping, n.doc) : cd(n.doc, r);
		}
	}, _p = 4, vp = class {
		constructor(e) {
			this.find = e.find, this.handler = e.handler, this.undoable = e.undoable ?? !0;
		}
	}, yp = (e, t) => {
		if (gl(t)) return t.exec(e);
		let n = t(e);
		if (!n) return null;
		let r = [n.text];
		return r.index = n.index, r.input = e, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn("[tiptap warn]: \"inputRuleMatch.replaceWith\" must be part of \"inputRuleMatch.text\"."), r.push(n.replaceWith)), r;
	}, bp = class {
		constructor(e = {}) {
			this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
				...this.config,
				...e
			}, this.name = this.config.name;
		}
		get options() {
			return { ...N(M(this, "addOptions", { name: this.name })) };
		}
		get storage() {
			return { ...N(M(this, "addStorage", {
				name: this.name,
				options: this.options
			})) };
		}
		configure(e = {}) {
			let t = this.extend({
				...this.config,
				addOptions: () => wd(this.options, e)
			});
			return t.name = this.name, t.parent = this.parent, this.child = null, t;
		}
		extend(e = {}) {
			let t = new this.constructor({
				...this.config,
				...e
			});
			return t.parent = this, this.child = t, t.name = "name" in e ? e.name : t.parent.name, t;
		}
	}, xp = class e extends bp {
		constructor(...e) {
			super(...e), this.type = "mark";
		}
		static create(t = {}) {
			let n = typeof t == "function" ? t() : t;
			return new e(n);
		}
		static handleExit({ editor: e, mark: t }) {
			let { tr: n } = e.state, r = e.state.selection.$from;
			if (r.pos === r.end()) {
				let i = r.marks();
				if (!i.find((e) => e?.type.name === t.name)) return !1;
				let a = i.find((e) => e?.type.name === t.name);
				return a && n.removeStoredMark(a), n.insertText(" ", r.pos), e.view.dispatch(n), !0;
			}
			return !1;
		}
		configure(e) {
			return super.configure(e);
		}
		extend(e) {
			let t = typeof e == "function" ? e() : e;
			return super.extend(t);
		}
	}, Sp = class {
		constructor(e) {
			this.find = e.find, this.handler = e.handler;
		}
	}, Cp = (e, t, n) => {
		if (gl(t)) return [...e.matchAll(t)];
		let r = t(e, n);
		return r ? r.map((t) => {
			let n = [t.text];
			return n.index = t.index, n.input = e, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn("[tiptap warn]: \"pasteRuleMatch.replaceWith\" must be part of \"pasteRuleMatch.text\"."), n.push(t.replaceWith)), n;
		}) : [];
	}, wp = null, Tp = (e) => {
		var t;
		let n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
		return (t = n.clipboardData) == null || t.setData("text/html", e), n;
	}, Ep = class {
		constructor(e, t) {
			this.splittableMarks = [], this.nonClearableMarks = [], this.decorationManager = null, this.editor = t, this.baseExtensions = e, this.extensions = pu(e), this.hasSchemaSpec = t.options.schemaSpec !== void 0, this.schema = du(this.extensions, t, t.options.schemaSpec), this.setupExtensions();
		}
		get commands() {
			return this.extensions.reduce((e, t) => {
				let n = M(t, "addCommands", {
					name: t.name,
					options: t.options,
					storage: this.editor.extensionStorage[t.name],
					editor: this.editor,
					type: Cu(t.name, this.schema)
				});
				return n ? {
					...e,
					...n()
				} : e;
			}, {});
		}
		get plugins() {
			let { editor: e } = this, t = fu([...this.extensions].reverse()).flatMap((t) => {
				let n = {
					name: t.name,
					options: t.options,
					storage: this.editor.extensionStorage[t.name],
					editor: e,
					type: Cu(t.name, this.schema)
				}, r = [], i = M(t, "addKeyboardShortcuts", n), a = {};
				if (t.type === "mark" && M(t, "exitable", n) && (a.ArrowRight = () => xp.handleExit({
					editor: e,
					mark: t
				})), i) {
					let t = Object.fromEntries(Object.entries(i()).map(([t, n]) => [t, () => n({ editor: e })]));
					a = {
						...a,
						...t
					};
				}
				let o = Nc(a);
				r.push(o);
				let s = M(t, "addInputRules", n);
				if (Du(t, e.options.enableInputRules) && s) {
					let t = s();
					if (t && t.length) {
						let n = Ad({
							editor: e,
							rules: t
						}), i = Array.isArray(n) ? n : [n];
						r.push(...i);
					}
				}
				let c = M(t, "addPasteRules", n);
				if (Du(t, e.options.enablePasteRules) && c) {
					let t = c();
					if (t && t.length) {
						let n = Md({
							editor: e,
							rules: t
						});
						r.push(...n);
					}
				}
				let l = M(t, "addProseMirrorPlugins", n);
				if (l) {
					let e = l();
					r.push(...e);
				}
				return r;
			}), n = this.createDecorationPlugin();
			return n && t.push(n), t;
		}
		createDecorationPlugin() {
			var e;
			let { editor: t } = this;
			(e = this.decorationManager) == null || e.destroy();
			let n = [];
			return this.extensions.forEach((e) => {
				let r = M(e, "addDecorations", {
					name: e.name,
					options: e.options,
					storage: this.editor.extensionStorage[e.name],
					editor: t,
					type: Cu(e.name, this.schema)
				});
				r && n.push({
					name: e.name,
					addDecorations: r
				});
			}), this.decorationManager = new gp({
				editor: t,
				entries: n
			}), this.decorationManager.plugin;
		}
		get attributes() {
			let e = eu(this.extensions);
			return this.hasSchemaSpec ? ql(e, this.schema) : e;
		}
		get nodeViews() {
			let { editor: e } = this, { nodeExtensions: t } = $l(this.extensions);
			return Object.fromEntries(t.filter((e) => !!M(e, "addNodeView")).map((t) => {
				let n = this.attributes.filter((e) => e.type === t.name), r = M(t, "addNodeView", {
					name: t.name,
					options: t.options,
					storage: this.editor.extensionStorage[t.name],
					editor: e,
					type: hl(t.name, this.schema)
				});
				if (!r) return [];
				let i = r();
				return i ? [t.name, (r, a, o, s, c) => {
					let l = au(r, n);
					return i({
						node: r,
						view: a,
						getPos: o,
						decorations: s,
						innerDecorations: c,
						editor: e,
						extension: t,
						HTMLAttributes: l
					});
				}] : [];
			}));
		}
		dispatchTransaction(e) {
			let { editor: t } = this;
			return fu([...this.extensions].reverse()).reduceRight((e, n) => {
				let r = {
					name: n.name,
					options: n.options,
					storage: this.editor.extensionStorage[n.name],
					editor: t,
					type: Cu(n.name, this.schema)
				}, i = M(n, "dispatchTransaction", r);
				return i ? (t) => {
					i.call(r, {
						transaction: t,
						next: e
					});
				} : e;
			}, e);
		}
		transformPastedHTML(e) {
			let { editor: t } = this;
			return fu([...this.extensions]).reduce((e, n) => {
				let r = {
					name: n.name,
					options: n.options,
					storage: this.editor.extensionStorage[n.name],
					editor: t,
					type: Cu(n.name, this.schema)
				}, i = M(n, "transformPastedHTML", r);
				return i ? (t, n) => {
					let a = e(t, n);
					return i.call(r, a);
				} : e;
			}, e || ((e) => e));
		}
		get markViews() {
			let { editor: e } = this, { markExtensions: t } = $l(this.extensions);
			return Object.fromEntries(t.filter((e) => !!M(e, "addMarkView")).map((t) => {
				let n = this.attributes.filter((e) => e.type === t.name), r = M(t, "addMarkView", {
					name: t.name,
					options: t.options,
					storage: this.editor.extensionStorage[t.name],
					editor: e,
					type: xl(t.name, this.schema)
				});
				return r ? [t.name, (i, a, o) => {
					let s = au(i, n);
					return r()({
						mark: i,
						view: a,
						inline: o,
						editor: e,
						extension: t,
						HTMLAttributes: s,
						updateAttributes: (t) => {
							Td(i, e, t);
						}
					});
				}] : [];
			}));
		}
		destroy() {
			var e;
			(e = this.decorationManager) == null || e.destroy(), this.extensions.forEach((e) => {
				let t = e;
				for (; t.parent;) {
					let e = t.parent;
					e.child === t && (e.child = null), t = e;
				}
			}), this.extensions = [], this.baseExtensions = [], this.decorationManager = null, this.schema = null, this.editor = null;
		}
		setupExtensions() {
			let e = this.extensions;
			this.editor.extensionStorage = Object.fromEntries(e.map((e) => [e.name, e.storage])), e.forEach((e) => {
				let t = {
					name: e.name,
					options: e.options,
					storage: this.editor.extensionStorage[e.name],
					editor: this.editor,
					type: Cu(e.name, this.schema)
				};
				e.type === "mark" && ((N(M(e, "keepOnSplit", t)) ?? !0) && this.splittableMarks.push(e.name), (N(M(e, "clearable", t)) ?? !0) || this.nonClearableMarks.push(e.name));
				let n = M(e, "onBeforeCreate", t), r = M(e, "onCreate", t), i = M(e, "onUpdate", t), a = M(e, "onSelectionUpdate", t), o = M(e, "onTransaction", t), s = M(e, "onFocus", t), c = M(e, "onBlur", t), l = M(e, "onDestroy", t);
				n && this.editor.on("beforeCreate", n), r && this.editor.on("create", r), i && this.editor.on("update", i), a && this.editor.on("selectionUpdate", a), o && this.editor.on("transaction", o), s && this.editor.on("focus", s), c && this.editor.on("blur", c), l && this.editor.on("destroy", l);
			});
		}
	}, Ep.resolve = pu, Ep.sort = fu, Ep.flatten = Gl, F = class e extends bp {
		constructor(...e) {
			super(...e), this.type = "extension";
		}
		static create(t = {}) {
			let n = typeof t == "function" ? t() : t;
			return new e(n);
		}
		configure(e) {
			return super.configure(e);
		}
		extend(e) {
			let t = typeof e == "function" ? e() : e;
			return super.extend(t);
		}
	}, Dp = F.create({
		name: "clipboardTextSerializer",
		addOptions() {
			return { blockSeparator: void 0 };
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("clipboardTextSerializer"),
				props: { clipboardTextSerializer: () => {
					let { editor: e } = this, { state: t, schema: n } = e, { doc: r, selection: i } = t, a = gu(n), { blockSeparator: o } = this.options, s = {
						...o === void 0 ? {} : { blockSeparator: o },
						textSerializers: a
					};
					return [...i.ranges].sort((e, t) => e.$from.pos - t.$from.pos).map(({ $from: e, $to: t }) => mu(r, {
						from: e.pos,
						to: t.pos
					}, s)).join(o ?? "\n\n");
				} }
			})];
		}
	}), Op = F.create({
		name: "commands",
		addCommands() {
			return { ...dp };
		}
	}), kp = F.create({
		name: "delete",
		onUpdate({ transaction: e, appendedTransactions: t }) {
			var n;
			let r = () => {
				var n, r;
				if (((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null || (r = n.filterTransaction) == null ? void 0 : r.call(n, e)) ?? e.getMeta("y-sync$")) return;
				let i = Vl(e.before, [e, ...t]);
				xu(i).forEach((t) => {
					i.mapping.mapResult(t.oldRange.from).deletedAfter && i.mapping.mapResult(t.oldRange.to).deletedBefore && i.before.nodesBetween(t.oldRange.from, t.oldRange.to, (n, r) => {
						let a = r + n.nodeSize - 2, o = t.oldRange.from <= r && a <= t.oldRange.to;
						this.editor.emit("delete", {
							type: "node",
							node: n,
							from: r,
							to: a,
							newFrom: i.mapping.map(r),
							newTo: i.mapping.map(a),
							deletedRange: t.oldRange,
							newRange: t.newRange,
							partial: !o,
							editor: this.editor,
							transaction: e,
							combinedTransform: i
						});
					});
				});
				let a = i.mapping;
				i.steps.forEach((t, n) => {
					if (t instanceof mn) {
						let r = a.slice(n).map(t.from, -1), o = a.slice(n).map(t.to), s = a.invert().map(r, -1), c = a.invert().map(o), l = r > 0 && i.doc.nodeAt(r - 1)?.marks.some((e) => e.eq(t.mark)), u = i.doc.nodeAt(o)?.marks.some((e) => e.eq(t.mark));
						this.editor.emit("delete", {
							type: "mark",
							mark: t.mark,
							from: t.from,
							to: t.to,
							deletedRange: {
								from: s,
								to: c
							},
							newRange: {
								from: r,
								to: o
							},
							partial: !!(u || l),
							editor: this.editor,
							transaction: e,
							combinedTransform: i
						});
					}
				});
			};
			((n = this.editor.options.coreExtensionOptions) == null || (n = n.delete) == null ? void 0 : n.async) ?? !0 ? setTimeout(r, 0) : r();
		}
	}), Ap = F.create({
		name: "drop",
		addProseMirrorPlugins() {
			return [new O({
				key: new k("tiptapDrop"),
				props: { handleDrop: (e, t, n, r) => {
					this.editor.emit("drop", {
						editor: this.editor,
						event: t,
						slice: n,
						moved: r
					});
				} }
			})];
		}
	}), jp = F.create({
		name: "editable",
		addProseMirrorPlugins() {
			return [new O({
				key: new k("editable"),
				props: { editable: () => this.editor.options.editable }
			})];
		}
	}), Mp = new k("focusEvents"), Np = F.create({
		name: "focusEvents",
		addProseMirrorPlugins() {
			let { editor: e } = this;
			return [new O({
				key: Mp,
				props: { handleDOMEvents: {
					focus: (t, n) => {
						e.isFocused = !0;
						let r = e.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
						return t.dispatch(r), !1;
					},
					blur: (t, n) => {
						e.isFocused = !1;
						let r = e.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
						return t.dispatch(r), !1;
					}
				} }
			})];
		}
	}), Pp = F.create({
		name: "keymap",
		addKeyboardShortcuts() {
			let e = () => this.editor.commands.first(({ commands: e }) => [
				() => e.undoInputRule(),
				() => e.command(({ tr: t }) => {
					let { selection: n, doc: r } = t, { empty: i, $anchor: a } = n, { pos: o, parent: s } = a, c = a.parent.isTextblock && o > 0 ? t.doc.resolve(o - 1) : a, l = c.parent.type.spec.isolating, u = a.pos - a.parentOffset, d = l && c.parent.childCount === 1 ? u === a.pos : T.atStart(r).from === o;
					return !i || !s.type.isTextblock || s.textContent.length || !d || d && a.parent.type.name === "paragraph" ? !1 : e.clearNodes();
				}),
				() => e.deleteSelection(),
				() => e.joinBackward(),
				() => e.selectNodeBackward()
			]), t = () => this.editor.commands.first(({ commands: e }) => [
				() => e.deleteSelection(),
				() => e.deleteCurrentNode(),
				() => e.joinForward(),
				() => e.selectNodeForward()
			]), n = {
				Enter: () => this.editor.commands.first(({ commands: e }) => [
					() => e.newlineInCode(),
					() => e.createParagraphNear(),
					() => e.liftEmptyBlock(),
					() => e.splitBlock()
				]),
				"Mod-Enter": () => this.editor.commands.exitCode(),
				Backspace: e,
				"Mod-Backspace": e,
				"Shift-Backspace": e,
				Delete: t,
				"Mod-Delete": t,
				"Mod-a": () => this.editor.commands.selectAll()
			}, r = { ...n }, i = {
				...n,
				"Ctrl-h": e,
				"Alt-Backspace": e,
				"Ctrl-d": t,
				"Ctrl-Alt-Backspace": t,
				"Alt-Delete": t,
				"Alt-d": t,
				"Ctrl-a": () => this.editor.commands.selectTextblockStart(),
				"Ctrl-e": () => this.editor.commands.selectTextblockEnd()
			};
			return El() || Pl() ? i : r;
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("clearDocument"),
				appendTransaction: (e, t, n) => {
					if (e.some((e) => e.getMeta("composition"))) return;
					let r = e.some((e) => e.docChanged) && !t.doc.eq(n.doc), i = e.some((e) => e.getMeta("preventClearDocument"));
					if (!r || i) return;
					let { empty: a, from: o, to: s } = t.selection, c = T.atStart(t.doc).from, l = T.atEnd(t.doc).to;
					if (a || o !== c || s !== l || !ku(n.doc)) return;
					let u = n.tr, d = ml({
						state: n,
						transaction: u
					}), { commands: f } = new zd({
						editor: this.editor,
						state: d
					});
					if (f.clearNodes(), u.steps.length) return u;
				}
			})];
		}
	}), Fp = F.create({
		name: "paste",
		addProseMirrorPlugins() {
			return [new O({
				key: new k("tiptapPaste"),
				props: { handlePaste: (e, t, n) => {
					this.editor.emit("paste", {
						editor: this.editor,
						event: t,
						slice: n
					});
				} }
			})];
		}
	}), Ip = F.create({
		name: "tabindex",
		addOptions() {
			return { value: void 0 };
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("tabindex"),
				props: { attributes: () => !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: this.options.value ?? "0" } }
			})];
		}
	}), Lp = F.create({
		name: "textDirection",
		addOptions() {
			return { direction: void 0 };
		},
		addGlobalAttributes() {
			if (!this.options.direction) return [];
			let { nodeExtensions: e } = $l(this.extensions);
			return [{
				types: e.filter((e) => e.name !== "text").map((e) => e.name),
				attributes: { dir: {
					default: this.options.direction,
					parseHTML: (e) => {
						let t = e.getAttribute("dir");
						return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
					},
					renderHTML: (e) => e.dir ? { dir: e.dir } : {}
				} }
			}];
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("textDirection"),
				props: { attributes: () => {
					let e = this.options.direction;
					return e ? { dir: e } : {};
				} }
			})];
		}
	}), Rp = !1, zp = class e {
		get name() {
			return this.node.type.name;
		}
		constructor(e, t, n = !1, r = null) {
			this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = r;
		}
		get node() {
			return this.currentNode || this.resolvedPos.node();
		}
		get element() {
			return this.editor.view.domAtPos(this.pos).node;
		}
		get depth() {
			return this.actualDepth ?? this.resolvedPos.depth;
		}
		get pos() {
			return this.resolvedPos.pos;
		}
		get content() {
			return this.node.content;
		}
		set content(e) {
			let t = this.from, n = this.to;
			if (this.isBlock) {
				if (this.content.size === 0) {
					console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
					return;
				}
				t = this.from + 1, n = this.to - 1;
			}
			this.editor.commands.insertContentAt({
				from: t,
				to: n
			}, e);
		}
		get attributes() {
			return this.node.attrs;
		}
		get textContent() {
			return this.node.textContent;
		}
		get size() {
			return this.node.nodeSize;
		}
		get from() {
			return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
		}
		get range() {
			return {
				from: this.from,
				to: this.to
			};
		}
		get to() {
			return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + +!this.node.isText;
		}
		get parent() {
			if (this.depth === 0) return null;
			let t = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(t);
			return new e(n, this.editor);
		}
		get before() {
			let t = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
			return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.from - 3)), new e(t, this.editor);
		}
		get after() {
			let t = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
			return t.depth !== this.depth && (t = this.resolvedPos.doc.resolve(this.to + 3)), new e(t, this.editor);
		}
		get children() {
			let t = [];
			return this.node.content.forEach((n, r) => {
				let i = n.isBlock && !n.isTextblock, a = n.isAtom && !n.isText, o = n.isInline, s = this.pos + r + +!a;
				if (s < 0 || s > this.resolvedPos.doc.nodeSize - 2) return;
				let c = this.resolvedPos.doc.resolve(s);
				if (!i && !o && c.depth <= this.depth) return;
				let l = new e(c, this.editor, i, i || o ? n : null);
				i && (l.actualDepth = this.depth + 1), t.push(l);
			}), t;
		}
		get firstChild() {
			return this.children[0] || null;
		}
		get lastChild() {
			let e = this.children;
			return e[e.length - 1] || null;
		}
		closest(e, t = {}) {
			let n = null, r = this.parent;
			for (; r && !n;) {
				if (r.node.type.name === e) {
					if (Object.keys(t).length > 0) {
						let e = r.node.attrs, n = Object.keys(t);
						for (let r = 0; r < n.length; r += 1) {
							let i = n[r];
							if (e[i] !== t[i]) break;
						}
					} else n = r;
				}
				r = r.parent;
			}
			return n;
		}
		querySelector(e, t = {}) {
			return this.querySelectorAll(e, t, !0)[0] || null;
		}
		querySelectorAll(e, t = {}, n = !1) {
			let r = [];
			if (!this.children || this.children.length === 0) return r;
			let i = Object.keys(t);
			return this.children.forEach((a) => {
				n && r.length > 0 || (a.node.type.name === e && i.every((e) => t[e] === a.node.attrs[e]) && r.push(a), n && r.length > 0 || (r = r.concat(a.querySelectorAll(e, t, n))));
			}), r;
		}
		setAttribute(e) {
			let { tr: t } = this.editor.state;
			t.setNodeMarkup(this.from, void 0, {
				...this.node.attrs,
				...e
			}), this.editor.view.dispatch(t);
		}
	}, Bp = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror [contenteditable=\"false\"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable=\"false\"] [contenteditable=\"true\"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}", Vp = class extends pp {
		constructor(e = {}) {
			super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.hasWarnedStaleDecorationRead = !1, this.options = {
				element: typeof document < "u" ? document.createElement("div") : null,
				content: "",
				injectCSS: !0,
				injectNonce: void 0,
				extensions: [],
				autofocus: !1,
				editable: !0,
				textDirection: void 0,
				editorProps: {},
				parseOptions: {},
				coreExtensionOptions: {},
				enableInputRules: !0,
				enablePasteRules: !0,
				enableCoreExtensions: !0,
				enableContentCheck: !1,
				emitContentError: !1,
				onBeforeCreate: () => null,
				onCreate: () => null,
				onMount: () => null,
				onUnmount: () => null,
				onUpdate: () => null,
				onSelectionUpdate: () => null,
				onTransaction: () => null,
				onFocus: () => null,
				onBlur: () => null,
				onDestroy: () => null,
				onContentError: ({ error: e }) => {
					throw e;
				},
				onPaste: () => null,
				onDrop: () => null,
				onDelete: () => null,
				enableExtensionDispatchTransaction: !0
			}, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
				getUpdatedPosition: Nu,
				createMappablePosition: Pu
			}, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: e, slice: t, moved: n }) => this.options.onDrop(e, t, n)), this.on("paste", ({ event: e, slice: t }) => this.options.onPaste(e, t)), this.on("delete", this.options.onDelete);
			let t = this.createDoc();
			if (!this.editorState) {
				let e = wl(t, this.options.autofocus);
				this.editorState = qn.create({
					doc: t,
					schema: this.schema,
					selection: e || void 0
				});
			}
			Nd(this.schema), this.options.element && this.mount(this.options.element);
		}
		mount(e) {
			if (typeof document > "u") throw Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
			this.createView(e), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
				this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
			}, 0);
		}
		unmount() {
			if (this.editorView) {
				this.editorState = this.editorView.state;
				let e = this.editorView.dom;
				e?.editor && delete e.editor, this.editorView.destroy();
			}
			if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
				typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
			} catch (e) {
				console.warn("Failed to remove CSS element:", e);
			}
			this.css = null, this.emit("unmount", { editor: this });
		}
		get storage() {
			return this.extensionStorage;
		}
		get commands() {
			return this.commandManager.commands;
		}
		chain() {
			return this.commandManager ? this.commandManager.chain() : zd.createFakeChain();
		}
		can() {
			return this.commandManager ? this.commandManager.can() : zd.createFallbackCan();
		}
		injectCSS() {
			this.options.injectCSS && typeof document < "u" && (this.css = pd(Bp, this.options.injectNonce));
		}
		setOptions(e = {}) {
			this.options = {
				...this.options,
				...e
			}, this.editorView && this.state && !this.isDestroyed && (this.options.editorProps && this.view.setProps({
				...this.options.editorProps,
				attributes: this.getEditorViewAttributes()
			}), this.view.updateState(this.state));
		}
		setEditable(e, t = !0) {
			this.setOptions({ editable: e }), t && this.emit("update", {
				editor: this,
				transaction: this.state.tr,
				appendedTransactions: []
			});
		}
		get isEditable() {
			return this.options.editable && this.view && this.view.editable;
		}
		get view() {
			return this.editorView ? this.editorView : new Proxy({
				state: this.editorState,
				updateState: (e) => {
					this.editorState = e;
				},
				dispatch: (e) => {
					this.dispatchTransaction(e);
				},
				composing: !1,
				dragging: null,
				editable: !0,
				isDestroyed: !1
			}, { get: (e, t) => {
				if (this.editorView) return this.editorView[t];
				if (t === "state") return this.editorState;
				if (t in e) return Reflect.get(e, t);
				throw Error(`[tiptap error]: The editor view is not available. Cannot access view['${t}']. The editor may not be mounted yet.`);
			} });
		}
		get state() {
			return mp && !this.hasWarnedStaleDecorationRead && Ju(this) && (this.hasWarnedStaleDecorationRead = !0, console.warn("[tiptap warn]: `editor.state` was read while decoration `create()` was running. It returns the pre-transaction document. Use the `state` argument passed to `create()` instead. Helpers like `editor.isActive()` read `editor.state` too, so pass `state` to their standalone versions instead of calling them on the editor.")), this.editorView && (this.editorState = this.view.state), this.editorState;
		}
		registerPlugin(e, t) {
			let n = tu(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], r = this.state.reconfigure({ plugins: n });
			return this.view.updateState(r), r;
		}
		unregisterPlugin(e) {
			if (this.isDestroyed) return;
			let t = this.state.plugins, n = t;
			if ([].concat(e).forEach((e) => {
				let t = typeof e == "string" ? `${e}$` : e.key;
				n = n.filter((e) => !e.key.startsWith(t));
			}), t.length === n.length) return;
			let r = this.state.reconfigure({ plugins: n });
			return this.view.updateState(r), r;
		}
		createExtensionManager() {
			var e, t;
			let n = [...this.options.enableCoreExtensions ? [
				jp,
				Dp.configure({ blockSeparator: (e = this.options.coreExtensionOptions) == null || (e = e.clipboardTextSerializer) == null ? void 0 : e.blockSeparator }),
				Op,
				Np,
				Pp,
				Ip.configure({ value: (t = this.options.coreExtensionOptions) == null || (t = t.tabindex) == null ? void 0 : t.value }),
				Ap,
				Fp,
				kp,
				Lp.configure({ direction: this.options.textDirection })
			].filter((e) => typeof this.options.enableCoreExtensions != "object" || this.options.enableCoreExtensions[e.name] !== !1) : [], ...this.options.extensions].filter((e) => [
				"extension",
				"node",
				"mark"
			].includes(e?.type));
			this.extensionManager = new Ep(n, this);
		}
		createCommandManager() {
			this.commandManager = new zd({ editor: this });
		}
		createSchema() {
			this.schema = this.extensionManager.schema;
		}
		createDoc() {
			let e;
			try {
				e = zl(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
			} catch (e) {
				if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) throw e;
				let t = zl(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
				return this.editorState = qn.create({
					doc: t,
					schema: this.schema,
					selection: wl(t, this.options.autofocus) || void 0
				}), this.emit("contentError", {
					editor: this,
					error: e,
					disableCollaboration: () => {
						"collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((e) => e.name !== "collaboration"), this.createExtensionManager();
					}
				}), this.editorState.doc;
			}
			return e;
		}
		getEditorViewAttributes() {
			let e = this.options.editorProps?.attributes;
			return tu(e) ? (t) => ({
				role: "textbox",
				...e(t)
			}) : {
				role: "textbox",
				...e
			};
		}
		createView(e) {
			let { editorProps: t, enableExtensionDispatchTransaction: n } = this.options, r = t.dispatchTransaction || this.dispatchTransaction.bind(this), i = n ? this.extensionManager.dispatchTransaction(r) : r, a = t.transformPastedHTML, o = this.extensionManager.transformPastedHTML(a);
			this.editorView = new bc(e, {
				...t,
				attributes: this.getEditorViewAttributes(),
				dispatchTransaction: i,
				transformPastedHTML: o,
				state: this.editorState,
				markViews: this.extensionManager.markViews,
				nodeViews: this.extensionManager.nodeViews
			});
			let s = this.state.reconfigure({ plugins: this.extensionManager.plugins });
			this.view.updateState(s), this.prependClass(), this.injectCSS();
			let c = this.view.dom;
			c.editor = this;
		}
		createNodeViews() {
			this.view.isDestroyed || this.view.setProps({
				markViews: this.extensionManager.markViews,
				nodeViews: this.extensionManager.nodeViews
			});
		}
		prependClass() {
			this.view.dom.className = `${this.className} ${this.view.dom.className}`;
		}
		captureTransaction(e) {
			this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
			let t = this.capturedTransaction;
			return this.capturedTransaction = null, t;
		}
		dispatchTransaction(e) {
			if (this.view.isDestroyed) return;
			if (this.isCapturingTransaction) {
				if (!this.capturedTransaction) {
					this.capturedTransaction = e;
					return;
				}
				e.steps.forEach((e) => this.capturedTransaction?.step(e));
				return;
			}
			let { state: t, transactions: n } = this.state.applyTransaction(e), r = !this.state.selection.eq(t.selection), i = n.includes(e), a = this.state;
			if (this.emit("beforeTransaction", {
				editor: this,
				transaction: e,
				nextState: t
			}), !i) return;
			this.view.updateState(t), this.emit("transaction", {
				editor: this,
				transaction: e,
				appendedTransactions: n.slice(1)
			}), r && this.emit("selectionUpdate", {
				editor: this,
				transaction: e
			});
			let o = n.findLast((e) => e.getMeta("focus") || e.getMeta("blur")), s = o?.getMeta("focus"), c = o?.getMeta("blur");
			s && this.emit("focus", {
				editor: this,
				event: s.event,
				transaction: o
			}), c && this.emit("blur", {
				editor: this,
				event: c.event,
				transaction: o
			}), e.getMeta("preventUpdate") || !n.some((e) => e.docChanged) || a.doc.eq(t.doc) || this.emit("update", {
				editor: this,
				transaction: e,
				appendedTransactions: n.slice(1)
			});
		}
		getAttributes(e) {
			return vu(this.state, e);
		}
		isActive(e, t) {
			let n = typeof e == "string" ? e : null, r = typeof e == "string" ? t : e;
			return Eu(this.state, n, r);
		}
		getJSON() {
			return this.state.doc.toJSON();
		}
		getHTML() {
			return Kl(this.state.doc.content, this.schema);
		}
		getText(e) {
			let { blockSeparator: t = "\n\n", textSerializers: n = {} } = e || {};
			return hu(this.state.doc, {
				blockSeparator: t,
				textSerializers: {
					...gu(this.schema),
					...n
				}
			});
		}
		get isEmpty() {
			return ku(this.state.doc);
		}
		destroy() {
			this.destroyed || (this.destroyed = !0, this.emit("destroy"), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {});
		}
		get isDestroyed() {
			return this.editorView?.isDestroyed ?? !0;
		}
		$node(e, t) {
			return this.$doc?.querySelector(e, t) || null;
		}
		$nodes(e, t) {
			return this.$doc?.querySelectorAll(e, t) || null;
		}
		$pos(e) {
			let t = this.state.doc.resolve(e), n = e > 0 && t.nodeAfter && !t.nodeAfter.isText && t.nodeAfter.isAtom ? t.nodeAfter : null;
			return new zp(t, this, !1, n);
		}
		get $doc() {
			return this.$pos(0);
		}
	}, Hp = (e) => "touches" in e, Up = class {
		constructor(e) {
			var t;
			this.directions = [
				"bottom-left",
				"bottom-right",
				"top-left",
				"top-right"
			], this.minSize = {
				height: 8,
				width: 8
			}, this.preserveAspectRatio = !1, this.classNames = {
				container: "",
				wrapper: "",
				handle: "",
				resizing: ""
			}, this.initialWidth = 0, this.initialHeight = 0, this.aspectRatio = 1, this.isResizing = !1, this.activeHandle = null, this.startX = 0, this.startY = 0, this.startWidth = 0, this.startHeight = 0, this.isShiftKeyPressed = !1, this.lastEditableState = void 0, this.handleMap = /* @__PURE__ */ new Map(), this.handleEditorUpdate = () => {
				let e = this.editor.isEditable;
				e !== this.lastEditableState && (this.lastEditableState = e, e ? e && this.handleMap.size === 0 && this.attachHandles() : this.removeHandles());
			}, this.handleMouseMove = (e) => {
				if (!this.isResizing || !this.activeHandle) return;
				let t = e.clientX - this.startX, n = e.clientY - this.startY;
				this.handleResize(t, n);
			}, this.handleTouchMove = (e) => {
				if (!this.isResizing || !this.activeHandle) return;
				let t = e.touches[0];
				if (!t) return;
				let n = t.clientX - this.startX, r = t.clientY - this.startY;
				this.handleResize(n, r);
			}, this.handleMouseUp = () => {
				if (!this.isResizing) return;
				let e = this.element.offsetWidth, t = this.element.offsetHeight;
				this.onCommit(e, t), this.isResizing = !1, this.activeHandle = null, this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
			}, this.handleKeyDown = (e) => {
				e.key === "Shift" && (this.isShiftKeyPressed = !0);
			}, this.handleKeyUp = (e) => {
				e.key === "Shift" && (this.isShiftKeyPressed = !1);
			}, this.node = e.node, this.editor = e.editor, this.element = e.element, this.element.draggable = !1, this.contentElement = e.contentElement, this.getPos = e.getPos, this.onResize = e.onResize, this.onCommit = e.onCommit, this.onUpdate = e.onUpdate, e.options?.min && (this.minSize = {
				...this.minSize,
				...e.options.min
			}), e.options?.max && (this.maxSize = e.options.max), e != null && (t = e.options) != null && t.directions && (this.directions = e.options.directions), e.options?.preserveAspectRatio && (this.preserveAspectRatio = e.options.preserveAspectRatio), e.options?.className && (this.classNames = {
				container: e.options.className.container || "",
				wrapper: e.options.className.wrapper || "",
				handle: e.options.className.handle || "",
				resizing: e.options.className.resizing || ""
			}), e.options?.createCustomHandle && (this.createCustomHandle = e.options.createCustomHandle), this.wrapper = this.createWrapper(), this.container = this.createContainer(), this.applyInitialSize(), this.attachHandles(), this.editor.on("update", this.handleEditorUpdate);
		}
		get dom() {
			return this.container;
		}
		get contentDOM() {
			return this.contentElement ?? null;
		}
		update(e, t, n) {
			return e.type === this.node.type && (this.node = e, !this.onUpdate || this.onUpdate(e, t, n));
		}
		destroy() {
			this.isResizing && (this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp), this.isResizing = !1, this.activeHandle = null), this.editor.off("update", this.handleEditorUpdate), this.container.remove();
		}
		createContainer() {
			let e = document.createElement("div");
			return e.dataset.resizeContainer = "", e.dataset.node = this.node.type.name, e.style.display = this.node.type.isInline ? "inline-flex" : "flex", this.classNames.container && (e.className = this.classNames.container), e.appendChild(this.wrapper), e;
		}
		createWrapper() {
			let e = document.createElement("div");
			return e.style.position = "relative", e.style.display = "block", e.dataset.resizeWrapper = "", this.classNames.wrapper && (e.className = this.classNames.wrapper), e.appendChild(this.element), e;
		}
		createHandle(e) {
			let t = document.createElement("div");
			return t.dataset.resizeHandle = e, t.style.position = "absolute", this.classNames.handle && (t.className = this.classNames.handle), t;
		}
		positionHandle(e, t) {
			let n = t.includes("top"), r = t.includes("bottom"), i = t.includes("left"), a = t.includes("right");
			n && (e.style.top = "0"), r && (e.style.bottom = "0"), i && (e.style.left = "0"), a && (e.style.right = "0"), (t === "top" || t === "bottom") && (e.style.left = "0", e.style.right = "0"), (t === "left" || t === "right") && (e.style.top = "0", e.style.bottom = "0");
		}
		attachHandles() {
			this.directions.forEach((e) => {
				let t;
				t = this.createCustomHandle ? this.createCustomHandle(e) : this.createHandle(e), t instanceof HTMLElement || (console.warn(`[ResizableNodeView] createCustomHandle("${e}") did not return an HTMLElement. Falling back to default handle.`), t = this.createHandle(e)), this.createCustomHandle || this.positionHandle(t, e), t.addEventListener("mousedown", (t) => this.handleResizeStart(t, e)), t.addEventListener("touchstart", (t) => this.handleResizeStart(t, e)), this.handleMap.set(e, t), this.wrapper.appendChild(t);
			});
		}
		removeHandles() {
			this.handleMap.forEach((e) => e.remove()), this.handleMap.clear();
		}
		applyInitialSize() {
			let e = this.node.attrs.width, t = this.node.attrs.height;
			e ? (this.element.style.width = `${e}px`, this.initialWidth = e) : this.initialWidth = this.element.offsetWidth, t ? (this.element.style.height = `${t}px`, this.initialHeight = t) : this.initialHeight = this.element.offsetHeight, this.initialWidth > 0 && this.initialHeight > 0 && (this.aspectRatio = this.initialWidth / this.initialHeight);
		}
		handleResizeStart(e, t) {
			e.preventDefault(), e.stopPropagation(), this.isResizing = !0, this.activeHandle = t, Hp(e) ? (this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY) : (this.startX = e.clientX, this.startY = e.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
		}
		handleResize(e, t) {
			if (!this.activeHandle) return;
			let n = this.preserveAspectRatio || this.isShiftKeyPressed, { width: r, height: i } = this.calculateNewDimensions(this.activeHandle, e, t), a = this.applyConstraints(r, i, n);
			this.element.style.width = `${a.width}px`, this.element.style.height = `${a.height}px`, this.onResize && this.onResize(a.width, a.height);
		}
		calculateNewDimensions(e, t, n) {
			let r = this.startWidth, i = this.startHeight, a = e.includes("right"), o = e.includes("left"), s = e.includes("bottom"), c = e.includes("top");
			return a ? r = this.startWidth + t : o && (r = this.startWidth - t), s ? i = this.startHeight + n : c && (i = this.startHeight - n), (e === "right" || e === "left") && (r = this.startWidth + (a ? t : -t)), (e === "top" || e === "bottom") && (i = this.startHeight + (s ? n : -n)), this.preserveAspectRatio || this.isShiftKeyPressed ? this.applyAspectRatio(r, i, e) : {
				width: r,
				height: i
			};
		}
		applyConstraints(e, t, n) {
			if (!n) {
				let n = Math.max(this.minSize.width, e), r = Math.max(this.minSize.height, t);
				return this.maxSize?.width && (n = Math.min(this.maxSize.width, n)), this.maxSize?.height && (r = Math.min(this.maxSize.height, r)), {
					width: n,
					height: r
				};
			}
			let r = e, i = t;
			return r < this.minSize.width && (r = this.minSize.width, i = r / this.aspectRatio), i < this.minSize.height && (i = this.minSize.height, r = i * this.aspectRatio), this.maxSize?.width && r > this.maxSize.width && (r = this.maxSize.width, i = r / this.aspectRatio), this.maxSize?.height && i > this.maxSize.height && (i = this.maxSize.height, r = i * this.aspectRatio), {
				width: r,
				height: i
			};
		}
		applyAspectRatio(e, t, n) {
			return n === "left" || n === "right" ? {
				width: e,
				height: e / this.aspectRatio
			} : n === "top" || n === "bottom" ? {
				width: t * this.aspectRatio,
				height: t
			} : {
				width: e,
				height: e / this.aspectRatio
			};
		}
	}, Wp = class e extends bp {
		constructor(...e) {
			super(...e), this.type = "node";
		}
		static create(t = {}) {
			let n = typeof t == "function" ? t() : t;
			return new e(n);
		}
		configure(e) {
			return super.configure(e);
		}
		extend(e) {
			let t = typeof e == "function" ? e() : e;
			return super.extend(t);
		}
	};
}));
// node_modules/@tiptap/core/dist/jsx-runtime/jsx-runtime.js
function Gp(e) {
	let t = e;
	return Yp.add(t), t;
}
function Kp(e) {
	return Array.isArray(e) && Yp.has(e);
}
function qp(e) {
	return e.flatMap((e) => e == null ? [] : Array.isArray(e) && Xp.has(e) && !Kp(e) ? qp(e) : [e]);
}
function Jp(e, t) {
	if (e === "slot") return 0;
	if (e instanceof Function) {
		let n = e(t);
		return Array.isArray(n) && !Kp(n) && !Xp.has(n) ? Gp(n) : n;
	}
	let { children: n, ...r } = t ?? {};
	if (e === "svg") throw Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
	if (Array.isArray(n)) {
		if (Kp(n)) return Gp([
			e,
			r,
			n
		]);
		if (n.length === 0) return Gp([e, r]);
		let t = qp(n);
		return t.length === 0 ? Gp([e, r]) : Gp([
			e,
			r,
			...t
		]);
	}
	return Gp(n == null ? [e, r] : [
		e,
		r,
		n
	]);
}
var Yp, Xp, Zp, Qp = e((() => {
	Yp = /* @__PURE__ */ new WeakSet(), Xp = /* @__PURE__ */ new WeakSet(), Zp = (e, t) => Jp(e, t);
})), $p = e((() => {
	Qp();
})), em, tm, nm, rm = e((() => {
	I(), Ir(), Fr(), $p(), em = (e, t) => {
		let { state: n } = e, { selection: r } = n;
		if (!r.empty) return !1;
		let { $from: i } = r;
		if (i.parentOffset !== 0) return !1;
		let a = i.depth - 1;
		if (a < 0) return !1;
		let o = i.node(a), s = i.index(a);
		if (s === 0) return !1;
		if (o.type === t) return e.commands.lift(t.name);
		let c = o.child(s - 1);
		if (c.type !== t || !c.lastChild?.isTextblock) return !1;
		let l = i.before() - 1 - 1;
		return e.commands.command(({ tr: e, dispatch: t }) => {
			if (!t) return !0;
			let n = i.parent.content, r = new C(n, 0, 0);
			return e.replace(l, i.after(), r), e.setSelection(E.create(e.doc, l + n.size)), e.scrollIntoView(), t(e), !0;
		});
	}, tm = /^\s*>\s$/, nm = Wp.create({
		name: "blockquote",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		content: "block+",
		group: "block",
		defining: !0,
		parseHTML() {
			return [{ tag: "blockquote" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return /* @__PURE__ */ Zp("blockquote", {
				...P(this.options.HTMLAttributes, e),
				children: /* @__PURE__ */ Zp("slot", {})
			});
		},
		parseMarkdown: (e, t) => {
			let n = t.parseBlockChildren ?? t.parseChildren;
			return t.createNode("blockquote", void 0, n(e.tokens || []));
		},
		renderMarkdown: (e, t) => {
			if (!e.content) return "";
			let n = [];
			return e.content.forEach((e, r) => {
				let i = (t.renderChild?.call(t, e, r) ?? t.renderChildren([e])).split("\n").map((e) => e.trim() === "" ? ">" : `> ${e}`);
				n.push(i.join("\n"));
			}), n.join("\n>\n");
		},
		addCommands() {
			return {
				setBlockquote: () => ({ commands: e }) => e.wrapIn(this.name),
				toggleBlockquote: () => ({ commands: e }) => e.toggleWrap(this.name),
				unsetBlockquote: () => ({ commands: e }) => e.lift(this.name)
			};
		},
		addKeyboardShortcuts() {
			return {
				"Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
				Backspace: () => em(this.editor, this.type)
			};
		},
		addInputRules() {
			return [Ld({
				find: tm,
				type: this.type
			})];
		}
	});
})), im, am, om, sm, cm, lm = e((() => {
	I(), $p(), im = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, am = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, om = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, sm = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, cm = xp.create({
		name: "bold",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		parseHTML() {
			return [
				{ tag: "strong" },
				{
					tag: "b",
					getAttrs: (e) => e.style.fontWeight !== "normal" && null
				},
				{
					style: "font-weight=400",
					clearMark: (e) => e.type.name === this.name
				},
				{
					style: "font-weight",
					getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null
				}
			];
		},
		renderHTML({ HTMLAttributes: e }) {
			return /* @__PURE__ */ Zp("strong", {
				...P(this.options.HTMLAttributes, e),
				children: /* @__PURE__ */ Zp("slot", {})
			});
		},
		markdownTokenName: "strong",
		parseMarkdown: (e, t) => t.applyMark("bold", t.parseInline(e.tokens || [])),
		markdownOptions: { htmlReopen: {
			open: "<strong>",
			close: "</strong>"
		} },
		renderMarkdown: (e, t) => `**${t.renderChildren(e)}**`,
		addCommands() {
			return {
				setBold: () => ({ commands: e }) => e.setMark(this.name),
				toggleBold: () => ({ commands: e }) => e.toggleMark(this.name),
				unsetBold: () => ({ commands: e }) => e.unsetMark(this.name)
			};
		},
		addKeyboardShortcuts() {
			return {
				"Mod-b": () => this.editor.commands.toggleBold(),
				"Mod-B": () => this.editor.commands.toggleBold()
			};
		},
		addInputRules() {
			return [Pd({
				find: im,
				type: this.type
			}), Pd({
				find: om,
				type: this.type
			})];
		},
		addPasteRules() {
			return [Rd({
				find: am,
				type: this.type
			}), Rd({
				find: sm,
				type: this.type
			})];
		}
	});
}));
// node_modules/@tiptap/extension-code/dist/index.js
function um(e) {
	let t = new Set((e.match(/`+/g) || []).map((e) => e.length)), n = 1;
	for (; t.has(n);) n += 1;
	return n;
}
var dm, fm, pm, mm = e((() => {
	I(), dm = (e) => {
		let t = /`([^`]+)`(?!`)$/.exec(e);
		return !t || t.index > 0 && e[t.index - 1] === "`" ? null : {
			index: t.index,
			text: t[0],
			replaceWith: t[1]
		};
	}, fm = (e) => {
		let t = /`([^`]+)`(?!`)/g, n = [], r;
		for (; (r = t.exec(e)) !== null;) r.index > 0 && e[r.index - 1] === "`" || n.push({
			index: r.index,
			text: r[0],
			replaceWith: r[1]
		});
		return n;
	}, pm = xp.create({
		name: "code",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		excludes: "_",
		code: !0,
		exitable: !0,
		parseHTML() {
			return [{ tag: "code" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"code",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		markdownTokenName: "codespan",
		parseMarkdown: (e, t) => t.applyMark("code", [{
			type: "text",
			text: e.text || ""
		}]),
		renderMarkdown: (e, t, n) => {
			var r;
			if (!e.content) return "";
			let i = typeof (n == null || (r = n.meta) == null ? void 0 : r.markText) == "string" ? n.meta.markText : "", a = "`".repeat(um(i)), o = i.startsWith("`") || i.endsWith("`") ? " " : "";
			return `${a}${o}${t.renderChildren(e.content)}${o}${a}`;
		},
		addCommands() {
			return {
				setCode: () => ({ commands: e }) => e.setMark(this.name),
				toggleCode: () => ({ commands: e }) => e.toggleMark(this.name),
				unsetCode: () => ({ commands: e }) => e.unsetMark(this.name)
			};
		},
		addKeyboardShortcuts() {
			return { "Mod-e": () => this.editor.commands.toggleCode() };
		},
		addInputRules() {
			return [Pd({
				find: dm,
				type: this.type
			})];
		},
		addPasteRules() {
			return [Rd({
				find: fm,
				type: this.type
			})];
		}
	});
})), hm, gm, _m, vm, ym = e((() => {
	I(), Fr(), hm = 4, gm = /^```([a-z]+)?[\s\n]$/, _m = /^~~~([a-z]+)?[\s\n]$/, vm = Wp.create({
		name: "codeBlock",
		addOptions() {
			return {
				languageClassPrefix: "language-",
				exitOnTripleEnter: !0,
				exitOnArrowDown: !0,
				exitOnArrowUp: !0,
				defaultLanguage: null,
				enableTabIndentation: !1,
				tabSize: hm,
				HTMLAttributes: {}
			};
		},
		content: "text*",
		marks: "",
		group: "block",
		code: !0,
		defining: !0,
		addAttributes() {
			return { language: {
				default: this.options.defaultLanguage,
				parseHTML: (e) => {
					let { languageClassPrefix: t } = this.options;
					return t && [...e.firstElementChild?.classList || []].filter((e) => e.startsWith(t)).map((e) => e.replace(t, ""))[0] || null;
				},
				rendered: !1
			} };
		},
		parseHTML() {
			return [{
				tag: "pre",
				preserveWhitespace: "full"
			}];
		},
		renderHTML({ node: e, HTMLAttributes: t }) {
			return [
				"pre",
				P(this.options.HTMLAttributes, t),
				[
					"code",
					{ class: e.attrs.language ? this.options.languageClassPrefix + e.attrs.language : null },
					0
				]
			];
		},
		markdownTokenName: "code",
		parseMarkdown: (e, t) => e.raw?.startsWith("```") === !1 && e.raw?.startsWith("~~~") === !1 && e.codeBlockStyle !== "indented" ? [] : t.createNode("codeBlock", { language: e.lang || null }, e.text ? [t.createTextNode(e.text)] : []),
		renderMarkdown: (e, t) => {
			let n = "", r = e.attrs?.language || "";
			return n = e.content ? [
				`\`\`\`${r}`,
				t.renderChildren(e.content),
				"```"
			].join("\n") : `\`\`\`${r}\n\n\`\`\``, n;
		},
		addCommands() {
			return {
				setCodeBlock: (e) => ({ commands: t }) => t.setNode(this.name, e),
				toggleCodeBlock: (e) => ({ commands: t }) => t.toggleNode(this.name, "paragraph", e)
			};
		},
		addKeyboardShortcuts() {
			return {
				"Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
				Backspace: () => {
					let { empty: e, $anchor: t } = this.editor.state.selection, n = t.pos === 1;
					return !e || t.parent.type.name !== this.name ? !1 : n || !t.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
				},
				Tab: ({ editor: e }) => {
					if (!this.options.enableTabIndentation) return !1;
					let t = this.options.tabSize ?? hm, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
					if (i.parent.type !== this.type) return !1;
					let o = " ".repeat(t);
					return a ? e.commands.insertContent(o) : e.commands.command(({ tr: e }) => {
						let { from: t, to: i } = r, a = n.doc.textBetween(t, i, "\n", "\n").split("\n").map((e) => o + e).join("\n");
						return e.replaceWith(t, i, n.schema.text(a)), !0;
					});
				},
				"Shift-Tab": ({ editor: e }) => {
					if (!this.options.enableTabIndentation) return !1;
					let t = this.options.tabSize ?? hm, { state: n } = e, { selection: r } = n, { $from: i, empty: a } = r;
					return i.parent.type === this.type ? a ? e.commands.command(({ tr: e }) => {
						let { pos: r } = i, a = i.start(), o = i.end(), s = n.doc.textBetween(a, o, "\n", "\n").split("\n"), c = 0, l = 0, u = r - a;
						for (let e = 0; e < s.length; e += 1) {
							if (l + s[e].length >= u) {
								c = e;
								break;
							}
							l += s[e].length + 1;
						}
						let d = s[c].match(/^ */)?.[0] || "", f = Math.min(d.length, t);
						if (f === 0) return !0;
						let p = a;
						for (let e = 0; e < c; e += 1) p += s[e].length + 1;
						return e.delete(p, p + f), r - p <= f && e.setSelection(E.create(e.doc, p)), !0;
					}) : e.commands.command(({ tr: e }) => {
						let { from: i, to: a } = r, o = n.doc.textBetween(i, a, "\n", "\n").split("\n").map((e) => {
							let n = e.match(/^ */)?.[0] || "", r = Math.min(n.length, t);
							return e.slice(r);
						}).join("\n");
						return e.replaceWith(i, a, n.schema.text(o)), !0;
					}) : !1;
				},
				Enter: ({ editor: e }) => {
					if (!this.options.exitOnTripleEnter) return !1;
					let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
					if (!i || r.parent.type !== this.type) return !1;
					let a = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith("\n\n");
					return !a || !o ? !1 : e.chain().command(({ tr: e }) => (e.delete(r.pos - 2, r.pos), !0)).exitCode().run();
				},
				ArrowUp: ({ editor: e }) => {
					if (!this.options.exitOnArrowUp) return !1;
					let { state: t } = e, { selection: n } = t, { $from: r, empty: i } = n;
					if (!i || r.parent.type !== this.type || r.parentOffset !== 0) return !1;
					let a = r.before();
					return a > 0 ? !1 : e.commands.insertDefaultBlock({ pos: a });
				},
				ArrowDown: ({ editor: e }) => {
					if (!this.options.exitOnArrowDown) return !1;
					let { state: t } = e, { selection: n, doc: r } = t, { $from: i, empty: a } = n;
					if (!a || i.parent.type !== this.type || i.parentOffset !== i.parent.nodeSize - 2) return !1;
					let o = i.after();
					return o === void 0 ? !1 : r.nodeAt(o) ? e.commands.command(({ tr: e }) => (e.setSelection(T.near(r.resolve(o))), !0)) : e.commands.exitCode();
				}
			};
		},
		addInputRules() {
			return [Id({
				find: gm,
				type: this.type,
				getAttributes: (e) => ({ language: e[1] })
			}), Id({
				find: _m,
				type: this.type,
				getAttributes: (e) => ({ language: e[1] })
			})];
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("codeBlockVSCodeHandler"),
				props: { handlePaste: (e, t) => {
					if (!t.clipboardData || this.editor.isActive(this.type.name)) return !1;
					let n = t.clipboardData.getData("text/plain"), r = t.clipboardData.getData("vscode-editor-data"), i = (r ? JSON.parse(r) : void 0)?.mode;
					if (!n || !i) return !1;
					let { tr: a, schema: o } = e.state, s = o.text(n.replace(/\r\n?/g, "\n"));
					return a.replaceSelectionWith(this.type.create({ language: i }, s)), a.selection.$from.parent.type !== this.type && a.setSelection(E.near(a.doc.resolve(Math.max(0, a.selection.from - 2)))), a.setMeta("paste", !0), e.dispatch(a), !0;
				} }
			})];
		}
	});
})), bm, xm = e((() => {
	I(), bm = Wp.create({
		name: "doc",
		topNode: !0,
		content: "block+",
		renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n\n") : ""
	});
})), Sm, Cm = e((() => {
	I(), Sm = Wp.create({
		name: "hardBreak",
		markdownTokenName: "br",
		addOptions() {
			return {
				keepMarks: !0,
				HTMLAttributes: {}
			};
		},
		inline: !0,
		group: "inline",
		selectable: !1,
		linebreakReplacement: !0,
		parseHTML() {
			return [{ tag: "br" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return ["br", P(this.options.HTMLAttributes, e)];
		},
		renderText() {
			return "\n";
		},
		renderMarkdown: () => "  \n",
		parseMarkdown: () => ({ type: "hardBreak" }),
		addCommands() {
			return { setHardBreak: () => ({ commands: e, chain: t, state: n, editor: r }) => e.first([() => e.exitCode(), () => e.command(() => {
				let { selection: e, storedMarks: i } = n;
				if (e.$from.parent.type.spec.isolating) return !1;
				let { keepMarks: a } = this.options, { splittableMarks: o } = r.extensionManager, s = i || e.$to.parentOffset && e.$from.marks();
				return t().insertContent({ type: this.name }).command(({ tr: e, dispatch: t }) => {
					if (t && s && a) {
						let t = s.filter((e) => o.includes(e.type.name));
						e.ensureMarks(t);
					}
					return !0;
				}).scrollIntoView().run();
			})]) };
		},
		addKeyboardShortcuts() {
			return {
				"Mod-Enter": () => this.editor.commands.setHardBreak(),
				"Shift-Enter": () => this.editor.commands.setHardBreak()
			};
		}
	});
})), wm, Tm = e((() => {
	I(), wm = Wp.create({
		name: "heading",
		addOptions() {
			return {
				levels: [
					1,
					2,
					3,
					4,
					5,
					6
				],
				HTMLAttributes: {}
			};
		},
		content: "inline*",
		group: "block",
		defining: !0,
		addAttributes() {
			return { level: {
				default: 1,
				rendered: !1
			} };
		},
		parseHTML() {
			return this.options.levels.map((e) => ({
				tag: `h${e}`,
				attrs: { level: e }
			}));
		},
		renderHTML({ node: e, HTMLAttributes: t }) {
			return [
				`h${this.options.levels.includes(e.attrs.level) ? e.attrs.level : this.options.levels[0]}`,
				P(this.options.HTMLAttributes, t),
				0
			];
		},
		parseMarkdown(e, t) {
			let n = e.depth || 1;
			return this.options.levels.includes(n) ? t.createNode("heading", { level: n }, t.parseInline(e.tokens || [])) : t.createNode("paragraph", void 0, t.parseInline(e.tokens || []));
		},
		renderMarkdown: (e, t) => {
			let n = e.attrs?.level ? parseInt(e.attrs.level, 10) : 1, r = "#".repeat(n);
			return e.content ? `${r} ${t.renderChildren(e.content)}` : "";
		},
		addCommands() {
			return {
				setHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.setNode(this.name, e) : !1,
				toggleHeading: (e) => ({ commands: t }) => this.options.levels.includes(e.level) ? t.toggleNode(this.name, "paragraph", e) : !1
			};
		},
		addKeyboardShortcuts() {
			return this.options.levels.reduce((e, t) => ({
				...e,
				[`Mod-Alt-${t}`]: () => this.editor.commands.toggleHeading({ level: t })
			}), {});
		},
		addInputRules() {
			return this.options.levels.map((e) => Id({
				find: RegExp(`^(#{${Math.min(...this.options.levels)},${e}})\\s$`),
				type: this.type,
				getAttributes: { level: e }
			}));
		}
	});
})), Em, Dm = e((() => {
	I(), Fr(), Em = Wp.create({
		name: "horizontalRule",
		addOptions() {
			return {
				HTMLAttributes: {},
				nextNodeType: "paragraph"
			};
		},
		group: "block",
		parseHTML() {
			return [{ tag: "hr" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return ["hr", P(this.options.HTMLAttributes, e)];
		},
		markdownTokenName: "hr",
		parseMarkdown: (e, t) => t.createNode("horizontalRule"),
		renderMarkdown: () => "---",
		addCommands() {
			return { setHorizontalRule: () => ({ chain: e, state: t }) => {
				if (!fd(t, t.schema.nodes[this.name])) return !1;
				let { selection: n } = t, { $to: r } = n, i = e();
				return Au(n) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: e, tr: t, dispatch: n }) => {
					if (n) {
						let { $to: n } = t.selection, r = n.end();
						if (n.nodeAfter) n.nodeAfter.isTextblock ? t.setSelection(E.create(t.doc, n.pos + 1)) : n.nodeAfter.isBlock ? t.setSelection(D.create(t.doc, n.pos)) : t.setSelection(E.create(t.doc, n.pos));
						else {
							let i = (e.schema.nodes[this.options.nextNodeType] || n.parent.type.contentMatch.defaultType)?.create();
							i && (t.insert(r, i), t.setSelection(E.create(t.doc, r + 1)));
						}
						t.scrollIntoView();
					}
					return !0;
				}).run();
			} };
		},
		addInputRules() {
			return [Fd({
				find: /^(?:---|—-|___\s|\*\*\*\s)$/,
				type: this.type
			})];
		}
	});
})), Om, km, Am, jm, Mm, Nm = e((() => {
	I(), Om = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, km = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, Am = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, jm = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, Mm = xp.create({
		name: "italic",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		parseHTML() {
			return [
				{ tag: "em" },
				{
					tag: "i",
					getAttrs: (e) => e.style.fontStyle !== "normal" && null
				},
				{
					style: "font-style=normal",
					clearMark: (e) => e.type.name === this.name
				},
				{ style: "font-style=italic" }
			];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"em",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		addCommands() {
			return {
				setItalic: () => ({ commands: e }) => e.setMark(this.name),
				toggleItalic: () => ({ commands: e }) => e.toggleMark(this.name),
				unsetItalic: () => ({ commands: e }) => e.unsetMark(this.name)
			};
		},
		markdownTokenName: "em",
		parseMarkdown: (e, t) => t.applyMark("italic", t.parseInline(e.tokens || [])),
		markdownOptions: { htmlReopen: {
			open: "<em>",
			close: "</em>"
		} },
		renderMarkdown: (e, t) => `*${t.renderChildren(e)}*`,
		addKeyboardShortcuts() {
			return {
				"Mod-i": () => this.editor.commands.toggleItalic(),
				"Mod-I": () => this.editor.commands.toggleItalic()
			};
		},
		addInputRules() {
			return [Pd({
				find: Om,
				type: this.type
			}), Pd({
				find: Am,
				type: this.type
			})];
		},
		addPasteRules() {
			return [Rd({
				find: km,
				type: this.type
			}), Rd({
				find: jm,
				type: this.type
			})];
		}
	});
}));
// node_modules/linkifyjs/dist/linkify.mjs
function Pm(e, t) {
	return e in t || (t[e] = []), t[e];
}
function Fm(e, t, n) {
	t[rh] && (t[oh] = !0, t[sh] = !0), t[ih] && (t[oh] = !0, t[ah] = !0), t[oh] && (t[sh] = !0), t[ah] && (t[sh] = !0), t[sh] && (t[ch] = !0), t[lh] && (t[ch] = !0);
	for (let r in t) {
		let t = Pm(r, n);
		t.indexOf(e) < 0 && t.push(e);
	}
}
function Im(e, t) {
	let n = {};
	for (let r in t) t[r].indexOf(e) >= 0 && (n[r] = !0);
	return n;
}
function Lm(e = null) {
	this.j = {}, this.jr = [], this.jd = null, this.t = e;
}
function Rm(e = []) {
	let t = {};
	Lm.groups = t;
	let n = new Lm();
	Eg ??= Hm(th), Dg ??= Hm(nh), z(n, "'", Uh), z(n, "{", Eh), z(n, "}", Dh), z(n, "[", Oh), z(n, "]", kh), z(n, "(", Ah), z(n, ")", jh), z(n, "<", Mh), z(n, ">", Nh), z(n, "（", Ph), z(n, "）", Fh), z(n, "「", Ih), z(n, "」", Lh), z(n, "『", Rh), z(n, "』", zh), z(n, "＜", Bh), z(n, "＞", Vh), z(n, "&", Hh), z(n, "*", Wh), z(n, "@", Gh), z(n, "`", qh), z(n, "^", Jh), z(n, ":", Yh), z(n, ",", Xh), z(n, "$", Zh), z(n, ".", Qh), z(n, "=", $h), z(n, "!", eg), z(n, "-", tg), z(n, "%", ng), z(n, "|", rg), z(n, "+", ig), z(n, "#", ag), z(n, "?", og), z(n, "\"", sg), z(n, "/", ug), z(n, ";", lg), z(n, "~", dg), z(n, "_", fg), z(n, "\\", Kh), z(n, "・", cg);
	let r = R(n, yg, Ch, { [rh]: !0 });
	R(r, yg, r);
	let i = R(r, gg, gh, { [oh]: !0 }), a = R(r, _g, _h, { [sh]: !0 }), o = R(n, gg, mh, { [ih]: !0 });
	R(o, yg, i), R(o, gg, o), R(i, yg, i), R(i, gg, i);
	let s = R(n, _g, hh, { [ah]: !0 });
	R(s, gg), R(s, yg, a), R(s, _g, s), R(a, yg, a), R(a, gg), R(a, _g, a);
	let c = z(n, Sg, Th, { [fh]: !0 }), l = z(n, xg, wh, { [fh]: !0 }), u = R(n, bg, wh, { [fh]: !0 });
	z(n, Tg, u), z(l, Sg, c), z(l, Tg, u), R(l, bg, u), z(u, xg), z(u, Sg), R(u, bg, u), z(u, Tg, u);
	let d = R(n, vg, pg, { [lh]: !0 });
	z(d, "#"), R(d, vg, d), z(d, Cg, d);
	let f = z(d, wg);
	z(f, "#"), R(f, vg, d);
	let p = [[gg, o], [yg, i]], m = [
		[gg, null],
		[_g, s],
		[yg, a]
	];
	for (let e = 0; e < Eg.length; e++) Vm(n, Eg[e], yh, mh, p);
	for (let e = 0; e < Dg.length; e++) Vm(n, Dg[e], bh, hh, m);
	Fm(yh, {
		tld: !0,
		ascii: !0
	}, t), Fm(bh, {
		utld: !0,
		alpha: !0
	}, t), Vm(n, "file", xh, mh, p), Vm(n, "mailto", xh, mh, p), Vm(n, "http", Sh, mh, p), Vm(n, "https", Sh, mh, p), Vm(n, "ftp", Sh, mh, p), Vm(n, "ftps", Sh, mh, p), Fm(xh, {
		scheme: !0,
		ascii: !0
	}, t), Fm(Sh, {
		slashscheme: !0,
		ascii: !0
	}, t), e = e.sort((e, t) => e[0] > t[0] ? 1 : -1);
	for (let t = 0; t < e.length; t++) {
		let r = e[t][0], i = e[t][1] ? { [uh]: !0 } : { [dh]: !0 };
		r.indexOf("-") >= 0 ? i[ch] = !0 : gg.test(r) ? yg.test(r) ? i[oh] = !0 : i[ih] = !0 : i[rh] = !0, ph(n, r, r, i);
	}
	return ph(n, "localhost", vh, { ascii: !0 }), n.jd = new Lm(mg), {
		start: n,
		tokens: Object.assign({ groups: t }, hg)
	};
}
function zm(e, t) {
	let n = Bm(t.replace(/[A-Z]/g, (e) => e.toLowerCase())), r = n.length, i = [], a = 0, o = 0;
	for (; o < r;) {
		let s = e, c = null, l = 0, u = null, d = -1, f = -1;
		for (; o < r && (c = s.go(n[o]));) s = c, s.accepts() ? (d = 0, f = 0, u = s) : d >= 0 && (d += n[o].length, f++), l += n[o].length, a += n[o].length, o++;
		a -= d, o -= f, l -= d, i.push({
			t: u.t,
			v: t.slice(a - l, a),
			s: a - l,
			e: a
		});
	}
	return i;
}
function Bm(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		let i = e.charCodeAt(r), a, o = i < 55296 || i > 56319 || r + 1 === n || (a = e.charCodeAt(r + 1)) < 56320 || a > 57343 ? e[r] : e.slice(r, r + 2);
		t.push(o), r += o.length;
	}
	return t;
}
function Vm(e, t, n, r, i) {
	let a, o = t.length;
	for (let n = 0; n < o - 1; n++) {
		let o = t[n];
		e.j[o] ? a = e.j[o] : (a = new Lm(r), a.jr = i.slice(), e.j[o] = a), e = a;
	}
	return a = new Lm(n), a.jr = i.slice(), e.j[t[o - 1]] = a, a;
}
function Hm(e) {
	let t = [], n = [], r = 0;
	for (; r < e.length;) {
		let i = 0;
		for (; "0123456789".indexOf(e[r + i]) >= 0;) i++;
		if (i > 0) {
			t.push(n.join(""));
			for (let t = parseInt(e.substring(r, r + i), 10); t > 0; t--) n.pop();
			r += i;
		} else n.push(e[r]), r++;
	}
	return t;
}
function Um(e, t = null) {
	let n = Object.assign({}, Og);
	e && (n = Object.assign(n, e instanceof Um ? e.o : e));
	let r = n.ignoreTags, i = [];
	for (let e = 0; e < r.length; e++) i.push(r[e].toUpperCase());
	this.o = n, t && (this.defaultRender = t), this.ignoreTags = i, this.ignoreClasses = n.ignoreClasses.slice();
}
function Wm(e) {
	return e;
}
function Gm(e, t) {
	this.t = "token", this.v = e, this.tk = t;
}
function Km(e, t) {
	class n extends Gm {
		constructor(t, n) {
			super(t, n), this.t = e;
		}
	}
	for (let e in t) n.prototype[e] = t[e];
	return n.t = e, n;
}
function qm({ groups: e }) {
	let t = e.domain.concat([
		Hh,
		Wh,
		Gh,
		Kh,
		qh,
		Jh,
		Zh,
		$h,
		tg,
		Ch,
		ng,
		rg,
		ig,
		ag,
		ug,
		mg,
		dg,
		fg
	]), n = [
		Uh,
		Yh,
		Xh,
		Qh,
		eg,
		ng,
		og,
		sg,
		lg,
		Mh,
		Nh,
		Eh,
		Dh,
		kh,
		Oh,
		Ah,
		jh,
		Ph,
		Fh,
		Ih,
		Lh,
		Rh,
		zh,
		Bh,
		Vh
	], r = [
		Hh,
		Uh,
		Wh,
		Kh,
		qh,
		Jh,
		Zh,
		$h,
		tg,
		Eh,
		Dh,
		ng,
		rg,
		ig,
		ag,
		og,
		ug,
		mg,
		dg,
		fg
	], i = Ng(), a = z(i, dg);
	L(a, r, a), L(a, e.domain, a);
	let o = Ng(), s = Ng(), c = Ng();
	L(i, e.domain, o), L(i, e.scheme, s), L(i, e.slashscheme, c), L(o, r, a), L(o, e.domain, o);
	let l = z(o, Gh);
	z(a, Gh, l), z(s, Gh, l), z(c, Gh, l);
	let u = z(a, Qh);
	L(u, r, a), L(u, e.domain, a);
	let d = Ng();
	L(l, e.domain, d), L(d, e.domain, d);
	let f = z(d, Qh);
	L(f, e.domain, d);
	let p = Ng(kg);
	L(f, e.tld, p), L(f, e.utld, p), z(l, vh, p);
	let m = z(d, tg);
	z(m, tg, m), L(m, e.domain, d), L(p, e.domain, d), z(p, Qh, f), z(p, tg, m);
	let h = z(o, tg), g = z(o, Qh);
	z(h, tg, h), L(h, e.domain, o), L(g, r, a), L(g, e.domain, o);
	let _ = Ng(Mg);
	L(g, e.tld, _), L(g, e.utld, _), L(_, e.domain, o), L(_, r, a), z(_, Qh, g), z(_, tg, h), z(_, Gh, l);
	let ee = z(_, Yh), v = Ng(Mg);
	L(ee, e.numeric, v);
	let y = Ng(Mg), b = Ng();
	L(y, t, y), L(y, n, b), L(b, t, y), L(b, n, b), z(_, ug, y), z(v, ug, y), z(_, og, b), z(_, ag, y), z(v, og, b), z(v, ag, y);
	let te = z(s, Yh), ne = z(c, Yh), re = z(ne, ug), ie = z(re, ug);
	L(s, e.domain, o), z(s, Qh, g), z(s, tg, h), L(c, e.domain, o), z(c, Qh, g), z(c, tg, h), L(te, e.domain, y), z(te, ug, y), z(te, og, y), L(ie, e.domain, y), L(ie, t, y), z(ie, ug, y);
	let ae = [
		[Eh, Dh],
		[Oh, kh],
		[Ah, jh],
		[Mh, Nh],
		[Ph, Fh],
		[Ih, Lh],
		[Rh, zh],
		[Bh, Vh]
	];
	for (let e = 0; e < ae.length; e++) {
		let [r, i] = ae[e], a = z(y, r);
		z(b, r, a);
		let o = Ng(Mg);
		L(a, t, o);
		let s = Ng();
		L(a, n, s), z(a, i, y), L(o, t, o), L(o, n, s), L(s, t, o), L(s, n, s), z(o, i, y), z(s, i, y);
	}
	return z(i, vh, _), z(i, Th, jg), {
		start: i,
		tokens: hg
	};
}
function Jm(e, t, n) {
	let r = n.length, i = 0, a = [], o = [], s = [];
	for (; i < r;) {
		let c = e, l = null, u = null, d = 0, f = null, p = -1, m = [];
		for (; i < r && !(l = c.go(n[i].t));) o.push(n[i++]);
		for (; i < r && (u = l || c.go(n[i].t));) if (l = null, c = u, i++, d++, c.accepts()) p = 0, f = c, m = [];
		else if (p >= 0 && p++, m.push(c), s[i] && s[i].has(c)) break;
		for (let e = 0, t = i - m.length + 1; e < m.length; e++, t++) (s[t] || (s[t] = /* @__PURE__ */ new Set())).add(m[e]);
		if (p < 0) i -= d, i < r && (o.push(n[i]), i++);
		else {
			o.length > 0 && (a.push(Ym(Ag, t, o)), o = []), i -= p, d -= p;
			let e = f.t, r = n.slice(i - d, i);
			a.push(Ym(e, t, r));
		}
	}
	return o.length > 0 && a.push(Ym(Ag, t, o)), a;
}
function Ym(e, t, n) {
	let r = n[0].s, i = n[n.length - 1].e;
	return new e(t.slice(r, i), n);
}
function Xm() {
	return Lm.groups = {}, B.scanner = null, B.parser = null, B.tokenQueue = [], B.pluginQueue = [], B.customSchemes = [], B.initialized = !1, B;
}
function Zm(e, t = !1) {
	if (B.initialized && Pg(`linkifyjs: already initialized - will not register custom scheme "${e}" ${Fg}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(e)) throw Error("linkifyjs: incorrect scheme format.\n1. Must only contain digits, lowercase ASCII letters or \"-\"\n2. Cannot start or end with \"-\"\n3. \"-\" cannot repeat");
	B.customSchemes.push([e, t]);
}
function Qm() {
	B.scanner = Rm(B.customSchemes);
	for (let e = 0; e < B.tokenQueue.length; e++) B.tokenQueue[e][1]({ scanner: B.scanner });
	B.parser = qm(B.scanner.tokens);
	for (let e = 0; e < B.pluginQueue.length; e++) B.pluginQueue[e][1]({
		scanner: B.scanner,
		parser: B.parser
	});
	return B.initialized = !0, B;
}
function $m(e) {
	return B.initialized || Qm(), Jm(B.parser.start, e, zm(B.scanner.start, e));
}
function eh(e, t = null, n = null) {
	if (t && typeof t == "object") {
		if (n) throw Error(`linkifyjs: Invalid link type ${t}; must be a string`);
		n = t, t = null;
	}
	let r = new Um(n), i = $m(e), a = [];
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		n.isLink && (!t || n.t === t) && r.check(n) && a.push(n.toFormattedObject(r));
	}
	return a;
}
var th, nh, rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, L, R, ph, z, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh, Oh, kh, Ah, jh, Mh, Nh, Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh, Gh, Kh, qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg, cg, lg, ug, dg, fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg, B, Ig = e((() => {
	th = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos6kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12b0cam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", nh = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", rh = "numeric", ih = "ascii", ah = "alpha", oh = "asciinumeric", sh = "alphanumeric", ch = "domain", lh = "emoji", uh = "scheme", dh = "slashscheme", fh = "whitespace", Lm.groups = {}, Lm.prototype = {
		accepts() {
			return !!this.t;
		},
		go(e) {
			let t = this, n = t.j[e];
			if (n) return n;
			for (let n = 0; n < t.jr.length; n++) {
				let r = t.jr[n][0], i = t.jr[n][1];
				if (i && r.test(e)) return i;
			}
			return t.jd;
		},
		has(e, t = !1) {
			return t ? e in this.j : !!this.go(e);
		},
		ta(e, t, n, r) {
			for (let i = 0; i < e.length; i++) this.tt(e[i], t, n, r);
		},
		tr(e, t, n, r) {
			r ||= Lm.groups;
			let i;
			return t && t.j ? i = t : (i = new Lm(t), n && r && Fm(t, n, r)), this.jr.push([e, i]), i;
		},
		ts(e, t, n, r) {
			let i = this, a = e.length;
			if (!a) return i;
			for (let t = 0; t < a - 1; t++) i = i.tt(e[t]);
			return i.tt(e[a - 1], t, n, r);
		},
		tt(e, t, n, r) {
			r ||= Lm.groups;
			let i = this;
			if (t && t.j) return i.j[e] = t, t;
			let a = t, o, s = i.go(e);
			return s ? (o = new Lm(), Object.assign(o.j, s.j), o.jr.push.apply(o.jr, s.jr), o.jd = s.jd, o.t = s.t) : o = new Lm(), a && (r && (o.t && typeof o.t == "string" ? Fm(a, Object.assign(Im(o.t, r), n), r) : n && Fm(a, n, r)), o.t = a), i.j[e] = o, o;
		}
	}, L = (e, t, n, r, i) => e.ta(t, n, r, i), R = (e, t, n, r, i) => e.tr(t, n, r, i), ph = (e, t, n, r, i) => e.ts(t, n, r, i), z = (e, t, n, r, i) => e.tt(t, n, r, i), mh = "WORD", hh = "UWORD", gh = "ASCIINUMERICAL", _h = "ALPHANUMERICAL", vh = "LOCALHOST", yh = "TLD", bh = "UTLD", xh = "SCHEME", Sh = "SLASH_SCHEME", Ch = "NUM", wh = "WS", Th = "NL", Eh = "OPENBRACE", Dh = "CLOSEBRACE", Oh = "OPENBRACKET", kh = "CLOSEBRACKET", Ah = "OPENPAREN", jh = "CLOSEPAREN", Mh = "OPENANGLEBRACKET", Nh = "CLOSEANGLEBRACKET", Ph = "FULLWIDTHLEFTPAREN", Fh = "FULLWIDTHRIGHTPAREN", Ih = "LEFTCORNERBRACKET", Lh = "RIGHTCORNERBRACKET", Rh = "LEFTWHITECORNERBRACKET", zh = "RIGHTWHITECORNERBRACKET", Bh = "FULLWIDTHLESSTHAN", Vh = "FULLWIDTHGREATERTHAN", Hh = "AMPERSAND", Uh = "APOSTROPHE", Wh = "ASTERISK", Gh = "AT", Kh = "BACKSLASH", qh = "BACKTICK", Jh = "CARET", Yh = "COLON", Xh = "COMMA", Zh = "DOLLAR", Qh = "DOT", $h = "EQUALS", eg = "EXCLAMATION", tg = "HYPHEN", ng = "PERCENT", rg = "PIPE", ig = "PLUS", ag = "POUND", og = "QUERY", sg = "QUOTE", cg = "FULLWIDTHMIDDLEDOT", lg = "SEMI", ug = "SLASH", dg = "TILDE", fg = "UNDERSCORE", pg = "EMOJI", mg = "SYM", hg = /*#__PURE__*/ Object.freeze({
		__proto__: null,
		ALPHANUMERICAL: _h,
		AMPERSAND: Hh,
		APOSTROPHE: Uh,
		ASCIINUMERICAL: gh,
		ASTERISK: Wh,
		AT: Gh,
		BACKSLASH: Kh,
		BACKTICK: qh,
		CARET: Jh,
		CLOSEANGLEBRACKET: Nh,
		CLOSEBRACE: Dh,
		CLOSEBRACKET: kh,
		CLOSEPAREN: jh,
		COLON: Yh,
		COMMA: Xh,
		DOLLAR: Zh,
		DOT: Qh,
		EMOJI: pg,
		EQUALS: $h,
		EXCLAMATION: eg,
		FULLWIDTHGREATERTHAN: Vh,
		FULLWIDTHLEFTPAREN: Ph,
		FULLWIDTHLESSTHAN: Bh,
		FULLWIDTHMIDDLEDOT: cg,
		FULLWIDTHRIGHTPAREN: Fh,
		HYPHEN: tg,
		LEFTCORNERBRACKET: Ih,
		LEFTWHITECORNERBRACKET: Rh,
		LOCALHOST: vh,
		NL: Th,
		NUM: Ch,
		OPENANGLEBRACKET: Mh,
		OPENBRACE: Eh,
		OPENBRACKET: Oh,
		OPENPAREN: Ah,
		PERCENT: ng,
		PIPE: rg,
		PLUS: ig,
		POUND: ag,
		QUERY: og,
		QUOTE: sg,
		RIGHTCORNERBRACKET: Lh,
		RIGHTWHITECORNERBRACKET: zh,
		SCHEME: xh,
		SEMI: lg,
		SLASH: ug,
		SLASH_SCHEME: Sh,
		SYM: mg,
		TILDE: dg,
		TLD: yh,
		UNDERSCORE: fg,
		UTLD: bh,
		UWORD: hh,
		WORD: mh,
		WS: wh
	}), gg = /[a-z]/, _g = /[a-z]/i, vg = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]|\u{FE0F}/u;
	try {
		_g = /* @__PURE__ */ RegExp("\\p{L}", "u"), vg = /* @__PURE__ */ RegExp("\\p{Emoji}", "u");
	} catch {}
	yg = /\d/, bg = /\s/, xg = "\r", Sg = "\n", Cg = "️", wg = "‍", Tg = "￼", Eg = null, Dg = null, Og = {
		defaultProtocol: "http",
		events: null,
		format: Wm,
		formatHref: Wm,
		nl2br: !1,
		tagName: "a",
		target: null,
		rel: null,
		validate: !0,
		truncate: Infinity,
		className: null,
		attributes: null,
		ignoreTags: [],
		ignoreClasses: [],
		render: null
	}, Um.prototype = {
		o: Og,
		ignoreTags: [],
		ignoreClasses: [],
		isIgnoredClass(e) {
			if (typeof e != "string" || this.ignoreClasses.length === 0) return !1;
			let t = e.split(/\s+/);
			for (let e = 0; e < t.length; e++) if (this.ignoreClasses.indexOf(t[e]) >= 0) return !0;
			return !1;
		},
		defaultRender(e) {
			return e;
		},
		check(e) {
			return this.get("validate", e.toString(), e);
		},
		get(e, t, n) {
			let r = t != null, i = this.o[e];
			return i && (typeof i == "object" ? (i = n.t in i ? i[n.t] : Og[e], typeof i == "function" && r && (i = i(t, n))) : typeof i == "function" && r && (i = i(t, n.t, n)), i);
		},
		getObj(e, t, n) {
			let r = this.o[e];
			return typeof r == "function" && t != null && (r = r(t, n.t, n)), r;
		},
		render(e) {
			let t = e.render(this);
			return (this.get("render", null, e) || this.defaultRender)(t, e.t, e);
		}
	}, Gm.prototype = {
		isLink: !1,
		toString() {
			return this.v;
		},
		toHref(e) {
			return this.toString();
		},
		toFormattedString(e) {
			let t = this.toString(), n = e.get("truncate", t, this), r = e.get("format", t, this);
			return n && r.length > n ? r.substring(0, n) + "…" : r;
		},
		toFormattedHref(e) {
			return e.get("formatHref", this.toHref(e.get("defaultProtocol")), this);
		},
		startIndex() {
			return this.tk[0].s;
		},
		endIndex() {
			return this.tk[this.tk.length - 1].e;
		},
		toObject(e = Og.defaultProtocol) {
			return {
				type: this.t,
				value: this.toString(),
				isLink: this.isLink,
				href: this.toHref(e),
				start: this.startIndex(),
				end: this.endIndex()
			};
		},
		toFormattedObject(e) {
			return {
				type: this.t,
				value: this.toFormattedString(e),
				isLink: this.isLink,
				href: this.toFormattedHref(e),
				start: this.startIndex(),
				end: this.endIndex()
			};
		},
		validate(e) {
			return e.get("validate", this.toString(), this);
		},
		render(e) {
			let t = this, n = this.toHref(e.get("defaultProtocol")), r = e.get("formatHref", n, this), i = e.get("tagName", n, t), a = this.toFormattedString(e), o = {}, s = e.get("className", n, t), c = e.get("target", n, t), l = e.get("rel", n, t), u = e.getObj("attributes", n, t), d = e.getObj("events", n, t);
			return o.href = r, s && (o.class = s), c && (o.target = c), l && (o.rel = l), u && Object.assign(o, u), {
				tagName: i,
				attributes: o,
				content: a,
				eventListeners: d
			};
		}
	}, kg = Km("email", {
		isLink: !0,
		toHref() {
			return "mailto:" + this.toString();
		}
	}), Ag = Km("text"), jg = Km("nl"), Mg = Km("url", {
		isLink: !0,
		toHref(e = Og.defaultProtocol) {
			return this.hasProtocol() ? this.v : `${e}://${this.v}`;
		},
		hasProtocol() {
			let e = this.tk;
			return e.length >= 2 && e[0].t !== vh && e[1].t === Yh;
		}
	}), Ng = (e) => new Lm(e), Pg = typeof console < "u" && console && console.warn || (() => {}), Fg = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", B = {
		scanner: null,
		parser: null,
		tokenQueue: [],
		pluginQueue: [],
		customSchemes: [],
		initialized: !1
	}, $m.scan = zm;
}));
// node_modules/@tiptap/extension-link/dist/index.js
function Lg(e, t, n) {
	let r = e.doc.resolve(t.to);
	if (!r.nodeBefore?.isText) return;
	let i = e.doc.textBetween(t.from, t.to, "￼", "￼").match(e_)?.[0];
	if (!i) return;
	let a = t.to - i.length, o = Su(a, t.to, e.doc).filter((e) => e.mark.type === n);
	if (!o.length) return;
	let { nodeAfter: s } = r;
	if (s && o.some((e) => e.mark.isInSet(s.marks))) return;
	let c = e.storedMarks;
	e.removeMark(a, t.to, n), e.setStoredMarks(c), e.selection.empty && e.selection.from === t.to && e.removeStoredMark(n);
}
function Rg(e) {
	return e.length === 1 ? e[0].isLink : e.length === 3 && e[1].isLink ? ["()", "[]"].includes(e[0].value + e[2].value) : !1;
}
function zg(e) {
	return new O({
		key: new k("autolink"),
		appendTransaction: (t, n, r) => {
			let i = t.some((e) => e.docChanged) && !n.doc.eq(r.doc), a = t.some((e) => e.getMeta("preventAutolink"));
			if (!i || a) return;
			let { tr: o } = r, s = Vl(n.doc, [...t]);
			if (!t.some(el)) {
				let t = [];
				s.steps.forEach((e, n) => {
					if (!(e instanceof vn) || !e.slice.size) return;
					let r = s.mapping.slice(n + 1), i = r.map(e.from, 1), a = r.map(e.from + e.slice.size, -1);
					i < a && t.push({
						from: i,
						to: a
					});
				}), t.sort((e, t) => t.to - e.to), t.forEach((t) => Lg(o, t, e.type));
			}
			if (xu(s).forEach(({ newRange: t }) => {
				let n = Hl(r.doc, t, (e) => e.isTextblock), i, a;
				if (n.length > 1) i = n[0], a = r.doc.textBetween(i.pos, i.pos + i.node.nodeSize, void 0, " ");
				else if (n.length) {
					let e = r.doc.textBetween(t.from, t.to, " ", " ");
					if (!$g.test(e)) return;
					i = n[0], a = r.doc.textBetween(i.pos, t.to, void 0, " ");
				}
				if (i && a) {
					let t = a.split(Qg).filter(Boolean);
					if (t.length <= 0) return !1;
					let n = t[t.length - 1], s = i.pos + a.lastIndexOf(n);
					if (!n) return !1;
					let c = $m(n).map((t) => t.toObject(e.defaultProtocol));
					if (!Rg(c)) return !1;
					c.filter((e) => e.isLink).map((e) => ({
						...e,
						from: s + e.start + 1,
						to: s + e.end + 1
					})).filter((e) => !r.schema.marks.code || !r.doc.rangeHasMark(e.from, e.to, r.schema.marks.code)).filter((t) => e.validate(t.value)).filter((t) => e.shouldAutoLink(t.value)).forEach((t) => {
						Su(t.from, t.to, r.doc).some((t) => t.mark.type === e.type) || o.addMark(t.from, t.to, e.type.create({ href: t.href }));
					});
				}
			}), o.steps.length) return o;
		}
	});
}
function Bg(e) {
	return new O({
		key: new k("handleClickLink"),
		props: { handleClick: (t, n, r) => {
			if (r.button !== 0 || !t.editable) return !1;
			let i = null;
			if (r.target instanceof HTMLAnchorElement) i = r.target;
			else {
				let t = r.target;
				if (!t) return !1;
				let n = e.editor.view.dom;
				i = t.closest("a"), i && !n.contains(i) && (i = null);
			}
			if (!i) return !1;
			let a = !1;
			if (e.enableClickSelection && (a = e.editor.commands.extendMarkRange(e.type.name)), e.openOnClick) {
				let n = vu(t.state, e.type.name), r = i.href ?? n.href, o = i.target ?? n.target;
				r && (window.open(r, o), a = !0);
			}
			return a;
		} }
	});
}
function Vg(e, t) {
	let n = 0;
	for (let r = t - 1; r >= 0 && e[r] === "\\"; --r) n += 1;
	return n % 2 == 1;
}
function Hg(e, t) {
	let n = 0, r = 0;
	for (; r < t;) {
		if (e[r] !== "`" || n === 0 && Vg(e, r)) {
			r += 1;
			continue;
		}
		let i = 0;
		for (; r < t && e[r] === "`";) i += 1, r += 1;
		n === 0 ? n = i : i === n && (n = 0);
	}
	return n > 0;
}
function Ug(e, t, n) {
	let [, r, i] = t;
	return (t.index ? e[t.index - 1] : void 0) === "!" || Vg(e, t.index ?? 0) || Hg(e, t.index ?? 0) ? !1 : !!r.trim() && n(i);
}
function Wg(e) {
	let [t, n, r, , i, a, o] = e, s = i ?? a ?? o;
	return {
		index: e.index ?? 0,
		text: t,
		replaceWith: n,
		data: {
			href: r,
			title: s || null,
			markdown: !0
		}
	};
}
function Gg(e, t) {
	return e.index < t.index + t.text.length && t.index < e.index + e.text.length;
}
function Kg(e) {
	return {
		href: e.data?.href,
		title: e.data?.title ?? null
	};
}
function qg(e) {
	let t = Pd({
		find: (t) => {
			let n = n_.exec(t);
			return !n || !Ug(t, n, e.isAllowedHref) ? null : Wg(n);
		},
		type: e.type,
		getAttributes: Kg
	});
	return new vp({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Jg(e) {
	let t = Rd({
		find: (t) => {
			let n = [];
			for (let r of t.matchAll(r_)) Ug(t, r, e.isAllowedHref) && n.push(Wg(r));
			let r = (e.findPlainUrls?.call(e, t) ?? []).filter((e) => !n.some((t) => Gg(t, e)));
			return [...n, ...r];
		},
		type: e.type,
		getAttributes: Kg
	});
	return new Sp({
		find: t.find,
		handler: (e) => {
			let n = t.handler(e);
			return n !== null && e.state.tr.steps.length && e.match.data?.markdown && e.state.tr.setMeta("preventAutolink", !0), n;
		}
	});
}
function Yg(e) {
	return new O({
		key: new k("handlePasteLink"),
		props: { handlePaste: (t, n, r) => {
			let { shouldAutoLink: i } = e, { state: a } = t, { selection: o } = a, { empty: s } = o;
			if (s) return !1;
			let c = "";
			r.content.forEach((e) => {
				c += e.textContent;
			});
			let l = eh(c, { defaultProtocol: e.defaultProtocol }).find((e) => e.isLink && e.value === c);
			return !c || !l || i !== void 0 && !i(l.value) ? !1 : e.editor.commands.setMark(e.type, { href: l.href });
		} }
	});
}
function Xg(e, t) {
	let n = [
		"http",
		"https",
		"ftp",
		"ftps",
		"mailto",
		"tel",
		"callto",
		"sms",
		"cid",
		"xmpp"
	];
	return t && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.scheme;
		t && n.push(t);
	}), !e || e.replace(t_, "").match(RegExp(`^(?:(?:${n.map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
var Zg, Qg, $g, e_, t_, n_, r_, i_, a_ = e((() => {
	I(), Ig(), pl(), Fr(), En(), Zg = "[\0- \xA0 ᠎ -\u2029 　]", Qg = new RegExp(Zg), $g = RegExp(`${Zg}$`), e_ = RegExp(`${Zg}+$`), t_ = new RegExp(Zg, "g"), n_ = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, r_ = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g, i_ = xp.create({
		name: "link",
		priority: 1e3,
		keepOnSplit: !1,
		exitable: !0,
		onCreate() {
			this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((e) => {
				typeof e == "string" ? Zm(e) : Zm(e.scheme, e.optionalSlashes);
			});
		},
		onDestroy() {
			Xm();
		},
		inclusive() {
			return this.options.autolink;
		},
		addOptions() {
			return {
				openOnClick: !0,
				enableClickSelection: !1,
				linkOnPaste: !0,
				markdownLinks: !1,
				autolink: !0,
				protocols: [],
				defaultProtocol: "http",
				HTMLAttributes: {
					target: "_blank",
					rel: "noopener noreferrer nofollow",
					class: null
				},
				isAllowedUri: (e, t) => !!Xg(e, t.protocols),
				validate: (e) => !!e,
				shouldAutoLink: (e) => {
					let t = /^[a-z][a-z0-9+.-]*:\/\//i.test(e), n = /^[a-z][a-z0-9+.-]*:/i.test(e);
					if (t || n && !e.includes("@")) return !0;
					let r = (e.includes("@") ? e.split("@").pop() : e).split(/[/?#:]/)[0];
					return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(r) || !/\./.test(r));
				}
			};
		},
		addAttributes() {
			return {
				href: {
					default: null,
					parseHTML(e) {
						return e.getAttribute("href");
					}
				},
				target: { default: this.options.HTMLAttributes.target ?? null },
				rel: { default: this.options.HTMLAttributes.rel ?? null },
				class: { default: this.options.HTMLAttributes.class ?? null },
				title: { default: null }
			};
		},
		parseHTML() {
			return [{
				tag: "a[href]",
				getAttrs: (e) => {
					let t = e.getAttribute("href");
					return !t || !this.options.isAllowedUri(t, {
						defaultValidate: (e) => !!Xg(e, this.options.protocols),
						protocols: this.options.protocols,
						defaultProtocol: this.options.defaultProtocol
					}) ? !1 : null;
				}
			}];
		},
		renderHTML({ HTMLAttributes: e }) {
			return this.options.isAllowedUri(e.href, {
				defaultValidate: (e) => !!Xg(e, this.options.protocols),
				protocols: this.options.protocols,
				defaultProtocol: this.options.defaultProtocol
			}) ? [
				"a",
				P(this.options.HTMLAttributes, e),
				0
			] : [
				"a",
				P(this.options.HTMLAttributes, {
					...e,
					href: ""
				}),
				0
			];
		},
		markdownTokenName: "link",
		parseMarkdown: (e, t) => t.applyMark("link", t.parseInline(e.tokens || []), {
			href: e.href,
			title: e.title || null
		}),
		renderMarkdown: (e, t) => {
			let n = e.attrs?.href ?? "", r = e.attrs?.title ?? "", i = t.renderChildren(e);
			return r ? `[${i}](${n} "${r}")` : `[${i}](${n})`;
		},
		addCommands() {
			return {
				setLink: (e) => ({ chain: t }) => {
					let { href: n } = e;
					return this.options.isAllowedUri(n, {
						defaultValidate: (e) => !!Xg(e, this.options.protocols),
						protocols: this.options.protocols,
						defaultProtocol: this.options.defaultProtocol
					}) ? t().setMark(this.name, e).setMeta("preventAutolink", !0).run() : !1;
				},
				toggleLink: (e) => ({ chain: t }) => {
					let { href: n } = e || {};
					return n && !this.options.isAllowedUri(n, {
						defaultValidate: (e) => !!Xg(e, this.options.protocols),
						protocols: this.options.protocols,
						defaultProtocol: this.options.defaultProtocol
					}) ? !1 : t().toggleMark(this.name, e, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
				},
				unsetLink: () => ({ chain: e }) => e().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
			};
		},
		addInputRules() {
			return this.options.markdownLinks ? [qg({
				type: this.type,
				isAllowedHref: (e) => this.options.isAllowedUri(e, {
					defaultValidate: (e) => !!Xg(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				})
			})] : [];
		},
		addPasteRules() {
			let e = (e) => {
				let t = [];
				if (e) {
					let { protocols: n, defaultProtocol: r } = this.options;
					eh(e, { defaultProtocol: r }).filter((e) => e.isLink && this.options.isAllowedUri(e.value, {
						defaultValidate: (e) => !!Xg(e, n),
						protocols: n,
						defaultProtocol: r
					})).forEach((e) => {
						this.options.shouldAutoLink(e.value) && t.push({
							text: e.value,
							data: { href: e.href },
							index: e.start
						});
					});
				}
				return t;
			};
			return this.options.markdownLinks ? [Jg({
				type: this.type,
				isAllowedHref: (e) => this.options.isAllowedUri(e, {
					defaultValidate: (e) => !!Xg(e, this.options.protocols),
					protocols: this.options.protocols,
					defaultProtocol: this.options.defaultProtocol
				}),
				findPlainUrls: e
			})] : [Rd({
				find: e,
				type: this.type,
				getAttributes: (e) => ({ href: e.data?.href })
			})];
		},
		addProseMirrorPlugins() {
			let e = [], { protocols: t, defaultProtocol: n } = this.options;
			return this.options.autolink && e.push(zg({
				type: this.type,
				defaultProtocol: this.options.defaultProtocol,
				validate: (e) => this.options.isAllowedUri(e, {
					defaultValidate: (e) => !!Xg(e, t),
					protocols: t,
					defaultProtocol: n
				}),
				shouldAutoLink: this.options.shouldAutoLink
			})), e.push(Bg({
				type: this.type,
				editor: this.editor,
				openOnClick: this.options.openOnClick === "whenNotEditable" || this.options.openOnClick,
				enableClickSelection: this.options.enableClickSelection
			})), this.options.linkOnPaste && e.push(Yg({
				editor: this.editor,
				defaultProtocol: this.options.defaultProtocol,
				type: this.type,
				shouldAutoLink: this.options.shouldAutoLink
			})), e;
		}
	});
}));
// node_modules/@tiptap/extension-list/dist/index.js
function o_(e) {
	let t = e, n = "";
	for (let [e, r] of H_) for (; t >= e;) n += r, t -= e;
	return n;
}
function s_(e) {
	return o_(e).toUpperCase();
}
function c_(e) {
	let t = e.toLowerCase(), n = 0, r = 0;
	for (; n < t.length;) {
		let e = !1;
		for (let [i, a] of H_) if (t.startsWith(a, n)) {
			r += i, n += a.length, e = !0;
			break;
		}
		if (!e) return 0;
	}
	return r;
}
function l_(e) {
	if (!/^[ivxlcdmIVXLCDM]+$/.test(e)) return !1;
	let t = c_(e);
	return t <= 0 ? !1 : (e === e.toLowerCase() ? o_(t) : s_(t)) === e;
}
function u_(e) {
	let t = e.toLowerCase();
	if (t.length === 1) return t.charCodeAt(0) - 97 + 1;
	if (t.length === 2) {
		let e = t.charCodeAt(0) - 97, n = t.charCodeAt(1) - 97;
		return (e + 1) * 26 + n + 1;
	}
	return 0;
}
function d_(e) {
	if (e <= 26) return U_[e - 1];
	let t = Math.floor((e - 1) / 26) - 1, n = (e - 1) % 26;
	return t < 0 ? U_[n] : U_[t] + U_[n];
}
function f_(e) {
	if (e && !/^\d+$/.test(e)) {
		if (l_(e)) return e === e.toLowerCase() ? "i" : "I";
		if (/^[a-z]{1,2}$/.test(e)) return "a";
		if (/^[A-Z]{1,2}$/.test(e)) return "A";
	}
}
function p_(e) {
	if (/^\d+$/.test(e)) return parseInt(e, 10);
	let t = f_(e);
	if (t === "i" || t === "I") return c_(e);
	if (t === "a" || t === "A") {
		let t = u_(e);
		return t > 0 ? t : 1;
	}
	let n = parseInt(e, 10);
	return Number.isNaN(n) ? 1 : n;
}
function m_(e, t) {
	if (e === "numeric") return String(t);
	switch (e) {
		case "a": return d_(t);
		case "A": return d_(t).toUpperCase();
		case "i": return o_(t);
		case "I": return s_(t);
		default: return String(t);
	}
}
function h_(e) {
	if (e.length === 0) return !1;
	let t = f_(e[0]) ?? "numeric", n = p_(e[0]);
	if (n < 1) return !1;
	for (let r = 0; r < e.length; r++) {
		let i = m_(t, n + r);
		if (e[r] !== i) return !1;
	}
	return !0;
}
function g_(e) {
	return {
		type: f_(e),
		start: p_(e)
	};
}
function __(e) {
	let { type: t, start: n } = g_(e), r = {};
	return t && (r.type = t), n !== 1 && (r.start = n), r;
}
function v_(e, t, n = ". ") {
	let r = t + 1;
	if (!e || e === "1") return `${r}${n}`;
	switch (e) {
		case "a": return `${d_(r)}${n}`;
		case "A": return `${d_(r).toUpperCase()}${n}`;
		case "i": return `${o_(r)}${n}`;
		case "I": return `${s_(r)}${n}`;
		default: return `${r}${n}`;
	}
}
function y_(e) {
	return !e[0] || e[0].type === "paragraph" ? e : [{
		type: "paragraph",
		content: []
	}, ...e];
}
function b_(e) {
	let t = e.content?.[0];
	return t?.type === "paragraph" && !t.content?.length;
}
function x_(e) {
	let t = e.tokens?.[0];
	return !!(e.text && e.tokens?.length === 1 && t?.type === "list" && t.ordered && t.raw === e.text);
}
function S_(e, t) {
	return t.tokenizeInline ? t.parseInline(t.tokenizeInline(e)) : t.parseInline([{
		type: "text",
		raw: e,
		text: e
	}]);
}
function C_(e) {
	return iv.test(e.trimStart());
}
function w_(e) {
	let t = e.trimStart();
	return ov.bulletItem.test(t) || C_(t) || ov.heading.test(t) || ov.thematicBreak.test(t) && !t.startsWith("-") || /^>\s?/.test(t) || ov.codeFence.test(t) || ov.blockMath.test(t);
}
function T_(e) {
	return Object.values(ov).some((t) => t.test(e));
}
function E_(e) {
	let t = [], n = [], r = !1;
	return e.forEach((e) => {
		r ? n.push(e) : e.trim() === "" || t.length > 0 && w_(e) ? (r = !0, n.push(e)) : t.push(e);
	}), {
		paragraphLines: t,
		blockLines: n
	};
}
function D_(e) {
	let t = [], n = 0, r = 0;
	for (; n < e.length;) {
		let i = e[n], a = i.match(iv);
		if (!a) break;
		let [, o, s, c, l] = a, u = o.length, d = parseInt(s, 10), f = isNaN(d) ? f_(s) : void 0, p = isNaN(d) ? p_(s) : d, m = [l], h = n + 1, g = [i], _ = !1;
		for (; h < e.length;) {
			let t = e[h];
			if (t.match(iv)) break;
			if (t.trim() === "") g.push(t), m.push(""), _ = !0, h += 1;
			else if (t.match(av)) {
				let e = t.length - t.trimStart().length, n = u + s.length + 1;
				g.push(t), m.push(t.slice(Math.min(e, n))), h += 1;
			} else {
				if (_ || T_(t)) break;
				g.push(t), m.push(t), h += 1;
			}
		}
		t.push({
			indent: u,
			number: p,
			type: f,
			content: m.join("\n").trim(),
			contentLines: m,
			raw: g.join("\n")
		}), r = h, n = h;
	}
	return [t, r];
}
function O_(e) {
	let t = e.split("\n").filter((e) => e.trim().length > 0);
	if (t.length === 0) return null;
	let n = [];
	for (let e of t) {
		let t = e.trim().match(sv);
		if (!t) return null;
		n.push({
			marker: t[1],
			content: t[3]
		});
	}
	return h_(n.map((e) => e.marker)) ? {
		type: "orderedList",
		attrs: __(n[0].marker),
		content: n.map((e) => ({
			type: "listItem",
			content: [{
				type: "paragraph",
				content: [{
					type: "text",
					text: e.content
				}]
			}]
		}))
	} : null;
}
function k_(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i];
		if (a.indent === t) {
			let { paragraphLines: o, blockLines: s } = E_(a.contentLines), c = o.join("\n").trim(), l = [];
			c && l.push({
				type: "paragraph",
				raw: c,
				tokens: n.inlineTokens(c)
			});
			let u = s.join("\n").trim();
			if (u) {
				let e = n.blockTokens(u);
				l.push(...e);
			}
			let d = i + 1, f = [];
			for (; d < e.length && e[d].indent > t;) f.push(e[d]), d += 1;
			if (f.length > 0) {
				let e = k_(f, Math.min(...f.map((e) => e.indent)), n);
				l.push({
					type: "list",
					ordered: !0,
					start: f[0].number,
					typeMarker: f[0].type,
					items: e,
					raw: f.map((e) => e.raw).join("\n")
				});
			}
			r.push({
				type: "list_item",
				raw: a.raw,
				tokens: l
			}), i = d;
		} else i += 1;
	}
	return r;
}
function A_(e, t) {
	return e.map((e) => {
		if (e.type !== "list_item") return t.parseChildren([e])[0];
		let n = [];
		return e.tokens && e.tokens.length > 0 && e.tokens.forEach((e) => {
			if (e.type === "paragraph" || e.type === "list" || e.type === "blockquote" || e.type === "code") n.push(...t.parseChildren([e]));
			else if (e.type === "text" && e.tokens) {
				let r = t.parseChildren([e]);
				n.push({
					type: "paragraph",
					content: r
				});
			} else {
				let r = t.parseChildren([e]);
				r.length > 0 && n.push(...r);
			}
		}), {
			type: "listItem",
			content: n
		};
	});
}
function j_(e, t) {
	let n = [], r = 0;
	for (; n.length < t;) {
		let t = e.indexOf("\n", r);
		if (t === -1) return n.push(e.slice(r)), n;
		n.push(e.slice(r, t)), r = t + 1;
	}
	return n;
}
function M_(e) {
	let t = e.indexOf("\n"), n = t === -1 ? e : e.slice(0, t);
	if (!iv.test(n)) return [
		[],
		0,
		[]
	];
	let r = cv, i = j_(e, r), a = D_(i);
	for (; a[1] === i.length && i.length === r;) r *= 2, i = j_(e, r), a = D_(i);
	return [
		a[0],
		a[1],
		i
	];
}
function N_(e) {
	let t = e.match(/list-style-type\s*:\s*([^;]+)/i);
	if (!t) return null;
	switch (t[1].trim().toLowerCase()) {
		case "upper-roman": return "I";
		case "lower-roman": return "i";
		case "upper-alpha":
		case "upper-latin": return "A";
		case "lower-alpha":
		case "lower-latin": return "a";
		default: return null;
	}
}
var P_, F_, I_, L_, R_, z_, B_, V_, H_, U_, W_, G_, K_, q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv, rv, iv, av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv = e((() => {
	I(), Ir(), Pr(), Fr(), P_ = "listItem", F_ = "textStyle", I_ = /^\s*([-+*])\s$/, L_ = Wp.create({
		name: "bulletList",
		addOptions() {
			return {
				itemTypeName: "listItem",
				HTMLAttributes: {},
				keepMarks: !1,
				keepAttributes: !1
			};
		},
		group: "block list",
		content() {
			return `${this.options.itemTypeName}+`;
		},
		parseHTML() {
			return [{ tag: "ul" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"ul",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		markdownTokenName: "list",
		parseMarkdown: (e, t) => e.type !== "list" || e.ordered ? [] : {
			type: "bulletList",
			content: e.items ? t.parseChildren(e.items) : []
		},
		renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
		markdownOptions: { indentsContent: !0 },
		addCommands() {
			return { toggleBulletList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(P_, this.editor.getAttributes(F_)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
		},
		addKeyboardShortcuts() {
			return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
		},
		addInputRules() {
			let e = Ld({
				find: I_,
				type: this.type
			});
			return (this.options.keepMarks || this.options.keepAttributes) && (e = Ld({
				find: I_,
				type: this.type,
				keepMarks: this.options.keepMarks,
				keepAttributes: this.options.keepAttributes,
				getAttributes: () => this.editor.getAttributes(F_),
				editor: this.editor
			})), [e];
		}
	}), R_ = (e, t, n) => {
		let { selection: r } = e;
		if (!r.empty) return null;
		let { $from: i } = r;
		if (!i.parent.isTextblock || i.parentOffset !== i.parent.content.size) return null;
		let a = -1;
		for (let e = i.depth; e > 0; --e) if (i.node(e).type.name === t) {
			a = e;
			break;
		}
		if (a < 0) return null;
		let o = i.node(a), s = i.index(a);
		if (s + 1 >= o.childCount) return null;
		let c = o.child(s + 1);
		if (!n.includes(c.type.name)) return null;
		let l = e.schema.nodes[t], u = !1;
		if (c.forEach((e) => {
			e.type === l && e.childCount > 1 && (u = !0);
		}), !u) return null;
		let d = e.doc.resolve(i.after()).nodeAfter;
		if (!d || !n.includes(d.type.name)) return null;
		let f = [];
		return d.forEach((e) => {
			f.push(e);
		}), f.length === 0 ? null : {
			listItemDepth: a,
			nestedList: d,
			nestedListPos: i.after(),
			insertPos: i.after(a),
			items: f
		};
	}, z_ = (e, t, n, r) => {
		let i = R_(e, n, r);
		if (!i) return !1;
		let { selection: a } = e, { nestedList: o, nestedListPos: s, insertPos: c, items: l } = i, u = e.tr;
		u.delete(s, s + o.nodeSize);
		let d = u.mapping.map(c);
		return u.insert(d, x.from(l)), u.setSelection(a.map(u.doc, u.mapping)), t && t(u), !0;
	}, B_ = (e, t, n) => z_(e.state, e.view.dispatch, t, n), V_ = (e, t) => F.create({
		name: `${e}BranchingDeleteKeymap`,
		priority: 101,
		addKeyboardShortcuts() {
			let n = () => B_(this.editor, e, t);
			return {
				Delete: n,
				"Mod-Delete": n
			};
		}
	}), H_ = [
		[1e3, "m"],
		[900, "cm"],
		[500, "d"],
		[400, "cd"],
		[100, "c"],
		[90, "xc"],
		[50, "l"],
		[40, "xl"],
		[10, "x"],
		[9, "ix"],
		[5, "v"],
		[4, "iv"],
		[1, "i"]
	], U_ = "abcdefghijklmnopqrstuvwxyz", W_ = String.raw`\d+|[ivxlcdmIVXLCDM]+|${"[a-zA-Z]{1,2}"}`, G_ = "&nbsp;", K_ = 1, q_ = (e) => (e?.level ?? K_) > K_, J_ = Wp.create({
		name: "listItem",
		addOptions() {
			return {
				HTMLAttributes: {},
				bulletListTypeName: "bulletList",
				orderedListTypeName: "orderedList"
			};
		},
		content: "paragraph block*",
		defining: !0,
		parseHTML() {
			return [{ tag: "li" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"li",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		markdownTokenName: "list_item",
		parseMarkdown: (e, t) => {
			if (e.type !== "list_item") return [];
			let n = t.parseBlockChildren ?? t.parseChildren, r = [];
			if (e.tokens && e.tokens.length > 0) {
				if (x_(e)) return {
					type: "listItem",
					content: [{
						type: "paragraph",
						content: S_(e.text || "", t)
					}]
				};
				let [i, ...a] = e.tokens;
				if (i.type === "heading") return {
					type: "listItem",
					content: [{
						type: "paragraph",
						content: t.parseInline(i.tokens ?? [])
					}, ...a.length > 0 ? n(a) : []]
				};
				if (e.tokens.some((e) => e.type === "paragraph")) r = n(e.tokens);
				else if (i.type === "text" && i.tokens && i.tokens.length > 0) {
					if (r = [{
						type: "paragraph",
						content: t.parseInline(i.tokens)
					}], e.tokens.length > 1) {
						let t = n(e.tokens.slice(1));
						r.push(...t);
					}
				} else r = n(e.tokens);
			}
			return r.length === 0 && (r = [{
				type: "paragraph",
				content: []
			}]), {
				type: "listItem",
				content: y_(r)
			};
		},
		renderMarkdown: (e, t, n) => {
			let r = (e) => {
				if (e.parentType === "bulletList") return "- ";
				if (e.parentType === "orderedList") {
					var t, n;
					let r = ((t = e.meta) == null || (t = t.parentAttrs) == null ? void 0 : t.start) || 1;
					return v_((n = e.meta) == null || (n = n.parentAttrs) == null ? void 0 : n.type, r - 1 + (e.index || 0), ". ");
				}
				return "- ";
			}, i = Cd(e, t, r, n, { alignNestedToPrefix: n?.parentType === "orderedList" });
			if (!b_(e) || !q_(n)) return i;
			let a = r(n);
			return `${a}${G_}${i.slice(a.length)}`;
		},
		addExtensions() {
			return [V_(this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName])];
		},
		addKeyboardShortcuts() {
			return {
				Enter: () => this.editor.commands.splitListItem(this.name),
				Tab: () => this.editor.commands.sinkListItem(this.name),
				"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
			};
		}
	}), Y_ = (e, t) => {
		let { $from: n } = t.selection, r = hl(e, t.schema), i = null, a = n.depth, o = n.pos, s = null;
		for (; a > 0 && s === null;) i = n.node(a), i.type === r ? s = a : (--a, --o);
		return s === null ? null : {
			$pos: t.doc.resolve(o),
			depth: s
		};
	}, X_ = (e, t) => {
		let n = Y_(e, t);
		if (!n) return !1;
		let [, r] = Ff(t, e, n.$pos.pos + 4);
		return r;
	}, Z_ = (e, t, n) => {
		let { $anchor: r } = e.selection, i = Math.max(0, r.pos - 2), a = e.doc.resolve(i).node();
		return !(!a || !n.includes(a.type.name));
	}, Q_ = (e, t, n) => {
		if (e.commands.undoInputRule()) return !0;
		if (e.state.selection.from !== e.state.selection.to) return !1;
		if (!Il(e.state, t) && Z_(e.state, t, n)) {
			let { $anchor: n } = e.state.selection, r = e.state.doc.resolve(n.before() - 1), i = [];
			r.node().descendants((e, n) => {
				e.type.name === t && i.push({
					node: e,
					pos: n
				});
			});
			let a = i.at(-1);
			if (!a) return !1;
			let o = e.state.doc.resolve(r.start() + a.pos + 1);
			return e.chain().command(({ tr: e }) => {
				let t = o.end();
				return e.delete(n.before(), n.after()).insert(t, n.parent), e.setSelection(E.create(e.doc, t + 1)), !0;
			}).command(({ state: e, dispatch: t }) => (fr(e, t), !0)).run();
		}
		if (!Il(e.state, t) || !zf(e.state)) return !1;
		let { $from: r } = e.state.selection, i = r.depth - 1;
		return r.node(i).type !== e.schema.nodes[t] || r.index(i) !== 0 ? !1 : e.chain().liftListItem(t).run();
	}, $_ = (e, t) => {
		let n = X_(e, t), r = Y_(e, t);
		return !r || !n ? !1 : n > r.depth;
	}, ev = (e, t) => {
		let n = X_(e, t), r = Y_(e, t);
		return !r || !n ? !1 : n < r.depth;
	}, tv = (e, t) => !Il(e.state, t) || !Rf(e.state, t) || !e.state.selection.empty ? !1 : $_(t, e.state) ? e.chain().focus(e.state.selection.from + 4).lift(t).joinBackward().run() : ev(t, e.state) ? e.commands.command(({ state: e, dispatch: t }) => pr(e, t)) : e.commands.joinItemForward(), nv = (e, t, n) => {
		let { state: r } = e, { selection: i } = r;
		if (!i.empty) return !1;
		let { $from: a } = i;
		if (a.parentOffset !== 0 || !a.parent.isTextblock || Il(r, t)) return !1;
		let o = If(a);
		if (!o || !n.includes(o.type.name)) return !1;
		let s = o.lastChild;
		if (!s || s.type.name !== t) return !1;
		let c = a.parent;
		if (!s.canReplace(s.childCount, s.childCount, x.from(c))) return !1;
		let l = a.before(), u = a.after(), d = l - 2;
		return e.commands.command(({ tr: e, dispatch: t }) => (t && (e.delete(l, u).insert(d, x.from(c)), e.setSelection(E.create(e.doc, d + 1)), e.scrollIntoView()), !0));
	}, rv = F.create({
		name: "listKeymap",
		addOptions() {
			return { listTypes: [{
				itemName: "listItem",
				wrapperNames: ["bulletList", "orderedList"]
			}, {
				itemName: "taskItem",
				wrapperNames: ["taskList"]
			}] };
		},
		addKeyboardShortcuts() {
			return {
				Delete: ({ editor: e }) => {
					let t = !1;
					return this.options.listTypes.forEach(({ itemName: n }) => {
						e.state.schema.nodes[n] !== void 0 && tv(e, n) && (t = !0);
					}), t;
				},
				"Mod-Delete": ({ editor: e }) => {
					let t = !1;
					return this.options.listTypes.forEach(({ itemName: n }) => {
						e.state.schema.nodes[n] !== void 0 && tv(e, n) && (t = !0);
					}), t;
				},
				Backspace: ({ editor: e }) => {
					let t = !1;
					return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
						e.state.schema.nodes[n] !== void 0 && Q_(e, n, r) && (t = !0);
					}), t;
				},
				"Mod-Backspace": ({ editor: e }) => {
					let t = !1;
					return this.options.listTypes.forEach(({ itemName: n, wrapperNames: r }) => {
						e.state.schema.nodes[n] !== void 0 && Q_(e, n, r) && (t = !0);
					}), t;
				},
				Tab: ({ editor: e }) => {
					for (let { itemName: t, wrapperNames: n } of this.options.listTypes) if (e.state.schema.nodes[t] !== void 0 && nv(e, t, n)) return !0;
					return !1;
				}
			};
		}
	}), iv = RegExp(`^(\\s*)(${W_})([.)])\\s+(.*)$`), av = /^\s/, ov = {
		heading: /^#{1,6}(?:\s|$)/,
		bulletItem: /^[-+*]\s+/,
		codeFence: /^(?:```|~~~)/,
		blockMath: /^\$\$/,
		thematicBreak: /^(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/
	}, sv = RegExp(`^(${W_})([.)])\\s+(.+)$`), cv = 64, lv = "listItem", uv = "textStyle", dv = /^(\d+)\.\s$/, fv = Wp.create({
		name: "orderedList",
		addOptions() {
			return {
				itemTypeName: "listItem",
				HTMLAttributes: {},
				keepMarks: !1,
				keepAttributes: !1
			};
		},
		group: "block list",
		content() {
			return `${this.options.itemTypeName}+`;
		},
		addAttributes() {
			return {
				start: {
					default: 1,
					parseHTML: (e) => e.hasAttribute("start") ? parseInt(e.getAttribute("start") || "", 10) : 1
				},
				type: {
					default: null,
					parseHTML: (e) => {
						let t = e.getAttribute("type");
						if (t) return t;
						let n = e.getAttribute("style");
						if (n) {
							let e = N_(n);
							if (e) return e;
						}
						let r = e.querySelector("li");
						if (r) {
							let e = r.getAttribute("style");
							if (e) {
								let t = N_(e);
								if (t) return t;
							}
						}
						return null;
					}
				}
			};
		},
		parseHTML() {
			return [{ tag: "ol" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			let { start: t, type: n, ...r } = e, i = P(this.options.HTMLAttributes, r);
			return t !== 1 && (i.start = t), n && n !== "1" && (i.type = n), [
				"ol",
				i,
				0
			];
		},
		markdownTokenName: "list",
		parseMarkdown: (e, t) => {
			if (e.type !== "list" || !e.ordered) return [];
			let n = e.start || 1, r = e.typeMarker, i = e.items ? A_(e.items, t) : [], a = {};
			return n !== 1 && (a.start = n), r && (a.type = r), Object.keys(a).length > 0 ? {
				type: "orderedList",
				attrs: a,
				content: i
			} : {
				type: "orderedList",
				content: i
			};
		},
		renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
		markdownTokenizer: {
			name: "orderedList",
			level: "block",
			start: () => -1,
			tokenize: (e, t, n) => {
				let [r, i, a] = M_(e);
				if (r.length === 0) return;
				let o = k_(r, r[0].indent, n);
				if (o.length !== 0) return {
					type: "list",
					ordered: !0,
					start: r[0]?.number || 1,
					typeMarker: r[0]?.type,
					items: o,
					raw: a.slice(0, i).join("\n")
				};
			}
		},
		markdownOptions: { indentsContent: !0 },
		addCommands() {
			return { toggleOrderedList: () => ({ commands: e, chain: t }) => this.options.keepAttributes ? t().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(lv, this.editor.getAttributes(uv)).run() : e.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
		},
		addKeyboardShortcuts() {
			return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
		},
		addProseMirrorPlugins() {
			return [new O({ props: { handlePaste: (e, t) => {
				if ((t.clipboardData?.getData("text/html"))?.trim()) return !1;
				let n = t.clipboardData?.getData("text/plain");
				if (!n) return !1;
				let r = O_(n);
				if (!r) return !1;
				try {
					let t = e.state.schema.nodeFromJSON(r), n = e.state.tr.replaceSelectionWith(t);
					return e.dispatch(n), !0;
				} catch {
					return !1;
				}
			} } })];
		},
		addInputRules() {
			let e = (e, t) => (!t.attrs.type || t.attrs.type === "1") && t.childCount + t.attrs.start === +e[1], t = Ld({
				find: dv,
				type: this.type,
				getAttributes: (e) => ({ start: +e[1] }),
				joinPredicate: e
			});
			return (this.options.keepMarks || this.options.keepAttributes) && (t = Ld({
				find: dv,
				type: this.type,
				keepMarks: this.options.keepMarks,
				keepAttributes: this.options.keepAttributes,
				getAttributes: (e) => ({
					start: +e[1],
					...this.editor.getAttributes(uv)
				}),
				joinPredicate: e,
				editor: this.editor
			})), [t];
		}
	}), pv = /^\s*(\[([( |x])?\])\s$/, mv = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0", hv = (e, t, n) => {
		var r;
		return (n == null || (r = n.checkboxLabel) == null ? void 0 : r.call(n, e, t)) || `Task item checkbox for ${e.textContent || "empty task item"}`;
	}, gv = Wp.create({
		name: "taskItem",
		addOptions() {
			return {
				nested: !1,
				HTMLAttributes: {},
				taskListTypeName: "taskList",
				a11y: void 0
			};
		},
		content() {
			return this.options.nested ? "paragraph block*" : "paragraph+";
		},
		defining: !0,
		addAttributes() {
			return { checked: {
				default: !1,
				keepOnSplit: !1,
				parseHTML: (e) => {
					let t = e.getAttribute("data-checked");
					return t === "" || t === "true";
				},
				renderHTML: (e) => ({ "data-checked": e.checked })
			} };
		},
		parseHTML() {
			return [{
				tag: `li[data-type="${this.name}"]`,
				priority: 51,
				contentElement: (e) => e.querySelector("div") ?? e
			}];
		},
		renderHTML({ node: e, HTMLAttributes: t }) {
			return [
				"li",
				P(this.options.HTMLAttributes, t, { "data-type": this.name }),
				[
					"label",
					["input", {
						type: "checkbox",
						checked: e.attrs.checked ? "checked" : null
					}],
					["span"]
				],
				["div", 0]
			];
		},
		parseMarkdown: (e, t) => {
			let n = [];
			if (e.tokens && e.tokens.length > 0 ? n.push(t.createNode("paragraph", {}, t.parseInline(e.tokens))) : e.text ? n.push(t.createNode("paragraph", {}, [t.createNode("text", { text: e.text })])) : n.push(t.createNode("paragraph", {}, [])), e.nestedTokens && e.nestedTokens.length > 0) {
				let r = t.parseChildren(e.nestedTokens);
				n.push(...r);
			}
			return t.createNode("taskItem", { checked: e.checked || !1 }, n);
		},
		renderMarkdown: (e, t) => Cd(e, t, `- [${e.attrs?.checked ? "x" : " "}] `, void 0, { indentMainContent: !0 }),
		addExtensions() {
			return this.options.nested ? [V_(this.name, [this.options.taskListTypeName])] : [];
		},
		addKeyboardShortcuts() {
			let e = {
				Enter: () => this.editor.commands.splitListItem(this.name),
				"Shift-Tab": () => this.editor.commands.liftListItem(this.name)
			};
			return this.options.nested ? {
				...e,
				Tab: () => this.editor.commands.sinkListItem(this.name)
			} : e;
		},
		addNodeView() {
			return ({ node: e, HTMLAttributes: t, getPos: n, editor: r }) => {
				let i = document.createElement("li"), a = document.createElement("label"), o = document.createElement("span"), s = document.createElement("input"), c = document.createElement("div");
				o.style.cssText = mv;
				let l = (e) => {
					let t = hv(e, e.attrs.checked, this.options.a11y);
					s.setAttribute("aria-label", t), o.textContent = t;
				};
				l(e), a.contentEditable = "false", s.type = "checkbox", s.addEventListener("mousedown", (e) => e.preventDefault()), s.addEventListener("change", (t) => {
					if (!r.isEditable && !this.options.onReadOnlyChecked) {
						s.checked = !s.checked;
						return;
					}
					let { checked: i } = t.target;
					r.isEditable && typeof n == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: e }) => {
						let t = n();
						if (typeof t != "number") return !1;
						let r = e.doc.nodeAt(t);
						return e.setNodeMarkup(t, void 0, {
							...r?.attrs,
							checked: i
						}), !0;
					}).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(e, i) || (s.checked = !s.checked));
				}), Object.entries(this.options.HTMLAttributes).forEach(([e, t]) => {
					i.setAttribute(e, t);
				}), i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, a.append(s, o), i.append(a, c), Object.entries(t).forEach(([e, t]) => {
					i.setAttribute(e, t);
				});
				let u = new Set(Object.keys(t));
				return {
					dom: i,
					contentDOM: c,
					update: (e) => {
						if (e.type !== this.type) return !1;
						i.dataset.checked = e.attrs.checked, s.checked = e.attrs.checked, l(e);
						let t = r.extensionManager.attributes, n = au(e, t), a = new Set(Object.keys(n)), o = this.options.HTMLAttributes;
						return u.forEach((e) => {
							a.has(e) || (e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e));
						}), Object.entries(n).forEach(([e, t]) => {
							t == null ? e in o ? i.setAttribute(e, o[e]) : i.removeAttribute(e) : i.setAttribute(e, t);
						}), u = a, !0;
					}
				};
			};
		},
		addInputRules() {
			return [Ld({
				find: pv,
				type: this.type,
				getAttributes: (e) => ({ checked: e[e.length - 1] === "x" })
			})];
		}
	}), _v = Wp.create({
		name: "taskList",
		addOptions() {
			return {
				itemTypeName: "taskItem",
				HTMLAttributes: {}
			};
		},
		group: "block list",
		content() {
			return `${this.options.itemTypeName}+`;
		},
		parseHTML() {
			return [{
				tag: `ul[data-type="${this.name}"]`,
				priority: 51
			}];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"ul",
				P(this.options.HTMLAttributes, e, { "data-type": this.name }),
				0
			];
		},
		parseMarkdown: (e, t) => t.createNode("taskList", {}, t.parseChildren(e.items || [])),
		renderMarkdown: (e, t) => e.content ? t.renderChildren(e.content, "\n") : "",
		markdownTokenizer: {
			name: "taskList",
			level: "block",
			start(e) {
				let t = e.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)?.index;
				return t === void 0 ? -1 : t;
			},
			tokenize(e, t, n) {
				let r = (e) => {
					let t = xd(e, {
						itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
						extractItemData: (e) => ({
							indentLevel: e[1].length,
							mainContent: e[4],
							checked: e[3].toLowerCase() === "x"
						}),
						createToken: (e, t) => ({
							type: "taskItem",
							raw: "",
							mainContent: e.mainContent,
							indentLevel: e.indentLevel,
							checked: e.checked,
							text: e.mainContent,
							tokens: n.inlineTokens(e.mainContent),
							nestedTokens: t
						}),
						customNestedParser: r
					}, n);
					if (t) {
						let r = {
							type: "taskList",
							raw: t.raw,
							items: t.items
						}, i = e.slice(t.raw.length);
						return i.trim() ? [r, ...n.blockTokens(i)] : [r];
					}
					return n.blockTokens(e);
				}, i = xd(e, {
					itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
					extractItemData: (e) => ({
						indentLevel: e[1].length,
						mainContent: e[4],
						checked: e[3].toLowerCase() === "x"
					}),
					createToken: (e, t) => ({
						type: "taskItem",
						raw: "",
						mainContent: e.mainContent,
						indentLevel: e.indentLevel,
						checked: e.checked,
						text: e.mainContent,
						tokens: n.inlineTokens(e.mainContent),
						nestedTokens: t
					}),
					customNestedParser: r
				}, n);
				if (i) return {
					type: "taskList",
					raw: i.raw,
					items: i.items
				};
			}
		},
		markdownOptions: { indentsContent: !0 },
		addCommands() {
			return { toggleTaskList: () => ({ commands: e }) => e.toggleList(this.name, this.options.itemTypeName) };
		},
		addKeyboardShortcuts() {
			return { "Mod-Shift-9": () => this.editor.commands.toggleTaskList() };
		}
	}), F.create({
		name: "listKit",
		addExtensions() {
			let e = [];
			return this.options.bulletList !== !1 && e.push(L_.configure(this.options.bulletList)), this.options.listItem !== !1 && e.push(J_.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(rv.configure(this.options.listKeymap)), this.options.orderedList !== !1 && e.push(fv.configure(this.options.orderedList)), this.options.taskItem !== !1 && e.push(gv.configure(this.options.taskItem)), this.options.taskList !== !1 && e.push(_v.configure(this.options.taskList)), e;
		}
	});
})), yv, bv, xv, Sv = e((() => {
	I(), yv = "&nbsp;", bv = "\xA0", xv = Wp.create({
		name: "paragraph",
		priority: 1e3,
		addOptions() {
			return { HTMLAttributes: {} };
		},
		group: "block",
		content: "inline*",
		parseHTML() {
			return [{ tag: "p" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"p",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		parseMarkdown: (e, t) => {
			let n = e.tokens || [];
			if (n.length === 1 && n[0].type === "image") return t.parseChildren([n[0]]);
			let r = t.parseInline(n);
			return n.length === 1 && n[0].type === "text" && (n[0].raw === yv || n[0].text === yv || n[0].raw === bv || n[0].text === bv) && r.length === 1 && r[0].type === "text" && (r[0].text === yv || r[0].text === bv) ? t.createNode("paragraph", void 0, []) : t.createNode("paragraph", void 0, r);
		},
		renderMarkdown: (e, t, n) => {
			if (!e) return "";
			let r = Array.isArray(e.content) ? e.content : [];
			if (r.length === 0) {
				var i, a;
				let e = Array.isArray(n == null || (i = n.previousNode) == null ? void 0 : i.content) ? n.previousNode.content : [];
				return (n == null || (a = n.previousNode) == null ? void 0 : a.type) === "paragraph" && e.length === 0 ? yv : "";
			}
			return t.renderChildren(r);
		},
		addCommands() {
			return { setParagraph: () => ({ commands: e }) => e.setNode(this.name) };
		},
		addKeyboardShortcuts() {
			return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
		}
	});
})), Cv, wv, Tv, Ev = e((() => {
	I(), Cv = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, wv = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Tv = xp.create({
		name: "strike",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		parseHTML() {
			return [
				{ tag: "s" },
				{ tag: "del" },
				{ tag: "strike" },
				{
					style: "text-decoration",
					consuming: !1,
					getAttrs: (e) => e.includes("line-through") ? {} : !1
				}
			];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"s",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		markdownTokenName: "del",
		parseMarkdown: (e, t) => t.applyMark("strike", t.parseInline(e.tokens || [])),
		renderMarkdown: (e, t) => `~~${t.renderChildren(e)}~~`,
		addCommands() {
			return {
				setStrike: () => ({ commands: e }) => e.setMark(this.name),
				toggleStrike: () => ({ commands: e }) => e.toggleMark(this.name),
				unsetStrike: () => ({ commands: e }) => e.unsetMark(this.name)
			};
		},
		addKeyboardShortcuts() {
			return { "Mod-Shift-s": () => this.editor.commands.toggleStrike() };
		},
		addInputRules() {
			return [Pd({
				find: Cv,
				type: this.type
			})];
		},
		addPasteRules() {
			return [Rd({
				find: wv,
				type: this.type
			})];
		}
	});
})), Dv, Ov = e((() => {
	I(), Dv = Wp.create({
		name: "text",
		group: "inline",
		parseMarkdown: (e) => ({
			type: "text",
			text: e.text || ""
		}),
		renderMarkdown: (e) => e.text || ""
	});
})), kv, Av, jv = e((() => {
	I(), kv = xp.create({
		name: "underline",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		parseHTML() {
			return [{ tag: "u" }, {
				style: "text-decoration",
				consuming: !1,
				getAttrs: (e) => e.includes("underline") ? {} : !1
			}];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"u",
				P(this.options.HTMLAttributes, e),
				0
			];
		},
		parseMarkdown(e, t) {
			return t.applyMark(this.name || "underline", t.parseInline(e.tokens || []));
		},
		renderMarkdown(e, t) {
			return `<u>${t.renderChildren(e)}</u>`;
		},
		markdownTokenizer: {
			name: "underline",
			level: "inline",
			start(e) {
				return e.toLowerCase().indexOf("<u>");
			},
			tokenize(e, t, n) {
				if (!/^<u>/i.test(e)) return;
				let r = /\\[\s\S]|`+|<\/u>/gi;
				r.lastIndex = 3;
				let i = r.exec(e);
				for (; i;) {
					if (i[0].startsWith("`")) {
						let t = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/.exec(e.slice(i.index));
						t && (r.lastIndex = i.index + t[0].length);
					} else if (!i[0].startsWith("\\")) {
						let t = e.slice(3, i.index);
						return t ? {
							type: "underline",
							raw: e.slice(0, r.lastIndex),
							text: t,
							tokens: n.inlineTokens(t)
						} : void 0;
					}
					i = r.exec(e);
				}
			}
		},
		addCommands() {
			return {
				setUnderline: () => ({ commands: e }) => e.setMark(this.name),
				toggleUnderline: () => ({ commands: e }) => e.toggleMark(this.name),
				unsetUnderline: () => ({ commands: e }) => e.unsetMark(this.name)
			};
		},
		addKeyboardShortcuts() {
			return {
				"Mod-u": () => this.editor.commands.toggleUnderline(),
				"Mod-U": () => this.editor.commands.toggleUnderline()
			};
		}
	}), Av = kv;
}));
// node_modules/prosemirror-dropcursor/dist/index.js
function Mv(e = {}) {
	return new O({ view(t) {
		return new Nv(t, e);
	} });
}
var Nv, Pv = e((() => {
	Yn(), Tn(), Nv = class {
		constructor(e, t) {
			this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.lastDragEvent = null, this.width = t.width ?? 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = [
				"dragover",
				"dragend",
				"drop",
				"dragleave"
			].map((t) => {
				let n = (e) => {
					this[t](e);
				};
				return e.dom.addEventListener(t, n), {
					name: t,
					handler: n
				};
			});
		}
		destroy() {
			this.setCursor(null), this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
		}
		update(e, t) {
			if (this.cursorPos != null && t.doc != e.state.doc) {
				if (this.lastDragEvent) {
					let e = this.computeTarget(this.lastDragEvent);
					e == this.cursorPos ? this.updateOverlay() : this.setCursor(e);
				} else this.updateOverlay();
			}
		}
		setCursor(e) {
			e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
		}
		updateOverlay() {
			let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, n, r = this.editorView.dom, i = r.getBoundingClientRect(), a = i.width / r.offsetWidth, o = i.height / r.offsetHeight;
			if (t) {
				let t = e.nodeBefore, r = e.nodeAfter;
				if (t || r) {
					let e = this.editorView.nodeDOM(this.cursorPos - (t ? t.nodeSize : 0));
					if (e) {
						let i = e.getBoundingClientRect(), a = t ? i.bottom : i.top;
						t && r && (a = (a + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
						let s = this.width / 2 * o;
						n = {
							left: i.left,
							right: i.right,
							top: a - s,
							bottom: a + s
						};
					}
				}
			}
			if (!n) {
				let e = this.editorView.coordsAtPos(this.cursorPos), t = this.width / 2 * a;
				n = {
					left: e.left - t,
					right: e.left + t,
					top: e.top,
					bottom: e.bottom
				};
			}
			let s = this.editorView.dom.offsetParent;
			this.element || (this.element = s.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
			let c, l;
			if (!s || s == document.body && getComputedStyle(s).position == "static") c = -pageXOffset, l = -pageYOffset;
			else {
				let e = s.getBoundingClientRect(), t = e.width / s.offsetWidth, n = e.height / s.offsetHeight;
				c = e.left - s.scrollLeft * t, l = e.top - s.scrollTop * n;
			}
			this.element.style.left = (n.left - c) / a + "px", this.element.style.top = (n.top - l) / o + "px", this.element.style.width = (n.right - n.left) / a + "px", this.element.style.height = (n.bottom - n.top) / o + "px";
		}
		scheduleRemoval(e) {
			clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
		}
		computeTarget(e) {
			let t = this.editorView.posAtCoords({
				left: e.clientX,
				top: e.clientY
			}), n = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), r = n && n.type.spec.disableDropCursor, i = typeof r == "function" ? r(this.editorView, t, e) : r;
			if (!t || i) return null;
			let a = t.pos;
			if (this.editorView.dragging && this.editorView.dragging.slice) {
				let e = zt(this.editorView.state.doc, a, this.editorView.dragging.slice);
				e != null && (a = e);
			}
			return a;
		}
		dragover(e) {
			if (!this.editorView.editable) return;
			this.lastDragEvent = e;
			let t = this.computeTarget(e);
			t != null && (this.setCursor(t), this.scheduleRemoval(5e3));
		}
		dragend() {
			this.scheduleRemoval(20);
		}
		drop() {
			this.scheduleRemoval(20);
		}
		dragleave(e) {
			this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
		}
	};
})), Fv = e((() => {
	Pv();
}));
// node_modules/prosemirror-gapcursor/dist/index.js
function Iv(e) {
	return e.isAtom || e.spec.isolating || e.spec.createGapCursor;
}
function Lv(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.index(t), r = e.node(t);
		if (n == 0) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n - 1);; e = e.lastChild) {
			if (e.childCount == 0 && !e.inlineContent || Iv(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function Rv(e) {
	for (let t = e.depth; t >= 0; t--) {
		let n = e.indexAfter(t), r = e.node(t);
		if (n == r.childCount) {
			if (r.type.spec.isolating) return !0;
		} else for (let e = r.child(n);; e = e.firstChild) {
			if (e.childCount == 0 && !e.inlineContent || Iv(e.type)) return !0;
			if (e.inlineContent) return !1;
		}
	}
	return !0;
}
function zv() {
	return new O({ props: {
		decorations: Uv,
		createSelectionBetween(e, t, n) {
			return t.pos == n.pos && Wv.valid(n) ? new Wv(n) : null;
		},
		handleClick: Vv,
		handleKeyDown: Kv,
		handleDOMEvents: { beforeinput: Hv }
	} });
}
function Bv(e, t) {
	let n = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
	return function(e, r, i) {
		let a = e.selection, o = t > 0 ? a.$to : a.$from, s = a.empty;
		if (a instanceof E) {
			if (!i.endOfTextblock(n) || o.depth == 0) return !1;
			s = !1, o = e.doc.resolve(t > 0 ? o.after() : o.before());
		}
		let c = Wv.findGapCursorFrom(o, t, s);
		return c ? (r && r(e.tr.setSelection(new Wv(c))), !0) : !1;
	};
}
function Vv(e, t, n) {
	if (!e || !e.editable) return !1;
	let r = e.state.doc.resolve(t);
	if (!Wv.valid(r)) return !1;
	let i = e.posAtCoords({
		left: n.clientX,
		top: n.clientY
	});
	return i && i.inside > -1 && D.isSelectable(e.state.doc.nodeAt(i.inside)) ? !1 : (e.dispatch(e.state.tr.setSelection(new Wv(r))), !0);
}
function Hv(e, t) {
	if (t.inputType != "insertCompositionText" || !(e.state.selection instanceof Wv)) return !1;
	let { $from: n } = e.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text);
	if (!r) return !1;
	let i = x.empty;
	for (let e = r.length - 1; e >= 0; e--) i = x.from(r[e].createAndFill(null, i));
	let a = e.state.tr.replace(n.pos, n.pos, new C(i, 0, 0));
	return a.setSelection(E.near(a.doc.resolve(n.pos + 1))), e.dispatch(a), !1;
}
function Uv(e) {
	if (!(e.selection instanceof Wv)) return null;
	let t = document.createElement("div");
	return t.className = "ProseMirror-gapcursor", j.create(e.doc, [sc.widget(e.selection.head, t, { key: "gapcursor" })]);
}
var Wv, Gv, Kv, qv = e((() => {
	Lc(), Yn(), ct(), xc(), Wv = class e extends T {
		constructor(e) {
			super(e, e);
		}
		map(t, n) {
			let r = t.resolve(n.map(this.head));
			return e.valid(r) ? new e(r) : T.near(r);
		}
		content() {
			return C.empty;
		}
		eq(t) {
			return t instanceof e && t.head == this.head;
		}
		toJSON() {
			return {
				type: "gapcursor",
				pos: this.head
			};
		}
		static fromJSON(t, n) {
			if (typeof n.pos != "number") throw RangeError("Invalid input for GapCursor.fromJSON");
			return new e(t.resolve(n.pos));
		}
		getBookmark() {
			return new Gv(this.anchor);
		}
		static valid(e) {
			let t = e.parent;
			if (t.inlineContent || !Lv(e) || !Rv(e)) return !1;
			let n = t.type.spec.allowGapCursor;
			if (n != null) return n;
			let r = t.contentMatchAt(e.index()).defaultType;
			return r && r.isTextblock;
		}
		static findGapCursorFrom(t, n, r = !1) {
			search: for (;;) {
				if (!r && e.valid(t)) return t;
				let i = t.pos, a = null;
				for (let r = t.depth;; r--) {
					let o = t.node(r);
					if (n > 0 ? t.indexAfter(r) < o.childCount : t.index(r) > 0) {
						a = o.child(n > 0 ? t.indexAfter(r) : t.index(r) - 1);
						break;
					}
					if (r == 0) return null;
					i += n;
					let s = t.doc.resolve(i);
					if (e.valid(s)) return s;
				}
				for (;;) {
					let o = n > 0 ? a.firstChild : a.lastChild;
					if (!o) {
						if (a.isAtom && !a.isText && !D.isSelectable(a)) {
							t = t.doc.resolve(i + a.nodeSize * n), r = !1;
							continue search;
						}
						break;
					}
					a = o, i += n;
					let s = t.doc.resolve(i);
					if (e.valid(s)) return s;
				}
				return null;
			}
		}
	}, Wv.prototype.visible = !1, Wv.findFrom = Wv.findGapCursorFrom, T.jsonID("gapcursor", Wv), Gv = class e {
		constructor(e) {
			this.pos = e;
		}
		map(t) {
			return new e(t.map(this.pos));
		}
		resolve(e) {
			let t = e.resolve(this.pos);
			return Wv.valid(t) ? new Wv(t) : T.near(t);
		}
	}, Kv = Pc({
		ArrowLeft: Bv("horiz", -1),
		ArrowRight: Bv("horiz", 1),
		ArrowUp: Bv("vert", -1),
		ArrowDown: Bv("vert", 1)
	});
})), Jv = e((() => {
	qv();
}));
// node_modules/@tiptap/extensions/dist/index.js
function Yv(e) {
	let { editor: t, placeholder: n, dataAttribute: r, pos: i, node: a, isEmptyDoc: o, hasAnchor: s, classes: { emptyNode: c, emptyEditor: l } } = e, u = [c];
	return o && u.push(l), sc.node(i, i + a.nodeSize, {
		class: u.join(" "),
		[r]: typeof n == "function" ? n({
			editor: t,
			node: a,
			pos: i,
			hasAnchor: s
		}) : n
	});
}
function Xv(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Zv({ editor: e, options: t, dataAttribute: n, doc: r, selection: i, from: a, to: o }) {
	let { anchor: s } = i, c = [], l = e.isEmpty;
	return r.nodesBetween(a, o, (r, i) => {
		let a = s >= i && s <= i + r.nodeSize, o = !r.isLeaf && ku(r);
		return r.type.isTextblock && (a || !t.showOnlyCurrent) && o && c.push(Yv({
			editor: e,
			isEmptyDoc: l,
			dataAttribute: n,
			hasAnchor: a,
			placeholder: t.placeholder,
			classes: {
				emptyEditor: t.emptyEditorClass,
				emptyNode: Xv(t.emptyNodeClass, {
					editor: e,
					node: r,
					pos: i,
					hasAnchor: a
				})
			},
			node: r,
			pos: i
		})), t.includeChildren;
	}), c;
}
function Qv({ editor: e, options: t, dataAttribute: n, doc: r, selection: i }) {
	if (!e.isEditable && t.showOnlyWhenEditable) return null;
	let { anchor: a } = i, o = [], s = e.isEmpty;
	if (t.showOnlyCurrent && !t.includeChildren) {
		let i = r.resolve(a), c = i.depth > 0 ? i.node(1) : i.nodeAfter, l = i.depth > 0 ? i.before(1) : a;
		if (c && c.type.isTextblock && ku(c)) {
			let r = a >= l && a <= l + c.nodeSize;
			o.push(Yv({
				editor: e,
				isEmptyDoc: s,
				dataAttribute: n,
				hasAnchor: r,
				placeholder: t.placeholder,
				classes: {
					emptyEditor: t.emptyEditorClass,
					emptyNode: Xv(t.emptyNodeClass, {
						editor: e,
						node: c,
						pos: l,
						hasAnchor: r
					})
				},
				node: c,
				pos: l
			}));
		}
	} else o.push(...Zv({
		editor: e,
		options: t,
		dataAttribute: n,
		doc: r,
		selection: i,
		from: 0,
		to: r.content.size
	}));
	return j.create(r, o);
}
function $v(e, t) {
	let n = e.resolve(t);
	if (n.depth === 0) {
		let e = n.nodeAfter ?? n.nodeBefore;
		if (!e) return {
			from: t,
			to: t
		};
		let r = n.nodeAfter ? t : t - e.nodeSize;
		return {
			from: r,
			to: r + e.nodeSize
		};
	}
	let r = n.before(1);
	return {
		from: r,
		to: r + n.node(1).nodeSize
	};
}
function ey(e, t) {
	return {
		from: Math.max(0, t.from),
		to: Math.min(e.content.size, t.to)
	};
}
function ty(e, t, n) {
	let r = [];
	return e.forEach((e, i) => {
		let a = i, o = a + e.nodeSize, s = a + 1, c = o + 1;
		s < n && c > t && r.push({
			from: a,
			to: o
		});
	}), r;
}
function ny(e) {
	if (e.length === 0) return [];
	let t = [...e].sort((e, t) => e.from - t.from), n = [{ ...t[0] }];
	for (let e = 1; e < t.length; e += 1) {
		let r = n[n.length - 1], i = t[e];
		i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
	}
	return n;
}
function ry(e, t) {
	let n = ty(e, t.from, t.to);
	return n.push(ey(e, $v(e, t.from))), t.to > t.from ? n.push(ey(e, $v(e, Math.min(t.to, e.content.size + 1) - 1))) : t.from < e.content.size + 1 && n.push(ey(e, $v(e, Math.min(t.from + 1, e.content.size)))), n;
}
function iy(e, t, n) {
	let r = [];
	if (e.docChanged) {
		let t = xu(e);
		for (let e of t) r.push(...ry(n.doc, e.newRange));
	}
	return e.selectionSet && (r.push(ey(n.doc, $v(n.doc, e.mapping.map(t.selection.anchor)))), r.push(ey(n.doc, $v(n.doc, n.selection.anchor)))), ny(r);
}
function ay(e, t, n) {
	let r = Math.max(0, Math.min(e, n.content.size));
	return {
		from: r,
		to: Math.max(r, Math.min(t, n.content.size))
	};
}
function oy({ decorations: e, ranges: t, editor: n, options: r, dataAttribute: i, doc: a, selection: o }) {
	let s = e;
	for (let e of t) {
		let { from: t, to: c } = ay(e.from, e.to, a), l = s.find(t, c).filter((e) => e.from >= t && e.to <= c);
		l.length && (s = s.remove(l));
		let u = Zv({
			editor: n,
			options: r,
			dataAttribute: i,
			doc: a,
			selection: o,
			from: t,
			to: c
		});
		u.length && (s = s.add(a, u));
	}
	return s;
}
function sy({ editor: e, options: t, dataAttribute: n }) {
	return {
		init(r, i) {
			return Qv({
				editor: e,
				options: t,
				dataAttribute: n,
				doc: i.doc,
				selection: i.selection
			}) ?? j.empty;
		},
		apply(r, i, a, o) {
			return !r.docChanged && !r.selectionSet ? i : oy({
				decorations: i.map(r.mapping, r.doc),
				ranges: iy(r, a, o),
				editor: e,
				options: t,
				dataAttribute: n,
				doc: o.doc,
				selection: o.selection
			});
		}
	};
}
function cy(e) {
	return e.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function ly({ editor: e, options: t }) {
	let n = t.dataAttribute ? `data-${cy(t.dataAttribute)}` : `data-${_y}`, r = t.showOnlyCurrent && !t.includeChildren;
	return new O({
		key: vy,
		...r ? {} : { state: sy({
			editor: e,
			options: t,
			dataAttribute: n
		}) },
		props: { decorations: r ? ({ doc: r, selection: i }) => Qv({
			editor: e,
			options: t,
			dataAttribute: n,
			doc: r,
			selection: i
		}) : (n) => t.showOnlyWhenEditable && !e.isEditable ? j.empty : vy.getState(n) ?? j.empty }
	});
}
function uy(e, t) {
	return !e.selection.empty && !Au(e.selection) && t.isEditable;
}
function dy(e, t) {
	return uy(e, t) && !t.isFocused && !t.view.dragging;
}
function fy() {
	var e;
	(e = window.getSelection()) == null || e.removeAllRanges();
}
function py(e) {
	e.focus();
}
function my({ types: e, node: t }) {
	return t && Array.isArray(e) && e.includes(t.type) || t?.type === e;
}
var hy, gy, _y, vy, yy, by, xy = e((() => {
	I(), Fr(), Fv(), Sc(), Jv(), pl(), F.create({
		name: "characterCount",
		addOptions() {
			return {
				limit: null,
				autoTrim: !0,
				mode: "textSize",
				textCounter: (e) => e.length,
				wordCounter: (e) => e.split(" ").filter((e) => e !== "").length
			};
		},
		addStorage() {
			return {
				characters: () => 0,
				words: () => 0
			};
		},
		onBeforeCreate() {
			this.storage.characters = (e) => {
				let t = e?.node || this.editor.state.doc;
				if ((e?.mode || this.options.mode) === "textSize") {
					let e = t.textBetween(0, t.content.size, void 0, " ");
					return this.options.textCounter(e);
				}
				return t.nodeSize;
			}, this.storage.words = (e) => {
				let t = e?.node || this.editor.state.doc, n = t.textBetween(0, t.content.size, " ", " ");
				return this.options.wordCounter(n);
			};
		},
		addProseMirrorPlugins() {
			let e = !1;
			return [new O({
				key: new k("characterCount"),
				appendTransaction: (t, n, r) => {
					if (e) return;
					let i = this.options.limit, a = this.options.autoTrim;
					if (i == null || i === 0 || a === !1) {
						e = !0;
						return;
					}
					let o = this.storage.characters({ node: r.doc });
					if (o > i) {
						let t = o - i;
						console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
						let n = r.tr.deleteRange(0, t);
						return e = !0, n;
					}
					e = !0;
				},
				filterTransaction: (e, t) => {
					let n = this.options.limit;
					if (!e.docChanged || n === 0 || n == null) return !0;
					let r = this.storage.characters({ node: t.doc }), i = this.storage.characters({ node: e.doc });
					if (i <= n || r > n && i > n && i <= r) return !0;
					if (r > n && i > n && i > r || !e.getMeta("paste")) return !1;
					let a = e.selection.$head.pos, o = a - (i - n), s = a;
					return e.deleteRange(o, s), !(this.storage.characters({ node: e.doc }) > n);
				}
			})];
		}
	}), hy = F.create({
		name: "dropCursor",
		addOptions() {
			return {
				color: "currentColor",
				width: 1,
				class: void 0
			};
		},
		addProseMirrorPlugins() {
			return [Mv(this.options)];
		}
	}), F.create({
		name: "focus",
		addOptions() {
			return {
				className: "has-focus",
				mode: "all"
			};
		},
		addProseMirrorPlugins() {
			return [new O({
				key: new k("focus"),
				props: { decorations: ({ doc: e, selection: t }) => {
					let { isEditable: n, isFocused: r } = this.editor, { anchor: i } = t, a = [];
					if (!n || !r) return j.create(e, []);
					let o = 0;
					this.options.mode === "deepest" && e.descendants((e, t) => {
						if (!e.isText) {
							if (!(i >= t && i <= t + e.nodeSize - 1)) return !1;
							o += 1;
						}
					});
					let s = 0;
					return e.descendants((e, t) => {
						if (e.isText || !(i >= t && i <= t + e.nodeSize - 1)) return !1;
						if (s += 1, this.options.mode === "deepest" && o - s > 0 || this.options.mode === "shallowest" && s > 1) return this.options.mode === "deepest";
						a.push(sc.node(t, t + e.nodeSize, { class: this.options.className }));
					}), j.create(e, a);
				} }
			})];
		}
	}), gy = F.create({
		name: "gapCursor",
		addProseMirrorPlugins() {
			return [zv()];
		},
		extendNodeSchema(e) {
			return { allowGapCursor: N(M(e, "allowGapCursor", {
				name: e.name,
				options: e.options,
				storage: e.storage
			})) ?? null };
		}
	}), _y = "placeholder", vy = new k("tiptap__placeholder"), F.create({
		name: "placeholder",
		addOptions() {
			return {
				emptyEditorClass: "is-editor-empty",
				emptyNodeClass: "is-empty",
				dataAttribute: _y,
				placeholder: "Write something …",
				showOnlyWhenEditable: !0,
				showOnlyCurrent: !0,
				includeChildren: !1
			};
		},
		addProseMirrorPlugins() {
			return [ly({
				editor: this.editor,
				options: this.options
			})];
		}
	}), F.create({
		name: "selection",
		addOptions() {
			return { className: "selection" };
		},
		addProseMirrorPlugins() {
			let { editor: e, options: t } = this;
			return [new O({
				key: new k("selection"),
				props: {
					decorations(n) {
						return dy(n, e) ? j.create(n.doc, [sc.inline(n.selection.from, n.selection.to, { class: t.className })]) : null;
					},
					handleDOMEvents: {
						blur(t) {
							return uy(t.state, e) && fy(), !1;
						},
						focus(t) {
							return uy(t.state, e) && requestAnimationFrame(() => {
								!e.isDestroyed && t.hasFocus() && py(t);
							}), !1;
						}
					}
				}
			})];
		}
	}), yy = F.create({
		name: "trailingNode",
		addOptions() {
			return {
				node: void 0,
				notAfter: []
			};
		},
		addProseMirrorPlugins() {
			let e = new k(this.name), t = this.options.node || this.editor.schema.topNodeType.contentMatch.defaultType?.name || "paragraph", n = Object.entries(this.editor.schema.nodes).map(([, e]) => e).filter((e) => (this.options.notAfter || []).concat(t).includes(e.name));
			return [new O({
				key: e,
				appendTransaction: (n, r, i) => {
					let { doc: a, tr: o, schema: s } = i, c = e.getState(i), l = a.content.size, u = s.nodes[t];
					if (!n.some((e) => e.getMeta("skipTrailingNode")) && c) return o.insert(l, u.create());
				},
				state: {
					init: (e, t) => {
						let r = t.tr.doc.lastChild;
						return !my({
							node: r,
							types: n
						});
					},
					apply: (e, t) => {
						if (!e.docChanged || e.getMeta("__uniqueIDTransaction")) return t;
						let r = e.doc.lastChild;
						return !my({
							node: r,
							types: n
						});
					}
				}
			})];
		}
	}), by = F.create({
		name: "undoRedo",
		addOptions() {
			return {
				depth: 100,
				newGroupDelay: 500
			};
		},
		addCommands() {
			return {
				undo: () => ({ state: e, dispatch: t }) => ul(e, t),
				redo: () => ({ state: e, dispatch: t }) => dl(e, t)
			};
		},
		addProseMirrorPlugins() {
			return [Qc(this.options)];
		},
		addKeyboardShortcuts() {
			return {
				"Mod-z": () => this.editor.commands.undo(),
				"Shift-Mod-z": () => this.editor.commands.redo(),
				"Mod-y": () => this.editor.commands.redo(),
				"Mod-я": () => this.editor.commands.undo(),
				"Shift-Mod-я": () => this.editor.commands.redo()
			};
		}
	});
})), Sy, Cy, wy = e((() => {
	I(), rm(), lm(), mm(), ym(), xm(), Cm(), Tm(), Dm(), Nm(), a_(), vv(), Sv(), Ev(), Ov(), jv(), xy(), Sy = F.create({
		name: "starterKit",
		addExtensions() {
			let e = [];
			return this.options.bold !== !1 && e.push(cm.configure(this.options.bold)), this.options.blockquote !== !1 && e.push(nm.configure(this.options.blockquote)), this.options.bulletList !== !1 && e.push(L_.configure(this.options.bulletList)), this.options.code !== !1 && e.push(pm.configure(this.options.code)), this.options.codeBlock !== !1 && e.push(vm.configure(this.options.codeBlock)), this.options.document !== !1 && e.push(bm.configure(this.options.document)), this.options.dropcursor !== !1 && e.push(hy.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && e.push(gy.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && e.push(Sm.configure(this.options.hardBreak)), this.options.heading !== !1 && e.push(wm.configure(this.options.heading)), this.options.undoRedo !== !1 && e.push(by.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && e.push(Em.configure(this.options.horizontalRule)), this.options.italic !== !1 && e.push(Mm.configure(this.options.italic)), this.options.listItem !== !1 && e.push(J_.configure(this.options.listItem)), this.options.listKeymap !== !1 && e.push(rv.configure(this.options?.listKeymap)), this.options.link !== !1 && e.push(i_.configure(this.options?.link)), this.options.orderedList !== !1 && e.push(fv.configure(this.options.orderedList)), this.options.paragraph !== !1 && e.push(xv.configure(this.options.paragraph)), this.options.strike !== !1 && e.push(Tv.configure(this.options.strike)), this.options.text !== !1 && e.push(Dv.configure(this.options.text)), this.options.underline !== !1 && e.push(kv.configure(this.options?.underline)), this.options.trailingNode !== !1 && e.push(yy.configure(this.options?.trailingNode)), e;
		}
	}), Cy = Sy;
})), Ty, Ey, Dy, Oy, ky, Ay = e((() => {
	Ty = () => /* @__PURE__ */ new Map(), Ey = (e) => {
		let t = Ty();
		return e.forEach((e, n) => {
			t.set(n, e);
		}), t;
	}, Dy = (e, t, n) => {
		let r = e.get(t);
		return r === void 0 && e.set(t, r = n()), r;
	}, Oy = (e, t) => {
		let n = [];
		for (let [r, i] of e) n.push(t(i, r));
		return n;
	}, ky = (e, t) => {
		for (let [n, r] of e) if (t(r, n)) return !0;
		return !1;
	};
})), jy, My = e((() => {
	jy = () => /* @__PURE__ */ new Set();
})), Ny, Py, Fy, Iy, Ly, Ry, zy, By = e((() => {
	Ny = (e) => e[e.length - 1], Py = (e, t) => {
		for (let n = 0; n < t.length; n++) e.push(t[n]);
	}, Fy = Array.from, Iy = (e, t) => {
		for (let n = 0; n < e.length; n++) if (!t(e[n], n, e)) return !1;
		return !0;
	}, Ly = (e, t) => {
		for (let n = 0; n < e.length; n++) if (t(e[n], n, e)) return !0;
		return !1;
	}, Ry = (e, t) => {
		let n = Array(e);
		for (let r = 0; r < e; r++) n[r] = t(r, n);
		return n;
	}, zy = Array.isArray;
})), Vy, Hy, Uy = e((() => {
	Ay(), My(), By(), Vy = class {
		constructor() {
			this._observers = Ty();
		}
		on(e, t) {
			return Dy(this._observers, e, jy).add(t), t;
		}
		once(e, t) {
			let n = (...r) => {
				this.off(e, n), t(...r);
			};
			this.on(e, n);
		}
		off(e, t) {
			let n = this._observers.get(e);
			n !== void 0 && (n.delete(t), n.size === 0 && this._observers.delete(e));
		}
		emit(e, t) {
			return Fy((this._observers.get(e) || Ty()).values()).forEach((e) => e(...t));
		}
		destroy() {
			this._observers = Ty();
		}
	}, Hy = class {
		constructor() {
			this._observers = Ty();
		}
		on(e, t) {
			Dy(this._observers, e, jy).add(t);
		}
		once(e, t) {
			let n = (...r) => {
				this.off(e, n), t(...r);
			};
			this.on(e, n);
		}
		off(e, t) {
			let n = this._observers.get(e);
			n !== void 0 && (n.delete(t), n.size === 0 && this._observers.delete(e));
		}
		emit(e, t) {
			return Fy((this._observers.get(e) || Ty()).values()).forEach((e) => e(...t));
		}
		destroy() {
			this._observers = Ty();
		}
	};
})), Wy, Gy, Ky, qy, Jy, Yy = e((() => {
	Wy = Math.floor, Gy = Math.abs, Ky = (e, t) => e < t ? e : t, qy = (e, t) => e > t ? e : t, Number.isNaN, Jy = (e) => e === 0 ? 1 / e < 0 : e < 0;
})), Xy, Zy = e((() => {
	Xy = 1 << 29;
})), Qy, $y, eb, tb = e((() => {
	Yy(), Qy = 2 ** 53 - 1, $y = -(2 ** 53 - 1), eb = Number.isInteger || ((e) => typeof e == "number" && isFinite(e) && Wy(e) === e), Number.isNaN, Number.parseInt;
})), nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb = e((() => {
	By(), nb = String.fromCharCode, String.fromCodePoint, nb(65535), rb = (e) => e.toLowerCase(), ib = /^\s*/g, ab = (e) => e.replace(ib, ""), ob = /([A-Z])/g, sb = (e, t) => ab(e.replace(ob, (e) => `${t}${rb(e)}`)), cb = (e) => {
		let t = unescape(encodeURIComponent(e)), n = t.length, r = new Uint8Array(n);
		for (let e = 0; e < n; e++) r[e] = t.codePointAt(e);
		return r;
	}, lb = typeof TextEncoder < "u" ? new TextEncoder() : null, ub = (e) => lb.encode(e), db = lb ? ub : cb, fb = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", {
		fatal: !0,
		ignoreBOM: !0
	}), fb && fb.decode(/* @__PURE__ */ new Uint8Array()).length === 1 && 
	/* c8 ignore next */
	(fb = null), pb = (e, t) => Ry(t, () => e).join("");
})), hb, gb, _b, vb, yb, bb, xb, Sb, V, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb, Rb, zb, Bb, Vb, Hb, Ub, Wb = e((() => {
	Yy(), tb(), Zy(), mb(), By(), hb = class {
		constructor() {
			this.cpos = 0, this.cbuf = /* @__PURE__ */ new Uint8Array(100), this.bufs = [];
		}
	}, gb = () => new hb(), _b = (e) => {
		let t = gb();
		return e(t), yb(t);
	}, vb = (e) => {
		let t = e.cpos;
		for (let n = 0; n < e.bufs.length; n++) t += e.bufs[n].length;
		return t;
	}, yb = (e) => {
		let t = new Uint8Array(vb(e)), n = 0;
		for (let r = 0; r < e.bufs.length; r++) {
			let i = e.bufs[r];
			t.set(i, n), n += i.length;
		}
		return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
	}, bb = (e, t) => {
		let n = e.cbuf.length;
		n - e.cpos < t && (e.bufs.push(new Uint8Array(e.cbuf.buffer, 0, e.cpos)), e.cbuf = new Uint8Array(qy(n, t) * 2), e.cpos = 0);
	}, xb = (e, t) => {
		let n = e.cbuf.length;
		e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
	}, Sb = xb, V = (e, t) => {
		for (; t > 127;) xb(e, 128 | 127 & t), t = Wy(t / 128);
		xb(e, 127 & t);
	}, Cb = (e, t) => {
		let n = Jy(t);
		for (n && (t = -t), xb(e, (t > 63 ? 128 : 0) | (n ? 64 : 0) | 63 & t), t = Wy(t / 64); t > 0;) xb(e, (t > 127 ? 128 : 0) | 127 & t), t = Wy(t / 128);
	}, wb = /* @__PURE__ */ new Uint8Array(3e4), Tb = wb.length / 3, Eb = (e, t) => {
		if (t.length < Tb) {
			/* c8 ignore next */
			let n = lb.encodeInto(t, wb).written || 0;
			V(e, n);
			for (let t = 0; t < n; t++) xb(e, wb[t]);
		} else Ab(e, db(t));
	}, Db = (e, t) => {
		let n = unescape(encodeURIComponent(t)), r = n.length;
		V(e, r);
		for (let t = 0; t < r; t++) xb(e, n.codePointAt(t));
	}, Ob = lb && lb.encodeInto ? Eb : Db, kb = (e, t) => {
		let n = e.cbuf.length, r = e.cpos, i = Ky(n - r, t.length), a = t.length - i;
		e.cbuf.set(t.subarray(0, i), r), e.cpos += i, a > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(qy(n * 2, a)), e.cbuf.set(t.subarray(i)), e.cpos = a);
	}, Ab = (e, t) => {
		V(e, t.byteLength), kb(e, t);
	}, jb = (e, t) => {
		bb(e, t);
		let n = new DataView(e.cbuf.buffer, e.cpos, t);
		return e.cpos += t, n;
	}, Mb = (e, t) => jb(e, 4).setFloat32(0, t, !1), Nb = (e, t) => jb(e, 8).setFloat64(0, t, !1), Pb = (e, t) => jb(e, 8).setBigInt64(0, t, !1), Fb = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(4)), Ib = (e) => (Fb.setFloat32(0, e), Fb.getFloat32(0) === e), Lb = (e, t) => {
		switch (typeof t) {
			case "string":
				xb(e, 119), Ob(e, t);
				break;
			case "number":
				eb(t) && Gy(t) <= 2147483647 ? (xb(e, 125), Cb(e, t)) : Ib(t) ? (xb(e, 124), Mb(e, t)) : (xb(e, 123), Nb(e, t));
				break;
			case "bigint":
				xb(e, 122), Pb(e, t);
				break;
			case "object":
				if (t === null) xb(e, 126);
				else if (zy(t)) {
					xb(e, 117), V(e, t.length);
					for (let n = 0; n < t.length; n++) Lb(e, t[n]);
				} else if (t instanceof Uint8Array) xb(e, 116), Ab(e, t);
				else {
					xb(e, 118);
					let n = Object.keys(t);
					V(e, n.length);
					for (let r = 0; r < n.length; r++) {
						let i = n[r];
						Ob(e, i), Lb(e, t[i]);
					}
				}
				break;
			case "boolean":
				xb(e, t ? 120 : 121);
				break;
			default: xb(e, 127);
		}
	}, Rb = class extends hb {
		constructor(e) {
			super(), this.w = e, this.s = null, this.count = 0;
		}
		write(e) {
			this.s === e ? this.count++ : (this.count > 0 && V(this, this.count - 1), this.count = 1, this.w(this, e), this.s = e);
		}
	}, zb = (e) => {
		e.count > 0 && (Cb(e.encoder, e.count === 1 ? e.s : -e.s), e.count > 1 && V(e.encoder, e.count - 2));
	}, Bb = class {
		constructor() {
			this.encoder = new hb(), this.s = 0, this.count = 0;
		}
		write(e) {
			this.s === e ? this.count++ : (zb(this), this.count = 1, this.s = e);
		}
		toUint8Array() {
			return zb(this), yb(this.encoder);
		}
	}, Vb = (e) => {
		if (e.count > 0) {
			let t = e.diff * 2 + (e.count === 1 ? 0 : 1);
			Cb(e.encoder, t), e.count > 1 && V(e.encoder, e.count - 2);
		}
	}, Hb = class {
		constructor() {
			this.encoder = new hb(), this.s = 0, this.count = 0, this.diff = 0;
		}
		write(e) {
			this.diff === e - this.s ? (this.s = e, this.count++) : (Vb(this), this.count = 1, this.diff = e - this.s, this.s = e);
		}
		toUint8Array() {
			return Vb(this), yb(this.encoder);
		}
	}, Ub = class {
		constructor() {
			this.sarr = [], this.s = "", this.lensE = new Bb();
		}
		write(e) {
			this.s += e, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(e.length);
		}
		toUint8Array() {
			let e = new hb();
			return this.sarr.push(this.s), this.s = "", Ob(e, this.sarr.join("")), kb(e, this.lensE.toUint8Array()), yb(e);
		}
	};
})), Gb, Kb, H, qb = e((() => {
	Gb = (e) => Error(e), Kb = () => {
		throw Gb("Method unimplemented");
	}, H = () => {
		throw Gb("Unexpected case");
	};
})), Jb, Yb, Xb, Zb, Qb, $b, ex, tx, nx, rx, U, ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx, yx = e((() => {
	Zy(), Yy(), tb(), mb(), qb(), Jb = Gb("Unexpected end of array"), Yb = Gb("Integer out of Range"), Xb = (e, t, n) => {
		if (t < 0 || n < 0 || t + n > e.length) throw Jb;
		return new Uint8Array(e.buffer, e.byteOffset + t, n);
	}, Zb = (e, t, n) => {
		if (t < 0 || n < 0 || t + n > e.length) throw Jb;
		return new DataView(e.buffer, e.byteOffset + t, n);
	}, Qb = class {
		constructor(e) {
			this.arr = e, this.pos = 0;
		}
	}, $b = (e) => new Qb(e), ex = (e) => e.pos !== e.arr.length, tx = (e, t) => {
		let n = Xb(e.arr, e.pos, t);
		return e.pos += t, n;
	}, nx = (e) => tx(e, U(e)), rx = (e) => e.arr[e.pos++], U = (e) => {
		let t = 0, n = 1, r = e.arr.length;
		for (; e.pos < r;) {
			let r = e.arr[e.pos++];
			if (t += (r & 127) * n, n *= 128, r < 128) return t;
			/* c8 ignore start */
			if (t > Qy) throw Yb;
		}
		throw Jb;
	}, ix = (e) => {
		let t = e.arr[e.pos++], n = t & 63, r = 64, i = (t & 64) > 0 ? -1 : 1;
		if (!(t & 128)) return i * n;
		let a = e.arr.length;
		for (; e.pos < a;) {
			if (t = e.arr[e.pos++], n += (t & 127) * r, r *= 128, t < 128) return i * n;
			/* c8 ignore start */
			if (n > Qy) throw Yb;
		}
		throw Jb;
	}, ax = (e) => {
		let t = U(e);
		if (t === 0) return "";
		{
			let n = String.fromCodePoint(rx(e));
			if (--t < 100) for (; t--;) n += String.fromCodePoint(rx(e));
			else for (; t > 0;) {
				let r = t < 1e4 ? t : 1e4, i = e.arr.subarray(e.pos, e.pos + r);
				e.pos += r, n += String.fromCodePoint.apply(null, i), t -= r;
			}
			return decodeURIComponent(escape(n));
		}
	}, ox = (e) => fb.decode(nx(e)), sx = fb ? ox : ax, cx = (e) => {
		let t = e.pos, n = sx(e);
		return e.pos = t, n;
	}, lx = (e, t) => {
		let n = Zb(e.arr, e.pos, t);
		return e.pos += t, n;
	}, ux = (e) => lx(e, 4).getFloat32(0, !1), dx = (e) => lx(e, 8).getFloat64(0, !1), fx = (e) => lx(e, 8).getBigInt64(0, !1), px = [
		(e) => void 0,
		(e) => null,
		ix,
		ux,
		dx,
		fx,
		(e) => !1,
		(e) => !0,
		sx,
		(e) => {
			let t = U(e), n = {};
			for (let r = 0; r < t; r++) {
				let t = sx(e);
				n[t] = mx(e);
			}
			return n;
		},
		(e) => {
			let t = U(e), n = [];
			for (let r = 0; r < t; r++) n.push(mx(e));
			return n;
		},
		nx
	], mx = (e) => px[127 - rx(e)](e), hx = class extends Qb {
		constructor(e, t) {
			super(e), this.reader = t, this.s = null, this.count = 0;
		}
		read() {
			return this.count === 0 && (this.s = this.reader(this), this.count = ex(this) ? U(this) + 1 : -1), this.count--, this.s;
		}
	}, gx = class extends Qb {
		constructor(e) {
			super(e), this.s = 0, this.count = 0;
		}
		read() {
			if (this.count === 0) {
				this.s = ix(this);
				let e = Jy(this.s);
				this.count = 1, e && (this.s = -this.s, this.count = U(this) + 2);
			}
			return this.count--, this.s;
		}
	}, _x = class extends Qb {
		constructor(e) {
			super(e), this.s = 0, this.count = 0, this.diff = 0;
		}
		read() {
			if (this.count === 0) {
				let e = ix(this), t = e & 1;
				this.diff = Wy(e / 2), this.count = 1, t && (this.count = U(this) + 2);
			}
			return this.s += this.diff, this.count--, this.s;
		}
	}, vx = class {
		constructor(e) {
			this.decoder = new gx(e), this.str = sx(this.decoder), this.spos = 0;
		}
		read() {
			let e = this.spos + this.decoder.read(), t = this.str.slice(this.spos, e);
			return this.spos = e, t;
		}
	};
})), bx, xx = e((() => {
	crypto.subtle, bx = crypto.getRandomValues.bind(crypto);
})), Sx, Cx, wx, Tx, Ex, Dx = e((() => {
	Yy(), xx(), Sx = Math.random, Cx = () => bx(/* @__PURE__ */ new Uint32Array(1))[0], wx = (e) => e[Wy(Sx() * e.length)], Tx = "10000000-1000-4000-8000-100000000000", Ex = () => Tx.replace(/[018]/g, (e) => (e ^ Cx() & 15 >> e / 4).toString(16));
})), Ox, kx = e((() => {
	Ox = Date.now;
})), Ax, jx = e((() => {
	Ax = (e) => new Promise(e), Promise.all.bind(Promise);
})), Mx, Nx = e((() => {
	Mx = (e) => e === void 0 ? null : e;
})), Px, Fx, Ix, Lx = e((() => {
	Px = class {
		constructor() {
			this.map = /* @__PURE__ */ new Map();
		}
		setItem(e, t) {
			this.map.set(e, t);
		}
		getItem(e) {
			return this.map.get(e);
		}
	}, Fx = new Px();
	/* c8 ignore start */
	try {
		typeof localStorage < "u" && localStorage && (Fx = localStorage);
	} catch {}
	Ix = Fx;
})), Rx, zx, Bx = e((() => {
	Rx = Symbol("Equality"), zx = (e, t) => e === t || !!e?.[Rx]?.(t) || !1;
})), Vx, Hx, Ux, Wx, Gx, Kx, qx, Jx, Yx, Xx, Zx, Qx = e((() => {
	Bx(), Vx = (e) => typeof e == "object", Hx = Object.assign, Ux = Object.keys, Wx = (e, t) => {
		for (let n in e) t(e[n], n);
	}, Gx = (e) => Ux(e).length, Kx = (e) => {
		for (let t in e) return !1;
		return !0;
	}, qx = (e, t) => {
		for (let n in e) if (!t(e[n], n)) return !1;
		return !0;
	}, Jx = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Yx = (e, t) => e === t || Gx(e) === Gx(t) && qx(e, (e, n) => (e !== void 0 || Jx(t, n)) && zx(t[n], e)), Xx = Object.freeze, Zx = (e) => {
		for (let t in e) {
			let n = e[t];
			(typeof n == "object" || typeof n == "function") && Zx(e[t]);
		}
		return Xx(e);
	};
})), $x, eS, tS, nS, rS = e((() => {
	Qx(), Bx(), $x = (e, t, n = 0) => {
		try {
			for (; n < e.length; n++) e[n](...t);
		} finally {
			n < e.length && $x(e, t, n + 1);
		}
	}, eS = (e) => e, tS = (e, t) => {
		if (e === t) return !0;
		if (e == null || t == null || e.constructor !== t.constructor && (e.constructor || Object) !== (t.constructor || Object)) return !1;
		if (e[Rx] != null) return e[Rx](t);
		switch (e.constructor) {
			case ArrayBuffer: e = new Uint8Array(e), t = new Uint8Array(t);
			case Uint8Array:
				if (e.byteLength !== t.byteLength) return !1;
				for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
				break;
			case Set:
				if (e.size !== t.size) return !1;
				for (let n of e) if (!t.has(n)) return !1;
				break;
			case Map:
				if (e.size !== t.size) return !1;
				for (let n of e.keys()) if (!t.has(n) || !tS(e.get(n), t.get(n))) return !1;
				break;
			case void 0:
			case Object:
				if (Gx(e) !== Gx(t)) return !1;
				for (let n in e) if (!Jx(e, n) || !tS(e[n], t[n])) return !1;
				break;
			case Array:
				if (e.length !== t.length) return !1;
				for (let n = 0; n < e.length; n++) if (!tS(e[n], t[n])) return !1;
				break;
			default: return !1;
		}
		return !0;
	}, nS = (e, t) => t.includes(e);
})), iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS = e((() => {
	Ay(), mb(), Nx(), Lx(), rS(), iS = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", aS = typeof window < "u" && typeof document < "u" && !iS, typeof navigator < "u" && /Mac/.test(navigator.platform), sS = [], cS = () => {
		if (oS === void 0) {
			if (iS) {
				oS = Ty();
				let e = process.argv, t = null;
				for (let n = 0; n < e.length; n++) {
					let r = e[n];
					r[0] === "-" ? (t !== null && oS.set(t, ""), t = r) : t === null ? sS.push(r) : (oS.set(t, r), t = null);
				}
				t !== null && oS.set(t, "");
			} else typeof location == "object" ? (oS = Ty(), (location.search || "?").slice(1).split("&").forEach((e) => {
				if (e.length !== 0) {
					let [t, n] = e.split("=");
					oS.set(`--${sb(t, "-")}`, n), oS.set(`-${sb(t, "-")}`, n);
				}
			})) : oS = Ty();
		}
		return oS;
	}, lS = (e) => cS().has(e), uS = (e) => Mx(iS ? process.env[e.toUpperCase().replaceAll("-", "_")] : Ix.getItem(e)), dS = (e) => lS("--" + e) || uS(e) !== null, fS = dS("production"), pS = iS && nS(process.env.FORCE_COLOR, [
		"true",
		"1",
		"2"
	]), mS = pS || !lS("--no-colors") && !dS("no-color") && (!iS || process.stdout.isTTY) && (!iS || lS("--color") || uS("COLORTERM") !== null || (uS("TERM") || "").includes("color"));
})), gS, _S, vS, yS, bS, xS, SS = e((() => {
	mb(), hS(), Wb(), gS = (e) => new Uint8Array(e), _S = (e) => {
		let t = "";
		for (let n = 0; n < e.byteLength; n++) t += nb(e[n]);
		return btoa(t);
	}, vS = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), yS = aS ? _S : vS, bS = (e) => {
		let t = gS(e.byteLength);
		return t.set(e), t;
	}, xS = (e) => _b((t) => Lb(t, e));
})), CS, wS, TS = e((() => {
	CS = class {
		constructor(e, t) {
			this.left = e, this.right = t;
		}
	}, wS = (e, t) => new CS(e, t);
})), ES, DS, OS, kS, AS, jS, MS, NS = e((() => {
	mb(), Yy(), ES = (e) => e.next() >= .5, DS = (e, t, n) => Wy(e.next() * (n + 1 - t) + t), OS = (e, t, n) => Wy(e.next() * (n + 1 - t) + t), kS = (e, t, n) => OS(e, t, n), AS = (e) => nb(kS(e, 97, 122)), jS = (e, t = 0, n = 20) => {
		let r = kS(e, t, n), i = "";
		for (let t = 0; t < r; t++) i += AS(e);
		return i;
	}, MS = (e, t) => t[kS(e, 0, t.length - 1)];
})), PS, FS, IS, LS, RS, W, zS, BS, VS, HS, US, WS, GS, KS, qS, JS, YS, XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC, SC, CC, wC, TC, EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC, BC, VC, HC = e((() => {
	Qx(), By(), qb(), hS(), Bx(), rS(), mb(), NS(), tb(), PS = Symbol("0schema"), FS = class {
		constructor() {
			this._rerrs = [];
		}
		extend(e, t, n, r = null) {
			this._rerrs.push({
				path: e,
				expected: t,
				has: n,
				message: r
			});
		}
		toString() {
			let e = [];
			for (let t = this._rerrs.length - 1; t > 0; t--) {
				let n = this._rerrs[t];
				/* c8 ignore next */
				e.push(pb(" ", (this._rerrs.length - t) * 2) + `${n.path == null ? "" : `[${n.path}] `}${n.has} doesn't match ${n.expected}. ${n.message}`);
			}
			return e.join("\n");
		}
	}, IS = (e, t) => e === t ? !0 : e == null || t == null || e.constructor !== t.constructor ? !1 : e[Rx] ? zx(e, t) : zy(e) ? Iy(e, (e) => Ly(t, (t) => IS(e, t))) : Vx(e) ? qx(e, (e, n) => IS(e, t[n])) : !1, LS = class {
		static _dilutes = !1;
		extends(e) {
			let [t, n] = [this.shape, e.shape];
			return this.constructor._dilutes && ([n, t] = [t, n]), IS(t, n);
		}
		equals(e) {
			return this.constructor === e.constructor && tS(this.shape, e.shape);
		}
		[PS]() {
			return !0;
		}
		[Rx](e) {
			return this.equals(e);
		}
		validate(e) {
			return this.check(e);
		}
		/* c8 ignore start */
		check(e, t) {
			Kb();
		}
		/* c8 ignore stop */
		get nullable() {
			return vC(this, NC);
		}
		get optional() {
			return new JS(this);
		}
		cast(e) {
			return LC(e, this), e;
		}
		expect(e) {
			return LC(e, this), e;
		}
	}, RS = class extends LS {
		constructor(e, t) {
			super(), this.shape = e, this._c = t;
		}
		check(e, t = void 0) {
			let n = e?.constructor === this.shape && (this._c == null || this._c(e));
			return !n && t?.extend(null, this.shape.name, e?.constructor.name, e?.constructor === this.shape ? "Check failed" : "Constructor match failed"), n;
		}
	}, W = (e, t = null) => new RS(e, t), W(RS), zS = class extends LS {
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			let n = this.shape(e);
			return !n && t?.extend(null, "custom prop", e?.constructor.name, "failed to check custom prop"), n;
		}
	}, BS = (e) => new zS(e), W(zS), VS = class extends LS {
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			let n = this.shape.some((t) => t === e);
			return !n && t?.extend(null, this.shape.join(" | "), e.toString()), n;
		}
	}, HS = (...e) => new VS(e), US = W(VS), WS = RegExp.escape || ((e) => e.replace(/[().|&,$^[\]]/g, (e) => "\\" + e)), GS = (e) => {
		if (OC.check(e)) return [WS(e)];
		if (US.check(e)) return e.shape.map((e) => e + "");
		if (DC.check(e)) return ["[+-]?\\d+.?\\d*"];
		if (kC.check(e)) return [".*"];
		if (yC.check(e)) return e.shape.map(GS).flat(1);
		/* c8 ignore next 2 */
		H();
	}, KS = class extends LS {
		constructor(e) {
			super(), this.shape = e, this._r = RegExp("^" + e.map(GS).map((e) => `(${e.join("|")})`).join("") + "$");
		}
		check(e, t) {
			let n = this._r.exec(e) != null;
			return !n && t?.extend(null, this._r.toString(), e.toString(), "String doesn't match string template."), n;
		}
	}, W(KS), qS = Symbol("optional"), JS = class extends LS {
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			let n = e === void 0 || this.shape.check(e);
			return !n && t?.extend(null, "undefined (optional)", "()"), n;
		}
		get [qS]() {
			return !0;
		}
	}, YS = W(JS), XS = class extends LS {
		check(e, t) {
			return t?.extend(null, "never", typeof e), !1;
		}
	}, new XS(), W(XS), ZS = class e extends LS {
		constructor(e, t = !1) {
			super(), this.shape = e, this._isPartial = t;
		}
		static _dilutes = !0;
		get partial() {
			return new e(this.shape, !0);
		}
		check(e, t) {
			return e == null ? 
			/* c8 ignore next */
			(t?.extend(null, "object", "null"), !1) : qx(this.shape, (n, r) => {
				let i = this._isPartial && !Jx(e, r) || n.check(e[r], t);
				return !i && t?.extend(r.toString(), n.toString(), typeof e[r], "Object property does not match"), i;
			});
		}
	}, QS = (e) => new ZS(e), $S = W(ZS), eC = BS((e) => e != null && (e.constructor === Object || e.constructor == null)), tC = class extends LS {
		constructor(e, t) {
			super(), this.shape = {
				keys: e,
				values: t
			};
		}
		check(e, t) {
			return e != null && qx(e, (n, r) => {
				let i = this.shape.keys.check(r, t);
				return !i && t?.extend(r + "", "Record", typeof e, i ? "Key doesn't match schema" : "Value doesn't match value"), i && this.shape.values.check(n, t);
			});
		}
	}, nC = (e, t) => new tC(e, t), rC = W(tC), iC = class extends LS {
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			return e != null && qx(this.shape, (n, r) => {
				let i = n.check(e[r], t);
				return !i && t?.extend(r.toString(), "Tuple", typeof n), i;
			});
		}
	}, aC = (...e) => new iC(e), W(iC), oC = class extends LS {
		constructor(e) {
			super(), this.shape = e.length === 1 ? e[0] : new _C(e);
		}
		check(e, t) {
			let n = zy(e) && Iy(e, (e) => this.shape.check(e));
			return !n && t?.extend(null, "Array", ""), n;
		}
	}, sC = (...e) => new oC(e), cC = W(oC), lC = BS((e) => zy(e)), uC = class extends LS {
		constructor(e, t) {
			super(), this.shape = e, this._c = t;
		}
		check(e, t) {
			let n = e instanceof this.shape && (this._c == null || this._c(e));
			return !n && t?.extend(null, this.shape.name, e?.constructor.name), n;
		}
	}, dC = (e, t = null) => new uC(e, t), W(uC), fC = dC(LS), pC = class extends LS {
		constructor(e) {
			super(), this.len = e.length - 1, this.args = aC(...e.slice(-1)), this.res = e[this.len];
		}
		check(e, t) {
			let n = e.constructor === Function && e.length <= this.len;
			return !n && t?.extend(null, "function", typeof e), n;
		}
	}, mC = W(pC), hC = BS((e) => typeof e == "function"), gC = class extends LS {
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			let n = Iy(this.shape, (n) => n.check(e, t));
			return !n && t?.extend(null, "Intersectinon", typeof e), n;
		}
	}, W(gC, (e) => e.shape.length > 0), _C = class extends LS {
		static _dilutes = !0;
		constructor(e) {
			super(), this.shape = e;
		}
		check(e, t) {
			let n = Ly(this.shape, (n) => n.check(e, t));
			return t?.extend(null, "Union", typeof e), n;
		}
	}, vC = (...e) => e.findIndex((e) => yC.check(e)) >= 0 ? vC(...e.map((e) => IC(e)).map((e) => yC.check(e) ? e.shape : [e]).flat(1)) : e.length === 1 ? e[0] : new _C(e), yC = W(_C), bC = () => !0, xC = BS(bC), SC = W(zS, (e) => e.shape === bC), CC = BS((e) => typeof e == "bigint"), wC = BS((e) => e === CC), TC = BS((e) => typeof e == "symbol"), BS((e) => e === TC), EC = BS((e) => typeof e == "number"), DC = BS((e) => e === EC), OC = BS((e) => typeof e == "string"), kC = BS((e) => e === OC), AC = BS((e) => typeof e == "boolean"), jC = BS((e) => e === AC), MC = HS(void 0), W(VS, (e) => e.shape.length === 1 && e.shape[0] === void 0), HS(void 0), NC = HS(null), PC = W(VS, (e) => e.shape.length === 1 && e.shape[0] === null), W(Uint8Array), W(RS, (e) => e.shape === Uint8Array), FC = vC(EC, OC, NC, MC, CC, AC, TC), (() => {
		let e = sC(xC), t = nC(OC, xC), n = vC(EC, OC, NC, AC, e, t);
		return e.shape = n, t.shape.values = n, n;
	})(), IC = (e) => {
		if (fC.check(e)) return e;
		if (eC.check(e)) {
			let t = {};
			for (let n in e) t[n] = IC(e[n]);
			return QS(t);
		}
		if (lC.check(e)) return vC(...e.map(IC));
		if (FC.check(e)) return HS(e);
		if (hC.check(e)) return W(e);
		/* c8 ignore next */
		H();
	}, LC = fS ? () => {} : (e, t) => {
		let n = new FS();
		if (!t.check(e, n)) throw Gb(`Expected value to be of type ${t.constructor.name}.\n${n.toString()}`);
	}, RC = class {
		constructor(e) {
			this.patterns = [], this.$state = e;
		}
		if(e, t) {
			return this.patterns.push({
				if: IC(e),
				h: t
			}), this;
		}
		else(e) {
			return this.if(xC, e);
		}
		done() {
			return (e, t) => {
				for (let n = 0; n < this.patterns.length; n++) {
					let r = this.patterns[n];
					if (r.if.check(e)) return r.h(e, t);
				}
				throw Gb("Unhandled pattern");
			};
		}
	}, zC = (e) => new RC(e), BC = zC(xC).if(DC, (e, t) => DS(t, $y, Qy)).if(kC, (e, t) => jS(t)).if(jC, (e, t) => ES(t)).if(wC, (e, t) => BigInt(DS(t, $y, Qy))).if(yC, (e, t) => VC(t, MS(t, e.shape))).if($S, (e, t) => {
		let n = {};
		for (let r in e.shape) {
			let i = e.shape[r];
			if (YS.check(i)) {
				if (ES(t)) continue;
				i = i.shape;
			}
			n[r] = BC(i, t);
		}
		return n;
	}).if(cC, (e, t) => {
		let n = [], r = OS(t, 0, 42);
		for (let i = 0; i < r; i++) n.push(VC(t, e.shape));
		return n;
	}).if(US, (e, t) => MS(t, e.shape)).if(PC, (e, t) => null).if(mC, (e, t) => {
		let n = VC(t, e.res);
		return () => n;
	}).if(SC, (e, t) => VC(t, MS(t, [
		EC,
		OC,
		NC,
		MC,
		CC,
		AC,
		sC(EC),
		nC(vC("a", "b", "c"), EC)
	]))).if(rC, (e, t) => {
		let n = {}, r = DS(t, 0, 3);
		for (let i = 0; i < r; i++) {
			let r = VC(t, e.shape.keys);
			n[r] = VC(t, e.shape.values);
		}
		return n;
	}).done(), VC = (e, t) => BC(IC(t), e);
})), UC, WC, GC, KC, qC, JC, YC = e((() => {
	Ay(), HC(), UC = typeof document < "u" ? document : {}, BS((e) => e.nodeType === JC), typeof DOMParser < "u" && new DOMParser(), BS((e) => e.nodeType === GC), BS((e) => e.nodeType === KC), WC = (e) => Oy(e, (e, t) => `${t}:${e};`).join(""), GC = UC.ELEMENT_NODE, KC = UC.TEXT_NODE, UC.CDATA_SECTION_NODE, UC.COMMENT_NODE, qC = UC.DOCUMENT_NODE, UC.DOCUMENT_TYPE_NODE, JC = UC.DOCUMENT_FRAGMENT_NODE, BS((e) => e.nodeType === qC);
})), XC, ZC, QC, $C = e((() => {
	XC = (e) => class {
		constructor(e) {
			this._ = e;
		}
		destroy() {
			e(this._);
		}
	}, ZC = XC(clearTimeout), QC = (e, t) => new ZC(setTimeout(t, e)), XC(clearInterval), XC((e) => typeof requestAnimationFrame < "u" && cancelAnimationFrame(e)), XC((e) => typeof cancelIdleCallback < "u" && cancelIdleCallback(e));
})), ew, tw = e((() => {
	ew = Symbol;
})), nw, rw, iw, aw, ow, sw, cw, lw, uw, dw, fw = e((() => {
	tw(), kx(), nw = ew(), rw = ew(), iw = ew(), aw = ew(), ow = ew(), sw = ew(), cw = ew(), lw = ew(), uw = ew(), dw = (e) => {
		e.length === 1 && e[0]?.constructor === Function && (e = e[0]());
		let t = [], n = [], r = 0;
		for (; r < e.length; r++) {
			let n = e[r];
			if (n === void 0) break;
			if (n.constructor === String || n.constructor === Number) t.push(n);
			else if (n.constructor === Object) break;
		}
		for (r > 0 && n.push(t.join("")); r < e.length; r++) {
			let t = e[r];
			t instanceof Symbol || n.push(t);
		}
		return n;
	}, Ox();
})), pw, mw, hw, gw, _w, vw, yw = e((() => {
	hS(), My(), TS(), YC(), Ay(), fw(), pw = {
		[nw]: wS("font-weight", "bold"),
		[rw]: wS("font-weight", "normal"),
		[iw]: wS("color", "blue"),
		[ow]: wS("color", "green"),
		[aw]: wS("color", "grey"),
		[sw]: wS("color", "red"),
		[cw]: wS("color", "purple"),
		[lw]: wS("color", "orange"),
		[uw]: wS("color", "black")
	}, mw = (e) => {
		e.length === 1 && e[0]?.constructor === Function && (e = e[0]());
		let t = [], n = [], r = Ty(), i = [], a = 0;
		for (; a < e.length; a++) {
			let i = e[a], o = pw[i];
			if (o !== void 0) r.set(o.left, o.right);
			else {
				if (i === void 0) break;
				if (i.constructor === String || i.constructor === Number) {
					let e = WC(r);
					a > 0 || e.length > 0 ? (t.push("%c" + i), n.push(e)) : t.push(i);
				} else break;
			}
		}
		for (a > 0 && (i = n, i.unshift(t.join(""))); a < e.length; a++) {
			let t = e[a];
			t instanceof Symbol || i.push(t);
		}
		return i;
	}, hw = mS ? mw : dw, gw = (...e) => {
		/* c8 ignore next */
		console.log(...hw(e)), vw.forEach((t) => t.print(e));
	}, _w = (...e) => {
		console.warn(...hw(e)), e.unshift(lw), vw.forEach((t) => t.print(e));
	}, vw = jy();
})), bw, xw, Sw, Cw = e((() => {
	bw = (e) => ({
		[Symbol.iterator]() {
			return this;
		},
		next: e
	}), xw = (e, t) => bw(() => {
		let n;
		do
			n = e.next();
		while (!n.done && !t(n.value));
		return n;
	}), Sw = (e, t) => bw(() => {
		let { done: n, value: r } = e.next();
		return {
			done: n,
			value: n ? void 0 : t(r)
		};
	});
}));
// node_modules/yjs/dist/yjs.mjs
function* ww(e) {
	let t = U(e.restDecoder);
	for (let n = 0; n < t; n++) {
		let t = U(e.restDecoder), n = e.readClient(), r = U(e.restDecoder);
		for (let i = 0; i < t; i++) {
			let t = e.readInfo();
			if (t === 10) {
				let t = U(e.restDecoder);
				yield new uO(G(n, r), t), r += t;
			} else if (31 & t) {
				let i = !(t & 192), a = new X(G(n, r), null, (t & 128) == 128 ? e.readLeftID() : null, null, (t & 64) == 64 ? e.readRightID() : null, i ? e.readParentInfo() ? e.readString() : e.readLeftID() : null, i && (t & 32) == 32 ? e.readString() : null, sO(e, t));
				yield a, r += a.length;
			} else {
				let t = e.readLen();
				yield new DD(G(n, r), t), r += t;
			}
		}
	}
}
var Tw, Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw, Fw, Iw, Lw, Rw, zw, Bw, Vw, Hw, Uw, Ww, Gw, Kw, qw, Jw, Yw, Xw, Zw, Qw, $w, eT, tT, nT, rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, G, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT, AT, jT, MT, NT, PT, FT, IT, K, LT, RT, zT, BT, VT, HT, UT, WT, GT, KT, qT, JT, YT, XT, ZT, QT, q, $T, eE, tE, nE, rE, iE, aE, oE, sE, cE, lE, uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, J, DE, OE, kE, AE, jE, ME, NE, PE, FE, IE, LE, RE, zE, BE, VE, HE, UE, WE, GE, KE, qE, JE, YE, XE, ZE, QE, $E, eD, tD, nD, rD, iD, aD, oD, sD, cD, lD, uD, dD, fD, pD, mD, hD, gD, _D, vD, Y, yD, bD, xD, SD, CD, wD, TD, ED, DD, OD, kD, AD, jD, MD, ND, PD, FD, ID, LD, RD, zD, BD, VD, HD, UD, WD, GD, KD, qD, JD, YD, XD, ZD, QD, $D, eO, tO, nO, rO, iO, aO, oO, X, sO, cO, lO, uO, dO, fO, pO = e((() => {
	Uy(), By(), Yy(), Ay(), Wb(), yx(), Dx(), jx(), SS(), qb(), Zy(), rS(), My(), yw(), kx(), Cw(), Qx(), hS(), Tw = class {
		constructor(e, t) {
			this.clock = e, this.len = t;
		}
	}, Ew = class {
		constructor() {
			this.clients = /* @__PURE__ */ new Map();
		}
	}, Dw = (e, t, n) => t.clients.forEach((t, r) => {
		let i = e.doc.store.clients.get(r);
		if (i != null) {
			let r = i[i.length - 1], a = r.id.clock + r.length;
			for (let r = 0, o = t[r]; r < t.length && o.clock < a; o = t[++r]) GT(e, i, o.clock, o.len, n);
		}
	}), Ow = (e, t) => {
		let n = 0, r = e.length - 1;
		for (; n <= r;) {
			let i = Wy((n + r) / 2), a = e[i], o = a.clock;
			if (o <= t) {
				if (t < o + a.len) return i;
				n = i + 1;
			} else r = i - 1;
		}
		return null;
	}, kw = (e, t) => {
		let n = e.clients.get(t.client);
		return n !== void 0 && Ow(n, t.clock) !== null;
	}, Aw = (e) => {
		e.clients.forEach((e) => {
			e.sort((e, t) => e.clock - t.clock);
			let t, n;
			for (t = 1, n = 1; t < e.length; t++) {
				let r = e[n - 1], i = e[t];
				r.clock + r.len >= i.clock ? e[n - 1] = new Tw(r.clock, qy(r.len, i.clock + i.len - r.clock)) : (n < t && (e[n] = i), n++);
			}
			e.length = n;
		});
	}, jw = (e) => {
		let t = new Ew();
		for (let n = 0; n < e.length; n++) e[n].clients.forEach((r, i) => {
			if (!t.clients.has(i)) {
				let a = r.slice();
				for (let t = n + 1; t < e.length; t++) Py(a, e[t].clients.get(i) || []);
				t.clients.set(i, a);
			}
		});
		return Aw(t), t;
	}, Mw = (e, t, n, r) => {
		Dy(e.clients, t, () => []).push(new Tw(n, r));
	}, Nw = () => new Ew(), Pw = (e) => {
		let t = Nw();
		return e.clients.forEach((e, n) => {
			let r = [];
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (n.deleted) {
					let i = n.id.clock, a = n.length;
					if (t + 1 < e.length) for (let n = e[t + 1]; t + 1 < e.length && n.deleted; n = e[++t + 1]) a += n.length;
					r.push(new Tw(i, a));
				}
			}
			r.length > 0 && t.clients.set(n, r);
		}), t;
	}, Fw = (e, t) => {
		V(e.restEncoder, t.clients.size), Fy(t.clients.entries()).sort((e, t) => t[0] - e[0]).forEach(([t, n]) => {
			e.resetDsCurVal(), V(e.restEncoder, t);
			let r = n.length;
			V(e.restEncoder, r);
			for (let t = 0; t < r; t++) {
				let r = n[t];
				e.writeDsClock(r.clock), e.writeDsLen(r.len);
			}
		});
	}, Iw = (e) => {
		let t = new Ew(), n = U(e.restDecoder);
		for (let r = 0; r < n; r++) {
			e.resetDsCurVal();
			let n = U(e.restDecoder), r = U(e.restDecoder);
			if (r > 0) {
				let i = Dy(t.clients, n, () => []);
				for (let t = 0; t < r; t++) i.push(new Tw(e.readDsClock(), e.readDsLen()));
			}
		}
		return t;
	}, Lw = (e, t, n) => {
		let r = new Ew(), i = U(e.restDecoder);
		for (let a = 0; a < i; a++) {
			e.resetDsCurVal();
			let i = U(e.restDecoder), a = U(e.restDecoder), o = n.clients.get(i) || [], s = K(n, i);
			for (let n = 0; n < a; n++) {
				let n = e.readDsClock(), a = n + e.readDsLen();
				if (n < s) {
					s < a && Mw(r, i, s, a - s);
					let e = RT(o, n), c = o[e];
					for (!c.deleted && c.id.clock < n && (o.splice(e + 1, 0, iO(t, c, n - c.id.clock)), e++); e < o.length && (c = o[e++], c.id.clock < a);) c.deleted || (a < c.id.clock + c.length && o.splice(e, 0, iO(t, c, a - c.id.clock)), c.delete(t));
				} else Mw(r, i, n, a - n);
			}
		}
		if (r.clients.size > 0) {
			let e = new qw();
			return V(e.restEncoder, 0), Fw(e, r), e.toUint8Array();
		}
		return null;
	}, Rw = Cx, zw = class e extends Vy {
		constructor({ guid: e = Ex(), collectionid: t = null, gc: n = !0, gcFilter: r = () => !0, meta: i = null, autoLoad: a = !1, shouldLoad: o = !0 } = {}) {
			super(), this.gc = n, this.gcFilter = r, this.clientID = Rw(), this.guid = e, this.collectionid = t, this.share = /* @__PURE__ */ new Map(), this.store = new FT(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = o, this.autoLoad = a, this.meta = i, this.isLoaded = !1, this.isSynced = !1, this.isDestroyed = !1, this.whenLoaded = Ax((e) => {
				this.on("load", () => {
					this.isLoaded = !0, e(this);
				});
			});
			let s = () => Ax((e) => {
				let t = (n) => {
					(n === void 0 || n === !0) && (this.off("sync", t), e());
				};
				this.on("sync", t);
			});
			this.on("sync", (e) => {
				e === !1 && this.isSynced && (this.whenSynced = s()), this.isSynced = e === void 0 || e === !0, this.isSynced && !this.isLoaded && this.emit("load", [this]);
			}), this.whenSynced = s();
		}
		load() {
			let e = this._item;
			e !== null && !this.shouldLoad && q(e.parent.doc, (e) => {
				e.subdocsLoaded.add(this);
			}, null, !0), this.shouldLoad = !0;
		}
		getSubdocs() {
			return this.subdocs;
		}
		getSubdocGuids() {
			return new Set(Fy(this.subdocs).map((e) => e.guid));
		}
		transact(e, t = null) {
			return q(this, e, t);
		}
		get(e, t = J) {
			let n = Dy(this.share, e, () => {
				let e = new t();
				return e._integrate(this, null), e;
			}), r = n.constructor;
			if (t !== J && r !== t) {
				if (r === J) {
					let r = new t();
					r._map = n._map, n._map.forEach((e) => {
						for (; e !== null; e = e.left) e.parent = r;
					}), r._start = n._start;
					for (let e = r._start; e !== null; e = e.right) e.parent = r;
					return r._length = n._length, this.share.set(e, r), r._integrate(this, null), r;
				}
				throw Error(`Type with the name ${e} has already been defined with a different constructor`);
			}
			return n;
		}
		getArray(e = "") {
			return this.get(e, qE);
		}
		getText(e = "") {
			return this.get(e, mD);
		}
		getMap(e = "") {
			return this.get(e, XE);
		}
		getXmlElement(e = "") {
			return this.get(e, Y);
		}
		getXmlFragment(e = "") {
			return this.get(e, _D);
		}
		toJSON() {
			let e = {};
			return this.share.forEach((t, n) => {
				e[n] = t.toJSON();
			}), e;
		}
		destroy() {
			this.isDestroyed = !0, Fy(this.subdocs).forEach((e) => e.destroy());
			let t = this._item;
			if (t !== null) {
				this._item = null;
				let n = t.content;
				n.doc = new e({
					guid: this.guid,
					...n.opts,
					shouldLoad: !1
				}), n.doc._item = t, q(t.parent.doc, (e) => {
					let r = n.doc;
					t.deleted || e.subdocsAdded.add(r), e.subdocsRemoved.add(this);
				}, null, !0);
			}
			this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
		}
	}, Bw = class {
		constructor(e) {
			this.restDecoder = e;
		}
		resetDsCurVal() {}
		readDsClock() {
			return U(this.restDecoder);
		}
		readDsLen() {
			return U(this.restDecoder);
		}
	}, Vw = class extends Bw {
		readLeftID() {
			return G(U(this.restDecoder), U(this.restDecoder));
		}
		readRightID() {
			return G(U(this.restDecoder), U(this.restDecoder));
		}
		readClient() {
			return U(this.restDecoder);
		}
		readInfo() {
			return rx(this.restDecoder);
		}
		readString() {
			return sx(this.restDecoder);
		}
		readParentInfo() {
			return U(this.restDecoder) === 1;
		}
		readTypeRef() {
			return U(this.restDecoder);
		}
		readLen() {
			return U(this.restDecoder);
		}
		readAny() {
			return mx(this.restDecoder);
		}
		readBuf() {
			return bS(nx(this.restDecoder));
		}
		readJSON() {
			return JSON.parse(sx(this.restDecoder));
		}
		readKey() {
			return sx(this.restDecoder);
		}
	}, Hw = class {
		constructor(e) {
			this.dsCurrVal = 0, this.restDecoder = e;
		}
		resetDsCurVal() {
			this.dsCurrVal = 0;
		}
		readDsClock() {
			return this.dsCurrVal += U(this.restDecoder), this.dsCurrVal;
		}
		readDsLen() {
			let e = U(this.restDecoder) + 1;
			return this.dsCurrVal += e, e;
		}
	}, Uw = class extends Hw {
		constructor(e) {
			super(e), this.keys = [], U(e), this.keyClockDecoder = new _x(nx(e)), this.clientDecoder = new gx(nx(e)), this.leftClockDecoder = new _x(nx(e)), this.rightClockDecoder = new _x(nx(e)), this.infoDecoder = new hx(nx(e), rx), this.stringDecoder = new vx(nx(e)), this.parentInfoDecoder = new hx(nx(e), rx), this.typeRefDecoder = new gx(nx(e)), this.lenDecoder = new gx(nx(e));
		}
		readLeftID() {
			return new gT(this.clientDecoder.read(), this.leftClockDecoder.read());
		}
		readRightID() {
			return new gT(this.clientDecoder.read(), this.rightClockDecoder.read());
		}
		readClient() {
			return this.clientDecoder.read();
		}
		readInfo() {
			return this.infoDecoder.read();
		}
		readString() {
			return this.stringDecoder.read();
		}
		readParentInfo() {
			return this.parentInfoDecoder.read() === 1;
		}
		readTypeRef() {
			return this.typeRefDecoder.read();
		}
		readLen() {
			return this.lenDecoder.read();
		}
		readAny() {
			return mx(this.restDecoder);
		}
		readBuf() {
			return nx(this.restDecoder);
		}
		readJSON() {
			return mx(this.restDecoder);
		}
		readKey() {
			let e = this.keyClockDecoder.read();
			if (e < this.keys.length) return this.keys[e];
			{
				let e = this.stringDecoder.read();
				return this.keys.push(e), e;
			}
		}
	}, Ww = class {
		constructor() {
			this.restEncoder = gb();
		}
		toUint8Array() {
			return yb(this.restEncoder);
		}
		resetDsCurVal() {}
		writeDsClock(e) {
			V(this.restEncoder, e);
		}
		writeDsLen(e) {
			V(this.restEncoder, e);
		}
	}, Gw = class extends Ww {
		writeLeftID(e) {
			V(this.restEncoder, e.client), V(this.restEncoder, e.clock);
		}
		writeRightID(e) {
			V(this.restEncoder, e.client), V(this.restEncoder, e.clock);
		}
		writeClient(e) {
			V(this.restEncoder, e);
		}
		writeInfo(e) {
			Sb(this.restEncoder, e);
		}
		writeString(e) {
			Ob(this.restEncoder, e);
		}
		writeParentInfo(e) {
			V(this.restEncoder, +!!e);
		}
		writeTypeRef(e) {
			V(this.restEncoder, e);
		}
		writeLen(e) {
			V(this.restEncoder, e);
		}
		writeAny(e) {
			Lb(this.restEncoder, e);
		}
		writeBuf(e) {
			Ab(this.restEncoder, e);
		}
		writeJSON(e) {
			Ob(this.restEncoder, JSON.stringify(e));
		}
		writeKey(e) {
			Ob(this.restEncoder, e);
		}
	}, Kw = class {
		constructor() {
			this.restEncoder = gb(), this.dsCurrVal = 0;
		}
		toUint8Array() {
			return yb(this.restEncoder);
		}
		resetDsCurVal() {
			this.dsCurrVal = 0;
		}
		writeDsClock(e) {
			let t = e - this.dsCurrVal;
			this.dsCurrVal = e, V(this.restEncoder, t);
		}
		writeDsLen(e) {
			e === 0 && H(), V(this.restEncoder, e - 1), this.dsCurrVal += e;
		}
	}, qw = class extends Kw {
		constructor() {
			super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new Hb(), this.clientEncoder = new Bb(), this.leftClockEncoder = new Hb(), this.rightClockEncoder = new Hb(), this.infoEncoder = new Rb(Sb), this.stringEncoder = new Ub(), this.parentInfoEncoder = new Rb(Sb), this.typeRefEncoder = new Bb(), this.lenEncoder = new Bb();
		}
		toUint8Array() {
			let e = gb();
			return V(e, 0), Ab(e, this.keyClockEncoder.toUint8Array()), Ab(e, this.clientEncoder.toUint8Array()), Ab(e, this.leftClockEncoder.toUint8Array()), Ab(e, this.rightClockEncoder.toUint8Array()), Ab(e, yb(this.infoEncoder)), Ab(e, this.stringEncoder.toUint8Array()), Ab(e, yb(this.parentInfoEncoder)), Ab(e, this.typeRefEncoder.toUint8Array()), Ab(e, this.lenEncoder.toUint8Array()), kb(e, yb(this.restEncoder)), yb(e);
		}
		writeLeftID(e) {
			this.clientEncoder.write(e.client), this.leftClockEncoder.write(e.clock);
		}
		writeRightID(e) {
			this.clientEncoder.write(e.client), this.rightClockEncoder.write(e.clock);
		}
		writeClient(e) {
			this.clientEncoder.write(e);
		}
		writeInfo(e) {
			this.infoEncoder.write(e);
		}
		writeString(e) {
			this.stringEncoder.write(e);
		}
		writeParentInfo(e) {
			this.parentInfoEncoder.write(+!!e);
		}
		writeTypeRef(e) {
			this.typeRefEncoder.write(e);
		}
		writeLen(e) {
			this.lenEncoder.write(e);
		}
		writeAny(e) {
			Lb(this.restEncoder, e);
		}
		writeBuf(e) {
			Ab(this.restEncoder, e);
		}
		writeJSON(e) {
			Lb(this.restEncoder, e);
		}
		writeKey(e) {
			let t = this.keyMap.get(e);
			t === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(e)) : this.keyClockEncoder.write(t);
		}
	}, Jw = (e, t, n, r) => {
		r = qy(r, t[0].id.clock);
		let i = RT(t, r);
		V(e.restEncoder, t.length - i), e.writeClient(n), V(e.restEncoder, r);
		let a = t[i];
		a.write(e, r - a.id.clock);
		for (let n = i + 1; n < t.length; n++) t[n].write(e, 0);
	}, Yw = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		n.forEach((e, n) => {
			K(t, n) > e && r.set(n, e);
		}), IT(t).forEach((e, t) => {
			n.has(t) || r.set(t, 0);
		}), V(e.restEncoder, r.size), Fy(r.entries()).sort((e, t) => t[0] - e[0]).forEach(([n, r]) => {
			Jw(e, t.clients.get(n), n, r);
		});
	}, Xw = (e, t) => {
		let n = Ty(), r = U(e.restDecoder);
		for (let i = 0; i < r; i++) {
			let r = U(e.restDecoder), i = Array(r), a = e.readClient(), o = U(e.restDecoder);
			n.set(a, {
				i: 0,
				refs: i
			});
			for (let n = 0; n < r; n++) {
				let r = e.readInfo();
				switch (31 & r) {
					case 0: {
						let t = e.readLen();
						i[n] = new DD(G(a, o), t), o += t;
						break;
					}
					case 10: {
						let t = U(e.restDecoder);
						i[n] = new uO(G(a, o), t), o += t;
						break;
					}
					default: {
						let s = !(r & 192), c = new X(G(a, o), null, (r & 128) == 128 ? e.readLeftID() : null, null, (r & 64) == 64 ? e.readRightID() : null, s ? e.readParentInfo() ? t.get(e.readString()) : e.readLeftID() : null, s && (r & 32) == 32 ? e.readString() : null, sO(e, r));
						i[n] = c, o += c.length;
					}
				}
			}
		}
		return n;
	}, Zw = (e, t, n) => {
		let r = [], i = Fy(n.keys()).sort((e, t) => e - t);
		if (i.length === 0) return null;
		let a = () => {
			if (i.length === 0) return null;
			let e = n.get(i[i.length - 1]);
			for (; e.refs.length === e.i;) if (i.pop(), i.length > 0) e = n.get(i[i.length - 1]);
			else return null;
			return e;
		}, o = a();
		if (o === null) return null;
		let s = new FT(), c = /* @__PURE__ */ new Map(), l = (e, t) => {
			let n = c.get(e);
			(n == null || n > t) && c.set(e, t);
		}, u = o.refs[o.i++], d = /* @__PURE__ */ new Map(), f = () => {
			for (let e of r) {
				let t = e.id.client, r = n.get(t);
				r ? (r.i--, s.clients.set(t, r.refs.slice(r.i)), n.delete(t), r.i = 0, r.refs = []) : s.clients.set(t, [e]), i = i.filter((e) => e !== t);
			}
			r.length = 0;
		};
		for (;;) {
			if (u.constructor !== uO) {
				let i = Dy(d, u.id.client, () => K(t, u.id.client)) - u.id.clock;
				if (i < 0) r.push(u), l(u.id.client, u.id.clock - 1), f();
				else {
					let a = u.getMissing(e, t);
					if (a !== null) {
						r.push(u);
						let e = n.get(a) || {
							refs: [],
							i: 0
						};
						if (e.refs.length === e.i) l(a, K(t, a)), f();
						else {
							u = e.refs[e.i++];
							continue;
						}
					} else (i === 0 || i < u.length) && (u.integrate(e, i), d.set(u.id.client, u.id.clock + u.length));
				}
			}
			if (r.length > 0) u = r.pop();
			else if (o !== null && o.i < o.refs.length) u = o.refs[o.i++];
			else {
				if (o = a(), o === null) break;
				u = o.refs[o.i++];
			}
		}
		if (s.clients.size > 0) {
			let e = new qw();
			return Yw(e, s, /* @__PURE__ */ new Map()), V(e.restEncoder, 0), {
				missing: c,
				update: e.toUint8Array()
			};
		}
		return null;
	}, Qw = (e, t) => Yw(e, t.doc.store, t.beforeState), $w = (e, t, n, r = new Uw(e)) => q(t, (e) => {
		e.local = !1;
		let t = !1, n = e.doc, i = n.store, a = Xw(r, n), o = Zw(e, i, a), s = i.pendingStructs;
		if (s) {
			for (let [e, n] of s.missing) if (n < K(i, e)) {
				t = !0;
				break;
			}
			if (o) {
				for (let [e, t] of o.missing) {
					let n = s.missing.get(e);
					(n == null || n > t) && s.missing.set(e, t);
				}
				s.update = sE([s.update, o.update]);
			}
		} else i.pendingStructs = o;
		let c = Lw(r, e, i);
		if (i.pendingDs) {
			let t = new Uw($b(i.pendingDs));
			U(t.restDecoder);
			let n = Lw(t, e, i);
			i.pendingDs = c && n ? sE([c, n]) : c || n;
		} else i.pendingDs = c;
		if (t) {
			let t = i.pendingStructs.update;
			i.pendingStructs = null, eT(e.doc, t);
		}
	}, n, !1), eT = (e, t, n, r = Uw) => {
		let i = $b(t);
		$w(i, e, n, new r(i));
	}, tT = (e, t, n) => eT(e, t, n, Vw), nT = (e, t, n = /* @__PURE__ */ new Map()) => {
		Yw(e, t.store, n), Fw(e, Pw(t.store));
	}, rT = (e, t = new Uint8Array([0]), n = new qw()) => {
		let r = oT(t);
		nT(n, e, r);
		let i = [n.toUint8Array()];
		if (e.store.pendingDs && i.push(e.store.pendingDs), e.store.pendingStructs && i.push(cE(e.store.pendingStructs.update, t)), i.length > 1) {
			if (n.constructor === Gw) return aE(i.map((e, t) => t === 0 ? e : pE(e)));
			if (n.constructor === qw) return sE(i);
		}
		return i[0];
	}, iT = (e, t) => rT(e, t, new Gw()), aT = (e) => {
		let t = /* @__PURE__ */ new Map(), n = U(e.restDecoder);
		for (let r = 0; r < n; r++) {
			let n = U(e.restDecoder), r = U(e.restDecoder);
			t.set(n, r);
		}
		return t;
	}, oT = (e) => aT(new Bw($b(e))), sT = (e, t) => (V(e.restEncoder, t.size), Fy(t.entries()).sort((e, t) => t[0] - e[0]).forEach(([t, n]) => {
		V(e.restEncoder, t), V(e.restEncoder, n);
	}), e), cT = (e, t) => sT(e, IT(t.store)), lT = (e, t = new Kw()) => (e instanceof Map ? sT(t, e) : cT(t, e), t.toUint8Array()), uT = (e) => lT(e, new Ww()), dT = class {
		constructor() {
			this.l = [];
		}
	}, fT = () => new dT(), pT = (e, t) => e.l.push(t), mT = (e, t) => {
		let n = e.l, r = n.length;
		e.l = n.filter((e) => t !== e), r === e.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
	}, hT = (e, t, n) => $x(e.l, [t, n]), gT = class {
		constructor(e, t) {
			this.client = e, this.clock = t;
		}
	}, _T = (e, t) => e === t || e !== null && t !== null && e.client === t.client && e.clock === t.clock, G = (e, t) => new gT(e, t), vT = (e) => {
		for (let [t, n] of e.doc.share.entries()) if (n === e) return t;
		throw H();
	}, yT = (e, t) => {
		for (; t !== null;) {
			if (t.parent === e) return !0;
			t = t.parent._item;
		}
		return !1;
	}, bT = class {
		constructor(e, t, n, r = 0) {
			this.type = e, this.tname = t, this.item = n, this.assoc = r;
		}
	}, xT = (e) => new bT(e.type == null ? null : G(e.type.client, e.type.clock), e.tname ?? null, e.item == null ? null : G(e.item.client, e.item.clock), e.assoc == null ? 0 : e.assoc), ST = class {
		constructor(e, t, n = 0) {
			this.type = e, this.index = t, this.assoc = n;
		}
	}, CT = (e, t, n = 0) => new ST(e, t, n), wT = (e, t, n) => {
		let r = null, i = null;
		return e._item === null ? i = vT(e) : r = G(e._item.id.client, e._item.id.clock), new bT(r, i, t, n);
	}, TT = (e, t, n = 0) => {
		let r = e._start;
		if (n < 0) {
			if (t === 0) return wT(e, null, n);
			t--;
		}
		for (; r !== null;) {
			if (!r.deleted && r.countable) {
				if (r.length > t) return wT(e, G(r.id.client, r.id.clock + t), n);
				t -= r.length;
			}
			if (r.right === null && n < 0) return wT(e, r.lastId, n);
			r = r.right;
		}
		return wT(e, null, n);
	}, ET = (e, t) => {
		let n = BT(e, t);
		return {
			item: n,
			diff: t.clock - n.id.clock
		};
	}, DT = (e, t, n = !0) => {
		let r = t.store, i = e.item, a = e.type, o = e.tname, s = e.assoc, c = null, l = 0;
		if (i !== null) {
			if (K(r, i.client) <= i.clock) return null;
			let e = n ? nO(r, i) : ET(r, i), t = e.item;
			if (!(t instanceof X)) return null;
			if (c = t.parent, c._item === null || !c._item.deleted) {
				l = t.deleted || !t.countable ? 0 : e.diff + (s >= 0 ? 0 : 1);
				let n = t.left;
				for (; n !== null;) !n.deleted && n.countable && (l += n.length), n = n.left;
			}
		} else {
			if (o !== null) c = t.get(o);
			else if (a !== null) {
				if (K(r, a.client) <= a.clock) return null;
				let { item: e } = n ? nO(r, a) : { item: BT(r, a) };
				if (e instanceof X && e.content instanceof eO) c = e.content.type;
				else return null;
			} else throw H();
			l = s >= 0 ? c._length : 0;
		}
		return CT(c, l, e.assoc);
	}, OT = (e, t) => e === t || e !== null && t !== null && e.tname === t.tname && _T(e.item, t.item) && _T(e.type, t.type) && e.assoc === t.assoc, kT = class {
		constructor(e, t) {
			this.ds = e, this.sv = t;
		}
	}, AT = (e, t) => new kT(e, t), jT = AT(Nw(), /* @__PURE__ */ new Map()), MT = (e) => AT(Pw(e.store), IT(e.store)), NT = (e, t) => t === void 0 ? !e.deleted : t.sv.has(e.id.client) && (t.sv.get(e.id.client) || 0) > e.id.clock && !kw(t.ds, e.id), PT = (e, t) => {
		let n = Dy(e.meta, PT, jy), r = e.doc.store;
		n.has(t) || (t.sv.forEach((t, n) => {
			t < K(r, n) && HT(e, G(n, t));
		}), Dw(e, t.ds, (e) => {}), n.add(t));
	}, FT = class {
		constructor() {
			this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
		}
	}, IT = (e) => {
		let t = /* @__PURE__ */ new Map();
		return e.clients.forEach((e, n) => {
			let r = e[e.length - 1];
			t.set(n, r.id.clock + r.length);
		}), t;
	}, K = (e, t) => {
		let n = e.clients.get(t);
		if (n === void 0) return 0;
		let r = n[n.length - 1];
		return r.id.clock + r.length;
	}, LT = (e, t) => {
		let n = e.clients.get(t.id.client);
		if (n === void 0) n = [], e.clients.set(t.id.client, n);
		else {
			let e = n[n.length - 1];
			if (e.id.clock + e.length !== t.id.clock) throw H();
		}
		n.push(t);
	}, RT = (e, t) => {
		let n = 0, r = e.length - 1, i = e[r], a = i.id.clock;
		if (a === t) return r;
		let o = Wy(t / (a + i.length - 1) * r);
		for (; n <= r;) {
			if (i = e[o], a = i.id.clock, a <= t) {
				if (t < a + i.length) return o;
				n = o + 1;
			} else r = o - 1;
			o = Wy((n + r) / 2);
		}
		throw H();
	}, zT = (e, t) => {
		let n = e.clients.get(t.client);
		return n[RT(n, t.clock)];
	}, BT = zT, VT = (e, t, n) => {
		let r = RT(t, n), i = t[r];
		return i.id.clock < n && i instanceof X ? (t.splice(r + 1, 0, iO(e, i, n - i.id.clock)), r + 1) : r;
	}, HT = (e, t) => {
		let n = e.doc.store.clients.get(t.client);
		return n[VT(e, n, t.clock)];
	}, UT = (e, t, n) => {
		let r = t.clients.get(n.client), i = RT(r, n.clock), a = r[i];
		return n.clock !== a.id.clock + a.length - 1 && a.constructor !== DD && r.splice(i + 1, 0, iO(e, a, n.clock - a.id.clock + 1)), a;
	}, WT = (e, t, n) => {
		let r = e.clients.get(t.id.client);
		r[RT(r, t.id.clock)] = n;
	}, GT = (e, t, n, r, i) => {
		if (r === 0) return;
		let a = n + r, o = VT(e, t, n), s;
		do
			s = t[o++], a < s.id.clock + s.length && VT(e, t, a), i(s);
		while (o < t.length && t[o].id.clock < a);
	}, KT = class {
		constructor(e, t, n) {
			this.doc = e, this.deleteSet = new Ew(), this.beforeState = IT(e.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = t, this.meta = /* @__PURE__ */ new Map(), this.local = n, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set(), this._needFormattingCleanup = !1;
		}
	}, qT = (e, t) => t.deleteSet.clients.size === 0 && !ky(t.afterState, (e, n) => t.beforeState.get(n) !== e) ? !1 : (Aw(t.deleteSet), Qw(e, t), Fw(e, t.deleteSet), !0), JT = (e, t, n) => {
		let r = t._item;
		(r === null || r.id.clock < (e.beforeState.get(r.id.client) || 0) && !r.deleted) && Dy(e.changed, t, jy).add(n);
	}, YT = (e, t) => {
		let n = e[t], r = e[t - 1], i = t;
		for (; i > 0 && r.deleted === n.deleted && r.constructor === n.constructor && r.mergeWith(n); n = r, r = e[--i - 1]) n instanceof X && n.parentSub !== null && n.parent._map.get(n.parentSub) === n && n.parent._map.set(n.parentSub, r);
		let a = t - i;
		return a && e.splice(t + 1 - a, a), a;
	}, XT = (e, t, n) => {
		for (let [r, i] of e.clients.entries()) {
			let e = t.clients.get(r);
			for (let r = i.length - 1; r >= 0; r--) {
				let a = i[r], o = a.clock + a.len;
				for (let r = RT(e, a.clock), i = e[r]; r < e.length && i.id.clock < o; i = e[++r]) {
					let i = e[r];
					if (a.clock + a.len <= i.id.clock) break;
					i instanceof X && i.deleted && !i.keep && n(i) && i.gc(t, !1);
				}
			}
		}
	}, ZT = (e, t) => {
		e.clients.forEach((e, n) => {
			let r = t.clients.get(n);
			for (let t = e.length - 1; t >= 0; t--) {
				let n = e[t], i = Ky(r.length - 1, 1 + RT(r, n.clock + n.len - 1));
				for (let e = i, t = r[e]; e > 0 && t.id.clock >= n.clock; t = r[e]) e -= 1 + YT(r, e);
			}
		});
	}, QT = (e, t) => {
		if (t < e.length) {
			let n = e[t], r = n.doc, i = r.store, a = n.deleteSet, o = n._mergeStructs;
			try {
				Aw(a), n.afterState = IT(n.doc.store), r.emit("beforeObserverCalls", [n, r]);
				let e = [];
				n.changed.forEach((t, r) => e.push(() => {
					r._item !== null && r._item.deleted || r._callObserver(n, t);
				})), e.push(() => {
					n.changedParentTypes.forEach((t, r) => {
						r._dEH.l.length > 0 && (r._item === null || !r._item.deleted) && e.push(() => {
							t = t.filter((e) => e.target._item === null || !e.target._item.deleted), t.forEach((e) => {
								e.currentTarget = r, e._path = null;
							}), t.sort((e, t) => e.path.length - t.path.length), hT(r._dEH, t, n);
						});
					}), e.push(() => r.emit("afterTransaction", [n, r])), e.push(() => {
						n._needFormattingCleanup && dD(n);
					});
				}), $x(e, []);
			} finally {
				r.gc && XT(a, i, r.gcFilter), ZT(a, i), n.afterState.forEach((e, t) => {
					let r = n.beforeState.get(t) || 0;
					if (r !== e) {
						let e = i.clients.get(t), n = qy(RT(e, r), 1);
						for (let t = e.length - 1; t >= n;) t -= 1 + YT(e, t);
					}
				});
				for (let e = o.length - 1; e >= 0; e--) {
					let { client: t, clock: n } = o[e].id, r = i.clients.get(t), a = RT(r, n);
					a + 1 < r.length && YT(r, a + 1) > 1 || a > 0 && YT(r, a);
				}
				if (!n.local && n.afterState.get(r.clientID) !== n.beforeState.get(r.clientID) && (gw(lw, nw, "[yjs] ", rw, sw, "Changed the client-id because another client seems to be using it."), r.clientID = Rw()), r.emit("afterTransactionCleanup", [n, r]), r._observers.has("update")) {
					let e = new Gw();
					qT(e, n) && r.emit("update", [
						e.toUint8Array(),
						n.origin,
						r,
						n
					]);
				}
				if (r._observers.has("updateV2")) {
					let e = new qw();
					qT(e, n) && r.emit("updateV2", [
						e.toUint8Array(),
						n.origin,
						r,
						n
					]);
				}
				let { subdocsAdded: s, subdocsLoaded: c, subdocsRemoved: l } = n;
				(s.size > 0 || l.size > 0 || c.size > 0) && (s.forEach((e) => {
					e.clientID = r.clientID, e.collectionid ??= r.collectionid, r.subdocs.add(e);
				}), l.forEach((e) => r.subdocs.delete(e)), r.emit("subdocs", [
					{
						loaded: c,
						added: s,
						removed: l
					},
					r,
					n
				]), l.forEach((e) => e.destroy())), e.length <= t + 1 ? (r._transactionCleanups = [], r.emit("afterAllTransactions", [r, e])) : QT(e, t + 1);
			}
		}
	}, q = (e, t, n = null, r = !0) => {
		let i = e._transactionCleanups, a = !1, o = null;
		e._transaction === null && (a = !0, e._transaction = new KT(e, n, r), i.push(e._transaction), i.length === 1 && e.emit("beforeAllTransactions", [e]), e.emit("beforeTransaction", [e._transaction, e]));
		try {
			o = t(e._transaction);
		} finally {
			if (a) {
				let t = e._transaction === i[0];
				e._transaction = null, t && QT(i, 0);
			}
		}
		return o;
	}, $T = class {
		constructor(e, t) {
			this.insertions = t, this.deletions = e, this.meta = /* @__PURE__ */ new Map();
		}
	}, eE = (e, t, n) => {
		Dw(e, n.deletions, (n) => {
			n instanceof X && t.scope.some((t) => t === e.doc || yT(t, n)) && rO(n, !1);
		});
	}, tE = (e, t, n) => {
		let r = null, i = e.doc, a = e.scope;
		q(i, (n) => {
			for (; t.length > 0 && e.currStackItem === null;) {
				let r = i.store, o = t.pop(), s = /* @__PURE__ */ new Set(), c = [], l = !1;
				Dw(n, o.insertions, (e) => {
					if (e instanceof X) {
						if (e.redone !== null) {
							let { item: t, diff: i } = nO(r, e.id);
							i > 0 && (t = HT(n, G(t.id.client, t.id.clock + i))), e = t;
						}
						!e.deleted && a.some((t) => t === n.doc || yT(t, e)) && c.push(e);
					}
				}), Dw(n, o.deletions, (e) => {
					e instanceof X && a.some((t) => t === n.doc || yT(t, e)) && !kw(o.insertions, e.id) && s.add(e);
				}), s.forEach((t) => {
					l = oO(n, t, s, o.insertions, e.ignoreRemoteMapChanges, e) !== null || l;
				});
				for (let t = c.length - 1; t >= 0; t--) {
					let r = c[t];
					e.deleteFilter(r) && (r.delete(n), l = !0);
				}
				e.currStackItem = l ? o : null;
			}
			n.changed.forEach((e, t) => {
				e.has(null) && t._searchMarker && (t._searchMarker.length = 0);
			}), r = n;
		}, e);
		let o = e.currStackItem;
		if (o != null) {
			let t = r.changedParentTypes;
			e.emit("stack-item-popped", [{
				stackItem: o,
				type: n,
				changedParentTypes: t,
				origin: e
			}, e]), e.currStackItem = null;
		}
		return o;
	}, nE = class extends Vy {
		constructor(e, { captureTimeout: t = 500, captureTransaction: n = (e) => !0, deleteFilter: r = () => !0, trackedOrigins: i = /* @__PURE__ */ new Set([null]), ignoreRemoteMapChanges: a = !1, doc: o = zy(e) ? e[0].doc : e instanceof zw ? e : e.doc } = {}) {
			super(), this.scope = [], this.doc = o, this.addToScope(e), this.deleteFilter = r, i.add(this), this.trackedOrigins = i, this.captureTransaction = n, this.undoStack = [], this.redoStack = [], this.undoing = !1, this.redoing = !1, this.currStackItem = null, this.lastChange = 0, this.ignoreRemoteMapChanges = a, this.captureTimeout = t, this.afterTransactionHandler = (e) => {
				if (!this.captureTransaction(e) || !this.scope.some((t) => e.changedParentTypes.has(t) || t === this.doc) || !this.trackedOrigins.has(e.origin) && (!e.origin || !this.trackedOrigins.has(e.origin.constructor))) return;
				let t = this.undoing, n = this.redoing, r = t ? this.redoStack : this.undoStack;
				t ? this.stopCapturing() : n || this.clear(!1, !0);
				let i = new Ew();
				e.afterState.forEach((t, n) => {
					let r = e.beforeState.get(n) || 0, a = t - r;
					a > 0 && Mw(i, n, r, a);
				});
				let a = Ox(), o = !1;
				if (this.lastChange > 0 && a - this.lastChange < this.captureTimeout && r.length > 0 && !t && !n) {
					let t = r[r.length - 1];
					t.deletions = jw([t.deletions, e.deleteSet]), t.insertions = jw([t.insertions, i]);
				} else r.push(new $T(e.deleteSet, i)), o = !0;
				!t && !n && (this.lastChange = a), Dw(e, e.deleteSet, (t) => {
					t instanceof X && this.scope.some((n) => n === e.doc || yT(n, t)) && rO(t, !0);
				});
				let s = [{
					stackItem: r[r.length - 1],
					origin: e.origin,
					type: t ? "redo" : "undo",
					changedParentTypes: e.changedParentTypes
				}, this];
				o ? this.emit("stack-item-added", s) : this.emit("stack-item-updated", s);
			}, this.destroy = this.destroy.bind(this), this.doc.on("afterTransaction", this.afterTransactionHandler), this.doc.on("destroy", this.destroy);
		}
		addToScope(e) {
			let t = new Set(this.scope);
			e = zy(e) ? e : [e], e.forEach((e) => {
				t.has(e) || (t.add(e), (e instanceof J ? e.doc !== this.doc : e !== this.doc) && _w("[yjs#509] Not same Y.Doc"), this.scope.push(e));
			});
		}
		addTrackedOrigin(e) {
			this.trackedOrigins.add(e);
		}
		removeTrackedOrigin(e) {
			this.trackedOrigins.delete(e);
		}
		clear(e = !0, t = !0) {
			(e && this.canUndo() || t && this.canRedo()) && this.doc.transact((n) => {
				e && (this.undoStack.forEach((e) => eE(n, this, e)), this.undoStack = []), t && (this.redoStack.forEach((e) => eE(n, this, e)), this.redoStack = []), this.emit("stack-cleared", [{
					undoStackCleared: e,
					redoStackCleared: t
				}]);
			});
		}
		stopCapturing() {
			this.lastChange = 0;
		}
		undo() {
			this.undoing = !0;
			let e;
			try {
				e = tE(this, this.undoStack, "undo");
			} finally {
				this.undoing = !1;
			}
			return e;
		}
		redo() {
			this.redoing = !0;
			let e;
			try {
				e = tE(this, this.redoStack, "redo");
			} finally {
				this.redoing = !1;
			}
			return e;
		}
		canUndo() {
			return this.undoStack.length > 0;
		}
		canRedo() {
			return this.redoStack.length > 0;
		}
		destroy() {
			this.trackedOrigins.delete(this), this.doc.off("afterTransaction", this.afterTransactionHandler), this.doc.off("destroy", this.destroy), super.destroy();
		}
	}, rE = class {
		constructor(e, t) {
			this.gen = ww(e), this.curr = null, this.done = !1, this.filterSkips = t, this.next();
		}
		next() {
			do
				this.curr = this.gen.next().value || null;
			while (this.filterSkips && this.curr !== null && this.curr.constructor === uO);
			return this.curr;
		}
	}, iE = class {
		constructor(e) {
			this.currClient = 0, this.startClock = 0, this.written = 0, this.encoder = e, this.clientStructs = [];
		}
	}, aE = (e) => sE(e, Vw, Gw), oE = (e, t) => {
		if (e.constructor === DD) {
			let { client: n, clock: r } = e.id;
			return new DD(G(n, r + t), e.length - t);
		}
		if (e.constructor === uO) {
			let { client: n, clock: r } = e.id;
			return new uO(G(n, r + t), e.length - t);
		}
		{
			let n = e, { client: r, clock: i } = n.id;
			return new X(G(r, i + t), null, G(r, i + t - 1), null, n.rightOrigin, n.parent, n.parentSub, n.content.splice(t));
		}
	}, sE = (e, t = Uw, n = qw) => {
		if (e.length === 1) return e[0];
		let r = e.map((e) => new t($b(e))), i = r.map((e) => new rE(e, !0)), a = null, o = new n(), s = new iE(o);
		for (; i = i.filter((e) => e.curr !== null), i.sort((e, t) => {
			if (e.curr.id.client === t.curr.id.client) {
				let n = e.curr.id.clock - t.curr.id.clock;
				return n === 0 ? e.curr.constructor === t.curr.constructor ? 0 : e.curr.constructor === uO ? 1 : -1 : n;
			}
			return t.curr.id.client - e.curr.id.client;
		}), i.length !== 0;) {
			let e = i[0], t = e.curr.id.client;
			if (a !== null) {
				let n = e.curr, r = !1;
				for (; n !== null && n.id.clock + n.length <= a.struct.id.clock + a.struct.length && n.id.client >= a.struct.id.client;) n = e.next(), r = !0;
				if (n === null || n.id.client !== t || r && n.id.clock > a.struct.id.clock + a.struct.length) continue;
				if (t !== a.struct.id.client) uE(s, a.struct, a.offset), a = {
					struct: n,
					offset: 0
				}, e.next();
				else if (a.struct.id.clock + a.struct.length < n.id.clock) {
					if (a.struct.constructor === uO) a.struct.length = n.id.clock + n.length - a.struct.id.clock;
					else {
						uE(s, a.struct, a.offset);
						let e = n.id.clock - a.struct.id.clock - a.struct.length;
						a = {
							struct: new uO(G(t, a.struct.id.clock + a.struct.length), e),
							offset: 0
						};
					}
				} else {
					let t = a.struct.id.clock + a.struct.length - n.id.clock;
					t > 0 && (a.struct.constructor === uO ? a.struct.length -= t : n = oE(n, t)), a.struct.mergeWith(n) || (uE(s, a.struct, a.offset), a = {
						struct: n,
						offset: 0
					}, e.next());
				}
			} else a = {
				struct: e.curr,
				offset: 0
			}, e.next();
			for (let n = e.curr; n !== null && n.id.client === t && n.id.clock === a.struct.id.clock + a.struct.length && n.constructor !== uO; n = e.next()) uE(s, a.struct, a.offset), a = {
				struct: n,
				offset: 0
			};
		}
		a !== null && (uE(s, a.struct, a.offset), a = null), dE(s);
		let c = r.map((e) => Iw(e)), l = jw(c);
		return Fw(o, l), o.toUint8Array();
	}, cE = (e, t, n = Uw, r = qw) => {
		let i = oT(t), a = new r(), o = new iE(a), s = new n($b(e)), c = new rE(s, !1);
		for (; c.curr;) {
			let e = c.curr, t = e.id.client, n = i.get(t) || 0;
			if (c.curr.constructor === uO) c.next();
			else if (e.id.clock + e.length > n) for (uE(o, e, qy(n - e.id.clock, 0)), c.next(); c.curr && c.curr.id.client === t;) uE(o, c.curr, 0), c.next();
			else for (; c.curr && c.curr.id.client === t && c.curr.id.clock + c.curr.length <= n;) c.next();
		}
		dE(o);
		let l = Iw(s);
		return Fw(a, l), a.toUint8Array();
	}, lE = (e) => {
		e.written > 0 && (e.clientStructs.push({
			written: e.written,
			restEncoder: yb(e.encoder.restEncoder)
		}), e.encoder.restEncoder = gb(), e.written = 0);
	}, uE = (e, t, n) => {
		e.written > 0 && e.currClient !== t.id.client && lE(e), e.written === 0 && (e.currClient = t.id.client, e.encoder.writeClient(t.id.client), V(e.encoder.restEncoder, t.id.clock + n)), t.write(e.encoder, n), e.written++;
	}, dE = (e) => {
		lE(e);
		let t = e.encoder.restEncoder;
		V(t, e.clientStructs.length);
		for (let n = 0; n < e.clientStructs.length; n++) {
			let r = e.clientStructs[n];
			V(t, r.written), kb(t, r.restEncoder);
		}
	}, fE = (e, t, n, r) => {
		let i = new n($b(e)), a = new rE(i, !1), o = new r(), s = new iE(o);
		for (let e = a.curr; e !== null; e = a.next()) uE(s, t(e), 0);
		dE(s);
		let c = Iw(i);
		return Fw(o, c), o.toUint8Array();
	}, pE = (e) => fE(e, eS, Uw, Gw), mE = "You must not compute changes after the event-handler fired.", hE = class {
		constructor(e, t) {
			this.target = e, this.currentTarget = e, this.transaction = t, this._changes = null, this._keys = null, this._delta = null, this._path = null;
		}
		get path() {
			return this._path ||= gE(this.currentTarget, this.target);
		}
		deletes(e) {
			return kw(this.transaction.deleteSet, e.id);
		}
		get keys() {
			if (this._keys === null) {
				if (this.transaction.doc._transactionCleanups.length === 0) throw Gb(mE);
				let e = /* @__PURE__ */ new Map(), t = this.target;
				this.transaction.changed.get(t).forEach((n) => {
					if (n !== null) {
						let r = t._map.get(n), i, a;
						if (this.adds(r)) {
							let e = r.left;
							for (; e !== null && this.adds(e);) e = e.left;
							if (this.deletes(r)) {
								if (e !== null && this.deletes(e)) i = "delete", a = Ny(e.content.getContent());
								else return;
							} else e !== null && this.deletes(e) ? (i = "update", a = Ny(e.content.getContent())) : (i = "add", a = void 0);
						} else if (this.deletes(r)) i = "delete", a = Ny(r.content.getContent());
						else return;
						e.set(n, {
							action: i,
							oldValue: a
						});
					}
				}), this._keys = e;
			}
			return this._keys;
		}
		get delta() {
			return this.changes.delta;
		}
		adds(e) {
			return e.id.clock >= (this.transaction.beforeState.get(e.id.client) || 0);
		}
		get changes() {
			let e = this._changes;
			if (e === null) {
				if (this.transaction.doc._transactionCleanups.length === 0) throw Gb(mE);
				let t = this.target, n = jy(), r = jy(), i = [];
				if (e = {
					added: n,
					deleted: r,
					delta: i,
					keys: this.keys
				}, this.transaction.changed.get(t).has(null)) {
					let e = null, a = () => {
						e && i.push(e);
					};
					for (let i = t._start; i !== null; i = i.right) i.deleted ? this.deletes(i) && !this.adds(i) && ((e === null || e.delete === void 0) && (a(), e = { delete: 0 }), e.delete += i.length, r.add(i)) : this.adds(i) ? ((e === null || e.insert === void 0) && (a(), e = { insert: [] }), e.insert = e.insert.concat(i.content.getContent()), n.add(i)) : ((e === null || e.retain === void 0) && (a(), e = { retain: 0 }), e.retain += i.length);
					e !== null && e.retain === void 0 && a();
				}
				this._changes = e;
			}
			return e;
		}
	}, gE = (e, t) => {
		let n = [];
		for (; t._item !== null && t !== e;) {
			if (t._item.parentSub !== null) n.unshift(t._item.parentSub);
			else {
				let e = 0, r = t._item.parent._start;
				for (; r !== t._item && r !== null;) !r.deleted && r.countable && (e += r.length), r = r.right;
				n.unshift(e);
			}
			t = t._item.parent;
		}
		return n;
	}, _E = () => {
		_w("Invalid access: Add Yjs type to a document before reading data.");
	}, vE = 80, yE = 0, bE = class {
		constructor(e, t) {
			e.marker = !0, this.p = e, this.index = t, this.timestamp = yE++;
		}
	}, xE = (e) => {
		e.timestamp = yE++;
	}, SE = (e, t, n) => {
		e.p.marker = !1, e.p = t, t.marker = !0, e.index = n, e.timestamp = yE++;
	}, CE = (e, t, n) => {
		if (e.length >= vE) {
			let r = e.reduce((e, t) => e.timestamp < t.timestamp ? e : t);
			return SE(r, t, n), r;
		}
		{
			let r = new bE(t, n);
			return e.push(r), r;
		}
	}, wE = (e, t) => {
		if (e._start === null || t === 0 || e._searchMarker === null) return null;
		let n = e._searchMarker.length === 0 ? null : e._searchMarker.reduce((e, n) => Gy(t - e.index) < Gy(t - n.index) ? e : n), r = e._start, i = 0;
		for (n !== null && (r = n.p, i = n.index, xE(n)); r.right !== null && i < t;) {
			if (!r.deleted && r.countable) {
				if (t < i + r.length) break;
				i += r.length;
			}
			r = r.right;
		}
		for (; r.left !== null && i > t;) r = r.left, !r.deleted && r.countable && (i -= r.length);
		for (; r.left !== null && r.left.id.client === r.id.client && r.left.id.clock + r.left.length === r.id.clock;) r = r.left, !r.deleted && r.countable && (i -= r.length);
		return n !== null && Gy(n.index - i) < r.parent.length / vE ? (SE(n, r, i), n) : CE(e._searchMarker, r, i);
	}, TE = (e, t, n) => {
		for (let r = e.length - 1; r >= 0; r--) {
			let i = e[r];
			if (n > 0) {
				let t = i.p;
				for (t.marker = !1; t && (t.deleted || !t.countable);) t = t.left, t && !t.deleted && t.countable && (i.index -= t.length);
				if (t === null || t.marker === !0) {
					e.splice(r, 1);
					continue;
				}
				i.p = t, t.marker = !0;
			}
			(t < i.index || n > 0 && t === i.index) && (i.index = qy(t, i.index + n));
		}
	}, EE = (e, t, n) => {
		let r = e, i = t.changedParentTypes;
		for (; Dy(i, e, () => []).push(n), e._item !== null;) e = e._item.parent;
		hT(r._eH, n, t);
	}, J = class {
		constructor() {
			this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = fT(), this._dEH = fT(), this._searchMarker = null;
		}
		get parent() {
			return this._item ? this._item.parent : null;
		}
		_integrate(e, t) {
			this.doc = e, this._item = t;
		}
		_copy() {
			throw Kb();
		}
		clone() {
			throw Kb();
		}
		_write(e) {}
		get _first() {
			let e = this._start;
			for (; e !== null && e.deleted;) e = e.right;
			return e;
		}
		_callObserver(e, t) {
			!e.local && this._searchMarker && (this._searchMarker.length = 0);
		}
		observe(e) {
			pT(this._eH, e);
		}
		observeDeep(e) {
			pT(this._dEH, e);
		}
		unobserve(e) {
			mT(this._eH, e);
		}
		unobserveDeep(e) {
			mT(this._dEH, e);
		}
		toJSON() {}
	}, DE = (e, t, n) => {
		e.doc ?? _E(), t < 0 && (t = e._length + t), n < 0 && (n = e._length + n);
		let r = n - t, i = [], a = e._start;
		for (; a !== null && r > 0;) {
			if (a.countable && !a.deleted) {
				let e = a.content.getContent();
				if (e.length <= t) t -= e.length;
				else {
					for (let n = t; n < e.length && r > 0; n++) i.push(e[n]), r--;
					t = 0;
				}
			}
			a = a.right;
		}
		return i;
	}, OE = (e) => {
		e.doc ?? _E();
		let t = [], n = e._start;
		for (; n !== null;) {
			if (n.countable && !n.deleted) {
				let e = n.content.getContent();
				for (let n = 0; n < e.length; n++) t.push(e[n]);
			}
			n = n.right;
		}
		return t;
	}, kE = (e, t) => {
		let n = [], r = e._start;
		for (; r !== null;) {
			if (r.countable && NT(r, t)) {
				let e = r.content.getContent();
				for (let t = 0; t < e.length; t++) n.push(e[t]);
			}
			r = r.right;
		}
		return n;
	}, AE = (e, t) => {
		let n = 0, r = e._start;
		for (e.doc ?? _E(); r !== null;) {
			if (r.countable && !r.deleted) {
				let i = r.content.getContent();
				for (let r = 0; r < i.length; r++) t(i[r], n++, e);
			}
			r = r.right;
		}
	}, jE = (e, t) => {
		let n = [];
		return AE(e, (r, i) => {
			n.push(t(r, i, e));
		}), n;
	}, ME = (e) => {
		let t = e._start, n = null, r = 0;
		return {
			[Symbol.iterator]() {
				return this;
			},
			next: () => {
				if (n === null) {
					for (; t !== null && t.deleted;) t = t.right;
					if (t === null) return {
						done: !0,
						value: void 0
					};
					n = t.content.getContent(), r = 0, t = t.right;
				}
				let e = n[r++];
				return n.length <= r && (n = null), {
					done: !1,
					value: e
				};
			}
		};
	}, NE = (e, t) => {
		e.doc ?? _E();
		let n = wE(e, t), r = e._start;
		for (n !== null && (r = n.p, t -= n.index); r !== null; r = r.right) if (!r.deleted && r.countable) {
			if (t < r.length) return r.content.getContent()[t];
			t -= r.length;
		}
	}, PE = (e, t, n, r) => {
		let i = n, a = e.doc, o = a.clientID, s = a.store, c = n === null ? t._start : n.right, l = [], u = () => {
			l.length > 0 && (i = new X(G(o, K(s, o)), i, i && i.lastId, c, c && c.id, t, null, new HD(l)), i.integrate(e, 0), l = []);
		};
		r.forEach((n) => {
			if (n === null) l.push(n);
			else switch (n.constructor) {
				case Number:
				case Object:
				case Boolean:
				case Array:
				case String:
					l.push(n);
					break;
				default: switch (u(), n.constructor) {
					case Uint8Array:
					case ArrayBuffer:
						i = new X(G(o, K(s, o)), i, i && i.lastId, c, c && c.id, t, null, new OD(new Uint8Array(n))), i.integrate(e, 0);
						break;
					case zw:
						i = new X(G(o, K(s, o)), i, i && i.lastId, c, c && c.id, t, null, new ND(n)), i.integrate(e, 0);
						break;
					default: if (n instanceof J) i = new X(G(o, K(s, o)), i, i && i.lastId, c, c && c.id, t, null, new eO(n)), i.integrate(e, 0);
					else throw Error("Unexpected content type in insert operation");
				}
			}
		}), u();
	}, FE = () => Gb("Length exceeded!"), IE = (e, t, n, r) => {
		if (n > t._length) throw FE();
		if (n === 0) return t._searchMarker && TE(t._searchMarker, n, r.length), PE(e, t, null, r);
		let i = n, a = wE(t, n), o = t._start;
		for (a !== null && (o = a.p, n -= a.index, n === 0 && (o = o.prev, n += o && o.countable && !o.deleted ? o.length : 0)); o !== null; o = o.right) if (!o.deleted && o.countable) {
			if (n <= o.length) {
				n < o.length && HT(e, G(o.id.client, o.id.clock + n));
				break;
			}
			n -= o.length;
		}
		return t._searchMarker && TE(t._searchMarker, i, r.length), PE(e, t, o, r);
	}, LE = (e, t, n) => {
		let r = (t._searchMarker || []).reduce((e, t) => t.index > e.index ? t : e, {
			index: 0,
			p: t._start
		}).p;
		if (r) for (; r.right;) r = r.right;
		return PE(e, t, r, n);
	}, RE = (e, t, n, r) => {
		if (r === 0) return;
		let i = n, a = r, o = wE(t, n), s = t._start;
		for (o !== null && (s = o.p, n -= o.index); s !== null && n > 0; s = s.right) !s.deleted && s.countable && (n < s.length && HT(e, G(s.id.client, s.id.clock + n)), n -= s.length);
		for (; r > 0 && s !== null;) s.deleted || (r < s.length && HT(e, G(s.id.client, s.id.clock + r)), s.delete(e), r -= s.length), s = s.right;
		if (r > 0) throw FE();
		t._searchMarker && TE(t._searchMarker, i, -a + r);
	}, zE = (e, t, n) => {
		let r = t._map.get(n);
		r !== void 0 && r.delete(e);
	}, BE = (e, t, n, r) => {
		let i = t._map.get(n) || null, a = e.doc, o = a.clientID, s;
		if (r == null) s = new HD([r]);
		else switch (r.constructor) {
			case Number:
			case Object:
			case Boolean:
			case Array:
			case String:
			case Date:
			case BigInt:
				s = new HD([r]);
				break;
			case Uint8Array:
				s = new OD(r);
				break;
			case zw:
				s = new ND(r);
				break;
			default: if (r instanceof J) s = new eO(r);
			else throw Error("Unexpected content type");
		}
		new X(G(o, K(a.store, o)), i, i && i.lastId, null, null, t, n, s).integrate(e, 0);
	}, VE = (e, t) => {
		e.doc ?? _E();
		let n = e._map.get(t);
		return n !== void 0 && !n.deleted ? n.content.getContent()[n.length - 1] : void 0;
	}, HE = (e) => {
		let t = {};
		return e.doc ?? _E(), e._map.forEach((e, n) => {
			e.deleted || (t[n] = e.content.getContent()[e.length - 1]);
		}), t;
	}, UE = (e, t) => {
		e.doc ?? _E();
		let n = e._map.get(t);
		return n !== void 0 && !n.deleted;
	}, WE = (e, t) => {
		let n = {};
		return e._map.forEach((e, r) => {
			let i = e;
			for (; i !== null && (!t.sv.has(i.id.client) || i.id.clock >= (t.sv.get(i.id.client) || 0));) i = i.left;
			i !== null && NT(i, t) && (n[r] = i.content.getContent()[i.length - 1]);
		}), n;
	}, GE = (e) => (e.doc ?? _E(), xw(e._map.entries(), (e) => !e[1].deleted)), KE = class extends hE {}, qE = class e extends J {
		constructor() {
			super(), this._prelimContent = [], this._searchMarker = [];
		}
		static from(t) {
			let n = new e();
			return n.push(t), n;
		}
		_integrate(e, t) {
			super._integrate(e, t), this.insert(0, this._prelimContent), this._prelimContent = null;
		}
		_copy() {
			return new e();
		}
		clone() {
			let t = new e();
			return t.insert(0, this.toArray().map((e) => e instanceof J ? e.clone() : e)), t;
		}
		get length() {
			return this.doc ?? _E(), this._length;
		}
		_callObserver(e, t) {
			super._callObserver(e, t), EE(this, e, new KE(this, e));
		}
		insert(e, t) {
			this.doc === null ? this._prelimContent.splice(e, 0, ...t) : q(this.doc, (n) => {
				IE(n, this, e, t);
			});
		}
		push(e) {
			this.doc === null ? this._prelimContent.push(...e) : q(this.doc, (t) => {
				LE(t, this, e);
			});
		}
		unshift(e) {
			this.insert(0, e);
		}
		delete(e, t = 1) {
			this.doc === null ? this._prelimContent.splice(e, t) : q(this.doc, (n) => {
				RE(n, this, e, t);
			});
		}
		get(e) {
			return NE(this, e);
		}
		toArray() {
			return OE(this);
		}
		slice(e = 0, t = this.length) {
			return DE(this, e, t);
		}
		toJSON() {
			return this.map((e) => e instanceof J ? e.toJSON() : e);
		}
		map(e) {
			return jE(this, e);
		}
		forEach(e) {
			AE(this, e);
		}
		[Symbol.iterator]() {
			return ME(this);
		}
		_write(e) {
			e.writeTypeRef(qD);
		}
	}, JE = (e) => new qE(), YE = class extends hE {
		constructor(e, t, n) {
			super(e, t), this.keysChanged = n;
		}
	}, XE = class e extends J {
		constructor(e) {
			super(), this._prelimContent = null, this._prelimContent = e === void 0 ? /* @__PURE__ */ new Map() : new Map(e);
		}
		_integrate(e, t) {
			super._integrate(e, t), this._prelimContent.forEach((e, t) => {
				this.set(t, e);
			}), this._prelimContent = null;
		}
		_copy() {
			return new e();
		}
		clone() {
			let t = new e();
			return this.forEach((e, n) => {
				t.set(n, e instanceof J ? e.clone() : e);
			}), t;
		}
		_callObserver(e, t) {
			EE(this, e, new YE(this, e, t));
		}
		toJSON() {
			this.doc ?? _E();
			let e = {};
			return this._map.forEach((t, n) => {
				if (!t.deleted) {
					let r = t.content.getContent()[t.length - 1];
					e[n] = r instanceof J ? r.toJSON() : r;
				}
			}), e;
		}
		get size() {
			return [...GE(this)].length;
		}
		keys() {
			return Sw(GE(this), (e) => e[0]);
		}
		values() {
			return Sw(GE(this), (e) => e[1].content.getContent()[e[1].length - 1]);
		}
		entries() {
			return Sw(GE(this), (e) => [e[0], e[1].content.getContent()[e[1].length - 1]]);
		}
		forEach(e) {
			this.doc ?? _E(), this._map.forEach((t, n) => {
				t.deleted || e(t.content.getContent()[t.length - 1], n, this);
			});
		}
		[Symbol.iterator]() {
			return this.entries();
		}
		delete(e) {
			this.doc === null ? this._prelimContent.delete(e) : q(this.doc, (t) => {
				zE(t, this, e);
			});
		}
		set(e, t) {
			return this.doc === null ? this._prelimContent.set(e, t) : q(this.doc, (n) => {
				BE(n, this, e, t);
			}), t;
		}
		get(e) {
			return VE(this, e);
		}
		has(e) {
			return UE(this, e);
		}
		clear() {
			this.doc === null ? this._prelimContent.clear() : q(this.doc, (e) => {
				this.forEach(function(t, n, r) {
					zE(e, r, n);
				});
			});
		}
		_write(e) {
			e.writeTypeRef(JD);
		}
	}, ZE = (e) => new XE(), QE = (e, t) => e === t || typeof e == "object" && typeof t == "object" && e && t && Yx(e, t), $E = class {
		constructor(e, t, n, r) {
			this.left = e, this.right = t, this.index = n, this.currentAttributes = r;
		}
		forward() {
			switch (this.right === null && H(), this.right.content.constructor) {
				case LD:
					this.right.deleted || rD(this.currentAttributes, this.right.content);
					break;
				default: this.right.deleted || (this.index += this.right.length);
			}
			this.left = this.right, this.right = this.right.right;
		}
	}, eD = (e, t, n) => {
		for (; t.right !== null && n > 0;) {
			switch (t.right.content.constructor) {
				case LD:
					t.right.deleted || rD(t.currentAttributes, t.right.content);
					break;
				default: t.right.deleted || (n < t.right.length && HT(e, G(t.right.id.client, t.right.id.clock + n)), t.index += t.right.length, n -= t.right.length);
			}
			t.left = t.right, t.right = t.right.right;
		}
		return t;
	}, tD = (e, t, n, r) => {
		let i = /* @__PURE__ */ new Map(), a = r ? wE(t, n) : null;
		if (a) {
			let t = new $E(a.p.left, a.p, a.index, i);
			return eD(e, t, n - a.index);
		}
		{
			let r = new $E(null, t._start, 0, i);
			return eD(e, r, n);
		}
	}, nD = (e, t, n, r) => {
		for (; n.right !== null && (n.right.deleted === !0 || n.right.content.constructor === LD && QE(r.get(n.right.content.key), n.right.content.value));) n.right.deleted || r.delete(n.right.content.key), n.forward();
		let i = e.doc, a = i.clientID;
		r.forEach((r, o) => {
			let s = n.left, c = n.right, l = new X(G(a, K(i.store, a)), s, s && s.lastId, c, c && c.id, t, null, new LD(o, r));
			l.integrate(e, 0), n.right = l, n.forward();
		});
	}, rD = (e, t) => {
		let { key: n, value: r } = t;
		r === null ? e.delete(n) : e.set(n, r);
	}, iD = (e, t) => {
		for (; e.right !== null && (e.right.deleted || e.right.content.constructor === LD && QE(t[e.right.content.key] ?? null, e.right.content.value));) e.forward();
	}, aD = (e, t, n, r) => {
		let i = e.doc, a = i.clientID, o = /* @__PURE__ */ new Map();
		for (let s in r) {
			let c = r[s], l = n.currentAttributes.get(s) ?? null;
			if (!QE(l, c)) {
				o.set(s, l);
				let { left: r, right: u } = n;
				n.right = new X(G(a, K(i.store, a)), r, r && r.lastId, u, u && u.id, t, null, new LD(s, c)), n.right.integrate(e, 0), n.forward();
			}
		}
		return o;
	}, oD = (e, t, n, r, i) => {
		n.currentAttributes.forEach((e, t) => {
			i[t] === void 0 && (i[t] = null);
		});
		let a = e.doc, o = a.clientID;
		iD(n, i);
		let s = aD(e, t, n, i), c = r.constructor === String ? new WD(r) : r instanceof J ? new eO(r) : new FD(r), { left: l, right: u, index: d } = n;
		t._searchMarker && TE(t._searchMarker, n.index, c.getLength()), u = new X(G(o, K(a.store, o)), l, l && l.lastId, u, u && u.id, t, null, c), u.integrate(e, 0), n.right = u, n.index = d, n.forward(), nD(e, t, n, s);
	}, sD = (e, t, n, r, i) => {
		let a = e.doc, o = a.clientID;
		iD(n, i);
		let s = aD(e, t, n, i);
		iterationLoop: for (; n.right !== null && (r > 0 || s.size > 0 && (n.right.deleted || n.right.content.constructor === LD));) {
			if (!n.right.deleted) switch (n.right.content.constructor) {
				case LD: {
					let { key: t, value: a } = n.right.content, o = i[t];
					if (o !== void 0) {
						if (QE(o, a)) s.delete(t);
						else {
							if (r === 0) break iterationLoop;
							s.set(t, a);
						}
						n.right.delete(e);
					} else n.currentAttributes.set(t, a);
					break;
				}
				default: r < n.right.length && HT(e, G(n.right.id.client, n.right.id.clock + r)), r -= n.right.length;
			}
			n.forward();
		}
		if (r > 0) {
			let i = "";
			for (; r > 0; r--) i += "\n";
			n.right = new X(G(o, K(a.store, o)), n.left, n.left && n.left.lastId, n.right, n.right && n.right.id, t, null, new WD(i)), n.right.integrate(e, 0), n.forward();
		}
		nD(e, t, n, s);
	}, cD = (e, t, n, r, i) => {
		let a = t, o = Ty();
		for (; a && (!a.countable || a.deleted);) {
			if (!a.deleted && a.content.constructor === LD) {
				let e = a.content;
				o.set(e.key, e);
			}
			a = a.right;
		}
		let s = 0, c = !1;
		for (; t !== a;) {
			if (n === t && (c = !0), !t.deleted) {
				let n = t.content;
				switch (n.constructor) {
					case LD: {
						let { key: a, value: l } = n, u = r.get(a) ?? null;
						(o.get(a) !== n || u === l) && (t.delete(e), s++, !c && (i.get(a) ?? null) === l && u !== l && (u === null ? i.delete(a) : i.set(a, u))), !c && !t.deleted && rD(i, n);
						break;
					}
				}
			}
			t = t.right;
		}
		return s;
	}, lD = (e, t) => {
		for (; t && t.right && (t.right.deleted || !t.right.countable);) t = t.right;
		let n = /* @__PURE__ */ new Set();
		for (; t && (t.deleted || !t.countable);) {
			if (!t.deleted && t.content.constructor === LD) {
				let r = t.content.key;
				n.has(r) ? t.delete(e) : n.add(r);
			}
			t = t.left;
		}
	}, uD = (e) => {
		let t = 0;
		return q(e.doc, (n) => {
			let r = e._start, i = e._start, a = Ty(), o = Ey(a);
			for (; i;) {
				if (i.deleted === !1) switch (i.content.constructor) {
					case LD:
						rD(o, i.content);
						break;
					default: t += cD(n, r, i, a, o), a = Ey(o), r = i;
				}
				i = i.right;
			}
		}), t;
	}, dD = (e) => {
		let t = /* @__PURE__ */ new Set(), n = e.doc;
		for (let [r, i] of e.afterState.entries()) {
			let a = e.beforeState.get(r) || 0;
			i !== a && GT(e, n.store.clients.get(r), a, i, (e) => {
				!e.deleted && e.content.constructor === LD && e.constructor !== DD && t.add(e.parent);
			});
		}
		q(n, (n) => {
			Dw(e, e.deleteSet, (e) => {
				if (e instanceof DD || !e.parent._hasFormatting || t.has(e.parent)) return;
				let r = e.parent;
				e.content.constructor === LD ? t.add(r) : lD(n, e);
			});
			for (let e of t) uD(e);
		});
	}, fD = (e, t, n) => {
		let r = n, i = Ey(t.currentAttributes), a = t.right;
		for (; n > 0 && t.right !== null;) {
			if (t.right.deleted === !1) switch (t.right.content.constructor) {
				case eO:
				case FD:
				case WD: n < t.right.length && HT(e, G(t.right.id.client, t.right.id.clock + n)), n -= t.right.length, t.right.delete(e);
			}
			t.forward();
		}
		a && cD(e, a, t.right, i, t.currentAttributes);
		let o = (t.left || t.right).parent;
		return o._searchMarker && TE(o._searchMarker, t.index, -r + n), t;
	}, pD = class extends hE {
		constructor(e, t, n) {
			super(e, t), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), n.forEach((e) => {
				e === null ? this.childListChanged = !0 : this.keysChanged.add(e);
			});
		}
		get changes() {
			if (this._changes === null) {
				let e = {
					keys: this.keys,
					delta: this.delta,
					added: /* @__PURE__ */ new Set(),
					deleted: /* @__PURE__ */ new Set()
				};
				this._changes = e;
			}
			return this._changes;
		}
		get delta() {
			if (this._delta === null) {
				let e = this.target.doc, t = [];
				q(e, (e) => {
					let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = this.target._start, a = null, o = {}, s = "", c = 0, l = 0, u = () => {
						if (a !== null) {
							let e = null;
							switch (a) {
								case "delete":
									l > 0 && (e = { delete: l }), l = 0;
									break;
								case "insert":
									(typeof s == "object" || s.length > 0) && (e = { insert: s }, n.size > 0 && (e.attributes = {}, n.forEach((t, n) => {
										t !== null && (e.attributes[n] = t);
									}))), s = "";
									break;
								case "retain": c > 0 && (e = { retain: c }, Kx(o) || (e.attributes = Hx({}, o))), c = 0;
							}
							e && t.push(e), a = null;
						}
					};
					for (; i !== null;) {
						switch (i.content.constructor) {
							case eO:
							case FD:
								this.adds(i) ? this.deletes(i) || (u(), a = "insert", s = i.content.getContent()[0], u()) : this.deletes(i) ? (a !== "delete" && (u(), a = "delete"), l += 1) : i.deleted || (a !== "retain" && (u(), a = "retain"), c += 1);
								break;
							case WD:
								this.adds(i) ? this.deletes(i) || (a !== "insert" && (u(), a = "insert"), s += i.content.str) : this.deletes(i) ? (a !== "delete" && (u(), a = "delete"), l += i.length) : i.deleted || (a !== "retain" && (u(), a = "retain"), c += i.length);
								break;
							case LD: {
								let { key: t, value: s } = i.content;
								if (this.adds(i)) {
									if (!this.deletes(i)) {
										let c = n.get(t) ?? null;
										QE(c, s) ? s !== null && i.delete(e) : (a === "retain" && u(), QE(s, r.get(t) ?? null) ? delete o[t] : o[t] = s);
									}
								} else if (this.deletes(i)) {
									r.set(t, s);
									let e = n.get(t) ?? null;
									QE(e, s) || (a === "retain" && u(), o[t] = e);
								} else if (!i.deleted) {
									r.set(t, s);
									let n = o[t];
									n !== void 0 && (QE(n, s) ? n !== null && i.delete(e) : (a === "retain" && u(), s === null ? delete o[t] : o[t] = s));
								}
								i.deleted || (a === "insert" && u(), rD(n, i.content));
								break;
							}
						}
						i = i.right;
					}
					for (u(); t.length > 0;) {
						let e = t[t.length - 1];
						if (e.retain !== void 0 && e.attributes === void 0) t.pop();
						else break;
					}
				}), this._delta = t;
			}
			return this._delta;
		}
	}, mD = class e extends J {
		constructor(e) {
			super(), this._pending = e === void 0 ? [] : [() => this.insert(0, e)], this._searchMarker = [], this._hasFormatting = !1;
		}
		get length() {
			return this.doc ?? _E(), this._length;
		}
		_integrate(e, t) {
			super._integrate(e, t);
			try {
				this._pending.forEach((e) => e());
			} catch (e) {
				console.error(e);
			}
			this._pending = null;
		}
		_copy() {
			return new e();
		}
		clone() {
			let t = new e();
			return t.applyDelta(this.toDelta()), t;
		}
		_callObserver(e, t) {
			super._callObserver(e, t);
			let n = new pD(this, e, t);
			EE(this, e, n), !e.local && this._hasFormatting && (e._needFormattingCleanup = !0);
		}
		toString() {
			this.doc ?? _E();
			let e = "", t = this._start;
			for (; t !== null;) !t.deleted && t.countable && t.content.constructor === WD && (e += t.content.str), t = t.right;
			return e;
		}
		toJSON() {
			return this.toString();
		}
		applyDelta(e, { sanitize: t = !0 } = {}) {
			this.doc === null ? this._pending.push(() => this.applyDelta(e)) : q(this.doc, (n) => {
				let r = new $E(null, this._start, 0, /* @__PURE__ */ new Map());
				for (let i = 0; i < e.length; i++) {
					let a = e[i];
					if (a.insert !== void 0) {
						let o = !t && typeof a.insert == "string" && i === e.length - 1 && r.right === null && a.insert.slice(-1) === "\n" ? a.insert.slice(0, -1) : a.insert;
						(typeof o != "string" || o.length > 0) && oD(n, this, r, o, a.attributes || {});
					} else a.retain === void 0 ? a.delete !== void 0 && fD(n, r, a.delete) : sD(n, this, r, a.retain, a.attributes || {});
				}
			});
		}
		toDelta(e, t, n) {
			this.doc ?? _E();
			let r = [], i = /* @__PURE__ */ new Map(), a = this.doc, o = "", s = this._start;
			function c() {
				if (o.length > 0) {
					let e = {}, t = !1;
					i.forEach((n, r) => {
						t = !0, e[r] = n;
					});
					let n = { insert: o };
					t && (n.attributes = e), r.push(n), o = "";
				}
			}
			let l = () => {
				for (; s !== null;) {
					if (NT(s, e) || t !== void 0 && NT(s, t)) switch (s.content.constructor) {
						case WD: {
							let r = i.get("ychange");
							e !== void 0 && !NT(s, e) ? (r === void 0 || r.user !== s.id.client || r.type !== "removed") && (c(), i.set("ychange", n ? n("removed", s.id) : { type: "removed" })) : t !== void 0 && !NT(s, t) ? (r === void 0 || r.user !== s.id.client || r.type !== "added") && (c(), i.set("ychange", n ? n("added", s.id) : { type: "added" })) : r !== void 0 && (c(), i.delete("ychange")), o += s.content.str;
							break;
						}
						case eO:
						case FD: {
							c();
							let e = { insert: s.content.getContent()[0] };
							if (i.size > 0) {
								let t = {};
								e.attributes = t, i.forEach((e, n) => {
									t[n] = e;
								});
							}
							r.push(e);
							break;
						}
						case LD: NT(s, e) && (c(), rD(i, s.content));
					}
					s = s.right;
				}
				c();
			};
			return e || t ? q(a, (n) => {
				e && PT(n, e), t && PT(n, t), l();
			}, "cleanup") : l(), r;
		}
		insert(e, t, n) {
			if (t.length <= 0) return;
			let r = this.doc;
			r === null ? this._pending.push(() => this.insert(e, t, n)) : q(r, (r) => {
				let i = tD(r, this, e, !n);
				n || (n = {}, i.currentAttributes.forEach((e, t) => {
					n[t] = e;
				})), oD(r, this, i, t, n);
			});
		}
		insertEmbed(e, t, n) {
			let r = this.doc;
			r === null ? this._pending.push(() => this.insertEmbed(e, t, n || {})) : q(r, (r) => {
				let i = tD(r, this, e, !n);
				oD(r, this, i, t, n || {});
			});
		}
		delete(e, t) {
			if (t === 0) return;
			let n = this.doc;
			n === null ? this._pending.push(() => this.delete(e, t)) : q(n, (n) => {
				fD(n, tD(n, this, e, !0), t);
			});
		}
		format(e, t, n) {
			if (t === 0) return;
			let r = this.doc;
			r === null ? this._pending.push(() => this.format(e, t, n)) : q(r, (r) => {
				let i = tD(r, this, e, !1);
				i.right !== null && sD(r, this, i, t, n);
			});
		}
		removeAttribute(e) {
			this.doc === null ? this._pending.push(() => this.removeAttribute(e)) : q(this.doc, (t) => {
				zE(t, this, e);
			});
		}
		setAttribute(e, t) {
			this.doc === null ? this._pending.push(() => this.setAttribute(e, t)) : q(this.doc, (n) => {
				BE(n, this, e, t);
			});
		}
		getAttribute(e) {
			return VE(this, e);
		}
		getAttributes() {
			return HE(this);
		}
		_write(e) {
			e.writeTypeRef(YD);
		}
	}, hD = (e) => new mD(), gD = class {
		constructor(e, t = () => !0) {
			this._filter = t, this._root = e, this._currentNode = e._start, this._firstCall = !0, e.doc ?? _E();
		}
		[Symbol.iterator]() {
			return this;
		}
		next() {
			let e = this._currentNode, t = e && e.content && e.content.type;
			if (e !== null && (!this._firstCall || e.deleted || !this._filter(t))) do
				if (t = e.content.type, !e.deleted && (t.constructor === Y || t.constructor === _D) && t._start !== null) e = t._start;
				else for (; e !== null;) {
					let t = e.next;
					if (t !== null) {
						e = t;
						break;
					}
					e = e.parent === this._root ? null : e.parent._item;
				}
			while (e !== null && (e.deleted || !this._filter(e.content.type)));
			return this._firstCall = !1, e === null ? {
				value: void 0,
				done: !0
			} : (this._currentNode = e, {
				value: e.content.type,
				done: !1
			});
		}
	}, _D = class e extends J {
		constructor() {
			super(), this._prelimContent = [];
		}
		get firstChild() {
			let e = this._first;
			return e ? e.content.getContent()[0] : null;
		}
		_integrate(e, t) {
			super._integrate(e, t), this.insert(0, this._prelimContent), this._prelimContent = null;
		}
		_copy() {
			return new e();
		}
		clone() {
			let t = new e();
			return t.insert(0, this.toArray().map((e) => e instanceof J ? e.clone() : e)), t;
		}
		get length() {
			return this.doc ?? _E(), this._prelimContent === null ? this._length : this._prelimContent.length;
		}
		createTreeWalker(e) {
			return new gD(this, e);
		}
		querySelector(e) {
			e = e.toUpperCase();
			let t = new gD(this, (t) => t.nodeName && t.nodeName.toUpperCase() === e).next();
			return t.done ? null : t.value;
		}
		querySelectorAll(e) {
			return e = e.toUpperCase(), Fy(new gD(this, (t) => t.nodeName && t.nodeName.toUpperCase() === e));
		}
		_callObserver(e, t) {
			EE(this, e, new bD(this, t, e));
		}
		toString() {
			return jE(this, (e) => e.toString()).join("");
		}
		toJSON() {
			return this.toString();
		}
		toDOM(e = document, t = {}, n) {
			let r = e.createDocumentFragment();
			return n !== void 0 && n._createAssociation(r, this), AE(this, (i) => {
				r.insertBefore(i.toDOM(e, t, n), null);
			}), r;
		}
		insert(e, t) {
			this.doc === null ? this._prelimContent.splice(e, 0, ...t) : q(this.doc, (n) => {
				IE(n, this, e, t);
			});
		}
		insertAfter(e, t) {
			if (this.doc !== null) q(this.doc, (n) => {
				let r = e && e instanceof J ? e._item : e;
				PE(n, this, r, t);
			});
			else {
				let n = this._prelimContent, r = e === null ? 0 : n.findIndex((t) => t === e) + 1;
				if (r === 0 && e !== null) throw Gb("Reference item not found");
				n.splice(r, 0, ...t);
			}
		}
		delete(e, t = 1) {
			this.doc === null ? this._prelimContent.splice(e, t) : q(this.doc, (n) => {
				RE(n, this, e, t);
			});
		}
		toArray() {
			return OE(this);
		}
		push(e) {
			this.insert(this.length, e);
		}
		unshift(e) {
			this.insert(0, e);
		}
		get(e) {
			return NE(this, e);
		}
		slice(e = 0, t = this.length) {
			return DE(this, e, t);
		}
		forEach(e) {
			AE(this, e);
		}
		_write(e) {
			e.writeTypeRef(ZD);
		}
	}, vD = (e) => new _D(), Y = class e extends _D {
		constructor(e = "UNDEFINED") {
			super(), this.nodeName = e, this._prelimAttrs = /* @__PURE__ */ new Map();
		}
		get nextSibling() {
			let e = this._item ? this._item.next : null;
			return e ? e.content.type : null;
		}
		get prevSibling() {
			let e = this._item ? this._item.prev : null;
			return e ? e.content.type : null;
		}
		_integrate(e, t) {
			super._integrate(e, t), this._prelimAttrs.forEach((e, t) => {
				this.setAttribute(t, e);
			}), this._prelimAttrs = null;
		}
		_copy() {
			return new e(this.nodeName);
		}
		clone() {
			let t = new e(this.nodeName), n = this.getAttributes();
			return Wx(n, (e, n) => {
				t.setAttribute(n, e);
			}), t.insert(0, this.toArray().map((e) => e instanceof J ? e.clone() : e)), t;
		}
		toString() {
			let e = this.getAttributes(), t = [], n = [];
			for (let t in e) n.push(t);
			n.sort();
			let r = n.length;
			for (let i = 0; i < r; i++) {
				let r = n[i];
				t.push(r + "=\"" + e[r] + "\"");
			}
			let i = this.nodeName.toLocaleLowerCase();
			return `<${i}${t.length > 0 ? " " + t.join(" ") : ""}>${super.toString()}</${i}>`;
		}
		removeAttribute(e) {
			this.doc === null ? this._prelimAttrs.delete(e) : q(this.doc, (t) => {
				zE(t, this, e);
			});
		}
		setAttribute(e, t) {
			this.doc === null ? this._prelimAttrs.set(e, t) : q(this.doc, (n) => {
				BE(n, this, e, t);
			});
		}
		getAttribute(e) {
			return VE(this, e);
		}
		hasAttribute(e) {
			return UE(this, e);
		}
		getAttributes(e) {
			return e ? WE(this, e) : HE(this);
		}
		toDOM(e = document, t = {}, n) {
			let r = e.createElement(this.nodeName), i = this.getAttributes();
			for (let e in i) {
				let t = i[e];
				typeof t == "string" && r.setAttribute(e, t);
			}
			return AE(this, (i) => {
				r.appendChild(i.toDOM(e, t, n));
			}), n !== void 0 && n._createAssociation(r, this), r;
		}
		_write(e) {
			e.writeTypeRef(XD), e.writeKey(this.nodeName);
		}
	}, yD = (e) => new Y(e.readKey()), bD = class extends hE {
		constructor(e, t, n) {
			super(e, n), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), t.forEach((e) => {
				e === null ? this.childListChanged = !0 : this.attributesChanged.add(e);
			});
		}
	}, xD = class e extends XE {
		constructor(e) {
			super(), this.hookName = e;
		}
		_copy() {
			return new e(this.hookName);
		}
		clone() {
			let t = new e(this.hookName);
			return this.forEach((e, n) => {
				t.set(n, e);
			}), t;
		}
		toDOM(e = document, t = {}, n) {
			let r = t[this.hookName], i;
			return i = r === void 0 ? document.createElement(this.hookName) : r.createDom(this), i.setAttribute("data-yjs-hook", this.hookName), n !== void 0 && n._createAssociation(i, this), i;
		}
		_write(e) {
			e.writeTypeRef(QD), e.writeKey(this.hookName);
		}
	}, SD = (e) => new xD(e.readKey()), CD = class e extends mD {
		get nextSibling() {
			let e = this._item ? this._item.next : null;
			return e ? e.content.type : null;
		}
		get prevSibling() {
			let e = this._item ? this._item.prev : null;
			return e ? e.content.type : null;
		}
		_copy() {
			return new e();
		}
		clone() {
			let t = new e();
			return t.applyDelta(this.toDelta()), t;
		}
		toDOM(e = document, t, n) {
			let r = e.createTextNode(this.toString());
			return n !== void 0 && n._createAssociation(r, this), r;
		}
		toString() {
			return this.toDelta().map((e) => {
				let t = [];
				for (let n in e.attributes) {
					let r = [];
					for (let t in e.attributes[n]) r.push({
						key: t,
						value: e.attributes[n][t]
					});
					r.sort((e, t) => e.key < t.key ? -1 : 1), t.push({
						nodeName: n,
						attrs: r
					});
				}
				t.sort((e, t) => e.nodeName < t.nodeName ? -1 : 1);
				let n = "";
				for (let e = 0; e < t.length; e++) {
					let r = t[e];
					n += `<${r.nodeName}`;
					for (let e = 0; e < r.attrs.length; e++) {
						let t = r.attrs[e];
						n += ` ${t.key}="${t.value}"`;
					}
					n += ">";
				}
				n += e.insert;
				for (let e = t.length - 1; e >= 0; e--) n += `</${t[e].nodeName}>`;
				return n;
			}).join("");
		}
		toJSON() {
			return this.toString();
		}
		_write(e) {
			e.writeTypeRef($D);
		}
	}, wD = (e) => new CD(), TD = class {
		constructor(e, t) {
			this.id = e, this.length = t;
		}
		get deleted() {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		write(e, t, n) {
			throw Kb();
		}
		integrate(e, t) {
			throw Kb();
		}
	}, ED = 0, DD = class extends TD {
		get deleted() {
			return !0;
		}
		delete() {}
		mergeWith(e) {
			return this.constructor === e.constructor && (this.length += e.length, !0);
		}
		integrate(e, t) {
			t > 0 && (this.id.clock += t, this.length -= t), LT(e.doc.store, this);
		}
		write(e, t) {
			e.writeInfo(ED), e.writeLen(this.length - t);
		}
		getMissing(e, t) {
			return null;
		}
	}, OD = class e {
		constructor(e) {
			this.content = e;
		}
		getLength() {
			return 1;
		}
		getContent() {
			return [this.content];
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.content);
		}
		splice(e) {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		integrate(e, t) {}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			e.writeBuf(this.content);
		}
		getRef() {
			return 3;
		}
	}, kD = (e) => new OD(e.readBuf()), AD = class e {
		constructor(e) {
			this.len = e;
		}
		getLength() {
			return this.len;
		}
		getContent() {
			return [];
		}
		isCountable() {
			return !1;
		}
		copy() {
			return new e(this.len);
		}
		splice(t) {
			let n = new e(this.len - t);
			return this.len = t, n;
		}
		mergeWith(e) {
			return this.len += e.len, !0;
		}
		integrate(e, t) {
			Mw(e.deleteSet, t.id.client, t.id.clock, this.len), t.markDeleted();
		}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			e.writeLen(this.len - t);
		}
		getRef() {
			return 1;
		}
	}, jD = (e) => new AD(e.readLen()), MD = (e, t) => new zw({
		guid: e,
		...t,
		shouldLoad: t.shouldLoad || t.autoLoad || !1
	}), ND = class e {
		constructor(e) {
			e._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = e;
			let t = {};
			this.opts = t, e.gc || (t.gc = !1), e.autoLoad && (t.autoLoad = !0), e.meta !== null && (t.meta = e.meta);
		}
		getLength() {
			return 1;
		}
		getContent() {
			return [this.doc];
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(MD(this.doc.guid, this.opts));
		}
		splice(e) {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		integrate(e, t) {
			this.doc._item = t, e.subdocsAdded.add(this.doc), this.doc.shouldLoad && e.subdocsLoaded.add(this.doc);
		}
		delete(e) {
			e.subdocsAdded.has(this.doc) ? e.subdocsAdded.delete(this.doc) : e.subdocsRemoved.add(this.doc);
		}
		gc(e) {}
		write(e, t) {
			e.writeString(this.doc.guid), e.writeAny(this.opts);
		}
		getRef() {
			return 9;
		}
	}, PD = (e) => new ND(MD(e.readString(), e.readAny())), FD = class e {
		constructor(e) {
			this.embed = e;
		}
		getLength() {
			return 1;
		}
		getContent() {
			return [this.embed];
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.embed);
		}
		splice(e) {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		integrate(e, t) {}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			e.writeJSON(this.embed);
		}
		getRef() {
			return 5;
		}
	}, ID = (e) => new FD(e.readJSON()), LD = class e {
		constructor(e, t) {
			this.key = e, this.value = t;
		}
		getLength() {
			return 1;
		}
		getContent() {
			return [];
		}
		isCountable() {
			return !1;
		}
		copy() {
			return new e(this.key, this.value);
		}
		splice(e) {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		integrate(e, t) {
			let n = t.parent;
			n._searchMarker = null, n._hasFormatting = !0;
		}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			e.writeKey(this.key), e.writeJSON(this.value);
		}
		getRef() {
			return 6;
		}
	}, RD = (e) => new LD(e.readKey(), e.readJSON()), zD = class e {
		constructor(e) {
			this.arr = e;
		}
		getLength() {
			return this.arr.length;
		}
		getContent() {
			return this.arr;
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.arr);
		}
		splice(t) {
			let n = new e(this.arr.slice(t));
			return this.arr = this.arr.slice(0, t), n;
		}
		mergeWith(e) {
			return this.arr = this.arr.concat(e.arr), !0;
		}
		integrate(e, t) {}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			let n = this.arr.length;
			e.writeLen(n - t);
			for (let r = t; r < n; r++) {
				let t = this.arr[r];
				e.writeString(t === void 0 ? "undefined" : JSON.stringify(t));
			}
		}
		getRef() {
			return 2;
		}
	}, BD = (e) => {
		let t = e.readLen(), n = [];
		for (let r = 0; r < t; r++) {
			let t = e.readString();
			t === "undefined" ? n.push(void 0) : n.push(JSON.parse(t));
		}
		return new zD(n);
	}, VD = uS("node_env") === "development", HD = class e {
		constructor(e) {
			this.arr = e, VD && Zx(e);
		}
		getLength() {
			return this.arr.length;
		}
		getContent() {
			return this.arr;
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.arr);
		}
		splice(t) {
			let n = new e(this.arr.slice(t));
			return this.arr = this.arr.slice(0, t), n;
		}
		mergeWith(e) {
			return this.arr = this.arr.concat(e.arr), !0;
		}
		integrate(e, t) {}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			let n = this.arr.length;
			e.writeLen(n - t);
			for (let r = t; r < n; r++) {
				let t = this.arr[r];
				e.writeAny(t);
			}
		}
		getRef() {
			return 8;
		}
	}, UD = (e) => {
		let t = e.readLen(), n = [];
		for (let r = 0; r < t; r++) n.push(e.readAny());
		return new HD(n);
	}, WD = class e {
		constructor(e) {
			this.str = e;
		}
		getLength() {
			return this.str.length;
		}
		getContent() {
			return this.str.split("");
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.str);
		}
		splice(t) {
			let n = new e(this.str.slice(t));
			this.str = this.str.slice(0, t);
			let r = this.str.charCodeAt(t - 1);
			return r >= 55296 && r <= 56319 && (this.str = this.str.slice(0, t - 1) + "�", n.str = "�" + n.str.slice(1)), n;
		}
		mergeWith(e) {
			return this.str += e.str, !0;
		}
		integrate(e, t) {}
		delete(e) {}
		gc(e) {}
		write(e, t) {
			e.writeString(t === 0 ? this.str : this.str.slice(t));
		}
		getRef() {
			return 4;
		}
	}, GD = (e) => new WD(e.readString()), KD = [
		JE,
		ZE,
		hD,
		yD,
		vD,
		SD,
		wD
	], qD = 0, JD = 1, YD = 2, XD = 3, ZD = 4, QD = 5, $D = 6, eO = class e {
		constructor(e) {
			this.type = e;
		}
		getLength() {
			return 1;
		}
		getContent() {
			return [this.type];
		}
		isCountable() {
			return !0;
		}
		copy() {
			return new e(this.type._copy());
		}
		splice(e) {
			throw Kb();
		}
		mergeWith(e) {
			return !1;
		}
		integrate(e, t) {
			this.type._integrate(e.doc, t);
		}
		delete(e) {
			let t = this.type._start;
			for (; t !== null;) t.deleted ? t.id.clock < (e.beforeState.get(t.id.client) || 0) && e._mergeStructs.push(t) : t.delete(e), t = t.right;
			this.type._map.forEach((t) => {
				t.deleted ? t.id.clock < (e.beforeState.get(t.id.client) || 0) && e._mergeStructs.push(t) : t.delete(e);
			}), e.changed.delete(this.type);
		}
		gc(e) {
			let t = this.type._start;
			for (; t !== null;) t.gc(e, !0), t = t.right;
			this.type._start = null, this.type._map.forEach((t) => {
				for (; t !== null;) t.gc(e, !0), t = t.left;
			}), this.type._map = /* @__PURE__ */ new Map();
		}
		write(e, t) {
			this.type._write(e);
		}
		getRef() {
			return 7;
		}
	}, tO = (e) => new eO(KD[e.readTypeRef()](e)), nO = (e, t) => {
		let n = t, r = 0, i;
		do
			r > 0 && (n = G(n.client, n.clock + r)), i = BT(e, n), r = n.clock - i.id.clock, n = i.redone;
		while (n !== null && i instanceof X);
		return {
			item: i,
			diff: r
		};
	}, rO = (e, t) => {
		for (; e !== null && e.keep !== t;) e.keep = t, e = e.parent._item;
	}, iO = (e, t, n) => {
		let { client: r, clock: i } = t.id, a = new X(G(r, i + n), t, G(r, i + n - 1), t.right, t.rightOrigin, t.parent, t.parentSub, t.content.splice(n));
		return t.deleted && a.markDeleted(), t.keep && (a.keep = !0), t.redone !== null && (a.redone = G(t.redone.client, t.redone.clock + n)), t.right = a, a.right !== null && (a.right.left = a), e._mergeStructs.push(a), a.parentSub !== null && a.right === null && a.parent._map.set(a.parentSub, a), t.length = n, a;
	}, aO = (e, t) => Ly(e, (e) => kw(e.deletions, t)), oO = (e, t, n, r, i, a) => {
		let o = e.doc, s = o.store, c = o.clientID, l = t.redone;
		if (l !== null) return HT(e, l);
		let u = t.parent._item, d = null, f;
		if (u !== null && u.deleted === !0) {
			if (u.redone === null && (!n.has(u) || oO(e, u, n, r, i, a) === null)) return null;
			for (; u.redone !== null;) u = HT(e, u.redone);
		}
		let p = u === null ? t.parent : u.content.type;
		if (t.parentSub === null) {
			for (d = t.left, f = t; d !== null;) {
				let t = d;
				for (; t !== null && t.parent._item !== u;) t = t.redone === null ? null : HT(e, t.redone);
				if (t !== null && t.parent._item === u) {
					d = t;
					break;
				}
				d = d.left;
			}
			for (; f !== null;) {
				let t = f;
				for (; t !== null && t.parent._item !== u;) t = t.redone === null ? null : HT(e, t.redone);
				if (t !== null && t.parent._item === u) {
					f = t;
					break;
				}
				f = f.right;
			}
		} else {
			if (f = null, t.right && !i) {
				for (d = t; d !== null && d.right !== null && (d.right.redone || kw(r, d.right.id) || aO(a.undoStack, d.right.id) || aO(a.redoStack, d.right.id));) for (d = d.right; d.redone;) d = HT(e, d.redone);
				if (d && d.right !== null) return null;
			} else d = p._map.get(t.parentSub) || null;
			d !== null && d.parent._item !== u && (d = p._map.get(t.parentSub) || null);
		}
		let m = K(s, c), h = G(c, m), g = new X(h, d, d && d.lastId, f, f && f.id, p, t.parentSub, t.content.copy());
		return t.redone = h, rO(g, !0), g.integrate(e, 0), g;
	}, X = class e extends TD {
		constructor(e, t, n, r, i, a, o, s) {
			super(e, s.getLength()), this.origin = n, this.left = t, this.right = r, this.rightOrigin = i, this.parent = a, this.parentSub = o, this.redone = null, this.content = s, this.info = this.content.isCountable() ? 2 : 0;
		}
		set marker(e) {
			(this.info & 8) > 0 !== e && (this.info ^= 8);
		}
		get marker() {
			return (this.info & 8) > 0;
		}
		get keep() {
			return (this.info & 1) > 0;
		}
		set keep(e) {
			this.keep !== e && (this.info ^= 1);
		}
		get countable() {
			return (this.info & 2) > 0;
		}
		get deleted() {
			return (this.info & 4) > 0;
		}
		set deleted(e) {
			this.deleted !== e && (this.info ^= 4);
		}
		markDeleted() {
			this.info |= 4;
		}
		getMissing(t, n) {
			if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= K(n, this.origin.client)) return this.origin.client;
			if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= K(n, this.rightOrigin.client)) return this.rightOrigin.client;
			if (this.parent && this.parent.constructor === gT && this.id.client !== this.parent.client && this.parent.clock >= K(n, this.parent.client)) return this.parent.client;
			if (this.origin &&= (this.left = UT(t, n, this.origin), this.left.lastId), this.rightOrigin &&= (this.right = HT(t, this.rightOrigin), this.right.id), this.left && this.left.constructor === DD || this.right && this.right.constructor === DD) this.parent = null;
			else if (!this.parent) this.left && this.left.constructor === e ? (this.parent = this.left.parent, this.parentSub = this.left.parentSub) : this.right && this.right.constructor === e && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
			else if (this.parent.constructor === gT) {
				let e = BT(n, this.parent);
				this.parent = e.constructor === DD ? null : e.content.type;
			}
			return null;
		}
		integrate(e, t) {
			if (t > 0 && (this.id.clock += t, this.left = UT(e, e.doc.store, G(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(t), this.length -= t), this.parent) {
				if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
					let t = this.left, n;
					if (t !== null) n = t.right;
					else if (this.parentSub !== null) for (n = this.parent._map.get(this.parentSub) || null; n !== null && n.left !== null;) n = n.left;
					else n = this.parent._start;
					let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
					for (; n !== null && n !== this.right;) {
						if (i.add(n), r.add(n), _T(this.origin, n.origin)) {
							if (n.id.client < this.id.client) t = n, r.clear();
							else if (_T(this.rightOrigin, n.rightOrigin)) break;
						} else if (n.origin !== null && i.has(BT(e.doc.store, n.origin))) r.has(BT(e.doc.store, n.origin)) || (t = n, r.clear());
						else break;
						n = n.right;
					}
					this.left = t;
				}
				if (this.left !== null) {
					let e = this.left.right;
					this.right = e, this.left.right = this;
				} else {
					let e;
					if (this.parentSub !== null) for (e = this.parent._map.get(this.parentSub) || null; e !== null && e.left !== null;) e = e.left;
					else e = this.parent._start, this.parent._start = this;
					this.right = e;
				}
				this.right === null ? this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(e)) : this.right.left = this, this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), LT(e.doc.store, this), this.content.integrate(e, this), JT(e, this.parent, this.parentSub), (this.parent._item !== null && this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(e);
			} else new DD(this.id, this.length).integrate(e, 0);
		}
		get next() {
			let e = this.right;
			for (; e !== null && e.deleted;) e = e.right;
			return e;
		}
		get prev() {
			let e = this.left;
			for (; e !== null && e.deleted;) e = e.left;
			return e;
		}
		get lastId() {
			return this.length === 1 ? this.id : G(this.id.client, this.id.clock + this.length - 1);
		}
		mergeWith(e) {
			if (this.constructor === e.constructor && _T(e.origin, this.lastId) && this.right === e && _T(this.rightOrigin, e.rightOrigin) && this.id.client === e.id.client && this.id.clock + this.length === e.id.clock && this.deleted === e.deleted && this.redone === null && e.redone === null && this.content.constructor === e.content.constructor && this.content.mergeWith(e.content)) {
				let t = this.parent._searchMarker;
				return t && t.forEach((t) => {
					t.p === e && (t.p = this, !this.deleted && this.countable && (t.index -= this.length));
				}), e.keep && (this.keep = !0), this.right = e.right, this.right !== null && (this.right.left = this), this.length += e.length, !0;
			}
			return !1;
		}
		delete(e) {
			if (!this.deleted) {
				let t = this.parent;
				this.countable && this.parentSub === null && (t._length -= this.length), this.markDeleted(), Mw(e.deleteSet, this.id.client, this.id.clock, this.length), JT(e, t, this.parentSub), this.content.delete(e);
			}
		}
		gc(e, t) {
			if (!this.deleted) throw H();
			this.content.gc(e), t ? WT(e, this, new DD(this.id, this.length)) : this.content = new AD(this.length);
		}
		write(e, t) {
			let n = t > 0 ? G(this.id.client, this.id.clock + t - 1) : this.origin, r = this.rightOrigin, i = this.parentSub, a = this.content.getRef() & 31 | (n === null ? 0 : 128) | (r === null ? 0 : 64) | (i === null ? 0 : 32);
			if (e.writeInfo(a), n !== null && e.writeLeftID(n), r !== null && e.writeRightID(r), n === null && r === null) {
				let t = this.parent;
				if (t._item !== void 0) {
					let n = t._item;
					if (n === null) {
						let n = vT(t);
						e.writeParentInfo(!0), e.writeString(n);
					} else e.writeParentInfo(!1), e.writeLeftID(n.id);
				} else t.constructor === String ? (e.writeParentInfo(!0), e.writeString(t)) : t.constructor === gT ? (e.writeParentInfo(!1), e.writeLeftID(t)) : H();
				i !== null && e.writeString(i);
			}
			this.content.write(e, t);
		}
	}, sO = (e, t) => cO[t & 31](e), cO = [
		() => {
			H();
		},
		jD,
		BD,
		kD,
		GD,
		ID,
		RD,
		tO,
		UD,
		PD,
		() => {
			H();
		}
	], lO = 10, uO = class extends TD {
		get deleted() {
			return !0;
		}
		delete() {}
		mergeWith(e) {
			return this.constructor === e.constructor && (this.length += e.length, !0);
		}
		integrate(e, t) {
			H();
		}
		write(e, t) {
			e.writeInfo(lO), V(e.restEncoder, this.length - t);
		}
		getMissing(e, t) {
			return null;
		}
	}, dO = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}, fO = "__ $YJS$ __", dO[fO] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438"), dO[fO] = !0;
})), mO, hO = e((() => {
	mO = () => {
		let e = !0;
		return (t, n) => {
			if (e) {
				e = !1;
				try {
					t();
				} finally {
					e = !0;
				}
			} else n !== void 0 && n();
		};
	};
})), gO, _O, vO, yO, bO, xO, SO, CO, wO, TO = e((() => {
	Zy(), gO = (e, t) => e >>> t | e << 32 - t, _O = (e) => gO(e, 2) ^ gO(e, 13) ^ gO(e, 22), vO = (e) => gO(e, 6) ^ gO(e, 11) ^ gO(e, 25), yO = (e) => gO(e, 7) ^ gO(e, 18) ^ e >>> 3, bO = (e) => gO(e, 17) ^ gO(e, 19) ^ e >>> 10, xO = new Uint32Array([
		1116352408,
		1899447441,
		3049323471,
		3921009573,
		961987163,
		1508970993,
		2453635748,
		2870763221,
		3624381080,
		310598401,
		607225278,
		1426881987,
		1925078388,
		2162078206,
		2614888103,
		3248222580,
		3835390401,
		4022224774,
		264347078,
		604807628,
		770255983,
		1249150122,
		1555081692,
		1996064986,
		2554220882,
		2821834349,
		2952996808,
		3210313671,
		3336571891,
		3584528711,
		113926993,
		338241895,
		666307205,
		773529912,
		1294757372,
		1396182291,
		1695183700,
		1986661051,
		2177026350,
		2456956037,
		2730485921,
		2820302411,
		3259730800,
		3345764771,
		3516065817,
		3600352804,
		4094571909,
		275423344,
		430227734,
		506948616,
		659060556,
		883997877,
		958139571,
		1322822218,
		1537002063,
		1747873779,
		1955562222,
		2024104815,
		2227730452,
		2361852424,
		2428436474,
		2756734187,
		3204031479,
		3329325298
	]), SO = new Uint32Array([
		1779033703,
		3144134277,
		1013904242,
		2773480762,
		1359893119,
		2600822924,
		528734635,
		1541459225
	]), CO = class {
		constructor() {
			let e = /* @__PURE__ */ new ArrayBuffer(320);
			this._H = new Uint32Array(e, 0, 8), this._H.set(SO), this._W = new Uint32Array(e, 64, 64);
		}
		_updateHash() {
			let e = this._H, t = this._W;
			for (let e = 16; e < 64; e++) t[e] = bO(t[e - 2]) + t[e - 7] + yO(t[e - 15]) + t[e - 16];
			let n = e[0], r = e[1], i = e[2], a = e[3], o = e[4], s = e[5], c = e[6], l = e[7];
			for (let e = 0, u, d; e < 64; e++) u = l + vO(o) + (o & s ^ ~o & c) + xO[e] + t[e] >>> 0, d = _O(n) + (n & r ^ n & i ^ r & i) >>> 0, l = c, c = s, s = o, o = a + u >>> 0, a = i, i = r, r = n, n = u + d >>> 0;
			e[0] += n, e[1] += r, e[2] += i, e[3] += a, e[4] += o, e[5] += s, e[6] += c, e[7] += l;
		}
		digest(e) {
			let t = 0;
			for (; t + 56 <= e.length;) {
				let n = 0;
				for (; n < 16 && t + 3 < e.length; n++) this._W[n] = e[t++] << 24 | e[t++] << 16 | e[t++] << 8 | e[t++];
				if (t % 64 != 0) {
					for (this._W.fill(0, n, 16); t < e.length;) this._W[n] |= e[t] << (3 - t % 4) * 8, t++;
					this._W[n] |= 128 << (3 - t % 4) * 8;
				}
				this._updateHash();
			}
			let n = t % 64 != 0;
			this._W.fill(0, 0, 16);
			let r = 0;
			for (; t < e.length; r++) for (let n = 3; n >= 0 && t < e.length; n--) this._W[r] |= e[t++] << n * 8;
			n || (this._W[r - (t % 4 == 0 ? 0 : 1)] |= 128 << (3 - t % 4) * 8), this._W[14] = e.byteLength / Xy, this._W[15] = e.byteLength * 8, this._updateHash();
			let i = /* @__PURE__ */ new Uint8Array(32);
			for (let e = 0; e < this._H.length; e++) for (let t = 0; t < 4; t++) i[e * 4 + t] = this._H[e] >>> (3 - t) * 8;
			return i;
		}
	}, wO = (e) => new CO().digest(e);
})), EO, DO, OO, kO, AO = e((() => {
	EO = /[\uD800-\uDBFF]/, DO = /[\uDC00-\uDFFF]/, OO = (e, t) => {
		let n = 0, r = 0;
		for (; n < e.length && n < t.length && e[n] === t[n];) n++;
		for (n > 0 && EO.test(e[n - 1]) && n--; r + n < e.length && r + n < t.length && e[e.length - r - 1] === t[t.length - r - 1];) r++;
		return r > 0 && DO.test(e[e.length - r]) && r--, {
			index: n,
			remove: e.length - n - r,
			insert: t.slice(n, t.length - r)
		};
	}, kO = OO;
}));
// node_modules/@tiptap/y-tiptap/dist/index.js
function jO(e) {
	if (!e || !(e.content instanceof eO)) return null;
	let t = e.content.type;
	if (!(t instanceof _D || t instanceof mD || t instanceof xD)) throw Error("Expected a Yjs XML type");
	return t;
}
function MO(e) {
	if (e === null) return null;
	if (!(e.parent instanceof J)) throw Error("Expected an integrated Yjs parent");
	let t = e.parent;
	if (!(t instanceof _D || t instanceof mD || t instanceof xD)) throw Error("Expected a Yjs XML type");
	return t;
}
function NO(e, t) {
	if (e instanceof CD) return e._length;
	let n = t.get(e);
	return n instanceof Ue ? n.nodeSize : null;
}
function PO(e, t, n) {
	let r = 0, i = e._first;
	for (; i !== null;) {
		let e = jO(i);
		if (e === t) break;
		let a = i.deleted;
		if (i = i.right, a) continue;
		if (e === null) return null;
		let o = NO(e, n);
		if (o === null) return null;
		r += o;
	}
	return r;
}
function FO(e, t, n) {
	let r = 0, i = 0, a = e._first;
	for (; i < e._length && i < t && a !== null;) {
		let e = a;
		if (a = a.right, e.deleted) continue;
		let t = jO(e);
		if (t === null) return null;
		let o = NO(t, n);
		if (o === null) return null;
		i++, r += o;
	}
	return r;
}
function IO() {
	let e = JO;
	JO = null;
	let t = [];
	return e?.forEach((e, n) => {
		e.forEach((e, r) => t.push({
			view: n,
			key: r,
			value: e
		}));
	}), t;
}
function LO(e = IO(), t = !1) {
	let n = !0;
	for (; e.length > 0;) {
		let { view: r, key: i, value: a } = e[0];
		try {
			let e = Z.getState(r.state);
			e && e.binding.prosemirrorView !== null && r.dispatch(r.state.tr.setMeta(i, a));
		} catch (r) {
			if (!(r instanceof RangeError)) throw r;
			t && n && e.shift(), e.length > 0 && QC(0, () => LO(e, !0));
			return;
		}
		n = !1, e.shift();
	}
}
function RO(e, t, n) {
	JO === null && (JO = /* @__PURE__ */ new Map(), QC(0, LO));
	let r = JO.get(e);
	r || (r = /* @__PURE__ */ new Map(), JO.set(e, r)), r.set(t, n);
}
function zO(e) {
	let t = Z.getState(e);
	if (!t) throw Error("The editor requires ySyncPlugin");
	return t;
}
function BO(e) {
	let t = KO.getState(e);
	if (!t) throw Error("The editor requires yUndoPlugin");
	return t;
}
var VO, HO, UO, WO, GO, Z, KO, qO, JO, YO, XO, ZO, QO, $O, ek, tk, nk, rk, ik, ak, ok, sk, ck, lk, uk, dk, fk, pk, mk, hk, gk, _k, vk, yk, bk, xk, Sk, Ck, wk, Tk, Ek, Dk, Ok, kk, Ak, jk, Mk, Nk, Pk, Fk, Ik, Lk, Rk, zk, Bk, Vk, Hk, Uk, Wk, Gk, Kk, qk, Jk, Yk, Xk, Zk, Qk, $k, eA, tA, nA, rA, iA, aA, oA, sA = e((() => {
	pO(), xc(), Yn(), ct(), qb(), Tn(), $C(), Yy(), hO(), hS(), YC(), My(), Dx(), Ay(), TO(), SS(), Qx(), AO(), VO = (e, t) => {
		let n = null, r = null;
		return e._item === null ? r = vT(e) : n = G(e._item.id.client, e._item.id.clock), new bT(n, r, t.id);
	}, HO = (e, t, n) => {
		if (e === 0) return TT(t, 0, -1);
		let r = jO(t._first);
		for (; r !== null && t !== r;) {
			if (r instanceof CD) {
				if (r._length >= e) return TT(r, e, -1);
				if (e -= r._length, r._item !== null && r._item.next !== null) r = jO(r._item.next);
				else {
					do
						r = MO(r._item), e--;
					while (r !== t && r !== null && r._item !== null && r._item.next === null);
					r !== null && r !== t && (r = r._item === null ? null : jO(r._item.next));
				}
			} else {
				let i = n.get(r), a = i instanceof Ue ? i.nodeSize : 0;
				if (r._first !== null && e < a) r = jO(r._first), e--;
				else {
					if (e === 1 && r._length === 0 && a > 1) return new bT(r._item === null ? null : r._item.id, r._item === null ? vT(r) : null, null);
					if (e -= a, r._item !== null && r._item.next !== null) r = jO(r._item.next);
					else {
						if (e === 0) {
							if (r = r._item === null ? r : MO(r._item), r === null) throw H();
							return new bT(r._item === null ? null : r._item.id, r._item === null ? vT(r) : null, null);
						}
						do {
							if (r = MO(r._item), r === null) throw H();
							e--;
						} while (r !== t && r._item?.next === null);
						r !== t && (r = jO(r._item?.next));
					}
				}
			}
			if (r === null) throw H();
			if (e === 0 && r.constructor !== CD && r !== t) {
				let e = r._item, t = MO(e);
				if (e === null || t === null) throw H();
				return VO(t, e);
			}
		}
		return TT(t, t._length, -1);
	}, UO = (e, t) => {
		if (!e.docChanged) return !1;
		if (e.doc.childCount !== t.childCount) return !0;
		for (let n of e.steps) if (n instanceof vn) {
			if (n.from === 0 && n.to === t.content.size) return !0;
			if (n.slice.content.size > 0) {
				let e = !1;
				if (n.slice.content.forEach((t) => {
					t.isBlock && (e = !0);
				}), e) return !0;
			} else if (n.to > n.from) {
				let e = t.resolve(n.from), r = t.resolve(n.to);
				if (e.depth === 0 && r.depth === 0 && e.index() !== r.index()) return !0;
			}
		}
		return !1;
	}, WO = (e, t, n) => {
		if (n === null) return !1;
		let r = DT(t, e);
		return r !== null && r.type instanceof CD && t.item !== null && r.type._item?.deleted === !0;
	}, GO = (e, t, n, r) => {
		let i = DT(n, e);
		if (i === null || i.type !== t && !yT(t, i.type._item)) return null;
		let a = i.type, o = 0;
		if (a.constructor === CD) o = i.index;
		else if (!a._item?.deleted) {
			let e = FO(a, i.index, r);
			if (e === null) return null;
			o = e + 1;
		}
		for (; a !== t && a._item !== null;) {
			let e = MO(a._item);
			if (e === null) return null;
			if (e._item?.deleted) {
				a = e;
				continue;
			}
			let t = PO(e, a, r);
			if (t === null) return null;
			o += t + 1, a = e;
		}
		let s = o - 1;
		return WO(e, n, s) ? null : s;
	}, Z = new k("y-sync"), KO = new k("y-undo"), qO = new k("yjs-cursor"), JO = null, YO = (e, t, n) => e !== t, XO = (e) => {
		let t = document.createElement("span");
		t.classList.add("ProseMirror-yjs-cursor"), t.setAttribute("style", `border-color: ${e.color}`);
		let n = document.createElement("div");
		n.setAttribute("style", `background-color: ${e.color}`), n.insertBefore(document.createTextNode(e.name), null);
		let r = document.createTextNode("⁠"), i = document.createTextNode("⁠");
		return t.insertBefore(r, null), t.insertBefore(n, null), t.insertBefore(i, null), t;
	}, ZO = (e) => ({
		style: `background-color: ${e.color}70`,
		class: "ProseMirror-yjs-selection"
	}), QO = (e) => {
		let t = Z.getState(e);
		return t?.binding && t.binding.invalidContentError === null ? t : null;
	}, $O = /^#[0-9a-fA-F]{6}$/, ek = (e) => typeof e.name == "string" && typeof e.color == "string", tk = (e, t, n, r, i) => {
		let a = QO(e);
		if (a == null || a.doc == null) return j.create(e.doc, []);
		let o = a.doc, s = [];
		return a.snapshot != null || a.prevSnapshot != null || a.binding.mapping.size === 0 ? j.create(e.doc, []) : (t.getStates().forEach((t, c) => {
			if (n(o.clientID, c, t) && t && t.cursor != null) {
				let n = { ...t.user };
				if (n.color == null ? n.color = "#ffa500" : $O.test(n.color) || console.warn("A user uses an unsupported color format", n), n.name ??= `User: ${c}`, !ek(n)) return;
				let l = GO(o, a.type, xT(t.cursor.anchor), a.binding.mapping), u = GO(o, a.type, xT(t.cursor.head), a.binding.mapping);
				if (l !== null && u !== null) {
					let t = qy(e.doc.content.size - 1, 0);
					l = Ky(l, t), u = Ky(u, t), s.push(sc.widget(u, () => r(n, c), {
						key: c + "",
						side: 10
					}));
					let a = Ky(l, u), o = qy(l, u);
					s.push(sc.inline(a, o, i(n, c), {
						inclusiveEnd: !0,
						inclusiveStart: !1
					}));
				}
			}
		}), j.create(e.doc, s));
	}, nk = (e, { awarenessStateFilter: t = YO, cursorBuilder: n = XO, selectionBuilder: r = ZO, getSelection: i = (e) => e.selection } = {}, a = "cursor") => new O({
		key: qO,
		state: {
			init(i, a) {
				return tk(a, e, t, n, r);
			},
			apply(i, a, o, s) {
				let c = Z.getState(s), l = i.getMeta(qO), u = c && c.isChangeOrigin;
				return i.docChanged && !u && UO(i, o.doc) ? j.empty : u || l && l.awarenessUpdated ? tk(s, e, t, n, r) : i.docChanged ? a.map(i.mapping, i.doc) : a;
			}
		},
		props: { decorations: (e) => qO.getState(e) ?? j.empty },
		view: (t) => {
			let n = () => {
				t.isDestroyed || RO(t, qO, { awarenessUpdated: !0 });
			}, r = () => {
				e.getLocalState()?.[a] != null && e.setLocalStateField(a, null);
			}, o = (t) => {
				let n = QO(t.state);
				if (!n) {
					r();
					return;
				}
				let o = e.getLocalState() || {};
				if (t.hasFocus()) {
					let r = i(t.state), s = HO(r.anchor, n.type, n.binding.mapping), c = HO(r.head, n.type, n.binding.mapping);
					o.cursor != null && OT(xT(o.cursor.anchor), s) && OT(xT(o.cursor.head), c) || e.setLocalStateField(a, {
						anchor: s,
						head: c
					});
				} else o.cursor != null && GO(n.doc, n.type, xT(o.cursor.anchor), n.binding.mapping) !== null && e.setLocalStateField(a, null);
			}, s = () => o(t);
			return e.on("change", n), t.dom.addEventListener("focusin", s), t.dom.addEventListener("focusout", s), {
				update: o,
				destroy: () => {
					t.dom.removeEventListener("focusin", s), t.dom.removeEventListener("focusout", s), e.off("change", n), e.setLocalStateField(a, null);
				}
			};
		}
	}), rk = (e, t) => t === void 0 ? !e.deleted : t.sv.has(e.id.client) && (t.sv.get(e.id.client) ?? 0) > e.id.clock && !kw(t.ds, e.id), ik = (e, t, n) => {
		if (!e.has(n)) {
			if (e.size < t.length) {
				let n = jy();
				e.forEach((e) => n.add(e)), t = t.filter((e) => !n.has(e));
			}
			e.set(n, wx(t));
		}
		let r = e.get(n);
		if (!r) throw Error("At least one snapshot color is required");
		return r;
	}, ak = (e, t) => {
		if (e === t) return !0;
		let n = Object.keys(e);
		return n.length === Object.keys(t).length && n.every((n) => e[n] === t[n]);
	}, ok = (e) => {
		let t = e.type.spec.attrs || {};
		return Object.keys(e.attrs).some((n) => {
			let r = t[n];
			return r == null || !Object.prototype.hasOwnProperty.call(r, "default") || r.default !== e.attrs[n];
		});
	}, sk = (e, t, n) => {
		let r = 0, i = 0;
		for (; i < e.childCount; i++) {
			let t = e.child(i);
			if (r + t.nodeSize > n) break;
			r += t.nodeSize;
		}
		if (i >= e.childCount) return null;
		let a = e.child(i), o = e.resolve(n), s = (e, t) => {
			if (o.depth === 0) {
				let i = e + (n - r), a = e + 1, o = e + t.nodeSize - 1;
				return Math.max(a, Math.min(i, o));
			}
			if (o.depth > 1) {
				let n = sk(o.node(1), t, o.pos - o.start(1));
				return n === null ? null : e + 1 + n;
			}
			return t.isTextblock ? e + 1 + Math.min(o.parentOffset, t.content.size) : null;
		}, c = (n, r = !1) => {
			let a = 0;
			for (let t = 0; t <= i; t++) n(e.child(t)) && a++;
			let o = 0, c = -1, l = null, u = 0;
			for (let e = 0; e < t.childCount; e++) {
				let r = t.child(e);
				n(r) && (o++, o === a && (c = u, l = r)), u += r.nodeSize;
			}
			return l === null || r && (a !== 1 || o !== 1) ? null : s(c, l);
		}, l = (e) => e.type === a.type && ak(e.attrs, a.attrs), u = a.textContent, d = c((e) => l(e) && e.textContent === u);
		if (d !== null) return d;
		let f = c((e) => e.type === a.type && e.textContent === u);
		if (f !== null) return f;
		if (!a.isTextblock || ok(a)) {
			let e = c(l, !0);
			if (e !== null) return e;
		}
		return c((e) => l(e) && u !== "" && e.textContent !== "" && (u.startsWith(e.textContent) || e.textContent.startsWith(u)), !0);
	}, ck = (e, t, n, r) => {
		if (r === null) return !1;
		let i = e.resolve(n), a = t.resolve(r);
		if (!i.parent.isTextblock) return !1;
		if (!a.parent.isTextblock || i.parent.textContent !== a.parent.textContent || i.parentOffset !== 0 && a.parentOffset === 0) return !0;
		let o = i.parentOffset === 0 && a.parentOffset === 0, s = i.parentOffset !== a.parentOffset || i.parent.type !== a.parent.type || !ak(i.parent.attrs, a.parent.attrs);
		if (o || s) {
			let i = sk(e, t, n);
			return i !== null && i !== r;
		}
		return !1;
	}, lk = (e, t, n, r) => {
		if (n == null || n < 0 || n > t.content.size || !(r === null || n > 1 && r <= 1 || ck(t, e, n, r))) return r;
		let i = sk(t, e, n);
		return i === null ? r : i;
	}, uk = (e, t, n, r) => {
		if (t !== null && t.anchor !== null && t.head !== null) {
			if (t.type === "all") e.setSelection(new Rn(e.doc));
			else if (t.type === "node") {
				let r = GO(n.doc, n.type, t.anchor, n.mapping);
				r !== null && e.setSelection(dk(e, r));
			} else if (t.type === "nodeRange") {
				let r = GO(n.doc, n.type, t.anchor, n.mapping), i = GO(n.doc, n.type, t.head, n.mapping), a = fk(e, r, i, t.depth);
				a !== null && e.setSelection(a);
			} else {
				let i = GO(n.doc, n.type, t.anchor, n.mapping), a = GO(n.doc, n.type, t.head, n.mapping);
				r != null && (i = lk(e.doc, r, t.absAnchor, i), a = lk(e.doc, r, t.absHead, a)), i === null && (i = a), a === null && (a = i), i !== null && a !== null && e.setSelection(E.between(e.doc.resolve(i), e.doc.resolve(a)));
			}
		}
	}, dk = (e, t) => {
		let n = e.doc.resolve(t);
		return n.nodeAfter ? D.create(e.doc, t) : E.near(n);
	}, fk = (e, t, n, r) => {
		if (t === null || n === null) return null;
		let i = Math.min(Math.max(t, 0), e.doc.content.size), a = Math.min(Math.max(n, 0), e.doc.content.size);
		try {
			let t = T.fromJSON(e.doc, {
				type: "nodeRange",
				anchor: i,
				head: a,
				depth: r
			});
			return t.ranges.length ? t : E.near(e.doc.resolve(i));
		} catch {
			return E.near(e.doc.resolve(i));
		}
	}, pk = (e, t) => {
		let n = t.selection, r = n.toJSON(), i = typeof r.type == "string" ? r.type : "text";
		return {
			type: i,
			depth: i === "nodeRange" && "depth" in n && typeof n.depth == "number" ? n.depth : void 0,
			anchor: HO(t.selection.anchor, e.type, e.mapping),
			head: HO(t.selection.head, e.type, e.mapping),
			absAnchor: t.selection.anchor,
			absHead: t.selection.head
		};
	}, mk = /* @__PURE__ */ new WeakMap(), hk = (e, t) => {
		var n;
		(t instanceof _D || t instanceof mD || t instanceof xD) && (e.delete(t), (n = mk.get(e)) == null || n.delete(t));
	}, gk = /(.*)(--[a-zA-Z0-9+/=]{8})$/, _k = (e) => gk.exec(e)?.[1] ?? e, vk = (e, t) => {
		let n = [];
		for (let r in e) n.push(t.mark(_k(r), e[r]));
		return n;
	}, yk = (e) => {
		let t = e.doc, n = e._item;
		if (!t || !n) throw H();
		t.transact((e) => {
			n.delete(e);
		}, Z);
	}, bk = (e) => e instanceof Error ? e : Error(String(e)), xk = (e, t, n, r, i, a) => {
		let o = e.toDelta(r, i, a);
		try {
			return o.map((e) => t.text(e.insert, vk(e.attributes, t)));
		} catch (t) {
			return n.reportInvalidContent ? n.reportInvalidContent(bk(t)) : yk(e), null;
		}
	}, Sk = (e) => {
		var t;
		let n = (t = e._item) == null || (t = t.right) == null ? void 0 : t.content, r = n instanceof eO ? n.type : null;
		if (!(r instanceof mD)) return;
		let i = r._item, a = r.doc;
		i && a && !i.deleted && i.id.client === a.clientID && (e.applyDelta([{ retain: e.length }, ...r.toDelta()]), a.transact((e) => {
			i.delete(e);
		}));
	}, Ck = (e, t, n, r) => {
		if (e._item) {
			if (!rk(e._item, t)) return r ? r("removed", e._item.id) : { type: "removed" };
			if (!rk(e._item, n)) return r ? r("added", e._item.id) : { type: "added" };
		}
	}, wk = (e, t, n) => {
		e.mapping.set(t, n);
		let r = mk.get(e.mapping);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), mk.set(e.mapping, r)), r.set(t, n);
	}, Tk = (e, t, n, r, i, a) => {
		let o = n.mapping.get(e), s = Array.isArray(o) ? void 0 : o;
		if (s !== void 0 && mk.get(n.mapping)?.get(e) === s) return s;
		let c = [], l = !1, u = (e) => {
			if (e instanceof Y) {
				let o = Tk(e, t, n, r, i, a);
				(o === null || n.mapping.get(e) !== o) && (l = !0), o !== null && c.push(o);
				return;
			}
			if (!(e instanceof CD)) return;
			n.deferTextMerge ? n.deferTextMerge(e) : Sk(e);
			let o = xk(e, t, n, r, i, a);
			o === null && (l = !0), o?.forEach((e) => c.push(e));
		};
		r === void 0 || i === void 0 ? e.toArray().forEach(u) : kE(e, new kT(i.ds, r.sv)).forEach(u);
		try {
			let o = e.getAttributes(r), u = r ? Ck(e, r, i, a) : void 0;
			u !== void 0 && (o.ychange = u);
			let d = t.node(e.nodeName, o, c);
			return s?.eq(d) && (d = s), l && n.reportInvalidContent ? (hk(n.mapping, e), d) : (wk(n, e, d), d);
		} catch (t) {
			return hk(n.mapping, e), n.reportInvalidContent ? (n.reportInvalidContent(bk(t)), null) : (yk(e), null);
		}
	}, Ek = (e) => {
		for (let t = 6; t < e.length; t++) e[t % 6] = e[t % 6] ^ e[t];
		return e.slice(0, 6);
	}, Dk = (e) => yS(Ek(wO(xS(e)))), Ok = (e, t) => {
		let n = {};
		return e.forEach((e) => {
			if (e.type.name !== "ychange") {
				let r = Dy(t.isOMark, e.type, () => !e.type.excludes(e.type));
				n[r ? `${e.type.name}--${Dk(e.toJSON())}` : e.type.name] = e.attrs;
			}
		}), n;
	}, kk = (e, t) => {
		let n = new CD(), r = e.map((e) => ({
			insert: e.text ?? "",
			attributes: Ok(e.marks, t)
		}));
		return n.applyDelta(r), t.mapping.set(n, e), n;
	}, Ak = (e) => {
		let t = e.content.content, n = [];
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			if (r.isText) {
				let r = [];
				for (let n = t[e]; e < t.length && n.isText; n = t[++e]) r.push(n);
				e--, n.push(r);
			} else n.push(r);
		}
		return n;
	}, jk = (e, t) => e instanceof Array ? kk(e, t) : Mk(e, t), Mk = (e, t) => {
		let n = new Y(e.type.name);
		for (let t in e.attrs) {
			let r = e.attrs[t];
			r !== null && t !== "ychange" && n.setAttribute(t, r);
		}
		return n.insert(0, Ak(e).map((e) => jk(e, t))), t.mapping.set(n, e), n;
	}, Nk = (e) => typeof e == "object" && !!e, Pk = (e, t) => {
		let n = Object.keys(e).filter((t) => e[t] !== null), r = n.length === Object.keys(t).filter((e) => t[e] !== null).length;
		for (let i = 0; i < n.length && r; i++) {
			let a = n[i], o = e[a], s = t[a];
			r = a === "ychange" || o === s || Nk(o) && Nk(s) && Pk(o, s);
		}
		return r;
	}, Fk = (e, t) => {
		let n = e.toDelta();
		return n.length === t.length && n.every((e, n) => e.insert === t[n].text && Ux(e.attributes || {}).length === t[n].marks.length && Object.entries(e.attributes ?? {}).every(([e, r]) => {
			let i = _k(e), a = t[n].marks.find((e) => e.type.name === i);
			return a ? Pk(r, a.attrs) : !1;
		}));
	}, Ik = (e, t) => !(t instanceof Array) && e.nodeName === t.type.name, Lk = (e, t) => {
		if (e instanceof Y && !(t instanceof Array) && Ik(e, t)) {
			let n = Ak(t);
			return e._length === n.length && Pk(e.getAttributes(), t.attrs) && e.toArray().every((e, t) => Lk(e, n[t]));
		}
		return e instanceof CD && t instanceof Array && Fk(e, t);
	}, Rk = (e, t) => e === t || e instanceof Array && t instanceof Array && e.length === t.length && e.every((e, n) => t[n] === e), zk = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		t.forEach((e, t) => {
			r.has(e) || r.set(e, t);
		});
		let i = [];
		if (e.forEach((e, a) => {
			let o = n.mapping.get(e), s = o === void 0 ? void 0 : r.get(o);
			s !== void 0 && Rk(o, t[s]) && i.push({
				yIndex: a,
				pIndex: s,
				yChild: e
			});
		}), i.length === 0) return [];
		let a = [], o = [];
		for (let e = 0; e < i.length; e++) {
			let t = 0, n = o.length;
			for (; t < n;) {
				let r = t + n >> 1;
				i[o[r]].pIndex < i[e].pIndex ? t = r + 1 : n = r;
			}
			a[e] = t > 0 ? o[t - 1] : -1, o[t] = e;
		}
		let s = [];
		for (let e = o[o.length - 1]; e !== -1; e = a[e]) s.push(i[e]);
		return s.reverse();
	}, Bk = (e) => {
		let t = "", n = e._start, r = {};
		for (; n !== null;) n.deleted || (n.countable && n.content instanceof WD ? t += n.content.str : n.content instanceof LD && (r[n.content.key] = null)), n = n.right;
		return {
			str: t,
			nAttrs: r
		};
	}, Vk = (e, t, n) => {
		n.mapping.set(e, t);
		let { nAttrs: r, str: i } = Bk(e), a = t.map((e) => ({
			insert: e.text ?? "",
			attributes: Object.assign({}, r, Ok(e.marks, n))
		})), { insert: o, remove: s, index: c } = kO(i, a.map((e) => e.insert).join(""));
		e.delete(c, s), e.insert(c, o), e.applyDelta(a.map((e) => ({
			retain: e.insert.length,
			attributes: e.attributes
		})));
	}, Hk = (e, t, n, r, i) => t instanceof CD && n instanceof Array ? (Fk(t, n) ? r.mapping.set(t, n) : Vk(t, n, r), !0) : t instanceof Y && !(n instanceof Array) && Ik(t, n) ? (Lk(t, n) ? r.mapping.set(t, n) : i(e, t, n, r), !0) : !1, Uk = (e, t, n, r) => {
		n > 0 && (e.slice(t, t + n).forEach((e) => hk(r.mapping, e)), e.delete(t, n));
	}, Wk = (e, t, n, r, i, a) => {
		if (r < i) {
			let o = [];
			for (let e = r; e < i; e++) o.push(jk(n[e], a));
			e.insert(t, o);
		}
	}, Gk = (e, t, n, r, i, a, o, s, c, l) => {
		let u = Ky(a - i, s - o);
		for (let a = 0; a < u; a++) {
			let s = r[i + a], u = n[o + a];
			Hk(e, s, u, c, l) || (Uk(t, o + a, 1, c), Wk(t, o + a, n, o + a, o + a + 1, c));
		}
		Uk(t, o + u, a - i - u, c), Wk(t, o + u, n, o + u, s, c);
	}, Kk = (e, t, n, r, i, a) => {
		let o = zk(r, n, i);
		if (o.length < 2 || !o.some((e) => e.yIndex !== e.pIndex) || o.some((e) => {
			let t = n[e.pIndex];
			return !(e.yChild instanceof CD && t instanceof Array || e.yChild instanceof Y && !(t instanceof Array));
		})) return !1;
		let s = 0, c = 0;
		for (let l of o) {
			Gk(e, t, n, r, s, l.yIndex, c, l.pIndex, i, a);
			let o = n[l.pIndex];
			Hk(e, l.yChild, o, i, a), s = l.yIndex + 1, c = l.pIndex + 1;
		}
		return Gk(e, t, n, r, s, r.length, c, n.length, i, a), !0;
	}, qk = (e, t, n) => {
		let r = e.toArray(), i = Ak(t), a = i.length, o = r.length, s = Ky(o, a), c = 0, l = 0, u = !1;
		for (; c < s; c++) {
			let e = r[c], t = i[c];
			if (Rk(n.mapping.get(e), t)) u = !0;
			else if (!Lk(e, t)) break;
		}
		for (; c + l < s; l++) {
			let e = r[o - l - 1], t = i[a - l - 1];
			if (Rk(n.mapping.get(e), t)) u = !0;
			else if (!Lk(e, t)) break;
		}
		return {
			equalityFactor: c + l,
			foundMappedChild: u
		};
	}, Jk = (e, t, n, r) => {
		if (t instanceof Y && t.nodeName !== n.type.name) throw Error("node name mismatch!");
		if (r.mapping.set(t, n), t instanceof Y) {
			let e = t.getAttributes(), r = n.attrs;
			for (let n in r) r[n] === null ? t.removeAttribute(n) : e[n] !== r[n] && n !== "ychange" && t.setAttribute(n, r[n]);
			for (let n in e) r[n] === void 0 && t.removeAttribute(n);
		}
		let i = Ak(n), a = i.length, o = t.toArray(), s = o.length, c = Ky(a, s), l = !1;
		if (e.transact(() => {
			l = Kk(e, t, i, o, r, Jk);
		}, Z), l) return;
		let u = 0, d = 0;
		for (; u < c; u++) {
			let e = o[u], t = i[u];
			if (!Rk(r.mapping.get(e), t)) {
				if (!Lk(e, t)) break;
				r.mapping.set(e, t);
			}
		}
		for (; d + u + 1 < c; d++) {
			let e = o[s - d - 1], t = i[a - d - 1];
			if (!Rk(r.mapping.get(e), t)) {
				if (!Lk(e, t)) break;
				r.mapping.set(e, t);
			}
		}
		e.transact(() => {
			for (; s - u - d > 0 && a - u - d > 0;) {
				let n = o[u], c = i[u], l = o[s - d - 1], f = i[a - d - 1];
				if (n instanceof CD && c instanceof Array) {
					Fk(n, c) || Vk(n, c, r), u += 1;
					continue;
				}
				let p = n instanceof Y && Ik(n, c), m = l instanceof Y && Ik(l, f);
				if (p && m && n instanceof Y && l instanceof Y && !Array.isArray(c) && !Array.isArray(f)) {
					let e = qk(n, c, r), t = qk(l, f, r);
					e.foundMappedChild && !t.foundMappedChild ? m = !1 : !e.foundMappedChild && t.foundMappedChild || e.equalityFactor < t.equalityFactor ? p = !1 : m = !1;
				}
				p && n instanceof Y && !Array.isArray(c) ? (Jk(e, n, c, r), u += 1) : m && l instanceof Y && !Array.isArray(f) ? (Jk(e, l, f, r), d += 1) : (hk(r.mapping, t.get(u)), t.delete(u, 1), t.insert(u, [jk(c, r)]), u += 1);
			}
			let n = s - u - d;
			if (s === 1 && a === 0 && o[0] instanceof CD ? (hk(r.mapping, o[0]), o[0].delete(0, o[0].length)) : n > 0 && (t.slice(u, u + n).forEach((e) => hk(r.mapping, e)), t.delete(u, n)), u + d >= a) return;
			let c = [];
			for (let e = u; e < a - d; e++) c.push(jk(i[e], r));
			t.insert(u, c);
		}, Z);
	}, Yk = (e, t) => {
		let n = e.doc.content, r = 0, i = 0;
		for (; r < n.childCount && r < t.childCount && n.child(r) === t.child(r);) i += n.child(r).nodeSize, r++;
		let a = n.childCount, o = t.childCount, s = 0;
		for (; a > r && o > r && n.child(a - 1) === t.child(o - 1);) s += n.child(a - 1).nodeSize, a--, o--;
		if (r === a && r === o) return e;
		let c = new C(t.cut(i, t.size - s), 0, 0), l = Bt(e.doc, i, n.size - s, c);
		return l !== null && l.apply(e.doc).doc?.content.eq(t) ? e.step(l) : e.replace(0, n.size, new C(t, 0, 0));
	}, Xk = class {
		constructor(e, t = /* @__PURE__ */ new Map(), n) {
			if (this.prosemirrorView = null, this.mux = mO(), this.isOMark = /* @__PURE__ */ new Map(), this.beforeTransactionSelection = null, this._domSelectionInView = null, this._invalidContentError = null, this.projectionError = null, this.hasSharedContent = !1, this.pendingTextMerges = [], this.type = e, this.mapping = t, this._observeFunction = this._typeChanged.bind(this), n && (this.onInvalidContent = n, this.reportInvalidContent = (e) => {
				this.projectionError ??= e;
			}, this.deferTextMerge = (e) => {
				this.pendingTextMerges.push(e);
			}), e.doc === null) throw Error("The Yjs fragment must belong to a document");
			this.doc = e.doc, this.beforeAllTransactions = () => {
				this._invalidContentError === null && this.beforeTransactionSelection === null && this.prosemirrorView != null && (this.beforeTransactionSelection = pk(this, this.view.state));
			}, this.afterAllTransactions = () => {
				this.beforeTransactionSelection = null;
			};
		}
		get invalidContentError() {
			return this._invalidContentError;
		}
		get view() {
			if (!this.prosemirrorView) throw Error("The binding has no editor view");
			return this.prosemirrorView;
		}
		get _tr() {
			return this.view.state.tr.setMeta("addToHistory", !1);
		}
		_isLocalCursorInView() {
			return this.view.hasFocus() ? (aS && this._domSelectionInView === null && (QC(0, () => {
				this._domSelectionInView = null;
			}), this._domSelectionInView = this._isDomSelectionInView()), this._domSelectionInView) : !1;
		}
		_isDomSelectionInView() {
			let e = this.view.root, t = "getSelection" in e && typeof e.getSelection == "function" ? e.getSelection() : this.view.dom.ownerDocument.getSelection();
			if (t == null || t.anchorNode == null || t.focusNode == null) return !1;
			let n = this.view.dom.ownerDocument.createRange();
			n.setStart(t.anchorNode, t.anchorOffset), n.setEnd(t.focusNode, t.focusOffset), n.getClientRects().length === 0 && n.startContainer && n.collapsed && n.selectNodeContents(n.startContainer);
			let r = n.getBoundingClientRect(), i = UC.documentElement;
			return r.bottom >= 0 && r.right >= 0 && r.left <= (window.innerWidth || i.clientWidth || 0) && r.top <= (window.innerHeight || i.clientHeight || 0);
		}
		renderSnapshot(e, t) {
			t ||= AT(Nw(), /* @__PURE__ */ new Map()), this.view.dispatch(this._tr.setMeta(Z, {
				snapshot: e,
				prevSnapshot: t
			}));
		}
		createDocumentContent() {
			this.projectionError = null, this.pendingTextMerges = [];
			let e = this.type.toArray().map((e) => {
				if (!(e instanceof Y)) throw Kb();
				return Tk(e, this.view.state.schema, this);
			}).filter((e) => e !== null), t = x.from(e), { topNodeType: n } = this.view.state.schema;
			this.hasSharedContent ||= this.type.length > 0;
			let r = t.childCount === 0 && !this.hasSharedContent;
			return this.reportInvalidContent && !r && !n.validContent(t) && this.reportInvalidContent(/* @__PURE__ */ RangeError("Shared content does not fit the document schema")), this.projectionError === null && this.pendingTextMerges.forEach(Sk), t;
		}
		updateInvalidContentError() {
			let e = this.projectionError, t = e !== null && this._invalidContentError === null;
			return this._invalidContentError = e, t ? e : null;
		}
		notifyInvalidContent(e) {
			var t;
			e && ((t = this.onInvalidContent) == null || t.call(this, e));
		}
		createDocumentTransaction() {
			let e = this.createDocumentContent();
			return this._tr.replace(0, this.view.state.doc.content.size, new C(e, 0, 0));
		}
		unrenderSnapshot() {
			this.mapping.clear(), mk.delete(this.mapping);
			let e = null;
			this.mux(() => {
				let t = this.createDocumentTransaction();
				e = this.updateInvalidContentError(), t.setMeta(Z, {
					snapshot: null,
					prevSnapshot: null
				}), this.view.dispatch(t);
			}), this.notifyInvalidContent(e);
		}
		_forceRerender() {
			this.mapping.clear(), mk.delete(this.mapping);
			let e = null;
			this.mux(() => {
				let t = this.beforeTransactionSelection === null ? this.view.state.selection : null, n = this.createDocumentTransaction();
				if (e = this.updateInvalidContentError(), t) {
					let e = Ky(qy(t.anchor, 0), n.doc.content.size), r = Ky(qy(t.head, 0), n.doc.content.size);
					n.setSelection(E.create(n.doc, e, r));
				}
				this.view.dispatch(n.setMeta(Z, {
					isChangeOrigin: !0,
					binding: this
				}));
			}), this.notifyInvalidContent(e);
		}
		_renderSnapshot(e, t, n) {
			let r = this.doc, i = this.type;
			if (e ||= MT(this.doc), e instanceof Uint8Array || t instanceof Uint8Array) {
				if (!(e instanceof Uint8Array) || !(t instanceof Uint8Array)) throw H();
				if (r = new zw({ gc: !1 }), eT(r, t), t = MT(r), eT(r, e), e = MT(r), i._item === null) {
					let e = Array.from(this.doc.share.keys()).find((e) => Object.is(this.doc.share.get(e), i));
					i = r.getXmlFragment(e);
				} else {
					let e = r.store.clients.get(i._item.id.client) ?? [], t = e[RT(e, i._item.id.clock)];
					if (!(t instanceof X && t.content instanceof eO && t.content.type instanceof _D)) throw H();
					i = t.content.type;
				}
			}
			let a = e, o = t ?? jT;
			this.mapping.clear(), mk.delete(this.mapping), this.mux(() => {
				r.transact((e) => {
					let t = n.permanentUserData;
					t && t.dss.forEach((t) => {
						Dw(e, t, (e) => {});
					});
					let r = (e, r) => {
						let i = t ? e === "added" ? t.getUserByClientId(r.client) : t.getUserByDeletedId(r) : null;
						return {
							user: i,
							type: e,
							color: ik(n.colorMapping, n.colors, i)
						};
					}, s = kE(i, new kT(o.ds, a.sv)).map((e) => !(e instanceof Y) || !e._item ? null : !e._item.deleted || rk(e._item, a) || rk(e._item, o) ? Tk(e, this.view.state.schema, {
						mapping: /* @__PURE__ */ new Map(),
						isOMark: /* @__PURE__ */ new Map(),
						reportInvalidContent: this.reportInvalidContent ? () => {} : void 0,
						deferTextMerge: this.reportInvalidContent ? () => {} : void 0
					}, a, o, r) : null).filter((e) => e !== null), c = this._tr.replace(0, this.view.state.doc.content.size, new C(x.from(s), 0, 0));
					this.view.dispatch(c.setMeta(Z, { isChangeOrigin: !0 }));
				}, Z);
			});
		}
		_typeChanged(e, t) {
			if (this.prosemirrorView == null) return;
			let n = zO(this.view.state);
			if (e.length === 0 || n.snapshot != null || n.prevSnapshot != null) {
				this.renderSnapshot(n.snapshot, n.prevSnapshot);
				return;
			}
			let r = t.origin instanceof nE, i = r ? t.origin.currStackItem?.meta.get(this) : void 0, a = i || this.beforeTransactionSelection, o = i ? void 0 : this.view.state.doc, s = null;
			this.mux(() => {
				let e = (e, t) => hk(this.mapping, t);
				Dw(t, t.deleteSet, (e) => {
					e instanceof X && e.content instanceof eO && hk(this.mapping, e.content.type);
				}), t.changed.forEach(e), t.changedParentTypes.forEach(e);
				let n = Yk(this._tr, this.createDocumentContent());
				s = this.updateInvalidContentError(), this._invalidContentError === null && uk(n, a, this, o), n = n.setMeta(Z, {
					isChangeOrigin: !0,
					isUndoRedoOperation: r
				}), this.beforeTransactionSelection !== null && this._isLocalCursorInView() && n.scrollIntoView(), this.view.dispatch(n);
			}), this.notifyInvalidContent(s);
		}
		_prosemirrorChanged(e) {
			if (this._invalidContentError !== null) return;
			let t = zO(this.view.state);
			t.snapshot == null && t.prevSnapshot == null && this.doc.transact(() => {
				Jk(this.doc, this.type, e, this), this.hasSharedContent ||= this.type.length > 0, this.beforeTransactionSelection = pk(this, this.view.state);
			}, Z);
		}
		initView(e) {
			this.prosemirrorView != null && this.destroy(), this.prosemirrorView = e, this.doc.on("beforeAllTransactions", this.beforeAllTransactions), this.doc.on("afterAllTransactions", this.afterAllTransactions), this.type.observeDeep(this._observeFunction);
		}
		destroy() {
			this.prosemirrorView != null && (this.prosemirrorView = null, this.type.unobserveDeep(this._observeFunction), this.doc.off("beforeAllTransactions", this.beforeAllTransactions), this.doc.off("afterAllTransactions", this.afterAllTransactions));
		}
	}, Zk = "__tiptap_position_migrations:", Qk = (e, t) => {
		let n = [];
		e.share.forEach((r, i) => {
			if (!i.startsWith(Zk) || t && !t.changed.has(r)) return;
			let a = e.getMap(i);
			a.size > 0 && n.push(a);
		}), n.length !== 0 && e.transact((e) => {
			e.meta.set("addToHistory", !1), n.forEach((e) => e.clear());
		}, Qk);
	}, $k = [{
		light: "#ecd44433",
		dark: "#ecd444"
	}], eA = (e, { colors: t = $k, colorMapping: n = /* @__PURE__ */ new Map(), permanentUserData: r = null, onFirstRender: i = () => {}, mapping: a, onInvalidContent: o } = {}) => {
		let s = !1, c = new Xk(e, a, o);
		return new O({
			filterTransaction: (e) => c.invalidContentError === null || !e.docChanged || e.getMeta(Z) !== void 0,
			props: { editable: (e) => {
				let t = zO(e);
				return c.invalidContentError === null && t.snapshot == null && t.prevSnapshot == null;
			} },
			key: Z,
			state: {
				init: (i, a) => ({
					type: e,
					doc: c.doc,
					binding: c,
					snapshot: null,
					prevSnapshot: null,
					isChangeOrigin: !1,
					isUndoRedoOperation: !1,
					addToHistory: !0,
					colors: t,
					colorMapping: n,
					permanentUserData: r
				}),
				apply: (e, t) => {
					let n = e.getMeta(Z);
					return n !== void 0 && (t = Object.assign({}, t, n)), e.docChanged && (t.addToHistory = e.getMeta("addToHistory") !== !1), t.isChangeOrigin = n !== void 0 && !!n.isChangeOrigin, t.isUndoRedoOperation = n !== void 0 && !!n.isChangeOrigin && !!n.isUndoRedoOperation, c.prosemirrorView === null || n === void 0 || n.snapshot == null && n.prevSnapshot == null || QC(0, () => {
						c.prosemirrorView != null && (n.restore == null ? c._renderSnapshot(n.snapshot, n.prevSnapshot, t) : c.invalidContentError === null ? (c._renderSnapshot(n.snapshot, n.snapshot, t), c.mux(() => {
							let e = c.prosemirrorView;
							e && (e.dispatch(c._tr.setMeta(Z, {
								restore: !1,
								snapshot: null,
								prevSnapshot: null,
								isChangeOrigin: !0
							})), c._prosemirrorChanged(e.state.doc));
						})) : c.unrenderSnapshot());
					}), t;
				}
			},
			view: (e) => {
				let t = (e) => Qk(c.doc, e);
				return Qk(c.doc), c.doc.on("afterTransaction", t), c.initView(e), a ?? c._forceRerender(), i(), {
					update: () => {
						let t = zO(e.state);
						if (t.snapshot == null && t.prevSnapshot == null) {
							let n = e.state.doc.type.createAndFill();
							if (!n) throw Error("The schema cannot create an empty document");
							if (s || e.state.doc.content.findDiffStart(n.content) !== null) {
								if (s = !0, t.addToHistory === !1 && !t.isChangeOrigin) {
									let t = KO.getState(e.state), n = t && t.undoManager;
									n && n.stopCapturing();
								}
								c.mux(() => {
									t.doc.transact((n) => {
										n.meta.set("addToHistory", t.addToHistory), c._prosemirrorChanged(e.state.doc);
									}, Z);
								});
							}
						}
					},
					destroy: () => {
						c.doc.off("afterTransaction", t), c.destroy();
					}
				};
			}
		});
	}, tA = (e, t) => {
		let n = zO(e);
		if (n.binding.invalidContentError !== null || n.snapshot != null || n.prevSnapshot != null) return !1;
		let r = BO(e).undoManager;
		if (r != null) return r[t](), !0;
	}, nA = (e) => tA(e, "undo"), rA = (e) => tA(e, "redo"), iA = /* @__PURE__ */ new Set(["paragraph"]), aA = (e, t) => !(e instanceof X) || !(e.content instanceof eO) || !(e.content.type instanceof mD || e.content.type instanceof Y && t.has(e.content.type.nodeName)) || e.content.type._length === 0, oA = ({ protectedNodes: e = iA, trackedOrigins: t = [], undoManager: n = null } = {}) => new O({
		key: KO,
		state: {
			init: (r, i) => {
				let a = zO(i), o = /* @__PURE__ */ new Set(), s = n;
				if (!s) {
					let n = new Set(a.doc._observers.get("destroy"));
					s = new nE(a.type, {
						trackedOrigins: /* @__PURE__ */ new Set([Z, ...t]),
						deleteFilter: (t) => aA(t, e),
						captureTransaction: (e) => e.meta.get("addToHistory") !== !1
					}), (a.doc._observers.get("destroy") ?? /* @__PURE__ */ new Set()).forEach((e) => {
						n.has(e) || o.add(e);
					});
				}
				return {
					undoManager: s,
					prevSel: null,
					hasUndoOps: s.undoStack.length > 0,
					hasRedoOps: s.redoStack.length > 0,
					destroyListeners: o
				};
			},
			apply: (e, t, n, r) => {
				let i = zO(r).binding, a = i && i.invalidContentError === null;
				return {
					...t,
					prevSel: a ? pk(i, n) : t.prevSel,
					hasUndoOps: t.undoManager.undoStack.length > 0,
					hasRedoOps: t.undoManager.redoStack.length > 0
				};
			}
		},
		view: (e) => {
			let t = zO(e.state), { undoManager: n, destroyListeners: r } = BO(e.state);
			return n.on("stack-item-added", ({ stackItem: r }) => {
				let i = t.binding;
				if (i) {
					let t = n.undoing || n.redoing ? i.beforeTransactionSelection : BO(e.state).prevSel;
					r.meta.set(i, t);
				}
			}), { destroy: () => {
				n.destroy(), r.forEach((e) => n.doc.off("destroy", e)), r.clear();
			} };
		}
	});
}));
// node_modules/@tiptap/extension-collaboration/dist/index.js
function cA(e) {
	return !!e.getMeta(Z);
}
function lA(e, t) {
	if (t === null) return 0;
	let n = dA(e);
	return GO(n.doc, n.type, t, n.binding.mapping) || 0;
}
function uA(e, t) {
	let n = dA(e);
	return HO(t, n.type, n.binding.mapping);
}
function dA(e) {
	let t = Z.getState(e);
	if (!t) throw Error("Collaboration requires the Yjs sync plugin");
	return t;
}
function fA(e, t) {
	return new hA(e, uA(t, e));
}
function pA(e, t, n) {
	let r = e instanceof hA ? e.yRelativePosition : null;
	if (cA(t) && r) return {
		position: new hA(lA(n, r), r),
		mapResult: null
	};
	let i = Nu(e, t), a = i.position.position;
	return {
		position: new hA(a, r ?? uA(n, a)),
		mapResult: i.mapResult
	};
}
function mA(e) {
	let t = KO.getState(e);
	if (!t) throw Error("Collaboration requires the Yjs undo plugin");
	return t.undoManager;
}
var hA, gA, _A, vA = e((() => {
	I(), Fr(), sA(), hA = class e extends Bf {
		constructor(e, t) {
			super(e), this.yRelativePosition = t;
		}
		static fromJSON(t) {
			return new e(t.position, t.yRelativePosition);
		}
		toJSON() {
			return {
				position: this.position,
				yRelativePosition: this.yRelativePosition
			};
		}
	}, gA = F.create({
		name: "collaboration",
		priority: 1e3,
		addOptions() {
			return {
				document: null,
				field: "default",
				fragment: null,
				provider: null
			};
		},
		addStorage() {
			return { isDisabled: !1 };
		},
		onCreate() {
			this.editor.extensionManager.extensions.find((e) => e.name === "undoRedo") && console.warn("[tiptap warn]: \"@tiptap/extension-collaboration\" comes with its own history support and is not compatible with \"@tiptap/extension-undo-redo\".");
		},
		onBeforeCreate() {
			this.editor.utils.getUpdatedPosition = (e, t) => pA(e, t, this.editor.state), this.editor.utils.createMappablePosition = (e) => fA(e, this.editor.state);
		},
		addCommands() {
			return {
				undo: () => ({ tr: e, state: t, dispatch: n }) => (e.setMeta("preventDispatch", !0), mA(t).undoStack.length === 0 ? !1 : n ? nA(t) ?? !1 : !0),
				redo: () => ({ tr: e, state: t, dispatch: n }) => (e.setMeta("preventDispatch", !0), mA(t).redoStack.length === 0 ? !1 : n ? rA(t) ?? !1 : !0)
			};
		},
		addKeyboardShortcuts() {
			return {
				"Mod-z": () => this.editor.commands.undo(),
				"Mod-y": () => this.editor.commands.redo(),
				"Shift-Mod-z": () => this.editor.commands.redo()
			};
		},
		addProseMirrorPlugins() {
			let e = this.options.fragment ? this.options.fragment : this.options.document.getXmlFragment(this.options.field), t = oA(this.options.yUndoOptions), n = t.spec.view;
			t.spec.view = (e) => {
				let t = mA(e.state);
				t.restore &&= (t.restore(), () => {});
				let r = n ? n(e) : void 0;
				return { destroy: () => {
					let e = t.trackedOrigins.has(t), n = t._observers;
					t.restore = () => {
						e && t.trackedOrigins.add(t), t.doc.on("afterTransaction", t.afterTransactionHandler), t._observers = n;
					}, r?.destroy && r.destroy();
				} };
			};
			let r = {
				...this.options.ySyncOptions,
				onFirstRender: this.options.onFirstRender
			};
			return this.editor.options.enableContentCheck && (r.onInvalidContent = (t) => {
				this.editor.emit("contentError", {
					error: t,
					editor: this.editor,
					disableCollaboration: () => {
						var t;
						this.storage.isDisabled = !0, (t = e.doc) == null || t.destroy();
					}
				});
			}), [
				eA(e, r),
				t,
				new O({ filterTransaction: (e, t) => (e.getMeta("inputRule") && mA(t).stopCapturing(), !0) }),
				this.editor.options.enableContentCheck && new O({
					key: new k("filterInvalidContent"),
					filterTransaction: (t) => {
						if (!cA(t)) return !0;
						if (this.storage.isDisabled) return !1;
						if (!t.docChanged) return !0;
						try {
							return t.doc.check(), !0;
						} catch (t) {
							return this.storage.isDisabled = !0, this.editor.emit("contentError", {
								error: t,
								editor: this.editor,
								disableCollaboration: () => {
									var t;
									(t = e.doc) == null || t.destroy();
								}
							}), !0;
						}
					}
				})
			].filter((e) => e !== !1);
		}
	}), _A = gA;
})), yA, bA, xA, SA, CA, wA, TA = e((() => {
	I(), Fr(), sA(), yA = (e) => Array.from(e.entries()).map(([e, t]) => t && t.user ? {
		clientId: e,
		...t.user
	} : { clientId: e }), bA = () => null, xA = (e) => _d(e) && /^#[0-9a-fA-F]{6}$/.test(e), SA = (e) => ({
		...e,
		color: xA(e.color) ? e.color : "transparent"
	}), CA = F.create({
		name: "collaborationCaret",
		priority: 999,
		addOptions() {
			return {
				provider: null,
				user: {
					name: null,
					color: null
				},
				render: (e) => {
					let t = document.createElement("span"), { color: n } = SA(e);
					t.classList.add("collaboration-carets__caret"), t.style.borderColor = n;
					let r = document.createElement("div");
					return r.classList.add("collaboration-carets__label"), r.style.backgroundColor = n, r.insertBefore(document.createTextNode(e.name), null), t.insertBefore(r, null), t;
				},
				selectionRender: (e) => xA(e.color) ? ZO({
					name: e.name,
					color: e.color
				}) : {},
				onUpdate: bA
			};
		},
		onCreate() {
			if (this.options.onUpdate !== bA && console.warn("[tiptap warn]: DEPRECATED: The \"onUpdate\" option is deprecated. Please use `editor.storage.collaborationCaret.users` instead. Read more: https://tiptap.dev/api/extensions/collaboration-caret"), !this.options.provider) throw Error("The \"provider\" option is required for the CollaborationCaret extension");
		},
		addStorage() {
			return { users: [] };
		},
		addCommands() {
			return {
				updateUser: (e) => () => (this.options.provider.awareness.setLocalStateField("user", e), !0),
				user: (e) => ({ editor: t }) => (console.warn("[tiptap warn]: DEPRECATED: The \"user\" command is deprecated. Please use \"updateUser\" instead. Read more: https://tiptap.dev/api/extensions/collaboration-caret"), t.commands.updateUser(e))
			};
		},
		addProseMirrorPlugins() {
			let { provider: e } = this.options, t = this.storage, n = this.options.user;
			return [new O({
				key: new k("collaborationCaretAwarenessListener"),
				view: () => {
					let r = () => {
						t.users = yA(e.awareness.states);
					};
					return e.awareness.setLocalStateField("user", n), t.users = yA(e.awareness.states), e.awareness.on("update", r), { destroy: () => {
						e.awareness.off("update", r), t.users = [];
					} };
				}
			}), nk(e.awareness, {
				cursorBuilder: (e) => this.options.render(SA(e)),
				selectionBuilder: (e) => this.options.selectionRender(SA(e))
			})];
		}
	}), wA = CA;
})), EA, DA, OA, kA = e((() => {
	I(), EA = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, DA = Wp.create({
		name: "image",
		addOptions() {
			return {
				inline: !1,
				allowBase64: !1,
				HTMLAttributes: {},
				resize: !1
			};
		},
		inline() {
			return this.options.inline;
		},
		group() {
			return this.options.inline ? "inline" : "block";
		},
		draggable: !0,
		addAttributes() {
			return {
				src: { default: null },
				alt: { default: null },
				title: { default: null },
				width: { default: null },
				height: { default: null }
			};
		},
		parseHTML() {
			return [{ tag: this.options.allowBase64 ? "img[src]" : "img[src]:not([src^=\"data:\"])" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return ["img", P(this.options.HTMLAttributes, e)];
		},
		parseMarkdown: (e, t) => t.createNode("image", {
			src: e.href,
			title: e.title,
			alt: e.text
		}),
		renderMarkdown: (e) => {
			let t = e.attrs?.src ?? "", n = e.attrs?.alt ?? "", r = e.attrs?.title ?? "";
			return r ? `![${n}](${t} "${r}")` : `![${n}](${t})`;
		},
		addNodeView() {
			if (!this.options.resize || !this.options.resize.enabled || typeof document > "u") return null;
			let { directions: e, minWidth: t, minHeight: n, alwaysPreserveAspectRatio: r } = this.options.resize, i = /* @__PURE__ */ new Set([
				"src",
				"width",
				"height"
			]);
			return ({ node: a, getPos: o, HTMLAttributes: s, editor: c }) => {
				let l = document.createElement("img");
				l.draggable = !1;
				let u = P(this.options.HTMLAttributes, s);
				Object.entries(u).forEach(([e, t]) => {
					if (t != null) switch (e) {
						case "src":
						case "width":
						case "height": break;
						default: l.setAttribute(e, t);
					}
				}), u.src !== null && (l.src = u.src);
				let d = { ...s }, f = (e) => {
					typeof e == "string" && e !== "" ? l.getAttribute("src") !== e && (l.src = e) : (l.hasAttribute("src") && l.removeAttribute("src"), l.src !== "" && (l.src = ""));
				};
				f(s.src);
				let p = new Up({
					element: l,
					editor: c,
					node: a,
					getPos: o,
					onResize: (e, t) => {
						l.style.width = `${e}px`, l.style.height = `${t}px`;
					},
					onCommit: (e, t) => {
						let n = o();
						n !== void 0 && this.editor.chain().setNodeSelection(n).updateAttributes(this.name, {
							width: e,
							height: t
						}).run();
					},
					onUpdate: (e) => {
						if (e.type !== a.type) return !1;
						let t = au(e, c.extensionManager.attributes.filter((t) => t.type === e.type.name));
						return Object.keys(d).forEach((e) => {
							!i.has(e) && !(e in t) && l.removeAttribute(e);
						}), Object.entries(t).forEach(([e, t]) => {
							i.has(e) || (t == null ? l.removeAttribute(e) : l.setAttribute(e, t));
						}), f(t.src), d = t, !0;
					},
					options: {
						directions: e,
						min: {
							width: t,
							height: n
						},
						preserveAspectRatio: r === !0
					}
				}), m = p.dom, h = () => {
					m.style.visibility = "", m.style.pointerEvents = "";
				};
				return m.style.visibility = "hidden", m.style.pointerEvents = "none", l.complete && l.naturalWidth > 0 ? h() : (l.onload = h, l.onerror = h), p;
			};
		},
		addCommands() {
			return { setImage: (e) => ({ commands: t }) => t.insertContent({
				type: this.name,
				attrs: e
			}) };
		},
		addInputRules() {
			return [Fd({
				find: EA,
				type: this.type,
				getAttributes: (e) => {
					let [, , t, n, r] = e;
					return {
						src: n,
						alt: t,
						title: r
					};
				}
			})];
		}
	}), OA = DA;
}));
// node_modules/prosemirror-tables/dist/index.js
function AA(e) {
	if (e.type.spec.tableRole != "table") throw RangeError("Not a table node: " + e.type.name);
	let t = jA(e), n = e.childCount, r = [], i = 0, a = null, o = [];
	for (let e = 0, i = t * n; e < i; e++) r[e] = 0;
	for (let s = 0, c = 0; s < n; s++) {
		let l = e.child(s);
		c++;
		for (let e = 0;; e++) {
			for (; i < r.length && r[i] != 0;) i++;
			if (e == l.childCount) break;
			let u = l.child(e), { colspan: d, rowspan: f, colwidth: p } = u.attrs;
			for (let e = 0; e < f; e++) {
				if (e + s >= n) {
					(a ||= []).push({
						type: "overlong_rowspan",
						pos: c,
						n: f - e
					});
					break;
				}
				let l = i + e * t;
				for (let e = 0; e < d; e++) {
					r[l + e] == 0 ? r[l + e] = c : (a ||= []).push({
						type: "collision",
						row: s,
						pos: c,
						n: d - e
					});
					let n = p && p[e];
					if (n) {
						let r = (l + e) % t * 2, i = o[r];
						i == null || i != n && o[r + 1] == 1 ? (o[r] = n, o[r + 1] = 1) : i == n && o[r + 1]++;
					}
				}
			}
			i += d, c += u.nodeSize;
		}
		let u = (s + 1) * t, d = 0;
		for (; i < u;) r[i++] == 0 && d++;
		d && (a ||= []).push({
			type: "missing",
			row: s,
			n: d
		}), c++;
	}
	(t === 0 || n === 0) && (a ||= []).push({ type: "zero_sized" });
	let s = new Q(t, n, r, a), c = !1;
	for (let e = 0; !c && e < o.length; e += 2) o[e] != null && o[e + 1] < n && (c = !0);
	return c && MA(s, o, e), s;
}
function jA(e) {
	let t = -1, n = !1;
	for (let r = 0; r < e.childCount; r++) {
		let i = e.child(r), a = 0;
		if (n) for (let t = 0; t < r; t++) {
			let n = e.child(t);
			for (let e = 0; e < n.childCount; e++) {
				let i = n.child(e);
				t + i.attrs.rowspan > r && (a += i.attrs.colspan);
			}
		}
		for (let e = 0; e < i.childCount; e++) {
			let t = i.child(e);
			a += t.attrs.colspan, t.attrs.rowspan > 1 && (n = !0);
		}
		t == -1 ? t = a : t != a && (t = Math.max(t, a));
	}
	return t;
}
function MA(e, t, n) {
	e.problems ||= [];
	let r = {};
	for (let i = 0; i < e.map.length; i++) {
		let a = e.map[i];
		if (r[a]) continue;
		r[a] = !0;
		let o = n.nodeAt(a);
		if (!o) throw RangeError(`No cell with offset ${a} found`);
		let s = null, c = o.attrs;
		for (let n = 0; n < c.colspan; n++) {
			let r = t[(i + n) % e.width * 2];
			r == null || c.colwidth && c.colwidth[n] == r || ((s ||= NA(c))[n] = r);
		}
		s && e.problems.unshift({
			type: "colwidth mismatch",
			pos: a,
			colwidth: s
		});
	}
}
function NA(e) {
	if (e.colwidth) return e.colwidth.slice();
	let t = [];
	for (let n = 0; n < e.colspan; n++) t.push(0);
	return t;
}
function PA(e) {
	let t = e.cached.tableNodeTypes;
	if (!t) {
		t = e.cached.tableNodeTypes = {};
		for (let n in e.nodes) {
			let r = e.nodes[n], i = r.spec.tableRole;
			i && (t[i] = r);
		}
	}
	return t;
}
function FA(e) {
	for (let t = e.depth - 1; t > 0; t--) if (e.node(t).type.spec.tableRole == "row") return e.node(0).resolve(e.before(t + 1));
	return null;
}
function IA(e) {
	for (let t = e.depth; t > 0; t--) {
		let n = e.node(t).type.spec.tableRole;
		if (n === "cell" || n === "header_cell") return e.node(t);
	}
	return null;
}
function LA(e) {
	let t = e.selection.$head;
	for (let e = t.depth; e > 0; e--) if (t.node(e).type.spec.tableRole == "row") return !0;
	return !1;
}
function RA(e) {
	let t = e.selection;
	if ("$anchorCell" in t && t.$anchorCell) return t.$anchorCell.pos > t.$headCell.pos ? t.$anchorCell : t.$headCell;
	if ("node" in t && t.node && t.node.type.spec.tableRole == "cell") return t.$anchor;
	let n = FA(t.$head) || zA(t.$head);
	if (n) return n;
	throw RangeError(`No cell found around position ${t.head}`);
}
function zA(e) {
	for (let t = e.nodeAfter, n = e.pos; t; t = t.firstChild, n++) {
		let r = t.type.spec.tableRole;
		if (r == "cell" || r == "header_cell") return e.doc.resolve(n);
	}
	for (let t = e.nodeBefore, n = e.pos; t; t = t.lastChild, n--) {
		let r = t.type.spec.tableRole;
		if (r == "cell" || r == "header_cell") return e.doc.resolve(n - t.nodeSize);
	}
}
function BA(e) {
	return e.parent.type.spec.tableRole == "row" && !!e.nodeAfter;
}
function VA(e) {
	return e.node(0).resolve(e.pos + e.nodeAfter.nodeSize);
}
function HA(e, t) {
	return e.depth == t.depth && e.pos >= t.start(-1) && e.pos <= t.end(-1);
}
function UA(e, t, n) {
	let r = e.node(-1), i = Q.get(r), a = e.start(-1), o = i.nextCell(e.pos - a, t, n);
	return o == null ? null : e.node(0).resolve(a + o);
}
function WA(e, t, n = 1) {
	let r = {
		...e,
		colspan: e.colspan - n
	};
	return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(t, n), r.colwidth.some((e) => e > 0) || (r.colwidth = null)), r;
}
function GA(e, t, n = 1) {
	let r = {
		...e,
		colspan: e.colspan + n
	};
	if (r.colwidth) {
		r.colwidth = r.colwidth.slice();
		for (let e = 0; e < n; e++) r.colwidth.splice(t, 0, 0);
	}
	return r;
}
function KA(e, t, n) {
	let r = PA(t.type.schema).header_cell;
	for (let i = 0; i < e.height; i++) if (t.nodeAt(e.map[n + i * e.width]).type != r) return !1;
	return !0;
}
function qA(e) {
	if (!(e.selection instanceof $)) return null;
	let t = [];
	return e.selection.forEachCell((e, n) => {
		t.push(sc.node(n, n + e.nodeSize, { class: "selectedCell" }));
	}), j.create(e.doc, t);
}
function JA({ $from: e, $to: t }) {
	if (e.pos == t.pos || e.pos < t.pos - 6) return !1;
	let n = e.pos, r = t.pos, i = e.depth;
	for (; i >= 0 && !(e.after(i + 1) < e.end(i)); i--, n++);
	for (let e = t.depth; e >= 0 && !(t.before(e + 1) > t.start(e)); e--, r--);
	return n == r && /row|table/.test(e.node(i).type.spec.tableRole);
}
function YA({ $from: e, $to: t }) {
	let n, r;
	for (let t = e.depth; t > 0; t--) {
		let r = e.node(t);
		if (r.type.spec.tableRole === "cell" || r.type.spec.tableRole === "header_cell") {
			n = r;
			break;
		}
	}
	for (let e = t.depth; e > 0; e--) {
		let n = t.node(e);
		if (n.type.spec.tableRole === "cell" || n.type.spec.tableRole === "header_cell") {
			r = n;
			break;
		}
	}
	return n !== r && t.parentOffset === 0;
}
function XA(e, t, n) {
	let r = (t || e).selection, i = (t || e).doc, a, o;
	if (r instanceof D && (o = r.node.type.spec.tableRole)) {
		if (o == "cell" || o == "header_cell") a = $.create(i, r.from);
		else if (o == "row") {
			let e = i.resolve(r.from + 1);
			a = $.rowSelection(e, e);
		} else if (!n) {
			let e = Q.get(r.node), t = r.from + 1, n = t + e.map[e.width * e.height - 1];
			a = $.create(i, t + 1, n);
		}
	} else r instanceof E && JA(r) ? a = E.create(i, r.from) : r instanceof E && YA(r) && (a = E.create(i, r.$from.start(), r.$from.end()));
	return a && (t ||= e.tr).setSelection(a), t;
}
function ZA(e, t, n, r) {
	let i = e.childCount, a = t.childCount;
	outer: for (let o = 0, s = 0; o < a; o++) {
		let a = t.child(o);
		for (let t = s, r = Math.min(i, o + 3); t < r; t++) if (e.child(t) == a) {
			s = t + 1, n += a.nodeSize;
			continue outer;
		}
		r(a, n), s < i && e.child(s).sameMarkup(a) ? ZA(e.child(s), a, n + 1, r) : a.nodesBetween(0, a.content.size, r, n + 1), n += a.nodeSize;
	}
}
function QA(e, t) {
	let n, r = (t, r) => {
		t.type.spec.tableRole == "table" && (n = $A(e, t, r, n));
	};
	return t ? t.doc != e.doc && ZA(t.doc, e.doc, 0, r) : e.doc.descendants(r), n;
}
function $A(e, t, n, r) {
	let i = Q.get(t);
	if (!i.problems) return r;
	r ||= e.tr;
	let a = [];
	for (let e = 0; e < i.height; e++) a.push(0);
	for (let e = 0; e < i.problems.length; e++) {
		let o = i.problems[e];
		if (o.type == "collision") {
			let e = t.nodeAt(o.pos);
			if (!e) continue;
			let i = e.attrs;
			for (let e = 0; e < i.rowspan; e++) a[o.row + e] += o.n;
			r.setNodeMarkup(r.mapping.map(n + 1 + o.pos), null, WA(i, i.colspan - o.n, o.n));
		} else if (o.type == "missing") a[o.row] += o.n;
		else if (o.type == "overlong_rowspan") {
			let e = t.nodeAt(o.pos);
			if (!e) continue;
			r.setNodeMarkup(r.mapping.map(n + 1 + o.pos), null, {
				...e.attrs,
				rowspan: e.attrs.rowspan - o.n
			});
		} else if (o.type == "colwidth mismatch") {
			let e = t.nodeAt(o.pos);
			if (!e) continue;
			r.setNodeMarkup(r.mapping.map(n + 1 + o.pos), null, {
				...e.attrs,
				colwidth: o.colwidth
			});
		} else if (o.type == "zero_sized") {
			let e = r.mapping.map(n);
			r.delete(e, e + t.nodeSize);
		}
	}
	let o, s;
	for (let e = 0; e < a.length; e++) a[e] && (o ??= e, s = e);
	for (let c = 0, l = n + 1; c < i.height; c++) {
		let n = t.child(c), i = l + n.nodeSize, u = a[c];
		if (u > 0) {
			let t = "cell";
			n.firstChild && (t = n.firstChild.type.spec.tableRole);
			let a = [];
			for (let n = 0; n < u; n++) {
				let n = PA(e.schema)[t].createAndFill();
				n && a.push(n);
			}
			let d = (c == 0 || o == c - 1) && s == c ? l + 1 : i - 1;
			r.insert(r.mapping.map(d), a);
		}
		l = i;
	}
	return r.setMeta(sM, { fixTables: !0 });
}
function ej(e) {
	let t = e.selection, n = RA(e), r = n.node(-1), i = n.start(-1), a = Q.get(r);
	return {
		...t instanceof $ ? a.rectBetween(t.$anchorCell.pos - i, t.$headCell.pos - i) : a.findCell(n.pos - i),
		tableStart: i,
		map: a,
		table: r
	};
}
function tj(e, { map: t, tableStart: n, table: r }, i) {
	let a = i > 0 ? -1 : 0;
	KA(t, r, i + a) && (a = i == 0 || i == t.width ? null : 0);
	for (let o = 0; o < t.height; o++) {
		let s = o * t.width + i;
		if (i > 0 && i < t.width && t.map[s - 1] == t.map[s]) {
			let a = t.map[s], c = r.nodeAt(a);
			e.setNodeMarkup(e.mapping.map(n + a), null, GA(c.attrs, i - t.colCount(a))), o += c.attrs.rowspan - 1;
		} else {
			let c = a == null ? PA(r.type.schema).cell : r.nodeAt(t.map[s + a]).type, l = t.positionAt(o, i, r);
			e.insert(e.mapping.map(n + l), c.createAndFill());
		}
	}
	return e;
}
function nj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e);
		t(tj(e.tr, n, n.left));
	}
	return !0;
}
function rj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e);
		t(tj(e.tr, n, n.right));
	}
	return !0;
}
function ij(e, { map: t, table: n, tableStart: r }, i) {
	let a = e.mapping.maps.length;
	for (let o = 0; o < t.height;) {
		let s = o * t.width + i, c = t.map[s], l = n.nodeAt(c), u = l.attrs;
		if (i > 0 && t.map[s - 1] == c || i < t.width - 1 && t.map[s + 1] == c) e.setNodeMarkup(e.mapping.slice(a).map(r + c), null, WA(u, i - t.colCount(c)));
		else {
			let t = e.mapping.slice(a).map(r + c);
			e.delete(t, t + l.nodeSize);
		}
		o += u.rowspan;
	}
}
function aj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e), r = e.tr;
		if (n.left == 0 && n.right == n.map.width) return !1;
		for (let e = n.right - 1; ij(r, n, e), e != n.left; e--) {
			let e = n.tableStart ? r.doc.nodeAt(n.tableStart - 1) : r.doc;
			if (!e) throw RangeError("No table found");
			n.table = e, n.map = Q.get(e);
		}
		t(r);
	}
	return !0;
}
function oj(e, t, n) {
	let r = PA(t.type.schema).header_cell;
	for (let i = 0; i < e.width; i++) if (t.nodeAt(e.map[i + n * e.width])?.type != r) return !1;
	return !0;
}
function sj(e, { map: t, tableStart: n, table: r }, i) {
	let a = n;
	for (let e = 0; e < i; e++) a += r.child(e).nodeSize;
	let o = [], s = i > 0 ? -1 : 0;
	oj(t, r, i + s) && (s = i == 0 || i == t.height ? null : 0);
	for (let a = 0, c = t.width * i; a < t.width; a++, c++) if (i > 0 && i < t.height && t.map[c] == t.map[c - t.width]) {
		let i = t.map[c], o = r.nodeAt(i).attrs;
		e.setNodeMarkup(n + i, null, {
			...o,
			rowspan: o.rowspan + 1
		}), a += o.colspan - 1;
	} else {
		let e = (s == null ? PA(r.type.schema).cell : r.nodeAt(t.map[c + s * t.width])?.type)?.createAndFill();
		e && o.push(e);
	}
	return e.insert(a, PA(r.type.schema).row.create(null, o)), e;
}
function cj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e);
		t(sj(e.tr, n, n.top));
	}
	return !0;
}
function lj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e);
		t(sj(e.tr, n, n.bottom));
	}
	return !0;
}
function uj(e, { map: t, table: n, tableStart: r }, i) {
	let a = 0;
	for (let e = 0; e < i; e++) a += n.child(e).nodeSize;
	let o = a + n.child(i).nodeSize, s = e.mapping.maps.length;
	e.delete(a + r, o + r);
	let c = /* @__PURE__ */ new Set();
	for (let a = 0, o = i * t.width; a < t.width; a++, o++) {
		let l = t.map[o];
		if (!c.has(l)) {
			if (c.add(l), i > 0 && l == t.map[o - t.width]) {
				let t = n.nodeAt(l).attrs;
				e.setNodeMarkup(e.mapping.slice(s).map(l + r), null, {
					...t,
					rowspan: t.rowspan - 1
				}), a += t.colspan - 1;
			} else if (i < t.height && l == t.map[o + t.width]) {
				let o = n.nodeAt(l), c = o.attrs, u = o.type.create({
					...c,
					rowspan: o.attrs.rowspan - 1
				}, o.content), d = t.positionAt(i + 1, a, n);
				e.insert(e.mapping.slice(s).map(r + d), u), a += c.colspan - 1;
			}
		}
	}
}
function dj(e, t) {
	if (!LA(e)) return !1;
	if (t) {
		let n = ej(e), r = e.tr;
		if (n.top == 0 && n.bottom == n.map.height) return !1;
		for (let e = n.bottom - 1; uj(r, n, e), e != n.top; e--) {
			let e = n.tableStart ? r.doc.nodeAt(n.tableStart - 1) : r.doc;
			if (!e) throw RangeError("No table found");
			n.table = e, n.map = Q.get(n.table);
		}
		t(r);
	}
	return !0;
}
function fj(e) {
	let t = e.content;
	return t.childCount == 1 && t.child(0).isTextblock && t.child(0).childCount == 0;
}
function pj({ width: e, height: t, map: n }, r) {
	let i = r.top * e + r.left, a = i, o = (r.bottom - 1) * e + r.left, s = i + (r.right - r.left - 1);
	for (let t = r.top; t < r.bottom; t++) {
		if (r.left > 0 && n[a] == n[a - 1] || r.right < e && n[s] == n[s + 1]) return !0;
		a += e, s += e;
	}
	for (let a = r.left; a < r.right; a++) {
		if (r.top > 0 && n[i] == n[i - e] || r.bottom < t && n[o] == n[o + e]) return !0;
		i++, o++;
	}
	return !1;
}
function mj(e, t) {
	let n = e.selection;
	if (!(n instanceof $) || n.$anchorCell.pos == n.$headCell.pos) return !1;
	let r = ej(e), { map: i } = r;
	if (pj(i, r)) return !1;
	if (t) {
		let n = e.tr, a = {}, o = x.empty, s, c;
		for (let e = r.top; e < r.bottom; e++) for (let t = r.left; t < r.right; t++) {
			let l = i.map[e * i.width + t], u = r.table.nodeAt(l);
			if (!a[l] && u) {
				if (a[l] = !0, s == null) s = l, c = u;
				else {
					fj(u) || (o = o.append(u.content));
					let e = n.mapping.map(l + r.tableStart);
					n.delete(e, e + u.nodeSize);
				}
			}
		}
		if (s == null || c == null) return !0;
		if (n.setNodeMarkup(s + r.tableStart, null, {
			...GA(c.attrs, c.attrs.colspan, r.right - r.left - c.attrs.colspan),
			rowspan: r.bottom - r.top
		}), o.size > 0) {
			let e = s + 1 + c.content.size, t = fj(c) ? s + 1 : e;
			n.replaceWith(t + r.tableStart, e + r.tableStart, o);
		}
		n.setSelection(new $(n.doc.resolve(s + r.tableStart))), t(n);
	}
	return !0;
}
function hj(e, t) {
	let n = PA(e.schema);
	return gj(({ node: e }) => n[e.type.spec.tableRole])(e, t);
}
function gj(e) {
	return (t, n) => {
		let r = t.selection, i, a;
		if (r instanceof $) {
			if (r.$anchorCell.pos != r.$headCell.pos) return !1;
			i = r.$anchorCell.nodeAfter, a = r.$anchorCell.pos;
		} else {
			if (i = IA(r.$from), !i) return !1;
			a = FA(r.$from)?.pos;
		}
		if (i == null || a == null || i.attrs.colspan == 1 && i.attrs.rowspan == 1) return !1;
		if (n) {
			let o = i.attrs, s = [], c = o.colwidth;
			o.rowspan > 1 && (o = {
				...o,
				rowspan: 1
			}), o.colspan > 1 && (o = {
				...o,
				colspan: 1
			});
			let l = ej(t), u = t.tr;
			for (let e = 0; e < l.right - l.left; e++) s.push(c ? {
				...o,
				colwidth: c && c[e] ? [c[e]] : null
			} : o);
			let d;
			for (let t = l.top; t < l.bottom; t++) {
				let n = l.map.positionAt(t, l.left, l.table);
				t == l.top && (n += i.nodeSize);
				for (let r = l.left, a = 0; r < l.right; r++, a++) (r != l.left || t != l.top) && u.insert(d = u.mapping.map(n + l.tableStart, 1), e({
					node: i,
					row: t,
					col: r
				}).createAndFill(s[a]));
			}
			u.setNodeMarkup(a, e({
				node: i,
				row: l.top,
				col: l.left
			}), s[0]), r instanceof $ && u.setSelection(new $(u.doc.resolve(r.$anchorCell.pos), d ? u.doc.resolve(d) : void 0)), n(u);
		}
		return !0;
	};
}
function _j(e, t) {
	return function(n, r) {
		if (!LA(n)) return !1;
		let i = RA(n);
		if (i.nodeAfter.attrs[e] === t) return !1;
		if (r) {
			let a = n.tr;
			n.selection instanceof $ ? n.selection.forEachCell((n, r) => {
				n.attrs[e] !== t && a.setNodeMarkup(r, null, {
					...n.attrs,
					[e]: t
				});
			}) : a.setNodeMarkup(i.pos, null, {
				...i.nodeAfter.attrs,
				[e]: t
			}), r(a);
		}
		return !0;
	};
}
function vj(e) {
	return function(t, n) {
		if (!LA(t)) return !1;
		if (n) {
			let r = PA(t.schema), i = ej(t), a = t.tr, o = i.map.cellsInRect(e == "column" ? {
				left: i.left,
				top: 0,
				right: i.right,
				bottom: i.map.height
			} : e == "row" ? {
				left: 0,
				top: i.top,
				right: i.map.width,
				bottom: i.bottom
			} : i), s = o.map((e) => i.table.nodeAt(e));
			for (let e = 0; e < o.length; e++) s[e].type == r.header_cell && a.setNodeMarkup(i.tableStart + o[e], r.cell, s[e].attrs);
			if (a.steps.length === 0) for (let e = 0; e < o.length; e++) a.setNodeMarkup(i.tableStart + o[e], r.header_cell, s[e].attrs);
			n(a);
		}
		return !0;
	};
}
function yj(e, t, n) {
	let r = t.map.cellsInRect({
		left: 0,
		top: 0,
		right: e == "row" ? t.map.width : 1,
		bottom: e == "column" ? t.map.height : 1
	});
	for (let e = 0; e < r.length; e++) {
		let i = t.table.nodeAt(r[e]);
		if (i && i.type !== n.header_cell) return !1;
	}
	return !0;
}
function bj(e, t) {
	return t ||= { useDeprecatedLogic: !1 }, t.useDeprecatedLogic ? vj(e) : function(t, n) {
		if (!LA(t)) return !1;
		if (n) {
			let r = PA(t.schema), i = ej(t), a = t.tr, o = yj("row", i, r), s = yj("column", i, r), c = (e === "column" ? o : e === "row" && s) ? 1 : 0, l = e == "column" ? {
				left: 0,
				top: c,
				right: 1,
				bottom: i.map.height
			} : e == "row" ? {
				left: c,
				top: 0,
				right: i.map.width,
				bottom: 1
			} : i, u = e == "column" ? s ? r.cell : r.header_cell : e == "row" ? o ? r.cell : r.header_cell : r.cell;
			i.map.cellsInRect(l).forEach((e) => {
				let t = e + i.tableStart, n = a.doc.nodeAt(t);
				n && a.setNodeMarkup(t, u, n.attrs);
			}), n(a);
		}
		return !0;
	};
}
function xj(e, t) {
	if (t < 0) {
		let t = e.nodeBefore;
		if (t) return e.pos - t.nodeSize;
		for (let t = e.index(-1) - 1, n = e.before(); t >= 0; t--) {
			let r = e.node(-1).child(t), i = r.lastChild;
			if (i) return n - 1 - i.nodeSize;
			n -= r.nodeSize;
		}
	} else {
		if (e.index() < e.parent.childCount - 1) return e.pos + e.nodeAfter.nodeSize;
		let t = e.node(-1);
		for (let n = e.indexAfter(-1), r = e.after(); n < t.childCount; n++) {
			let e = t.child(n);
			if (e.childCount) return r + 1;
			r += e.nodeSize;
		}
	}
	return null;
}
function Sj(e) {
	return function(t, n) {
		if (!LA(t)) return !1;
		let r = xj(RA(t), e);
		if (r == null) return !1;
		if (n) {
			let e = t.doc.resolve(r);
			n(t.tr.setSelection(E.between(e, VA(e))).scrollIntoView());
		}
		return !0;
	};
}
function Cj(e, t) {
	let n = e.selection.$anchor;
	for (let r = n.depth; r > 0; r--) if (n.node(r).type.spec.tableRole == "table") return t && t(e.tr.delete(n.before(r), n.after(r)).scrollIntoView()), !0;
	return !1;
}
function wj(e, t) {
	let n = e.selection;
	if (!(n instanceof $)) return !1;
	if (t) {
		let r = e.tr, i = PA(e.schema).cell.createAndFill().content;
		n.forEachCell((e, t) => {
			e.content.eq(i) || r.replace(r.mapping.map(t + 1), r.mapping.map(t + e.nodeSize - 1), new C(i, 0, 0));
		}), r.docChanged && t(r);
	}
	return !0;
}
function Tj(e) {
	if (e.size === 0) return null;
	let { content: t, openStart: n, openEnd: r } = e;
	for (; t.childCount == 1 && (n > 0 && r > 0 || t.child(0).type.spec.tableRole == "table");) n--, r--, t = t.child(0).content;
	let i = t.child(0), a = i.type.spec.tableRole, o = i.type.schema, s = [];
	if (a == "row") for (let e = 0; e < t.childCount; e++) {
		let i = t.child(e).content, a = e ? 0 : Math.max(0, n - 1), c = e < t.childCount - 1 ? 0 : Math.max(0, r - 1);
		(a || c) && (i = Dj(PA(o).row, new C(i, a, c)).content), s.push(i);
	}
	else if (a == "cell" || a == "header_cell") s.push(n || r ? Dj(PA(o).row, new C(t, n, r)).content : t);
	else return null;
	return Ej(o, s);
}
function Ej(e, t) {
	let n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		for (let t = r.childCount - 1; t >= 0; t--) {
			let { rowspan: i, colspan: a } = r.child(t).attrs;
			for (let t = e; t < e + i; t++) n[t] = (n[t] || 0) + a;
		}
	}
	let r = 0;
	for (let e = 0; e < n.length; e++) r = Math.max(r, n[e]);
	for (let i = 0; i < n.length; i++) if (i >= t.length && t.push(x.empty), n[i] < r) {
		let a = PA(e).cell.createAndFill(), o = [];
		for (let e = n[i]; e < r; e++) o.push(a);
		t[i] = t[i].append(x.from(o));
	}
	return {
		height: t.length,
		width: r,
		rows: t
	};
}
function Dj(e, t) {
	let n = e.createAndFill();
	return new wn(n).replace(0, n.content.size, t).doc;
}
function Oj({ width: e, height: t, rows: n }, r, i) {
	if (e != r) {
		let t = [], i = [];
		for (let e = 0; e < n.length; e++) {
			let a = n[e], o = [];
			for (let n = t[e] || 0, i = 0; n < r; i++) {
				let s = a.child(i % a.childCount);
				n + s.attrs.colspan > r && (s = s.type.createChecked(WA(s.attrs, s.attrs.colspan, n + s.attrs.colspan - r), s.content)), o.push(s), n += s.attrs.colspan;
				for (let n = 1; n < s.attrs.rowspan; n++) t[e + n] = (t[e + n] || 0) + s.attrs.colspan;
			}
			i.push(x.from(o));
		}
		n = i, e = r;
	}
	if (t != i) {
		let e = [];
		for (let r = 0, a = 0; r < i; r++, a++) {
			let o = [], s = n[a % t];
			for (let e = 0; e < s.childCount; e++) {
				let t = s.child(e);
				r + t.attrs.rowspan > i && (t = t.type.create({
					...t.attrs,
					rowspan: Math.max(1, i - t.attrs.rowspan)
				}, t.content)), o.push(t);
			}
			e.push(x.from(o));
		}
		n = e, t = i;
	}
	return {
		width: e,
		height: t,
		rows: n
	};
}
function kj(e, t, n, r, i, a, o) {
	let s = e.doc.type.schema, c = PA(s), l, u;
	if (i > t.width) for (let a = 0, s = 0; a < t.height; a++) {
		let d = n.child(a);
		s += d.nodeSize;
		let f = [], p;
		p = d.lastChild == null || d.lastChild.type == c.cell ? l ||= c.cell.createAndFill() : u ||= c.header_cell.createAndFill();
		for (let e = t.width; e < i; e++) f.push(p);
		e.insert(e.mapping.slice(o).map(s - 1 + r), f);
	}
	if (a > t.height) {
		let s = [];
		for (let e = 0, r = (t.height - 1) * t.width; e < Math.max(t.width, i); e++) {
			let i = e >= t.width ? !1 : n.nodeAt(t.map[r + e]).type == c.header_cell;
			s.push(i ? u ||= c.header_cell.createAndFill() : l ||= c.cell.createAndFill());
		}
		let d = c.row.create(null, x.from(s)), f = [];
		for (let e = t.height; e < a; e++) f.push(d);
		e.insert(e.mapping.slice(o).map(r + n.nodeSize - 2), f);
	}
	return !!(l || u);
}
function Aj(e, t, n, r, i, a, o, s) {
	if (o == 0 || o == t.height) return !1;
	let c = !1;
	for (let l = i; l < a; l++) {
		let i = o * t.width + l, a = t.map[i];
		if (t.map[i - t.width] == a) {
			c = !0;
			let i = n.nodeAt(a), { top: u, left: d } = t.findCell(a);
			e.setNodeMarkup(e.mapping.slice(s).map(a + r), null, {
				...i.attrs,
				rowspan: o - u
			}), e.insert(e.mapping.slice(s).map(t.positionAt(o, d, n)), i.type.createAndFill({
				...i.attrs,
				rowspan: u + i.attrs.rowspan - o
			})), l += i.attrs.colspan - 1;
		}
	}
	return c;
}
function jj(e, t, n, r, i, a, o, s) {
	if (o == 0 || o == t.width) return !1;
	let c = !1;
	for (let l = i; l < a; l++) {
		let i = l * t.width + o, a = t.map[i];
		if (t.map[i - 1] == a) {
			c = !0;
			let i = n.nodeAt(a), u = t.colCount(a), d = e.mapping.slice(s).map(a + r);
			e.setNodeMarkup(d, null, WA(i.attrs, o - u, i.attrs.colspan - (o - u))), e.insert(d + i.nodeSize, i.type.createAndFill(WA(i.attrs, 0, o - u))), l += i.attrs.rowspan - 1;
		}
	}
	return c;
}
function Mj(e, t, n, r, i) {
	let a = n ? e.doc.nodeAt(n - 1) : e.doc;
	if (!a) throw Error("No table found");
	let o = Q.get(a), { top: s, left: c } = r, l = c + i.width, u = s + i.height, d = e.tr, f = 0;
	function p() {
		if (a = n ? d.doc.nodeAt(n - 1) : d.doc, !a) throw Error("No table found");
		o = Q.get(a), f = d.mapping.maps.length;
	}
	kj(d, o, a, n, l, u, f) && p(), Aj(d, o, a, n, c, l, s, f) && p(), Aj(d, o, a, n, c, l, u, f) && p(), jj(d, o, a, n, s, u, c, f) && p(), jj(d, o, a, n, s, u, l, f) && p();
	for (let e = s; e < u; e++) {
		let t = o.positionAt(e, c, a), r = o.positionAt(e, l, a);
		d.replace(d.mapping.slice(f).map(t + n), d.mapping.slice(f).map(r + n), new C(i.rows[e - s], 0, 0));
	}
	p(), d.setSelection(new $(d.doc.resolve(n + o.positionAt(s, c, a)), d.doc.resolve(n + o.positionAt(u - 1, l - 1, a)))), t(d);
}
function Nj(e, t, n) {
	return !n.eq(e.selection) && (t && t(e.tr.setSelection(n).scrollIntoView()), !0);
}
function Pj(e, t) {
	return (n, r, i) => {
		if (!i) return !1;
		let a = n.selection;
		if (a instanceof $) return Nj(n, r, T.near(a.$headCell, t));
		if (e != "horiz" && !a.empty) return !1;
		let o = zj(i, e, t);
		if (o == null) return !1;
		if (e == "horiz") return Nj(n, r, T.near(n.doc.resolve(a.head + t), t));
		{
			let i = n.doc.resolve(o), a = UA(i, e, t), s;
			return s = a ? T.near(a, 1) : t < 0 ? T.near(n.doc.resolve(i.before(-1)), -1) : T.near(n.doc.resolve(i.after(-1)), 1), Nj(n, r, s);
		}
	};
}
function Fj(e, t) {
	return (n, r, i) => {
		if (!i) return !1;
		let a = n.selection, o;
		if (a instanceof $) o = a;
		else {
			let r = zj(i, e, t);
			if (r == null) return !1;
			o = new $(n.doc.resolve(r));
		}
		let s = UA(o.$headCell, e, t);
		return s ? Nj(n, r, new $(o.$anchorCell, s)) : !1;
	};
}
function Ij(e, t) {
	let n = e.state.doc, r = FA(n.resolve(t));
	return r ? (e.dispatch(e.state.tr.setSelection(new $(r))), !0) : !1;
}
function Lj(e, t, n) {
	if (!LA(e.state)) return !1;
	let r = Tj(n), i = e.state.selection;
	if (i instanceof $) {
		r ||= {
			width: 1,
			height: 1,
			rows: [x.from(Dj(PA(e.state.schema).cell, n))]
		};
		let t = i.$anchorCell.node(-1), a = i.$anchorCell.start(-1), o = Q.get(t).rectBetween(i.$anchorCell.pos - a, i.$headCell.pos - a);
		return r = Oj(r, o.right - o.left, o.bottom - o.top), Mj(e.state, e.dispatch, a, o, r), !0;
	}
	if (r) {
		let t = RA(e.state), n = t.start(-1);
		return Mj(e.state, e.dispatch, n, Q.get(t.node(-1)).findCell(t.pos - n), r), !0;
	}
	return !1;
}
function Rj(e, t) {
	if (t.button != 0 || t.ctrlKey || t.metaKey) return;
	let n = Bj(e, t.target), r;
	if (t.shiftKey && e.state.selection instanceof $) i(e.state.selection.$anchorCell, t), t.preventDefault();
	else if (t.shiftKey && n && (r = FA(e.state.selection.$anchor)) != null && Vj(e, t)?.pos != r.pos) i(r, t), t.preventDefault();
	else if (!n) return;
	function i(t, n) {
		let r = Vj(e, n), i = aM.getState(e.state) == null;
		if (!r || !HA(t, r)) {
			if (i) r = t;
			else return;
		}
		let a = new $(t, r);
		if (i || !e.state.selection.eq(a)) {
			let n = e.state.tr.setSelection(a);
			i && n.setMeta(aM, t.pos), e.dispatch(n);
		}
	}
	function a() {
		e.root.removeEventListener("mouseup", a), e.root.removeEventListener("dragstart", a), e.root.removeEventListener("mousemove", o), aM.getState(e.state) != null && e.dispatch(e.state.tr.setMeta(aM, -1));
	}
	function o(r) {
		let o = r, s = aM.getState(e.state), c;
		if (s != null) c = e.state.doc.resolve(s);
		else if (Bj(e, o.target) != n && (c = Vj(e, t), !c)) return a();
		c && i(c, o);
	}
	e.root.addEventListener("mouseup", a), e.root.addEventListener("dragstart", a), e.root.addEventListener("mousemove", o);
}
function zj(e, t, n) {
	if (!(e.state.selection instanceof E)) return null;
	let { $head: r } = e.state.selection;
	for (let i = r.depth - 1; i >= 0; i--) {
		let a = r.node(i);
		if ((n < 0 ? r.index(i) : r.indexAfter(i)) != (n < 0 ? 0 : a.childCount)) return null;
		if (a.type.spec.tableRole == "cell" || a.type.spec.tableRole == "header_cell") {
			let a = r.before(i), o = t == "vert" ? n > 0 ? "down" : "up" : n > 0 ? "right" : "left";
			return e.endOfTextblock(o) ? a : null;
		}
	}
	return null;
}
function Bj(e, t) {
	for (; t && t != e.dom; t = t.parentNode) if (t.nodeName == "TD" || t.nodeName == "TH") return t;
	return null;
}
function Vj(e, t) {
	let n = e.posAtCoords({
		left: t.clientX,
		top: t.clientY
	});
	if (!n) return null;
	let { inside: r, pos: i } = n;
	return r >= 0 && FA(e.state.doc.resolve(r)) || FA(e.state.doc.resolve(i));
}
function Hj(e, t, n, r, i, a) {
	let o = 0, s = !0, c = t.firstChild, l = e.firstChild;
	if (l) {
		for (let e = 0, n = 0; e < l.childCount; e++) {
			let { colspan: u, colwidth: d } = l.child(e).attrs;
			for (let e = 0; e < u; e++, n++) {
				let l = i == n ? a : d && d[e], u = l ? l + "px" : "";
				if (o += l || r, l || (s = !1), c) c.style.width != u && (c.style.width = u), c = c.nextSibling;
				else {
					let e = document.createElement("col");
					e.style.width = u, t.appendChild(e);
				}
			}
		}
		for (; c;) {
			var u;
			let e = c.nextSibling;
			(u = c.parentNode) == null || u.removeChild(c), c = e;
		}
		s ? (n.style.width = o + "px", n.style.minWidth = "") : (n.style.width = "", n.style.minWidth = o + "px");
	}
}
function Uj({ handleWidth: e = 5, cellMinWidth: t = 25, defaultCellMinWidth: n = 100, View: r = uM, lastColumnResizable: i = !0 } = {}) {
	let a = new O({
		key: dM,
		state: {
			init(e, t) {
				var i;
				let o = (i = a.spec) == null || (i = i.props) == null ? void 0 : i.nodeViews, s = PA(t.schema).table.name;
				return r && o && (o[s] = (e, t) => new r(e, n, t)), new fM(-1, !1);
			},
			apply(e, t) {
				return t.apply(e);
			}
		},
		props: {
			attributes: (e) => {
				let t = dM.getState(e);
				return t && t.activeHandle > -1 ? { class: "resize-cursor" } : {};
			},
			handleDOMEvents: {
				mousemove: (t, n) => {
					Wj(t, n, e, i);
				},
				mouseleave: (e) => {
					Gj(e);
				},
				mousedown: (e, r) => {
					Kj(e, r, t, n);
				}
			},
			decorations: (e) => {
				let t = dM.getState(e);
				if (t && t.activeHandle > -1) return tM(e, t.activeHandle);
			},
			nodeViews: {}
		}
	});
	return a;
}
function Wj(e, t, n, r) {
	if (!e.editable) return;
	let i = dM.getState(e.state);
	if (i && !i.dragging) {
		let a = Jj(t.target), o = -1;
		if (a) {
			let { left: r, right: i } = a.getBoundingClientRect();
			t.clientX - r <= n ? o = Yj(e, t, "left", n) : i - t.clientX <= n && (o = Yj(e, t, "right", n));
		}
		if (o != i.activeHandle) {
			if (!r && o !== -1) {
				let t = e.state.doc.resolve(o), n = t.node(-1), r = Q.get(n), i = t.start(-1);
				if (r.colCount(t.pos - i) + t.nodeAfter.attrs.colspan - 1 == r.width - 1) return;
			}
			Zj(e, o);
		}
	}
}
function Gj(e) {
	if (!e.editable) return;
	let t = dM.getState(e.state);
	t && t.activeHandle > -1 && !t.dragging && Zj(e, -1);
}
function Kj(e, t, n, r) {
	if (!e.editable) return !1;
	let i = e.dom.ownerDocument.defaultView ?? window, a = dM.getState(e.state);
	if (!a || a.activeHandle == -1 || a.dragging) return !1;
	let o = e.state.doc.nodeAt(a.activeHandle), s = qj(e, a.activeHandle, o.attrs);
	e.dispatch(e.state.tr.setMeta(dM, { setDragging: {
		startX: t.clientX,
		startWidth: s
	} }));
	function c(t) {
		i.removeEventListener("mouseup", c), i.removeEventListener("mousemove", l);
		let r = dM.getState(e.state);
		r?.dragging && (Qj(e, r.activeHandle, Xj(r.dragging, t, n)), e.dispatch(e.state.tr.setMeta(dM, { setDragging: null })));
	}
	function l(t) {
		if (!t.which) return c(t);
		let i = dM.getState(e.state);
		if (i && i.dragging) {
			let a = Xj(i.dragging, t, n);
			$j(e, i.activeHandle, a, r);
		}
	}
	return $j(e, a.activeHandle, s, r), i.addEventListener("mouseup", c), i.addEventListener("mousemove", l), t.preventDefault(), !0;
}
function qj(e, t, { colspan: n, colwidth: r }) {
	let i = r && r[r.length - 1];
	if (i) return i;
	let a = e.domAtPos(t), o = a.node.childNodes[a.offset].offsetWidth, s = n;
	if (r) for (let e = 0; e < n; e++) r[e] && (o -= r[e], s--);
	return o / s;
}
function Jj(e) {
	for (; e && e.nodeName != "TD" && e.nodeName != "TH";) e = e.classList && e.classList.contains("ProseMirror") ? null : e.parentNode;
	return e;
}
function Yj(e, t, n, r) {
	let i = n == "right" ? -r : r, a = e.posAtCoords({
		left: t.clientX + i,
		top: t.clientY
	});
	if (!a) return -1;
	let { pos: o } = a, s = FA(e.state.doc.resolve(o));
	if (!s) return -1;
	if (n == "right") return s.pos;
	let c = Q.get(s.node(-1)), l = s.start(-1), u = c.map.indexOf(s.pos - l);
	return u % c.width == 0 ? -1 : l + c.map[u - 1];
}
function Xj(e, t, n) {
	let r = t.clientX - e.startX;
	return Math.max(n, e.startWidth + r);
}
function Zj(e, t) {
	e.dispatch(e.state.tr.setMeta(dM, { setHandle: t }));
}
function Qj(e, t, n) {
	let r = e.state.doc.resolve(t), i = r.node(-1), a = Q.get(i), o = r.start(-1), s = a.colCount(r.pos - o) + r.nodeAfter.attrs.colspan - 1, c = e.state.tr;
	for (let e = 0; e < a.height; e++) {
		let t = e * a.width + s;
		if (e && a.map[t] == a.map[t - a.width]) continue;
		let r = a.map[t], l = i.nodeAt(r).attrs, u = l.colspan == 1 ? 0 : s - a.colCount(r);
		if (l.colwidth && l.colwidth[u] == n) continue;
		let d = l.colwidth ? l.colwidth.slice() : eM(l.colspan);
		d[u] = n, c.setNodeMarkup(o + r, null, {
			...l,
			colwidth: d
		});
	}
	c.docChanged && e.dispatch(c);
}
function $j(e, t, n, r) {
	let i = e.state.doc.resolve(t), a = i.node(-1), o = i.start(-1), s = Q.get(a).colCount(i.pos - o) + i.nodeAfter.attrs.colspan - 1, c = e.domAtPos(i.start(-1)).node;
	for (; c && c.nodeName != "TABLE";) c = c.parentNode;
	c && Hj(a, c.firstChild, c, r, s, n);
}
function eM(e) {
	return Array(e).fill(0);
}
function tM(e, t) {
	let n = [], r = e.doc.resolve(t), i = r.node(-1);
	if (!i) return j.empty;
	let a = Q.get(i), o = r.start(-1), s = a.colCount(r.pos - o) + r.nodeAfter.attrs.colspan - 1;
	for (let t = 0; t < a.height; t++) {
		let r = s + t * a.width;
		if ((s == a.width - 1 || a.map[r] != a.map[r + 1]) && (t == 0 || a.map[r] != a.map[r - a.width])) {
			let t = a.map[r], s = o + t + i.nodeAt(t).nodeSize - 1, c = document.createElement("div");
			c.className = "column-resize-handle", dM.getState(e)?.dragging && n.push(sc.node(o + t, o + t + i.nodeAt(t).nodeSize, { class: "column-resize-dragging" })), n.push(sc.widget(s, c));
		}
	}
	return j.create(e.doc, n);
}
function nM({ allowTableNodeSelection: e = !1 } = {}) {
	return new O({
		key: aM,
		state: {
			init() {
				return null;
			},
			apply(e, t) {
				let n = e.getMeta(aM);
				if (n != null) return n == -1 ? null : n;
				if (t == null || !e.docChanged) return t;
				let { deleted: r, pos: i } = e.mapping.mapResult(t);
				return r ? null : i;
			}
		},
		props: {
			decorations: qA,
			handleDOMEvents: { mousedown: Rj },
			createSelectionBetween(e) {
				return aM.getState(e.state) == null ? null : e.state.selection;
			},
			handleTripleClick: Ij,
			handleKeyDown: lM,
			handlePaste: Lj
		},
		appendTransaction(t, n, r) {
			return XA(r, QA(r, n), e);
		}
	});
}
var rM, iM, Q, aM, $, oM, sM, cM, lM, uM, dM, fM, pM = e((() => {
	if (Yn(), ct(), xc(), Lc(), Tn(), typeof WeakMap < "u") {
		let e = /* @__PURE__ */ new WeakMap();
		rM = (t) => e.get(t), iM = (t, n) => (e.set(t, n), n);
	} else {
		let e = [], t = 0;
		rM = (t) => {
			for (let n = 0; n < e.length; n += 2) if (e[n] == t) return e[n + 1];
		}, iM = (n, r) => (t == 10 && (t = 0), e[t++] = n, e[t++] = r);
	}
	Q = class {
		constructor(e, t, n, r) {
			this.width = e, this.height = t, this.map = n, this.problems = r;
		}
		findCell(e) {
			for (let t = 0; t < this.map.length; t++) {
				let n = this.map[t];
				if (n != e) continue;
				let r = t % this.width, i = t / this.width | 0, a = r + 1, o = i + 1;
				for (let e = 1; a < this.width && this.map[t + e] == n; e++) a++;
				for (let e = 1; o < this.height && this.map[t + this.width * e] == n; e++) o++;
				return {
					left: r,
					top: i,
					right: a,
					bottom: o
				};
			}
			throw RangeError(`No cell with offset ${e} found`);
		}
		colCount(e) {
			for (let t = 0; t < this.map.length; t++) if (this.map[t] == e) return t % this.width;
			throw RangeError(`No cell with offset ${e} found`);
		}
		nextCell(e, t, n) {
			let { left: r, right: i, top: a, bottom: o } = this.findCell(e);
			return t == "horiz" ? (n < 0 ? r == 0 : i == this.width) ? null : this.map[a * this.width + (n < 0 ? r - 1 : i)] : (n < 0 ? a == 0 : o == this.height) ? null : this.map[r + this.width * (n < 0 ? a - 1 : o)];
		}
		rectBetween(e, t) {
			let { left: n, right: r, top: i, bottom: a } = this.findCell(e), { left: o, right: s, top: c, bottom: l } = this.findCell(t);
			return {
				left: Math.min(n, o),
				top: Math.min(i, c),
				right: Math.max(r, s),
				bottom: Math.max(a, l)
			};
		}
		cellsInRect(e) {
			let t = [], n = {};
			for (let r = e.top; r < e.bottom; r++) for (let i = e.left; i < e.right; i++) {
				let a = r * this.width + i, o = this.map[a];
				n[o] || (n[o] = !0, i == e.left && i && this.map[a - 1] == o || r == e.top && r && this.map[a - this.width] == o || t.push(o));
			}
			return t;
		}
		positionAt(e, t, n) {
			for (let r = 0, i = 0;; r++) {
				let a = i + n.child(r).nodeSize;
				if (r == e) {
					let n = t + e * this.width, r = (e + 1) * this.width;
					for (; n < r && this.map[n] < i;) n++;
					return n == r ? a - 1 : this.map[n];
				}
				i = a;
			}
		}
		static get(e) {
			return rM(e) || iM(e, AA(e));
		}
	}, aM = new k("selectingCells"), $ = class e extends T {
		constructor(e, t = e) {
			let n = e.node(-1), r = Q.get(n), i = e.start(-1), a = r.rectBetween(e.pos - i, t.pos - i), o = e.node(0), s = r.cellsInRect(a).filter((e) => e != t.pos - i);
			s.unshift(t.pos - i);
			let c = s.map((e) => {
				let t = n.nodeAt(e);
				if (!t) throw RangeError(`No cell with offset ${e} found`);
				let r = i + e + 1;
				return new Pn(o.resolve(r), o.resolve(r + t.content.size));
			});
			super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = t;
		}
		map(t, n) {
			let r = t.resolve(n.map(this.$anchorCell.pos)), i = t.resolve(n.map(this.$headCell.pos));
			if (BA(r) && BA(i) && HA(r, i)) {
				let t = this.$anchorCell.node(-1) != r.node(-1);
				return t && this.isRowSelection() ? e.rowSelection(r, i) : t && this.isColSelection() ? e.colSelection(r, i) : new e(r, i);
			}
			return E.between(r, i);
		}
		content() {
			let e = this.$anchorCell.node(-1), t = Q.get(e), n = this.$anchorCell.start(-1), r = t.rectBetween(this.$anchorCell.pos - n, this.$headCell.pos - n), i = {}, a = [];
			for (let n = r.top; n < r.bottom; n++) {
				let o = [];
				for (let a = n * t.width + r.left, s = r.left; s < r.right; s++, a++) {
					let n = t.map[a];
					if (i[n]) continue;
					i[n] = !0;
					let s = t.findCell(n), c = e.nodeAt(n);
					if (!c) throw RangeError(`No cell with offset ${n} found`);
					let l = r.left - s.left, u = s.right - r.right;
					if (l > 0 || u > 0) {
						let e = c.attrs;
						if (l > 0 && (e = WA(e, 0, l)), u > 0 && (e = WA(e, e.colspan - u, u)), s.left < r.left) {
							if (c = c.type.createAndFill(e), !c) throw RangeError(`Could not create cell with attrs ${JSON.stringify(e)}`);
						} else c = c.type.create(e, c.content);
					}
					if (s.top < r.top || s.bottom > r.bottom) {
						let e = {
							...c.attrs,
							rowspan: Math.min(s.bottom, r.bottom) - Math.max(s.top, r.top)
						};
						c = s.top < r.top ? c.type.createAndFill(e) : c.type.create(e, c.content);
					}
					o.push(c);
				}
				a.push(e.child(n).copy(x.from(o)));
			}
			let o = this.isColSelection() && this.isRowSelection() ? e : a;
			return new C(x.from(o), 1, 1);
		}
		replace(e, t = C.empty) {
			let n = e.steps.length, r = this.ranges;
			for (let i = 0; i < r.length; i++) {
				let { $from: a, $to: o } = r[i], s = e.mapping.slice(n);
				e.replace(s.map(a.pos), s.map(o.pos), i ? C.empty : t);
			}
			let i = T.findFrom(e.doc.resolve(e.mapping.slice(n).map(this.to)), -1);
			i && e.setSelection(i);
		}
		replaceWith(e, t) {
			this.replace(e, new C(x.from(t), 0, 0));
		}
		forEachCell(e) {
			let t = this.$anchorCell.node(-1), n = Q.get(t), r = this.$anchorCell.start(-1), i = n.cellsInRect(n.rectBetween(this.$anchorCell.pos - r, this.$headCell.pos - r));
			for (let n = 0; n < i.length; n++) e(t.nodeAt(i[n]), r + i[n]);
		}
		isColSelection() {
			let e = this.$anchorCell.index(-1), t = this.$headCell.index(-1);
			if (Math.min(e, t) > 0) return !1;
			let n = e + this.$anchorCell.nodeAfter.attrs.rowspan, r = t + this.$headCell.nodeAfter.attrs.rowspan;
			return Math.max(n, r) == this.$headCell.node(-1).childCount;
		}
		static colSelection(t, n = t) {
			let r = t.node(-1), i = Q.get(r), a = t.start(-1), o = i.findCell(t.pos - a), s = i.findCell(n.pos - a), c = t.node(0);
			return o.top <= s.top ? (o.top > 0 && (t = c.resolve(a + i.map[o.left])), s.bottom < i.height && (n = c.resolve(a + i.map[i.width * (i.height - 1) + s.right - 1]))) : (s.top > 0 && (n = c.resolve(a + i.map[s.left])), o.bottom < i.height && (t = c.resolve(a + i.map[i.width * (i.height - 1) + o.right - 1]))), new e(t, n);
		}
		isRowSelection() {
			let e = this.$anchorCell.node(-1), t = Q.get(e), n = this.$anchorCell.start(-1), r = t.colCount(this.$anchorCell.pos - n), i = t.colCount(this.$headCell.pos - n);
			if (Math.min(r, i) > 0) return !1;
			let a = r + this.$anchorCell.nodeAfter.attrs.colspan, o = i + this.$headCell.nodeAfter.attrs.colspan;
			return Math.max(a, o) == t.width;
		}
		eq(t) {
			return t instanceof e && t.$anchorCell.pos == this.$anchorCell.pos && t.$headCell.pos == this.$headCell.pos;
		}
		static rowSelection(t, n = t) {
			let r = t.node(-1), i = Q.get(r), a = t.start(-1), o = i.findCell(t.pos - a), s = i.findCell(n.pos - a), c = t.node(0);
			return o.left <= s.left ? (o.left > 0 && (t = c.resolve(a + i.map[o.top * i.width])), s.right < i.width && (n = c.resolve(a + i.map[i.width * (s.top + 1) - 1]))) : (s.left > 0 && (n = c.resolve(a + i.map[s.top * i.width])), o.right < i.width && (t = c.resolve(a + i.map[i.width * (o.top + 1) - 1]))), new e(t, n);
		}
		toJSON() {
			return {
				type: "cell",
				anchor: this.$anchorCell.pos,
				head: this.$headCell.pos
			};
		}
		static fromJSON(t, n) {
			return new e(t.resolve(n.anchor), t.resolve(n.head));
		}
		static create(t, n, r = n) {
			return new e(t.resolve(n), t.resolve(r));
		}
		getBookmark() {
			return new oM(this.$anchorCell.pos, this.$headCell.pos);
		}
	}, $.prototype.visible = !1, T.jsonID("cell", $), oM = class e {
		constructor(e, t) {
			this.anchor = e, this.head = t;
		}
		map(t) {
			return new e(t.map(this.anchor), t.map(this.head));
		}
		resolve(e) {
			let t = e.resolve(this.anchor), n = e.resolve(this.head);
			return t.parent.type.spec.tableRole == "row" && n.parent.type.spec.tableRole == "row" && t.index() < t.parent.childCount && n.index() < n.parent.childCount && HA(t, n) ? new $(t, n) : T.near(n, 1);
		}
	}, sM = new k("fix-tables"), bj("row", { useDeprecatedLogic: !0 }), bj("column", { useDeprecatedLogic: !0 }), cM = bj("cell", { useDeprecatedLogic: !0 }), lM = Pc({
		ArrowLeft: Pj("horiz", -1),
		ArrowRight: Pj("horiz", 1),
		ArrowUp: Pj("vert", -1),
		ArrowDown: Pj("vert", 1),
		"Shift-ArrowLeft": Fj("horiz", -1),
		"Shift-ArrowRight": Fj("horiz", 1),
		"Shift-ArrowUp": Fj("vert", -1),
		"Shift-ArrowDown": Fj("vert", 1),
		Backspace: wj,
		"Mod-Backspace": wj,
		Delete: wj,
		"Mod-Delete": wj
	}), uM = class {
		constructor(e, t) {
			this.node = e, this.defaultCellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.table.style.setProperty("--default-cell-min-width", `${t}px`), this.colgroup = this.table.appendChild(document.createElement("colgroup")), Hj(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
		}
		update(e) {
			return e.type == this.node.type && (this.node = e, Hj(e, this.colgroup, this.table, this.defaultCellMinWidth), !0);
		}
		ignoreMutation(e) {
			return e.type == "attributes" && (e.target == this.table || this.colgroup.contains(e.target));
		}
	}, dM = new k("tableColumnResizing"), fM = class e {
		constructor(e, t) {
			this.activeHandle = e, this.dragging = t;
		}
		apply(t) {
			let n = this, r = t.getMeta(dM);
			if (r && r.setHandle != null) return new e(r.setHandle, !1);
			if (r && r.setDragging !== void 0) return new e(n.activeHandle, r.setDragging);
			if (n.activeHandle > -1 && t.docChanged) {
				let r = t.mapping.map(n.activeHandle, -1);
				return BA(t.doc.resolve(r)) || (r = -1), new e(r, n.dragging);
			}
			return n;
		}
	};
})), mM = e((() => {
	pM();
}));
// node_modules/@tiptap/extension-table/dist/index.js
function hM(e) {
	return e === "left" || e === "right" || e === "center" ? e : null;
}
function gM(e) {
	let t = (e.style.textAlign || "").trim().toLowerCase(), n = (e.getAttribute("align") || "").trim().toLowerCase();
	return hM(t || n);
}
function _M(e) {
	return hM(e?.align);
}
function vM() {
	return {
		default: null,
		parseHTML: (e) => gM(e),
		renderHTML: (e) => {
			let t = hM(e.align);
			return _d(t) ? { style: `text-align: ${t}` } : {};
		}
	};
}
function yM(e) {
	let t = e.parentElement, n = e.closest("table");
	if (!t || !n) return null;
	let r = Array.from(t.children).indexOf(e), i = n.querySelectorAll("colgroup > col")[r]?.getAttribute("width");
	return i ? [parseInt(i, 10)] : null;
}
function bM(e) {
	let t = e.getAttribute("colwidth");
	return t ? t.split(",").map((e) => parseInt(e, 10)) : yM(e);
}
function xM(e) {
	return e.children.length > 0 ? !1 : (e.textContent ?? "").replace(VM, "") === "";
}
function SM(e) {
	let t = e.createAndFill();
	if (!t) throw Error(`[tiptap error]: "${e.name}" has no default content to backfill.`);
	return t.content;
}
function CM(e, t, n) {
	if (!(n in t)) return;
	let r = t[n];
	(r === 1 || r === "1" || r == null) && delete e[n];
}
function wM(e, t) {
	return t ? ["width", `${Math.max(t, e)}px`] : ["min-width", `${e}px`];
}
function TM(e, t, n, r, i, a) {
	let o = 0, s = !0, c = t.firstChild, l = e.firstChild;
	if (l !== null) for (let e = 0, n = 0; e < l.childCount; e += 1) {
		let { colspan: u, colwidth: d } = l.child(e).attrs;
		for (let e = 0; e < u; e += 1, n += 1) {
			let l = i === n ? a : d && d[e], u = l ? `${l}px` : "";
			if (o += l || r, l || (s = !1), c) {
				if (c.style.width !== u) {
					let [e, t] = wM(r, l);
					c.style.setProperty(e, t);
				}
				c = c.nextSibling;
			} else {
				let e = document.createElement("col"), [n, i] = wM(r, l);
				e.style.setProperty(n, i), t.appendChild(e);
			}
		}
	}
	for (; c;) {
		var u;
		let e = c.nextSibling;
		(u = c.parentNode) == null || u.removeChild(c), c = e;
	}
	let d = e.attrs.style && typeof e.attrs.style == "string" && /\bwidth\s*:/i.test(e.attrs.style);
	s && !d ? (n.style.width = `${o}px`, n.style.minWidth = "") : (n.style.width = "", n.style.minWidth = `${o}px`);
}
function EM(e, t, n, r) {
	let i = 0, a = !0, o = [], s = e.firstChild;
	if (!s) return {};
	for (let e = 0, c = 0; e < s.childCount; e += 1) {
		let { colspan: l, colwidth: u } = s.child(e).attrs;
		for (let e = 0; e < l; e += 1, c += 1) {
			let s = n === c ? r : u && u[e];
			i += s || t, s || (a = !1);
			let [l, d] = wM(t, s);
			o.push(["col", { style: `${l}: ${d}` }]);
		}
	}
	let c = a ? `${i}px` : "", l = a ? "" : `${i}px`;
	return {
		colgroup: [
			"colgroup",
			{},
			...o
		],
		tableWidth: c,
		tableMinWidth: l
	};
}
function DM(e, t) {
	return t ? e.createChecked(null, t) : e.createAndFill();
}
function OM(e) {
	if (e.cached.tableNodeTypes) return e.cached.tableNodeTypes;
	let t = {};
	return Object.keys(e.nodes).forEach((n) => {
		let r = e.nodes[n];
		r.spec.tableRole && (t[r.spec.tableRole] = r);
	}), e.cached.tableNodeTypes = t, t;
}
function kM(e, t, n, r, i) {
	let a = OM(e), o = [], s = [];
	for (let e = 0; e < n; e += 1) {
		let e = DM(a.cell, i);
		if (e && s.push(e), r) {
			let e = DM(a.header_cell, i);
			e && o.push(e);
		}
	}
	let c = [];
	for (let e = 0; e < t; e += 1) c.push(a.row.createChecked(null, r && e === 0 ? o : s));
	return a.table.createChecked(null, c);
}
function AM(e) {
	return e instanceof $;
}
function jM(e, t) {
	let n = e.mapping.map(t);
	if (Ul(e.selection.$from, (e) => e.type.name === "table")?.pos === n) return;
	let r = e.doc.nodeAt(n);
	if (!r) return;
	let i = n + r.nodeSize - 1;
	e.setSelection(E.near(e.doc.resolve(i), -1));
}
function MM(e) {
	let t = "", n = 0;
	for (; n < e.length;) {
		if (e[n] === "\\" && n + 1 < e.length) {
			t += e[n] + e[n + 1], n += 2;
			continue;
		}
		if (e[n] !== "`") {
			t += e[n++];
			continue;
		}
		let r = 0;
		for (; n + r < e.length && e[n + r] === "`";) r += 1;
		let i = n + r, a = !1;
		for (; i < e.length;) {
			if (e[i] !== "`") {
				i += 1;
				continue;
			}
			let o = 0;
			for (; i + o < e.length && e[i + o] === "`";) o += 1;
			if (o === r) {
				let o = e.slice(n + r, i);
				t += e.slice(n, n + r) + o.replace(/\\\||\|/g, (e) => e === "|" ? "\\|" : e) + e.slice(i, i + r), n = i + r, a = !0;
				break;
			}
			i += o;
		}
		a || (t += e.slice(n, n + r), n += r);
	}
	return t;
}
function NM(e) {
	return e.split("\n").map((e) => !e.includes("|") || !e.includes("`") ? e : MM(e)).join("\n");
}
function PM(e) {
	return (e || "").replaceAll("", " ").replace(/\s+/g, " ").trim();
}
function FM(e, t) {
	return t ? e.split(t).join("\n") : e;
}
function IM(e) {
	return e.replace(/\\.|\|/g, (e) => e === "|" ? "\\|" : e);
}
function LM(e, t, n = {}) {
	if (!e || !e.content || e.content.length === 0) return "";
	let r = [];
	e.content.forEach((e) => {
		let i = [];
		e.content && e.content.forEach((e) => {
			let r = "";
			r = e.content && Array.isArray(e.content) && e.content.length > 1 ? e.content.map((e) => FM(t.renderChildren(e), n.cellLineSeparator)).join("\n") : FM(e.content ? t.renderChildren(e.content) : "", n.cellLineSeparator);
			let a = IM(PM(r.replace(/[ \t]*\r?\n[ \t]*/g, "<br>"))), o = e.type === "tableHeader", s = _M(e.attrs);
			i.push({
				text: a,
				isHeader: o,
				align: s
			});
		}), r.push(i);
	});
	let i = r.reduce((e, t) => Math.max(e, t.length), 0);
	if (i === 0) return "";
	let a = Array.from({ length: i }).fill(0);
	r.forEach((e) => {
		for (let t = 0; t < i; t += 1) {
			let n = (e[t]?.text || "").length;
			n > a[t] && (a[t] = n), a[t] < 3 && (a[t] = 3);
		}
	});
	let o = (e, t) => e + " ".repeat(Math.max(0, t - e.length)), s = r[0], c = s.some((e) => e.isHeader), l = Array.from({ length: i }).fill(null);
	r.forEach((e) => {
		for (let t = 0; t < i; t += 1) !l[t] && e[t]?.align && (l[t] = e[t].align);
	});
	let u = "\n", d = Array.from({ length: i }).map((e, t) => c && s[t] && s[t].text || "");
	return u += `| ${d.map((e, t) => o(e, a[t])).join(" | ")} |\n`, u += `| ${a.map((e, t) => {
		let n = Math.max(3, e), r = l[t];
		return r === "left" ? `:${"-".repeat(n)}` : r === "right" ? `${"-".repeat(n)}:` : r === "center" ? `:${"-".repeat(n)}:` : "-".repeat(n);
	}).join(" | ")} |\n`, (c ? r.slice(1) : r).forEach((e) => {
		u += `| ${Array.from({ length: i }).fill(0).map((t, n) => o(e[n] && e[n].text || "", a[n])).join(" | ")} |\n`;
	}), u;
}
function RM(e, t) {
	let n = e.posAtCoords({
		left: t.clientX,
		top: t.clientY
	});
	if (n) return n.pos;
	if (!(t.target instanceof Node)) return null;
	try {
		return e.posAtDOM(t.target, 0);
	} catch {
		return null;
	}
}
function zM(e, t) {
	let n = !1;
	return e.forEachCell((e, r) => {
		t >= r && t < r + e.nodeSize && (n = !0);
	}), n;
}
function BM() {
	return new O({
		key: qM,
		props: { handleDOMEvents: { mousedown(e, t) {
			if (t.button !== 2) return !1;
			let { selection: n } = e.state;
			if (!AM(n) || n.ranges.length < 2) return !1;
			let r = RM(e, t);
			return r == null || !zM(n, r) ? !1 : (t.preventDefault(), !0);
		} } }
	});
}
var VM, HM, UM, WM, GM, KM, qM, JM, YM = e((() => {
	I(), Fr(), mM(), VM = /[ \t\r\n\f]+/g, HM = Wp.create({
		name: "tableCell",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		content: "block+",
		addAttributes() {
			return {
				colspan: { default: 1 },
				rowspan: { default: 1 },
				colwidth: {
					default: null,
					parseHTML: bM
				},
				align: vM()
			};
		},
		tableRole: "cell",
		isolating: !0,
		parseHTML() {
			return [{
				tag: "td",
				getAttrs: (e) => xM(e) ? {} : !1,
				getContent: (e, t) => SM(t.nodes[this.name])
			}, { tag: "td" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			let t = P(this.options.HTMLAttributes, e);
			return CM(t, e, "colspan"), CM(t, e, "rowspan"), [
				"td",
				t,
				0
			];
		}
	}), UM = Wp.create({
		name: "tableHeader",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		content: "block+",
		addAttributes() {
			return {
				colspan: { default: 1 },
				rowspan: { default: 1 },
				colwidth: {
					default: null,
					parseHTML: bM
				},
				align: vM()
			};
		},
		tableRole: "header_cell",
		isolating: !0,
		parseHTML() {
			return [{
				tag: "th",
				getAttrs: (e) => xM(e) ? {} : !1,
				getContent: (e, t) => SM(t.nodes[this.name])
			}, { tag: "th" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			let t = P(this.options.HTMLAttributes, e);
			return CM(t, e, "colspan"), CM(t, e, "rowspan"), [
				"th",
				t,
				0
			];
		}
	}), WM = Wp.create({
		name: "tableRow",
		addOptions() {
			return { HTMLAttributes: {} };
		},
		content: "(tableCell | tableHeader)*",
		tableRole: "row",
		parseHTML() {
			return [{ tag: "tr" }];
		},
		renderHTML({ HTMLAttributes: e }) {
			return [
				"tr",
				P(this.options.HTMLAttributes, e),
				0
			];
		}
	}), GM = class {
		constructor(e, t, n, r = {}) {
			this.node = e, this.cellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table"));
			for (let [e, t] of Object.entries(r)) t != null && (e === "style" ? this.table.style.cssText = String(t) : this.table.setAttribute(e, String(t)));
			e.attrs.style && (this.table.style.cssText = e.attrs.style), this.colgroup = this.table.appendChild(document.createElement("colgroup")), TM(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
		}
		update(e) {
			return e.sameMarkup(this.node) ? (this.node = e, TM(e, this.colgroup, this.table, this.cellMinWidth), !0) : !1;
		}
		ignoreMutation(e) {
			let t = e.target, n = this.dom.contains(t), r = this.contentDOM.contains(t);
			return !(!n || r || e.type !== "attributes" && e.type !== "childList" && e.type !== "characterData");
		}
	}, KM = ({ editor: e }) => {
		let { selection: t } = e.state;
		if (!AM(t)) return !1;
		let n = 0;
		return Ul(t.ranges[0].$from, (e) => e.type.name === "table")?.node.descendants((e) => {
			if (e.type.name === "table") return !1;
			["tableCell", "tableHeader"].includes(e.type.name) && (n += 1);
		}), n === t.ranges.length && (e.commands.deleteTable(), !0);
	}, qM = new k("preserveCellSelectionOnContextMenu"), JM = Wp.create({
		name: "table",
		addOptions() {
			return {
				HTMLAttributes: {},
				resizable: !1,
				renderWrapper: !1,
				handleWidth: 5,
				cellMinWidth: 25,
				View: GM,
				lastColumnResizable: !0,
				allowTableNodeSelection: !1
			};
		},
		content: "tableRow+",
		tableRole: "table",
		isolating: !0,
		group: "block",
		parseHTML() {
			return [{ tag: "table" }];
		},
		renderHTML({ node: e, HTMLAttributes: t }) {
			let { colgroup: n, tableWidth: r, tableMinWidth: i } = EM(e, this.options.cellMinWidth), a = t.style;
			function o() {
				return a || (r ? `width: ${r}` : `min-width: ${i}`);
			}
			let s = [
				"table",
				P(this.options.HTMLAttributes, t, { style: o() }),
				n,
				["tbody", 0]
			];
			return this.options.renderWrapper ? [
				"div",
				{ class: "tableWrapper" },
				s
			] : s;
		},
		parseMarkdown: (e, t) => {
			let n = [], r = Array.isArray(e.align) ? e.align : [];
			if (e.header) {
				let i = [];
				e.header.forEach((e, n) => {
					let a = hM(r[n] ?? e.align), o = a ? { align: a } : {};
					i.push(t.createNode("tableHeader", o, [{
						type: "paragraph",
						content: t.parseInline(e.tokens)
					}]));
				}), n.push(t.createNode("tableRow", {}, i));
			}
			return e.rows && e.rows.forEach((e) => {
				let i = [];
				e.forEach((e, n) => {
					let a = hM(r[n] ?? e.align), o = a ? { align: a } : {};
					i.push(t.createNode("tableCell", o, [{
						type: "paragraph",
						content: t.parseInline(e.tokens)
					}]));
				}), n.push(t.createNode("tableRow", {}, i));
			}), t.createNode("table", void 0, n);
		},
		renderMarkdown: (e, t) => LM(e, t),
		markdownTokenizer: {
			name: "table",
			level: "block",
			start: (e) => {
				let t = e.split("\n");
				if (t.length < 2) return -1;
				let n = t[1];
				return !/^[ \t|:]*-[ \t|:-]*$/.test(n) || !n.includes("|") ? -1 : t[0].includes("|") ? 0 : -1;
			},
			tokenize(e, t, n) {
				let r = e.indexOf("\n\n"), i = r >= 0 ? e.slice(0, r) : e, a = i.split("\n");
				if (a.length < 2) return;
				let o = a[1];
				if (!/^[ \t|:]*-[ \t|:-]*$/.test(o) || !o.includes("|")) return;
				let s = NM(i);
				if (s === i) return;
				let c = n.blockTokens(s)[0];
				if (c?.type !== "table" || !c.raw) return;
				let l = c.raw.split("\n").length, u = e.split("\n").slice(0, l).join("\n");
				return {
					...c,
					raw: u
				};
			}
		},
		addCommands() {
			return {
				insertTable: ({ rows: e = 3, cols: t = 3, withHeaderRow: n = !0 } = {}) => ({ tr: r, dispatch: i, editor: a }) => {
					let o = kM(a.schema, e, t, n);
					if (i) {
						let e = r.selection.from + 1;
						r.replaceSelectionWith(o).scrollIntoView().setSelection(E.near(r.doc.resolve(e)));
					}
					return !0;
				},
				addColumnBefore: () => ({ state: e, dispatch: t }) => nj(e, t),
				addColumnAfter: () => ({ state: e, dispatch: t }) => rj(e, t),
				deleteColumn: () => ({ state: e, dispatch: t }) => {
					let n = Ul(e.selection.$from, (e) => e.type.name === "table");
					return aj(e, t && ((e) => {
						n && jM(e, n.pos), t(e);
					}));
				},
				addRowBefore: () => ({ state: e, dispatch: t }) => cj(e, t),
				addRowAfter: () => ({ state: e, dispatch: t }) => lj(e, t),
				deleteRow: () => ({ state: e, dispatch: t }) => {
					let n = Ul(e.selection.$from, (e) => e.type.name === "table");
					return dj(e, t && ((e) => {
						n && jM(e, n.pos), t(e);
					}));
				},
				deleteTable: () => ({ state: e, dispatch: t }) => Cj(e, t),
				mergeCells: () => ({ state: e, dispatch: t }) => mj(e, t),
				splitCell: () => ({ state: e, dispatch: t }) => hj(e, t),
				toggleHeaderColumn: () => ({ state: e, dispatch: t }) => bj("column")(e, t),
				toggleHeaderRow: () => ({ state: e, dispatch: t }) => bj("row")(e, t),
				toggleHeaderCell: () => ({ state: e, dispatch: t }) => cM(e, t),
				mergeOrSplit: () => ({ state: e, dispatch: t }) => mj(e, t) ? !0 : hj(e, t),
				setCellAttribute: (e, t) => ({ state: n, dispatch: r }) => _j(e, t)(n, r),
				goToNextCell: () => ({ state: e, dispatch: t }) => Sj(1)(e, t),
				goToPreviousCell: () => ({ state: e, dispatch: t }) => Sj(-1)(e, t),
				fixTables: () => ({ state: e, dispatch: t }) => (t && QA(e), !0),
				setCellSelection: (e) => ({ tr: t, dispatch: n }) => {
					if (n) {
						let n = $.create(t.doc, e.anchorCell, e.headCell);
						t.setSelection(n);
					}
					return !0;
				}
			};
		},
		addKeyboardShortcuts() {
			return {
				Tab: () => this.editor.commands.goToNextCell() ? !0 : this.editor.can().addRowAfter() ? this.editor.chain().addRowAfter().goToNextCell().run() : !1,
				"Shift-Tab": () => this.editor.commands.goToPreviousCell(),
				Backspace: KM,
				"Mod-Backspace": KM,
				Delete: KM,
				"Mod-Delete": KM
			};
		},
		addProseMirrorPlugins() {
			return [
				...this.options.resizable && this.editor.isEditable ? [Uj({
					handleWidth: this.options.handleWidth,
					cellMinWidth: this.options.cellMinWidth,
					defaultCellMinWidth: this.options.cellMinWidth,
					View: null,
					lastColumnResizable: this.options.lastColumnResizable
				})] : [],
				nM({ allowTableNodeSelection: this.options.allowTableNodeSelection }),
				BM()
			];
		},
		addNodeView() {
			let e = this.options.View;
			return e ? ({ node: t, view: n, HTMLAttributes: r }) => {
				let i = P(this.options.HTMLAttributes, r);
				return new e(t, this.options.cellMinWidth, n, i);
			} : null;
		},
		extendNodeSchema(e) {
			return { tableRole: N(M(e, "tableRole", {
				name: e.name,
				options: e.options,
				storage: e.storage
			})) };
		}
	}), F.create({
		name: "tableKit",
		addExtensions() {
			let e = [];
			return this.options.table !== !1 && e.push(JM.configure(this.options.table)), this.options.tableCell !== !1 && e.push(HM.configure(this.options.tableCell)), this.options.tableHeader !== !1 && e.push(UM.configure(this.options.tableHeader)), this.options.tableRow !== !1 && e.push(WM.configure(this.options.tableRow)), e;
		}
	});
})), XM = e((() => {
	YM();
})), ZM = e((() => {
	YM();
})), QM = e((() => {
	YM();
})), $M, eN = e((() => {
	vv(), $M = _v;
})), tN, nN = e((() => {
	vv(), tN = gv;
}));
// node_modules/@hocuspocus/common/dist/hocuspocus-common.esm.js
function rN(e, t) {
	return e + lN + t;
}
function iN(e) {
	let t = e.indexOf(lN);
	return t === -1 ? {
		documentName: e,
		sessionId: null
	} : {
		documentName: e.substring(0, t),
		sessionId: e.substring(t + 1)
	};
}
var aN, oN, sN, cN, lN, uN, dN = e((() => {
	Wb(), yx(), aN = /* @__PURE__ */ function(e) {
		return e[e.Token = 0] = "Token", e[e.PermissionDenied = 1] = "PermissionDenied", e[e.Authenticated = 2] = "Authenticated", e;
	}({}), oN = (e, t) => {
		V(e, aN.Token), Ob(e, t);
	}, sN = (e, t, n, r) => {
		switch (U(e)) {
			case aN.Token:
				t();
				break;
			case aN.PermissionDenied:
				n(sx(e));
				break;
			case aN.Authenticated: r(sx(e));
		}
	}, cN = (e) => Array.from(e.entries()).map(([e, t]) => ({
		clientId: e,
		...t
	})), lN = "\0", uN = /* @__PURE__ */ function(e) {
		return e[e.Connecting = 0] = "Connecting", e[e.Open = 1] = "Open", e[e.Closing = 2] = "Closing", e[e.Closed = 3] = "Closed", e;
	}({});
})), fN, pN, mN, hN, gN, _N = e((() => {
	Wb(), yx(), kx(), Yy(), Uy(), rS(), fN = 3e4, pN = class extends Hy {
		constructor(e) {
			super(), this.doc = e, this.clientID = e.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = setInterval(() => {
				let e = Ox();
				this.getLocalState() !== null && 15e3 <= e - this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
				let t = [];
				this.meta.forEach((n, r) => {
					r !== this.clientID && 3e4 <= e - n.lastUpdated && this.states.has(r) && t.push(r);
				}), t.length > 0 && mN(this, t, "timeout");
			}, Wy(fN / 10)), e.on("destroy", () => {
				this.destroy();
			}), this.setLocalState({});
		}
		destroy() {
			this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
		}
		getLocalState() {
			return this.states.get(this.clientID) || null;
		}
		setLocalState(e) {
			let t = this.clientID, n = this.meta.get(t), r = n === void 0 ? 0 : n.clock + 1, i = this.states.get(t);
			e === null ? this.states.delete(t) : this.states.set(t, e), this.meta.set(t, {
				clock: r,
				lastUpdated: Ox()
			});
			let a = [], o = [], s = [], c = [];
			e === null ? c.push(t) : i == null ? e != null && a.push(t) : (o.push(t), tS(i, e) || s.push(t)), (a.length > 0 || s.length > 0 || c.length > 0) && this.emit("change", [{
				added: a,
				updated: s,
				removed: c
			}, "local"]), this.emit("update", [{
				added: a,
				updated: o,
				removed: c
			}, "local"]);
		}
		setLocalStateField(e, t) {
			let n = this.getLocalState();
			n !== null && this.setLocalState({
				...n,
				[e]: t
			});
		}
		getStates() {
			return this.states;
		}
	}, mN = (e, t, n) => {
		let r = [];
		for (let n = 0; n < t.length; n++) {
			let i = t[n];
			if (e.states.has(i)) {
				if (e.states.delete(i), i === e.clientID) {
					let t = e.meta.get(i);
					e.meta.set(i, {
						clock: t.clock + 1,
						lastUpdated: Ox()
					});
				}
				r.push(i);
			}
		}
		r.length > 0 && (e.emit("change", [{
			added: [],
			updated: [],
			removed: r
		}, n]), e.emit("update", [{
			added: [],
			updated: [],
			removed: r
		}, n]));
	}, hN = (e, t, n = e.states) => {
		let r = t.length, i = gb();
		V(i, r);
		for (let a = 0; a < r; a++) {
			let r = t[a], o = n.get(r) || null, s = e.meta.get(r).clock;
			V(i, r), V(i, s), Ob(i, JSON.stringify(o));
		}
		return yb(i);
	}, gN = (e, t, n) => {
		let r = $b(t), i = Ox(), a = [], o = [], s = [], c = [], l = U(r);
		for (let t = 0; t < l; t++) {
			let t = U(r), n = U(r), l = JSON.parse(sx(r)), u = e.meta.get(t), d = e.states.get(t), f = u === void 0 ? 0 : u.clock;
			(f < n || f === n && l === null && e.states.has(t)) && (l === null ? t === e.clientID && e.getLocalState() != null ? n++ : e.states.delete(t) : e.states.set(t, l), e.meta.set(t, {
				clock: n,
				lastUpdated: i
			}), u === void 0 && l !== null ? a.push(t) : u !== void 0 && l === null ? c.push(t) : l !== null && (tS(l, d) || s.push(t), o.push(t)));
		}
		(a.length > 0 || s.length > 0 || c.length > 0) && e.emit("change", [{
			added: a,
			updated: s,
			removed: c
		}, n]), (a.length > 0 || o.length > 0 || c.length > 0) && e.emit("update", [{
			added: a,
			updated: o,
			removed: c
		}, n]);
	};
}));
// node_modules/@lifeomic/attempt/dist/es6/src/index.js
function vN(e) {
	return e ||= {}, {
		delay: e.delay === void 0 ? 200 : e.delay,
		initialDelay: e.initialDelay === void 0 ? 0 : e.initialDelay,
		minDelay: e.minDelay === void 0 ? 0 : e.minDelay,
		maxDelay: e.maxDelay === void 0 ? 0 : e.maxDelay,
		factor: e.factor === void 0 ? 0 : e.factor,
		maxAttempts: e.maxAttempts === void 0 ? 3 : e.maxAttempts,
		timeout: e.timeout === void 0 ? 0 : e.timeout,
		jitter: e.jitter === !0,
		initialJitter: e.initialJitter === !0,
		handleError: e.handleError === void 0 ? null : e.handleError,
		handleTimeout: e.handleTimeout === void 0 ? null : e.handleTimeout,
		beforeAttempt: e.beforeAttempt === void 0 ? null : e.beforeAttempt,
		calculateDelay: e.calculateDelay === void 0 ? null : e.calculateDelay
	};
}
async function yN(e) {
	return new Promise((t) => setTimeout(t, e));
}
function bN(e, t) {
	let n = t.delay;
	if (n === 0) return 0;
	if (t.factor && (n *= t.factor ** (e.attemptNum - 1), t.maxDelay !== 0 && (n = Math.min(n, t.maxDelay))), t.jitter) {
		let e = Math.ceil(t.minDelay);
		n = Math.floor(Math.random() * (Math.floor(n) - e + 1)) + e;
	}
	return Math.round(n);
}
async function xN(e, t) {
	let n = vN(t);
	for (let e of [
		"delay",
		"initialDelay",
		"minDelay",
		"maxDelay",
		"maxAttempts",
		"timeout"
	]) {
		let t = n[e];
		if (!Number.isInteger(t) || t < 0) throw Error(`Value for ${e} must be an integer greater than or equal to 0`);
	}
	if (n.factor.constructor !== Number || n.factor < 0) throw Error("Value for factor must be a number greater than or equal to 0");
	if (n.delay < n.minDelay) throw Error(`delay cannot be less than minDelay (delay: ${n.delay}, minDelay: ${n.minDelay}`);
	let r = {
		attemptNum: 0,
		attemptsRemaining: n.maxAttempts ? n.maxAttempts : -1,
		aborted: !1,
		abort() {
			r.aborted = !0;
		}
	}, i = n.calculateDelay || bN;
	async function a() {
		if (n.beforeAttempt && n.beforeAttempt(r, n), r.aborted) {
			let e = /* @__PURE__ */ Error("Attempt aborted");
			throw e.code = "ATTEMPT_ABORTED", e;
		}
		let t = async (e) => {
			if (n.handleError && await n.handleError(e, r, n), r.aborted || r.attemptsRemaining === 0) throw e;
			r.attemptNum++;
			let t = i(r, n);
			return t && await yN(t), a();
		};
		return r.attemptsRemaining > 0 && r.attemptsRemaining--, n.timeout ? new Promise((i, a) => {
			let o = setTimeout(() => {
				if (n.handleTimeout) try {
					i(n.handleTimeout(r, n));
				} catch (e) {
					a(e);
				}
				else {
					let e = /* @__PURE__ */ Error(`Retry timeout (attemptNum: ${r.attemptNum}, timeout: ${n.timeout})`);
					e.code = "ATTEMPT_TIMEOUT", a(e);
				}
			}, n.timeout);
			e(r, n).then((e) => {
				clearTimeout(o), i(e);
			}).catch((e) => {
				clearTimeout(o), t(e).then(i).catch(a);
			});
		}) : e(r, n).catch(t);
	}
	let o = n.calculateDelay ? n.calculateDelay(r, n) : n.initialDelay;
	if (o && await yN(o), r.attemptNum < 1 && n.initialJitter) {
		let e = i(r, n);
		e && await yN(e);
	}
	return a();
}
var SN = e((() => {})), CN, wN, TN, EN, DN, ON, kN, AN = e((() => {
	Wb(), yx(), pO(), CN = (e, t) => {
		V(e, 0);
		let n = uT(t);
		Ab(e, n);
	}, wN = (e, t, n) => {
		V(e, 1), Ab(e, iT(t, n));
	}, TN = (e, t, n) => wN(t, n, nx(e)), EN = (e, t, n, r) => {
		try {
			tT(t, nx(e), n);
		} catch (e) {
			r?.(e), console.error("Caught error while handling a Yjs update", e);
		}
	}, DN = (e, t) => {
		V(e, 2), Ab(e, t);
	}, ON = EN, kN = (e, t, n, r, i) => {
		let a = U(e);
		switch (a) {
			case 0:
				TN(e, t, n);
				break;
			case 1:
				EN(e, n, r, i);
				break;
			case 2:
				ON(e, n, r, i);
				break;
			default: throw Error("Unknown message type");
		}
		return a;
	};
})), jN, MN, NN, PN, FN, IN, LN, RN, zN, BN, VN, HN, UN, WN, GN, KN, qN, JN = e((() => {
	dN(), _N(), pO(), SN(), yx(), Wb(), kx(), AN(), jN = class {
		constructor() {
			this.callbacks = {};
		}
		on(e, t) {
			return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
		}
		emit(e, ...t) {
			let n = this.callbacks[e];
			return n && n.forEach((e) => e.apply(this, t)), this;
		}
		off(e, t) {
			let n = this.callbacks[e];
			return n && (t ? this.callbacks[e] = n.filter((e) => e !== t) : delete this.callbacks[e]), this;
		}
		removeAllListeners() {
			this.callbacks = {};
		}
	}, MN = class {
		constructor(e) {
			this.data = e, this.encoder = gb(), this.decoder = $b(new Uint8Array(this.data));
		}
		peekVarString() {
			return cx(this.decoder);
		}
		readVarUint() {
			return U(this.decoder);
		}
		readVarString() {
			return sx(this.decoder);
		}
		readVarUint8Array() {
			return nx(this.decoder);
		}
		writeVarUint(e) {
			return V(this.encoder, e);
		}
		writeVarString(e) {
			return Ob(this.encoder, e);
		}
		writeVarUint8Array(e) {
			return Ab(this.encoder, e);
		}
		length() {
			return vb(this.encoder);
		}
	}, NN = /* @__PURE__ */ function(e) {
		return e[e.Sync = 0] = "Sync", e[e.Awareness = 1] = "Awareness", e[e.Auth = 2] = "Auth", e[e.QueryAwareness = 3] = "QueryAwareness", e[e.Stateless = 5] = "Stateless", e[e.CLOSE = 7] = "CLOSE", e[e.SyncStatus = 8] = "SyncStatus", e[e.Ping = 9] = "Ping", e[e.Pong = 10] = "Pong", e;
	}({}), PN = /* @__PURE__ */ function(e) {
		return e.Connecting = "connecting", e.Connected = "connected", e.Disconnected = "disconnected", e;
	}({}), FN = class {
		constructor() {
			this.encoder = gb();
		}
		get(e) {
			return e.encoder;
		}
		toUint8Array() {
			return yb(this.encoder);
		}
	}, IN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.CLOSE, this.description = "Ask the server to close the connection";
		}
		get(e) {
			return Ob(this.encoder, e.documentName), V(this.encoder, this.type), this.encoder;
		}
	}, LN = class e extends jN {
		static {
			this.DEDUPLICATABLE_TYPES = /* @__PURE__ */ new Set([NN.Awareness, NN.QueryAwareness]);
		}
		constructor(e) {
			super(), this.messageQueue = [], this.configuration = {
				url: "",
				autoConnect: !0,
				preserveTrailingSlash: !1,
				document: void 0,
				WebSocketPolyfill: void 0,
				messageReconnectTimeout: 3e4,
				delay: 1e3,
				initialDelay: 0,
				factor: 2,
				maxAttempts: 0,
				minDelay: 1e3,
				maxDelay: 3e4,
				jitter: !0,
				timeout: 0,
				onOpen: () => null,
				onConnect: () => null,
				onMessage: () => null,
				onOutgoingMessage: () => null,
				onStatus: () => null,
				onDisconnect: () => null,
				onClose: () => null,
				onMaxAttemptsFailed: () => null,
				onDestroy: () => null,
				onAwarenessUpdate: () => null,
				onAwarenessChange: () => null,
				handleTimeout: null,
				providerMap: /* @__PURE__ */ new Map()
			}, this.webSocket = null, this.webSocketHandlers = {}, this.shouldConnect = !0, this.status = PN.Disconnected, this.lastMessageReceived = 0, this.identifier = 0, this.intervals = { connectionChecker: null }, this.connectionAttempt = null, this.receivedOnOpenPayload = void 0, this.reconnectTimeout = null, this.closeTries = 0, this.setConfiguration(e), this.configuration.WebSocketPolyfill = e.WebSocketPolyfill ? e.WebSocketPolyfill : WebSocket, this.on("open", this.configuration.onOpen), this.on("open", this.onOpen.bind(this)), this.on("connect", this.configuration.onConnect), this.on("message", this.configuration.onMessage), this.on("outgoingMessage", this.configuration.onOutgoingMessage), this.on("status", this.configuration.onStatus), this.on("disconnect", this.configuration.onDisconnect), this.on("close", this.configuration.onClose), this.on("maxAttemptsFailed", this.configuration.onMaxAttemptsFailed), this.on("destroy", this.configuration.onDestroy), this.on("awarenessUpdate", this.configuration.onAwarenessUpdate), this.on("awarenessChange", this.configuration.onAwarenessChange), this.on("close", this.onClose.bind(this)), this.on("message", this.onMessage.bind(this)), this.intervals.connectionChecker = setInterval(this.checkConnection.bind(this), this.configuration.messageReconnectTimeout / 10), this.shouldConnect && this.connect();
		}
		async onOpen(e) {
			this.status = PN.Connected, this.emit("status", { status: PN.Connected }), this.receivedOnOpenPayload = e;
		}
		attach(e) {
			let t = e.effectiveName, n = this.configuration.providerMap.get(t);
			if (n && n !== e && n.isAuthenticated) throw Error(`Cannot attach two providers with the same effective name "${t}". Use sessionAwareness: true to multiplex providers with the same document name.`);
			this.configuration.providerMap.set(t, e), this.status === PN.Disconnected && this.shouldConnect && this.connect(), this.receivedOnOpenPayload && this.status === PN.Connected && e.onOpen(this.receivedOnOpenPayload);
		}
		detach(e) {
			let t = e.effectiveName;
			this.configuration.providerMap.has(t) && (e.send(IN, { documentName: t }), this.configuration.providerMap.delete(t));
		}
		setConfiguration(e = {}) {
			this.configuration = {
				...this.configuration,
				...e
			}, this.configuration.autoConnect || (this.shouldConnect = !1);
		}
		clearReconnectTimeout() {
			this.reconnectTimeout &&= (clearTimeout(this.reconnectTimeout), null);
		}
		async connect() {
			if (this.status === PN.Connected) return;
			this.clearReconnectTimeout(), this.cancelWebsocketRetry &&= (this.cancelWebsocketRetry(), void 0), this.receivedOnOpenPayload = void 0, this.shouldConnect = !0;
			let { retryPromise: e, cancelFunc: t } = (() => {
				let e = !1;
				return {
					retryPromise: xN(this.createWebSocketConnection.bind(this), {
						delay: this.configuration.delay,
						initialDelay: this.configuration.initialDelay,
						factor: this.configuration.factor,
						maxAttempts: this.configuration.maxAttempts,
						minDelay: this.configuration.minDelay,
						maxDelay: this.configuration.maxDelay,
						jitter: this.configuration.jitter,
						timeout: this.configuration.timeout,
						handleTimeout: this.configuration.handleTimeout,
						beforeAttempt: (t) => {
							(!this.shouldConnect || e) && t.abort();
						}
					}).catch((e) => {
						e?.code !== "ATTEMPT_ABORTED" && this.emit("maxAttemptsFailed", { error: e });
					}),
					cancelFunc: () => {
						e = !0;
					}
				};
			})();
			return this.cancelWebsocketRetry = t, e;
		}
		attachWebSocketListeners(e, t) {
			let { identifier: n } = e, r = (e) => this.emit("message", e), i = (e) => this.emit("close", { event: e }), a = (e) => this.emit("open", e), o = (e) => {
				t(e);
			};
			this.webSocketHandlers[n] = {
				message: r,
				close: i,
				open: a,
				error: o
			};
			let s = this.webSocketHandlers[e.identifier];
			Object.keys(s).forEach((t) => {
				e.addEventListener(t, s[t]);
			});
		}
		cleanupWebSocket() {
			if (!this.webSocket) return;
			let { identifier: e } = this.webSocket, t = this.webSocketHandlers[e];
			Object.keys(t).forEach((n) => {
				this.webSocket?.removeEventListener(n, t[n]), delete this.webSocketHandlers[e];
			}), this.webSocket.close(), this.webSocket = null;
		}
		createWebSocketConnection() {
			return new Promise((e, t) => {
				this.webSocket && (this.messageQueue = [], this.cleanupWebSocket()), this.lastMessageReceived = 0, this.identifier += 1;
				let n = new this.configuration.WebSocketPolyfill(this.url);
				n.binaryType = "arraybuffer", n.identifier = this.identifier, this.attachWebSocketListeners(n, t), this.webSocket = n, this.status = PN.Connecting, this.emit("status", { status: PN.Connecting }), this.connectionAttempt = {
					resolve: e,
					reject: t
				};
			});
		}
		onMessage(e) {
			this.resolveConnectionAttempt(), this.lastMessageReceived = Ox();
			let t = new Uint8Array(e.data);
			if (t.length === 1 && t[0] === NN.Ping) {
				this.sendPong();
				return;
			}
			let n = new MN(t).peekVarString();
			this.configuration.providerMap.get(n)?.onMessage(e);
		}
		sendPong() {
			let e = gb();
			V(e, NN.Pong), this.send(yb(e));
		}
		resolveConnectionAttempt() {
			this.connectionAttempt && (this.cancelWebsocketRetry = void 0, this.connectionAttempt.resolve(), this.connectionAttempt = null, this.status = PN.Connected, this.emit("status", { status: PN.Connected }), this.emit("connect"), this.messageQueue.forEach((e) => this.send(e)), this.messageQueue = []);
		}
		stopConnectionAttempt() {
			this.connectionAttempt = null;
		}
		rejectConnectionAttempt(e) {
			this.connectionAttempt?.reject(e), this.connectionAttempt = null;
		}
		checkConnection() {
			this.status === PN.Connected && this.lastMessageReceived && (this.configuration.messageReconnectTimeout >= Ox() - this.lastMessageReceived || (this.closeTries += 1, this.closeTries > 2 ? (this.onClose({ event: {
				code: 4408,
				reason: "forced"
			} }), this.closeTries = 0) : (this.webSocket?.close(), this.messageQueue = [])));
		}
		get serverUrl() {
			if (this.configuration.preserveTrailingSlash) return this.configuration.url;
			let e = this.configuration.url;
			for (; e[e.length - 1] === "/";) e = e.slice(0, e.length - 1);
			return e;
		}
		get url() {
			return this.serverUrl;
		}
		disconnect() {
			if (this.shouldConnect = !1, this.clearReconnectTimeout(), this.webSocket !== null) try {
				this.webSocket.close(), this.messageQueue = [];
			} catch (e) {
				console.error(e);
			}
		}
		parseQueuedMessage(e) {
			try {
				let t = $b(e);
				return {
					documentName: sx(t),
					messageType: U(t)
				};
			} catch {
				return null;
			}
		}
		addToQueue(t) {
			if (t instanceof Uint8Array) {
				let n = this.parseQueuedMessage(t);
				n && e.DEDUPLICATABLE_TYPES.has(n.messageType) && (this.messageQueue = this.messageQueue.filter((e) => {
					if (!(e instanceof Uint8Array)) return !0;
					let t = this.parseQueuedMessage(e);
					return !t || t.documentName !== n.documentName || t.messageType !== n.messageType;
				}));
			}
			this.messageQueue.push(t);
		}
		send(e) {
			this.webSocket?.readyState === uN.Open ? this.webSocket.send(e) : this.addToQueue(e);
		}
		onClose({ event: e }) {
			this.closeTries = 0, this.cleanupWebSocket(), this.connectionAttempt && this.rejectConnectionAttempt(/* @__PURE__ */ Error(`WebSocket closed before the connection was established (code: ${e?.code}, reason: ${e?.reason || "none"})`)), this.status = PN.Disconnected, this.emit("status", { status: PN.Disconnected }), this.emit("disconnect", { event: e }), !this.cancelWebsocketRetry && this.shouldConnect && (this.reconnectTimeout = setTimeout(() => {
				this.reconnectTimeout = null, this.connect();
			}, this.configuration.delay));
		}
		destroy() {
			this.emit("destroy"), clearInterval(this.intervals.connectionChecker), this.stopConnectionAttempt(), this.disconnect(), this.removeAllListeners(), this.cleanupWebSocket();
		}
	}, RN = class {
		constructor(e) {
			this.message = e;
		}
		apply(e, t) {
			let { message: n } = this, r = n.readVarUint(), i = n.length();
			switch (r) {
				case NN.Sync:
					this.applySyncMessage(e, t);
					break;
				case NN.Awareness:
					this.applyAwarenessMessage(e);
					break;
				case NN.Auth:
					this.applyAuthMessage(e);
					break;
				case NN.QueryAwareness:
					this.applyQueryAwarenessMessage(e);
					break;
				case NN.Stateless:
					e.receiveStateless(sx(n.decoder));
					break;
				case NN.SyncStatus:
					this.applySyncStatusMessage(e, ix(n.decoder) === 1);
					break;
				case NN.CLOSE: {
					let t = {
						code: 1e3,
						reason: sx(n.decoder)
					};
					e.onClose(), e.configuration.onClose({ event: t }), e.forwardClose({ event: t });
					break;
				}
				default: console.error(`Can’t apply message of unknown type: ${r}`);
			}
			n.length() > i + 1 && e.send(FN, { encoder: n.encoder });
		}
		applySyncMessage(e, t) {
			let { message: n } = this;
			n.writeVarUint(NN.Sync);
			let r = kN(n.decoder, n.encoder, e.document, e);
			t && r === 1 && (e.synced = !0);
		}
		applySyncStatusMessage(e, t) {
			t && e.decrementUnsyncedChanges();
		}
		applyAwarenessMessage(e) {
			if (!e.awareness) return;
			let { message: t } = this;
			gN(e.awareness, t.readVarUint8Array(), e);
		}
		applyAuthMessage(e) {
			let { message: t } = this;
			sN(t.decoder, e.sendToken.bind(e), e.permissionDeniedHandler.bind(e), e.authenticatedHandler.bind(e));
		}
		applyQueryAwarenessMessage(e) {
			if (!e.awareness) return;
			let { message: t } = this;
			t.writeVarUint(NN.Awareness), t.writeVarUint8Array(hN(e.awareness, Array.from(e.awareness.getStates().keys())));
		}
	}, zN = class {
		constructor(e, t = {}) {
			this.message = new e(), this.encoder = this.message.get(t);
		}
		create() {
			return yb(this.encoder);
		}
		send(e) {
			e?.send(this.create());
		}
	}, BN = "4.8.0", VN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.Auth, this.description = "Authentication";
		}
		get(e) {
			if (e.token === void 0) throw Error("The authentication message requires `token` as an argument.");
			return Ob(this.encoder, e.documentName), V(this.encoder, this.type), oN(this.encoder, e.token), Ob(this.encoder, BN), this.encoder;
		}
	}, HN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.Awareness, this.description = "Awareness states update";
		}
		get(e) {
			if (e.awareness === void 0) throw Error("The awareness message requires awareness as an argument");
			if (e.clients === void 0) throw Error("The awareness message requires clients as an argument");
			Ob(this.encoder, e.documentName), V(this.encoder, this.type);
			let t;
			return t = e.states === void 0 ? hN(e.awareness, e.clients) : hN(e.awareness, e.clients, e.states), Ab(this.encoder, t), this.encoder;
		}
	}, UN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.Stateless, this.description = "A stateless message";
		}
		get(e) {
			return Ob(this.encoder, e.documentName), V(this.encoder, this.type), Ob(this.encoder, e.payload ?? ""), this.encoder;
		}
	}, WN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.Sync, this.description = "First sync step";
		}
		get(e) {
			if (e.document === void 0) throw Error("The sync step one message requires document as an argument");
			return Ob(this.encoder, e.documentName), V(this.encoder, this.type), CN(this.encoder, e.document), this.encoder;
		}
	}, GN = class extends FN {
		constructor(...e) {
			super(...e), this.type = NN.Sync, this.description = "A document update";
		}
		get(e) {
			return Ob(this.encoder, e.documentName), V(this.encoder, this.type), DN(this.encoder, e.update), this.encoder;
		}
	}, KN = class extends Error {
		constructor(...e) {
			super(...e), this.code = 1001;
		}
	}, qN = class extends jN {
		get effectiveName() {
			return this.configuration.sessionAwareness ? rN(this.configuration.name, this.sessionId) : this.configuration.name;
		}
		constructor(e) {
			super(), this.configuration = {
				name: "",
				document: void 0,
				awareness: void 0,
				token: null,
				sessionAwareness: !1,
				forceSyncInterval: !1,
				flushDelay: !1,
				onAuthenticated: () => null,
				onAuthenticationFailed: () => null,
				onOpen: () => null,
				onConnect: () => null,
				onMessage: () => null,
				onOutgoingMessage: () => null,
				onSynced: () => null,
				onStatus: () => null,
				onDisconnect: () => null,
				onClose: () => null,
				onDestroy: () => null,
				onAwarenessUpdate: () => null,
				onAwarenessChange: () => null,
				onStateless: () => null,
				onUnsyncedChanges: () => null
			}, this.isSynced = !1, this.unsyncedChanges = 0, this.isAuthenticated = !1, this.authorizedScope = void 0, this.manageSocket = !1, this._isAttached = !1, this.pendingUpdates = [], this.pendingAwarenessClients = /* @__PURE__ */ new Set(), this.flushTimeout = null, this.sessionId = Math.random().toString(36).slice(2), this.intervals = { forceSync: null }, this.boundDocumentUpdateHandler = this.documentUpdateHandler.bind(this), this.boundAwarenessUpdateHandler = this.awarenessUpdateHandler.bind(this), this.boundPageHide = this.pageHide.bind(this), this.boundOnOpen = this.onOpen.bind(this), this.boundOnClose = this.onClose.bind(this), this.forwardConnect = () => this.emit("connect"), this.forwardStatus = (e) => this.emit("status", e), this.forwardClose = (e) => this.emit("close", e), this.forwardDisconnect = (e) => this.emit("disconnect", e), this.forwardDestroy = () => this.emit("destroy"), this.setConfiguration(e), this.configuration.document = e.document ? e.document : new zw(), this.configuration.awareness = e.awareness === void 0 ? new pN(this.document) : e.awareness, this.on("open", this.configuration.onOpen), this.on("message", this.configuration.onMessage), this.on("outgoingMessage", this.configuration.onOutgoingMessage), this.on("synced", this.configuration.onSynced), this.on("destroy", this.configuration.onDestroy), this.on("awarenessUpdate", this.configuration.onAwarenessUpdate), this.on("awarenessChange", this.configuration.onAwarenessChange), this.on("stateless", this.configuration.onStateless), this.on("unsyncedChanges", this.configuration.onUnsyncedChanges), this.on("authenticated", this.configuration.onAuthenticated), this.on("authenticationFailed", this.configuration.onAuthenticationFailed), this.awareness?.on("update", () => {
				this.emit("awarenessUpdate", { states: cN(this.awareness.getStates()) });
			}), this.awareness?.on("change", () => {
				this.emit("awarenessChange", { states: cN(this.awareness.getStates()) });
			}), this.document.on("update", this.boundDocumentUpdateHandler), this.awareness?.on("update", this.boundAwarenessUpdateHandler), this.registerEventListeners(), this.configuration.forceSyncInterval && typeof this.configuration.forceSyncInterval == "number" && (this.intervals.forceSync = setInterval(this.forceSync.bind(this), this.configuration.forceSyncInterval)), this.manageSocket && this.attach();
		}
		setConfiguration(e = {}) {
			e.websocketProvider || (this.manageSocket = !0, this.configuration.websocketProvider = new LN(e)), this.configuration = {
				...this.configuration,
				...e
			};
		}
		get document() {
			return this.configuration.document;
		}
		get isAttached() {
			return this._isAttached;
		}
		get awareness() {
			return this.configuration.awareness;
		}
		get hasUnsyncedChanges() {
			return this.unsyncedChanges > 0;
		}
		resetUnsyncedChanges() {
			this.unsyncedChanges = 1, this.emit("unsyncedChanges", { number: this.unsyncedChanges });
		}
		incrementUnsyncedChanges() {
			this.unsyncedChanges += 1, this.emit("unsyncedChanges", { number: this.unsyncedChanges });
		}
		decrementUnsyncedChanges() {
			this.unsyncedChanges > 0 && --this.unsyncedChanges, this.unsyncedChanges === 0 && (this.synced = !0), this.emit("unsyncedChanges", { number: this.unsyncedChanges });
		}
		forceSync() {
			this.resetUnsyncedChanges(), this.send(WN, {
				document: this.document,
				documentName: this.effectiveName
			});
		}
		pageHide() {
			this.awareness && mN(this.awareness, [this.document.clientID], "page hide"), this.flushPendingUpdates();
		}
		registerEventListeners() {
			typeof window < "u" && "addEventListener" in window && window.addEventListener("pagehide", this.boundPageHide);
		}
		sendStateless(e) {
			this.send(UN, {
				documentName: this.effectiveName,
				payload: e
			});
		}
		async sendToken() {
			let e;
			try {
				e = await this.getToken();
			} catch (e) {
				this.permissionDeniedHandler(`Failed to get token during sendToken(): ${e}`);
				return;
			}
			this.send(VN, {
				token: e ?? "",
				documentName: this.effectiveName
			});
		}
		get batchingEnabled() {
			return !!this.configuration.flushDelay && typeof this.configuration.flushDelay == "number";
		}
		documentUpdateHandler(e, t) {
			t !== this && (this.batchingEnabled ? (this.pendingUpdates.length === 0 && this.incrementUnsyncedChanges(), this.pendingUpdates.push(e), this.scheduleFlush()) : (this.incrementUnsyncedChanges(), this.send(GN, {
				update: e,
				documentName: this.effectiveName
			})));
		}
		awarenessUpdateHandler({ added: e, updated: t, removed: n }, r) {
			if (r === this) return;
			let i = e.concat(t).concat(n);
			if (!this.batchingEnabled) this.send(HN, {
				awareness: this.awareness,
				clients: i,
				documentName: this.effectiveName
			});
			else {
				for (let e of i) this.pendingAwarenessClients.add(e);
				this.scheduleFlush();
			}
		}
		scheduleFlush() {
			this.flushTimeout === null && (this.flushTimeout = setTimeout(() => {
				this.flushTimeout = null, this.flushPendingUpdates();
			}, this.configuration.flushDelay));
		}
		flushPendingUpdates() {
			if (this.flushTimeout !== null && (clearTimeout(this.flushTimeout), this.flushTimeout = null), this.pendingUpdates.length > 0) {
				let e = this.pendingUpdates.length === 1 ? this.pendingUpdates[0] : aE(this.pendingUpdates);
				this.pendingUpdates = [], this.send(GN, {
					update: e,
					documentName: this.effectiveName
				});
			}
			if (this.pendingAwarenessClients.size > 0) {
				let e = Array.from(this.pendingAwarenessClients);
				this.pendingAwarenessClients.clear(), this.send(HN, {
					awareness: this.awareness,
					clients: e,
					documentName: this.effectiveName
				});
			}
		}
		get synced() {
			return this.isSynced;
		}
		set synced(e) {
			this.isSynced !== e && (this.isSynced = e, e && this.emit("synced", { state: e }));
		}
		receiveStateless(e) {
			this.emit("stateless", { payload: e });
		}
		async connect() {
			if (this.manageSocket) return this.configuration.websocketProvider.connect();
			console.warn("HocuspocusProvider::connect() is deprecated and does not do anything. Please connect/disconnect on the websocketProvider, or attach/deattach providers.");
		}
		disconnect() {
			if (this.manageSocket) return this.configuration.websocketProvider.disconnect();
			console.warn("HocuspocusProvider::disconnect() is deprecated and does not do anything. Please connect/disconnect on the websocketProvider, or attach/deattach providers.");
		}
		async onOpen(e) {
			this.isAuthenticated = !1, this.emit("open", { event: e }), await this.sendToken(), this.startSync();
		}
		async getToken() {
			return typeof this.configuration.token == "function" ? await this.configuration.token() : this.configuration.token;
		}
		startSync() {
			this.resetUnsyncedChanges(), this.send(WN, {
				document: this.document,
				documentName: this.effectiveName
			}), this.awareness && this.awareness.getLocalState() !== null && this.send(HN, {
				awareness: this.awareness,
				clients: [this.document.clientID],
				documentName: this.effectiveName
			});
		}
		send(e, t) {
			if (!this._isAttached) return;
			let n = new zN(e, t);
			this.emit("outgoingMessage", { message: n.message }), n.send(this.configuration.websocketProvider);
		}
		onMessage(e) {
			let t = new MN(e.data), { documentName: n } = iN(t.readVarString());
			t.writeVarString(this.effectiveName), this.emit("message", {
				event: e,
				message: new MN(e.data)
			}), new RN(t).apply(this, !0);
		}
		onClose() {
			this.isAuthenticated = !1, this.synced = !1, this.flushTimeout !== null && (clearTimeout(this.flushTimeout), this.flushTimeout = null), this.pendingUpdates = [], this.pendingAwarenessClients.clear(), this.awareness && mN(this.awareness, Array.from(this.awareness.getStates().keys()).filter((e) => e !== this.document.clientID), this);
		}
		destroy() {
			this.emit("destroy"), this.intervals.forceSync && clearInterval(this.intervals.forceSync), this.awareness && (mN(this.awareness, [this.document.clientID], "provider destroy"), this.awareness.off("update", this.boundAwarenessUpdateHandler), this.awareness.destroy()), this.flushPendingUpdates(), this.document.off("update", this.boundDocumentUpdateHandler), this.removeAllListeners(), this.detach(), this.manageSocket && this.configuration.websocketProvider.destroy(), typeof window < "u" && "removeEventListener" in window && window.removeEventListener("pagehide", this.boundPageHide);
		}
		detach() {
			this.configuration.websocketProvider.off("connect", this.configuration.onConnect), this.configuration.websocketProvider.off("connect", this.forwardConnect), this.configuration.websocketProvider.off("status", this.forwardStatus), this.configuration.websocketProvider.off("status", this.configuration.onStatus), this.configuration.websocketProvider.off("open", this.boundOnOpen), this.configuration.websocketProvider.off("close", this.boundOnClose), this.configuration.websocketProvider.off("close", this.configuration.onClose), this.configuration.websocketProvider.off("close", this.forwardClose), this.configuration.websocketProvider.off("disconnect", this.configuration.onDisconnect), this.configuration.websocketProvider.off("disconnect", this.forwardDisconnect), this.configuration.websocketProvider.off("destroy", this.configuration.onDestroy), this.configuration.websocketProvider.off("destroy", this.forwardDestroy), this.configuration.websocketProvider.detach(this), this._isAttached = !1;
		}
		attach() {
			this._isAttached ||= (this.configuration.websocketProvider.on("connect", this.configuration.onConnect), this.configuration.websocketProvider.on("connect", this.forwardConnect), this.configuration.websocketProvider.on("status", this.configuration.onStatus), this.configuration.websocketProvider.on("status", this.forwardStatus), this.configuration.websocketProvider.on("open", this.boundOnOpen), this.configuration.websocketProvider.on("close", this.boundOnClose), this.configuration.websocketProvider.on("close", this.configuration.onClose), this.configuration.websocketProvider.on("close", this.forwardClose), this.configuration.websocketProvider.on("disconnect", this.configuration.onDisconnect), this.configuration.websocketProvider.on("disconnect", this.forwardDisconnect), this.configuration.websocketProvider.on("destroy", this.configuration.onDestroy), this.configuration.websocketProvider.on("destroy", this.forwardDestroy), this.configuration.websocketProvider.attach(this), !0);
		}
		permissionDeniedHandler(e) {
			this.emit("authenticationFailed", { reason: e }), this.isAuthenticated = !1;
		}
		authenticatedHandler(e) {
			this.isAuthenticated = !0, this.authorizedScope = e, this.emit("authenticated", { scope: e });
		}
		setAwarenessField(e, t) {
			if (!this.awareness) throw new KN(`Cannot set awareness field "${e}" to ${JSON.stringify(t)}. You have disabled Awareness for this provider by explicitly passing awareness: null in the provider configuration.`);
			this.awareness.setLocalStateField(e, t);
		}
	};
})), YN = /* @__PURE__ */ t((() => {
	I(), wy(), vA(), TA(), kA(), YM(), XM(), ZM(), QM(), eN(), nN(), jv(), JN(), pO();
	var e = null, t = null, n = null, r = null;
	function i() {
		r && t && t.awareness.off("change", r), r = null, e &&= (e.destroy(), null), t &&= (t.destroy(), null), n &&= (n.destroy(), null);
	}
	function a(e) {
		let t = [
			"#0F766E",
			"#2563EB",
			"#9333EA",
			"#DB2777",
			"#EA580C",
			"#0891B2",
			"#65A30D",
			"#7C3AED"
		], n = 0;
		for (let t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
		return t[Math.abs(n) % t.length];
	}
	async function o({ id: o, initialHtml: s, permission: c, token: l, onStatus: u, onPresence: d }) {
		i();
		let f = document.getElementById("ce");
		if (!f) throw Error("Editor mount element #ce not found.");
		if (!l) throw Error("User authentication token is missing.");
		let p = await fetch(`/api/collaboration/ticket/${encodeURIComponent(o)}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${l}`,
				Accept: "application/json"
			}
		}), m = await p.json().catch(() => ({}));
		if (!p.ok) throw Error(m.detail || `Collaboration ticket request failed (${p.status})`);
		let h = `item:${o}`;
		if (m.documentName !== h) throw Error("Unexpected collaboration document identity.");
		let g = m.ticket || m.token;
		if (!g || typeof g != "string") throw Error("Collaboration authentication token is missing.");
		if (!m.websocketUrl) throw Error("Collaboration WebSocket URL is missing.");
		let _;
		try {
			_ = new URL(m.websocketUrl);
		} catch {
			throw Error("Invalid collaboration WebSocket URL.");
		}
		if (_.protocol !== "ws:" && _.protocol !== "wss:") throw Error("Collaboration URL must use ws:// or wss://.");
		n = new zw();
		let ee = c !== "edit" || m.readOnly === !0, v = window.PAWANSPACE_ME_NAME || "PAWANSPACE User", y = {
			name: v,
			color: a(v)
		};
		t = new qN({
			url: m.websocketUrl,
			name: m.documentName,
			document: n,
			token: g,
			onStatus: ({ status: e }) => {
				console.log("PAWANSPACE Collaboration Status:", e), u?.(e);
			},
			onAuthenticationFailed: ({ reason: e }) => {
				console.error("PAWANSPACE Authentication Failed:", e), u?.("authentication-failed");
			},
			onClose: ({ event: e }) => {
				console.warn("PAWANSPACE Connection Closed:", e);
			},
			onSynced: ({ state: t }) => {
				console.log("PAWANSPACE Document Synced:", t), t && e && n.getXmlFragment("content").length === 0 && e.commands.setContent(s || "<p></p>", { emitUpdate: !1 });
			}
		}), t.awareness.setLocalStateField("user", y), e = new Vp({
			element: f,
			editable: !ee,
			extensions: [
				Cy.configure({
					undoRedo: !1,
					link: {
						openOnClick: !1,
						autolink: !0,
						linkOnPaste: !0
					}
				}),
				Av,
				OA.configure({
					inline: !1,
					allowBase64: !0,
					HTMLAttributes: {
						class: "pawanspace-doc-image",
						loading: "lazy"
					}
				}),
				JM.configure({
					resizable: !0,
					allowTableNodeSelection: !0
				}),
				WM,
				UM,
				HM,
				$M,
				tN.configure({ nested: !0 }),
				_A.configure({
					document: n,
					field: "content"
				}),
				wA.configure({
					provider: t,
					user: y
				})
			],
			editorProps: { attributes: {
				class: "ProseMirror",
				spellcheck: "true"
			} },
			onUpdate: () => {
				typeof window.chg == "function" && window.chg();
			}
		});
		let b = () => {
			if (!t) return;
			let e = Array.from(t.awareness.getStates().values()).map((e) => e.user).filter((e) => e && e.name), n = [...new Set(e.map((e) => e.name))];
			d?.(n);
		};
		return r = b, t.awareness.on("change", r), b(), console.log("PAWANSPACE CRDT initialized:", m.documentName), console.log("Permission:", ee ? "VIEW ONLY" : "EDIT"), console.log("Image Extension: Enabled"), console.log("Table Extension: Enabled"), console.log("Checklist Extension: Enabled"), {
			editor: e,
			provider: t,
			ydoc: n
		};
	}
	window.PAWANSPACECRDT = {
		connect: o,
		destroy: i,
		get editor() {
			return e;
		},
		get provider() {
			return t;
		},
		get ydoc() {
			return n;
		}
	}, window.PAWANSPACECRDTReady = Promise.resolve(window.PAWANSPACECRDT), window.dispatchEvent(new Event("pawanspace-crdt-ready"));
}));
export default YN();
