// script.js

const rows = 5;
const columns = 8;
// Define seats with all desks unoccupied initially
const seats = Array.from({ length: rows * columns }, (_, index) => ({
    id: index + 1,
    occupied: false, // All desks start as unoccupied
    reservedBy: null
}));

const seatChart = document.getElementById('seatChart');
const confirmBtn = document.getElementById('confirmBtn');
const studentNameInput = document.getElementById('studentName');
let selectedSeat = null;

// Render the seats as an 8x5 grid
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
        renderSeats();
    }
});

renderSeats();
