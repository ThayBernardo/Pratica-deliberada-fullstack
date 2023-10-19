from services.doc_repository import DocRepository
from exceptions.doc import ExpiredDateException, CompanyNotFound
from exceptions.default import LengthNameInvalid, NameEqual


class DocumentValidator:
    def __init__(self, body: dict):
        self.name = body.get('name')
        self.company_id = body.get('company')
        self.limit_date = body.get('limit_date')
        self.doc_repository = DocRepository()

    def verify_limit_date(self):
        verify_date = self.doc_repository.verify_limit_date(limit_date=self.limit_date) is not True
        
        if self.limit_date and verify_date:
            raise ExpiredDateException
        
    def valid_name(self):
        if len(self.name) < 3:
            raise LengthNameInvalid
        
    def valid_equal_name(self, doc_id: int):
        if self.doc_repository.get_doc_name(doc_id=doc_id) == self.name:
            raise NameEqual

    def valid_company(self):
        company = self.doc_repository.get_company(company_id=self.company_id)
        if not company.exists():
            raise CompanyNotFound