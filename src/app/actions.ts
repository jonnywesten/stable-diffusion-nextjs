'use server'
import axios, {RawAxiosRequestHeaders} from "axios";
/*
styles:
3d-model analog-film anime cinematic comic-book digital-art enhance fantasy-art isometric line-art low-poly modeling-compound neon-punk origami photographic pixel-art tile-texture
 */
export async function callGenerate(prompt: string) {
    const token = process.env.WIZMODEL_TOKEN
    const url = "https://api.wizmodel.com/sdapi/v1/txt2img"
    const payload = {
        prompt,
        steps: 15,
        height: 512,
        width: 512
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    } as RawAxiosRequestHeaders


    const start = new Date()
    const response = await axios.post(url, payload, {headers})
    const end = new Date()
    console.log(`Duration: ${(end.getTime() - start.getTime()) / 1000}s`);

    return response?.data;
}