(function () {
    (async function () {
        const response = await api("random?min=0&max=4&count=1");

        desenhaCirculo(response[0], 4);

        const data = new Date();
        const fakeDate = data.setMinutes(data.getMinutes() - 10);
        desenhaLista([
            {
                nome: "A1",
                time: fakeDate,
                status: "Ocupado",
            },
            {
                nome: "A2",
                time: null,
                status: "Liberado",
            },
        ]);
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
    async function desenhaLista(vagas) {
        const ul = document.getElementsByClassName("vagas")[0];

        vagas.forEach((vaga) => {
            const li = document.createElement("li");

            const nome = document.createElement("p");
            nome.innerText = vaga.nome;
            li.appendChild(nome);

            if (vaga.time !== null) {
                const time = document.createElement("p");
                const iconTime = '<i class="fa-solid fa-clock"></i>';

                setInterval(() => {
                    const diffTime = Math.abs(new Date() - vaga.time);
                    const minutes = Math.floor(diffTime / (1000 * 60));
                    const segundos = String(
                        Math.floor(diffTime / 1000 - minutes * 60)
                    );

                    time.innerHTML = `${iconTime} ${minutes}:${segundos.padStart(
                        2,
                        "0"
                    )}`;
                });

                li.appendChild(time);
            }

            const status = document.createElement("p");
            const style = vaga.status.toLowerCase();
            const iconStatus = `<i class="fa-solid fa-circle-check ${style}"></i>`;
            status.innerHTML = `${iconStatus} ${vaga.status}`;
            li.appendChild(status);

            ul.appendChild(li);
        });
    }
})();
