(function () {
    'use strict';
    
    // Implementation
    function validateForm(form) {
        // get the inputs
        let result = {
            isValid: true,
            errors: []
        };
        
        const inputs = form.querySelectorAll('input');
        
        for (let input of inputs) {
            if (input.dataset.validation === 'alphabetical') {
                if (!/^[a-z]+$/i.test(input.value)) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
                }
            }
            if (input.dataset.validation === 'numeric') {
                if (!/^[0-9]+$/i.test(input.value)) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
                }
            }
        }
        
        if (result.errors.length > 0 ) {
            result.isValid = false;
        }
      
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
                
          });
            
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
            
          it('should return multiple errors if more than one field is invalid', function () {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');

                name.value = '!!!';
                age.value = 'a';

                const result = validateForm(form);

                expect(result.isValid).to.be.false;
                expect(result.errors[0]).to.be.instanceof(Error);
                expect(result.errors[0].message).to.equal('!!! is not a valid first-name value');
                expect(result.errors[1]).to.be.instanceof(Error);
                expect(result.errors[1].message).to.equal('a is not a valid age value');
          });
       });
        
       describe('the createValidationQueries function', function () {
            
            it('should map input elements with a data-validation attribute to an array of validation objects',function (){
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');

                name.value = 'Bob';
                age.value = '42';

                const validations = createValidationQueries([name, age]);

                expect(validations.length).to.equal(2);

                expect(validations[0].name).to.equal('first-name');
                expect(validations[0].type).to.equal('alphabetical');
                expect(validations[0].value).to.equal('Bob');

                expect(validations[1].name).to.equal('age');
                expect(validations[1].type).to.equal('numeric');
                expect(validations[1].value).to.equal('42');
        });
    });
  });

  mocha.run();
    
}());