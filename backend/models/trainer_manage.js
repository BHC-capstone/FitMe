const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'trainer_manage',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_exercise_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      last_feedback_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      total_pt_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      remain_pt_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      manage_memo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'trainer_manage',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    },
  );
};
