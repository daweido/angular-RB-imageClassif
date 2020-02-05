const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var admin = require("firebase-admin");

var serviceAccount = require("./recipebook-854c0-firebase-adminsdk-aphzi-d39a8c0561.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipebook-854c0.firebaseio.com"
});

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAOGIA_yLQo2C_7f2nWsv7vlP1vZway81Q",
  authDomain: "recipebook-854c0.firebaseapp.com",
  databaseURL: "https://recipebook-854c0.firebaseio.com",
  projectId: "recipebook-854c0",
  storageBucket: "recipebook-854c0.appspot.com",
  messagingSenderId: "289202670476",
  appId: "1:289202670476:web:b82a312fb1d60460b064a9",
  measurementId: "G-6MEGWCYXCJ"
});

var db = firebase.firestore();

var recipes = [
  {
    "type": "Dessert",
    "name": "Gâteau au Chocolat",
    "ingredients": [
      {
        "name": "farine",
        "quantity": 3
      },
      {
        "name": "chocolat",
        "quantity": 4
      },
      {
        "name": "sucre",
        "quantity": 2
      },
      {
        "name": "oeuf",
        "quantity": 5
      },
      {
        "name": "beurre",
        "quantity": 1
      }
    ]
  },
  {
    "type": "Virus",
    "name": "Soupe Chauve Souris",
    "ingredients": [
      {
        "name": "Chauve Souris",
        "quantity": 3
      },
      {
        "name": "Tomate",
        "quantity": 6
      },
      {
        "name": "Huile",
        "quantity": 1
      },
      {
        "name": "Oignon",
        "quantity": 2
      },
      {
        "name": "Sel",
        "quantity": 1
      },
      {
        "name": "Poivre",
        "quantity": 1
      }
    ]
  },
  {
    "type": "Plat",
    "name": "Tagliatelles carbonara",
    "ingredients": [
      {
        "name": "Tagliatelles",
        "quantity": 7
      },
      {
        "name": "Lardons fumés",
        "quantity": 3
      },
      {
        "name": "Crème fraîche",
        "quantity": 2
      },
      {
        "name": "Oignon",
        "quantity": 1
      },
      {
        "name": "Ail",
        "quantity": 1
      },
      {
        "name": "Oeuf",
        "quantity": 2
      },
      {
        "name": "Sel",
        "quantity": 1
      },
      {
        "name": "Poivre",
        "quantity": 1
      }
    ]
  },
  {
    "type": "Dessert",
    "name": "Meringue",
    "ingredients": [
      {
        "name": "Blanc d'oeuf",
        "quantity": 4
      },
      {
        "name": "Sucre",
        "quantity": 30
      }
    ]
  },
  {
    "type": "Dessert",
    "name": "Palmiers",
    "ingredients": [
      {
        "name": "Pâte feuilletée",
        "quantity": 1
      },
      {
        "name": "Sucre en poudre",
        "quantity": 20
      },
      {
        "name": "Jaunes d'oeuf",
        "quantity": 2
      }
    ]
  },
  {
    "type": "Dessert",
    "name": "Tiramisu",
    "ingredients": [
      {
        "name": "Biscuits à la cuillère",
        "quantity": 1
      },
      {
        "name": "Sucre en poudre",
        "quantity": 20
      },
      {
        "name": "Jaunes d'oeuf",
        "quantity": 2
      },
      {
        "name": "Mascarpone",
        "quantity": 1
      },
      {
        "name": "Café liquide",
        "quantity": 20
      },
      {
        "name": "Cacao en poudre",
        "quantity": 2
      }
    ]
  },
  {
    "type": "Dessert",
    "name": "Crêpes",
    "ingredients": [
      {
        "name": "Lait",
        "quantity": 1
      },
      {
        "name": "Farine",
        "quantity": 20
      },
      {
        "name": "Oeuf",
        "quantity": 4
      },
      {
        "name": "Eau",
        "quantity": 6
      },
      {
        "name": "Sucre",
        "quantity": 20
      }
    ]
  },
  {
    "type": "Plat",
    "name": "Poulet",
    "ingredients": [
      {
        "name": "Poulet",
        "quantity": 1
      },
      {
        "name": "Tomate Cerise",
        "quantity": 4
      },
      {
        "name": "Oignon",
        "quantity": 2
      },
      {
        "name": "Ail",
        "quantity": 1
      },
      {
        "name": "Citron",
        "quantity": 1
      },
      {
        "name": "Sel",
        "quantity": 1
      },
      {
        "name": "Poivre",
        "quantity": 1
      }
    ]
  }
]

recipes.forEach(function (obj) {
  db.collection("recipes").add({
    type: obj.type,
    name: obj.name,
    ingredients: obj.ingredients
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
