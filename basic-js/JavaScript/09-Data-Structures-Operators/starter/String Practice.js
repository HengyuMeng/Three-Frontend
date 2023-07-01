'use strict';

flights = '111';

function getCode(str) {
    return str.slice(0, 3).toUpperCase();
}

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';');
    const output = `${type.startsWith('_Delay') ? '!' : ' '}
    ${type.replaceAll('-', ' ')}
    ${getCode(from)}${getCode(to)}
    ${time.replace(':','h')}`.padStart(36);
    console.log(output);
}