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

  const privacyPopup = () => {
    const privacy = document.querySelectorAll('.link-privacy'),
          privacyPopup = document.querySelector('.popup-privacy'),
          privacClose = privacyPopup.querySelector('.close');
    
  
    privacy.forEach(item => {
      item.addEventListener('click', () =>{
        privacyPopup.style.visibility = 'visible';
        noBodyJump();
      });
    })
    privacClose.addEventListener('click', () =>{
      privacyPopup.style.visibility = 'hidden';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    });
  };

  phoneAccordeon();
  sideMenu();
  privacyPopup();
  tabs();
  accordeon();

});