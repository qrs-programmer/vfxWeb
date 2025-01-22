let nextPageToken = "";
let allVideos = [];

function getVideos() {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLodur4raO6cVjg_SsqDkc7TNupyHNUi_N&key=AIzaSyDGKV0QwhhZ13fByJsGyJdTb5e_9VCpM0o&pageToken=${nextPageToken}`;
    
    fetch(url)
        .then((result) => result.json())
        .then((data) => {
            allVideos.push(...data.items);

            nextPageToken = data.nextPageToken;

            if (nextPageToken) {
                getVideos();
            } else {
                displayVideos();
            }
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