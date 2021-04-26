document.addEventListener('DOMContentLoaded', () => {

  const phoneAccordeon = () => {
    slideTrigger = document.querySelector('.header-contacts__arrow'),
    phoneSliderBlock = document.querySelector('.header-contacts__phone-number-accord');

    slideTrigger.addEventListener('click', (e) => {
      if (e.target.closest('.header-contacts__arrow')) {
        slideTrigger.classList.toggle('active');
        phoneSliderBlock.classList.toggle('active');
      }
    });

  };  

  const sideMenu = () => {
    const menuIcon = document.querySelector('.menu__icon'),
    popupDialogMenu = document.querySelector('.popup-dialog-menu'),
    closeMenu = popupDialogMenu.querySelector('.close-menu');

    menuIcon.addEventListener('click', (e) => {
      console.log(e.target);
      if (window.innerWidth < 576) {
        console.log('less than 576px');
      }
      popupDialogMenu.classList.add('active');
    })

    closeMenu.addEventListener('click', () => {
      popupDialogMenu.classList.remove('active');
    });
  };

  const repairTypesModal = () => {
    const popupTrigger = document.querySelectorAll('.repair-popup'),
          popupModal = document.querySelector('.popup-repair-types');

    popupTrigger.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (trigger.closest('.popup-dialog-menu')) {
          document.querySelector('.popup-dialog-menu').classList.remove('active');
          popupModal.style.visibility = 'visible';
          noBodyJump();
          document.addEventListener('click',closeHandler);
        }
        popupModal.style.visibility = 'visible';
        noBodyJump();
        document.addEventListener('click',closeHandler);

        repairTypesGenerateData();
      });
    });
  };

  const repairTypesGenerateData = () => {
    let getData = async (url) => {
      let res = await fetch(url);

      if (!res.status) {
        throw new Error(`Ошибка ${res.status}. Получение данных прошло с ошибкой. Попробуйте позже.`);
      }
      return await res.json();
    };

    getData('db/db.json')
    .then(res => renderElems(res));

    function renderElems(res) {
      console.log(res);
      const navList = document.querySelector('.nav-list-popup-repair'),
            typesTitle = document.getElementById('switch-inner'),
            tableContainer = document.querySelector('.popup-repair-types-content-table');

      document.querySelector('.popup-repair-types-content__head-date').textContent = res[0].date;

      function tabTrigger(e) {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
          const btns = navList.querySelectorAll('button');
          btns.forEach((btn, index) => {
            if (btn === target) {
              typesTitle.textContent = btn.textContent;
              tableSorting(index);
            }
          })
        }
      }

      function tableSorting(i = 0) {
        table = document.querySelectorAll('.popup-repair-types-content-table__list');
        table.forEach(tableOne => {
          tableOne.style.display = 'none';
          table[i].style.display = 'block';
        })
      }

      function renderNav() {
        res.forEach(elem => {
          if(elem.title) {
            const navBtn = document.createElement('button');
            navBtn.classList.add('button_o', 'popup-repair-types-nav__item');
            navBtn.textContent = elem.title;

            navList.append(navBtn);
          }
        })

        navList.addEventListener('click', tabTrigger);

      }

      function checkUnits(unit) {
        if (unit === 'м2') {
          console.log(123123);
          return unit.slice(0,1) + '<sup>' + unit.slice(1, unit.length) + '</sup>';
        } else {
          return unit;
        }
      }

      function renderTable() {
        res.forEach(elem => {
          if(elem.title) {
            const table = document.createElement('table'),
                  tbody = document.createElement('tbody');
            table.classList.add('popup-repair-types-content-table__list');

            elem.priceList.forEach(tableItem => {
              const tableRow = document.createElement('tr');
              tableRow.classList.add('mobile-row');
              tableRow.innerHTML = `
              <td class="repair-types-name">${tableItem.typeService}</td>
              <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
              <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
              <td class="repair-types-value">${checkUnits(tableItem.units)}</td>
              <td class="repair-types-value">${tableItem.cost} руб.</td>
              `;

              tbody.append(tableRow);

            })

            table.append(tbody);
            tableContainer.append(table);

            tableSorting();
          }
        });
      }

      renderTable();
      renderNav();
    }
  };

  const accordeon = () => {
    const accordionWrapper = document.querySelector('.accordion'),
          titleBlock = accordionWrapper.querySelectorAll('.title_block'),
          accordionTexts = accordionWrapper.querySelectorAll('.msg');

          accordionWrapper.addEventListener('click', (e) =>{
            const target = e.target;   

            titleBlock.forEach(title => { 
              if ( target === title) {
                title.classList.toggle('msg-active');
              } else if (target.classList.contains('title_block')){                        
                title.classList.remove('msg-active');
              }
            });
          })
           
  };

  const tabs = () => {
    const tabsContainer = document.querySelector('.scheme .nav-list'),
          tabs = tabsContainer.querySelectorAll('.scheme-nav__item'),
          slides = document.querySelectorAll('.scheme-slider__slide'),
          slidesDescription = document.querySelectorAll('.scheme-description-block');

    function changeTab(tabIndex) {
      for (let i = 0; i < tabs.length; i++) {
        slides[i].style.display = 'none';
        slidesDescription[i].classList.remove('visible-content-block');
      }
      slides[tabIndex].style.display = 'block';
      slidesDescription[tabIndex].classList.add('visible-content-block');
    }

    tabsContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const target  = e.target;
      tabs.forEach((tab, tabIndex) => {
        if (target === tab) {
          tab.classList.add('active');
          changeTab(tabIndex);
        } else {
          tab.classList.remove('active');
        }
      })
    })
  };

  const noBodyJump = () => {
    const block = document.createElement('div');

    block.style.cssText = `
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
    `;

    document.body.append(block);
    const scrollWidth = block.offsetWidth - block.clientWidth;
    block.remove();

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollWidth + 'px';
  };

  const clearBodyLock = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const privacyPopup = () => {
    const privacy = document.querySelectorAll('.link-privacy'),
          privacyPopup = document.querySelector('.popup-privacy');
    
  
    privacy.forEach(item => {
      item.addEventListener('click', (e) =>{
        privacyPopup.style.visibility = 'visible';
        noBodyJump();
        document.addEventListener('click',closeHandler);
      });
    })

  };

  const closeHandler = (e) => {
      const target = e.target;
      if (target.classList.contains('close')) {
        // closeModal();
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => popup.style.visibility = ``);
        clearBodyLock();
        // СЛушатель нажатия на Esc убирается полсе закрытия модалки
        document.removeEventListener('click',closeHandler);
      }
    
  };

  const phoneValidation = () => {
    const phoneInputs = document.querySelectorAll('input[name=phone]');
    phoneInputs.forEach((input) => {
      let keyCode;
  
      const mask = (event) => {
  
          event.keyCode && (keyCode = event.keyCode);
          let pos = input.selectionStart;
  
          if (pos < 3) {
              event.preventDefault();
          }
          let matrix = "+7 (___) ___-__-__",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = input.value.replace(/\D/g, ""),
              newValue = matrix.replace(/[_\d]/g, (a) => {
                  if (i < val.length) {
                      return val.charAt(i++) || def.charAt(i);
                  } else {
                      return a;
                  }
              });
          i = newValue.indexOf("_");
  
          if (i != -1) {
              i < 5 && (i = 3);
              newValue = newValue.slice(0, i)
          }
  
          let reg = matrix.substr(0, input.value.length).replace(/_+/g,
              (a) => {
                  return "\\d{1," + a.length + "}";
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
              input.value = newValue;
          }
          if (event.type == "blur" && input.value.length < 5) {
              input.value = "";
          }
      };
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      // input.addEventListener("keydown", mask, false);
  
  });
  };

  const formSend = () => {
    const forms = document.querySelectorAll('form'),
          popupThanks = document.querySelector('.popup-thank');

    const messageSend = async (url, data) => {   
      console.log(data);   
     let res = await fetch(url, {
        method: 'POST',
         headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}. Ой, что-то пошло не так. Пожалуйста попробуйсте снова отправить письмо немного позже.`);
      }
 
      return await res.text();
    }
    
    forms.forEach(form => {

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const policyCheckbox = form.querySelector('.checkbox__input');
        console.log(policyCheckbox);
        if (!policyCheckbox.checked) {
          alert('Вы должны согласиться на обработку данных перед отправкой');
          return;
        }

        const formData = new FormData(form);           
        const jsonFormData = {};
        for (const pair of formData) {
          jsonFormData[pair[0]] = pair[1];
        }        
        
        messageSend('server.php', jsonFormData)
          .then(text => console.log(text))
          .then(() => {
            popupThanks.style.visibility = 'visible';
            noBodyJump();
            document.addEventListener('click',closeHandler);
          }
          )
          .catch(err => alert(err))
          .finally(() => {
            form.reset();
            policyCheckbox.checked = false;
          })
      });
    });
  };

  const consultPopup = () => {
    const consultBtns = document.querySelectorAll('.consult-btn'),
          consultPopup = document.querySelector('.popup-consultation');
    consultBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        consultPopup.style.visibility = 'visible';
        noBodyJump();
        document.addEventListener('click',closeHandler);
      });
    })
  };

  const reviewsSlider = (wrap, container, outer, slideClass, left, right, active) => {
    const sliderWrap = document.querySelector(wrap),
          sliderContainer = sliderWrap.querySelector(container),
          sliderOuter = sliderWrap.querySelector(outer),
          slides = sliderWrap.querySelectorAll(slideClass),
          arrowLeft = document.getElementById(left),
          arrowRight = document.getElementById(right);

    let counter = 0;
    let offset = 0;
    let width = window.getComputedStyle(sliderContainer).width;

    sliderOuter.style.overflow = 'hidden';

    sliderContainer.style.width = 100 * slides.length + '%';
    sliderContainer.style.display = 'flex';
    sliderContainer.style.transition = 'transform 0.5s ease';

    slides.forEach(slide => {
      slide.style.width = width;
    });

    if(active) {
      activeClassToggle();
    }

    arrowRight.addEventListener('click', () => {
      if (offset === +width.slice(0, width.length - 2) * (slides.length -1)) {
        offset = 0;
        counter = 0;
      } else {
        offset += +width.slice(0, width.length - 2);
        counter++;
      }
      
      if (active) {
        sliderContainer.ontransitionend = () => {
          activeClassToggle();
        };
      }

      sliderContainer.style.transform = `translateX(${-offset}px)`;
    });
    
    arrowLeft.addEventListener('click', () => {
      if (offset == 0 ) {
        offset = +width.slice(0, width.length - 2) * (slides.length -1);
        counter = slides.length -1;
      } else {
        offset -= +width.slice(0, width.length - 2);
        counter--;
      }

      if (active) {
        sliderContainer.ontransitionend = () => {
          activeClassToggle();
        }
      }
      sliderContainer.style.transform = `translateX(${-offset}px)`;
    });

    function activeClassToggle() {
      slides.forEach(element => {
        element.classList.remove(active);
      });
      slides[counter].classList.add(active);
    }
  };

 const carouselSlider = () => {

    class SliderCarousel{
      constructor({main, wrap, next, prev, infinity = false, position = 0,
         slidesToShow = 3, responsive = [], styleId, slideClass, overflow = true}) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        if (!this.main || !this.wrap || !this.slideClass) {          
          console.warn('slider-carousel: Необходимо 3 селектора, "main", "wrapper" и "slideClass"');          
        }
        this.overflow = overflow;
        this.slideClass = main;
        this.slideClass = slideClass;
        this.styleId = styleId;
        this.slides = document.querySelector(wrap).children;  
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
          position,
          infinity,
          widthSlide: Math.floor(100 / this.slidesToShow),
          maxPosition: this.slides.length - this.slidesToShow,
        };
        this.responsive = responsive;

        
      }
      init() {        
        this.addGloClass();
        this.addStyle();

        if (this.prev && this.next) {
          this.controlSlider();
        } else {
          
          this.addArrow();
          this.controlSlider();
        }

        if (this.responsive){
          this.responseInit();
        }
      }

      addGloClass() {
        this.main.classList.add(`${this.slideClass}-slider`);
        this.wrap.classList.add(`${this.slideClass}-slider__wrap`);
        for (const item of this.slides) {
          item.classList.add(this.slideClass);
        }
      }

      addStyle() {
        let style = document.getElementById(this.styleId);
        if(!style){
        style = document.createElement('style');
        style.id = this.styleId;
        }

        style.textContent = `
        .${this.slideClass}-slider{
          ${this.overflow ? 'overflow: hidden !important' : ''}
        }
        .${this.slideClass}-slider__wrap {
          display: flex !important;
          flex-wrap: nowrap;
          transition: transform 0.5s !important;
          will-change: trasform !important;
        }
        ${'.' + this.slideClass} {
          flex: 0 0 ${this.options.widthSlide}% !important;
          margin: auto 0 !important;
          max-width: none;
        }
        `;
        document.head.append(style);
      }

      controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
      }

      prevSlider() {
        this.options.maxPosition = this.slides.length - this.slidesToShow;
        if (this.options.infinity || this.options.position > 0) {
          --this.options.position;
          if (this.options.position < 0 ) {
            this.options.position = this.options.maxPosition;
          }
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
       
      }
      
      nextSlider() {
        this.options.maxPosition = this.slides.length - this.slidesToShow;
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
          ++this.options.position;
        // console.log(this.options.position);
        // console.log(this.options.maxPosition);
        if (this.options.position > this.options.maxPosition) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        };
      }


      addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'slider__prev-btn';
        this.next.className = 'slider__next-btn';

        this.main.append(this.prev);
        this.main.append(this.next);

        const style = document.createElement('style');
        style.textContent = `
        .slider__prev-btn,
        .slider__next-btn {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
        }
        .slider__prev-btn {
          border-right-color: #c7b59e;
        }
        .slider__next-btn {
          border-left-color: #c7b59e;
        }
        
        `;
        document.head.append(style);
      }

      responseInit(){
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
          const widthWindow = document.documentElement.clientWidth;
          if(widthWindow < maxResponse) {
            for (let i = 0; i < allResponse.length; i++){
              if (widthWindow < allResponse[i]) {

                this.slidesToShow = this.responsive[i].slideToShow;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow );
                this.addStyle();
              }
              
            }
          } else {
            this.slidesToShow = slidesToShowDefault;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow );
            this.addStyle();
          }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);
      }


    }

   const carousel = new SliderCarousel({
    main: '.partners .wrapper',
    wrap: '.partners-slider',
    prev: '.partners .slider-arrow_left',
    next: '.partners .slider-arrow_right',
    styleId: 'sliderCarousel-style',
    slideClass: 'partners-item',
    slidesToShow: 4,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slideToShow: 3
      },
      {
        breakpoint: 768,
        slideToShow: 2
      },
      {
        breakpoint: 576,
        slideToShow: 1
      },
    ]
   });

   const transparency = new SliderCarousel({
    main: '.transparency-slider-wrap',
    wrap: '.transparency-slider.row',
    prev: '#transparency-arrow_left',
    next: '#transparency-arrow_right',
    styleId: 'transparencyCarousel-style',
    slideClass: 'transpar-item',
    slidesToShow: 3,
    infinity: true,
    responsive: [      
      {
        breakpoint: 1024,
        slideToShow: 2
      },
      {
        breakpoint: 576,
        slideToShow: 1
      },
    ]
   });

   const formula = new SliderCarousel({
    main: '.desktop-hide .formula-slider-wrap',
    wrap: '.desktop-hide .formula-slider',
    prev: '#formula-arrow_left',
    next: '#formula-arrow_right',
    styleId: 'formulaCarousel-style',
    slideClass: 'formula-slide-item',
    slidesToShow: 3,
    infinity: true,
    overflow: false,
    responsive: [      
      {
        breakpoint: 1024,
        slideToShow: 3
      },
      {
        breakpoint: 768,
        slideToShow: 1
      },
      {
        breakpoint: 576,
        slideToShow: 1
      },
    ]
   });

   carousel.init();
   transparency.init();
   formula.init();
   
 };

 const agreementFancybox = () => {
  const agreementRow = document.querySelector('.transparency-slider'),
        agreementDiv = agreementRow.querySelectorAll('.transparency-item__img'),
        popupTransparency = document.querySelector('.popup-transparency');

  

  function transparencySlider(i) {
    const sliderOuter = document.querySelector('.popup-transparency-slider-wrap'),
          sliderInner = sliderOuter.querySelector('.popup-transparency-slider'),
          transparencySlides = sliderOuter.querySelectorAll('.popup-transparency-slider__slide'),
          currentSlide = sliderOuter.querySelector('.slider-counter-content__current'),
          totalSlide = sliderOuter.querySelector('.slider-counter-content__total'),
          transparencyLeft = document.getElementById('transparency_left'),
          transparencyRight = document.getElementById('transparency_right'),
          slideWidthPx = window.getComputedStyle(sliderOuter).width,
          slideWidth = slideWidthPx.slice(0, slideWidthPx.length - 2);

          let indexCount = i;
          let offset = slideWidth * i;


    sliderInner.style.transform = `translateX(-${offset}px)`;

    currentSlide.textContent = indexCount + 1;
    totalSlide.textContent = transparencySlides.length;

    sliderInner.style.width = 100 * transparencySlides.length + '%';
    sliderInner.style.display = 'flex';
    

    transparencySlides.forEach(slide => {
      slide.style.width = slideWidth;
    });

    

    transparencyLeft.addEventListener('click', () => {
      sliderInner.style.transition = 'transform 0.35s ease-in-out';
      if (offset === 0) {
        offset = slideWidth * (transparencySlides.length - 1) ;
        indexCount = transparencySlides.length - 1;
      } else {
        offset -= +slideWidth;
        indexCount--;
      }
      sliderInner.style.transform = `translateX(-${offset}px)`;
      currentSlide.textContent = indexCount + 1;
      sliderInner.ontransitionend = () =>  sliderInner.style.transition = '';
    })

    transparencyRight.addEventListener('click', () => {
      sliderInner.style.transition = 'transform 0.35s ease-in-out';
      if (offset === slideWidth * (transparencySlides.length - 1)) {
        offset = 0;
        indexCount = 0;
      } else {
        offset += +slideWidth;
        indexCount++;
      }      
      sliderInner.style.transform = `translateX(-${offset}px)`;
      currentSlide.textContent = indexCount + 1;
      sliderInner.ontransitionend = () =>  sliderInner.style.transition = '';     
      
    })
  }


  agreementRow.addEventListener('click', (e) => {
    const target = e.target;
    agreementDiv.forEach((item, index) => {
      if (target && target === item) {
        popupTransparency.style.visibility = 'visible';
        noBodyJump();
        document.addEventListener('click',closeHandler);
        transparencySlider(index);
      }
    })
  });
 };

 const formulaTitles = (mainWrapper, triggerItem, bubble, itemText) => {
  const formulaWrapper = document.querySelector(mainWrapper);
        
        formulaWrapper.onmouseover =  (e) => {
          const target = e.target;
          if(target.closest(triggerItem)) {
            const parent = target.closest(triggerItem);
            const hint = parent.querySelector(bubble);   

            if (parent.classList.contains('formula-item') && parent.closest('.desktop-hide')) {
              parent.style.opacity = 1;
              parent.querySelector('.formula-item__icon-inner').style.background = 'linear-gradient(90deg, #f48922 0%, #ffb015 100%)';
            }

            if (hint.getBoundingClientRect().top <= 0) {     
              const text = parent.querySelector(itemText).clientHeight;
              parent.style.cssText = `
              z-index: 2;
              `;
              hint.classList.add('rotate');
              hint.style.top = `calc(105% + ${text}px)`;
              hint.style.paddingTop = 40 + 'px';
            } else {
              hint.style = '';
              hint.classList.remove('rotate');
            }

            if (hint.getBoundingClientRect().left <=0) {
              console.log(hint.getBoundingClientRect().left);
              hint.style.transform = `translateX(${Math.abs(Math.floor(hint.getBoundingClientRect().left))}px)`;
            
            } else if (hint.getBoundingClientRect().left + hint.clientWidth > window.innerWidth) {
              console.log(324234);
              let distance = window.innerWidth - hint.getBoundingClientRect().left;
              let rest = hint.clientWidth - distance;
              hint.style.transform = `translateX(-${rest}px)`;
            }
          hint.style.visibility = 'visible';
          hint.style.opacity = 1;
          
          
          
          };
        }
        
        formulaWrapper.onmouseout =  (e) => {
          const target = e.target;
          if(target.closest(triggerItem)) {
            const parent = target.closest(triggerItem);
            const hint = parent.querySelector(bubble);
            hint.style = '';
            parent.style = '';
          }
          
        }




 };


  formulaTitles('.formula .wrapper_small', '.formula-item', '.formula-item-popup', '.formula-item__descr');
  formulaTitles('.formula .desktop-hide .formula-slider', '.desktop-hide .formula-item', '.desktop-hide .formula-item-popup', '.desktop-hide .formula-item__descr');
  formulaTitles('.problems .wrapper_middle', '.problems-item', '.problems-item-popup', '.problems-item__descr');
  reviewsSlider('.reviews-slider-wrap', '.reviews-slider', '.reviews-slider__outer', '.reviews-slider__slide', 'reviews-arrow_left', 'reviews-arrow_right');
  reviewsSlider('.problems .wrapper_small',  '.problems-slider', '.problems-slider-wrap','.problems-slider__slide', 'problems-arrow_left', 'problems-arrow_right', 'active-item');
  agreementFancybox();
  consultPopup();
  phoneAccordeon();
  sideMenu();
  repairTypesModal();
  privacyPopup();
  tabs();
  accordeon();
  phoneValidation();
  formSend();
  carouselSlider();

});