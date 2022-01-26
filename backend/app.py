from multiprocessing.connection import Client
from multiprocessing.sharedctypes import Value
from datetime import timedelta, timezone
import datetime
from flask import Flask, request, json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask.json import jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_marshmallow import Marshmallow

from person import Person

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////web-project.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)
db = SQLAlchemy(app)
CORS(app)
ma = Marshmallow(app)

from database import Product, Category, Client
from schema import ProductSchemaNested, CategorySchema, ClientSchema, ProductSchema
 
productSchemaNested = ProductSchemaNested()
productSchema = ProductSchema()
categoriesSchema = CategorySchema()
clientsSchema = ClientSchema()


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/login', methods=["POST"])
def create_token():
    _login = request.json.get("login", None)
    _password = request.json.get("password", None)
            
    logged_client = Client.query.filter_by(login=_login).first()

    if logged_client and check_password_hash(logged_client.password, _password):
        access_token = create_access_token(identity=_login)
        response = {"access_token":access_token}
        return response

    return {"msg": "Wrong username or password"}, 401

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/verify", methods=["POST"])
def verify():
    data_dictionary = request.get_json()
    try:
        person = Person(data_dictionary['name'], data_dictionary['surname'], data_dictionary['gender'],
                        data_dictionary['mail'], data_dictionary['phone'], data_dictionary['city'])
        return {'message': f'{person.__str__()}'}
    except ValueError as e:
        return {'message': f'{e}'}, 400


@app.route('/clients', methods=['GET'])
def get_clients():
    all_clients = Client.query.all()
    jsonified = clientsSchema.dumps(all_clients, many=True)
    return jsonified, 200


@app.route('/products/<_product_id>', methods=['GET'])
def get_product(_product_id):
    product = Product.query.filter_by(product_id=_product_id).first()
    jsonified = productSchemaNested.dumps(product)
    return jsonified, 200


@app.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    jsonified = productSchemaNested.dumps(all_products, many=True)
    return jsonified, 200


@app.route("/category", methods=["GET"])
def get_categories():
    all_categories = Category.query.all()
    jsonified = categoriesSchema.dumps(all_categories, many=True)
    return jsonified, 200


@app.route("/delivery", methods=["GET"])
def get_delivery_methods():
    return json.dumps(
        [{"method": "InPost", "price": 7.99}, {"method": "DPD", "price": 12.99}, {"method": "DHL", "price": 11.99}],
        default=obj_dict)


@app.route("/add", methods=["POST"])
def addProduct():
    data_dictionary = request.get_json()
    try:
        product_category = Category.query.filter_by(name=data_dictionary["category_id"]).first()
        data_dictionary["category_id"] = product_category.category_id
        new_product = productSchema.load(data_dictionary)
        db.session.add(new_product)
        db.session.commit()
        return {'message': "New product successfully added "}, 200
    except ValueError as e:
        return {'message': f'{e}'}, 400


@app.route("/delete/<id>", methods=["DELETE"])
def deleteProduct(id):
    product_to_delete = Product.query.get(id)
    db.session.delete(product_to_delete)
    db.session.commit()
    return {'message': "Product successfully deleted "}, 200


@app.route("/edit", methods=["PUT"])
def editProduct():
    data_dictionary = request.get_json()
    existing_product = Product.query.get(data_dictionary["product_id"])

    try:
        product_category = Category.query.filter_by(name=data_dictionary["category_id"]).first()
        data_dictionary["category_id"] = product_category.category_id
        new_product = productSchema.load(data_dictionary, instance=existing_product)
        db.session.add(new_product)
        db.session.commit()
        return {'message': "Product successfully edited "}, 200
    except ValueError as e:
        return {'message': f'{e}'}, 400


@app.route("/order", methods=["POST"])
def order():
    data_dictionary = request.get_json()
    pass


def obj_dict(obj):
    return obj.__dict__


if __name__ == "__main__":
    app.run(debug=True)
