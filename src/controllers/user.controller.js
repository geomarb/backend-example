const { userService } = require("../services");

exports.get = async (_req, res) => res.send(await userService.getAll());

exports.getOne = async (req, res) =>
  res.json(await userService.findById(req.params.id));

exports.getCurrent = async (req, res) =>
  res.json(await userService.findById(req.userId));

exports.create = async (req, res) =>
  res.json(await userService.create(req.body));

exports.update = async (req, res) =>
  res.json(await userService.update(req.params.id, req.body));

exports.delete = async (req, res) =>
  res.json(await userService.delete(req.params.id, req.body));

exports.updatePassword = async (req, res) =>
  res.json(await userService.updatePassword(req.params.id, req.body));
