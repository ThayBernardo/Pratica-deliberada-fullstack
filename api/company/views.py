from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from company.models import Company
from company.serializer import CompanySerializer
from django.http import HttpResponse
from validators.company import CompanyValidator
from exceptions.default import LengthNameInvalid, NameEqual
from exceptions.company import InvalidTimezone, InvalidLanguage
from rest_framework.exceptions import NotFound


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_by_id(self, _request, pk:int):
        company = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(company)
        return Response(serializer.data)
    
    def create(self, request):
        data = request.data
        validator = CompanyValidator(body=data)

        try:
            validator.valid_name()
            validator.valid_timezone()
            validator.validate_language()
        except LengthNameInvalid:
            return Response({'error': 'Invalid name'}, status=400)
        except InvalidTimezone:
            return Response({'error': 'Invalid timezone'}, status=400)
        except InvalidLanguage:
            return Response({'error': 'Invalid language'}, status=400)

        company = Company(
            name=data['name'],
            timezone=data['timezone'],
            language=data['language'],
            created_by_id=data['created_by']
        )

        company.save()
        return Response("Company created successfully", status=201)
    
    def update(self, request, pk:int):
        data = request.data

        try:
            company = Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise NotFound("Document not found")

        validator = CompanyValidator(body=data)

        timezone = 'timezone' in data
        name = 'name' in data
        language = 'language' in data

        try:
            if timezone:
                validator.valid_timezone()
            
            if name:
                validator.valid_name()
                validator.valid_equal_name(pk)

            if language:
                validator.validate_language()
    
        except InvalidTimezone:
            return Response({'error': 'Invalid timezone'}, status=400)
        except LengthNameInvalid:
            return Response({'error': 'Invalid name'}, status=400)
        except InvalidLanguage:
            return Response({'error': 'Invalid language'}, status=400)
        except NameEqual:
            return Response({'error': 'Same name'}, status=400)

        if timezone:
            company.timezone = data['timezone']

        if name:
            company.name = data['name']

        if language:
            company.language = data['language']

        company.save()
        return Response("Company updated successfully", status=200)
    
    def delete(self, _request, pk:int):
        try:
            company = Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise NotFound("Company not found")
        
        company.delete()
        return Response("Company deleted successfully", status=204)

    def get_company_by_user_id(self, _request, user_id:int):
        companys = Company.objects.filter(created_by=user_id)
        serializer = CompanySerializer(companys, many=True)
        return Response(serializer.data, status=200)