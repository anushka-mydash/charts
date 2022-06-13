import { generateRandomNum } from './utils'

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