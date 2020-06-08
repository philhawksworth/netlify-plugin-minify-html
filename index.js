const comp         = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');


module.exports = {

  onSuccess: ({ inputs, constants, utils }) => {

    // Only continue in the selected deploy contexts
    if( !inputs.contexts.includes(process.env.CONTEXT) ) {
      console.log('Not minifiying HTML in the context:', process.env.CONTEXT);
      return;
    }

    // Minify HTML
    console.log('Minifiying HTML in the deploy context:', process.env.CONTEXT);
    console.log('Minifiying HTML with these options:', inputs.minifierOptions || "Default");

    try {

      comp({
        compressor: htmlMinifier,
        // publicFolder: constants.PUBLISH_DIR,
        // input: '**/*.html',
        input: constants.PUBLISH_DIR + '/**/*.html',
        output: '$1.html',
        replaceInPlace: true,
        options: inputs.minifierOptions
      });


    } catch (error) {
      console.log('error :>> ', error);
      utils.build.failPlugin('The Minify HTML plugin failed.', { error })
    }

  }

}
