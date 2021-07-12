const categorias = require("./categorias");
const pcs = require("./pcs");

const basedatos = {
	listaCategorias: function() {
		let retorna = [];
		for(var i = 0; i < categorias.length; i++) {
			let varRetorno = {};
			varRetorno['categoria'] = categorias[i].nombre;
			retorna.push(varRetorno);
		}
		return retorna;
	},
	marcasPorCategoria: function(categ) {
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(pcs[i].categoria == categ) {
				let estara = 0;
				for(var n = 0; n < retorna.length; n++) {
					if(pcs[i].marca.toUpperCase().indexOf(retorna[n].marca.toUpperCase()) >= 0) {
						estara = 1;
					}
				}
				if(estara == 0) {
					var varRetorno = {};
					varRetorno['marca'] = pcs[i].marca.toUpperCase();
					retorna.push(varRetorno);
				}
			}
		}
		return retorna;
	},
	procesadorPorCategoriaMarca: function(categ, marco) {
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(pcs[i].categoria == categ && pcs[i].marca.toUpperCase().indexOf(marco) >= 0){
				let esta = 0;
				for(var n = 0; n < retorna.length; n++) {
					if(retorna[n].procesador.toUpperCase() == pcs[i].procesador.toUpperCase()) {
						esta = 1;
					}
				}
				if(esta == 0) {
					var varRetorno = {};
					varRetorno['procesador'] = pcs[i].procesador.toUpperCase();
					retorna.push(varRetorno);
				}
			}
		}
		return retorna;
	},
	ramPorCategoriaMarcaProcesador: function(categ, marco, procesad) {
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(pcs[i].categoria == categ && pcs[i].marca.toUpperCase().indexOf(marco) >= 0 && pcs[i].procesador.toUpperCase().indexOf(procesad) >= 0){
				let esta = 0;
				for(var n = 0; n < retorna.length; n++) {
					if(retorna[n].ram.toUpperCase() == pcs[i].ram.toUpperCase()) {
						esta = 1;
					}
				}
				if(esta == 0) {
					var varRetorno = {};
					varRetorno['ram'] = pcs[i].ram.toUpperCase();
					retorna.push(varRetorno);
				}
			}
		}
		return retorna;
	},
	discoPorCategoriaMarcaProcesadorRam: function(categ, marco, procesad, rama) {
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(pcs[i].categoria == categ && pcs[i].marca.toUpperCase().indexOf(marco) >= 0 && pcs[i].procesador.toUpperCase().indexOf(procesad) >= 0 && pcs[i].ram.toUpperCase().indexOf(rama) >= 0){
				let esta = 0;
				for(var n = 0; n < retorna.length; n++) {
					if(retorna[n].disco.toUpperCase() == pcs[i].disco.toUpperCase()) {
						esta = 1;
					}
				}
				if(esta == 0) {
					var varRetorno = {};
					varRetorno['disco'] = pcs[i].disco.toUpperCase();
					retorna.push(varRetorno);
				}
			}
		}
		return retorna;
	},
	equiposPorCategoria: function(categ) {
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(pcs[i].categoria === categ) {
				var varRetorno = {};
				varRetorno['marca'] = pcs[i].marca;
				varRetorno['modelo'] = pcs[i].modelo;
				varRetorno['pantalla'] = pcs[i].pantalla;
				varRetorno['resolucion'] = pcs[i].resolucion;
				varRetorno['procesador'] = pcs[i].procesador;
				varRetorno['procesadores'] = pcs[i].procesadores;
				varRetorno['ram'] = pcs[i].ram;
				varRetorno['memoria'] = pcs[i].memoria;
				varRetorno['disco'] = pcs[i].disco;
				varRetorno['precio'] = pcs[i].precio;
				varRetorno['categoria'] = pcs[i].categoria;
				retorna.push(varRetorno);
			}
		}
		return retorna;
	},
	findByFilter: function(marc, mode, pantall, resolucio, procesado, procesadore, ra, memori, disc, preci, operprecio, categori) {
		//
		let condicion = "";
		// marca
		if(marc.trim().length > 0){
			condicion += "pcs[i].marca.toUpperCase().indexOf('"+marc+"') >= 0";
		}
		// modelo
		if(mode.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].modelo.toUpperCase().indexOf('"+mode+"') >= 0";
		}
		// pantalla
		if(pantall.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].pantalla.toUpperCase().indexOf('"+pantall+"') >= 0";
		}
		// resolucion
		if(resolucio.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].resolucion.toUpperCase().indexOf('"+resolucio+"') >= 0";
		}
		// procesador
		if(procesado.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].procesador.toUpperCase().indexOf('"+procesado+"') >= 0";
		}
		// ram
		if(ra.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].ram.toUpperCase().indexOf('"+ra+"') >= 0";
		}
		// memoria
		if(memori.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].memoria.toUpperCase().indexOf('"+memori+"') >= 0";
		}
		// disco
		if(disc.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].disco.toUpperCase().indexOf('"+disc+"') >= 0";
		}
		// precio
		if(preci > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].precio " + operprecio.trim() + " " + preci;
		}
		// categoria
		if(categori.trim().length > 0){
			let operand = "";
			if(condicion.length > 0) {
				operand = " && ";
			}
			condicion += operand + "pcs[i].categoria.toUpperCase().indexOf('"+categori+"') >= 0";
		}	

//console.log(condicion);

		//let evalua = "if("+condicion+"){"
		let retorna = [];
		for(var i = 0; i < pcs.length; i++) {
			if(eval(condicion)) {
				let varRetorno = {};
				varRetorno['marca'] = pcs[i].marca;
				varRetorno['modelo'] = pcs[i].modelo;
				varRetorno['pantalla'] = pcs[i].pantalla;
				varRetorno['resolucion'] = pcs[i].resolucion;
				varRetorno['procesador'] = pcs[i].procesador;
				varRetorno['procesadores'] = pcs[i].procesadores;
				varRetorno['ram'] = pcs[i].ram;
				varRetorno['memoria'] = pcs[i].memoria;
				varRetorno['disco'] = pcs[i].disco;
				varRetorno['precio'] = pcs[i].precio;
				varRetorno['categoria'] = pcs[i].categoria;
				retorna.push(varRetorno);
			}
		}
		return retorna;
	}


	/*findByTag: function(tag) {
		let retorna = [];
		for(var i = 0; i < book.length; i++) {
			if(book[i].title.indexOf(tag) >= 0) {
				let varRetorno = {};
				varRetorno['title'] = book[i].title;
				varRetorno['subtitle'] = book[i].subtitle;
				varRetorno['authors'] = book[i].authors;
				varRetorno['publisher'] = book[i].publisher;
				varRetorno['publishedDate'] = book[i].publishedDate;
				varRetorno['description'] = book[i].description;
				varRetorno['pageCount'] = book[i].pageCount;
				varRetorno['language'] = book[i].language;
				varRetorno['amount'] = book[i].amount;
				varRetorno['category'] = book[i].category;
				retorna.push(varRetorno);
			}
		}
		return retorna;
	},
	findByAuthor: function(autho) {
		let retorna = [];
		for(var i = 0; i < book.length; i++) {
			if(book[i].authors.indexOf(autho) >= 0) {
				let varRetorno = {};
				varRetorno['title'] = book[i].title;
				varRetorno['subtitle'] = book[i].subtitle;
				varRetorno['authors'] = book[i].authors;
				varRetorno['publisher'] = book[i].publisher;
				varRetorno['publishedDate'] = book[i].publishedDate;
				varRetorno['description'] = book[i].description;
				varRetorno['pageCount'] = book[i].pageCount;
				varRetorno['language'] = book[i].language;
				varRetorno['amount'] = book[i].amount;
				varRetorno['category'] = book[i].category;
				retorna.push(varRetorno);
			}
		}
		return retorna;
	},
	*/
};

module.exports = basedatos;