const { userService } = require("../services");

exports.get = async (_req, res) => res.send(await userService.getAll());

exports.findById = async (req, res) =>
  res.json(await userService.findById(req.params.id));

exports.getMe = async (req, res) =>
  res.json(await userService.findById(req.currentUser.id));

exports.createOne = async (req, res) =>
  res.json(await userService.createOne(req.body));

exports.updateOne = async (req, res) =>
  res.json(
    await userService.updateOne(req.currentUser, req.params.id, req.body)
  );

exports.updateMe = async (req, res) =>
  res.json(
    await userService.updateOne(req.currentUser, req.currentUser.id, req.body)
  );

exports.deleteOne = async (req, res) =>
  res.json(await userService.deleteOne(req.params.id, req.body));

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
