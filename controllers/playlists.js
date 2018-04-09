const Playlist = require('../models/playlist');

function indexRoute(req,res,next){
  Playlist.find()
    .then(playlists => res.json(playlists))
    .catch(next);
}

function showRoute(req,res,next){
  Playlist.findById(req.params.id)
    .populate('owner', 'followers')
    .then(playlist => res.json(playlist))
    .catch(next);
}

function createRoute(req,res,next){
  Playlist.create(req.body)
    .then(playlist => res.status(201).json(playlist))
    .catch(next);
}

function updateRoute(req,res,next){
  Playlist.findById(req.params.id)
    .then(playlist => Object.assign(playlist, req.body))
    .then(playlist => playlist.save())
    .then(playlist => res.json(playlist))
    .catch(next);
}

function deleteRoute(req,res,next){
  Playlist.findById(req.params.id)
    .then(playlist => playlist.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function followersCreateRoute(req,res,next){
  Playlist.findById(req.params.id)
    .then(playlist => {
      playlist.followers = playlist.followers.concat(req.body.params.user);
      return playlist.save();
    })
    .then(playlist => res.json(playlist))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  followersCreate: followersCreateRoute
};
