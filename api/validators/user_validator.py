from exceptions.user import EmailAlreadyExists
from services.user_repository import UserRepository


class UserValidator:
    def __init__(self, body: dict):
        self.email = body.get('email')
        self.user_repository = UserRepository()

    def create(self):
        if self.email and self.user_repository.get_by_email(email=self.email):
            raise EmailAlreadyExists
        
    def update(self, user_id: int):
        if self.email and self.user_repository.get_email_different_from_mine(email=self.email, id=user_id):
            raise EmailAlreadyExists