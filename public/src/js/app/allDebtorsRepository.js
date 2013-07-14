define([
    'backbone'
], function (Backbone) {
    'use strict';

    var DebtorModel = Backbone.Model.extend({
        defaults: {
            contractorName: '',
            defaultContactName: '',
            defaultContactPhone: '',
            debt: '',
            login: '',
            password: ''
        }
    });

    var Debtors = Backbone.Collection.extend({
        model: DebtorModel,
        url:   '/debtors'
    });

    var DebtorRepository = function () {};

    DebtorRepository.prototype.find = function () {
        return new Debtors();
    };

    DebtorRepository.prototype.fetchContractors = function (criteria, success) {
        var contractors = new Debtors();

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

    return new DebtorRepository();
});
