const bluebird = require('bluebird');
var mysql = require('pg');
var Sequelize = require('sequelize');
const path = './entities/';

module.exports = (server) => {

    // config de la connexion
    server.connection = new Sequelize('service', 'postgres', 'azerty', {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 1000
      }
    });

    server.models = {
        Ad:               require(path + 'Ad')(server),
        Application:      require(path + 'Application')(server),
        ApplicationState: require(path + 'ApplicationState')(server),
        Company:          require(path + 'Company')(server),
        Contract:         require(path + 'Contract')(server),
        Letter:           require(path + 'Letter')(server),
        Resume:           require(path + 'Resume')(server),
        Seeker:           require(path + 'Seeker')(server),
        Supervisor:       require(path + 'Supervisor')(server),
        Tag:              require(path + 'Tag')(server),
        Website:          require(path + 'Website')(server)
    }
    console.log('Models created.');


    // un chercheur a un superviseur
    server.models.Seeker.belongsTo(server.models.Supervisor);
    server.models.Supervisor.hasMany(server.models.Seeker);
    // un chercheur a plusieurs modeles de lettres ...
    server.models.Letter.belongsTo(server.models.Seeker);
    server.models.Seeker.hasMany(server.models.Letter);
    // ... et plusieurs CV
    server.models.Resume.belongsTo(server.models.Seeker);
    server.models.Seeker.hasMany(server.models.Resume);
    // un chercheur peut déposer plusieurs candidatures qui lui sont propres
    server.models.Application.belongsTo(server.models.Seeker);
    server.models.Seeker.hasMany(server.models.Application);
    // la candidature comprend une modèle de lettre utilisé ...
    server.models.Application.belongsTo(server.models.Letter);
    server.models.Letter.hasMany(server.models.Application);
    // ... et un CV
    server.models.Application.belongsTo(server.models.Resume);
    server.models.Resume.hasMany(server.models.Application);
    // la candidature est dans un état
    server.models.Application.belongsTo(server.models.ApplicationState);
    server.models.ApplicationState.hasMany(server.models.Application);
    // la candidature concerne une annonce
    server.models.Application.belongsTo(server.models.Ad);
    server.models.Ad.hasMany(server.models.Application);
    // L'annonce provient d'une entreprise
    server.models.Ad.belongsTo(server.models.Company);
    server.models.Company.hasMany(server.models.Ad);
    // L'annonce a été postée sur un site
    server.models.Ad.belongsTo(server.models.Website);
    server.models.Website.hasMany(server.models.Ad);
    // une annonce a plusieurs tags
    server.models.Ad.belongsToMany(server.models.Tag, {through: 'TagAd'});
    server.models.Tag.belongsToMany(server.models.Ad, {through: 'TagAd'});
    // un chercheur a des sites web préférés
    server.models.Seeker.belongsToMany(server.models.Website, {through: 'FavoriteWebsite'});
    server.models.Website.belongsToMany(server.models.Seeker, {through: 'FavoriteWebsite'});
    // un seeker a des contrats préférés
    server.models.Seeker.belongsToMany(server.models.Contract, {through: 'FavoriteContract'});
    server.models.Contract.belongsToMany(server.models.Seeker, {through: 'FavoriteContract'});
    // une annonce peurt proposer jusqu'à plusieurs types de contrats
    server.models.Ad.belongsToMany(server.models.Contract, {through: 'ProposedContracts'});
    server.models.Contract.belongsToMany(server.models.Ad, {through: 'ProposedContracts'});


    server.connection.sync().then(function() {
      console.log('Server sync successfuly');
    });
};
