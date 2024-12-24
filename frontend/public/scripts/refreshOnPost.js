const postMessage = document.querySelector('#postMessageForm');

postMessage.addEventListener('submit', async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const serializedData = new URLSearchParams(formData)

    const response = await fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: serializedData.toString()
    })

    if(response.ok) {
        const result = await response.json()
        if(result.success) {
            location.reload()
        } else {
            alert (result.message || 'An error occured')
        } 
    } else {
        alert (result.message || 'An error occured')
    }
})