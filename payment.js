// Show payment details based on selected method
const paymentOptions = document.querySelectorAll('.payment-option input');
const payNowButton = document.getElementById('pay-now-btn');

paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        document.querySelectorAll('.payment-details').forEach(detail => {
            detail.style.display = 'none'; // Hide all payment details
        });

        const selectedMethod = option.value;
        const details = document.getElementById(`${selectedMethod}-details`);
        if (details) {
            details.style.display = 'block'; // Show selected payment details
        }
    });
});

// Handle Pay Now button click
payNowButton.addEventListener('click', () => {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        alert('Please select a payment method.');
        return;
    }

    alert(`Payment successful using ${selectedMethod.value}!`);
    window.location.href = 'thankyou.html'; // Redirect to thank you page
});