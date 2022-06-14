const countriesId = ["AFG", "AGO", "ALB", "ARE", "ARG", "ARM", "ATA", "ATF", "AUS", "AUT", "AZE", "BDI", "BEL", "BEN", "BFA", "BGD", "BGR", "BHS", "BIH", "BLR", "BLZ", "BOL", "BRA", "BRN", "BTN", "BWA", "CAF", "CAN", "CHE", "CHL", "CHN", "CIV", "CMR", "COD", "COG", "COL", "CRI", "CUB", "-99", "CYP", "CZE", "DEU", "DJI", "DNK", "DOM", "DZA", "ECU", "EGY", "ERI", "ESP", "EST", "ETH", "FIN", "FJI", "FLK", "FRA", "GAB", "GBR", "GEO", "GHA", "GIN", "GMB", "GNB", "GNQ", "GRC", "GRL", "GTM", "GUY", "HND", "HRV", "HTI", "HUN", "IDN", "IND", "IRL", "IRN", "IRQ", "ISL", "ISR", "ITA", "JAM", "JOR", "JPN", "KAZ", "KEN", "KGZ", "KHM", "KOR", "OSA", "KWT", "LAO", "LBN", "LBR", "LBY", "LKA", "LSO", "LTU", "LUX", "LVA", "MAR", "MDA", "MDG", "MEX", "MKD", "MLI", "MMR", "MNE", "MNG", "MOZ", "MRT", "MWI", "MYS", "NAM", "NCL", "NER", "NGA", "NIC", "NLD", "NOR", "NPL", "NZL", "OMN", "PAK", "PAN", "PER", "PHL", "PNG", "POL", "PRI", "PRK", "PRT", "PRY", "QAT", "ROU", "RUS", "RWA", "ESH", "SAU", "SDN", "SDS", "SEN", "SLB", "SLE", "SLV", "ABV", "SOM", "SRB", "SUR", "SVK", "SVN", "SWE", "SWZ", "SYR", "TCD", "TGO", "THA", "TJK", "TKM", "TLS", "TTO", "TUN", "TUR", "TWN", "TZA", "UGA", "UKR", "URY", "USA", "UZB", "VEN", "VNM", "VUT", "PSE", "YEM", "ZAF", "ZMB", "ZWE"]
const worldColors = ["#FF2626", "#F47C7C", "#FFC3C3", "#FFC3C3"];

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
        .style("stop-opacity", "0.3")


    linearGradientDef.append("stop")
        .attr("offset", "50%")
        .style("stop-opacity", "0.5")

    linearGradientDef.append("stop")
        .attr("offset", "70%")
        .style("stop-opacity", "0.8")

    linearGradientDef.append("stop")
        .attr("offset", "80%")
        .style("stop-opacity", "1")

    return { linearGradientDef }
}

export const generateRandomNum = (max, min = 1) => {
    return ((Math.random() * max) + min)
}

export const generateRandomCountry = (max = countriesId.length, min = 0) => {
    return countriesId[Math.floor((Math.random() * max) + min)]
}

export const generateRandomWorldColor = (max = worldColors.length, min = 0) => {
    return worldColors[Math.floor((Math.random() * max) + min)]
}

