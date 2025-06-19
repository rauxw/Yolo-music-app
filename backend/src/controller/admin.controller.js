import albumModel from "../models/album.model.js";
import songModel from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: auto,
    });
    return result.secure_url;
  } catch (error) {
    console.log(`Error in uploadCloudinary`, error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new songModel({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // if song belongs to album then update the album's songs array
    if (albumId) {
      await albumModel.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    return res.status(201).json(song);
  } catch (error) {
    console.log(`Error in admin createSong: ${error}`);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await songModel.findById(id);

    //if song belongs to an album, update the songs array
    if (song.albumId) {
      await albumModel.findByIdAndUpdate(song.albumId, {
        $pull: { song: song._id },
      });
    }
    await songModel.findByIdAndDelete(id);
    return res.status(201).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log(`Error in admin deleteSong: ${error}`);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new albumModel({
      title,
      artist,
      imageUrl,
      releaseYear,
    });
    await album.save();

    return res.status(201).json(album);
  } catch (error) {
    console.log(`Error in admin createAlbum: ${error}`);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await songModel.deleteMany({ albumId: id });
    await albumModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log(`Error in admin deleteAlbum: ${error}`);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  return res.status(200).json({ admin: true });
};
