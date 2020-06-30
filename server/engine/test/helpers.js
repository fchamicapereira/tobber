let randomstring = require('randomstring')

function getRandomElementFromArray (array) {
    let index = (Math.floor(Math.random() * array.length)) % array.length
    let value = array[index]
    return { index: index, value: value }
  }

function getNRandomElementsFromArray (array) {
    var arrayCopy = array
    var result = []
    var nElementsToRemove = (Math.floor(Math.random() * array.length) + 1) % array.length

    for (let i = 0; i < nElementsToRemove; i++) {
        let elementToRemove = getRandomElementFromArray(arrayCopy)
        result.push(elementToRemove.value)
        arrayCopy = arrayCopy.slice(0, elementToRemove.index)
        .concat(arrayCopy.slice(elementToRemove.index + 1, arrayCopy.length))
    }

    return result
}

module.exports.getTitleAndProperties = (scoreRules) => {
    const allCategories = Object.keys(scoreRules)

    const categoriesToCheck = getNRandomElementsFromArray(allCategories)
    var title = ''
    var chosenProperties = {}

    categoriesToCheck.forEach(function (category) {
        var categoryDescription = scoreRules[category]
        var chosenProperty = getRandomElementFromArray(categoryDescription)
        var keyword = getRandomElementFromArray(categoryDescription[chosenProperty.index].keywords).value

        title += `${keyword} ${randomstring.generate(Math.floor(Math.random() * 20))} `
        chosenProperties[category] = categoryDescription[chosenProperty.index].key
    })

    return { title: title, properties: chosenProperties }
}

module.exports.getInfoOfProperty = (scoreRules, property, key) => {
    for (p of scoreRules[property]) {
        if (p.key === key) {
            return p
        }
    }
    return null
}