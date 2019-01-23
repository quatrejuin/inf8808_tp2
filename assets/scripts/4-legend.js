"use strict";

/**
 * Fichier permettant de générer la légende et de gérer les interactions de celle-ci.
 */


/**
 * Crée une légende à partir de la source.
 *
 * @param svg       L'élément SVG à utiliser pour créer la légende.
 * @param sources   Données triées par nom de rue et par date.
 * @param color     Échelle de 10 couleurs.
 */
function legend(svg, sources, color) {
  // TODO: Créer la légende accompagnant le graphique.
  legend = svg.append("g")
  .attr("class","legend")
  .attr("transform","translate(50,30)")
  .style("font-size","12px")

  // background
  legend.append("rect")
  .attr("transform","translate(40,-15)")  
  .attr("width", 170)
  .attr("height", 250)
  .attr("opacity",0.7)
  .attr("fill", "#eeeeee")


  legend = legend.selectAll(".oneLegend")
  .data(color.domain())
  .enter()

  var padding = 4
  var boxSize = 19
  var startPos = 55

  //append legend colour blocks
  legend.append("rect")
  .attr("x", startPos)
  .attr("y", function(d,i){ return i*(boxSize+padding)-5})
  .attr("class", "oneLegend")
  .attr("width", boxSize)
  .attr("height", boxSize)
  .attr("stroke","#333333")
  .attr("fill", function(d){ return color(d)})
  .on("click", function (d) {
    if (d3.select(this).attr("fill") == '#ffffff') 
    {
      d3.select(this).attr("fill",d3.select(this).attr("originalColor"))
      .attr("originalColor",null);
    }
    else
    {
      d3.select(this)
      .attr("originalColor",d3.select(this).attr("fill"))
      .attr("fill","#ffffff");
    }
    
    displayLine(d3.select(this),color);

    svg.selectAll(".focusLine,.contextLine")
    .attr("stroke", function(d){ 
      return color(d[0].name)
    })
    .attr("opacity", function(d){ 
      if (color(d[0].name) == "#ffffff")
      {
        return 0
      }
    })   // si la couleur est #ffffff, met l'opacity à 0%
    }
  );

  //append legend texts
  legend.append("text")
  .attr("x", startPos + boxSize+padding)
  .attr("y", function(d,i){ return i*(boxSize+padding)+10})
  .attr("class", "oneLegend")
  .text(function(d) {
    return d;
  });

}

/**
 * Permet d'afficher ou non la ligne correspondant au carré qui a été cliqué.
 *
 * En cliquant sur un carré, on fait disparaitre/réapparaitre la ligne correspondant et l'intérieur du carré
 * devient blanc/redevient de la couleur d'origine.
 *
 * @param element   Le carré qui a été cliqué.
 * @param color     Échelle de 10 couleurs.
 */
function displayLine(element, color) {
  // TODO: Compléter le code pour faire afficher ou disparaître une ligne en fonction de l'élément cliqué.
  var lineColor = element.attr("fill")
  var lineIdx = color.domain().indexOf(element.data()[0])
  var colorList = color.range()
  colorList[lineIdx] = lineColor
  color.range(colorList)
}
