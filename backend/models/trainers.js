const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    career: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review_avg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    s3_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trainer_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trainers',
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
