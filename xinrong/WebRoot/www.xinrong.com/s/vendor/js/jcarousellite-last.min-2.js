(function(a) {
    a.fn.jCarouselLite = function(b) {
        b = a.extend({
            btnPrev: null,
            btnNext: null,
            btnGo: null,
            mouseWheel: false,
            auto: null,
            speed: 200,
            easing: null,
            vertical: false,
            circular: true,
            visible: 3,
            start: 0,
            scroll: 1,
            beforeStart: null,
            afterEnd: null
        },
        b || {});
        return this.each(function() {
            var o = false,
            m = b.vertical ? "top": "left",
            p = b.vertical ? "height": "width",
            l = a(this),
            h = a("ul", l),
            n = a("li", h),
            r = n.size(),
            e = b.visible;
            if (b.circular) {
                h.prepend(n.slice(r - e - 1 + 1).clone()).append(n.slice(0, e).clone());
                b.start += e
            }
            var i = a("li", h),
            g = i.size(),
            f = b.start;
            l.css("visibility", "visible");
            i.css({
                overflow: "hidden",
                "float": b.vertical ? "none": "left"
            });
            h.css({
                margin: "0",
                padding: "0",
                position: "relative",
                "list-style-type": "none",
                "z-index": "1"
            });
            l.css({
                overflow: "hidden",
                position: "relative",
                "z-index": "2",
                left: "0px"
            });
            var j = b.vertical ? c(i) : d(i),
            s = j * g,
            t = j * e;
            i.css({
                width: i.width(),
                height: i.height()
            });
            h.css(p, s + "px").css(m, -(f * j));
            l.css(p, t + "px");
            b.btnPrev && a(b.btnPrev).click(function() {
                return k(f - b.scroll)
            });
            b.btnNext && a(b.btnNext).click(function() {
                return k(f + b.scroll)
            });
            b.btnGo && a.each(b.btnGo,
            function(c, d) {
                a(d).click(function() {
                    return k(b.circular ? b.visible + c: c)
                })
            });
            b.mouseWheel && l.mousewheel && l.mousewheel(function(c, a) {
                return a > 0 ? k(f - b.scroll) : k(f + b.scroll)
            });
            b.auto && setInterval(function() {
                k(f + b.scroll)
            },
            b.auto + b.speed);
            function q() {
                return i.slice(f).slice(0, e)
            }
            function k(c) {
                if (!o) {
                    b.beforeStart && b.beforeStart.call(this, q());
                    if (b.circular) if (c <= b.start - e - 1) {
                        h.css(m, -((g - e * 2) * j) + "px");
                        f = c == b.start - e - 1 ? g - e * 2 - 1 : g - e * 2 - b.scroll
                    } else if (c >= g - e + 1) {
                        h.css(m, -(e * j) + "px");
                        f = c == g - e + 1 ? e + 1 : e + b.scroll
                    } else f = c;
                    else if (c < 0 || c > g - e) return;
                    else f = c;
                    o = true;
                    h.animate(m == "left" ? {
                        left: -(f * j)
                    }: {
                        top: -(f * j)
                    },
                    b.speed, b.easing,
                    function() {
                        b.afterEnd && b.afterEnd.call(this, q());
                        o = false
                    });
                    if (!b.circular) {
                        a(b.btnPrev + "," + b.btnNext).removeClass("disabled");
                        a(f - b.scroll < 0 && b.btnPrev || f + b.scroll > g - e && b.btnNext || []).addClass("disabled")
                    }
                }
                return false
            }
        })
    };
    function b(b, c) {
        return parseInt(a.css(b[0], c)) || 0
    }
    function d(a) {
        return a[0].offsetWidth + b(a, "marginLeft") + b(a, "marginRight")
    }
    function c(a) {
        return a[0].offsetHeight + b(a, "marginTop") + b(a, "marginBottom")
    }
})(jQuery);