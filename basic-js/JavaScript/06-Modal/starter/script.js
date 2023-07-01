'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const openModal = document.querySelectorAll('.show-modal');

function closeTheModal ()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
function openTheModal() {
    //把样式封装在一个类中，我们可以通过控制添加与移除这个类来达到控制样式的目的
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

for (let i = 0;i<openModal.length;i++)
{
    openModal[i].addEventListener('click',openTheModal);
}


closeModal.addEventListener('click',closeTheModal);
overlay.addEventListener('click',closeTheModal);
document.addEventListener("keydown",
    function (e)
    {
        if (e.key==='Escape')
        {
            if (!modal.classList.contains('hidden'))
            {
                closeTheModal();
            }
        }
    }
)
