Iniciar servidor, una vez clonado el repositorio:

-Lanzar comando 'npm i', para instalar todas la dependencias necesarias.

-Lanzar comando 'npm run dev' o 'npm run start', los cuales arrancarán el server.

Información sobre los datos que trae nuestro servidor y los que tenemos guardados en la BBDD:
-La dirección que hemos utilizado de la API de Openweather, es una gratuita que nos trae la previsión actual y
de 5 días en adelante cada 3 horas.

-En el package.json, en el apartado script hay una comando llamado npm weather, el cual NO hay que lanzar. Este comando NO ha de lanzanrse ya que solo se lanza para llenar los datos una vez, en el archivo weather.js, hay dos apartado de Mongo uno con findOne() y otro con updateOne(). Esto es debido a que he intentado que se pudiera lanzar cada día el comando 'npm run weather' pero hay una fallo que trae al final de cada ejecución del comando que mete un array con la última fecha. Por lo que NO debe lanzarse el comando 'npm run weather' si no se vacía la colección primero.

-He dejado esos dos apartados porque la aplicación funciona sin problema, los datos metidos en la BBDD son desde 07-01-2021 hasta el 12-01-2021.

-También podemos disponer de un .json con los datos que nos son necesarios , el cual ha sido lanzado el 07-01-12.(Los mismos datos que se introducen en la BBDD).
