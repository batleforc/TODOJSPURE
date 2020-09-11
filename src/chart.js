import * as d3 from "d3";
import {GetCatDetails} from './Acces'
export var Chart=()=>{
    const svgdiv=document.getElementById('Chart')
      svgdiv.innerHTML=""
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    Width=400,
    Height=400,
    width = Width - margin.left - margin.right,
    height = Height - margin.top - margin.bottom;
    var svg = d3.select("#Chart") //Create SVG item
    .append("svg")
      .attr("width",Width)
      .attr("height",Height)
    .append('g')
      .attr("transform",
        `translate(${margin.left},${margin.top})`)
    GetCatDetails().then(res=>{
        console.log(res)
        var X = d3.scaleBand() //Create X axis
            .range([0,width])
            .domain(res.map((d)=>d.Cat))
            .padding(0.2)
        svg.append("g") //Add X axis to the SVG item
            .attr("transform",`translate(0,${height})`)
            .call(d3.axisBottom(X))
            .selectAll("text")
                .attr("transform",`translate(-10,0)rotate(-45)`)
                .style("text-anchor","end")
        var Y = d3.scaleLinear()//create Y axis
          .domain([0,15])
          .range([height,0])
        svg.append("g") // add The X axis to the SVG
          .call(d3.axisLeft(Y))
        var sequentialScale = d3.scaleSequential() //allow some color 
            .domain([0, 15])
            .interpolator(d3.interpolateCubehelixDefault)
        svg.selectAll("mvbar")
            .data(res)
            .enter()
            .append("rect")
              .attr("x",(d)=>X(d.Cat))
              .attr("y",(d)=>Y(d.Value))
              .attr("width",X.bandwidth())
              .attr("height",(d)=>height-Y(d.Value))
              .attr("fill",(d)=>sequentialScale(d.Value))
    })

}