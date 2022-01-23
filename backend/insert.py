from database import Product, Category
from app import db

Session = db.session()

cat1 = Category(1, name='Posters')
db.session.add(cat1)
cat2 = Category(2, name='TV Series DVD')
db.session.add(cat2)
cat3 = Category(3, name='Gadgets')
db.session.add(cat3)

prod = Product(product_id=1, name='Poster DIUNA', price=22.99, photo='https://fwcdn.pl/fpo/94/76/469476/7972251.3.jpg', category_id=1)
db.session.add(prod)
prod = Product(2,  name='Poster C MON C MON', price=24.99, photo='https://sklep.gutekfilm.pl/uploads/x500/cmoncmon-plakatpl-patroni-lq.jpg', category_id=1)
db.session.add(prod)
prod = Product(3,  name='Poster Joker', price=20.99, photo='https://fwcdn.pl/fpo/01/67/810167/7905225.3.jpg', category_id=1)
db.session.add(prod)
prod = Product(4,  name='Friends 1-10', price=320.80, photo='https://ecsmedia.pl/c/15599102034927837-jpg-gallery.big-iext54681528.jpg', category_id=2)
db.session.add(prod)
prod = Product(5,  name='Game of Thrones Season 1', price=80.20, photo='https://ecsmedia.pl/c/gra-o-tron-sezon-1-w-iext103620810.jpg', category_id=2)
db.session.add(prod)
prod = Product(6,  name='Father Mateusz Season 1-10', price=222.99, photo='https://ecsmedia.pl/c/15350323766419062-jpg-gallery.big-iext53202779.jpg', category_id=2)
db.session.add(prod)
prod = Product(7,  name='Pen Voldemorts wand', price=27, photo='https://pixel-shop.pl/userdata/public/gfx/6162/PP4949HP_Harry_Potter_Voldemort_Wand_Pen_Square_Lifestyle_1_1.jpg', category_id=3)
db.session.add(prod)
prod = Product(8,  name='Figurine Spider-Man', price=58.99, photo='https://pixel-shop.pl/environment/cache/images/500_500_productGfx_2910/x_fk39403.jpg', category_id=3)
db.session.add(prod)
prod = Product(9, name='Back to the future T-shirt', price=68.99, photo='https://mtv-80wxfqgk8f.netdna-ssl.com/pub/media/catalog/product/cache/bc78664de09a33f3f6fc2072d6d17195/b/a/back-to-the-future-30th-anniversary-t-shirt_1.jpg', category_id=3)
db.session.add(prod)

# zapis zmian w bazie danych
db.session.commit()

data = db.session.query(Product, Category).join(Category, Product.category_id==Category.category_id).all()

for p, cat in data:
    print(p.name, p.price, cat.name)
