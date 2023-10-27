from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class ReqModel(db.Model):
    
    __tablename__ = 'requests' 

    id = db.Column(db.Integer, primary_key = True)
    pickup = db.Column(db.String, nullable = False)
    dropoff = db.Column(db.String, nullable = False)
    number_of_passengers = db.Column(db.String, nullable = False)
    number_of_luggages = db.Column(db.String, nullable = False)
    date_time = db.Column(db.String, nullable = False)
    passenger_id = db.Column(db.Integer, db.ForeignKey('passengers.id'), nullable = False)

    def __repr__(self):
        return f'<Request: {self.pickup}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()