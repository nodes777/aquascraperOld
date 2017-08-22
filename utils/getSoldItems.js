var require = patchRequire(require);

exports.getSoldItems = function(arrOfObjs){
		var soldItems = arrOfObjs.filter(function(fishSale){
			if(fishSale.reserveMet === "Yes"){
				console.log(fishSale.reserveMet);
				return true;
			} else { 
				return false;
			}
		});
		return soldItems;
}