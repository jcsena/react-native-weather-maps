//@flow

var apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=4ebc2bb47a61290b0b346a4c26ebc942';

var kelvinToC = (kelvin: number): string =>  Math.round(kelvin - 273.15) + ' °C';
var capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);


module.exports = {

apiWeather(latitude:number, longitude: number):Promise<fetch>{
            var url = `${apiUrl}&lat=${latitude}&lon=${longitude}`;

            return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                return {
                    city: json.name,
                    temp : kelvinToC(json.main.temp),
                    description: capitalize(json.weather[0].description)
                }
            });
    }
};
