function openModalWindow(modalSelector, modalTimerId){
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	modal.classList.toggle('fade-modal');
	document.body.style.overflow = 'hidden';

	if (modalTimerId){
		clearInterval(modalTimerId);
	}
}

function closeModalWindow(modalSelector){
	const modal = document.querySelector(modalSelector);

	modal.classList.remove('show');
	modal.classList.add('hide');
	modal.classList.toggle('fade-modal');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalOpenBtn = document.querySelectorAll(triggerSelector),
	modal = document.querySelector(modalSelector);

	
	modalOpenBtn.forEach( btn => {
		btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
	});


	modal.addEventListener('click', (e) => {
		if (e.target && e.target == modal || e.target.hasAttribute('data-close')){
			closeModalWindow(modalSelector);
		}
	}); 

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) { // на esc будет закрываться 
			closeModalWindow(modalSelector);
		}
	});


	function openModalWindowByScroll(){
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){ //включение модалки при прокрутке до конца вниз
			openModalWindow(modalSelector, modalTimerId);
			window.removeEventListener('scroll', openModalWindowByScroll);
		} 
	}

	window.addEventListener('scroll', openModalWindowByScroll);
}

export default modal;
export {closeModalWindow};
export {openModalWindow};