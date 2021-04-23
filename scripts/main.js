document.addEventListener('DOMContentLoaded', () => {

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

  tabs();
  accordeon();

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

    return scrollWidth;
  }

  const privacyPopup = () => {
    const privacy = document.querySelector('.link-privacy'),
          privacyPopup = document.querySelector('.popup-privacy'),
          privacClose = privacyPopup.querySelector('.close');
    
  
    privacy.addEventListener('click', () =>{
      privacyPopup.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = noBodyJump() + 'px';
    });
    privacClose.addEventListener('click', () =>{
      privacyPopup.style.visibility = 'hidden';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    });
  };
  privacyPopup();
});