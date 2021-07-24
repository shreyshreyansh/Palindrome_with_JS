const form = document.querySelector(".form");
const inputDate = document.querySelector("#date");
var message = "";
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

document.addEventListener("DOMContentLoaded", function (event) {
  document.documentElement.setAttribute("data-theme", "light");

  // Get our button switcher
  var themeSwitcher = document.getElementById("theme-switcher");

  // When our button gets clicked
  themeSwitcher.onclick = function () {
    // Get the current selected theme, on the first run
    // it should be `light`
    var currentTheme = document.documentElement.getAttribute("data-theme");

    // Switch between `dark` and `light`
    var switchToTheme = currentTheme === "dark" ? "light" : "dark";

    document.getElementById("theme-switcher").innerText =
      currentTheme !== "dark" ? "🌙" : "🌞";

    // Set our currenet theme to the new one
    document.documentElement.setAttribute("data-theme", switchToTheme);
  };
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputDateValue = inputDate.value;
  const dateArray = inputDateValue.split("-");

  if (inputDateValue) {
    document.querySelector(
      ".output"
    ).innerHTML = `<img src="Fidget-spinner.gif" style="width: 30px;" />`;
    setTimeout(() => {
      checkPalindrome(dateArray);
    }, 4000);
  } else {
    document.querySelector(
      ".output"
    ).innerHTML = `<p class="result">Date field can not blank.</p>`;
  }
});

// check pailndrome

function checkPalindrome(e) {
  // console.log(e)

  const inputYear = e[0];
  const inputMonth = e[1];
  const inputDate = e[2];

  // console.log(inputYear, inputMonth, inputDate)

  let setFlag = checkAllCombination(inputYear, inputMonth, inputDate);

  console.log(setFlag);

  if (setFlag) {
    message = `<p class="result">Wow! Your birthdate in formate ${setFlag} is palindrome</p>`;
    document.querySelector(".output").innerHTML = message;
  } else {
    findRestDays(inputDate, inputMonth, inputYear);
    message = `<p class="result"> Ohh! Sorry, your birth date is not palindrome. And next palindrome date is ? and missed it by ? days.`;
    document.querySelector(".output").innerHTML = message;
  }
}

// check all combination fo date formate (four formates)
function checkAllCombination(yyyy, mm, dd) {
  const formateOne = yyyy + mm + dd;
  // console.log(formateOne)
  const formateTwo = dd + mm + yyyy;
  const formateThree = mm + dd + yyyy.substring(2);
  const formateFour = Number(mm) + dd + yyyy;

  // checking is palindrome

  if (isPailndrome(formateOne)) {
    return `${yyyy} - ${mm} - ${dd}`;
  } else if (isPailndrome(formateTwo)) {
    return `${dd}-${mm}-${yyyy}`;
  } else if (isPailndrome(formateThree)) {
    return `${mm}-${dd}-${yyyy.substring(2)}`;
  } else if (isPailndrome(formateFour)) {
    return `${Number(mm)}-${dd}-${yyyy}`;
  } else {
    return null;
  }
}

// strings checking

function isPailndrome(StringChecking) {
  // console.log(StringChecking.length)
  const max = Math.floor(StringChecking.length / 2);
  //    console.log(max)

  for (i = 0; i < max; i++) {
    if (StringChecking[i] != StringChecking[StringChecking.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

/// finding how many days missed and days

function findRestDays(date, month, year) {
  // console.log(date, month, year)
  let dateNo1 = Number(date);
  let monthNo1 = Number(month);
  let yearNo1 = Number(year);

  let dateNo2 = Number(date);
  let monthNo2 = Number(month);
  let yearNo2 = Number(year);

  for (i = 0; i > 0; i++) {
    // forword

    dateNo1 = dateNo1 + 1;
    if (dateNo1 > Number(datesInMonth[monthNo1 - 1])) {
      dateNo1 = 1;
      monthNo1 = monthNo1 + 1;
      if (monthNo1 > 12) {
        monthNo1 = 1;
        yearNo1 = yearNo1 + 1;
      }
    }

    let yearString = yearNo1.toString();
    let monthString = monthNo1.toString();
    let dateString = dateNo1.toString();

    //    console.log(yearString, monthString, dateString)

    if (dateString.length == 1) {
      dateString = "0" + dateString;
    }
    if (monthString.length == 1) {
      monthString = "0" + monthString;
    }

    /// now set flag date

    let setFlagDate = checkAllCombination(yearString, monthString, dateString);

    if (setFlagDate) {
      return [`${setFlagDate}`, i];
    }

    //backword

    if (yearNo2 > 1) {
      dateNo2 = dateNo2 - 1;
      if (monthNo2 < 1) {
        monthNo2 = 12;
        yearNo2 = yearNo2 - 1;

        if (yearNo2 < 1) {
          break;
        }

        dateNo2 = datesInMonth[monthNo2 - 1];
      }
    }

    let yearStrings = yearNo2.toString();
    let monthStrings = monthNo2.toString();
    let dateStrings = dateNo2.toString();

    if (monthStrings.length == 1) {
      monthStrings = "0" + monthStrings;
    }
    if (dateStrings.length == 1) {
      dateStrings = "0" + dateStrings;
    }

    let setFlagDates = checkAllCombination(
      yearStrings,
      monthStrings,
      dateStrings
    );

    if (setFlagDates) {
      return [`${setFlagDate}`, i];
    }
  }
}
