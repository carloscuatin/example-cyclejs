import Rx from 'rx';

Rx.Observable.timer(0, 1000)
  .map(i => `Seconds elapsed ${i}`)
  .subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  })
