const axios = require('axios');
const cheerio = require('cheerio');
let now;
let arrayNow;
let horaAtual;

//testar o projeto as 11:59 ou as 23:59 ou alterar os valores da condicional do if

function getDollar() {
	axios.get('https://economia.uol.com.br/cotacoes/').then((res) => {
		//com apenas o código abaixo traria o html completo da página
		//console.log(res.data);

		const $ = cheerio.load(res.data);
		//aqui eu pego o primeiro elemento que possuir a classe primeiroGrafico e busco o ultimo elemento filho deste
		//que será o h3 contendo o valor do dollar
		const pickDollar = $('.primeiroGrafico')
			.children()
			.last()
			.html();
		console.log(pickDollar);
	});
}

function verificar() {
	now = new Date().toString();
	//formatando manualmente a data apenas para hora e minuto
	arrayNow = now.split('2020');
	arrayNow = arrayNow[1].toString().split('GMT');
	horaAtual = arrayNow[0];
	horaAtual = horaAtual.split(':');
	horaAtual = horaAtual[0].concat(':').concat(horaAtual[1]);
	console.log(now);

	if (
		horaAtual.trim() === '00:00' ||
		horaAtual.trim() === '12:00'
	) {
		//irá chamar o método para buscar o dolar sempre ao meio dia e meia noite
		getDollar();
	} else {
		//não fará nada... por enquanto
	}
}

//tempo exato em milisegundos para 1 hora, irá checar de hora em hora
setInterval(verificar, 3600000);
