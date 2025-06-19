import songModel from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // -1 Descending => new to old
    // 1 Ascending => old to new
    const songs = await songModel.find().sort({ createdAt: -1 });
    return res.json(songs);
  } catch (error) {
    console.log(`Error in song getAllSongs: ${error}`);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    //fetch random 6 songs with mongo aggregation pipeline
    const songs = await songModel.aggregate([
      {
        $sample: { size: 6 },
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    return res.json(songs);
  } catch (error) {
    console.log(`Error in song getFeaturedSongs: ${error}`);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    //fetch random 4 songs with mongo aggregation pipeline
    const songs = await songModel.aggregate([
      {
        $sample: { size: 4 },
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    return res.json(songs);
  } catch (error) {
    console.log(`Error in song getMadeForYouSongs: ${error}`);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    //fetch random 4 songs with mongo aggregation pipeline
    const songs = await songModel.aggregate([
      {
        $sample: { size: 4 },
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    return res.json(songs);
  } catch (error) {
    console.log(`Error in song getMadeForYouSongs: ${error}`);
    next(error);
  }
};
