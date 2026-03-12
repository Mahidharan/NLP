import json
import uuid
import random

# We will mock actual heavy model loads for reliable startup
# In production, these would use spacy.load("en_core_web_sm") and HuggingFace pipelines
# e.g., from transformers import pipeline

class ContractAnalyzer:
    def __init__(self):
        # self.nlp = spacy.load("en_core_web_sm")
        # self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        self.clause_types = [
            "Payment Terms",
            "Termination Clause",
            "Confidentiality Clause",
            "Liability Clause",
            "Indemnification Clause",
            "Governing Law",
            "Dispute Resolution"
        ]

    def analyze(self, text: str) -> list:
        # Mock NLP extraction logic.
        # A real implementation would segment text, classify sentences/paragraphs, and extract entities.
        
        # We split text into segments or just generate mock clauses if text is too short.
        lines = [line.strip() for line in text.split('\n') if len(line.strip()) > 20]
        
        extracted = []
        
        if not lines:
            # Fallback mock data if file format wasn't plain text
            return [
                {
                    "id": str(uuid.uuid4()),
                    "type": "Payment Terms",
                    "text": "The client agrees to pay $10,000 within 30 days of invoice.",
                    "confidence": 0.95,
                    "isRisk": False
                },
                {
                    "id": str(uuid.uuid4()),
                    "type": "Liability Clause",
                    "text": "In no event shall either party be liable for any indirect, incidental, or consequential damages.",
                    "confidence": 0.88,
                    "isRisk": True
                },
                {
                    "id": str(uuid.uuid4()),
                    "type": "Termination Clause",
                    "text": "Either party may terminate this agreement with 30 days written notice.",
                    "confidence": 0.92,
                    "isRisk": False
                }
            ]
            
        # If we have real text, map random clauses to paragraphs
        for line in lines[:10]: # Process max 10 to keep it fast
            ctype = random.choice(self.clause_types)
            is_risk = ctype in ["Liability Clause", "Termination Clause"] and random.choice([True, False])
            
            extracted.append({
                "id": str(uuid.uuid4()),
                "type": ctype,
                "text": line[:200] + "..." if len(line) > 200 else line,
                "confidence": round(random.uniform(0.70, 0.99), 2),
                "isRisk": is_risk
            })
            
        return extracted
