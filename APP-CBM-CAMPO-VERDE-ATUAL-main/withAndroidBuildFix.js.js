// withAndroidBuildTypeFix.js
const { withAppBuildGradle } = require('@expo/config-plugins');

// Esta função irá procurar e remover a linha problemática do build.gradle
function removeSigningConfigFromDebug(buildGradle) {
  const problematicLine = 'signingConfig signingConfigs.release';
  
  // Expressão regular para encontrar a linha dentro do bloco 'debug'
  const regex = new RegExp(`(buildTypes\\s*{\\s*debug\\s*{[\\s\\S]*?)${problematicLine}([\\s\\S]*?})`, 'm');

  if (buildGradle.match(regex)) {
    // Substitui o bloco encontrado por ele mesmo, mas sem a linha do problema
    return buildGradle.replace(regex, '$1$2');
  }

  return buildGradle;
}

module.exports = (config) => {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = removeSigningConfigFromDebug(config.modResults.contents);
    return config;
  });
};