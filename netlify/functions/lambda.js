export async function handler(event) {
    const data = await response.json();

    const pass = (body) => {
        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    };

    return pass(data);
}