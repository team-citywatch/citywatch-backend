import Axios, { AxiosInstance } from "axios";
import * as constants from "./constants";

export class What3Words {
    private static client: AxiosInstance = Axios.create({
        baseURL: 'http://https://api.what3words.com/v2',
        timeout: 10000,
        headers: {
            'X-Api-Key': constants.WHAT3WORDS_API_KEY
        }
    });

    public static forward = async (words: string) => {
        return What3Words.client.get(`/forward?addr=${words}`)
            .then(resp => resp);
    }

    public static reverse = (lat: number, lng: number) => {
        return What3Words.client.get(`/reverse?coords=${lat},${lng}`)
            .then(resp => resp);
    }
}