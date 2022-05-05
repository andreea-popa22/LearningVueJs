//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'A pair of warm, fuzzy socks',
    image: './resources/socks.jpg',
    // inStock: false,
    // inventory: 9,
    // onSale: true,
    // link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
    details: ["85% cotton", "15% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 1,
        variantColor: "Green"
      },
      {
        variantId: 2,
        variantColor: "Blue"
      }
    ],
    sizes: ['35-38', '39-41', '42-45']
  } 
})