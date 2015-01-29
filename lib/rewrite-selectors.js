module.exports = function(less) {

    var htmlTags = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(" ");

    function RewriteSelectors() {
        this._visitor = new less.visitors.Visitor(this);
    };

    // FIXME dont include html5-selectors

    RewriteSelectors.prototype = {
        // isPreEvalVisitor: true,
        run: function (root) {
            return this._visitor.visit(root);
        },

        visitRuleset: function (node, args) {
            args.visitDeeper = true;
            // console.log("visitRuleset",node.selectors);
            var parser = this;

            if(node.selectors) {
                node.selectors.forEach(function(s){
                    parser.rewriteSelector(s);
                });
            }
        },

        rewriteSelector: function(sel) {
            var len = sel.elements.length;
            for(var i = 0; i < len; i++){
                var el = sel.elements[i];
                var v = el.value;
                // console.log(el.value);

                if(typeof v == 'string') {
                    el.value = v.replace(/^(\()?(\w[\w\d]*(-[\w\d]+)*)(\))?$/,function(m,start,rule,r,end){
                        if(htmlTags.indexOf(rule) >= 0) return m;
                        return (start || '') + "._" + rule + (end || '');
                    })
                }
            }
        }
    };

    return RewriteSelectors;
};
