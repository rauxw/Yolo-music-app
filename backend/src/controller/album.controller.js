import albumModel from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumModel.find();
    return res.status(200).json(albums);
  } catch (error) {
    console.log(`Error in album getAllAlbums: ${error}`);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findById(id).populate("songs");
    if (!album) {
      return res.status(200).json({ message: "Album not found" });
    }
  } catch (error) {
    console.log(`Error in album getAlbumById: ${error}`);
    next(error);
  }
};
