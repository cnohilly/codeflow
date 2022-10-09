const dateFormat = (timestamp) => {
    if (!timestamp) return null;
    const date = timestamp.toDateString().split(' ');
    date.pop();
    return `${date[0]} ${date[1]}, ${date[2]}`;
}

module.exports = { dateFormat };