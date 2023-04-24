var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");
var _calender = require("./calender");
var _certifications = require("./certifications");
var _community_comments = require("./community_comments");
var _community_posts = require("./community_posts");
var _exercise_routines = require("./exercise_routines");
var _expertises = require("./expertises");
var _feedbacks = require("./feedbacks");
var _meal_plan = require("./meal_plan");
var _points = require("./points");
var _pt_reservations = require("./pt_reservations");
var _schedules = require("./schedules");
var _sequelizemeta = require("./sequelizemeta");
var _sessions = require("./sessions");
var _trainer_cert = require("./trainer_cert");
var _trainer_exp = require("./trainer_exp");
var _trainers = require("./trainers");
var _users = require("./users");

function initModels(sequelize) {
  var ads = _ads(sequelize, DataTypes);
  var calender = _calender(sequelize, DataTypes);
  var certifications = _certifications(sequelize, DataTypes);
  var community_comments = _community_comments(sequelize, DataTypes);
  var community_posts = _community_posts(sequelize, DataTypes);
  var exercise_routines = _exercise_routines(sequelize, DataTypes);
  var expertises = _expertises(sequelize, DataTypes);
  var feedbacks = _feedbacks(sequelize, DataTypes);
  var meal_plan = _meal_plan(sequelize, DataTypes);
  var points = _points(sequelize, DataTypes);
  var pt_reservations = _pt_reservations(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var trainer_cert = _trainer_cert(sequelize, DataTypes);
  var trainer_exp = _trainer_exp(sequelize, DataTypes);
  var trainers = _trainers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    ads,
    calender,
    certifications,
    community_comments,
    community_posts,
    exercise_routines,
    expertises,
    feedbacks,
    meal_plan,
    points,
    pt_reservations,
    schedules,
    sequelizemeta,
    sessions,
    trainer_cert,
    trainer_exp,
    trainers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
