from document.models import Document
from user.models import User
from company.models import Company
from document.serializer import DocumentSerializer
from unittest.mock import MagicMock
from document.views import DocumentViewSet
from rest_framework.test import APITestCase
from rest_framework import status


def createDocument():
    user = User(
        email='teste@gmail.com',
        password='123456',
    )

    company = Company(
        name='teste',
        created_by=user,
    )

    document = Document(
        name='teste',
        company=company,
        created_by=user
    )
    return document

class DocumentModalTestCase(APITestCase):
    def setUp(self):
        self.user = User(
            email='teste@gmail.com',
            password='123456',
        )

        self.company = Company(
            name='teste',
            created_by=self.user,
        )

        self.document = Document(
            name='teste',
            company=self.company,
            created_by=self.user
        )

    def test_verify_attributes(self):
        """Teste que verifica os atributos default de um Document"""
        self.assertEqual(self.document.name, 'teste')
        self.assertEqual(self.document.deleted, False)
        self.assertEqual(self.document.signed, False)
        self.assertEqual(self.document.company, self.company)
        self.assertEqual(self.document.created_by, self.user)


class DocumentSerializerTestCase(APITestCase):
    def setUp(self):
        self.document = createDocument()
        self.serializer = DocumentSerializer(instance=self.document)

    def test_verify_fields(self):
        """Teste que verifica os campos que estão sendo serializados"""
        data = self.serializer.data
        self.assertEqual(set(data.keys()),
             {'id', 'name', 'deleted', 'created_at', 'updated_at',
              'limit_date', 'signed', 'company', 'created_by'})


class DocumentViewsTestCase(APITestCase):
    def setUp(self):
        self.user = User(
            email='teste@gmail.com',
            password='123456',
        )

        self.user.save()

        self.company = Company(
            name='teste',
            created_by=self.user,
        )

        self.company.save()
        self.document = Document.objects.create(name="teste", created_by=self.user, company=self.company)

    def test_get_documents(self):
        response = self.client.get('/document/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_document_by_id(self):
        doc_id = 1
        response = self.client.get(f'/document/{doc_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_document_id(self):
        doc_id = 2
        response = self.client.get(f'/document/{doc_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_document(self):
        document = {
            "name": "teste",
            "created_by": self.user.id,
            "company": self.company.id,
            "limit_date": "2070-10-11"
        }
        response = self.client.post('/document/create', data=document)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_document_with_invalid_name(self):
        document = {
            "name": "la",
            "created_by": self.user.id,
            "company": self.company.id,
            "limit_date": "2070-10-11"
        }
        response = self.client.post('/document/create', data=document)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid name')


    def test_create_document_with_ancient_date(self):
        document = {
            "name": "teste",
            "created_by": self.user.id,
            "company": self.company.id,
            "limit_date": "2023-01-01"
        }
        response = self.client.post('/document/create', data=document)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid date')

    def test_create_document_with_invalid_company(self):
        document = {
            "name": "teste",
            "created_by": self.user.id,
            "company": 2,
            "limit_date": "2070-11-01"
        }
        response = self.client.post('/document/create', data=document)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Company not found')

    def test_delete_document(self):
        doc_id = 1
        response = self.client.delete(f'/document/{doc_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_document_with_invalid_id(self):
        doc_id = 2
        response = self.client.delete(f'/document/{doc_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_document(self):
        doc_id = 1
        new_infos_document = {
            "name": "teste passou"
        }
        response = self.client.put(f'/document/{doc_id}/update', data=new_infos_document)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_document_with_same_name(self):
        doc_id = 1
        new_infos_document = {
            "name": "teste"
        }
        response = self.client.put(f'/document/{doc_id}/update', data=new_infos_document)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Same name')