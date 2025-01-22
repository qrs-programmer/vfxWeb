function getCurrentBreakpoint() {
    if (document.getElementById('breakpoint-xs').offsetParent !== null) {
        return 'xs'; // Extra small screens
    } else if (document.getElementById('breakpoint-sm').offsetParent !== null) {
        return 'sm'; // Small screens
    } else if (document.getElementById('breakpoint-md').offsetParent !== null) {
        return 'md'; // Medium screens
    } else if (document.getElementById('breakpoint-lg').offsetParent !== null) {
        return 'lg'; // Large screens
    } else {
        return 'xl'; // Extra large screens
    }
}

function videoVisibility() {
    const bannerVideo = document.getElementById('banner-video');
    const worksVideo = document.getElementById('works-video');
    
    const scrollPosition = window.scrollY;

    const breakpoint = getCurrentBreakpoint();
    let yThreshold;

    switch (breakpoint) {
        case 'md': 
            yThreshold = 2200;
            break;
        default:
            yThreshold = 750;
            break;
    }

    // Define the ranges for each video
    if (scrollPosition < yThreshold) { // Show banner video
        bannerVideo.style.display = 'block';
        worksVideo.style.display = 'none';
    } else { // Show works video
        bannerVideo.style.display = 'none';
        worksVideo.style.display = 'block';
    } 
}



function adjustAboutSectionHeight() {

    const breakpoint = getCurrentBreakpoint();

    const aboutSection = document.getElementById('about');
    const worksSection = document.getElementById('works');
    const textLogo = document.getElementById('text-logo');
    const logo = document.getElementById('logo-loop');
    const sectionContent = document.querySelectorAll('p.section-content');
    const sectionSubHeader = document.querySelectorAll('p.sub-title');

    switch (breakpoint) {
        case 'md': 
            {
                sectionContent.forEach(function(sectionContent) {
                    sectionContent.style.fontSize = '1.2vh'; 
                });

                sectionSubHeader.forEach(function(sectionSubHeader) {
                    sectionSubHeader.style.fontSize = '3.4vh'; 
                });

                textLogo.style.paddingTop = '75%';
                textLogo.style.transform = 'scale(1.5)';

                logo.style.transform = 'scale(3.4)';
                logo.style.paddingTop = '15%';
               
                worksSection.style.paddingTop = '75%';

                aboutSection.style.height = '100vh'; 
                aboutSection.style.paddingTop = '45%';
                aboutSection.style.paddingBottom = '35%';
            }
            break;
        default:
            {}
            break;
    }
  } 

  function chooseMedia() {
    const worksMedia = document.getElementById('works-video');
    const bannerMedia = document.getElementById('banner-video');

    const breakpoint = getCurrentBreakpoint();
    
    switch (breakpoint) {
        case 'md':
            {
                worksMedia.innerHTML = `
                    <img src="/images/photoBackground2.jpeg" alt="Photo Background" id="works-banner">
                `;

                bannerMedia.innerHTML = `
                    <img src="/images/photoBackground1.jpeg" alt="Photo Background" id="works-banner">
                `;
            }
            break;
        default:
            {
                worksMedia.innerHTML = `
                    <video autoplay muted loop id="works-banner">
                      <source src="images/loopVFX_1.mp4" alt="loop_VFX" type="video/mp4">
                    </video>
                `;

                bannerMedia.innerHTML = `
                    <video autoplay muted loop id="vfx-banner">
                        <source src="/images/loopVFX.mp4" type="video/mp4">
                    </video>
                `;
            }
            break;
    }
  }

  window.addEventListener('load', videoVisibility); // Display videos on load
  window.addEventListener('scroll', videoVisibility); // Handle video display on scroll

  window.addEventListener('resize', adjustAboutSectionHeight);
  document.addEventListener('DOMContentLoaded', adjustAboutSectionHeight);

  window.addEventListener('resize', chooseMedia);
  document.addEventListener('DOMContentLoaded', chooseMedia);

