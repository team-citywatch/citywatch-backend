const api = require("@what3words/api");
import * as constants from "./constants";

export class What3Words {
    public static forward = async (words: string) => {
        api.setOptions({key: constants.WHAT3WORDS_API_KEY});
        return await api.convertToCoordinates(words).then((resp: any) => resp);
    }

    public static reverse = async (lat: number, lng: number) => {
        api.setOptions({key: constants.WHAT3WORDS_API_KEY});
        return await api.convertTo3wa({lat, lng}).then((resp: any) => resp);
    }
}