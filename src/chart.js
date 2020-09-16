import * as d3 from "d3";
import {dispatch} from 'd3-dispatch'
import {GetCatDetails,GetCatMax,GetCatMin} from './Acces'
export var Chart=async ()=>{
    const svgdiv=document.getElementById('Chart')
      svgdiv.innerHTML=""
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    Width=400,
    Height=400,
    width = Width - margin.left - margin.right,
    height = Height - margin.top - margin.bottom,
    max= await GetCatMax()|10,
    min = await GetCatMin()|0;
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
        var xAxis =svg.append("g") //Add X axis to the SVG item
            .attr("transform",`translate(0,${height})`)
            .call(d3.axisBottom(X))
            .selectAll("text")
                .attr("transform",`translate(-10,0)rotate(-45)`)
                .style("text-anchor","end")
        var Y = d3.scaleLinear()//create Y axis
          .domain([(min<=0?0:min-1),max])
          .range([height,0])
        var yAxis=svg.append("g") // add The X axis to the SVG
          .call(d3.axisLeft(Y))

        var clip = svg.append("defs").append('svg:clipPath')
            .attr("id","clip")
            .append("svg:rect")
            .attr("width",width)
            .attr("height",height)
            .attr("x",0)
            .attr("y",0)
        var sequentialScale = d3.scaleSequential() //allow some color 
            .domain([0, 15])
            .interpolator(d3.interpolateCubehelixDefault)

        var brush = d3.brushX()
          .extent([[0,0],[width,height]])
          .on("end",(event)=>{
            updateChart(event)
          })

        var scatter=svg.append('g')
          .attr("clip-path","url(#clip)")

        var bar =scatter.selectAll("mvbar")
            .data(res)
            .enter()
            .append("rect")
              .attr("x",(d)=>X(d.Cat))
              .attr("y",(d)=>Y(d.Value))
              .attr("width",X.bandwidth())
              .attr("height",(d)=>height-Y(d.Value))
              .attr("fill",(d)=>sequentialScale(d.Value))

          scatter.append("g")
            .attr("class","brush")
            .call(brush)

            var idleTimeout
            function idled() { idleTimeout = null; }

          var updateChart =(event)=>{
            if(!event.sourceEvent) return;
            if(!event.selection) return;
            console.log(event)
            d3.select(this).transition().call(event.target.move,[event.selection[0],event.selection[1]])
              
          }
          })


}