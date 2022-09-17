function getDateOneMonthAgo() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString();
}

const date = getDateOneMonthAgo();
console.log(date > "2022-09-13T12:50:45.000Z")

