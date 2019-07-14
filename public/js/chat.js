const socket = io();

console.log(moment(new Date().getTime()).format('h:mm a'))

socket.on('message', (message) => {
    console.log(message)
});

socket.on('location', (position) => {
  console.log(position)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (profanity) => {
      if (profanity) {
        return console.log(profanity)
      }

      console.log('Message delivered!')
    })
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported')
  }

  navigator.geolocation.getCurrentPosition(position => {
    //console.log(position);
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
})