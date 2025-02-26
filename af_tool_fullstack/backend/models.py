from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional

# Class enum that inherits from strig and Enums allows us to ensure that we only accept success and failure 
class ImportStatus(str, Enum):
   success = "success"
   failure = "failure"

# Base model that allows us to create a structure that our api can accept
class LogEntry(BaseModel):
   status: ImportStatus
   # import_time: Optional[datetime] = None