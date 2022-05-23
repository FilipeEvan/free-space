(function () {
    (async function () {
        const response = await api("random?min=0&max=4&count=1");
		console.log(response)
        desenhaCirculo(response[0], 4);
    })();
    async function api(rota, type = "GET") {
        const rotaBase = "http://www.randomnumberapi.com/api/v1.0";
        const config = {};
        const response = await fetch(`${rotaBase}/${rota}`, config);
        return response.json();
    }
    async function desenhaCirculo(ocupados, total) {
        const circle = document.getElementById("bar");
        const cont = document.getElementById("cont");
        const ocupadas = document.getElementById("ocupadas");
		const livres = document.getElementById("livres");

        let progresso = (ocupados / total) * 100;

        if (isNaN(progresso)) {
            progresso = 100;
            return this;
        }

        const r = circle.getAttribute("r");
        const c = Math.PI * (r * 2);

        if (progresso < 0) progresso = 0;
        if (progresso > 100) progresso = 100;

        const pct = ((100 - progresso) / 100) * c;

		ocupadas.innerText = `${progresso}%`;
		livres.innerText = `${100 - progresso}%`;
        circle.style.strokeDashoffset = pct;
        cont.setAttribute("data-info", `${ocupados} / ${total}`);

        return this;
    }
})();
