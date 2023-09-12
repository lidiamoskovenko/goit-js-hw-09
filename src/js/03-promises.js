import Notiflix from 'notiflix';

{function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitBtn);
let delay;
let position;
function onSubmitBtn (event){
  event.preventDefault();
  const promises = [];
  for (position=1; position<=form.amount.value;position++){
    delay = +form.delay.value + (+form.step.value) * (position - 1);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(createPromise(position, delay))};
  
  Promise.race(promises)
  .then(value => console.log(value)) 
  .catch(error => console.log(error))}};
