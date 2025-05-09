from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import random
import psycopg2
import os

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    dbname="weatherdb",
    user="postgres",
    password="yourpassword",
    host="localhost",
    port="5432"
)

# Replace with your OpenWeatherMap API key
API_KEY = os.getenv("WEATHER_API_KEY", "38d2693cb5fa3502b336d9f0be948dd6")
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

CITIES = ["Islamabad", "London", "New York", "Tokyo", "Paris", "Sydney", "Mumbai", "Berlin", "Moscow", "Dubai", "Beijing"]

def fetch_weather(city):
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    res = requests.get(BASE_URL, params=params)
    data = res.json()
    if res.status_code != 200:
        return None
    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"]
    }

@app.route("/weather/random")
def random_weather():
    selected = random.sample(CITIES, 5)
    weather_data = [fetch_weather(city) for city in selected]
    sorted_data = sorted(filter(None, weather_data), key=lambda x: x["temperature"])
    return jsonify(sorted_data)

@app.route("/weather/search")
def search_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City is required"}), 400
    data = fetch_weather(city)
    if not data:
        return jsonify({"error": "City not found"}), 404
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)