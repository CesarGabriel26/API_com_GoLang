var Cars = []
const carList = document.getElementById('carList');

async function getCarList() {
        const response = await fetch('https://aprendendo-go.alphafox2.repl.co/GetCar');

        if (response.ok) {
            const cars = await response.json();
            const carListDiv = document.getElementById('carList');
            Cars = cars
            carListDiv.textContent = JSON.stringify(Cars, null, 2);
        } else {
            console.error('Falha ao obter a lista de carros.');
        }
    }

document.getElementById('addCarButton').addEventListener('click', async () => {

    var CarPrice = document.getElementById('Carprice').value
    var CarName = document.getElementById('CarName').value

    const response = await fetch('https://aprendendo-go.alphafox2.repl.co/SetCar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: CarName,
            Price: Number(CarPrice)
        })
    });

    if (response.ok) {
        getCarList(); // Chama a função para atualizar a lista de carros após adicionar um novo carro
    } else {
        console.error('Falha ao adicionar o novo carro.');
        console.log(newCar)
    }
});

document.getElementById('GetCarId0').addEventListener('click', async () => {

    var CardId = document.getElementById('CarId').value

    if (CardId == null || CardId == " "){
        console.error("Digite um Id")
        return
    }

    const response = await fetch(`https://aprendendo-go.alphafox2.repl.co/GetCar/${CardId}`);

        if (response.ok) {
            const cars = await response.json();
            
            carList.textContent = JSON.stringify(cars, null, 2);
        } else {
            console.error('Falha ao obter a lista de carros.');
        }
});

document.getElementById('GetAllCars').addEventListener('click', async () => {
    getCarList();
});