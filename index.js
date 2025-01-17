async function getData() {
    const response = await fetch("https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);

    const cities = [];
    const populations = [];

    rows.forEach((row) => {
        const cols = row.split(",");
        const cityName = cols[0];
        const population = parseInt(cols[1]);

        if (cityName && !isNaN(population)) {
            cities.push(cityName);
            populations.push(population);
        }
    });

    return { cities, populations };
}

async function createChart() {
    const { cities, populations } = await getData();
    const ctx = document.getElementById("populationChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: cities.slice(0, 10), // Limit to 10 cities for readability
            datasets: [{
                label: "Population",
                data: populations.slice(0, 10),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Population of Cities",
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Population"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Cities"
                    }
                }
            }
        }
    });
}

createChart();
