const socket = io();
const countSpan = document.getElementById('count');

document.querySelector('#btn').addEventListener('click', () => {
  //console.log('clicked');
  socket.emit('increment');
})

socket.on('countUpdated', (count) => {
  console.log('count updated', count);
  countSpan.innerHTML = count;
});