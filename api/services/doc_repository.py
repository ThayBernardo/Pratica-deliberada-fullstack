from datetime import datetime
from company.models import Company
from document.models import Document


class DocRepository:
    def verify_limit_date(self, limit_date: any):
        current_date = datetime.now()

        if isinstance(limit_date, str):
            limit_date = datetime.strptime(limit_date, "%Y-%m-%d")

        if limit_date <= current_date:
            return False
        return True
    
    def get_company(self, company_id:int):
        return Company.objects.filter(pk=company_id)
    # Usar get
    
    def get_doc_name(self, doc_id:int):
        doc = Document.objects.filter(pk=doc_id)
        return doc[0].name
