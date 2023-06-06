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
  
const calcDisplay = (event) => {
    event.preventDefault();
    const total = calculateFraction();
    console.log(total);
};

document.getElementById('calculate').addEventListener('click', calcDisplay);