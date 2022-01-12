from multiprocessing.sharedctypes import Value
from flask import Flask, request
from flask_cors import CORS

from person import Person

app = Flask(__name__)
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
