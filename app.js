//getting all the variables
const amount = document.querySelector('.amount');
const interest = document.querySelector('.interest');
const years = document.querySelector('.years');
const calc = document.querySelector('.submit-btn');
const monthlyPay = document.querySelector('.month-pay');
const totalPay = document.querySelector('.total-pay');
const totalInterest = document.querySelector('.total-interest');

calc.addEventListener('click' , function(e){

    //hide results
    document.querySelector('.results').style.display = 'none';

    //show laoder
    document.querySelector('.loader').style.display = 'flex';

    //loadertimeout
    setTimeout(calculate , 1500);

    e.preventDefault();
});

function calculate(){

    const principle = parseFloat(amount.value);
    const resInterest = parseFloat(interest.value)/100/12;
    const resYears = parseFloat(years.value)*12;

    //compute monthly payment
    const x = Math.pow(1 + resInterest , resYears);
    const monthly = (principle * x * resInterest) / (x-1);

    if(isFinite(monthly)){
        monthlyPay.value = monthly.toFixed(3);
        totalPay.value = (monthly * resYears).toFixed(3);
        totalInterest.value = ((monthly * resYears)-principle).toFixed(3);

        document.querySelector('.results').style.display = 'block';
        document.querySelector('.loader').style.display = 'none';

    }else{
        showError('Please check your numbers');
    }
}

//error display
function showError(error){

    //create div to display
    const errorD = document.createElement('div');
    //assign class
    errorD.className = 'alert';
    //create text node
    errorD.appendChild(document.createTextNode(error));

    //get the card and heading to display on top
    const topSec = document.querySelector('.main-sec');
    const heading = document.querySelector('.top-head');

    topSec.insertBefore(errorD , heading);

    //timeout
    setTimeout(errorTime , 2000);

    document.querySelector('.loader').style.display = 'none';

}

function errorTime(){
    document.querySelector('.alert').remove();
}