// script.js

const seats = [
    { id: 1, occupied: false },
    { id: 2, occupied: false },
    { id: 3, occupied: true },
    { id: 4, occupied: false },
    { id: 5, occupied: false },
    { id: 6, occupied: true },
    { id: 7, occupied: false },
    { id: 8, occupied: false },
    { id: 9, occupied: false },
    { id: 10, occupied: true }
];

const seatChart = document.getElementById('seatChart');
const confirmBtn = document.getElementById('confirmBtn');
let selectedSeat = null;

// Render the seats
function renderSeats() {
    seatChart.innerHTML = '';
    seats.forEach((seat) => {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.innerText = seat.id;
        
        // Set occupied or available class
        if (seat.occupied) {
            seatDiv.classList.add('occupied');
        } else if (selectedSeat && selectedSeat.id === seat.id) {
            seatDiv.classList.add('selected');
        }
        
        seatDiv.addEventListener('click', () => selectSeat(seat));
        seatChart.appendChild(seatDiv);
    });
}

// Select seat function
function selectSeat(seat) {
    if (seat.occupied) return;

    selectedSeat = seat;
    confirmBtn.disabled = false;
    renderSeats();
}

// Confirm seat
confirmBtn.addEventListener('click', () => {
    if (selectedSeat) {
        alert(`Seat ${selectedSeat.id} confirmed!`);
        selectedSeat.occupied = true;
        selectedSeat = null;
        confirmBtn.disabled = true;
        renderSeats();
    }
});

renderSeats();
