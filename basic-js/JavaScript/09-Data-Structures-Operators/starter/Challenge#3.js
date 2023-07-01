'use strict';

const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

const eventArr = [];
for (const eventIndex of gameEvents.keys())
{
    eventArr.push(gameEvents.get(eventIndex));
}
const event = new Set(eventArr);

console.log(eventArr,event);

for (const [key,value] of gameEvents)
{
    console.log(key,value);
}