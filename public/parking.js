 function generateSeatingSlots(numSeats) {
            var seatingArea = document.getElementById("seatingArea");
            
            // Array to store indices of default booked seats (randomly generated)
            var defaultBookedSeats = getRandomSeats(4, numSeats); // Randomly generate 4 booked seats
            
            // Loop to generate each seating slot
            for (var i = 1; i <= numSeats; i++) {
                var seatingSlot = document.createElement("button"); // Changed div to button
                seatingSlot.className = "seating-slot";
                seatingSlot.textContent = i; // Add the number to the slot
                seatingSlot.dataset.seatNumber = i; // Store seat number as dataset attribute
                
                // Check if the current index is in the array of default booked seats
                if (defaultBookedSeats.includes(i)) {
                    seatingSlot.classList.add("selected");
                    seatingSlot.textContent = "Booked"; // Set text content to "Booked"
                    seatingSlot.removeEventListener("click", toggleBooking); // Remove click event listener
                } else {
                    // Add event listener to toggle selected class on click for unbooked seats
                    seatingSlot.addEventListener("click", toggleBooking);
                }
                
                seatingArea.appendChild(seatingSlot);
            }
        }
    
        // Function to toggle booking status of a seat
        function toggleBooking() {
            var selectedSeats = document.querySelectorAll(".seating-slot.selected");
            
            // Check if maximum selection limit is reached
            if (selectedSeats.length >= 6 && !this.classList.contains("selected")) {
                alert("Maximum 2 seats can be booked at a time.");
                return;
            }
            
            // Toggle booking status of the seat
            this.classList.toggle("selected");
        }
    
        // Function to confirm booked seats
        function confirmSeats() {
            var bookedSeats = document.querySelectorAll(".seating-slot.selected");
            
            // Change background color of booked seats to red and text content to "Booked"
            bookedSeats.forEach(function(seat) {
                seat.textContent = "Booked";
                seat.classList.remove("selected");
                seat.classList.add("confirmed");
            });
        }
    
        // Function to randomly generate booked seats
        function getRandomSeats(numSeats, totalSeats) {
            var bookedSeats = [];
            
            // Generate unique random seat indices
            while (bookedSeats.length < numSeats) {
                var randomSeat = Math.floor(Math.random() * totalSeats) + 1; // Generate random seat number
                if (!bookedSeats.includes(randomSeat)) {
                    bookedSeats.push(randomSeat);
                }
            }
            
            return bookedSeats;
        }
    
        // Call the function to generate seating slots
        generateSeatingSlots(21);
        //
        let account; // Declare a variable to store the user's account address

        // Add event listener to the connect button
        document.getElementById('connect-button').addEventListener('click', async () => {
            try {
                // Prompt user to connect their MetaMask wallet
                await ethereum.request({ method: 'eth_requestAccounts' });

                // If successful, update button text with connected account
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                account = accounts[0]; // Store the user's account address
                console.log('Connected account:', account);
                document.getElementById('connect-button').textContent = account;

                // Show the pay button
                document.getElementById('pay-button').style.display = 'inline';
            } catch (error) {
                console.error('Error connecting MetaMask:', error);
            }
        });

        // Add event listener to the pay button
        document.getElementById('pay-button').addEventListener('click', async () => {
            try {
                // Define payment details
                const paymentAmount = '0.1'; // Amount in Ether
                const paymentRecipient = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Sample recipient address (MakerDAO's DAI contract address)

                // Send transaction
                const transactionParameters = {
                    from: account,
                    to: paymentRecipient,
                    value: '0x' + (parseInt(paymentAmount * 1e18)).toString(16), // Convert amount to wei
                };

                // Send transaction request to MetaMask
                const result = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                console.log('Payment successful:', result);
            } catch (error) {
                console.error('Error making payment:', error);
            }
        });
        //

        function generateParkingSlots(numSlots) {
            var parkingArea = document.getElementById("parkingArea");
            var selectedSlots = 0; // Counter for selected slots

            // Loop to generate each parking slot
            for (var i = 1; i <= numSlots; i++) {
                var parkingSlot = document.createElement("div");
                parkingSlot.className = "parking-slot";
                parkingSlot.textContent = i; // Add the number to the slot

                // Add event listener to toggle selected class on click
                parkingSlot.addEventListener("click", function () {
                    // Check if already selected
                    if (this.classList.contains("selected")) {
                        this.classList.remove("selected");
                        selectedSlots--;
                    } else {
                        // Check if maximum slots already selected
                        if (selectedSlots < 3) {
                            this.classList.add("selected");
                            selectedSlots++;
                        } else {
                            alert("Maximum of 3 slots can be booked.");
                        }
                    }
                });

                parkingArea.appendChild(parkingSlot);
            }
        }

        // Call the function to generate 20 parking slots
        generateParkingSlots(21);

