module.exports = {
  webpack(config, env, helpers, options) {
    // Debug: Log all plugin names to see what's loaded
    console.log('Webpack plugins:', config.plugins.map(p => p.constructor.name));
    
    // More aggressive approach to disable Critters plugin
    config.plugins = config.plugins.filter(plugin => {
      const pluginName = plugin.constructor.name;
      const shouldKeep = !pluginName.toLowerCase().includes('critters');
      if (!shouldKeep) {
        console.log('Removing plugin:', pluginName);
      }
      return shouldKeep;
    });
    
    // Also check optimization minimizers
    if (config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(minimizer => {
        const minimizerName = minimizer.constructor.name;
        const shouldKeep = !minimizerName.toLowerCase().includes('critters');
        if (!shouldKeep) {
          console.log('Removing minimizer:', minimizerName);
        }
        return shouldKeep;
      });
    }
    
    // Alternative approach: disable inlining CSS entirely
    const htmlPlugin = config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
    if (htmlPlugin && htmlPlugin.options) {
      htmlPlugin.options.inlineSource = false;
      htmlPlugin.options.minify = false;
    }
  }
};