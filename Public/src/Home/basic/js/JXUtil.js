define(function(require) {
    var JXUtil = {};

    JXUtil.openFile = function(file, onLoad) {
        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {
            if(onLoad) {
                onLoad(this.result);
            }
        };
    };

    return JXUtil;
});
