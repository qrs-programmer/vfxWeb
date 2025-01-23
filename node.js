const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));

require('dotenv').config();
const API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchAllVideos(playlistId, pageToken = '', videos = []) {
  try {
    const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems';
    const response = await axios.get(url, {
      params: {
        part: 'snippet',
        playlistId: playlistId,
        key: API_KEY,
        pageToken: pageToken,
      },
    });

    const { items, nextPageToken } = response.data;
    videos.push(...items);

    if (nextPageToken) {
      // Recursively fetch the next page
      return fetchAllVideos(playlistId, nextPageToken, videos);
    }

    return videos; // Return all videos when done
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos from YouTube API');
  }
}

app.get('/youtube', async (req, res) => {
  const { playlistId } = req.query;
  if (!playlistId) {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  try {
    const videos = await fetchAllVideos(playlistId);
    res.json(videos); // Send all videos to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.get('/', (req, res) => {
    const scrollTo = req.query.scrollTo || null;
    res.render('index', { scrollTo, page: 'index' });
});

app.get('/works', (req, res) => {
    res.render('works', { page: 'works' });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
