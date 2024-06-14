export function validateForm() {
    const inputs = document.querySelectorAll('input');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    inputs.forEach(input => {
        if (input.value === '') {
            input.classList.add('invalid-input');
        } else {
            input.classList.remove('invalid-input');
        }
  
        if (input.type === 'email' && !emailRegex.test(input.value)) {
            input.classList.add('invalid-input');
        }
  
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.remove('invalid-input');
            }
  
            if (input.type === 'email' && !emailRegex.test(input.value)) {
                input.classList.add('invalid-input');
            } else if (input.type === 'email') {
                input.classList.remove('invalid-input');
            }
        });
    });
  }