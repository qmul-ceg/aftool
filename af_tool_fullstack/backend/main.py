from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import LogEntry
from db_connection import connect_to_database

# from datetime import datetime

#testing API
app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


origins = [
   "http://localhost:5173",
   "http://127.0.0.1:5173",
]

app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"]
)

conn = connect_to_database()

@app.post("/log")
def log_import_status(log_entry: LogEntry):

   

   try:
      with conn.cursor() as cursor:
         query = "INSERT INTO import_logs(status) VALUES (?)"
         cursor.execute(query, (log_entry.status),)
         conn.commit()

      return {"message": "Log data successfully logged"}

   except Exception as e:
      conn.rollback()
      raise HTTPException(status_code=500, detail="Failed to save import")






# @app.post("/log-import/")
# async def log_import(log: LogImportRequest):
#    conn = get_connection()
#    cursor = conn.cursor()

#    try:
#       query = """
#       INSERT INTO import_logs(status)
#       VALUES (%s)
#       """

#       cursor.execute(query, (log.status,))
#       conn.commit()
#       return {"message": "Import log saved successfully."}
   
#    except Exception as e:
#          conn.rollback()
#          raise HTTPException(status_code=500, detail="Failed to save import log")
#    finally: 
#       cursor.close()
#       conn.close()


      # return {"message": "Import log saved successfully", "status": log.status, "import_time": log.import_time}
 # if not log.import_time:
      #    log.import_time = datetime.now()
 # log.status = ImportStatus.failure
      # # log.import_time = datetime.now()
      # query = """
      # INSERT INTO import_logs (status)
      # VALUES (%s)
      # """

      # cursor.execute(query, (log.status,))
      # conn.commit()

      # return {"message" : "Import failed"}
 