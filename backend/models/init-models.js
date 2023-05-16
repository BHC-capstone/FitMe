var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");
var _bodycheck = require("./bodycheck");
var _certifications = require("./certifications");
var _community_comments = require("./community_comments");
var _community_posts = require("./community_posts");
var _exercise_routines = require("./exercise_routines");
var _expertises = require("./expertises");
var _feedbacks = require("./feedbacks");
var _meal_plan = require("./meal_plan");
var _pt_requests = require("./pt_requests");
var _schedules = require("./schedules");
var _trainer_cert = require("./trainer_cert");
var _trainer_exp = require("./trainer_exp");
var _trainer_manage = require("./trainer_manage");
var _trainer_points = require("./trainer_points");
var _trainer_review = require("./trainer_review");
var _trainers = require("./trainers");
var _user_points = require("./user_points");
var _user_tag = require("./user_tag");
var _users = require("./users");

function initModels(sequelize) {
  var ads = _ads(sequelize, DataTypes);
  var bodycheck = _bodycheck(sequelize, DataTypes);
  var certifications = _certifications(sequelize, DataTypes);
  var community_comments = _community_comments(sequelize, DataTypes);
  var community_posts = _community_posts(sequelize, DataTypes);
  var exercise_routines = _exercise_routines(sequelize, DataTypes);
  var expertises = _expertises(sequelize, DataTypes);
  var feedbacks = _feedbacks(sequelize, DataTypes);
  var meal_plan = _meal_plan(sequelize, DataTypes);
  var pt_requests = _pt_requests(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var trainer_cert = _trainer_cert(sequelize, DataTypes);
  var trainer_exp = _trainer_exp(sequelize, DataTypes);
  var trainer_manage = _trainer_manage(sequelize, DataTypes);
  var trainer_points = _trainer_points(sequelize, DataTypes);
  var trainer_review = _trainer_review(sequelize, DataTypes);
  var trainers = _trainers(sequelize, DataTypes);
  var user_points = _user_points(sequelize, DataTypes);
  var user_tag = _user_tag(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  trainer_cert.belongsTo(certifications, { as: "certification", foreignKey: "certification_id"});
  certifications.hasMany(trainer_cert, { as: "trainer_certs", foreignKey: "certification_id"});
  exercise_routines.belongsTo(schedules, { as: "schedule", foreignKey: "schedule_id"});
  schedules.hasMany(exercise_routines, { as: "exercise_routines", foreignKey: "schedule_id"});
  certifications.belongsTo(trainers, { as: "trainer", foreignKey: "trainer_id"});
  trainers.hasMany(certifications, { as: "certifications", foreignKey: "trainer_id"});
  trainer_manage.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(trainer_manage, { as: "trainer_manages", foreignKey: "user_id"});

  return {
    ads,
    bodycheck,
    certifications,
    community_comments,
    community_posts,
    exercise_routines,
    expertises,
    feedbacks,
    meal_plan,
    pt_requests,
    schedules,
    trainer_cert,
    trainer_exp,
    trainer_manage,
    trainer_points,
    trainer_review,
    trainers,
    user_points,
    user_tag,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
