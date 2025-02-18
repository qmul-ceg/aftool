from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import LogImportRequest, ImportStatus
from database import get_connection
from datetime import datetime

app = FastAPI()
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

@app.post("/log-import/")
async def log_import(log: LogImportRequest):
   conn = get_connection()
   cursor = conn.cursor()

   try:
      query = """
      INSERT INTO import_logs(status)
      VALUES (%s)
      """

      cursor.execute(query, (log.status,))
      conn.commit()
      return {"message": "Import log saved successfully."}
   
   except Exception as e:
         conn.rollback()
         raise HTTPException(status_code=500, detail="Failed to save import log")
   finally: 
      cursor.close()
      conn.close()


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
 