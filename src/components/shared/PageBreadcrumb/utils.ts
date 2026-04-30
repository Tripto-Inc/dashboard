export const generateRandomWidth = () => {
    const minWidth = 36
    const maxWidth = 140

    return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth
}