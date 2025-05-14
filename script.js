const lengthInput = document.getElementById("length");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const result = document.getElementById("result");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const strengthValue = document.getElementById("strengthValue");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/";

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

generateBtn.addEventListener("click", () => {
  let characters = "";
  let password = "";

  const length = +lengthInput.value;
  const options = [];

  if (lowercase.checked) {
    characters += lowercaseLetters;
    options.push(getRandomChar(lowercaseLetters));
  }
  if (uppercase.checked) {
    characters += uppercaseLetters;
    options.push(getRandomChar(uppercaseLetters));
  }
  if (numbers.checked) {
    characters += numberChars;
    options.push(getRandomChar(numberChars));
  }
  if (symbols.checked) {
    characters += symbolChars;
    options.push(getRandomChar(symbolChars));
  }

  if (characters === "") {
    result.value = "";
    strengthValue.textContent = "-";
    alert("Please select at least one character set.");
    return;
  }

  // Ensure at least one of each selected character type
  password += options.join("");

  for (let i = password.length; i < length; i++) {
    password += getRandomChar(characters);
  }

  result.value = password;

  updateStrength(length);
});

copyBtn.addEventListener("click", () => {
  if (!result.value) return;
  navigator.clipboard.writeText(result.value);
  copyBtn.classList.add("copied");
  copyBtn.title = "Copied!";
  setTimeout(() => {
    copyBtn.title = "Copy to clipboard";
    copyBtn.classList.remove("copied");
  }, 1500);
});

function updateStrength(length) {
  let strength = "Weak";
  const score = [lowercase.checked, uppercase.checked, numbers.checked, symbols.checked].filter(Boolean).length;

  if (score >= 3 && length >= 12) strength = "Strong";
  else if (score >= 2 && length >= 8) strength = "Medium";

  strengthValue.textContent = strength;
  strengthValue.style.color = strength === "Strong" ? "green" : strength === "Medium" ? "orange" : "red";
}
