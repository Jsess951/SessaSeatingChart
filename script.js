// script.js

// Define an 8x5 grid of seats (desks)
const rows = 5;
const columns = 8;
const seats = Array.from({ length: rows * columns }, (_, index) => ({
    id: index + 1,
    occupied: Math.random() < 0.2 // Randomly set some desks as occupied
}));

const seatChart = document.getElementById('seatChart');
const confirmBtn = document.getElementById('confirmBtn');
let selectedSeat = null;

// Render the seats as an 8x5 grid
function renderSeats() {
    seatChart.innerHTML = '';
    seats.forEach((seat) => {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.innerText = `Desk ${seat.id}`;
        
        // Set class for occupied or selected seats
        if (seat.occupied) {
            seatDiv.classList.add('occupied');
        } else if (selectedSeat && selectedSeat.id === seat.id) {
            seatDiv.classList.add('selected');
        }
        
        // Add click event to select seat if not occupied
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

// Confirm seat selection
confirmBtn.addEventListener('click', () => {
    if (selectedSeat) {
        alert(`Desk ${selectedSeat.id} confirmed!`);
        selectedSeat.occupied = true;
        selectedSeat = null;
        confirmBtn.disabled = true;
        renderSeats();
    }
});

renderSeats();
