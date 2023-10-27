from flask import Flask
from flask_smorest import Api
from Config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)

db =SQLAlchemy(app)
migrate = Migrate(app,db)
api =Api(app)
jwt = JWTManager(app)
CORS(app)

from resources.passengers import bp as passenger_bp
api.register_blueprint(passenger_bp)
from resources.requests import bp as requests_bp
api.register_blueprint(requests_bp)

from resources.passengers import routes

from resources.requests import routes

from resources.requests.ReqModel import ReqModel
from resources.passengers.PassModel import PassModel