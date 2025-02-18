from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional

class ImportStatus(str, Enum):
   success = "success"
   failure = "failure"
   pending = "pending"

class LogImportRequest(BaseModel):
   status: ImportStatus
   import_time: Optional[datetime] = None