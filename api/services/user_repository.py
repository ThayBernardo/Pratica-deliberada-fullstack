from user.models import User


class UserRepository:
    def get_by_email(self, email: str):
        return User.objects.filter(email=email)
    
    def get_email_different_from_mine(self, email: str, id: int):
        return self.get_by_email(email=email).exclude(id=id)