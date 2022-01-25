from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields

from database import Category, Product


class CategorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True

    category_id = auto_field()
    name = auto_field()


class ProductSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True

    product_id = auto_field()
    name = auto_field()
    price = auto_field()
    photo = auto_field()
    category = fields.Nested(lambda: CategorySchema(only=("name",)), dump_only=True)

# class ClientSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = Client
#         load_instance = True

#     client_id = auto_field()
#     name = auto_field()
#     surname = auto_field()
#     email = auto_field()
#     login = auto_field()
#     password = auto_field()