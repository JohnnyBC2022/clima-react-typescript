import axios from "axios"
import { z } from 'zod'
//import {object, string, number, parse} from 'valibot';
import { SearchType } from "../types"
import { useState } from "react"

// TYPE GUARD O ASSERTION: es mucho mejor que castear pero si es una API en la que tenemos que utilizar muchos objetos, no va a ser fácil de mantener
// unknow en Typescript es un tipo que sirve para representar un valor cuyo tipo se desconoce
/* function isWeatherResponse(weather: unknown) : weather is Weather{
    return (
        Boolean(weather) &&
        typeof weather === 'object' &&
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.feels_like === 'number' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number'
    )
} */

// Zod

const Weather = z.object({
    name: z.string(),
    main: z.object({
        feels_like: z.number(),
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})
// En Zod aunque tengamos definido los types que hemos creado en nuestro hook, tenemos que crear un schema de este modo

type Weather = z.infer<typeof Weather>

// Valibot
/* const WeatherSchema = object({
    name: string(),
    main: object({
        feels_like: number(),
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})

type Weather = typeof WeatherSchema.type; */

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            feels_like: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        }
    })

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},{search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // Castear el type (es la menos recomenda para trabajar con apis)
            //const {data: weatherResult} = await axios<Weather>(weatherUrl)
            //console.log(weatherResult.main.feels_like)

            //Type Guards
            /* const {data: weatherResult} = await axios(weatherUrl)
            const result = isWeatherResponse(weatherResult)
            if(result) {
                console.log(weatherResult.name)
            } else {
                console.log('respuesta mal formada')
            } */

            // Zod (Ventajas de zod: El código es muy sencillo de implementar y por si solo es capaz de de verificar que la respuesta obtenida cumpla con el esquema que hayamos definido. Desventaja: No es modular, por lo que tenemos que recurrir a distintos imports en distintos archivos)

            const { data: weatherResult } = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult) // este safeParse hace lo mismo que los TypeGuards

            if (result.success) {
                setWeather(result.data)
            } else {
                console.log('respuesta mal formada')
            }

            // Valibot

            /*  const {data: weatherResult} = await axios(weatherUrl)
                 const result = parse(WeatherSchema, weatherResult)
                 if(result){
                     console.log(result.name)
                 } */

        } catch (error) {
            console.log(error)
        }
    }

    return {
        weather,
        fetchWeather
    }
}