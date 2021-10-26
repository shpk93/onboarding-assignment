"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      // 관계설정은 index.js에서 적용하였습니다.
    }
  }

  post.init(
    {
      post: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
