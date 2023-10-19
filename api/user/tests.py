from user.models import User
from user.serializer import UserSerializer
from rest_framework.test import APITestCase
from rest_framework import status


def createUser():
    user = User(
        email='teste@gmail.com',
        password='123456',
    )
    return user


class UserModalTestCase(APITestCase):
    def setUp(self):
        self.user = createUser()

    def test_verify_attributes(self):
        """Teste que verifica os atributos default de um User"""
        self.assertEqual(self.user.email, 'teste@gmail.com')
        self.assertEqual(self.user.password, '123456')
        self.assertEqual(self.user.verified_email, False)


class UserSerializerTestCase(APITestCase):
    def setUp(self):
        self.user = createUser()
        self.serializer = UserSerializer(instance=self.user)

    def test_verify_fields(self):
        """Teste que verifica os campos que estão sendo serializados"""
        data = self.serializer.data
        self.assertEqual(set(data.keys()),
            {'id', 'email', 'password_reseted_at', 'verified_email',
             'password', 'created_at','updated_at', 'company', 'documents'})


class UserViewsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email="teste@gmail.com", password="123456")
        self.second_user = User.objects.create(email="teste2@gmail.com", password="123456")


    def test_get_users(self):
        response = self.client.get('/user/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_user_by_id(self):
        user_id = 1
        response = self.client.get(f'/user/{user_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_invalid_user_id(self):
        user_id = 3
        response = self.client.get(f'/user/{user_id}/detail')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_create_user(self):
        user = {
            "email": "testeAplication@gmail.com",
            "password": "123456",
        }
        response = self.client.post('/user/create', data=user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_create_user_with_email_exists(self):
        user = {
            "email": "teste@gmail.com",
            "password": "123456",
        }
        response = self.client.post('/user/create', data=user)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_delete_user(self):
        user_id = 1
        response = self.client.delete(f'/user/{user_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


    def test_delete_user_with_invalid_id(self):
        user_id = 3
        response = self.client.delete(f'/user/{user_id}/delete')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_update_user(self):
        user_id = 1
        new_infos_user = {
            "email": "testepassou@gmail.com"
        }
        response = self.client.put(f'/user/{user_id}/update', data=new_infos_user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_update_email_user_when_email_exists(self):
        user_id = 1
        new_infos_user = {
            "email": "teste2@gmail.com"
        }
        response = self.client.put(f'/user/{user_id}/update', data=new_infos_user)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Email already exists')
