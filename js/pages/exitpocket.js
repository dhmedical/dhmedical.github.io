/* Skrypty strony exitpocket.html; zachowana kolejność wykonywania */
function selectOrder(variant,quantity,price){document.getElementById('variant').value=variant;document.getElementById('quantity').value=quantity;document.getElementById('price').value=price;document.getElementById('orderForm').scrollIntoView({behavior:'smooth',block:'start'});}
