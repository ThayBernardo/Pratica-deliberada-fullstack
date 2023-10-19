from company.models import Company
from user.models import User
from company.serializer import CompanySerializer
from company.views import CompanyViewSet
from rest_framework.test import APITestCase
from rest_framework import status


def createCompany():
    user = User(
        email='teste@gmail.com',
        password='123456',
    )

    company = Company(
        name='teste',
        created_by=user,
    )
    return company

class CompanyModalTestCase(APITestCase):
    def setUp(self):
        self.user = User(
            email='teste@gmail.com',
            password='123456',
        )

        self.company = Company(
            name = 'teste',
            created_by = self.user,
        )

    def test_verify_attributes(self):
        """Teste que verifica os atributos default de uma Company"""
        self.assertEqual(self.company.name, 'teste')
        self.assertEqual(self.company.timezone, '-03:00')
        self.assertEqual(self.company.language, 'pt')
        self.assertEqual(self.company.created_by, self.user)

class CompanySerializerTestCase(APITestCase):
    def setUp(self):
        self.company = createCompany()
        self.serializer = CompanySerializer(instance=self.company)

    def test_verify_fields(self):
        """Teste que verifica os campos que estão sendo serializados"""
        data = self.serializer.data
        self.assertEqual(set(data.keys()),
             {'id', 'name', 'created_at', 'updated_at', 'created_by', 'users', 'timezone', 'language'})

class CompanyViewsTestCase(APITestCase):
    def setUp(self):
        self.user = User(
            email='teste@gmail.com',
            password='123456',
        )
        self.user.save()
        self.company = Company.objects.create(name="teste", created_by=self.user)

    def test_get_companys(self):
        response = self.client.get('/company/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_company_by_id(self):
        company_id = 1
        response = self.client.get(f'/company/{company_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_company_id(self):
        company_id = 3
        response = self.client.get(f'/company/{company_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_company(self):
        company = {
            "name": "teste",
            "created_by": self.user.id,
            "timezone": "-03:00",
            "language": "pt"
        }
        response = self.client.post('/company/create', data=company)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_company_with_invalid_name(self):
        company = {
            "name": "la",
            "created_by": self.user.id,
            "timezone": "-03:00",
            "language": "pt"
        }
        response = self.client.post('/company/create', data=company)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid name')

    def test_create_company_with_invalid_timezone(self):
        company = {
            "name": "teste",
            "created_by": self.user.id,
            "timezone": "0000",
            "language": "pt"
        }
        response = self.client.post('/company/create', data=company)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid timezone')

    def test_create_company_with_invalid_language(self):
        company = {
            "name": "teste",
            "created_by": self.user.id,
            "timezone": "-03:00",
            "language": "fr"
        }
        response = self.client.post('/company/create', data=company)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid language')

    def test_delete_company(self):
        company_id = 1
        response = self.client.delete(f'/company/{company_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_company_with_invalid_id(self):
        company_id = 3
        response = self.client.delete(f'/company/{company_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_company(self):
        company_id = 1
        new_infos_company = {
            "name": "teste passou"
        }
        response = self.client.put(f'/company/{company_id}/update', data=new_infos_company)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_company_with_same_name(self):
        company_id = 1
        new_infos_company = {
            "name": "teste"
        }
        response = self.client.put(f'/company/{company_id}/update', data=new_infos_company)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Same name')

    def test_get_company_by_user_id(self):
        user_id = 1
        response = self.client.get(f'/company/{user_id}/companys')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
