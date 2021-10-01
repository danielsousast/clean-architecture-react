const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "scss"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
      index: true,
      mimeTypes: { "text/html": ["phtml"] },
      publicPath: "/public",
      serverSideRender: true,
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [new CleanWebpackPlugin()],
};
