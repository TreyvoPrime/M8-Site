"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Treyvon Pearson
      Date:   03/02/26

      Filename: js06a.js
 */
let orderForm, model;

window.addEventListener("load", function() {
      orderForm = document.forms.orderForm;
      model = orderForm.elements.model;

      // Select Model selection list when form opens
      model.focus();
      // Add an event listener for every form element
      for (let i = 0; i < orderForm.elements.length; i++) {  
            orderForm.elements[i].addEventListener("change", calcOrder);
      }

      // Initial calculation
      calcOrder();
});

// Calculate the cost of the order
function calcOrder() {
      let mIndex = model.selectedIndex;
      let mValue = Number(model.options[mIndex].value);

      // Determine the selected quantity
      let quantity = Number(orderForm.elements.qty.value);

      // Model cost = model cost times quantity
      let modelCost = mValue * quantity;
      orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style:"currency", currency:"USD"});

      // Retrieve the cost of the protection plan
      let selectedPlan = document.querySelector('input[name="plan"]:checked');  
      let planCost = selectedPlan ? Number(selectedPlan.value) : 0;
      orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style:"currency", currency:"USD"});

      // Calculate the order subtotal
      let subtotal = modelCost + planCost;
      orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style:"currency", currency:"USD"});

      // Calculate the 5% sales tax
      let salesTax = subtotal * 0.05;
      orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style:"currency", currency:"USD"});

      // Calculate the total cost of the order
      let totalCost = subtotal + salesTax;
      orderForm.elements.totalCost.value = totalCost.toLocaleString("en-US", {style:"currency", currency:"USD"});

      // Update model name
      orderForm.elements.modelName.value = model.options[mIndex].text; 
      // Update plan name
      orderForm.elements.planName.value = selectedPlan ? selectedPlan.labels[0].textContent : ""; 
}