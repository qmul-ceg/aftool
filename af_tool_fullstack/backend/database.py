import pyodbc

DB_NAME = "ngt"
DB_USER = "ngtadmin"
DB_PASSWORD = "oFouNfp7ZCtAyhovnd4QyEjuhEKuJ3zw"
DB_HOST = "localhost"
DB_PORT = "1433"

def get_connection():
   return pyodbc.connect(
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