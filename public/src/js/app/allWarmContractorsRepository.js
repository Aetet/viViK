define([
    'backbone'
], function (Backbone) {
    'use strict';

    var WarmContractorModel = Backbone.Model.extend({
        defaults: {
            contractorName: '',
            defaultContactName: '',
            defaultContactPhone: '',
            lastContractExpiredAt: '',
            lastContractName: '',
            specificationGroup: '',
            login: '',
            password: '',
            totalIncome: ''
        }
    });

    var WarmContractors = Backbone.Collection.extend({
        model: WarmContractorModel,
        url:   '/warm-contractors'
    });

    var WarmContractorRepository = function () {};

    WarmContractorRepository.prototype.find = function () {
        return new WarmContractors();
    };

    WarmContractorRepository.prototype.fetchContractors = function (criteria, success) {
        var contractors = new WarmContractors();

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

    return new WarmContractorRepository();
});
