import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Define your connection parameters
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
dbname = os.getenv("DB_NAME")

def print_table_schema(table_name):
    conn = None
    cursor = None
    try:
        # Create a connection to the PostgreSQL database
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=dbname
        )
        cursor = conn.cursor()
        
        # Query to get the schema of the specified table
        query = f"""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '{table_name}';
        """
        
        cursor.execute(query)
        columns = cursor.fetchall()
        
        # Print the schema information
        print(f"Schema for table '{table_name}':")
        for column in columns:
            print(f"Column: {column[0]}, Type: {column[1]}, Nullable: {column[2]}")
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    
    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

if __name__ == "__main__":
    table_name = 'users'  # Change this to the table you want to inspect
    print_table_schema(table_name)
