let Sequelize = require('sequelize');
let mySqlConfig = {
	'host': 'localhost',    // 主机名
	'port': '3306',         // 端口号，MySQL默认3306
	'database': 'movie',   // 使用哪个数据库
	'user': 'root',         // 用户名
	'password': '123456',   // 口令	
};

let sequelize = new Sequelize(
    mySqlConfig.database,
    mySqlConfig.user,
    mySqlConfig.password, {
        dialect: 'mysql',
        host: mySqlConfig.host,
        port: mySqlConfig.port
	},
	
);

let message = sequelize.define('message',{
  id: {
    type: Sequelize.SMALLINT,
    primaryKey: true
  },
	movieId: Sequelize.INTEGER,
	title: Sequelize.STRING,
  msg: Sequelize.STRING,
  name: Sequelize.STRING,
  time: Sequelize.STRING
  },{      
    freezeTableName: true,      // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 'message',       // 数据库表名   
    timestamps: false,          // 是否自动添加时间戳createAt，updateAt    
    underscored: true           // 字段以下划线（_）来分割（默认是驼峰命名风格）
});

let user = sequelize.define('user',{
    id: {
      type: Sequelize.SMALLINT,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        is: {
          args: ["^[a-z0-9]+$",'i'],
          msg: '用户名只允许字母和数字'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [6,20],
          msg: '长度需在6-20字符之间'
        }
      }
    }
  },{      
    freezeTableName: true,      // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
    tableName: 'user',       // 数据库表名     
    underscored: true,           // 字段以下划线（_）来分割（默认是驼峰命名风格）
    timestamps: true,
    updatedAt: false
});


module.exports = {
  message : message,
  user: user
}