
exports.activate = function() {
  // Do work when the extension is activated
}

exports.deactivate = function() {
  // Clean up state before the extension is deactivated
}

const Selection = require('selection.js')

nova.commands.register("mc.selectNextOccurrence", Selection.nextOccurrence);
nova.commands.register("mc.clearLastThenNextOccurrence", Selection.clearLastThenNextOccurrence);
nova.commands.register("mc.selectPreviousOccurrence", Selection.previousOccurrence)
nova.commands.register("mc.clearFirstAndSelectPreviousOccurrence", Selection.clearFirstThenPreviousOccurrence)

const LineEntry = require('line_entry.js')
nova.commands.register("mc.addCursorNextLine", LineEntry.nextLineSameColumn)
nova.commands.register("mc.addCursorPreviousLine", LineEntry.previousLineSameColumn)
