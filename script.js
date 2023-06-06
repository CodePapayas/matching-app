  const txArrays = [
    [0, 0.5, 1, 0.75],
    [1, 1, 0, 0],
    [0, 0.5, 0.25, 1],
  ];
  
  const calculateFraction = () => {
    const groups = [
      { name: 'A to L', checkboxes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] },
      { name: 'a to h', checkboxes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] },
      { name: 'Q to Z', checkboxes: ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] },
      { name: 'r to v', checkboxes: ['r', 's', 't', 'u', 'v'] }
    ];
  
    const fractions = {};
  
    for (const group of groups) {
      const checkboxes = group.checkboxes.map(checkbox => document.getElementById(checkbox));
      const checkedCount = checkboxes.filter(checkbox => checkbox && checkbox.checked).length;
      const fraction = checkedCount / checkboxes.length;
  
      fractions[group.name] = fraction;
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
        return 0; // As cosine similarity is not defined when either or both magnitudes are zero.
    } else {
        return dotProduct / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
    }
}

  
const calcDisplay = (event) => {
    event.preventDefault();
    const total = calculateFraction();
  
    for (let i = 0; i < txArrays.length; i++) {
      const final = txMatch(total, txArrays[i]);
      console.log(final);
    }
  };
  

document.getElementById('calculate').addEventListener('click', calcDisplay);