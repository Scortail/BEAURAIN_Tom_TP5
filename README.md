**Reponse 1.1** 
Les en-têtes de la réponse http:
HTTP/1.1 200 OK
Date: Fri, 22 Sep 2023 06:36:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

**Reponse 1.2** 
Les en-têtes de la réponse http:
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 22 Sep 2023 06:37:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20

Nous pouvons voir que : 
Content-Type: en plus
Content-Length: en plus
Transfer-Encoding:  n'est plus présent
La ligne :response.setHeader("Content-Type", "application/json"); modifie ses valeurs

**Reponse 1.3** 
Il n'y a pas de réponse car une erreur est survenu et à était attrapé

**Reponse 1.4** 
L'erreur est que le fichier n'est pas trouvé car en veux ouvrir le fichier index.html alors que notre fichier s'appelle __index.html
[Error: ENOENT: no such file or directory, open 'C:\Users\tombe\OneDrive\Documents\UNIV 2023\S4\Web\devweb-tp5\index.html'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\tombe\\OneDrive\\Documents\\UNIV 2023\\S4\\Web\\devweb-tp5\\index.html'
}

**Reponse 1.5**
Cette fonction se base sur la fonction requestListener() donné dans le TP en 1.3 afin d'envoyer une erreur 500 au client en cas d'erreur dans le serveur et de manière asynchrone
async function requestListener(_request, response) {
    try {
      const contents = await fs.readFile("index.html", "utf8");
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      response.end(contents);
    } catch (error) {
      console.error(error);
      response.writeHead(500); // Erreur interne du serveur
      response.end("Erreur interne du serveur");
    }
}

**Reponse 1.6**
Les commandes npm install cross-env --save et npm install nodemon --save-dev ont rajouté un fichier "package-lock.json" ainsi qu'un dossier node_modules et dans notre fichier package.json, sa à rajouté :
"devDependencies": {
    "nodemon": "^3.0.1"
  }
En résumé ces commandes nous permette d'installer les packages nodemon et cross-env

**Reponse 1.7**
http-dev est utilisé pour le développement, avec rechargement automatique grâce à nodemon, tandis que http-prod est utilisé pour la production, sans rechargement automatique. Les valeurs de NODE_ENV différenciées entre les deux scripts peuvent être utilisées pour activer des comportements spécifiques en fonction de l'environnement.

**Reponse 1.8**
Pour :http://localhost:8000/index.html codeHttp = 200 La page est donc bien accéder par le client
Pour :http://localhost:8000/random.html codeHttp = 200
Pour :http://localhost:8000/ codeHttp = 404
Pour :http://localhost:8000/dont-exist codeHttp = 404

**Reponse 2.1**
URL de la doc http-errors : https://www.npmjs.com/package/http-errors
URL de la doc loglevel : https://www.npmjs.com/package/loglevel
URL de la doc morgan : https://www.npmjs.com/package/morgan

**Reponse 2.2**
Les trois routes fonctionnent, on obtient une reponse http 200

**Reponse 2.3**
Les entêtes de la réponse :
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Fri, 22 Sep 2023 05:42:03 GMT
ETag: W/"3ac-18abb68d2ec"
Content-Type: text/html; charset=UTF-8
Content-Length: 940
Date: Wed, 27 Sep 2023 06:56:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5

En plus des anciennes entêtes, nous avons : X-Powered-By, Accept-Ranges, Cache-Control, ETag.

**Reponse 2.4**
L'événement "listening" est déclenché lorsque le serveur HTTP démarre et commence à écouter les connexions entrantes sur le port spécifié. 
Lorsque la ligne de code: const server = app.listen(port, host); sera exécuté, l'événement "listening" sera déclenché

**Reponse 2.5**
L'option activée par défaut dans Express qui redirige automatiquement la route "/" vers "/index.html" est fallthrough. Par défaut, fallthrough est défini sur true pour la méthode express.static

**Reponse 2.6**
Avec le câche activer, en rechargeant la page simplement on obtient un code HTTP 304 qui veux dire que le fichier CSS n'a pas était modifié et qu'il le récupère à partir du câche directement. En utilisant ctrl shift R, on va forcer le raffraichissement et obtenir un code 200 comme on redemande tous au serveur

**Reponse 2.7**
En mode dev nous pouvons bien voir toute la Stacktrace de l'erreur survenue alors que en mode prod en voit juste le erreur 404 et l'erreur ( Le paramètre doit être un nombre)