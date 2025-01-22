//Banner Content Opacity Animation On Load
window.onload = function() {
    if (document.getElementById('banner-text1') && document.getElementById('banner-text1')) {
        document.getElementById('banner-text1').style.visibility = 'visible';
        document.getElementById('banner-text1').style.opacity = '.85';
    }
    
};

//Sub-Titles Opacity Animation
const obsOpacity = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add('show');
        else
            entry.target.classList.remove('show');
    });
});

const subTitles = document.querySelectorAll('.hidden');
subTitles.forEach((element) => obsOpacity.observe(element));

// Anchor Links Scroll Animation

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        e.preventDefault(); // Prevents from jumping to link

        const targetId = this.getAttribute('href').substring(1); //Extracts # from anchor link
        const targetElement = document.getElementById(targetId); //Finds element through targetId

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});
