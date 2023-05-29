const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal_plan', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    breakfast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lunch: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dinner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    breakfast_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lunch_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dinner_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'meal_plan',
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
    ]
  });
};
