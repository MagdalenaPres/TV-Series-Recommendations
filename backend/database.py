from app import db
from sqlalchemy.ext.hybrid import hybrid_property
import hashlib
import os


class Category(db.Model):
    __tablename__ = 'category'
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    def __init__(self, category_id, name):
        self.category_id = category_id
        self.name = name


class Product(db.Model):
    __tablename__ = 'product'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float)
    photo = db.Column(db.String(150))
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=False)

    category = db.relationship('Category', backref=db.backref('product', lazy=True))

    def __init__(self, product_id, name, price, photo, category_id):
        self.product_id = product_id
        self.name = name
        self.price = price
        self.photo = photo
        self.category_id = category_id


class Client(db.Model):
    __tablename__ = 'client'
    client_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40))
    email = db.Column(db.String(150))
    login = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(40))
    salt = os.urandom(512)

    def __init__(self, client_id, name, surname, email, login, password):
        self.client_id = client_id
        self.name = name
        self.surname = surname
        self.email = email
        self.login = login
        self.password = password

    @hybrid_property
    def password(self):
        return self.password

    @password.setter
    def password(self, new_pass):
        new_password_hash = hashlib.pbkdf2_hmac(
            'sha256', new_pass, self.salt, 100000)
        self.password = new_password_hash

Session = db.session()



user1 = Client(1, "Jan", "Kowalski", "jk@gmail.com", "john12", "john12")
db.session.add(user1)
db.session.commit()
# db.drop_all()
# db.create_all()

# data = db.session.query(Product, Category).join(Category, Product.category_id==Category.category_id).all()
#
# for p, cat in data:
#     print(p.name, p.price, cat.name)
