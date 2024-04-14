       
       
        function direction_btn() {
            location.href = "https://goo.gl/maps/pRubhWdRX1Y6iLLj9";
        }
        function book_now_btn() {
            location.href = "registerform.html";
        }

        const texts = [
            "LET'S BID GOODBYE TO ALL THE PARKING PROBLEMS!",
            "Smart Parking Application For",
            " Smart Users:",
            "Book My Parking provides you with a smarter way to park when you're on the go."
        ];
        let index = 0;

        function typeWriter() {
            let allLinesTyped = true; // Flag to check if all lines have been typed

            texts.forEach((text, i) => {
                const currentElement = document.getElementById(`typewriter-heading${i + 1}`);

                if (currentElement.textContent !== text) {
                    allLinesTyped = false;
                    if (text.charAt(currentElement.textContent.length) === '<') {
                        currentElement.innerHTML = text.substring(0, currentElement.textContent.length);
                    } else {
                        currentElement.textContent += text.charAt(currentElement.textContent.length);
                    }
                }
            });

            if (!allLinesTyped) {
                setTimeout(typeWriter, 100); // Typing speed in milliseconds
            } else {
                index = 0; // Reset index to start typing from the beginning
                setTimeout(typeWriter, 1000); // Delay before restarting typing (1 second in this example)
            }
        }

        typeWriter(); // Start typing when the page loads



        function show() {
            alert(`Finding parking near ${state, city} `);


        }
