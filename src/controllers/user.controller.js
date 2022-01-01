const { userService } = require("../services");

exports.createOne = async (req, res) =>
  res.json(await userService.createOne(req.body));

exports.findAll = async (req, res) =>
  res.send(await userService.findAll(req.currentUser, req.currentUser.id));

exports.findById = async (req, res) =>
  res.json(await userService.findById(req.currentUser, req.params.id));

exports.getCurrent = async (req, res) =>
  res.json(await userService.findById(req.currentUser, req.currentUser.id));

exports.updateOne = async (req, res) =>
  res.json(
    await userService.updateOne(req.currentUser, req.params.id, req.body)
  );

exports.updateCurrent = async (req, res) =>
  res.json(
    await userService.updateOne(req.currentUser, req.currentUser.id, req.body)
  );

exports.deleteOne = async (req, res) =>
  res.json(
    await userService.deleteOne(req.currentUser, req.params.id, req.body)
  );

exports.updatePassword = async (req, res) =>
  res.json(
    await userService.updatePassword(req.currentUser, req.params.id, req.body)
  );

exports.updateMyPassword = async (req, res) =>
  res.json(
    await userService.updatePassword(
      req.currentUser,
      req.currentUser.id,
      req.body
    )
  );
