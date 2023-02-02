'use strict' 
class Delivery {
  constructor(tabs, tabContents,openGoods) {
    this.tabs = document.querySelectorAll(tabs);
    this.tabContents = document.querySelectorAll(tabContents);
    this.openGoods = document.querySelectorAll(openGoods);
  }
  selectTabs() {
    const th = this;
    if(th?.tabs) {
      th.tabContents.forEach((targetId, index) => {
        targetId.id = `tab_${index}`;
      });
      th.tabs.forEach((tab, index) => {
        (tab.dataset.tabTarget = `#tab_${index}`)
        tab.addEventListener('click', () => {
          const target = document.querySelector(tab.dataset.tabTarget);
            th.tabContents.forEach(tabContent => {
              tabContent.classList.remove('active');
          });
          th.tabs.forEach(tab => {
            tab.classList.remove('active');
          });
          tab.classList.add('active');
          target.classList.add('active');
        });
      });
    }
  }
  ifEmptyList() {
    const listProd = document.querySelector('.page-delivery-wrapper__list').children,
          readyProd = document.querySelector('.page-delivery-wrapper__ready').children,
          listAccomplished = document.querySelector('.page-delivery-wrapper__list-accomplished').children,
          emptyList = document.getElementById('no-prod-list'),
          emptyAccomplished = document.getElementById('no-prod-accomplished'),
          imageNoProd = '<img src="img/delivered/empty_bag.png">';

    if(!listProd?.length && !readyProd?.length) {
        emptyList.innerHTML = imageNoProd;
    }

    if(!listAccomplished?.length) {
        emptyAccomplished.innerHTML = imageNoProd;
    }
  }
  showGoods() {
    const th = this;
    if(th?.openGoods) {
      th.openGoods.forEach(btn => {
        btn.addEventListener('click', e => {
          const target = e.currentTarget.parentNode.parentNode,
                tag = e.currentTarget.getElementsByTagName('span')[0];
                target.children[1].children[1].classList.toggle('is-open');
                target.children[2].classList.toggle('no-open');
                target.children[3].classList.toggle('is-open');
                tag.classList.toggle('addColor');
                tag.classList.toggle('rotate');
        });
      });
    }
  }
}


const exampleDelivery = new Delivery(
  '[data-tab-target]',
  '[data-tab-content]',
  '[data-all-open]'
);

exampleDelivery.selectTabs();
exampleDelivery.ifEmptyList();
exampleDelivery.showGoods();



const swiper1SlideCount = document.querySelector('.slider-list .swiper-wrapper').children,
      swiper2SlideCount = document.querySelector('.ready-slider .swiper-wrapper').children,
      swiper3SlideCount = document.querySelector('.list-accomplished .swiper-wrapper').children;
      
const countSlides = (countSlides) => {

  if(countSlides.length > 10) {
    countSlides = 10;
  } 
  else {
    countSlides.length;
  }

  return countSlides

}


const sliderCreactedProd = new Swiper ('.slider-list', {
  slidesPerView: countSlides(swiper1SlideCount),
  paginationClickable: true,
  spaceBetween: 30,
  navigation: {
    prevEl: '.swiper-button-prev-0',
    nextEl: '.swiper-button-next-1'
  },
});

const sliderReady = new Swiper ('.ready-slider', {
  slidesPerView: countSlides(swiper2SlideCount),
  paginationClickable: true,
  spaceBetween: 30,
  navigation: {
    prevEl: '.swiper-button-prev-2',
    nextEl: '.swiper-button-next-3'
  },
});

const sliderAccomplished = new Swiper ('.list-accomplished', {
  slidesPerView: countSlides(swiper3SlideCount),
  paginationClickable: true,
  spaceBetween: 30,
  navigation: {
    prevEl: '.swiper-button-prev-4',
    nextEl: '.swiper-button-next-5'
  },
});


const clickCopyNumber = document.querySelectorAll('[data-target-copy]');

clickCopyNumber.forEach(elm => {
  elm.previousElementSibling.setAttribute('disabled', '');
  elm.addEventListener('click', e => {
    const text = e.target.previousElementSibling;
          text.removeAttribute('disabled');
          text.select();
          document.execCommand("copy");
          text.setAttribute('disabled', '');
          disappearingMessage(text.value);
  });
});

const disappearingMessage = (text) => {
  const messageAppend = document.querySelector('.page-delivery');
  const createWrp = document.createElement('div');
      createWrp.classList.add('page-delivery__wrp');
  const createMess = document.createElement('span');
      createWrp.appendChild(createMess);
      createMess.classList.add('page-delivery__message');
      createMess.innerHTML = `Номер доставки ${text.replace(/[^+\d]/g, '')} скопирован в буфер обмена`;
    
      messageAppend.append(createWrp);

       setTimeout(() => {
        createWrp.parentNode.querySelector('.page-delivery__wrp').remove();
       }, 4500);
}





//popup

const backdrop = document.querySelector('#modal-backdrop');
document.addEventListener('click', modalHandler);

function modalHandler(evt) {
  const modalBtnOpen = evt.target.closest('.js-modal');
  if (modalBtnOpen) {
    const modalSelector = modalBtnOpen.dataset.modal;
    showModal(document.querySelector(modalSelector));
  }

  const modalBtnClose = evt.target.closest('.modal-close');
  if (modalBtnClose) {
    hideModal(modalBtnClose.closest('.modal-window'));
  }

  if (evt.target.matches('#modal-backdrop')) { 
    hideModal(document.querySelector('.modal-window.show'));
  }
}

function showModal(modalElem) {
  modalElem.classList.add('show');
  backdrop.classList.remove('hidden-modal');
}

function hideModal(modalElem) {
  modalElem.classList.remove('show');
  backdrop.classList.add('hidden-modal');
}




const radio = document.getElementsByClassName('modal-window__form-field');

for (let i=0; i <radio.length; i++) {
  radio[i].id = i;
  radio[i].parentNode.setAttribute('for', i);
  radio[i].onchange = getValueRadio;
}

function getValueRadio() {
  if(this.checked == true) {
    let checkboxes = document.getElementsByClassName('modal-window__form-field');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    this.checked = true;
  }
  let btn = document.querySelector('.modal-window__form-btn > input');
      btn.removeAttribute('disabled');
      console.log(this.value);
      btn.classList.add('btn-active');

  let textArea = document.querySelector('.modal-window__form-message');
  if(this.id == 5) {
    textArea.classList.add('is-open');
    btn.classList.remove('btn-active');
    btn.setAttribute('disabled', '');
    textArea.addEventListener('input', e => {
      if(e.target.value.length > 10) {
        btn.removeAttribute('disabled');
        btn.classList.add('btn-active');
      }else {
        btn.setAttribute('disabled', '');
        btn.classList.remove('btn-active');
      }
    })
  }else {
    textArea.classList.remove('is-open');
  }
}

// document.getElementById('one').onclick = checkRadio;

// function checkRadio() {
//   let m = document.getElementsByName('cansel');
//   for(let i=0; i<m.length; i++){
//     if (m[i].checked) {
//       alert(m[i].value)
//       break;
//     }
//   }
// }






