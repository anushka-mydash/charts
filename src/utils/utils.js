export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const createGradient = (svg, i) => {
    const linearGradientDef = svg.append("defs")
        .append("linearGradient")
        .attr("id", `gradient${i + 1}`)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%")

    linearGradientDef.append("stop")
        .attr("offset", "0%")
        .style("stop-opacity", "0.1")


    linearGradientDef.append("stop")
        .attr("offset", "50%")
        .style("stop-opacity", "0.2")

    linearGradientDef.append("stop")
        .attr("offset", "70%")
        .style("stop-opacity", "0.7")

    linearGradientDef.append("stop")
        .attr("offset", "80%")
        .style("stop-opacity", "1")

    return { linearGradientDef }
}