from flask_smorest import Blueprint

bp = Blueprint('passengers', __name__, description='ops on passengers')

from . import routes
from . import auth_routes

