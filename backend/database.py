from app import db
from sqlalchemy.ext.hybrid import hybrid_property
import hashlib
import os
from werkzeug.security import generate_password_hash, check_password_hash


class Category(db.Model):
    __tablename__ = 'category'
    __table_args__ = {'extend_existing': True}
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    def __init__(self, category_id, name):
        self.category_id = category_id
        self.name = name


class Product(db.Model):
    __tablename__ = 'product'
    __table_args__ = {'extend_existing': True}
    __table_args__ = {'sqlite_autoincrement': True}

    product_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float)
    photo = db.Column(db.String(150))
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=False)

    category = db.relationship('Category', backref=db.backref('product', lazy=True))

    def __init__(self, name, price, photo, category_id):
        self.name = name
        self.price = price
        self.photo = photo
        self.category_id = category_id


class Client(db.Model):
    __tablename__ = 'client'
    __table_args__ = {'extend_existing': True}
    client_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40))
    email = db.Column(db.String(150))
    login = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(120))

    def __init__(self, client_id, name, surname, email, login, password):
        self.client_id = client_id
        self.name = name
        self.surname = surname
        self.email = email
        self.login = login
        self.password = generate_password_hash(password)


Session = db.session()


# db.drop_all()
# db.create_all()
# user1 = Client(3, "Ola", "Bocian", "bocian1@gmail.com", "bociek123", "olab")
# db.session.add(user1)
# db.session.commit()
# 
# data = db.session.query(Product, Category).join(Category, Product.category_id==Category.category_id).all()

# for p, cat in data:
#      print(p.name, p.price, cat.name)
#  
# clients = db.session.query(Client).all()
# # 
# for c in clients:
#     print(c.login, c.password, c.name, c.surname)
# 