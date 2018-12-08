const butt = document.getElementById('testButton');
const input = document.getElementById('testInput');

butt.addEventListener('click', () => {
  console.log(input.value);
  fetch('/todo/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todoItem: input.value,
    }),
  })
    .then(res => res.json())
    .then(res => {
      const item = Object.values(res)[0];
      const ol = document.getElementById('sleep');
      const el = document.createElement('li');
      el.innerText = item;
      ol.appendChild(el);
      console.log(item);
    });
});