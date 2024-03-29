var DataTypes = require("sequelize").DataTypes;
var _ads = require("./ads");
var _bodycheck = require("./bodycheck");
var _certification_auth_request = require("./certification_auth_request");
var _certifications = require("./certifications");
var _comments = require("./comments");
var _community_comments = require("./community_comments");
var _community_posts = require("./community_posts");
var _dailyrequestcounts = require("./dailyrequestcounts");
var _dailytrainercounts = require("./dailytrainercounts");
var _dailyusercounts = require("./dailyusercounts");
var _exercise_routines = require("./exercise_routines");
var _expertises = require("./expertises");
var _feedbacks = require("./feedbacks");
var _master = require("./master");
var _meal_plan = require("./meal_plan");
var _payhistory = require("./payhistory");
var _pt_requests = require("./pt_requests");
var _schedules = require("./schedules");
var _trainer_cert = require("./trainer_cert");
var _trainer_exp = require("./trainer_exp");
var _trainer_manage = require("./trainer_manage");
var _trainer_points = require("./trainer_points");
var _trainer_sign_request = require("./trainer_sign_request");
var _trainers = require("./trainers");
var _user_points = require("./user_points");
var _user_tag = require("./user_tag");
var _users = require("./users");

function initModels(sequelize) {
  var ads = _ads(sequelize, DataTypes);
  var bodycheck = _bodycheck(sequelize, DataTypes);
  var certification_auth_request = _certification_auth_request(sequelize, DataTypes);
  var certifications = _certifications(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var community_comments = _community_comments(sequelize, DataTypes);
  var community_posts = _community_posts(sequelize, DataTypes);
  var dailyrequestcounts = _dailyrequestcounts(sequelize, DataTypes);
  var dailytrainercounts = _dailytrainercounts(sequelize, DataTypes);
  var dailyusercounts = _dailyusercounts(sequelize, DataTypes);
  var exercise_routines = _exercise_routines(sequelize, DataTypes);
  var expertises = _expertises(sequelize, DataTypes);
  var feedbacks = _feedbacks(sequelize, DataTypes);
  var master = _master(sequelize, DataTypes);
  var meal_plan = _meal_plan(sequelize, DataTypes);
  var payhistory = _payhistory(sequelize, DataTypes);
  var pt_requests = _pt_requests(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var trainer_cert = _trainer_cert(sequelize, DataTypes);
  var trainer_exp = _trainer_exp(sequelize, DataTypes);
  var trainer_manage = _trainer_manage(sequelize, DataTypes);
  var trainer_points = _trainer_points(sequelize, DataTypes);
  var trainer_sign_request = _trainer_sign_request(sequelize, DataTypes);
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
  pt_requests.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(pt_requests, { as: "pt_requests", foreignKey: "user_id"});
  trainer_manage.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(trainer_manage, { as: "trainer_manages", foreignKey: "user_id"});

  return {
    ads,
    bodycheck,
    certification_auth_request,
    certifications,
    comments,
    community_comments,
    community_posts,
    dailyrequestcounts,
    dailytrainercounts,
    dailyusercounts,
    exercise_routines,
    expertises,
    feedbacks,
    master,
    meal_plan,
    payhistory,
    pt_requests,
    schedules,
    trainer_cert,
    trainer_exp,
    trainer_manage,
    trainer_points,
    trainer_sign_request,
    trainers,
    user_points,
    user_tag,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
