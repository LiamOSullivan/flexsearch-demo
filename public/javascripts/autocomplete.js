function autocomp () {
  let index = new FlexSearch({
    encode: 'advanced',
    tokenize: 'reverse',
    suggest: true,
    cache: true
  })

  for (let i = 0; i < data.length; i++) {
    index.add(i, data[i])
  }

  let suggestions = document.getElementById('suggestions')
  let autocomplete = document.getElementById('autocomplete')
  let userinput = document.getElementById('userinput')

  userinput.addEventListener('input', show_results, true)
  userinput.addEventListener('keyup', accept_autocomplete, true)
  suggestions.addEventListener('click', accept_suggestion, true)

  function show_results () {
    let value = this.value
    let results = index.search(value, 25)
    let entry, childs = suggestions.childNodes
    let i = 0, len = results.length

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

    let first_result = data[results[0]]
    let match = first_result && first_result.toLowerCase().indexOf(value.toLowerCase())

    if (first_result && (match !== -1)) {
      autocomplete.value = value + first_result.substring(match + value.length)
      autocomplete.current = first_result
    } else {
      autocomplete.value = autocomplete.current = value
    }
  }

  function accept_autocomplete (event) {
    if ((event || window.event).keyCode === 13) {
      this.value = autocomplete.value = autocomplete.current
    }
  }

  function accept_suggestion (event) {
    let target = (event || window.event).target

    userinput.value = autocomplete.value = target.textContent

    while (suggestions.lastChild) {
      suggestions.removeChild(suggestions.lastChild)
    }

    return false
  }
}

autocomp()
