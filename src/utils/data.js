import { generateRandomNum, generateRandomCountry, generateRandomWorldColor } from './utils'

export const progressiveData =
    [
        { value: generateRandomNum(5000), color: "#E83F16", label: "Old Sessions" },
        { value: generateRandomNum(5000), color: "#FFBE00", label: "New Sessions" },
        { value: generateRandomNum(5000), color: "#70A72F", label: "Old Users" },
        { value: generateRandomNum(5000), color: "#32A07F", label: "New Users" },
    ]

export const layeredBarData = [
    {
        xLabel: "Amaltheia Juul",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Murat Seachnall",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Kahurangi Yaling",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Justo Chandana",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Kira Brianne",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Uffe Nicostratus",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Felip Manish",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },
    {
        xLabel: "Mars Slavomíra",
        groupAverage: generateRandomNum(10),
        candidateScore: generateRandomNum(10),
        industryAvg: generateRandomNum(10),
    },

]

export const certificationRequirement = generateRandomNum(10)

export const layeredBarLegends = [
    { label: "Group Average", color: "#FED452" },
    { label: "Candidate Score", color: "#AB57FC" },
    { label: "Industry Average", color: "#242F9B" },
    { label: "Certification Requirement", color: "#FF5D5D" },

]

export const pieChartData = [
    { label: "Not Due", value: 104891, color: "#34B3F1", percentage: 75 },
    { label: "1-30", value: 17208, color: "#F15412", percentage: 8 },
    { label: "31-60", value: 15900, color: "#FFA500", percentage: 8 },
    { label: "61-90", value: 15675, color: "#C6DE41", percentage: 7 },
    { label: ">90", value: 52853, color: "#242F9B", percentage: 26 },
]

export const worldMapData = [
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
    { id: generateRandomCountry(), color: generateRandomWorldColor() },
]

export const worldLegendData = [
    { label: "<25K", color: "#F53C56" },
    { label: "21K-24.9K", color: "#F65C72" },
    { label: "15K-19.9K", color: "#F98C9B" },
    { label: "10K-14.9K", color: "#FAA5B1" },
    { label: "5K-9.9K", color: "#FBC4CC" },
    { label: "<5K", color: "#FDDBE0" },
    { label: "0", color: "#F2F2F2" },
]

export const biData = [
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "10" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "20" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "30" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "40" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "50" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "60" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "70" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "80" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "90" },
    { debit: generateRandomNum(5), credit: generateRandomNum(-1, 0.1), balance: generateRandomNum(5), label: "100" },
]

export const biLegends = [
    { label: "Debit", color: "#A0D995" },
    { label: "Credit", color: "#EF9F9F" },
    { label: "Balance", color: "#34B3F1" },
]

export const otherPieData = [
    { value: 0.25, color: "#F94C66", label: "Something 1" },
    { value: 0.08, color: "#53BF9D", label: "Something 2" },
    { value: 0.08, color: "#9EB23B", label: "Something 3" },
    { value: 0.08, color: "#BD4291", label: "Something 4" },
    { value: 0.07, color: "#FFEE63", label: "Something 5" },
    { value: 0.14, color: "#BABD42", label: "Something 6" },
    { value: 0.54, color: "lightgrey", label: "Other" }
]

export const stackedBarData = [
    { value: 0.25, color: "#FDAF75", label: "Something 8" },
    { value: 0.15, color: "#333C83", label: "Something 9" },
    { value: 0.4, color: "#8479E1", label: "Something 7" },
    { value: 0.3, color: "#00AFC1", label: "Something 10" },
]

export const lineChartData =
{
    data:
        [
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Jan" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Feb" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Mar" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Apr" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "May" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Jun" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Jul" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Aug" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Sep" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Oct" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Nov" },
            { val1: Math.floor(generateRandomNum(20, 10)), val2: Math.floor(generateRandomNum(20, 10)), label: "Dec" },
        ],
    color: ["#F9D923", "#1363DF"]
}

export const progressBar = [
    // Math.floor(generateRandomNum(120)),
    // Math.floor(generateRandomNum(120)),
    // Math.floor(generateRandomNum(120)),
    25, 77, 100, 120
]

export const colorsProgressBar = [
    { color: "#FC4F4F", label: "Low" },
    { color: "#FFC54D", label: "Middle" },
    { color: "#6BCB77", label: "Good" },
    { color: "#4D96FF", label: "High" },
]