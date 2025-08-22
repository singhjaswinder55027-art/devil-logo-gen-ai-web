document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('image-form');
    const promptInput = document.getElementById('prompt-input');
    const loader = document.getElementById('loader');
    const resultSection = document.getElementById('result-section');
    const imageContainer = document.getElementById('image-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = promptInput.value;

        if (!prompt) {
            alert('Please enter a prompt.');
            return;
        }

        // Show loader and hide previous result
        loader.classList.remove('hidden');
        resultSection.classList.add('hidden');
        imageContainer.innerHTML = '';

        try {
            // Call our backend to get the image URL
            const response = await fetch(`/generate-image?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Create and display the image
            const imgElement = document.createElement('img');
            imgElement.src = data.image_url;
            imgElement.alt = prompt;

            const downloadOverlay = document.createElement('div');
            downloadOverlay.className = 'download-overlay';
            downloadOverlay.innerHTML = '<i class="fas fa-download"></i> Download';
            
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(downloadOverlay);

            // Add click listener for download
            imageContainer.onclick = () => {
                downloadImage(data.image_url, prompt);
            };

            // Show the result
            resultSection.classList.remove('hidden');

        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            // Hide loader
            loader.classList.add('hidden');
        }
    });

    // Function to trigger image download
    const downloadImage = async (imageUrl, prompt) => {
        try {
            // Fetch the image as a blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            // Create a temporary link to download the blob
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            const safePrompt = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20);
            link.download = `${safePrompt}_by_devil_loots.jpg`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Download failed:', error);
            // As a fallback, open the image in a new tab
            window.open(imageUrl, '_blank');
        }
    };
});
