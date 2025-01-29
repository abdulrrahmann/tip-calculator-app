// Define variables
let bill = document.getElementById("bill");
let billNum;
let tipRatio;
let tipAmount;
let tipTotal;
let numberOfPeople = document.getElementById("number");
let numberOfPeopleNum;
let tip = document.getElementById("tip");
let tipButtons = document.querySelectorAll("ul.select-tip li");
let myForm = document.querySelector("form");
let resetBtn = document.querySelector(".result .btn");
// handle bill
bill.addEventListener("input", (e) => {
  if (Number(e.target.value) <= 0) {
    billNum = 0;
    myForm.querySelectorAll("div.input-container")[0].classList.add("error");
    myForm.querySelectorAll("label.info .msg")[0].classList.remove("hidden");

    // Set the spans to 0's
    document.querySelector(".tip-amount .right span").innerHTML = "0.00";
    document.querySelector(".total .right span").innerHTML = "0.00";
  } else {
    myForm.querySelectorAll("div.input-container")[0].classList.remove("error");
    myForm.querySelectorAll("label.info .msg")[0].classList.add("hidden");
    billNum = Number(e.target.value);

    // Calc tipAmount and Total
    if (numberOfPeopleNum && tipRatio && billNum) {
      tipAmount = ((billNum * tipRatio) / numberOfPeopleNum).toFixed(2);
      tipTotal = ((billNum * tipRatio + billNum) / numberOfPeopleNum).toFixed(
        2
      );

      // Update tip Amount and total
      document.querySelector(".tip-amount .right span").innerHTML = tipAmount;
      document.querySelector(".total .right span").innerHTML = tipTotal;

      // add active to reset Btn
      resetBtn.classList.add("active");
    } else {
      // Set the spans to 0's
      document.querySelector(".tip-amount .right span").innerHTML = "0.00";
      document.querySelector(".total .right span").innerHTML = "0.00";
    }
  }
});

// handle NumberOfPeople
numberOfPeople.addEventListener("input", (e) => {
  if (Number(e.target.value) <= 0) {
    numberOfPeopleNum = 0;
    myForm.querySelectorAll("div.input-container")[1].classList.add("error");
    myForm.querySelectorAll("label.info .msg")[1].classList.remove("hidden");

    // Set the spans to 0's
    document.querySelector(".tip-amount .right span").innerHTML = "0.00";
    document.querySelector(".total .right span").innerHTML = "0.00";
  } else {
    myForm.querySelectorAll("div.input-container")[1].classList.remove("error");
    myForm.querySelectorAll("label.info .msg")[1].classList.add("hidden");
    numberOfPeopleNum = Number(e.target.value);

    // Calc tipAmount and Total
    if (billNum && tipRatio && numberOfPeopleNum) {
      tipAmount = ((billNum * tipRatio) / numberOfPeopleNum).toFixed(2);
      tipTotal = ((billNum * tipRatio + billNum) / numberOfPeopleNum).toFixed(
        2
      );

      // Update tip Amount and total
      document.querySelector(".tip-amount .right span").innerHTML = tipAmount;
      document.querySelector(".total .right span").innerHTML = tipTotal;

      // add active to reset Btn
      resetBtn.classList.add("active");
    } else {
      // Set the spans to 0's
      document.querySelector(".tip-amount .right span").innerHTML = "0.00";
      document.querySelector(".total .right span").innerHTML = "0.00";
    }
  }
});

// handle tips
tipButtons.forEach((button) => {
  // check if it's custom

  button.addEventListener("click", (e) => {
    if (
      e.target.parentElement.id === "custom-btn" ||
      e.target.id === "custom-btn"
    ) {
      // Remove active class from all lis
      tipButtons.forEach((button) => {
        button.classList.remove("active");
      });
      document.querySelector("#custom-btn span").classList.add("hidden");
      tip.classList.remove("hidden");
      document.querySelector("#custom-btn").classList.add("custom");

      tip.addEventListener("input", (e) => {
        if (Number(e.target.value) >= 0) {
          if (Number(e.target.value) > 100) {
            e.target.value = 100;
          }
          tipRatio = Number(e.target.value) / 100;

          // Calc tipAmount and Total
          if (billNum && numberOfPeopleNum && tipRatio) {
            tipAmount = ((billNum * tipRatio) / numberOfPeopleNum).toFixed(2);
            tipTotal = (
              (billNum * tipRatio + billNum) /
              numberOfPeopleNum
            ).toFixed(2);

            // Update tip Amount and total
            document.querySelector(".tip-amount .right span").innerHTML =
              tipAmount;
            document.querySelector(".total .right span").innerHTML = tipTotal;

            // add active to reset Btn
            resetBtn.classList.add("active");
          } else {
            // Set the spans to 0's
            document.querySelector(".tip-amount .right span").innerHTML =
              "0.00";
            document.querySelector(".total .right span").innerHTML = "0.00";
          }
        } else {
          tip.value = 0;
        }
      });
    } else {
      document.querySelector("#custom-btn span").classList.remove("hidden");
      tip.value = 0;
      tip.classList.add("hidden");
      document.getElementById("custom-btn").classList.remove("custom");

      tipRatio = Number(button.dataset.amount) / 100;

      tipButtons.forEach((button) => {
        button.classList.remove("active");
      });

      e.target.classList.add("active");

      // Calc tipAmount and Total
      if (billNum && numberOfPeopleNum && tipRatio) {
        tipAmount = ((billNum * tipRatio) / numberOfPeopleNum).toFixed(2);
        tipTotal = ((billNum * tipRatio + billNum) / numberOfPeopleNum).toFixed(
          2
        );

        // Update tip Amount and total
        document.querySelector(".tip-amount .right span").innerHTML = tipAmount;
        document.querySelector(".total .right span").innerHTML = tipTotal;

        // add active to reset Btn
        resetBtn.classList.add("active");
      } else {
        // Set the spans to 0's
        document.querySelector(".tip-amount .right span").innerHTML = "0.00";
        document.querySelector(".total .right span").innerHTML = "0.00";
      }
    }
  });
});

// Reset Button
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Clear the form
  myForm.reset();
  // Clear tip ratio, amount and number
  tipRatio = 0;
  billNum = 0;
  numberOfPeopleNum = 0;
  // Set the spans to 0's
  document.querySelector(".tip-amount .right span").innerHTML = "0.00";
  document.querySelector(".total .right span").innerHTML = "0.00";

  // Remove active class from tip li
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Remove active class from the button
  e.target.classList.remove("active");

  // hide custom button
  if (document.getElementById("custom-btn").classList.contains("custom")) {
    document.querySelector("#custom-btn span").classList.remove("hidden");
    tip.value = 0;
    tip.classList.add("hidden");
    document.getElementById("custom-btn").classList.remove("custom");
  }
});
