(function () {
    'use strict';
    
    // Implementation
    function validateForm(form) {
        // get the inputs
        let result = {
            errors: []
        };
        
        let isValid = true;
        const inputs = form.querySelectorAll('input');
        
        for (let input of inputs) {
            if (input.dataset.validation === 'alphabetical') {
                isValid = isValid && /^[a-z]+$/i.test(input.value);
                if (!isValid) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
                }
            }
            if (input.dataset.validation === 'numeric') {
                isValid = isValid && /^[0-9]+$/i.test(input.value);
            }
        }
        
        result.isValid = isValid;
        return result;
    }
    
    // Test Setup
    mocha.setup('bdd');
    const { expect } = chai;
    
    describe('the form validator', function () {
        let form;
        
        beforeEach(function () {
            form = document.querySelector('.test-form').cloneNode(true);
        });
        
        describe('the validateForm function', function () {
            
            it("should evaluate valid inputs as valid", function() {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                
                name.value = "Alice";
                age.value = "25";
                
                const result = validateForm(form);
                const isFormValid = result.isValid;
                const errors = result.errors;
                
                expect (isFormValid).to.be.true;
                expect (errors.length).to.equal(0);
                
            });
          
            it("should return validation error when name input is not valid", function () {
                const notValidName = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                
                notValidName.value = "Alice222";
                age.value = "25";
                
                const result = validateForm(form);
                const isFormValid = result.isValid;
                const errors = result.errors;
                
                 expect (isFormValid).to.be.false;
                 expect (errors.length).to.equal(1);
                 expect (result.errors[0].message).to.equal('Alice222 is not a valid first-name value');
                
          })
          
          it("should return validation error when age input is not valid", function () {
                const notValidName = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                
                notValidName.value = "Alice";
                age.value = "25abc";
                
                const result = validateForm(form);
                const isFormValid = result.isValid;
                const errors = result.errors;
                
                 expect (isFormValid).to.be.false;
                 expect (errors.length).to.equal(1);
                 expect (result.errors[0].message).to.equal('25abc is not a valid age value');
                
          });
          
        });
    });
    
    mocha.run();
}());