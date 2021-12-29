import axios from "axios";
const API_HOST_HEADER = process.env.API_HOST_HEADER
const API_HOST_KEY = process.env.API_KEY_HEADER

export const BASE_URL = "https://bayut.p.rapidapi.com"

export const fetchAPI = async (url, params={}) => {
    const {data} = await axios.get(url, {
        params: params,
        headers: {
            'x-rapidapi-host': API_HOST_HEADER,
            'x-rapidapi-key': API_HOST_KEY
        }
    },)
    return data
}

export const URL = (...args) => {
    let url = `${BASE_URL}/`
    for (let each of args){
        url += each
    }
    return url
}

