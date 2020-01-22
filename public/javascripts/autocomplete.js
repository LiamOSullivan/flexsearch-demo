(function autocomp () {
  const index = new FlexSearch({
    encode: 'advanced',
    tokenize: 'reverse',
    suggest: true,
    cache: true
  })

  for (let i = 0; i < data.length; i++) {
    index.add(i, data[i])
  }

  const suggestions = document.getElementById('suggestions')
  const autocomplete = document.getElementById('autocomplete')
  const userinput = document.getElementById('userinput')

  userinput.addEventListener('input', showResults, true)
  userinput.addEventListener('keyup', acceptAutocomplete, true)
  suggestions.addEventListener('click', acceptSuggestion, true)

  function showResults () {
    const value = this.value
    const results = index.search(value, 25)
    let entry
    const childs = suggestions.childNodes
    let i = 0
    const len = results.length

    for (; i < len; i++) {
      entry = childs[i]

      if (!entry) {
        entry = document.createElement('div')
        suggestions.appendChild(entry)
      }
      entry.textContent = data[results[i]]
    }

    while (childs.length > len) {
      suggestions.removeChild(childs[i])
    }

    const firstResult = data[results[0]]
    const match = firstResult && firstResult.toLowerCase().indexOf(value.toLowerCase())

    if (firstResult && (match !== -1)) {
      autocomplete.value = value + firstResult.substring(match + value.length)
      autocomplete.current = firstResult
    } else {
      autocomplete.value = autocomplete.current = value
    }
  }

  function acceptAutocomplete (event) {
    if ((event || window.event).keyCode === 13) {
      this.value = autocomplete.value = autocomplete.current
    }
  }

  function acceptSuggestion (event) {
    const target = (event || window.event).target

    userinput.value = autocomplete.value = target.textContent

    while (suggestions.lastChild) {
      suggestions.removeChild(suggestions.lastChild)
    }

    return false
  }
}())
