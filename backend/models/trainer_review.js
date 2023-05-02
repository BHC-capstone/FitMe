const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainer_review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review: {
<<<<<<< HEAD
      type: DataTypes.TEXT,
      allowNull: true
    },
    review_point: {
=======
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review_avg: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    review_cnt: {
>>>>>>> db63c381c0cd1d9cb453303281ed2b429108fba4
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trainer_review',
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
