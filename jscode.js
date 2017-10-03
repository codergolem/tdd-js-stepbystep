(function () {
    'use strict';
    
    // Implementation
    function validateForm(form) {
        
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
            // Write your first test case here :)
        });
    });
    
    mocha.run();
}());