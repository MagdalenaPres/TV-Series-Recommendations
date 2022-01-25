class Category:
    newid = 0

    def __init__(self, id, name):
        self.id = id
        self.name = name
        

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


