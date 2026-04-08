export default async function handler(req, res) {
    const { query } = req.query;
    const API_KEY = process.env.API_KEY;
    const response = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${API_KEY}`
    );
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
}
