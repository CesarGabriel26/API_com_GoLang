package main

import (
	"encoding/json"
	"fmt"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"io/ioutil"
	"strconv"
)

type Car struct {
	ID    int
	Name  string
	Price float64
}

var Cars []Car

func main() {
	err := loadCarsFromFile()
	if err != nil {
		fmt.Println("Erro ao carregar carros do arquivo:", err)
	}

	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/GetCar", getCars)
	e.GET("/GetCar/:id", getCarByID)
	e.POST("/SetCar", setCars)
	e.Logger.Fatal(e.Start(":8080"))
}

func getCars(c echo.Context) error {
	return c.JSON(200, Cars)
}

func getCarByID(c echo.Context) error {
	carID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(200, map[string]string{"error": "Invalid ID"})
	}

	if carID >= 0 && carID < len(Cars) {
		return c.JSON(200, Cars[carID])
	}

	return c.JSON(200, map[string]string{"error": "Car not found"})
}

func setCars(c echo.Context) error {
	car := new(Car)

	if err := c.Bind(car); err != nil {
		return err
	}

	Cars = append(Cars, *car)

	// Salvar os carros em um arquivo JSON
	saveCarsToFile()

	return c.JSON(200, Cars)
}

func saveCarsToFile() error {
	jsonData, err := json.Marshal(Cars)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile("cars.json", jsonData, 0644)
	return err
}

func loadCarsFromFile() error {
	jsonData, err := ioutil.ReadFile("cars.json")
	if err != nil {
		return err
	}

	err = json.Unmarshal(jsonData, &Cars)
	return err
}
