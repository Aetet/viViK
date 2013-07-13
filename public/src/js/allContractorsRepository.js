define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AllContractorModel = Backbone.Model.extend({
        defaults: {
            contractorName: '',
            defaultContactName: '',
            defaultContactPhone: '',
            lastContractExpiredAt: '',
            lastContractName: '',
            specificationGroup: '',
            login: '',
            password: ''
        }
    });

    var AllContractors = Backbone.Collection.extend({
        model: AllContractorModel,
        url:   '/all-contractors'
    });

    var AllContractorRepository = function () {};

    AllContractorRepository.prototype.find = function () {
        return new AllContractors();
    };

    AllContractorRepository.prototype.fetchContractors = function (criteria, success) {
        var contractors = new AllContractors();

        if (criteria.length) {
            contractors.fetch({
                success: success,
                data: {
                    criteria: criteria
                }
            });
        } else {
            contractors.reset();
        }

        return contractors;
    };

    return new AllContractorRepository();
});
