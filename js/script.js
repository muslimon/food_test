window.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER
    const deadline = '2023-08-07';
   
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(Date());
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

              return {
               'total': t,
                days,
                hours,
                minutes,
                seconds
              };
    }   
    
    function getZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else if (num <= 0) {
            return '00';
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); 

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal

    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modalCloseBtn = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal');

    
    modalOpenBtn.forEach( btn => {
        btn.addEventListener('click', openModalWindow)
    });

    function openModalWindow(){
        modal.classList.toggle('show');
        modal.classList.toggle('fade-modal');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modalCloseBtn.addEventListener('click', closeModalWindow);

    function closeModalWindow(){
        modal.classList.toggle('show');
        modal.classList.toggle('fade-modal');
        document.body.style.overflow = '';
    };

    modal.addEventListener('click', (e) => {
        if (e.target && e.target == modal){
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // на esc будет закрываться 
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 120000); //чтоб модалка сама включалась спустя некоторое время

    function openModalWindowByScroll(){
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){ //включение модалки при прокрутке до конца вниз
            openModalWindow();
            window.removeEventListener('scroll', openModalWindowByScroll);
        } 
    }

    window.addEventListener('scroll', openModalWindowByScroll);



    // Clone cards with classes

    class MenuCard {
        constructor(src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
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
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
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
    
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        13,
        ".menu .container",
        "menu__item"
    ).render();
        















});




