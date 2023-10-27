from flask_smorest import Blueprint

bp = Blueprint('requests',__name__, url_prefix='/request' )

from . import routes