  const txArrays = [
    [1, 0, 0.5, 1, 0.75],
    [.5, 1, 1, 0, 0],
    [1, 0, 0.5, 0.25, 1],
    [.2, 1, .25, .25, .25],
    [.8, .5, .5, 1, 0],
    [.25, 0, 0, .75, .75]
  ];

  const txName = [
    'Tim T.',
    'Jim J.',
    'Jane D.',
    'Horatio C.',
    'Thanelope T.',
    'Shanaya G.'
  ];
  
  const calculateFraction = () => {
    const groups = [
      { checkboxes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] },
      { checkboxes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] },
      { checkboxes: ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
      { checkboxes: ['r', 's', 't', 'u', 'v'] }
    ];
  
    const fractions = [];
  
    for (const group of groups) {
        const checkboxes = group.checkboxes.map(checkbox => document.getElementById(checkbox));
        const checkedCount = checkboxes.filter(checkbox => checkbox && checkbox.checked).length;
        const fraction = checkedCount / checkboxes.length;
        const timeCheckboxes = ['morn', 'noon', 'eve'];
        const timeVector = timeCheckboxes.map(time => document.getElementById(time).checked ? 1 : 0);
        
        fractions.push(fraction);
        fractions.concat(timeVector);
       
    }
  
     return fractions;


    

  };



const txMatch = (a, b) => {
    let dotProduct = 0, aMagnitude = 0, bMagnitude = 0;
    
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        aMagnitude += a[i] * a[i];
        bMagnitude += b[i] * b[i];
    }

    if(aMagnitude === 0 || bMagnitude === 0) {
        return 0;
    } else {
        return dotProduct / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
    }
}

  
const calcDisplay = (event) => {
    event.preventDefault();

    const total = calculateFraction();
  
    let results = [];
  
    for (let i = 0; i < txArrays.length; i++) {
      const similarity = txMatch(total, txArrays[i]);
      results.push({
        index: i,
        similarity: similarity,
        name: txName[i]
      });
    }

    //console.log(similarity)
    results.sort((a, b) => b.similarity - a.similarity);
    const top3Results = results.slice(0, 3);

    localStorage.setItem('results', JSON.stringify(top3Results));

    location.reload();
};


window.onload = () => {
    const results = JSON.parse(localStorage.getItem('results'));
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // clear previous results
    if (results) {
        for (const result of results) {
            const resultText = `Name: ${result.name}, Similarity: ${result.similarity.toFixed(2)}`;
            const resultElement = document.createElement('p');
            resultElement.textContent = resultText;
            resultsDiv.appendChild(resultElement);
        }
    }
};

document.getElementById('calculate').addEventListener('click', calcDisplay);
