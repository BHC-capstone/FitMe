const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD:backend/models/adminstatistics.js
  return sequelize.define('adminstatistics', {
=======
  return sequelize.define('AdminStatistics', {
>>>>>>> jaehyun:backend/models/AdminStatistics.js
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    trainer_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pt_request_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
<<<<<<< HEAD:backend/models/adminstatistics.js
    tableName: 'adminstatistics',
=======
    tableName: 'AdminStatistics',
>>>>>>> jaehyun:backend/models/AdminStatistics.js
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
