const path = require("path");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    experiments: {
        topLevelAwait: true,
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
    },
};
