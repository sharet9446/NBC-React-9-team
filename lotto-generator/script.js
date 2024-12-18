document.getElementById('generateButton').addEventListener('click', function () {
    let numbers = generateLottoNumbers();
    document.getElementById('numbers').textContent = numbers.join(', ');
})

function generateLottoNumbers() {
    let LottoNumbers = []
    for (let i = 0; i < 6; i++) {
        let randomNumber = (Math.floor(Math.random() * 45) + 1)
        LottoNumbers.includes(randomNumber) ? i -= 1
            : LottoNumbers.push(randomNumber)
    }
    return LottoNumbers.sort((a, b) => a - b)
}