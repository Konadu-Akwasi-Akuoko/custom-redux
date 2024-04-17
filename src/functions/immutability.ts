const person = {
    name: "John",
    address: {
      city: "New York",
      country: "USA",
    },
  };
  
  console.log(person);
  
  // Output:
  // {
  //   name: 'John',
  //   address: { city: 'New York', country: 'USA' }
  // }
  
  // Now let's do a deep copy
  
  const updated = {
    ...person,
    address: {
      ...person.address,
    },
  };
  
  // Now let's change the address of the updated address city's to "Chicago"
  
  updated.address.city = "Chicago";
  
  console.log(updated);
  
  // Output:
  // {
  //   name: 'John',
  //   address: { city: 'Chicago', country: 'USA' }
  // }
  
  // Now let's also log the original person object
  console.log(person);
  
  // Output:
  // {
  //   name: 'John',
  //   address: { city: 'New York', country: 'USA' }
  // }