module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define('device', {
    email: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false
    },
    os: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false
    },
    model: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    token: {
      type: Sequelize.STRING(300),
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE
    },
  })
  return Device
}
