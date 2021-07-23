const form = document.querySelector('.form')
const inputDate = document.querySelector('#date');

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const inputDateValue = inputDate.value;
    const dateArray = inputDateValue.split("-");
    checkPalindrome(dateArray);
})

// check pailndrome

function checkPalindrome(e){
    // console.log(e)

    const inputYear = e[0];
    const inputMonth = e[1];
    const inputDate = e[2];

    // console.log(inputYear, inputMonth, inputDate)

    let setFlag = checkAllCombination(inputYear, inputMonth, inputDate)

    console.log(setFlag)

    if(setFlag){
        console.log(setFlag)
    }
    
}

// check all combination fo date formate (four formates)
function checkAllCombination(yyyy, mm, dd){
    
    const formateOne = yyyy+mm+dd;
    // console.log(formateOne)
    const formateTwo = dd+mm+yyyy;
    const formateThree = mm+dd+yyyy.substring(2)
    const formateFour = Number(mm)+dd+yyyy;

    // checking is palindrome

    if(isPailndrome(formateOne)){
        return (`${yyyy} - ${mm} - ${dd}`)
    }else if(isPailndrome(formateTwo)){
        return (`${dd}-${mm}-${yyyy}`);
    }else if(isPailndrome(formateThree)){
        return (`${mm}-${dd}-${yyyy.substring(2)}`);
    }else if(isPailndrome(formateFour)){
        return  (`${Number(mm)}-${dd}-${yyyy}`);
    }else{
        return null
    }

}

// strings checking

function isPailndrome(StringChecking){
    // console.log(StringChecking.length)
   const max = Math.floor(StringChecking.length/2)
//    console.log(max)

    for(i=0; i<max; i++){
        if(StringChecking[i] != StringChecking[StringChecking.length-1-i]){
            return false
        }
    }

    return true
}