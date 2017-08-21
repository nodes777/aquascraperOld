var require = patchRequire(require);
exports.changeDropDowns = function(fish){
    $('select[name="category"]').val(fish).change();
    $('select[name="DAYS"]').val('30').change();
}
