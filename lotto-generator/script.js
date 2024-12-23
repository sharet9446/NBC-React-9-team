document.getElementById('generateButton').addEventListener('click', function () {
    const numbersElement = document.getElementById('numbers');
    const prevNumbersElement = document.getElementById('prevNumbers');

    if (numbersElement.textContent) {
        prevNumbersElement.textContent = `이전 번호: ${numbersElement.textContent}`;
    }
    
    const numbers = generateLottoNumbers();
    numbersElement.textContent = numbers.join(', ');
});


function generateLottoNumbers() {
	const lottoNumbers = []; 
    while(lottoNumbers.length < 6){    
        const randomNumber = Math.floor(Math.random() * 45) + 1; 
        if(!lottoNumbers.includes(randomNumber)){ 
            lottoNumbers.push(randomNumber); 
        };
    };
    return lottoNumbers.sort((a,b)=>a-b);
};

