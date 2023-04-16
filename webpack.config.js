const { resolve } = require("path");
const find = require("find");

const tasks = find.fileSync(/tasks[/\\].*[/\\]index.ts$/, "src");

module.exports = tasks.map((task) => ({
  entry: `./${task}`,
  target: "node",
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/dist/],
      },
    ],
  },
  //mode: "development",
  mode: "production",
  resolve: {
    extensions: [".ts", ".js",".json"],
  },
  output: {
    filename: task.replace(/\.ts$/, ".js").replace(/src[/\\]/, ""),
    path: resolve(__dirname, "out"),
  },
}));
