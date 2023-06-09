const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'trainers',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    certification_s3_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'certifications',
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
        name: "trainer_id",
        using: "BTREE",
        fields: [
          { name: "trainer_id" },
        ]
      },
    ]
  });
};
