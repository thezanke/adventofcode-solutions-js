const processInstruction = instructionStr => null;
const processInstructions = instructionsText => instructionsText.split('\n').map(processInstruction);

module.exports = { processInstructions };