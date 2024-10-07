import psycopg2
from psycopg2 import sql

# Define your connection parameters
  # Your database name
user= 'postgres'
password= "d1QVQlVnkfeULGNe"
host= "lazily-forgiving-hairtail.data-1.use1.tembo.io"
port= '5432'
dbname= 'postgres'
idleTimeoutMilli= 30000

# Create a connection to the PostgreSQL database
try:
    conn = psycopg2.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        dbname=dbname
    )
    print("Connected to the database successfully.")

    # Create a cursor object using the connection
    cursor = conn.cursor()

    # Execute a sample query
    cursor.execute("SELECT * FROM users;")
    current_time = cursor.fetchall()
    print("Current time:", current_time)

except Exception as e:
    print("Error connecting to the database:", e)

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if conn:
        conn.close()
