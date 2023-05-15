const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exercise_routines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'schedules',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    set_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exercise_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_video_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    guide_video_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'exercise_routines',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "schedule_id",
        using: "BTREE",
        fields: [
          { name: "schedule_id" },
        ]
      },
    ]
  });
};
