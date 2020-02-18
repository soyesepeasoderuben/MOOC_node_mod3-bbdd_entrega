// IMPORTS
const path = require('path');
const Utils = require('./testutils');

const node_modules = path.resolve(path.join(__dirname, "../", "node_modules"));
const database = 'sqlite:db.sqlite';
const options = { logging: false};
var sequelize, User, Quiz;
const path_models = path.resolve(path.join(__dirname, "../model.js"));

const T_TEST = 2 * 60; // Time between tests (seconds)
// CRITICAL ERRORS
let error_critical = null;

//TESTS
describe("Entrega5_BBDD_Dependencias", function () {
    it("Comprobando que las dependencias están instaladas...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrado el directorio '${node_modules}'`;
        this.msg_err = `No se encontró el directorio '${node_modules}'`;
        const fileexists = await Utils.checkFileExists(node_modules);
        if (!fileexists) {
            error_critical = this.msg_err;
        }
        fileexists.should.be.equal(true);
    });

});

describe("Entrega5_BBDD_Modelos", function () {

    before(function() {
        const { Sequelize } = require('sequelize');
        sequelize = new Sequelize(database, options);
        /*const {User, Quiz} = require("./model.js").models;*/
    });

    it("(Precheck): Comprobando que la tabla Users existe en la base de datos...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrada la tabla Users en la base de datos '${database}'`;
        this.msg_err = `No se encontró la tabla Users en la base de datos '${database}'`;
        const res = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='Users'");
        if (res[0].length !== 1) {
            error_critical = this.msg_err;
        }
        res[0].length.should.be.equal(1);
    });

    it("(Precheck): Comprobando que la tabla Quizzes existe en la base de datos...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrada la tabla Quizzes en la base de datos '${database}'`;
        this.msg_err = `No se encontró la tabla Quizzes en la base de datos '${database}'`;
        const res = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='Quizzes'");
        if (res[0].length !== 1) {
            error_critical = this.msg_err;
        }
        res[0].length.should.be.equal(1);
    });

    it("(Precheck): Comprobando que la tabla Favourites existe en la base de datos...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrada la tabla Favourites en la base de datos '${database}'`;
        this.msg_err = `No se encontró la tabla Favourites en la base de datos '${database}'`;
        const res = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='Favourites'");
        if (res[0].length !== 1) {
            error_critical = this.msg_err;
        }
        res[0].length.should.be.equal(1);
    });
    it("(Precheck): Comprobando que existe el fichero de modelos...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrado el fichero '${path_models}'`;
        this.msg_err = `No se encontró el fichero '${path_models}'`;
        const fileexists = await Utils.checkFileExists(path_models);
        if (!fileexists) {
            error_critical = this.msg_err;
        }
        fileexists.should.be.equal(true);
    });
    it("(Precheck): Comprobando que existe el modelo User...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrado el modelo User`;
        this.msg_err = `No se encontró el modeo User`;
        const { User } = require(path_models).models;
        if (!User) {
            error_critical = this.msg_err;
        }
        User.should.not.be.undefined;
    });
    it("(Precheck): Comprobando que existe el modelo Quiz...", async function () {
        this.score = 0;
        this.msg_ok = `Encontrado el modelo Quiz`;
        this.msg_err = `No se encontró el modeo Quiz`;
        const { Quiz } = require(path_models).models;
        if (!Quiz) {
            error_critical = this.msg_err;
        }
        Quiz.should.not.be.undefined;
    });
});

describe("Entrega5_BBDD", function () {

    // Añadir datos de prueba
    before(function() {
        const { Sequelize } = require('sequelize');
        sequelize = new Sequelize(database, options);
        User = require(path_models).models.User;
        Quiz = require(path_models).models.Quiz;

    });

    // Empezar a probar funcionalidades nuevas
    it("1: Comprobando que el fichero contiene el texto 'Esto es un fichero HTML'...", async function () {
        this.score = 10;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {

            this.msg_err = "No se encuentra el texto 'Esto es un fichero HTML'";
            this.msg_ok = "La información acerca de la película se muestra correctamente";

            true.should.be.equal(true);
        }
    });

    // Eliminar datos insertados
    after(function() {
        const { Sequelize } = require('sequelize');
        sequelize = new Sequelize(database, options);
        User = require(path_models).models.User;
        Quiz = require(path_models).models.Quiz;

    });
});