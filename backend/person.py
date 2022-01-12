from validate_email import validate_email
import re


class Person:
    def __init__(self, name, surname, mail, phone, city):
        self.name = name
        self.surname = surname
        self.mail = mail
        self.phone = phone
        self._city = city

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if len(value) < 2:
            raise ValueError("Name must be at least 2 characters long")
        self._name = value

    @property
    def surname(self):
        return self._surname

    @surname.setter
    def surname(self, value):
        if len(value) < 2:
            raise ValueError("Surame must be at least 2 characters long")
        self._surname = value

    @property
    def mail(self):
        return self._mail

    @mail.setter
    def mail(self, value):
        if not validate_email(value):
            raise ValueError("Incorrect email! Try again!")
        self._mail = value

    @property
    def phone(self):
        return self._phone

    @phone.setter
    def phone(self, value):
        regPattern = re.compile("^[2-9]\d{2}-\d{3}-\d{3}$")

        if regPattern.match(value) is None:
            raise ValueError("Incorrect phone number! Try again!")

        self._phone = value

    @property
    def city(self):
        return self._city

    def __str__(self):
        return f'{self._name} {self._surname}, mail: {self._surname}, phone: {self._phone}, city: {self._city}'
