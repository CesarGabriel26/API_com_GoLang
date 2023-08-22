async function getCarList() {
        const response = await fetch('https://aprendendo-go.alphafox2.repl.co/GetCar');

        if (response.ok) {
            const cars = await response.json();
            const carListDiv = document.getElementById('carList');
            carListDiv.textContent = JSON.stringify(cars, null, 2);
        } else {
            console.error('Falha ao obter a lista de carros.');
        }
    }

document.getElementById('addCarButton').addEventListener('click', async () => {

    const newCar = {
        ID: 1,
        Name: "ÑovoCarro",
        Price: 300,
    };

    const response = await fetch('https://aprendendo-go.alphafox2.repl.co/SetCar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    });

    if (response.ok) {
        getCarList(); // Chama a função para atualizar a lista de carros após adicionar um novo carro
    } else {
        console.error('Falha ao adicionar o novo carro.');
    }
});

document.getElementById('GetCarId0').addEventListener('click', async () => {

    const response = await fetch('https://aprendendo-go.alphafox2.repl.co/GetCar/0');

        if (response.ok) {
            const cars = await response.json();
            const carListDiv = document.getElementById('carList');
            carListDiv.textContent = JSON.stringify(cars, null, 2);
        } else {
            console.error('Falha ao obter a lista de carros.');
        }
});

document.getElementById('GetAllCars').addEventListener('click', async () => {
    getCarList();
});