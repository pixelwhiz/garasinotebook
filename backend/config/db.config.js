module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "garasinotebook",
    DIALECT: "mysql",
    PORT: 33361,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};
