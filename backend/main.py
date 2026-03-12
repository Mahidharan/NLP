from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import datetime

from nlp_engine import ContractAnalyzer

app = FastAPI(title="AI Smart Contract Clause Extraction Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = ContractAnalyzer()

# Quick in-memory DB for prototype
contracts_db = []

class ClauseResponse(BaseModel):
    id: str
    type: str
    text: str
    confidence: float
    isRisk: bool

class ContractUploadResponse(BaseModel):
    id: str
    filename: str
    status: str
    message: str

class RiskAnalysisResponse(BaseModel):
    risk_score: int
    risks: List[str]

@app.post("/api/upload", response_model=ContractUploadResponse)
async def upload_contract(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx', '.txt')):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    # Read text
    content = await file.read()
    text = ""
    try:
        text = content.decode('utf-8')
    except Exception:
        text = "Extracted text from binary format would go here. For demo purposes, we assume plaintext UTF-8."

    # Parse contract
    clauses = analyzer.analyze(text)
    
    contract_id = str(uuid.uuid4())
    contracts_db.append({
        "id": contract_id,
        "filename": file.filename,
        "date": datetime.datetime.now().isoformat(),
        "text": text,
        "clauses": clauses,
        "status": "Analyzed",
        "risk_score": sum([1 for c in clauses if c['isRisk']]) * 15 # dummy calculation
    })

    return ContractUploadResponse(
        id=contract_id,
        filename=file.filename,
        status="success",
        message="Contract analyzed successfully"
    )

@app.get("/api/contracts")
async def get_contracts():
    return [{
        "id": c["id"],
        "filename": c["filename"],
        "date": c["date"],
        "num_clauses": len(c["clauses"]),
        "risk_score": c["risk_score"],
        "status": c["status"]
    } for c in contracts_db]

@app.get("/api/contracts/{contract_id}")
async def get_contract(contract_id: str):
    for c in contracts_db:
        if c["id"] == contract_id:
            return c
    raise HTTPException(status_code=404, detail="Contract not found")

@app.get("/api/analytics")
async def get_analytics():
    total = len(contracts_db)
    if total == 0:
        return {
            "total_contracts": 0,
            "high_risk_contracts": 0,
            "common_clauses": {},
            "clause_distribution": []
        }
    
    high_risk = len([c for c in contracts_db if c["risk_score"] > 50])
    
    # Clause counts
    clause_counts = {}
    for c in contracts_db:
        for clause in c["clauses"]:
            ctype = clause["type"]
            clause_counts[ctype] = clause_counts.get(ctype, 0) + 1
            
    distribution = [{"name": k, "value": v} for k, v in clause_counts.items()]
    
    return {
        "total_contracts": total,
        "high_risk_contracts": high_risk,
        "common_clauses": clause_counts,
        "clause_distribution": distribution
    }
