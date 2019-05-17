const _ = require('lodash');

const algorithmManager = require('./algorithmManager'),
    geneticAlgorithm = require('./algorithmHandler');

const geneticAlgorithmTest = () => {
    return geneticAlgorithm.startAlgorithm()
        .then((result) => {
            return _.map(result, (snapShot) => {
                return _.map(snapShot, snap => {
                    return {
                        actualDate: snap.actualDate,
                        name: snap.name
                    }
                });
            });
        });
}

module.exports = {
    initCronJob: algorithmManager.initCronJob,
    getNextAlgorithmRunDate: algorithmManager.getNextAlgorithmRunDate,
    forceRunGeneticAlgorithm: algorithmManager.forceRunGeneticAlgorithm,
    greedyAlgorithm: algorithmManager.greedyAlgorithm,
    geneticAlgorithmTest,
    geneticAlgorithmData: geneticAlgorithm.getAlgorithmData
}