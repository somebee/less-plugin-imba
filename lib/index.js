var rewriteSelectors = require("./rewrite-selectors");

module.exports = {
    install: function(less, pluginManager) {
        var RewriteSelectors = rewriteSelectors(less);
        pluginManager.addVisitor(new RewriteSelectors());
    }
};
