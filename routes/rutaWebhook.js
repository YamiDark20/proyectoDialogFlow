const express = require("express");
require("dotenv").config();

const { WebhookClient } = require("dialogflow-fulfillment");

// mis datos de computadoras
const basedatos = require("../data/basedatos");
 
const app = express();

app.get("/", async (req, res) => {
  res.send('<iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/72cea465-2ac4-46c9-9670-df63127350d8"></iframe>');
});

// Webhook
app.post("/miwebhook", express.json(), async (req, res) => {
  const agent = new WebhookClient({ request:req, response:res });

  function iniPedidofallback(agent) {
    agent.add(`No te entendi. Deseas una laptop o un pc de escritorio?`);
  }

  function tipoPedidofallback(agent) {
    const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
    const misMarcas = basedatos.marcasPorCategoria(catego);
    let tempMarcas = "";
    for(var i = 0; i < misMarcas.length; i++) {
      if(i == 0) {
        tempMarcas = misMarcas[i].marca;
      } else {
        tempMarcas += (", " + misMarcas[i].marca);
      }
    }
    agent.add(`No te entendi. Tenemos de las marcas: ${tempMarcas}. Cual te interesa?`);
  }

  function marcaPedido_customfallback(agent) {
    const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','','',0,'','','',0,'',catego);
    if(opciones.length == 1) {
      agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
      const misProcesadores = basedatos.procesadorPorCategoriaMarca(catego, marca);
      let tempProcesa = "";
      for(var i = 0; i < misProcesadores.length; i++) {
        if(i == 0) {
          tempProcesa = misProcesadores[i].procesador;
        } else {
          tempProcesa += (", " + misProcesadores[i].procesador);
        }
      }
      agent.add(`No te entendi. Tenemos equipos con los procesadores: ${tempProcesa}. Cual te interesa?`);
    }
  }

  function procesadorPedido_customfallback(agent) {
    const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
    const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const procesad = agent.contexts[0].parameters['procesador.original'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','',procesad,0,'','','',0,'',catego);
    if(opciones.length == 1) {
      agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
      const misRAM = basedatos.ramPorCategoriaMarcaProcesador(catego, marca, procesad);
      let tempRAM = "";
      for(var i = 0; i < misRAM.length; i++) {
        if(i == 0) {
          tempRAM = misRAM[i].ram;
        } else {
          tempRAM += (", " + misRAM[i].ram);
        }
      }
      agent.add(`No te entendi. Tenemos equipos con ${tempRAM} de memoria RAM. Cual prefieres?`);
    }
  }

  function ramPedido_customfallback(agent) {
    const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
    const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const procesad = agent.contexts[0].parameters['procesador.original'].toUpperCase();
    const ram = agent.contexts[0].parameters['ram.original'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','',procesad,0,ram,'','',0,'',catego);
    if(opciones.length == 1) {
      agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
      const misDiscos = basedatos.discoPorCategoriaMarcaProcesadorRam(catego, marca, procesad, ram);
      let tempDiscos = "";
      for(var i = 0; i < misDiscos.length; i++) {
        if(i == 0) {
          tempDiscos = misDiscos[i].disco;
        } else {
          tempDiscos += (", " + misDiscos[i].disco);
        }
      }
      agent.add(`Tenemos equipos con disco duro de ${tempDiscos}. Cual te gusta?`);
    }
  }

  //
 
  function tipoPedido_custom(agent) {
    const catego = agent.parameters.pedidopc[0].computador.toUpperCase();
    const misMarcas = basedatos.marcasPorCategoria(catego);
    let tempMarcas = "";
    for(var i = 0; i < misMarcas.length; i++) {
      if(i == 0) {
        tempMarcas = misMarcas[i].marca;
      } else {
        tempMarcas += (", " + misMarcas[i].marca);
      }
    }
    agent.add(`Tenemos de las marcas: ${tempMarcas}. Cual te interesa?`);
  }

  function marcaPedido_custom(agent) {
  	const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','','',0,'','','',0,'',catego);
    if(opciones.length == 1) {
    	agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
    	const misProcesadores = basedatos.procesadorPorCategoriaMarca(catego, marca);
    	let tempProcesa = "";
    	for(var i = 0; i < misProcesadores.length; i++) {
    		if(i == 0) {
    			tempProcesa = misProcesadores[i].procesador;
    		} else {
    			tempProcesa += (", " + misProcesadores[i].procesador);
    		}
    	}
    	agent.add(`Tenemos equipos con los procesadores: ${tempProcesa}. Cual te interesa?`);
    }
  }

  function procesadorPedido_custom(agent) {
  	const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
  	const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const procesad = agent.contexts[0].parameters['procesador.original'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','',procesad,0,'','','',0,'',catego);
    if(opciones.length == 1) {
    	agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
    	const misRAM = basedatos.ramPorCategoriaMarcaProcesador(catego, marca, procesad);
    	let tempRAM = "";
    	for(var i = 0; i < misRAM.length; i++) {
    		if(i == 0) {
    			tempRAM = misRAM[i].ram;
    		} else {
    			tempRAM += (", " + misRAM[i].ram);
    		}
    	}
    	agent.add(`Tenemos equipos con ${tempRAM} de memoria RAM. Cual prefieres?`);
    }
  }

  function ramPedido_custom(agent) {
  	const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
  	const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const procesad = agent.contexts[0].parameters['procesador.original'].toUpperCase();
    const ram = agent.contexts[0].parameters['ram.original'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','',procesad,0,ram,'','',0,'',catego);
    if(opciones.length == 1) {
    	agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } else {
    	const misDiscos = basedatos.discoPorCategoriaMarcaProcesadorRam(catego, marca, procesad, ram);
    	let tempDiscos = "";
    	for(var i = 0; i < misDiscos.length; i++) {
    		if(i == 0) {
    			tempDiscos = misDiscos[i].disco;
    		} else {
    			tempDiscos += (", " + misDiscos[i].disco);
    		}
    	}
    	agent.add(`Tenemos equipos con disco duro de ${tempDiscos}. Cual te gusta?`);
    }
  }

  function discoPedido_custom(agent) {
  	const catego = agent.contexts[0].parameters.pedidopc[0]['computador'].toUpperCase();
  	const marca = agent.contexts[0].parameters['marca.original'].toUpperCase();
    const procesad = agent.contexts[0].parameters['procesador.original'].toUpperCase();
    const ram = agent.contexts[0].parameters['ram.original'].toUpperCase();
    const disc = agent.contexts[0].parameters['disco.original'].toUpperCase();
    const opciones = basedatos.findByFilter(marca,'','','',procesad,0,ram,'',disc,0,'',catego);
    if(opciones.length == 1) {
    	agent.add(`Tenemos una ${opciones[0].marca} con procesador ${opciones[0].procesador} ${opciones[0].ram} de memoria RAM, disco de ${opciones[0].disco} y un costo de ${opciones[0].precio.toFixed(2)} US. La quieres?`);
    } 
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('iniPedido - fallback', iniPedidofallback);
  intentMap.set('tipoPedido_custom - fallback', tipoPedidofallback);
  intentMap.set('marcaPedido_custom - fallback', marcaPedido_customfallback);
  intentMap.set('procesadorPedido_custom - fallback', procesadorPedido_customfallback);
  intentMap.set('ramPedido_custom - fallback', ramPedido_customfallback);
  //
  intentMap.set('tipoPedido_custom', tipoPedido_custom);
  intentMap.set('marcaPedido_custom', marcaPedido_custom);
  intentMap.set('procesadorPedido_custom', procesadorPedido_custom);
  intentMap.set('ramPedido_custom', ramPedido_custom);
  intentMap.set('discoPedido_custom', discoPedido_custom);
  agent.handleRequest(intentMap);
});

module.exports = app;
