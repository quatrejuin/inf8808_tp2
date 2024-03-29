"use strict";

/**
 * Fichier permettant de traiter les données provenant du fichier CSV.
 */


/**
 * Précise le domaine en associant un nom de rue à une couleur précise.
 *
 * @param color   Échelle de 10 couleurs.
 * @param data    Données provenant du fichier CSV.
 */
function domainColor(color, data) {
  // TODO: Définir le domaine de la variable "color" en associant un nom de rue à une couleur.
  color.domain(data.columns.slice(1,11))
  // Test color("Berri") // Berri: "#1f77b4"
  // Changer la color de moyenne à noir
  var colorList = color.range()
  colorList[9] = "#000000"
  color.range(colorList)
}

/**
 * Convertit les dates se trouvant dans le fichier CSV en objet de type Date.
 *
 * @param data    Données provenant du fichier CSV.
 * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function parseDate(data) {
  // TODO: Convertir les dates du fichier CSV en objet de type Date.
  d3.map(data, function(d) {
    d.Date = d3.timeParse("%d/%m/%y")(d.Date)
  })
}

/**
 * Trie les données par nom de rue puis par date.
 *
 * @param color     Échelle de 10 couleurs (son domaine contient les noms de rues).
 * @param data      Données provenant du fichier CSV.
 *
 * @return Array    Les données triées qui seront utilisées pour générer les graphiques.
 *                  L'élément retourné doit être un tableau d'objets comptant 10 entrées, une pour chaque rue
 *                  et une pour la moyenne. L'objet retourné doit être de la forme suivante:
 *
 *                  [
 *                    {
 *                      name: string      // Le nom de la rue,
 *                      values: [         // Le tableau compte 365 entrées, pour les 365 jours de l'année.
 *                        date: Date,     // La date du jour.
 *                        count: number   // Le nombre de vélos compté ce jour là (effectuer une conversion avec parseInt)
 *                      ]
 *                    },
 *                     ...
 *                  ]
 */
function createSources(color, data) {
  // TODO: Retourner l'objet ayant le format demandé.
  
  var listList = []
  var curRue;
  for (var j=0;j < color.domain().length; j++)
  {
    curRue = color.domain()[j]
    var objList = []
    for (var i=0;i < data.length; i++)
    {
      objList.push({
        name: curRue,      // Le nom de la rue,
        values: {         // Le tableau compte 365 entrées, pour les 365 jours de l'année.
        date: data[i].Date,   // La date du jour.
        count: parseInt(data[i][curRue])   // Le nombre de vélos compté ce jour là (effectuer une conversion avec parseInt)
        }
        })
    }
    listList.push(objList)
  }
  return listList
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe X.
 *
 * @param xFocus      Échelle en X utilisée avec le graphique "focus".
 * @param xContext    Échelle en X utilisée avec le graphique "contexte".
 * @param data        Données provenant du fichier CSV.
 */
function domainX(xFocus, xContext, data) {
  // TODO: Préciser les domaines pour les variables "xFocus" et "xContext" pour l'axe X.
  xFocus.domain([data[0].Date, data[data.length -1].Date]);
  xContext.domain([data[0].Date, data[data.length -1].Date]);
}

/**
 * Précise le domaine des échelles utilisées par les graphiques "focus" et "contexte" pour l'axe Y.
 *
 * @param yFocus      Échelle en Y utilisée avec le graphique "focus".
 * @param yContext    Échelle en Y utilisée avec le graphique "contexte".
 * @param sources     Données triées par nom de rue et par date (voir fonction "createSources").
 */
function domainY(yFocus, yContext, sources) {
  // TODO: Préciser les domaines pour les variables "yFocus" et "yContext" pour l'axe Y.
  var maximum = d3.max(sources,function(s){
     return d3.max(s,function(d){
       return d.values.count
      })
    })
  yFocus.domain([0, maximum]);
  yContext.domain([0, maximum]); 
}
