const { useState } = React;
const { render } = ReactDOM;

// Provided t-shirts array
const initialTshirts = [
  { title: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Bright Purple T-Shirt', image: 'bright-purple-t-shirt.jpg', price: 5.99, stock: 1, quantity: 1 },
  { title: 'Cobalt Blue T-Shirt', image: 'cobalt-blue-t-shirt.jpg', price: 9.99, stock: 5, quantity: 1 },
  { title: 'Green T-Shirt', image: 'green-t-shirt.jpg', price: 6.99, stock: 0, quantity: 1 },
  { title: 'Grey T-Shirt', image: 'grey-t-shirt.jpg', price: 4.99, stock: 2, quantity: 1 },
  { title: 'Light Green T-Shirt', image: 'light-green-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Purple T-Shirt', image: 'purple-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 },
  { title: 'Red T-Shirt', image: 'red-t-shirt.jpg', price: 6.99, stock: 3, quantity: 1 },
  { title: 'Teal T-Shirt', image: 'teal-t-shirt.jpg', price: 7.99, stock: 2, quantity: 1 },
];

function App() {
  const [tshirts, setTshirts] = useState(initialTshirts);

  // Handling quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedTshirts = [...tshirts];
    updatedTshirts[index].quantity = Number(newQuantity);
    setTshirts(updatedTshirts);
  };

  // Handling Buy button click
  const handleBuy = (index) => {
    const updatedTshirts = [...tshirts];
    const selectedTshirt = updatedTshirts[index];
    const quantityToBuy = selectedTshirt.quantity;

    if (quantityToBuy > 0 && quantityToBuy <= selectedTshirt.stock) {
      selectedTshirt.stock -= quantityToBuy;
      if (selectedTshirt.stock > 0) selectedTshirt.quantity = 1;
      setTshirts(updatedTshirts);
    }
  };

  return (
    <div className="storefront">
      {tshirts.map((tshirt, index) => (
        <div key={index} className="tshirt-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{tshirt.title}</h2>
          <img src={`images/${tshirt.image}`} alt={tshirt.title} style={{ width: '150px' }} />
          <p>Price: ${tshirt.price.toFixed(2)}</p>
          {tshirt.stock > 0 ? (
            <div>
              <p>Stock: {tshirt.stock}</p>
              <label>
                Quantity:&nbsp;
                <select value={tshirt.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)}>
                  {Array.from({ length: tshirt.stock }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <button onClick={() => handleBuy(index)}>Buy</button>
            </div>
          ) : (
            <p style={{ color: 'red' }}>Out of Stock</p>
          )}
        </div>
      ))}
    </div>
  );
}

render(<App />, document.getElementById('root'));
