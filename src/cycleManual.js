import Rx from 'rx';
import Cycle from '@cycle/core';

function h(tagName, children) {
  return {
    tagName: tagName,
    children: children
  }
}


// Logic (functional)
function main(sources) {
  const mouseover$ = sources.DOM.selectEvents('span', 'mouseover');
  const sinks = {
    DOM: mouseover$
    .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
          .map(i =>
            h('H1', [
              h('SPAN', [
                `Seconds elapsed: ${i}`
              ])
            ])
          )
      ),
    LOG: Rx.Observable.timer(0, 2000).map(i => i*2),
  }
  return sinks;
}

// Effects (imperative)
function DOMDriver(obj$) {
  function createElement(obj) {
    const element = document.createElement(obj.tagName);
    obj.children
      .filter(c => typeof c === 'object')
      .map(createElement)
      .forEach(c => element.appendChild(c));
    obj.children
      .filter(c => typeof c === 'string')
      .forEach(c => element.innerHTML += c);
    return element;
  }

  obj$.subscribe(obj => {
    const container = document.querySelector('#app');
    container.innerHTML = '';
    const element = createElement(obj);
    container.appendChild(element);
  });

  const DOMSource = {
    selectEvents: function(tagName, eventType) {
      return Rx.Observable.fromEvent(document, eventType)
        .filter(ev => ev.target.tagName === tagName.toUpperCase());
    }
  };
  return DOMSource;
}

function consoleLogDriver(msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const drivers = {
  DOM: DOMDriver,
  LOG: consoleLogDriver
}

Cycle.run(main, drivers);

// Function run manual
// function run(mainFn, drivers) {
//   const proxySources = {};
//   Object.keys(drivers).forEach(key => {
//     proxySources[key] = new Rx.Subject();
//   });
//   const sinks = main(proxySources);
//   Object.keys(drivers).forEach(key => {
//     const source = drivers[key](sinks[key]);
//     source.subscribe(x => proxySources[key].onNext(x));
//   });
// }
