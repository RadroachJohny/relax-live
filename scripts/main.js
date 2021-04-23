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

  const repaitTypesModal = () => {
    const popupTrigger = document.querySelectorAll('.repair-popup'),
          popupModal = document.querySelector('.popup-repair-types');

    popupTrigger.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        console.log('clicking');
        if (trigger.closest('.popup-dialog-menu')) {
          console.log('menu');
          document.querySelector('.popup-dialog-menu').classList.remove('active');
          popupModal.style.visibility = 'visible';
          noBodyJump();
          document.addEventListener('click',closeHandler);
        }
        popupModal.style.visibility = 'visible';
        noBodyJump();
        document.addEventListener('click',closeHandler);
      });
    });

    function toggleRepairMenu() {
      
      
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
  }

  const clearBodyLock = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

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
    
  }

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
  }

  const reviewsSlider = () => {
    const sliderWrap = document.querySelector('.reviews-slider-wrap'),
          sliderContainer = sliderWrap.querySelector('.reviews-slider'),
          slides = sliderWrap.querySelectorAll('.reviews-slider__slide');

          console.log(sliderWrap);
          console.log(sliderContainer);
          console.log(slides);
  };


  reviewsSlider();
  consultPopup();
  phoneAccordeon();
  sideMenu();
  repaitTypesModal();
  privacyPopup();
  tabs();
  accordeon();
  phoneValidation();
  formSend();

});