const Arborist = require('@npmcli/arborist')
const data = {} // initialize data we'll return

async function mingine (options) {
  const arboristOptions = {}

  for (const option in options) {
    if (option === 'path' || option === 'registry' || option === 'auth' || option === 'scopes') { // only use the options that arborist actually takes
      arboristOptions[option] = options[option]
    }
  }
  const arborist = new Arborist(arboristOptions)

  const actualVersions = arborist.loadActual().then(tree => {
    tree.children.forEach(packageMapHandler) // iterate over the chidlren Map() with the packageMapHandler method
  }).then(() => {
    return data // once iteration is completed, return data
  })

  return actualVersions
}

function packageMapHandler (value, key, map) {
  const symbols = Object.getOwnPropertySymbols(value)
  const children = map.get(key)
  const enginesPropertyInPacakgeJSON = children[symbols[0]].version // only extract the engines property
  const namePropertyInPacakgeJSON = children[symbols[0]].name // only extract the name property
  console.log(namePropertyInPacakgeJSON, enginesPropertyInPacakgeJSON);
}

module.exports = mingine
