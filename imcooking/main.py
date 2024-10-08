import os
import psycopg2
from psycopg2 import sql
from psycopg2.extras import execute_values

# Connect to the default 'postgres' database
conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="secret",
    host="localhost",
    port="5432",
)
conn.autocommit = True
cur = conn.cursor()

# Create the 'amicooked' database if it doesn't exist
cur.execute(sql.SQL("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s"), ["amicooked"])
exists = cur.fetchone()
if not exists:
    cur.execute(sql.SQL("CREATE DATABASE amicooked"))

cur.close()
conn.close()

# Connect to the 'amicooked' database
conn = psycopg2.connect(
    database="amicooked",
    user="postgres",
    password="secret",
    host="localhost",
    port="5432",
)
cur = conn.cursor()

# Create table if it doesn't exist
cur.execute(
    """
    CREATE TABLE IF NOT EXISTS pwnedpasswords (
        id SERIAL PRIMARY KEY,
        file_name TEXT,
        hash_range TEXT
    )
    """
)
conn.commit()

path = "./pwnedpasswords"
dir_list = os.listdir(path)

batch_size = 1000
data = []
count = 0

for file in dir_list:
    file_path = os.path.join(path, file)
    with open(file_path) as text:
        for line in text:
            data.append((file, line.strip()))
            if len(data) >= batch_size:
                execute_values(
                    cur,
                    "INSERT INTO pwnedpasswords (file_name, hash_range) VALUES %s",
                    data
                )
                count = count + 1 
                print(f"Inserted rows: {count}")
                conn.commit()
                data = []

# Insert any remaining data
if data:
    execute_values(
        cur,
        "INSERT INTO pwnedpasswords (file_name, hash_range) VALUES %s",
        data
    )
    conn.commit()

cur.close()
conn.close()
