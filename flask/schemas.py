from marshmallow import Schema, fields

class RequestSchema(Schema):
    id = fields.Str(dump_only= True)
    pickup = fields.Str(required = True)
    dropoff = fields.Str(required = True)
    number_of_passengers = fields.Str(required = True)
    number_of_luggages = fields.Str(required = True)
    passenger_id = fields.Int(dump_only = True)
    date_time = fields.Str(required = True)


class PassengerSchema(Schema):
    id = fields.Str(dump_only= True)
    username = fields.Str(required = True)
    email = fields.Str(required = True)
    password = fields.Str(required = True, load_only= True)
    phone_number = fields.Str(required = True)
    first_name = fields.Str()
    last_name = fields.Str()
    

class PassengerSchemaNested(PassengerSchema):
    requests = fields.List(fields.Nested(RequestSchema),dump_only = True)


class UpdatePassengerSchema(Schema):
    username = fields.Str()
    email = fields.Str()
    password = fields.Str(required = True, load_only= True)
    new_password = fields.Str()
    phone_number = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()

class DeletePassengerSchema(Schema):
    password = fields.Str(required = True, load_only= True)
    username = fields.Str(required = True)

class AuthSchema(Schema):
    password = fields.Str(required = True, load_only= True)
    username = fields.Str()
    email = fields.Str()

