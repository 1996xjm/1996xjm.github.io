
class BarPlot  {
    constructor(mainPlot) {

        this.mainPlot = mainPlot

    }

    drawHorizontalBar(mainGroup, barData) {

        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")
            .attr("transform", d => `translate(0, ${d.barStart})`)


        barG.append("rect")
            .attr("width", d => d.barHeight)
            .attr("height", d => d.barWidth)
            .attr("fill", d => d.fill)
            .attr("class", barData.barStyle.id)
            .call(rect => {
                this.mainPlot.renderAttr(rect, barData.barStyle)
            })

        if (barData.textStyle.switch.value) {
            barG.append("g")
                .attr('transform', d => `translate(${(barData.textStyle.align && barData.textStyle.align.value) ? 0 : d.textY},0)`)
                .append("text")
                .text(d => d.text)
                .attr("class", barData.textStyle.id)

                .attr('y', d=>d.textX)
                .attr('dy', "0.35em")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${d.barHeight},${d.barWidth/2})`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => d.fill)

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("x1", d=>d.sd)


                    }else {
                        errorG.append("line")
                            .attr("x1", d=>-d.sd)
                            .attr("x2", d=>d.sd)

                        errorG.append("line")
                            .attr("y1", d=>-d.barWidth*errorBarWidthRate/2)
                            .attr("x1", d=>-d.sd)
                            .attr("x2", d=>-d.sd)
                            .attr("y2", d=>d.barWidth*errorBarWidthRate/2)
                    }


                    errorG.append("line")
                        .attr("y1", d=>-d.barWidth*errorBarWidthRate/2)
                        .attr("x1", d=>d.sd)
                        .attr("x2", d=>d.sd)
                        .attr("y2", d=>d.barWidth*errorBarWidthRate/2)




                })
        }
        if(barData.pointStyle && barData.pointStyle.switch.value){

            barG.selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>d.cy)
                .attr("cy",d=>d.cx)
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)
                    if(barData.pointStyle["fill-as-bar"].value){
                        circle.attr("fill", d=>d.fill)
                    }else {
                        circle.attr("fill", barData.pointStyle.fill.value)
                    }
                })

        }
        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${barData.maxHeight+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.to)+innerScale.bandwidth()/2)
                            path.lineTo(-8,innerScale(d.to)+innerScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        // .attr("text-orientation","upright")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }



    }

    drawVerticalBar(mainGroup, barData) {

        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        if(barData.initType == "onLoadData"){
            barG
                .attr("transform", d => `translate(${d.barStart},${0})`)
                .transition()
                .ease(d3.easeBounceOut)
                .delay(function(d, i) { return i * 100; })
                .duration(800)
                .attr("transform", d => `translate(${d.barStart},${d.barY})`)
        }else {
            barG.attr("transform", d => `translate(${d.barStart},${d.barY})`)
        }



        barG.append('rect')
            .attr("class", barData.barStyle.id)
            .attr('y', d => d.barHeight<0?d.barHeight:0)
            .attr('width', d => d.barWidth)
            .attr('height', d => Math.abs(d.barHeight))
            .attr('fill', d => d.fill)
            .call(rect => {
                this.mainPlot.renderAttr(rect, barData.barStyle)

            })

        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${d.barWidth/2},0)`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => d.fill)

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("y1", d=>-d.sd)


                    }else {
                        errorG.append("line")
                            .attr("y1", d=>-d.sd)
                            .attr("y2", d=>d.sd)

                        errorG.append("line")
                            .attr("x1", d=>-d.barWidth*errorBarWidthRate/2)
                            .attr("y1", d=>d.sd)
                            .attr("y2", d=>d.sd)
                            .attr("x2", d=>d.barWidth*errorBarWidthRate/2)
                    }

                    errorG.append("line")
                        .attr("x1", d=>-d.barWidth*errorBarWidthRate/2)
                        .attr("y1", d=>-d.sd)
                        .attr("y2", d=>-d.sd)
                        .attr("x2", d=>d.barWidth*errorBarWidthRate/2)




                })
        }



        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => d.text)
                .attr("class", barData.textStyle.id)
                .attr('y', d => d.textY)
                .attr('x', d=>d.textX)
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){
            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(${d.barStart},0)`)
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>d.cx)
                .attr("cy",d=>d.cy)
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)
                    if(barData.pointStyle["fill-as-bar"].value){
                        circle.attr("fill", d=>d.fill)
                    }else {
                        circle.attr("fill", barData.pointStyle.fill.value)
                    }
                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(0,${barData.maxHeight-i*spacing-12})`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(innerScale(d.from)+innerScale.bandwidth()/2,8)
                            path.lineTo(innerScale(d.from)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,8)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            console.log(d)
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("x",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("text-anchor","middle")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }


    }

    drawVerticalBar1(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale, patternScale, strokeColorScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        if(barData.initType == "onLoadData"){
            barG
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${0})`)
                .transition()
                .ease(d3.easeBounceOut)
                .delay(function(d, i) { return i * 100; })
                .duration(800)
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }else {
            barG.attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }



        barG.append('rect')
            .attr("class", barStyle.id)
            .attr('y', d => d.value < 0 ? (valueScale(0) - valueScale(d.value)):0)
            .attr('width', d => innerScale.bandwidth())
            .attr('height', d => {
                console.log(this.mainPlot.innerHeight, d.value, valueScale(d.value))
                let h = Math.abs(valueScale(0) - valueScale(d.value));
                if(d.value > 0 && h+valueScale(d.value) > this.mainPlot.innerHeight){
                    h = this.mainPlot.innerHeight - valueScale(d.value)
                }
                return h
h            })
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(rect => {
                this.mainPlot.renderAttr(rect, barStyle)
                if(strokeColorScale){

                    rect.attr("stroke",d=>strokeColorScale(d.colorScaleKey))
                }
                if(patternScale){
                    console.log("90000")
                    rect.filter(d=> {
                        console.log(patternScale(d.colorScaleKey))
                        return patternScale(d.colorScaleKey) != "None"
                    })
                        .clone()
                        .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                }

            })





        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${innerScale.bandwidth()/2},0)`)
                        .attr("class", barData.errorBarStyle.id)


                        if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                            errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                        }else {
                            errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                        }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("y1", d=>(valueScale(d.value) - valueScale(d.value+d.sd)) * (d.value<0?1:-1))


                    }else {
                        errorG.append("line")
                            .attr("y1", d=>-(valueScale(d.value) - valueScale(d.value+d.sd)))
                            .attr("y2", d=>(valueScale(d.value) - valueScale(d.value+d.sd)))

                        errorG.append("line")
                            .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }

                    errorG.append("line")
                        .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }



        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr("transform", d => `translate(${innerScale.bandwidth()/2},${d.value >= 0 ?-5:15})`)
                .attr('text-anchor', "middle")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){
            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},0)`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
            .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>Math.random()*innerScale.bandwidth())
                .attr("cy",d=>valueScale(d))
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(0,${valueScale(barData.maxValue)-i*spacing-12})`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(innerScale(d.from)+innerScale.bandwidth()/2,8)
                            path.lineTo(innerScale(d.from)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,8)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{

                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("x",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("text-anchor","middle")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }


    }
    drawHorizontalBar1(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale, patternScale, strokeColorScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


            barG.attr("transform", d => `translate(${valueScale(0)},${innerScale(d.innerScaleKey)})`)




        barG.append('rect')
            .attr("class", barStyle.id)
            .attr('x', d => d.value < 0 ? (valueScale(d.value) - valueScale(0)):0)
            .attr('height', d => innerScale.bandwidth())
            .attr('width', d => Math.abs(valueScale(0) - valueScale(d.value)))
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(rect => {
                this.mainPlot.renderAttr(rect, barStyle)
                if(strokeColorScale){

                    rect.attr("stroke",d=>strokeColorScale(d.colorScaleKey))
                }
                if(patternScale){
                    console.log("90000")
                    rect.filter(d=> {
                        console.log(patternScale(d.colorScaleKey))
                        return patternScale(d.colorScaleKey) != "None"
                    })
                        .clone()
                        .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                }
            })

        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${valueScale(d.value) - valueScale(0)},${innerScale.bandwidth()/2})`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) * (d.value<0?-1:1))


                    }else {
                        errorG.append("line")
                            .attr("x1", d=>-(valueScale(d.value+d.sd) - valueScale(d.value)))
                            .attr("x2", d=>valueScale(d.value+d.sd) - valueScale(d.value))

                        errorG.append("line")
                            .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }


                    errorG.append("line")
                        .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }


        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr('text-anchor',d=>d.value >= 0 ? "start":"end")
                .attr("transform", d => `translate(${valueScale(d.value) - valueScale(0) + (d.value >= 0 ?5:-5)},${innerScale.bandwidth()/2})`)
                .attr('dy', "0.35em")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){

            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(0,${innerScale(d.innerScaleKey)})`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>valueScale(d))
                .attr("cy",d=>Math.random()*innerScale.bandwidth())
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${valueScale(barData.maxValue)+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.to)+innerScale.bandwidth()/2)
                            path.lineTo(-8,innerScale(d.to)+innerScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        // .attr("text-orientation","upright")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }

    }
    drawVerticalPoint(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale, patternScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        if(barData.initType == "onLoadData"){
            barG
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${0})`)
                .transition()
                .ease(d3.easeBounceOut)
                .delay(function(d, i) { return i * 100; })
                .duration(800)
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }else {
            barG.attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }



        barG.append('circle')
            .attr("class", barStyle.id)
            // .attr('cy', d => d.value < 0 ? (valueScale(0) - valueScale(d.value)):0)
            .attr('cx', d => innerScale.bandwidth()/2)
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(rect => {
                this.mainPlot.renderAttr(rect, barStyle)
                if(patternScale){
                    console.log("90000")
                    rect.filter(d=> {
                        console.log(patternScale(d.colorScaleKey))
                        return patternScale(d.colorScaleKey) != "None"
                    })
                        .clone()
                        .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                }

            })





        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${innerScale.bandwidth()/2},0)`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("y1", d=>(valueScale(d.value) - valueScale(d.value+d.sd)) * (d.value<0?1:-1))


                    }else {
                        errorG.append("line")
                            .attr("y1", d=>-(valueScale(d.value) - valueScale(d.value+d.sd)))
                            .attr("y2", d=>(valueScale(d.value) - valueScale(d.value+d.sd)))

                        errorG.append("line")
                            .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }

                    errorG.append("line")
                        .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }



        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr("transform", d => `translate(${innerScale.bandwidth()/2},${d.value >= 0 ?-5:15})`)
                .attr('text-anchor', "middle")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){
            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},0)`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>Math.random()*innerScale.bandwidth())
                .attr("cy",d=>valueScale(d))
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(0,${valueScale(barData.maxValue)-i*spacing-12})`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(innerScale(d.from)+innerScale.bandwidth()/2,8)
                            path.lineTo(innerScale(d.from)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,8)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("x",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("text-anchor","middle")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }


    }
    drawHorizontalPoint(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale, patternScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        barG.attr("transform", d => `translate(${valueScale(d.value)},${innerScale(d.innerScaleKey)})`)




        barG.append('circle')
            .attr("class", barStyle.id)
            // .attr('cx', d => valueScale(d.value))
            .attr('cy', d => innerScale.bandwidth()/2)
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(rect => {
                this.mainPlot.renderAttr(rect, barStyle)
                if(patternScale){
                    console.log("90000")
                    rect.filter(d=> {
                        console.log(patternScale(d.colorScaleKey))
                        return patternScale(d.colorScaleKey) != "None"
                    })
                        .clone()
                        .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                }
            })

        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(0,${innerScale.bandwidth()/2})`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) * (d.value<0?-1:1))


                    }else {
                        errorG.append("line")
                            .attr("x1", d=>-(valueScale(d.value+d.sd) - valueScale(d.value)))
                            .attr("x2", d=>valueScale(d.value+d.sd) - valueScale(d.value))

                        errorG.append("line")
                            .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }


                    errorG.append("line")
                        .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }


        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr('text-anchor',d=>d.value >= 0 ? "start":"end")
                .attr("transform", d => `translate(${valueScale(d.value) - valueScale(0) + (d.value >= 0 ?5:-5)},${innerScale.bandwidth()/2})`)
                .attr('dy', "0.35em")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){

            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(0,${innerScale(d.innerScaleKey)})`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>valueScale(d))
                .attr("cy",d=>Math.random()*innerScale.bandwidth())
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${valueScale(barData.maxValue)+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.to)+innerScale.bandwidth()/2)
                            path.lineTo(-8,innerScale(d.to)+innerScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        // .attr("text-orientation","upright")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }

    }
    drawVerticalLollipop(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale,lineStyle, patternScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        if(barData.initType == "onLoadData"){
            barG
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${0})`)
                .transition()
                .ease(d3.easeBounceOut)
                .delay(function(d, i) { return i * 100; })
                .duration(800)
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }else {
            barG.attr("transform", d => `translate(${innerScale(d.innerScaleKey)},${valueScale(d.value)})`)
        }

        barG.append("line")
            .attr("class",lineStyle.id)
            .attr("x1",innerScale.bandwidth()/2)
            .attr("x2",innerScale.bandwidth()/2)
            .attr("y2",d => d.value < 0 ? (valueScale(0) - valueScale(d.value)):Math.abs(valueScale(0) - valueScale(d.value)))
            .call(line=>{
                this.mainPlot.renderAttr(line, lineStyle)
            })

        barG.append("circle")
            .attr("class", barStyle.id)
            .attr("cx",innerScale.bandwidth()/2)
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(circle=>{
                this.mainPlot.renderAttr(circle, barStyle)
                if(barData.rScale){
                    circle.attr("r",d=>barData.rScale(Math.abs(d.value)))
                }
                        if(patternScale){
                            console.log("90000")
                            circle.filter(d=> {
                                console.log(patternScale(d.colorScaleKey))
                                return patternScale(d.colorScaleKey) != "None"
                            })
                                .clone()
                                .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                        }
            })

        // barG.append('rect')
        //     .attr("class", barStyle.id)
        //     .attr('y', d => d.value < 0 ? (valueScale(0) - valueScale(d.value)):0)
        //     .attr('width', d => innerScale.bandwidth())
        //     .attr('height', d => Math.abs(valueScale(0) - valueScale(d.value)))
        //     .attr('fill', d => colorScale(d.colorScaleKey))
        //     .call(rect => {
        //         this.mainPlot.renderAttr(rect, barStyle)
        //         if(patternScale){
        //             console.log("90000")
        //             rect.filter(d=> {
        //                 console.log(patternScale(d.colorScaleKey))
        //                 return patternScale(d.colorScaleKey) != "None"
        //             })
        //                 .clone()
        //                 .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
        //         }
        //
        //     })





        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${innerScale.bandwidth()/2},0)`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("y1", d=>(valueScale(d.value) - valueScale(d.value+d.sd)) * (d.value<0?1:-1))


                    }else {
                        errorG.append("line")
                            .attr("y1", d=>-(valueScale(d.value) - valueScale(d.value+d.sd)))
                            .attr("y2", d=>(valueScale(d.value) - valueScale(d.value+d.sd)))

                        errorG.append("line")
                            .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }

                    errorG.append("line")
                        .attr("x1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("y1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }



        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr("transform", d => `translate(${innerScale.bandwidth()/2},0)`)
                .attr("dy", "0.35em")
                .attr('text-anchor', "middle")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){
            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(${innerScale(d.innerScaleKey)},0)`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>Math.random()*innerScale.bandwidth())
                .attr("cy",d=>valueScale(d))
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(0,${valueScale(barData.maxValue)-i*spacing-12})`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(innerScale(d.from)+innerScale.bandwidth()/2,8)
                            path.lineTo(innerScale(d.from)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,0)
                            path.lineTo(innerScale(d.to)+innerScale.bandwidth()/2,8)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("x",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("text-anchor","middle")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }


    }
    drawHorizontalLollipop(mainGroup, barData) {

        let {innerScale,valueScale,barStyle,colorScale, lineStyle, patternScale} = barData


        let barG = mainGroup.selectAll("newbar")
            .data(barData)
            .join("g")


        barG.attr("transform", d => `translate(${valueScale(0)},${innerScale(d.innerScaleKey)})`)

        barG.append("line")
            .attr("class",lineStyle.id)
            .attr("y1",innerScale.bandwidth()/2)
            .attr("y2",innerScale.bandwidth()/2)
            .attr("x2",d => d.value < 0 ? (valueScale(d.value) - valueScale(0)):Math.abs(valueScale(0) - valueScale(d.value)))
            .call(line=>{
                this.mainPlot.renderAttr(line, lineStyle)
            })

        barG.append("circle")
            .attr("class", barStyle.id)
            .attr("cy",innerScale.bandwidth()/2)
            .attr("cx",d => d.value < 0 ? (valueScale(d.value) - valueScale(0)):Math.abs(valueScale(0) - valueScale(d.value)))
            .attr('fill', d => colorScale(d.colorScaleKey))
            .call(circle=>{
                this.mainPlot.renderAttr(circle, barStyle)
                if(barData.rScale){
                    circle.attr("r",d=>barData.rScale(Math.abs(d.value)))
                }
                if(patternScale){
                    console.log("90000")
                    circle.filter(d=> {
                        console.log(patternScale(d.colorScaleKey))
                        return patternScale(d.colorScaleKey) != "None"
                    })
                        .clone()
                        .attr("fill",d=>`url(#pattern-${patternScale(d.colorScaleKey)})`)
                }
            })



        if(barData.errorBarStyle){
            barG
                .call(g=>{

                    let errorG = g.append("g")
                        .attr("transform", d=>`translate(${valueScale(d.value) - valueScale(0)},${innerScale.bandwidth()/2})`)
                        .attr("class", barData.errorBarStyle.id)


                    if(barData.errorBarStyle["stroke-as-bar"] && barData.errorBarStyle["stroke-as-bar"].value){
                        errorG.attr('stroke', d => colorScale(d.colorScaleKey))

                    }else {
                        errorG.attr('stroke', barData.errorBarStyle.stroke.value)
                    }
                    this.mainPlot.renderAttr(errorG, barData.errorBarStyle)

                    let errorBarWidthRate = 0.3

                    if(barData.errorBarStyle["single-side"] && barData.errorBarStyle["single-side"].value){
                        errorG.append("line")
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) * (d.value<0?-1:1))


                    }else {
                        errorG.append("line")
                            .attr("x1", d=>-(valueScale(d.value+d.sd) - valueScale(d.value)))
                            .attr("x2", d=>valueScale(d.value+d.sd) - valueScale(d.value))

                        errorG.append("line")
                            .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                            .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?1:-1))
                            .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)
                    }


                    errorG.append("line")
                        .attr("y1", d=>-innerScale.bandwidth()*errorBarWidthRate/2)
                        .attr("x1", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("x2", d=>(valueScale(d.value+d.sd) - valueScale(d.value)) *  (d.value<0?-1:1))
                        .attr("y2", d=>innerScale.bandwidth()*errorBarWidthRate/2)




                })
        }


        if (barData.textStyle.switch.value) {
            barG.append("text")
                .text(d => {

                    if (barData.textStyle["round-decimals"]){
                        d.value = d3.format(`.${barData.textStyle["round-decimals"].value}f`)(d.value)
                    }
                    if (barData.textStyle["value-format"] && barData.textStyle["value-format"].value){
                        d.value = d3.format(barData.textStyle["value-format"].value)(d.value)
                    }

                    return barData.textStyle.suffix ? `${d.value}${barData.textStyle.suffix.value}` : d.value
                })
                .attr("class", barData.textStyle.id)
                .attr('text-anchor',d=>d.value >= 0 ? "middle":"middle")
                .attr("transform", d => `translate(${valueScale(d.value) - valueScale(0)},${innerScale.bandwidth()/2})`)
                .attr('dy', "0.35em")
                .call(t=>{
                    this.mainPlot.renderAttr(t,barData.textStyle)
                })


        }
        if(barData.pointStyle && barData.pointStyle.switch.value){

            mainGroup.append("g")
                .selectAll("pointG")
                .data(barData)
                .join("g")
                .attr("transform", d => `translate(0,${innerScale(d.innerScaleKey)})`)
                .attr("fill",d=>{
                    if(barData.pointStyle["fill-as-bar"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return barData.pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.rawData)
                .join("circle")
                .attr("cx",d=>valueScale(d))
                .attr("cy",d=>Math.random()*innerScale.bandwidth())
                .attr("class", barData.pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, barData.pointStyle)

                })

        }

        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){
            let spacing = barData.significanceStyle.Line.spacing.value
            let innerScale = barData.innerScale

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${valueScale(barData.maxValue)+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class", barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.from)+innerScale.bandwidth()/2)
                            path.lineTo(0,innerScale(d.to)+innerScale.bandwidth()/2)
                            path.lineTo(-8,innerScale(d.to)+innerScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerScale(d.to)+innerScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerScale(d.from)+innerScale(d.to)+innerScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        // .attr("text-orientation","upright")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })
        }

    }

    drawVerticalBox(mainGroup, barData) {


        let {innerxScale,yScale,boxStyle,colorScale,pointStyle, outlierPointStyle} = barData



        let boxG = mainGroup.selectAll(".newBox")
            .data(barData)
            .join("g")
            .attr("transform", d=>`translate(${innerxScale(d.name)},0)`)
            .attr('id',d=>d.name)
            .call(g=>{

                let strokeColor = boxStyle.stroke.value


                g.append('rect')
                    .attr('x','0')
                    .attr('y',d=>yScale(d.q3))
                    .attr('width',innerxScale.bandwidth())
                    .attr('height',d=>yScale(d.q1)-yScale(d.q3))
                    .attr("class", boxStyle.id)
                    .attr('fill',d=>colorScale(d.colorScaleKey))
                    .call(rect=>{
                        this.mainPlot.renderAttr(rect, boxStyle)


                        rect.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)


                    })

                g.append('line')
                    .attr('x1',innerxScale.bandwidth()/2)
                    .attr('x2',innerxScale.bandwidth()/2)
                    .attr('y1',d=>yScale(d.max))
                    .attr('y2',d=>yScale(d.q3))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })

                if(boxStyle["terminal-line"] && boxStyle["terminal-line"].value){
                    let lineWidth = innerxScale.bandwidth()/8
                    g.append('line')
                        .attr('x1',innerxScale.bandwidth()/2-lineWidth)
                        .attr('x2',innerxScale.bandwidth()/2+lineWidth)
                        .attr('y1',d=>yScale(d.max))
                        .attr('y2',d=>yScale(d.max))
                        .attr("class", boxStyle.id)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,boxStyle)
                            L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                        })

                    g.append('line')
                        .attr('x1',innerxScale.bandwidth()/2-lineWidth)
                        .attr('x2',innerxScale.bandwidth()/2+lineWidth)
                        .attr('y1',d=>yScale(d.min))
                        .attr('y2',d=>yScale(d.min))
                        .attr("class", boxStyle.id)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,boxStyle)
                            L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                        })
                }





                g.append('line')
                    .attr('x1',innerxScale.bandwidth()/2)
                    .attr('x2',innerxScale.bandwidth()/2)
                    .attr('y1',d=>yScale(d.q1))
                    .attr('y2',d=>yScale(d.min))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })






                g.append('line')
                    .attr('x1',0)
                    .attr('x2',innerxScale.bandwidth())
                    .attr('y1',d=>yScale(d.m))
                    .attr('y2',d=>yScale(d.m))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })




            })


        if(pointStyle && pointStyle.switch.value){


            let offset = pointStyle.offset ? pointStyle.offset.value:0
            let isCustomWidth = pointStyle["width-as-box"] ? !pointStyle["width-as-box"].value:false


            boxG.append("g")
                .attr("fill",d=>{
                    if(pointStyle["fill-as-box"].value){
                       return colorScale(d.colorScaleKey)
                    }else {
                        return  pointStyle.fill.value
                    }
                })
                .selectAll("point")
                        .data(d=> d.dataArr)
                        .join("circle")
                        .attr("cx",d=>{

                            let cx_start = 0 + offset
                            let cx_end = innerxScale.bandwidth() + offset
                            if(isCustomWidth){
                                let width = pointStyle["distribution-width"].value/2
                                cx_start = innerxScale.bandwidth()/2-width + offset
                                cx_end = innerxScale.bandwidth()/2+width + offset

                            }
                            return Math.random()*(cx_end-cx_start) + cx_start
                        })
                        .attr("cy",d=>yScale(d))
                        .attr("class", pointStyle.id)
                        .call(circle=>{
                            this.mainPlot.renderAttr(circle, pointStyle)

                        })


        }
        if(outlierPointStyle && outlierPointStyle.switch.value) {
            boxG.append("g")
                .attr("fill", d => {
                    if (outlierPointStyle["fill-as-box"].value) {
                        return colorScale(d.colorScaleKey)
                    } else {
                        return outlierPointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d => d.dataArr.filter(v => v < d.min || v > d.max))
                .join("circle")
                .attr("cx", d => innerxScale.bandwidth() / 2)
                .attr("cy", d => yScale(d))
                .attr("class", outlierPointStyle.id)
                .call(circle => {
                    this.mainPlot.renderAttr(circle, outlierPointStyle)

                })
        }
        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){





            let spacing = barData.significanceStyle.Line.spacing.value

            let outer_line = barData.significanceStyle.Line["outer-line"] ? barData.significanceStyle.Line["outer-line"].value : 8

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(0,${yScale(barData.maxValue)-i*spacing-12})`)
                .call(g=>{

                    g.append("path")
                        .attr("class",barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(innerxScale(d.from)+innerxScale.bandwidth()/2,outer_line)
                            path.lineTo(innerxScale(d.from)+innerxScale.bandwidth()/2,0)
                            path.lineTo(innerxScale(d.to)+innerxScale.bandwidth()/2,0)
                            path.lineTo(innerxScale(d.to)+innerxScale.bandwidth()/2,outer_line)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerxScale(d.to)+innerxScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("x",d=>(innerxScale(d.from)+innerxScale(d.to)+innerxScale.bandwidth())/2)
                        .attr("text-anchor","middle")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })

                    g.append("title")
                        .text(d=>d.pValue)
                })

        }



    }
    drawCircleBox(mainGroup, barData) {


        let {innerxScale,xScale,boxStyle,colorScale,pointStyle,translateX} = barData



        let boxG = mainGroup.selectAll(".newBox")
            .data(barData)
            .join("g")
            // .attr("transform", d=>`translate(0,${innerxScale(d.name)})`)
            .attr("transform", d=> `rotate(${innerxScale(d.name) }) translate(${translateX},0)`)
            .attr('id',d=>d.name)
            .call(g=>{

                let strokeColor = boxStyle.stroke.value


                g.append('rect')
                    .attr('x',d=>xScale(d.q1))
                    .attr("y", -innerxScale.bandwidth()/2)
                    .attr('height',innerxScale.bandwidth())
                    .attr('width',d=>xScale(d.q3)-xScale(d.q1))
                    .attr("class", boxStyle.id)
                    .attr('fill',d=>colorScale(d.colorScaleKey))
                    .call(rect=>{
                        this.mainPlot.renderAttr(rect, boxStyle)


                        rect.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)


                    })

                g.append('line')

                    .attr('x1',d=>xScale(d.max))
                    .attr('x2',d=>xScale(d.q3))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })



                // g.append('line')
                //     .attr('x1',2)
                //     .attr('x2',this.boxWidth-2)
                //     .attr('y1',d=>this.yScale(d.max))
                //     .attr('y2',d=>this.yScale(d.max))
                //     .attr('stroke','black')
                //     .attr('stroke-width',this.bocStrokWidth)


                g.append('line')

                    .attr('x1',d=>xScale(d.q1))
                    .attr('x2',d=>xScale(d.min))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })



                // g.append('line')
                //     .attr('x1',2)
                //     .attr('x2',this.boxWidth-2)
                //     .attr('y1',d=>this.yScale(d.min))
                //     .attr('y2',d=>this.yScale(d.min))
                //     .attr('stroke','black')
                //     .attr('stroke-width',this.bocStrokWidth)


                g.append('line')
                    .attr('y1',-innerxScale.bandwidth()/2)
                    .attr('y2',innerxScale.bandwidth()/2)
                    .attr('x1',d=>xScale(d.m))
                    .attr('x2',d=>xScale(d.m))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })




            })

        if(barData.pointStyle && barData.pointStyle.switch.value){


            boxG.append("g")
                .attr("fill",d=>{
                    if(pointStyle["fill-as-box"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return  pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.dataArr)
                .join("circle")
                .attr("cy",d=>{
                    let cx_start = -innerxScale.bandwidth()/2
                    let cx_end = innerxScale.bandwidth()/2
                    return Math.random()*(cx_end-cx_start) + cx_start
                })
                .attr("cx",d=>xScale(d))
                .attr("class", pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, pointStyle)

                })


        }
        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){


            let spacing = barData.significanceStyle.Line.spacing.value

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${xScale(barData.maxValue)+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class",barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerxScale(d.from)+innerxScale.bandwidth()/2)
                            path.lineTo(0,innerxScale(d.from)+innerxScale.bandwidth()/2)
                            path.lineTo(0,innerxScale(d.to)+innerxScale.bandwidth()/2)
                            path.lineTo(-8,innerxScale(d.to)+innerxScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerxScale(d.to)+innerxScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerxScale(d.from)+innerxScale(d.to)+innerxScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })

        }


    }
    drawHorizontalBox(mainGroup, barData) {


        let {innerxScale,xScale,boxStyle,colorScale,pointStyle,outlierPointStyle} = barData



        let boxG = mainGroup.selectAll(".newBox")
            .data(barData)
            .join("g")
            .attr("transform", d=>`translate(0,${innerxScale(d.name)})`)
            .attr('id',d=>d.name)
            .call(g=>{

                let strokeColor = boxStyle.stroke.value


                g.append('rect')
                    .attr('x',d=>xScale(d.q1))
                    .attr('height',innerxScale.bandwidth())
                    .attr('width',d=>xScale(d.q3)-xScale(d.q1))
                    .attr("class", boxStyle.id)
                    .attr('fill',d=>colorScale(d.colorScaleKey))
                    .call(rect=>{
                        this.mainPlot.renderAttr(rect, boxStyle)


                        rect.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)


                    })

                g.append('line')
                    .attr('y1',innerxScale.bandwidth()/2)
                    .attr('y2',innerxScale.bandwidth()/2)
                    .attr('x1',d=>xScale(d.max))
                    .attr('x2',d=>xScale(d.q3))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })

                if(boxStyle["terminal-line"] && boxStyle["terminal-line"].value){
                    let lineWidth = innerxScale.bandwidth()/8
                    g.append('line')
                        .attr('y1',innerxScale.bandwidth()/2-lineWidth)
                        .attr('y2',innerxScale.bandwidth()/2+lineWidth)
                        .attr('x1',d=>xScale(d.max))
                        .attr('x2',d=>xScale(d.max))
                        .attr("class", boxStyle.id)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,boxStyle)
                            L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                        })

                    g.append('line')
                        .attr('y1',innerxScale.bandwidth()/2-lineWidth)
                        .attr('y2',innerxScale.bandwidth()/2+lineWidth)
                        .attr('x1',d=>xScale(d.min))
                        .attr('x2',d=>xScale(d.min))
                        .attr("class", boxStyle.id)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,boxStyle)
                            L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                        })
                }






                g.append('line')
                    .attr('y1',innerxScale.bandwidth()/2)
                    .attr('y2',innerxScale.bandwidth()/2)
                    .attr('x1',d=>xScale(d.q1))
                    .attr('x2',d=>xScale(d.min))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })




                g.append('line')
                    .attr('y1',0)
                    .attr('y2',innerxScale.bandwidth())
                    .attr('x1',d=>xScale(d.m))
                    .attr('x2',d=>xScale(d.m))
                    .attr("class", boxStyle.id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L,boxStyle)
                        L.attr("stroke", d=>boxStyle["stroke-as-box"].value ? colorScale(d.colorScaleKey) : strokeColor)

                    })




            })

        if(barData.pointStyle && barData.pointStyle.switch.value){


            boxG.append("g")
                .attr("fill",d=>{
                    if(pointStyle["fill-as-box"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return  pointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.dataArr)
                .join("circle")
                .attr("cy",d=>{
                    let cx_start = 0
                    let cx_end = innerxScale.bandwidth()
                    return Math.random()*(cx_end-cx_start) + cx_start
                })
                .attr("cx",d=>xScale(d))
                .attr("class", pointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, pointStyle)

                })


        }
        if(outlierPointStyle && outlierPointStyle.switch.value) {
            boxG.append("g")
                .attr("fill",d=>{
                    if(outlierPointStyle["fill-as-box"].value){
                        return colorScale(d.colorScaleKey)
                    }else {
                        return  outlierPointStyle.fill.value
                    }
                })
                .selectAll("point")
                .data(d=> d.dataArr.filter(v=>v<d.min||v>d.max))
                .join("circle")
                .attr("cy",d=>innerxScale.bandwidth()/2)
                .attr("cx",d=>xScale(d))
                .attr("class", outlierPointStyle.id)
                .call(circle=>{
                    this.mainPlot.renderAttr(circle, outlierPointStyle)

                })
        }
        if(barData.significanceStyle && barData.significanceStyle.Star.switch.value){


            let spacing = barData.significanceStyle.Line.spacing.value

            mainGroup.selectAll("starLine")
                .data(barData.pValueArr.filter(d=>d.starCount>0))
                .join("g")
                .attr("transform",(d,i)=>`translate(${xScale(barData.maxValue)+i*spacing+12},0)`)
                .call(g=>{

                    g.append("path")
                        .attr("class",barData.significanceStyle.Line.id)
                        .attr("d",d=> {
                            let path = d3.path()
                            path.moveTo(-8,innerxScale(d.from)+innerxScale.bandwidth()/2)
                            path.lineTo(0,innerxScale(d.from)+innerxScale.bandwidth()/2)
                            path.lineTo(0,innerxScale(d.to)+innerxScale.bandwidth()/2)
                            path.lineTo(-8,innerxScale(d.to)+innerxScale.bandwidth()/2)
                            return  path.toString()
                        })
                        .attr("fill","none")
                        // .attr("x2",d=>innerxScale(d.to)+innerxScale.bandwidth()/2)
                        .call(L=>{
                            this.mainPlot.renderAttr(L,barData.significanceStyle.Line)
                        })

                    g.append("text")
                        .text(d=>{
                            return "*".repeat(d.starCount)

                        })
                        .attr("class",barData.significanceStyle.Star.id)
                        .attr("y",d=>(innerxScale(d.from)+innerxScale(d.to)+innerxScale.bandwidth())/2)
                        .attr("x",4)
                        .attr("text-anchor","middle")
                        .attr("writing-mode","tb")
                        .call(T=>{
                            this.mainPlot.renderAttr(T,barData.significanceStyle.Star)
                        })
                })

        }


    }

    drawHeatmap(mainGroup, heatmapData){

    }
}

export {BarPlot}