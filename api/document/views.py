from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from document.models import Document
from document.serializer import DocumentSerializer
from validators.document import DocumentValidator
from exceptions.doc import ExpiredDateException, CompanyNotFound
from exceptions.default import LengthNameInvalid, NameEqual
from rest_framework.exceptions import NotFound


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_by_id(self, _request, pk:int):
        doc = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(doc)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        validator = DocumentValidator(body=data)
        # Fazer função validate no Validator

        try:
            if data['limit_date']:
                validator.verify_limit_date()
            validator.valid_name()
            validator.valid_company()
        except ExpiredDateException:
            return Response({'error': 'Invalid date'}, status=400)
        except LengthNameInvalid:
            return Response({'error': 'Invalid name'}, status=400)
        except CompanyNotFound:
            return Response({'error': 'Company not found'}, status=400)

        doc = Document(
            name=data['name'],
            company_id=data['company'],
            created_by_id=data['created_by'],
        )

        # doc = DocumentFactory(body=data).create()

        doc.save()
        return Response("Document created successfully", status=201)

    def update(self, request, pk:int):
        data = request.data

        try:
            doc = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            raise NotFound("Document not found")

        validator = DocumentValidator(body=data)

        company = 'company' in data
        name = 'name' in data
        limit_date = 'limit_date' in data

        try:
            if limit_date:
                validator.verify_limit_date()

            if name:
                validator.valid_name()
                validator.valid_equal_name(doc_id=pk)

            if company:
                validator.valid_company()

        except ExpiredDateException:
            return Response({'error': 'Invalid date'}, status=400)
        except LengthNameInvalid:
            return Response({'error': 'Invalid name'}, status=400)
        except CompanyNotFound:
            return Response({'error': 'Company not found'}, status=400)
        except NameEqual:
            return Response({'error': 'Same name'}, status=400)

        if limit_date:
            doc.limit_date = data['limit_date']

        if name:
            doc.name = data['name']

        if company:
            doc.company_id = data['company']

        doc.save()
        return Response("Document updated successfully", status=200)

    def delete(self, _request, pk:int):
        try:
            doc = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            raise NotFound("Document not found")

        doc.delete()
        return Response("Document deleted successfully", status=204)

    def get_docs_by_user_email(self, _request, email:str):
        docs = Document.objects.filter(created_by__email=email)
        serializer = DocumentSerializer(docs, many=True)
        return Response(serializer.data, status=200)