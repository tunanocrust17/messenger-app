const sendData = document.querySelector('#joinGroupForm');


sendData.addEventListener('submit', async (e) => {
    e.preventDefault()
    

    const form = e.target
    const formData = new FormData(form);
    const serializedData = new URLSearchParams(formData)

    console.log(formData)
    console.log(serializedData)

    const response = await fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: serializedData
    });

    console.log(...formData)


    if(response.ok) {
        const result = await response.json()
        if(result.success) {
            location.reload()
        } else {
            alert (result.message || 'An error occured')
            

        }
    } else {
        const errorDiv = document.querySelector('#errorMessage');

        if (errorDiv) {
            // Set the message dynamically
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Your guess was incorrect. Try again!';
            errorDiv.classList.add('show'); // Show the alert
        
            // Remove the alert after 3 seconds
            setTimeout(() => {
                errorDiv.classList.remove('show');
                errorDiv.style.display = 'none';
            }, 3000); // Adjust timeout as needed
        }
    }
})