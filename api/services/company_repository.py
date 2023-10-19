from company.models import Company


class CompanyRepository:
    def validate_language(self, language:str):
        for lang_code, lang_name in Company.LANGUAGES:
            if lang_code == language or lang_name == language:
                return True
        return False
    
    def get_company_name(self, company_id:int):
        company = Company.objects.filter(pk=company_id)
        return company[0].name