from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user.models import User
from user.serializer import UserSerializer
from django.http import HttpResponse
from validators.user_validator import UserValidator
from exceptions.user import EmailAlreadyExists
from rest_framework.exceptions import NotFound


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_by_id(self, _request, pk: int):
        user = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def get_by_email(self, _request, email: str):
        user = get_object_or_404(self.queryset, email=email)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def verify_user_password(self, _request, email: str, password: str):
        user = self.get_by_email(_request, email=email).data
        if user['password'] == password:
            return Response({'Password correct'}, status=200)
        else:
            return Response({'Invalid password'}, status=400)

    def create(self, request):
        data = request.data

        try:
            UserValidator(body=data).create()
        except EmailAlreadyExists:
            return Response({'error': 'Email already exists'}, status=400)

        user = User(
            email=data['email'],
            password=data['password'],
        )

        user.save()
        return Response("User created successfully", status=201)

    def update(self, request, pk: int):
        data = request.data

        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("User not found")

        validator = UserValidator(data)
        try:
            validator.update(user.id)
        except EmailAlreadyExists:
            return Response({'error': 'Email already exists'}, status=400)

        if 'email' in data:
            user.email = data['email']

        if 'password' in data:
            user.password = data['password']

        user.save()
        return Response("User updated successfully", status=200)

    def delete(self, _request, pk: int):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("User not found")

        user.delete()
        return Response("User deleted successfully", status=204)
