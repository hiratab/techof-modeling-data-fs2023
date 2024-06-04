require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const GenderModel = require('./models/Gender');
const SeasonModel = require('./models/Season');
const EpisodeModel = require('./models/Episode');
const AnimeModel = require('./models/Anime');

const { MONGODB_CONNECTION_URI } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);

    const anime = await AnimeModel.find({}).populate([
      {
        path: 'gender'
      }, 
      {
        path: 'season',
        populate: 'episode'
      }]);
    // console.log(anime.toString());
    console.log(anime[0].season.toString());
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
})();
