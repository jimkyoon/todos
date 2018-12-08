window.onload = () => {

  const div = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');

  button.setAttribute('id', 'testButton');
  button.innerText = 'Test';

  div.appendChild(input);
  div.appendChild(button);

  document.body.appendChild(div);

  fetch('/todo/all')
    .then(result => result.json())
    .then((items) => {
      items = Object.values(items);
      items = items[0];
      items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = item.todoItem;
        return document.body.appendChild(listItem);
      });
    });
};
