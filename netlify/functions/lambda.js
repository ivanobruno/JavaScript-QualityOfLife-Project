export async function handler(event) {
    const API_URL = process.env.API_URL;

    const response = await fetch(`endpoint/parameters&API_KEY=${API_URL}`);
    const data = await response.json();

    const pass = (body) => {
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    };

    return pass(data);
}