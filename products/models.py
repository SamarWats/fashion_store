from mongoengine import Document, StringField, FloatField, ListField

class Product(Document):
    name = StringField(required=True)
    category = StringField(required=True)
    price = FloatField(required=True)
    description = StringField()
    image_url = StringField()
    available_sizes = ListField(StringField())
    colors = ListField(StringField())

    def to_json(self):
        return {
            "id": str(self.id),  # ✅ Convert ObjectId to string
            "name": self.name,
            "category": self.category,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url,
            "available_sizes": self.available_sizes,  # ✅ List remains intact
            "colors": self.colors  # ✅ List remains intact
        }
