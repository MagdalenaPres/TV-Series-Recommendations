from multiprocessing.sharedctypes import Value
from flask import Flask, request, jsonify, json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from person import Person
from category import Category
from product import Product
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////web-project.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


@app.route("/verify", methods=["POST"])
def verify():
    data_dictionary = request.get_json()
    try:
        person = Person(data_dictionary['name'], data_dictionary['surname'], data_dictionary['gender'],
                        data_dictionary['mail'], data_dictionary['phone'], data_dictionary['city'])
        return {'message': f'{person.__str__()}'}
    except ValueError as e:
        return {'message': f'{e}'}, 400


@app.route('/products', methods=['GET'])
def get_product():
    pass
    # product_schema = ProductSchema()
    # products = []
    # for p in db.session.query(Product).all():
    #     products.append(
    #         {'id':p.id, 'name':p.name, 'price':p.price, 'photo':p.photo, 'category_id':p.category_id,}
    #     )
    # return product_schema.dump(products)
   # products = create_products()
   # json_string = json.dumps(products, default=obj_dict)
   # return json_string


@app.route("/category", methods=["GET"])
def get_categories():
    pass
    # category_schema = CategorySchema()
    # categories = []
    # for c in db.session.query(Category).all():
    #     categories.append({'id':c.id, 'name':c.name})
    # return category_schema.dump(categories)
    # categories = create_categories()
    # json_string = json.dumps(categories, default=obj_dict)
    # return json_string
    

@app.route("/delivery", methods=["GET"])
def get_delivery_methods():
    return json.dumps([{"method": "InPost", "price": 7.99}, {"method": "DPD", "price": 12.99}, {"method": "DHL", "price": 11.99}], default=obj_dict)


@app.route("/payment", methods=["GET"])
def get_payment_methods():
    return json.dumps([{"method": "InPost", "price": 7.99}, {"method": "DPD", "price": 12.99}, {"method": "DHL", "price": 11.99}], default=obj_dict)


@app.route("/order", methods=["POST"])
def order():
    data_dictionary = request.get_json()
    pass

def obj_dict(obj):
    return obj.__dict__
    

# class CategorySchema(SQLAlchemyAutoSchema):
#    class Meta:
#        model = Category
#        include_relationships = True
#        load_instance = True


# class ProductSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = Product
#         include_fk = True
#         load_instance = True
    