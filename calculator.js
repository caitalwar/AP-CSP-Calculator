var history = [];        // "History" list holds the last 5 calculations
var num1 = 0;            // First operand for operations
var currentOp = "";      // Operator waiting to be applied
var isNewInput = true;   // Next digit starts a fresh number when true
 
 
// updateDisplay sends the output to the calculator display label
function updateDisplay(message) {
  setText("display", message);
}
 
 
//  addToHistory appends entry to the history list, limits it to 5 items, then refreshes the history label
//  It uses selection and iteration
function addToHistory(entry) {
 
  // add the new entry to the history list
  appendItem(history, entry);
 
  // if the list grew beyond 5, drop the oldest one
  if (history.length > 5) {
    removeItem(history, 0);
  }
 
  // loop through every item to build the display string
  var histText = "─── History ───\n";
  for (var i = 0; i < history.length; i++) {
    histText = histText + history[i] + "\n";
  }
 
  // update the history label on screen
  setText("historyLabel", histText);
}
 
// calculate function returns the number
// This is the core calculator logic since it handles all operations
function calculate(op) {
 
  // read the current display value
  var currentVal = Number(getText("display"));
  var result = 0;
  var histEntry = "";
 
  // pick the right operation
  if (op == "+") {
    result = num1 + currentVal;
    histEntry = num1 + " + " + currentVal + " = " + result;
 
  } else if (op == "-") {
    result = num1 - currentVal;
    histEntry = num1 + " - " + currentVal + " = " + result;
 
  } else if (op == "*") {
    result = num1 * currentVal;
    histEntry = num1 + " × " + currentVal + " = " + result;
 
  } else if (op == "/") {
    // safeguard logic for division by zero
    if (currentVal == 0) {
      updateDisplay("Error: ÷ 0");
      addToHistory(num1 + " ÷ 0 = Error");
      isNewInput = true;
      return 0;
    }
    result = num1 / currentVal;
    histEntry = num1 + " ÷ " + currentVal + " = " + result;
 
  }
 
  // Display the output result
  updateDisplay(String(result));
 
  // Save calculation to the history and resets the state; calls addToHistory which iterates
  addToHistory(histEntry);
  num1 = result;
  isNewInput = true;
 
  return result;
}
 
 
// Digit handler appends a digit to the current on-screen number
function handleDigit(digit) {
  if (isNewInput) {
    updateDisplay(digit);
    isNewInput = false;
  } else {
    var current = getText("display");
    // prevents unecessary zeros
    if (current == "0" && digit != ".") {
      updateDisplay(digit);
    } else {
      updateDisplay(current + digit);
    }
  }
}
 
// Operator handler saves the first operand and sets the pending operator
function handleOperator(op) {
  num1 = Number(getText("display"));
  currentOp = op;
  isNewInput = true;
}
 
// Digit buttons 0-9
onEvent("btn0", "click", function() { handleDigit("0"); });
onEvent("btn1", "click", function() { handleDigit("1"); });
onEvent("btn2", "click", function() { handleDigit("2"); });
onEvent("btn3", "click", function() { handleDigit("3"); });
onEvent("btn4", "click", function() { handleDigit("4"); });
onEvent("btn5", "click", function() { handleDigit("5"); });
onEvent("btn6", "click", function() { handleDigit("6"); });
onEvent("btn7", "click", function() { handleDigit("7"); });
onEvent("btn8", "click", function() { handleDigit("8"); });
onEvent("btn9", "click", function() { handleDigit("9"); });
 
// Create the decimal point and make sure it's only one decimal point per number
onEvent("btnDot", "click", function() {
  if (getText("display").indexOf(".") == -1) {
    handleDigit(".");
  }
});
 
// Operation buttons
onEvent("btnAdd",  "click", function() { handleOperator("+"); });
onEvent("btnSub",  "click", function() { handleOperator("-"); });
onEvent("btnMul",  "click", function() { handleOperator("*"); });
onEvent("btnDiv",  "click", function() { handleOperator("/"); });
 
// Equals calls the main calculate function
onEvent("btnEq", "click", function() {
  calculate(currentOp);
});
 
// Clear resets all states
onEvent("btnClear", "click", function() {
  updateDisplay("0"); 
  num1 = 0;
  currentOp = "";
  isNewInput = true;
});
 
// Backspace removes the last character, or "0" if backspacing the last character
onEvent("btnBack", "click", function() {
  var current = getText("display");
  if (current.length <= 1) {
    updateDisplay("0");
  } else {
    updateDisplay(current.substring(0, current.length - 1));
  }
});
 
 
// When running the display set up the initial value of 0 and the "Calculation History" label
updateDisplay("0");
setText("historyLabel", "Calculation History");
