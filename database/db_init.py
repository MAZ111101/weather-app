import psycopg2

conn = psycopg2.connect(
    dbname="weatherdb",
    user="postgres",
    password="yourpassword",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Weather cache table
cur.execute("""
CREATE TABLE IF NOT EXISTS weather_app (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    temperature FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()
cur.close()
conn.close()
