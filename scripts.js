document.addEventListener("DOMContentLoaded", function() {
    const categoryLinks = document.querySelectorAll("#category-list a");
    const videoGrid = document.getElementById("video-grid");
    const noContentDiv = document.getElementById("no-content");

    function setupCategoryLinks() {
        categoryLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                categoryLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                const categoryId = this.dataset.id;
                fetchVideos(categoryId);
            });
        });
    }

    async function fetchVideos(categoryId) {
        const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            videoGrid.innerHTML = '';

            if (data.data && data.data.length > 0) {
                data.data.forEach(video => {
                    const videoItem = document.createElement("div");
                    videoItem.className = "video-item";
                    videoItem.innerHTML = `
                        <img src="${video.thumbnail}" alt="Video Thumbnail">
                        <div class="video-info">
                            <h3>${video.title}</h3>
                            <p>${video.creator} - ${video.views} views - ${video.timestamp}</p>
                        </div>
                    `;
                    videoGrid.appendChild(videoItem);
                });
                noContentDiv.style.display = "none";
            } else {
                noContentDiv.style.display = "block";
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            noContentDiv.style.display = "block";
        }
    }

    setupCategoryLinks();
    // Fetch videos for the "All" category by default
    fetchVideos('1000');
});
