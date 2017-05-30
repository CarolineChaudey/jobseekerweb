const bluebird = require('bluebird');
var mysql = require('pg');
var Sequelize = require('sequelize');
const path = './entities/';

module.exports = (server) => {

    // config de la connexion
    server.connection = new Sequelize('service', 'dev', 'azerty', {
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
        Company:          require(path + 'Company')(server),
        Application:      require(path + 'Application')(server),
        ContractType:     require(path + 'ContractType')(server),
        Letter:           require(path + 'Letter')(server),
        Resume:           require(path + 'Resume')(server),
        Seeker:           require(path + 'Seeker')(server),
        Supervisor:       require(path + 'Supervisor')(server),
        Tag:              require(path + 'Tag')(server),
        Website:          require(path + 'Website')(server)
    }
    console.log('Models created.');


    // un chercheur a un superviseur
    server.models.Seeker.belongsTo(server.models.Supervisor, {as: 'supervisor'});
    // un supervisor appartient à une entreprise
    server.models.Supervisor.belongsTo(server.models.Company, {as: 'company'});
    // un chercheur a plusieurs modeles de lettres ...
    server.models.Letter.belongsTo(server.models.Seeker, {as: 'seeker'});
    // ... et plusieurs CV
    server.models.Resume.belongsTo(server.models.Seeker, {as: 'seeker'});
    // un chercheur peut déposer plusieurs candidatures qui lui sont propres
    server.models.Application.belongsTo(server.models.Seeker, {as: 'seeker'});
    // la candidature comprend une modèle de lettre utilisé ...
    server.models.Application.belongsTo(server.models.Letter, {as: 'letter'});
    // ... et un CV
    server.models.Application.belongsTo(server.models.Resume, {as: 'resume'});
    // la candidature concerne une annonce
    server.models.Application.belongsTo(server.models.Ad, {as: 'ad'});
    // L'annonce provient d'une entreprise
    server.models.Ad.belongsTo(server.models.Company, {as: 'company'});
    // L'annonce a été postée sur un site
    server.models.Ad.belongsTo(server.models.Website, {as: 'website'});
    // une annonce a plusieurs tags
    server.models.Ad.belongsToMany(server.models.Tag, {through: 'TagAd'});
    server.models.Tag.belongsToMany(server.models.Ad, {through: 'TagAd'});
    // un chercheur a des sites web préférés
    server.models.Seeker.belongsToMany(server.models.Website, {through: 'FavoriteWebsite'});
    server.models.Website.belongsToMany(server.models.Seeker, {through: 'FavoriteWebsite'});
    // un chercheur a des tags preferes
    server.models.Seeker.belongsToMany(server.models.Tag, {through: 'FavoriteTags'});
    server.models.Tag.belongsToMany(server.models.Seeker, {through: 'FavoriteTags'});
    // un seeker a des contrats préférés
    server.models.Seeker.belongsToMany(server.models.ContractType, {through: 'FavoriteContract'});
    server.models.ContractType.belongsToMany(server.models.Seeker, {through: 'FavoriteContract'});
    // une annonce peurt proposer jusqu'à plusieurs types de contrats
    server.models.Ad.belongsToMany(server.models.ContractType, {through: 'ProposedContracts'});
    server.models.ContractType.belongsToMany(server.models.Ad, {through: 'ProposedContracts'});


    server.connection.sync().then(function() {
      console.log('Server sync successfuly');
    });
};
