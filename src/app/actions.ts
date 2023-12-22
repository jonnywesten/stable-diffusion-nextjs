'use server'
import axios, {RawAxiosRequestHeaders} from "axios";

/*
styles:
3d-model analog-film anime cinematic comic-book digital-art enhance fantasy-art isometric line-art low-poly modeling-compound neon-punk origami photographic pixel-art tile-texture
 */
export async function callGenerate(prompt: string) {
    const token = process.env.WIZMODEL_TOKEN
    const url = "https://api.wizmodel.com/v1/predictions"
    const payload = {
        "version": "7d229e3ed5d01c879622d0cd273572260b7e35103d6765af740f853b160d04b7",
        input: {
            prompt,
            steps: 25,
            width: 512,
            height: 512,
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    } as RawAxiosRequestHeaders

    const start = new Date()
    const response = await axios.post(url, payload, {headers})
    const end = new Date()
    console.log(response);
    console.log(`Duration: ${(end.getTime() - start.getTime()) / 1000}s`);
    return response?.data;
}