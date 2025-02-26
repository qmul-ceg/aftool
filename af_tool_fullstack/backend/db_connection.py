import pyodbc 

conn_str= (
   "DRIVER={ODBC Driver 18 for SQL Server};"
   "SERVER=ceg-maryseacole.czd1trqfl4br.eu-west-2.rds.amazonaws.com;"
   "DATABASE=ngt;"
   "UID=ngtadmin;"
   "PWD=oFouNfp7ZCtAyhovnd4QyEjuhEKuJ3zw;"
   "TrustServerCertificate=yes;"
)

def connect_to_database():
   return pyodbc.connect(conn_str)


try:
   conn = connect_to_database()
   with conn.cursor() as cursor:
      cursor.execute("SELECT @@VERSION")
      print("Connection success")
      print(cursor.fetchone())
except Exception as e:
   print(f"Database connection failed:{e}")

# conn = pyodbc.connect(conn_str)

# # Create a cursor to interact with the database
# cursor = conn.cursor()

# # Execute a simple query
# cursor.execute('SELECT 1')

# # Fetch the results
# print(cursor.fetchone())

# # Close the cursor and connection
# cursor.close()
# conn.close()

# connection_string = (
#    "DRIVER = /opt/homebrew/lib/msodbcsql.18.dylib;"
#    "SERVER = ceg-maryseacole.czd1trqfl4br.eu-west-2.rds.amazonaws.com;"
#    "DATABASE= ngt"
#    "UID=ngtadmin;"
#    "PWD=oFouNfp7ZCtAyhovnd4QyEjuhEKuJ3zw"

# )

# try:
#    conn = pyodbc.connect(connection_string)
#    print("Connection successful")
#    conn.close()
# except Exception as e:
#    print(f"Failed to connect: {e}")
# try:
#    conn = pyodbc.connect(
#       dbname = DB_NAME,
#       user = DB_USER,
#       password = DB_PASSWORD,
#       host = DB_HOST,
#       port = DB_PORT
#    )
#    print("Database connection successful")
#    conn.close()
# except Exception as e:
#    print(f"Failure to connect: {e}")
# DB_NAME = "ngt"
# DB_USER  = "ngtadmin"
# DB_PASSWORD = "oFouNfp7ZCtAyhovnd4QyEjuhEKuJ3zw"
# DB_HOST = "localhost"
# DB
# # conn_str = 'DRIVER={ODBC Driver 18 for SQL Server};SERVER=ceg-maryseacole.czd1trqfl4br.eu-west-2.rds.amazonaws.com;DATABASE=ngt;UID=ngtadmin;PWD=oFouNfp7ZCtAyhovnd4QyEjuhEKuJ3zw'_PORT ="1433"