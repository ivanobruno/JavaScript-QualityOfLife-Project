import axios from "axios";
import { cityName } from "../../src/js/dom-elemets";

export async function handler(event) {
    const API_URL = process.env.API_URL;

    const response = await axios.get(API_URL + `slug:${cityName}/scores/`);
    const data = await response.json();

    const pass = (body) => {
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    };

    return pass(data);
}