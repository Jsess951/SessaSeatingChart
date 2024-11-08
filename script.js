const rows = 5;
const columns = 8;
const seatChart = document.getElementById('seatChart');
const confirmBtn = document.getElementById('confirmBtn');
const studentNameInput = document.getElementById('studentName');
const classSelector = document.getElementById('classSelector');
let selectedSeat = null;
let currentClass = classSelector.value;  // Start with the selected class

// Initialize empty seating chart
const initializeSeats = () => Array.from({ length: rows * columns }, (_, index) => ({
    id: index + 1,
    occupied: false,
    reservedBy: null
}));

// Load seats from localStorage for the selected class, or create if none exists
function loadSeats() {
    const savedSeats = localStorage.getItem(currentClass);
    return savedSeats ? JSON.parse(savedSeats) : initializeSeats();
}

// Save the current seating chart to localStorage
function saveSeats() {
    localStorage.setItem(currentClass, JSON.stringify(seats));
}

// Renders the seating chart based on the loaded seats
function renderSeats() {
    seatChart.innerHTML = '';
    seats.forEach((seat) => {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        
        if (seat.reservedBy) {
            seatDiv.innerText = `Desk ${seat.id}\n(${seat.reservedBy})`;
        } else {
            seatDiv.innerText = `Desk ${seat.id}`;
        }
        
        if (seat.occupied) {
            seatDiv.classList.add('occupied');
        } else if (selectedSeat && selectedSeat.id === seat.id) {
            seatDiv.classList.add('selected');
        }
        
        seatDiv.addEventListener('click', () => selectSeat(seat));
        seatChart.appendChild(seatDiv);
    });
}

// Select a seat
function selectSeat(seat) {
    if (seat.occupied) return;

    selectedSeat = seat;
    confirmBtn.disabled = false;
    renderSeats();
}

// Confirm seat selection with the student's name
confirmBtn.addEventListener('click', () => {
    const studentName = studentNameInput.value.trim();
    
    if (!studentName) {
        alert("Please enter your name before confirming.");
        return;
    }

    if (selectedSeat) {
        selectedSeat.reservedBy = studentName;
        selectedSeat.occupied = true;
        selectedSeat = null;
        confirmBtn.disabled = true;
        studentNameInput.value = ''; // Clear the name input after confirmation
        saveSeats(); // Save updated seats
        renderSeats();
    }
});

// Handle class selection change
classSelector.addEventListener('change', () => {
    currentClass = classSelector.value;
    seats = loadSeats(); // Load the seating chart for the new class
    selectedSeat = null;
    confirmBtn.disabled = true;
    studentNameInput.value = '';
    renderSeats();
});

// Initial load
let seats = loadSeats();
renderSeats();
