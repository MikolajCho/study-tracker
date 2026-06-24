let storage = JSON.parse(localStorage.getItem('study_db')) || [];
document.getElementById('entryDate').value = new Date().toISOString().split('T')[0];

document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputDate = document.getElementById('entryDate').value;
    const inputHours = parseFloat(document.getElementById('entryHours').value);
    
    // Walidacja logiczna zakresu godzin: t ∈ ⟨0, 24⟩
    if (isNaN(inputHours) || inputHours < 0 || inputHours > 24) {
        alert("Błąd: Liczba godzin musi wynosić od 0 do 24!");
        return;
    }
    
    const existingIndex = storage.findIndex(item => item.date === inputDate);
    if (existingIndex !== -1) {
        storage[existingIndex].hours = inputHours;
    } else {
        storage.push({ date: inputDate, hours: inputHours });
    }
    
    storage.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('study_db', JSON.stringify(storage));
    
    document.getElementById('entryHours').value = '';
    initApp();
});

function initApp() {
    console.log("Baza zwalidowana pomyślnie:", storage);
}

initApp();
