#READEME
#1. Crear una cuenta en: twilio -> solo trial!
#2. Obtener el numero de telefono asociado
#3. Habilitar las api keys
#4. Obtener los ssi account y los auth token
#5. instalar twilio en dispositivo: sudo python3 -m pip install twilio

#NOTA: Este ejemplo esta desarrollado con las credenciales de una cuenta ya generada.
from twilio.rest import Client


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = "ACe92f431f3c458ef2e5d8867aa9be7697"
auth_token = "08cf548398c1032ef158929962b0ad4d"

client = Client(account_sid, auth_token)

message = client.messages.create(
            body="SMS testing message",
            from_='+18482881793',
            to='+56920773015'
        )

print(message.sid)