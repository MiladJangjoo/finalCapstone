from flask import abort
from schemas import PassengerSchema, AuthSchema
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token

from . import bp
from .PassModel import PassModel



@bp.post('/passengerregister')
@bp.arguments(PassengerSchema)
@bp.response(201,PassengerSchema)
def register_passenger(passenger_data):
    passenger = PassModel()
    passenger.from_dict(passenger_data)
    try:
        passenger.save()
        return passenger_data
    except IntegrityError:
        abort(400, description= 'username or email alrady taken')


@bp.post('/passengerlogin')
@bp.arguments(AuthSchema)
def passenger_login(passenger_data):
    if 'username' not in passenger_data and 'email' not in passenger_data:
        abort(400,'please include username or email')
    if 'username' in passenger_data:
        passenger = PassModel.query.filter_by(username=passenger_data['username']).first()
    else:
        passenger = PassModel.query.filter_by(email=passenger_data['email']).first()
    if passenger and passenger.check_password(passenger_data['password']):
        access_token = create_access_token(identity= passenger.id)
        return {'access_token' : access_token}
    abort(400, description ='invalid username or password')



# @bp.route('/passengerlogout')