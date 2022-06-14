import { generateRandomNum, generateRandomCountry, generateRandomWorldColor } from './utils'

export const progressiveData =
    [
        { value: generateRandomNum(5000), color: "#FF06B7", label: "Old Sessions" },
        { value: generateRandomNum(5000), color: "#47B5FF", label: "New Sessions" },
        { value: generateRandomNum(5000), color: "#FFA500", label: "Old Users" },
        { value: generateRandomNum(5000), color: "#1F4690", label: "New Users" },
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
    { label: "Not Due", value: 104891, color: "#34B3F1", percentage: 51 },
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
    { label: "<25K", color: "#FF2626" },
    { label: "21K-24.9K", color: "#F24C4C" },
    { label: "15K-19.9K", color: "#F47C7C" },
    { label: "10K-14.9K", color: "#EF9F9F" },
    { label: "5K-9.9K", color: "#FFA8A8" },
    { label: "<5K", color: "#FFC3C3" },
    { label: "0", color: "#eeeeee" },
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