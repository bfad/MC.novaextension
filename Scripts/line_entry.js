exports.nextLineSameColumn = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }

  const col = currentColumn(editor)
  const lastRange = editor.selectedRanges.slice(-1)[0]

  const nextLineStart = editor.getLineRangeForRange(lastRange).end 
  const nextLineRange = editor.getLineRangeForRange(new Range(nextLineStart, nextLineStart))
  // TODO: check how this works with CRLF's
  const newPosition = Math.min(Math.max(nextLineRange.start, nextLineRange.end - 1), nextLineRange.start + col)

  if (newPosition > editor.document.length) { return }
  editor.addSelectionForRange(new Range(newPosition, newPosition))
}

exports.previousLineSameColumn = (editor) => {
  if (!TextEditor.isTextEditor(editor)) { return }

  const col = currentColumn(editor)
  const firstRange = editor.selectedRanges[0]

  const prevLineEnd = editor.getLineRangeForRange(firstRange).start - 1 
  const prevLineRange = editor.getLineRangeForRange(new Range(prevLineEnd, prevLineEnd))
  // TODO: check how this works with CRLF's
  const newPosition = Math.min(Math.max(prevLineRange.start, prevLineRange.end - 1), prevLineRange.start + col)

  if (newPosition > editor.document.length) { return }
  editor.addSelectionForRange(new Range(newPosition, newPosition))
}

function currentColumn(editor) {
  const primaryRange = editor.selectedRange
  return primaryRange.start - editor.getLineRangeForRange(primaryRange).start
}
