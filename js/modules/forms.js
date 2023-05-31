import { closeModalWindow, openModalWindow } from './modal';
import { postData } from '../services/services';


function forms(formSelector, modalTimerId) {
	//Forms back-end
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Скоро мы свяжемся с Вами',
		fail: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});


	
		
	function bindPostData(form){
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));   /* современный способ - как поменять FormData на формат JSON */

	

			postData('http://localhost:3000/requests', json)
				.then(data => {
			    console.log(data);
			    showThanksModal(message.success);
			    statusMessage.remove();
		    }).catch(() => {
			    showThanksModal(message.fail);
		    }).finally(() => {
			    form.reset();
		    });
		});
	}

	// Модальное окно после отправки данных 
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		openModalWindow('.modal', modalTimerId);
		prevModalDialog.classList.add('hide');


		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>	
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow('.modal');
		}, 3000);
	}

	
	//db.json

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));
}

export default forms;