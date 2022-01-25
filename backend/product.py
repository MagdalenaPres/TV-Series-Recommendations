class Product:
    
    def __init__(self, id, name, price, photo, categoryId):
        self.id = id
        self.name = name
        self.price = price
        self.photo = photo
        self._quantity = 1
        self.categoryId = categoryId

    @property
    def category(self):
        return self._category
    
    @category.setter
    def category(self, value):
        self._category = value

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

