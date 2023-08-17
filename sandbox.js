window.addEventListener('load', async (event) => {
        const dogImages = []; // Array to store fetched dog images
        let currentIndex = -1; // Current index of displayed image

        try {
            async function fetchDogImage() {
                const url = 'https://dog.ceo/api/breeds/image/random';
                const response = await fetch(url);
                const data = await response.json();
                return data.message;
            }

            async function updateImage() {
                const dogImg = document.querySelector('#dog');
                dogImg.src = dogImages[currentIndex];
            }

            // Fetch initial image and add to the array
            dogImages.push(await fetchDogImage());
            currentIndex = 0;
            updateImage();

            // Add event listeners to chevron buttons
            const previousButton = document.querySelector('.previous');
            const nextButton = document.querySelector('.next');

            previousButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + dogImages.length) % dogImages.length;
                updateImage();
            });

            nextButton.addEventListener('click', async () => {
                if (currentIndex === dogImages.length - 1) {
                    // Fetch a new image if there are no more images in the array
                    dogImages.push(await fetchDogImage());
                }
                currentIndex = (currentIndex + 1) % dogImages.length;
                updateImage();
            });
        } catch (err) {
            console.log(err);
        }
    });






