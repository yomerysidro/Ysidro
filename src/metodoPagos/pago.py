from flask import Blueprint, request, jsonify
import mercadopago
from ..models import Compra, db
from datetime import datetime

# Configuración del Blueprint para las rutas de pago
pago_bp = Blueprint('pago', _name_)

# Inicializar el SDK de Mercado Pago con el Access Token de la empresa
sdk = mercadopago.SDK("APP_USR-50528336063642-110217-6aea132135763b47d24fcfa40ba5c6c5-718682144")

# Endpoint para crear la preferencia de pago
@pago_bp.route('/create_preference', methods=['POST'])
def create_preference():
    try:
        # Imprimir los datos recibidos para depuración
        data = request.get_json()
        print("Datos recibidos en el servidor:", data)

        items = data.get("items", [])
        if not items:
            raise ValueError("La lista de 'items' está vacía o no fue proporcionada.")

        shipping_cost = data.get("shipping_cost", 0)
        print("Costo de envío recibido:", shipping_cost)

        # Crear lista de productos para la preferencia de pago
        preference_items = []
        for item in items:
            print("Procesando item:", item)
            if not all(k in item for k in ("title", "quantity", "unit_price")):
                raise ValueError("Falta una clave en uno de los elementos de 'items'.")

            preference_items.append({
                "title": item["title"],
                "quantity": item["quantity"],
                "unit_price": item["unit_price"],
                "currency_id": "PEN"  # Asegura que la moneda esté configurada
            })

        print("Lista de items para la preferencia:", preference_items)

        # Configuración de la preferencia de pago
        preference_data = {
            "items": preference_items,
            "back_urls": {
                "success": "http://localhost:5000/api/pago/success",
                "failure": "http://localhost:5000/api/pago/failure",
                "pending": "http://localhost:5000/api/pago/pending"
            },
            "auto_return": "approved",
            "additional_info": "Compra en CORVI_APP",
            "shipments": {
                "cost": shipping_cost,
                "mode": "not_specified"
            }
        }

        print("Datos de la preferencia antes de enviar a Mercado Pago:", preference_data)

        # Crear la preferencia en Mercado Pago
        preference_response = sdk.preference().create(preference_data)
        print("Respuesta de Mercado Pago:", preference_response)  # Imprimir la respuesta de Mercado Pago para depuración

        if preference_response.get("status") != 201:
            raise Exception(f"Error al crear la preferencia: {preference_response}")

        preference = preference_response["response"]

        # Guardar un registro preliminar en la base de datos con estado "pending"
        nueva_compra = Compra(
            transaction_id=preference["id"],
            monto=sum(item["unit_price"] * item["quantity"] for item in items) + shipping_cost,
            estado="pending",
            detalles=preference_items
        )
        db.session.add(nueva_compra)
        db.session.commit()

        print("Registro de compra guardado en la base de datos con éxito. ID de transacción:", preference["id"])

        return jsonify({
            "id": preference["id"],
            "init_point": preference["init_point"],
            "total": nueva_compra.monto
        })
    except ValueError as ve:
        print("Error de validación:", ve)
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        print("Error al crear la preferencia:", e)
        return jsonify({"error": "Error al crear la preferencia"}), 500