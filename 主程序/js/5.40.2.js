!function (e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function (Le) {
    "use strict";
    Le.defineMode("javascript", function (e, l) {
        var n, a, d = e.indentUnit, p = l.statementIndent, o = l.jsonld, c = l.json || o, s = l.typescript,
            f = l.wordCharacters || /[\w$\xa1-\uffff]/, u = function () {
                function e(e) {
                    return {type: e, style: "keyword"}
                }

                var t = e("keyword a"), r = e("keyword b"), n = e("keyword c"), a = e("keyword d"), i = e("operator"),
                    o = {type: "atom", style: "atom"};
                return {
                    if: e("if"),
                    while: t,
                    with: t,
                    else: r,
                    do: r,
                    try: r,
                    finally: r,
                    return: a,
                    break: a,
                    continue: a,
                    new: e("new"),
                    delete: n,
                    void: n,
                    throw: n,
                    debugger: e("debugger"),
                    var: e("var"),
                    const: e("var"),
                    let: e("var"),
                    function: e("function"),
                    catch: e("catch"),
                    for: e("for"),
                    switch: e("switch"),
                    case: e("case"),
                    default: e("default"),
                    in: i,
                    typeof: i,
                    instanceof: i,
                    true: o,
                    false: o,
                    null: o,
                    undefined: o,
                    NaN: o,
                    Infinity: o,
                    this: e("this"),
                    class: e("class"),
                    super: e("atom"),
                    yield: n,
                    export: e("export"),
                    import: e("import"),
                    extends: n,
                    await: n
                }
            }(), m = /[+\-*&%=<>!?|~^@]/,
            v = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

        function k(e, t, r) {
            return n = e, a = r, t
        }

        function y(e, t) {
            var a, r = e.next();
            if ('"' == r || "'" == r) return t.tokenize = (a = r, function (e, t) {
                var r, n = !1;
                if (o && "@" == e.peek() && e.match(v)) return t.tokenize = y, k("jsonld-keyword", "meta");
                for (; null != (r = e.next()) && (r != a || n);) n = !n && "\\" == r;
                return n || (t.tokenize = y), k("string", "string")
            }), t.tokenize(e, t);
            if ("." == r && e.match(/^\d+(?:[eE][+\-]?\d+)?/)) return k("number", "number");
            if ("." == r && e.match("..")) return k("spread", "meta");
            if (/[\[\]{}\(\),;\:\.]/.test(r)) return k(r);
            if ("=" == r && e.eat(">")) return k("=>", "operator");
            if ("0" == r && e.match(/^(?:x[\da-f]+|o[0-7]+|b[01]+)n?/i)) return k("number", "number");
            if (/\d/.test(r)) return e.match(/^\d*(?:n|(?:\.\d*)?(?:[eE][+\-]?\d+)?)?/), k("number", "number");
            if ("/" == r) return e.eat("*") ? (t.tokenize = w)(e, t) : e.eat("/") ? (e.skipToEnd(), k("comment", "comment")) : Ke(e, t, 1) ? (function (e) {
                for (var t, r = !1, n = !1; null != (t = e.next());) {
                    if (!r) {
                        if ("/" == t && !n) return;
                        "[" == t ? n = !0 : n && "]" == t && (n = !1)
                    }
                    r = !r && "\\" == t
                }
            }(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), k("regexp", "string-2")) : (e.eat("="), k("operator", "operator", e.current()));
            if ("`" == r) return (t.tokenize = b)(e, t);
            if ("#" == r) return e.skipToEnd(), k("error", "error");
            if (m.test(r)) return ">" == r && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != r && "=" != r || e.eat("=") : /[<>*+\-]/.test(r) && (e.eat(r), ">" == r && e.eat(r))), k("operator", "operator", e.current());
            if (f.test(r)) {
                e.eatWhile(f);
                var n = e.current();
                if ("." != t.lastType) {
                    if (u.propertyIsEnumerable(n)) {
                        var i = u[n];
                        return k(i.type, i.style, n)
                    }
                    if ("async" == n && e.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, !1)) return k("async", "keyword", n)
                }
                return k("variable", "variable", n)
            }
        }

        function w(e, t) {
            for (var r, n = !1; r = e.next();) {
                if ("/" == r && n) {
                    t.tokenize = y;
                    break
                }
                n = "*" == r
            }
            return k("comment", "comment")
        }

        function b(e, t) {
            for (var r, n = !1; null != (r = e.next());) {
                if (!n && ("`" == r || "$" == r && e.eat("{"))) {
                    t.tokenize = y;
                    break
                }
                n = !n && "\\" == r
            }
            return k("quasi", "string-2", e.current())
        }

        var x = "([{}])";

        function i(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null);
            var r = e.string.indexOf("=>", e.start);
            if (!(r < 0)) {
                if (s) {
                    var n = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, r));
                    n && (r = n.index)
                }
                for (var a = 0, i = !1, o = r - 1; 0 <= o; --o) {
                    var c = e.string.charAt(o), u = x.indexOf(c);
                    if (0 <= u && u < 3) {
                        if (!a) {
                            ++o;
                            break
                        }
                        if (0 == --a) {
                            "(" == c && (i = !0);
                            break
                        }
                    } else if (3 <= u && u < 6) ++a; else if (f.test(c)) i = !0; else {
                        if (/["'\/]/.test(c)) return;
                        if (i && !a) {
                            ++o;
                            break
                        }
                    }
                }
                i && !a && (t.fatArrowAt = o)
            }
        }

        var h = {atom: !0, number: !0, variable: !0, string: !0, regexp: !0, this: !0, "jsonld-keyword": !0};

        function g(e, t, r, n, a, i) {
            this.indented = e, this.column = t, this.type = r, this.prev = a, this.info = i, null != n && (this.align = n)
        }

        function j(e, t) {
            for (var r = e.localVars; r; r = r.next) if (r.name == t) return !0;
            for (var n = e.context; n; n = n.prev) for (r = n.vars; r; r = r.next) if (r.name == t) return !0
        }

        var M = {state: null, column: null, marked: null, cc: null};

        function V() {
            for (var e = arguments.length - 1; 0 <= e; e--) M.cc.push(arguments[e])
        }

        function A() {
            return V.apply(null, arguments), !0
        }

        function E(e, t) {
            for (var r = t; r; r = r.next) if (r.name == e) return !0;
            return !1
        }

        function r(e) {
            var t = M.state;
            if (M.marked = "def", t.context) if ("var" == t.lexical.info && t.context && t.context.block) {
                var r = function e(t, r) {
                    {
                        if (r) {
                            if (r.block) {
                                var n = e(t, r.prev);
                                return n ? n == r.prev ? r : new I(n, r.vars, !0) : null
                            }
                            return E(t, r.vars) ? r : new I(r.prev, new T(t, r.vars), !1)
                        }
                        return null
                    }
                }(e, t.context);
                if (null != r) return void (t.context = r)
            } else if (!E(e, t.localVars)) return void (t.localVars = new T(e, t.localVars));
            l.globalVars && !E(e, t.globalVars) && (t.globalVars = new T(e, t.globalVars))
        }

        function z(e) {
            return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
        }

        function I(e, t, r) {
            this.prev = e, this.vars = t, this.block = r
        }

        function T(e, t) {
            this.name = e, this.next = t
        }

        var t = new T("this", new T("arguments", null));

        function $() {
            M.state.context = new I(M.state.context, M.state.localVars, !1), M.state.localVars = t
        }

        function C() {
            M.state.context = new I(M.state.context, M.state.localVars, !0), M.state.localVars = null
        }

        function q() {
            M.state.localVars = M.state.context.vars, M.state.context = M.state.context.prev
        }

        function O(n, a) {
            var e = function () {
                var e = M.state, t = e.indented;
                if ("stat" == e.lexical.type) t = e.lexical.indented; else for (var r = e.lexical; r && ")" == r.type && r.align; r = r.prev) t = r.indented;
                e.lexical = new g(t, M.stream.column(), n, null, e.lexical, a)
            };
            return e.lex = !0, e
        }

        function P() {
            var e = M.state;
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
        }

        function S(r) {
            return function e(t) {
                return t == r ? A() : ";" == r || "}" == t || ")" == t || "]" == t ? V() : A(e)
            }
        }

        function N(e, t) {
            return "var" == e ? A(O("vardef", t), ye, S(";"), P) : "keyword a" == e ? A(O("form"), W, N, P) : "keyword b" == e ? A(O("form"), N, P) : "keyword d" == e ? M.stream.match(/^\s*$/, !1) ? A() : A(O("stat"), F, S(";"), P) : "debugger" == e ? A(S(";")) : "{" == e ? A(O("}"), C, ie, P, q) : ";" == e ? A() : "if" == e ? ("else" == M.state.lexical.info && M.state.cc[M.state.cc.length - 1] == P && M.state.cc.pop()(), A(O("form"), W, N, P, je)) : "function" == e ? A(Ie) : "for" == e ? A(O("form"), Me, N, P) : "class" == e || s && "interface" == t ? (M.marked = "keyword", A(O("form"), Ce, P)) : "variable" == e ? s && "declare" == t ? (M.marked = "keyword", A(N)) : s && ("module" == t || "enum" == t || "type" == t) && M.stream.match(/^\s*\w/, !1) ? (M.marked = "keyword", "enum" == t ? A(Ge) : "type" == t ? A(se, S("operator"), se, S(";")) : A(O("form"), we, S("{"), O("}"), ie, P, P)) : s && "namespace" == t ? (M.marked = "keyword", A(O("form"), B, ie, P)) : s && "abstract" == t ? (M.marked = "keyword", A(N)) : A(O("stat"), Z) : "switch" == e ? A(O("form"), W, S("{"), O("}", "switch"), C, ie, P, P, q) : "case" == e ? A(B, S(":")) : "default" == e ? A(S(":")) : "catch" == e ? A(O("form"), $, U, N, P, q) : "export" == e ? A(O("stat"), Se, P) : "import" == e ? A(O("stat"), Ue, P) : "async" == e ? A(N) : "@" == t ? A(B, N) : V(O("stat"), B, S(";"), P)
        }

        function U(e) {
            if ("(" == e) return A(Te, S(")"))
        }

        function B(e, t) {
            return D(e, t, !1)
        }

        function H(e, t) {
            return D(e, t, !0)
        }

        function W(e) {
            return "(" != e ? V() : A(O(")"), B, S(")"), P)
        }

        function D(e, t, r) {
            if (M.state.fatArrowAt == M.stream.start) {
                var n = r ? R : Q;
                if ("(" == e) return A($, O(")"), ne(Te, ")"), P, S("=>"), n, q);
                if ("variable" == e) return V($, we, S("=>"), n, q)
            }
            var a, i = r ? J : G;
            return h.hasOwnProperty(e) ? A(i) : "function" == e ? A(Ie, i) : "class" == e || s && "interface" == t ? (M.marked = "keyword", A(O("form"), $e, P)) : "keyword c" == e || "async" == e ? A(r ? H : B) : "(" == e ? A(O(")"), F, S(")"), P, i) : "operator" == e || "spread" == e ? A(r ? H : B) : "[" == e ? A(O("]"), Fe, P, i) : "{" == e ? ae(ee, "}", null, i) : "quasi" == e ? V(K, i) : "new" == e ? A((a = r, function (e) {
                return "." == e ? A(a ? Y : X) : "variable" == e && s ? A(me, a ? J : G) : V(a ? H : B)
            })) : "import" == e ? A(B) : A()
        }

        function F(e) {
            return e.match(/[;\}\)\],]/) ? V() : V(B)
        }

        function G(e, t) {
            return "," == e ? A(B) : J(e, t, !1)
        }

        function J(e, t, r) {
            var n = 0 == r ? G : J, a = 0 == r ? B : H;
            return "=>" == e ? A($, r ? R : Q, q) : "operator" == e ? /\+\+|--/.test(t) || s && "!" == t ? A(n) : s && "<" == t && M.stream.match(/^([^>]|<.*?>)*>\s*\(/, !1) ? A(O(">"), ne(se, ">"), P, n) : "?" == t ? A(B, S(":"), a) : A(a) : "quasi" == e ? V(K, n) : ";" != e ? "(" == e ? ae(H, ")", "call", n) : "." == e ? A(_, n) : "[" == e ? A(O("]"), F, S("]"), P, n) : s && "as" == t ? (M.marked = "keyword", A(se, n)) : "regexp" == e ? (M.state.lastType = M.marked = "operator", M.stream.backUp(M.stream.pos - M.stream.start - 1), A(a)) : void 0 : void 0
        }

        function K(e, t) {
            return "quasi" != e ? V() : "${" != t.slice(t.length - 2) ? A(K) : A(B, L)
        }

        function L(e) {
            if ("}" == e) return M.marked = "string-2", M.state.tokenize = b, A(K)
        }

        function Q(e) {
            return i(M.stream, M.state), V("{" == e ? N : B)
        }

        function R(e) {
            return i(M.stream, M.state), V("{" == e ? N : H)
        }

        function X(e, t) {
            if ("target" == t) return M.marked = "keyword", A(G)
        }

        function Y(e, t) {
            if ("target" == t) return M.marked = "keyword", A(J)
        }

        function Z(e) {
            return ":" == e ? A(P, N) : V(G, S(";"), P)
        }

        function _(e) {
            if ("variable" == e) return M.marked = "property", A()
        }

        function ee(e, t) {
            if ("async" == e) return M.marked = "property", A(ee);
            if ("variable" == e || "keyword" == M.style) {
                return M.marked = "property", "get" == t || "set" == t ? A(te) : (s && M.state.fatArrowAt == M.stream.start && (r = M.stream.match(/^\s*:\s*/, !1)) && (M.state.fatArrowAt = M.stream.pos + r[0].length), A(re));
                var r
            } else {
                if ("number" == e || "string" == e) return M.marked = o ? "property" : M.style + " property", A(re);
                if ("jsonld-keyword" == e) return A(re);
                if (s && z(t)) return M.marked = "keyword", A(ee);
                if ("[" == e) return A(B, oe, S("]"), re);
                if ("spread" == e) return A(H, re);
                if ("*" == t) return M.marked = "keyword", A(ee);
                if (":" == e) return V(re)
            }
        }

        function te(e) {
            return "variable" != e ? V(re) : (M.marked = "property", A(Ie))
        }

        function re(e) {
            return ":" == e ? A(H) : "(" == e ? V(Ie) : void 0
        }

        function ne(n, a, i) {
            function o(e, t) {
                if (i ? -1 < i.indexOf(e) : "," == e) {
                    var r = M.state.lexical;
                    return "call" == r.info && (r.pos = (r.pos || 0) + 1), A(function (e, t) {
                        return e == a || t == a ? V() : V(n)
                    }, o)
                }
                return e == a || t == a ? A() : A(S(a))
            }

            return function (e, t) {
                return e == a || t == a ? A() : V(n, o)
            }
        }

        function ae(e, t, r) {
            for (var n = 3; n < arguments.length; n++) M.cc.push(arguments[n]);
            return A(O(t, r), ne(e, t), P)
        }

        function ie(e) {
            return "}" == e ? A() : V(N, ie)
        }

        function oe(e, t) {
            if (s) {
                if (":" == e) return A(se);
                if ("?" == t) return A(oe)
            }
        }

        function ce(e) {
            if (s && ":" == e) return M.stream.match(/^\s*\w+\s+is\b/, !1) ? A(B, ue, se) : A(se)
        }

        function ue(e, t) {
            if ("is" == t) return M.marked = "keyword", A()
        }

        function se(e, t) {
            return "keyof" == t || "typeof" == t ? (M.marked = "keyword", A("keyof" == t ? se : H)) : "variable" == e || "void" == t ? (M.marked = "type", A(pe)) : "string" == e || "number" == e || "atom" == e ? A(pe) : "[" == e ? A(O("]"), ne(se, "]", ","), P, pe) : "{" == e ? A(O("}"), ne(le, "}", ",;"), P, pe) : "(" == e ? A(ne(de, ")"), fe) : "<" == e ? A(ne(se, ">"), se) : void 0
        }

        function fe(e) {
            if ("=>" == e) return A(se)
        }

        function le(e, t) {
            return "variable" == e || "keyword" == M.style ? (M.marked = "property", A(le)) : "?" == t ? A(le) : ":" == e ? A(se) : "[" == e ? A(B, oe, S("]"), le) : void 0
        }

        function de(e, t) {
            return "variable" == e && M.stream.match(/^\s*[?:]/, !1) || "?" == t ? A(de) : ":" == e ? A(se) : V(se)
        }

        function pe(e, t) {
            return "<" == t ? A(O(">"), ne(se, ">"), P, pe) : "|" == t || "." == e || "&" == t ? A(se) : "[" == e ? A(S("]"), pe) : "extends" == t || "implements" == t ? (M.marked = "keyword", A(se)) : void 0
        }

        function me(e, t) {
            if ("<" == t) return A(O(">"), ne(se, ">"), P, pe)
        }

        function ve() {
            return V(se, ke)
        }

        function ke(e, t) {
            if ("=" == t) return A(se)
        }

        function ye(e, t) {
            return "enum" == t ? (M.marked = "keyword", A(Ge)) : V(we, oe, he, ge)
        }

        function we(e, t) {
            return s && z(t) ? (M.marked = "keyword", A(we)) : "variable" == e ? (r(t), A()) : "spread" == e ? A(we) : "[" == e ? ae(xe, "]") : "{" == e ? ae(be, "}") : void 0
        }

        function be(e, t) {
            return "variable" != e || M.stream.match(/^\s*:/, !1) ? ("variable" == e && (M.marked = "property"), "spread" == e ? A(we) : "}" == e ? V() : A(S(":"), we, he)) : (r(t), A(he))
        }

        function xe() {
            return V(we, he)
        }

        function he(e, t) {
            if ("=" == t) return A(H)
        }

        function ge(e) {
            if ("," == e) return A(ye)
        }

        function je(e, t) {
            if ("keyword b" == e && "else" == t) return A(O("form", "else"), N, P)
        }

        function Me(e, t) {
            return "await" == t ? A(Me) : "(" == e ? A(O(")"), Ve, S(")"), P) : void 0
        }

        function Ve(e) {
            return "var" == e ? A(ye, S(";"), Ee) : ";" == e ? A(Ee) : "variable" == e ? A(Ae) : V(B, S(";"), Ee)
        }

        function Ae(e, t) {
            return "in" == t || "of" == t ? (M.marked = "keyword", A(B)) : A(G, Ee)
        }

        function Ee(e, t) {
            return ";" == e ? A(ze) : "in" == t || "of" == t ? (M.marked = "keyword", A(B)) : V(B, S(";"), ze)
        }

        function ze(e) {
            ")" != e && A(B)
        }

        function Ie(e, t) {
            return "*" == t ? (M.marked = "keyword", A(Ie)) : "variable" == e ? (r(t), A(Ie)) : "(" == e ? A($, O(")"), ne(Te, ")"), P, ce, N, q) : s && "<" == t ? A(O(">"), ne(ve, ">"), P, Ie) : void 0
        }

        function Te(e, t) {
            return "@" == t && A(B, Te), "spread" == e ? A(Te) : s && z(t) ? (M.marked = "keyword", A(Te)) : V(we, oe, he)
        }

        function $e(e, t) {
            return "variable" == e ? Ce(e, t) : qe(e, t)
        }

        function Ce(e, t) {
            if ("variable" == e) return r(t), A(qe)
        }

        function qe(e, t) {
            return "<" == t ? A(O(">"), ne(ve, ">"), P, qe) : "extends" == t || "implements" == t || s && "," == e ? ("implements" == t && (M.marked = "keyword"), A(s ? se : B, qe)) : "{" == e ? A(O("}"), Oe, P) : void 0
        }

        function Oe(e, t) {
            return "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t || s && z(t)) && M.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (M.marked = "keyword", A(Oe)) : "variable" == e || "keyword" == M.style ? (M.marked = "property", A(s ? Pe : Ie, Oe)) : "[" == e ? A(B, oe, S("]"), s ? Pe : Ie, Oe) : "*" == t ? (M.marked = "keyword", A(Oe)) : ";" == e ? A(Oe) : "}" == e ? A() : "@" == t ? A(B, Oe) : void 0
        }

        function Pe(e, t) {
            return "?" == t ? A(Pe) : ":" == e ? A(se, he) : "=" == t ? A(H) : V(Ie)
        }

        function Se(e, t) {
            return "*" == t ? (M.marked = "keyword", A(De, S(";"))) : "default" == t ? (M.marked = "keyword", A(B, S(";"))) : "{" == e ? A(ne(Ne, "}"), De, S(";")) : V(N)
        }

        function Ne(e, t) {
            return "as" == t ? (M.marked = "keyword", A(S("variable"))) : "variable" == e ? V(H, Ne) : void 0
        }

        function Ue(e) {
            return "string" == e ? A() : "(" == e ? V(B) : V(Be, He, De)
        }

        function Be(e, t) {
            return "{" == e ? ae(Be, "}") : ("variable" == e && r(t), "*" == t && (M.marked = "keyword"), A(We))
        }

        function He(e) {
            if ("," == e) return A(Be, He)
        }

        function We(e, t) {
            if ("as" == t) return M.marked = "keyword", A(Be)
        }

        function De(e, t) {
            if ("from" == t) return M.marked = "keyword", A(B)
        }

        function Fe(e) {
            return "]" == e ? A() : V(ne(H, "]"))
        }

        function Ge() {
            return V(O("form"), we, S("{"), O("}"), ne(Je, "}"), P, P)
        }

        function Je() {
            return V(we, he)
        }

        function Ke(e, t, r) {
            return t.tokenize == y && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (r || 0)))
        }

        return P.lex = q.lex = !0, {
            startState: function (e) {
                var t = {
                    tokenize: y,
                    lastType: "sof",
                    cc: [],
                    lexical: new g((e || 0) - d, 0, "block", !1),
                    localVars: l.localVars,
                    context: l.localVars && new I(null, null, !1),
                    indented: e || 0
                };
                return l.globalVars && "object" == typeof l.globalVars && (t.globalVars = l.globalVars), t
            },
            token: function (e, t) {
                if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), i(e, t)), t.tokenize != w && e.eatSpace()) return null;
                var r = t.tokenize(e, t);
                return "comment" == n ? r : (t.lastType = "operator" != n || "++" != a && "--" != a ? n : "incdec", function (e, t, r, n, a) {
                    var i = e.cc;
                    for (M.state = e, M.stream = a, M.marked = null, M.cc = i, M.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0); ;) if ((i.length ? i.pop() : c ? B : N)(r, n)) {
                        for (; i.length && i[i.length - 1].lex;) i.pop()();
                        return M.marked ? M.marked : "variable" == r && j(e, n) ? "variable-2" : t
                    }
                }(t, r, n, a, e))
            },
            indent: function (e, t) {
                if (e.tokenize == w) return Le.Pass;
                if (e.tokenize != y) return 0;
                var r, n = t && t.charAt(0), a = e.lexical;
                if (!/^\s*else\b/.test(t)) for (var i = e.cc.length - 1; 0 <= i; --i) {
                    var o = e.cc[i];
                    if (o == P) a = a.prev; else if (o != je) break
                }
                for (; ("stat" == a.type || "form" == a.type) && ("}" == n || (r = e.cc[e.cc.length - 1]) && (r == G || r == J) && !/^[,\.=+\-*:?[\(]/.test(t));) a = a.prev;
                p && ")" == a.type && "stat" == a.prev.type && (a = a.prev);
                var c, u, s = a.type, f = n == s;
                return "vardef" == s ? a.indented + ("operator" == e.lastType || "," == e.lastType ? a.info.length + 1 : 0) : "form" == s && "{" == n ? a.indented : "form" == s ? a.indented + d : "stat" == s ? a.indented + (u = t, "operator" == (c = e).lastType || "," == c.lastType || m.test(u.charAt(0)) || /[,.]/.test(u.charAt(0)) ? p || d : 0) : "switch" != a.info || f || 0 == l.doubleIndentSwitch ? a.align ? a.column + (f ? 0 : 1) : a.indented + (f ? 0 : d) : a.indented + (/^(?:case|default)\b/.test(t) ? d : 2 * d)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: c ? null : "/*",
            blockCommentEnd: c ? null : "*/",
            blockCommentContinue: c ? null : " * ",
            lineComment: c ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: c ? "json" : "javascript",
            jsonldMode: o,
            jsonMode: c,
            expressionAllowed: Ke,
            skipExpression: function (e) {
                var t = e.cc[e.cc.length - 1];
                t != B && t != H || e.cc.pop()
            }
        }
    }), Le.registerHelper("wordChars", "javascript", /[\w$]/), Le.defineMIME("text/javascript", "javascript"), Le.defineMIME("text/ecmascript", "javascript"), Le.defineMIME("application/javascript", "javascript"), Le.defineMIME("application/x-javascript", "javascript"), Le.defineMIME("application/ecmascript", "javascript"), Le.defineMIME("application/json", {
        name: "javascript",
        json: !0
    }), Le.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    }), Le.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    }), Le.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    }), Le.defineMIME("application/typescript", {name: "javascript", typescript: !0})
});