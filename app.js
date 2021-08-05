//Listen for submit button
document.getElementById('loan-form').addEventListener('submit', function(e){

    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';
    
    //How fast it appears. In this case, the spinner will pop up in 1 secons since 1000 = 1 second.
    setTimeout(calculateResults, 1000);


    e.preventDefault();
});

//Calculate The Results
function calculateResults() {
    console.log('Calulating...');

    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment= document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Calculated monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    //Check if monthly value is a finite number
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); //toFixed is to set the number of decimals to 2
        totalPayment.value = (monthly * calculatedPayments).toFixed(2); //Get the total payment
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hide loader/spinner
        document.getElementById('loading').style.display = 'none';


    } else {
         showError('Please Fill All Inputs');
    }

}

//Show errors when inputed wrong in the inputs
function showError(error) {

      //Hide results
      document.getElementById('results').style.display = 'none';

      //Hide loader/spinner
      document.getElementById('loading').style.display = 'none';


    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create text node and Append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //How to clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//This is for the setTimeout. I created the function to call it above.
function clearError() {
    document.querySelector('.alert').remove();
}

