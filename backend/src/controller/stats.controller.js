import songModel from "../models/song.model.js";
import userModel from "../models/user.model.js";
import albumModel from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = Promise.all([
      songModel.countDocuments(),
      userModel.countDocuments(),
      albumModel.countDocuments(),

      songModel.aggregate([
        {
          $unionWith: { coll: "albums", pipeline: [] },
        },
        { $group: { _id: artist } },
        { $count: "count" },
      ]),
    ]); // optimized version to run program
    return res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtist: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log(`Error in stats getStats: ${error}`);
    next(error);
  }
};
