const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

class DjangoStaticWebpackPlugin {
  constructor(options) {
    const userOptions = options || {};

    // Default options
    const defaultOptions = {
      bundlePath: "bundles",
      excludeFilenames: [],
    };

    this.options = Object.assign(defaultOptions, userOptions);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "DjangoStaticWebpackPlugin",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          "DjangoStaticWebpackPlugin",
          (data, callback) => {
            if (
              this.options.excludeFilenames.indexOf(
                data.plugin.options.filename
              ) === -1
            ) {
              for (const item of ["headTags", "bodyTags"]) {
                data[item] = this.transformAssets(
                  data[item],
                  compiler.options.output.publicPath
                );
              }
            }
            callback(null, data);
          }
        );
      }
    );
  }

  transformLink(link, publicPath) {
    const regex = new RegExp("^" + publicPath);
    const staticPath = path.join(
      this.options.bundlePath,
      link.replace(regex, "")
    );
    return link.match(regex) ? `{{ relURL ("${staticPath}") }}` : link;
  }

  transformAssets(assets, publicPath) {
    return assets.map((asset) => {
      for (const linkType of ["href", "src", "content"]) {
        if (asset.attributes && asset.attributes[linkType]) {
          asset.attributes[linkType] = this.transformLink(
            asset.attributes[linkType],
            publicPath
          );
        }
      }
      return asset;
    });
  }
}

module.exports = DjangoStaticWebpackPlugin;
