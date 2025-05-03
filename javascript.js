const display = document.querySelector(".display p");

document.querySelectorAll(".row button").forEach(button => {
  button.addEventListener("click", () => {
    const input = button.textContent;
    const operators = ['+', '−', '×', '/'];
    const lastChar = display.textContent.slice(-1);

    if (input === "=") {
      const match = display.textContent.match(/([0-9.]+)([+\−×/])([0-9.]+)/);
      if (match) {
        const [expression, num1, operator, num2] = match;
        const remaining = display.textContent.slice(expression.length);
        const result = operate(operator, +num1, +num2);
        display.textContent = remaining ? result + remaining : result;
      }
    } else if (input === "C") {
      display.textContent = "0";
    } else if (display.textContent === "0") {
      display.textContent = input;
    } else {
      if (operators.includes(lastChar) && operators.includes(input)) {
        display.textContent = display.textContent.slice(0, -1) + input;
      } else {
        display.textContent += input;
      }
    }
  });
});

function operate(operator, num1, num2) {
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '−':
      result = num1 - num2;
      break;
    case '×':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) return "You Cannot Divide By 0";
      result = num1 / num2;
      break;
  }

  return parseFloat(result.toFixed(5));
}