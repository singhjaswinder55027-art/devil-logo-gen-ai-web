document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const loadingDiv = document.getElementById('loading');
    const imageContainer = document.getElementById('image-container');
    const generatedImage = document.getElementById('generated-image');
    const downloadBtn = document.getElementById('download-btn');

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value;
        if (!prompt) {
            alert('Please enter a description for the image.');
            return;
        }

        loadingDiv.classList.remove('hidden');
        imageContainer.classList.add('hidden');

        try {
            const response = await fetch(`/generate?prompt=${encodeURIComponent(prompt)}`);
            if (!response.ok) {
                throw new Error('Image generation failed.');
            }
            
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            generatedImage.src = imageUrl;
            downloadBtn.href = imageUrl;
            
            imageContainer.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while generating the image.');
        } finally {
            loadingDiv.classList.add('hidden');
        }
    });
});
