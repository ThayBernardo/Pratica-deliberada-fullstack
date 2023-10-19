from services.company_repository import CompanyRepository
from exceptions.default import LengthNameInvalid, NameEqual
from exceptions.company import InvalidTimezone, InvalidLanguage
import re


class CompanyValidator:
    def __init__(self, body: dict):
        self.body = body
        self.company_repository = CompanyRepository()

    def valid_name(self):
        self.name = self.body['name']
        if len(self.name) < 3:
            raise LengthNameInvalid
        
    def valid_timezone(self):
        self.timezone = self.body['timezone']
        timezone_pattern = r'^[-+]?\d{2}:\d{2}$'

        if not re.match(timezone_pattern, self.timezone):
            raise InvalidTimezone
        
    def validate_language(self):
        self.language = self.body['language']
        if self.company_repository.validate_language(self.language) is not True:
            raise InvalidLanguage
        
    def valid_equal_name(self, id: int):
        self.name = self.body['name']
        if self.company_repository.get_company_name(id) == self.name:
            raise NameEqual