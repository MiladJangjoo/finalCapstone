from uuid import uuid4
from flask.views import MethodView
from flask_smorest import abort
from sqlalchemy.exc import IntegrityError
from resources.passengers.PassModel import PassModel
from flask_jwt_extended import get_jwt_identity, jwt_required, get_jwt
from .ReqModel import ReqModel
from schemas import RequestSchema
from . import bp
from db import requests
from flask import request



@bp.route('/')
class RequestList(MethodView):

    @jwt_required()
    @bp.response(200, RequestSchema(many=True))
    def get(self):
        return ReqModel.query.all()

    @jwt_required()
    @bp.arguments(RequestSchema)
    @bp.response(200,RequestSchema)
    def post(self, request_data):
        passenger_id = get_jwt_identity()
        r = ReqModel(**request_data, passenger_id = passenger_id) #this is doing reuestdata['pickup'], ....
        try:
            r.save()
            return r
        except IntegrityError:
            abort(400, message= 'invalid passenger id')



@bp.route('/<request_id>')
class Request(MethodView):

    @jwt_required()
    @bp.response(200, RequestSchema)
    def get(self, request_id):
       r = ReqModel.query.get(request_id)
       if r:
           return r
       abort(400, message= 'invalid req id')


    @jwt_required()
    @bp.arguments(RequestSchema)
    @bp.response(200, RequestSchema)
    def put(self,request_data, request_id):
        r = ReqModel.query.get(request_id)
        if r and request_data['pickup']:
            if r.passenger_id == get_jwt_identity():
                r.pickup = request_data['pickup']
                r.save()
                return r
            else:
                abort(401, message ='Unautorized')
        abort(400, message ='invalid request data')


    @jwt_required()
    @bp.response(200, RequestSchema)
    def delete(self, request_id):
        passenger_id = get_jwt_identity()
        r = ReqModel.query.get(request_id)
        if r:
            if r.passenger_id == passenger_id:
                r.delete()
                return {'message' : 'request deleted'}, 202
            abort(401, message ='user doesnt have right')
        abort(400, message ='invalid request id')

        