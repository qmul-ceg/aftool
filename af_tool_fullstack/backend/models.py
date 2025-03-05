from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional

# Class enum that inherits from strig and Enums allows us to ensure that we only accept success and failure 
class ImportStatus(str, Enum):
   success = "success"
   failure = "failure"

class GpSystem(str, Enum):
   EMIS_Web = 'EMIS Web',
   SystmOne = 'SystmOne'

class Tool(str, Enum):
   AF_tool ="AF tool"


# Base model that allows us to create a structure that our api can accept
class LogEntry(BaseModel):
   tool: Tool
   gp_system: GpSystem
   ip_address: str = "UNKNOWN"
   ods_code: str = "UNKNOWN"
   status: ImportStatus
   # import_time: Optional[datetime] = None