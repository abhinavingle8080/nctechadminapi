const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Payment extends Model {
    static associate(models) {
      // Define associations here
      Payment.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student',
      });
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      payment_method: {
        type: DataTypes.ENUM('Cash', 'Online', 'Cheque'),
        allowNull: false,
      },
      paid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      due_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM('Completed', 'Pending', 'Failed'),
        allowNull: false,
      },
      invoice_number: {
        type: DataTypes.STRING(50),
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'Student',
    });
    Payment.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'Course',
    });
  };

  return Payment;
};
