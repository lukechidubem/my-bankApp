"use strict";

/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-07-14T14:11:59.604Z",
    "2022-07-16T14:43:26.374Z",
    "2022-07-17T18:49:59.371Z",
    "2022-07-18T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-06-08T14:43:26.374Z",
    "2022-06-10T18:49:59.371Z",
    "2022-06-12T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-06-08T14:43:26.374Z",
    "2022-06-10T18:49:59.371Z",
    "2022-06-12T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90, 400, 200, 50],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-06-08T14:43:26.374Z",
    "2022-06-10T18:49:59.371Z",
    "2022-06-12T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "en-GB",
};

const account5 = {
  owner: "Dubem Luke",
  movements: [430, 1000, -700, 550, 90, -200, 3000, -50],
  interestRate: 1.3,
  pin: 5555,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-06-08T14:43:26.374Z",
    "2022-06-10T18:49:59.371Z",
    "2022-06-12T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const accuntLogDisplay = document.querySelector(".accunt-log-display");

//////////////////////////////////////////////

// Creating Username
const createUserName = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    // console.log(acc.userName);
  });
};

createUserName(accounts);

const dateFormat = function (date) {
  const calDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  };

  const daysPassed = calDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// Function to get currency from different locations
const formatCurNum = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// To display movements

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movesAndSort = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movesAndSort.forEach((mov, i) => {
    let type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = dateFormat(date);

    const formattedMov = formatCurNum(mov, acc.locale, acc.currency);

    let html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  const formattedMov = formatCurNum(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formattedMov;
};

// displayBalance(account1.movements);

const calcSummary = function (acc) {
  // Calculating Sum Incomes
  acc.incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumIn.textContent = formatCurNum(acc.incomes, acc.locale, acc.currency);

  // Calculating Sum Outflow
  acc.outflow = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumOut.textContent = formatCurNum(acc.outflow, acc.locale, acc.currency);

  // Calculating Sum Interest
  acc.interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumInterest.textContent = formatCurNum(
    acc.interest,
    acc.locale,
    acc.currency
  );
};

// calcSummary(account1.movements);

// Updating UI
const updateUI = function (acc) {
  displayMovements(acc);
  displayBalance(acc);
  calcSummary(acc);
};

// setting up logout timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease is
    time--;
  };
  // Set time to % minutes
  let time = 120;

  // Call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;

// Locale to get the location date format of user
let locale = navigator.language;
console.log(locale);

// Adding event handlers
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => {
    return acc.userName === inputLoginUsername.value;
  });

  if (
    inputLoginUsername.value === currentAccount.userName &&
    Number(inputLoginPin.value) === currentAccount.pin
  ) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;

    // To display current date
    const now = new Date();
    const options = {
      hour: "numeric",
      day: "numeric",
      minute: "numeric",
      year: "numeric",
      // weekday: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mins}`;

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Updating UI
    updateUI(currentAccount);

    setTimeout(() => {
      accuntLogDisplay.textContent = `Total funds deposited to your account: ${formatCurNum(
        currentAccount.incomes,
        currentAccount.locale,
        currentAccount.currency
      )}`;
      accuntLogDisplay.style.opacity = 100;
    }, 1000);

    setTimeout(() => {
      accuntLogDisplay.textContent = `Total funds withdrew to your account: ${formatCurNum(
        currentAccount.outflow,
        currentAccount.locale,
        currentAccount.currency
      )}`;
      accuntLogDisplay.style.transition = "1s ease";
    }, 4000);

    setTimeout(() => {
      accuntLogDisplay.textContent = `Your account total balance: ${formatCurNum(
        currentAccount.balance,
        currentAccount.locale,
        currentAccount.currency
      )}`;
      accuntLogDisplay.style.transition = "1s ease";
    }, 7000);

    setTimeout(() => {
      accuntLogDisplay.style.opacity = 0;
      accuntLogDisplay.style.transition = "3s ease";
    }, 9000);

    console.log(currentAccount.userName);
  }

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
});

// Making a transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = +inputTransferAmount.value;
  let receiverAcc = accounts.find((acc) => {
    return inputTransferTo.value === acc.userName;
  });

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc !== currentAccount.userName
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);

    // Addind date to transfers
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }

  inputTransferTo.value = inputTransferAmount.value = "";
});

// Getting loan from bank
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  let amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);

      // Addind date to loan
      currentAccount.movementsDates.push(new Date().toISOString());

      // Updating UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }

  inputLoanAmount.value = "";
});

// Deleting Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex((mov) => {
      return mov.userName === currentAccount.userName;
    });
    console.log(index);
    accounts.slice(index);

    inputCloseUsername.value = inputClosePin.value = "";
  }
});

// Sorting Movements
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
