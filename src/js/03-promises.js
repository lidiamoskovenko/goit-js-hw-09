import Notiflix from 'notiflix';

const form = document.querySelector('.form');

let delay;
let i;
function createPromise(i, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
  
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ i, delay });
        } else {
          reject({i, delay });
        }
      }, delay);
    });
  }
function onSubmitBtn (event){
  event.preventDefault();
  const promises = [];
  for (i=1; i<=+form.amount.value; i++){
    delay = +form.delay.value + (+form.step.value) * (i - 1);

      createPromise(i, delay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    promises.push(createPromise(i, delay))};
  
  Promise.race(promises)
  .then(value => console.log(value)) 
  .catch(error => console.log(error))};


  form.addEventListener('submit', onSubmitBtn);



