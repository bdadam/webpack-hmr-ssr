import './client/app.less';

console.log('CLIENT-18');

document.querySelector('#app').innerHTML = Math.random();

if (module.hot) {
    module.hot.accept();
}
