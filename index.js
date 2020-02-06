const comp         = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');


const getOptions = ({ constants, pluginConfig }) => {
  return {
    publishDir: constants.BUILD_DIR,
    targetContexts: pluginConfig.targets,
    minifierOptions: pluginConfig.minifierOptions
  };
};


module.exports = {

  name: 'netlify-plugin-minify-html',

  onPostBuild: (args) => {
    // Assemble and advertise our options
    const {
      publishDir,
      targetContexts,
      minifierOptions
    } = getOptions(args);
    console.log("Minifying in these deploy contexts:", targetContexts);
    console.log("Minifying with these options:", minifierOptions);

    // transform the minification options from the yaml
    // into the correct syntax
    const options = Object.assign({}, ...minifierOptions);

    // Minify in place
    comp({
      compressor: htmlMinifier,
      input: publishDir + '/**/*.html',
      output: '$1.html',
      replaceInPlace: true,
      options: options,
      callback: function(err) {
        if (err) console.log(err);
      }
    });
  }

}
