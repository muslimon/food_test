/* eslint-disable indent */
function calc() {
    		//Calc

	const result = document.querySelector('.calculating__result span');
	let gender, height, weight, age, ratio;


		if (localStorage.getItem('gender')){
			gender = localStorage.getItem('gender');
		} else {
			gender = 'female';
			localStorage.setItem('gender', 'female');
		}
		if (localStorage.getItem('ratio')){
			ratio = localStorage.getItem('ratio');
		} else {
			ratio = 1.375;
			localStorage.setItem('ratio', 1.375);
		}
	

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('gender')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); 

// final result kkal
	function calcTotal() {
		if (!gender || !height || !weight || !age || !ratio) {
			result.textContent = '.....';
		} else if (gender === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	//gender and ratio func
	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				const target = e.target;
	
				if(target && target.hasAttribute('data-ratio')){
					ratio = +target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
				} else {
					gender = target.getAttribute('id');
					localStorage.setItem('gender', target.getAttribute('id'));
				}	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				target.classList.add(activeClass);
				calcTotal();
			});
		});
		
	}
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
				input.title = 'Введите цифры';
			} else {
				input.style.border = 'none';
			}

			switch(input.getAttribute('id')){
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
		
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}

export default calc;