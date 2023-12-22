'use server'
import axios, {RawAxiosRequestHeaders} from "axios";

export async function callGenerate(prompt: string) {

    const token = process.env.WIZMODEL_TOKEN
    const url = "https://api.wizmodel.com/v1/predictions"
    const payload = {
        "version": "7d229e3ed5d01c879622d0cd273572260b7e35103d6765af740f853b160d04b7",
        input: {
            prompt,
            width: 512,
            height: 512,
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    } as RawAxiosRequestHeaders

    const response = await axios.post(url, payload, {headers})

    return response?.data;
}