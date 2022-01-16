from multiprocessing.sharedctypes import Value
from flask import Flask, request, jsonify
from flask_cors import CORS

from person import Person
from category import Category
from product import Product

app = Flask(__name__)
CORS(app)

products = [] 
categories = []

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
   products = create_products()
   return jsonify([*map(Product.toJSON, products)])

@app.route("/category", methods=["GET"])
def get_categories():
    categories = create_categories()
    return jsonify([*map(Category.toJSON, categories)])


def create_categories():
    categories.append( Category(1, 'Posters') )
    categories.append( Category(2, 'TV Series DVD') )
    categories.append( Category(3, 'Gadgets') )
    return categories

def create_products():
    products.append( Product(1, 'Poster DIUNA', 22.99, 'https://fwcdn.pl/fpo/94/76/469476/7972251.3.jpg', 1) )
    products.append( Product(2, 'Poster C MON C MON', 24.99, 'https://sklep.gutekfilm.pl/uploads/x500/cmoncmon-plakatpl-patroni-lq.jpg', 1) )
    products.append( Product(3, 'Poster Joker', 20.99, 'https://fwcdn.pl/fpo/01/67/810167/7905225.3.jpg', 1) )
    products.append( Product(4, 'Friends 1-10', 320.80, 'https://ecsmedia.pl/c/15599102034927837-jpg-gallery.big-iext54681528.jpg', 2) )
    products.append( Product(5, 'Game of Thrones Season 1', 80.20, 'https://ecsmedia.pl/c/gra-o-tron-sezon-1-w-iext103620810.jpg', 2) )
    products.append( Product(6, 'Father Mateusz Season 1-10', 222.99, 'https://ecsmedia.pl/c/15350323766419062-jpg-gallery.big-iext53202779.jpg', 2) )
    products.append( Product(7, 'Pen Voldemorts wand', 27, 'https://pixel-shop.pl/userdata/public/gfx/6162/PP4949HP_Harry_Potter_Voldemort_Wand_Pen_Square_Lifestyle_1_1.jpg', 3) )
    products.append( Product(8, 'Figurine Spider-Man', 58.99, 'https://pixel-shop.pl/environment/cache/images/500_500_productGfx_2910/x_fk39403.jpg', 3) )
    return products