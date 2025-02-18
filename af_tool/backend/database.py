import psycopg2

DB_NAME = "aftool_db"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"
DB_PORT = "5432"

def get_connection():
   return psycopg2.connect(
      dbname=DB_NAME,
      user = DB_USER,
      password = DB_PASSWORD,
      host = DB_HOST,
      port = DB_PORT
   )

def test_connection():
   try:
      conn = get_connection()
      cursor = conn.cursor()
      cursor.execute("SELECT NOW();")
      print(cursor.fetchone())
      cursor.close()
      conn.close()
   except Exception as e:
      print (f"Error: {str(e)}")

if __name__ == "__main__":
   test_connection()