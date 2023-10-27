
from flask.views import MethodView
from flask import abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from .PassModel import PassModel
from schemas import PassengerSchema, UpdatePassengerSchema, DeletePassengerSchema, PassengerSchemaNested
from sqlalchemy.exc import IntegrityError

from . import bp




@bp.route('/passenger')
class PassengerList(MethodView):
    @bp.response(200, PassengerSchema(many=True))
    def get(self):
        return PassModel.query.all()

    @jwt_required()
    @bp.arguments(DeletePassengerSchema)
    def delete(self, passenger_data):
        passenger_id = get_jwt_identity()
        passenger = PassModel.query.get(passenger_id)
        
        if passenger and passenger.username == passenger_data['username'] and passenger.check_password(passenger_data['password']):
            passenger.delete()
            return {'messege': f'{passenger_data["username"]} deleted'}, 202
        abort(400,message ='username not found')

    @jwt_required()
    @bp.arguments(UpdatePassengerSchema)
    @bp.response(202,PassengerSchema)
    def put(self,passenger_data):
        passenger_id = get_jwt_identity()
        passenger =PassModel.query.get_or_404(passenger_id, description='user not found')
        if passenger and passenger.check_password(passenger_data['password']):
            try:
                passenger.from_dict(passenger_data)
                passenger.save()
            except IntegrityError:
                abort(400, message = 'username or email already taken')


@bp.route('/passenger/<passenger_id>')
class Passenger(MethodView):

    @bp.response(200,PassengerSchemaNested)
    def get(self, passenger_id):
        return PassModel.query.get_or_404(passenger_id, description='passenger not found')




    @jwt_required()
    @bp.arguments(UpdatePassengerSchema)
    @bp.response(201,PassengerSchema)
    def put(self,passenger_data, passenger_id):
        passenger =PassModel.query.get_or_404(passenger_id, description='user not found')
        if passenger and passenger.check_password(passenger_data['password']):
            try:
                passenger.from_dict(passenger_data)
                passenger.save()
            except IntegrityError:
                abort(400, message = 'username or email already taken')




