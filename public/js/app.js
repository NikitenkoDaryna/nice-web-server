console.log('Script has been loaded!')
const url = '/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // Fetching the weather
    fetch(url+location).then((response) => {
        response.json().then(data => {
        if(data.errorMessage){
            messageOne.textContent = data.errorMessage
        }
        else{
           messageOne.textContent = data.location 
           messageTwo.textContent = data.forecast
        }
    })
})
})