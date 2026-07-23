import { rspack } from "@rspack/core";
import path from "node:path";
import { fileURLToPath } from "url";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === "development";

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: "./src/index.tsx",
  },
  mode: isDev ? "development" : "production",
  target: "web",
  output: !isDev
    ? {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[contenthash].js",
        assetModuleFilename: "asset/[hash][ext][query]",
        clean: true,
      }
    : {},
  experiments: {
    nativeWatcher: true,
  },
  resolve: {
    extensions: ["...", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        type: "css/auto",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.module\.css$/i,
        type: "css/module",
      },
      {
        test: /\.(?:js|mjs|cjs|ts|mts|cts)$/,
        exclude: [/[\\/]node_modules[\\/]/],
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              detectSyntax: "auto",
              jsc: {
                externalHelpers: true,
                transform: {
                  react: {
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(?:jsx|tsx)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              detectSyntax: "auto",
              jsc: {
                externalHelpers: true,
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            },
          },
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset/resource",
      },
    ],
    parser: {
      "css/auto": { namedExports: false },
    },
  },
  plugins: [
    isDev && new ReactRefreshRspackPlugin(),
    isDev && new rspack.HotModuleReplacementPlugin(),
    // ✅ 官方 HtmlRspackPlugin
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),

    // Rsdoctor 插件，可选
    process.env.RSDOCTOR &&
      new RsdoctorRspackPlugin({
        // 插件选项
      }),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
        },
      },
    },
    runtimeChunk: "single",
  },
};

export default config;
