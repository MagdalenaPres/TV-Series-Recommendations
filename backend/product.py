import itertools
from flask import Flask, request, jsonify, make_response, json

class Product:
    
    def __init__(self, id, name, price, photo, categoryId):
        self.id = id
        self.name = name
        self.price = price
        self.photo = photo
        self.categoryId = categoryId


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, value):
        if value < 0:
            raise ValueError("Wrong id")
        self._id = value

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if len(value) < 2:
            raise ValueError("Name must be at least 2 characters long")
        self._name = value

    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Incorrect price!")
        self._price = value

    @property
    def photo(self):
        return self._photo

    @photo.setter
    def photo(self, value):
        self._photo = value

    @property
    def categoryId(self):
        return self._categoryId

    @categoryId.setter
    def categoryId(self, value):
        self._categoryId = value


if __name__ == '__main__':
    me = Product(1, 'ok', 12, 'dew', 2)
    print(me.toJSON())

