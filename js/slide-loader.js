(async () => {

    const fetchSlides = () => {
        const countSlides = 5;
        const slides = [];

        const requests = [];
        for (let i = 1; i <= countSlides; i++) {
            const request = fetch(`slides/slide.${i}.html`).then(response => {
                return response.text();
            }).then(slideContent => {
                slides[i] = slideContent;        
            });

            requests.push(request);
        }

        Promise.all(requests).then(() => {
            slides.forEach(slideContent => Reveal.add(slideContent));
            Reveal.sync();
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        });
    }

    Reveal.addEventListener('ready', function (event) {
        Reveal.add = function (content = '', index = -1) {
            const dom = {};

                dom.slides = document.querySelector('.reveal .slides');
            var newSlide = document.createElement('section');
            if (index === -1) { //adding slide to end
                newSlide.classList.add('future');
                dom.slides.appendChild(newSlide);
                document.querySelector('.navigate-right').classList.add('enabled');
            } else if (index > Reveal.getIndices().h) {
                newSlide.classList.add('future');
                dom.slides.insertBefore(newSlide, dom.slides.querySelectorAll('section:nth-child(' + (index + 1) + ')')[0]);
            } else if (index <= Reveal.getIndices().h) {
                newSlide.classList.add('past');
                dom.slides.insertBefore(newSlide, dom.slides.querySelectorAll('section:nth-child(' + (index + 1) + ')')[0]);
                Reveal.next();
            }
            newSlide.innerHTML = content;
        };

        fetchSlides();
    });

})();