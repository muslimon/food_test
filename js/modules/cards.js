import { getResource } from "../services/services";

function cards() {
	class MenuCard {
		constructor(src, altimg, title, descr, price, parent, ...classes) {
			this.src = src;
			this.altimg = altimg;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parent);
			this.convertation = 27;
			this.convertToUAH();
		}

		convertToUAH() {
			this.price = this.price * this.convertation;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0){
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
			<img src=${this.src} alt=${this.altimg}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
			`;
			this.parent.prepend(element);
		}
	}


	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(obj => {
				obj.parent = '.menu .container';
				new MenuCard(...Object.values(obj)).render();
			});
		});
	
}

export default cards;