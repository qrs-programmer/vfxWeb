let allVideos = [];

function getVideos() {
    const playlistId = 'PLodur4raO6cVjg_SsqDkc7TNupyHNUi_N';
  
    fetch(`/youtube?playlistId=${playlistId}`)
      .then((result) => result.json())
      .then((data) => {
        allVideos.push(...data);
        displayVideos(); // Render all fetched videos
      })
      .catch((error) => console.error('Error fetching videos:', error));
}

function displayVideos() {
    const grid = document.querySelector("#video-grid");
    grid.innerHTML = "";

    allVideos.forEach((video) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card">
                <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank"><img src="${video.snippet.thumbnails.high.url}" alt="Video Thumbnail"></a>
                <div class="card-body">
                    <h4>${video.snippet.title}</h4>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}


window.onload = () => {
    getVideos();
};
console.log(allVideos);
