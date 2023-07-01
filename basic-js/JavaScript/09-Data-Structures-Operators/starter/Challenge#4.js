'use strict';

document.body.append(document.createElement('button'));
function formatText()
{
    const text = document.querySelector('textarea').value;
    const rows = text.split('/n');
    for (const [i,row] of rows.entries())
    {
        const [first,second] = row.toLocaleLowerCase().trim().split('_');
        const output = `${first}${second.replace(second[0],second[0].toUpperCase())}`;

    }
}
document.querySelector('button').addEventListener('click',formatText);