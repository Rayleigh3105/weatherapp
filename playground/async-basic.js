console.log('Starting app');

setTimeout(() => {
    console.log('Inside of Callback')
}, 2000)

setTimeout(() => {
    console.log('Test')
}, 0)

console.log('Finishinh Up')