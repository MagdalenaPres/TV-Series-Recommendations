from flask import Flask, request
from flask_cors import CORS

from utils import check_email, check_name, check_surname, check_number

app = Flask(__name__)
CORS(app)


@app.route("/verify", methods=["POST"])
def verify():
    data_dictionary = request.get_json()
    if (not check_name(data_dictionary['name'])):
        return {'message': 'Name must be at least 2 characters long'}, 400

    if (not check_surname(data_dictionary['surname'])):
        return {'message': 'Surname must be at least 2 characters long'}, 400

    if (not check_email(data_dictionary['mail'])):
        return {'message': 'Incorrect email! Try again!'}, 400

    if (not check_number(data_dictionary['phone'])):
        return {'message': 'Incorrect phone number! Try again!'}, 400

    return {'message': f'{data_dictionary["name"]} {data_dictionary["surname"]}'}
