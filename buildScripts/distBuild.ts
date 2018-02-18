// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* tslint-disable no-console */
import * as webpack from "webpack";
import webpackConfig from "../webpack/webpack.config.dist";
import * as chalk from "chalk";
import * as path from "path";

process.env["NODE_ENV"] = "production"; // this assures the Babel dev config doesn't apply. TODO: Needed now that it's all Typescript?

console.log(chalk.blue("Generating minified bundle for production. This will take a moment..."));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow("Webpack generated the following warnings: "));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  const chunksCreated = JSON.stringify(jsonStats.assetsByChunkName);

  console.log(`Chunks Created: ${chunksCreated}`);

  // if we got this far, the build succeeded.
  console.log(chalk.green("Your app has been built for production and written to /dist"));

  return 0;
});

