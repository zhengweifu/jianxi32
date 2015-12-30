define(function (require) {
    var THREE = require("./libs/three.js");

    var JXScriptManager = function () {
        this.scripts = {};
    };

    JXScriptManager.prototype = {

        read: function (json_list) {

            var json, script;

            for (var i in json_list) {

                json = json_list[i];

                script = {

                    name : json_list['name'],

                    context : json_list['context']

                };

                this.scripts[json.uuid] = script;

            }
        },

        write: function () {
            var result = [];
            var script;

            for(var each in this.scripts) {
                script = {
                    uuid: "",
                    name: "",
                    context: ""
                };
                script["uuid"] = each;
                script["name"] = this.scripts[each]["name"];
                script["context"] = this.scripts[each]["context"];

                result.push(script);
            }

            return result;
        }
    };

    return JXScriptManager;

});