exports.nextOccurrence = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }

  selectNextOccurrence(editor, editor.selectedText, editor.selectedRanges.slice(-1)[0].end + 1)
}

exports.clearLastThenNextOccurrence = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }

  const ranges = editor.selectedRanges
  const lastRange = ranges.pop()
  const text = editor.selectedText

  // TODO: Figure out work-around for not setting selectedRanges to []
  // if (ranges.length === 0) {
  //   ranges.push(new Range(lastRange.end, lastRange.end))
  // }
  editor.selectedRanges = ranges
  selectNextOccurrence(editor, text, lastRange.end + 1)
}

function selectNextOccurrence(editor, text, start) {
  const range = findNextRangeFor(text, {
    document: editor.document, 
    start: start
  })
  if (range) { editor.addSelectionForRange(range) }
}

function findNextRangeFor(text, {document, start}) {
	const maxEnd = document.length
	const step = 1024
	let index = start
	let range = null
	let data = ''

	while (index < maxEnd) {
		range = new Range(index, Math.min(index + step, maxEnd))
		data = document.getTextInRange(range)
		index = data.indexOf(text)

		if (index !== -1) {
			index += range.start
			return new Range(index, index + text.length)
		}

		index = data.lastIndexOf(text[0])
		index = index === -1 ? range.end + 1 : index
	}
}


exports.previousOccurrence = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }
  
  selectPreviousOccurrence(editor, editor.selectedText, editor.selectedRanges[0].start - 1)
}

exports.clearFirstThenPreviousOccurrence = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }

  const ranges = editor.selectedRanges
  const firstRange = ranges.shift()
  const text = editor.selectedText

  // TODO: Figure out work-around for not setting selectedRanges to []
  // if (ranges.length === 0) {
  //   ranges.push(new Range(lastRange.end, lastRange.end))
  // }
  editor.selectedRanges = ranges
  selectPreviousOccurrence(editor, text, firstRange.start - 1)
}

function selectPreviousOccurrence(editor, text, end) {
  const range = findPreviousRangeFor(text, {
    document: editor.document,
    end: end
  })

  if (range) { editor.addSelectionForRange(range) }
}

function findPreviousRangeFor(text, {document, end}) {
  const step = 1024
  let index = end
  let range = null
  let data = ''

  while (index > 0) {
      range = new Range(Math.max(0, index - step), index)
      data = document.getTextInRange(range)
      index = data.lastIndexOf(text)

      if (index !== -1) {
        index = range.end - (range.length - index)
        return new Range(index, index + text.length)
      }

      index = data.indexOf(text.slice(-1)[0])
      index = index === -1 ? range.start - 1 : index
  }
}